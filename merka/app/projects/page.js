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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://merka.ae/projects#webpage',
        url: 'https://merka.ae/projects',
        name: 'Our Projects | MERKA Architecture',
        isPartOf: { '@id': 'https://merka.ae/#website' },
        breadcrumb: { '@id': 'https://merka.ae/projects#breadcrumb' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://merka.ae/projects#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://merka.ae/' },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://merka.ae/projects' }
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
      <ProjectsPageClient initialProjects={projects} />
    </>
  )
}
