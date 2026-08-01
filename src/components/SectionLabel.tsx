import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useUi';

interface SectionLabelProps {
  index: string;
  title: string;
  className?: string;
}

export function SectionLabel({ index, title, className = '' }: SectionLabelProps) {
  const reduced = useReducedMotion();

  return (
    <div className={`flex items-baseline gap-4 ${className}`}>
      <motion.span
        initial={reduced ? { opacity: 1 } : { opacity: 0, x: -10 }}
        whileInView={reduced ? {} : { opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-nemoy-thin text-[50px] uppercase tracking-ultra text-ash"
      >
        {index}
      </motion.span>
      <motion.span
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        whileInView={reduced ? {} : { opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-8 bg-bone/20"
      />
      <motion.h2
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
        whileInView={reduced ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-nemoy-med text-base uppercase tracking-ultra text-bone sm:text-lg"
      >
        {title}
      </motion.h2>
    </div>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, y = 20, className = '' }: FadeInProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
