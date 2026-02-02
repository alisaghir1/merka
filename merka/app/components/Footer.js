'use client'
import { useState, useEffect } from 'react'
import { FaLinkedinIn, FaInstagram, FaTwitter, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings, getServices } from '@/lib/data'
import { useLanguage } from '@/lib/LanguageContext'

// Default fallback values
const defaultContact = {
  email: 'hello@merka.ae',
  phone: '+971 4 123 4567',
  address: 'Dubai Design District, Building 6, Ground Floor, Dubai, UAE',
  whatsapp: '+971501234567'
}

const defaultSocial = {
  linkedin: 'https://linkedin.com/company/merka-architecture',
  instagram: 'https://instagram.com/merka.architecture',
  twitter: 'https://twitter.com/merka_arch'
}

const defaultServices = [
  { title: 'Conceptual Design', slug: 'conceptual-design' },
  { title: 'Schematic Design', slug: 'schematic-design' },
  { title: 'Design Development', slug: 'design-development' },
  { title: 'Construction Drawings', slug: 'construction-drawings' },
  { title: 'Tender Documentation', slug: 'tender-documentation' },
  { title: 'Authority Approvals', slug: 'authority-approvals' }
]

export default function Footer() {
  const [contact, setContact] = useState(defaultContact)
  const [social, setSocial] = useState(defaultSocial)
  // Remove static company.description to ensure translation is always used
  const [services, setServices] = useState(defaultServices)
  const { t, isRTL } = useLanguage()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch site settings
        const settings = await getSiteSettings()
        if (settings.contact) setContact({ ...defaultContact, ...settings.contact })
        if (settings.social) setSocial({ ...defaultSocial, ...settings.social })
        if (settings.company) setCompany(settings.company)

        // Fetch services
        const servicesData = await getServices({ published: true })
        if (servicesData && servicesData.length > 0) {
          setServices(servicesData.slice(0, 6))
        }
      } catch (error) {
        console.log('Using default footer data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <footer className="relative bg-gradient-to-br from-[#041533] via-[#2f3541] to-[#877051] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-[#877051]/10 to-[#041533]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-[#041533]/10 to-[#877051]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Architectural Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 -rotate-12 animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-40 w-16 h-16 border border-white/20 rotate-12 animate-pulse" style={{animationDuration: '4s'}}></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className={`grid lg:grid-cols-4 md:grid-cols-2 gap-12 ${isRTL ? 'text-right' : ''}`}>
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Link href="/" className="block">
                  <Image
                    src="/logo-light.svg"
                    alt="Merka Architecture"
                    width={200}
                    height={55}
                    className="hover:scale-105 transition-transform duration-300 cursor-pointer mb-4"
                  />
                </Link>
                <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mb-6"></div>
                <p className="text-lg text-gray-200 leading-relaxed max-w-md">
                  {t('footer.description')}
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className={`flex items-center group cursor-pointer${isRTL ? ' gap-8' : ''}`} dir="ltr">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#877051] to-[#041533] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <FaMapMarkerAlt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium group-hover:text-[#877051] transition-colors duration-300">{contact.address?.split(',')[0] || 'Dubai Design District'}</p>
                    <p className="text-gray-300 text-sm">{contact.address?.split(',').slice(1).join(',').trim() || 'Building 6, Ground Floor, Dubai, UAE'}</p>
                  </div>
                </div>
                
                <a href={`tel:${contact.phone}`} className={`flex items-center group cursor-pointer${isRTL ? ' gap-8' : ''}`} dir="ltr">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#877051] to-[#041533] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <FaPhone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium group-hover:text-[#877051] transition-colors duration-300">{contact.phone}</p>
                    <p className="text-gray-300 text-sm">{isRTL ? 'الإثنين - الجمعة، 9 صباحاً - 6 مساءً' : 'Monday - Friday, 9AM - 6PM'}</p>
                  </div>
                </a>
                
                <a href={`mailto:${contact.email}`} className={`flex items-center group cursor-pointer${isRTL ? ' gap-8' : ''}`} dir="ltr">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#877051] to-[#041533] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <FaEnvelope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium group-hover:text-[#877051] transition-colors duration-300">{contact.email}</p>
                    <p className="text-gray-300 text-sm">{isRTL ? 'تواصل معنا للاستشارات' : 'Get in touch for consultations'}</p>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-6 text-white">{t('footer.services')}</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={service.id || index}>
                    <Link href={`/services/${service.slug}`} className={`text-gray-300 hover:text-white transition-all duration-300 flex items-center group ${isRTL ? 'flex-row-reverse hover:-translate-x-2' : 'hover:translate-x-2'}`}>
                      <span className={`w-2 h-2 bg-[#877051] rounded-full ${isRTL ? 'ml-3' : 'mr-3'} group-hover:scale-150 transition-transform duration-300`}></span>
                      {isRTL && service.title_ar ? service.title_ar : service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-6 text-white">{t('footer.quickLinks')}</h3>
              <ul className="space-y-3 mb-8">
                {[
                  { name: t('nav.about'), link: '/about' },
                  { name: t('nav.projects'), link: '/projects' },
                  { name: t('nav.blog'), link: '/blog' },
                  { name: t('nav.stylesTypologies'), link: '/styles-and-typologies' },
                  { name: t('nav.services'), link: '/services' },
                  { name: t('nav.contact'), link: '/contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link href={link.link} className={`text-gray-300 hover:text-white transition-all duration-300 flex items-center group ${isRTL ? 'flex-row-reverse hover:-translate-x-2' : 'hover:translate-x-2'}`}>
                      <span className={`w-2 h-2 bg-[#041533] rounded-full ${isRTL ? 'ml-3' : 'mr-3'} group-hover:scale-150 transition-transform duration-300`}></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">{t('footer.followUs')}</h4>
                <div className="flex gap-4">
                  {social.linkedin && (
                    <a 
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group hover:bg-blue-600"
                    >
                      <FaLinkedinIn className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    </a>
                  )}
                  {social.instagram && (
                    <a 
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group hover:bg-pink-600"
                    >
                      <FaInstagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    </a>
                  )}
                  {social.twitter && (
                    <a 
                      href={social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group hover:bg-blue-400"
                    >
                      <FaTwitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    </a>
                  )}
                  {contact.whatsapp && (
                    <a 
                      href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group hover:bg-green-600"
                    >
                      <FaWhatsapp className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className={`flex flex-col lg:flex-row justify-between items-center gap-4 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
                <p className="text-gray-300 text-sm">
                  © {new Date().getFullYear()} MERKA Architecture. {t('footer.rights')}.
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Crafting architectural masterpieces in Dubai since 2015
                </p>
              </div>
              
              <div className={`flex items-center gap-6 text-sm text-gray-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Link href="/sitemap.xml" className="hover:text-white hover:scale-105 transition-all duration-300">Sitemap</Link>
                <Link href="/robots.txt" className="hover:text-white hover:scale-105 transition-all duration-300">Robots</Link>
                <Link href="/contact" className="hover:text-white hover:scale-105 transition-all duration-300">{t('nav.contact')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}