import { notFound } from 'next/navigation'
import { getServiceBySlug } from '@/lib/server-data'
import ServiceDetailClient from './ServiceDetailClient'

// Generate dynamic metadata based on service
export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  
  if (!service) {
    return {
      title: 'Service Not Found | MERKA Architecture',
    }
  }
  
  return {
    title: `${service.title} | MERKA Architecture Services`,
    description: service.description || `Learn about our ${service.title} service - professional architectural solutions by MERKA Architecture.`,
    keywords: `${service.title}, architectural service, ${service.slug}, MERKA Architecture, UAE`,
    openGraph: {
      title: `${service.title} | MERKA Architecture`,
      description: service.description,
      images: service.image ? [service.image] : ['/og-services.jpg'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | MERKA Architecture`,
      description: service.description,
      images: service.image ? [service.image] : ['/og-services.jpg'],
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
