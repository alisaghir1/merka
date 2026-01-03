'use client'
import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function ServicePage({ params }) {
  const { slug } = use(params)
  const supabase = createClient()
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [service, setService] = useState(null)
  const [otherServices, setOtherServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single()

        if (error) throw error
        setService(data)

        const { data: others } = await supabase
          .from('services')
          .select('id, title, slug, description, icon, gradient')
          .eq('published', true)
          .neq('slug', slug)
          .order('display_order', { ascending: true })
          .limit(5)

        setOtherServices(others || [])
      } catch (error) {
        console.error('Error fetching service:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [slug])

  const scrollValue = mounted ? scrollY : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-[#877051]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#877051] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-[#041533]/20 rounded-full"></div>
            <div className="absolute inset-2 border-4 border-[#041533] border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-600 font-medium">Loading service details...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-r from-[#041533] to-[#877051] rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12">
            <span className="text-5xl">🔍</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#041533] mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The service you&apos;re looking for doesn&apos;t exist or has been removed from our offerings.
          </p>
          <Link 
            href="/services"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#041533] to-[#877051] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Immersive Split Design */}
      <section className="relative min-h-screen flex items-center">
        {/* Left Side - Content */}
        <div className="w-full lg:w-1/2 min-h-screen flex items-center relative z-10 bg-white">
          <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-32 lg:py-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8 text-sm flex-wrap">
              <Link href="/" className="text-gray-400 hover:text-[#041533] transition-colors">Home</Link>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/services" className="text-gray-400 hover:text-[#041533] transition-colors">Services</Link>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#877051] font-medium">{service.title}</span>
            </nav>

            {/* Service Icon Badge */}
            {service.icon && (
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#041533]/5 to-[#877051]/5 px-4 py-2 rounded-full mb-6">
                <div className={`w-10 h-10 bg-gradient-to-r ${service.gradient || 'from-[#041533] to-[#877051]'} rounded-xl flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-lg">{service.icon}</span>
                </div>
                <span className="text-[#041533] font-medium text-sm uppercase tracking-wider">Our Service</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-[#041533] mb-6 leading-[1.1]">
              {service.title}
            </h1>

            {/* Description */}
            {service.description && (
              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed mb-10 max-w-xl">
                {service.description}
              </p>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {service.features && service.features.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-4 text-center group hover:bg-[#041533] transition-all duration-300">
                  <div className="text-2xl sm:text-3xl font-bold text-[#877051] group-hover:text-white transition-colors">{service.features.length}+</div>
                  <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-300 transition-colors mt-1">Key Features</div>
                </div>
              )}
              {service.process_steps && service.process_steps.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-4 text-center group hover:bg-[#041533] transition-all duration-300">
                  <div className="text-2xl sm:text-3xl font-bold text-[#877051] group-hover:text-white transition-colors">{service.process_steps.length}</div>
                  <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-300 transition-colors mt-1">Process Steps</div>
                </div>
              )}
              <div className="bg-gray-50 rounded-2xl p-4 text-center group hover:bg-[#041533] transition-all duration-300 col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-bold text-[#877051] group-hover:text-white transition-colors">24/7</div>
                <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-300 transition-colors mt-1">Support</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#041533] to-[#2f3541] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <span>Get Started</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a 
                href="#learn-more"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#041533] text-[#041533] px-8 py-4 rounded-2xl font-semibold hover:bg-[#041533] hover:text-white transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
          <div className="relative w-full h-full bg-gradient-to-br from-[#041533] via-[#2f3541] to-[#877051]">
            {/* Service Image */}
            {service.image && (
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-40 mix-blend-overlay"
                priority
              />
            )}
            
            {/* Decorative Elements */}
            <div className="absolute inset-0">
              <div 
                className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white/20 rounded-3xl rotate-12"
                style={{ transform: `translateY(${scrollValue * 0.1}px) rotate(12deg)` }}
              ></div>
              <div 
                className="absolute bottom-1/4 right-1/4 w-48 h-48 border-2 border-white/10 rounded-full"
                style={{ transform: `translateY(${scrollValue * -0.15}px)` }}
              ></div>
              <div 
                className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-[#877051]/30 to-transparent rounded-2xl -rotate-12 blur-sm"
                style={{ transform: `translateY(${scrollValue * 0.2}px) rotate(-12deg)` }}
              ></div>
              
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }}></div>
            </div>

            {/* Large Icon */}
            {service.icon && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-[200px] opacity-10 select-none">{service.icon}</div>
              </div>
            )}

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#041533] to-transparent"></div>
          </div>
        </div>

        {/* Mobile Visual Banner */}
        <div className="lg:hidden absolute top-0 left-0 right-0 h-72 bg-gradient-to-br from-[#041533] via-[#2f3541] to-[#877051] -z-10">
          {service.image && (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover opacity-30"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
          {service.icon && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-20">
              {service.icon}
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section id="learn-more" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#877051]/10 text-[#877051] rounded-full text-sm font-medium mb-4">
              Service Details
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#041533] mb-6">
              What We Offer
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#041533] to-[#877051] rounded-full mx-auto"></div>
          </div>

          {/* Full Description */}
          {service.full_description && (
            <div className="max-w-4xl mx-auto mb-20">
              <div 
                className="prose prose-lg lg:prose-xl max-w-none
                  prose-headings:font-serif prose-headings:text-[#041533] prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-800 prose-p:leading-relaxed
                  prose-a:text-[#877051] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[#041533]
                  prose-ul:my-6 prose-li:text-gray-800"
                dangerouslySetInnerHTML={{ __html: service.full_description }}
              />
            </div>
          )}

          {/* Sections with Images */}
          {service.sections && service.sections.length > 0 && (
            <div className="space-y-24 mb-20">
              {service.sections.map((section, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
                >
                  {section.image && (
                    <div className="w-full lg:w-1/2">
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                        <Image
                          src={section.image}
                          alt={section.title || `Section ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        <div className="absolute top-6 left-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-[#041533] font-bold text-lg">{String(index + 1).padStart(2, '0')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={`w-full ${section.image ? 'lg:w-1/2' : ''}`}>
                    {section.title && (
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#041533] mb-6">
                        {section.title}
                      </h3>
                    )}
                    {section.content && (
                      <div 
                        className="prose prose-lg max-w-none prose-p:text-gray-800 prose-p:leading-relaxed prose-a:text-[#877051]"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features & Benefits Grid */}
      {((service.features && service.features.length > 0) || (service.benefits && service.benefits.length > 0)) && (
        <section className="py-16 sm:py-20 lg:py-28 bg-[#041533] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#877051] to-[#a88765] rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Key Features</h3>
                  </div>
                  <div className="space-y-4">
                    {service.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="group flex items-start gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#877051]/50 transition-all duration-300"
                      >
                        <div className="w-8 h-8 bg-[#877051]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#877051] transition-colors">
                          <span className="text-[#877051] group-hover:text-white transition-colors">✦</span>
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">Benefits</h3>
                  </div>
                  <div className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <div 
                        key={index} 
                        className="group flex items-start gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300"
                      >
                        <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 transition-colors">
                          <svg className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps - Interactive Timeline */}
      {service.process_steps && service.process_steps.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-[#877051]/10 text-[#877051] rounded-full text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#041533] mb-6">
                Our Process
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#041533] to-[#877051] rounded-full mx-auto"></div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line - Desktop */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#041533] via-[#877051] to-[#041533]"></div>

              <div className="space-y-8 lg:space-y-0">
                {service.process_steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`w-full lg:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div 
                        className={`bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-[#877051]/30 transition-all duration-300 cursor-pointer ${
                          activeStep === index ? 'ring-2 ring-[#877051] ring-offset-4' : ''
                        }`}
                        onClick={() => setActiveStep(index)}
                      >
                        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                          <span className="text-sm font-medium text-[#877051] uppercase tracking-wider">Step {index + 1}</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#041533] mb-3">{step.title}</h3>
                        {step.description && (
                          <p className="text-gray-800 leading-relaxed">{step.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Center Number - Desktop */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-[#041533] to-[#877051] rounded-2xl items-center justify-center shadow-xl z-10">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>

                    {/* Mobile Number */}
                    <div className="lg:hidden flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#041533] to-[#877051] rounded-xl shadow-lg">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block w-[calc(50%-3rem)]"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Services - Modern Cards */}
      {otherServices.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <span className="inline-block px-4 py-2 bg-[#041533]/5 text-[#041533] rounded-full text-sm font-medium mb-4">
                  Explore More
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#041533]">
                  Other Services
                </h2>
              </div>
              <Link 
                href="/services"
                className="inline-flex items-center gap-2 text-[#877051] font-semibold hover:gap-4 transition-all duration-300 group"
              >
                View All Services
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Services Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {otherServices.map((otherService, index) => (
                <Link 
                  key={otherService.id} 
                  href={`/services/${otherService.slug}`}
                  className="group relative bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#877051]/30 overflow-hidden"
                >
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#041533] to-[#877051] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    {otherService.icon && (
                      <div className={`w-16 h-16 bg-gradient-to-r ${otherService.gradient || 'from-[#041533] to-[#877051]'} rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:backdrop-blur-sm transition-all duration-300`}>
                        <span className="text-white text-2xl">{otherService.icon}</span>
                      </div>
                    )}

                    {/* Number */}
                    <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100 group-hover:text-white/10 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#041533] group-hover:text-white transition-colors mb-3">
                      {otherService.title}
                    </h3>

                    {/* Description */}
                    {otherService.description && (
                      <p className="text-gray-800 group-hover:text-gray-200 transition-colors line-clamp-2 mb-6">
                        {otherService.description}
                      </p>
                    )}

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-[#877051] group-hover:text-white font-medium transition-colors">
                      <span>Learn More</span>
                      <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Modern Split Design */}
      <section className="relative overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left - Dark */}
          <div className="w-full lg:w-1/2 bg-[#041533] py-16 sm:py-20 lg:py-28 px-6 sm:px-8 lg:px-16 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            <div className="relative z-10 max-w-lg mx-auto lg:ml-auto lg:mr-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Let&apos;s discuss how our {service.title} service can help bring your architectural vision to life.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#041533] px-8 py-4 rounded-2xl font-semibold hover:bg-[#877051] hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl group"
              >
                <span>Start a Conversation</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right - Accent */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#877051] to-[#6d5a41] py-16 sm:py-20 lg:py-28 px-6 sm:px-8 lg:px-16 relative">
            <div className="relative z-10 max-w-lg mx-auto lg:mr-auto lg:ml-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-white/80 text-sm uppercase tracking-wider font-medium">Quick Contact</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Prefer to Talk?
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Our team is available to discuss your requirements and provide expert guidance.
              </p>
              <div className="space-y-4">
                <a href="tel:+97141234567" className="flex items-center gap-4 text-white hover:text-white/80 transition-colors group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">+971 4 123 4567</span>
                </a>
                <a href="mailto:hello@merka.ae" className="flex items-center gap-4 text-white hover:text-white/80 transition-colors group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">hello@merka.ae</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
