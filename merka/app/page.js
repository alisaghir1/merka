'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
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
    <div className="min-h-screen overflow-x-hidden">
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
                MERKA
              </h1>
              <div className="w-32 h-1 bg-white mx-auto mt-4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Image Parallax */}
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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Modern Architecture Dubai"
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
            <span 
              className={`block transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              Crafting
            </span>
            <span 
              className={`block text-[#877051] transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              Architectural
            </span>
            <span 
              className={`block transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '1400ms' }}
            >
              Masterpieces
            </span>
          </h1>
          
          <p 
            className={`text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1600ms' }}
          >
            Dubai&apos;s premier architectural studio creating iconic designs that blend innovation, culture, and sustainability
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1800ms' }}
          >
            <Link href="/projects">
              <button className="bg-white text-[#041533] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg transform">
                Explore Portfolio
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#041533] hover:scale-105 transition-all duration-300 transform">
                Book Consultation
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: mounted ? Math.max(0, 1 - scrollValue * 0.01) : 1 }}
        >
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-sm mb-2">Scroll Down</span>
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
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Modern Office Architecture"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-200/80"></div>
        </div>

        {/* Text Cutout */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h2 
            className="text-[15rem] md:text-[20rem] lg:text-[25rem] font-serif font-black text-transparent leading-none select-none"
            style={{
              WebkitTextStroke: '4px #041533',
              filter: 'drop-shadow(0 0 20px rgba(4, 21, 51, 0.3))',
            }}
          >
            MERKA
          </h2>
        </div>

        {/* Content inside cutout */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div 
            className={`text-center max-w-2xl mx-auto px-4 pointer-events-auto transition-all duration-1000 ease-out ${
              scrollValue > 500 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50">
              <h3 className="text-3xl font-serif font-bold text-[#041533] mb-4">
                Architecture That Inspires
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Every structure tells a story. We craft architectural narratives that blend Dubai&apos;s rich heritage with cutting-edge innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <button className="bg-[#041533] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#877051] hover:scale-105 transition-all duration-300">
                    Discover Our Process
                  </button>
                </Link>
                <Link href="/projects">
                  <button className="border-2 border-[#041533] text-[#041533] px-6 py-3 rounded-lg font-medium hover:bg-[#041533] hover:text-white hover:scale-105 transition-all duration-300">
                    View Projects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section className="py-20 bg-white relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 1000 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Our Design Philosophy
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe architecture should tell a story, create experiences, and enhance lives while respecting cultural heritage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🏗️", title: "Innovation", desc: "Cutting-edge design solutions that push architectural boundaries while maintaining functionality." },
              { icon: "🌿", title: "Sustainability", desc: "Environmentally conscious designs that harmonize with nature and reduce environmental impact." },
              { icon: "🎨", title: "Cultural Fusion", desc: "Blending traditional Emirati elements with contemporary architectural language." }
            ].map((item, index) => (
              <div 
                key={index}
                className={`text-center p-8 bg-gray-50 rounded-2xl hover:bg-[#041533]/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${
                  scrollValue > 1200 + index * 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#041533] to-[#877051] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <span className="text-white text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
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
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80"
            alt="Architectural Design Process"
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
            DESIGN
          </h2>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div 
            className={`text-center max-w-3xl mx-auto px-4 pointer-events-auto transition-all duration-1000 ease-out ${
              scrollValue > 2000 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-3xl border-2 border-white/20 shadow-2xl">
              <h3 className="text-4xl font-serif font-bold text-white mb-6">
                Where Vision Meets Reality
              </h3>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                From concept sketches to architectural marvels, we transform ideas into iconic structures that define Dubai&apos;s skyline.
              </p>
              <Link href="/projects">
                <button className="bg-white text-[#041533] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300">
                  Explore Our Portfolio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 2500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive architectural solutions from concept to completion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Conceptual Design", desc: "Initial design concepts and feasibility studies", icon: "💡", link: "/services/conceptual-design" },
              { title: "Schematic Design", desc: "Detailed schematic drawings that translate concepts", icon: "📐", link: "/services/schematic-design" },
              { title: "Design Development", desc: "Comprehensive design with detailed specifications", icon: "🏗️", link: "/services/design-development" },
              { title: "Construction Drawings", desc: "Precise technical drawings for construction", icon: "📋", link: "/services/construction-drawings" },
              { title: "Tender Documentation", desc: "Complete tender packages for contractor bidding", icon: "📄", link: "/services/tender-documentation" },
              { title: "Authority Approvals", desc: "Expert guidance through approval processes", icon: "✅", link: "/services/authority-approvals" }
            ].map((service, index) => (
              <Link 
                key={index} 
                href={service.link}
                className={`group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 block ${
                  scrollValue > 2700 + index * 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#041533] mb-3 group-hover:text-[#877051] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 mb-4">
                  {service.desc}
                </p>
                
                <div className="flex items-center text-[#041533] group-hover:text-[#877051] transition-colors duration-300">
                  <span className="text-sm font-semibold mr-2">Learn More</span>
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          
          <div 
            className={`text-center mt-12 transition-all duration-1000 ease-out ${
              scrollValue > 3200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link href="/services">
              <button className="bg-gradient-to-r from-[#041533] to-[#877051] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                View All Services →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#877051] to-[#041533] relative z-30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div 
            className={`transition-all duration-1000 ease-out ${
              scrollValue > 3500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to Build Your Vision?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your architectural project and create something extraordinary together
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
              <Link href="/contact">
                <button className="bg-white text-[#041533] px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300">
                  Book Free Consultation
                </button>
              </Link>
              <Link href="/projects">
                <button className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-[#041533] hover:scale-105 transition-all duration-300">
                  View Complete Portfolio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}