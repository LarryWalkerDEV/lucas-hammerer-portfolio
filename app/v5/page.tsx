'use client'

import { Navigation } from '@/components/shared/Navigation'
import { ContactSection } from '@/components/shared/ContactSection'
import { Footer } from '@/components/shared/Footer'
import { Hero } from '@/components/v5/Hero'
import { About } from '@/components/v5/About'
import { Projects } from '@/components/v5/Projects'

export default function MinimalistPage() {
  return (
    <div className="bg-minimalist-background min-h-screen">
      <Navigation variant="explorer" className="!bg-minimalist-background/95 [&_*]:!text-minimalist-primary" />
      <main>
        <Hero />
        <About />
        <Projects />
        <ContactSection variant="explorer" className="!bg-minimalist-surface [&_*]:!text-minimalist-primary [&_input]:!bg-minimalist-background [&_input]:!border-minimalist-border [&_textarea]:!bg-minimalist-background [&_textarea]:!border-minimalist-border [&_select]:!bg-minimalist-background [&_select]:!border-minimalist-border [&_button[type='submit']]:!bg-minimalist-primary" />
      </main>
      <Footer variant="explorer" className="!bg-minimalist-primary [&_*]:!text-minimalist-background" />
    </div>
  )
}
