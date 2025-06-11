'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [scrollY, setScrollY] = useState(0)
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
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #041533 0%, #1a2332 25%, #2f3541 50%, #4a5568 75%, #877051 100%)`,
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-96 h-96 border-2 border-white/10 rotate-45"
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
          
          <div 
            className="absolute top-1/3 right-1/4 w-48 h-48 border border-white/20"
            style={{ 
              transform: `translateX(${scrollY * 0.2}px) translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.15}deg)`,
            }}
          ></div>
          
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div 
          className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.003)
          }}
        >
          <div 
            className="w-20 h-20 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-8 hover:scale-110 transition-all duration-300"
          >
            <span className="text-white text-3xl">📞</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-8 leading-none">
            <span className="inline-block hover:scale-110 transition-transform duration-700">
              Let's Talk
            </span>
            <br />
            <span className="inline-block text-secondary-300 hover:text-white transition-colors duration-700">
              Design
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12">
            At Merka, we believe every project begins with a conversation. Whether you're planning a new home, 
            a commercial development, or a landmark structure, we're ready to bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#consultation" className="group bg-white text-primary-900 px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Book Consultation
              </span>
            </a>
            <a href="#contact-form" className="group border-2 border-white text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 group-hover:text-primary-900 transition-colors duration-500">
                Quick Inquiry
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 right-20 w-64 h-64 border border-primary-100 rotate-45 opacity-30"
            style={{ transform: `translateY(${scrollY * 0.02}px) rotate(${45 + scrollY * 0.01}deg)` }}
          ></div>
          <div 
            className="absolute bottom-20 left-20 w-48 h-48 border border-secondary-100 rounded-full opacity-30"
            style={{ transform: `translateY(${scrollY * -0.03}px)` }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary-900 mb-6">
              Our Studio
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-8">
              {/* Office Location */}
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">📍</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-primary-900 mb-4">Merka Architecture</h3>
                <p className="text-gray-700 mb-2">Dubai, United Arab Emirates</p>
                <p className="text-gray-600 text-sm mb-4">[Business Bay, Plot No. 123, Office Tower, Floor 15]</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Open:</span> Monday to Friday — 9:00 AM to 6:00 PM
                </p>
              </div>

              {/* Contact Details */}
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">📱</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-primary-900 mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 text-sm">Phone:</span>
                    <p className="text-gray-900 font-semibold">+971 4 123 4567</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Email:</span>
                    <p className="text-gray-900 font-semibold">hello@merka-architecture.com</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">WhatsApp:</span>
                    <a href="https://wa.me/971412345678" className="text-primary-600 hover:text-primary-800 font-semibold transition-colors">
                      Click to Chat
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl">🌐</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-primary-900 mb-4">Stay Connected</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Follow our design stories, project progress, and studio life.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#" className="flex items-center px-3 py-2 bg-white rounded-lg hover:bg-primary-50 transition-colors text-sm">
                    <span className="mr-2">📷</span> Instagram
                  </a>
                  <a href="#" className="flex items-center px-3 py-2 bg-white rounded-lg hover:bg-primary-50 transition-colors text-sm">
                    <span className="mr-2">💼</span> LinkedIn
                  </a>
                  <a href="#" className="flex items-center px-3 py-2 bg-white rounded-lg hover:bg-primary-50 transition-colors text-sm">
                    <span className="mr-2">📌</span> Pinterest
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2" id="contact-form">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-serif font-bold text-primary-900 mb-2">Quick Inquiry Form</h3>
                <p className="text-gray-600 mb-8">Have a quick question or need more info? We typically respond within 24 hours.</p>
                
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
                    <p className="text-gray-600">Thank you for your inquiry. We'll get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-primary-600 hover:text-primary-800 font-semibold"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
                        'Send Message'
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
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6">
              Stay Updated
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Subscribe to our newsletter for design insights, project updates, and architectural inspiration delivered to your inbox.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6">
            Book a Consultation
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto mb-8"></div>
          
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Schedule a one-on-one design consultation with our lead architects. 
            We'll review your site, explore your goals, and help shape a clear architectural direction.
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💭</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Site Review</h4>
                <p className="text-gray-600 text-sm">Analyze your location and constraints</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Goal Setting</h4>
                <p className="text-gray-600 text-sm">Define your vision and objectives</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📐</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Design Direction</h4>
                <p className="text-gray-600 text-sm">Create a clear architectural roadmap</p>
              </div>
            </div>
            
            <a 
              href="mailto:hello@merka-architecture.com?subject=Consultation Booking Request&body=Hello, I would like to schedule a consultation for my project."
              className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Schedule Consultation →
            </a>
          </div>
        </div>
      </section>

      {/* Working with Merka Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-6">
            Working With Merka
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full mx-auto mb-8"></div>
          
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            We serve clients across Dubai and the UAE, and collaborate internationally. Our team is experienced 
            in navigating local approvals, site challenges, and cross-border architectural coordination. 
            From minimalist villas to high-rise mixed-use developments, our architecture design company in 
            Dubai is equipped to deliver excellence.
          </p>
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
            className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-white/5 to-secondary-300/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.03}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-primary-300/10 to-white/5 rounded-full blur-2xl"
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Let's Begin
          </h2>
          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Every project starts with a spark. If you're ready to design with intention, 
            contact us — and let's build something remarkable together.
          </p>
          
          <Link href="/projects">
            <button className="bg-white text-primary-900 px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                Start Your Project →
              </span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}