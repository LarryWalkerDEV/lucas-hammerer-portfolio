'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { ModernTimeline, type TimelineItem } from '@/components/ui/modern-timeline'

// Custom journey milestones for the Facilitator theme - Lucas's actual career journey
const journeyMilestonesEn: TimelineItem[] = [
  {
    title: 'B.Sc. Chemistry & Biotechnology',
    description: 'Bachelor studies at TU Graz, building a strong foundation in chemistry and biotechnology that would later inform his scientific approach to breathwork.',
    date: '2008-2012',
    image: '/images/lucas-ted.jpg',
    status: 'completed',
    category: 'Education',
  },
  {
    title: 'M.Sc. Biotechnology (with distinction)',
    description: 'Completed Master\'s degree at TU Graz with distinction, developing deep expertise in biotechnology and scientific methodology.',
    date: '2012-2015',
    image: '/images/lucas-hat.jpg',
    status: 'completed',
    category: 'Education',
  },
  {
    title: 'Luke Goodlife Photography',
    description: 'Started professional photography business, specializing in event, business, water, and travel photography. Capturing authentic moments through a unique creative lens.',
    date: 'Feb 2020',
    image: '/images/lucas-surfer.jpg',
    status: 'completed',
    category: 'Creative',
  },
  {
    title: 'GOODLIFE BREATHING Founded',
    description: 'Launched breathwork facilitation practice with the mission: "Explore your full potential through Breathwork!" Combining scientific background with ancient breathing techniques and electronic music.',
    date: 'June 2021',
    image: '/images/workshop.webp',
    status: 'completed',
    category: 'Wellness',
  },
  {
    title: 'Geco-Festival Communications',
    description: 'Served as Communications Manager for the sustainability-focused Geco-Festival. "We make sustainability great again!"',
    date: '2023-2024',
    image: '/images/lucas-portrait.jpg',
    status: 'completed',
    category: 'Leadership',
  },
  {
    title: 'Saubermacher Key Account',
    description: 'Key Account Sales Manager at Saubermacher Dienstleistungs AG, working in the Waste-to-Energy industry and sustainable waste management.',
    date: 'Nov 2023 - Sept 2025',
    status: 'completed',
    category: 'Business',
  },
  {
    title: 'Baufeld-Austria Sales Lead',
    description: 'Current role as Sales Lead, Key Account for Material Flow Management at Baufeld-Austria GmbH, continuing the focus on sustainability and business excellence.',
    date: 'Oct 2025 - Present',
    status: 'current',
    category: 'Business',
  },
]

const journeyMilestonesDe: TimelineItem[] = [
  {
    title: 'B.Sc. Chemie & Biotechnologie',
    description: 'Bachelor-Studium an der TU Graz, Aufbau einer soliden Grundlage in Chemie und Biotechnologie, die später seinen wissenschaftlichen Ansatz zur Atemarbeit prägen sollte.',
    date: '2008-2012',
    image: '/images/lucas-ted.jpg',
    status: 'completed',
    category: 'Ausbildung',
  },
  {
    title: 'M.Sc. Biotechnologie (mit Auszeichnung)',
    description: 'Abschluss des Masterstudiums an der TU Graz mit Auszeichnung, Entwicklung tiefgreifender Expertise in Biotechnologie und wissenschaftlicher Methodik.',
    date: '2012-2015',
    image: '/images/lucas-hat.jpg',
    status: 'completed',
    category: 'Ausbildung',
  },
  {
    title: 'Luke Goodlife Fotografie',
    description: 'Start des professionellen Fotografiegeschäfts, spezialisiert auf Event-, Business-, Wasser- und Reisefotografie. Authentische Momente durch eine einzigartige kreative Linse einfangen.',
    date: 'Feb 2020',
    image: '/images/lucas-surfer.jpg',
    status: 'completed',
    category: 'Kreativ',
  },
  {
    title: 'GOODLIFE BREATHING Gründung',
    description: 'Start der Breathwork-Facilitator-Praxis mit der Mission: "Entfalte dein volles Potenzial durch Breathwork!" Kombination von wissenschaftlichem Hintergrund mit alten Atemtechniken und elektronischer Musik.',
    date: 'Juni 2021',
    image: '/images/workshop.webp',
    status: 'completed',
    category: 'Wellness',
  },
  {
    title: 'Geco-Festival Kommunikation',
    description: 'Communications Manager für das nachhaltigkeitsorientierte Geco-Festival. "We make sustainability great again!"',
    date: '2023-2024',
    image: '/images/lucas-portrait.jpg',
    status: 'completed',
    category: 'Führung',
  },
  {
    title: 'Saubermacher Key Account',
    description: 'Key Account Sales Manager bei Saubermacher Dienstleistungs AG, tätig in der Waste-to-Energy Branche und nachhaltigem Abfallmanagement.',
    date: 'Nov 2023 - Sept 2025',
    status: 'completed',
    category: 'Business',
  },
  {
    title: 'Baufeld-Austria Sales Lead',
    description: 'Aktuelle Position als Sales Lead, Key Account für Material Flow Management bei Baufeld-Austria GmbH, mit Fokus auf Nachhaltigkeit und Business Excellence.',
    date: 'Okt 2025 - Heute',
    status: 'current',
    category: 'Business',
  },
]

export function Journey() {
  const language = useLanguage()
  const t = translations[language]
  const milestones = language === 'de' ? journeyMilestonesDe : journeyMilestonesEn

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-[#F8FCFC] to-[#F0F7F7]">
      {/* Decorative organic shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-facilitator-secondary/10 blur-3xl"
          animate={{
            x: [0, 15, 0],
            y: [0, 10, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-facilitator-primary/8 blur-3xl"
          animate={{
            x: [0, -10, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block text-facilitator-accent uppercase tracking-[0.25em] text-sm font-medium mb-4"
          >
            {language === 'de' ? 'Der Weg' : 'The Path'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-facilitator-text"
          >
            {t.journey.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4 text-lg text-facilitator-text/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {language === 'de'
              ? 'Eine Reise von der Wissenschaft zur Weisheit, von der Forschung zur Transformation.'
              : 'A journey from science to wisdom, from research to transformation.'}
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <ModernTimeline items={milestones} variant="facilitator" />
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-transparent to-facilitator-secondary/50"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-facilitator-primary/40"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="w-16 h-px bg-gradient-to-l from-transparent to-facilitator-secondary/50"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
