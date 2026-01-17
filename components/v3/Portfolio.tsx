'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { X, MapPin, Calendar, Camera, Mountain, Waves, Building2, ArrowRight, ExternalLink, Users, Briefcase, Plane } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import { AnimatedFolder, FolderProject } from '@/components/ui/animated-folder'

// Photography categories with AnimatedFolder
interface PhotographyCategory {
  id: string
  title: string
  titleDe: string
  icon: typeof Camera
  projects: FolderProject[]
}

const photographyCategories: PhotographyCategory[] = [
  {
    id: 'events',
    title: 'Event Photography',
    titleDe: 'Event Fotografie',
    icon: Users,
    projects: [
      {
        id: 'event-1',
        image: '/images/workshop.webp',
        title: 'Corporate Events',
        description: 'Professional coverage of business events, conferences, and corporate gatherings.',
      },
      {
        id: 'event-2',
        image: '/images/lucas-ted.jpg',
        title: 'Festival Moments',
        description: 'Capturing the energy and atmosphere of festivals and live events.',
      },
      {
        id: 'event-3',
        image: '/images/lucas-about.webp',
        title: 'Private Events',
        description: 'Intimate celebrations and private gatherings documented with care.',
      },
    ],
  },
  {
    id: 'business',
    title: 'Business Photography',
    titleDe: 'Business Fotografie',
    icon: Briefcase,
    projects: [
      {
        id: 'business-1',
        image: '/images/lucas-portrait.jpg',
        title: 'Professional Portraits',
        description: 'Executive and team portraits that convey professionalism and personality.',
      },
      {
        id: 'business-2',
        image: '/images/lucas-ted.jpg',
        title: 'Corporate Branding',
        description: 'Visual content for brand identity and marketing materials.',
      },
      {
        id: 'business-3',
        image: '/images/lucas-hat.jpg',
        title: 'Headshots',
        description: 'Modern headshots for LinkedIn, websites, and professional use.',
      },
    ],
  },
  {
    id: 'travel',
    title: 'Travel Photography',
    titleDe: 'Reisefotografie',
    icon: Plane,
    projects: [
      {
        id: 'travel-1',
        image: '/images/lucas-surfer.jpg',
        title: 'Atlantic Adventures',
        description: 'Surf expeditions across Portugal and Morocco.',
      },
      {
        id: 'travel-2',
        image: '/images/lucas-hat.jpg',
        title: 'Alpine Stories',
        description: 'Mountain landscapes and alpine experiences.',
      },
      {
        id: 'travel-3',
        image: '/images/lucas-about.webp',
        title: 'Cultural Journeys',
        description: 'People and places from around the world.',
      },
    ],
  },
  {
    id: 'water',
    title: 'Water Photography',
    titleDe: 'Wasserfotografie',
    icon: Waves,
    projects: [
      {
        id: 'water-1',
        image: '/images/lucas-surfer.jpg',
        title: 'Surf Action',
        description: 'In-water surf photography capturing the power of waves.',
      },
      {
        id: 'water-2',
        image: '/images/workshop.webp',
        title: 'Faces of Ice',
        description: 'Documentary series on ice bathing practitioners.',
      },
      {
        id: 'water-3',
        image: '/images/lucas-about.webp',
        title: 'Ocean Life',
        description: 'Underwater and aquatic photography.',
      },
    ],
  },
]

// Featured project card with hover effects
interface FeaturedProject {
  id: string
  title: string
  titleDe: string
  category: string
  categoryDe: string
  location: string
  year: string
  image: string
  description: string
  descriptionDe: string
  icon: typeof Mountain
  tags: string[]
}

const featuredProjects: FeaturedProject[] = [
  {
    id: 'faces-of-ice',
    title: 'Faces of Ice',
    titleDe: 'Gesichter des Eises',
    category: 'Photography Series',
    categoryDe: 'Fotoserie',
    location: 'Graz, Austria',
    year: '2022-Present',
    image: '/images/workshop.webp',
    description: 'A documentary photo series capturing the raw emotions and transformative moments of ice bathing practitioners.',
    descriptionDe: 'Eine dokumentarische Fotoserie, die die rohen Emotionen und transformativen Momente von Eisbadenden einfängt.',
    icon: Camera,
    tags: ['Documentary', 'Portraits', 'Cold Exposure'],
  },
  {
    id: 'alpine-stories',
    title: 'Alpine Stories',
    titleDe: 'Alpine Geschichten',
    category: 'Mountain Photography',
    categoryDe: 'Bergfotografie',
    location: 'Austrian Alps',
    year: '2020-Present',
    image: '/images/lucas-hat.jpg',
    description: 'Documenting the raw beauty of the Austrian Alps through all seasons.',
    descriptionDe: 'Die rohe Schönheit der österreichischen Alpen durch alle Jahreszeiten dokumentieren.',
    icon: Mountain,
    tags: ['Mountains', 'Landscape', 'Nature'],
  },
]

