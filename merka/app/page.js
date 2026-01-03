'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getServices, getProjects } from '@/lib/data'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [services, setServices] = useState([])
  const [featuredProjects, setFeaturedProjects] = useState([])

  useEffect(() => {
    setMounted(true)
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Fetch services from database
    const fetchServices = async () => {
      try {
        const data = await getServices()
        setServices(data || [])
      } catch (error) {
        console.log('Using fallback services:', error)
        // Fallback to hardcoded services if database fails
        setServices([
          { title: "Conceptual Design", description: "Initial design concepts and feasibility studies", icon: "💡", slug: "conceptual-design" },
          { title: "Schematic Design", description: "Detailed schematic drawings that translate concepts", icon: "📐", slug: "schematic-design" },
          { title: "Design Development", description: "Comprehensive design with detailed specifications", icon: "🏗️", slug: "design-development" },
          { title: "Construction Drawings", description: "Precise technical drawings for construction", icon: "📋", slug: "construction-drawings" },
          { title: "Tender Documentation", description: "Complete tender packages for contractor bidding", icon: "📄", slug: "tender-documentation" },
          { title: "Authority Approvals", description: "Expert guidance through approval processes", icon: "✅", slug: "authority-approvals" }
        ])
      }
    }
    fetchServices()
    
    // Fetch featured projects from database
    const fetchFeaturedProjects = async () => {
      try {
        const data = await getProjects({ featured: true, limit: 6 })
        setFeaturedProjects(data || [])
      } catch (error) {
        console.log('Error fetching featured projects:', error)
        setFeaturedProjects([])
      }
    }
    fetchFeaturedProjects()
    
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
              <button className="group bg-white text-[#041533] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#877051] hover:text-white hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl flex items-center gap-2 mx-auto sm:mx-0">
                Explore Portfolio
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-[#041533] hover:scale-105 transition-all duration-500 backdrop-blur-sm bg-white/10">
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
                className={`group text-center p-8 bg-white rounded-3xl border border-gray-100 hover:border-[#877051]/30 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ${
                  scrollValue > 1200 + index * 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#041533] to-[#877051] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-white text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#041533] mb-4 group-hover:text-[#877051] transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
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
            {services.slice(0, 6).map((service, index) => (
              <Link 
                key={service.id || index} 
                href={`/services/${service.slug}`}
                className={`group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-3 hover:border-[#877051]/30 transition-all duration-500 block relative overflow-hidden ${
                  scrollValue > 2700 + index * 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Background number */}
                <div className="absolute -top-4 -right-4 text-8xl font-bold text-gray-100 group-hover:text-[#877051]/10 transition-colors duration-500 select-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#041533] to-[#877051] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <span className="text-white text-2xl">{service.icon || '🏛️'}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#041533] mb-3 group-hover:text-[#877051] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-6 line-clamp-2">
                    {service.short_description || service.description}
                  </p>
                  
                  <div className="flex items-center text-[#877051] font-semibold">
                    <span className="text-sm mr-2">Explore Service</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
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
              <button className="group bg-gradient-to-r from-[#041533] to-[#877051] text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 flex items-center gap-3 mx-auto">
                View All Services
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-24 bg-white relative z-30 overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#877051]/5 to-[#041533]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#041533]/5 to-[#877051]/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div 
              className={`text-center mb-16 transition-all duration-1000 ease-out ${
                scrollValue > 3400 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#041533]/10 to-[#877051]/10 rounded-full text-sm font-semibold text-[#877051] mb-4">
                Featured Work
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#041533] mb-6">
                Our Signature Projects
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover our most celebrated architectural achievements that define Dubai&apos;s evolving skyline
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.slice(0, 6).map((project, index) => (
                <Link 
                  key={project.id || index}
                  href={`/projects/${project.slug}`}
                  className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 ${
                    scrollValue > 3600 + index * 150 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Project Image */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={project.image || project.cover_image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041533]/90 via-[#041533]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Category Badge */}
                    {project.category && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#041533] text-xs font-semibold rounded-full">
                          {project.category}
                        </span>
                      </div>
                    )}

                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#877051] to-[#041533] rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>

                    {/* Hover Overlay Content */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-500">
                        <svg className="w-6 h-6 text-[#041533]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 relative">
                    {/* Decorative Line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#877051]/30 to-transparent"></div>
                    
                    <h3 className="text-xl font-serif font-bold text-[#041533] mb-2 group-hover:text-[#877051] transition-colors duration-300 line-clamp-1">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.short_description || project.description}
                    </p>

                    {/* Project Meta */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{project.location || 'Dubai, UAE'}</span>
                      </div>
                      
                      <div className="flex items-center text-[#877051] font-semibold group-hover:translate-x-1 transition-transform duration-300">
                        <span className="mr-1">View</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Projects Button */}
            <div 
              className={`text-center mt-16 transition-all duration-1000 ease-out ${
                scrollValue > 4200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Link href="/projects">
                <button className="group relative overflow-hidden bg-gradient-to-r from-[#041533] to-[#877051] text-white px-12 py-5 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#877051] to-[#041533] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="relative z-10 flex items-center gap-3">
                    Explore All Projects
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

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
                <button className="group bg-white text-[#041533] px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#041533] hover:text-white hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl flex items-center gap-2 justify-center">
                  Book Free Consultation
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
              <Link href="/projects">
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-[#877051] hover:scale-105 transition-all duration-500 backdrop-blur-sm bg-white/10">
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