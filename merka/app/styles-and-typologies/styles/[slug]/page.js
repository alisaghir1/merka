import { notFound } from 'next/navigation'
import { getStyleBySlug } from '@/lib/server-data'
import StyleDetailClient from './StyleDetailClient'

// Generate dynamic metadata based on style
export async function generateMetadata({ params }) {
  const { slug } = await params
  const style = await getStyleBySlug(slug)
  
  if (!style) {
    return {
      title: 'Style Not Found | MERKA Architecture',
    }
  }
  
  return {
    title: `${style.title} | Architectural Styles | MERKA Architecture`,
    description: style.description || `Explore ${style.title} architectural style - characteristics, history, and examples.`,
    keywords: `${style.title}, architectural style, design style, MERKA Architecture`,
    openGraph: {
      title: `${style.title} | MERKA Architecture`,
      description: style.description,
      images: style.image ? [style.image] : ['/og-styles.jpg'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${style.title} | MERKA Architecture`,
      description: style.description,
      images: style.image ? [style.image] : ['/og-styles.jpg'],
    },
  }
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function StyleDetailPage({ params }) {
  const { slug } = await params
  
  // Fetch style data on the server
  const style = await getStyleBySlug(slug)
  
  if (!style) {
    notFound()
  }
  
  return <StyleDetailClient style={style} />
}
