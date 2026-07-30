# KORNER — official artist website

React + Vite + TypeScript + Tailwind + Framer Motion.

## Local development

```bash
npm ci
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## GitHub Pages

1. Keep the repository public.
2. Open **Settings → Pages** and select **GitHub Actions** as the source.
3. Push to `main`, then open the **Actions** tab.
4. The published project URL will be `https://maklak0v.github.io/kornermusic.com/`.

The Vite base path switches automatically only inside the Pages workflow, so local development and a future custom domain continue to use `/`.

## Content that still needs real links/files

The current build contains some demo Pexels images, demo audio, placeholder streaming/social URLs, and placeholder video embeds. Replace them in:

- `src/data/releases.ts`
- `src/data/photos.ts`
- `src/data/videos.ts`
- `src/data/merch.ts`
- `src/data/social.ts`

## Nemoy font

Place your licensed webfont files in `public/fonts/` using the filenames documented in `public/fonts/README.txt`. Font binaries are intentionally not included in this archive.
