'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

export default function BlogDetailClient({ post, relatedPosts = [] }) {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { t, isRTL, language } = useLanguage()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollValue = mounted ? scrollY : 0

  // Get localized content
  const postTitle = language === 'ar' && post.title_ar ? post.title_ar : post.title
  const postExcerpt = language === 'ar' && post.excerpt_ar ? post.excerpt_ar : post.excerpt
  const postContent = language === 'ar' && post.content_ar ? post.content_ar : post.content
  const postReadTime = language === 'ar' && post.read_time_ar ? post.read_time_ar : (post.read_time || post.readTime)
  const postAuthor = language === 'ar' && post.author_ar ? post.author_ar : (post.author || t('blog.detail.author'))
  const postTags = language === 'ar' && post.tags_ar && post.tags_ar.length > 0 ? post.tags_ar : post.tags

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-AE' : 'en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : ''}`}>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {post.image ? (
            <Image
              src={post.image}
              alt={postTitle}
              fill
              className="object-cover"
              style={{ transform: `translateY(${scrollValue * 0.3}px)` }}
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#041533] to-[#877051]"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Breadcrumb */}
          <nav className={`flex items-center gap-2 text-sm text-gray-300 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[200px]">{postTitle}</span>
          </nav>

          {/* Meta */}
          <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {post.category && (
              <span className="px-4 py-1.5 bg-[#877051] text-white rounded-full text-sm font-medium">
                {language === 'ar' && post.category_ar ? post.category_ar : post.category}
              </span>
            )}
            <span className="text-gray-300 text-sm">{formatDate(post.date)}</span>
            <span className="text-gray-300 text-sm">{postReadTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-6">
            {postTitle}
          </h1>

          {/* Excerpt */}
          {postExcerpt && (
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl">
              {postExcerpt}
            </p>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Author and Share */}
          <div className={`flex items-center justify-between mb-12 pb-8 border-b border-gray-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-[#041533] to-[#877051] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <div>
                <p className="font-semibold text-[#041533]">{postAuthor}</p>
                <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm text-gray-500 hidden sm:block">{t('blog.detail.share')}</span>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#041533] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#041533] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Main Content */}
          {postContent && (
            <article 
              className={`prose prose-lg lg:prose-xl max-w-none
                prose-headings:font-serif prose-headings:text-[#041533] prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-800 prose-p:leading-relaxed
                prose-a:text-[#877051] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#041533]
                prose-ul:my-6 prose-li:text-gray-800
                prose-img:rounded-2xl prose-img:shadow-lg
                prose-blockquote:border-l-[#877051] prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                ${isRTL ? 'text-right' : ''}`}
              dangerouslySetInnerHTML={{ __html: postContent }}
            />
          )}

          {/* Tags */}
          {postTags && postTags.length > 0 && (
            <div className={`mt-12 pt-8 border-t border-gray-200 ${isRTL ? 'text-right' : ''}`}>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">{t('blog.detail.tags')}</h4>
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {postTags.map((tag, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-[#041533] hover:text-white transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`mb-12 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#041533] mb-4">
                {t('blog.detail.relatedArticles')}
              </h2>
              <p className="text-gray-600">{t('blog.detail.moreReading')}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {relatedPost.image ? (
                        <Image
                          src={relatedPost.image}
                          alt={language === 'ar' && relatedPost.title_ar ? relatedPost.title_ar : relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#041533] to-[#877051]"></div>
                      )}
                    </div>
                    <div className={`p-6 ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center gap-3 text-sm text-gray-500 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{formatDate(relatedPost.date)}</span>
                        <span>•</span>
                        <span>{relatedPost.read_time || relatedPost.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#041533] mb-3 line-clamp-2 group-hover:text-[#877051] transition-colors">
                        {language === 'ar' && relatedPost.title_ar ? relatedPost.title_ar : relatedPost.title}
                      </h3>
                      <div className={`flex items-center gap-2 text-[#877051] font-medium text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {t('blog.readMore')}
                        <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="/blog"
            className={`inline-flex items-center gap-3 text-[#041533] font-semibold hover:text-[#877051] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <svg className={`w-5 h-5 ${isRTL ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            {t('blog.detail.backToBlog')}
          </Link>
        </div>
      </section>
    </div>
  )
}
