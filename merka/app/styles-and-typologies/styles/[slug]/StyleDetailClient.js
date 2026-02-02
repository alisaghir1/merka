'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

export default function StyleDetailClient({ style }) {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { t, isRTL, language } = useLanguage()
  
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollValue = mounted ? scrollY : 0

  // Get localized content
  const styleTitle = language === 'ar' && style.title_ar ? style.title_ar : style.title
  const styleDescription = language === 'ar' && style.description_ar ? style.description_ar : style.description
  const styleShortDescription = language === 'ar' && style.short_description_ar ? style.short_description_ar : (style.shortDescription || style.short_description)
  const styleExtendedDescription = language === 'ar' && style.extended_description_ar ? style.extended_description_ar : (style.extendedDescription || style.extended_description)
  const styleFeatures = language === 'ar' && style.features_ar ? style.features_ar : style.features || []
  const styleApplications = language === 'ar' && style.applications_ar ? style.applications_ar : style.applications || []
  const styleMaterials = language === 'ar' && style.materials_ar ? style.materials_ar : style.materials || []
  const styleCompliance = language === 'ar' && style.compliance_ar ? style.compliance_ar : style.compliance || []

  // Handle both database format (images as JSON) and static format
  const heroImage = style.images?.hero || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
  const galleryImages = style.images?.gallery || []
  const featuredImage = style.images?.featured || heroImage
  const applicationsImage = style.images?.applications || heroImage

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : ''}`}>
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
        }}
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={styleTitle}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className={`absolute top-20 ${isRTL ? 'right-20' : 'left-20'} w-64 h-64 bg-gradient-to-r ${style.gradient} rounded-full blur-3xl opacity-20`}
            style={{ 
              transform: mounted ? `translateY(${scrollValue * -0.3}px)` : 'translateY(0px)',
            }}
          ></div>
          <div 
            className={`absolute bottom-20 ${isRTL ? 'left-20' : 'right-20'} w-96 h-96 bg-gradient-to-r from-white/5 to-[#877051]/10 rounded-full blur-3xl`}
            style={{ 
              transform: mounted ? `translateY(${scrollValue * 0.2}px)` : 'translateY(0px)',
            }}
          ></div>
        </div>

        <div className={`relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : ''}`}>
          {/* Breadcrumb */}
          <nav className={`mb-8 flex items-center gap-2 text-sm justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link 
              href="/styles-and-typologies" 
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {t('stylesTypologies.breadcrumb.main')}
            </Link>
            <span className="text-gray-400">→</span>
            <span className="text-white">{t('stylesTypologies.breadcrumb.styles')}</span>
            <span className="text-gray-400">→</span>
            <span className="text-[#877051]">{styleTitle}</span>
          </nav>

          {/* Icon */}
          <div className={`w-24 h-24 bg-gradient-to-r ${style.gradient} rounded-2xl flex items-center justify-center mx-auto mb-8 hover:scale-110 transition-transform duration-300`}>
            <span className="text-white text-4xl">{style.icon}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
            {styleTitle}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {styleShortDescription}
          </p>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: mounted ? Math.max(0, 1 - scrollValue * 0.01) : 1 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 animate-pulse">{t('stylesTypologies.styles.exploreStyle')}</span>
            <div className="animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Transition */}
      <div className="relative h-32 bg-gradient-to-b from-[#041533] to-white"></div>

      {/* Image Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#041533] mb-6">
                {styleTitle} {t('stylesTypologies.styles.inPractice')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {galleryImages.map((image, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative h-64 bg-gray-200 rounded-2xl overflow-hidden">
                    <Image
                      src={image.url || image}
                      alt={image.caption || `${styleTitle} ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  {image.caption && <p className="text-gray-800 text-sm mt-3">{image.caption}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-3 gap-12 ${isRTL ? 'text-right' : ''}`}>
            {/* Main Description */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#041533] mb-6">
                {t('stylesTypologies.styles.overview')}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {styleDescription}
                </p>
                {styleExtendedDescription && (
                  <p className="text-gray-700 leading-relaxed">
                    {styleExtendedDescription}
                  </p>
                )}
              </div>

              {/* Featured Image */}
              <div className="mt-12">
                <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden">
                  <Image
                    src={featuredImage}
                    alt={`${styleTitle} featured project`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} text-white`}>
                    <h3 className="text-xl font-bold mb-2">{styleTitle} {t('stylesTypologies.styles.projectExample')}</h3>
                    <p className="text-gray-200 text-sm">Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 sticky top-8 shadow-lg">
                <h3 className="text-xl font-serif font-bold text-[#041533] mb-6">
                  {t('stylesTypologies.styles.summary')}
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-[#041533] mb-2">{t('stylesTypologies.styles.styleIcon')}</h4>
                    <div className={`w-12 h-12 bg-gradient-to-r ${style.gradient} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-xl">{style.icon}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#041533] mb-2">{t('stylesTypologies.styles.keyFeatures')}</h4>
                    <p className="text-sm text-gray-800">{styleFeatures.length} {t('stylesTypologies.styles.characteristics')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#041533] mb-2">{t('stylesTypologies.styles.applications')}</h4>
                    <p className="text-sm text-gray-800">{styleApplications.length} {t('stylesTypologies.styles.projectTypes')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#041533] mb-2">{t('stylesTypologies.styles.materials')}</h4>
                    <p className="text-sm text-gray-800">{styleMaterials.length} {t('stylesTypologies.styles.materialCategories')}</p>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-[#041533] mb-2">{t('stylesTypologies.styles.interested')}</h4>
                  <p className="text-sm text-gray-800 mb-3">{t('stylesTypologies.styles.getConsultation')}</p>
                  <Link href="/contact">
                    <button className="w-full bg-[#041533] text-white py-2 px-4 rounded-lg text-sm hover:bg-[#877051] transition-colors duration-300">
                      {t('common.contactUs')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {styleFeatures.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#041533] mb-6">
                {t('stylesTypologies.styles.designFeatures')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {styleFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 group border border-gray-100 ${isRTL ? 'text-right' : ''}`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r from-[#041533] to-[#877051] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${isRTL ? 'mr-auto ml-0' : ''}`}>
                    <span className="text-white text-xl">✦</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Applications Section */}
      {styleApplications.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'text-right' : ''}`}>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#041533] mb-6">
                  {t('stylesTypologies.styles.whereWeApply')}
                </h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {t('stylesTypologies.styles.applicationsDescription')}
                </p>
                
                <div className="space-y-4">
                  {styleApplications.map((application, index) => (
                    <div key={index} className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-6 h-6 bg-gradient-to-r from-[#041533] to-[#877051] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className={`text-gray-700 ${isRTL ? 'mr-3' : 'ml-3'}`}>{application}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={applicationsImage}
                    alt="Application example"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                {styleMaterials.length > 0 && (
                  <>
                    <h3 className="text-2xl font-serif font-bold text-[#041533] mb-6">
                      {t('stylesTypologies.styles.materialsFinishes')}
                    </h3>
                    
                    <div className="space-y-4">
                      {styleMaterials.map((material, index) => (
                        <div 
                          key={index} 
                          className="bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                        >
                          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-3 h-3 bg-[#877051] rounded-full ${isRTL ? 'ml-3' : 'mr-3'}`}></div>
                            <span className="text-gray-700">{material}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Compliance Section */}
      {styleCompliance.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#041533] mb-6">
                {t('stylesTypologies.styles.compliance')}
              </h2>
              <p className="text-xl text-gray-800 max-w-3xl mx-auto">
                {t('stylesTypologies.styles.complianceDescription')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {styleCompliance.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-xl">⚖️</span>
                  </div>
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
        }}
      >
        <div className="absolute inset-0">
          <div className={`absolute top-20 ${isRTL ? 'right-20' : 'left-20'} w-96 h-96 bg-gradient-to-r ${style.gradient} rounded-full blur-3xl opacity-20`}></div>
          <div className={`absolute bottom-20 ${isRTL ? 'left-20' : 'right-20'} w-64 h-64 bg-gradient-to-r from-white/5 to-[#877051]/10 rounded-full blur-2xl`}></div>
        </div>
        
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center ${isRTL ? 'text-right' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {t('stylesTypologies.styles.interestedIn')} {styleTitle}?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            {t('stylesTypologies.styles.letsDiscuss')}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Link href="/contact">
              <button className="bg-white text-[#041533] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                {t('stylesTypologies.cta.startProject')}
              </button>
            </Link>
            <Link href="/styles-and-typologies">
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#041533] hover:scale-105 transition-all duration-300">
                {t('stylesTypologies.styles.exploreMore')}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
