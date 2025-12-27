'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/30' 
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <div className="relative">
              {/* Logo Image */}
              <Image
                src="/logo.svg"
                alt="Merka Architecture"
                width={180}
                height={50}
                className="transition-all duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Unique Burger Menu Button */}
          <button
            onClick={toggleMenu}
            className={`relative w-14 h-14 rounded-2xl transition-all duration-500 group overflow-hidden shadow-xl border-2 ${
              isScrolled 
                ? 'bg-gradient-to-br from-[#041533]/10 to-[#877051]/10 border-[#041533]/20 hover:from-[#041533]/20 hover:to-[#877051]/20' 
                : 'bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20'
            }`}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#041533] to-[#877051] opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 rounded-2xl"></div>
            
            {/* Menu Lines */}
<div className="relative z-10 flex flex-col justify-center items-center w-full h-full space-y-1">
  <span className={`w-6 h-0.5 rounded-full transition-all duration-500 ${
    isScrolled ? 'bg-[#041533]' : 'bg-[#041533]'
  } group-hover:bg-white ${
    isMenuOpen ? 'rotate-45 translate-y-2' : ''
  }`}></span>
  <span className={`w-6 h-0.5 rounded-full transition-all duration-500 ${
    isScrolled ? 'bg-[#041533]' : 'bg-[#041533]'
  } group-hover:bg-white ${
    isMenuOpen ? 'opacity-0 scale-0' : ''
  }`}></span>
  <span className={`w-6 h-0.5 rounded-full transition-all duration-500 ${
    isScrolled ? 'bg-[#041533]' : 'bg-[#041533]'
  } group-hover:bg-white ${
    isMenuOpen ? '-rotate-45 -translate-y-2' : ''
  }`}></span>
</div>

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700">
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/30 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu with Slide Animation */}
        <div className={`absolute top-full left-0 w-full transition-all duration-700 ease-out ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="bg-white/95 backdrop-blur-2xl shadow-2xl border border-gray-200/50 rounded-b-3xl mx-4 overflow-hidden">
            {/* Menu Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#041533] to-[#877051] rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#877051] to-[#041533] rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10 px-8 py-10">
              <nav className="space-y-2">
                {[
                  { name: 'Home', href: '/', icon: '🏠' },
                  { name: 'About', href: '/about', icon: '📋' },
                  { name: 'Services', href: '/services', icon: '🔧' },
                  { name: 'Projects', href: '/projects', icon: '🏗️' },
                  { name: 'Styles & Typologies', href: '/styles-and-typologies', icon: '🎨' },
                  { name: 'Blog', href: '/blog', icon: '📝' },
                  { name: 'Contact', href: '/contact', icon: '📞' }
                ].map((item, index) => (
                  <Link 
                    key={item.name}
                    href={item.href} 
                    className={`flex items-center space-x-4 text-lg font-medium text-[#041533] hover:text-white py-4 px-6 rounded-2xl transition-all duration-500 hover:bg-gradient-to-r hover:from-[#041533] hover:to-[#877051] hover:shadow-lg  transform group ${
                      isMenuOpen ? 'animate-slideInLeft' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={closeMenu}
                  >
                    <span className="text-2xl group-hover:scale-105 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {item.name}
                    </span>
                    <div className="ml-auto w-6 h-6 bg-gradient-to-r from-[#041533] to-[#877051] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
                
                {/* Enhanced CTA Button */}
                <div className="pt-8 border-t border-gray-200/50 mt-6">
                  <Link 
                    href="/contact" 
                    className={`relative overflow-hidden flex items-center justify-center w-full bg-gradient-to-r from-[#041533] to-[#877051] text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform group ${
                      isMenuOpen ? 'animate-slideInUp' : ''
                    }`}
                    style={{ animationDelay: '700ms' }}
                    onClick={closeMenu}
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#877051] to-[#041533] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Button Content */}
                    <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                      Book Free Consultation
                    </span>
                    
                    {/* Sparkle Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <div className="absolute top-2 right-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                      <div className="absolute bottom-3 left-6 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                      <div className="absolute top-4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
                    </div>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </nav>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;