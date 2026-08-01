import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

function useLiveTime() {
  const [display, setDisplay] = useState('--:--:--');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setDisplay(`${h}:${m}:${s}`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return display;
}

export function KollabDice({ compact = false }: { compact?: boolean }) {
  const time = useLiveTime();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex flex-col items-center gap-1.5 focus:outline-none"
        aria-label="Open Kollab Dice"
      >
        <img
          src="/images/_kollab.dice_logo.png"
          alt="Kollab Dice"
          className={`w-auto opacity-40 transition-opacity duration-300 group-hover:opacity-80 ${
            compact ? 'h-12' : 'h-10'
          }`}
        />
        {!compact && (
          <span className="font-nemoy-thin text-[10px] tabular-nums tracking-widest text-bone/40 transition-colors duration-300 group-hover:text-bone/70">
            {time}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="uc-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[500] flex items-center justify-center bg-ink/90 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center gap-8 px-10 py-16 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-0 top-0 text-bone/40 transition-colors hover:text-bone"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <img
                src="/images/_kollab.dice_logo.png"
                alt="Kollab Dice"
                className="h-24 w-auto opacity-60"
              />

              <div className="flex flex-col items-center gap-3">
                <p className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
                  COMING SOON
                </p>
                <h2 className="font-nemoy-black text-4xl uppercase tracking-tight text-bone sm:text-5xl">
                  Under Construction
                </h2>
                <p className="mt-2 max-w-xs font-nemoy-thin text-sm leading-relaxed text-bone/40">
                  something is being built here. check back soon.
                </p>
              </div>

              <span className="font-nemoy-thin text-[11px] tabular-nums tracking-widest text-bone/25">
                {time}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
