import { getBlogs } from '@/lib/server-data'
import BlogPageClient from './BlogPageClient'
import { getLocale, buildMetadata } from '@/lib/locale'

export async function generateMetadata() {
  const locale = await getLocale()
  return buildMetadata('blog', locale, {
    openGraph: { images: ['/og-blog.jpg'] },
    twitter: { images: ['/og-blog.jpg'] },
    enPath: '/blog',
    arPath: '/ar/blog',
  })
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  // Fetch blogs on the server
  const blogs = await getBlogs({ published: true })
  
  return <BlogPageClient initialBlogs={blogs} />
}
