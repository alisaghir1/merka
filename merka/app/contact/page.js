import { getSiteSettings } from '@/lib/server-data'
import ContactClient from './ContactClient'
import { getLocale, buildMetadata } from '@/lib/locale'

export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('contact', locale, {
    openGraph: { images: ['/og-contact.jpg'] },
    twitter: { images: ['/og-contact.jpg'] },
    enPath: '/contact',
    arPath: '/ar/contact',
  })
}

// Force dynamic rendering for SSR (to get latest contact info)
export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  // Fetch site settings on the server
  const settings = await getSiteSettings()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': 'https://merka.ae/contact#webpage',
        url: 'https://merka.ae/contact',
        name: 'Contact Us | MERKA Architecture',
        isPartOf: { '@id': 'https://merka.ae/#website' },
        breadcrumb: { '@id': 'https://merka.ae/contact#breadcrumb' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://merka.ae/contact#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://merka.ae/' },
          { '@type': 'ListItem', position: 2, name: 'Contact Us', item: 'https://merka.ae/contact' }
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
      <ContactClient initialSettings={settings} />
    </>
  )
}
