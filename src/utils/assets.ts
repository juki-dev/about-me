/**
 * Resolves an image path declared as data (markdown frontmatter `image`, a
 * logo path in a data file, etc.) into a URL the browser can load.
 *
 * Images live in `public/images/**` and are referenced by a path relative to
 * the public root, e.g. `images/projects/sensor-fleet.jpg`. Because the site
 * can be served from a subpath (GitHub Pages: /about-me/), a bare `/images/…`
 * would break — so relative paths are prefixed with Vite's BASE_URL. Absolute
 * URLs (http(s):, data:, protocol-relative) and already-rooted paths are left
 * untouched.
 */
export function resolvePublicAsset(path?: string | null): string | null {
  if (!path) return null
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path

  const base = import.meta.env.BASE_URL // "/" locally, "/about-me/" on Pages
  const clean = path.replace(/^\//, '')
  return `${base}${clean}`
}
