import { assetDirFromPath, resolveContentImage } from './images'
import { parseFrontmatter, renderMarkdown, slugFromPath } from './markdown'
import type { ProjectDoc, ProjectFrontmatter } from './types'

// Every project is a folder under /content/projects: an index.md with the body,
// plus the images it references. Adding one is adding a folder — no code change.
const files = import.meta.glob<string>('/content/projects/*/index.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const projects: ProjectDoc[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter<ProjectFrontmatter>(raw)
    // Images sit next to the index.md, so both the frontmatter cover and the
    // body reference them by a path relative to it.
    const dir = assetDirFromPath(path)
    return {
      slug: slugFromPath(path),
      title: data.title ?? slugFromPath(path),
      kicker: data.kicker ?? '',
      description: data.description ?? '',
      tags: data.tags ?? [],
      image: data.image ? resolveContentImage(data.image, dir) : null,
      order: data.order ?? 0,
      repoUrl: data.repoUrl ?? null,
      liveUrl: data.liveUrl ?? null,
      html: renderMarkdown(body, dir),
    }
  })
  .sort((a, b) => a.order - b.order)

export function getProjectBySlug(slug: string): ProjectDoc | undefined {
  return projects.find((project) => project.slug === slug)
}
