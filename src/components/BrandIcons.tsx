interface IconProps {
  size?: number;
  className?: string;
}

export function SpotifyIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

export function AppleMusicIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 814 1000" fill="currentColor" className={className} aria-hidden="true">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 484.3 0 356 0 236.4 0 109.3 55.1 18 152 18c46.3 0 79 31.4 126.4 31.4 45.6 0 85.8-33.9 140.5-33.9 51.2 0 99 22.5 135.3 65.1 38.6-21.2 99.8-53.6 163.9-53.6 37.7 0 138.3 35.9 188.1 110.2zM483 74.2c-5.8 28.4-18.7 56.8-37.8 79.5-21.2 24.9-49 44.5-78.2 44.5-3.2 0-6.4-.3-9.6-.6-1.3-2.6-1.3-6.4-1.3-9.6 0-27.1 11.6-55.5 30.7-77.6 19.2-22.5 49.6-39.5 77.6-44.5 3.2-.6 6.4-.6 9-.6 3.2 0 6.4 0 9.6.9z" />
    </svg>
  );
}

export function YouTubeIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export const brandIconMap: Record<string, React.ComponentType<IconProps>> = {
  Spotify: SpotifyIcon,
  'Apple Music': AppleMusicIcon,
  'YouTube Music': YouTubeIcon,
  YouTube: YouTubeIcon,
};
