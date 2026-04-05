import { getServices, getProjects } from '@/lib/server-data'
import HomeClient from './HomeClient'
import { getLocale, buildMetadata } from '@/lib/locale'

// Dynamic metadata for SEO (locale-aware)
export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('home', locale, {
    openGraph: { images: ['/og-home.jpg'] },
    twitter: { images: ['/og-home.jpg'] },
    enPath: '/',
    arPath: '/ar',
  })
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
