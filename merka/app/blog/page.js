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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://merka.ae/blog#webpage',
        url: 'https://merka.ae/blog',
        name: 'Blog | MERKA Architecture',
        isPartOf: { '@id': 'https://merka.ae/#website' },
        breadcrumb: { '@id': 'https://merka.ae/blog#breadcrumb' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://merka.ae/blog#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://merka.ae/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://merka.ae/blog' }
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
      <BlogPageClient initialBlogs={blogs} />
    </>
  )
}
