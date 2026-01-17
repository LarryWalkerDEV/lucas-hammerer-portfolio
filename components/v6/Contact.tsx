'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'
import {
  Send,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Check,
  Camera,
  Wind,
  Building2,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

// Service selection card
function ServiceCard({
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
  color,
}: {
  icon: typeof Camera
  title: string
  description: string
  isSelected: boolean
  onClick: () => void
  color: string
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full p-4 rounded-xl border text-left transition-all duration-300 ${
        isSelected
          ? 'bg-white/10 border-amber-400/50'
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isSelected ? `bg-gradient-to-r ${color}` : 'bg-white/10'
          }`}
        >
          <Icon className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-white/60'}`} />
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${isSelected ? 'text-white' : 'text-white/80'}`}>
            {title}
          </h4>
          <p className="text-white/40 text-sm mt-1">{description}</p>
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-black" />
          </motion.div>
        )}
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          layoutId="service-selection"
          className="absolute inset-0 rounded-xl border-2 border-amber-400/50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.button>
  )
}

// Social link button
function SocialLink({
  icon: Icon,
  href,
  label,
  delay,
}: {
  icon: typeof Instagram
  href: string
  label: string
  delay: number
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all"
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
        <Icon className="w-5 h-5 text-white/60 group-hover:text-amber-400 transition-colors" />
      </div>
      <span className="text-white/70 group-hover:text-white transition-colors">{label}</span>
      <ExternalLink className="w-4 h-4 text-white/30 ml-auto group-hover:text-amber-400 transition-colors" />
    </motion.a>
  )
}

export function Contact() {
  const language = useLanguage()
  const t = translations[language]
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    service: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const services = language === 'de'
    ? [
        {
          id: 'photography',
          icon: Camera,
          title: 'Fotografie',
          description: 'Event, Business, Immobilien',
          color: 'from-amber-400 to-orange-500',
        },
        {
          id: 'breathwork',
          icon: Wind,
          title: 'Breathwork',
          description: 'Workshops & Sessions',
          color: 'from-orange-500 to-red-500',
        },
        {
          id: 'business',
          icon: Building2,
          title: 'Business',
          description: 'Kooperationen & Speaking',
          color: 'from-red-500 to-purple-500',
        },
      ]
    : [
        {
          id: 'photography',
          icon: Camera,
          title: 'Photography',
          description: 'Event, Business, Real Estate',
          color: 'from-amber-400 to-orange-500',
        },
        {
          id: 'breathwork',
          icon: Wind,
          title: 'Breathwork',
          description: 'Workshops & Sessions',
          color: 'from-orange-500 to-red-500',
        },
        {
          id: 'business',
          icon: Building2,
          title: 'Business',
          description: 'Collaborations & Speaking',
          color: 'from-red-500 to-purple-500',
        },
      ]

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/lukegoodlife', label: '@lukegoodlife' },
    { icon: Linkedin, href: 'https://linkedin.com/in/lucashammerer', label: 'Lucas Hammerer' },
    { icon: Mail, href: 'mailto:contact@lucas-hammerer.at', label: 'contact@lucas-hammerer.at' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormState({ name: '', email: '', message: '', service: '' })
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

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
            {language === 'de' ? 'Kontakt' : 'Get In Touch'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4">
            {t.contact.heading}
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto">
            {language === 'de'
              ? 'Haben Sie ein Projekt im Sinn? Lassen Sie uns daruber sprechen.'
              : 'Have a project in mind? Let\'s talk about it.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full flex flex-col items-center justify-center p-12 rounded-3xl bg-gradient-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mb-6"
                  >
                    <Check className="w-10 h-10 text-black" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {language === 'de' ? 'Nachricht gesendet!' : 'Message Sent!'}
                  </h3>
                  <p className="text-white/60 text-center mb-6">
                    {language === 'de'
                      ? 'Danke fur Ihre Nachricht. Ich melde mich bald bei Ihnen.'
                      : "Thank you for reaching out. I'll get back to you soon."}
                  </p>
                  <motion.button
                    onClick={() => setSubmitted(false)}
                    className="text-amber-400 font-medium flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <span>{language === 'de' ? 'Neue Nachricht' : 'Send Another'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Service selection */}
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-3">
                      {language === 'de' ? 'Interessiert an' : 'Interested in'}
                    </label>
                    <div className="grid gap-3">
                      {services.map((service) => (
                        <ServiceCard
                          key={service.id}
                          icon={service.icon}
                          title={service.title}
                          description={service.description}
                          color={service.color}
                          isSelected={formState.service === service.id}
                          onClick={() => setFormState({ ...formState, service: service.id })}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Name input */}
                  <div>
                    <input
                      type="text"
                      placeholder={t.contact.name}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-amber-400/50 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email input */}
                  <div>
                    <input
                      type="email"
                      placeholder={t.contact.email}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-amber-400/50 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message textarea */}
                  <div>
                    <textarea
                      placeholder={t.contact.message}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-amber-400/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold uppercase tracking-wider flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        />
                        <span>{t.contact.sending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t.contact.submit}</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Featured link */}
            <motion.a
              href="https://immobilien-fotograf.wien"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl bg-gradient-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-black" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-400 text-sm font-medium">
                      {language === 'de' ? 'Neu 2026' : 'New 2026'}
                    </span>
                  </div>
                  <h4 className="text-white font-bold">immobilien-fotograf.wien</h4>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-4">
                {language === 'de'
                  ? 'Professionelle Immobilienfotografie in Wien. HDR, virtuelle Touren, Drohnenaufnahmen.'
                  : 'Professional real estate photography in Vienna. HDR, virtual tours, drone footage.'}
              </p>
              <div className="flex items-center gap-2 text-amber-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
                <span>{language === 'de' ? 'Website besuchen' : 'Visit website'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.a>

            {/* Social links */}
            <div>
              <h4 className="text-white font-medium mb-4">
                {language === 'de' ? 'Vernetzen' : 'Connect'}
              </h4>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <SocialLink
                    key={link.label}
                    icon={link.icon}
                    href={link.href}
                    label={link.label}
                    delay={0.3 + index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Location info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-amber-400" />
                <h4 className="text-white font-medium">
                  {language === 'de' ? 'Standort' : 'Location'}
                </h4>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                {language === 'de'
                  ? 'Basiert in Graz, Osterreich. Verfugbar fur Projekte in ganz Europa und international.'
                  : 'Based in Graz, Austria. Available for projects across Europe and internationally.'}
              </p>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="https://lucas-hammerer.at"
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm hover:border-amber-400/30 hover:text-white transition-all"
              >
                lucas-hammerer.at
              </a>
              <a
                href="https://immobilien-fotograf.wien"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm hover:bg-amber-400/20 transition-all"
              >
                immobilien-fotograf.wien
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
