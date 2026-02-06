'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

export default function BlogPageClient({ initialBlogs = [], categories = [] }) {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const heroRef = useRef(null)
  const { t, isRTL, language } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter blogs based on category and search
  const filteredBlogs = initialBlogs.filter(blog => {
    const matchesCategory = activeCategory === 'all' || blog.category === activeCategory
    const title = language === 'ar' && blog.title_ar ? blog.title_ar : blog.title
    const excerpt = language === 'ar' && blog.excerpt_ar ? blog.excerpt_ar : blog.excerpt
    const matchesSearch = !searchQuery || 
      title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Separate featured and regular posts
  const featuredPost = filteredBlogs.find(blog => blog.featured)
  const regularPosts = filteredBlogs.filter(blog => !blog.featured)

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

  // Get unique categories from blogs
  const uniqueCategories = ['all', ...new Set(initialBlogs.map(b => b.category).filter(Boolean))]

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : ''}`}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#041533] via-[#0a2a5c] to-[#041533]"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 rounded-full text-sm font-medium mb-6">
            {t('blog.hero.subtitle')}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 leading-[1.1]">
            {t('blog.hero.title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10">
            {t('blog.hero.description')}
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className={`relative flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <input
                type="text"
                placeholder={t('blog.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#877051] focus:border-transparent ${isRTL ? 'pr-14' : 'pl-14'}`}
              />
              <svg 
                className={`absolute ${isRTL ? 'right-5' : 'left-5'} w-5 h-5 text-gray-400`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide ${isRTL ? 'flex-row-reverse' : ''}`}>
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#041533] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category === 'all' ? t('blog.filter.all') : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
              <span className="inline-block px-4 py-2 bg-[#877051]/10 text-[#877051] rounded-full text-sm font-medium">
                {t('blog.featured.title')}
              </span>
            </div>

            <Link href={`/blog/${featuredPost.slug}`}>
              <article className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col lg:flex-row ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className="relative w-full lg:w-3/5 aspect-[16/9] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                  {featuredPost.image ? (
                    <Image
                      src={featuredPost.image}
                      alt={language === 'ar' && featuredPost.title_ar ? featuredPost.title_ar : featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.classList.add('bg-gradient-to-br', 'from-[#041533]', 'to-[#877051]');
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#041533] to-[#877051]"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/30"></div>
                </div>

                {/* Content */}
                <div className={`relative lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {featuredPost.category && (
                      <span className="px-3 py-1 bg-[#041533]/10 text-[#041533] rounded-full text-sm font-medium">
                        {language === 'ar' && featuredPost.category_ar ? featuredPost.category_ar : featuredPost.category}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm">{language === 'ar' && featuredPost.read_time_ar ? featuredPost.read_time_ar : (featuredPost.read_time || featuredPost.readTime)}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#041533] mb-4 group-hover:text-[#877051] transition-colors">
                    {language === 'ar' && featuredPost.title_ar ? featuredPost.title_ar : featuredPost.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {language === 'ar' && featuredPost.excerpt_ar ? featuredPost.excerpt_ar : featuredPost.excerpt}
                  </p>
                  <div className={`flex items-center gap-4 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>{formatDate(featuredPost.date)}</span>
                  </div>
                  <div className={`mt-6 flex items-center gap-2 text-[#877051] font-semibold group-hover:gap-4 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {t('blog.readArticle')}
                    <svg className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-12 ${isRTL ? 'text-right' : ''}`}>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#041533] mb-4">
              {t('blog.allArticles')}
            </h2>
            <p className="text-gray-600">
              {filteredBlogs.length} {t('blog.articlesFound')}
            </p>
          </div>

          {regularPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={language === 'ar' && post.title_ar ? post.title_ar : post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#041533] to-[#877051]"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      {post.category && (
                        <span className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} px-3 py-1 bg-white/90 backdrop-blur-sm text-[#041533] rounded-full text-xs font-medium`}>
                          {post.category}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`p-6 flex-1 flex flex-col ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center gap-3 text-sm text-gray-500 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span>{language === 'ar' && post.read_time_ar ? post.read_time_ar : (post.read_time || post.readTime)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#041533] mb-3 line-clamp-2 group-hover:text-[#877051] transition-colors">
                        {language === 'ar' && post.title_ar ? post.title_ar : post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4 flex-1">
                        {language === 'ar' && post.excerpt_ar ? post.excerpt_ar : post.excerpt}
                      </p>
                      <div className={`flex items-center gap-2 text-[#877051] font-medium text-sm group-hover:gap-3 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
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
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">{t('blog.noArticles')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#041533]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
            {t('blog.newsletter.title')}
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t('blog.newsletter.description')}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder')}
              className={`flex-1 px-6 py-4 rounded-xl border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#877051] ${isRTL ? 'text-right' : ''}`}
            />
            <button className="px-8 py-4 bg-[#877051] text-white rounded-xl font-semibold hover:bg-[#6d5a41] transition-colors">
              {t('blog.newsletter.subscribe')}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
