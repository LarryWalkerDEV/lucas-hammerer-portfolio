'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, GraduationCap, Heart } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'

interface TimelineItem {
  period: string
  title: { en: string; de: string }
  subtitle: { en: string; de: string }
  description?: { en: string; de: string }
  current?: boolean
}

const careerTimeline: TimelineItem[] = [
  {
    period: '2025+',
    title: { en: 'Sales Lead', de: 'Sales Lead' },
    subtitle: { en: 'Baufeld-Austria GmbH', de: 'Baufeld-Austria GmbH' },
    description: {
      en: 'Key Account for Material Flow Management, Europe - Hybrid',
      de: 'Key Account fur Material Flow Management, Europa - Hybrid',
    },
    current: true,
  },
  {
    period: '2023-2025',
    title: { en: 'Key Account Sales Manager', de: 'Key Account Sales Manager' },
    subtitle: { en: 'Saubermacher Dienstleistungs AG', de: 'Saubermacher Dienstleistungs AG' },
    description: {
      en: 'Waste-to-Energy industry, Building sustainable partnerships',
      de: 'Waste-to-Energy Branche, Aufbau nachhaltiger Partnerschaften',
    },
  },
  {
    period: '2021+',
    title: { en: 'Founder', de: 'Grunder' },
    subtitle: { en: 'GOODLIFE BREATHING', de: 'GOODLIFE BREATHING' },
    description: {
      en: 'Breathwork facilitation combining science & electronic music',
      de: 'Breathwork mit Wissenschaft & elektronischer Musik',
    },
  },
  {
    period: '2020+',
    title: { en: 'Photographer', de: 'Fotograf' },
    subtitle: { en: 'Luke Goodlife Photography', de: 'Luke Goodlife Fotografie' },
    description: {
      en: 'Event, business, water & travel photography',
      de: 'Event-, Business-, Wasser- & Reisefotografie',
    },
  },
]

const educationTimeline: TimelineItem[] = [
  {
    period: '2012-2015',
    title: { en: 'M.Sc. Biotechnology', de: 'M.Sc. Biotechnologie' },
    subtitle: { en: 'TU Graz', de: 'TU Graz' },
    description: {
      en: 'Passed with distinction',
      de: 'Mit Auszeichnung bestanden',
    },
  },
  {
    period: '2008-2012',
    title: { en: 'B.Sc. Chemistry & Biotechnology', de: 'B.Sc. Chemie & Biotechnologie' },
    subtitle: { en: 'TU Graz', de: 'TU Graz' },
  },
]

function TimelineSection({
  items,
  language,
  icon: Icon
}: {
  items: TimelineItem[]
  language: 'en' | 'de'
  icon: React.ElementType
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <motion.div
          key={`${item.period}-${index}`}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative group"
        >
          <div className={`p-4 border-l-2 transition-all duration-300 ${
            item.current
              ? 'border-minimalist-primary bg-minimalist-surface'
              : hoveredIndex === index
                ? 'border-minimalist-secondary bg-minimalist-surface/50'
                : 'border-minimalist-border'
          }`}>
            <div className="flex items-start gap-4">
              {/* Period */}
              <span className="text-xs text-minimalist-muted font-mono w-20 flex-shrink-0 pt-0.5">
                {item.period}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-minimalist-primary font-medium">
                    {item.title[language]}
                  </h4>
                  {item.current && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-minimalist-primary text-minimalist-background">
                      {language === 'de' ? 'Aktuell' : 'Current'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-minimalist-secondary">
                  {item.subtitle[language]}
                </p>

                <AnimatePresence>
                  {item.description && hoveredIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-minimalist-muted mt-2"
                    >
                      {item.description[language]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function About() {
  const language = useLanguage()

  return (
    <section id="about" className="py-24 md:py-32 bg-minimalist-surface">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-minimalist-muted text-xs tracking-[0.3em] uppercase block mb-4">
            {language === 'de' ? 'Uber mich' : 'About'}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-minimalist-primary max-w-2xl">
            {language === 'de'
              ? 'Wo Wissenschaft auf Kreativitat trifft'
              : 'Where Science Meets Creativity'
            }
          </h2>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Image & intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-[3/4] mb-8">
              <div className="absolute inset-0 border border-minimalist-border" />
              <div className="absolute inset-3">
                <Image
                  src="/images/lucas-hat.jpg"
                  alt="Lucas Hammerer"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 -right-4 bg-minimalist-primary text-minimalist-background px-4 py-2"
              >
                <span className="text-xs tracking-wider">Vienna, AT</span>
              </motion.div>
            </div>

            <p className="text-minimalist-secondary leading-relaxed">
              {language === 'de'
                ? 'Lucas Hammerer verbindet analytisches Denken mit kreativer Leidenschaft. Mit einem M.Sc. in Biotechnologie (mit Auszeichnung) von der TU Graz bringt er wissenschaftliche Prazision in alle Bereiche seiner Arbeit.'
                : 'Lucas Hammerer bridges analytical thinking with creative passion. With an M.Sc. in Biotechnology (with distinction) from TU Graz, he brings scientific precision to all areas of his work.'
              }
            </p>
          </motion.div>

          {/* Right: Timelines */}
          <div className="lg:col-span-3 space-y-12">
            {/* Career */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 border border-minimalist-border flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-minimalist-primary" />
                </div>
                <h3 className="text-lg font-medium text-minimalist-primary">
                  {language === 'de' ? 'Karriere' : 'Career'}
                </h3>
              </div>
              <TimelineSection items={careerTimeline} language={language} icon={Briefcase} />
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 border border-minimalist-border flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-minimalist-primary" />
                </div>
                <h3 className="text-lg font-medium text-minimalist-primary">
                  {language === 'de' ? 'Ausbildung' : 'Education'}
                </h3>
              </div>
              <TimelineSection items={educationTimeline} language={language} icon={GraduationCap} />
            </motion.div>

            {/* Passions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 border border-minimalist-border flex items-center justify-center">
                  <Heart className="w-4 h-4 text-minimalist-primary" />
                </div>
                <h3 className="text-lg font-medium text-minimalist-primary">
                  {language === 'de' ? 'Leidenschaften' : 'Passions'}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  language === 'de' ? 'Breathwork' : 'Breathwork',
                  language === 'de' ? 'Surfen' : 'Surfing',
                  language === 'de' ? 'Eisbaden' : 'Ice Bathing',
                  language === 'de' ? 'Fotografie' : 'Photography',
                  language === 'de' ? 'Nachhaltigkeit' : 'Sustainability',
                  language === 'de' ? 'Elektronische Musik' : 'Electronic Music',
                ].map((passion) => (
                  <span
                    key={passion}
                    className="px-3 py-1.5 text-sm border border-minimalist-border text-minimalist-secondary hover:bg-minimalist-background transition-colors"
                  >
                    {passion}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
