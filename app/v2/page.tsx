'use client'

import { Navigation } from '@/components/shared/Navigation'
import { ContactSection } from '@/components/shared/ContactSection'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/v2/Hero'
import { Credentials } from '@/components/v2/Credentials'
import { About } from '@/components/v2/About'
import { ExpertiseCards } from '@/components/v2/ExpertiseCards'
import { CareerTimeline } from '@/components/v2/CareerTimeline'
import { Portfolio } from '@/components/v2/Portfolio'
import { Services } from '@/components/v2/Services'

export default function ScientistPage() {
  return (
    <div className="theme-scientist bg-scientist-background min-h-screen">
      <Navigation variant="scientist" />
      <main>
        <Hero />
        <Credentials />
        <About />
        <ExpertiseCards />
        <CareerTimeline />
        <Portfolio />
        <div className="bg-scientist-primary/5">
          <Services />
        </div>
        <ContactSection variant="scientist" />
      </main>
      <Footer variant="scientist" />
    </div>
  )
}
