import { parseFrontmatter, renderMarkdown, slugFromPath } from './markdown'
import type { PostDoc, PostFrontmatter } from './types'

// Every post's body lives in a markdown file under /content/blog.
// Adding a new post is just adding a new .md file there — no code change.
const files = import.meta.glob<string>('/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const posts: PostDoc[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter<PostFrontmatter>(raw)
    return {
      slug: slugFromPath(path),
      title: data.title ?? slugFromPath(path),
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      image: data.image ?? null,
      html: renderMarkdown(body),
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
