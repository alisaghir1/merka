import { getServices, getProjects } from '@/lib/server-data'
import HomeClient from './HomeClient'

// Metadata for SEO
export const metadata = {
  title: 'MERKA Architecture | Premium Architectural Design in UAE',
  description: 'MERKA Architecture offers premium architectural design services in the UAE. We specialize in residential, commercial, and hospitality projects with innovative design solutions.',
  keywords: 'architecture, design, UAE, Dubai, Abu Dhabi, residential, commercial, hospitality, interior design',
  openGraph: {
    title: 'MERKA Architecture | Premium Architectural Design',
    description: 'Premium architectural design services in the UAE',
    images: ['/og-home.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MERKA Architecture | Premium Architectural Design',
    description: 'Premium architectural design services in the UAE',
    images: ['/og-home.jpg'],
  },
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch data on the server
  const [services, featuredProjects] = await Promise.all([
    getServices({ published: true }),
    getProjects({ published: true, featured: true, limit: 6 })
  ])
  
  return <HomeClient initialServices={services} initialProjects={featuredProjects} />
}
