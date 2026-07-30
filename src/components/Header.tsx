import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useScrolled, useLosAngelesTime } from '@/hooks/useUi';
import { SoundControl } from '@/components/SoundControl';
import { headerSocial } from '@/data/social';

const NAV = [
  { label: 'MUSIC', href: '#music' },
  { label: 'MERCH', href: '#merch' },
  { label: 'PHOTOS', href: '#photos' },
  { label: 'VIDEO', href: '#video' },
];

const MOBILE_EXTRA = [
  { label: 'INSTAGRAM', href: 'https://instagram.com' },
  { label: 'TIKTOK', href: 'https://tiktok.com' },
  { label: 'YOUTUBE', href: 'https://youtube.com' },
  { label: 'SPOTIFY', href: 'https://open.spotify.com' },
];

export function Header() {
  const scrolled = useScrolled(60);
  const laTime = useLosAngelesTime();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (href: string) => {
    setMenuOpen(false);
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
            ? 'bg-ink/70 backdrop-blur-md border-b border-bone/5'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8">
          {/* Left: logo */}
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-nemoy-med text-sm uppercase tracking-ultra text-bone sm:text-base"
          >
            KORNER
          </a>

          {/* Center: nav (desktop) */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                className="font-nemoy-thin text-[11px] uppercase tracking-ultra text-bone/60 transition-colors duration-300 hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: time + sound + menu */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="timestamp hidden font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash lg:inline">
              {laTime}
            </span>
            <div className="hidden sm:block">
              <SoundControl />
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-1.5 text-bone/70 transition-colors hover:text-bone md:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNav={handleNav} laTime={laTime} />
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
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] bg-ink flex flex-col md:hidden"
        >
          {/* top bar */}
          <div className="flex items-center justify-between px-5 py-4">
            <span className="timestamp font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
              {laTime}
            </span>
            <div className="block sm:hidden">
              <SoundControl />
            </div>
            <button
              onClick={onClose}
              className="text-bone/70 transition-colors hover:text-bone"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* nav list */}
          <nav className="flex flex-1 flex-col justify-center gap-1 px-5">
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`font-nemoy-thin uppercase tracking-ultra text-bone transition-colors hover:text-ember ${
                  item.big ? 'text-3xl' : 'text-2xl'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* footer */}
          <div className="px-5 py-6">
            <p className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
              Los Angeles · 2026
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
