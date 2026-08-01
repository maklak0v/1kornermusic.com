import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { merch, type MerchProduct } from '@/data/merch';
import { SectionLabel, FadeIn } from '@/components/SectionLabel';
import { useCursor } from '@/components/CustomCursor';
import { useReducedMotion } from '@/hooks/useUi';

export function MerchSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cursor = useCursor();
  const reduced = useReducedMotion();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const titleX = useTransform(scrollYProgress, [0, 1], ['10%', '-20%']);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * (window.innerWidth > 768 ? 520 : 340), behavior: 'smooth' });
  };

  const onItemEnter = () => { cursor?.setLabel('SHOP'); cursor?.setVariant('shop'); };
  const onItemLeave = () => { cursor?.setLabel(null); cursor?.setVariant('default'); };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="merch" className="relative overflow-hidden bg-ink-950 py-28 sm:py-36">
      {/* Giant background word */}
      <motion.h2
        style={reduced ? {} : { x: titleX }}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-nemoy-black text-[22vw] leading-none tracking-tight text-bone/[0.025]"
      >
        MERCH
      </motion.h2>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionLabel index="03" title="MERCH" />
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <FadeIn>
            <h2 className="font-nemoy-thin text-5xl uppercase leading-none tracking-tight text-bone sm:text-7xl">
              objects from the
              <br />
              <span className="text-bone/40">world of KORNER.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-3">
              <span className="font-nemoy-thin text-[15px] uppercase tracking-ultra text-ash">
                FIRST DROP COMING SOON
              </span>
              <div className="hidden gap-2 sm:flex">
                <button
                  onClick={() => scrollBy(-1)}
                  className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/60 transition-colors hover:border-bone/50 hover:text-bone"
                  aria-label="Previous"
                >
                  <ArrowLeft size={14} strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => scrollBy(1)}
                  className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/60 transition-colors hover:border-bone/50 hover:text-bone"
                  aria-label="Next"
                >
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Horizontal product track */}
      <div
        ref={trackRef}
        className="relative mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:gap-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {merch.map((product, i) => (
          <ProductItem
            key={product.id}
            product={product}
            index={i}
            onEnter={onItemEnter}
            onLeave={onItemLeave}
            reduced={reduced}
          />
        ))}

        {/* Notify card at the end */}
        <div className="flex snap-center shrink-0 flex-col justify-center border border-bone/10 bg-ink-900 p-8 w-[85vw] sm:w-[480px]">
          <p className="font-nemoy-thin text-[15px] uppercase tracking-ultra text-ash">
            NOTIFY
          </p>
          <h3 className="mt-2 font-nemoy-med text-[29px] uppercase leading-tight tracking-wide text-bone">
            be first in line.
          </h3>
          <p className="mt-2 font-nemoy-thin text-[19px] leading-relaxed text-bone/50">
            notify me when the first drop begins.
          </p>
          {submitted ? (
            <p className="mt-6 font-nemoy-thin text-[19px] text-bone">
              you're on the list. we'll be in touch.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email address"
                className="border-b border-bone/20 bg-transparent py-3 font-nemoy-thin text-[19px] text-bone placeholder:text-ash focus:border-bone/60 focus:outline-none"
              />
              <button
                type="submit"
                className="mt-2 flex items-center justify-center border border-bone/30 py-3 font-nemoy-thin text-[16px] uppercase tracking-ultra text-bone transition-all hover:bg-bone hover:text-ink"
              >
                NOTIFY ME
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

interface ProductItemProps {
  product: MerchProduct;
  index: number;
  onEnter: () => void;
  onLeave: () => void;
  reduced: boolean;
}

function ProductItem({ product, index, onEnter, onLeave, reduced }: ProductItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <motion.div
      ref={cardRef}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex snap-center shrink-0 flex-col"
      style={{ width: 'min(85vw, 480px)' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-800">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          style={reduced ? {} : { y: imgY }}
          className="h-full w-full object-cover grayscale blur-md scale-105"
        />
        <div className="absolute inset-0 bg-ink/40" />

        {/* Coming soon centred */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span className="font-nemoy-thin text-[15px] uppercase tracking-ultra text-bone/50">
            {product.drop}
          </span>
          <span className="font-nemoy-med text-[25px] uppercase tracking-ultra text-bone sm:text-[29px]">
            COMING SOON
          </span>
        </div>

        {/* Code overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="font-nemoy-thin text-[14px] uppercase tracking-ultra text-bone/50">
            {product.code}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="font-nemoy-med text-[19px] uppercase tracking-wide text-bone">
            {product.name}
          </h3>
          <p className="mt-1 font-nemoy-thin text-[15px] uppercase tracking-ultra text-ash">
            {product.drop} · {product.price}
          </p>
        </div>
        <span className="font-nemoy-thin text-[15px] uppercase tracking-ultra text-bone/40 transition-colors group-hover:text-bone">
          {product.status === 'coming-soon' ? 'NOTIFY ME' : 'VIEW ITEM'}
        </span>
      </div>

      {/* Hover detail */}
      <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
        <p className="font-nemoy-thin text-[17px] leading-relaxed text-bone/50">
          {product.description}
        </p>
        <div className="mt-3 flex gap-1.5">
          {product.sizes.map((s) => (
            <span key={s} className="border border-bone/15 px-2 py-0.5 font-nemoy-thin text-[14px] uppercase text-bone/40">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
