import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { Release } from '@/data/releases';

interface ReleasePlayerProps {
  release: Release;
}

export function ReleasePlayer({ release }: ReleasePlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !release.previewAudio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setCurrent(0);
    };

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [release.previewAudio]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
    } else {
      audio.play().then(() => {
        setPlaying(true);
        const update = () => {
          if (!audioRef.current) return;
          setCurrent(audioRef.current.currentTime);
          setProgress((audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100);
          rafRef.current = requestAnimationFrame(update);
        };
        update();
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
    setProgress(pct * 100);
    setCurrent(pct * duration);
  };

  const onVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.volume = pct;
    setVolume(pct);
    setMuted(pct === 0);
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // Generate waveform bars (deterministic, pseudo-random based on id)
  const bars = Array.from({ length: 48 }, (_, i) => {
    const seed = release.id.charCodeAt(0) + i;
    return 20 + ((seed * 37) % 60);
  });

  if (!release.previewAudio) return null;

  return (
    <div className="w-full">
      <audio ref={audioRef} src={release.previewAudio} preload="none" />

      {/* Waveform / progress */}
      <div className="group relative">
        <div
          onClick={onSeek}
          className="flex h-12 cursor-pointer items-center gap-[2px] overflow-hidden"
        >
          {bars.map((h, i) => {
            const active = (i / bars.length) * 100 <= progress;
            return (
              <div
                key={i}
                className="flex-1 transition-colors duration-150"
                style={{
                  height: `${h}%`,
                  backgroundColor: active ? 'rgba(232,228,220,0.7)' : 'rgba(232,228,220,0.15)',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone transition-colors hover:bg-bone hover:text-ink"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause size={14} strokeWidth={1.5} /> : <Play size={14} strokeWidth={1.5} className="ml-0.5" />}
          </button>
          <span className="timestamp font-nemoy-thin text-[20px] uppercase tracking-wide text-bone/50">
            {fmt(current)} / {fmt(duration)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="text-bone/40 transition-colors hover:text-bone"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={14} strokeWidth={1.5} /> : <Volume2 size={14} strokeWidth={1.5} />}
          </button>
          <div
            onClick={onVolume}
            className="hidden h-1 w-16 cursor-pointer bg-bone/15 sm:block"
          >
            <div className="h-full bg-bone/60" style={{ width: `${muted ? 0 : volume * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
