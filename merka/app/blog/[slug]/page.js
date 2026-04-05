import { notFound } from 'next/navigation'
import { getBlogBySlug, getBlogs } from '@/lib/server-data'
import BlogDetailClient from './BlogDetailClient'
import { getLocale } from '@/lib/locale'

// Generate dynamic metadata based on blog post
export async function generateMetadata({ params }) {
  const { slug } = await params
  const [post, locale] = await Promise.all([getBlogBySlug(slug), getLocale()])
  const isAr = locale === 'ar'
  
  if (!post) {
    return {
      title: isAr ? 'مقال غير موجود | ميركا للعمارة' : 'Blog Post Not Found | MERKA Architecture',
    }
  }

  const title = isAr ? (post.title_ar || post.title) : post.title
  const description = isAr
    ? (post.excerpt_ar || post.description_ar || post.excerpt || post.description || `اقرأ ${title} - مقال من ميركا للعمارة.`)
    : (post.excerpt || post.description || `Read ${title} - an insightful article from MERKA Architecture.`)
  
  return {
    title: `${title} | ${isAr ? 'مدونة ميركا للعمارة' : 'MERKA Architecture Blog'}`,
    description,
    keywords: `${title}, ${post.category || 'architecture'}, ${isAr ? 'مدونة ميركا, رؤى معمارية' : 'MERKA blog, architectural insights'}`,
    openGraph: {
      title: `${title} | ${isAr ? 'ميركا للعمارة' : 'MERKA Architecture'}`,
      description,
      images: post.image ? [post.image] : ['/og-blog.jpg'],
      type: 'article',
      locale: isAr ? 'ar_AE' : 'en_US',
      publishedTime: post.date,
      authors: [post.author || (isAr ? 'ميركا للعمارة' : 'MERKA Architecture')],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${isAr ? 'ميركا للعمارة' : 'MERKA Architecture'}`,
      description,
      images: post.image ? [post.image] : ['/og-blog.jpg'],
    },
    alternates: {
      languages: {
        'en': `/blog/${slug}`,
        'ar': `/ar/blog/${slug}`,
      },
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
