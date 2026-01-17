'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import {
  Building2,
  Wind,
  Camera,
  Megaphone,
  GraduationCap,
  Briefcase,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface CareerItem {
  id: string
  period: string
  title: string
  titleDe: string
  company: string
  description: string
  descriptionDe: string
  icon: React.ElementType
  type: 'current' | 'ongoing' | 'previous' | 'education'
  image?: string
  link?: string
}

const careerData: CareerItem[] = [
  {
    id: 'baufeld',
    period: 'Oct 2025 - Present',
    title: 'Sales Lead, Key Account, Material Flow Management',
    titleDe: 'Sales Lead, Key Account, Material Flow Management',
    company: 'Baufeld-Austria GmbH',
    description: 'Leading key account management and material flow solutions in the logistics and sustainability sector.',
    descriptionDe: 'Leitung von Key Account Management und Material Flow Solutions im Logistik- und Nachhaltigkeitssektor.',
    icon: Building2,
    type: 'current',
    image: '/images/lucas-portrait.jpg',
  },
  {
    id: 'breathing',
    period: 'June 2021 - Present',
    title: 'Breathwork Facilitator',
    titleDe: 'Breathwork Facilitator',
    company: 'GOODLIFE BREATHING',
    description: 'Leading scientifically-grounded breathwork sessions combined with electronic music for transformative experiences.',
    descriptionDe: 'Leitung wissenschaftlich fundierter Breathwork-Sessions kombiniert mit elektronischer Musik.',
    icon: Wind,
    type: 'ongoing',
    image: '/images/workshop.webp',
    link: 'https://goodlife-breathing.com',
  },
  {
    id: 'photography',
    period: 'Feb 2020 - Present',
    title: 'Photography & AI for Business',
    titleDe: 'Fotografie & AI fur Business',
    company: 'Luke Goodlife',
    description: 'Professional photography specialized in event, business, water, and travel photography. AI-enhanced workflows.',
    descriptionDe: 'Professionelle Fotografie spezialisiert auf Event-, Business-, Wasser- und Reisefotografie. KI-gestutzte Workflows.',
    icon: Camera,
    type: 'ongoing',
    image: '/images/lucas-surfer.jpg',
  },
  {
    id: 'saubermacher',
    period: 'Nov 2023 - Sept 2025',
    title: 'Key Account Sales Manager',
    titleDe: 'Key Account Sales Manager',
    company: 'Saubermacher Dienstleistungs AG',
    description: 'Key account management in the Waste-to-Energy industry, driving sustainable waste management solutions.',
    descriptionDe: 'Key Account Management in der Waste-to-Energy Branche, Entwicklung nachhaltiger Abfallmanagement-Losungen.',
    icon: Briefcase,
    type: 'previous',
    image: '/images/lucas-hat.jpg',
  },
  {
    id: 'geco',
    period: 'Jan 2023 - Dec 2024',
    title: 'Communications Manager',
    titleDe: 'Communications Manager',
    company: 'Geco-Festival',
    description: 'Managing communications for the sustainability festival. "We make sustainability great again!"',
    descriptionDe: 'Kommunikationsmanagement fur das Nachhaltigkeits-Festival. "We make sustainability great again!"',
    icon: Megaphone,
    type: 'previous',
    image: '/images/lucas-about.webp',
  },
  {
    id: 'msc',
    period: '2012 - 2015',
    title: 'M.Sc. Biotechnology',
    titleDe: 'M.Sc. Biotechnologie',
    company: 'TU Graz',
    description: 'Master of Science in Biotechnology, passed with distinction. Specializing in molecular biology and enzyme research.',
    descriptionDe: 'Master of Science in Biotechnologie, bestanden mit Auszeichnung. Spezialisierung in Molekularbiologie und Enzymforschung.',
    icon: GraduationCap,
    type: 'education',
  },
  {
    id: 'bsc',
    period: '2008 - 2012',
    title: 'B.Sc. Chemistry & Biotechnology',
    titleDe: 'B.Sc. Chemie & Biotechnologie',
    company: 'TU Graz',
    description: 'Bachelor of Science in Chemistry and Biotechnology. Foundation in analytical chemistry and research methods.',
    descriptionDe: 'Bachelor of Science in Chemie und Biotechnologie. Grundlagen in analytischer Chemie und Forschungsmethoden.',
    icon: GraduationCap,
    type: 'education',
  },
]

const typeColors = {
  current: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', dot: 'bg-green-500' },
  ongoing: { bg: 'bg-scientist-secondary/20', text: 'text-scientist-secondary', border: 'border-scientist-secondary/30', dot: 'bg-scientist-secondary' },
  previous: { bg: 'bg-scientist-primary/10', text: 'text-scientist-text/70', border: 'border-scientist-primary/20', dot: 'bg-scientist-primary/50' },
  education: { bg: 'bg-scientist-accent/10', text: 'text-scientist-accent', border: 'border-scientist-accent/30', dot: 'bg-scientist-accent' },
}

