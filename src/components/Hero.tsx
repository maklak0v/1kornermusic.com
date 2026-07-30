import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useUi';

import { asset } from '@/lib/assets';

const HERO_IMG = asset('/images/DSC00368-Edit-Edit_2.webp');

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const lettersBlur = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
  const lettersScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.9]);

  const letters = 'KORNER'.split('');

  return (
    <section
      ref={ref}
      id="top"
      className="vignette relative h-[100svh] w-full overflow-hidden bg-ink"
    >
      {/* Background image */}
      <motion.div
        style={reduced ? {} : { y: bgY, scale: bgScale }}
        className="absolute inset-0"
      >
        <motion.img
          src={HERO_IMG}
          alt="KORNER — silhouette in studio light"
          className="h-full w-full object-cover object-center opacity-70"
          initial={reduced ? { opacity: 0.7 } : { opacity: 0, scale: 1.15 }}
          animate={reduced ? {} : { opacity: 0.7, scale: 1.05 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/40" />
      </motion.div>

      {/* Giant KORNER text — behind / overlapping the image */}
      <motion.div
        style={reduced ? {} : { y: textY, opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.h1
          style={reduced ? {} : { filter: `blur(${lettersBlur}px)`, scale: lettersScale }}
          className="font-nemoy-thin text-[26vw] leading-[0.85] tracking-tight text-bone/90 select-none sm:text-[22vw] md:text-[20vw]"
          aria-label="KORNER"
        >
          <span className="flex">
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 60 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
                style={{ textShadow: '0 0 80px rgba(5,5,5,0.8)' }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </motion.h1>
      </motion.div>

      {/* Foreground subtitle block */}
      <motion.div
        style={reduced ? {} : { opacity: textOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-end pb-[14vh] sm:pb-[16vh]"
      >
        <motion.p
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-nemoy-thin text-[11px] uppercase tracking-extreme text-bone/70 sm:text-xs"
        >
          DJ · PRODUCER · ARTIST · FILMMAKER
        </motion.p>
        <motion.p
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={reduced ? {} : { opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-nemoy-thin text-sm tracking-wide text-bone/50 sm:text-base"
        >
          music for the moments that stay with you.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={reduced ? {} : { opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={reduced ? {} : { opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-bone/40">
            scroll to enter
          </span>
          <motion.div
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-px bg-gradient-to-b from-bone/40 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Corner metadata */}
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={reduced ? {} : { opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute left-5 top-24 hidden sm:block sm:left-8"
      >
        <p className="font-nemoy-thin text-[15px] uppercase tracking-ultra text-ash">
          DTLA
        </p>
      </motion.div>
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={reduced ? {} : { opacity: 1 }}
        transition={{ duration: 1, delay: 3.1 }}
        className="absolute right-5 top-24 hidden text-right sm:block sm:right-8"
      >
        <p className="font-nemoy-thin text-[15px] uppercase tracking-ultra text-ash">
        ph: @albanski.vids
        </p>
      </motion.div>

      {/* Scroll fade to black at the bottom */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent"
      />
    </section>
  );
}
