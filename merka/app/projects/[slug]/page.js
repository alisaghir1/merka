import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjects } from '@/lib/server-data'
import ProjectDetailClient from './ProjectDetailClient'

// Generate dynamic metadata based on project
export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found | MERKA Architecture',
    }
  }
  
  return {
    title: `${project.title} | MERKA Architecture Projects`,
    description: project.description || `Explore ${project.title} - a premium architectural project by MERKA Architecture.`,
    keywords: `${project.title}, architecture project, ${project.category || 'design'}, MERKA Architecture, UAE`,
    openGraph: {
      title: `${project.title} | MERKA Architecture`,
      description: project.description,
      images: project.images?.[0] ? [project.images[0]] : ['/og-projects.jpg'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | MERKA Architecture`,
      description: project.description,
      images: project.images?.[0] ? [project.images[0]] : ['/og-projects.jpg'],
    },
  }
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params
  
  // Fetch project data on the server
  const project = await getProjectBySlug(slug)
  
  if (!project) {
    notFound()
  }
  
  // Fetch all projects for related projects section
  const allProjects = await getProjects({ published: true })
  
  return <ProjectDetailClient project={project} allProjects={allProjects} />
}
