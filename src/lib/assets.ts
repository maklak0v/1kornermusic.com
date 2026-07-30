/** Prefix a public asset with Vite's deployment base path (works on localhost, Vercel, and GitHub Pages). */
export function asset(path: string): string {
  const clean = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${clean}`;
}
