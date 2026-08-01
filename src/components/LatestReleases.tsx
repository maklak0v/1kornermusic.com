import { useRef, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
} from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { releases } from '@/data/releases';
import { SectionLabel, FadeIn } from '@/components/SectionLabel';
import { ReleasePlayer } from '@/components/ReleasePlayer';
import { StreamingLinksModal } from '@/components/StreamingLinksModal';
import { useCursor } from '@/components/CustomCursor';
import { useReducedMotion } from '@/hooks/useUi';

const STORY_TEXT =
  'KORNER is an artist from Ukraine, creating music since the age of sixteen. For years, the tracks remained private — unfinished files, late nights and memories that never left the room. Then, after eight years, something from the past returned and changed the direction of everything. KORNER is about stories, people and the moments that stay with us.';

const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const chapterVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 },
  },
};

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '6%' : '-6%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-6%' : '6%',
    opacity: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  }),
};

const SWIPE_THRESHOLD = 80;

export function LatestReleases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [streamingOpen, setStreamingOpen] = useState(false);
  const cursor = useCursor();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const active = releases[activeIdx];
  const total = releases.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const storyY = useTransform(scrollYProgress, [0.02, 0.18, 0.34], [45, 0, -30]);
  const storyOpacity = useTransform(scrollYProgress, [0.01, 0.12, 0.34, 0.46], [0, 1, 1, 0.7]);
  const storyBlur = useTransform(scrollYProgress, [0.01, 0.12, 0.3], ['blur(6px)', 'blur(0px)', 'blur(0px)']);
  const storyScale = useTransform(scrollYProgress, [0.02, 0.18, 0.34], [0.98, 1, 1]);

  const goTo = useCallback((target: number, dir: number) => {
    setDirection(dir);
    setActiveIdx(target);
  }, []);

  const paginate = useCallback(
    (newDir: number) => {
      setDirection(newDir);
      setActiveIdx(i => (i + newDir + total) % total);
    },
    [total],
  );

  const onDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const swipe = info.offset.x;
      const velocity = Math.abs(info.velocity.x);
      if (swipe < -SWIPE_THRESHOLD || (swipe < 0 && velocity > 500)) {
        paginate(1);
      } else if (swipe > SWIPE_THRESHOLD || (swipe > 0 && velocity > 500)) {
        paginate(-1);
      }
    },
    [paginate],
  );

  const onListenEnter = () => {
    cursor?.setLabel('LISTEN');
    cursor?.setVariant('listen');
  };

  const onListenLeave = () => {
    cursor?.setLabel(null);
    cursor?.setVariant('default');
  };

  return (
    <section ref={sectionRef} className="relative bg-ink">
      {/* 01 — STORY */}
      <div
        id="story"
        className="relative mx-auto flex min-h-[85svh] max-w-[1600px] scroll-mt-24 flex-col px-5 pt-28 sm:px-8 sm:pt-36"
      >
        <SectionLabel index="01" title="STORY" />

        <div className="flex flex-1 items-center justify-center py-20 sm:py-28">
          <FadeIn delay={0.1}>
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                style={
                  reduced
                    ? {}
                    : { y: storyY, opacity: storyOpacity, filter: storyBlur, scale: storyScale }
                }
                className="mx-auto max-w-4xl text-center"
              >
                <motion.p
                  initial={reduced ? false : 'hidden'}
                  whileInView={reduced ? undefined : 'visible'}
                  variants={reduced ? undefined : wordContainer}
                  viewport={{ once: true, margin: '-80px' }}
                  className="font-nemoy-thin text-xl leading-[2] tracking-[0.07em] text-bone/75 sm:text-2xl md:text-[1.65rem]"
                >
                  {STORY_TEXT.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      variants={reduced ? undefined : wordVariant}
                      className="inline-block mr-[0.3em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.p>

                <div className="mx-auto mt-10 h-px w-20 bg-bone/20" />

                <motion.p
                  initial={reduced ? false : 'hidden'}
                  whileInView={reduced ? undefined : 'visible'}
                  variants={reduced ? undefined : chapterVariant}
                  viewport={{ once: true, margin: '-40px' }}
                  className="mt-6 font-nemoy-thin text-sm uppercase tracking-[0.35em] text-bone/70"
                >
                  chapter 01 · the beginning
                </motion.p>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* 02 — LATEST TRANSMISSION */}
      <div
        id="music"
        className="relative mx-auto max-w-[1600px] scroll-mt-24 px-5 pt-12 sm:px-8 sm:pt-20"
      >
        <SectionLabel index="02" title="LATEST TRANSMISSION" />

        <FadeIn delay={0.1}>
          <h2 className="mt-6 font-nemoy-thin text-[14vw] leading-[0.9] tracking-tight text-bone/95 sm:text-[10vw] md:text-[8vw] lg:text-[7vw]">
            NEW MUSIC
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-4 max-w-xl font-nemoy-thin text-[18px] leading-relaxed tracking-[0.06em] text-ash sm:text-[20px] md:text-[22px]">
            every release is another chapter.
          </p>
        </FadeIn>
      </div>

      {/* Carousel */}
      <div className="relative mt-6 sm:mt-10 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          style={reduced ? undefined : { y: bgY }}
          className="absolute inset-0"
        >
          <img
            src={active.backdropImage || active.artwork}
            alt=""
            className="h-full w-full scale-110 object-cover opacity-30 grayscale-[20%] blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
        </motion.div>

        {/* Giant bg title */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <h3 className="select-none font-nemoy-black text-[18vw] leading-none tracking-tight text-bone/[0.04] sm:text-[14vw]">
            {active.title}
          </h3>
        </div>

        {/* Slide content — draggable for swipe support */}
        <div className="relative min-h-[75svh]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={active.id}
              custom={direction}
              variants={reduced ? undefined : slideVariants}
              initial={reduced ? false : 'enter'}
              animate="center"
              exit={reduced ? undefined : 'exit'}
              drag={total > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragMomentum={false}
              onDragEnd={onDragEnd}
              className="relative mx-auto flex min-h-[75svh] max-w-[1600px] cursor-grab flex-col items-center justify-start gap-10 px-5 pb-28 pt-10 active:cursor-grabbing sm:px-8 sm:pt-14 lg:flex-row lg:justify-center lg:gap-16"
            >
              {/* Artwork */}
              <div className="relative w-full max-w-sm shrink-0 lg:w-[42%] lg:max-w-md">
                <div className="group relative aspect-square w-full overflow-hidden">
                  <img
                    src={active.artwork}
                    alt={`${active.title} artwork`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="font-nemoy-thin text-[9px] uppercase tracking-ultra text-bone/70">
                      {active.version}
                    </span>
                  </div>
                  {active.status === 'upcoming' && (
                    <div className="absolute right-4 top-4">
                      <span className="border border-bone/30 bg-ink/60 px-2 py-1 font-nemoy-thin text-[8px] uppercase tracking-ultra text-bone">
                        coming soon
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex w-full flex-col lg:w-[50%]">
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 border-b border-bone/10 pb-6 sm:grid-cols-3">
                  <MetaItem label="artist" value="KORNER" />
                  <MetaItem label="title" value={active.title} />
                  <MetaItem label="version" value={active.version} />
                  <MetaItem label="bpm" value={active.bpm} />
                  <MetaItem label="duration" value={active.duration} />
                  <MetaItem label="year" value={active.year} />
                </div>

                <p className="mt-6 max-w-xl font-nemoy-thin text-[15px] leading-[1.9] tracking-[0.04em] text-bone/65 sm:text-[16px]">
                  {active.description}
                </p>

                {active.previewAudio && (
                  <div className="mt-8">
                    <p className="mb-3 font-nemoy-thin text-[9px] uppercase tracking-ultra text-ash">
                      preview
                    </p>
                    <ReleasePlayer release={active} />
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStreamingOpen(true)}
                    onMouseEnter={onListenEnter}
                    onMouseLeave={onListenLeave}
                    className="group flex items-center gap-2 border border-bone/30 px-6 py-3 font-nemoy-thin text-[11px] uppercase tracking-ultra text-bone transition-all duration-300 hover:bg-bone hover:text-ink"
                  >
                    <Play size={12} strokeWidth={2} />
                    {active.status === 'upcoming' ? 'PRE-SAVE' : `STREAM ${active.title}`}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {total > 1 && (
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => paginate(-1)}
                className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/50 transition-all duration-200 hover:border-bone/60 hover:text-bone"
                aria-label="Previous release"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>

              {/* Slide indicator: counter + dots */}
              <div className="flex items-center gap-3">
                <span className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-bone/50">
                  {String(activeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-2">
                  {releases.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
                      className={`h-1 transition-all duration-300 ${
                        i === activeIdx
                          ? 'w-6 bg-bone'
                          : 'w-1 bg-bone/30 hover:bg-bone/60'
                      }`}
                      aria-label={`Go to release ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => paginate(1)}
                className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/30 transition-all duration-200 hover:border-bone/60 hover:text-bone"
                aria-label="Next release"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>

      <StreamingLinksModal
        open={streamingOpen}
        onClose={() => setStreamingOpen(false)}
        links={active.streaming}
        title={active.title}
      />
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-nemoy-thin text-[18px] uppercase tracking-ultra text-ash">
        {label}
      </span>
      <span className="font-nemoy-med text-[24px] uppercase tracking-wide text-bone">
        {value}
      </span>
    </div>
  );
}
