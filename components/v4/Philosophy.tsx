'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

export function Philosophy() {
  const language = useLanguage()
  const t = translations[language]

  const words = t.about.intro.split(' ')

  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-[#E8F4F4] to-[#F0F7F7] relative overflow-hidden">
      {/* Wave separator top */}
      <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden">
        <svg
          className="absolute top-0 w-full h-full"
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0V60C360 20 720 80 1080 60C1260 50 1350 40 1440 40V0H0Z"
            fill="#F0F7F7"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-facilitator-accent uppercase tracking-[0.2em] text-sm font-medium">
            {language === 'de' ? 'Philosophie' : 'Philosophy'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-facilitator-text mt-4">
            {t.about.heading}
          </h2>
        </motion.div>

        {/* Flowing text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl text-facilitator-text/80 leading-relaxed">
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-8 mt-16"
        >
          {[
            { value: '500+', label: language === 'de' ? 'Teilnehmer' : 'Participants' },
            { value: '50+', label: language === 'de' ? 'Workshops' : 'Workshops' },
            { value: '5+', label: language === 'de' ? 'Jahre Erfahrung' : 'Years Experience' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                className="text-3xl md:text-4xl font-display font-bold text-facilitator-primary"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-facilitator-text/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Wave separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V20C360 60 720 0 1080 20C1260 30 1350 40 1440 40V80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
