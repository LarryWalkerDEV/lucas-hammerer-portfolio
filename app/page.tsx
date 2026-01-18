'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mountain, Beaker, Camera, Wind, Minimize2, Palette, Briefcase } from 'lucide-react'
import { LanguageSwitcher, useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const versions = [
  {
    id: 'v1',
    href: '/v1',
    icon: Mountain,
    gradient: 'from-[#C4704A] to-[#2D4739]',
    bgGradient: 'bg-gradient-to-br from-[#FAF7F2] to-[#E8B86D]/20',
    textColor: 'text-[#2C2416]',
    accentColor: 'text-[#C4704A]',
    labelKey: 'explorer' as const,
  },
  {
    id: 'v2',
    href: '/v2',
    icon: Beaker,
    gradient: 'from-[#1A1A2E] to-[#4A90A4]',
    bgGradient: 'bg-gradient-to-br from-white to-[#4A90A4]/10',
    textColor: 'text-[#16213E]',
    accentColor: 'text-[#4A90A4]',
    labelKey: 'scientist' as const,
  },
  {
    id: 'v3',
    href: '/v3',
    icon: Camera,
    gradient: 'from-[#0A0A0A] to-[#FF6B35]',
    bgGradient: 'bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]',
    textColor: 'text-[#F5F5F5]',
    accentColor: 'text-[#FF6B35]',
    labelKey: 'adventurer' as const,
  },
  {
    id: 'v4',
    href: '/v4',
    icon: Wind,
    gradient: 'from-[#2C5F6E] to-[#7FCDCD]',
    bgGradient: 'bg-gradient-to-br from-[#F0F7F7] to-[#7FCDCD]/20',
    textColor: 'text-[#264653]',
    accentColor: 'text-[#2C5F6E]',
    labelKey: 'facilitator' as const,
  },
  {
    id: 'v5',
    href: '/v5',
    icon: Minimize2,
    gradient: 'from-[#1A1A1A] to-[#6B6B6B]',
    bgGradient: 'bg-gradient-to-br from-[#FAFAF8] to-[#E8E8E8]',
    textColor: 'text-[#1A1A1A]',
    accentColor: 'text-[#2D2D2D]',
    labelKey: 'minimalist' as const,
  },
  {
    id: 'v6',
    href: '/v6',
    icon: Palette,
    gradient: 'from-[#f59e0b] to-[#ef4444]',
    bgGradient: 'bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]',
    textColor: 'text-[#F5F5F5]',
    accentColor: 'text-[#f59e0b]',
    labelKey: 'creative' as const,
  },
  {
    id: 'v7',
    href: '/v7',
    icon: Briefcase,
    gradient: 'from-[#1a1a2e] to-[#d4af37]',
    bgGradient: 'bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a]',
    textColor: 'text-white',
    accentColor: 'text-[#d4af37]',
    labelKey: 'professional' as const,
  },
]

export default function HomePage() {
  const language = useLanguage()
  const t = translations[language]
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-semibold"
          >
            Lucas Hammerer
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <LanguageSwitcher variant="dark" />
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16 md:mb-24"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold mb-4">
              {t.versionSelector.heading}
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto">
              {t.versionSelector.subtitle}
            </p>
          </motion.div>

          {/* Version Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {versions.map((version, index) => {
              const Icon = version.icon
              const versionT = t.versionSelector[version.labelKey]
              const isHovered = hoveredId === version.id

              return (
                <motion.div
                  key={version.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onMouseEnter={() => setHoveredId(version.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Link href={version.href}>
                    <motion.div
                      className={cn(
                        'relative overflow-hidden rounded-2xl p-8 md:p-10 cursor-pointer transition-all duration-500',
                        version.bgGradient
                      )}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className={cn(
                          'absolute inset-0 bg-gradient-to-r opacity-0',
                          version.gradient
                        )}
                        animate={{ opacity: isHovered ? 0.1 : 0 }}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        <motion.div
                          className={cn('mb-4', version.accentColor)}
                          animate={{ scale: isHovered ? 1.1 : 1 }}
                        >
                          <Icon className="w-10 h-10" />
                        </motion.div>

                        <h2 className={cn('text-2xl md:text-3xl font-display font-semibold mb-2', version.textColor)}>
                          {versionT.title}
                        </h2>

                        <p className={cn('mb-6 opacity-70', version.textColor)}>
                          {versionT.description}
                        </p>

                        <motion.div
                          className={cn('flex items-center gap-2 font-medium', version.accentColor)}
                          animate={{ x: isHovered ? 8 : 0 }}
                        >
                          <span>{language === 'de' ? 'Erkunden' : 'Explore'}</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full opacity-5">
                        <div className={cn('w-full h-full rounded-full bg-gradient-to-br', version.gradient)} />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16 md:mt-24"
          >
            <p className="text-white/40 text-sm uppercase tracking-[0.3em]">
              {language === 'de' ? 'Entfessle dein volles Potenzial' : 'Unleash Your Full Potential'}
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 text-center text-white/30 text-sm">
        <p>© {new Date().getFullYear()} Lucas Hammerer</p>
      </footer>
    </div>
  )
}
