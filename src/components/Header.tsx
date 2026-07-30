import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useScrolled, useLosAngelesTime } from '@/hooks/useUi';
import { SoundControl } from '@/components/SoundControl';

const NAV = [
  { label: 'STORY', href: '#story' },
  { label: 'MUSIC', href: '#music' },
  { label: 'MERCH', href: '#merch' },
  { label: 'PHOTOS', href: '#photos' },
  { label: 'VIDEO', href: '#video' },
];

export function Header() {
  const scrolled = useScrolled(60);
  const laTime = useLosAngelesTime();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (href: string) => {
    setMenuOpen(false);

    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-700 ${
          scrolled
            ? 'border-b border-bone/8 bg-ink/70 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
          {/* Left: logo only */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-nemoy-med text-[15px] uppercase tracking-[0.28em] text-bone sm:text-[17px] lg:text-[18px]"
          >
            KORNER
          </a>

          {/* Center: nav */}
          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.href);
                }}
                className="font-nemoy-thin text-[13px] uppercase tracking-[0.24em] text-bone/80 transition-colors duration-300 hover:text-bone xl:text-[14px]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: time + sound + mobile menu */}
          <div className="flex items-center gap-4 sm:gap-5 lg:gap-6">
            <span className="timestamp hidden font-nemoy-thin text-[13px] uppercase tracking-[0.18em] text-bone/80 lg:inline xl:text-[14px]">
              {laTime}
            </span>

            <div className="hidden sm:flex items-center">
              <SoundControl />
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center text-bone/80 transition-colors hover:text-bone lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNav={handleNav}
        laTime={laTime}
      />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  onNav,
  laTime,
}: {
  open: boolean;
  onClose: () => void;
  onNav: (href: string) => void;
  laTime: string;
}) {
  const items: { label: string; href: string; big?: boolean }[] = [
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
          {/* top bar */}
          <div className="flex items-center justify-between px-6 py-5">
            <span className="timestamp font-nemoy-thin text-[13px] uppercase tracking-[0.18em] text-bone/80">
              {laTime}
            </span>

            <div className="block sm:hidden">
              <SoundControl />
            </div>

            <button
              onClick={onClose}
              className="text-bone/80 transition-colors hover:text-bone"
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.6} />
            </button>
          </div>

          {/* nav list */}
          <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
            {items.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    onNav(item.href);
                  }
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`font-nemoy-thin uppercase tracking-[0.2em] text-bone transition-colors hover:text-ember ${
                  item.big ? 'text-3xl' : 'text-[22px]'
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
