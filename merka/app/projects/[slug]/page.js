'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectBySlug, getProjects } from '@/lib/data'

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [project, setProject] = useState(null)
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Try fetching from Supabase first
        const data = await getProjectBySlug(params.slug)
        if (data) {
          setProject(data)
          const allData = await getProjects({ published: true })
          if (allData && allData.length > 0) {
            setAllProjects(allData)
          }
        } else {
          // No project found
          setProject(null)
        }
      } catch (error) {
        console.log('Error fetching project:', error)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
    
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041533]"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-800 mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/projects" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Under Construction': return 'bg-blue-100 text-blue-800'
      case 'In Design': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const nextProject = allProjects.find(p => p.id === project.id + 1) || allProjects[0]
  const prevProject = allProjects.find(p => p.id === project.id - 1) || allProjects[allProjects.length - 1]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-end overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #1a2332 25%, #2f3541 50%, #4a5568 75%, #877051 100%)`,
        }}
      >
        {/* Background Image - Fixed the blurriness issue */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`, // Reduced parallax effect
              willChange: 'transform', // Optimize for animations
            }}
            priority // Load image with high priority
            quality={95} // Higher quality to reduce blur
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-white">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">
                Projects
              </Link>
              <span className="mx-2">→</span>
              <span className="text-white">{project.title}</span>
            </nav>

            {/* Project Info */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className="text-gray-300">{project.year}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300 capitalize">{project.category}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-6 mt-8 text-sm">
              <div>
                <span className="text-gray-400">Location:</span>
                <span className="ml-2 text-white">{project.location}</span>
              </div>
              <div>
                <span className="text-gray-400">Area:</span>
                <span className="ml-2 text-white">{project.area}</span>
              </div>
              <div>
                <span className="text-gray-400">Timeline:</span>
                <span className="ml-2 text-white">{project.timeline}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold text-primary-900 mb-6">
                Project Overview
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {project.fullDescription}
              </p>

              {/* Image Gallery */}
              <div className="mb-12">
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6">Gallery</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                      onClick={() => {
                        setActiveImageIndex(index)
                        setShowImageModal(true)
                      }}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        quality={90} // Higher quality for gallery images
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          🔍 View Full Size
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-6">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Project Info Card */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8 sticky top-8">
                <h3 className="text-xl font-serif font-bold text-primary-900 mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Client</span>
                    <p className="text-gray-900">{project.client}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Budget Range</span>
                    <p className="text-gray-900">{project.budget}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Project Timeline</span>
                    <p className="text-gray-900">{project.timeline}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Status</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div className="mt-6">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-3">Services Provided</span>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-lg text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-6">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-3">Project Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-lg text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link href="/contact">
                    <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                      Start Similar Project
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary-900 mb-4">More Projects</h2>
            <p className="text-gray-800">Explore our other architectural achievements</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Previous Project */}
            <Link href={`/projects/${prevProject.slug}`} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-48">
                  <Image
                    src={prevProject.image}
                    alt={prevProject.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    quality={85}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      ← Previous
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary-900 mb-2 group-hover:text-secondary-800 transition-colors">
                    {prevProject.title}
                  </h3>
                  <p className="text-gray-800 text-sm">{prevProject.location}</p>
                </div>
              </div>
            </Link>

            {/* Next Project */}
            <Link href={`/projects/${nextProject.slug}`} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-48">
                  <Image
                    src={nextProject.image}
                    alt={nextProject.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    quality={85}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Next →
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary-900 mb-2 group-hover:text-secondary-800 transition-colors">
                    {nextProject.title}
                  </h3>
                  <p className="text-gray-800 text-sm">{nextProject.location}</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                View All Projects
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={project.gallery[activeImageIndex]}
              alt={`${project.title} ${activeImageIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[80vh]"
              quality={100} // Maximum quality for modal images
            />
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
            
            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveImageIndex(activeImageIndex > 0 ? activeImageIndex - 1 : project.gallery.length - 1)
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveImageIndex(activeImageIndex < project.gallery.length - 1 ? activeImageIndex + 1 : 0)
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}