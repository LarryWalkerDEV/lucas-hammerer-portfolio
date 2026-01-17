'use client';

import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FolderProject {
  id: string;
  image: string;
  title: string;
  description?: string;
  href?: string;
}

interface AnimatedFolderProps {
  title: string;
  projects: FolderProject[];
  className?: string;
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}

const variantStyles = {
  explorer: {
    folderBack: 'bg-explorer-primary/30',
    folderTab: 'bg-explorer-primary/50',
    folderFront: 'bg-explorer-primary',
    card: 'bg-explorer-background border-explorer-primary/20',
    accent: 'bg-explorer-accent',
  },
  scientist: {
    folderBack: 'bg-scientist-secondary/30',
    folderTab: 'bg-scientist-secondary/50',
    folderFront: 'bg-scientist-secondary',
    card: 'bg-white border-scientist-primary/10',
    accent: 'bg-scientist-accent',
  },
  adventurer: {
    folderBack: 'bg-adventurer-accent/30',
    folderTab: 'bg-adventurer-accent/50',
    folderFront: 'bg-adventurer-accent',
    card: 'bg-adventurer-secondary border-adventurer-accent/20',
    accent: 'bg-adventurer-highlight',
  },
  facilitator: {
    folderBack: 'bg-facilitator-primary/30',
    folderTab: 'bg-facilitator-primary/50',
    folderFront: 'bg-facilitator-primary',
    card: 'bg-white border-facilitator-primary/20',
    accent: 'bg-facilitator-accent',
  },
};

