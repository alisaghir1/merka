'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function AuthorityApprovals() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dmRequirements = [
    { title: 'Plot boundary mapping with title deed references', icon: '📍' },
    { title: 'FAR calculations and zoning overlays', icon: '📊' },
    { title: 'Architectural floor plans with full dimensional accuracy', icon: '📐' },
    { title: 'External elevations annotated with material specifications', icon: '🏢' },
    { title: 'Section drawings indicating building height and service integration', icon: '📏' },
    { title: 'Site layout plans reflecting road access, fire access, and boundary setbacks', icon: '🗺️' },
    { title: 'Fire egress plans and vertical circulation logic', icon: '🚨' },
    { title: 'Roof layout showing equipment, services, and drainage', icon: '🏗️' },
    { title: 'Parking calculation tables aligned with Dubai code requirements', icon: '🚗' },
    { title: 'Built-up Area Summary Sheets (BUA Tables)', icon: '📋' },
    { title: 'Energy and sustainability form submissions (where applicable)', icon: '🌱' }
  ]

  const trakheesRequirements = [
    { title: 'Master Plot Plans (MPP) with Trakhees-provided plot data', icon: '🗺️' },
    { title: 'Complete architectural drawings formatted to Trakhees CAD standards', icon: '📐' },
    { title: 'Soil report integration for foundation design confirmation', icon: '🏗️' },
    { title: 'Façade studies meeting solar shading requirements', icon: '☀️' },
    { title: 'Service coordination plans showing utilities and access', icon: '🔧' },
    { title: 'Accessibility compliance diagrams (DDA-compliant access)', icon: '♿' },
    { title: 'Fire-rated wall legends and material boundary conditions', icon: '🚨' },
    { title: 'EHS form submittals for fire and safety pre-approval', icon: '🛡️' },
    { title: 'Site grading plans and slope analysis', icon: '📏' },
    { title: 'Third-party consultant certificates (where required)', icon: '📜' }
  ]

  const ddaRequirements = [
    { title: 'Concept design booklets for initial layout feedback', icon: '📖' },
    { title: 'GFA summaries mapped to usage allocations', icon: '📊' },
    { title: 'Full architectural drawings, formatted to DDA CAD requirements', icon: '📐' },
    { title: 'Parking plans verified against DDA minimum standards', icon: '🚗' },
    { title: 'Envelope coordination for shading, glazing ratios, and acoustic compliance', icon: '🏢' },
    { title: 'Floor load studies for commercial zones', icon: '⚖️' },
    { title: 'Shell & core vs. fit-out demarcation diagrams', icon: '🏗️' },
    { title: 'Egress and refuge floor plans (for towers exceeding G+10)', icon: '🚪' },
    { title: 'Coordination with DDA fire safety and infrastructure consultants', icon: '🤝' }
  ]

  const authorities = [
    {
      name: 'Dubai Municipality (DM)',
      zones: 'Al Warqaa, Al Mizhar, Oud Metha, Muhaisnah, Dubai Hills',
      portal: 'Dubai BPS (Building Permit System)',
      icon: '🏛️',
      color: 'from-blue-600 to-blue-800',
      focus: 'Privacy setbacks, façade treatment, fire separation zones'
    },
    {
      name: 'Trakhees',
      zones: 'Palm Jumeirah, JAFZA, Dragon Mart, Dubai South',
      portal: 'E-Engineer Portal',
      icon: '🌊',
      color: 'from-teal-600 to-teal-800',
      focus: 'Marine restrictions, visual privacy, infrastructure connectivity'
    },
    {
      name: 'Dubai Development Authority (DDA)',
      zones: 'Dubai Internet City, Media City, D3, Barsha Heights',
      portal: 'DDA ePermit Portal',
      icon: '🏙️',
      color: 'from-purple-600 to-purple-800',
      focus: 'HVAC zoning, lift allocation, common area treatment'
    }
  ]

  const servicePhases = [
    { 
      phase: 'Pre-Approval', 
      desc: 'Initial submissions and concept reviews',
      icon: '📋',
      gradient: 'from-primary-600 to-primary-800'
    },
    { 
      phase: 'Main Submission', 
      desc: 'Complete documentation packages',
      icon: '📤',
      gradient: 'from-secondary-600 to-secondary-800'
    },
    { 
      phase: 'Design NOCs', 
      desc: 'No Objection Certificates coordination',
      icon: '✅',
      gradient: 'from-primary-600 to-secondary-600'
    },
    { 
      phase: 'Re-submissions', 
      desc: 'Response to authority comments',
      icon: '🔄',
      gradient: 'from-secondary-600 to-primary-600'
    }
  ]

  const projectAreas = [
    'Dubai Hills', 'Business Bay', 'Al Barsha South', 'Dubai South', 'JAFZA', 
    'Palm Jumeirah', 'Dubai Design District', 'Al Warqaa', 'Al Mizhar', 
    'Oud Metha', 'Muhaisnah', 'Dragon Mart', 'Dubai Internet City', 
    'Dubai Media City', 'Knowledge Park', 'Barsha Heights', 'Dubai Science Park'
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
            <span className="text-white text-3xl">🏛️</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-500">Authority</span>
            <span className="block text-secondary-300 hover:text-white transition-colors duration-500">Approvals</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed hover:text-white transition-colors duration-500 mb-8">
            Regulatory compliance expertise across UAE authorities. Full support in preparing, formatting, submitting, and tracking architectural documentation throughout the approval process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <button className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                Schedule Authority Review Consultation
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
            <span className="text-sm mb-2 animate-pulse">Explore Our Expertise</span>
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
                  Regulatory Excellence
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full group-hover:w-32 transition-all duration-300"></div>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  Regulatory compliance is mandatory for every construction project in the UAE. Each authority operates with distinct codebases, formatting requirements, and submission platforms.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  Merka provides full support across initial pre-approvals, main submission packages, design NOCs, and re-submissions with jurisdiction-specific expertise.
                </p>
                <p className="hover:text-gray-900 transition-colors duration-300 p-4 hover:bg-gray-50 rounded-lg">
                  Our authority coordinators have managed complex approvals across all major UAE development zones with proven track records.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-16 h-16 border border-primary-400 rotate-45"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border border-secondary-400 rounded-full"></div>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6 relative z-10">Project Coverage Areas</h3>
                <div className="grid grid-cols-2 gap-2 relative z-10">
                  {projectAreas.slice(0, 8).map((area, index) => (
                    <div key={index} className="flex items-center group cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-colors duration-300">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full mr-2 group-hover:scale-150 group-hover:bg-primary-600 transition-all duration-300"></div>
                      <span className="text-gray-700 text-xs group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-300">{area}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-500">+{projectAreas.length - 8} more areas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Phases Section */}
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
              Service Phases
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Comprehensive support throughout the entire approval process
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {servicePhases.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform -translate-y-1/2 z-0"></div>
                  )}
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto relative z-10 group-hover:scale-125 transition-transform duration-300`}>
                    <span className="text-white text-2xl">{item.icon}</span>
                  </div>
                </div>
                <h3 className="text-lg font-serif font-bold text-primary-900 mb-2 group-hover:text-secondary-800 transition-colors duration-300">
                  {item.phase}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authorities Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              UAE Authorities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Expertise across all major UAE regulatory bodies
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {authorities.map((authority, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${authority.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white text-xl">{authority.icon}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-primary-900 group-hover:text-secondary-800 transition-colors duration-300">
                      {authority.name}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-secondary-600 font-medium mr-2 mt-1">📍</span>
                      <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 text-sm">{authority.zones}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-primary-600 font-medium mr-2 mt-1">💻</span>
                      <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 text-sm">{authority.portal}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-secondary-600 font-medium mr-2 mt-1">🎯</span>
                      <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 text-sm">{authority.focus}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dubai Municipality Requirements */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)`,
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">🏛️</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Dubai Municipality (DM)
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Comprehensive submissions via Dubai BPS portal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dmRequirements.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-sm">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-primary-900 text-sm group-hover:text-blue-800 transition-colors duration-300">
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

      {/* Trakhees Requirements */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">🌊</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Trakhees
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Multi-layered submissions via E-Engineer portal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trakheesRequirements.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-teal-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-sm">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-primary-900 text-sm group-hover:text-teal-800 transition-colors duration-300">
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

      {/* DDA Requirements */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)`,
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">🏙️</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Dubai Development Authority (DDA)
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Fast-paced submissions via DDA ePermit portal
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ddaRequirements.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-sm">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-primary-900 text-sm group-hover:text-purple-800 transition-colors duration-300">
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

      {/* Multi-Authority Coordination */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-12 rounded-2xl shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-8">
              <span className="text-white text-3xl">🤝</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-6">
              Multi-Authority Coordination
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Certain projects require approvals from multiple jurisdictions. Merka coordinates hybrid situations with unified submission plans to reduce approval time and avoid document redundancy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-sm font-medium text-gray-700">Dubai South + Trakhees</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-sm font-medium text-gray-700">Master Developer + City Authority</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-sm font-medium text-gray-700">Multiple NOC Requirements</span>
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
            Ready for Authority Approvals?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto hover:text-white transition-colors duration-300">
            Let's navigate the regulatory landscape together with our comprehensive authority approval services across Dubai and Abu Dhabi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <button className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                Schedule Authority Review Consultation
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