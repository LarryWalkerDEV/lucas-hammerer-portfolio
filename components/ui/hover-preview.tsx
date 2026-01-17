'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface PreviewData {
  [key: string]: {
    image: string;
    title: string;
    subtitle: string;
  };
}

interface HoverLinkProps {
  previewKey: string;
  children: React.ReactNode;
  onHoverStart: (key: string, e: React.MouseEvent) => void;
  onHoverMove: (e: React.MouseEvent) => void;
  onHoverEnd: () => void;
  className?: string;
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}

interface HoverPreviewProps {
  previewData: PreviewData;
  children: (HoverLink: React.FC<Omit<HoverLinkProps, 'onHoverStart' | 'onHoverMove' | 'onHoverEnd'>>) => React.ReactNode;
  className?: string;
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}

const variantStyles = {
  explorer: {
    container: 'bg-explorer-background',
    link: 'text-explorer-primary hover:text-explorer-secondary',
    underline: 'bg-gradient-to-r from-explorer-primary via-explorer-accent to-explorer-secondary',
    card: 'bg-explorer-background border-explorer-primary/20',
    title: 'text-explorer-text',
    subtitle: 'text-explorer-text/60',
  },
  scientist: {
    container: 'bg-scientist-background',
    link: 'text-scientist-primary hover:text-scientist-secondary',
    underline: 'bg-gradient-to-r from-scientist-primary via-scientist-accent to-scientist-secondary',
    card: 'bg-white border-scientist-primary/10',
    title: 'text-scientist-text',
    subtitle: 'text-scientist-text/60',
  },
  adventurer: {
    container: 'bg-adventurer-primary',
    link: 'text-adventurer-text hover:text-adventurer-accent',
    underline: 'bg-gradient-to-r from-adventurer-accent via-adventurer-highlight to-adventurer-accent',
    card: 'bg-adventurer-secondary border-adventurer-accent/20',
    title: 'text-adventurer-text',
    subtitle: 'text-adventurer-text/60',
  },
  facilitator: {
    container: 'bg-facilitator-primary/5',
    link: 'text-facilitator-primary hover:text-facilitator-accent',
    underline: 'bg-gradient-to-r from-facilitator-primary via-facilitator-accent to-facilitator-secondary',
    card: 'bg-white border-facilitator-primary/20',
    title: 'text-facilitator-text',
    subtitle: 'text-facilitator-text/60',
  },
};

function HoverLink({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  className,
  variant = 'adventurer',
}: HoverLinkProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={cn(
        'font-bold cursor-pointer relative inline-block transition-colors duration-300',
        'after:content-[\'\'] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:transition-[width] after:duration-400 after:ease-out',
        'hover:after:w-full',
        styles.link,
        className
      )}
      style={{
        '--underline-gradient': styles.underline,
      } as React.CSSProperties}
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
      <span
        className={cn(
          'absolute bottom-[-2px] left-0 w-0 h-[2px] transition-[width] duration-400 ease-out group-hover:w-full',
          styles.underline
        )}
      />
    </span>
  );
}

function PreviewCard({
  data,
  position,
  isVisible,
  cardRef,
  variant = 'adventurer',
}: {
  data: { image: string; title: string; subtitle: string } | null;
  position: { x: number; y: number };
  isVisible: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}) {
  const styles = variantStyles[variant];

  if (!data) return null;

  return (
    <motion.div
      ref={cardRef}
      className="fixed pointer-events-none z-[1000]"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 10,
        scale: isVisible ? 1 : 0.95,
      }}
      transition={{ duration: 0.25, type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div
        className={cn(
          'rounded-2xl p-2 shadow-2xl backdrop-blur-md border',
          styles.card
        )}
      >
        <img
          src={data.image}
          alt={data.title}
          className="w-[280px] h-auto rounded-xl block"
          crossOrigin="anonymous"
        />
        <div className={cn('px-2 pt-3 pb-2 text-sm font-semibold', styles.title)}>
          {data.title}
        </div>
        <div className={cn('px-2 pb-2 text-xs', styles.subtitle)}>
          {data.subtitle}
        </div>
      </div>
    </motion.div>
  );
}

export function HoverPreview({
  previewData,
  children,
  className,
  variant = 'adventurer',
}: HoverPreviewProps) {
  const [activePreview, setActivePreview] = useState<{
    image: string;
    title: string;
    subtitle: string;
  } | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Preload images
  useEffect(() => {
    Object.values(previewData).forEach((data) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = data.image;
    });
  }, [previewData]);

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 300;
    const cardHeight = 250;
    const offsetY = 20;

    let x = e.clientX - cardWidth / 2;
    let y = e.clientY - cardHeight - offsetY;

    // Keep on screen
    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20;
    }
    if (x < 20) {
      x = 20;
    }
    if (y < 20) {
      y = e.clientY + offsetY;
    }

    setPosition({ x, y });
  }, []);

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      setActivePreview(previewData[key]);
      setIsVisible(true);
      updatePosition(e);
    },
    [previewData, updatePosition]
  );

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e);
      }
    },
    [isVisible, updatePosition]
  );

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false);
  }, []);

  const HoverLinkWithHandlers: React.FC<Omit<HoverLinkProps, 'onHoverStart' | 'onHoverMove' | 'onHoverEnd'>> = (props) => (
    <HoverLink
      {...props}
      onHoverStart={handleHoverStart}
      onHoverMove={handleHoverMove}
      onHoverEnd={handleHoverEnd}
      variant={variant}
    />
  );

  return (
    <div className={cn('relative', className)}>
      {children(HoverLinkWithHandlers)}
      <PreviewCard
        data={activePreview}
        position={position}
        isVisible={isVisible}
        cardRef={cardRef}
        variant={variant}
      />
    </div>
  );
}

export default HoverPreview;
