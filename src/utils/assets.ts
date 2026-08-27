/**
 * Resolves an image path declared as data (a logo path in a data file, a
 * markdown frontmatter `image`, etc.) into a URL the browser can load.
 *
 * Images referenced this way live in `public/images/**` and are named by a
 * path relative to the public root, e.g. `images/projects/sensor-fleet.jpg`.
 * Because the site can be served from a subpath (GitHub Pages: /about-me/),
 * a bare `/images/…` would break — so those paths are prefixed with Vite's
 * BASE_URL. Absolute URLs (http(s):, protocol-relative, data:) are left
 * untouched.
 *
 * The function is idempotent: a URL that already carries the base prefix is
 * returned unchanged. That matters because content images are resolved once
 * by `src/content/images.ts` (to a hashed build URL) and may pass through
 * here again on their way to <ImageSlot>.
 */
export function resolvePublicAsset(path?: string | null): string | null {
  if (!path) return null
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path

  const base = import.meta.env.BASE_URL // "/" locally, "/about-me/" on Pages
  if (path.startsWith(base)) return path

  const clean = path.replace(/^\//, '')
  return `${base}${clean}`
}
