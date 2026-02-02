'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage, LANGUAGES } from '@/lib/LanguageContext'

export default function LanguageSwitcher({ variant = 'default', className = '' }) {
  const { language, setLanguage, isRTL, mounted } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  if (!mounted) {
    return (
      <div className={`w-20 h-10 bg-gray-200/50 rounded-lg animate-pulse ${className}`} />
    )
  }

  const currentLang = LANGUAGES[language]

  // Compact toggle variant for mobile/header
  if (variant === 'toggle') {
    return (
      <button
        onClick={() => handleLanguageChange(language === 'en' ? 'ar' : 'en')}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm
          transition-all duration-300 group
          bg-white border border-[#041533]/20 shadow-md
          hover:bg-gray-100 hover:scale-105
          ${className}
        `}
        title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
      >
        <span className="text-[#041533] font-semibold">
          {language === 'en' ? 'AR' : 'EN'}
        </span>
      </button>
    )
  }

  // Scrolled/dark header variant
  if (variant === 'scrolled') {
    return (
      <button
        onClick={() => handleLanguageChange(language === 'en' ? 'ar' : 'en')}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm
          transition-all duration-300 group
          bg-gradient-to-br from-[#041533]/10 to-[#877051]/10 
          border border-[#041533]/20
          hover:from-[#041533]/20 hover:to-[#877051]/20 hover:scale-105
          ${className}
        `}
        title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
      >
        <span className="text-[#041533] font-semibold">
          {language === 'en' ? 'AR' : 'EN'}
        </span>
      </button>
    )
  }

  // Dropdown variant for settings/admin
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            flex items-center gap-3 px-4 py-2.5 rounded-lg
            bg-white border border-gray-200 shadow-sm
            hover:border-[#877051] hover:shadow-md
            transition-all duration-300 w-full
          "
        >
          <span className="font-bold text-[#041533]">{currentLang.code.toUpperCase()}</span>
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-900">{currentLang.nativeName}</p>
          </div>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="
            absolute top-full left-0 right-0 mt-2 z-50
            bg-white rounded-lg border border-gray-200 shadow-xl
            overflow-hidden animate-fadeIn
          ">
            {Object.values(LANGUAGES).map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`
                  flex items-center gap-3 px-4 py-3 w-full
                  transition-all duration-200
                  ${language === lang.code 
                    ? 'bg-gradient-to-r from-[#041533]/10 to-[#877051]/10' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                <span className="font-bold text-[#041533]">{lang.code.toUpperCase()}</span>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{lang.nativeName}</p>
                </div>
                {language === lang.code && (
                  <svg className="w-5 h-5 text-[#877051]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Default inline variant
  return (
    <div className={`flex items-center gap-1 bg-gray-100 rounded-full p-1 ${className}`}>
      {Object.values(LANGUAGES).map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
            transition-all duration-300
            ${language === lang.code 
              ? 'bg-white shadow-md text-[#041533]' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          <span className="font-semibold">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  )
}
