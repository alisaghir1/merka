'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <header className={`fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <div className={`bg-gradient-to-br from-[#041533] via-[#2f3541] to-[#877051] rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}>
              <span className={`text-white font-bold group-hover:text-2xl transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>M</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-[#041533] group-hover:text-[#877051] transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>Merka</span>
              <span className={`text-[#877051] -mt-1 tracking-wider group-hover:text-[#041533] transition-all duration-300 ${isScrolled ? 'text-[10px]' : 'text-xs'}`}>ARCHITECTURE</span>
            </div>
          </Link>

          {/* Enhanced Burger Menu Button */}
          <button
            onClick={toggleMenu}
            className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#041533]/10 to-[#877051]/10 hover:from-[#041533]/20 hover:to-[#877051]/20 transition-all duration-300 group shadow-lg hover:shadow-xl border border-[#041533]/10 hover:border-[#041533]/20 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}
          >
            <div className={`flex flex-col justify-between ${isScrolled ? 'w-5 h-4' : 'w-6 h-5'}`}>
              <span className={`w-full bg-gradient-to-r from-[#041533] to-[#877051] transition-all duration-300 rounded-full ${isScrolled ? 'h-0.5' : 'h-0.5'} ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-full bg-gradient-to-r from-[#041533] to-[#877051] transition-all duration-300 rounded-full ${isScrolled ? 'h-0.5' : 'h-0.5'} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full bg-gradient-to-r from-[#041533] to-[#877051] transition-all duration-300 rounded-full ${isScrolled ? 'h-0.5' : 'h-0.5'} ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-200/50 rounded-b-2xl overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <nav className="space-y-6">
                <Link 
                  href="/" 
                  className="block text-lg font-medium text-[#041533] hover:text-[#877051] transition-all duration-300 hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-[#041533]/5"
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="block text-lg font-medium text-[#041533] hover:text-[#877051] transition-all duration-300 hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-[#041533]/5"
                  onClick={closeMenu}
                >
                  About
                </Link>
                <Link 
                  href="/services" 
                  className="block text-lg font-medium text-[#041533] hover:text-[#877051] transition-all duration-300 hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-[#041533]/5"
                  onClick={closeMenu}
                >
                  Services
                </Link>
                <Link 
                  href="/projects" 
                  className="block text-lg font-medium text-[#041533] hover:text-[#877051] transition-all duration-300 hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-[#041533]/5"
                  onClick={closeMenu}
                >
                  Projects
                </Link>
                <Link 
                  href="/styles-and-typologies" 
                  className="block text-lg font-medium text-[#041533] hover:text-[#877051] transition-all duration-300 hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-[#041533]/5"
                  onClick={closeMenu}
                >
                  Styles & Typologies
                </Link>
                <Link 
                  href="/blog" 
                  className="block text-lg font-medium text-[#041533] hover:text-[#877051] transition-all duration-300 hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-[#041533]/5"
                  onClick={closeMenu}
                >
                  Blog
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-lg font-medium text-[#041533] hover:text-[#877051] transition-all duration-300 hover:translate-x-2 hover:scale-105 py-2 px-4 rounded-lg hover:bg-[#041533]/5"
                  onClick={closeMenu}
                >
                  Contact
                </Link>
                <div className="pt-6 border-t border-gray-200/50">
                  <Link 
                    href="/contact" 
                    className="inline-block bg-gradient-to-r from-[#041533] to-[#877051] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
                    onClick={closeMenu}
                  >
                    Book Consultation
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;