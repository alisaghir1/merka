'use client'
import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function BlogPost({ params }) {
  const { slug } = use(params)
  const supabase = createClient()
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch the blog post
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single()

        if (error) throw error
        setPost(data)

        // Fetch related posts
        if (data?.category) {
          const { data: related } = await supabase
            .from('blogs')
            .select('id, title, slug, excerpt, category, read_time, date, image')
            .eq('published', true)
            .eq('category', data.category)
            .neq('id', data.id)
            .limit(3)

          setRelatedPosts(related || [])
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const scrollValue = mounted ? scrollY : 0

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#877051] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-800">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-[#041533] mb-4">Article Not Found</h1>
          <p className="text-gray-800 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#041533] text-white px-6 py-3 rounded-lg hover:bg-[#877051] transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
        }}
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover opacity-30"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-[#877051]/20 to-[#041533]/20 rounded-full blur-3xl"
            style={{ 
              transform: mounted ? `translateY(${scrollValue * -0.3}px)` : 'translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-white/5 to-[#877051]/10 rounded-full blur-3xl"
            style={{ 
              transform: mounted ? `translateY(${scrollValue * 0.2}px)` : 'translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
            >
              Blog
            </Link>
            <span className="text-gray-400 mx-2">→</span>
            <span className="text-[#877051] text-sm">{post.category}</span>
          </div>

          {/* Category Badge */}
          {post.category && (
            <div className="mb-6">
              <span className="bg-[#877051] text-white px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>{post.author || 'Merka Architecture Team'}</span>
            <span>•</span>
            <span>{formatDate(post.date)}</span>
            {post.read_time && (
              <>
                <span>•</span>
                <span>{post.read_time}</span>
              </>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center text-white/60">
              <span className="text-sm mb-2 tracking-widest uppercase">Read Article</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Excerpt / Lead */}
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-12 font-serif italic border-l-4 border-[#877051] pl-6">
              {post.excerpt}
            </p>
          )}

          {/* Main Content */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-[#041533] prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#877051] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#041533]
              prose-ul:my-6 prose-li:text-gray-700
              prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Sections */}
          {post.sections && post.sections.length > 0 && (
            <div className="mt-16 space-y-16">
              {post.sections.map((section, index) => (
                <div key={index} className="border-t border-gray-200 pt-12">
                  {section.title && (
                    <h2 className="text-3xl font-serif font-bold text-[#041533] mb-6">
                      {section.title}
                    </h2>
                  )}
                  {section.image && (
                    <div className="relative w-full h-80 md:h-[500px] rounded-xl overflow-hidden mb-8">
                      <Image
                        src={section.image}
                        alt={section.title || `Section ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {section.content && (
                    <div 
                      className="prose prose-lg max-w-none
                        prose-headings:font-serif prose-headings:text-[#041533]
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-a:text-[#877051]"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-[#041533] mb-4">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-[#877051] hover:text-white transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#041533] mb-4">Share this article</h3>
            <div className="flex gap-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#0077B5] hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <button 
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Link copied to clipboard!')
                  }
                }}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#041533] hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#041533] mb-12 text-center">
              Related Articles
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="relative h-48 overflow-hidden">
                      {relatedPost.image ? (
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#041533] to-[#877051]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      {relatedPost.category && (
                        <span className="absolute bottom-4 left-4 bg-[#877051] text-white px-3 py-1 rounded-full text-xs">
                          {relatedPost.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-[#041533] group-hover:text-[#877051] transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="text-gray-800 text-sm line-clamp-2 mb-4">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(relatedPost.date)}</span>
                        {relatedPost.read_time && <span>{relatedPost.read_time}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog CTA */}
      <section className="py-16 bg-gradient-to-r from-[#041533] to-[#877051]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Explore More Insights
          </h2>
          <p className="text-gray-200 mb-8">
            Discover more articles about architecture, design, and construction in the UAE.
          </p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-white text-[#041533] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </section>
    </div>
  )
}
