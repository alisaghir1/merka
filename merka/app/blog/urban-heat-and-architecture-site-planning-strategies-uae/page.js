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
  const currentPost = blogPostsData[8] // Ninth blog post
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
            src="https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?w=1200&q=80"
            alt="Urban Heat Island Architecture"
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
            Urban Heat and Architecture: Site Planning Strategies in the UAE
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>Merka Architecture Team</span>
            <span>•</span>
            <span>November 22, 2024</span>
            <span>•</span>
            <span>9 min read</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Urban Heat Island", "Site Planning", "Climate Response", "UAE Development"].map((tag, index) => (
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
              Urban developments in the UAE face a growing challenge: heat buildup caused by dense construction, solar exposure, and limited natural ventilation. As temperatures rise and development expands, projects in Dubai, Abu Dhabi, and Sharjah must now consider microclimate response at the site level—not just at the building scale.
            </p>
            
            <p className="mb-8">
              Merka Architecture, an architecture design company based in Dubai, addresses urban heat during concept planning. The goal is to reduce thermal stress across buildings, open spaces, and pedestrian corridors. This article outlines site planning strategies that help mitigate urban heat in real project conditions.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              1. Understanding Urban Heat Islands in the Gulf Context
            </h2>
            <p className="mb-6">
              The urban heat island effect describes how developed areas retain more heat than natural landscapes. In the UAE, this effect is intensified due to:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Large asphalt and concrete surfaces</li>
              <li>Minimal vegetation and ground permeability</li>
              <li>Reflective materials used at inappropriate angles</li>
              <li>Lack of continuous shading or breeze corridors</li>
              <li>Building placements that trap radiant heat</li>
            </ul>
            <p className="mb-8">
              Districts such as Business Bay, Barsha South, Reem Island, and Dubai Silicon Oasis are especially prone to heat buildup due to massing density and limited green infrastructure.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              2. Site Orientation and Building Placement
            </h2>
            <p className="mb-6">
              Proper orientation reduces solar exposure and improves natural air movement. Merka organizes site plans to:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Minimize long elevations facing west</li>
              <li>Align main facades to capture prevailing winds (typically NW in UAE)</li>
              <li>Stagger buildings to avoid wind blockage</li>
              <li>Position high-mass structures to create shade for public areas</li>
              <li>Use gaps between buildings to create airflow zones</li>
            </ul>
            <p className="mb-8">
              Each site plan begins with a sun path analysis and wind simulation. These studies guide the layout of structures, roads, landscape, and site walls.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              3. Shading and Solar Obstruction Planning
            </h2>
            <p className="mb-6">
              Shading reduces surface temperature and improves thermal comfort. Merka incorporates:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Continuous colonnades or arcades along building bases</li>
              <li>Deep roof overhangs and awnings</li>
              <li>Trellises, pergolas, and vertical fins on west-facing facades</li>
              <li>Landscape trees selected for high canopy coverage</li>
              <li>Canopied walkways between entries, parking, and drop-offs</li>
            </ul>
            <p className="mb-8">
              In retail and hospitality projects—such as those in Palm Jumeirah and Saadiyat Island—shaded open spaces are considered functional zones, not decorative elements.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              4. Material Use and Surface Reflectivity
            </h2>
            <p className="mb-6">
              Material selection affects how much solar energy is absorbed or reflected at the ground level.
            </p>
            <p className="mb-6">
              Strategies include:
            </p>
            <ul className="mb-8 space-y-2">
              <li><strong>High-albedo pavement:</strong> Lighter colors reflect more heat</li>
              <li><strong>Pervious paving systems:</strong> Reduce retained moisture and surface heat</li>
              <li><strong>Vertical façade materials:</strong> Selected for low heat absorption on sun-facing walls</li>
              <li><strong>Avoidance of mirrored surfaces:</strong> Which create glare and local overheating</li>
              <li><strong>Roof finishes:</strong> White or light gray membranes for flat roofs</li>
            </ul>
            <p className="mb-8">
              Merka reviews the Solar Reflectance Index (SRI) for all surface materials and submits it during Dubai Green Building or Estidama reviews.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              5. Courtyard and Buffer Space Integration
            </h2>
            <p className="mb-6">
              Buffer zones reduce direct heat impact on habitable zones. Merka incorporates:
            </p>
            <ul className="mb-8 space-y-2">
              <li><strong>Interior courtyards:</strong> Promote stack ventilation and reduce solar exposure</li>
              <li><strong>Water features:</strong> Used carefully to cool surrounding air via evaporation</li>
              <li><strong>Vegetated buffers:</strong> Planted zones between buildings and parking areas</li>
              <li><strong>Sunken plazas:</strong> Shielded from high winds but shaded to reduce heat buildup</li>
              <li><strong>Setback zones:</strong> Designed with trees, screens, and softscape zones</li>
            </ul>
            <p className="mb-8">
              Courtyard strategies have been applied successfully in schools, villas, and civic buildings in inland zones such as Al Ain and Liwa.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              6. Mechanical and Passive Integration
            </h2>
            <p className="mb-6">
              While passive design is prioritized, Merka also evaluates mechanical support systems that reduce ambient heat:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Misting systems for outdoor seating in shaded areas</li>
              <li>Mechanical air curtains in open market zones</li>
              <li>Smart sensors to activate fans or shading based on temperature thresholds</li>
              <li>Green roof options in low-rise and podium developments</li>
            </ul>
            <p className="mb-8">
              All systems are integrated with authority-approved MEP planning, fire safety, and energy usage calculations.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              7. Documentation for Authority Submissions
            </h2>
            <p className="mb-6">
              Dubai Municipality and Abu Dhabi DMT expect heat mitigation strategies in many zones. Merka includes:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Microclimate diagrams in masterplans</li>
              <li>Shading studies showing coverage per hour</li>
              <li>Tree selection schedules with canopy spread documentation</li>
              <li>SRI values and hardscape material charts</li>
              <li>Landscape irrigation schedules (for cooling and sustainability goals)</li>
            </ul>
            <p className="mb-8">
              Submissions are prepared as part of full concept and detailed design packages.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">
                Control Urban Heat From the First Line on Paper
              </h3>
              <p className="text-gray-600 mb-6">
                Merka Architecture is an architecture design company in Dubai delivering site planning that addresses heat at the scale of the community, not just the building.
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