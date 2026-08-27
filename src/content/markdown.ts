import { load as parseYaml } from 'js-yaml'
import { marked } from 'marked'
import { resolveContentImage } from './images'

marked.setOptions({ gfm: true, breaks: false })

// Images in a markdown body are emitted by hand rather than by marked's
// default renderer, to add the loading hints every content image should
// carry. The `src` arriving here has already been rewritten to a real URL by
// the walkTokens pass in renderMarkdown.
marked.use({
  renderer: {
    image({ href, title, text }) {
      const attrs = [
        `src="${escapeAttribute(href)}"`,
        `alt="${escapeAttribute(text ?? '')}"`,
        title ? `title="${escapeAttribute(title)}"` : '',
        'loading="lazy"',
        'decoding="async"',
      ].filter(Boolean)
      return `<img ${attrs.join(' ')}>`
    },
  },
})

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

/** Escapes a value for interpolation into a double-quoted HTML attribute. */
function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Splits a raw markdown file into its YAML frontmatter (as data) and the
 * remaining markdown body. Files without a frontmatter block are treated
 * as body-only, with empty data.
 */
export function parseFrontmatter<T>(raw: string): {
  data: Partial<T>
  body: string
} {
  const match = FRONTMATTER_RE.exec(raw)
  if (!match) {
    return { data: {}, body: raw }
  }
  const [, yamlBlock, body] = match
  const data = (parseYaml(yamlBlock) ?? {}) as Partial<T>
  return { data, body }
}

/**
 * Renders a markdown body to HTML. Content is authored by the site owner
 * (files under /content), so the output is trusted for v-html.
 *
 * `assetDir` is the folder the body's images are named against — pass the
 * post's own folder (see assetDirFromPath), so an image reference is just a
 * path relative to the index.md that holds it and comes out as the hashed,
 * base-prefixed URL Vite emitted for it.
 */
export function renderMarkdown(body: string, assetDir?: string): string {
  return marked.parse(body, {
    async: false,
    walkTokens: (token) => {
      if (token.type === 'image' && assetDir) {
        token.href = resolveContentImage(token.href, assetDir)
      }
    },
  }) as string
}

/**
 * Derives a URL slug from a content file's path. Each post is a folder
 * holding its index.md and its images, so the folder name is the slug:
 * "/content/blog/my-post/index.md" -> "my-post".
 */
export function slugFromPath(path: string): string {
  const segments = path.split('/')
  return segments[segments.length - 2] ?? path
}
