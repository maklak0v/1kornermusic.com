import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Photo } from '@/data/photos';
import { DownloadButton } from '@/components/DownloadButton';

interface PhotoLightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PhotoLightbox({ photo, onClose, onPrev, onNext }: PhotoLightboxProps) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-10 text-bone/60 transition-colors hover:text-bone"
            aria-label="Close"
          >
            <X size={22} strokeWidth={1.5} />
          </button>

          {/* Prev / Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-bone/40 transition-colors hover:text-bone sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-bone/40 transition-colors hover:text-bone sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>

          {/* Image + metadata */}
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[90vw] flex-col items-center"
          >
            <div className="relative max-h-[75vh] overflow-hidden">
              <img
                src={photo.src}
                alt={photo.caption}
                className={`max-h-[75vh] w-auto object-contain ${photo.orientation === 'portrait' ? 'max-w-[85vw]' : 'max-w-[90vw]'}`}
              />
            </div>

            {/* Metadata bar */}
            <div className="mt-5 flex w-full flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
                  {photo.title} · {photo.date}
                </span>
                <span className="font-nemoy-thin text-sm text-bone/70">
                  {photo.caption}
                </span>
                <span className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
                  {photo.location} · {photo.photographer} · {photo.resolution}
                </span>
              </div>
              {photo.downloadable && <DownloadButton photo={photo} variant="standalone" />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
