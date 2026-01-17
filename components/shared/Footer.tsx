'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from './LanguageSwitcher'
import { translations } from '@/lib/i18n'

interface FooterProps {
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator' | 'professional'
  className?: string
}

export function Footer({ variant = 'explorer', className }: FooterProps) {
  const language = useLanguage()
  const t = translations[language]

  const variantStyles = {
    explorer: {
      bg: 'bg-explorer-secondary',
      text: 'text-explorer-background',
      accent: 'text-explorer-accent',
    },
    scientist: {
      bg: 'bg-scientist-primary',
      text: 'text-white',
      accent: 'text-scientist-secondary',
    },
    adventurer: {
      bg: 'bg-black',
      text: 'text-adventurer-text',
      accent: 'text-adventurer-accent',
    },
    facilitator: {
      bg: 'bg-facilitator-primary',
      text: 'text-white',
      accent: 'text-facilitator-secondary',
    },
    professional: {
      bg: 'bg-[#0a0a14]',
      text: 'text-white/70',
      accent: 'text-[#d4af37]',
    },
  }

  const styles = variantStyles[variant]
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('py-8', styles.bg, className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className={cn('text-center md:text-left', styles.text)}>
            <p className="text-sm">
              © {currentYear} Lucas Hammerer. {t.footer.rights}
            </p>
          </div>

          <div className={cn('flex items-center gap-2 text-sm', styles.text)}>
            <span>{t.footer.tagline}</span>
            <Heart className={cn('w-4 h-4 animate-pulse', styles.accent)} />
          </div>

          <div className={cn('flex items-center gap-4 text-sm', styles.text)}>
            <a
              href="https://immobilien-fotograf.wien"
              target="_blank"
              rel="noopener noreferrer"
              className={cn('hover:underline transition-colors', styles.accent)}
            >
              immobilien-fotograf.wien
            </a>
            <span className="opacity-50">|</span>
            <a
              href="https://lucas-hammerer.at"
              className={cn('hover:underline transition-colors', styles.accent)}
            >
              lucas-hammerer.at
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
