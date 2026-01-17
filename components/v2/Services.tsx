'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { Wind, Camera, Mic, Home, ChevronRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Service {
  id: string
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  link?: string
}

export function Services() {
  const language = useLanguage()
  const t = translations[language]
  const [activeService, setActiveService] = useState<string>('breathwork')

  const services: Service[] = [
    {
      id: 'breathwork',
      icon: Wind,
      title: t.services.breathwork.title,
      description: t.services.breathwork.description,
      features: language === 'de'
        ? ['Wissenschaftlich fundiert', 'Elektronische Musik', 'Gruppen & Einzelsessions', 'Corporate Wellness']
        : ['Science-based approach', 'Electronic music integration', 'Group & private sessions', 'Corporate wellness'],
      link: 'https://goodlife-breathing.com',
    },
    {
      id: 'photography',
      icon: Camera,
      title: t.services.photography.title,
      description: t.services.photography.description,
      features: language === 'de'
        ? ['Abenteuer Fotografie', 'Surf & Wassersport', 'Event-Dokumentation', 'Portraitfotografie']
        : ['Adventure photography', 'Surf & water sports', 'Event documentation', 'Portrait photography'],
    },
    {
      id: 'speaking',
      icon: Mic,
      title: t.services.speaking.title,
      description: t.services.speaking.description,
      features: language === 'de'
        ? ['TED Talks', 'Konferenzen', 'Workshops', 'Podcasts & Medien']
        : ['TED Talks', 'Conferences', 'Workshops', 'Podcasts & media'],
    },
    {
      id: 'realestate',
      icon: Home,
      title: language === 'de' ? 'Immobilienfotografie' : 'Real Estate Photography',
      description: language === 'de'
        ? 'Professionelle Immobilienvisualisierung für schnellere Verkäufe und bessere Präsentation.'
        : 'Professional real estate visualization for faster sales and better presentation.',
      features: language === 'de'
        ? ['360° Virtuelle Touren', 'Drohnenfotografie', 'Twilight-Aufnahmen', 'Virtual Staging']
        : ['360° Virtual Tours', 'Drone photography', 'Twilight shots', 'Virtual staging'],
      link: 'https://immobilien-fotograf.wien',
    },
  ]

  const activeServiceData = services.find(s => s.id === activeService)

  return (
    <section id="services" className="py-20 md:py-32 bg-scientist-background relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 text-scientist-secondary uppercase tracking-[0.2em] text-sm font-medium"
          >
            <span className="w-8 h-px bg-scientist-secondary/50" />
            {language === 'de' ? 'Angebote' : 'Services'}
            <span className="w-8 h-px bg-scientist-secondary/50" />
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-scientist-text mt-4">
            {t.services.heading}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Service tabs */}
          <div className="space-y-3">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveService(service.id)}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group',
                  activeService === service.id
                    ? 'bg-scientist-primary/10 border-scientist-secondary/40'
                    : 'bg-scientist-background border-scientist-primary/10 hover:border-scientist-primary/30'
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center transition-colors',
                    activeService === service.id
                      ? 'bg-scientist-secondary text-white'
                      : 'bg-scientist-primary/10 text-scientist-secondary group-hover:bg-scientist-primary/20'
                  )}
                >
                  <service.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3
                    className={cn(
                      'font-semibold transition-colors',
                      activeService === service.id
                        ? 'text-scientist-secondary'
                        : 'text-scientist-text group-hover:text-scientist-secondary'
                    )}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm text-scientist-text/50 line-clamp-1">
                    {service.description}
                  </p>
                </div>
                <ChevronRight
                  className={cn(
                    'w-5 h-5 transition-all',
                    activeService === service.id
                      ? 'text-scientist-secondary translate-x-1'
                      : 'text-scientist-text/30 group-hover:text-scientist-secondary'
                  )}
                />
              </motion.button>
            ))}
          </div>

          {/* Service details */}
          <AnimatePresence mode="wait">
            {activeServiceData && (
              <motion.div
                key={activeServiceData.id}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-scientist-primary/5 to-scientist-secondary/5 rounded-2xl p-8 border border-scientist-primary/10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-scientist-secondary/20 flex items-center justify-center">
                    <activeServiceData.icon className="w-8 h-8 text-scientist-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-scientist-text">
                      {activeServiceData.title}
                    </h3>
                    {activeServiceData.link && (
                      <a
                        href={activeServiceData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-scientist-secondary hover:underline"
                      >
                        {activeServiceData.link.replace('https://', '')}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-scientist-text/70 mb-6 leading-relaxed">
                  {activeServiceData.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-scientist-text/50 uppercase tracking-wider">
                    {language === 'de' ? 'Leistungen' : 'Features'}
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {activeServiceData.features.map((feature, index) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 text-sm text-scientist-text/80"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-scientist-secondary" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  className="mt-8 w-full py-3 bg-scientist-primary text-white rounded-lg font-medium hover:bg-scientist-primary/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {language === 'de' ? 'Mehr erfahren' : 'Learn More'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
