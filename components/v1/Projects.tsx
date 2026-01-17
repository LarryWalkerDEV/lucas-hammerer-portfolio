'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { AnimatedFolder, type FolderProject } from '@/components/ui/animated-folder'
import { HoverPreview, type PreviewData } from '@/components/ui/hover-preview'
import { ExternalLink, ArrowRight } from 'lucide-react'

const projectFolders = {
  en: [
    {
      title: 'Goodlife Breathing',
      projects: [
        {
          id: 'glb-1',
          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
          title: 'TED AI Vienna Workshop',
          description: 'Breathwork session combining science and electronic music',
        },
        {
          id: 'glb-2',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
          title: 'Corporate Wellness',
          description: 'Team breathwork sessions for peak performance',
        },
        {
          id: 'glb-3',
          image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
          title: 'Private Sessions',
          description: 'One-on-one breathwork coaching',
        },
      ],
    },
    {
      title: 'Real Estate Photography',
      projects: [
        {
          id: 'immo-1',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
          title: '360° Virtual Tours',
          description: 'Immersive property visualization',
          href: 'https://www.immobilien-fotograf.wien/',
        },
        {
          id: 'immo-2',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
          title: 'Luxury Properties',
          description: 'High-end real estate photography',
        },
        {
          id: 'immo-3',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
          title: 'Drone Shots',
          description: 'Aerial property perspectives',
        },
      ],
    },
    {
      title: 'Adventure Photography',
      projects: [
        {
          id: 'adv-1',
          image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop',
          title: 'Surf Retreats',
          description: 'Capturing ocean adventures',
        },
        {
          id: 'adv-2',
          image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
          title: 'Mountain Expeditions',
          description: 'Alpine adventure documentation',
        },
        {
          id: 'adv-3',
          image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop',
          title: 'Ice Bathing Events',
          description: 'Cold exposure experiences',
        },
      ],
    },
  ],
  de: [
    {
      title: 'Goodlife Breathing',
      projects: [
        {
          id: 'glb-1',
          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
          title: 'TED AI Wien Workshop',
          description: 'Atemsession mit Wissenschaft und elektronischer Musik',
        },
        {
          id: 'glb-2',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
          title: 'Firmen-Wellness',
          description: 'Team-Atemsessions für Höchstleistung',
        },
        {
          id: 'glb-3',
          image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
          title: 'Einzelsitzungen',
          description: 'Persönliches Atemcoaching',
        },
      ],
    },
    {
      title: 'Immobilienfotografie',
      projects: [
        {
          id: 'immo-1',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
          title: '360° Virtuelle Touren',
          description: 'Immersive Immobilienvisualisierung',
          href: 'https://www.immobilien-fotograf.wien/',
        },
        {
          id: 'immo-2',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
          title: 'Luxusimmobilien',
          description: 'Hochwertige Immobilienfotografie',
        },
        {
          id: 'immo-3',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
          title: 'Drohnenaufnahmen',
          description: 'Luftaufnahmen von Immobilien',
        },
      ],
    },
    {
      title: 'Abenteuerfotografie',
      projects: [
        {
          id: 'adv-1',
          image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=300&fit=crop',
          title: 'Surf-Retreats',
          description: 'Ozean-Abenteuer einfangen',
        },
        {
          id: 'adv-2',
          image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
          title: 'Bergexpeditionen',
          description: 'Alpine Abenteuer-Dokumentation',
        },
        {
          id: 'adv-3',
          image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop',
          title: 'Eisbaden Events',
          description: 'Kälte-Erfahrungen',
        },
      ],
    },
  ],
}

const previewDataEn: PreviewData = {
  breathwork: {
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=200&fit=crop',
    title: 'Goodlife Breathing',
    subtitle: 'Science-backed breathwork for peak performance',
  },
  photography: {
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop',
    title: 'Immobilien-Fotograf Wien',
    subtitle: '360° tours & professional real estate photography',
  },
  speaking: {
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=200&fit=crop',
    title: 'TED AI Vienna',
    subtitle: 'Transformative breathwork workshops',
  },
}

