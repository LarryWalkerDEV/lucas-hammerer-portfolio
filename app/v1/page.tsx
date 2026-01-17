'use client'

import { Navigation } from '@/components/shared/Navigation'
import { ContactSection } from '@/components/shared/ContactSection'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/v1/Hero'
import { Introduction } from '@/components/v1/Introduction'
import { ThreePillars } from '@/components/v1/ThreePillars'
import { Journey } from '@/components/v1/Journey'
import { Services } from '@/components/v1/Services'
import { Projects } from '@/components/v1/Projects'
import { Testimonials } from '@/components/v1/Testimonials'

export default function ExplorerPage() {
  return (
    <div className="theme-explorer bg-explorer-background min-h-screen">
      <Navigation variant="explorer" />
      <main>
        <Hero />
        <Introduction />
        <ThreePillars />
        <Services />
        <Projects />
        <Journey />
        <Testimonials />
        <ContactSection variant="explorer" />
      </main>
      <Footer variant="explorer" />
    </div>
  )
}
