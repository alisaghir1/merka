'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    title: "2025 Architectural Trends Shaping the UAE's Built Environment",
    slug: "2025-architectural-trends-shaping-uae-built-environment",
    excerpt: "Discover the cutting-edge architectural trends that will define the UAE's skyline in 2025, from sustainable innovations to smart building technologies.",
    category: "Trends & Innovation",
    readTime: "8 min read",
    date: "December 15, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Designing for Site: Coastal vs Desert Architecture in the UAE",
    slug: "designing-for-site-coastal-vs-desert-architecture-uae",
    excerpt: "Understanding how site conditions drive architectural decisions in the UAE's diverse landscapes, from beachfront developments to desert oases.",
    category: "Site Planning",
    readTime: "6 min read",
    date: "December 10, 2024",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
  },
  {
    id: 3,
    title: "Designing Mosques in the UAE: Architecture, Regulation, and Spatial Logic",
    slug: "designing-mosques-uae-architecture-regulation-spatial-logic",
    excerpt: "A comprehensive guide to mosque design in the UAE, covering traditional elements, modern interpretations, and regulatory requirements.",
    category: "Religious Architecture",
    readTime: "10 min read",
    date: "December 8, 2024",
    image: "https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=800&q=80"
  },
  {
    id: 4,
    title: "Facade Design Regulations in Dubai: What Every Project Must Address",
    slug: "facade-design-regulations-dubai-what-every-project-must-address",
    excerpt: "Navigate Dubai's facade design regulations with confidence. Essential compliance requirements for successful project approvals.",
    category: "Regulations & Compliance",
    readTime: "7 min read",
    date: "December 5, 2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
  },
  {
    id: 5,
    title: "Integrating BIM into Architecture: A Project-Based Approach in the UAE",
    slug: "integrating-bim-into-architecture-project-based-approach-uae",
    excerpt: "Learn how Building Information Modeling is revolutionizing architectural practice in the UAE, from design to construction.",
    category: "Technology & Innovation",
    readTime: "9 min read",
    date: "December 1, 2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    id: 6,
    title: "Material Selection in UAE Architecture: Strategy, Durability, and Compliance",
    slug: "material-selection-uae-architecture-strategy-durability-compliance",
    excerpt: "Master the art of material selection for UAE projects, balancing performance, aesthetics, and regulatory compliance.",
    category: "Materials & Construction",
    readTime: "8 min read",
    date: "November 28, 2024",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
  },
  {
    id: 7,
    title: "Passive Design in UAE Architecture: Responding to Heat, Not Fighting It",
    slug: "passive-design-uae-architecture-responding-to-heat-not-fighting-it",
    excerpt: "Embrace traditional wisdom and modern innovation in passive cooling strategies that work with UAE's climate, not against it.",
    category: "Sustainable Design",
    readTime: "7 min read",
    date: "November 25, 2024",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80"
  },
  {
    id: 8,
    title: "Understanding Authority Submissions in Dubai: A Step-by-Step Guide for Architecture Projects",
    slug: "understanding-authority-submissions-dubai-step-by-step-guide-architecture-projects",
    excerpt: "Navigate Dubai's approval process with ease. A comprehensive guide to authority submissions for architectural projects.",
    category: "Project Management",
    readTime: "12 min read",
    date: "November 20, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
  },
  {
    id: 9,
    title: "Urban Heat and Architecture: Site Planning Strategies in the UAE",
    slug: "urban-heat-and-architecture-site-planning-strategies-uae",
    excerpt: "Combat urban heat islands through intelligent architectural planning and site design strategies specific to UAE conditions.",
    category: "Urban Planning",
    readTime: "9 min read",
    date: "November 18, 2024",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80"
  },
  {
    id: 10,
    title: "Value Engineering in Architecture: Making Smart Decisions Early",
    slug: "value-engineering-in-architecture-making-smart-decisions-early",
    excerpt: "Maximize project value through strategic decision-making. Learn how value engineering principles enhance architectural outcomes.",
    category: "Project Strategy",
    readTime: "6 min read",
    date: "November 15, 2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
  }
]

const categories = [
  "All Posts",
  "Trends & Innovation", 
  "Site Planning",
  "Religious Architecture",
  "Regulations & Compliance",
  "Technology & Innovation",
  "Materials & Construction",
  "Sustainable Design",
  "Project Management",
  "Urban Planning",
  "Project Strategy"
]

