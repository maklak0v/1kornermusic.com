import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useUi';

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), reduced ? 500 : 2000);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[500] flex items-center justify-center bg-ink"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.h1
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-nemoy-black text-5xl uppercase tracking-tight text-bone sm:text-7xl"
            >
              KORNER
            </motion.h1>
            <div className="h-px w-40 overflow-hidden bg-bone/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="h-full w-full bg-bone/60"
              />
            </div>
            <motion.p
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={reduced ? {} : { opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash"
            >
              loading transmission
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
