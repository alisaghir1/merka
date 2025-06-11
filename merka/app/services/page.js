'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function Services() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const services = [
    {
      title: 'Conceptual Design',
      slug: 'conceptual-design',
      description: 'Initial design concepts and feasibility studies that establish the foundation for your architectural project.',
      icon: '💡',
      gradient: 'from-primary-600 to-primary-800',
      features: ['Site Analysis', 'Concept Development', 'Feasibility Studies', 'Initial Sketches']
    },
    {
      title: 'Schematic Design',
      slug: 'schematic-design',
      description: 'Detailed schematic drawings that translate concepts into clear architectural plans and elevations.',
      icon: '📐',
      gradient: 'from-secondary-600 to-secondary-800',
      features: ['Floor Plans', 'Elevations', 'Sections', 'Design Development']
    },
    {
      title: 'Design Development',
      slug: 'design-development',
      description: 'Comprehensive design development with detailed specifications and material selections.',
      icon: '🏗️',
      gradient: 'from-primary-600 to-secondary-600',
      features: ['Material Selection', 'Detail Development', 'System Integration', 'Design Refinement']
    },
    {
      title: 'Construction Drawings',
      slug: 'construction-drawings',
      description: 'Precise technical drawings and documentation required for construction and permit approval.',
      icon: '📋',
      gradient: 'from-secondary-600 to-primary-600',
      features: ['Working Drawings', 'Technical Details', 'Specifications', 'Construction Documents']
    },
    {
      title: 'Tender Documentation',
      slug: 'tender-documentation',
      description: 'Complete tender packages with detailed specifications for contractor bidding processes.',
      icon: '📄',
      gradient: 'from-primary-700 to-primary-900',
      features: ['Tender Drawings', 'Bill of Quantities', 'Specifications', 'Contract Documents']
    },
    {
      title: 'Authority Approvals',
      slug: 'authority-approvals',
      description: 'Expert guidance through Dubai Municipality and local authority approval processes.',
      icon: '✅',
      gradient: 'from-secondary-700 to-secondary-900',
      features: ['Permit Applications', 'Code Compliance', 'Authority Coordination', 'Approval Management']
    }
  ]

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
            <span className="inline-block hover:scale-110 transition-transform duration-500">OUR</span>
            <span className="block text-secondary-300 hover:text-white transition-colors duration-500">SERVICES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed hover:text-white transition-colors duration-500">
            Comprehensive architectural solutions from initial concept to final approval, tailored for Dubai's unique regulatory and environmental requirements.
          </p>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: Math.max(0, 1 - scrollY * 0.01) }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 animate-pulse">Explore Our Services</span>
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

      {/* Services Grid Section */}
      <section className="py-20 bg-white relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 right-10 w-32 h-32 border border-primary-100 rotate-45 opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 border border-secondary-100 rounded-full opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Architectural Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              From conceptual design to authority approvals, we provide end-to-end architectural services tailored to Dubai's unique requirements.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} href={`/services/${service.slug}`}>
                <div className="group relative cursor-pointer">
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Main card */}
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 group-hover:border-primary-200">
                    {/* Service icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <span className="text-white text-2xl">{service.icon}</span>
                    </div>
                    
                    {/* Service title */}
                    <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4 group-hover:text-secondary-800 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Service description */}
                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {service.description}
                    </p>
                    
                    {/* Features list */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                          <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3 group-hover:scale-150 group-hover:bg-primary-600 transition-all duration-300"></div>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Learn more link */}
                    <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-800 transition-colors duration-300">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Learn More</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, #f0f4f8 0%, #faf9f7 100%)`,
      }}>
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
              Our Design Process
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
          </div>

          <div className="grid lg:grid-cols-6 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  {/* Connection line */}
                  {index < services.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform -translate-y-1/2 z-0"></div>
                  )}
                  
                  {/* Step circle */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto relative z-10 group-hover:scale-125 transition-transform duration-300`}>
                    <span className="text-white text-xl font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-serif font-bold text-primary-900 mb-2 group-hover:text-secondary-800 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {service.description.split('.')[0]}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 hover:scale-105 transition-transform duration-300">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-200 mb-8 hover:text-white transition-colors duration-300">
            Let's discuss how our architectural services can bring your vision to life while ensuring full compliance with Dubai's regulations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                Start Your Project
              </button>
            </Link>
            <Link href="/about">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-900 hover:scale-105 transition-all duration-300">
                Learn About Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}