export default function BlogPage() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All Posts")
  const heroRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollValue = mounted ? scrollY : 0
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)
  
  const filteredPosts = selectedCategory === "All Posts" 
    ? regularPosts 
    : regularPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Geometric shapes */}
          <div 
            className="absolute top-20 left-20 w-64 h-64 border-2 border-white/20 rotate-45"
            style={{ 
              transform: mounted 
                ? `translateY(${scrollValue * 0.3}px) rotate(${45 + scrollValue * 0.1}deg)` 
                : 'translateY(0px) rotate(45deg)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white/20 rounded-full"
            style={{ 
              transform: mounted 
                ? `translateY(${scrollValue * -0.2}px) scale(${1 + scrollValue * 0.0005})` 
                : 'translateY(0px) scale(1)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              transform: mounted ? `translateY(${scrollValue * 0.1}px)` : 'translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          
          {/* Floating blobs */}
          <div 
            className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-[#877051]/10 to-[#041533]/10 rounded-full blur-3xl"
            style={{ 
              transform: mounted ? `translateY(${scrollValue * -0.3}px)` : 'translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#041533]/10 to-[#877051]/10 rounded-full blur-2xl"
            style={{ 
              transform: mounted ? `translateY(${scrollValue * 0.4}px)` : 'translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
        </div>

        <div 
          className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ 
            transform: mounted ? `translateY(${scrollValue * 0.2}px)` : 'translateY(0px)',
            opacity: mounted ? Math.max(0, 1 - scrollValue * 0.002) : 1
          }}
        >
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#877051] to-[#041533] rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
              <span className="text-white text-2xl">📝</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-500">INSIGHTS</span>
            <span className="block text-[#877051] hover:text-white transition-colors duration-500">&</span>
            <span className="block hover:scale-110 transition-transform duration-500">EXPERTISE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed hover:text-white transition-colors duration-500">
            Explore architectural knowledge, industry insights, and expert perspectives on designing for the UAE's unique environment.
          </p>
        </div>

        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: mounted ? Math.max(0, 1 - scrollValue * 0.01) : 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 animate-pulse">Discover Our Insights</span>
            <div className="animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Transition */}
      <div className="relative h-32 bg-gradient-to-b from-[#041533] to-white"></div>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
                Featured Article
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto"></div>
            </div>

            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <div className="group cursor-pointer">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative h-96 lg:h-[500px] bg-gray-200 rounded-2xl overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/20 transition-colors duration-300"></div>
                    <div className="absolute top-6 left-6">
                      <span className="bg-[#877051] text-white px-4 py-2 rounded-full text-sm font-medium">
                        {featuredPost.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#041533] group-hover:text-[#877051] transition-colors duration-300 leading-tight">
                      {featuredPost.title}
                    </h3>

                    <p className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center text-[#041533] font-medium group-hover:text-[#877051] transition-colors duration-300">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Read Full Article</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#041533] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-[#041533] hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                <article className="group cursor-pointer">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                    <div className="relative h-64 bg-gray-200">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-[#041533] px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center text-xs text-gray-500 mb-4 space-x-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-xl font-serif font-bold text-[#041533] mb-4 group-hover:text-[#877051] transition-colors duration-300 leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center text-[#041533] text-sm font-medium group-hover:text-[#877051] transition-colors duration-300">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">Read Article</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#041533] mb-6">
            Stay Updated with Our Latest Insights
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest architectural trends, project insights, and industry expertise delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#041533] focus:border-transparent"
            />
            <button className="bg-[#041533] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#877051] hover:scale-105 transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
        }}
      >
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-white/5 to-[#877051]/10 rounded-full blur-3xl"
            style={{ transform: mounted ? `translateY(${scrollValue * 0.15}px) scale(${1 + scrollValue * 0.0003})` : 'translateY(0px) scale(1)' }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-[#041533]/10 to-white/5 rounded-full blur-2xl"
            style={{ transform: mounted ? `translateY(${scrollValue * -0.2}px)` : 'translateY(0px)' }}
          ></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 hover:scale-105 transition-transform duration-300">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-200 mb-8 hover:text-white transition-colors duration-300">
            Let our expertise guide your architectural vision from concept to completion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-[#041533] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                Start Your Project
              </button>
            </Link>
            <Link href="/projects">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#041533] hover:scale-105 transition-all duration-300">
                View Our Work
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}