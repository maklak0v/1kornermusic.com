import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { videos, type VideoItem } from '@/data/videos';
import { SectionLabel, FadeIn } from '@/components/SectionLabel';
import { VideoPlayer } from '@/components/VideoPlayer';
import { useCursor } from '@/components/CustomCursor';
import { useReducedMotion } from '@/hooks/useUi';

export function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cursor = useCursor();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const titleX = useTransform(scrollYProgress, [0, 1], ['10%', '-25%']);

  const featured = videos.find((v) => v.featured) || videos[0];
  const others = videos.filter((v) => v.id !== featured.id);

  const onVideoEnter = () => { cursor?.setLabel('PLAY'); cursor?.setVariant('play'); };
  const onVideoLeave = () => { cursor?.setLabel(null); cursor?.setVariant('default'); };

  return (
    <section ref={sectionRef} id="video" className="relative overflow-hidden bg-ink-950 py-28 sm:py-36">
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionLabel index="05" title="TRANSMISSIONS" />
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <FadeIn>
            <motion.h2
              style={reduced ? {} : { x: titleX }}
              className="font-nemoy-black text-5xl uppercase leading-none tracking-tight text-bone sm:text-8xl"
            >
              VIDEO
            </motion.h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="max-w-xs font-nemoy-thin text-sm leading-relaxed text-ash">
              every version is part of the story.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Featured video */}
      <div className="relative mt-14 px-5 sm:px-8">
        <motion.button
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setActiveVideo(featured)}
          onMouseEnter={onVideoEnter}
          onMouseLeave={onVideoLeave}
          className="group relative block w-full overflow-hidden"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-800 sm:aspect-[21/9]">
            <img
              src={featured.thumbnail}
              alt={featured.title}
              className="h-full w-full object-cover grayscale-[40%] transition-all duration-[1.2s] group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />

            {/* Play indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/30 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-bone/60 sm:h-20 sm:w-20">
                <Play size={20} className="ml-1 text-bone" strokeWidth={1.5} />
              </div>
            </div>

            {/* Metadata */}
            <div className="absolute bottom-0 left-0 flex w-full flex-col gap-2 p-5 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="border border-bone/30 px-2 py-0.5 font-nemoy-thin text-[8px] uppercase tracking-ultra text-bone">
                  {featured.category}
                </span>
                <span className="font-nemoy-thin text-[9px] uppercase tracking-ultra text-bone/60">
                  {featured.beta} · {featured.duration}
                </span>
              </div>
              <h3 className="font-nemoy-black text-3xl uppercase leading-none tracking-tight text-bone sm:text-5xl">
                {featured.title}
              </h3>
              <p className="max-w-lg font-nemoy-thin text-xs leading-relaxed text-bone/50 sm:text-sm">
                {featured.description}
              </p>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Film strip — smaller videos */}
      <div className="relative mt-8 flex gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:gap-6 sm:px-8 [&::-webkit-scrollbar]:hidden">
        {others.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            index={i}
            onClick={() => setActiveVideo(video)}
            onEnter={onVideoEnter}
            onLeave={onVideoLeave}
            reduced={reduced}
          />
        ))}
      </div>

      <VideoPlayer video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}

interface VideoCardProps {
  video: VideoItem;
  index: number;
  onClick: () => void;
  onEnter: () => void;
  onLeave: () => void;
  reduced: boolean;
}

function VideoCard({ video, index, onClick, onEnter, onLeave, reduced }: VideoCardProps) {
  return (
    <motion.button
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative shrink-0 snap-start"
      style={{ width: 'min(80vw, 340px)' }}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-ink-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[40%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-70" />

        {/* Play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:opacity-100">
            <Play size={14} className="ml-0.5 text-bone" strokeWidth={1.5} />
          </div>
        </div>

        {/* Metadata */}
        <div className="absolute bottom-0 left-0 p-3">
          <p className="font-nemoy-thin text-[8px] uppercase tracking-ultra text-bone/60">
            {video.category}
          </p>
          <h4 className="mt-0.5 font-nemoy-med text-sm uppercase tracking-wide text-bone">
            {video.title}
          </h4>
        </div>
        <div className="absolute right-3 top-3">
          <span className="font-nemoy-thin text-[8px] uppercase tracking-ultra text-bone/50">
            {video.duration}
          </span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-nemoy-thin text-[9px] uppercase tracking-ultra text-ash">
          {video.beta}
        </span>
        <span className="flex items-center gap-1 font-nemoy-thin text-[9px] uppercase tracking-ultra text-bone/40 transition-colors group-hover:text-bone">
          PLAY TRANSMISSION
          <ArrowRight size={10} strokeWidth={1.5} />
        </span>
      </div>
    </motion.button>
  );
}
