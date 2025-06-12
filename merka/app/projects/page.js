'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { featuredProjects, projectCategories } from '../data/projects.js'

export default function Projects() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const heroRef = useRef(null)

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

  const filteredProjects = activeFilter === 'all' 
    ? featuredProjects 
    : featuredProjects.filter(project => project.category === activeFilter)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Under Construction': return 'bg-blue-100 text-blue-800'
      case 'In Design': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
                <span className="text-[#041533] text-2xl">🏗️</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white text-center">
                PROJECTS
              </h1>
              <div className="w-32 h-1 bg-white mx-auto mt-4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimized Hero Section with Image Parallax */}
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
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80"
            alt="Modern Architecture Portfolio"
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
            className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-[#877051]/20 to-[#041533]/20 rounded-full blur-3xl"
            style={{ 
              transform: mounted ? `translateY(${scrollValue * -0.1}px)` : 'translateY(0px)',
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-[#041533]/15 to-[#877051]/15 rounded-full blur-3xl"
            style={{ 
              transform: mounted ? `translateY(${scrollValue * 0.1}px)` : 'translateY(0px)',
            }}
          ></div>
        </div>

        {/* Hero Content with entrance animation */}
        <div 
          className={`relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ 
            transitionDelay: '800ms',
            transform: mounted ? `translateY(${scrollValue * 0.2}px)` : 'translateY(0px)',
            opacity: mounted ? Math.max(0, 1 - scrollValue * 0.003) : 1
          }}
        >
          {/* Animated Logo/Icon */}
          <div 
            className={`w-16 h-16 bg-gradient-to-r from-[#877051] to-[#041533] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <span className="text-white text-2xl">🏗️</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            <span 
              className={`inline-block transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              Our
            </span>
            <span 
              className={`block text-[#877051] transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '1400ms' }}
            >
              Projects
            </span>
          </h1>
          
          {/* Subtitle */}
          <p 
            className={`text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1600ms' }}
          >
            Discover our portfolio of architectural excellence across Dubai and Abu Dhabi. 
            From luxury residences to commercial landmarks.
          </p>
          
          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1800ms' }}
          >
            <button className="group bg-white text-[#041533] px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-[#877051] to-[#041533] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Explore All Projects
              </span>
            </button>
            <Link href="/contact">
              <button className="group border-2 border-white text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 group-hover:text-[#041533] transition-colors duration-500">
                  Start Your Project
                </span>
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
            <span className="text-sm mb-2">Explore Projects</span>
            <div className="w-6 h-10 border-2 border-white rounded-full relative">
              <div className="w-1 h-3 bg-white rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#041533] mb-6">
              Featured Portfolio
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of architectural projects spanning residential, commercial, and hospitality sectors
            </p>
          </div>

          {/* Filter Buttons */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 700 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-[#041533] to-[#877051] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-1000 ease-out overflow-hidden hover:-translate-y-2 ${
                  scrollValue > 900 + index * 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"
                    style={{
                      opacity: hoveredProject === project.id ? 0.8 : 0.3,
                      transition: 'opacity 0.5s ease'
                    }}
                  ></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  {/* Hover Overlay - Simplified for mobile */}
                  <div 
                    className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-[#041533]/90 to-[#877051]/90"
                  >
                    <div className="text-center text-white p-6">
                      <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                      <p className="text-sm opacity-90 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.tags?.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-white/20 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-serif font-bold text-[#041533] group-hover:text-[#877051] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500 ml-2">{project.year}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📍</span>
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📐</span>
                      {project.area}
                    </div>
                  </div>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services?.slice(0, 2).map((service, serviceIndex) => (
                      <span 
                        key={serviceIndex} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                      >
                        {service}
                      </span>
                    ))}
                    {project.services?.length > 2 && (
                      <span className="px-2 py-1 bg-[#041533]/10 text-[#041533] rounded-lg text-xs">
                        +{project.services.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* View Project Button */}
                  <Link href={`/projects/${project.slug}`}>
                    <button className="w-full bg-gradient-to-r from-[#041533] to-[#877051] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                      View Project Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 1800 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Our Impact
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '150+', label: 'Projects Completed', icon: '🏗️' },
              { number: '2.5M+', label: 'Square Feet Designed', icon: '📐' },
              { number: '95%', label: 'Client Satisfaction', icon: '⭐' },
              { number: '12+', label: 'Years Experience', icon: '🏆' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`text-center group transition-all duration-1000 ease-out ${
                  scrollValue > 2000 + index * 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#041533] to-[#877051] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                  <span className="text-white text-2xl">{stat.icon}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#041533] mb-2 group-hover:text-[#877051] transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </div>
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
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            className={`transition-all duration-1000 ease-out ${
              scrollValue > 2500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Ready to Create Your Vision?
            </h2>
            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's collaborate to bring your architectural dreams to life. From concept to completion, 
              we're here to guide you through every step of the journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <button className="group bg-white text-[#041533] px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#877051] to-[#041533] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                    Start Your Project
                  </span>
                </button>
              </Link>
              <Link href="/services">
                <button className="group border-2 border-white text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative z-10 group-hover:text-[#041533] transition-colors duration-500">
                    Our Services
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}