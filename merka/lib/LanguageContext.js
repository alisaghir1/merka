'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
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

// Helper to detect locale from pathname
function getLocaleFromPath(pathname) {
  return pathname.startsWith('/ar') ? 'ar' : 'en'
}

// Helper to strip locale prefix from pathname
function stripLocale(pathname) {
  if (pathname.startsWith('/ar')) {
    return pathname.replace(/^\/ar/, '') || '/'
  }
  return pathname
}

// Helper to build a locale-prefixed path
export function localePath(path, locale) {
  if (locale === 'ar') {
    return path === '/' ? '/ar' : `/ar${path}`
  }
  return path
}

export function LanguageProvider({ children, initialLocale }) {
  const pathname = usePathname()
  const router = useRouter()
  const [language, setLanguageState] = useState(initialLocale || 'en')
  const [mounted, setMounted] = useState(false)

  // Sync language from URL on mount and on navigation
  useEffect(() => {
    setMounted(true)
    const urlLocale = getLocaleFromPath(window.location.pathname)
    setLanguageState(urlLocale)
    localStorage.setItem('merka-language', urlLocale)
  }, [pathname])

  // Update HTML attributes when language changes
  useEffect(() => {
    if (mounted) {
      const lang = LANGUAGES[language]
      document.documentElement.lang = lang.code
      document.documentElement.dir = lang.dir
    }
  }, [language, mounted])

  const setLanguage = useCallback((newLang) => {
    if (newLang === 'en' || newLang === 'ar') {
      // Update state immediately so UI reflects the change
      setLanguageState(newLang)
      localStorage.setItem('merka-language', newLang)
      // Navigate to the new locale URL
      const currentPath = stripLocale(window.location.pathname)
      const newPath = localePath(currentPath, newLang)
      router.push(newPath)
    }
  }, [router])

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

  // Build locale-aware path
  const getLocalePath = useCallback((path) => {
    return localePath(path, language)
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
    mounted,
    localePath: getLocalePath
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
