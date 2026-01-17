'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Building2, Camera, Wind, Megaphone, Recycle, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/shared/LanguageSwitcher'

interface CareerMilestone {
  id: string
  year: string
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
  type: 'education' | 'work' | 'creative' | 'current'
}

function TimelineItem({
  item,
  index,
  isLast
}: {
  item: CareerMilestone
  index: number
  isLast: boolean
}) {
  const Icon = item.icon

  const typeStyles = {
    education: {
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      dot: 'bg-blue-500',
    },
    work: {
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-400',
      dot: 'bg-green-500',
    },
    creative: {
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      dot: 'bg-purple-500',
    },
    current: {
      iconBg: 'bg-[#d4af37]/20',
      iconColor: 'text-[#d4af37]',
      dot: 'bg-[#d4af37]',
    },
  }

  const styles = typeStyles[item.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'relative flex gap-6 md:gap-8',
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
        'flex-row'
      )}
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <motion.div
          className={cn('w-4 h-4 rounded-full border-2 border-[#1a1a2e]', styles.dot)}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-[#d4af37]/30 to-[#d4af37]/5" />
        )}
      </div>

      {/* Content card */}
      <motion.div
        className={cn(
          'flex-1 pb-12 last:pb-0',
          'md:max-w-[calc(50%-2rem)]'
        )}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white/5 backdrop-blur-sm border border-[#d4af37]/10 rounded-xl p-6 hover:border-[#d4af37]/30 transition-colors duration-300">
          <div className="flex items-start gap-4">
            <motion.div
              className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', styles.iconBg)}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className={cn('w-5 h-5', styles.iconColor)} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <span className="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">
                {item.year}
              </span>
              <h3 className="text-white text-lg font-semibold mt-1 mb-1">
                {item.title}
              </h3>
              <p className="text-white/50 text-sm mb-2">
                {item.subtitle}
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          {item.type === 'current' && (
            <motion.div
              className="mt-4 flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs font-medium uppercase tracking-wider">
                Current Position
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Career() {
  const language = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const milestones: CareerMilestone[] = [
    {
      id: 'bsc',
      year: '2008 - 2012',
      title: language === 'de' ? 'B.Sc. Chemie & Biotechnologie' : 'B.Sc. Chemistry & Biotechnology',
      subtitle: 'TU Graz',
      description: language === 'de'
        ? 'Grundlagen in Chemie und Biotechnologie, wissenschaftliche Methodenlehre.'
        : 'Foundation in chemistry and biotechnology, scientific methodology.',
      icon: GraduationCap,
      type: 'education',
    },
    {
      id: 'msc',
      year: '2012 - 2015',
      title: language === 'de' ? 'M.Sc. Biotechnologie' : 'M.Sc. Biotechnology',
      subtitle: language === 'de' ? 'TU Graz - Mit Auszeichnung' : 'TU Graz - With Distinction',
      description: language === 'de'
        ? 'Masterstudium mit Auszeichnung abgeschlossen. Spezialisierung in Biotechnologie-Forschung.'
        : 'Master\'s degree completed with distinction. Specialization in biotechnology research.',
      icon: GraduationCap,
      type: 'education',
    },
    {
      id: 'photography',
      year: language === 'de' ? 'Feb 2020 - Heute' : 'Feb 2020 - Present',
      title: 'Luke Goodlife Photography',
      subtitle: language === 'de' ? 'Graz & International' : 'Graz & International',
      description: language === 'de'
        ? 'Professionelle Fotografie: Event, Business, Wasser, Reise. KI-gestutzte Business-Fotografie.'
        : 'Professional photography: event, business, water, travel. AI-enhanced business photography.',
      icon: Camera,
      type: 'creative',
    },
    {
      id: 'breathwork',
      year: language === 'de' ? 'Juni 2021 - Heute' : 'June 2021 - Present',
      title: 'GOODLIFE BREATHING',
      subtitle: language === 'de' ? 'Grunder' : 'Founder',
      description: language === 'de'
        ? '"Entfalte dein volles Potenzial durch Breathwork." Wissenschaftlich fundierte Atemarbeit mit elektronischer Musik.'
        : '"Explore your full potential through Breathwork." Scientifically-grounded breathwork with electronic music.',
      icon: Wind,
      type: 'creative',
    },
    {
      id: 'geco',
      year: language === 'de' ? 'Jan 2023 - Dez 2024' : 'Jan 2023 - Dec 2024',
      title: language === 'de' ? 'Geco-Festival' : 'Geco-Festival',
      subtitle: 'Communications Manager',
      description: language === 'de'
        ? 'Kommunikationsmanagement fur das Nachhaltigkeits-Festival. "We make sustainability great again!"'
        : 'Communications management for the sustainability festival. "We make sustainability great again!"',
      icon: Megaphone,
      type: 'work',
    },
    {
      id: 'saubermacher',
      year: language === 'de' ? 'Nov 2023 - Sept 2025' : 'Nov 2023 - Sept 2025',
      title: 'Saubermacher Dienstleistungs AG',
      subtitle: 'Key Account Sales Manager',
      description: language === 'de'
        ? 'Key Account Sales im Waste-to-Energy Bereich. Nachhaltige Abfallwirtschaft und Kreislauflosungen.'
        : 'Key Account Sales in waste-to-energy sector. Sustainable waste management and circular solutions.',
      icon: Recycle,
      type: 'work',
    },
    {
      id: 'baufeld',
      year: language === 'de' ? 'Okt 2025 - Heute' : 'Oct 2025 - Present',
      title: 'Baufeld-Austria GmbH',
      subtitle: 'Sales Lead, Key Account',
      description: language === 'de'
        ? 'Sales Lead fur Material Flow Management in Europa. Hybrid-Arbeitsmodell.'
        : 'Sales Lead for Material Flow Management across Europe. Hybrid work model.',
      icon: TrendingUp,
      type: 'current',
    },
  ]

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-[#1a1a2e] relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-40 w-80 h-80 rounded-full bg-[#d4af37]/5 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-[#d4af37]/3 blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
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
            className="inline-block text-[#d4af37] uppercase tracking-[0.25em] text-sm font-medium mb-4"
          >
            {language === 'de' ? 'Karriere' : 'Career'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4"
          >
            {language === 'de' ? 'Die Reise' : 'The Journey'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            {language === 'de'
              ? 'Von der Wissenschaft zur Wirtschaft, von der Forschung zur Transformation.'
              : 'From science to business, from research to transformation.'}
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated progress line (mobile only) */}
          <motion.div
            className="absolute left-[7px] top-0 w-px bg-gradient-to-b from-[#d4af37] to-[#d4af37]/30 md:hidden"
            style={{ height: lineHeight }}
          />

          {/* Timeline items */}
          <div className="space-y-0">
            {milestones.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isLast={index === milestones.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {[
            { color: 'bg-blue-500', label: language === 'de' ? 'Ausbildung' : 'Education' },
            { color: 'bg-green-500', label: language === 'de' ? 'Beruf' : 'Work' },
            { color: 'bg-purple-500', label: language === 'de' ? 'Kreativ' : 'Creative' },
            { color: 'bg-[#d4af37]', label: language === 'de' ? 'Aktuell' : 'Current' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={cn('w-3 h-3 rounded-full', item.color)} />
              <span className="text-white/50 text-sm">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
