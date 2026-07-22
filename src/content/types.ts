export interface ProjectFrontmatter {
  title: string
  kicker: string
  description: string
  tags: string[]
  image: string | null
  order: number
  repoUrl: string | null
  liveUrl: string | null
}

export interface ProjectDoc extends ProjectFrontmatter {
  slug: string
  html: string
}

export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  tags: string[]
  image: string | null
}

export interface PostDoc extends PostFrontmatter {
  slug: string
  html: string
}
