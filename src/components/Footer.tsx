import { useRef, useState } from 'react';
import { KollabDice } from '@/components/KollabDice';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '@/data/social';
import { FadeIn } from '@/components/SectionLabel';
import { useReducedMotion } from '@/hooks/useUi';

const FINAL_IMG = 'https://images.pexels.com/photos/9694198/pexels-photo-9694198.jpeg?auto=compress&cs=tinysrgb&w=1800';

const CONTACT = [
  { label: 'BOOKING', email: 'booking@korner.fm' },
  { label: 'COLLABORATION', email: 'collab@korner.fm' },
  { label: 'PRESS', email: 'press@korner.fm' },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ['20%', '-10%']);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <footer ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink">
      {/* Background */}
      <motion.div
        style={reduced ? {} : { y: bgY, scale: bgScale }}
        className="absolute inset-0"
      >
        <img
          src={FINAL_IMG}
          alt=""
          className="h-full w-full object-cover opacity-30 grayscale-[60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/50 to-ink" />
      </motion.div>

      {/* Final statement */}
      <div className="relative flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <motion.div style={reduced ? {} : { y: textY }}>
          <FadeIn>
            <p className="font-nemoy-thin text-[11px] uppercase tracking-extreme text-ash">
              05 — END
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="mt-8 font-nemoy-med text-3xl uppercase leading-tight tracking-wide text-bone sm:text-5xl md:text-6xl">
              this is only
              <br />
              the beginning.
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-6 font-nemoy-thin text-sm tracking-wide text-bone/40">
              the next transmission is already being created.
            </p>
          </FadeIn>
        </motion.div>
      </div>

      {/* Newsletter + links */}
      <div className="relative mx-auto max-w-[1600px] px-5 pb-12 sm:px-8">
        <div className="grid grid-cols-1 gap-12 border-t border-bone/10 pt-12 md:grid-cols-3">
          {/* Newsletter */}
          <div>
            <p className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
              RECEIVE THE NEXT TRANSMISSION
            </p>
            {submitted ? (
              <p className="mt-4 font-nemoy-thin text-sm text-bone">
                you're connected. stay listening.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  className="border-b border-bone/20 bg-transparent py-2 font-nemoy-thin text-sm text-bone placeholder:text-ash focus:border-bone/60 focus:outline-none sm:flex-1"
                />
                <button
                  type="submit"
                  className="border border-bone/30 px-5 py-2.5 font-nemoy-thin text-[10px] uppercase tracking-ultra text-bone transition-all hover:bg-bone hover:text-ink"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

          {/* Social */}
          <div>
            <p className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
              CONNECT
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-bone/5 py-1.5 font-nemoy-thin text-sm uppercase tracking-wide text-bone/60 transition-colors hover:text-bone"
                >
                  {s.label}
                  <ArrowUpRight size={12} className="text-bone/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bone" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
              CONTACT
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {CONTACT.map((c) => (
                <a
                  key={c.label}
                  href={`mailto:${c.email}`}
                  className="group flex flex-col"
                >
                  <span className="font-nemoy-thin text-[9px] uppercase tracking-ultra text-ash">
                    {c.label}
                  </span>
                  <span className="font-nemoy-thin text-sm text-bone/60 transition-colors group-hover:text-bone">
                    {c.email}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-bone/10 pt-6 sm:flex-row sm:items-center">
          <p className="font-nemoy-med text-sm uppercase tracking-ultra text-bone">
            KORNER
          </p>
          <p className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
            LOS ANGELES · 2026
          </p>
          <p className="font-nemoy-thin text-[10px] uppercase tracking-ultra text-ash">
            music for the moments that stay with you.
          </p>
          <KollabDice />
        </div>
      </div>
    </footer>
  );
}
