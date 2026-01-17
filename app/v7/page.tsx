'use client'

import { Hero } from '@/components/v7/Hero'
import { About } from '@/components/v7/About'
import { Services } from '@/components/v7/Services'
import { Career } from '@/components/v7/Career'
import { Contact } from '@/components/v7/Contact'
import { Footer } from '@/components/shared/Footer'
import { Navigation } from '@/components/shared/Navigation'

export default function ModernProfessionalPage() {
  return (
    <div className="bg-[#1a1a2e] min-h-screen">
      <Navigation variant="professional" />
      <main>
        <Hero />
        <About />
        <Services />
        <Career />
        <Contact />
      </main>
      <Footer variant="professional" />
    </div>
  )
}
