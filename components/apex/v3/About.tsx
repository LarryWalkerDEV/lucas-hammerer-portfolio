'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Target, Eye, Rocket, Shield } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { apexTranslations } from '@/lib/apex-i18n'

function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function About() {
  const language = useLanguage()
  const t = apexTranslations[language]
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y3 = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  const values = [
    {
      icon: Target,
      title: t.about.mission,
      description: t.about.missionText,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Eye,
      title: t.about.vision,
      description: t.about.visionText,
      gradient: 'from-pink-500 to-orange-500',
    },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background with parallax layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/30 to-gray-950">
        {/* Parallax orbs */}
        <motion.div style={{ y: y1 }} className="absolute inset-0">
          <FloatingOrb
            className="w-[400px] h-[400px] -top-20 -left-20 bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"
            delay={0}
          />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute inset-0">
          <FloatingOrb
            className="w-[500px] h-[500px] top-1/2 -right-40 bg-gradient-to-br from-pink-500/20 to-transparent blur-3xl"
            delay={2}
          />
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute inset-0">
          <FloatingOrb
            className="w-[300px] h-[300px] bottom-20 left-1/3 bg-gradient-to-br from-orange-500/20 to-transparent blur-3xl"
            delay={4}
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <motion.div
          style={{ opacity, scale }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-24"
        >
          {/* Left column - Text */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6"
            >
              About Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              <span className="text-white">{t.about.heading.split(' ').slice(0, 2).join(' ')} </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                {t.about.heading.split(' ').slice(2).join(' ')}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/70 leading-relaxed mb-8"
            >
              {t.about.intro}
            </motion.p>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {['AI-First Approach', 'Enterprise Ready', 'Scalable Solutions', '24/7 Support'].map((badge, i) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right column - Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Glassmorphism card with floating elements */}
            <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
              {/* Animated rings */}
              <div className="relative w-full aspect-square flex items-center justify-center">
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute rounded-full border border-purple-500/30"
                    style={{
                      width: `${ring * 30 + 20}%`,
                      height: `${ring * 30 + 20}%`,
                    }}
                    animate={{
                      rotate: ring % 2 === 0 ? 360 : -360,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20 + ring * 5,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                      scale: {
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                  />
                ))}

                {/* Center icon */}
                <motion.div
                  className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 40px rgba(139, 92, 246, 0.4)',
                      '0 0 80px rgba(236, 72, 153, 0.4)',
                      '0 0 40px rgba(139, 92, 246, 0.4)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Rocket className="w-12 h-12 text-white" />
                </motion.div>

                {/* Floating icons */}
                {[
                  { Icon: Shield, angle: 45, delay: 0 },
                  { Icon: Target, angle: 135, delay: 1 },
                  { Icon: Eye, angle: 225, delay: 2 },
                ].map(({ Icon, angle, delay }, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    style={{
                      left: `${50 + 35 * Math.cos((angle * Math.PI) / 180)}%`,
                      top: `${50 + 35 * Math.sin((angle * Math.PI) / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Icon className="w-6 h-6 text-purple-400" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission & Vision cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              {/* Gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <item.icon className="w-7 h-7 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/60 leading-relaxed">{item.description}</p>

              {/* Corner accent */}
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${item.gradient} rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
