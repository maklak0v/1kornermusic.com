import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import type { StreamingLink } from '@/data/releases';

interface StreamingLinksModalProps {
  open: boolean;
  onClose: () => void;
  links: StreamingLink[];
  title: string;
}

const PLATFORM_ICONS: Record<string, string> = {
  Spotify: 'SP',
  'Apple Music': 'AM',
  'YouTube Music': 'YT',
  SoundCloud: 'SC',
  'Amazon Music': 'AZ',
  TIDAL: 'TD',
  Deezer: 'DZ',
};

export function StreamingLinksModal({ open, onClose, links, title }: StreamingLinksModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-4 w-full max-w-md border border-bone/10 bg-ink-900 p-8 sm:p-10"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-bone/50 transition-colors hover:text-bone"
              aria-label="Close"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <p className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
              listen now
            </p>
            <h3 className="mt-1 font-nemoy-med text-xl uppercase tracking-wide text-bone">
              {title}
            </h3>
            <div className="mt-2 h-px w-full bg-bone/10" />

            <div className="mt-6 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className="group flex items-center justify-between border-b border-bone/5 py-3.5 transition-colors hover:bg-bone/[0.03]"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-7 w-7 items-center justify-center border border-bone/20 font-nemoy-thin text-[9px] uppercase tracking-tight text-bone/50 transition-colors group-hover:border-bone/50 group-hover:text-bone">
                      {PLATFORM_ICONS[link.platform] || link.platform.slice(0, 2)}
                    </span>
                    <span className="font-nemoy-thin text-sm uppercase tracking-wide text-bone/70 transition-colors group-hover:text-bone">
                      {link.platform}
                    </span>
                  </div>
                  <Play size={14} className="text-bone/30 transition-all group-hover:translate-x-1 group-hover:text-bone" strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
