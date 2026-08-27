export interface TrayectoriaItem {
  id: string
  title: string
  subtitle: string
  tags: string[]
  logo: string | null
}

export const courses: TrayectoriaItem[] = [
  {
    id: "platzi-aws-fundamentos",
    title: "Introducción a AWS: Fundamentos de Cloud Computing",
    subtitle: "Platzi · 2023",
    tags: ["AWS", "Cloud"],
    logo: "images/trayectoria/platzi_aws_fundamentos.png",
  },
  {
    id: "platzi-vuejs-composition",
    title: "Vue.js: Componentes y Composition API",
    subtitle: "Platzi · 2023",
    tags: ["Vue", "Frontend"],
    logo: "images/trayectoria/platzi_vuejs_composition.png",
  },
  {
    id: "platzi-vuejs-fundamentos",
    title: "Vue.js: Introducción y Fundamentos",
    subtitle: "Platzi · 2023",
    tags: ["Vue", "Frontend"],
    logo: "images/trayectoria/platzi_vuejs_fundamentos.png",
  },
  {
    id: "platzi-pensamiento-lenguajes",
    title: "Pensamiento Lógico: Lenguajes de Programación",
    subtitle: "Platzi · 2023",
    tags: ["Fundamentos", "Programación"],
    logo: "images/trayectoria/platzi_pensamiento_lenguajes.png",
  },
  {
    id: "platzi-pensamiento-estructuras",
    title: "Pensamiento Lógico: Manejo de Datos, Estructuras y Funciones",
    subtitle: "Platzi · 2023",
    tags: ["Fundamentos", "Estructuras de datos"],
    logo: "images/trayectoria/platzi_pensamiento_estructuras.png",
  },
];

export const education: TrayectoriaItem[] = [
  {
    id: "aws_cp",
    title: "AWS Certified cloud practitioner – foundational",
    subtitle: "Amazon Web Services",
    tags: ["AWS", "Cloud"],
    logo: "images/trayectoria/cloud_practitioner.png",
  },
  {
    id: "edu-1",
    title: "Ingeniería electrónica",
    subtitle: "Universidad Nacional de Colombia· 2013 – 2018",
    tags: ["IoT", "Electrónica"],
    logo: "images/trayectoria/unal.svg",
  },
  {
    id: "edu-2",
    title: "Bachiller académico con enfasis en pedagogía",
    subtitle: "Normal superior de Caldas · 2007 – 2012",
    tags: ["Bachillerato", "Pedagogía"],
    logo: "images/trayectoria/normal.jpeg",
  },
];

export const volunteer: TrayectoriaItem[] = [
  {
    id: "vol-1",
    title: "AWS User group",
    subtitle: "Manizales",
    tags: ["AWS", "Cloud"],
    logo: "images/trayectoria/ug_aws.jpeg",
  },
  // {
  //   id: "vol-2",
  //   title: "Cruz Roja",
  //   subtitle: "Seccional Caldas",
  //   tags: ["Comunidad", "Voluntariado", "rescate"],
  //   logo: "images/trayectoria/cruz_roja.jpeg",
  // },
  {
    id: "vol-3",
    title: "IEEE Student Branch",
    subtitle:
      "Chair of the IEEE Student Branch of the Universidad Nacional de Colombia",
    tags: ["universidad", "tecnología", "IEEE"],
    logo: "images/trayectoria/ieee.png",
  },
];
