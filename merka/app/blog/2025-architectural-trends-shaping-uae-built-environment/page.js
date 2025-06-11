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
  const currentPost = blogPostsData[0] // First blog post
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
            alt="2025 Architectural Trends"
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
            <span className="text-[#877051] text-sm">Trends & Innovation</span>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-[#877051] text-white px-4 py-2 rounded-full text-sm font-medium">
              Trends & Innovation
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            2025 Architectural Trends Shaping the UAE's Built Environment
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>Merka Architecture Team</span>
            <span>•</span>
            <span>December 15, 2024</span>
            <span>•</span>
            <span>8 min read</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Trends", "UAE", "Innovation", "2025"].map((tag, index) => (
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
              Architecture in the UAE continues to evolve—driven by climate, regulation, urban development, and new technologies. Mirka Architecture, an architecture design company based in Dubai, has identified key architectural trends emerging across residential, commercial, institutional, and hospitality sectors.
            </p>
            
            <p className="mb-8">
              This article outlines practical observations based on live projects, authority feedback, and development goals in districts such as Dubai Hills, Business Bay, Saadiyat Island, and Sharjah's city center.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              1. Reduced Ornamentation, Increased Performance
            </h2>
            <p className="mb-6">
              While design expression remains important, façade features are increasingly subject to performance-based analysis. In new developments across Dubai and Abu Dhabi, decorative elements are being replaced with systems that provide measurable value—such as:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Deep-set windows for solar protection</li>
              <li>Vertical fins aligned with sun angle studies</li>
              <li>External cladding panels sized for reduced thermal bridging</li>
              <li>Simplified color palettes to manage heat absorption</li>
            </ul>
            <p className="mb-8">
              This shift reflects a preference for material consistency, regulatory clarity, and construction efficiency. Mirka Architecture delivers building envelopes that reduce long-term maintenance while remaining visually strong.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              2. Rise of Mid-Rise Residential Blocks
            </h2>
            <p className="mb-6">
              Across Dubai South, Al Furjan, and Yas Island, developers are favoring mid-rise apartments (G+4 to G+8) over high-rises. Reasons include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Faster construction timelines</li>
              <li>Lower elevator and MEP system complexity</li>
              <li>Better walkability within communities</li>
              <li>Easier integration of passive cooling features</li>
            </ul>
            <p className="mb-8">
              Mirka's residential blocks are now planned with open corridors, cross-ventilated cores, and semi-private courtyards. Façade treatments emphasize rhythm and proportion over bulk massing.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              3. Integration of Private Outdoor Zones
            </h2>
            <p className="mb-6">
              Post-2020 design logic continues to influence space planning. Residents and users want more personal outdoor areas. This has impacted planning in:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Villas: Shaded patios, rooftop gardens, and visual buffers</li>
              <li>Offices: Terraced balconies and outdoor meeting spaces</li>
              <li>Retail: Open-air food courts and breezeways</li>
              <li>Schools: Outdoor learning zones and recreation courts</li>
            </ul>
            <p className="mb-8">
              In Mirka's recent projects in Al Barsha South and Saadiyat Island, balconies, patios, and courtyards are treated as primary components—not secondary accessories.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              4. Climate-Informed Planning from Day One
            </h2>
            <p className="mb-6">
              Thermal performance is no longer handled at façade level only. Developers and municipalities are requesting full design coordination starting from the concept phase. Requirements now extend to:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Wind simulations in early massing</li>
              <li>Daylight zone modeling for internal layouts</li>
              <li>HVAC strategy linked to orientation and room use</li>
              <li>Waste heat zone separation in MEP areas</li>
              <li>Roof finish analysis for solar reflectivity</li>
            </ul>
            <p className="mb-8">
              Mirka Architecture applies passive principles as a baseline and confirms performance through BIM and environmental modeling platforms.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              5. Mixed-Use, Not Just Vertical
            </h2>
            <p className="mb-6">
              Mixed-use zoning has moved beyond high-rise towers. Horizontal plots are now being designed with integrated usage types. In Reem Island and Dubai Creek Harbour, Mirka has delivered:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Street-facing retail under residential blocks</li>
              <li>Split-access office/residential buildings</li>
              <li>Shared podiums with vertical zoning separation</li>
              <li>Multi-entry developments for privacy and security</li>
            </ul>
            <p className="mb-8">
              This reflects market demand for walkability, reduced commutes, and diversified community blocks.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              6. Authority Pressure for Early Coordination
            </h2>
            <p className="mb-6">
              Dubai Municipality, DDA, and Abu Dhabi DMT are requesting earlier and more complete documentation. Current trends in regulation include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Pre-submission 3D coordination models</li>
              <li>Early-stage façade performance justification</li>
              <li>Civil Defense schematic fire strategy approval</li>
              <li>Clear water/waste separation in hospitality planning</li>
              <li>Designated zones for delivery, waste, and recycling</li>
            </ul>
            <p className="mb-8">
              Mirka, as an experienced architecture design company, begins project planning with all consultants active from the earliest concept stage—reducing redesigns and submission delays.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              7. Public Realm Focus in Cultural Projects
            </h2>
            <p className="mb-6">
              Municipalities and cultural institutions are emphasizing pedestrian-first design in civic buildings. Open plazas, shaded seating, low-scale pavilions, and visual transparency are being prioritized. Projects now require:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Buffer zones between roads and entries</li>
              <li>Human-scaled massing for comfort</li>
              <li>Native planting in landscape packages</li>
              <li>Water-efficient fountains and cooling features</li>
              <li>Seamless visual transitions from built to natural elements</li>
            </ul>
            <p className="mb-8">
              In projects near Sharjah's cultural core and the Abu Dhabi Corniche, Mirka includes public interface design as part of architectural planning.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">
                Interested in Applying These Trends to Your Project?
              </h3>
              <p className="text-gray-600 mb-6">
                Mirka Architecture is an architecture design company in Dubai helping clients build spaces that respond to regulation, use, and climate.
              </p>
              <Link href="/contact">
                <button className="bg-[#041533] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#877051] transition-colors duration-300">
                  Contact Us for More
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