const typeLabels = {
  current: { en: 'Current Role', de: 'Aktuelle Position' },
  ongoing: { en: 'Ongoing', de: 'Laufend' },
  previous: { en: 'Previous', de: 'Frueher' },
  education: { en: 'Education', de: 'Ausbildung' },
}

export function CareerTimeline() {
  const language = useLanguage()
  const [expandedId, setExpandedId] = useState<string | null>('baufeld')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="career" className="py-20 md:py-32 bg-gradient-to-b from-scientist-primary/5 to-scientist-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-scientist-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-scientist-primary/5 rounded-full blur-3xl" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 text-scientist-secondary uppercase tracking-[0.2em] text-sm font-medium"
          >
            <span className="w-8 h-px bg-scientist-secondary/50" />
            {language === 'de' ? 'Karriere' : 'Career'}
            <span className="w-8 h-px bg-scientist-secondary/50" />
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-scientist-text mt-4">
            {language === 'de' ? 'Professioneller Werdegang' : 'Professional Journey'}
          </h2>
          <p className="mt-4 text-scientist-text/60 max-w-xl mx-auto">
            {language === 'de'
              ? 'Von der Biotechnologie-Forschung zu Sales Leadership - Eine Reise der Transformation.'
              : 'From biotechnology research to sales leadership - A journey of transformation.'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-scientist-primary/10 md:-translate-x-px">
            <motion.div
              className="w-full bg-gradient-to-b from-scientist-secondary via-scientist-secondary/50 to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Career items */}
          <div className="space-y-8 md:space-y-12">
            {careerData.map((item, index) => {
              const isExpanded = expandedId === item.id
              const isHovered = hoveredId === item.id
              const isEven = index % 2 === 0
              const colors = typeColors[item.type]
              const Icon = item.icon

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'relative flex flex-col md:flex-row gap-8',
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  )}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-scientist-background z-10 transition-all duration-300"
                    style={{ top: '2rem' }}
                  >
                    <motion.div
                      className={cn('w-full h-full rounded-full', colors.dot)}
                      animate={{
                        scale: isExpanded || isHovered ? 1.5 : 1,
                        boxShadow: isExpanded || isHovered ? `0 0 20px ${item.type === 'current' ? 'rgba(34, 197, 94, 0.5)' : 'rgba(74, 144, 164, 0.5)'}` : 'none'
                      }}
                    />
                  </div>

                  {/* Content card */}
                  <motion.div
                    className={cn(
                      'flex-1 ml-16 md:ml-0',
                      isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'
                    )}
                  >
                    <motion.div
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className={cn(
                        'p-6 rounded-2xl border cursor-pointer transition-all duration-300',
                        colors.border,
                        isExpanded ? colors.bg : 'bg-scientist-background/50 hover:bg-scientist-background',
                        'backdrop-blur-sm'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Type badge */}
                      <div className={cn(
                        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3',
                        colors.bg, colors.text
                      )}>
                        <div className={cn('w-1.5 h-1.5 rounded-full', colors.dot, item.type === 'current' && 'animate-pulse')} />
                        {typeLabels[item.type][language]}
                      </div>

                      {/* Header */}
                      <div className={cn('flex items-start gap-4', isEven && 'md:flex-row-reverse')}>
                        <div className={cn('flex-1', isEven && 'md:text-right')}>
                          <p className="text-xs text-scientist-text/50 font-mono mb-1">{item.period}</p>
                          <h3 className="text-lg md:text-xl font-semibold text-scientist-text">
                            {language === 'de' ? item.titleDe : item.title}
                          </h3>
                          <p className="text-scientist-secondary font-medium">{item.company}</p>
                        </div>
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                          isExpanded ? colors.bg : 'bg-scientist-primary/10'
                        )}>
                          <Icon className={cn('w-6 h-6', colors.text)} />
                        </div>
                      </div>

                      {/* Expand indicator */}
                      <div className={cn(
                        'flex items-center gap-1 mt-4 text-xs',
                        colors.text,
                        isEven && 'md:justify-end'
                      )}>
                        <span>{isExpanded ? (language === 'de' ? 'Weniger' : 'Less') : (language === 'de' ? 'Mehr' : 'More')}</span>
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </div>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className={cn('pt-4 border-t mt-4', colors.border)}>
                              <p className={cn('text-scientist-text/70 text-sm leading-relaxed', isEven && 'md:text-right')}>
                                {language === 'de' ? item.descriptionDe : item.description}
                              </p>

                              {item.image && (
                                <div className="mt-4 relative aspect-video rounded-lg overflow-hidden">
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                              )}

                              {item.link && (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={cn(
                                    'inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                    colors.bg, colors.text, 'hover:opacity-80'
                                  )}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {language === 'de' ? 'Website besuchen' : 'Visit Website'}
                                  <ArrowUpRight className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
