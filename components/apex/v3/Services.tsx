'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Cpu, Layers, Boxes, MessageSquare, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { apexTranslations } from '@/lib/apex-i18n'

const icons = [Cpu, Layers, Boxes, MessageSquare]
const gradients = [
  'from-purple-500 to-pink-500',
  'from-pink-500 to-orange-500',
  'from-orange-500 to-yellow-500',
  'from-cyan-500 to-purple-500',
]

interface ServiceCardProps {
  title: string
  description: string
  features: string[]
  index: number
  Icon: typeof Cpu
  gradient: string
}

function ServiceCard({ title, description, features, index, Icon, gradient }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-10, 10]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glassmorphism card */}
      <div className="relative h-full p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
        {/* Gradient glow on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          style={{ filter: 'blur(40px)' }}
        />

        {/* Icon with gradient background */}
        <motion.div
          className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-4 mb-6`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Icon className="w-full h-full text-white" />
          {/* Floating particles around icon */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white/80"
            animate={{
              y: [0, -8, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/60 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features list */}
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <motion.li
              key={feature}
              className="flex items-center gap-3 text-white/70"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Learn more link */}
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          whileHover={{ x: 5 }}
        >
          <span className="font-medium">Learn more</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>

        {/* Corner accent */}
        <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity`} />
      </div>
    </motion.div>
  )
}

export function Services() {
  const language = useLanguage()
  const t = apexTranslations[language]

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-950">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6"
          >
            Our Services
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">{t.services.heading.split(' ')[0]} </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              {t.services.heading.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {t.services.items.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              features={service.features}
              index={index}
              Icon={icons[index]}
              gradient={gradients[index]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
