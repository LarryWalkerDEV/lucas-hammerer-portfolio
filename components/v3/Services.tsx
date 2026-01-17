'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import {
  Wind,
  Camera,
  Mic,
  Snowflake,
  Mountain,
  Waves,
  Building2,
  Users,
  Compass,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'

interface Service {
  id: string
  icon: typeof Wind
  secondaryIcon: typeof Wind
  title: string
  titleDe: string
  description: string
  descriptionDe: string
  features: string[]
  featuresDe: string[]
  highlight: string
  highlightDe: string
  accentColor: string
}

const services: Service[] = [
  {
    id: 'breathwork',
    icon: Wind,
    secondaryIcon: Snowflake,
    title: 'Breathwork & Ice',
    titleDe: 'Atemarbeit & Eis',
    description: 'Transform your physical and mental performance through scientifically-grounded breathing sessions combined with controlled cold exposure.',
    descriptionDe: 'Transformiere deine körperliche und geistige Leistungsfähigkeit durch wissenschaftlich fundierte Atemsessions kombiniert mit kontrollierter Kälteexposition.',
    features: [
      'Individual Sessions',
      'Festival Workshops',
      'Corporate Wellness',
      'Ice Bathing Experiences',
    ],
    featuresDe: [
      'Einzelsessions',
      'Festival Workshops',
      'Corporate Wellness',
      'Eisbaden Erfahrungen',
    ],
    highlight: 'Goodlife Breathing',
    highlightDe: 'Goodlife Breathing',
    accentColor: 'from-adventurer-accent to-adventurer-highlight',
  },
  {
    id: 'photography',
    icon: Camera,
    secondaryIcon: Mountain,
    title: 'Adventure Photography',
    titleDe: 'Abenteuer Fotografie',
    description: 'Capturing authentic moments in extraordinary settings. From action sports to intimate portraits, bringing stories to life through the lens.',
    descriptionDe: 'Authentische Momente in außergewöhnlichen Umgebungen einfangen. Von Action-Sport bis zu intimen Porträts, Geschichten zum Leben erwecken.',
    features: [
      'Event Photography',
      'Water & Surf',
      'Real Estate (immobilien-fotograf.wien)',
      'Adventure Documentation',
    ],
    featuresDe: [
      'Event Fotografie',
      'Wasser & Surf',
      'Immobilien (immobilien-fotograf.wien)',
      'Abenteuer Dokumentation',
    ],
    highlight: 'Faces of Ice',
    highlightDe: 'Faces of Ice',
    accentColor: 'from-adventurer-highlight to-adventurer-accent',
  },
  {
    id: 'speaking',
    icon: Mic,
    secondaryIcon: Users,
    title: 'Speaking & Facilitation',
    titleDe: 'Vorträge & Moderation',
    description: 'Inspiring talks bridging science, wellness, and adventure. From TED AI Vienna to corporate events, delivering transformative experiences.',
    descriptionDe: 'Inspirierende Vorträge die Wissenschaft, Wellness und Abenteuer verbinden. Von TED AI Vienna bis zu Firmenveranstaltungen, transformative Erfahrungen liefern.',
    features: [
      'Keynote Speeches',
      'Workshop Facilitation',
      'Panel Discussions',
      'University Lectures',
    ],
    featuresDe: [
      'Keynote Vorträge',
      'Workshop Moderation',
      'Podiumsdiskussionen',
      'Universitätsvorlesungen',
    ],
    highlight: 'TED AI Vienna Speaker',
    highlightDe: 'TED AI Vienna Speaker',
    accentColor: 'from-adventurer-accent via-adventurer-highlight to-adventurer-accent',
  },
]

