import { notFound } from 'next/navigation'
import { getStyleBySlug } from '@/lib/server-data'
import StyleDetailClient from './StyleDetailClient'
import { getLocale } from '@/lib/locale'

// Generate dynamic metadata based on style
export async function generateMetadata({ params }) {
  const { slug } = await params
  const [style, locale] = await Promise.all([getStyleBySlug(slug), getLocale()])
  const isAr = locale === 'ar'
  
  if (!style) {
    return {
      title: isAr ? 'نمط غير موجود | ميركا للعمارة' : 'Style Not Found | MERKA Architecture',
    }
  }

  const title = isAr ? (style.title_ar || style.title) : style.title
  const description = isAr
    ? (style.description_ar || style.description || `استكشف النمط المعماري ${title} - الخصائص والتاريخ والأمثلة.`)
    : (style.description || `Explore ${style.title} architectural style - characteristics, history, and examples.`)
  
  return {
    title: `${title} | ${isAr ? 'الأساليب المعمارية | ميركا للعمارة' : 'Architectural Styles | MERKA Architecture'}`,
    description,
    keywords: `${title}, ${isAr ? 'نمط معماري, أسلوب تصميم, ميركا للعمارة' : `architectural style, design style, MERKA Architecture`}`,
    openGraph: {
      title: `${title} | ${isAr ? 'ميركا للعمارة' : 'MERKA Architecture'}`,
      description,
      images: style.image ? [style.image] : ['/og-styles.jpg'],
      type: 'article',
      locale: isAr ? 'ar_AE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${isAr ? 'ميركا للعمارة' : 'MERKA Architecture'}`,
      description,
      images: style.image ? [style.image] : ['/og-styles.jpg'],
    },
    alternates: {
      languages: {
        'en': `/styles-and-typologies/styles/${slug}`,
        'ar': `/ar/styles-and-typologies/styles/${slug}`,
      },
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
