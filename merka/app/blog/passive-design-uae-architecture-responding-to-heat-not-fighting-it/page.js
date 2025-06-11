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
  const currentPost = blogPostsData[6] // Seventh blog post
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
            src="https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=1200&q=80"
            alt="Passive Design Architecture"
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
            <span className="text-[#877051] text-sm">Sustainability</span>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-[#877051] text-white px-4 py-2 rounded-full text-sm font-medium">
              Sustainability
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Passive Design in UAE Architecture: Responding to Heat, Not Fighting It
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>Merka Architecture Team</span>
            <span>•</span>
            <span>November 28, 2024</span>
            <span>•</span>
            <span>8 min read</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Passive Design", "Climate Response", "Sustainability", "UAE Architecture"].map((tag, index) => (
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
              The UAE's climate demands more than mechanical solutions. Across Dubai, Abu Dhabi, Sharjah, and Al Ain, buildings exposed to high solar loads face long-term performance issues when passive strategies are not incorporated. At Merka Architecture, an architecture design company based in Dubai, passive design is approached not as an add-on but as a foundational planning method.
            </p>
            
            <p className="mb-8">
              This article outlines the principles, challenges, and tested strategies of passive design in UAE architecture.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              The UAE Climate - A Design Constraint and Opportunity
            </h2>
            <p className="mb-6">
              Summer temperatures in Dubai can exceed 45°C. Humidity along the coastline, combined with high solar exposure and minimal rainfall, creates one of the most challenging environments for building performance. Designing to withstand—not just survive—these conditions requires attention to site planning, orientation, envelope configuration, and airflow modeling.
            </p>
            <p className="mb-8">
              Unlike imported building models often used in temperate regions, UAE architecture must operate with the assumption that mechanical systems cannot fix poor design. Passive design must begin at the planning stage, using the site's orientation, prevailing winds, and urban context.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              1. Orientation Strategy - Starting with the Plot, Not the Façade
            </h2>
            <p className="mb-6">
              The orientation of a building on its site is a primary passive design decision. Merka's residential and commercial projects are often located on tight urban parcels—such as Dubai Hills, Al Furjan, or Reem Island—where orientation is constrained by master plans or road layouts.
            </p>
            <p className="mb-8">
              To reduce solar load, primary spaces are located away from direct western exposure. Openings are minimized on west-facing facades. Courtyards, service zones, or shaded parking structures are used to block solar radiation on the harshest axis. Glazing is shifted to the north and east, where solar angles are lower and more manageable.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              2. Façade Recesses and Shading Devices
            </h2>
            <p className="mb-6">
              A building's skin can either trap heat or manage it. Passive design relies on overhangs, reveals, projections, and external screens to reduce internal heat gain. In Merka's projects in Dubai South and Masdar City, louvered metal fins or patterned GRC panels are used not for decoration but for environmental performance.
            </p>
            <p className="mb-8">
              Horizontal shading is prioritized on south-facing façades, while vertical fins are positioned to manage low-angle morning or afternoon sun on the east and west. Façade shading is coordinated during the concept stage to prevent late-stage façade revisions during DDA or Trakhees approval.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              3. Natural Ventilation and Courtyard Planning
            </h2>
            <p className="mb-6">
              Cross-ventilation is effective in seasonal months and reduces dependency on full-load air conditioning. Courtyard plans, historically used in Emirati homes, are adapted into Merka's villa and school designs. These allow stack ventilation, pressure differentials, and controlled wind access.
            </p>
            <p className="mb-8">
              Openings are placed on opposite façades to create airflow. Operable clerestory windows or roof ventilators assist in drawing warm air upward. In projects in Al Ain and inland Abu Dhabi, where night-time temperatures drop more significantly, nighttime flushing strategies are also incorporated.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              4. Material Mass and Thermal Storage
            </h2>
            <p className="mb-6">
              Thermal mass slows heat transfer into interior spaces. In areas like Dubai Investment Park or Al Ruwayyah, Merka uses double-block cavity walls or AAC blockwork to control internal temperature swings.
            </p>
            <p className="mb-8">
              Floors and walls are designed to absorb heat during the day and release it at night. Roofs are finished with reflective membranes or insulated sandwich panels. Window frames are specified with thermal breaks, and glazing selection targets a Solar Heat Gain Coefficient (SHGC) below 0.3 for habitable zones.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              5. Passive Design in Authority Submissions
            </h2>
            <p className="mb-6">
              Dubai Municipality, DDA, Trakhees, and Abu Dhabi DMT have all updated design guidelines to reflect the importance of passive systems. Passive strategies are not optional—they affect compliance with:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Dubai Green Building Regulations</li>
              <li>Estidama Design and Construction Ratings</li>
              <li>Trakhees' mandatory energy modeling reports</li>
              <li>DDA's façade shading and daylight studies</li>
            </ul>
            <p className="mb-6">
              As an architecture design company, Merka provides detailed documentation including:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Shading analysis diagrams</li>
              <li>Glazing schedules with U-value/SHGC documentation</li>
              <li>Envelope assemblies showing insulation layers</li>
              <li>Thermal bridge mitigation details</li>
              <li>CFD simulations (where required) for wind studies</li>
              <li>Passive performance summaries for submission packets</li>
            </ul>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              Conclusion - Passive Design as Project Discipline
            </h2>
            <p className="mb-8">
              In the UAE, passive design is not a trend. It is a necessity. Mechanical systems will always be required, but their size, cost, and lifespan depend on how well passive systems are integrated from the beginning.
            </p>
            <p className="mb-8">
              Merka Architecture continues to apply passive design strategies across project types—from residential villas in Nad Al Sheba to commercial offices in Business Bay and civic buildings in Al Ain. The approach reduces lifecycle costs, supports code compliance, and results in environments that work with the climate, not against it.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">
                Discuss Passive Design Options for Your Plot
              </h3>
              <p className="text-gray-600 mb-6">
                Merka Architecture is an architecture design company based in Dubai, providing regionally responsive building strategies.
              </p>
              <Link href="/contact">
                <button className="bg-[#041533] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#877051] transition-colors duration-300">
                  Contact Us to Discuss Your Architecture Design Project
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