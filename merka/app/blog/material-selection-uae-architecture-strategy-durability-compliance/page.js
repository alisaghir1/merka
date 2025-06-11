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
  const currentPost = blogPostsData[5] // Sixth blog post
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
            src="https://images.unsplash.com/photo-1515191107209-c28698631303?w=1200&q=80"
            alt="Material Selection Architecture"
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
            Material Selection in UAE Architecture: Strategy, Durability, and Compliance
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-200 mb-8">
            <span>Merka Architecture Team</span>
            <span>•</span>
            <span>December 1, 2024</span>
            <span>•</span>
            <span>9 min read</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Material Selection", "Design Process", "Building Materials", "UAE Standards"].map((tag, index) => (
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
              Material choice plays a decisive role in a building's long-term performance, lifecycle cost, and authority approval process. For projects across Dubai, Abu Dhabi, Sharjah, and Al Ain, environmental exposure and regulatory expectations must guide every material-related decision.
            </p>
            
            <p className="mb-8">
              Merka Architecture, an architecture design company based in Dubai, develops material strategies that address heat, humidity, salt exposure, and buildability—while meeting all required UAE codes.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              1. Climate-Driven Material Considerations
            </h2>
            <p className="mb-6">
              In the UAE, materials are exposed to high temperatures, UV radiation, airborne dust, and in coastal areas, salt-laden air. These conditions impact façades, roofing, glazing, and finishes.
            </p>
            <p className="mb-6">
              Key concerns include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Surface degradation due to solar radiation</li>
              <li>Thermal expansion and contraction cycles</li>
              <li>Corrosion on fixings and metal components</li>
              <li>Water ingress from driving rain in exposed areas</li>
              <li>Staining or fading on porous materials</li>
            </ul>
            <p className="mb-8">
              For each project, Merka begins with a climate profile. This includes solar exposure maps, humidity levels, wind speed, and the distance to the coast. In zones like Palm Jumeirah or Saadiyat Island, only materials with documented salt resistance are considered for façade or roof use.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              2. Façade Systems and Surface Finishes
            </h2>
            <p className="mb-6">
              Façade systems are reviewed not only for appearance, but also for compliance and performance. Common systems used in UAE projects include:
            </p>
            <ul className="mb-8 space-y-2">
              <li><strong>Precast concrete panels</strong> – Durable, fast to install, available in custom finishes</li>
              <li><strong>Glassfibre Reinforced Concrete (GRC)</strong> – Suitable for screens, projections, and detailed articulation</li>
              <li><strong>High-pressure laminates (HPL)</strong> – Used selectively in shaded areas or for signage</li>
              <li><strong>Aluminum composite panels (ACP)</strong> – Approved fire-rated variants only</li>
              <li><strong>Natural stone (granite, sandstone, travertine)</strong> – Applied with ventilated systems or adhesive-fixed</li>
              <li><strong>Textured plaster and mineral paints</strong> – Used in controlled applications, primarily for mid-rise buildings</li>
            </ul>
            <p className="mb-8">
              Material test certificates, fire ratings, and supplier data sheets are reviewed before final specification. All materials are evaluated against Dubai Municipality and Civil Defense regulations, particularly for projects involving public access.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              3. Roofing and Waterproofing Systems
            </h2>
            <p className="mb-6">
              Flat roofs are common in UAE architecture. These surfaces experience high solar gain and must resist cracking, delamination, or water retention.
            </p>
            <p className="mb-6">
              Merka Architecture coordinates:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Modified bitumen membranes with reflective coatings</li>
              <li>TPO or PVC membrane systems for high-performance zones</li>
              <li>Thermal insulation boards with moisture resistance</li>
              <li>Protective screed or ballast layers depending on rooftop use</li>
              <li>Integrated drainage plans reviewed during detail development</li>
            </ul>
            <p className="mb-8">
              For exposed terraces and podiums, slip resistance, UV durability, and surface heat retention are tested using site-specific conditions.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              4. Interior Materials: Health, Maintenance, and Regulations
            </h2>
            <p className="mb-6">
              Interior finishes must meet authority fire, hygiene, and maintenance criteria. In schools, hospitals, restaurants, and other regulated environments, only approved materials can be used.
            </p>
            <p className="mb-6">
              Examples include:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Non-slip porcelain tiles for wet zones</li>
              <li>Low-VOC paints in all habitable rooms</li>
              <li>Fire-retardant MDF or gypsum boards for partitions and ceilings</li>
              <li>Acoustic ceiling tiles in office zones</li>
              <li>Stain-resistant surfaces in healthcare or high-traffic environments</li>
              <li>Slip-rated vinyl flooring in kitchens and service areas</li>
            </ul>
            <p className="mb-8">
              Merka coordinates with interior designers and contractors to verify samples, check batch codes, and confirm authority certificates.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              5. Fire Compliance and Material Testing
            </h2>
            <p className="mb-6">
              Fire compliance is central to material selection in the UAE. Civil Defense requires full test reports and classification certificates for:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Cladding systems (reaction to fire and spread of flame)</li>
              <li>Internal wall and ceiling finishes</li>
              <li>Paints and coatings</li>
              <li>Doorsets and partitions</li>
              <li>Insulation layers in cavity walls or roofs</li>
            </ul>
            <p className="mb-8">
              Merka Architecture collaborates with Civil Defense-accredited labs to confirm fire performance. All material selections are reflected in architectural drawings, BOQs, and authority submittals. In zones such as Jebel Ali (Trakhees), this also includes façade risk assessments and third-party reviews.
            </p>
            
            <h2 className="text-3xl font-serif font-bold text-[#041533] mt-12 mb-6">
              6. Authority Coordination and Approval Process
            </h2>
            <p className="mb-6">
              Every material strategy is aligned with the approval process. Depending on the jurisdiction, materials must be submitted for review during:
            </p>
            <ul className="mb-8 space-y-2">
              <li>Concept design stage (for developer review)</li>
              <li>Detailed design submission (for DM, DDA, or Trakhees)</li>
              <li>Fire approval (through Civil Defense or delegated entity)</li>
              <li>Construction documentation (for site verification and inspection)</li>
              <li>Mock-up approval (for projects requiring site samples or façade test walls)</li>
            </ul>
            <p className="mb-8">
              Material boards are created digitally and physically. Mock-ups are reviewed on-site when required, with contractor coordination handled directly by Merka's architectural and supervision teams.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">
                Need Help Selecting Materials for Your Project?
              </h3>
              <p className="text-gray-600 mb-6">
                Merka Architecture is an architecture design company based in Dubai, supporting material strategy from concept to construction.
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