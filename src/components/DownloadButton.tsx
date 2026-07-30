import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { Photo } from '@/data/photos';
import { useCursor } from '@/components/CustomCursor';

interface DownloadButtonProps {
  photo: Photo;
  variant?: 'overlay' | 'standalone';
}

export function DownloadButton({ photo, variant = 'overlay' }: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const cursor = useCursor();

  if (!photo.downloadable) return null;

  const onEnter = () => { cursor?.setLabel('DOWNLOAD'); cursor?.setVariant('download'); };
  const onLeave = () => { cursor?.setLabel(null); cursor?.setVariant('default'); };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await fetch(photo.src);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = photo.downloadFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(photo.src, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  if (variant === 'standalone') {
    return (
      <button
        onClick={handleDownload}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        disabled={downloading}
        className="group flex items-center gap-2 border border-bone/30 px-5 py-3 font-nemoy-thin text-[11px] uppercase tracking-ultra text-bone transition-all duration-300 hover:bg-bone hover:text-ink disabled:opacity-50"
      >
        {downloading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} strokeWidth={1.5} />}
        DOWNLOAD FULL RESOLUTION
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      disabled={downloading}
      className="flex items-center gap-2 border border-bone/25 bg-ink/50 px-3 py-2 font-nemoy-thin text-[9px] uppercase tracking-ultra text-bone backdrop-blur-sm transition-all hover:bg-bone hover:text-ink disabled:opacity-50"
    >
      {downloading ? <Loader2 size={11} className="animate-spin" /> : <Download size={11} strokeWidth={1.5} />}
      DOWNLOAD
    </button>
  );
}
