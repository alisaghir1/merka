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
  const currentPost = blogPostsData[1] // Second blog post
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
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80"
            alt="Coastal vs Inland Architecture"
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
            <span className="text-[#877051] text-sm">Site Planning</span>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-[#877051] text-white px-4 py-2 rounded-full text-sm font-medium">
              Site Planning
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Designing for Site: Coastal vs. Inland Architecture in the UAE
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>Merka Architecture Team</span>
            <span>•</span>
            <span>December 10, 2024</span>
            <span>•</span>
            <span>6 min read</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Site Planning", "Coastal Design", "Climate Response", "UAE"].map((tag, index) => (
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
              Architecture in the UAE must respond to distinct site conditions. Coastal plots experience salt-laden air, humidity, and direct solar exposure, while inland sites face temperature extremes, high winds, and dust-driven erosion. Mirka Architecture, an architecture design company based in Dubai, approaches each plot based on its environmental zone—not just its coordinates.
            </p>
            
            <p className="mb-8">
              This article outlines the key considerations when designing architectural projects on the coast versus inland areas such as Dubai Hills, Al Ruwayyah, Al Ain, and Liwa.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              1. Environmental Challenges by Location
            </h2>
            
            <h3 className="text-2xl font-serif font-bold text-[#877051] mt-8 mb-4">
              Coastal Environments
            </h3>
            <p className="mb-6">
              Plots near the Arabian Gulf—such as Palm Jumeirah, Saadiyat Island, Mina Zayed, and Al Majaz—are subject to:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Salt corrosion affecting concrete, steel, and fixings</li>
              <li>High ambient humidity reducing material lifespan</li>
              <li>Glare from sea-facing glass surfaces</li>
              <li>Moisture buildup in enclosed mechanical systems</li>
              <li>Limited ventilation during stagnant wind periods</li>
            </ul>
            
            <h3 className="text-2xl font-serif font-bold text-[#877051] mt-8 mb-4">
              Inland Environments
            </h3>
            <p className="mb-6">
              Sites located further from the coast—such as Al Ain, Al Barari, or Dubai's desert-edge districts—must address:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Daily temperature swings causing material expansion/contraction</li>
              <li>Dust accumulation on openings and façade elements</li>
              <li>High UV exposure without humidity buffering</li>
              <li>Pressure-driven wind exposure in open terrains</li>
              <li>Greater risk of heat retention in exposed slabs and roofs</li>
            </ul>
            <p className="mb-8">
              Mirka develops material, façade, and planning strategies based on these environmental parameters.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              2. Façade Design and Material Response
            </h2>
            
            <h3 className="text-2xl font-serif font-bold text-[#877051] mt-8 mb-4">
              Coastal Projects
            </h3>
            <p className="mb-6">
              For buildings near the sea, façade materials must resist corrosion and moisture infiltration. Mirka Architecture specifies:
            </p>
            <ul className="mb-8 space-y-2">
              <li>GRC or precast panels with salt-resistant aggregates</li>
              <li>Aluminum systems with anodized or marine-grade coating</li>
              <li>High-performance waterproofing behind cladding layers</li>
              <li>Fully sealed window and door systems with gasket protection</li>
              <li>Roof membranes tested for ponding and adhesion under humidity</li>
            </ul>
            <p className="mb-8">
              Designs include shading elements that reduce solar gain and avoid metal bridging across external and internal systems.
            </p>
            
            <h3 className="text-2xl font-serif font-bold text-[#877051] mt-8 mb-4">
              Inland Projects
            </h3>
            <p className="mb-6">
              Inland sites require facades that reduce radiant heat gain and resist surface cracking. Mirka prioritizes:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Double cavity walls with high R-value insulation</li>
              <li>Textured render with mineral additives for UV stability</li>
              <li>Small, shaded openings to reduce dust and heat load</li>
              <li>Wind-resistant shading devices with structural anchors</li>
              <li>Roof slabs with thermal insulation and solar-reflective finishes</li>
            </ul>
            <p className="mb-8">
              Where applicable, sloped roof systems are introduced to encourage wind deflection and self-cleaning.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              3. Mechanical Strategy and Ventilation
            </h2>
            
            <h3 className="text-2xl font-serif font-bold text-[#877051] mt-8 mb-4">
              Coastal Sites
            </h3>
            <p className="mb-6">
              HVAC systems on the coast require extra protection from moisture. Mirka coordinates:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Dehumidification systems in common areas</li>
              <li>Outdoor units placed in ventilated, protected zones</li>
              <li>Corrosion-resistant ducting and outdoor cable management</li>
              <li>Air intake systems located away from salt-heavy wind zones</li>
            </ul>
            <p className="mb-8">
              Air change rates are calculated based on coastal wind stagnation models.
            </p>
            
            <h3 className="text-2xl font-serif font-bold text-[#877051] mt-8 mb-4">
              Inland Sites
            </h3>
            <p className="mb-6">
              Desert interiors favor passive ventilation where feasible. In schools, villas, and mosques, Mirka integrates:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Cross ventilation paths for seasonal airflow</li>
              <li>Operable clerestory or roof windows</li>
              <li>Courtyard layouts with evaporative cooling effects</li>
              <li>Thermal zoning based on sun path and time-of-use</li>
            </ul>
            <p className="mb-8">
              Mechanical loads are reduced using passive cooling during transitional months (March–April and October–November).
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              4. Landscaping and Site Response
            </h2>
            
            <h3 className="text-2xl font-serif font-bold text-[#877051] mt-8 mb-4">
              Coastal Zones
            </h3>
            <p className="mb-6">
              Landscaping near the sea must tolerate salinity. This affects both planting and hardscape finishes. Mirka's strategy includes:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Native plant selection based on salt tolerance</li>
              <li>Hardscape materials treated for moisture absorption</li>
              <li>Site drainage sloped away from buildings</li>
              <li>Non-porous paving with underdrain systems</li>
              <li>External lighting sealed for salt and humidity exposure</li>
            </ul>
            
            <h3 className="text-2xl font-serif font-bold text-[#877051] mt-8 mb-4">
              Inland Zones
            </h3>
            <p className="mb-6">
              Inland landscaping faces high evaporation and water restrictions. Designs favor:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Shaded zones with trees creating cooling corridors</li>
              <li>Gravel or crushed stone mulch to retain moisture</li>
              <li>Low-flow irrigation with zone-based control</li>
              <li>Elevated planting beds to reduce sand contamination</li>
              <li>Dust-resistant outdoor furniture and play surfaces</li>
            </ul>
            <p className="mb-8">
              Materials for planters, benches, and canopies are selected for thermal durability and ease of cleaning.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              5. Regulatory Requirements and Developer Guidelines
            </h2>
            <p className="mb-6">
              Both coastal and inland developments must meet authority criteria. Mirka Architecture adapts submittals accordingly:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Coastal zones often require Trakhees façade testing and marine-grade system certificates</li>
              <li>Inland zones require Estidama compliance (for Abu Dhabi) and solar gain modeling under Dubai Green Building guidelines</li>
              <li>Master developers such as Nakheel, Aldar, and Emaar may request additional documentation for façade cleaning strategy, material longevity, and performance simulations</li>
            </ul>
            <p className="mb-8">
              All submissions include tailored thermal maps, material test reports, and microclimate response diagrams.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">
                Site-Specific Design Begins with the Environment
              </h3>
              <p className="text-gray-600 mb-6">
                Mirka Architecture is an architecture design company based in Dubai, supporting climate-based design for both coastal and inland developments across the UAE.
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