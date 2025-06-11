'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { blogPostsData } from '../../data/blogs.js'

export default function BlogPost() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollValue = mounted ? scrollY : 0
  const currentPost = blogPostsData[3] // Fourth blog post (facade regulations)
  const relatedPosts = blogPostsData
    .filter(p => p.id !== currentPost.id && p.category === currentPost.category)
    .slice(0, 3)

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
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
            alt="Facade Design Regulations Dubai"
            fill
            className="object-cover opacity-30"
          />
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
            <span className="text-[#877051] text-sm">Regulations & Compliance</span>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-[#877051] text-white px-4 py-2 rounded-full text-sm font-medium">
              Regulations & Compliance
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Facade Design Regulations in Dubai: What Every Project Must Address
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>Merka Architecture Team</span>
            <span>•</span>
            <span>December 5, 2024</span>
            <span>•</span>
            <span>9 min read</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Facade Regulations", "Dubai Compliance", "Building Codes", "Design Standards"].map((tag, index) => (
              <span 
                key={index}
                className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: mounted ? Math.max(0, 1 - scrollValue * 0.01) : 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 animate-pulse">Read Article</span>
            <div className="animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Facade design in Dubai is not only a matter of aesthetics. It is subject to regulatory scrutiny, technical coordination, and performance-based approval. Each development zone—from Business Bay to Dubai South—applies specific guidelines that control material use, shading, thermal behavior, and maintenance access.
            </p>
            
            <p className="mb-8">
              Mirka Architecture, an architecture design company based in Dubai, delivers façade systems that comply with authority regulations while maintaining architectural clarity. This article outlines the main façade-related rules, typical approval processes, and documentation required for construction in the UAE.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              1. Regulating Authorities and Jurisdictions
            </h2>
            <p className="mb-6">
              Facade regulations vary depending on the project's location. In Dubai, three main entities oversee architectural design:
            </p>
            <ul className="mb-8 space-y-2">
              <li><strong>Dubai Municipality (DM):</strong> Governs most general-use plots outside free zones</li>
              <li><strong>Dubai Development Authority (DDA):</strong> Covers districts like Dubai Internet City, D3, Barsha Heights, and Dubai Studio City</li>
              <li><strong>Trakhees:</strong> Regulates projects in Palm Jumeirah, Dubai South, JAFZA, and Nakheel developments</li>
            </ul>
            <p className="mb-8">
              Each authority issues façade control guidelines, which affect cladding materials, window-to-wall ratios, shading strategies, and reflectivity.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              2. Material Restrictions and Fire Rating Requirements
            </h2>
            <p className="mb-6">
              Material selection is closely monitored to prevent façade failure, fire spread, and long-term degradation.
            </p>
            <p className="mb-6">
              Requirements include:
            </p>
            <ul className="mb-8 space-y-2">
              <li><strong>Fire-rated cladding systems:</strong> Only tested and certified systems are permitted</li>
              <li><strong>Aluminum composite panels (ACP):</strong> Must comply with UAE Civil Defense fire performance standards</li>
              <li><strong>Natural stone:</strong> Must be installed using ventilated or mechanically fixed systems</li>
              <li><strong>Glass:</strong> Must meet specified U-value and Solar Heat Gain Coefficient (SHGC) limits</li>
              <li><strong>Paints and coatings:</strong> Must be UV-stable and non-peeling under solar exposure</li>
            </ul>
            <p className="mb-8">
              Mirka Architecture selects materials based on compliance with authority criteria and submits full documentation, including test reports and certificates from approved UAE labs.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              3. Glazing Ratio and Thermal Performance
            </h2>
            <p className="mb-6">
              Dubai authorities limit the amount of glazing allowed on façades to control internal heat gain and reduce energy demand.
            </p>
            <p className="mb-6">
              Typical standards include:
            </p>
            <ul className="mb-8 space-y-2">
              <li><strong>Glazing ratio:</strong> Must remain below 40–50% of total façade area in many districts</li>
              <li><strong>SHGC:</strong> Values must meet or fall below local limits (often &lt; 0.3 for habitable spaces)</li>
              <li><strong>U-value compliance:</strong> Glazing and window frame systems must meet minimum insulation thresholds</li>
              <li><strong>Orientation-specific restrictions:</strong> West-facing glazing is heavily scrutinized</li>
            </ul>
            <p className="mb-8">
              Projects failing to meet these standards may require redesign or additional shading systems. Mirka conducts performance simulations to confirm compliance before submission.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              4. Shading Elements and Passive Systems
            </h2>
            <p className="mb-6">
              Passive shading devices are often required—not optional. DDA and DM guidelines encourage the use of projections, louvers, fins, and overhangs to manage solar gain.
            </p>
            <p className="mb-6">
              Common requirements include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Horizontal shading for south-facing façades</li>
              <li>Vertical fins or patterned screens for east/west sides</li>
              <li>Minimum projection depths based on solar study</li>
              <li>Integration with structural slabs or architectural framework</li>
              <li>Coordination with window openings, duct paths, and lighting</li>
            </ul>
            <p className="mb-8">
              Mirka Architecture uses simulation tools to verify shading effectiveness and includes sun-path analysis diagrams in the submission package.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              5. Façade Maintenance and Access Planning
            </h2>
            <p className="mb-6">
              All façade systems must demonstrate maintainability. Authorities require safe access methods for cleaning, inspection, and repair.
            </p>
            <p className="mb-6">
              Documents submitted include:
            </p>
            <ul className="mb-8 space-y-2">
              <li><strong>Facade access strategy:</strong> Rope access, BMU tracks, or integrated walkways</li>
              <li><strong>Material cleaning method:</strong> Pressure washing, brushing, or chemical treatment plans</li>
              <li><strong>Drainage detail:</strong> Water runoff paths and drip control</li>
              <li><strong>Window cleaning zoning:</strong> Especially in towers and mid-rise buildings</li>
              <li><strong>Safety anchors and certification:</strong> Load testing and anchorage details</li>
            </ul>
            <p className="mb-8">
              Projects in Business Bay and high-rise zones are routinely delayed due to missing or inadequate access plans. Mirka prepares this documentation early to avoid design-stage approval issues.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              6. Submission Documentation and Approval Process
            </h2>
            <p className="mb-6">
              Facades are reviewed as part of the full design package. Required documents typically include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Elevation drawings with material key and shading elements</li>
              <li>3D perspective views of all visible façades</li>
              <li>Material board with physical or digital samples</li>
              <li>Fire rating certificates for all cladding and insulation</li>
              <li>Solar performance studies and reflectivity data</li>
              <li>Construction detailing: wall section, anchoring, thermal break locations</li>
              <li>Developer NOC if façade treatment varies from original design brief</li>
            </ul>
            <p className="mb-8">
              Mirka Architecture handles coordination with the authority portal (DM or DDA), including file formatting, uploads, and resubmissions.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">
                Plan Your Façade Strategy Before You Submit
              </h3>
              <p className="text-gray-600 mb-6">
                Mirka Architecture is an architecture design company in Dubai, supporting façade planning, performance analysis, and authority approvals across the UAE.
              </p>
              <Link href="/contact">
                <button className="bg-[#041533] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#877051] transition-colors duration-300">
                  Contact Us to Learn About Our Services!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#041533] mb-6">
                Related Articles
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="block">
                  <article className="group cursor-pointer">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                      <div className="relative h-48 bg-gray-200">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-[#041533] px-3 py-1 rounded-full text-xs font-medium">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-serif font-bold text-[#041533] mb-3 group-hover:text-[#877051] transition-colors duration-300 leading-tight">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{relatedPost.readTime}</p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Apply These Insights?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Let our expertise guide your next architectural project from concept to completion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-[#041533] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                Start Your Project
              </button>
            </Link>
            <Link href="/blog">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#041533] hover:scale-105 transition-all duration-300">
                More Articles
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}