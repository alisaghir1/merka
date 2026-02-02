'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'

const translations = { en, ar }

const LanguageContext = createContext()

export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇬🇧'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇦🇪'
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en')
  const [mounted, setMounted] = useState(false)

  // Load saved language preference on mount
  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem('merka-language')
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      setLanguageState(savedLang)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'ar') {
        setLanguageState('ar')
      }
    }
  }, [])

  // Update HTML attributes when language changes
  useEffect(() => {
    if (mounted) {
      const lang = LANGUAGES[language]
      document.documentElement.lang = lang.code
      document.documentElement.dir = lang.dir
      localStorage.setItem('merka-language', language)
    }
  }, [language, mounted])

  const setLanguage = useCallback((newLang) => {
    if (newLang === 'en' || newLang === 'ar') {
      setLanguageState(newLang)
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'en' ? 'ar' : 'en')
  }, [])

  // Translation function with nested key support (e.g., "nav.home")
  const t = useCallback((key, fallback = '') => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found in current language
        value = translations.en
        for (const ek of keys) {
          if (value && typeof value === 'object' && ek in value) {
            value = value[ek]
          } else {
            return fallback || key
          }
        }
        break
      }
    }
    
    // Return arrays and strings as-is, fallback for other types
    if (Array.isArray(value) || typeof value === 'string') {
      return value
    }
    return fallback || key
  }, [language])

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    dir: LANGUAGES[language]?.dir || 'ltr',
    isRTL: language === 'ar',
    isArabic: language === 'ar',
    currentLanguage: LANGUAGES[language],
    languages: LANGUAGES,
    mounted
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext
