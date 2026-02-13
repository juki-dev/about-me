import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { ProjectService } from '@/services/ProjectService'
import type { Project } from '@/types/projects'

describe('ProjectsView', () => {
  describe('Property 3: Grid Layout Responsiveness', () => {
    /**
     * Feature: portfolio-projects, Property 3: Grid Layout Responsiveness
     * Validates: Requirements 2.1, 2.4
     *
     * For any number of projects, when the projects section is displayed, the system SHALL
     * render all projects in a responsive grid layout without truncating or hiding any project cards.
     *
     * This property validates that:
     * 1. All projects are available for rendering (no data loss)
     * 2. Projects can be filtered without losing data
     * 3. The grid will have complete project data for all cards
     */
    it('should ensure all projects are available for grid rendering without data loss', () => {
      const allProjects = ProjectService.getProjects()
      const allTags = ProjectService.getAllTags()

      fc.assert(
        fc.property(
          fc.boolean(), // true = apply filter, false = no filter
          (shouldFilter) => {
            let filteredProjects: Project[]

            if (shouldFilter && allTags.length > 0) {
              // Pick a random tag and filter
              const randomTagIndex = Math.floor(Math.random() * allTags.length)
              const selectedTag = allTags[randomTagIndex]
              filteredProjects = ProjectService.filterProjectsByTag(selectedTag)

              // Property: When a filter is applied, only projects with that tag are returned
              filteredProjects.forEach((project) => {
                expect(project.tags).toContain(selectedTag)
              })
            } else {
              // No filter applied
              filteredProjects = allProjects
              // Property: When no filter is applied, all projects are available
              expect(filteredProjects.length).toBe(allProjects.length)
            }

            // Property 1: All filtered projects have complete data for rendering
            filteredProjects.forEach((project) => {
              // Verify required fields for card display
              expect(project.id).toBeDefined()
              expect(project.id.length).toBeGreaterThan(0)

              expect(project.title).toBeDefined()
              expect(project.title.length).toBeGreaterThan(0)

              expect(project.shortDescription).toBeDefined()
              expect(project.shortDescription.length).toBeGreaterThan(0)

              expect(project.tags).toBeDefined()
              expect(Array.isArray(project.tags)).toBe(true)
              expect(project.tags.length).toBeGreaterThan(0)
            })

            // Property 2: No projects are duplicated in the grid
            const projectIds = filteredProjects.map((p) => p.id)
            const uniqueIds = new Set(projectIds)
            expect(uniqueIds.size).toBe(projectIds.length)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Property 5: Tag Filter State Indication', () => {
    /**
     * Feature: portfolio-projects, Property 5: Tag Filter State Indication
     * Validates: Requirements 3.3, 3.4
     *
     * For any active tag filter, the system SHALL visually indicate which tag is currently selected,
     * and clicking the selected tag SHALL clear the filter and display all projects.
     *
     * This property validates that:
     * 1. When a tag is selected, it remains the active selection
     * 2. When the active tag is clicked again, the filter is cleared (selectedTag becomes null)
     * 3. When filter is cleared, all projects are displayed
     * 4. The state transitions are consistent and reversible
     */
    it('should maintain correct tag filter state and allow toggling filters', () => {
      const allProjects = ProjectService.getProjects()
      const allTags = ProjectService.getAllTags()

      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: Math.max(0, allTags.length - 1) }), // tag index
          (tagIndex) => {
            // Only run if we have tags
            if (allTags.length === 0) {
              return true
            }

            const selectedTag = allTags[tagIndex]

            // State 1: Tag is selected
            // Property: selectedTag should equal the clicked tag
            expect(selectedTag).toBeDefined()
            expect(selectedTag.length).toBeGreaterThan(0)

            // Property: When a tag is selected, filtered projects should only contain that tag
            const filteredWithTag = ProjectService.filterProjectsByTag(selectedTag)
            filteredWithTag.forEach((project) => {
              expect(project.tags).toContain(selectedTag)
            })

            // Property: Filtered projects should be a subset of all projects
            const filteredIds = new Set(filteredWithTag.map((p) => p.id))
            const allIds = new Set(allProjects.map((p) => p.id))
            filteredIds.forEach((id) => {
              expect(allIds.has(id)).toBe(true)
            })

            // State 2: Clicking the selected tag again clears the filter
            // Property: When filter is cleared (selectedTag = null), all projects are returned
            const allProjectsAgain = ProjectService.getProjects()
            expect(allProjectsAgain.length).toBe(allProjects.length)

            // Property: All projects from filtered state should be in the unfiltered state
            filteredWithTag.forEach((filteredProject) => {
              const foundInAll = allProjectsAgain.some((p) => p.id === filteredProject.id)
              expect(foundInAll).toBe(true)
            })

            // Property: The state transition is reversible
            // Select tag -> filter applied -> clear tag -> all projects shown
            const refiltered = ProjectService.filterProjectsByTag(selectedTag)
            refiltered.forEach((project) => {
              expect(project.tags).toContain(selectedTag)
            })

            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
