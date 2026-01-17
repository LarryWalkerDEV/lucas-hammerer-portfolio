'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import {
  FlaskConical,
  Camera,
  Wind,
  Building2,
  GraduationCap,
  Award,
  MapPin,
  Calendar,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Zap,
} from 'lucide-react'

// Timeline item interface
interface TimelineItem {
  year: string
  title: string
  description: string
  icon: typeof FlaskConical
  color: string
  current?: boolean
  link?: string
}

// Animated timeline
function Timeline({ items, language }: { items: TimelineItem[]; language: 'en' | 'de' }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="relative">
      {/* Central line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/50 via-orange-500/50 to-red-500/50" />

      <div className="space-y-8">
        {items.map((item, index) => {
          const Icon = item.icon
          const isHovered = hoveredIndex === index

          return (
            <motion.div
              key={`${item.year}-${item.title}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon bubble */}
              <motion.div
                className={`absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Icon className="w-7 h-7 text-black" />
                {item.current && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Content */}
              <motion.div
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  isHovered
                    ? 'bg-white/10 border-white/20'
                    : 'bg-white/5 border-white/10'
                }`}
                layout
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-amber-400 text-sm font-medium tracking-wide">
                    {item.year}
                  </span>
                  {item.current && (
                    <span className="px-2 py-0.5 rounded-full bg-green-400/20 text-green-400 text-xs font-medium">
                      {language === 'de' ? 'Aktuell' : 'Current'}
                    </span>
                  )}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>

                {item.link && (
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-amber-400 text-sm font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <span>{language === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Skill badge component
function SkillBadge({
  icon: Icon,
  label,
  delay,
}: {
  icon: typeof FlaskConical
  label: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring' }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/30 transition-colors"
    >
      <Icon className="w-4 h-4 text-amber-400" />
      <span className="text-white/70 text-sm">{label}</span>
    </motion.div>
  )
}

// Stats counter
function StatCounter({
  value,
  label,
  suffix = '',
  delay,
}: {
  value: number
  label: string
  suffix?: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center"
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value}{suffix}
      </motion.div>
      <p className="text-white/40 text-sm mt-2">{label}</p>
    </motion.div>
  )
}

export function About() {
  const language = useLanguage()
  const t = translations[language]
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])

  const timelineItems: TimelineItem[] = language === 'de'
    ? [
        {
          year: 'Okt 2025 - Heute',
          title: 'Baufeld-Austria GmbH',
          description: 'Sales Lead, Key Account fur Material Flow Management. Europa-weite Tatigkeit im Hybrid-Modell.',
          icon: Building2,
          color: 'from-amber-400 to-orange-500',
          current: true,
        },
        {
          year: 'Juni 2021 - Heute',
          title: 'GOODLIFE BREATHING',
          description: 'Grunder. "Entdecke dein volles Potenzial durch Breathwork." Workshops, Eisbaden und transformative Sessions.',
          icon: Wind,
          color: 'from-orange-500 to-red-500',
          current: true,
          link: '#',
        },
        {
          year: 'Feb 2020 - Heute',
          title: 'Luke Goodlife Photography',
          description: 'Event-, Business-, Wasser- und Reisefotografie. Authentische Momente einfangen.',
          icon: Camera,
          color: 'from-red-500 to-purple-500',
          current: true,
        },
        {
          year: '2026',
          title: 'immobilien-fotograf.wien',
          description: 'NEU - Professionelle Immobilienfotografie in Wien. HDR, virtuelle Touren, Drohnen.',
          icon: Camera,
          color: 'from-purple-500 to-pink-500',
          current: true,
          link: 'https://immobilien-fotograf.wien',
        },
        {
          year: 'Nov 2023 - Sept 2025',
          title: 'Saubermacher Dienstleistungs AG',
          description: 'Key Account Sales Manager in der Waste-to-Energy Branche.',
          icon: Building2,
          color: 'from-gray-400 to-gray-500',
        },
        {
          year: '2012 - 2015',
          title: 'M.Sc. Biotechnologie',
          description: 'TU Graz - Mit Auszeichnung bestanden. Analytisches Denken trifft Innovation.',
          icon: GraduationCap,
          color: 'from-gray-400 to-gray-500',
        },
      ]
    : [
        {
          year: 'Oct 2025 - Present',
          title: 'Baufeld-Austria GmbH',
          description: 'Sales Lead, Key Account for Material Flow Management. Europe-wide hybrid position.',
          icon: Building2,
          color: 'from-amber-400 to-orange-500',
          current: true,
        },
        {
          year: 'June 2021 - Present',
          title: 'GOODLIFE BREATHING',
          description: 'Founder. "Explore your full potential through Breathwork." Workshops, ice bathing and transformative sessions.',
          icon: Wind,
          color: 'from-orange-500 to-red-500',
          current: true,
          link: '#',
        },
        {
          year: 'Feb 2020 - Present',
          title: 'Luke Goodlife Photography',
          description: 'Event, Business, Water & Travel Photography. Capturing authentic moments.',
          icon: Camera,
          color: 'from-red-500 to-purple-500',
          current: true,
        },
        {
          year: '2026',
          title: 'immobilien-fotograf.wien',
          description: 'NEW - Professional real estate photography in Vienna. HDR, virtual tours, drones.',
          icon: Camera,
          color: 'from-purple-500 to-pink-500',
          current: true,
          link: 'https://immobilien-fotograf.wien',
        },
        {
          year: 'Nov 2023 - Sept 2025',
          title: 'Saubermacher Dienstleistungs AG',
          description: 'Key Account Sales Manager in the Waste-to-Energy industry.',
          icon: Building2,
          color: 'from-gray-400 to-gray-500',
        },
        {
          year: '2012 - 2015',
          title: 'M.Sc. Biotechnology',
          description: 'TU Graz - Passed with distinction. Analytical thinking meets innovation.',
          icon: GraduationCap,
          color: 'from-gray-400 to-gray-500',
        },
      ]

  const skills = language === 'de'
    ? [
        { icon: FlaskConical, label: 'M.Sc. Biotechnologie' },
        { icon: Camera, label: 'Fotografie' },
        { icon: Wind, label: 'Breathwork' },
        { icon: Building2, label: 'Sales & Key Account' },
        { icon: Award, label: 'Mit Auszeichnung' },
        { icon: MapPin, label: 'Graz, Osterreich' },
      ]
    : [
        { icon: FlaskConical, label: 'M.Sc. Biotechnology' },
        { icon: Camera, label: 'Photography' },
        { icon: Wind, label: 'Breathwork' },
        { icon: Building2, label: 'Sales & Key Account' },
        { icon: Award, label: 'With Distinction' },
        { icon: MapPin, label: 'Graz, Austria' },
      ]

  const stats = language === 'de'
    ? [
        { value: 5, suffix: '+', label: 'Jahre Fotografie' },
        { value: 100, suffix: '+', label: 'Workshops' },
        { value: 3, suffix: '', label: 'Aktive Ventures' },
      ]
    : [
        { value: 5, suffix: '+', label: 'Years Photography' },
        { value: 100, suffix: '+', label: 'Workshops' },
        { value: 3, suffix: '', label: 'Active Ventures' },
      ]

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-20 md:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 -left-64 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]"
          style={{ y: imageY }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-64 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]"
          style={{ y: contentY }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6"
          />
          <span className="text-amber-400 uppercase tracking-[0.3em] text-sm font-medium">
            {language === 'de' ? 'Uber Mich' : 'About Me'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            {t.about.heading}
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column - Image and intro */}
          <motion.div style={{ y: imageY }}>
            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden mb-8"
            >
              <div className="aspect-[4/5] relative">
                <Image
                  src="/images/lucas-portrait.jpg"
                  alt="Lucas Hammerer"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10"
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span className="text-white text-sm font-medium">M.Sc. Biotechnology</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-medium text-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>Graz, Austria</span>
              </motion.div>

              {/* Corner decorations */}
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-400/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-400/30 rounded-bl-lg" />
            </motion.div>

            {/* Intro text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/60 text-lg leading-relaxed mb-8"
            >
              {t.about.intro}
            </motion.p>

            {/* Skills badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {skills.map((skill, index) => (
                <SkillBadge
                  key={skill.label}
                  icon={skill.icon}
                  label={skill.label}
                  delay={0.3 + index * 0.1}
                />
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-8 p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              {stats.map((stat, index) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={0.5 + index * 0.1}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Timeline */}
          <motion.div style={{ y: contentY }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-2xl font-bold text-white">
                {language === 'de' ? 'Meine Reise' : 'My Journey'}
              </h3>
            </motion.div>

            <Timeline items={timelineItems} language={language} />

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 text-amber-400 font-medium group"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="uppercase tracking-wider text-sm">
                  {language === 'de' ? "Lass uns zusammenarbeiten" : "Let's Work Together"}
                </span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
