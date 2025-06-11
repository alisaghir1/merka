import { FaLinkedinIn, FaInstagram, FaTwitter, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
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
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <Link href="/" className="block">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-white to-[#877051] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
                    MERKA
                  </h2>
                </Link>
                <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mb-6"></div>
                <p className="text-lg text-gray-200 leading-relaxed max-w-md">
                  Dubai&apos;s premier architectural studio crafting iconic designs that blend innovation, culture, and sustainability. Creating spaces that inspire and endure for generations.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#877051] to-[#041533] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <FaMapMarkerAlt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium group-hover:text-[#877051] transition-colors duration-300">Dubai Design District</p>
                    <p className="text-gray-300 text-sm">Building 6, Ground Floor, Dubai, UAE</p>
                  </div>
                </div>
                
                <div className="flex items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#877051] to-[#041533] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <FaPhone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium group-hover:text-[#877051] transition-colors duration-300">+971 4 123 4567</p>
                    <p className="text-gray-300 text-sm">Monday - Friday, 9AM - 6PM</p>
                  </div>
                </div>
                
                <div className="flex items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#877051] to-[#041533] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <FaEnvelope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium group-hover:text-[#877051] transition-colors duration-300">hello@merka.ae</p>
                    <p className="text-gray-300 text-sm">Get in touch for consultations</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-6 text-white">Our Services</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Conceptual Design', link: '/services/conceptual-design' },
                  { name: 'Schematic Design', link: '/services/schematic-design' },
                  { name: 'Design Development', link: '/services/design-development' },
                  { name: 'Construction Drawings', link: '/services/construction-drawings' },
                  { name: 'Tender Documentation', link: '/services/tender-documentation' },
                  { name: 'Authority Approvals', link: '/services/authority-approvals' }
                ].map((service, index) => (
                  <li key={index}>
                    <Link href={service.link} className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                      <span className="w-2 h-2 bg-[#877051] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3 mb-8">
                {[
                  { name: 'About Us', link: '/about' },
                  { name: 'Projects', link: '/projects' },
                  { name: 'Blog', link: '/blog' },
                  { name: 'Styles & Typologies', link: '/styles-and-typologies' },
                  { name: 'Services', link: '/services' },
                  { name: 'Contact', link: '/contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link href={link.link} className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                      <span className="w-2 h-2 bg-[#041533] rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex gap-4">
                  {[
                    { Icon: FaLinkedinIn, link: 'https://linkedin.com/company/merka-architecture', color: 'hover:bg-blue-600' },
                    { Icon: FaInstagram, link: 'https://instagram.com/merka.architecture', color: 'hover:bg-pink-600' },
                    { Icon: FaTwitter, link: 'https://twitter.com/merka_arch', color: 'hover:bg-blue-400' },
                    { Icon: FaWhatsapp, link: 'https://wa.me/971501234567', color: 'hover:bg-green-600' }
                  ].map(({ Icon, link, color }, index) => (
                    <a 
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group ${color}`}
                    >
                      <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="text-center lg:text-left">
                <p className="text-gray-300 text-sm">
                  © 2024 MERKA Architecture. All rights reserved.
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Crafting architectural masterpieces in Dubai since 2015
                </p>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <Link href="/sitemap.xml" className="hover:text-white hover:scale-105 transition-all duration-300">Sitemap</Link>
                <Link href="/robots.txt" className="hover:text-white hover:scale-105 transition-all duration-300">Robots</Link>
                <Link href="/contact" className="hover:text-white hover:scale-105 transition-all duration-300">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}