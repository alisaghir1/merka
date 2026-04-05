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
  
  return <StylesTypologiesClient initialStyles={styles} initialTypologies={typologies} />
}
