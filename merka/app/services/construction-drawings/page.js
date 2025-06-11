'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function ConstructionDrawings() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const drawingPackage = [
    { title: 'Floor plans (all levels, dimensioned, referenced, and coordinated)', icon: '📐' },
    { title: 'Roof plans and service access mapping', icon: '🏗️' },
    { title: 'External elevation sheets (annotated with finishes and profiles)', icon: '🏢' },
    { title: 'Internal elevations for kitchens, bathrooms, and lobbies', icon: '🏠' },
    { title: 'Vertical sections (cut through stair cores, service shafts, facade zones)', icon: '📏' },
    { title: 'Reflected ceiling plans (lighting integration, HVAC layout coordination)', icon: '💡' },
    { title: 'Room finish schedules and materials key', icon: '🎨' },
    { title: 'Door and window schedules', icon: '🚪' },
    { title: 'General notes and legends per authority requirement', icon: '📋' }
  ]

  const authorities = [
    { name: 'Dubai Municipality (DM)', requirements: 'Plot boundary references, setback conditions, FAR calculations' },
    { name: 'Trakhees', requirements: 'NOCs from fire, planning, structural, and utility reviewers' },
    { name: 'DDA (Dubai Development Authority)', requirements: 'Facade breakdowns and sustainability worksheets' },
    { name: 'ADM & DMT (Abu Dhabi)', requirements: 'Specific protocols for Khalifa City, Al Reem, and Masdar' }
  ]

  const deliveryFormats = [
    { format: 'AutoCAD DWG', icon: '📐', description: 'Native CAD files for editing and coordination' },
    { format: 'PDF', icon: '📄', description: 'Print-ready documentation for site teams' },
    { format: 'IFC Models', icon: '💻', description: 'BIM-compatible files for coordination' },
    { format: 'Print-Ready Files', icon: '🖨️', description: 'Color-coded trade-specific sheets' }
  ]

  const projectTypes = [
    { 
      type: 'Residential Villas', 
      locations: 'Jumeirah Park, Nad Al Sheba, Dubai South', 
      focus: 'Detailed plan sections, roof build-ups, service routing',
      icon: '🏠'
    },
    { 
      type: 'Mixed-Use Buildings', 
      locations: 'Al Quoz, Al Barsha Heights', 
      focus: 'MEP coordination, mechanical rooms, duct routing',
      icon: '🏢'
    },
    { 
      type: 'High-Rise Towers', 
      locations: 'Reem Island, Jumeirah Lakes Towers', 
      focus: 'Vertical coordination, shaft sizes, floor openings',
      icon: '🏗️'
    },
    { 
      type: 'Heritage Projects', 
      locations: 'Yas Island, Saadiyat Island', 
      focus: 'TDIC requirements, heritage materials, marine impact',
      icon: '🏛️'
    }
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
          <div className="w-20 h-20 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-8 hover:scale-110 hover:rotate-3 transition-all duration-300">
            <span className="text-white text-3xl">📐</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-500">Construction</span>
            <span className="block text-secondary-300 hover:text-white transition-colors duration-500">Drawings</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed hover:text-white transition-colors duration-500 mb-8">
            Technical foundation for building execution. Precision documentation developed according to UAE authority standards for pricing, submission, and on-site implementation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <button className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                Request Construction Drawing Set Proposal
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
                  Technical Foundation
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full group-hover:w-32 transition-all duration-300"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  Construction drawings serve as the technical foundation for any building to move from concept into execution. Developed with precision and project-specific clarity according to UAE authority standards.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  Mirka prepares construction drawing sets that address structural layout, material integration, service zones, compliance, and architectural logic across all project types.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  Every sheet follows consistent layering systems, title block structures, and authority-mandated annotation formats for seamless implementation.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-secondary-50 to-primary-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-16 h-16 border border-secondary-400 rotate-45"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border border-primary-400 rounded-full"></div>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6 relative z-10">Project Coverage</h3>
                <div className="grid grid-cols-2 gap-3 relative z-10">
                  {['Dubai Hills', 'Business Bay', 'Al Barsha South', 'Saadiyat Island', 'Reem Island', 'Dubai Creek Harbour', 'Jumeirah Park', 'Nad Al Sheba'].map((area, index) => (
                    <div key={index} className="flex items-center group cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors duration-300">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3 group-hover:scale-150 group-hover:bg-primary-600 transition-all duration-300"></div>
                      <span className="text-gray-700 text-sm group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drawing Package Section */}
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
              Architectural Drawings Package
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Comprehensive documentation for contractors, consultants, and site engineers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drawingPackage.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
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

      {/* Authority Compliance Section */}
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
              Authority Compliance
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              UAE authority-specific standards and document control procedures
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {authorities.map((authority, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100">
                  <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4 group-hover:text-secondary-800 transition-colors duration-300">
                    {authority.name}
                  </h3>
                  <div className="flex items-start">
                    <span className="text-secondary-600 font-medium mr-3 mt-1">📋</span>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                      {authority.requirements}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)`,
      }}>
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
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">{project.icon}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary-900 group-hover:text-secondary-800 transition-colors duration-300">
                      {project.type}
                    </h3>
                  </div>
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

      {/* Delivery Formats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Format & Delivery
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Multiple formats for different stakeholders and project phases
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliveryFormats.map((format, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-4 transition-all duration-300 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <span className="text-white text-2xl">{format.icon}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-primary-900 mb-3 group-hover:text-secondary-800 transition-colors duration-300">
                    {format.format}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {format.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">Staged Delivery Options</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">60%</span>
                  </div>
                  <p className="text-gray-700">Preliminary Package</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-secondary-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">90%</span>
                  </div>
                  <p className="text-gray-700">Review Package</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">100%</span>
                  </div>
                  <p className="text-gray-700">Final IFC Package</p>
                </div>
              </div>
            </div>
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
            Ready for Construction Documentation?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto hover:text-white transition-colors duration-300">
            Let's create precise technical documentation aligned to UAE authority standards for your project execution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <button className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                Request Construction Drawing Set Proposal
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