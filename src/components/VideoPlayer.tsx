import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { VideoItem } from '@/data/videos';

interface VideoPlayerProps {
  video: VideoItem | null;
  onClose: () => void;
}

export function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink/95 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-10 text-bone/60 transition-colors hover:text-bone"
            aria-label="Close video"
          >
            <X size={22} strokeWidth={1.5} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-5xl flex-col px-4"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-nemoy-med text-lg uppercase tracking-wide text-bone">
                  {video.title}
                </h3>
                <p className="mt-1 font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
                  {video.beta} · {video.category} · {video.date} · {video.duration}
                </p>
              </div>
              <p className="max-w-sm font-nemoy-thin text-xs leading-relaxed text-bone/50">
                {video.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
