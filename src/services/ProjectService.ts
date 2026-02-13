import { projects } from '@/data/projects'
import type { Project } from '@/types/projects'

export class ProjectService {
  /**
   * Get all projects
   */
  static getProjects(): Project[] {
    return projects
  }

  /**
   * Get a specific project by ID
   */
  static getProjectById(id: string): Project | undefined {
    return projects.find((project) => project.id === id)
  }

  /**
   * Get all unique tags from all projects
   */
  static getAllTags(): string[] {
    const tagsSet = new Set<string>()
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        tagsSet.add(tag)
      })
    })
    return Array.from(tagsSet).sort()
  }

  /**
   * Filter projects by a specific tag
   */
  static filterProjectsByTag(tag: string): Project[] {
    return projects.filter((project) => project.tags.includes(tag))
  }
}
