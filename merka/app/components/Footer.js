import { FaLinkedinIn, FaInstagram, FaTwitter, FaBehance, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl"></div>
        
        {/* Architectural Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 -rotate-12"></div>
          <div className="absolute top-40 right-40 w-16 h-16 border border-white/20 rotate-12"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-white to-secondary-200 bg-clip-text text-transparent">
                  MIRKA
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mb-6"></div>
                <p className="text-lg text-gray-200 leading-relaxed max-w-md">
                  Dubai's premier architectural studio crafting iconic designs that blend innovation, culture, and sustainability. Creating spaces that inspire and endure for generations.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <FaMapMarkerAlt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Dubai Design District</p>
                    <p className="text-gray-300 text-sm">Building 6, Ground Floor, Dubai, UAE</p>
                  </div>
                </div>
                
                <div className="flex items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <FaPhone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">+971 4 123 4567</p>
                    <p className="text-gray-300 text-sm">Monday - Friday, 9AM - 6PM</p>
                  </div>
                </div>
                
                <div className="flex items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <FaEnvelope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">hello@mirka-architecture.com</p>
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
                  'Residential Architecture',
                  'Commercial Design',
                  'Hospitality Projects',
                  'Cultural Buildings',
                  'Interior Design',
                  'Project Management',
                ].map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                      <span className="w-2 h-2 bg-secondary-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-serif font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3 mb-8">
                {[
                  'About Us',
                  'Portfolio',
                  'Our Process',
                  'Sustainability',
                  'Careers',
                  'Contact'
                ].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                      <span className="w-2 h-2 bg-primary-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex gap-4">
                  {[
                    { Icon: FaLinkedinIn, link: '#' },
                    { Icon: FaInstagram, link: '#' },
                    { Icon: FaTwitter, link: '#' },
                    { Icon: FaBehance, link: '#' }
                  ].map(({ Icon, link }, index) => (
                    <a 
                      key={index}
                      href={link}
                      className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-secondary-600 hover:to-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
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
                  © 2024 MIRKA Architecture. All rights reserved.
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Crafting architectural masterpieces in Dubai since 2015
                </p>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}