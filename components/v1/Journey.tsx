'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { ModernTimeline, type TimelineItem } from '@/components/ui/modern-timeline'
import { Compass, Sparkles } from 'lucide-react'

export function Journey() {
  const language = useLanguage()
  const t = translations[language]

  // Transform the existing milestones to ModernTimeline format
  const timelineItems: TimelineItem[] = t.journey.milestones.map((milestone, index) => ({
    title: milestone.title,
    description: milestone.description,
    date: milestone.year,
    status: index === 0 ? 'completed' as const :
            index === t.journey.milestones.length - 1 ? 'current' as const :
            'completed' as const,
    category: language === 'de' ? 'Meilenstein' : 'Milestone',
    image: index === 0 ? '/images/lucas-ted.jpg' :
           index === 1 ? '/images/workshop.webp' :
           index === 2 ? '/images/lucas-surfer.jpg' :
           '/images/lucas-hat.jpg',
  }))

  return (
    <section className="py-20 md:py-32 bg-explorer-secondary/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <Compass className="w-40 h-40 text-explorer-primary" />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-explorer-primary/20 to-transparent" />
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
            {language === 'de' ? 'Die Reise' : 'The Journey'}
            <span className="w-8 h-px bg-explorer-primary/50" />
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-explorer-text mt-4">
            {t.journey.heading}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-explorer-text/60 max-w-xl mx-auto"
          >
            {language === 'de'
              ? 'Von der Wissenschaft zur Transformation — wichtige Meilensteine meines Weges.'
              : 'From science to transformation — key milestones on my path.'}
          </motion.p>
        </motion.div>

        {/* Journey stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 md:gap-16 mb-12"
        >
          {[
            { value: '7+', label: language === 'de' ? 'Jahre Erfahrung' : 'Years Experience' },
            { value: '15+', label: language === 'de' ? 'Länder besucht' : 'Countries Visited' },
            { value: '1000+', label: language === 'de' ? 'Leben berührt' : 'Lives Touched' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                className="text-2xl md:text-3xl font-display font-bold text-explorer-primary flex items-center justify-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <div className="text-xs md:text-sm text-explorer-text/60 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <ModernTimeline items={timelineItems} variant="explorer" />

        {/* Future indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-explorer-primary/10 border border-explorer-primary/20"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-explorer-accent"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-explorer-text/70">
              {language === 'de'
                ? 'Die Reise geht weiter...'
                : 'The journey continues...'}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
