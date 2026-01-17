'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LanguageSwitcher, useLanguage } from './LanguageSwitcher'
import { translations } from '@/lib/i18n'

interface NavigationProps {
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator' | 'professional'
  className?: string
}

const navLinks = [
  { id: 'about', href: '#about' },
  { id: 'services', href: '#services' },
  { id: 'portfolio', href: '#portfolio' },
  { id: 'contact', href: '#contact' },
] as const

export function Navigation({ variant = 'explorer', className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const language = useLanguage()
  const t = translations[language]

  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isDark = variant === 'adventurer' || variant === 'professional'

  const variantStyles = {
    explorer: {
      bg: scrolled ? 'bg-explorer-background/95' : 'bg-transparent',
      text: 'text-explorer-text',
      accent: 'text-explorer-primary',
      progress: 'bg-explorer-primary',
    },
    scientist: {
      bg: scrolled ? 'bg-white/95' : 'bg-transparent',
      text: 'text-scientist-text',
      accent: 'text-scientist-secondary',
      progress: 'bg-scientist-secondary',
    },
    adventurer: {
      bg: scrolled ? 'bg-adventurer-primary/95' : 'bg-transparent',
      text: 'text-adventurer-text',
      accent: 'text-adventurer-accent',
      progress: 'bg-adventurer-accent',
    },
    facilitator: {
      bg: scrolled ? 'bg-facilitator-background/95' : 'bg-transparent',
      text: 'text-facilitator-text',
      accent: 'text-facilitator-primary',
      progress: 'bg-facilitator-primary',
    },
    professional: {
      bg: scrolled ? 'bg-[#1a1a2e]/95' : 'bg-transparent',
      text: 'text-white',
      accent: 'text-[#d4af37]',
      progress: 'bg-[#d4af37]',
    },
  }

  const styles = variantStyles[variant]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          styles.bg,
          scrolled && 'backdrop-blur-md shadow-sm',
          className
        )}
      >
        {/* Progress bar */}
        <motion.div
          className={cn('absolute bottom-0 left-0 h-0.5', styles.progress)}
          style={{ width: progressWidth }}
        />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className={cn('text-xl md:text-2xl font-display font-semibold', styles.text)}
              whileHover={{ scale: 1.02 }}
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Lucas Hammerer
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    'text-sm font-medium transition-colors relative',
                    styles.text,
                    'hover:opacity-80'
                  )}
                  whileHover={{ y: -2 }}
                >
                  {t.nav[link.id as keyof typeof t.nav]}
                  <motion.div
                    className={cn('absolute -bottom-1 left-0 right-0 h-0.5', styles.progress)}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}

              <LanguageSwitcher variant={isDark ? 'dark' : 'light'} />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <LanguageSwitcher variant={isDark ? 'dark' : 'light'} />
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn('p-2 rounded-lg', styles.text)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={cn(
                'absolute right-0 top-0 bottom-0 w-72 p-8 pt-24',
                variant === 'professional' ? 'bg-[#1a1a2e]' : isDark ? 'bg-adventurer-primary' : 'bg-white'
              )}
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      'text-lg font-medium text-left',
                      styles.text
                    )}
                  >
                    {t.nav[link.id as keyof typeof t.nav]}
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