// Featured project card component
function FeaturedProjectCard({
  project,
  index,
  onSelect,
  language,
}: {
  project: FeaturedProject
  index: number
  onSelect: () => void
  language: 'en' | 'de'
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    rotateX.set(-y * 5)
    rotateY.set(x * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const Icon = project.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className="group cursor-pointer perspective-1000"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="relative overflow-hidden rounded-lg bg-adventurer-secondary border border-white/5 hover:border-adventurer-accent/30 transition-all duration-500">
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url('${project.image}')`,
              backgroundColor: '#1A1A1A',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-adventurer-secondary via-adventurer-secondary/50 to-transparent" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3 }}
            className="absolute top-4 left-4"
          >
            <div className="flex items-center gap-2 bg-adventurer-accent/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <Icon className="w-3 h-3 text-adventurer-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-adventurer-primary">
                {language === 'de' ? project.categoryDe : project.category}
              </span>
            </div>
          </motion.div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-adventurer-text/60 text-xs">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-adventurer-accent" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-adventurer-accent" />
              <span>{project.year}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-display font-bold text-adventurer-text mb-2 group-hover:text-adventurer-accent transition-colors">
            {language === 'de' ? project.titleDe : project.title}
          </h3>

          <p className="text-adventurer-text/50 text-sm leading-relaxed line-clamp-2 mb-4">
            {language === 'de' ? project.descriptionDe : project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[10px] uppercase tracking-wider bg-adventurer-primary border border-white/10 text-adventurer-text/60 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-2 text-adventurer-accent text-sm font-medium"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
          >
            <span>{language === 'de' ? 'Projekt ansehen' : 'View Project'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 107, 53, 0.1), transparent 50%)',
          }}
        />
      </div>
    </motion.div>
  )
}

// Project detail modal
function ProjectModal({
  project,
  onClose,
  language,
}: {
  project: FeaturedProject
  onClose: () => void
  language: 'en' | 'de'
}) {
  const Icon = project.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-adventurer-primary/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative max-w-5xl w-full bg-adventurer-secondary rounded-lg overflow-hidden border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-adventurer-primary/80 backdrop-blur-sm flex items-center justify-center text-adventurer-text/50 hover:text-adventurer-accent hover:bg-adventurer-accent/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-full min-h-[400px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${project.image}')`,
                backgroundColor: '#1A1A1A',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-adventurer-secondary md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-adventurer-secondary to-transparent md:hidden" />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-adventurer-accent/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-adventurer-accent" />
              </div>
              <div>
                <span className="text-adventurer-accent text-xs uppercase tracking-wider font-medium">
                  {language === 'de' ? project.categoryDe : project.category}
                </span>
                <div className="flex items-center gap-3 text-adventurer-text/40 text-xs mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.year}
                  </span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-adventurer-text mb-6">
              {language === 'de' ? project.titleDe : project.title}
            </h2>

            <p className="text-adventurer-text/60 leading-relaxed mb-8">
              {language === 'de' ? project.descriptionDe : project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs uppercase tracking-wider bg-adventurer-primary border border-adventurer-accent/20 text-adventurer-text/80 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-adventurer-accent text-adventurer-primary px-6 py-3 font-bold uppercase tracking-wider text-sm"
              >
                <span>{language === 'de' ? 'Galerie ansehen' : 'View Gallery'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 border border-adventurer-text/20 text-adventurer-text/70 px-6 py-3 font-medium uppercase tracking-wider text-sm hover:border-adventurer-accent hover:text-adventurer-accent transition-colors"
              >
                <span>{language === 'de' ? 'Teilen' : 'Share'}</span>
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-adventurer-accent via-adventurer-highlight to-adventurer-accent" />
      </motion.div>
    </motion.div>
  )
}

export function Portfolio() {
  const language = useLanguage()
  const t = translations[language]
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null)

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-adventurer-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #FF6B35 1px, transparent 1px),
              linear-gradient(-45deg, #FF6B35 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
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
            {language === 'de' ? 'Luke Goodlife Photography' : 'Luke Goodlife Photography'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-adventurer-text mt-4">
            {t.portfolio.heading}
          </h2>
          <p className="text-adventurer-text/40 mt-4 max-w-xl mx-auto">
            {language === 'de'
              ? 'Event, Business, Wasser & Reisefotografie seit 2020'
              : 'Event, Business, Water & Travel Photography since 2020'}
          </p>
        </motion.div>

        {/* Photography Categories with AnimatedFolder */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-display font-bold text-adventurer-text mb-8 text-center"
          >
            {language === 'de' ? 'Fotografie Kategorien' : 'Photography Categories'}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {photographyCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AnimatedFolder
                  title={language === 'de' ? category.titleDe : category.title}
                  projects={category.projects}
                  variant="adventurer"
                  className="w-full"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-display font-bold text-adventurer-text mb-8 text-center">
            {language === 'de' ? 'Featured Projekte' : 'Featured Projects'}
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(project)}
              language={language}
            />
          ))}
        </div>

        {/* View all projects link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 text-adventurer-accent text-lg font-medium group"
          >
            <span>{language === 'de' ? 'Alle Projekte ansehen' : 'View All Projects'}</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            language={language}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
