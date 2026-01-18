'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Terminal, Building2, Sparkles } from 'lucide-react'
import { LanguageSwitcher, useLanguage } from '@/components/shared/LanguageSwitcher'
import { cn } from '@/lib/utils'

const versions = [
  {
    id: 'v1',
    href: '/apex/v1',
    icon: Terminal,
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'bg-gradient-to-br from-[#0a0a0a] to-[#111111]',
    textColor: 'text-white',
    accentColor: 'text-cyan-400',
    title: 'Tech Minimal',
    titleDe: 'Tech Minimal',
    description: 'Dark theme with neon cyan accents, animated grids',
    descriptionDe: 'Dunkles Thema mit Neon-Cyan-Akzenten, animierte Raster',
  },
  {
    id: 'v2',
    href: '/apex/v2',
    icon: Building2,
    gradient: 'from-blue-600 to-indigo-600',
    bgGradient: 'bg-gradient-to-br from-white to-blue-50',
    textColor: 'text-gray-900',
    accentColor: 'text-blue-600',
    title: 'Enterprise Corporate',
    titleDe: 'Enterprise Unternehmen',
    description: 'Professional blue theme, trusted by Fortune 500',
    descriptionDe: 'Professionelles Blau-Thema, vertraut von Fortune 500',
  },
  {
    id: 'v3',
    href: '/apex/v3',
    icon: Sparkles,
    gradient: 'from-purple-500 via-pink-500 to-orange-500',
    bgGradient: 'bg-gradient-to-br from-gray-900 to-purple-950',
    textColor: 'text-white',
    accentColor: 'text-purple-400',
    title: 'Futuristic Agency',
    titleDe: 'Futuristische Agentur',
    description: 'Bold gradients, glassmorphism, dramatic animations',
    descriptionDe: 'Kühne Verläufe, Glasmorphismus, dramatische Animationen',
  },
]

export default function ApexHomePage() {
  const language = useLanguage()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1),transparent_50%)]" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <motion.div
              className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <span className="font-bold text-2xl">
                Apex<span className="text-cyan-400">AI</span>
              </span>
              <p className="text-xs text-white/50">Research Labs LLC</p>
            </div>
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
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm text-white/70">
                {language === 'de' ? 'Wählen Sie Ihr Design' : 'Choose Your Design'}
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                {language === 'de' ? 'Drei Visionen' : 'Three Visions'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
              {language === 'de'
                ? 'Entdecken Sie drei einzigartige Ansätze für die AI-Automatisierung'
                : 'Explore three unique approaches to AI automation'}
            </p>
          </motion.div>

          {/* Version Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {versions.map((version, index) => {
              const Icon = version.icon
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
                        'relative overflow-hidden rounded-2xl p-8 cursor-pointer h-full min-h-[320px] flex flex-col',
                        'border border-white/10 transition-all duration-500',
                        version.bgGradient
                      )}
                      whileHover={{ scale: 1.02, y: -8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className={cn(
                          'absolute inset-0 bg-gradient-to-br opacity-0',
                          version.gradient
                        )}
                        animate={{ opacity: isHovered ? 0.2 : 0 }}
                      />

                      {/* Glow effect */}
                      <motion.div
                        className="absolute -inset-px rounded-2xl opacity-0"
                        style={{
                          background: `linear-gradient(135deg, ${version.id === 'v1' ? '#00ffff' : version.id === 'v2' ? '#2563eb' : '#8b5cf6'}, transparent)`,
                        }}
                        animate={{ opacity: isHovered ? 0.5 : 0 }}
                      />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full">
                        <motion.div
                          className={cn('mb-6 p-3 rounded-xl w-fit',
                            version.id === 'v2' ? 'bg-blue-100' : 'bg-white/10'
                          )}
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                            rotate: isHovered ? 5 : 0
                          }}
                        >
                          <Icon className={cn('w-8 h-8', version.accentColor)} />
                        </motion.div>

                        <h2 className={cn('text-2xl font-bold mb-2', version.textColor)}>
                          {language === 'de' ? version.titleDe : version.title}
                        </h2>

                        <p className={cn('mb-6 opacity-70 flex-grow', version.textColor)}>
                          {language === 'de' ? version.descriptionDe : version.description}
                        </p>

                        <motion.div
                          className={cn('flex items-center gap-2 font-medium', version.accentColor)}
                          animate={{ x: isHovered ? 8 : 0 }}
                        >
                          <span>{language === 'de' ? 'Ansehen' : 'View'}</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>

                      {/* Decorative corner */}
                      <div className={cn(
                        'absolute -right-12 -bottom-12 w-32 h-32 rounded-full opacity-20 blur-2xl',
                        `bg-gradient-to-br ${version.gradient}`
                      )} />
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Domain Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <a
              href="https://apex-research-labs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-white/70">apex-research-labs.com</span>
            </a>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 text-center text-white/30 text-sm">
        <p>© {new Date().getFullYear()} Apex AI Research Labs LLC</p>
      </footer>
    </div>
  )
}
