'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { featuredProjects, projectCategories } from '../data/projects.js'

export default function Projects() {
  const [scrollY, setScrollY] = useState(0)
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div className="min-h-screen bg-white">
      {/* Enhanced Parallax Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #1a2332 25%, #2f3541 50%, #4a5568 75%, #877051 100%)`,
        }}
      >
        {/* Multi-layer Parallax Background */}
        <div className="absolute inset-0">
          {/* Layer 1 - Slow moving geometric shapes */}
          <div 
            className="absolute top-10 left-10 w-96 h-96 border-2 border-white/10 rotate-45"
            style={{ 
              transform: `translateY(${scrollY * 0.1}px) rotate(${45 + scrollY * 0.05}deg)`,
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 border-2 border-white/15 rounded-full"
            style={{ 
              transform: `translateY(${scrollY * -0.15}px) scale(${1 + scrollY * 0.0003})`,
            }}
          ></div>
          
          {/* Layer 2 - Medium speed architectural elements */}
          <div 
            className="absolute top-1/3 right-1/4 w-48 h-48 border border-white/20"
            style={{ 
              transform: `translateX(${scrollY * 0.2}px) translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.15}deg)`,
            }}
          ></div>
          <div 
            className="absolute bottom-1/3 left-1/4 w-32 h-32 border border-white/25 rotate-12"
            style={{ 
              transform: `translateX(${scrollY * -0.18}px) translateY(${scrollY * 0.12}px) rotate(${12 + scrollY * 0.1}deg)`,
            }}
          ></div>
          
          {/* Layer 3 - Fast moving grid overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px, 60px 60px, 30px 30px, 30px 30px',
              transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.1}px)`,
            }}
          ></div>
          
          {/* Layer 4 - Floating gradient orbs */}
          <div 
            className="absolute top-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 rounded-full blur-3xl"
            style={{ 
              transform: `translateY(${scrollY * -0.25}px) translateX(${scrollY * 0.1}px)`,
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-primary-500/15 to-secondary-500/15 rounded-full blur-3xl"
            style={{ 
              transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * -0.15}px)`,
            }}
          ></div>
          
          {/* Layer 5 - Dynamic mesh pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px, 50px 50px',
              transform: `translateY(${scrollY * 0.4}px) rotate(${scrollY * 0.02}deg)`,
            }}
          ></div>
        </div>

        {/* Hero Content with Parallax */}
        <div 
          className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.003)
          }}
        >
          {/* Animated Logo/Icon */}
          <div 
            className="w-24 h-24 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-8 relative overflow-hidden hover:scale-110 hover:rotate-3 transition-all duration-300"
            style={{
              transform: `rotateY(${scrollY * 0.1}deg) rotateX(${scrollY * 0.05}deg)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            <span className="text-white text-4xl relative z-10">🏗️</span>
          </div>
          
          {/* Main Title with Letter Animation */}
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-serif font-bold text-white mb-8 leading-none">
            <span 
              className="inline-block hover:scale-110 transition-transform duration-700"
              style={{ transform: `translateY(${Math.sin(scrollY * 0.01) * 5}px)` }}
            >
              Our
            </span>
            <br />
            <span 
              className="inline-block text-secondary-300 hover:text-white transition-colors duration-700"
              style={{ transform: `translateY(${Math.cos(scrollY * 0.01) * 5}px)` }}
            >
              Projects
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12 hover:text-white transition-colors duration-500">
            Discover our portfolio of architectural excellence across Dubai and Abu Dhabi. 
            From luxury residences to commercial landmarks.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-white text-primary-900 px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Explore All Projects
              </span>
            </button>
            <Link href="/contact">
              <button className="group border-2 border-white text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 group-hover:text-primary-900 transition-colors duration-500">
                  Start Your Project
                </span>
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
            <span className="text-sm mb-4 animate-pulse">Scroll to Explore</span>
            <div className="w-6 h-10 border-2 border-white rounded-full relative">
              <div className="w-1 h-3 bg-white rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 right-20 w-64 h-64 border border-primary-100 rotate-45 opacity-30"
            style={{ transform: `translateY(${scrollY * 0.02}px) rotate(${45 + scrollY * 0.01}deg)` }}
          ></div>
          <div 
            className="absolute bottom-20 left-20 w-48 h-48 border border-secondary-100 rounded-full opacity-30"
            style={{ transform: `translateY(${scrollY * -0.03}px) scale(${1 + scrollY * 0.00005})` }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Featured Portfolio
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto mb-8 hover:w-40 transition-all duration-300"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of architectural projects spanning residential, commercial, and hospitality sectors
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105'
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
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
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
                  
                  {/* Hover Overlay */}
                  <div 
                    className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(4, 21, 51, 0.9), rgba(47, 53, 65, 0.9))'
                    }}
                  >
                    <div className="text-center text-white p-6">
                      <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                      <p className="text-sm opacity-90 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.tags.slice(0, 2).map((tag, tagIndex) => (
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
                    <h3 className="text-xl font-serif font-bold text-primary-900 group-hover:text-secondary-800 transition-colors duration-300">
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
                    {project.services.slice(0, 2).map((service, serviceIndex) => (
                      <span 
                        key={serviceIndex} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                      >
                        {service}
                      </span>
                    ))}
                    {project.services.length > 2 && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs">
                        +{project.services.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* View Project Button - Now links to individual project page */}
                  <Link href={`/projects/${project.slug}`}>
                    <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
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
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)`,
        }}
      >
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-secondary-200/30 to-primary-200/30 rounded-full blur-2xl"
            style={{ transform: `translateY(${scrollY * -0.08}px)` }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6 hover:scale-105 transition-transform duration-300">
              Our Impact
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto hover:w-32 transition-all duration-300"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '150+', label: 'Projects Completed', icon: '🏗️' },
              { number: '2.5M+', label: 'Square Feet Designed', icon: '📐' },
              { number: '95%', label: 'Client Satisfaction', icon: '⭐' },
              { number: '12+', label: 'Years Experience', icon: '🏆' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-white text-2xl">{stat.icon}</span>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-900 mb-2 group-hover:text-secondary-800 transition-colors duration-300">
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
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-white/5 to-secondary-300/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.03}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-primary-300/10 to-white/5 rounded-full blur-2xl"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 hover:scale-105 transition-transform duration-300">
            Ready to Create Your Vision?
          </h2>
          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed hover:text-white transition-colors duration-300">
            Let's collaborate to bring your architectural dreams to life. From concept to completion, 
            we're here to guide you through every step of the journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <button className="group bg-white text-primary-900 px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Start Your Project
                </span>
              </button>
            </Link>
            <Link href="/services">
              <button className="group border-2 border-white text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 group-hover:text-primary-900 transition-colors duration-500">
                  Our Services
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}