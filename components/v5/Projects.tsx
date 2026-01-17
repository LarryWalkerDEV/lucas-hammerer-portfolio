'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowRight, Camera, Wind, Home, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'

interface Project {
  id: string
  title: { en: string; de: string }
  description: { en: string; de: string }
  category: string
  year: string
  link?: string
  featured?: boolean
  icon: React.ElementType
}

const projects: Project[] = [
  {
    id: 'immobilien',
    title: {
      en: 'immobilien-fotograf.wien',
      de: 'immobilien-fotograf.wien',
    },
    description: {
      en: 'Professional real estate photography & 360 virtual tours in Vienna. Selling properties faster with high-quality visualization.',
      de: 'Professionelle Immobilienfotografie & 360 Virtuelle Touren in Wien. Schneller verkaufen mit hochwertiger Visualisierung.',
    },
    category: 'Real Estate Photography',
    year: '2026',
    link: 'https://immobilien-fotograf.wien',
    featured: true,
    icon: Home,
  },
  {
    id: 'goodlife',
    title: {
      en: 'Goodlife Breathing',
      de: 'Goodlife Breathing',
    },
    description: {
      en: 'Explore your full potential through Breathwork. Combining ancient breathing techniques with modern science and electronic music.',
      de: 'Entdecke dein volles Potenzial durch Breathwork. Alte Atemtechniken mit moderner Wissenschaft und elektronischer Musik.',
    },
    category: 'Breathwork',
    year: '2021+',
    link: 'https://goodlife-breathing.com',
    featured: true,
    icon: Wind,
  },
  {
    id: 'lukegoodlife',
    title: {
      en: 'Luke Goodlife Photography',
      de: 'Luke Goodlife Fotografie',
    },
    description: {
      en: 'Event, business, water, and travel photography. AI-enhanced business photography services since 2020.',
      de: 'Event-, Business-, Wasser- und Reisefotografie. KI-gestutzte Business-Fotografie seit 2020.',
    },
    category: 'Photography',
    year: '2020+',
    link: 'https://lukegoodlife.com',
    icon: Camera,
  },
]

function ProjectCard({ project, isActive, onClick, language }: {
  project: Project
  isActive: boolean
  onClick: () => void
  language: 'en' | 'de'
}) {
  const Icon = project.icon

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-500 ${
        isActive ? 'col-span-full' : ''
      }`}
    >
      <motion.div
        layout
        className={`border border-minimalist-border bg-minimalist-surface p-6 md:p-8 ${
          isActive ? 'md:flex md:gap-12 md:items-center' : ''
        }`}
      >
        {/* Header */}
        <motion.div layout="position" className={isActive ? 'md:w-1/3' : ''}>
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 border border-minimalist-border flex items-center justify-center">
              <Icon className="w-5 h-5 text-minimalist-primary" />
            </div>
            {project.featured && (
              <span className="text-xs tracking-wider uppercase text-minimalist-muted border border-minimalist-border px-2 py-1">
                {language === 'de' ? 'Neu' : 'New'}
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-display font-light text-minimalist-primary mb-2">
            {project.title[language]}
          </h3>

          <div className="flex items-center gap-3 text-xs text-minimalist-muted mb-4">
            <span>{project.category}</span>
            <span className="w-1 h-1 bg-minimalist-muted rounded-full" />
            <span>{project.year}</span>
          </div>
        </motion.div>

        {/* Expanded content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:flex-1"
            >
              <p className="text-minimalist-secondary leading-relaxed mb-6">
                {project.description[language]}
              </p>

              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-minimalist-primary font-medium group"
                  whileHover={{ x: 4 }}
                >
                  <span className="border-b border-minimalist-primary pb-0.5">
                    {language === 'de' ? 'Website besuchen' : 'Visit Website'}
                  </span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse indicator */}
        {!isActive && (
          <motion.div
            layout
            className="flex items-center gap-2 text-minimalist-muted text-sm mt-4"
          >
            <span>{language === 'de' ? 'Mehr erfahren' : 'Learn more'}</span>
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const language = useLanguage()
  const [activeProject, setActiveProject] = useState<string | null>('immobilien')

  const handleProjectClick = (id: string) => {
    setActiveProject(activeProject === id ? null : id)
  }

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-minimalist-background">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-minimalist-muted text-xs tracking-[0.3em] uppercase block mb-4">
            {language === 'de' ? 'Projekte' : 'Projects'}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-minimalist-primary">
            {language === 'de' ? 'Aktuelle Arbeiten' : 'Current Work'}
          </h2>
        </motion.div>

        {/* Project cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={activeProject === project.id ? 'col-span-full' : ''}
            >
              <ProjectCard
                project={project}
                isActive={activeProject === project.id}
                onClick={() => handleProjectClick(project.id)}
                language={language}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Featured project highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 border border-minimalist-border bg-minimalist-surface p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-minimalist-muted block mb-2">
                {language === 'de' ? 'Neues Projekt 2026' : 'New Project 2026'}
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-light text-minimalist-primary mb-2">
                immobilien-fotograf.wien
              </h3>
              <p className="text-minimalist-secondary max-w-lg">
                {language === 'de'
                  ? '360 Virtuelle Touren, Drohnenfotografie & professionelle Immobilienfotografie in Wien und Umgebung.'
                  : '360 Virtual Tours, Drone Photography & Professional Real Estate Photography in Vienna and surroundings.'
                }
              </p>
            </div>
            <motion.a
              href="https://immobilien-fotograf.wien"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-minimalist-primary text-minimalist-background font-medium group whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{language === 'de' ? 'Zur Website' : 'Visit Website'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
