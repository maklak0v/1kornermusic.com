import { useEffect, useRef, useState, createContext, useContext, type ReactNode } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundContextValue {
  soundOn: boolean;
  toggle: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSound() {
  return useContext(SoundContext);
}

const AMBIENT_URL = 'https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3';

export function SoundProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(AMBIENT_URL);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'none';
    audioRef.current = audio;
    setReady(true);

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!soundOn) {
      audio.play().then(() => {
        const fade = () => {
          if (!audioRef.current) return;
          if (audioRef.current.volume < 0.22) {
            audioRef.current.volume = Math.min(0.22, audioRef.current.volume + 0.02);
            requestAnimationFrame(fade);
          }
        };
        fade();
      }).catch(() => {});
      setSoundOn(true);
    } else {
      const fade = () => {
        if (!audioRef.current) return;
        if (audioRef.current.volume > 0.01) {
          audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.03);
          requestAnimationFrame(fade);
        } else {
          audioRef.current.pause();
        }
      };
      fade();
      setSoundOn(false);
    }
  };

  return (
    <SoundContext.Provider value={{ soundOn, toggle }}>
      {children}
    </SoundContext.Provider>
  );
}

export function SoundControl() {
  const ctx = useSound();
  const [hover, setHover] = useState(false);
  if (!ctx) return null;

  return (
    <button
      onClick={ctx.toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group flex items-center gap-2 font-nemoy-thin text-[11px] uppercase tracking-ultra text-bone/60 transition-colors hover:text-bone"
      aria-label={ctx.soundOn ? 'Turn sound off' : 'Turn sound on'}
      aria-pressed={ctx.soundOn}
    >
      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
        {ctx.soundOn ? (
          <Volume2 size={14} className={hover ? 'text-bone' : 'text-bone/60'} />
        ) : (
          <VolumeX size={14} className={hover ? 'text-bone' : 'text-bone/60'} />
        )}
      </span>
      <span className="hidden sm:inline">
        {ctx.soundOn ? 'SOUND ON' : 'SOUND OFF'}
      </span>
    </button>
  );
}
