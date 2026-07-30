import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useScrolled } from '@/hooks/useUi';
import { SoundControl } from '@/components/SoundControl';

const NAV = [
  { label: 'MUSIC', href: '#music' },
  { label: 'MERCH', href: '#merch' },
  { label: 'PHOTOS', href: '#photos' },
  { label: 'VIDEO', href: '#video' },
];

const SOCIALS = [
  { label: 'INSTAGRAM', href: 'https://instagram.com' },
  { label: 'TIKTOK', href: 'https://tiktok.com' },
  { label: 'YOUTUBE', href: 'https://youtube.com' },
  { label: 'SPOTIFY', href: 'https://open.spotify.com' },
];

export function Header() {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);
  const localTime = useVisitorTime();

  const handleNav = (href: string) => {
    setMenuOpen(false);

    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-700 ${
          scrolled
            ? 'border-b border-bone/10 bg-ink/80 backdrop-blur-xl'
            : 'bg-gradient-to-b from-ink/70 to-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          {/* Left */}
          <div className="flex min-w-0 items-center gap-6">
            <a
              href="#top"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="shrink-0 font-nemoy-med text-base uppercase tracking-[0.32em] text-bone transition-opacity hover:opacity-70 sm:text-lg"
            >
              KORNER
            </a>

            <div className="hidden items-center gap-4 xl:flex">
              <span className="h-px w-7 bg-bone/20" />

              <div className="flex flex-col leading-none">
                <span className="font-nemoy-thin text-[9px] uppercase tracking-[0.28em] text-bone/65">
                  LOS ANGELES
                </span>

                <span className="mt-1 font-nemoy-thin text-[8px] uppercase tracking-[0.3em] text-ash">
                  DEC 2026
                </span>
              </div>
            </div>
          </div>

          {/* Center desktop nav */}
          <nav className="hidden items-center gap-9 md:flex lg:gap-12">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNav(item.href);
                }}
                className="relative py-2 font-nemoy-thin text-[13px] uppercase tracking-[0.26em] text-bone/75 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-bone after:transition-all after:duration-300 hover:text-bone hover:after:w-full lg:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden flex-col items-end leading-none lg:flex">
              <span className="font-nemoy-thin text-[11px] uppercase tracking-[0.22em] text-bone/80">
                {localTime.time}
              </span>

              <span className="mt-1 font-nemoy-thin text-[8px] uppercase tracking-[0.28em] text-ash">
                {localTime.timeZone}
              </span>
            </div>

            <div className="hidden sm:block">
              <SoundControl />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 text-bone/80 transition-colors hover:text-bone md:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNav={handleNav}
        localTime={localTime}
      />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  onNav,
  localTime,
}: {
  open: boolean;
  onClose: () => void;
  onNav: (href: string) => void;
  localTime: VisitorTime;
}) {
  const items: {
    label: string;
    href: string;
    big?: boolean;
  }[] = [
    { label: 'KORNER', href: '#top', big: true },
    ...NAV,
    ...SOCIALS,
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] flex flex-col bg-ink md:hidden"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-bone/10 px-5 py-5">
            <div className="flex flex-col">
              <span className="font-nemoy-thin text-xs uppercase tracking-[0.22em] text-bone/80">
                {localTime.time}
              </span>

              <span className="mt-1 font-nemoy-thin text-[8px] uppercase tracking-[0.28em] text-ash">
                {localTime.timeZone}
              </span>
            </div>

            <div className="block sm:hidden">
              <SoundControl />
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-bone/75 transition-colors hover:text-bone"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.4} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col justify-center gap-2 px-5">
            {items.map((item, index) => (
              <motion.a
                key={`${item.label}-${item.href}`}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  item.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                onClick={(event) => {
                  if (item.href.startsWith('#')) {
                    event.preventDefault();
                    onNav(item.href);
                  }
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`font-nemoy-thin uppercase tracking-[0.2em] text-bone transition-colors hover:text-ember ${
                  item.big ? 'mb-4 text-4xl' : 'text-2xl'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-bone/10 px-5 py-6">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="font-nemoy-thin text-[10px] uppercase tracking-[0.26em] text-bone/65">
                  LOS ANGELES
                </p>

                <p className="mt-2 font-nemoy-thin text-[9px] uppercase tracking-[0.28em] text-ash">
                  DEC 2026
                </p>
              </div>

              <p className="text-right font-nemoy-thin text-[8px] uppercase tracking-[0.24em] text-ash">
                local time
                <br />
                {localTime.timeZone}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface VisitorTime {
  time: string;
  timeZone: string;
}

function useVisitorTime(): VisitorTime {
  const timeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return 'LOCAL TIME';
    }
  }, []);

  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formattedTime = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now);

      setTime(formattedTime);
    };

    updateTime();

    const interval = window.setInterval(updateTime, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const shortTimeZone = useMemo(() => {
    try {
      const parts = new Intl.DateTimeFormat(undefined, {
        timeZoneName: 'short',
      }).formatToParts(new Date());

      const zoneName = parts.find(
        (part) => part.type === 'timeZoneName',
      )?.value;

      return zoneName || timeZone;
    } catch {
      return timeZone;
    }
  }, [timeZone]);

  return {
    time: time || '--:--',
    timeZone: shortTimeZone,
  };
}
