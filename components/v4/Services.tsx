'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Snowflake, Building2, Users, Sparkles, Heart, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

interface ServiceCardProps {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
  index: number
  accentColor: string
  isExpanded: boolean
  onToggle: () => void
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  index,
  accentColor,
  isExpanded,
  onToggle,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group"
    >
      <motion.div
        className={`
          relative p-8 rounded-3xl
          bg-white/80 backdrop-blur-sm
          border border-facilitator-primary/10
          transition-all duration-700
          ${isExpanded ? 'shadow-xl' : 'shadow-sm hover:shadow-lg'}
        `}
        whileHover={{ y: -4 }}
        layout
      >
        {/* Decorative gradient orb */}
        <motion.div
          className={`absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ${accentColor}`}
        />

        {/* Icon with breathing animation */}
        <motion.div
          className={`
            relative w-16 h-16 rounded-2xl mb-6
            flex items-center justify-center
            bg-gradient-to-br ${accentColor}
          `}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.5,
          }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-display font-medium text-facilitator-text mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-facilitator-text/60 leading-relaxed mb-6">
          {description}
        </p>

        {/* Features - collapsible */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <ul className="space-y-3 mb-6">
                {features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-facilitator-text/70"
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-facilitator-secondary"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={onToggle}
          className="flex items-center gap-2 text-facilitator-primary font-medium text-sm group/btn"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.3 }}
        >
          <span>{isExpanded ? (languageGlobal === 'de' ? 'Weniger' : 'Less') : (languageGlobal === 'de' ? 'Mehr erfahren' : 'Learn more')}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.button>

        {/* Bottom accent line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r ${accentColor} opacity-0 group-hover:opacity-100`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    </motion.div>
  )
}

// Need to use a different approach for language in the toggle button
let languageGlobal: 'en' | 'de' = 'en'

export function Services() {
  const language = useLanguage()
  languageGlobal = language // Update global for ServiceCard
  const t = translations[language]
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const services = [
    {
      icon: Wind,
      title: language === 'de' ? 'Goodlife Breathing' : 'Goodlife Breathing',
      description: language === 'de'
        ? 'Wissenschaftlich fundierte Atemtechniken kombiniert mit elektronischer Musik fur tiefe meditative Zustande und korperliche Transformation.'
        : 'Scientifically-grounded breathing techniques combined with electronic music for deep meditative states and physical transformation.',
      features: language === 'de'
        ? ['Individuelle Sessions', 'Gruppen-Workshops', 'Festival-Erlebnisse', 'Online-Kurse']
        : ['Individual Sessions', 'Group Workshops', 'Festival Experiences', 'Online Courses'],
      accentColor: 'from-facilitator-primary to-facilitator-secondary',
    },
    {
      icon: Snowflake,
      title: language === 'de' ? 'Eisbaden Graz' : 'Ice Bathing Graz',
      description: language === 'de'
        ? 'Wochentliche Community-Treffen an der Mur zur Starkung des Immunsystems, Stressresistenz und innerer Ruhe durch Kalteexposition.'
        : 'Weekly community gatherings at the Mur river to strengthen immune system, stress resistance, and inner calm through cold exposure.',
      features: language === 'de'
        ? ['Wochentliche Treffen', 'Atem-Vorbereitung', 'Sichere Begleitung', 'Gemeinschaftserlebnis']
        : ['Weekly Gatherings', 'Breath Preparation', 'Safe Guidance', 'Community Experience'],
      accentColor: 'from-[#4A9AB0] to-facilitator-secondary',
    },
    {
      icon: Building2,
      title: language === 'de' ? 'Corporate Wellness' : 'Corporate Wellness',
      description: language === 'de'
        ? 'Massgeschneiderte Workshops fur Unternehmen zur Forderung von Gesundheit, Produktivitat und Teamzusammenhalt.'
        : 'Tailored workshops for companies to promote health, productivity, and team cohesion.',
      features: language === 'de'
        ? ['Team-Building Events', 'Stress-Management', 'Fokus-Training', 'Leadership Retreats']
        : ['Team-Building Events', 'Stress Management', 'Focus Training', 'Leadership Retreats'],
      accentColor: 'from-facilitator-accent to-[#D4A574]',
    },
    {
      icon: Users,
      title: language === 'de' ? 'Gruppen-Retreats' : 'Group Retreats',
      description: language === 'de'
        ? 'Immersive Wochenend- und Wochen-Retreats die Atemarbeit, Kalteexposition und Naturerlebnisse verbinden.'
        : 'Immersive weekend and week-long retreats combining breathwork, cold exposure, and nature experiences.',
      features: language === 'de'
        ? ['Wochenend-Retreats', 'Wochen-Programme', 'Internationale Destinationen', 'Kleine Gruppen']
        : ['Weekend Retreats', 'Week Programs', 'International Destinations', 'Small Groups'],
      accentColor: 'from-facilitator-primary to-[#3D7A8A]',
    },
    {
      icon: Sparkles,
      title: language === 'de' ? 'Festival & Events' : 'Festival & Events',
      description: language === 'de'
        ? 'Unvergessliche Breathwork-Sessions auf Festivals und Events mit Live-Musik und kollektiver Energie.'
        : 'Unforgettable breathwork sessions at festivals and events with live music and collective energy.',
      features: language === 'de'
        ? ['Live-Musik Integration', 'Grossgruppen-Facilitation', 'Outdoor-Settings', 'Transformative Erlebnisse']
        : ['Live Music Integration', 'Large Group Facilitation', 'Outdoor Settings', 'Transformative Experiences'],
      accentColor: 'from-[#7B68A6] to-facilitator-secondary',
    },
    {
      icon: Heart,
      title: language === 'de' ? '1:1 Begleitung' : '1:1 Guidance',
      description: language === 'de'
        ? 'Personalisierte Sessions fur tiefe individuelle Transformation und massgeschneiderte Atempraxis.'
        : 'Personalized sessions for deep individual transformation and tailored breathing practice.',
      features: language === 'de'
        ? ['Personliche Anamnese', 'Individueller Plan', 'Fortschrittstracking', 'Flexible Termine']
        : ['Personal Assessment', 'Individual Plan', 'Progress Tracking', 'Flexible Scheduling'],
      accentColor: 'from-facilitator-accent to-facilitator-primary',
    },
  ]

  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-[#F0F7F7] to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-facilitator-secondary/10 blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-facilitator-primary/8 blur-3xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block text-facilitator-accent uppercase tracking-[0.25em] text-sm font-medium mb-4"
          >
            {language === 'de' ? 'Angebote' : 'Offerings'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-facilitator-text mb-4"
          >
            {t.services.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-facilitator-text/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {language === 'de'
              ? 'Transformative Erlebnisse, die Korper und Geist verbinden'
              : 'Transformative experiences connecting body and mind'}
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="inline-flex items-center gap-3 bg-facilitator-primary text-white px-8 py-4 rounded-full font-medium"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span>
              {language === 'de' ? 'Lass uns uber deine Reise sprechen' : "Let's discuss your journey"}
            </span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
