'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage, LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { apexTranslations } from '@/lib/apex-i18n'

interface NavigationProps {
  variant?: 'dark' | 'light' | 'glass'
  className?: string
}

export function ApexNavigation({ variant = 'dark', className }: NavigationProps) {
  const language = useLanguage()
  const t = apexTranslations[language]
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#solutions', label: t.nav.solutions },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ]

  const variantStyles = {
    dark: {
      bg: scrolled ? 'bg-black/90 backdrop-blur-xl' : 'bg-transparent',
      text: 'text-white',
      accent: 'text-cyan-400',
      border: scrolled ? 'border-white/10' : 'border-transparent',
    },
    light: {
      bg: scrolled ? 'bg-white/90 backdrop-blur-xl' : 'bg-transparent',
      text: 'text-gray-900',
      accent: 'text-blue-600',
      border: scrolled ? 'border-gray-200' : 'border-transparent',
    },
    glass: {
      bg: 'bg-white/10 backdrop-blur-xl',
      text: 'text-white',
      accent: 'text-purple-400',
      border: 'border-white/20',
    },
  }

  const styles = variantStyles[variant]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        styles.bg,
        styles.border,
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/apex" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className={cn('p-2 rounded-lg', variant === 'light' ? 'bg-blue-600' : 'bg-cyan-500')}
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            <span className={cn('font-bold text-xl', styles.text)}>
              Apex<span className={styles.accent}>AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  styles.text,
                  'hover:opacity-70'
                )}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
            <LanguageSwitcher variant={variant === 'light' ? 'light' : 'dark'} />
            <motion.a
              href="#contact"
              className={cn(
                'px-5 py-2 rounded-full text-sm font-semibold transition-all',
                variant === 'light'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-cyan-500 text-black hover:bg-cyan-400'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero.cta}
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn('md:hidden p-2', styles.text)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              'md:hidden border-t',
              variant === 'light' ? 'bg-white border-gray-200' : 'bg-black/95 border-white/10'
            )}
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn('block py-2 text-lg', styles.text)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10">
                <LanguageSwitcher variant={variant === 'light' ? 'light' : 'dark'} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
