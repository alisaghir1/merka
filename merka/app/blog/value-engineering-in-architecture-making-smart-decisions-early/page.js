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
  const currentPost = blogPostsData[9] // Tenth blog post
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
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80"
            alt="Value Engineering Architecture"
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
            <span className="text-[#877051] text-sm">Design Process</span>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-[#877051] text-white px-4 py-2 rounded-full text-sm font-medium">
              Design Process
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Value Engineering in Architecture: Making Smart Decisions Early
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>Merka Architecture Team</span>
            <span>•</span>
            <span>November 19, 2024</span>
            <span>•</span>
            <span>8 min read</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Value Engineering", "Cost Optimization", "Design Process", "Project Management"].map((tag, index) => (
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
              Value engineering is not about reducing quality. It is a systematic method of analyzing a design's function to improve performance while controlling cost. For architecture projects in the UAE—particularly in zones like Dubai Hills, Jebel Ali, Saadiyat Island, and Sharjah—early value engineering helps avoid redesign, cost overruns, and regulatory delays.
            </p>
            
            <p className="mb-8">
              Mirka Architecture, an architecture design company based in Dubai, applies value engineering from the concept phase onward. This approach is integrated into planning, systems coordination, and material selection to meet budget, authority, and project delivery goals.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              1. Defining Value Engineering in Architecture
            </h2>
            <p className="mb-6">
              Value engineering focuses on comparing multiple options for a system or component, using cost, lifespan, maintenance, and compliance as decision factors. It is not simply cost-cutting.
            </p>
            <p className="mb-6">
              Key areas for analysis include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Structural systems</li>
              <li>Mechanical and electrical layouts</li>
              <li>Façade materials</li>
              <li>Internal finishes</li>
              <li>Shading and insulation</li>
              <li>Spatial programming</li>
              <li>Circulation routes</li>
            </ul>
            <p className="mb-8">
              Mirka conducts this review before the design is finalized. The goal is to identify long-term savings without compromising on safety, regulatory acceptance, or user comfort.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              2. Structural Systems: Choosing the Right Format
            </h2>
            <p className="mb-6">
              Early-stage structural choices influence both construction timeline and cost. Mirka evaluates several options for each plot based on use, scale, and authority expectations.
            </p>
            <p className="mb-6">
              Examples include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Flat slab vs. beam-slab systems</li>
              <li>Load-bearing blockwork vs. RC frame for low-rise buildings</li>
              <li>Steel vs. concrete for long-span applications</li>
              <li>Precast elements vs. in-situ construction for repetitive forms</li>
              <li>Slab thickness based on equipment load or mechanical routing</li>
            </ul>
            <p className="mb-8">
              Each choice is reviewed with structural consultants. Estimated savings and site-specific advantages are shared with the client before locking in the approach.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              3. Mechanical and Electrical Systems
            </h2>
            <p className="mb-6">
              Service layouts can significantly affect slab thickness, ceiling heights, and material routing. Mirka reviews:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Centralized vs. split HVAC systems</li>
              <li>Duct vs. VRF system for zone control</li>
              <li>Lighting fixture types and mount configurations</li>
              <li>Riser count and shaft location to reduce vertical routing</li>
              <li>Load optimization for electrical panel sizing</li>
            </ul>
            <p className="mb-8">
              Adjustments made at schematic stage can reduce both capital and operating expenses. For projects in Dubai South and Abu Dhabi's industrial zones, these changes affect feasibility and investor interest.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              4. Material Selection and Sourcing
            </h2>
            <p className="mb-6">
              Material choices impact both direct cost and long-term maintenance. Mirka prepares comparative matrices for:
            </p>
            <ul className="mb-8 space-y-2">
              <li><strong>Façade systems:</strong> precast, GRC, ACP, or insulated panels</li>
              <li><strong>Flooring:</strong> porcelain, vinyl, or engineered stone</li>
              <li><strong>Wall finishes:</strong> paint, plaster, tile, or panel</li>
              <li><strong>Roof systems:</strong> bitumen membrane vs. TPO or PVC</li>
              <li><strong>Internal doors:</strong> fire-rated, laminated, or veneered</li>
            </ul>
            <p className="mb-8">
              Sources are verified for lead time, warranty, supplier presence in the UAE, and compliance with authority standards. In coastal zones, resistance to salt, humidity, and UV is prioritized.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              5. Façade Performance and Authority Compliance
            </h2>
            <p className="mb-6">
              Dubai Municipality, DDA, and Trakhees impose performance benchmarks for façades. A compliant system can be costly if selected late.
            </p>
            <p className="mb-6">
              Mirka reviews options based on:
            </p>
            <ul className="mb-8 space-y-2">
              <li>SHGC and U-values</li>
              <li>Fire-rating classification</li>
              <li>Anchor system type</li>
              <li>Access and cleaning strategy</li>
              <li>Installation sequence and site constraint</li>
            </ul>
            <p className="mb-8">
              Adjustments at this phase can avoid rework during submission and reduce contractor pricing during the tender phase.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              6. Layout Efficiency and Net-to-Gross Ratio
            </h2>
            <p className="mb-6">
              Efficient planning improves usable area, circulation, and service routing. It can also support faster authority approval.
            </p>
            <p className="mb-6">
              Mirka evaluates:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Core location and shape</li>
              <li>Stairwell count and placement</li>
              <li>Corridor width and daylight access</li>
              <li>Mechanical shaft zoning</li>
              <li>Parking bay layout and slope logic</li>
            </ul>
            <p className="mb-8">
              For mid-rise apartments in Reem Island or office buildings in Barsha Heights, these changes can increase leasable area or reduce structure without visual compromise.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              7. Tender and Contractor Feedback
            </h2>
            <p className="mb-6">
              Value engineering continues into the tender process. Mirka engages with shortlisted contractors to identify:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Alternative suppliers</li>
              <li>Construction methodology changes</li>
              <li>Installation sequences to reduce site time</li>
              <li>Batch size pricing for repetitive units</li>
              <li>Access scaffolding strategy linked to formwork and façade</li>
            </ul>
            <p className="mb-8">
              This input is reviewed with the client and consultants before contract award.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">
                Plan for Value, Not Just Appearance
              </h3>
              <p className="text-gray-600 mb-6">
                Mirka Architecture is an architecture design company in Dubai that applies value engineering from the concept phase to support efficiency and compliance.
              </p>
              <Link href="/contact">
                <button className="bg-[#041533] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#877051] transition-colors duration-300">
                  Contact Us for More!
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