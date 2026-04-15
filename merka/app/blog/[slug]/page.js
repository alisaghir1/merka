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

  const pageUrl = `https://merka.ae/blog/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#article`,
        headline: post.title,
        url: pageUrl,
        datePublished: post.date || undefined,
        dateModified: post.date || undefined,
        author: { '@id': 'https://merka.ae/#organization' },
        publisher: { '@id': 'https://merka.ae/#organization' },
        ...(post.image && { image: post.image }),
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` }
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        isPartOf: { '@id': 'https://merka.ae/#website' },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://merka.ae/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://merka.ae/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl }
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
      <BlogDetailClient post={post} relatedPosts={relatedPosts} />
    </>
  )
}
