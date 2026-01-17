'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import {
  Camera,
  Wind,
  Briefcase,
  X,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Folder,
  FolderOpen,
  Image as ImageIcon,
  Sparkles,
  Building2,
  Waves,
  Users,
  Plane,
  Home,
} from 'lucide-react'

// Animated folder component
interface FolderProjectItem {
  id: string
  title: string
  image: string
  description: string
}

interface AnimatedPortfolioFolder {
  id: string
  title: string
  titleDe: string
  icon: typeof Camera
  color: string
  projects: FolderProjectItem[]
}

const portfolioFolders: AnimatedPortfolioFolder[] = [
  {
    id: 'photography',
    title: 'Photography',
    titleDe: 'Fotografie',
    icon: Camera,
    color: 'from-amber-400 to-orange-500',
    projects: [
      {
        id: 'events',
        title: 'Event Photography',
        image: '/images/workshop.webp',
        description: 'Corporate events, festivals, and private celebrations',
      },
      {
        id: 'business',
        title: 'Business Portraits',
        image: '/images/lucas-portrait.jpg',
        description: 'Executive portraits and team photography',
      },
      {
        id: 'water',
        title: 'Water & Surf',
        image: '/images/lucas-surfer.jpg',
        description: 'In-water surf photography and ocean life',
      },
      {
        id: 'travel',
        title: 'Travel Stories',
        image: '/images/lucas-hat.jpg',
        description: 'Adventures from around the world',
      },
    ],
  },
  {
    id: 'breathwork',
    title: 'Breathwork',
    titleDe: 'Atemarbeit',
    icon: Wind,
    color: 'from-orange-500 to-red-500',
    projects: [
      {
        id: 'workshops',
        title: 'Workshop Sessions',
        image: '/images/workshop.webp',
        description: 'Transformative group breathwork experiences',
      },
      {
        id: 'icebath',
        title: 'Ice Bathing',
        image: '/images/lucas-ted.jpg',
        description: 'Cold exposure training and Wim Hof method',
      },
      {
        id: 'corporate',
        title: 'Corporate Wellness',
        image: '/images/lucas-about.webp',
        description: 'Breathwork for teams and organizations',
      },
    ],
  },
  {
    id: 'business',
    title: 'Business',
    titleDe: 'Business',
    icon: Briefcase,
    color: 'from-red-500 to-purple-500',
    projects: [
      {
        id: 'baufeld',
        title: 'Baufeld-Austria',
        image: '/images/lucas-ted.jpg',
        description: 'Sales Lead - Material Flow Management',
      },
      {
        id: 'saubermacher',
        title: 'Saubermacher',
        image: '/images/lucas-portrait.jpg',
        description: 'Key Account Sales Manager - Waste-to-Energy',
      },
      {
        id: 'realestate',
        title: 'immobilien-fotograf.wien',
        image: '/images/lucas-hat.jpg',
        description: 'Real Estate Photography - NEW 2026',
      },
    ],
  },
]

// Folder Card with animated hover
function FolderCard({
  folder,
  index,
  isOpen,
  onToggle,
  language,
}: {
  folder: AnimatedPortfolioFolder
  index: number
  isOpen: boolean
  onToggle: () => void
  language: 'en' | 'de'
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isOpen) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    rotateX.set(-y * 8)
    rotateY.set(x * 8)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const Icon = folder.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
          isOpen ? 'bg-white/5' : 'bg-gradient-to-br from-white/5 to-white/0'
        } border border-white/10 hover:border-white/20`}
        style={{ rotateX: isOpen ? 0 : rotateX, rotateY: isOpen ? 0 : rotateY }}
        onClick={onToggle}
        layout
      >
        {/* Folder header */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className={`w-14 h-14 rounded-xl bg-gradient-to-r ${folder.color} flex items-center justify-center`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon className="w-7 h-7 text-black" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {language === 'de' ? folder.titleDe : folder.title}
              </h3>
              <p className="text-white/40 text-sm">
                {folder.projects.length} {language === 'de' ? 'Projekte' : 'projects'}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/40"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 grid grid-cols-2 gap-4">
                {folder.projects.map((project, projectIndex) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: projectIndex * 0.1 }}
                    className="group relative overflow-hidden rounded-xl bg-black/30 border border-white/5 hover:border-white/20 transition-all"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white font-medium text-sm mb-1">{project.title}</h4>
                      <p className="text-white/50 text-xs line-clamp-1">{project.description}</p>
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient border effect on hover */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${folder.color} opacity-0 pointer-events-none`}
          style={{ padding: '1px' }}
          whileHover={{ opacity: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

// Featured project highlight
function FeaturedHighlight({ language }: { language: 'en' | 'de' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400/10 via-orange-500/10 to-red-500/10 border border-white/10 p-8 md:p-12"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">
              {language === 'de' ? 'Neu 2026' : 'New 2026'}
            </span>
          </motion.div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            immobilien-fotograf.wien
          </h3>

          <p className="text-white/60 text-lg mb-6 leading-relaxed">
            {language === 'de'
              ? 'Professionelle Immobilienfotografie in Wien. HDR-Aufnahmen, virtuelle Touren und Drohnenaufnahmen fur Makler und Immobilienbesitzer.'
              : 'Professional real estate photography in Vienna. HDR images, virtual tours and drone footage for realtors and property owners.'}
          </p>

          <motion.a
            href="https://immobilien-fotograf.wien"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home className="w-5 h-5" />
            <span>{language === 'de' ? 'Website Besuchen' : 'Visit Website'}</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/images/lucas-hat.jpg"
              alt="Real Estate Photography"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="text-white text-sm">Real Estate</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/90 text-black text-sm font-medium">
                Vienna, Austria
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-black font-bold text-xs text-center">NEW<br />2026</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  const language = useLanguage()
  const t = translations[language]
  const [openFolderId, setOpenFolderId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="py-20 md:py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]" />
      </motion.div>

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
            {language === 'de' ? 'Ausgewahlte Arbeiten' : 'Selected Works'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-4">
            {t.portfolio.heading}
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            {language === 'de'
              ? 'Erkunden Sie meine Projekte in Fotografie, Breathwork und Business'
              : 'Explore my projects across Photography, Breathwork, and Business'}
          </p>
        </motion.div>

        {/* Portfolio folders */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {portfolioFolders.map((folder, index) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              index={index}
              isOpen={openFolderId === folder.id}
              onToggle={() => setOpenFolderId(openFolderId === folder.id ? null : folder.id)}
              language={language}
            />
          ))}
        </div>

        {/* Featured highlight */}
        <FeaturedHighlight language={language} />

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 text-amber-400 text-lg font-medium group"
          >
            <span>{language === 'de' ? 'Alle Projekte Ansehen' : 'View All Projects'}</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