// Individual service card with 3D tilt effect
function ServiceCard({
  service,
  index,
  isExpanded,
  onToggle,
  language,
}: {
  service: Service
  index: number
  isExpanded: boolean
  onToggle: () => void
  language: 'en' | 'de'
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = service.icon
  const SecondaryIcon = service.secondaryIcon

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isExpanded) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    rotateX.set(-y * 8)
    rotateY.set(x * 8)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
      style={{
        rotateX: isExpanded ? 0 : rotateX,
        rotateY: isExpanded ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        layout
        className={`relative overflow-hidden rounded-lg bg-adventurer-secondary border transition-all duration-500 ${
          isExpanded
            ? 'border-adventurer-accent/50'
            : 'border-white/5 hover:border-adventurer-accent/30'
        }`}
      >
        {/* Background gradient glow */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
            isExpanded ? 'opacity-10' : 'group-hover:opacity-5'
          }`}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.id === 'breathwork' ? '#FF6B35' : service.id === 'photography' ? '#00D4AA' : '#FF6B35'}, transparent 70%)`,
          }}
        />

        {/* Main content */}
        <div className="relative p-6 md:p-8 cursor-pointer" onClick={onToggle}>
          <div className="flex items-start justify-between mb-6">
            {/* Icon container */}
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-xl bg-adventurer-primary border border-adventurer-accent/20 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Icon className="w-7 h-7 text-adventurer-accent" />
              </motion.div>
              {/* Secondary icon floating */}
              <motion.div
                className="absolute -right-2 -bottom-2 w-8 h-8 rounded-lg bg-adventurer-accent/20 border border-adventurer-accent/30 flex items-center justify-center"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <SecondaryIcon className="w-4 h-4 text-adventurer-accent" />
              </motion.div>
            </div>

            {/* Number */}
            <span className="text-6xl font-display font-black text-adventurer-text/5">
              0{index + 1}
            </span>
          </div>

          {/* Title & Highlight */}
          <div className="mb-4">
            <h3 className="text-2xl font-display font-bold text-adventurer-text mb-2">
              {language === 'de' ? service.titleDe : service.title}
            </h3>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${service.accentColor} text-adventurer-primary`}
            >
              <Compass className="w-3 h-3" />
              {language === 'de' ? service.highlightDe : service.highlight}
            </div>
          </div>

          {/* Description */}
          <p className="text-adventurer-text/50 leading-relaxed mb-6">
            {language === 'de' ? service.descriptionDe : service.description}
          </p>

          {/* Expand/collapse indicator */}
          <motion.div
            className="flex items-center gap-2 text-adventurer-accent text-sm font-medium"
            animate={{ x: isExpanded ? 0 : [0, 3, 0] }}
            transition={{ repeat: isExpanded ? 0 : Infinity, duration: 1.5 }}
          >
            <span>{isExpanded ? (language === 'de' ? 'Weniger' : 'Less') : (language === 'de' ? 'Details' : 'Details')}</span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>

        {/* Expanded features */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 pt-2">
                <div className="h-px bg-gradient-to-r from-transparent via-adventurer-accent/30 to-transparent mb-6" />

                <h4 className="text-xs uppercase tracking-wider text-adventurer-text/40 mb-4">
                  {language === 'de' ? 'Leistungen' : 'Services Offered'}
                </h4>

                <div className="grid sm:grid-cols-2 gap-3">
                  {(language === 'de' ? service.featuresDe : service.features).map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-adventurer-primary/50 border border-white/5"
                    >
                      <div className="w-2 h-2 rounded-full bg-adventurer-accent" />
                      <span className="text-adventurer-text/80 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 flex items-center gap-2 bg-adventurer-accent text-adventurer-primary px-6 py-3 font-bold uppercase tracking-wider text-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <span>{language === 'de' ? 'Anfragen' : 'Inquire'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom accent bar */}
        <motion.div
          className={`h-1 bg-gradient-to-r ${service.accentColor}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    </motion.div>
  )
}

// Adventure stat counter
function AdventureStat({
  value,
  label,
  delay,
}: {
  value: string
  label: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center"
    >
      <motion.span
        className="block text-4xl md:text-5xl font-display font-black text-adventurer-accent"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
      >
        {value}
      </motion.span>
      <span className="text-adventurer-text/40 text-xs uppercase tracking-wider mt-2 block">
        {label}
      </span>
    </motion.div>
  )
}

export function Services() {
  const language = useLanguage()
  const t = translations[language]
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const stats = [
    { value: '500+', label: language === 'de' ? 'Workshop Teilnehmer' : 'Workshop Participants' },
    { value: '50+', label: language === 'de' ? 'Veranstaltungen' : 'Events' },
    { value: '8+', label: language === 'de' ? 'Jahre Erfahrung' : 'Years Experience' },
    { value: '3', label: language === 'de' ? 'Kontinente bereist' : 'Continents Explored' },
  ]

  return (
    <section id="services" className="py-20 md:py-32 bg-adventurer-secondary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Topographic pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.02]">
          <svg viewBox="0 0 200 200" className="w-full h-full text-adventurer-accent">
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx="100"
                cy="100"
                r={20 + i * 20}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>

        {/* Floating compass */}
        <motion.div
          className="absolute bottom-20 left-10 text-adventurer-accent/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          <Compass className="w-40 h-40" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-adventurer-accent to-transparent mb-6"
          />
          <span className="text-adventurer-accent uppercase tracking-[0.3em] text-sm font-medium">
            {language === 'de' ? 'Was ich anbiete' : 'What I Offer'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-adventurer-text mt-4">
            {t.services.heading}
          </h2>
          <p className="text-adventurer-text/40 mt-4 max-w-xl mx-auto">
            {language === 'de'
              ? 'Wissenschaft trifft Abenteuer - Erfahrungen die transformieren'
              : 'Where science meets adventure - experiences that transform'}
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-16 border-b border-white/5"
        >
          {stats.map((stat, index) => (
            <AdventureStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isExpanded={expandedId === service.id}
              onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
              language={language}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-white/5"
        >
          <p className="text-adventurer-text/40 mb-6">
            {language === 'de'
              ? 'Bereit für dein nächstes Abenteuer?'
              : 'Ready for your next adventure?'}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-adventurer-accent text-adventurer-primary px-8 py-4 font-bold uppercase tracking-wider text-sm"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span>{language === 'de' ? 'Lass uns sprechen' : "Let's Talk"}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
