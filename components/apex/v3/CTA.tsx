'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { apexTranslations } from '@/lib/apex-i18n'

function FloatingParticle({ size, x, y, delay }: { size: number; x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function CTA() {
  const language = useLanguage()
  const t = apexTranslations[language]
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Array<{ id: number; size: number; x: number; y: number; delay: number }>>([])

  // Mouse glow effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150 }
  const glowX = useSpring(mouseX, springConfig)
  const glowY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setParticles(newParticles)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-950" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Mesh overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)
                `,
              }}
            />

            {/* Mouse glow */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                x: useTransform(glowX, (x) => x - 200),
                y: useTransform(glowY, (y) => y - 200),
              }}
            />

            {/* Floating particles */}
            {particles.map((particle) => (
              <FloatingParticle key={particle.id} {...particle} />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-20 md:py-28 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">
                {language === 'en' ? 'Start Your AI Journey' : 'Starten Sie Ihre KI-Reise'}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              {t.cta.heading}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12"
            >
              {t.cta.subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href={`mailto:${t.contact.info.email}`}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button background */}
                <div className="absolute inset-0 bg-white" />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                <span className="relative text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  {t.cta.button}
                </span>
                <ArrowRight className="relative w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8"
            >
              {[
                language === 'en' ? 'Free Consultation' : 'Kostenlose Beratung',
                language === 'en' ? 'No Hidden Fees' : 'Keine versteckten Kosten',
                language === 'en' ? 'Response within 24h' : 'Antwort innerhalb 24h',
              ].map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/80" />
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-white/20 rounded-tl-[3rem]" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-white/20 rounded-br-[3rem]" />
        </motion.div>
      </div>
    </section>
  )
}
