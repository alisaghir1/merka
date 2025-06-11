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
  const currentPost = blogPostsData[2] // Third blog post
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
            src="https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=1200&q=80"
            alt="Mosque Architecture"
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
            <span className="text-[#877051] text-sm">Religious Architecture</span>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-[#877051] text-white px-4 py-2 rounded-full text-sm font-medium">
              Religious Architecture
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Designing Mosques in the UAE: Architecture, Regulation, and Spatial Logic
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>Merka Architecture Team</span>
            <span>•</span>
            <span>December 8, 2024</span>
            <span>•</span>
            <span>10 min read</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Mosque Design", "Religious Architecture", "UAE Regulations", "Spatial Planning"].map((tag, index) => (
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
              Mosque design in the UAE requires a deep understanding of spiritual function, architectural proportion, and municipal approval. Unlike other public buildings, mosques must meet religious requirements and comply with government design regulations, especially in urban districts like Mirdif, Al Ain, Sharjah, and Dubai South.
            </p>
            
            <p className="mb-8">
              Merka Architecture, an architecture design company based in Dubai, designs mosques across diverse neighborhoods. This article outlines the design process, authority requirements, and architectural decisions that shape mosque projects in the UAE.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              1. Plot Allocation and Spatial Organization
            </h2>
            <p className="mb-6">
              Mosques are typically allocated dedicated plots by the municipality or through private endowments (waqf). Plots are subject to zoning rules that guide:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Orientation: The Qibla wall must face Mecca directly</li>
              <li>Setbacks: Defined minimum distances from property boundaries</li>
              <li>Site access: Must accommodate pedestrian and vehicular movement</li>
              <li>Noise and buffer zones: Placement relative to residential or retail developments</li>
            </ul>
            
            <p className="mb-6">
              The internal layout typically includes:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Main prayer hall (male)</li>
              <li>Secondary prayer area (female)</li>
              <li>Ablution (wudhu) facilities</li>
              <li>Imam and muezzin rooms</li>
              <li>External shaded areas or porticos</li>
              <li>Parking (if required by authority)</li>
            </ul>
            <p className="mb-8">
              Each zone must be accessible, clearly defined, and easy to maintain. Merka designs spatial flow to support ritual movement and operational efficiency.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              2. Architectural Form and Scale
            </h2>
            <p className="mb-6">
              Mosques in the UAE vary in form but share common design elements shaped by regional tradition and practical use. These include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Prayer halls: Clear-span interiors with uninterrupted floor space</li>
              <li>Domes: Not always required, but often included for symbolic reference</li>
              <li>Minarets: Governed by height and placement regulations</li>
              <li>Mihrab: Recessed prayer niche indicating Qibla</li>
              <li>Arches and screens: Used for shading and spatial rhythm</li>
            </ul>
            <p className="mb-8">
              Authorities generally prefer simple, climate-appropriate design with limited ornamental excess. Merka evaluates wind direction, sun path, and community access before finalizing exterior form and openings.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              3. Materials and Finishes
            </h2>
            <p className="mb-6">
              Materials must balance aesthetics, durability, and maintenance requirements. Merka Architecture selects mosque materials based on:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Thermal stability: Stone, plaster, and low-maintenance tiles</li>
              <li>Slip-resistant flooring: Required for ablution and entry areas</li>
              <li>Acoustic behavior: Materials that reduce echo inside prayer halls</li>
              <li>Reflective roof finishes: To reduce heat gain in domes or flat surfaces</li>
              <li>Façade color: Typically white, beige, or sand tones based on heritage reference</li>
            </ul>
            <p className="mb-8">
              Materials are submitted with test certificates and mock-ups when requested by the authority or project donor.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              4. Regulatory Authority and Design Guidelines
            </h2>
            <p className="mb-6">
              In Dubai, mosque designs are submitted through:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Dubai Municipality (DM): Standard mosque guidelines and template reviews</li>
              <li>Islamic Affairs and Charitable Activities Department (IACAD): Oversees religious layout approval</li>
              <li>Trakhees: Required for mosque designs in Palm Jumeirah, Dubai South, and JAFZA</li>
              <li>Sharjah Municipality: Separate design unit for mosque review in heritage-sensitive zones</li>
            </ul>
            
            <p className="mb-6">
              Submissions include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Site plan with setback confirmation</li>
              <li>Floor plans with dimensioned prayer spaces</li>
              <li>Sections and elevations</li>
              <li>Material palette</li>
              <li>Domes and minaret detailing (if included)</li>
              <li>Parking and accessibility compliance</li>
            </ul>
            <p className="mb-8">
              Merka coordinates design documents with religious consultants when required.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              5. Mechanical and Electrical Coordination
            </h2>
            <p className="mb-6">
              Mosques must provide occupant comfort without disturbing the prayer environment. This involves:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Quiet HVAC systems</li>
              <li>Even lighting distribution with warm temperatures</li>
              <li>Emergency lighting and fire alarm systems in discrete locations</li>
              <li>Low-profile speakers integrated into ceilings</li>
              <li>Separate mechanical zones for men's and women's areas</li>
              <li>Drainage and ventilation in ablution areas to meet hygiene codes</li>
            </ul>
            <p className="mb-8">
              Fire safety, ventilation, and acoustic clarity are reviewed with MEP consultants. Drawings are submitted in full coordination with architecture and structure.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              6. Cultural Considerations and Community Input
            </h2>
            <p className="mb-6">
              In public mosques, community engagement may be limited to approvals. In private endowment or family-funded projects, clients often request:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Scriptural inscriptions</li>
              <li>Specific dome styles or historical references</li>
              <li>Interior motifs tied to traditional architecture</li>
              <li>Landscape reflecting regional planting or shaded gathering areas</li>
            </ul>
            <p className="mb-8">
              Merka integrates these requests while preserving clarity and approval feasibility.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">
                Design with Purpose, Submit with Confidence
              </h3>
              <p className="text-gray-600 mb-6">
                Merka Architecture is an architecture design company in Dubai experienced in mosque design across Dubai, Sharjah, and Abu Dhabi.
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