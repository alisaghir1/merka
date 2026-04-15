import AboutClient from './AboutClient'
import { getLocale, buildMetadata } from '@/lib/locale'

export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('about', locale, {
    openGraph: { images: ['/og-about.jpg'] },
    twitter: { images: ['/og-about.jpg'] },
    enPath: '/about',
    arPath: '/ar/about',
  })
}

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://merka.ae/about#webpage',
        url: 'https://merka.ae/about',
        name: 'About Us | MERKA Architecture',
        isPartOf: { '@id': 'https://merka.ae/#website' },
        mainEntity: { '@id': 'https://merka.ae/#organization' },
        breadcrumb: { '@id': 'https://merka.ae/about#breadcrumb' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://merka.ae/about#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://merka.ae/' },
          { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://merka.ae/about' }
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
      <AboutClient />
    </>
  )
}
