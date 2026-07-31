import { asset } from '@/lib/assets';

export interface StreamingLink {
  platform: string;
  url: string;
}

export interface Release {
  id: string;
  title: string;
  version: string;
  year: string;
  bpm: string;
  duration: string;
  status: 'released' | 'upcoming';
  artwork: string;
  backdropImage?: string;
  description: string;
  releaseDate: string;
  streaming: StreamingLink[];
  previewAudio?: string;
  visualizerUrl?: string;
  featured: boolean;
}

export const releases: Release[] = [
  {
    id: 'ikon',
    title: 'IKON',
    version: 'beta_0.04',
    year: '2026',
    bpm: '128',
    duration: '04:04',
    status: 'released',
    artwork: asset('/images/IMG_7210_(IKON).webp'),
    backdropImage: asset('/images/youtube_(IKON).webp'),
    description:
      'IKON began as a private chapter — created through late nights, unfinished memories and years of keeping the music inside.',
    releaseDate: '2026.07.17',
    featured: true,
    previewAudio: asset('/audio/ikon-preview.mp3'),
    visualizerUrl: '#video',
    streaming: [
      {
        platform: 'All Platforms',
        url: 'https://artists.landr.com/991048270466',
      },
    ],
  },
];
