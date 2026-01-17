'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { HoverPreview, PreviewData } from '@/components/ui/hover-preview'
import {
  FlaskConical,
  Mountain,
  Wind,
  Camera,
  MapPin,
  Award,
  GraduationCap,
  Compass,
  ArrowRight,
} from 'lucide-react'

const previewData: PreviewData = {
  scientist: {
    image: '/images/lucas-ted.jpg',
    title: 'The Scientist',
    subtitle: 'M.Sc. Biotechnology - TU Graz (with distinction)',
  },
  explorer: {
    image: '/images/lucas-surfer.jpg',
    title: 'The Explorer',
    subtitle: 'Surf & Adventure Photography',
  },
  facilitator: {
    image: '/images/workshop.webp',
    title: 'The Facilitator',
    subtitle: 'Goodlife Breathing & Eisbaden',
  },
}

const previewDataDe: PreviewData = {
  scientist: {
    image: '/images/lucas-ted.jpg',
    title: 'Der Wissenschaftler',
    subtitle: 'M.Sc. Biotechnologie - TU Graz (mit Auszeichnung)',
  },
  explorer: {
    image: '/images/lucas-surfer.jpg',
    title: 'Der Explorer',
    subtitle: 'Surf & Abenteuer Fotografie',
  },
  facilitator: {
    image: '/images/workshop.webp',
    title: 'Der Facilitator',
    subtitle: 'Goodlife Breathing & Eisbaden',
  },
}

// Expedition milestone card
function ExpeditionCard({
  icon: Icon,
  title,
  description,
  location,
  index,
}: {
  icon: typeof FlaskConical
  title: string
  description: string
  location: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="group relative"
    >
      {/* Connector line */}
      {index > 0 && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 - 0.1 }}
          className="absolute -top-8 left-8 w-px h-8 bg-gradient-to-b from-adventurer-accent/50 to-adventurer-accent origin-top"
        />
      )}

      <div className="flex gap-6">
        {/* Icon */}
        <motion.div
          className="relative flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <div className="w-16 h-16 rounded-xl bg-adventurer-primary border border-adventurer-accent/30 flex items-center justify-center group-hover:border-adventurer-accent transition-colors">
            <Icon className="w-7 h-7 text-adventurer-accent" />
          </div>
          {/* Ping animation */}
          <motion.div
            className="absolute inset-0 rounded-xl border border-adventurer-accent/50"
            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1 pt-2">
          <div className="flex items-center gap-2 text-adventurer-accent text-xs uppercase tracking-wider mb-1">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
          <h3 className="text-xl font-display font-bold text-adventurer-text mb-2 group-hover:text-adventurer-accent transition-colors">
            {title}
          </h3>
          <p className="text-adventurer-text/50 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Achievement badge
