'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { MapPin, Flag, Compass, ArrowRight, GraduationCap, Briefcase, Camera, Wind, Building2 } from 'lucide-react'

interface Milestone {
  year: string
  title: string
  titleDe: string
  description: string
  descriptionDe: string
  image: string
  location: string
  locationDe: string
  type: 'education' | 'career' | 'photography' | 'breathwork' | 'current'
  icon: typeof GraduationCap
}

const milestones: Milestone[] = [
  {
    year: '2008-2012',
    title: 'B.Sc. Chemistry & Biotechnology',
    titleDe: 'B.Sc. Chemie & Biotechnologie',
    description: 'Bachelor studies at TU Graz, building the foundation in chemistry and biotechnology.',
    descriptionDe: 'Bachelor-Studium an der TU Graz, Aufbau der Grundlagen in Chemie und Biotechnologie.',
    image: '/images/lucas-ted.jpg',
    location: 'Graz, Austria',
    locationDe: 'Graz, Österreich',
    type: 'education',
    icon: GraduationCap,
  },
  {
    year: '2012-2015',
    title: 'M.Sc. Biotechnology (with distinction)',
    titleDe: 'M.Sc. Biotechnologie (mit Auszeichnung)',
    description: 'Master\'s degree at TU Graz, passed with distinction. Specializing in biotechnology research and analytical methods.',
    descriptionDe: 'Master-Abschluss an der TU Graz, bestanden mit Auszeichnung. Spezialisierung auf Biotechnologie-Forschung und analytische Methoden.',
    image: '/images/lucas-portrait.jpg',
    location: 'Graz, Austria',
    locationDe: 'Graz, Österreich',
    type: 'education',
    icon: GraduationCap,
  },
  {
    year: 'Feb 2020',
    title: 'Luke Goodlife Photography',
    titleDe: 'Luke Goodlife Fotografie',
    description: 'Started professional photography business as Luke Goodlife. Specialized in event, business, water, and travel photography with AI integration.',
    descriptionDe: 'Start des professionellen Fotografie-Geschäfts als Luke Goodlife. Spezialisiert auf Event-, Business-, Wasser- und Reisefotografie mit AI-Integration.',
    image: '/images/lucas-surfer.jpg',
    location: 'Worldwide',
    locationDe: 'Weltweit',
    type: 'photography',
    icon: Camera,
  },
  {
    year: 'June 2021',
    title: 'Goodlife Breathing Founded',
    titleDe: 'Gründung Goodlife Breathing',
    description: 'Founded Goodlife Breathing as a Breathwork Facilitator. Combining ancient breathing techniques with modern science and electronic music.',
    descriptionDe: 'Gründung von Goodlife Breathing als Breathwork Facilitator. Kombination alter Atemtechniken mit moderner Wissenschaft und elektronischer Musik.',
    image: '/images/workshop.webp',
    location: 'Vienna & Graz',
    locationDe: 'Wien & Graz',
    type: 'breathwork',
    icon: Wind,
  },
  {
    year: 'Jan 2023 - Dec 2024',
    title: 'Geco-Festival Communications',
    titleDe: 'Geco-Festival Kommunikation',
    description: 'Communications Manager for sustainability festival. Spreading the message: "We make sustainability great again!"',
    descriptionDe: 'Communications Manager für Nachhaltigkeits-Festival. Die Botschaft verbreiten: "We make sustainability great again!"',
    image: '/images/lucas-about.webp',
    location: 'Austria',
    locationDe: 'Österreich',
    type: 'career',
    icon: Briefcase,
  },
  {
    year: 'Nov 2023 - Sept 2025',
    title: 'Saubermacher Key Account',
    titleDe: 'Saubermacher Key Account',
    description: 'Key Account Sales Manager at Saubermacher Dienstleistungs AG in the Waste-to-Energy industry. Driving sustainable business solutions.',
    descriptionDe: 'Key Account Sales Manager bei Saubermacher Dienstleistungs AG in der Waste-to-Energy Branche. Nachhaltige Business-Lösungen vorantreiben.',
    image: '/images/lucas-hat.jpg',
    location: 'Austria',
    locationDe: 'Österreich',
    type: 'career',
    icon: Briefcase,
  },
  {
    year: 'Oct 2025 - Present',
    title: 'Baufeld-Austria Sales Lead',
    titleDe: 'Baufeld-Austria Sales Lead',
    description: 'Sales Lead, Key Account for Material Flow Management at Baufeld-Austria GmbH. Leading strategic sales initiatives in the sustainability sector.',
    descriptionDe: 'Sales Lead, Key Account für Material Flow Management bei Baufeld-Austria GmbH. Führung strategischer Vertriebsinitiativen im Nachhaltigkeitssektor.',
    image: '/images/lucas-ted.jpg',
    location: 'Austria',
    locationDe: 'Österreich',
    type: 'current',
    icon: Building2,
  },
]

