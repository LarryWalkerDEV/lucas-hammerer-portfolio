'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { Timeline } from '@/components/ui/timeline'

export function Transformation() {
  const language = useLanguage()
  const t = translations[language]

  return (
    <section className="py-20 md:py-32 bg-[#F0F7F7] relative overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute top-20 -left-20 w-60 h-60 rounded-full bg-facilitator-secondary/20 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-facilitator-accent/10 blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-facilitator-accent uppercase tracking-[0.2em] text-sm font-medium">
            {language === 'de' ? 'Entwicklung' : 'Evolution'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-facilitator-text mt-4">
            {t.journey.heading}
          </h2>
        </motion.div>

        <Timeline items={t.journey.milestones} variant="facilitator" />
      </div>
    </section>
  )
}
