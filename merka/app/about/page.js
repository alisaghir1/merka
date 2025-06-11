'use client'
import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)
  const parallaxRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Enhanced Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          <div 
            className="absolute top-20 left-20 w-64 h-64 border-2 border-white/20 rotate-45"
            style={{ 
              transform: `translateY(${scrollY * 0.3}px) rotate(${45 + scrollY * 0.1}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white/20 rounded-full"
            style={{ 
              transform: `translateY(${scrollY * -0.2}px) scale(${1 + scrollY * 0.0005})`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/4 w-32 h-32 border-2 border-white/20"
            style={{ 
              transform: `translateX(${scrollY * 0.15}px) rotate(${scrollY * 0.2}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          
          {/* Dynamic grid pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              transform: `translateY(${scrollY * 0.1}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          
          {/* Gradient orbs */}
          <div 
            className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl"
            style={{ 
              transform: `translateY(${scrollY * -0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-2xl"
            style={{ 
              transform: `translateY(${scrollY * 0.4}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
        </div>

        <div 
          className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ 
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.002)
          }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-500">About</span>
            <span className="block text-secondary-300 hover:text-white transition-colors duration-500">MIRKA</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed hover:text-white transition-colors duration-500">
            Architecture design company headquartered in Dubai, specializing in comprehensive architectural solutions across residential, commercial, hospitality, and institutional sectors.
          </p>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: Math.max(0, 1 - scrollY * 0.01) }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 animate-pulse">Discover Our Story</span>
            <div className="animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Transition Section */}
      <div className="relative h-32 bg-gradient-to-b from-primary-900 to-white"></div>

      {/* Enhanced About Mirka Section */}
      <section className="py-20 bg-white relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 right-10 w-32 h-32 border border-primary-100 rotate-45 opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 border border-secondary-100 rounded-full opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="group">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-8 group-hover:text-secondary-800 transition-colors duration-300">
                  About Mirka
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full group-hover:w-32 transition-all duration-300"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  Mirka is an architecture design company headquartered in Dubai, United Arab Emirates. The studio specializes in comprehensive architectural solutions across residential, commercial, hospitality, and institutional sectors. Its operational footprint extends beyond Dubai, with active projects across Abu Dhabi, Sharjah, and other emirates, as well as collaborations with international clients in the GCC, Asia, USA and Europe.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  The firm's design approach is grounded in contextual intelligence. Each project begins with a deep understanding of site conditions, user needs, and environmental constraints. Mirka integrates building code knowledge, urban logic, and cultural expectations into every stage of design.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  In areas such as Downtown Dubai, Business Bay, and Jumeirah, where space, light, and density pose unique challenges, the firm's experience proves invaluable.
                </p>
              </div>
            </div>
            
            <div className="relative">
              {/* Floating card with enhanced styling */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-16 h-16 border border-primary-400 rotate-45"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border border-secondary-400 rounded-full"></div>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6 relative z-10">Our Services</h3>
                <ul className="space-y-4 relative z-10">
                  {[
                    'Conceptual development to tender-ready documentation',
                    '3D modeling and BIM coordination',
                    'Façade studies and site analysis',
                    'Compliance mapping and regulatory efficiency',
                    'Code-savvy approach with authority approvals',
                    'Technical documentation and working drawings'
                  ].map((service, index) => (
                    <li key={index} className="flex items-start group cursor-pointer">
                      <div className="w-3 h-3 bg-secondary-400 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-150 group-hover:bg-primary-600 transition-all duration-300"></div>
                      <span className="text-gray-700 group-hover:text-gray-900 group-hover:translate-x-2 transition-all duration-300">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Vision & Mission with Parallax Background */}
      <section 
        ref={parallaxRef}
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #f0f4f8 0%, #faf9f7 100%)`,
        }}
      >
        {/* Parallax background elements */}
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-secondary-200/20 to-primary-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Vision & Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enhanced Vision Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <span className="text-white text-2xl">👁️</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-primary-900 group-hover:text-primary-700 transition-colors duration-300">Vision</h3>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="hover:text-gray-900 transition-colors duration-300">
                    Mirka envisions a built environment where architecture responds directly to its context, enhances the lives of its users, and remains viable through time. The firm believes that design should not merely occupy a site but rather contribute meaningfully to its surrounding conditions—whether physical, social, or climatic.
                  </p>
                  <p className="hover:text-gray-900 transition-colors duration-300">
                    In locations such as Dubai Marina, where density is high and solar exposure is intense, buildings must be planned with passive cooling in mind. In villa zones like Mirdif or Al Furjan, privacy and internal zoning take precedence.
                  </p>
                  <p className="font-medium text-primary-800 bg-primary-50 p-3 rounded-lg hover:bg-primary-100 transition-colors duration-300">
                    Mirka's vision is one of restraint, precision, and respect—for the site, for the people who occupy it, and for the city that hosts it.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Mission Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-800 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-secondary-600 to-secondary-800 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-primary-900 group-hover:text-secondary-700 transition-colors duration-300">Mission</h3>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="hover:text-gray-900 transition-colors duration-300">
                    The mission of Mirka is to produce architectural solutions that are clear, rational, and responsive. Each project begins with rigorous research, followed by technical strategy, schematic planning, and development into working drawings.
                  </p>
                  <p className="hover:text-gray-900 transition-colors duration-300">
                    No design element is arbitrary; all components are evaluated for purpose, cost, and buildability. Clients are engaged throughout the project timeline. Authorities are consulted proactively.
                  </p>
                  <p className="font-medium text-secondary-800 bg-secondary-50 p-3 rounded-lg hover:bg-secondary-100 transition-colors duration-300">
                    Mirka's objective is to produce work that holds up to technical scrutiny while maintaining spatial intelligence and design clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Founding Story with Parallax Text */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-40 right-10 w-64 h-64 border-2 border-primary-100 rotate-45 opacity-20"
            style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${45 + scrollY * 0.05}deg)` }}
          ></div>
          <div 
            className="absolute bottom-20 left-10 w-48 h-48 border-2 border-secondary-100 rounded-full opacity-20"
            style={{ transform: `translateY(${scrollY * -0.15}px) scale(${1 + scrollY * 0.0002})` }}
          ></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Founding Story
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
          </div>

          <div className="relative">
            {/* Enhanced story card */}
            <div className="bg-gradient-to-br from-gray-50 to-primary-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-secondary-400"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border border-primary-300 rotate-45 opacity-30"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border border-secondary-300 rounded-full opacity-30"></div>
              
              <div className="space-y-6 text-gray-700 leading-relaxed relative z-10">
                <p className="text-xl font-medium text-primary-900 p-4 bg-white/50 rounded-lg hover:bg-white transition-colors duration-300">
                  Mirka was established in Dubai to address a growing gap in architectural delivery: the disconnect between visual ambition and practical execution.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-3 hover:bg-white/30 rounded-lg">
                  The founders—architects and planners with backgrounds in high-density developments and civic architecture—recognized a pattern of buildings being produced without due regard for site logic, energy use, or regulatory viability.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-3 hover:bg-white/30 rounded-lg">
                  In early residential projects across Al Barsha South and Nad Al Sheba, the firm adopted a principle of functional hierarchy—starting from climate orientation, site topography, and internal movement. These early designs were not only well-received by clients but also passed through authority approvals with minimal revisions.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-3 hover:bg-white/30 rounded-lg">
                  As projects scaled up—such as commercial designs in Dubai Silicon Oasis and mixed-use compounds in Sharjah—the same process proved reliable. Each building was planned to solve real-world conditions: noise intrusion, heat gain, zoning limitations, and user behavior.
                </p>
                <p className="font-medium text-primary-800 bg-primary-100 p-4 rounded-lg hover:bg-primary-200 transition-colors duration-300">
                  This foundational philosophy continues to define Mirka's practice. The studio grew not through aggressive branding but through consistent delivery, word-of-mouth recommendations, and performance-based results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Studio Culture & Team Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, #faf9f7 0%, #f0f4f8 100%)`,
      }}>
        {/* Animated background */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-secondary-200/20 to-primary-200/20 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          ></div>
          <div 
            className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-primary-200/30 to-secondary-200/30 rounded-full blur-2xl"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Studio Culture & Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
          </div>

          {/* Enhanced team cards grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              { icon: '🏗️', title: 'Multidisciplinary Team', desc: 'Architects, urban designers, engineers, BIM coordinators, and design technologists from various backgrounds.', gradient: 'from-primary-600 to-primary-800' },
              { icon: '☁️', title: 'Cloud-Based Systems', desc: 'Real-time coordination across Dubai, Abu Dhabi, and Sharjah with international partners integration.', gradient: 'from-secondary-600 to-secondary-800' },
              { icon: '✅', title: 'Quality Assurance', desc: 'Structured review cycles with multiple audits for constructability and code compliance.', gradient: 'from-primary-600 to-secondary-600' }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-6 transition-all duration-500">
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                      <span className="text-white text-2xl group-hover:text-3xl transition-all duration-300">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-primary-900 mb-3 group-hover:text-secondary-800 transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced approach and expertise section */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6 hover:text-secondary-800 transition-colors duration-300">Our Approach</h3>
                <div className="space-y-4 text-gray-700">
                  <p className="hover:text-gray-900 transition-colors duration-300 p-3 hover:bg-gray-50 rounded-lg">Mirka maintains a collaborative and multidisciplinary work environment. The studio brings together diverse professionals who encourage intellectual exchange, peer review, and continuous improvement.</p>
                  <p className="hover:text-gray-900 transition-colors duration-300 p-3 hover:bg-gray-50 rounded-lg">The office operates from Al Quoz, Dubai, while maintaining on-ground collaborators in Abu Dhabi and Sharjah. All design work follows a structured review cycle where concepts are discussed internally before presentation.</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6 hover:text-secondary-800 transition-colors duration-300">Regulatory Expertise</h3>
                <div className="space-y-3">
                  {[
                    'Dubai Municipality',
                    'Trakhees',
                    'DDA (Dubai Development Authority)',
                    'Abu Dhabi\'s ADM',
                    'Business Bay & Downtown Dubai compliance'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center group cursor-pointer p-2 hover:bg-primary-50 rounded-lg transition-colors duration-300">
                      <div className="w-3 h-3 bg-secondary-400 rounded-full mr-3 group-hover:scale-150 group-hover:bg-primary-600 transition-all duration-300"></div>
                      <span className="text-gray-700 group-hover:text-gray-900 group-hover:translate-x-2 transition-all duration-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Awards & Certifications Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 right-20 w-32 h-32 border border-primary-100 rotate-45 opacity-20"
            style={{ transform: `translateY(${scrollY * 0.08}px) rotate(${45 + scrollY * 0.03}deg)` }}
          ></div>
          <div 
            className="absolute bottom-40 left-20 w-24 h-24 border border-secondary-100 rounded-full opacity-20"
            style={{ transform: `translateY(${scrollY * -0.12}px) scale(${1 + scrollY * 0.0001})` }}
          ></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Awards & Certifications
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6 group-hover:text-secondary-800 transition-colors duration-300">Recognition</h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="hover:text-gray-900 transition-colors duration-300 p-3 hover:bg-white/50 rounded-lg">
                    Although Mirka is a recently established architectural design company, its impact within the built environment has been acknowledged by clients, collaborators, and regulatory entities alike.
                  </p>
                  <p className="hover:text-gray-900 transition-colors duration-300 p-3 hover:bg-white/50 rounded-lg">
                    Designs completed in areas such as Al Barsha, Dubai Hills, and Al Reem Island have been cited by local consultants and developers for their clarity, code compliance, and site-responsiveness.
                  </p>
                  <p className="font-medium text-primary-800 bg-primary-100 p-4 rounded-lg hover:bg-primary-200 transition-colors duration-300">
                    The studio's reputation is built on reliability, regulatory fluency, and consistent delivery. That, in itself, remains the most meaningful recognition.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative bg-white border-2 border-primary-100 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6 group-hover:text-secondary-800 transition-colors duration-300">UAE Certifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg hover:from-primary-100 hover:to-secondary-100 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">🏛️</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900 group-hover:text-primary-700 transition-colors duration-300">Fully Licensed & Accredited</p>
                      <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">United Arab Emirates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg hover:from-secondary-100 hover:to-primary-100 transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-secondary-800 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">📋</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900 group-hover:text-secondary-700 transition-colors duration-300">Technical Compliance</p>
                      <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">Structured internal processes</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mt-6 italic hover:text-gray-800 transition-colors duration-300 p-3 hover:bg-gray-50 rounded-lg">
                  These credentials reflect not only technical compliance but a structured internal process—essential for any project, whether in high-density zones or coastal plots.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Dubai Market Expertise Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
      }}>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-white/5 to-secondary-300/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0003})` }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-primary-300/10 to-white/5 rounded-full blur-2xl"
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rotate-45"
            style={{ transform: `translate(-50%, -50%) rotate(${45 + scrollY * 0.1}deg)` }}
          ></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 hover:scale-105 transition-transform duration-300 text-white">
              Dubai Market Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300 mb-6"></div>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto hover:text-white transition-colors duration-300">
              Dubai presents unique challenges for architectural practice. Each master-planned community has its own set of codes, FAR restrictions, material allowances, and infrastructure connections.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white mb-4 hover:text-secondary-200 transition-colors duration-300">Specialized Areas</h3>
              <div className="space-y-4">
                {[
                  { area: 'Emirates Hills & Jumeirah Islands', focus: 'Luxury villa design with integrated landscape' },
                  { area: 'Dubai Marina & JLT', focus: 'Tower typologies with wind dynamics control' },
                  { area: 'Palm Jumeirah & Dubai South', focus: 'Trakhees submissions and document control' },
                  { area: 'Reem Island & Yas Island', focus: 'ADM workflows and infrastructure coordination' }
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 group cursor-pointer">
                    <h4 className="font-semibold text-secondary-200 mb-2 group-hover:text-white transition-colors duration-300">{item.area}</h4>
                    <p className="text-gray-300 text-sm group-hover:text-gray-100 transition-colors duration-300">{item.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white mb-4 hover:text-secondary-200 transition-colors duration-300">Our Guidance Covers</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Plot potential optimization',
                  'Solar performance analysis',
                  'Traffic impact review integration',
                  'Privacy zoning for cultural sensitivity',
                  'Fast-track approval strategies'
                ].map((item, index) => (
                  <div key={index} className="flex items-center group cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
                    <div className="w-3 h-3 bg-secondary-400 rounded-full mr-3 group-hover:scale-150 group-hover:bg-white transition-all duration-300"></div>
                    <span className="text-gray-200 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 mt-8 hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-500 group">
                <p className="text-gray-200 italic group-hover:text-white transition-colors duration-300">
                  "Whether designing a family compound in Al Mizhar or a retail podium in Al Maryah Island, Mirka brings not only design knowledge but a deep operational understanding of each local market."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}