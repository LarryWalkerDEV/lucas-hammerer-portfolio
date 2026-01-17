'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { KineticTeam, type TeamMember } from '@/components/ui/kinetic-team'
import { GraduationCap, Wind, Camera, Building2, Award, ArrowUpRight } from 'lucide-react'

export function Portfolio() {
  const language = useLanguage()
  const t = translations[language]

  const researchProjects: TeamMember[] = [
    {
      name: 'Baufeld-Austria',
      role: language === 'de' ? 'Sales Lead (Okt 2025 - Heute)' : 'Sales Lead (Oct 2025 - Present)',
      bio: language === 'de'
        ? 'Key Account Management und Material Flow Solutions im Logistik- und Nachhaltigkeitssektor.'
        : 'Key Account and Material Flow Management in the logistics and sustainability sector.',
      image: '/images/lucas-portrait.jpg',
      social: { website: '#' },
    },
    {
      name: 'Goodlife Breathing',
      role: language === 'de' ? 'Facilitator (seit 2021)' : 'Facilitator (since 2021)',
      bio: language === 'de'
        ? 'Wissenschaftlich fundierte Atemarbeit kombiniert mit elektronischer Musik fur transformative Erlebnisse.'
        : 'Science-based breathwork combined with electronic music for transformative experiences.',
      image: '/images/workshop.webp',
      social: { website: 'https://goodlife-breathing.com' },
    },
    {
      name: 'Luke Goodlife',
      role: language === 'de' ? 'Fotografie & AI (seit 2020)' : 'Photography & AI (since 2020)',
      bio: language === 'de'
        ? 'Professionelle Fotografie spezialisiert auf Event-, Business-, Wasser- und Reisefotografie mit AI-Workflows.'
        : 'Professional photography specialized in event, business, water, and travel photography with AI workflows.',
      image: '/images/lucas-surfer.jpg',
      social: { website: '#' },
    },
    {
      name: 'Saubermacher',
      role: language === 'de' ? 'Key Account (2023-2025)' : 'Key Account (2023-2025)',
      bio: language === 'de'
        ? 'Key Account Sales Manager in der Waste-to-Energy Branche fur nachhaltige Abfallmanagement-Losungen.'
        : 'Key Account Sales Manager in the Waste-to-Energy industry for sustainable waste management solutions.',
      image: '/images/lucas-hat.jpg',
      social: { website: '#' },
    },
    {
      name: 'Geco-Festival',
      role: language === 'de' ? 'Communications (2023-2024)' : 'Communications (2023-2024)',
      bio: language === 'de'
        ? 'Communications Manager fur das Nachhaltigkeits-Festival. "We make sustainability great again!"'
        : 'Communications Manager for sustainability festival. "We make sustainability great again!"',
      image: '/images/lucas-about.webp',
      social: { website: '#' },
    },
    {
      name: 'TU Graz',
      role: language === 'de' ? 'M.Sc. Biotechnologie (2015)' : 'M.Sc. Biotechnology (2015)',
      bio: language === 'de'
        ? 'Master of Science in Biotechnologie, bestanden mit Auszeichnung. B.Sc. Chemie & Biotechnologie (2012).'
        : 'Master of Science in Biotechnology, passed with distinction. B.Sc. Chemistry & Biotechnology (2012).',
      image: '/images/lucas-ted.jpg',
      social: { website: '#' },
    },
  ]

  const stats = [
    { icon: GraduationCap, value: 'M.Sc.', label: language === 'de' ? 'Biotechnologie' : 'Biotechnology' },
    { icon: Building2, value: '5+', label: language === 'de' ? 'Jahre Sales' : 'Years Sales' },
    { icon: Wind, value: '500+', label: language === 'de' ? 'Workshops' : 'Workshops' },
    { icon: Camera, value: '10k+', label: language === 'de' ? 'Fotos' : 'Photos' },
  ]

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-gradient-to-b from-scientist-background to-scientist-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-scientist-secondary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-scientist-primary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 text-scientist-secondary uppercase tracking-[0.2em] text-sm font-medium"
          >
            <span className="w-8 h-px bg-scientist-secondary/50" />
            {language === 'de' ? 'Forschung & Projekte' : 'Research & Projects'}
            <span className="w-8 h-px bg-scientist-secondary/50" />
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-scientist-text mt-4">
            {t.portfolio.heading}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-scientist-text/60 max-w-xl mx-auto"
          >
            {language === 'de'
              ? 'Eine Sammlung meiner Arbeit an der Schnittstelle von Wissenschaft und Kreativität.'
              : 'A collection of my work at the intersection of science and creativity.'}
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 px-5 py-3 bg-scientist-background/80 backdrop-blur-sm rounded-xl border border-scientist-primary/10"
            >
              <div className="w-10 h-10 rounded-lg bg-scientist-secondary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-scientist-secondary" />
              </div>
              <div>
                <div className="text-xl font-bold text-scientist-text">{stat.value}</div>
                <div className="text-xs text-scientist-text/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Kinetic Portfolio Grid */}
        <KineticTeam members={researchProjects} variant="scientist" />

        {/* View all projects link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 bg-scientist-primary/10 hover:bg-scientist-primary/20 border border-scientist-primary/20 rounded-full text-scientist-text transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-medium">{language === 'de' ? 'Alle Projekte ansehen' : 'View All Projects'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
