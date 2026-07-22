export interface TrayectoriaItem {
  id: string
  title: string
  subtitle: string
  tags: string[]
  logo: string | null
}

export const courses: TrayectoriaItem[] = [
  {
    id: 'course-1',
    title: 'AWS Certified Solutions Architect – Associate',
    subtitle: 'Amazon Web Services · Coursera',
    tags: ['AWS', 'Cloud'],
    logo: null,
  },
  {
    id: 'course-2',
    title: 'Full Stack Open',
    subtitle: 'University of Helsinki',
    tags: ['Vue', 'Node.js'],
    logo: null,
  },
  {
    id: 'course-3',
    title: 'Docker & Kubernetes: The Complete Guide',
    subtitle: 'Udemy',
    tags: ['Docker'],
    logo: null,
  },
  {
    id: 'course-4',
    title: 'Python for Data Science and Machine Learning',
    subtitle: 'Udemy',
    tags: ['Python'],
    logo: null,
  },
]

export const education: TrayectoriaItem[] = [
  {
    id: 'edu-1',
    title: 'Ingeniería en Sistemas',
    subtitle: 'Universidad Nacional · 2014 – 2019',
    tags: ['Software'],
    logo: null,
  },
  {
    id: 'edu-2',
    title: 'Técnico en Electrónica y Telecomunicaciones',
    subtitle: 'Instituto Técnico · 2011 – 2013',
    tags: ['IoT'],
    logo: null,
  },
]

export const volunteer: TrayectoriaItem[] = [
  {
    id: 'vol-1',
    title: 'Code.org Colombia',
    subtitle: 'Mentor de programación',
    tags: ['Educación'],
    logo: null,
  },
  {
    id: 'vol-2',
    title: 'Cruz Roja',
    subtitle: 'Logística de eventos',
    tags: ['Comunidad'],
    logo: null,
  },
  {
    id: 'vol-3',
    title: 'Un Techo para mi País',
    subtitle: 'Voluntario de construcción',
    tags: ['Construcción'],
    logo: null,
  },
]
