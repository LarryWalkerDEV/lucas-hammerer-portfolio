'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { useLanguage } from '@/components/shared/LanguageSwitcher'

export function BreathworkFocus() {
  const language = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [seconds, setSeconds] = useState(0)

  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 4,
  }

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const currentDuration = phaseDurations[phase]
        if (prev >= currentDuration - 1) {
          // Move to next phase
          if (phase === 'inhale') setPhase('hold')
          else if (phase === 'hold') setPhase('exhale')
          else setPhase('inhale')
          return 0
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, phase])

  const reset = () => {
    setIsPlaying(false)
    setPhase('inhale')
    setSeconds(0)
  }

  const phaseText = {
    inhale: language === 'de' ? 'Einatmen' : 'Breathe In',
    hold: language === 'de' ? 'Halten' : 'Hold',
    exhale: language === 'de' ? 'Ausatmen' : 'Breathe Out',
  }

  return (
    <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-white to-[#F0F7F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-facilitator-accent uppercase tracking-[0.2em] text-sm font-medium">
            {language === 'de' ? 'Atemarbeit' : 'Breathwork'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-facilitator-text mt-4">
            {language === 'de' ? 'Erlebe die Kraft des Atems' : 'Experience the Power of Breath'}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Breathing guide */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Breathing circle */}
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-facilitator-secondary/30"
                animate={{
                  scale: isPlaying
                    ? phase === 'inhale'
                      ? [1, 1.2]
                      : phase === 'exhale'
                      ? [1.2, 1]
                      : 1.2
                    : 1,
                }}
                transition={{ duration: phaseDurations[phase], ease: 'easeInOut' }}
              />

              {/* Inner circle */}
              <motion.div
                className="absolute inset-8 rounded-full bg-gradient-to-br from-facilitator-primary to-facilitator-secondary flex items-center justify-center"
                animate={{
                  scale: isPlaying
                    ? phase === 'inhale'
                      ? [0.8, 1]
                      : phase === 'exhale'
                      ? [1, 0.8]
                      : 1
                    : 0.9,
                }}
                transition={{ duration: phaseDurations[phase], ease: 'easeInOut' }}
              >
                <div className="text-center text-white">
                  <motion.p
                    key={phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-medium uppercase tracking-wider"
                  >
                    {phaseText[phase]}
                  </motion.p>
                  <p className="text-4xl font-bold mt-2">
                    {phaseDurations[phase] - seconds}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-8">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-facilitator-accent text-white flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </motion.button>
              <motion.button
                onClick={reset}
                className="w-10 h-10 rounded-full bg-facilitator-primary/10 text-facilitator-primary flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                title: language === 'de' ? 'Goodlife Breathing' : 'Goodlife Breathing',
                description: language === 'de'
                  ? 'Wissenschaftlich fundierte Atemtechniken kombiniert mit elektronischer Musik für tiefe meditative Zustände.'
                  : 'Scientifically-grounded breathing techniques combined with electronic music for deep meditative states.',
              },
              {
                title: language === 'de' ? 'Eisbaden Graz' : 'Ice Bathing Graz',
                description: language === 'de'
                  ? 'Wöchentliche Community-Treffen an der Mur zur Stärkung des Immunsystems und Stressresistenz.'
                  : 'Weekly community meetings at the Mur river to strengthen immune system and stress resistance.',
              },
              {
                title: language === 'de' ? 'Corporate Wellness' : 'Corporate Wellness',
                description: language === 'de'
                  ? 'Maßgeschneiderte Workshops für Unternehmen zur Förderung von Gesundheit und Produktivität.'
                  : 'Tailored workshops for companies to promote health and productivity.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-facilitator-primary/10 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-facilitator-text mb-2">
                  {item.title}
                </h3>
                <p className="text-facilitator-text/60">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
