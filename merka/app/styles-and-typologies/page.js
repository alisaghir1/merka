import { getStyles, getTypologies } from '@/lib/server-data'
import StylesTypologiesClient from './StylesTypologiesClient'
import { getLocale, buildMetadata } from '@/lib/locale'

export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('stylesTypologies', locale, {
    openGraph: { images: ['/og-styles.jpg'] },
    twitter: { images: ['/og-styles.jpg'] },
    enPath: '/styles-and-typologies',
    arPath: '/ar/styles-and-typologies',
  })
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function StylesTypologiesPage() {
  // Fetch styles and typologies on the server
  const [styles, typologies] = await Promise.all([
    getStyles({ published: true }),
    getTypologies({ published: true })
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://merka.ae/styles-and-typologies#webpage',
        url: 'https://merka.ae/styles-and-typologies',
        name: 'Architectural Styles & Typologies | MERKA Architecture',
        isPartOf: { '@id': 'https://merka.ae/#website' },
        breadcrumb: { '@id': 'https://merka.ae/styles-and-typologies#breadcrumb' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://merka.ae/styles-and-typologies#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://merka.ae/' },
          { '@type': 'ListItem', position: 2, name: 'Styles & Typologies', item: 'https://merka.ae/styles-and-typologies' }
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
      <StylesTypologiesClient initialStyles={styles} initialTypologies={typologies} />
    </>
  )
}
