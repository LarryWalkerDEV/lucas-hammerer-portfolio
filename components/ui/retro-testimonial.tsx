'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RetroTestimonial {
  name: string;
  designation: string;
  description: string;
  profileImage: string;
}

interface RetroCarouselProps {
  items: React.ReactElement<{
    testimonial: RetroTestimonial;
    index: number;
    layout?: boolean;
    onCardClose?: () => void;
  }>[];
  initialScroll?: number;
  className?: string;
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}

const variantStyles = {
  explorer: {
    button: 'bg-explorer-primary hover:bg-explorer-primary/80 text-explorer-background',
    card: 'from-explorer-background to-explorer-background/80',
    text: 'text-explorer-text/70',
  },
  scientist: {
    button: 'bg-scientist-primary hover:bg-scientist-primary/80 text-white',
    card: 'from-white to-gray-50',
    text: 'text-scientist-text/70',
  },
  adventurer: {
    button: 'bg-adventurer-accent hover:bg-adventurer-accent/80 text-adventurer-primary',
    card: 'from-neutral-100 to-neutral-50',
    text: 'text-neutral-600',
  },
  facilitator: {
    button: 'bg-facilitator-primary hover:bg-facilitator-primary/80 text-white',
    card: 'from-facilitator-secondary/20 to-white',
    text: 'text-facilitator-text/70',
  },
};

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      onOutsideClick();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

export function RetroCarousel({
  items,
  initialScroll = 0,
  className,
  variant = 'explorer'
}: RetroCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const styles = variantStyles[variant];

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const isMobile = window && window.innerWidth < 768;
      const cardWidth = isMobile ? 230 : 384;
      const gap = isMobile ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className={cn('relative w-full mt-10', className)}>
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-5"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="absolute right-0 z-[100] h-auto w-[5%] overflow-hidden bg-gradient-to-l from-background to-transparent" />
        <div className="flex flex-row justify-start gap-4 pl-3 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: 'easeOut',
                },
              }}
              key={`card-${index}`}
              className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
            >
              {React.cloneElement(item, {
                onCardClose: () => handleCardClose(index),
              })}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className={cn(
            'relative z-40 h-10 w-10 rounded-full flex items-center justify-center disabled:opacity-50 transition-colors duration-200',
            styles.button
          )}
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          className={cn(
            'relative z-40 h-10 w-10 rounded-full flex items-center justify-center disabled:opacity-50 transition-colors duration-200',
            styles.button
          )}
          onClick={handleScrollRight}
          disabled={!canScrollRight}
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

interface RetroTestimonialCardProps {
  testimonial: RetroTestimonial;
  index: number;
  layout?: boolean;
  onCardClose?: () => void;
  backgroundImage?: string;
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}

export function RetroTestimonialCard({
  testimonial,
  index,
  layout = false,
  onCardClose = () => {},
  backgroundImage = 'https://images.unsplash.com/photo-1686806372726-388d03ff49c8?q=80&w=3087&auto=format&fit=crop',
  variant = 'explorer',
}: RetroTestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const styles = variantStyles[variant];

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCollapse();
      }
    };

    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    }

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 h-screen overflow-hidden z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/50 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              ref={containerRef}
              className={cn(
                'max-w-5xl mx-auto h-full z-[60] p-4 md:p-10 rounded-3xl relative md:mt-10 bg-gradient-to-b',
                styles.card
              )}
            >
              <button
                className={cn(
                  'sticky top-4 h-8 w-8 right-0 ml-auto rounded-full flex items-center justify-center',
                  styles.button
                )}
                onClick={handleCollapse}
              >
                <X className="h-6 w-6" />
              </button>
              <p className={cn('px-0 md:px-20 text-lg font-thin underline underline-offset-8', styles.text)}>
                {testimonial.designation}
              </p>
              <p className={cn('px-0 md:px-20 text-2xl md:text-4xl font-normal italic mt-4 lowercase', styles.text)}>
                {testimonial.name}
              </p>
              <div className={cn('py-8 px-0 md:px-20 text-3xl lowercase font-thin leading-snug tracking-wide', styles.text)}>
                <Quote className="h-6 w-6 mb-4" />
                {testimonial.description}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleExpand}
        className="block"
        whileHover={{
          rotateX: 2,
          rotateY: 2,
          rotate: 3,
          scale: 1.02,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
      >
        <div
          className={cn(
            'rounded-3xl h-[500px] md:h-[550px] w-80 md:w-96 overflow-hidden flex flex-col items-center justify-center relative z-10 shadow-md bg-gradient-to-b',
            styles.card
          )}
        >
          <div className="absolute opacity-30 inset-0">
            <Image
              className="w-full h-full object-cover"
              src={backgroundImage}
              alt="Background"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <RetroProfileImage src={testimonial.profileImage} alt={testimonial.name} />

          <p className={cn('text-2xl font-normal text-center mt-4 lowercase px-3', styles.text)}>
            {testimonial.description.length > 100
              ? `${testimonial.description.slice(0, 100)}...`
              : testimonial.description}
          </p>

          <p className={cn('text-xl md:text-2xl font-thin italic text-center mt-5 lowercase', styles.text)}>
            {testimonial.name}.
          </p>

          <p className={cn('text-base font-thin italic text-center mt-1 lowercase underline underline-offset-8 decoration-1', styles.text)}>
            {testimonial.designation.length > 25
              ? `${testimonial.designation.slice(0, 25)}...`
              : testimonial.designation}
          </p>
        </div>
      </motion.button>
    </>
  );
}

function RetroProfileImage({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="w-[90px] h-[90px] md:w-[150px] md:h-[150px] opacity-80 overflow-hidden rounded-full border-[3px] border-solid border-neutral-500/60 aspect-square flex-none saturate-[0.2] sepia-[0.46] relative">
      <Image
        className={cn(
          'transition duration-300 object-cover',
          isLoading ? 'blur-sm' : 'blur-0'
        )}
        onLoad={() => setLoading(false)}
        src={src}
        alt={alt}
        fill
        loading="lazy"
      />
    </div>
  );
}

export default RetroCarousel;
