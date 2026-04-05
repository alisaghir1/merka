import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjects } from '@/lib/server-data'
import ProjectDetailClient from './ProjectDetailClient'
import { getLocale } from '@/lib/locale'

// Generate dynamic metadata based on project
export async function generateMetadata({ params }) {
  const { slug } = await params
  const [project, locale] = await Promise.all([getProjectBySlug(slug), getLocale()])
  const isAr = locale === 'ar'
  
  if (!project) {
    return {
      title: isAr ? 'مشروع غير موجود | ميركا للعمارة' : 'Project Not Found | MERKA Architecture',
    }
  }

  const title = isAr ? (project.title_ar || project.title) : project.title
  const description = isAr
    ? (project.description_ar || project.description || `استكشف ${title} - مشروع معماري متميز من ميركا للعمارة.`)
    : (project.description || `Explore ${project.title} - a premium architectural project by MERKA Architecture.`)
  
  return {
    title: `${title} | ${isAr ? 'مشاريع ميركا للعمارة' : 'MERKA Architecture Projects'}`,
    description,
    keywords: `${title}, ${isAr ? 'مشروع معماري, ميركا للعمارة, الإمارات' : `architecture project, ${project.category || 'design'}, MERKA Architecture, UAE`}`,
    openGraph: {
      title: `${title} | ${isAr ? 'ميركا للعمارة' : 'MERKA Architecture'}`,
      description,
      images: project.images?.[0] ? [project.images[0]] : ['/og-projects.jpg'],
      type: 'article',
      locale: isAr ? 'ar_AE' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${isAr ? 'ميركا للعمارة' : 'MERKA Architecture'}`,
      description,
      images: project.images?.[0] ? [project.images[0]] : ['/og-projects.jpg'],
    },
    alternates: {
      languages: {
        'en': `/projects/${slug}`,
        'ar': `/ar/projects/${slug}`,
      },
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
