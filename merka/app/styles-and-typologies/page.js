'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { stylesData as staticStylesData, typologiesData as staticTypologiesData } from '../data/styles-typologies'
import { getStyles, getTypologies } from '@/lib/data'

export default function StylesAndTypologies() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [styles, setStyles] = useState(staticStylesData)
  const [typologies, setTypologies] = useState(staticTypologiesData)
  const heroRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    
    // Fetch styles and typologies from Supabase
    const fetchData = async () => {
      try {
        const [stylesData, typologiesData] = await Promise.all([
          getStyles({ published: true }),
          getTypologies({ published: true })
        ])
        if (stylesData && stylesData.length > 0) {
          setStyles(stylesData)
        }
        if (typologiesData && typologiesData.length > 0) {
          setTypologies(typologiesData)
        }
      } catch (error) {
        console.log('Using static styles/typologies data:', error)
      }
    }
    fetchData()
    
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
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4">
                <span className="text-[#041533] text-2xl">🏛️</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white text-center">
                STYLES & TYPOLOGIES
              </h1>
              <div className="w-32 h-1 bg-white mx-auto mt-4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 scale-110"
          style={{
            transform: mounted ? `translateY(${scrollValue * 0.5}px)` : 'translateY(0px)',
            transition: mounted ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Architectural Styles and Building Typologies"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Simplified Background Effects - Only on Desktop */}
        <div className="absolute inset-0 hidden lg:block">
          {/* Simple gradient orbs */}
          <div 
            className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-[#877051]/10 to-[#041533]/10 rounded-full blur-3xl"
            style={{ 
              transform: mounted ? `translateY(${scrollValue * -0.3}px)` : 'translateY(0px)',
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#041533]/10 to-[#877051]/10 rounded-full blur-2xl"
            style={{ 
              transform: mounted ? `translateY(${scrollValue * 0.4}px)` : 'translateY(0px)',
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div 
          className={`relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ 
            transitionDelay: '800ms',
            transform: mounted ? `translateY(${scrollValue * 0.2}px)` : 'translateY(0px)',
            opacity: mounted ? Math.max(0, 1 - scrollValue * 0.002) : 1
          }}
        >
          {/* Animated Icon */}
          <div 
            className={`w-16 h-16 bg-gradient-to-r from-[#877051] to-[#041533] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <span className="text-white text-2xl">🏛️</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            <span 
              className={`inline-block transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              STYLES
            </span>
            <span 
              className={`block text-[#877051] transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '1400ms' }}
            >
              &
            </span>
            <span 
              className={`block transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '1600ms' }}
            >
              TYPOLOGIES
            </span>
          </h1>
          
          {/* Subtitle */}
          <p 
            className={`text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1800ms' }}
          >
            Explore our diverse architectural styles and building typologies, each crafted to meet the unique demands of the UAE's dynamic landscape.
          </p>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: mounted ? Math.max(0, 1 - scrollValue * 0.01) : 1 }}
        >
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-sm mb-2">Discover Our Expertise</span>
            <div className="w-6 h-10 border-2 border-white rounded-full relative">
              <div className="w-1 h-3 bg-white rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Styles Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Architectural Styles
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Six distinct architectural approaches that define our design philosophy and aesthetic vision.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {styles.map((style, index) => (
              <Link key={style.id || index} href={`/styles-and-typologies/styles/${style.slug}`} className="block">
                <div 
                  className={`group relative cursor-pointer transition-all duration-1000 ease-out ${
                    scrollValue > 700 + index * 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${style.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 group-hover:border-[#877051]/30 overflow-hidden">
                    {/* Background Number */}
                    <div className="absolute -right-4 -top-4 text-[8rem] font-black text-gray-100/50 pointer-events-none select-none group-hover:text-[#877051]/10 transition-colors duration-500">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    <div className={`relative w-20 h-20 bg-gradient-to-r ${style.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <span className="text-white text-3xl">{style.icon}</span>
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
                    
                    <div className="flex items-center text-[#877051] font-semibold group-hover:text-[#041533] transition-colors duration-300">
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
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 1400 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Building Typologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mt-6">
              Four specialized building types where we excel in creating functional, beautiful, and compliant architecture.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {typologies.map((typology, index) => (
              <Link key={typology.id || index} href={`/styles-and-typologies/typologies/${typology.slug}`} className="block">
                <div 
                  className={`group relative cursor-pointer transition-all duration-1000 ease-out ${
                    scrollValue > 1600 + index * 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${typology.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  <div className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-gray-100 group-hover:border-[#877051]/30 overflow-hidden">
                    {/* Background Number */}
                    <div className="absolute -right-4 -top-4 text-[8rem] font-black text-gray-100/50 pointer-events-none select-none group-hover:text-[#877051]/10 transition-colors duration-500">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    <div className={`relative w-20 h-20 bg-gradient-to-r ${typology.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <span className="text-white text-3xl">{typology.icon}</span>
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4 group-hover:text-[#877051] transition-colors duration-300">
                      {typology.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {typology.shortDescription}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {(typology.subtypes || []).map((subtype, subtypeIndex) => (
                        <div key={subtypeIndex} className="flex items-center text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                          <div className="w-2 h-2 bg-[#877051] rounded-full mr-3 group-hover:scale-150 group-hover:bg-[#041533] transition-all duration-300"></div>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">{subtype}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-[#877051] font-semibold group-hover:text-[#041533] transition-colors duration-300">
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
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 2200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
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
              <div 
                key={index} 
                className={`text-center group transition-all duration-1000 ease-out p-6 rounded-3xl hover:bg-gray-50 hover:shadow-xl border border-transparent hover:border-gray-100 ${
                  scrollValue > 2400 + index * 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#041533] to-[#877051] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-3xl">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#041533] mb-3 group-hover:text-[#877051] transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
        }}
      >
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-white/5 to-[#877051]/10 rounded-full blur-3xl"
            style={{ transform: mounted ? `translateY(${scrollValue * 0.03}px)` : 'translateY(0px)' }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-[#041533]/10 to-white/5 rounded-full blur-2xl"
            style={{ transform: mounted ? `translateY(${scrollValue * -0.05}px)` : 'translateY(0px)' }}
          ></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center">
          <div 
            className={`transition-all duration-1000 ease-out ${
              scrollValue > 2800 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let's discuss which architectural style and building typology best suits your project goals and site requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <button className="group bg-white text-[#041533] px-10 py-5 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden flex items-center gap-2">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#877051] to-[#041533] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                    Start Your Project
                  </span>
                  <svg className="relative z-10 w-5 h-5 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </Link>
              <Link href="/projects">
                <button className="group border-2 border-white text-white px-10 py-5 rounded-2xl font-semibold backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden flex items-center gap-2">
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10 group-hover:text-[#041533] transition-colors duration-500">
                    View Our Portfolio
                  </span>
                  <svg className="relative z-10 w-5 h-5 group-hover:text-[#041533] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}