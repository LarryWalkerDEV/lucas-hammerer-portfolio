'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Beaker, Wind, Camera, Heart, Leaf, Mountain } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

// Floating leaf decoration
function FloatingLeaf({ delay, x, size }: { delay: number; x: string; size: number }) {
  return (
    <motion.div
      className="absolute text-facilitator-secondary/30"
      style={{ left: x, top: '20%' }}
      initial={{ y: -50, opacity: 0, rotate: 0 }}
      animate={{
        y: ['0%', '100%'],
        opacity: [0, 0.5, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Leaf size={size} />
    </motion.div>
  )
}

export function About() {
  const language = useLanguage()
  const t = translations[language]
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const qualities = [
    {
      icon: Beaker,
      title: language === 'de' ? 'Wissenschaftlich Fundiert' : 'Science-Based',
      description: language === 'de'
        ? 'M.Sc. in Biotechnologie (mit Auszeichnung) - jede Technik basiert auf solider wissenschaftlicher Forschung.'
        : 'M.Sc. in Biotechnology (with distinction) - every technique is backed by solid scientific research.',
    },
    {
      icon: Heart,
      title: language === 'de' ? 'Mit Herz Gefuhrt' : 'Heart-Led',
      description: language === 'de'
        ? 'Authentische Begleitung mit echtem Interesse an deiner Transformation.'
        : 'Authentic guidance with genuine care for your transformation.',
    },
    {
      icon: Mountain,
      title: language === 'de' ? 'Erfahrungsbasiert' : 'Experience-Based',
      description: language === 'de'
        ? 'Jahre der eigenen Praxis und hunderte gefuhrte Sessions.'
        : 'Years of personal practice and hundreds of guided sessions.',
    },
  ]

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 md:py-32 relative overflow-hidden bg-white"
    >
      {/* Floating leaves */}
      <FloatingLeaf delay={0} x="10%" size={20} />
      <FloatingLeaf delay={5} x="85%" size={16} />
      <FloatingLeaf delay={10} x="25%" size={14} />

      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-facilitator-secondary/5 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <motion.div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden"
              style={{ y: imageY }}
            >
              <Image
                src="/images/lucas-portrait.jpg"
                alt="Lucas Hammerer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-facilitator-primary/20 to-transparent" />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full border-2 border-facilitator-secondary/30"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-facilitator-secondary/20 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-8 -right-4 md:right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-facilitator-primary/10"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-full bg-facilitator-primary/10 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Wind className="w-6 h-6 text-facilitator-primary" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-facilitator-text">500+</p>
                  <p className="text-xs text-facilitator-text/60">
                    {language === 'de' ? 'Teilnehmer gefuhrt' : 'Participants guided'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-block text-facilitator-accent uppercase tracking-[0.25em] text-sm font-medium mb-4">
                {language === 'de' ? 'Der Guide' : 'The Guide'}
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-facilitator-text mb-6 leading-tight">
                {t.about.heading}
              </h2>
            </motion.div>

            {/* Story paragraphs with staggered animation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6 text-facilitator-text/70 leading-relaxed"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg"
              >
                {language === 'de'
                  ? 'Der Weg eines Wissenschaftlers ist oft gepragt von der Suche nach Antworten. Doch manchmal fuhrt diese Suche uber die Grenzen des Messbaren hinaus - in Bereiche, wo Erfahrung zur eigentlichen Erkenntnis wird.'
                  : 'The path of a scientist is often marked by the search for answers. But sometimes this search leads beyond the boundaries of the measurable - into realms where experience becomes the true insight.'}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {t.about.intro}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {language === 'de'
                  ? 'Diese einzigartige Kombination ermoglicht es mir, dich auf deiner Reise zu begleiten - mit wissenschaftlicher Prazision und offenem Herzen.'
                  : 'This unique combination allows me to guide you on your journey - with scientific precision and an open heart.'}
              </motion.p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8 pl-6 border-l-2 border-facilitator-secondary"
            >
              <p className="text-xl font-display italic text-facilitator-text/80">
                {language === 'de'
                  ? '"Der Atem ist die Brucke zwischen Korper und Geist, zwischen Wissenschaft und Weisheit."'
                  : '"The breath is the bridge between body and mind, between science and wisdom."'}
              </p>
            </motion.blockquote>

            {/* Three pillars */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 mt-12"
            >
              {[
                { icon: Beaker, label: t.about.scientist.title },
                { icon: Wind, label: t.about.facilitator.title },
                { icon: Camera, label: t.about.photographer.title },
              ].map((pillar, index) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.label}
                    className="text-center group cursor-pointer"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-12 h-12 mx-auto rounded-xl bg-facilitator-primary/10 flex items-center justify-center mb-2 group-hover:bg-facilitator-primary/20 transition-colors duration-300"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        delay: index * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Icon className="w-5 h-5 text-facilitator-primary" />
                    </motion.div>
                    <p className="text-xs font-medium text-facilitator-text/60 group-hover:text-facilitator-primary transition-colors duration-300">
                      {pillar.label}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom section - Guiding principles */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-24"
        >
          <h3 className="text-center text-xl font-display font-medium text-facilitator-text mb-12">
            {language === 'de' ? 'Leitprinzipien' : 'Guiding Principles'}
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {qualities.map((quality, index) => {
              const Icon = quality.icon
              return (
                <motion.div
                  key={quality.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
                  className="group"
                >
                  <motion.div
                    className="p-8 rounded-2xl bg-gradient-to-br from-[#F8FCFC] to-white border border-facilitator-primary/10 h-full"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-facilitator-primary/10 flex items-center justify-center mb-6"
                      animate={{
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: 5,
                        delay: index * 0.7,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Icon className="w-7 h-7 text-facilitator-primary" />
                    </motion.div>

                    <h4 className="text-lg font-medium text-facilitator-text mb-3">
                      {quality.title}
                    </h4>

                    <p className="text-facilitator-text/60 leading-relaxed text-sm">
                      {quality.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
