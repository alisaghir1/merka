import { getServices, getProjects, getSiteSettings } from '@/lib/server-data'
import HomeClient from './HomeClient'
import { getLocale, buildMetadata } from '@/lib/locale'

// Dynamic metadata for SEO (locale-aware)
export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('home', locale, {
    openGraph: { images: ['/og-home.jpg'] },
    twitter: { images: ['/og-home.jpg'] },
    enPath: '/',
    arPath: '/ar',
  })
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch data on the server
  const [services, featuredProjects, settings] = await Promise.all([
    getServices({ published: true }),
    getProjects({ published: true, featured: true, limit: 6 }),
    getSiteSettings()
  ])

  const contact = settings.contact || {}
  const social = settings.social || {}
  const sameAs = [social.linkedin, social.instagram, social.twitter].filter(Boolean)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://merka.ae/#website',
        url: 'https://merka.ae/',
        name: 'MERKA Architecture',
        description: 'Premium Architectural Design in UAE',
        publisher: { '@id': 'https://merka.ae/#organization' }
      },
      {
        '@type': 'Organization',
        '@id': 'https://merka.ae/#organization',
        name: 'MERKA Architecture',
        url: 'https://merka.ae/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://merka.ae/logo-dark.svg'
        },
        email: contact.email || 'hello@merka.ae',
        telephone: contact.phone || '+971 4 123 4567',
        address: {
          '@type': 'PostalAddress',
          streetAddress: contact.address || 'Dubai Design District, Building 6, Ground Floor',
          addressLocality: 'Dubai',
          addressCountry: 'AE'
        },
        sameAs
      },
      {
        '@type': 'WebPage',
        '@id': 'https://merka.ae/#webpage',
        url: 'https://merka.ae/',
        name: 'MERKA Architecture | Premium Architectural Design in UAE',
        isPartOf: { '@id': 'https://merka.ae/#website' },
        about: { '@id': 'https://merka.ae/#organization' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://merka.ae/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://merka.ae/'
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient initialServices={services} initialProjects={featuredProjects} />
    </>
  )
}
