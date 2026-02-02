import { notFound } from 'next/navigation'
import { getBlogBySlug, getBlogs } from '@/lib/server-data'
import BlogDetailClient from './BlogDetailClient'

// Generate dynamic metadata based on blog post
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlogBySlug(slug)
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | MERKA Architecture',
    }
  }
  
  return {
    title: `${post.title} | MERKA Architecture Blog`,
    description: post.excerpt || post.description || `Read ${post.title} - an insightful article from MERKA Architecture.`,
    keywords: `${post.title}, ${post.category || 'architecture'}, MERKA blog, architectural insights`,
    openGraph: {
      title: `${post.title} | MERKA Architecture`,
      description: post.excerpt || post.description,
      images: post.image ? [post.image] : ['/og-blog.jpg'],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'MERKA Architecture'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | MERKA Architecture`,
      description: post.excerpt || post.description,
      images: post.image ? [post.image] : ['/og-blog.jpg'],
    },
  }
}

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  
  // Fetch blog post on the server
  const post = await getBlogBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  // Fetch related posts (same category)
  const allBlogs = await getBlogs({ published: true })
  const relatedPosts = allBlogs
    .filter(blog => blog.slug !== slug && blog.category === post.category)
    .slice(0, 3)
  
  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />
}
