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
    duration: '03:42',
    status: 'released',
    artwork: asset('/images/IMG_7210_(IKON).webp'),
    backdropImage: asset('/images/youtube_(IKON).webp'),
    description:
      'The fourth transmission. A slow-burn anthem built for 4am warehouses and long drives through empty cities.',
    releaseDate: '2026.01.18',
    featured: true,
    previewAudio:
      'https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3',
    visualizerUrl: '#video',
    streaming: [
      {
        platform: 'All Platforms',
        url: 'https://artists.landr.com/991048270466',
      },
    ],
  },
  {
    id: 'de-piano',
    title: 'de_piano',
    version: 'beta_0.05',
    year: '2026',
    bpm: '92',
    duration: '04:15',
    status: 'upcoming',
    artwork:
      'https://images.pexels.com/photos/8722689/pexels-photo-8722689.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description:
      'A late-night piano piece recorded in one take. No edits, no corrections — just the room and the memory.',
    releaseDate: '2026 — coming soon',
    featured: false,
    previewAudio:
      'https://cdn.pixabay.com/audio/2023/06/19/audio_4de68fe9a3.mp3',
    visualizerUrl: '#video',
    streaming: [],
  },
];
