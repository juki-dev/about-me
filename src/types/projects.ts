export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  tags: string[]
  images?: string[]
  technologies: string[]
  link?: string
  date?: string
  status?: 'completed' | 'in-progress' | 'archived'
}

export interface ProjectsState {
  projects: Project[]
  selectedTag: string | null
  filteredProjects: Project[]
}
