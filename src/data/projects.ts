import type { Project } from '@/types/projects'

export const projects: Project[] = [
  {
    id: 'criaturas-app',
    title: 'Criaturas App',
    shortDescription: 'Interactive creature discovery application built with Vue 3',
    fullDescription:
      'A comprehensive creature discovery platform that allows users to explore and learn about various creatures. Features include detailed creature profiles, filtering by characteristics, and an intuitive search interface.',
    tags: ['Vue 3', 'TypeScript', 'Frontend'],
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'CSS3'],
    images: ['/src/assets/img/LogoCriaturas.png'],
    date: '2024-01-15',
    status: 'completed'
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    shortDescription: 'Responsive portfolio showcasing professional experience and projects',
    fullDescription:
      'A modern, responsive portfolio website built with Vue 3 and TypeScript. Showcases professional experience, education, volunteer work, and project portfolio with smooth navigation and elegant design.',
    tags: ['Vue 3', 'TypeScript', 'Responsive Design'],
    technologies: ['Vue 3', 'TypeScript', 'Vue Router', 'Vite', 'CSS3'],
    date: '2024-02-01',
    status: 'completed'
  },
  {
    id: 'event-management',
    title: 'Event Management System',
    shortDescription: 'System for managing and organizing volunteer events',
    fullDescription:
      'A comprehensive event management system designed to streamline volunteer event organization. Includes event creation, participant management, scheduling, and communication features.',
    tags: ['Vue 3', 'TypeScript', 'Backend Integration'],
    technologies: ['Vue 3', 'TypeScript', 'Node.js', 'Database'],
    date: '2023-11-20',
    status: 'in-progress'
  },
  {
    id: 'education-platform',
    title: 'Education Platform',
    shortDescription: 'Online learning platform for course management and tracking',
    fullDescription:
      'An educational platform that enables course creation, student enrollment, progress tracking, and certification management. Designed to support both instructors and learners.',
    tags: ['Vue 3', 'TypeScript', 'Education Tech'],
    technologies: ['Vue 3', 'TypeScript', 'API Integration', 'Database'],
    date: '2023-09-10',
    status: 'completed'
  },
  {
    id: 'volunteer-tracker',
    title: 'Volunteer Hours Tracker',
    shortDescription: 'Application for tracking and managing volunteer hours',
    fullDescription:
      'A dedicated application for volunteers to log their hours, track contributions, and generate reports. Includes analytics and insights into volunteer activities.',
    tags: ['Vue 3', 'TypeScript', 'Analytics'],
    technologies: ['Vue 3', 'TypeScript', 'Charts.js', 'API'],
    date: '2023-08-05',
    status: 'completed'
  }
]
