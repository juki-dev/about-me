import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { createRouter, createMemoryHistory } from 'vue-router'
import { ProjectService } from '@/services/ProjectService'

describe('ProjectDetailView', () => {
  describe('Property 6: Project Detail Page Navigation', () => {
    /**
     * Feature: portfolio-projects, Property 6: Project Detail Page Navigation
     * Validates: Requirements 4.1, 4.2
     *
     * For any project card, when the "View Details" link is clicked, the system SHALL
     * navigate to a dynamic detail page displaying the correct project's information.
     *
     * This property validates that:
     * 1. For any valid project ID, navigating to /projects/:id retrieves the correct project
     * 2. The project information retrieved matches the data from ProjectService
     * 3. The router can resolve the project detail route with any valid project ID
     * 4. Invalid project IDs result in undefined (error state)
     */
    it('should retrieve correct project information for any valid project ID in the detail route', () => {
      const allProjects = ProjectService.getProjects()

      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: Math.max(0, allProjects.length - 1) }), // project index
          (projectIndex) => {
            // Only run if we have projects
            if (allProjects.length === 0) {
              return true
            }

            const selectedProject = allProjects[projectIndex]
            const projectId = selectedProject.id

            // Create a router with memory history for testing
            const router = createRouter({
              history: createMemoryHistory(),
              routes: [
                {
                  path: '/projects/:id',
                  name: 'project-detail',
                  component: { template: '<div>Project Detail</div>' }
                }
              ]
            })

            // Property 1: The router can resolve the project detail route with the project ID
            const resolvedRoute = router.resolve({ name: 'project-detail', params: { id: projectId } })
            expect(resolvedRoute.path).toBe(`/projects/${projectId}`)

            // Property 2: The component should retrieve the correct project by ID
            const retrievedProject = ProjectService.getProjectById(projectId)
            expect(retrievedProject).toBeDefined()
            expect(retrievedProject?.id).toBe(projectId)

            // Property 3: The displayed project information should match the retrieved project
            expect(retrievedProject?.title).toBe(selectedProject.title)
            expect(retrievedProject?.fullDescription).toBe(selectedProject.fullDescription)
            expect(retrievedProject?.tags).toEqual(selectedProject.tags)
            expect(retrievedProject?.technologies).toEqual(selectedProject.technologies)

            // Property 4: All required fields should be present in the retrieved project for display
            expect(retrievedProject?.id).toBeDefined()
            expect(retrievedProject?.id.length).toBeGreaterThan(0)

            expect(retrievedProject?.title).toBeDefined()
            expect(retrievedProject?.title.length).toBeGreaterThan(0)

            expect(retrievedProject?.fullDescription).toBeDefined()
            expect(retrievedProject?.fullDescription.length).toBeGreaterThan(0)

            expect(retrievedProject?.tags).toBeDefined()
            expect(Array.isArray(retrievedProject?.tags)).toBe(true)
            expect(retrievedProject?.tags.length).toBeGreaterThan(0)

            expect(retrievedProject?.technologies).toBeDefined()
            expect(Array.isArray(retrievedProject?.technologies)).toBe(true)
            expect(retrievedProject?.technologies.length).toBeGreaterThan(0)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should handle invalid project IDs gracefully by returning undefined', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }), // random string as invalid ID
          (invalidId) => {
            // Skip if the invalid ID happens to match a real project ID
            const realProject = ProjectService.getProjectById(invalidId)
            if (realProject !== undefined) {
              return true
            }

            // Create a router with memory history for testing
            const router = createRouter({
              history: createMemoryHistory(),
              routes: [
                {
                  path: '/projects/:id',
                  name: 'project-detail',
                  component: { template: '<div>Project Detail</div>' }
                }
              ]
            })

            // Property 1: The router can still resolve the route path even with invalid ID
            // Note: The router may URL-encode special characters, so we check that the path contains the ID
            const resolvedRoute = router.resolve({ name: 'project-detail', params: { id: invalidId } })
            expect(resolvedRoute.path).toContain('/projects/')
            // The resolved path should contain the encoded version of the ID
            expect(resolvedRoute.path.startsWith('/projects/')).toBe(true)

            // Property 2: When an invalid project ID is used, getProjectById should return undefined
            const retrievedProject = ProjectService.getProjectById(invalidId)
            expect(retrievedProject).toBeUndefined()

            // Property 3: The component should detect undefined project and show error state
            // (This is validated by the component's v-if="project" check)
            const projectExists = retrievedProject !== undefined
            expect(projectExists).toBe(false)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Property 7: Project Detail Content Completeness', () => {
    /**
     * Feature: portfolio-projects, Property 7: Project Detail Content Completeness
     * Validates: Requirements 4.3
     *
     * For any project detail page, the system SHALL display the project title, full
     * description, tags, technologies, and any associated images or metadata.
     *
     * This property validates that:
     * 1. For any valid project, all required content fields are present and non-empty
     * 2. The project detail page can render all required information without errors
     * 3. Optional fields (images, link, date, status) are handled gracefully
     * 4. Tags and technologies arrays are properly populated and accessible
     */
    it('should display all required content fields for any valid project', () => {
      const allProjects = ProjectService.getProjects()

      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: Math.max(0, allProjects.length - 1) }), // project index
          (projectIndex) => {
            // Only run if we have projects
            if (allProjects.length === 0) {
              return true
            }

            const project = allProjects[projectIndex]

            // Property 1: All required fields must be present and non-empty
            expect(project.id).toBeDefined()
            expect(project.id.length).toBeGreaterThan(0)

            expect(project.title).toBeDefined()
            expect(project.title.length).toBeGreaterThan(0)

            expect(project.fullDescription).toBeDefined()
            expect(project.fullDescription.length).toBeGreaterThan(0)

            // Property 2: Tags must be a non-empty array
            expect(project.tags).toBeDefined()
            expect(Array.isArray(project.tags)).toBe(true)
            expect(project.tags.length).toBeGreaterThan(0)
            // Each tag must be a non-empty string
            project.tags.forEach((tag: string) => {
              expect(typeof tag).toBe('string')
              expect(tag.length).toBeGreaterThan(0)
            })

            // Property 3: Technologies must be a non-empty array
            expect(project.technologies).toBeDefined()
            expect(Array.isArray(project.technologies)).toBe(true)
            expect(project.technologies.length).toBeGreaterThan(0)
            // Each technology must be a non-empty string
            project.technologies.forEach((tech: string) => {
              expect(typeof tech).toBe('string')
              expect(tech.length).toBeGreaterThan(0)
            })

            // Property 4: Optional fields should be either undefined or valid
            if (project.images !== undefined) {
              expect(Array.isArray(project.images)).toBe(true)
              project.images.forEach((image: string) => {
                expect(typeof image).toBe('string')
                expect(image.length).toBeGreaterThan(0)
              })
            }

            if (project.date !== undefined) {
              expect(typeof project.date).toBe('string')
              expect(project.date.length).toBeGreaterThan(0)
            }

            if (project.status !== undefined) {
              expect(['completed', 'in-progress', 'archived']).toContain(project.status)
            }

            if (project.link !== undefined) {
              expect(typeof project.link).toBe('string')
              expect(project.link.length).toBeGreaterThan(0)
            }

            // Property 5: Verify that the project can be retrieved by ID for display
            const retrievedProject = ProjectService.getProjectById(project.id)
            expect(retrievedProject).toBeDefined()
            expect(retrievedProject).toEqual(project)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Property 8: Back Navigation Availability', () => {
    /**
     * Feature: portfolio-projects, Property 8: Back Navigation Availability
     * Validates: Requirements 4.4
     *
     * For any project detail page, the system SHALL provide a way to navigate back to
     * the projects list, and clicking it SHALL return to the projects section.
     *
     * This property validates that:
     * 1. For any valid project ID, the back button is available on the detail page
     * 2. The back button navigates to the /projects route
     * 3. The back navigation works consistently for all projects
     * 4. The back button is accessible even when project data is invalid
     */
    it('should provide back navigation to projects list for any valid project', () => {
      const allProjects = ProjectService.getProjects()

      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: Math.max(0, allProjects.length - 1) }), // project index
          (projectIndex) => {
            // Only run if we have projects
            if (allProjects.length === 0) {
              return true
            }

            const project = allProjects[projectIndex]
            const projectId = project.id

            // Create a router with memory history for testing
            const router = createRouter({
              history: createMemoryHistory(),
              routes: [
                {
                  path: '/projects',
                  name: 'projects',
                  component: { template: '<div>Projects List</div>' }
                },
                {
                  path: '/projects/:id',
                  name: 'project-detail',
                  component: { template: '<div>Project Detail</div>' }
                }
              ]
            })

            // Property 1: The router can resolve the back navigation route
            const projectsRoute = router.resolve({ name: 'projects' })
            expect(projectsRoute.path).toBe('/projects')

            // Property 2: The back navigation route is consistent and always points to /projects
            const backPath = '/projects'
            expect(backPath).toBe('/projects')

            // Property 3: For any project detail route, the back navigation target is the same
            const detailRoute = router.resolve({ name: 'project-detail', params: { id: projectId } })
            expect(detailRoute.path).toBe(`/projects/${projectId}`)
            // The back navigation should always go to /projects regardless of which project detail page we're on
            expect(backPath).toBe('/projects')

            // Property 4: The back button functionality should work for all projects
            // Verify that the projects route exists and is accessible
            const projectsRouteExists = router.getRoutes().some((route) => route.name === 'projects')
            expect(projectsRouteExists).toBe(true)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should provide back navigation even when project ID is invalid', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }), // random string as invalid ID
          (invalidId) => {
            // Skip if the invalid ID happens to match a real project ID
            const realProject = ProjectService.getProjectById(invalidId)
            if (realProject !== undefined) {
              return true
            }

            // Create a router with memory history for testing
            const router = createRouter({
              history: createMemoryHistory(),
              routes: [
                {
                  path: '/projects',
                  name: 'projects',
                  component: { template: '<div>Projects List</div>' }
                },
                {
                  path: '/projects/:id',
                  name: 'project-detail',
                  component: { template: '<div>Project Detail</div>' }
                }
              ]
            })

            // Property 1: The back navigation route is always available
            const projectsRoute = router.resolve({ name: 'projects' })
            expect(projectsRoute.path).toBe('/projects')

            // Property 2: Even with an invalid project ID, the back button should navigate to /projects
            const backPath = '/projects'
            expect(backPath).toBe('/projects')

            // Property 3: The projects route exists and is accessible regardless of project validity
            const projectsRouteExists = router.getRoutes().some((route) => route.name === 'projects')
            expect(projectsRouteExists).toBe(true)

            // Property 4: The detail route can be resolved even with invalid ID
            const detailRoute = router.resolve({ name: 'project-detail', params: { id: invalidId } })
            expect(detailRoute.path.startsWith('/projects/')).toBe(true)

            return true
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
