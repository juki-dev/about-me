export interface TechTag {
  label: string
}

export const profile = {
  firstName: "Cristian Leandro",
  lastName: "Henao Santa",
  role: "IoT and Full-Stack Engineer",
  email: "jukidev13@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/cristianleandrohenaosanta/",
  githubUrl: "https://github.com/juki-dev",
  // Image paths relative to public/. Keep null to show the placeholder;
  // set to e.g. 'images/profile/avatar.jpg' once the file is added.
  photo: "images/profile/picture.png" as string | null,
  logo: "images/logo/juki-dev.png" as string | null,
};

export const techTags: TechTag[] = [
  { label: 'AWS' },
  { label: 'Python' },
  { label: 'Vue' },
  { label: 'TypeScript' },
  { label: 'Docker' },
  { label: 'MongoDB' },
]
