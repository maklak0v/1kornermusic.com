export interface SocialLink {
  label: string;
  url: string;
}

export const socialLinks: SocialLink[] = [
  { label: 'Instagram', url: 'https://instagram.com' },
  { label: 'TikTok', url: 'https://tiktok.com' },
  { label: 'YouTube', url: 'https://youtube.com' },
  { label: 'Spotify', url: 'https://open.spotify.com' },
  { label: 'SoundCloud', url: 'https://soundcloud.com' },
  { label: 'Threads', url: 'https://threads.net' },
];

export const headerSocial = socialLinks.slice(0, 4);
