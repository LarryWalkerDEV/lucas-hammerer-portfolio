'use client'

import { motion } from 'framer-motion'
import { Beaker, Wind, Camera } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { CardStack } from '@/components/ui/card-stack'

export function ThreePillars() {
  const language = useLanguage()
  const t = translations[language]

  const pillars = [
    {
      id: 'scientist',
      title: t.about.scientist.title,
      description: t.about.scientist.description,
      icon: <Beaker className="w-10 h-10" />,
    },
    {
      id: 'facilitator',
      title: t.about.facilitator.title,
      description: t.about.facilitator.description,
      icon: <Wind className="w-10 h-10" />,
    },
    {
      id: 'photographer',
      title: t.about.photographer.title,
      description: t.about.photographer.description,
      icon: <Camera className="w-10 h-10" />,
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-explorer-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-explorer-primary uppercase tracking-[0.2em] text-sm font-medium">
            {language === 'de' ? 'Drei Identitäten' : 'Three Identities'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-explorer-text mt-4">
            {language === 'de' ? 'Wissenschaft • Wellness • Kunst' : 'Science • Wellness • Art'}
          </h2>
        </motion.div>

        <CardStack cards={pillars} variant="explorer" />
      </div>
    </section>
  )
}
