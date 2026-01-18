'use client'

import { motion } from 'framer-motion'
import { Zap, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { apexTranslations } from '@/lib/apex-i18n'

interface FooterProps {
  variant?: 'dark' | 'light' | 'gradient'
  className?: string
}

export function ApexFooter({ variant = 'dark', className }: FooterProps) {
  const language = useLanguage()
  const t = apexTranslations[language]
  const currentYear = new Date().getFullYear()

  const variantStyles = {
    dark: {
      bg: 'bg-black',
      text: 'text-white/70',
      heading: 'text-white',
      accent: 'text-cyan-400',
      border: 'border-white/10',
    },
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-600',
      heading: 'text-gray-900',
      accent: 'text-blue-600',
      border: 'border-gray-200',
    },
    gradient: {
      bg: 'bg-gradient-to-b from-gray-900 to-black',
      text: 'text-white/70',
      heading: 'text-white',
      accent: 'text-purple-400',
      border: 'border-white/10',
    },
  }

  const styles = variantStyles[variant]

  const footerLinks = {
    services: [
      { label: 'Process Automation', href: '#' },
      { label: 'AI Integration', href: '#' },
      { label: 'Custom Solutions', href: '#' },
      { label: 'Consulting', href: '#' },
    ],
    company: [
      { label: t.nav.about, href: '#about' },
      { label: t.nav.caseStudies, href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    legal: [
      { label: t.footer.privacy, href: '#' },
      { label: t.footer.terms, href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  }

  return (
    <footer className={cn('pt-16 pb-8', styles.bg, className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className={cn('p-2 rounded-lg', variant === 'light' ? 'bg-blue-600' : 'bg-cyan-500')}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className={cn('font-bold text-xl', styles.heading)}>
                Apex<span className={styles.accent}>AI</span>
              </span>
            </div>
            <p className={cn('mb-6 max-w-sm', styles.text)}>
              {t.footer.tagline}
            </p>
            <div className="space-y-3">
              <a href={`mailto:${t.contact.info.email}`} className={cn('flex items-center gap-3', styles.text, 'hover:' + styles.accent)}>
                <Mail className="w-4 h-4" />
                {t.contact.info.email}
              </a>
              <a href={`tel:${t.contact.info.phone}`} className={cn('flex items-center gap-3', styles.text, 'hover:' + styles.accent)}>
                <Phone className="w-4 h-4" />
                {t.contact.info.phone}
              </a>
              <div className={cn('flex items-center gap-3', styles.text)}>
                <MapPin className="w-4 h-4" />
                {t.contact.info.location}
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className={cn('font-semibold mb-4', styles.heading)}>{t.nav.services}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={cn('text-sm transition-colors', styles.text, 'hover:' + styles.accent)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={cn('font-semibold mb-4', styles.heading)}>Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={cn('text-sm transition-colors', styles.text, 'hover:' + styles.accent)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className={cn('font-semibold mb-4', styles.heading)}>Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={cn('text-sm transition-colors', styles.text, 'hover:' + styles.accent)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={cn('text-sm', styles.text)}>
            © {currentYear} Apex AI Research Labs LLC. {t.footer.rights}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Github, href: '#', label: 'GitHub' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className={cn('p-2 rounded-full transition-colors', styles.text, 'hover:' + styles.accent)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