const typeColors = {
  education: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  career: 'bg-adventurer-accent/20 border-adventurer-accent/30 text-adventurer-accent',
  photography: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
  breathwork: 'bg-adventurer-highlight/20 border-adventurer-highlight/30 text-adventurer-highlight',
  current: 'bg-green-500/20 border-green-500/30 text-green-400',
}

const typeLabels = {
  education: { en: 'Education', de: 'Ausbildung' },
  career: { en: 'Career', de: 'Karriere' },
  photography: { en: 'Photography', de: 'Fotografie' },
  breathwork: { en: 'Breathwork', de: 'Atemarbeit' },
  current: { en: 'Current Role', de: 'Aktuelle Position' },
}

// Timeline milestone component
function TimelineMilestone({
  milestone,
  index,
  isActive,
  onActivate,
  language,
}: {
  milestone: Milestone
  index: number
  isActive: boolean
  onActivate: () => void
  language: 'en' | 'de'
}) {
  const isLeft = index % 2 === 0
  const Icon = milestone.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
    >
      {/* Content card */}
      <motion.div
        onClick={onActivate}
        whileHover={{ scale: 1.02 }}
        className={`flex-1 md:w-5/12 cursor-pointer ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
      >
        <motion.div
          className={`p-6 rounded-lg bg-adventurer-secondary border transition-all duration-300 ${
            isActive
              ? 'border-adventurer-accent/50 shadow-lg shadow-adventurer-accent/10'
              : 'border-white/5 hover:border-adventurer-accent/30'
          }`}
          layout
        >
          {/* Type badge and Icon */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeColors[milestone.type].replace('text-', 'bg-').replace('/30', '/10')}`}>
                <Icon className={`w-4 h-4 ${typeColors[milestone.type].split(' ').pop()}`} />
              </div>
              <span
                className={`px-2 py-1 text-[10px] uppercase tracking-wider rounded-sm border ${typeColors[milestone.type]}`}
              >
                {typeLabels[milestone.type][language]}
              </span>
            </div>
            <span className="text-adventurer-accent font-mono text-sm font-bold">
              {milestone.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-bold text-adventurer-text mb-2">
            {language === 'de' ? milestone.titleDe : milestone.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-adventurer-text/40 text-xs mb-3">
            <MapPin className="w-3 h-3" />
            <span>{language === 'de' ? milestone.locationDe : milestone.location}</span>
          </div>

          {/* Description */}
          <p className="text-adventurer-text/50 text-sm leading-relaxed">
            {language === 'de' ? milestone.descriptionDe : milestone.description}
          </p>

          {/* Expanded content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-white/10">
                  <div
                    className="aspect-video rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${milestone.image}')`,
                      backgroundColor: '#333',
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Center dot and line */}
      <div className="hidden md:flex flex-col items-center mx-4">
        <motion.div
          className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
            isActive
              ? 'bg-adventurer-accent border-adventurer-accent'
              : 'bg-adventurer-primary border-adventurer-accent/50'
          }`}
          whileHover={{ scale: 1.3 }}
        />
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block flex-1 md:w-5/12" />
    </motion.div>
  )
}

// Expedition progress visualization
function ExpeditionPath() {
  return (
    <div className="relative h-2 w-full max-w-md mx-auto mb-12 overflow-hidden rounded-full bg-adventurer-secondary">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-adventurer-accent via-adventurer-highlight to-adventurer-accent"
        initial={{ width: '0%' }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      {/* Milestone markers */}
      {milestones.map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-adventurer-accent border-2 border-adventurer-primary"
          style={{ left: `${(i / (milestones.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.15 }}
        />
      ))}
    </div>
  )
}

