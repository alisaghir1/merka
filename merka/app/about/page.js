'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const scrollValue = mounted ? scrollY : 0

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Loading Curtain Animation */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-1500 ease-out ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-[#041533] to-[#877051]">
          {/* Curtain Effect */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-[#041533] to-[#877051] transition-transform duration-1500 ease-out ${
              isLoaded ? 'transform translate-y-full' : 'transform translate-y-0'
            }`}
          />
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-[#877051] to-[#041533] transition-transform duration-1500 ease-out delay-300 ${
              isLoaded ? 'transform -translate-y-full' : 'transform translate-y-0'
            }`}
          />
          
          {/* Loading Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-white">
                ABOUT
              </h1>
              <div className="w-32 h-1 bg-white mx-auto mt-4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section with Image Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 scale-110"
          style={{
            transform: mounted ? `translateY(${scrollValue * 0.5}px)` : 'translateY(0px)',
            transition: mounted ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Modern Architecture Office"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Content with entrance animation */}
        <div 
          className={`relative z-10 text-center max-w-6xl mx-auto px-4 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            <span 
              className={`block transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              About
            </span>
            <span 
              className={`block text-[#877051] transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              Merka
            </span>
          </h1>
          
          <p 
            className={`text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1400ms' }}
          >
            Architecture design company headquartered in Dubai, specializing in comprehensive architectural solutions across residential, commercial, hospitality, and institutional sectors.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: mounted ? Math.max(0, 1 - scrollValue * 0.01) : 1 }}
        >
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-sm mb-2">Discover Our Story</span>
            <div className="w-6 h-10 border-2 border-white rounded-full relative">
              <div className="w-1 h-3 bg-white rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Text Cutout Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Fixed Background Image */}
        <div className="fixed inset-0 w-full h-full" style={{ zIndex: -10 }}>
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Architectural Design Process"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-200/80"></div>
        </div>

        {/* Text Cutout */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h2 
            className="text-[12rem] md:text-[18rem] lg:text-[22rem] font-serif font-black text-transparent leading-none select-none"
            style={{
              WebkitTextStroke: '4px #041533',
              filter: 'drop-shadow(0 0 20px rgba(4, 21, 51, 0.3))',
            }}
          >
            STORY
          </h2>
        </div>

        {/* Content inside cutout */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div 
            className={`text-center max-w-3xl mx-auto px-4 pointer-events-auto transition-all duration-1000 ease-out ${
              scrollValue > 500 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50">
              <h3 className="text-3xl font-serif font-bold text-[#041533] mb-4">
                Our Founding Story
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Merka was established in Dubai to address a growing gap in architectural delivery: the disconnect between visual ambition and practical execution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#founding-story" className="group bg-[#041533] text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:bg-[#877051] hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2">
                  Read Our Story
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="#team" className="group border-2 border-[#041533] text-[#041533] px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm hover:bg-[#041533] hover:text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  Meet The Team
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Merka Section with Image */}
      <section className="py-20 bg-white relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 1000 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              About Merka
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in comprehensive architectural solutions across residential, commercial, hospitality, and institutional sectors.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div 
              className={`space-y-8 transition-all duration-1000 ease-out ${
                scrollValue > 1200 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  Merka is an architecture design company headquartered in Dubai, United Arab Emirates. The studio specializes in comprehensive architectural solutions across residential, commercial, hospitality, and institutional sectors.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  The firm&apos;s design approach is grounded in contextual intelligence. Each project begins with a deep understanding of site conditions, user needs, and environmental constraints.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  In areas such as Downtown Dubai, Business Bay, and Jumeirah, where space, light, and density pose unique challenges, the firm&apos;s experience proves invaluable.
                </p>
              </div>
            </div>
            
            <div 
              className={`relative transition-all duration-1000 ease-out ${
                scrollValue > 1200 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {/* Featured Image */}
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 mb-8">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                  alt="Merka Architecture Team at Work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Our Dubai Studio</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#041533]/5 to-[#877051]/5 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500">
                <h3 className="text-2xl font-serif font-bold text-[#041533] mb-6">Our Services</h3>
                <ul className="space-y-4">
                  {[
                    'Conceptual development to tender-ready documentation',
                    '3D modeling and BIM coordination',
                    'Façade studies and site analysis',
                    'Compliance mapping and regulatory efficiency',
                    'Code-savvy approach with authority approvals',
                    'Technical documentation and working drawings'
                  ].map((service, index) => (
                    <li key={index} className="flex items-start group cursor-pointer">
                      <div className="w-3 h-3 bg-[#877051] rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-150 group-hover:bg-[#041533] transition-all duration-300"></div>
                      <span className="text-gray-700 group-hover:text-gray-900 group-hover:translate-x-2 transition-all duration-300">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 1800 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Vision & Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Vision Card */}
            <div 
              className={`relative group transition-all duration-1000 ease-out ${
                scrollValue > 2000 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 hover:border-[#877051]/30">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#041533] to-[#877051] rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <span className="text-white text-3xl">👁️</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#041533] group-hover:text-[#877051] transition-colors duration-300">Vision</h3>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="hover:text-gray-900 transition-colors duration-300">
                    Merka envisions a built environment where architecture responds directly to its context, enhances the lives of its users, and remains viable through time.
                  </p>
                  <p className="hover:text-gray-900 transition-colors duration-300">
                    In locations such as Dubai Marina, where density is high and solar exposure is intense, buildings must be planned with passive cooling in mind.
                  </p>
                  <p className="font-medium text-[#041533] bg-[#041533]/5 p-3 rounded-lg hover:bg-[#041533]/10 transition-colors duration-300">
                    Merka&apos;s vision is one of restraint, precision, and respect—for the site, for the people who occupy it, and for the city that hosts it.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div 
              className={`relative group transition-all duration-1000 ease-out ${
                scrollValue > 2000 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 hover:border-[#877051]/30">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#877051] to-[#041533] rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <span className="text-white text-3xl">🎯</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-[#041533] group-hover:text-[#877051] transition-colors duration-300">Mission</h3>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="hover:text-gray-900 transition-colors duration-300">
                    The mission of Merka is to produce architectural solutions that are clear, rational, and responsive. Each project begins with rigorous research.
                  </p>
                  <p className="hover:text-gray-900 transition-colors duration-300">
                    No design element is arbitrary; all components are evaluated for purpose, cost, and buildability. Clients are engaged throughout the project timeline.
                  </p>
                  <p className="font-medium text-[#877051] bg-[#877051]/5 p-3 rounded-lg hover:bg-[#877051]/10 transition-colors duration-300">
                    Merka&apos;s objective is to produce work that holds up to technical scrutiny while maintaining spatial intelligence and design clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Story Section */}
      <section id="founding-story" className="py-20 bg-white relative z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              scrollValue > 2500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Founding Story
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
          </div>

          <div 
            className={`relative transition-all duration-1000 ease-out ${
              scrollValue > 2700 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-gradient-to-br from-gray-50 to-[#041533]/5 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-xl font-medium text-[#041533] p-4 bg-white/50 rounded-lg hover:bg-white transition-colors duration-300">
                  Merka was established in Dubai to address a growing gap in architectural delivery: the disconnect between visual ambition and practical execution.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-3 hover:bg-white/30 rounded-lg">
                  The founders—architects and planners with backgrounds in high-density developments and civic architecture—recognized a pattern of buildings being produced without due regard for site logic, energy use, or regulatory viability.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-3 hover:bg-white/30 rounded-lg">
                  In early residential projects across Al Barsha South and Nad Al Sheba, the firm adopted a principle of functional hierarchy—starting from climate orientation, site topography, and internal movement.
                </p>
                <p className="font-medium text-[#041533] bg-[#041533]/10 p-4 rounded-lg hover:bg-[#041533]/20 transition-colors duration-300">
                  This foundational philosophy continues to define Merka&apos;s practice. The studio grew not through aggressive branding but through consistent delivery, word-of-mouth recommendations, and performance-based results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Culture & Team Section */}
      <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 3000 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Studio Culture & Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {[
              { icon: '🏗️', title: 'Multidisciplinary Team', desc: 'Architects, urban designers, engineers, BIM coordinators, and design technologists from various backgrounds.', gradient: 'from-[#041533] to-[#877051]' },
              { icon: '☁️', title: 'Cloud-Based Systems', desc: 'Real-time coordination across Dubai, Abu Dhabi, and Sharjah with international partners integration.', gradient: 'from-[#877051] to-[#041533]' },
              { icon: '✅', title: 'Quality Assurance', desc: 'Structured review cycles with multiple audits for constructability and code compliance.', gradient: 'from-[#041533] to-[#877051]' }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`group relative transition-all duration-1000 ease-out ${
                  scrollValue > 3200 + index * 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-6 transition-all duration-500 border border-gray-100 hover:border-[#877051]/30">
                  <div className="text-center">
                    <div className={`w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <span className="text-white text-3xl group-hover:text-4xl transition-all duration-300">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#041533] mb-3 group-hover:text-[#877051] transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Parallax Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Fixed Background */}
        <div className="fixed inset-0 w-full h-full" style={{ zIndex: -5 }}>
          <Image
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80"
            alt="Dubai Skyline Architecture"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#041533]/80 to-[#877051]/80"></div>
        </div>

        {/* Text Cutout */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h2 
            className="text-[8rem] md:text-[12rem] lg:text-[15rem] font-serif font-black text-transparent leading-none select-none"
            style={{
              WebkitTextStroke: '3px #ffffff',
              filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))',
            }}
          >
            DUBAI
          </h2>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div 
            className={`text-center max-w-3xl mx-auto px-4 pointer-events-auto transition-all duration-1000 ease-out ${
              scrollValue > 3800 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-3xl border-2 border-white/20 shadow-2xl">
              <h3 className="text-4xl font-serif font-bold text-white mb-6">
                Dubai Market Expertise
              </h3>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Dubai presents unique challenges for architectural practice. Each master-planned community has its own set of codes, FAR restrictions, material allowances, and infrastructure connections.
              </p>
              <a href="#dubai-expertise" className="group inline-flex items-center gap-2 bg-white text-[#041533] px-10 py-5 rounded-2xl font-semibold text-lg shadow-xl hover:bg-gray-50 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                Learn More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dubai Market Expertise Section */}
      <section id="dubai-expertise" className="py-20 bg-gradient-to-br from-[#041533] via-[#2f3541] to-[#877051] text-white relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 4200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
              Dubai Market Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-white rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              Dubai presents unique challenges for architectural practice. Each master-planned community has its own set of codes, FAR restrictions, material allowances, and infrastructure connections.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div 
              className={`space-y-6 transition-all duration-1000 ease-out ${
                scrollValue > 4400 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Specialized Areas</h3>
              <div className="space-y-4">
                {[
                  { area: 'Emirates Hills & Jumeirah Islands', focus: 'Luxury villa design with integrated landscape' },
                  { area: 'Dubai Marina & JLT', focus: 'Tower typologies with wind dynamics control' },
                  { area: 'Palm Jumeirah & Dubai South', focus: 'Trakhees submissions and document control' },
                  { area: 'Reem Island & Yas Island', focus: 'ADM workflows and infrastructure coordination' }
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300 group cursor-pointer">
                    <h4 className="font-semibold text-[#877051] mb-2 group-hover:text-white transition-colors duration-300">{item.area}</h4>
                    <p className="text-gray-300 text-sm group-hover:text-gray-100 transition-colors duration-300">{item.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className={`space-y-6 transition-all duration-1000 ease-out ${
                scrollValue > 4400 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Our Guidance Covers</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Plot potential optimization',
                  'Solar performance analysis',
                  'Traffic impact review integration',
                  'Privacy zoning for cultural sensitivity',
                  'Fast-track approval strategies'
                ].map((item, index) => (
                  <div key={index} className="flex items-center group cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors duration-300">
                    <div className="w-3 h-3 bg-[#877051] rounded-full mr-3 group-hover:scale-150 group-hover:bg-white transition-all duration-300"></div>
                    <span className="text-gray-200 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 mt-8 hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-500 group">
                <p className="text-gray-200 italic group-hover:text-white transition-colors duration-300">
                  &quot;Whether designing a family compound in Al Mizhar or a retail podium in Al Maryah Island, Merka brings not only design knowledge but a deep operational understanding of each local market.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#877051] to-[#041533] relative z-30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div 
            className={`transition-all duration-1000 ease-out ${
              scrollValue > 4800 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your architectural project and create something extraordinary together
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
              <Link href="/contact" className="group inline-flex items-center justify-center gap-2 bg-white text-[#041533] px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-semibold text-base sm:text-lg shadow-xl hover:bg-gray-50 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                Start Your Project
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/projects" className="group inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-semibold text-base sm:text-lg backdrop-blur-sm hover:bg-white hover:text-[#041533] hover:scale-105 transition-all duration-300">
                View Our Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}