import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useScrolled } from '@/hooks/useUi';

const NAV = [
  { label: 'STORY', href: '#story' },
  { label: 'MUSIC', href: '#music' },
  { label: 'MERCH', href: '#merch' },
  { label: 'PHOTOS', href: '#photos' },
  { label: 'VIDEO', href: '#video' },
];

export function Header() {
  const scrolled = useScrolled(60);
  const localTime = useVisitorTime();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (href: string) => {
    setMenuOpen(false);

    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
            ? 'border-b border-bone/10 bg-ink/75 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1250px] items-center justify-between px-6 py-6 sm:px-8 lg:px-10 lg:py-7">
          {/* Logo */}
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-nemoy-med text-[18px] uppercase tracking-[0.28em] text-bone sm:text-[20px] lg:text-[22px]"
          >
            KORNER
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-10 lg:flex xl:gap-12">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNav(item.href);
                }}
                className="font-nemoy-thin text-[16px] uppercase tracking-[0.22em] text-bone/80 transition-colors duration-300 hover:text-bone xl:text-[17px]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Time, sound and mobile menu */}
          <div className="flex items-center gap-5 lg:gap-8">
            <div className="hidden items-center gap-2.5 lg:flex">
              <span className="font-nemoy-thin text-[16px] uppercase tracking-[0.14em] text-bone/85 xl:text-[17px]">
                {localTime.time}
              </span>

              <span className="font-nemoy-thin text-[12px] uppercase tracking-[0.16em] text-bone/50 xl:text-[13px]">
                {localTime.timeZone}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex items-center text-bone/80 transition-colors hover:text-bone lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={25} strokeWidth={1.5} />
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
    { label: 'INSTAGRAM', href: 'https://instagram.com' },
    { label: 'TIKTOK', href: 'https://tiktok.com' },
    { label: 'YOUTUBE', href: 'https://youtube.com' },
    { label: 'SPOTIFY', href: 'https://open.spotify.com' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] flex flex-col bg-ink lg:hidden"
        >
          {/* Mobile top bar */}
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-2">
              <span className="font-nemoy-thin text-[15px] uppercase tracking-[0.14em] text-bone/85">
                {localTime.time}
              </span>

              <span className="font-nemoy-thin text-[10px] uppercase tracking-[0.16em] text-bone/50">
                {localTime.timeZone}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-bone/80 transition-colors hover:text-bone"
              aria-label="Close menu"
            >
              <X size={25} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile navigation */}
          <nav className="flex flex-1 flex-col justify-center gap-3 px-6">
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
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`font-nemoy-thin uppercase tracking-[0.2em] text-bone transition-colors hover:text-ember ${
                  item.big ? 'text-4xl' : 'text-[24px]'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
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
  const visitorTimeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return 'UTC';
    }
  }, []);

  const [time, setTime] = useState('--:--');
  const [timeZone, setTimeZone] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formattedTime = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
        .format(now)
        .toUpperCase();

      const parts = new Intl.DateTimeFormat(undefined, {
        timeZoneName: 'short',
      }).formatToParts(now);

      const shortZone =
        parts.find((part) => part.type === 'timeZoneName')?.value ||
        visitorTimeZone;

      setTime(formattedTime);
      setTimeZone(shortZone);
    };

    updateTime();

    const interval = window.setInterval(updateTime, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [visitorTimeZone]);

  return {
    time,
    timeZone,
  };
}
