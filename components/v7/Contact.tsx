'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Instagram, Linkedin, Mail, MapPin, ExternalLink, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/components/shared/LanguageSwitcher'
import { translations } from '@/lib/i18n'

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/lukegoodlife', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/in/lucashammerer', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@lucas-hammerer.at', label: 'Email' },
]

const services = ['Breathwork', 'Real Estate Photography', 'Portrait Photography', 'Business Consulting', 'Other']
const servicesDe = ['Breathwork', 'Immobilienfotografie', 'Portrait Fotografie', 'Business Consulting', 'Sonstiges']

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    service: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const language = useLanguage()
  const t = translations[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormState({ name: '', email: '', message: '', service: '' })
  }

  const currentServices = language === 'de' ? servicesDe : services

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0f0f1a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-[#d4af37]/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-[#d4af37]/3 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block text-[#d4af37] uppercase tracking-[0.25em] text-sm font-medium mb-4"
          >
            {language === 'de' ? 'Kontakt' : 'Contact'}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4"
          >
            {t.contact.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-white/50 max-w-xl mx-auto"
          >
            {language === 'de'
              ? 'Bereit fur den nachsten Schritt? Ich freue mich auf Ihre Nachricht.'
              : 'Ready for the next step? I look forward to hearing from you.'}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-[#d4af37]/20 flex items-center justify-center mx-auto mb-4"
                >
                  <Send className="w-8 h-8 text-[#d4af37]" />
                </motion.div>
                <p className="text-2xl font-semibold text-white mb-2">
                  {language === 'de' ? 'Nachricht gesendet!' : 'Message Sent!'}
                </p>
                <p className="text-white/60">
                  {language === 'de'
                    ? 'Ich melde mich in Kurze bei Ihnen.'
                    : "I'll get back to you shortly."}
                </p>
              </motion.div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#d4af37]/20 text-white placeholder:text-white/30 focus:border-[#d4af37] focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#d4af37]/20 text-white placeholder:text-white/30 focus:border-[#d4af37] focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    {t.contact.service}
                  </label>
                  <select
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#d4af37]/20 text-white focus:border-[#d4af37] focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#1a1a2e]">{t.contact.selectService}</option>
                    {currentServices.map((service) => (
                      <option key={service} value={service} className="bg-[#1a1a2e]">{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#d4af37]/20 text-white placeholder:text-white/30 focus:border-[#d4af37] focus:outline-none transition-colors resize-none"
                    placeholder={language === 'de' ? 'Ihre Nachricht...' : 'Your message...'}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3',
                    'bg-[#d4af37] text-[#1a1a2e] hover:bg-[#d4af37]/90',
                    isSubmitting && 'opacity-70 cursor-not-allowed'
                  )}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-[#1a1a2e]/30 border-t-[#1a1a2e] rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.contact.submit}
                    </>
                  )}
                </motion.button>
              </>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Quick contact cards */}
            <div className="space-y-4">
              <motion.a
                href="mailto:contact@lucas-hammerer.at"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-colors group"
                whileHover={{ x: 4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">Email</p>
                  <p className="text-white font-medium">contact@lucas-hammerer.at</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-[#d4af37]/10"
                whileHover={{ x: 4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">{language === 'de' ? 'Standort' : 'Location'}</p>
                  <p className="text-white font-medium">Graz, Austria</p>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-white font-medium mb-4">
                {language === 'de' ? 'Folge mir' : 'Follow Me'}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-[#d4af37]/10 flex items-center justify-center text-white/60 hover:text-[#d4af37] hover:border-[#d4af37]/30 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/20">
              <h3 className="text-white font-medium mb-4">
                {language === 'de' ? 'Schnellzugriff' : 'Quick Links'}
              </h3>
              <div className="space-y-3">
                <motion.a
                  href="https://immobilien-fotograf.wien"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-[#d4af37] transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">immobilien-fotograf.wien</span>
                </motion.a>
                <motion.a
                  href="https://lucas-hammerer.at"
                  className="flex items-center gap-3 text-white/70 hover:text-[#d4af37] transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">lucas-hammerer.at</span>
                </motion.a>
              </div>
            </div>

            {/* Availability note */}
            <motion.div
              className="flex items-center gap-3 text-white/50 text-sm"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>
                {language === 'de'
                  ? 'Verfugbar fur neue Projekte'
                  : 'Available for new projects'}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