function AchievementBadge({
  icon: Icon,
  text,
  delay,
}: {
  icon: typeof Award
  text: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring' }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-2 px-4 py-2 bg-adventurer-primary border border-adventurer-accent/20 rounded-sm"
    >
      <Icon className="w-4 h-4 text-adventurer-accent" />
      <span className="text-adventurer-text/70 text-xs font-medium">{text}</span>
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

  const expeditions = language === 'de'
    ? [
        {
          icon: FlaskConical,
          title: 'Der Wissenschaftler',
          description: 'M.Sc. in Biotechnologie von der TU Graz (mit Auszeichnung), B.Sc. in Chemie & Biotechnologie. Analytisches Denken trifft auf innovative Lösungsansätze.',
          location: 'Graz, Österreich',
        },
        {
          icon: Wind,
          title: 'Der Facilitator',
          description: 'Gründer von Goodlife Breathing seit 2021 - wo alte Atemtechniken auf moderne Wissenschaft und elektronische Musik treffen. Leitung der Eisbaden Graz Community.',
          location: 'Wien & Graz',
        },
        {
          icon: Camera,
          title: 'Der Fotograf',
          description: 'Professioneller Fotograf seit 2020 als Luke Goodlife. Event-, Business-, Wasser- und Reisefotografie. Authentische Momente einfangen.',
          location: 'Weltweit',
        },
      ]
    : [
        {
          icon: FlaskConical,
          title: 'The Scientist',
          description: 'M.Sc. in Biotechnology from TU Graz (with distinction), B.Sc. in Chemistry & Biotechnology. Analytical thinking meets innovative problem-solving.',
          location: 'Graz, Austria',
        },
        {
          icon: Wind,
          title: 'The Facilitator',
          description: 'Founder of Goodlife Breathing since 2021 - where ancient breathing techniques meet modern science and electronic music. Leading the Eisbaden Graz ice bathing community.',
          location: 'Vienna & Graz',
        },
        {
          icon: Camera,
          title: 'The Photographer',
          description: 'Professional photographer since 2020 as Luke Goodlife. Event, business, water, and travel photography. Capturing authentic moments.',
          location: 'Worldwide',
        },
      ]

  const achievements = language === 'de'
    ? [
        { icon: GraduationCap, text: 'M.Sc. Biotechnologie (mit Auszeichnung)' },
        { icon: Award, text: 'Sales Lead @ Baufeld-Austria' },
        { icon: Mountain, text: 'Goodlife Breathing Gründer' },
        { icon: Camera, text: 'Luke Goodlife Photography' },
      ]
    : [
        { icon: GraduationCap, text: 'M.Sc. Biotechnology (with distinction)' },
        { icon: Award, text: 'Sales Lead @ Baufeld-Austria' },
        { icon: Mountain, text: 'Goodlife Breathing Founder' },
        { icon: Camera, text: 'Luke Goodlife Photography' },
      ]

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-20 md:py-32 bg-adventurer-primary relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large compass in background */}
        <motion.div
          className="absolute -right-40 top-1/2 -translate-y-1/2 text-adventurer-accent/[0.02]"
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        >
          <Compass className="w-[600px] h-[600px]" />
        </motion.div>

        {/* Topographic lines */}
        <div className="absolute top-20 left-0 w-full h-40 opacity-[0.03]">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full border-t border-adventurer-accent"
              style={{ top: `${i * 25}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
            />
          ))}
        </div>
      </div>

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
            className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-adventurer-accent to-transparent mb-6"
          />
          <span className="text-adventurer-accent uppercase tracking-[0.3em] text-sm font-medium">
            {language === 'de' ? 'Die Geschichte' : 'The Story'}
          </span>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column - Text content with hover preview */}
          <motion.div style={{ y: contentY }}>
            <HoverPreview
              previewData={language === 'de' ? previewDataDe : previewData}
              variant="adventurer"
            >
              {(HoverLink) => (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-adventurer-text leading-snug mb-8">
                  {language === 'de' ? (
                    <>
                      Wo{' '}
                      <HoverLink previewKey="scientist" className="text-adventurer-accent">
                        Wissenschaft
                      </HoverLink>{' '}
                      auf{' '}
                      <HoverLink previewKey="explorer" className="text-adventurer-highlight">
                        Abenteuer
                      </HoverLink>{' '}
                      trifft, und{' '}
                      <HoverLink previewKey="facilitator" className="text-adventurer-accent">
                        Transformation
                      </HoverLink>{' '}
                      entsteht.
                    </>
                  ) : (
                    <>
                      Where{' '}
                      <HoverLink previewKey="scientist" className="text-adventurer-accent">
                        Science
                      </HoverLink>{' '}
                      meets{' '}
                      <HoverLink previewKey="explorer" className="text-adventurer-highlight">
                        Adventure
                      </HoverLink>
                      , and{' '}
                      <HoverLink previewKey="facilitator" className="text-adventurer-accent">
                        Transformation
                      </HoverLink>{' '}
                      begins.
                    </>
                  )}
                </h2>
              )}
            </HoverPreview>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-adventurer-text/50 text-lg leading-relaxed mb-8"
            >
              {t.about.intro}
            </motion.p>

            {/* Achievement badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {achievements.map((achievement, index) => (
                <AchievementBadge
                  key={achievement.text}
                  icon={achievement.icon}
                  text={achievement.text}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 text-adventurer-accent font-medium group"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span className="uppercase tracking-wider text-sm">
                  {language === 'de' ? 'Entdecke mehr' : 'Discover More'}
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

          {/* Right column - Expedition cards */}
          <motion.div style={{ y: imageY }} className="space-y-10">
            {/* Image with overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-lg overflow-hidden mb-12"
            >
              <div
                className="aspect-[4/3] bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/lucas-portrait.jpg')",
                  backgroundColor: '#1A1A1A',
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-adventurer-primary via-transparent to-transparent" />
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-adventurer-accent/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-adventurer-accent/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-adventurer-accent/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-adventurer-accent/50" />

              {/* Location badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 flex items-center gap-2 bg-adventurer-primary/80 backdrop-blur-sm px-4 py-2 rounded-sm"
              >
                <MapPin className="w-4 h-4 text-adventurer-accent" />
                <span className="text-adventurer-text/80 text-sm font-medium">
                  Graz, Austria
                </span>
              </motion.div>
            </motion.div>

            {/* Expedition cards */}
            <div className="space-y-8">
              {expeditions.map((expedition, index) => (
                <ExpeditionCard
                  key={expedition.title}
                  icon={expedition.icon}
                  title={expedition.title}
                  description={expedition.description}
                  location={expedition.location}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
