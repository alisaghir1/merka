'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

export default function ProjectDetailClient({ project, allProjects = [] }) {
  const [scrollY, setScrollY] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const { t, isRTL, language } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gray-50 ${isRTL ? 'rtl' : ''}`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('projects.detail.notFound')}</h1>
          <p className="text-gray-600 mb-8">{t('projects.detail.notFoundDesc')}</p>
          <Link href="/projects" className={`inline-flex items-center gap-2 bg-[#041533] text-white px-6 py-3 rounded-lg hover:bg-[#877051] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
            <svg className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('projects.detail.backToProjects')}
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

  const getStatusText = (status) => {
    switch (status) {
      case 'Completed': return language === 'ar' ? 'مكتمل' : 'Completed'
      case 'Under Construction': return language === 'ar' ? 'قيد الإنشاء' : 'Under Construction'
      case 'In Design': return language === 'ar' ? 'قيد التصميم' : 'In Design'
      default: return status
    }
  }

  const projectIndex = allProjects.findIndex(p => p.id === project.id)
  const nextProject = allProjects[projectIndex + 1] || allProjects[0]
  const prevProject = allProjects[projectIndex - 1] || allProjects[allProjects.length - 1]

  const projectTitle = language === 'ar' && project.title_ar ? project.title_ar : project.title
  const projectDescription = language === 'ar' && project.description_ar ? project.description_ar : project.description
  const projectFullDescription = language === 'ar' && project.full_description_ar ? project.full_description_ar : (project.full_description || project.fullDescription)
  const projectLocation = language === 'ar' && project.location_ar ? project.location_ar : project.location
  const projectArea = language === 'ar' && project.area_ar ? project.area_ar : project.area
  const projectClient = language === 'ar' && project.client_ar ? project.client_ar : project.client
  const projectBudget = language === 'ar' && project.budget_ar ? project.budget_ar : project.budget
  const projectTimeline = language === 'ar' && project.timeline_ar ? project.timeline_ar : project.timeline
  const projectFeatures = language === 'ar' && project.features_ar?.length ? project.features_ar : (project.features || [])

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : ''}`}>
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-end overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #1a2332 25%, #2f3541 50%, #4a5568 75%, #877051 100%)`,
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={projectTitle}
            fill
            className="object-cover"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
              willChange: 'transform',
            }}
            priority
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full pb-20 px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl mx-auto text-white ${isRTL ? 'text-right' : ''}`}>
            {/* Breadcrumb */}
            <nav className={`mb-8 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">
                {t('nav.projects')}
              </Link>
              <span className={isRTL ? 'rotate-180' : ''}>→</span>
              <span className="text-white">{projectTitle}</span>
            </nav>

            {/* Project Info */}
            <div className={`flex items-center gap-4 mb-6 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
              <span className="text-gray-300">{project.year}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-300 capitalize">{project.category}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              {projectTitle}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
              {projectDescription}
            </p>

            <div className={`flex flex-wrap gap-6 mt-8 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-400">{t('projects.detail.location')}:</span>
                <span className="text-white">{projectLocation}</span>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-400">{t('projects.detail.size')}:</span>
                <span className="text-white">{projectArea}</span>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-400">{t('projects.detail.year')}:</span>
                <span className="text-white">{projectTimeline || project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-3 gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            {/* Main Content */}
            <div className={`lg:col-span-2 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl font-serif font-bold text-[#041533] mb-6">
                {t('projects.detail.overview')}
              </h2>
              {projectFullDescription && (
                <div 
                  className="text-lg text-gray-700 leading-relaxed mb-8 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: projectFullDescription }}
                />
              )}

              {/* Image Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-serif font-bold text-[#041533] mb-6">
                    {language === 'ar' ? 'معرض الصور' : 'Gallery'}
                  </h3>
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
                          alt={`${projectTitle} ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          quality={90}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            🔍 {language === 'ar' ? 'عرض الحجم الكامل' : 'View Full Size'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {projectFeatures.length > 0 && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#041533] mb-6">
                    {language === 'ar' ? 'الميزات الرئيسية' : 'Key Features'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {projectFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className={`w-2 h-2 bg-[#877051] rounded-full ${isRTL ? 'ml-3' : 'mr-3'} flex-shrink-0`}></span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Project Info Card */}
              <div className={`bg-gray-50 rounded-xl p-6 mb-8 sticky top-8 ${isRTL ? 'text-right' : ''}`}>
                <h3 className="text-xl font-serif font-bold text-[#041533] mb-4">
                  {language === 'ar' ? 'تفاصيل المشروع' : 'Project Details'}
                </h3>
                
                <div className="space-y-4">
                  {projectClient && (
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        {language === 'ar' ? 'العميل' : 'Client'}
                      </span>
                      <p className="text-gray-900">{projectClient}</p>
                    </div>
                  )}
                  
                  {projectBudget && (
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        {language === 'ar' ? 'الميزانية' : 'Budget Range'}
                      </span>
                      <p className="text-gray-900">{projectBudget}</p>
                    </div>
                  )}
                  
                  {projectTimeline && (
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        {language === 'ar' ? 'الجدول الزمني' : 'Project Timeline'}
                      </span>
                      <p className="text-gray-900">{projectTimeline}</p>
                    </div>
                  )}
                  
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {language === 'ar' ? 'الحالة' : 'Status'}
                    </span>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                </div>

                {/* Services */}
                {project.services && project.services.length > 0 && (
                  <div className="mt-6">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-3">
                      {language === 'ar' ? 'الخدمات المقدمة' : 'Services Provided'}
                    </span>
                    <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {project.services.map((service, index) => (
                        <span key={index} className="px-3 py-1 bg-[#041533]/10 text-[#041533] rounded-lg text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mt-6">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-3">
                      {language === 'ar' ? 'الوسوم' : 'Project Tags'}
                    </span>
                    <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {project.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-[#877051]/10 text-[#877051] rounded-lg text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link href="/contact">
                    <button className="w-full bg-gradient-to-r from-[#041533] to-[#877051] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                      {language === 'ar' ? 'ابدأ مشروعًا مشابهًا' : 'Start Similar Project'}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {allProjects.length > 1 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-[#041533] mb-4">
                {language === 'ar' ? 'المزيد من المشاريع' : 'More Projects'}
              </h2>
              <p className="text-gray-800">
                {language === 'ar' ? 'استكشف إنجازاتنا المعمارية الأخرى' : 'Explore our other architectural achievements'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Previous Project */}
              {prevProject && prevProject.id !== project.id && (
                <Link href={`/projects/${prevProject.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-48">
                      <Image
                        src={prevProject.image}
                        alt={language === 'ar' && prevProject.title_ar ? prevProject.title_ar : prevProject.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        quality={85}
                      />
                      <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {isRTL ? 'السابق →' : '← Previous'}
                        </span>
                      </div>
                    </div>
                    <div className={`p-6 ${isRTL ? 'text-right' : ''}`}>
                      <h3 className="text-xl font-serif font-bold text-[#041533] mb-2 group-hover:text-[#877051] transition-colors">
                        {language === 'ar' && prevProject.title_ar ? prevProject.title_ar : prevProject.title}
                      </h3>
                      <p className="text-gray-800 text-sm">
                        {language === 'ar' && prevProject.location_ar ? prevProject.location_ar : prevProject.location}
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              {/* Next Project */}
              {nextProject && nextProject.id !== project.id && (
                <Link href={`/projects/${nextProject.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-48">
                      <Image
                        src={nextProject.image}
                        alt={language === 'ar' && nextProject.title_ar ? nextProject.title_ar : nextProject.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        quality={85}
                      />
                      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {isRTL ? '← التالي' : 'Next →'}
                        </span>
                      </div>
                    </div>
                    <div className={`p-6 ${isRTL ? 'text-right' : ''}`}>
                      <h3 className="text-xl font-serif font-bold text-[#041533] mb-2 group-hover:text-[#877051] transition-colors">
                        {language === 'ar' && nextProject.title_ar ? nextProject.title_ar : nextProject.title}
                      </h3>
                      <p className="text-gray-800 text-sm">
                        {language === 'ar' && nextProject.location_ar ? nextProject.location_ar : nextProject.location}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            <div className="text-center mt-12">
              <Link href="/projects">
                <button className="bg-[#041533] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#877051] transition-colors">
                  {language === 'ar' ? 'عرض جميع المشاريع' : 'View All Projects'}
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Image Modal */}
      {showImageModal && project.gallery && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={project.gallery[activeImageIndex]}
              alt={`${projectTitle} ${activeImageIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[80vh]"
              quality={100}
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
