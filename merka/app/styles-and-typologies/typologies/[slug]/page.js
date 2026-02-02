import { notFound } from 'next/navigation'
import { getTypologyBySlug } from '@/lib/server-data'
import TypologyDetailClient from './TypologyDetailClient'

// Generate dynamic metadata based on typology
export async function generateMetadata({ params }) {
  const { slug } = await params
  const typology = await getTypologyBySlug(slug)
  
  if (!typology) {
    return {
      title: 'Typology Not Found | MERKA Architecture',
    }
  }
  
  return {
    title: `${typology.title} | Building Typologies | MERKA Architecture`,
    description: typology.description || `Explore ${typology.title} building typology - characteristics, design considerations, and examples.`,
    keywords: `${typology.title}, building typology, architectural typology, MERKA Architecture`,
    openGraph: {
      title: `${typology.title} | MERKA Architecture`,
      description: typology.description,
      images: typology.image ? [typology.image] : ['/og-typologies.jpg'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${typology.title} | MERKA Architecture`,
      description: typology.description,
      images: typology.image ? [typology.image] : ['/og-typologies.jpg'],
    },
  }
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function TypologyDetailPage({ params }) {
  const { slug } = await params
  
  // Fetch typology data on the server
  const typology = await getTypologyBySlug(slug)
  
  if (!typology) {
    notFound()
  }
  
  return <TypologyDetailClient typology={typology} />
}
