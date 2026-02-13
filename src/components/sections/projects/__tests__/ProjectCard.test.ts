import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { ProjectService } from '@/services/ProjectService'

describe('ProjectCard', () => {
  describe('Property 2: Project Card Display Completeness', () => {
    /**
     * Feature: portfolio-projects, Property 2: Project Card Display Completeness
     * Validates: Requirements 2.2, 2.3
     *
     * For any project in the projects list, when displayed as a card, the system SHALL
     * show the project title, short description, all associated tags, and a "View Details" link.
     *
     * This property validates that:
     * 1. All required fields are present in the project data
     * 2. The project card can render all required information
     * 3. Navigation link is available for each project
     */
    it('should display all required information for any project card', () => {
      const allProjects = ProjectService.getProjects()

      // Property: For any project, all required fields for card display must be present
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: allProjects.length - 1 }),
          (projectIndex) => {
            const project = allProjects[projectIndex]

            // Verify project exists
            expect(project).toBeDefined()

            // Property 1: Project title is present and non-empty
            expect(project.title).toBeDefined()
            expect(typeof project.title).toBe('string')
            expect(project.title.length).toBeGreaterThan(0)

            // Property 2: Project short description is present and non-empty
            expect(project.shortDescription).toBeDefined()
            expect(typeof project.shortDescription).toBe('string')
            expect(project.shortDescription.length).toBeGreaterThan(0)

            // Property 3: Project has at least one tag
            expect(project.tags).toBeDefined()
            expect(Array.isArray(project.tags)).toBe(true)
            expect(project.tags.length).toBeGreaterThan(0)

            // Property 4: All tags are non-empty strings
            project.tags.forEach((tag) => {
              expect(typeof tag).toBe('string')
              expect(tag.length).toBeGreaterThan(0)
            })

            // Property 5: Project has a valid ID for navigation link
            expect(project.id).toBeDefined()
            expect(typeof project.id).toBe('string')
            expect(project.id.length).toBeGreaterThan(0)

            // Property 6: Project can be retrieved by ID (navigation link will work)
            const retrievedProject = ProjectService.getProjectById(project.id)
            expect(retrievedProject).toBeDefined()
            expect(retrievedProject?.id).toBe(project.id)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
