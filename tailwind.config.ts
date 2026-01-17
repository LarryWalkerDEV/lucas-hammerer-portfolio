import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // V1: Explorer - Warm & Earthy
        explorer: {
          primary: '#C4704A',
          secondary: '#2D4739',
          background: '#FAF7F2',
          accent: '#E8B86D',
          text: '#2C2416',
        },
        // V2: Scientist - Clean & Minimal
        scientist: {
          primary: '#1A1A2E',
          secondary: '#4A90A4',
          background: '#FFFFFF',
          accent: '#E94560',
          text: '#16213E',
        },
        // V3: Adventurer - Dark & Cinematic
        adventurer: {
          primary: '#0A0A0A',
          secondary: '#1A1A1A',
          accent: '#FF6B35',
          highlight: '#00D4AA',
          text: '#F5F5F5',
        },
        // V4: Facilitator - Organic & Flowing
        facilitator: {
          primary: '#2C5F6E',
          secondary: '#7FCDCD',
          accent: '#E07A5F',
          text: '#264653',
        },
        // V5: Minimalist - Clean & Elegant
        minimalist: {
          background: '#FAFAF8',
          surface: '#FFFFFF',
          primary: '#1A1A1A',
          secondary: '#6B6B6B',
          accent: '#2D2D2D',
          border: '#E8E8E8',
          muted: '#9A9A9A',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'breathe': 'breathe 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
