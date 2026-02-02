import { getProjects } from '@/lib/server-data'
import ProjectsPageClient from './ProjectsPageClient'

// Metadata for SEO
export const metadata = {
  title: 'Our Projects | MERKA Architecture',
  description: 'Explore our portfolio of architectural projects including residential, commercial, and hospitality designs in the UAE.',
  keywords: 'architecture projects, UAE projects, Dubai architecture, residential design, commercial architecture',
  openGraph: {
    title: 'Our Projects | MERKA Architecture',
    description: 'Explore our portfolio of architectural projects.',
    images: ['/og-projects.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects | MERKA Architecture',
    description: 'Explore our portfolio of architectural projects.',
    images: ['/og-projects.jpg'],
  },
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  // Fetch projects on the server
  const projects = await getProjects({ published: true })
  
  return <ProjectsPageClient initialProjects={projects} />
}
