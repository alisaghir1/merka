import { getServices } from '@/lib/server-data'
import ServicesPageClient from './ServicesPageClient'

// Metadata for SEO
export const metadata = {
  title: 'Our Services | MERKA Architecture',
  description: 'Explore our comprehensive architectural services including conceptual design, schematic design, construction drawings, and more.',
  keywords: 'architectural services, design services, construction drawings, UAE architecture, Dubai design',
  openGraph: {
    title: 'Our Services | MERKA Architecture',
    description: 'Comprehensive architectural design services.',
    images: ['/og-services.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | MERKA Architecture',
    description: 'Comprehensive architectural design services.',
    images: ['/og-services.jpg'],
  },
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  // Fetch services on the server
  const services = await getServices({ published: true })
  
  return <ServicesPageClient initialServices={services} />
}
