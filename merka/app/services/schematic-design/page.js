'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function SchematicDesign() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const deliverables = [
    { title: 'Scaled architectural floor plans', icon: '📐' },
    { title: 'Site layout with vehicular and pedestrian flow', icon: '🚗' },
    { title: 'Preliminary elevation drawings (front, side, rear)', icon: '📊' },
    { title: 'Roof plans and roofscape access strategy', icon: '🏗️' },
    { title: 'Building sections to indicate volume, structure, and facade depth', icon: '📏' },
    { title: 'GFA and FAR computation tables', icon: '📋' },
    { title: 'Preliminary fire egress strategy', icon: '🚪' },
    { title: 'Basic material palette direction', icon: '🎨' },
    { title: 'Initial facade articulation and shading approach', icon: '🏢' },
    { title: 'Parking distribution and access circulation', icon: '🚙' },
    { title: 'Draft submissions for client and authority feedback', icon: '📄' }
  ]

  const projectTypes = [
    { type: 'Residential Villas', locations: 'Nad Al Sheba, Jumeirah Islands, Al Barari', focus: 'Privacy, service access, cross-ventilation' },
    { type: 'Mid-Rise & High-Rise', locations: 'Business Bay, Dubai Internet City', focus: 'Core planning, vertical circulation, mechanical shafts' },
    { type: 'Commercial & Hospitality', locations: 'Al Seef, Dubai Production City', focus: 'Service flow, delivery access, BOH functions' },
    { type: 'Institutional', locations: 'Mohammed Bin Zayed City, Al Ain', focus: 'Mechanical zones, fire control, accessibility' }
  ]

  const authorities = [
    'Dubai Municipality',
    'DDA (Dubai Development Authority)',
    'Trakhees',
    'ADM (Abu Dhabi Municipality)'
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Enhanced Hero Section */}
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
          
          {/* Grid pattern */}
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
        </div>

        <div 
          className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ 
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.002)
          }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-secondary-600 to-secondary-800 rounded-xl flex items-center justify-center mx-auto mb-8 hover:scale-110 hover:rotate-3 transition-all duration-300">
            <span className="text-white text-3xl">📐</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-500">Schematic</span>
            <span className="block text-secondary-300 hover:text-white transition-colors duration-500">Design</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed hover:text-white transition-colors duration-500 mb-8">
            The technical bridge between conceptual vision and design development. Formalizing spatial relationships and establishing primary systems across the UAE.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <button className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                Request Project Review
              </button>
            </Link>
            <Link href="/services">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                All Services
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: Math.max(0, 1 - scrollY * 0.01) }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 animate-pulse">Explore Our Process</span>
            <div className="animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Transition */}
      <div className="relative h-32 bg-gradient-to-b from-primary-900 to-white"></div>

      {/* Overview Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 right-10 w-32 h-32 border border-primary-100 rotate-45 opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 border border-secondary-100 rounded-full opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="group">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-8 group-hover:text-secondary-800 transition-colors duration-300">
                  Technical Bridge
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full group-hover:w-32 transition-all duration-300"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  Schematic design is the second major phase where spatial relationships are formalized, primary systems are established, and architectural intent is prepared for coordination with authorities and engineering disciplines.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  This stage allows clients to understand the project's spatial logic, circulation flow, and visual massing in measurable and buildable terms through scaled drawings and 3D models.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  Each schematic set is created with jurisdiction-specific considerations, ensuring compliance with local authority requirements from the outset.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-secondary-50 to-primary-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-16 h-16 border border-secondary-400 rotate-45"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border border-primary-400 rounded-full"></div>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6 relative z-10">Authority Compliance</h3>
                <div className="space-y-3 relative z-10">
                  {authorities.map((authority, index) => (
                    <div key={index} className="flex items-center group cursor-pointer p-3 hover:bg-white/50 rounded-lg transition-colors duration-300">
                      <div className="w-3 h-3 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mr-4 group-hover:scale-150 transition-all duration-300"></div>
                      <span className="text-gray-700 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300">{authority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, #f0f4f8 0%, #faf9f7 100%)`,
      }}>
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
              Project Specializations
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projectTypes.map((project, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500">
                  <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4 group-hover:text-secondary-800 transition-colors duration-300">
                    {project.type}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-secondary-600 font-medium mr-2">📍</span>
                      <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{project.locations}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary-600 font-medium mr-2">🎯</span>
                      <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{project.focus}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white relative overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Our Process
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                step: '01', 
                title: 'Concept Approval', 
                desc: 'Begin once client approves conceptual framework',
                gradient: 'from-primary-600 to-primary-800'
              },
              { 
                step: '02', 
                title: 'Technical Development', 
                desc: 'Develop scaled plans, elevations, and sections',
                gradient: 'from-secondary-600 to-secondary-800'
              },
              { 
                step: '03', 
                title: 'BIM Integration', 
                desc: 'Create 3D models for visualization and compliance',
                gradient: 'from-primary-600 to-secondary-600'
              },
              { 
                step: '04', 
                title: 'Authority Review', 
                desc: 'Internal review and client approval process',
                gradient: 'from-secondary-600 to-primary-600'
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform -translate-y-1/2 z-0"></div>
                  )}
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto relative z-10 group-hover:scale-125 transition-transform duration-300`}>
                    <span className="text-white font-bold">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-serif font-bold text-primary-900 mb-2 group-hover:text-secondary-800 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135f, #f8fafc 0%, #f1f5f9 100%)`,
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Deliverables
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Comprehensive documentation prepared for authority submissions and client review
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-secondary-300 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-lg">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary-900 group-hover:text-secondary-800 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
      }}>
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-white/5 to-secondary-300/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0003})` }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-primary-300/10 to-white/5 rounded-full blur-2xl"
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 hover:scale-105 transition-transform duration-300">
            Ready for Schematic Design?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto hover:text-white transition-colors duration-300">
            Let's formalize your spatial relationships and establish primary systems with our comprehensive schematic design services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <button className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                Request Project Review
              </button>
            </Link>
            <Link href="/services">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 hover:shadow-xl hover:scale-105 transition-all duration-300">
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}