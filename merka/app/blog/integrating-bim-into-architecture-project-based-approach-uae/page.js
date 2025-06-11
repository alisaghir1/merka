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
  const currentPost = blogPostsData[4] // Fifth blog post
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
            src="https://images.unsplash.com/photo-1581093458791-9d42e72b4c8d?w=1200&q=80"
            alt="BIM Architecture Technology"
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
            <span className="text-[#877051] text-sm">Technology & Innovation</span>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-[#877051] text-white px-4 py-2 rounded-full text-sm font-medium">
              Technology & Innovation
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Integrating BIM into Architecture: A Project-Based Approach in the UAE
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>Merka Architecture Team</span>
            <span>•</span>
            <span>December 3, 2024</span>
            <span>•</span>
            <span>8 min read</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["BIM", "Technology", "Project Management", "UAE Construction"].map((tag, index) => (
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
              Building Information Modeling (BIM) has moved beyond 3D visualization. It now forms the technical backbone of construction documentation, authority coordination, and project delivery across the UAE. Mirka Architecture, an architecture design company based in Dubai, integrates BIM workflows across all project phases—from concept through construction.
            </p>
            
            <p className="mb-8">
              This article outlines the real-world use of BIM in UAE projects, focusing on deliverables, authority expectations, and project benefits for clients and consultants.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              1. BIM in Early Concept Development
            </h2>
            <p className="mb-6">
              BIM begins before construction documents. At the concept stage, it assists in visualizing massing, verifying FAR/BUA compliance, and simulating environmental factors.
            </p>
            <p className="mb-6">
              In Mirka projects across Dubai Hills, Saadiyat Island, and Al Barsha South, early BIM models help resolve:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Building height restrictions</li>
              <li>Site coverage optimization</li>
              <li>Entry and circulation scenarios</li>
              <li>Preliminary zoning overlays</li>
              <li>Shading behavior by orientation and time of year</li>
            </ul>
            <p className="mb-8">
              These models support informed decisions and reduce the risk of redesign during authority submission stages.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              2. Multi-Disciplinary Coordination
            </h2>
            <p className="mb-6">
              As projects move into schematic and detailed design, BIM enables real-time coordination between architecture, structure, and MEP. Each consultant works within a federated model, reducing clashes and data loss.
            </p>
            <p className="mb-6">
              Key uses include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Structural beam integration with ceiling plans</li>
              <li>Duct routing through drop ceilings or vertical risers</li>
              <li>Fire strategy overlays for door swing and corridor width</li>
              <li>Plumbing shaft sizing based on live fixture counts</li>
              <li>Authority-compliant zoning for waste, fire egress, and ventilation</li>
            </ul>
            <p className="mb-8">
              In projects for DDA and Trakhees, clash detection reports are mandatory before design approval. Mirka prepares these reports through software such as Navisworks and Revit.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              3. Authority Submission Requirements
            </h2>
            <p className="mb-6">
              Several UAE authorities now mandate BIM file submission during the design review process. These include:
            </p>
            <ul className="mb-8 space-y-2">
              <li><strong>Dubai Development Authority (DDA):</strong> BIM required for all commercial and mixed-use buildings</li>
              <li><strong>Trakhees:</strong> Submission of 3D coordination models and clash detection output</li>
              <li><strong>Abu Dhabi DMT:</strong> BIM model submission required for projects over specified GFA</li>
              <li><strong>Estidama and Dubai Green Building:</strong> Require zoned energy models built on architectural BIM</li>
            </ul>
            <p className="mb-8">
              Mirka Architecture produces IFC-compliant models for submission, including layer control, object categorization, and metadata tagging. These files are reviewed alongside standard CAD sheets and architectural drawings.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              4. Construction Sequencing and Site Coordination
            </h2>
            <p className="mb-6">
              During the construction phase, BIM models serve as live references for contractors, site engineers, and project managers. They allow:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Generation of shop drawings and quantity take-offs</li>
              <li>Detailed coordination of construction sequence (4D)</li>
              <li>Identification of potential on-site access conflicts</li>
              <li>Inspection of ductwork and slab penetrations</li>
              <li>Adjustment of lighting layouts based on furniture locations</li>
            </ul>
            <p className="mb-8">
              In mixed-use developments and phased construction sites—such as those in Dubai South or Mohammed Bin Zayed City—BIM sequencing supports logistical clarity and reduces error during fast-track implementation.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              5. As-Built Documentation and Handover
            </h2>
            <p className="mb-6">
              Post-construction, BIM becomes a tool for maintenance and facility management. As-built models include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Updated dimensions from on-site surveys</li>
              <li>Asset tagging of mechanical equipment</li>
              <li>Maintenance zones and access clearance indicators</li>
              <li>Finishes schedule linked to room tags</li>
              <li>Fire zone mapping and Civil Defense compliance markings</li>
            </ul>
            <p className="mb-8">
              Clients receive native model files and visual dashboards if required. Mirka provides this documentation for school campuses, healthcare centers, and office buildings throughout the UAE.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              6. Benefits for Clients and Developers
            </h2>
            <p className="mb-6">
              Clients working with BIM see tangible benefits:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Faster approvals due to accurate coordination</li>
              <li>Reduced construction delays through early clash resolution</li>
              <li>Clear visualizations for investor and end-user presentations</li>
              <li>Measurable cost savings from accurate quantity tracking</li>
              <li>Easier communication across multi-disciplinary teams</li>
            </ul>
            <p className="mb-8">
              As an architecture design company, Mirka deploys BIM to reduce rework, improve approval timelines, and deliver transparent coordination between all stakeholders.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">
                Need BIM Integration for Your Next Project?
              </h3>
              <p className="text-gray-600 mb-6">
                Mirka Architecture is an architecture design company in Dubai using BIM for design, coordination, and authority approvals across the UAE.
              </p>
              <Link href="/contact">
                <button className="bg-[#041533] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#877051] transition-colors duration-300">
                  Contact Us for More Information
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