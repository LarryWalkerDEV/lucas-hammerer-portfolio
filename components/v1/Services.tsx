'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { UniqueAccordion, type AccordionItem } from '@/components/ui/unique-accordion'
import { Wind, Camera, Mic, Home } from 'lucide-react'

export function Services() {
  const language = useLanguage()
  const t = translations[language]

  const services: AccordionItem[] = [
    {
      id: 'breathwork',
      number: '01',
      title: t.services.breathwork.title,
      content: t.services.breathwork.description + (language === 'de'
        ? ' Basierend auf meiner wissenschaftlichen Ausbildung (M.Sc. Biotechnologie, TU Graz) verbinde ich evidenzbasierte Techniken mit elektronischer Musik für transformative Erlebnisse.'
        : ' Based on my scientific background (M.Sc. Biotechnology, TU Graz), I combine evidence-based techniques with electronic music for transformative experiences.'),
    },
    {
      id: 'photography',
      number: '02',
      title: t.services.photography.title,
      content: t.services.photography.description + (language === 'de'
        ? ' Neu: Professionelle Immobilienfotografie und 360° Touren über immobilien-fotograf.wien.'
        : ' New: Professional real estate photography and 360° tours via immobilien-fotograf.wien.'),
    },
    {
      id: 'speaking',
      number: '03',
      title: t.services.speaking.title,
      content: t.services.speaking.description + (language === 'de'
        ? ' Featured bei TED AI Vienna mit "The Art of Being Present: A Transformative Breathwork Session".'
        : ' Featured at TED AI Vienna with "The Art of Being Present: A Transformative Breathwork Session".'),
    },
    {
      id: 'realestate',
      number: '04',
      title: language === 'de' ? 'Immobilienfotografie' : 'Real Estate Photography',
      content: language === 'de'
        ? '360° Virtuelle Touren, Drohnenfotografie, Twilight-Aufnahmen und Virtual Staging. Verkaufen Sie Ihre Immobilie durchschnittlich 73% schneller mit professioneller Visualisierung.'
        : '360° Virtual Tours, drone photography, twilight shots, and virtual staging. Sell your property on average 73% faster with professional visualization.',
    },
  ]

  return (
    <section id="services" className="py-20 md:py-32 bg-explorer-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-explorer-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-explorer-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 text-explorer-primary uppercase tracking-[0.2em] text-sm font-medium"
          >
            <span className="w-8 h-px bg-explorer-primary/50" />
            {language === 'de' ? 'Was ich anbiete' : 'What I Offer'}
            <span className="w-8 h-px bg-explorer-primary/50" />
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-explorer-text mt-4">
            {t.services.heading}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-explorer-text/60 max-w-xl mx-auto"
          >
            {language === 'de'
              ? 'Wissenschaft trifft Kreativität — von Atemarbeit bis Fotografie.'
              : 'Science meets creativity — from breathwork to photography.'}
          </motion.p>
        </motion.div>

        {/* Service Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 md:gap-8 mb-12"
        >
          {[
            { icon: Wind, label: language === 'de' ? 'Atemarbeit' : 'Breathwork' },
            { icon: Camera, label: language === 'de' ? 'Fotografie' : 'Photography' },
            { icon: Mic, label: language === 'de' ? 'Vorträge' : 'Speaking' },
            { icon: Home, label: language === 'de' ? 'Immobilien' : 'Real Estate' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-2 group"
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-explorer-primary/10 border border-explorer-primary/20 flex items-center justify-center group-hover:bg-explorer-primary/20 group-hover:border-explorer-primary/40 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <item.icon className="w-6 h-6 text-explorer-primary" />
              </motion.div>
              <span className="text-xs text-explorer-text/60 group-hover:text-explorer-primary transition-colors hidden md:block">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <UniqueAccordion items={services} variant="explorer" defaultOpen="breathwork" />
        </motion.div>
      </div>
    </section>
  )
}
