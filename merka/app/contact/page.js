'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import emailjs from '@emailjs/browser'
import { submitContactForm, subscribeNewsletter, getSiteSettings } from '@/lib/data'

// Default fallback values
const defaultContact = {
  email: 'hello@merka-architecture.com',
  phone: '+971 4 123 4567',
  address: 'Dubai, United Arab Emirates',
  addressDetail: 'Business Bay, Plot No. 123, Office Tower, Floor 15',
  whatsapp: '+971412345678'
}

const defaultSocial = {
  instagram: '#',
  linkedin: '#',
  pinterest: '#'
}

export default function Contact() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [contact, setContact] = useState(defaultContact)
  const [social, setSocial] = useState(defaultSocial)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    projectType: '',
    budget: ''
  })
  const [subscriptionEmail, setSubscriptionEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')
  
  const contactFormRef = useRef()
  const subscriptionFormRef = useRef()

  useEffect(() => {
    setMounted(true)
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Fetch site settings
    const fetchSettings = async () => {
      try {
        const settings = await getSiteSettings()
        if (settings.contact) setContact({ ...defaultContact, ...settings.contact })
        if (settings.social) setSocial({ ...defaultSocial, ...settings.social })
      } catch (error) {
        console.log('Using default contact data:', error)
      }
    }
    fetchSettings()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const scrollValue = mounted ? scrollY : 0

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Save to Supabase (non-blocking)
      submitContactForm(formData).catch(err => console.log('Supabase save:', err))
      
      // Send main contact form via EmailJS
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
        contactFormRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        projectType: '',
        budget: ''
      })
    } catch (error) {
      console.error('Contact form error:', error)
      setError('Failed to send message. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubscriptionSubmit = async (e) => {
    e.preventDefault()
    setIsSubscribing(true)
    setError('')

    try {
      // Save to Supabase (non-blocking)
      subscribeNewsletter(subscriptionEmail).catch(err => console.log('Supabase subscription:', err))
      
      // Send subscription via EmailJS
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_SUBSCRIPTION_TEMPLATE_ID,
        subscriptionFormRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      
      setSubscribed(true)
      setSubscriptionEmail('')
    } catch (error) {
      console.error('Subscription error:', error)
      setError('Failed to subscribe. Please try again.')
    } finally {
      setIsSubscribing(false)
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
                <span className="text-[#041533] text-2xl">📞</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white text-center">
                CONTACT
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
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
            alt="Modern Communication and Contact"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Content with entrance animation */}
        <div 
          className={`relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="mb-8">
            <div 
              className={`w-16 h-16 bg-gradient-to-r from-[#877051] to-[#041533] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <span className="text-white text-2xl">📞</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight">
            <span 
              className={`inline-block transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              Let's
            </span>
            <span 
              className={`block text-[#877051] transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '1400ms' }}
            >
              Talk
            </span>
            <span 
              className={`block transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '1600ms' }}
            >
              Design
            </span>
          </h1>
          
          <p 
            className={`text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1800ms' }}
          >
            At Merka, we believe every project begins with a conversation. Whether you're planning a new home, a commercial development, or a landmark structure, we're ready to bring your vision to life.
          </p>

          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center mt-8 transition-all duration-1000 ease-out ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '2000ms' }}
          >
            <a href="#consultation" className="group bg-white text-[#041533] px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-[#877051] to-[#041533] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Book Consultation
              </span>
            </a>
            <a href="#contact-form" className="group border-2 border-white text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 group-hover:text-[#041533] transition-colors duration-500">
                Quick Inquiry
              </span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          style={{ opacity: mounted ? Math.max(0, 1 - scrollValue * 0.01) : 1 }}
        >
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-sm mb-2">Get In Touch</span>
            <div className="w-6 h-10 border-2 border-white rounded-full relative">
              <div className="w-1 h-3 bg-white rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              scrollValue > 500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#041533] mb-6">
              Our Studio
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-8">
              {/* Office Location */}
              <div 
                className={`bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-1000 ease-out group border border-gray-100 hover:border-[#877051]/30 ${
                  scrollValue > 700 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-[#041533] to-[#877051] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-xl">📍</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#041533] mb-4">Merka Architecture</h3>
                <p className="text-gray-700 mb-2">{contact.address}</p>
                <p className="text-gray-600 text-sm mb-4">{contact.addressDetail || ''}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Open:</span> Monday to Friday — 9:00 AM to 6:00 PM
                </p>
              </div>

              {/* Contact Details */}
              <div 
                className={`bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-1000 ease-out group border border-gray-100 hover:border-[#877051]/30 ${
                  scrollValue > 900 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-[#041533] to-[#877051] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-xl">📱</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#041533] mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm">Phone:</span>
                    <a href={`tel:${contact.phone}`} className="block text-gray-900 font-semibold hover:text-[#877051] transition-colors">{contact.phone}</a>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Email:</span>
                    <a href={`mailto:${contact.email}`} className="block text-gray-900 font-semibold hover:text-[#877051] transition-colors">{contact.email}</a>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">WhatsApp:</span>
                    <a href={`https://wa.me/${contact.whatsapp?.replace(/[^0-9]/g, '')}`} className="text-[#041533] hover:text-[#877051] font-semibold transition-colors">
                      Click to Chat
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div 
                className={`bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-1000 ease-out group border border-gray-100 hover:border-[#877051]/30 ${
                  scrollValue > 1100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-[#041533] to-[#877051] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-xl">🌐</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#041533] mb-4">Stay Connected</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Follow our design stories, project progress, and studio life.
                </p>
                <div className="flex flex-wrap gap-3">
                  {social.instagram && (
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-3 bg-white rounded-xl hover:bg-[#041533] hover:text-white transition-all duration-300 text-sm shadow-sm hover:shadow-md group">
                      <span className="mr-2">📷</span> <span className="group-hover:translate-x-1 transition-transform duration-300">Instagram</span>
                    </a>
                  )}
                  {social.linkedin && (
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-3 bg-white rounded-xl hover:bg-[#041533] hover:text-white transition-all duration-300 text-sm shadow-sm hover:shadow-md group">
                      <span className="mr-2">💼</span> <span className="group-hover:translate-x-1 transition-transform duration-300">LinkedIn</span>
                    </a>
                  )}
                  {social.pinterest && (
                    <a href={social.pinterest} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-3 bg-white rounded-xl hover:bg-[#041533] hover:text-white transition-all duration-300 text-sm shadow-sm hover:shadow-md group">
                      <span className="mr-2">📌</span> <span className="group-hover:translate-x-1 transition-transform duration-300">Pinterest</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2" id="contact-form">
              <div 
                className={`bg-white border border-gray-200 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-1000 ease-out ${
                  scrollValue > 700 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                <h3 className="text-2xl font-serif font-bold text-[#041533] mb-2">Quick Inquiry Form</h3>
                <p className="text-gray-800 mb-8">Have a quick question or need more info? We typically respond within 24 hours.</p>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-600 text-2xl">✓</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-800">Thank you for your inquiry. We'll get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-[#041533] hover:text-[#877051] font-semibold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form ref={contactFormRef} onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#041533] focus:border-transparent transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#041533] focus:border-transparent transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#041533] focus:border-transparent transition-all duration-300"
                          placeholder="+971 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mb-2">
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#041533] focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select project type</option>
                          <option value="residential">Residential Villa</option>
                          <option value="commercial">Commercial Building</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="mixed-use">Mixed-Use Development</option>
                          <option value="renovation">Renovation</option>
                          <option value="consultation">Consultation Only</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#041533] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-500k">Under AED 500K</option>
                        <option value="500k-1m">AED 500K - 1M</option>
                        <option value="1m-5m">AED 1M - 5M</option>
                        <option value="5m-10m">AED 5M - 10M</option>
                        <option value="over-10m">Over AED 10M</option>
                        <option value="consultation">Consultation Budget</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#041533] focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#041533] to-[#877051] text-white py-5 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Send Message
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-12 transition-all duration-1000 ease-out ${
              scrollValue > 1500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Stay Updated
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Subscribe to our newsletter for design insights, project updates, and architectural inspiration delivered to your inbox.
            </p>
          </div>

          <div 
            className={`bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto transition-all duration-1000 ease-out ${
              scrollValue > 1700 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {subscribed ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Successfully Subscribed!</h4>
                <p className="text-gray-600">Thank you for joining our newsletter. You'll receive our latest updates soon.</p>
              </div>
            ) : (
              <form ref={subscriptionFormRef} onSubmit={handleSubscriptionSubmit} className="space-y-4">
                <div>
                  <label htmlFor="subscription_email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="subscription_email"
                    name="subscription_email"
                    value={subscriptionEmail}
                    onChange={(e) => setSubscriptionEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#041533] focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full bg-gradient-to-r from-[#041533] to-[#877051] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    'Subscribe to Newsletter'
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Consultation Booking Section */}
      <section id="consultation" className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className={`transition-all duration-1000 ease-out ${
              scrollValue > 2000 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Book a Consultation
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
            
            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind? Schedule a one-on-one design consultation with our lead architects. 
              We'll review your site, explore your goals, and help shape a clear architectural direction.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#041533] to-[#877051] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">💭</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Site Review</h4>
                  <p className="text-gray-800 text-sm">Analyze your location and constraints</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#041533] to-[#877051] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Goal Setting</h4>
                  <p className="text-gray-800 text-sm">Define your vision and objectives</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#041533] to-[#877051] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📐</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Design Direction</h4>
                  <p className="text-gray-800 text-sm">Create a clear architectural roadmap</p>
                </div>
              </div>
              
              <a 
                href="mailto:hello@merka-architecture.com?subject=Consultation Booking Request&body=Hello, I would like to schedule a consultation for my project."
                className="inline-block bg-gradient-to-r from-[#041533] to-[#877051] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Schedule Consultation →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Working with Merka Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className={`transition-all duration-1000 ease-out ${
              scrollValue > 2500 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#041533] mb-6">
              Working With Merka
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#877051] to-[#041533] rounded-full mx-auto mb-8"></div>
            
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We serve clients across Dubai and the UAE, and collaborate internationally. Our team is experienced 
              in navigating local approvals, site challenges, and cross-border architectural coordination. 
              From minimalist villas to high-rise mixed-use developments, our architecture design company in 
              Dubai is equipped to deliver excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #2f3541 50%, #877051 100%)`,
        }}
      >
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-white/5 to-[#877051]/10 rounded-full blur-3xl"
            style={{ transform: mounted ? `translateY(${scrollValue * 0.03}px)` : 'translateY(0px)' }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-[#041533]/10 to-white/5 rounded-full blur-2xl"
            style={{ transform: mounted ? `translateY(${scrollValue * -0.05}px)` : 'translateY(0px)' }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            className={`transition-all duration-1000 ease-out ${
              scrollValue > 3000 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Let's Begin
            </h2>
            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Every project starts with a spark. If you're ready to design with intention, 
              contact us — and let's build something remarkable together.
            </p>
            
            <Link href="/projects">
              <button className="bg-white text-[#041533] px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-[#877051] to-[#041533] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Start Your Project →
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}