// Career summary cards
function CareerSummary({ language }: { language: 'en' | 'de' }) {
  const summaryItems = [
    {
      icon: Building2,
      title: language === 'de' ? 'Aktuelle Rolle' : 'Current Role',
      subtitle: 'Sales Lead @ Baufeld-Austria',
      description: language === 'de' ? 'Material Flow Management' : 'Material Flow Management',
      color: 'text-green-400',
    },
    {
      icon: Wind,
      title: 'Goodlife Breathing',
      subtitle: language === 'de' ? 'Breathwork Facilitator' : 'Breathwork Facilitator',
      description: language === 'de' ? 'Seit Juni 2021' : 'Since June 2021',
      color: 'text-adventurer-highlight',
    },
    {
      icon: Camera,
      title: 'Luke Goodlife',
      subtitle: language === 'de' ? 'Fotografie & AI' : 'Photography & AI',
      description: language === 'de' ? 'Seit Feb 2020' : 'Since Feb 2020',
      color: 'text-purple-400',
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-16">
      {summaryItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="p-6 rounded-lg bg-adventurer-secondary border border-white/5 hover:border-adventurer-accent/30 transition-all group"
        >
          <div className={`w-12 h-12 rounded-lg bg-adventurer-primary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <h4 className="text-lg font-display font-bold text-adventurer-text mb-1">{item.title}</h4>
          <p className="text-adventurer-accent text-sm font-medium mb-2">{item.subtitle}</p>
          <p className="text-adventurer-text/40 text-xs">{item.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export function Journey() {
  const language = useLanguage()
  const t = translations[language]
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 md:py-32 bg-adventurer-secondary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Topographic pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]">
          <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="none">
            {[...Array(10)].map((_, i) => (
              <motion.path
                key={i}
                d={`M0,${50 + i * 60} Q200,${100 + i * 50 + Math.sin(i) * 30} 400,${70 + i * 55} T800,${90 + i * 50}`}
                fill="none"
                stroke="#FF6B35"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 2 }}
              />
            ))}
          </svg>
        </div>

        {/* Floating compass */}
        <motion.div
          className="absolute top-20 right-20 text-adventurer-accent/5"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Compass className="w-32 h-32" />
        </motion.div>

        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-40 opacity-5">
          <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,100 L0,70 L100,40 L200,60 L300,30 L400,50 L500,20 L600,45 L700,25 L800,55 L800,100 Z"
              fill="#FF6B35"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-adventurer-accent to-transparent mb-6"
          />
          <span className="text-adventurer-accent uppercase tracking-[0.3em] text-sm font-medium">
            {language === 'de' ? 'Die Expedition' : 'The Expedition'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-adventurer-text mt-4">
            {t.journey.heading}
          </h2>
          <p className="text-adventurer-text/40 mt-4 max-w-xl mx-auto">
            {language === 'de'
              ? 'Von der Wissenschaft zum Business - mit Leidenschaft für Breathwork und Fotografie'
              : 'From science to business - with passion for breathwork and photography'}
          </p>
        </motion.div>

        {/* Career Summary Cards */}
        <CareerSummary language={language} />

        {/* Expedition progress bar */}
        <ExpeditionPath />

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-adventurer-accent/50 via-adventurer-accent/20 to-transparent" />

          {/* Milestones */}
          <div className="space-y-8 md:space-y-12">
            {milestones.map((milestone, index) => (
              <TimelineMilestone
                key={milestone.year}
                milestone={milestone}
                index={index}
                isActive={activeIndex === index}
                onActivate={() => setActiveIndex(activeIndex === index ? null : index)}
                language={language}
              />
            ))}
          </div>

          {/* End flag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center gap-3 px-6 py-3 bg-adventurer-primary border border-adventurer-accent/30 rounded-sm">
              <Flag className="w-5 h-5 text-adventurer-accent" />
              <span className="text-adventurer-text/60 text-sm font-medium">
                {language === 'de' ? 'Die Reise geht weiter...' : 'The journey continues...'}
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="w-4 h-4 text-adventurer-accent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
