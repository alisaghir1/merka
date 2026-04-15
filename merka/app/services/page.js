import { getServices } from '@/lib/server-data'
import ServicesPageClient from './ServicesPageClient'
import { getLocale, buildMetadata } from '@/lib/locale'

export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('services', locale, {
    openGraph: { images: ['/og-services.jpg'] },
    twitter: { images: ['/og-services.jpg'] },
    enPath: '/services',
    arPath: '/ar/services',
  })
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  // Fetch services on the server
  const services = await getServices({ published: true })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://merka.ae/services#webpage',
        url: 'https://merka.ae/services',
        name: 'Our Services | MERKA Architecture',
        isPartOf: { '@id': 'https://merka.ae/#website' },
        breadcrumb: { '@id': 'https://merka.ae/services#breadcrumb' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://merka.ae/services#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://merka.ae/' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://merka.ae/services' }
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
      <ServicesPageClient initialServices={services} />
    </>
  )
}
