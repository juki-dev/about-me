import { assetDirFromPath, resolveContentImage } from './images'
import { parseFrontmatter, renderMarkdown, slugFromPath } from './markdown'
import type { PostDoc, PostFrontmatter } from './types'

// Every post is a folder under /content/blog: an index.md with the body,
// plus the images it references. Adding one is adding a folder — no code change.
const files = import.meta.glob<string>('/content/blog/*/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const posts: PostDoc[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter<PostFrontmatter>(raw)
    // Images sit next to the index.md, so both the frontmatter cover and the
    // body reference them by a path relative to it.
    const dir = assetDirFromPath(path)
    return {
      slug: slugFromPath(path),
      title: data.title ?? slugFromPath(path),
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      image: data.image ? resolveContentImage(data.image, dir) : null,
      html: renderMarkdown(body, dir),
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPostBySlug(slug: string): PostDoc | undefined {
  return posts.find((post) => post.slug === slug)
}

export function formatPostDate(iso: string): string {
  if (!iso) return ''
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}
