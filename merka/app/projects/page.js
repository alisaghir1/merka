import { getProjects } from '@/lib/server-data'
import ProjectsPageClient from './ProjectsPageClient'
import { getLocale, buildMetadata } from '@/lib/locale'

export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('projects', locale, {
    openGraph: { images: ['/og-projects.jpg'] },
    twitter: { images: ['/og-projects.jpg'] },
    enPath: '/projects',
    arPath: '/ar/projects',
  })
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  // Fetch projects on the server
  const projects = await getProjects({ published: true })
  
  return <ProjectsPageClient initialProjects={projects} />
}
