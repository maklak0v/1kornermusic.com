import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Play } from 'lucide-react';
import { releases, type Release } from '@/data/releases';
import { SectionLabel, FadeIn } from '@/components/SectionLabel';
import { ReleasePlayer } from '@/components/ReleasePlayer';
import { StreamingLinksModal } from '@/components/StreamingLinksModal';
import { useCursor } from '@/components/CustomCursor';
import { useReducedMotion } from '@/hooks/useUi';

export function LatestReleases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [streamingOpen, setStreamingOpen] = useState(false);
  const cursor = useCursor();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const active = releases[activeIdx];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const storyY = useTransform(
    scrollYProgress,
    [0.02, 0.18, 0.34],
    [45, 0, -30],
  );

  const storyOpacity = useTransform(
    scrollYProgress,
    [0.01, 0.12, 0.34, 0.46],
    [0, 1, 1, 0.7],
  );

  const storyBlur = useTransform(
    scrollYProgress,
    [0.01, 0.12, 0.3],
    ['blur(6px)', 'blur(0px)', 'blur(0px)'],
  );

  const storyScale = useTransform(
    scrollYProgress,
    [0.02, 0.18, 0.34],
    [0.98, 1, 1],
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
            <div className="mx-auto max-w-5xl text-center">
              <motion.div
                style={
                  reduced
                    ? {}
                    : {
                        y: storyY,
                        opacity: storyOpacity,
                        filter: storyBlur,
                        scale: storyScale,
                      }
                }
                className="mx-auto max-w-5xl text-center"
              >
                <p className="font-nemoy-thin text-[22px] leading-[1.85] tracking-[0.06em] text-bone/80 sm:text-[28px] md:text-[34px] lg:text-[38px]">
                  KORNER is an artist from Ukraine, creating music since the age
                  of sixteen. For years, the tracks remained private —
                  unfinished files, late nights and memories that never left the
                  room. Then, after eight years, something from the past returned
                  and changed the direction of everything. KORNER is about
                  stories, people and the moments that stay with us.
                </p>

                <div className="mx-auto mt-12 h-px w-24 bg-bone/25" />

                <p className="mt-5 font-nemoy-thin text-[11px] uppercase tracking-[0.3em] text-ash sm:text-[12px]">
                  chapter 01 · the beginning
                </p>
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
          <h2 className="mt-6 font-nemoy-black text-[14vw] leading-[0.9] tracking-tight text-bone/95 sm:text-[10vw] md:text-[8vw] lg:text-[7vw]">
            NEW MUSIC
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-3 max-w-md font-nemoy-thin text-sm leading-relaxed text-ash">
            every release is another chapter.
          </p>
        </FadeIn>
      </div>

      {/* Release showcase */}
      <div className="relative mt-6 sm:mt-10">
        {releases.map((release, idx) => (
          <ReleaseShowcase
            key={release.id}
            release={release}
            index={idx}
            onActivate={() => setActiveIdx(idx)}
            onListen={() => {
              setActiveIdx(idx);
              setStreamingOpen(true);
            }}
            onListenEnter={onListenEnter}
            onListenLeave={onListenLeave}
            bgY={bgY as MotionValue<string>}
            reduced={reduced}
          />
        ))}
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

interface ReleaseShowcaseProps {
  release: Release;
  index: number;
  onActivate: () => void;
  onListen: () => void;
  onListenEnter: () => void;
  onListenLeave: () => void;
  bgY: MotionValue<string>;
  reduced: boolean;
}

function ReleaseShowcase({
  release,
  index,
  onActivate,
  onListen,
  onListenEnter,
  onListenLeave,
  bgY,
  reduced,
}: ReleaseShowcaseProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start center', 'end center'],
  });

  const artScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.92, 1, 0.92],
  );

  const artRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      index % 2 === 0 ? -4 : 4,
      0,
      index % 2 === 0 ? 4 : -4,
    ],
  );

  const artOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.4, 1, 1, 0.4],
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [60, 0, -60],
  );

  const isUpcoming = release.status === 'upcoming';

  return (
    <div
      ref={cardRef}
      className="relative min-h-[75svh] w-full overflow-hidden"
    >
      {/* Backdrop */}
      <motion.div
        style={reduced ? undefined : { y: bgY }}
        className="absolute inset-0"
      >
        <img
          src={release.backdropImage || release.artwork}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-30 grayscale-[20%] blur-2xl"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
      </motion.div>

      {/* Giant title */}
      <motion.div
        style={reduced ? {} : { y: textY }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <h3 className="select-none font-nemoy-black text-[18vw] leading-none tracking-tight text-bone/[0.04] sm:text-[14vw]">
          {release.title}
        </h3>
      </motion.div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[75svh] max-w-[1600px] flex-col items-center justify-start gap-10 px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:flex-row lg:justify-center lg:gap-16">
        {/* Artwork */}
        <motion.div
          style={
            reduced
              ? {}
              : {
                  scale: artScale,
                  rotate: artRotate,
                  opacity: artOpacity,
                }
          }
          className="relative w-full max-w-sm shrink-0 lg:w-[42%] lg:max-w-md"
          onViewportEnter={onActivate}
          viewport={{ margin: '-40% 0px -40% 0px' }}
        >
          <div className="group relative aspect-square w-full overflow-hidden">
            <img
              src={release.artwork}
              alt={`${release.title} artwork`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />

            <div className="absolute left-4 top-4 flex flex-col gap-1">
              <span className="font-nemoy-thin text-[9px] uppercase tracking-ultra text-bone/70">
                {release.version}
              </span>
            </div>

            {isUpcoming && (
              <div className="absolute right-4 top-4">
                <span className="border border-bone/30 bg-ink/60 px-2 py-1 font-nemoy-thin text-[8px] uppercase tracking-ultra text-bone">
                  coming soon
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Info and player */}
        <div className="flex w-full flex-col lg:w-[50%]">
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 border-b border-bone/10 pb-6 sm:grid-cols-3">
              <MetaItem label="artist" value="KORNER" />
              <MetaItem label="title" value={release.title} />
              <MetaItem label="version" value={release.version} />
              <MetaItem label="bpm" value={release.bpm} />
              <MetaItem label="duration" value={release.duration} />
              <MetaItem label="year" value={release.year} />
            </div>

            <p className="mt-6 max-w-xl font-nemoy-thin text-[15px] leading-[1.9] tracking-[0.04em] text-bone/65 sm:text-[16px]">
              {release.description}
            </p>

            {release.previewAudio && (
              <div className="mt-8">
                <p className="mb-3 font-nemoy-thin text-[9px] uppercase tracking-ultra text-ash">
                  preview
                </p>

                <ReleasePlayer release={release} />
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onListen}
                onMouseEnter={onListenEnter}
                onMouseLeave={onListenLeave}
                className="group flex items-center gap-2 border border-bone/30 px-6 py-3 font-nemoy-thin text-[11px] uppercase tracking-ultra text-bone transition-all duration-300 hover:bg-bone hover:text-ink"
              >
                <Play size={12} strokeWidth={2} />
                {isUpcoming ? 'PRE-SAVE' : `STREAM ${release.title}`}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="font-nemoy-thin text-[8px] uppercase tracking-ultra text-ash">
        {label}
      </span>

      <span className="font-nemoy-med text-sm uppercase tracking-wide text-bone">
        {value}
      </span>
    </div>
  );
}
