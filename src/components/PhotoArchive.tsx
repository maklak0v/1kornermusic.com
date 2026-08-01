import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { photos, type Photo } from '@/data/photos';
import { SectionLabel, FadeIn } from '@/components/SectionLabel';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { useCursor } from '@/components/CustomCursor';
import { useReducedMotion } from '@/hooks/useUi';

export function PhotoArchive() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cursor = useCursor();
  const reduced = useReducedMotion();

  const onPhotoEnter = () => { cursor?.setLabel('VIEW'); cursor?.setVariant('view'); };
  const onPhotoLeave = () => { cursor?.setLabel(null); cursor?.setVariant('default'); };

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const nextPhoto = () => setLightboxIdx((i) => (i === null ? null : (i + 1) % photos.length));
  const prevPhoto = () => setLightboxIdx((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));

  const currentPhoto = lightboxIdx !== null ? photos[lightboxIdx] : null;

  return (
    <section ref={sectionRef} id="photos" className="relative overflow-hidden bg-ink py-28 sm:py-36">
      {/* Header */}
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionLabel index="04" title="ART" />
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <FadeIn delay={0.15}>
            <p className="max-w-xs font-nemoy-thin text-sm leading-relaxed text-ash">
              a private visual diary. frames from the studio, the streets, and the rooms in between.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Asymmetrical photo grid */}
      <div className="relative mt-16 grid grid-cols-12 gap-3 px-5 sm:gap-4 sm:px-8 lg:gap-6">
        {/* Row 1: large featured portrait + overlapping landscape */}
        <PhotoTile
          photo={photos[0]}
          className="col-span-7 sm:col-span-5 row-span-2"
          aspect="aspect-[3/4]"
          onClick={() => openLightbox(0)}
          onEnter={onPhotoEnter}
          onLeave={onPhotoLeave}
          reduced={reduced}
          offset={-40}
        />
        <PhotoTile
          photo={photos[1]}
          className="col-span-5 sm:col-span-4 mt-16 sm:mt-24"
          aspect="aspect-[4/3]"
          onClick={() => openLightbox(1)}
          onEnter={onPhotoEnter}
          onLeave={onPhotoLeave}
          reduced={reduced}
        />
        <PhotoTile
          photo={photos[2]}
          className="col-span-5 sm:col-span-3"
          aspect="aspect-square"
          onClick={() => openLightbox(2)}
          onEnter={onPhotoEnter}
          onLeave={onPhotoLeave}
          reduced={reduced}
        />

        {/* Row 2: portrait + two landscapes, offset */}
        <PhotoTile
          photo={photos[3]}
          className="col-span-6 sm:col-span-3 mt-8"
          aspect="aspect-[3/4]"
          onClick={() => openLightbox(3)}
          onEnter={onPhotoEnter}
          onLeave={onPhotoLeave}
          reduced={reduced}
        />
        <PhotoTile
          photo={photos[4]}
          className="col-span-6 sm:col-span-5 mt-16 sm:mt-32"
          aspect="aspect-[16/10]"
          onClick={() => openLightbox(4)}
          onEnter={onPhotoEnter}
          onLeave={onPhotoLeave}
          reduced={reduced}
        />
        <PhotoTile
          photo={photos[5]}
          className="col-span-12 sm:col-span-4 -mt-4 sm:-mt-8"
          aspect="aspect-[3/4]"
          onClick={() => openLightbox(5)}
          onEnter={onPhotoEnter}
          onLeave={onPhotoLeave}
          reduced={reduced}
        />

        {/* Row 3: landscape wide + portrait */}
        <PhotoTile
          photo={photos[6]}
          className="col-span-12 sm:col-span-7 mt-8"
          aspect="aspect-[16/9]"
          onClick={() => openLightbox(6)}
          onEnter={onPhotoEnter}
          onLeave={onPhotoLeave}
          reduced={reduced}
        />
        <PhotoTile
          photo={photos[7]}
          className="col-span-7 sm:col-span-5 sm:mt-12"
          aspect="aspect-[3/4]"
          onClick={() => openLightbox(7)}
          onEnter={onPhotoEnter}
          onLeave={onPhotoLeave}
          reduced={reduced}
        />

        {/* Row 4: final landscape */}
        <PhotoTile
          photo={photos[8]}
          className="col-span-12 mt-4"
          aspect="aspect-[21/9]"
          onClick={() => openLightbox(8)}
          onEnter={onPhotoEnter}
          onLeave={onPhotoLeave}
          reduced={reduced}
        />
      </div>

      <PhotoLightbox
        photo={currentPhoto}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </section>
  );
}

interface PhotoTileProps {
  photo: Photo;
  className: string;
  aspect: string;
  onClick: () => void;
  onEnter: () => void;
  onLeave: () => void;
  reduced: boolean;
  offset?: number;
}

function PhotoTile({ photo, className, aspect, onClick, onEnter, onLeave, reduced, offset = 0 }: PhotoTileProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset * 0.5, -offset * 0.5]);

  return (
    <motion.button
      ref={ref}
      style={reduced ? {} : { y }}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      whileInView={reduced ? {} : { opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden bg-ink-800 ${className}`}
      aria-label={`Open photo: ${photo.caption}`}
    >
      <div className={`relative w-full ${aspect} h-full`}>
        <img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />

        {/* Metadata — bottom left */}
        <div className="absolute bottom-0 left-0 p-3 sm:p-4">
          <p className="font-nemoy-thin text-[8px] uppercase tracking-ultra text-bone/80 sm:text-[9px]">
            {photo.title}
          </p>
          <p className="mt-0.5 font-nemoy-thin text-[7px] uppercase tracking-wide text-bone/50 sm:text-[8px]">
            {photo.location} · {photo.date}
          </p>
        </div>

        {/* Download badge */}
        {photo.downloadable && (
          <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="border border-bone/30 bg-ink/50 px-2 py-1 font-nemoy-thin text-[7px] uppercase tracking-ultra text-bone backdrop-blur-sm">
              FREE DOWNLOAD
            </span>
          </div>
        )}
      </div>
    </motion.button>
  );
}
