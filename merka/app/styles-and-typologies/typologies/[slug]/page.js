import { notFound } from 'next/navigation'
import { getTypologyBySlug } from '@/lib/server-data'
import TypologyDetailClient from './TypologyDetailClient'
import { getLocale } from '@/lib/locale'

// Generate dynamic metadata based on typology
export async function generateMetadata({ params }) {
  const { slug } = await params
  const [typology, locale] = await Promise.all([getTypologyBySlug(slug), getLocale()])
  const isAr = locale === 'ar'
  
  if (!typology) {
    return {
      title: isAr ? 'تصنيف غير موجود | ميركا للعمارة' : 'Typology Not Found | MERKA Architecture',
    }
  }

  const title = isAr ? (typology.title_ar || typology.title) : typology.title
  const description = isAr
    ? (typology.description_ar || typology.description || `استكشف تصنيف المبنى ${title} - الخصائص واعتبارات التصميم والأمثلة.`)
    : (typology.description || `Explore ${typology.title} building typology - characteristics, design considerations, and examples.`)
  
  return {
    title: `${title} | ${isAr ? 'تصنيفات المباني | ميركا للعمارة' : 'Building Typologies | MERKA Architecture'}`,
    description,
    keywords: `${title}, ${isAr ? 'تصنيف مبنى, تصنيف معماري, ميركا للعمارة' : `building typology, architectural typology, MERKA Architecture`}`,
    openGraph: {
      title: `${title} | ${isAr ? 'ميركا للعمارة' : 'MERKA Architecture'}`,
      description,
      images: typology.image ? [typology.image] : ['/og-typologies.jpg'],
      type: 'article',
      locale: isAr ? 'ar_AE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${isAr ? 'ميركا للعمارة' : 'MERKA Architecture'}`,
      description,
      images: typology.image ? [typology.image] : ['/og-typologies.jpg'],
    },
    alternates: {
      languages: {
        'en': `/styles-and-typologies/typologies/${slug}`,
        'ar': `/ar/styles-and-typologies/typologies/${slug}`,
      },
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

  const pageUrl = `https://merka.ae/styles-and-typologies/typologies/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${typology.title} | Building Typologies | MERKA Architecture`,
        isPartOf: { '@id': 'https://merka.ae/#website' },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://merka.ae/' },
          { '@type': 'ListItem', position: 2, name: 'Styles & Typologies', item: 'https://merka.ae/styles-and-typologies' },
          { '@type': 'ListItem', position: 3, name: typology.title, item: pageUrl }
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
      <TypologyDetailClient typology={typology} />
    </>
  )
}