export function AnimatedFolder({ title, projects, className, variant = 'adventurer' }: AnimatedFolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);
  const [hiddenCardId, setHiddenCardId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const styles = variantStyles[variant];

  const handleProjectClick = (project: FolderProject, index: number) => {
    const cardEl = cardRefs.current[index];
    if (cardEl) {
      setSourceRect(cardEl.getBoundingClientRect());
    }
    setSelectedIndex(index);
    setHiddenCardId(project.id);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
    setSourceRect(null);
  };

  const handleCloseComplete = () => {
    setHiddenCardId(null);
  };

  const handleNavigate = (newIndex: number) => {
    setSelectedIndex(newIndex);
    setHiddenCardId(projects[newIndex]?.id || null);
  };

  return (
    <>
      <motion.div
        className={cn(
          'relative flex flex-col items-center justify-center',
          'p-8 rounded-2xl cursor-pointer',
          'border transition-all duration-500 ease-out',
          'hover:shadow-2xl group',
          styles.card,
          className
        )}
        style={{
          minWidth: '280px',
          minHeight: '320px',
          perspective: '1000px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Background glow */}
        <motion.div
          className={cn('absolute inset-0 rounded-2xl', styles.accent)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle at 50% 70%, currentColor 0%, transparent 70%)',
          }}
        />

        {/* Folder structure */}
        <div className="relative flex items-center justify-center mb-4" style={{ height: '160px', width: '200px' }}>
          {/* Folder back */}
          <motion.div
            className={cn('absolute w-32 h-24 rounded-lg shadow-md', styles.folderBack)}
            style={{ transformOrigin: 'bottom center', zIndex: 10 }}
            animate={{ rotateX: isHovered ? -15 : 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          />

          {/* Folder tab */}
          <motion.div
            className={cn('absolute w-12 h-4 rounded-t-md', styles.folderTab)}
            style={{
              top: 'calc(50% - 48px - 12px)',
              left: 'calc(50% - 64px + 16px)',
              transformOrigin: 'bottom center',
              zIndex: 10,
            }}
            animate={{
              rotateX: isHovered ? -25 : 0,
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          />

          {/* Project cards */}
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
            }}
          >
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                image={project.image}
                title={project.title}
                delay={index * 80}
                isVisible={isHovered}
                index={index}
                onClick={() => handleProjectClick(project, index)}
                isSelected={hiddenCardId === project.id}
              />
            ))}
          </div>

          {/* Folder front */}
          <motion.div
            className={cn('absolute w-32 h-24 rounded-lg shadow-lg', styles.folderFront)}
            style={{
              top: 'calc(50% - 48px + 4px)',
              transformOrigin: 'bottom center',
              zIndex: 30,
            }}
            animate={{
              rotateX: isHovered ? 25 : 0,
              y: isHovered ? 8 : 0,
            }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          />

          {/* Shine effect */}
          <motion.div
            className="absolute w-32 h-24 rounded-lg overflow-hidden pointer-events-none"
            style={{
              top: 'calc(50% - 48px + 4px)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
              transformOrigin: 'bottom center',
              zIndex: 31,
            }}
            animate={{
              rotateX: isHovered ? 25 : 0,
              y: isHovered ? 8 : 0,
            }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          />
        </div>

        <h3 className="text-lg font-semibold mt-4 transition-transform duration-300 group-hover:translate-y-1">
          {title}
        </h3>

        <p className="text-sm opacity-60 transition-opacity group-hover:opacity-80">
          {projects.length} projects
        </p>

        <motion.p
          className="absolute bottom-4 text-xs opacity-40"
          animate={{
            opacity: isHovered ? 0 : 0.4,
            y: isHovered ? 10 : 0,
          }}
        >
          Hover to explore
        </motion.p>
      </motion.div>

      <ImageLightbox
        projects={projects.slice(0, 3)}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={handleCloseLightbox}
        sourceRect={sourceRect}
        onCloseComplete={handleCloseComplete}
        onNavigate={handleNavigate}
        variant={variant}
      />
    </>
  );
}

// Project Card Component
interface ProjectCardProps {
  image: string;
  title: string;
  delay: number;
  isVisible: boolean;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, title, delay, isVisible, index, onClick, isSelected }, ref) => {
    const rotations = [-12, 0, 12];
    const translations = [-55, 0, 55];

    return (
      <motion.div
        ref={ref}
        className={cn(
          'absolute w-20 h-28 rounded-lg overflow-hidden shadow-xl cursor-pointer',
          'bg-neutral-800 border border-white/10',
          'hover:ring-2 hover:ring-white/30'
        )}
        style={{
          left: '-40px',
          top: '-56px',
          zIndex: 10 - index,
        }}
        initial={{ opacity: 0, y: 0, x: 0, rotate: 0, scale: 0.5 }}
        animate={{
          opacity: isSelected ? 0 : isVisible ? 1 : 0,
          y: isVisible ? -90 : 0,
          x: isVisible ? translations[index] : 0,
          rotate: isVisible ? rotations[index] : 0,
          scale: isVisible ? 1 : 0.5,
        }}
        transition={{
          duration: 0.6,
          delay: delay / 1000,
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        whileHover={{ scale: 1.05 }}
      >
        <img src={image || '/placeholder.svg'} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-medium text-white truncate">
          {title}
        </p>
      </motion.div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

// Image Lightbox Component
interface ImageLightboxProps {
  projects: FolderProject[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  sourceRect: DOMRect | null;
  onCloseComplete?: () => void;
  onNavigate: (index: number) => void;
  variant?: 'explorer' | 'scientist' | 'adventurer' | 'facilitator';
}

function ImageLightbox({
  projects,
  currentIndex,
  isOpen,
  onClose,
  sourceRect,
  onCloseComplete,
  onNavigate,
  variant = 'adventurer',
}: ImageLightboxProps) {
  const [animationPhase, setAnimationPhase] = useState<'initial' | 'animating' | 'complete'>('initial');
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [internalIndex, setInternalIndex] = useState(currentIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalProjects = projects.length;
  const hasNext = internalIndex < totalProjects - 1;
  const hasPrev = internalIndex > 0;
  const currentProject = projects[internalIndex];

  useEffect(() => {
    if (isOpen) {
      setInternalIndex(currentIndex);
    }
  }, [isOpen, currentIndex]);

  const navigateNext = useCallback(() => {
    if (internalIndex >= totalProjects - 1) return;
    const newIndex = internalIndex + 1;
    setInternalIndex(newIndex);
    onNavigate(newIndex);
  }, [internalIndex, totalProjects, onNavigate]);

  const navigatePrev = useCallback(() => {
    if (internalIndex <= 0) return;
    const newIndex = internalIndex - 1;
    setInternalIndex(newIndex);
    onNavigate(newIndex);
  }, [internalIndex, onNavigate]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    onClose();
    setTimeout(() => {
      setIsClosing(false);
      setShouldRender(false);
      setAnimationPhase('initial');
      onCloseComplete?.();
    }, 400);
  }, [onClose, onCloseComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') navigateNext();
      if (e.key === 'ArrowLeft') navigatePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose, navigateNext, navigatePrev]);

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      setShouldRender(true);
      setAnimationPhase('initial');
      setIsClosing(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationPhase('animating');
        });
      });
      const timer = setTimeout(() => {
        setAnimationPhase('complete');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, sourceRect]);

  if (!shouldRender || !currentProject) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: animationPhase === 'initial' ? 0 : 1 }}
        />

        {/* Close button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: animationPhase === 'complete' ? 1 : 0, y: animationPhase === 'complete' ? 0 : -10 }}
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </motion.button>

        {/* Navigation buttons */}
        {hasPrev && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              navigatePrev();
            }}
            className="absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: animationPhase === 'complete' ? 1 : 0, x: animationPhase === 'complete' ? 0 : -20 }}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </motion.button>
        )}

        {hasNext && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              navigateNext();
            }}
            className="absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: animationPhase === 'complete' ? 1 : 0, x: animationPhase === 'complete' ? 0 : 20 }}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </motion.button>
        )}

        {/* Image container */}
        <motion.div
          ref={containerRef}
          className="relative z-10 w-full max-w-3xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{
            scale: isClosing ? 0.95 : 1,
            opacity: isClosing ? 0 : 1,
          }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10 shadow-2xl">
            <motion.img
              key={currentProject.id}
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-auto max-h-[70vh] object-contain"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Info panel */}
            <motion.div
              className="px-6 py-5 bg-neutral-900 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationPhase === 'complete' ? 1 : 0, y: animationPhase === 'complete' ? 0 : 20 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-white truncate">
                    {currentProject.title}
                  </h3>
                  {currentProject.description && (
                    <p className="mt-1 text-sm text-white/60">{currentProject.description}</p>
                  )}
                  <div className="flex items-center gap-1.5 mt-3">
                    {projects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInternalIndex(idx);
                          onNavigate(idx);
                        }}
                        className={cn(
                          'w-2 h-2 rounded-full transition-all',
                          idx === internalIndex ? 'bg-white scale-110' : 'bg-white/30 hover:bg-white/50'
                        )}
                      />
                    ))}
                  </div>
                </div>

                {currentProject.href && (
                  <a
                    href={currentProject.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-all"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedFolder;
