'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { stylesData, typologiesData } from '../data/styles-typologies'

export default function StylesAndTypologies() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent hydration mismatch by not rendering scroll-dependent content until mounted
  const scrollValue = mounted ? scrollY : 0

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Enhanced Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
          transform: mounted ? `translateY(${scrollValue * 0.5}px)` : 'translateY(0px)'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-64 h-64 border-2 border-white/20 rotate-45"
            style={{ 
              transform: mounted 
                ? `translateY(${scrollValue * 0.3}px) rotate(${45 + scrollValue * 0.1}deg)` 
                : 'translateY(0px) rotate(45deg)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white/20 rounded-full"
            style={{ 
              transform: mounted 
                ? `translateY(${scrollValue * -0.2}px) scale(${1 + scrollValue * 0.0005})` 
                : 'translateY(0px) scale(1)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/4 w-32 h-32 border-2 border-white/20"
            style={{ 
              transform: mounted 
                ? `translateX(${scrollValue * 0.15}px) rotate(${scrollValue * 0.2}deg)` 
                : 'translateX(0px) rotate(0deg)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              transform: mounted ? `translateY(${scrollValue * 0.1}px)` : 'translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          
          <div 
            className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-[#877051]/10 to-[#041533]/10 rounded-full blur-3xl"
            style={{ 
              transform: mounted ? `translateY(${scrollValue * -0.3}px)` : 'translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#041533]/10 to-[#877051]/10 rounded-full blur-2xl"
            style={{ 
              transform: mounted ? `translateY(${scrollValue * 0.4}px)` : 'translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
        </div>

        <div 
          className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ 
            transform: mounted ? `translateY(${scrollValue * 0.2}px)` : 'translateY(0px)',
            opacity: mounted ? Math.max(0, 1 - scrollValue * 0.002) : 1
          }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            <span className="inline-block hover:scale-110 transition-transform duration-500">STYLES</span>
            <span className="block text-[#877051] hover:text-white transition-colors duration-500">&</span>
            <span className="block hover:scale-110 transition-transform duration-500">TYPOLOGIES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed hover:text-white transition-colors duration-500">
            Explore our diverse architectural styles and building typologies, each crafted to meet the unique demands of the UAE's dynamic landscape.
          </p>
        </div>

        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: mounted ? Math.max(0, 1 - scrollValue * 0.01) : 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 animate-pulse">Discover Our Expertise</span>
            <div className="animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Transition */}
      <div className="relative h-32 bg-gradient-to-b from-[#041533] to-white"></div>

      {/* Architectural Styles Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 right-10 w-32 h-32 border border-gray-200 rotate-45 opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 border border-[#877051]/20 rounded-full opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6 hover:scale-105 transition-transform duration-300">
              Architectural Styles
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Six distinct architectural approaches that define our design philosophy and aesthetic vision.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {stylesData.map((style, index) => (
              <Link key={style.id} href={`/styles-and-typologies/styles/${style.slug}`} className="block">
                <div className="group relative cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-r ${style.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 group-hover:border-[#041533]/20">
                    <div className={`w-16 h-16 bg-gradient-to-r ${style.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <span className="text-white text-2xl">{style.icon}</span>
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4 group-hover:text-[#877051] transition-colors duration-300">
                      {style.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {style.shortDescription}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {style.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                          <div className="w-2 h-2 bg-[#877051] rounded-full mr-3 group-hover:scale-150 group-hover:bg-[#041533] transition-all duration-300"></div>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center text-[#041533] font-medium group-hover:text-[#877051] transition-colors duration-300">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Explore Style</span>
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

      {/* Building Typologies Section */}
      <section className="py-20 relative overflow-hidden" style={{
        background: `linear-gradient(135deg, #f0f4f8 0%, #faf9f7 100%)`,
      }}>
        <div 
          className="absolute inset-0"
          style={{ transform: mounted ? `translateY(${scrollValue * 0.3}px)` : 'translateY(0px)' }}
        >
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-[#041533]/20 to-[#877051]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#877051]/10 to-[#041533]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6 hover:scale-105 transition-transform duration-300">
              Building Typologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Four specialized building types where we excel in creating functional, beautiful, and compliant architecture.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {typologiesData.map((typology, index) => (
              <Link key={typology.id} href={`/styles-and-typologies/typologies/${typology.slug}`} className="block">
                <div className="group relative cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-r ${typology.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 group-hover:border-[#041533]/20">
                    <div className={`w-20 h-20 bg-gradient-to-r ${typology.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <span className="text-white text-3xl">{typology.icon}</span>
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4 group-hover:text-[#877051] transition-colors duration-300">
                      {typology.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {typology.shortDescription}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {typology.subtypes.map((subtype, subtypeIndex) => (
                        <div key={subtypeIndex} className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                          <div className="w-2 h-2 bg-[#877051] rounded-full mr-3 group-hover:scale-150 group-hover:bg-[#041533] transition-all duration-300"></div>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">{subtype}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-[#041533] font-medium group-hover:text-[#877051] transition-colors duration-300">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Explore Typology</span>
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

      {/* Why Our Approach Matters Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Why Our Approach Matters
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Purpose-Driven Design',
                description: 'Every style and typology serves specific functional and aesthetic goals'
              },
              {
                icon: '🌍',
                title: 'Climate Responsive',
                description: 'All designs adapted to UAE\'s unique environmental conditions'
              },
              {
                icon: '⚖️',
                title: 'Authority Compliant',
                description: 'Full compliance with local regulations and approval processes'
              },
              {
                icon: '🏆',
                title: 'Proven Excellence',
                description: 'Track record of successful projects across all styles and types'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-[#041533] to-[#877051] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#041533] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
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
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-white/5 to-[#877051]/10 rounded-full blur-3xl"
            style={{ transform: mounted ? `translateY(${scrollValue * 0.15}px) scale(${1 + scrollValue * 0.0003})` : 'translateY(0px) scale(1)' }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-[#041533]/10 to-white/5 rounded-full blur-2xl"
            style={{ transform: mounted ? `translateY(${scrollValue * -0.2}px)` : 'translateY(0px)' }}
          ></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 hover:scale-105 transition-transform duration-300">
            Ready to Bring Your Vision to Life?
          </h2>
          <p className="text-xl text-gray-200 mb-8 hover:text-white transition-colors duration-300">
            Let's discuss which architectural style and building typology best suits your project goals and site requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-[#041533] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                Start Your Project
              </button>
            </Link>
            <Link href="/projects">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#041533] hover:scale-105 transition-all duration-300">
                View Our Portfolio
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}