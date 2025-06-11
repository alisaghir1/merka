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
  const currentPost = blogPostsData[7] // Eighth blog post
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
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"
            alt="Authority Submissions Dubai"
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
            Understanding Authority Submissions in Dubai: A Step-by-Step Guide for Architecture Projects
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>Merka Architecture Team</span>
            <span>•</span>
            <span>November 25, 2024</span>
            <span>•</span>
            <span>10 min read</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Authority Submissions", "Dubai Regulations", "Building Permits", "Compliance Guide"].map((tag, index) => (
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
              Dubai offers one of the most dynamic construction markets in the world—but with it comes a complex and highly regulated design approval process. At Merka Architecture, an architecture design company based in Dubai, every project begins with a clear submission strategy. This guide outlines the typical steps involved in obtaining building permits through local authorities such as Dubai Municipality (DM), Trakhees, and Dubai Development Authority (DDA).
            </p>
            
            <p className="mb-8">
              Whether the project is a private villa in Al Barsha, a commercial building in Dubai South, or a hospitality concept on Palm Jumeirah, understanding the structure of approvals is essential for smooth execution.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              1. Concept Design and Site Review
            </h2>
            <p className="mb-6">
              The first step in any project is confirming whether the intended design can be developed on the assigned plot. Merka begins this phase with:
            </p>
            <ul className="mb-8 space-y-2">
              <li><strong>Zoning check:</strong> FAR, BUA, height, and setback requirements</li>
              <li><strong>Access study:</strong> Road connection and service entry feasibility</li>
              <li><strong>Authority jurisdiction identification:</strong> DM, DDA, or Trakhees</li>
              <li><strong>Review of master developer criteria:</strong> e.g., Emaar, Nakheel, Dubai Properties</li>
            </ul>
            <p className="mb-8">
              Site context is analyzed using satellite maps, land lease drawings, and infrastructure overlays. A preliminary design is created and shared with the client for review before any formal submission begins.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              2. Pre-Approval from the Planning Authority
            </h2>
            <p className="mb-6">
              Depending on location, different authorities oversee urban and architectural planning:
            </p>
            <ul className="mb-6 space-y-2">
              <li><strong>Dubai Municipality (DM):</strong> Governs most plots not tied to a free zone or master developer</li>
              <li><strong>DDA (Dubai Development Authority):</strong> Applies to zones such as Barsha Heights, D3, and Internet City</li>
              <li><strong>Trakhees:</strong> Required for Jebel Ali Free Zone, Palm Jumeirah, and Dubai South</li>
            </ul>
            <p className="mb-6">
              Merka Architecture coordinates submission of:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Concept drawings (site plan, massing, basic elevations)</li>
              <li>Zoning compliance table</li>
              <li>Developer NOC (if applicable)</li>
              <li>Preliminary GFA/Built-Up Area calculations</li>
              <li>3D massing views or sun path studies (if required)</li>
            </ul>
            <p className="mb-8">
              Feedback is typically received within 5–15 working days. Once accepted, the project advances to full design development and documentation.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              3. Detailed Design and Building Permit Documentation
            </h2>
            <p className="mb-6">
              The most intensive submission package involves detailed architectural drawings, supported by structural, MEP, and fire safety plans.
            </p>
            <p className="mb-6">
              Typical requirements include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Floor plans with room labels and dimensions</li>
              <li>Sections showing height and floor level compliance</li>
              <li>Elevations with material annotation</li>
              <li>Façade studies (shading, thermal performance, glazing ratio)</li>
              <li>Parking calculations and circulation paths</li>
              <li>Landscape layout with soft/hardscape zoning</li>
              <li>GFA, FAR, and BUA computation sheet</li>
              <li>Waste management room and utility coordination (DEWA, Etisalat)</li>
              <li>Accessibility compliance diagrams (as per DDA or DM guidelines)</li>
            </ul>
            <p className="mb-8">
              As an architecture design company experienced in Dubai submissions, Merka uses BIM and CAD platforms to prepare structured packages ready for online uploads or physical submission (depending on the authority).
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              4. Fire and Life Safety Approvals
            </h2>
            <p className="mb-6">
              All UAE projects must undergo fire approval through the Civil Defense or delegated authority (e.g., Trakhees Fire Department). Fire strategies are reviewed for:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Egress width and travel distances</li>
              <li>Staircase count and compartmentation</li>
              <li>Fire-rated wall and door locations</li>
              <li>Smoke extraction systems</li>
              <li>Emergency lighting and signage</li>
              <li>Fire alarm and sprinkler layout</li>
            </ul>
            <p className="mb-8">
              Merka coordinates directly with fire consultants to prepare compliant plans and system layouts. Revisions are tracked through internal logs, and authority resubmissions are made promptly to avoid delays.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              5. Structural and MEP Approvals
            </h2>
            <p className="mb-6">
              Alongside architectural approvals, structural and electromechanical systems must be submitted separately. These include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Foundation plans and structural framing layouts</li>
              <li>Reinforcement detailing</li>
              <li>HVAC zoning and ducting</li>
              <li>Plumbing and drainage layout</li>
              <li>Electrical load calculations</li>
              <li>LV room configuration for DEWA</li>
              <li>Gas line routing (if applicable)</li>
            </ul>
            <p className="mb-8">
              Merka's team works with specialist consultants to synchronize all submission files and drawing references. This prevents cross-discipline conflicts during authority review or site inspection stages.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              6. Final Authority Comments and Permit Issuance
            </h2>
            <p className="mb-6">
              Once drawings are accepted, the authority issues a Building Permit. Before construction begins, the following documents are typically required:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Contractor appointment letter</li>
              <li>Consultant supervision declaration</li>
              <li>Site hoarding permit</li>
              <li>Temporary electricity NOC</li>
              <li>Utility connection clearance</li>
              <li>Soil test results and geotechnical report</li>
            </ul>
            <p className="mb-8">
              Merka assists clients in gathering and submitting these documents for final clearance.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              Ongoing Authority Coordination During Construction
            </h2>
            <p className="mb-6">
              Even after approval, most authorities require inspections at key stages:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Foundation pouring</li>
              <li>Ground floor slab</li>
              <li>Structural frame completion</li>
              <li>Fire safety installations</li>
              <li>Final fit-out and occupancy review</li>
            </ul>
            <p className="mb-8">
              Merka continues to provide documentation, clarification responses, and as-built drawings during the construction phase to satisfy ongoing authority requirements.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">
                Need Guidance on Dubai's Authority Submissions?
              </h3>
              <p className="text-gray-600 mb-6">
                Merka Architecture is an architecture design company in Dubai, experienced in handling authority submissions across DM, DDA, and Trakhees zones.
              </p>
              <Link href="/contact">
                <button className="bg-[#041533] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#877051] transition-colors duration-300">
                  Contact Us to Learn More About Our Services
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