const previewDataDe: PreviewData = {
  breathwork: {
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=200&fit=crop',
    title: 'Goodlife Breathing',
    subtitle: 'Wissenschaftlich fundierte Atemarbeit für Höchstleistung',
  },
  photography: {
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop',
    title: 'Immobilien-Fotograf Wien',
    subtitle: '360° Touren & professionelle Immobilienfotografie',
  },
  speaking: {
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=200&fit=crop',
    title: 'TED AI Wien',
    subtitle: 'Transformative Atemworkshops',
  },
}

export function Projects() {
  const language = useLanguage()
  const folders = language === 'de' ? projectFolders.de : projectFolders.en
  const previewData = language === 'de' ? previewDataDe : previewDataEn

  return (
    <section id="projects" className="py-20 md:py-32 bg-explorer-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-explorer-primary uppercase tracking-[0.2em] text-sm font-medium">
            {language === 'de' ? 'Projekte' : 'Projects'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-explorer-text mt-4">
            {language === 'de' ? 'Aktuelle Arbeiten' : 'Current Work'}
          </h2>

          {/* Hover preview text */}
          <HoverPreview previewData={previewData} variant="explorer" className="mt-6">
            {(HoverLink) => (
              <p className="text-explorer-text/70 text-lg max-w-2xl mx-auto">
                {language === 'de' ? (
                  <>
                    Von <HoverLink previewKey="breathwork">Atemarbeit</HoverLink> über{' '}
                    <HoverLink previewKey="photography">Immobilienfotografie</HoverLink> bis hin zu{' '}
                    <HoverLink previewKey="speaking">Vorträgen</HoverLink> — entdecken Sie meine vielfältigen Projekte.
                  </>
                ) : (
                  <>
                    From <HoverLink previewKey="breathwork">breathwork</HoverLink> to{' '}
                    <HoverLink previewKey="photography">real estate photography</HoverLink> to{' '}
                    <HoverLink previewKey="speaking">speaking</HoverLink> — explore my diverse projects.
                  </>
                )}
              </p>
            )}
          </HoverPreview>
        </motion.div>

        {/* Project Folders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {folders.map((folder, index) => (
            <motion.div
              key={folder.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <AnimatedFolder
                title={folder.title}
                projects={folder.projects}
                variant="explorer"
              />
            </motion.div>
          ))}
        </div>

        {/* Featured Project: Immobilien-Fotograf */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-explorer-primary/10 via-explorer-background to-explorer-secondary/10 border border-explorer-primary/20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23C4704A%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

            <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 text-explorer-accent text-sm font-medium uppercase tracking-wider mb-4"
                >
                  <span className="w-8 h-px bg-explorer-accent" />
                  {language === 'de' ? 'Neues Projekt 2026' : 'New Project 2026'}
                </motion.span>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-display font-bold text-explorer-text mb-4"
                >
                  Immobilien-Fotograf Wien
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-explorer-text/70 mb-6 leading-relaxed"
                >
                  {language === 'de'
                    ? 'Professionelle 360° Virtuelle Touren und Immobilienfotografie in Wien. Schneller verkaufen mit hochwertiger Visualisierung — durchschnittlich 73% kürzere Verkaufszeit.'
                    : 'Professional 360° Virtual Tours and real estate photography in Vienna. Sell faster with high-quality visualization — averaging 73% faster sales time.'}
                </motion.p>

                <ul className="space-y-3 mb-8">
                  {[
                    language === 'de' ? '360° Virtuelle Touren (Matterport-Style)' : '360° Virtual Tours (Matterport-Style)',
                    language === 'de' ? 'Drohnen- & Twilight-Fotografie' : 'Drone & Twilight Photography',
                    language === 'de' ? '3D Grundrisse & Virtual Staging' : '3D Floor Plans & Virtual Staging',
                  ].map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3 text-explorer-text/80"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-explorer-primary" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href="https://www.immobilien-fotograf.wien/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-explorer-primary text-white px-6 py-3 rounded-full font-medium hover:bg-explorer-primary/90 transition-all group w-fit"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {language === 'de' ? 'Website besuchen' : 'Visit Website'}
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
                    alt="Real Estate Photography"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Stats overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    {[
                      { value: '73%', label: language === 'de' ? 'Schneller' : 'Faster' },
                      { value: '48h', label: language === 'de' ? 'Lieferung' : 'Delivery' },
                      { value: '95%', label: language === 'de' ? 'Zufrieden' : 'Satisfied' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-white/80">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-explorer-accent text-explorer-text px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  Vienna, Austria 🇦🇹
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
