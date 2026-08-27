import { resolvePublicAsset } from '../utils/assets'

/**
 * Every image that lives beside a markdown file under /content, mapped to the
 * URL Vite emits for it: BASE_URL-prefixed and content-hashed on build, or
 * inlined as a data URI when the file is small enough. Vite builds this map
 * statically, so adding an image is dropping a file into the post's folder —
 * no import, no code change, no URL to copy after deploying.
 */
const contentImages = import.meta.glob<string>(
  '/content/**/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true, query: '?url', import: 'default' },
)

/** Paths that resolve on their own and must be passed through untouched. */
const EXTERNAL_RE = /^(https?:)?\/\//

/** Assets that still live in public/images and are named from the public root. */
const PUBLIC_RE = /^\/?images\//

/**
 * Derives a content file's image folder from its path — the folder that holds
 * the post, images and all: "/content/blog/mi-post/index.md" ->
 * "/content/blog/mi-post".
 */
export function assetDirFromPath(path: string): string {
  return path.slice(0, path.lastIndexOf('/'))
}

/**
 * Turns an image reference written in a markdown file into a loadable URL.
 *
 * `src` is resolved against `dir` (the post's own folder), so it is simply a
 * path relative to the index.md that holds it: `![Diagrama](diagrama.png)`
 * for content/blog/mi-post/diagrama.png, `capturas/antes.png` for a
 * subfolder.
 *
 * Three escape hatches stay available: absolute URLs and data: URIs pass
 * through, `images/…` keeps pointing at public/ for assets shared between
 * posts, and a full `/content/…` path addresses another post's folder.
 *
 * A reference that matches nothing is a typo or a missing file. The build
 * catches it before deploying (scripts/check-content-images.mjs); in dev it
 * warns in the console and leaves the original text so the page still renders.
 */
export function resolveContentImage(src: string, dir: string): string {
  if (!src) return src
  if (EXTERNAL_RE.test(src) || src.startsWith('data:')) return src
  if (PUBLIC_RE.test(src)) return resolvePublicAsset(src) ?? src

  const relative = src.replace(/^\.\//, '')
  const key = relative.startsWith('/content/') ? relative : `${dir}/${relative}`
  const url = contentImages[key]
  if (url) return url

  if (import.meta.env.DEV) {
    console.warn(`[content] imagen no encontrada: "${src}" — se buscó en ${key}`)
  }
  return src
}
