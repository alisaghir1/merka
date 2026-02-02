import { getBlogs } from '@/lib/server-data'
import BlogPageClient from './BlogPageClient'

// Metadata for SEO
export const metadata = {
  title: 'Blog | MERKA Architecture',
  description: 'Stay updated with the latest insights, trends, and news from MERKA Architecture. Explore our articles on architecture, design, and the UAE construction industry.',
  keywords: 'architecture blog, design insights, UAE architecture news, MERKA blog, architectural trends',
  openGraph: {
    title: 'Blog | MERKA Architecture',
    description: 'Latest insights and news from MERKA Architecture.',
    images: ['/og-blog.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | MERKA Architecture',
    description: 'Latest insights and news from MERKA Architecture.',
    images: ['/og-blog.jpg'],
  },
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  // Fetch blogs on the server
  const blogs = await getBlogs({ published: true })
  
  return <BlogPageClient initialBlogs={blogs} />
}
