import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { ProjectService } from '../ProjectService'

describe('ProjectService', () => {
  describe('Property 4: Tag Filtering Accuracy', () => {
    /**
     * Feature: portfolio-projects, Property 4: Tag Filtering Accuracy
     * Validates: Requirements 3.2, 3.4
     *
     * For any selected tag, when a tag filter is applied, the system SHALL display only
     * projects that contain that tag, and all displayed projects SHALL have the selected tag.
     */
    it('should filter projects by tag and ensure all results contain the selected tag', () => {
      const allProjects = ProjectService.getProjects()
      const allTags = ProjectService.getAllTags()

      fc.assert(
        fc.property(fc.integer({ min: 0, max: allTags.length - 1 }), (tagIndex) => {
          const selectedTag = allTags[tagIndex]
          const filteredProjects = ProjectService.filterProjectsByTag(selectedTag)

          // All filtered projects must contain the selected tag
          filteredProjects.forEach((project) => {
            expect(project.tags).toContain(selectedTag)
          })

          // All projects that contain the selected tag must be in the filtered results
          const expectedProjects = allProjects.filter((project) =>
            project.tags.includes(selectedTag)
          )
          expect(filteredProjects.length).toBe(expectedProjects.length)

          // Verify no projects without the tag are included
          filteredProjects.forEach((project) => {
            expect(project.tags.includes(selectedTag)).toBe(true)
          })

          return true
        }),
        { numRuns: 100 }
      )
    })
  })

  describe('Property 9: Project Data Validation', () => {
    /**
     * Feature: portfolio-projects, Property 9: Project Data Validation
     * Validates: Requirements 5.3, 5.4
     *
     * For any project in the data source, the system SHALL validate that all required fields
     * (id, title, shortDescription, fullDescription, tags) are present and non-empty.
     */
    it('should validate that all projects have required fields present and non-empty', () => {
      const projects = ProjectService.getProjects()

      fc.assert(
        fc.property(fc.integer({ min: 0, max: projects.length - 1 }), (index) => {
          const project = projects[index]

          // Validate required fields are present
          expect(project).toHaveProperty('id')
          expect(project).toHaveProperty('title')
          expect(project).toHaveProperty('shortDescription')
          expect(project).toHaveProperty('fullDescription')
          expect(project).toHaveProperty('tags')

          // Validate required fields are non-empty strings (except tags which is an array)
          expect(typeof project.id).toBe('string')
          expect(project.id.length).toBeGreaterThan(0)

          expect(typeof project.title).toBe('string')
          expect(project.title.length).toBeGreaterThan(0)

          expect(typeof project.shortDescription).toBe('string')
          expect(project.shortDescription.length).toBeGreaterThan(0)

          expect(typeof project.fullDescription).toBe('string')
          expect(project.fullDescription.length).toBeGreaterThan(0)

          // Validate tags is an array with at least one tag
          expect(Array.isArray(project.tags)).toBe(true)
          expect(project.tags.length).toBeGreaterThan(0)

          // Validate all tags are non-empty strings
          project.tags.forEach((tag: string) => {
            expect(typeof tag).toBe('string')
            expect(tag.length).toBeGreaterThan(0)
          })

          return true
        }),
        { numRuns: 100 }
      )
    })

    /**
     * Feature: portfolio-projects, Property 10: Graceful Data Handling
     * Validates: Requirements 5.4
     *
     * For any project with missing optional fields (images, link, date), the system SHALL
     * render the project without errors and display available information appropriately.
     */
    it('should handle projects with missing optional fields gracefully', () => {
      const projects = ProjectService.getProjects()

      fc.assert(
        fc.property(fc.integer({ min: 0, max: projects.length - 1 }), (index) => {
          const project = projects[index]

          // Verify that optional fields can be undefined or present
          // images is optional
          if (project.images !== undefined) {
            expect(Array.isArray(project.images)).toBe(true)
          }

          // link is optional
          if (project.link !== undefined) {
            expect(typeof project.link).toBe('string')
          }

          // date is optional
          if (project.date !== undefined) {
            expect(typeof project.date).toBe('string')
          }

          // status is optional
          if (project.status !== undefined) {
            expect(['completed', 'in-progress', 'archived']).toContain(project.status)
          }

          // Verify that even with optional fields missing, required fields are still present
          expect(project.id).toBeDefined()
          expect(project.title).toBeDefined()
          expect(project.shortDescription).toBeDefined()
          expect(project.fullDescription).toBeDefined()
          expect(project.tags).toBeDefined()

          return true
        }),
        { numRuns: 100 }
      )
    })
  })
})
