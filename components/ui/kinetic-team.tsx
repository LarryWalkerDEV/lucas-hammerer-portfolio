'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  description?: string;
  bio?: string;
  social?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface KineticTeamProps {
  members: TeamMember[];
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}

const variantStyles = {
  explorer: {
    bg: 'bg-explorer-background',
    text: 'text-explorer-text',
    accent: 'text-explorer-primary',
    card: 'bg-explorer-background/50',
    border: 'border-explorer-primary/20',
  },
  scientist: {
    bg: 'bg-scientist-background',
    text: 'text-scientist-text',
    accent: 'text-scientist-secondary',
    card: 'bg-scientist-background/50',
    border: 'border-scientist-primary/10',
  },
  adventurer: {
    bg: 'bg-adventurer-primary',
    text: 'text-adventurer-text',
    accent: 'text-adventurer-accent',
    card: 'bg-adventurer-secondary/50',
    border: 'border-adventurer-accent/20',
  },
  facilitator: {
    bg: 'bg-facilitator-primary/5',
    text: 'text-facilitator-text',
    accent: 'text-facilitator-primary',
    card: 'bg-facilitator-secondary/10',
    border: 'border-facilitator-primary/20',
  },
};

export function KineticTeam({
  members,
  title = 'The Team',
  subtitle,
  className,
  variant = 'adventurer'
}: KineticTeamProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const styles = variantStyles[variant];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative min-h-screen w-full cursor-default px-6 py-24 md:px-12',
        styles.bg,
        styles.text,
        className
      )}
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />

      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="text-4xl font-light tracking-tighter sm:text-6xl md:text-7xl">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'opacity-40' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h2>
          </div>
          <div className="h-px flex-1 bg-current/10 mx-8 hidden md:block" />
          {subtitle && (
            <p className="text-xs font-medium uppercase tracking-[0.3em] opacity-50">
              {subtitle}
            </p>
          )}
        </motion.header>

        {/* The List */}
        <div className="flex flex-col">
          {members.map((member, index) => (
            <TeamRow
              key={member.id ?? member.name}
              data={member}
              index={index}
              isActive={activeId === (member.id ?? member.name)}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
              variant={variant}
            />
          ))}
        </div>
      </div>

      {/* Desktop Floating Cursor Image */}
      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {activeId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative h-64 w-80 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl"
              >
                <Image
                  src={members.find((t) => (t.id ?? t.name) === activeId)?.image || ''}
                  alt="Preview"
                  fill
                  className="object-cover"
                />

                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-white/80">Active</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function TeamRow({
  data,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
  variant,
}: {
  data: TeamMember;
  index: number;
  isActive: boolean;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
  isAnyActive: boolean;
  variant: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}) {
  const isDimmed = isAnyActive && !isActive;
  const styles = variantStyles[variant];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        y: 0,
        backgroundColor: isActive && isMobile ? 'rgba(255,255,255,0.03)' : 'transparent',
      }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => !isMobile && setActiveId(data.id ?? data.name)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={() => isMobile && setActiveId(isActive ? null : (data.id ?? data.name))}
      className={cn(
        'group relative border-t transition-colors duration-500 last:border-b',
        styles.border,
        isMobile ? 'cursor-pointer' : 'cursor-default'
      )}
    >
      <div className="relative z-10 flex flex-col py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex items-baseline gap-6 md:gap-12 pl-4 md:pl-0 transition-transform duration-500 group-hover:translate-x-4">
          <span className="font-mono text-xs opacity-50">
            0{index + 1}
          </span>
          <h3 className={cn(
            'text-3xl font-medium tracking-tight transition-colors duration-300 md:text-6xl',
            'opacity-70 group-hover:opacity-100'
          )}>
            {data.name}
          </h3>
        </div>

        <div className="mt-4 flex items-center justify-between pl-12 pr-4 md:mt-0 md:justify-end md:gap-12 md:pl-0 md:pr-0">
          <span className={cn(
            'text-xs font-medium uppercase tracking-[0.2em] opacity-50 transition-opacity group-hover:opacity-80',
            styles.accent
          )}>
            {data.role}
          </span>

          {/* Mobile Toggle */}
          <div className="block md:hidden opacity-50">
            {isActive ? <Minus size={18} /> : <Plus size={18} />}
          </div>

          {/* Desktop Arrow */}
          <motion.div
            animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
            className={cn('hidden md:block', styles.accent)}
          >
            <ArrowUpRight size={28} strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* Mobile Accordion */}
      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-black/5"
          >
            <div className="p-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={data.image}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs uppercase tracking-widest text-white">View Profile</p>
                </div>
              </div>
              {data.description && (
                <p className="mt-4 text-sm opacity-70">{data.description}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default KineticTeam;
