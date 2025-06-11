'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Enhanced Parallax */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-primary-900 to-secondary-900 overflow-hidden">
        {/* Enhanced Background Pattern with Parallax */}
        <div className="absolute inset-0">
          {/* Large floating geometric shapes */}
          <div 
            className="absolute top-20 left-20 w-48 h-48 border-4 border-white/30 rotate-45 rounded-2xl shadow-2xl backdrop-blur-sm bg-white/5"
            style={{ 
              transform: `translateY(${scrollY * 0.1}px) rotate(${45 + scrollY * 0.05}deg)`,
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-36 h-36 border-4 border-secondary-300/40 rotate-12 rounded-full shadow-2xl backdrop-blur-sm bg-secondary-500/10"
            style={{ 
              transform: `translateY(${scrollY * -0.15}px) rotate(${12 + scrollY * 0.08}deg)`,
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-white/40 -rotate-45 rounded-lg shadow-xl backdrop-blur-sm bg-white/10"
            style={{ 
              transform: `translateX(${scrollY * 0.12}px) translateY(${scrollY * 0.08}px) rotate(${-45 + scrollY * 0.1}deg)`,
            }}
          ></div>
          
          {/* Floating architectural elements */}
          <div 
            className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-sm"
            style={{ 
              transform: `translateY(${scrollY * -0.2}px) scale(${1 + scrollY * 0.0005})`,
            }}
          ></div>
          <div 
            className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-secondary-400/15 to-white/10 rounded-2xl blur-md rotate-12"
            style={{ 
              transform: `translateY(${scrollY * 0.18}px) rotate(${12 + scrollY * 0.06}deg)`,
            }}
          ></div>
          
          {/* Grid pattern with animation */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 2px, transparent 2px)
              `,
              backgroundSize: '60px 60px, 60px 60px, 120px 120px',
              transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.05}px)`,
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight hover:text-secondary-200 transition-colors duration-300">
            Crafting
            <span className="block text-secondary-300 hover:text-white transition-colors duration-300">Architectural</span>
            <span className="block hover:text-secondary-200 transition-colors duration-300">Masterpieces</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed hover:text-white transition-colors duration-300">
            Dubai's premier architectural studio creating iconic designs that blend innovation, culture, and sustainability
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/projects">
              <button className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:text-primary-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg transform">
                Explore Portfolio
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
                Book Consultation
              </button>
            </Link>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: Math.max(0, 1 - scrollY * 0.005) }}
        >
          <div className="flex flex-col items-center animate-bounce hover:text-secondary-300 transition-colors duration-300 cursor-pointer">
            <span className="text-sm mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white rounded-full relative">
              <div className="w-1 h-3 bg-white rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Parallax Text Cutout Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Enhanced Fixed Background with visible patterns */}
        <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-300" style={{ zIndex: -10 }}>
          {/* More visible architectural elements */}
          <div className="absolute inset-0">
            <div 
              className="absolute top-1/4 left-1/4 w-80 h-80 border-4 border-primary-900/40 rotate-45 rounded-3xl shadow-2xl backdrop-blur-sm bg-primary-100/30"
              style={{ 
                transform: `translateY(${scrollY * 0.05}px) rotate(${45 + scrollY * 0.02}deg) scale(${1 + scrollY * 0.0002})`,
              }}
            ></div>
            <div 
              className="absolute bottom-1/4 right-1/4 w-64 h-64 border-4 border-secondary-900/40 -rotate-12 rounded-full shadow-2xl backdrop-blur-sm bg-secondary-100/30"
              style={{ 
                transform: `translateY(${scrollY * -0.08}px) rotate(${-12 + scrollY * 0.03}deg) scale(${1 + scrollY * 0.0003})`,
              }}
            ></div>
            <div 
              className="absolute top-1/2 right-1/3 w-48 h-48 border-4 border-primary-900/30 rotate-12 rounded-2xl shadow-xl backdrop-blur-sm bg-primary-200/20"
              style={{ 
                transform: `translateY(${scrollY * 0.06}px) translateX(${scrollY * 0.04}px) rotate(${12 + scrollY * 0.04}deg)`,
              }}
            ></div>
            
            {/* Floating orbs */}
            <div 
              className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-full shadow-2xl backdrop-blur-md"
              style={{ 
                transform: `translateY(${scrollY * -0.1}px) translateX(${scrollY * 0.05}px)`,
              }}
            ></div>
            <div 
              className="absolute bottom-32 left-32 w-24 h-24 bg-gradient-to-br from-secondary-500/40 to-primary-500/40 rounded-full shadow-xl backdrop-blur-md"
              style={{ 
                transform: `translateY(${scrollY * 0.12}px) translateX(${scrollY * -0.06}px)`,
              }}
            ></div>
            
            {/* Enhanced grid pattern */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(4, 21, 51, 0.15) 2px, transparent 2px),
                  linear-gradient(90deg, rgba(4, 21, 51, 0.15) 2px, transparent 2px),
                  radial-gradient(circle at 25% 25%, rgba(135, 112, 81, 0.1) 3px, transparent 3px),
                  radial-gradient(circle at 75% 75%, rgba(4, 21, 51, 0.1) 2px, transparent 2px)
                `,
                backgroundSize: '80px 80px, 80px 80px, 160px 160px, 120px 120px',
                transform: `translateY(${scrollY * 0.15}px) translateX(${scrollY * 0.08}px)`,
              }}
            ></div>
          </div>
        </div>

        {/* Enhanced Text Cutout */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h2 
            className="text-[15rem] md:text-[20rem] lg:text-[25rem] font-serif font-black text-transparent leading-none select-none hover:scale-105 transition-transform duration-700 cursor-default"
            style={{
              WebkitTextStroke: '4px #041533',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'drop-shadow(0 0 20px rgba(4, 21, 51, 0.3))',
            }}
          >
            MIRKA
          </h2>
        </div>

        {/* Enhanced content inside the cutout */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-center max-w-2xl mx-auto px-4 pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:bg-white hover:scale-105 transition-all duration-500 transform border border-white/50">
              <h3 className="text-3xl font-serif font-bold text-primary-900 mb-4 hover:text-secondary-800 transition-colors duration-300">
                Architecture That Inspires
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed hover:text-gray-900 transition-colors duration-300">
                Every structure tells a story. We craft architectural narratives that blend Dubai's rich heritage with cutting-edge innovation, creating spaces that inspire and endure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <button className="bg-primary-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 transform">
                    Discover Our Process
                  </button>
                </Link>
                <Link href="/projects">
                  <button className="border-2 border-primary-900 text-primary-900 px-6 py-3 rounded-lg font-medium hover:bg-primary-900 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 transform">
                    View Projects
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Design Philosophy */}
      <section className="py-20 bg-white relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute top-20 right-20 w-64 h-64 border border-primary-100 rotate-45 opacity-30 rounded-2xl"
              style={{ transform: `translateY(${scrollY * 0.02}px) rotate(${45 + scrollY * 0.01}deg)` }}
            ></div>
            <div 
              className="absolute bottom-20 left-20 w-48 h-48 border border-secondary-100 rounded-full opacity-30"
              style={{ transform: `translateY(${scrollY * -0.03}px) scale(${1 + scrollY * 0.00005})` }}
            ></div>
          </div>

          <div className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:text-secondary-800 transition-colors duration-300">
              Our Design Philosophy
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto hover:text-gray-800 transition-colors duration-300">
              We believe architecture should tell a story, create experiences, and enhance lives while respecting cultural heritage and embracing innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="group text-center p-8 bg-gray-50 rounded-2xl hover:bg-primary-50 hover:shadow-xl hover:-translate-y-4 transition-all duration-500 cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                <span className="text-white text-3xl group-hover:text-4xl transition-all duration-300">🏗️</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">Innovation</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">Cutting-edge design solutions that push the boundaries of architectural possibility while maintaining functionality.</p>
            </div>
            
            <div className="group text-center p-8 bg-gray-50 rounded-2xl hover:bg-secondary-50 hover:shadow-xl hover:-translate-y-4 transition-all duration-500 cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-900 to-secondary-700 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                <span className="text-white text-3xl group-hover:text-4xl transition-all duration-300">🌿</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4 group-hover:text-secondary-700 transition-colors duration-300">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">Environmentally conscious designs that harmonize with nature and reduce environmental impact.</p>
            </div>
            
            <div className="group text-center p-8 bg-gray-50 rounded-2xl hover:bg-primary-50 hover:shadow-xl hover:-translate-y-4 transition-all duration-500 cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-900 to-secondary-900 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                <span className="text-white text-3xl group-hover:text-4xl transition-all duration-300">🎨</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">Cultural Fusion</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">Blending traditional Emirati elements with contemporary architectural language and global influences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Second Parallax Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Enhanced Fixed Background with more visibility */}
        <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-primary-900 to-secondary-900" style={{ zIndex: -5 }}>
          <div className="absolute inset-0">
            <div 
              className="absolute top-10 left-10 w-96 h-96 border-4 border-white/30 rounded-full shadow-2xl backdrop-blur-sm bg-white/5"
              style={{ 
                transform: `translateY(${scrollY * 0.03}px) scale(${1 + scrollY * 0.0001})`,
              }}
            ></div>
            <div 
              className="absolute bottom-10 right-10 w-80 h-80 border-4 border-white/25 rotate-45 rounded-3xl shadow-2xl backdrop-blur-sm bg-white/10"
              style={{ 
                transform: `translateY(${scrollY * -0.05}px) rotate(${45 + scrollY * 0.02}deg)`,
              }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-white/15 rounded-full shadow-xl backdrop-blur-sm bg-gradient-to-br from-white/5 to-transparent"
              style={{ 
                transform: `translate(-50%, -50%) translateY(${scrollY * 0.04}px) scale(${1 + scrollY * 0.0002})`,
              }}
            ></div>
            
            {/* Additional floating elements */}
            <div 
              className="absolute top-20 right-1/3 w-32 h-32 bg-gradient-to-br from-secondary-400/20 to-white/10 rounded-2xl rotate-12 shadow-lg backdrop-blur-sm"
              style={{ 
                transform: `translateY(${scrollY * -0.08}px) rotate(${12 + scrollY * 0.03}deg)`,
              }}
            ></div>
            <div 
              className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-primary-400/15 to-white/5 rounded-full shadow-xl backdrop-blur-sm"
              style={{ 
                transform: `translateY(${scrollY * 0.06}px) translateX(${scrollY * 0.02}px)`,
              }}
            ></div>
            
            {/* Animated grid overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 2px, transparent 2px)
                `,
                backgroundSize: '100px 100px, 100px 100px, 200px 200px',
                transform: `translateY(${scrollY * 0.1}px) translateX(${scrollY * 0.05}px)`,
              }}
            ></div>
          </div>
        </div>

        {/* Enhanced Text Cutout */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h2 
            className="text-[8rem] md:text-[12rem] lg:text-[15rem] font-serif font-black text-transparent leading-none select-none hover:scale-105 transition-transform duration-700 cursor-default"
            style={{
              WebkitTextStroke: '3px #ffffff',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))',
            }}
          >
            DESIGN
          </h2>
        </div>

        {/* Enhanced content inside */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="text-center max-w-3xl mx-auto px-4 pointer-events-auto">
            <div className="bg-black/30 backdrop-blur-md p-8 rounded-3xl border-2 border-white/20 hover:bg-black/40 hover:border-white/40 hover:scale-105 transition-all duration-500 transform shadow-2xl">
              <h3 className="text-4xl font-serif font-bold text-white mb-6 hover:text-secondary-200 transition-colors duration-300">
                Where Vision Meets Reality
              </h3>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed hover:text-white transition-colors duration-300">
                From concept sketches to architectural marvels, we transform ideas into iconic structures that define Dubai's skyline and enhance human experiences.
              </p>
              <Link href="/projects">
                <button className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:text-primary-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
                  Explore Our Portfolio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
<section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative z-30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:text-secondary-800 transition-colors duration-300">
        Our Services
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto mb-8"></div>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto hover:text-gray-800 transition-colors duration-300">
        Comprehensive architectural solutions from concept to completion
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { 
          title: "Conceptual Design", 
          desc: "Initial design concepts and feasibility studies that establish the foundation for your project", 
          icon: "💡",
          link: "/services/conceptual-design"
        },
        { 
          title: "Schematic Design", 
          desc: "Detailed schematic drawings that translate concepts into clear architectural plans", 
          icon: "📐",
          link: "/services/schematic-design"
        },
        { 
          title: "Design Development", 
          desc: "Comprehensive design development with detailed specifications and material selections", 
          icon: "🏗️",
          link: "/services/design-development"
        },
        { 
          title: "Construction Drawings", 
          desc: "Precise technical drawings and documentation required for construction and permits", 
          icon: "📋",
          link: "/services/construction-drawings"
        },
        { 
          title: "Tender Documentation", 
          desc: "Complete tender packages with detailed specifications for contractor bidding", 
          icon: "📄",
          link: "/services/tender-documentation"
        },
        { 
          title: "Authority Approvals", 
          desc: "Expert guidance through Dubai Municipality and local authority approval processes", 
          icon: "✅",
          link: "/services/authority-approvals"
        }
      ].map((service, index) => (
        <Link 
          key={index} 
          href={service.link}
          className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-4 hover:scale-105 transition-all duration-300 transform cursor-pointer block"
        >
          <div className="text-4xl mb-4 group-hover:text-5xl group-hover:scale-110 transition-all duration-300 transform">
            {service.icon}
          </div>
          <h3 className="text-xl font-serif font-bold text-primary-900 mb-3 group-hover:text-secondary-800 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 mb-4">
            {service.desc}
          </p>
          
          <div className="flex items-center text-primary-600 group-hover:text-secondary-600 transition-colors duration-300">
            <span className="text-sm font-semibold mr-2">Learn More</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
    
    <div className="text-center mt-12">
      <Link href="/services">
        <button className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 transform">
          View All Services →
        </button>
      </Link>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-900 to-primary-900 relative z-30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 hover:text-secondary-200 transition-colors duration-300">
            Ready to Build Your Vision?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto hover:text-white transition-colors duration-300">
            Let's discuss your architectural project and create something extraordinary together
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
            <Link href="/contact">
              <button className="bg-white text-primary-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 hover:text-primary-900 hover:shadow-xl hover:scale-105 transition-all duration-300 transform">
                Book Free Consultation
              </button>
            </Link>
            <Link href="/projects">
              <button className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-primary-900 hover:shadow-xl hover:scale-105 transition-all duration-300 transform">
                View Complete Portfolio
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}