import { parseFrontmatter, renderMarkdown, slugFromPath } from './markdown'
import type { ProjectDoc, ProjectFrontmatter } from './types'

// Every project's body lives in a markdown file under /content/projects.
// Adding a new project is just adding a new .md file there — no code change.
const files = import.meta.glob<string>('/content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const projects: ProjectDoc[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter<ProjectFrontmatter>(raw)
    return {
      slug: slugFromPath(path),
      title: data.title ?? slugFromPath(path),
      kicker: data.kicker ?? '',
      description: data.description ?? '',
      tags: data.tags ?? [],
      image: data.image ?? null,
      order: data.order ?? 0,
      repoUrl: data.repoUrl ?? null,
      liveUrl: data.liveUrl ?? null,
      html: renderMarkdown(body),
    }
  })
  .sort((a, b) => a.order - b.order)

export function getProjectBySlug(slug: string): ProjectDoc | undefined {
  return projects.find((project) => project.slug === slug)
}
