import { getStyles, getTypologies } from '@/lib/server-data'
import StylesTypologiesClient from './StylesTypologiesClient'

// Metadata for SEO
export const metadata = {
  title: 'Architectural Styles & Typologies | MERKA Architecture',
  description: 'Explore various architectural styles and building typologies. From modern minimalism to traditional designs, discover the diversity of architectural expression.',
  keywords: 'architectural styles, building typologies, modern architecture, traditional design, contemporary architecture, UAE design',
  openGraph: {
    title: 'Architectural Styles & Typologies | MERKA Architecture',
    description: 'Explore various architectural styles and building typologies.',
    images: ['/og-styles.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architectural Styles & Typologies | MERKA Architecture',
    description: 'Explore various architectural styles and building typologies.',
    images: ['/og-styles.jpg'],
  },
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
