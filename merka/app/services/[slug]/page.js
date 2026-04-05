import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/server-data'
import ServiceDetailClient from './ServiceDetailClient'
import { getLocale } from '@/lib/locale'

// Generate dynamic metadata based on service
export async function generateMetadata({ params }) {
  const { slug } = await params
  const [service, locale] = await Promise.all([getServiceBySlug(slug), getLocale()])
  const isAr = locale === 'ar'
  
  if (!service) {
    return {
      title: isAr ? 'خدمة غير موجودة | ميركا للعمارة' : 'Service Not Found | MERKA Architecture',
    }
  }

  const title = isAr ? (service.title_ar || service.title) : service.title
  const description = isAr
    ? (service.description_ar || service.description || `تعرف على خدمة ${title} - حلول معمارية احترافية من ميركا للعمارة.`)
    : (service.description || `Learn about our ${service.title} service - professional architectural solutions by MERKA Architecture.`)
  
  return {
    title: `${title} | ${isAr ? 'خدمات ميركا للعمارة' : 'MERKA Architecture Services'}`,
    description,
    keywords: `${title}, ${isAr ? 'خدمة معمارية, ميركا للعمارة, الإمارات' : `architectural service, ${service.slug}, MERKA Architecture, UAE`}`,
    openGraph: {
      title: `${title} | ${isAr ? 'ميركا للعمارة' : 'MERKA Architecture'}`,
      description,
      images: service.image ? [service.image] : ['/og-services.jpg'],
      type: 'article',
      locale: isAr ? 'ar_AE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${isAr ? 'ميركا للعمارة' : 'MERKA Architecture'}`,
      description,
      images: service.image ? [service.image] : ['/og-services.jpg'],
    },
    alternates: {
      languages: {
        'en': `/services/${slug}`,
        'ar': `/ar/services/${slug}`,
      },
    },
  }
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params
  
  // Fetch service data on the server
  const service = await getServiceBySlug(slug)
  
  if (!service) {
    notFound()
  }
  
  return <ServiceDetailClient service={service} />
}
