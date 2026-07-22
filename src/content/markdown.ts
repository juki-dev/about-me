import { load as parseYaml } from 'js-yaml'
import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: false })

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

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
 */
export function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false }) as string
}

/** Derives a URL slug from a content file's path, e.g. "/content/blog/my-post.md" -> "my-post". */
export function slugFromPath(path: string): string {
  const file = path.split('/').pop() ?? path
  return file.replace(/\.md$/, '')
}
