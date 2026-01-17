'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Language } from '@/lib/i18n'

// Create a context for language
const LanguageContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
  mounted: boolean
}>({
  language: 'en',
  setLanguage: () => {},
  mounted: false,
})

// Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage only on client
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language') as Language | null
      if (stored && (stored === 'en' || stored === 'de')) {
        setLanguageState(stored)
      }
    }
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
      // Dispatch custom event for any listeners
      window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }))
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, mounted }}>
      {children}
    </LanguageContext.Provider>
  )
}

interface LanguageSwitcherProps {
  className?: string
  variant?: 'light' | 'dark'
  onLanguageChange?: (lang: Language) => void
}

export function LanguageSwitcher({
  className,
  variant = 'light',
  onLanguageChange
}: LanguageSwitcherProps) {
  const { language, setLanguage, mounted } = useContext(LanguageContext)
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
    onLanguageChange?.(lang)
  }

  const isDark = variant === 'dark'

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={cn('relative', className)}>
        <div className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-full',
          isDark ? 'text-white' : 'text-foreground'
        )}>
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium uppercase">EN</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-full transition-colors',
          isDark
            ? 'hover:bg-white/10 text-white'
            : 'hover:bg-black/5 text-foreground'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium uppercase">{language}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={cn(
                'absolute right-0 top-full mt-2 z-50 rounded-lg shadow-lg border overflow-hidden',
                isDark
                  ? 'bg-neutral-900 border-white/10'
                  : 'bg-white border-black/10'
              )}
            >
              {(['en', 'de'] as const).map((lang) => (
                <motion.button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-3',
                    isDark
                      ? 'hover:bg-white/10'
                      : 'hover:bg-black/5',
                    language === lang && (isDark ? 'bg-white/5' : 'bg-black/5')
                  )}
                  whileHover={{ x: 2 }}
                >
                  <span className="w-6">{lang === 'en' ? '🇬🇧' : '🇦🇹'}</span>
                  <span className={isDark ? 'text-white' : 'text-foreground'}>
                    {lang === 'en' ? 'English' : 'Deutsch'}
                  </span>
                  {language === lang && (
                    <motion.div
                      layoutId="language-indicator"
                      className={cn(
                        'ml-auto w-1.5 h-1.5 rounded-full',
                        isDark ? 'bg-white' : 'bg-foreground'
                      )}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Hook for language state - now uses context
export function useLanguage(): Language {
  const context = useContext(LanguageContext)
  const [currentLang, setCurrentLang] = useState<Language>('en')

  useEffect(() => {
    if (context.mounted) {
      setCurrentLang(context.language)
    }
  }, [context.language, context.mounted])

  // Also listen to storage and custom events for components outside provider
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleStorage = () => {
      const newLang = localStorage.getItem('language') as Language
      if (newLang && (newLang === 'en' || newLang === 'de')) {
        setCurrentLang(newLang)
      }
    }

    const handleCustom = (e: Event) => {
      const customEvent = e as CustomEvent<Language>
      setCurrentLang(customEvent.detail)
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('languageChange', handleCustom)

    // Check initial value
    const stored = localStorage.getItem('language') as Language | null
    if (stored && (stored === 'en' || stored === 'de')) {
      setCurrentLang(stored)
    }

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('languageChange', handleCustom)
    }
  }, [])

  return currentLang
}
