import { useEffect, useRef, useState, createContext, useContext, type ReactNode } from 'react';

interface CursorContextValue {
  setLabel: (label: string | null) => void;
  setVariant: (variant: CursorVariant) => void;
}

type CursorVariant = 'default' | 'view' | 'listen' | 'play' | 'download' | 'shop';

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursor() {
  const ctx = useContext(CursorContext);
  return ctx;
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;
    document.body.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);

    const animate = () => {
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const scale = down ? 0.7 : variant !== 'default' ? 1.8 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [visible, down, variant]);

  const active = variant !== 'default' || label !== null;

  return (
    <CursorContext.Provider value={{ setLabel, setVariant }}>
      {children}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center transition-[opacity,width,height,border-color,background-color] duration-300"
        style={{
          width: active ? 64 : 32,
          height: active ? 64 : 32,
          borderRadius: '50%',
          border: `1px solid ${active ? 'rgba(232,228,220,0.9)' : 'rgba(232,228,220,0.35)'}`,
          backgroundColor: active ? 'rgba(232,228,220,0.06)' : 'transparent',
          opacity: visible ? 1 : 0,
          backdropFilter: active ? 'invert(1)' : 'none',
        }}
      >
        {label && (
          <span className="font-nemoy-thin text-[9px] uppercase tracking-ultra text-bone" style={{ filter: 'invert(1)' }}>
            {label}
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: 'rgba(232,228,220,0.8)',
          opacity: visible && !active ? 1 : 0,
        }}
      />
    </CursorContext.Provider>
  );
}
