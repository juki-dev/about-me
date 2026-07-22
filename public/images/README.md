# Imágenes del portafolio

Esta carpeta gestiona **todas las imágenes de contenido** del sitio (fotos,
logos, capturas de proyectos, portadas del blog).

## ¿Por qué `public/` y no `src/assets/`?

Se eligió `public/` a propósito:

- Las imágenes de **proyectos** y **blog** se declaran como una ruta de texto
  en el _frontmatter_ de los archivos markdown de `content/`
  (`image: images/projects/mi-proyecto.jpg`). `public/` mapea directo a esas
  rutas por nombre, sin necesidad de `import` ni de `import.meta.glob` en
  código — coherente con el flujo "agregar un `.md` y listo".
- El autor deja caer un archivo aquí y lo referencia por su ruta; no hay paso
  de build por imagen.

Contrapartida: los archivos en `public/` **no** pasan por el optimizado/hash
de Vite. Para un portafolio es un intercambio aceptable. Si en el futuro se
requiere optimización agresiva (hashing, `srcset`, compresión), esas imágenes
puntuales pueden moverse a `src/assets/` e importarse desde el componente.

## Cómo referenciar una imagen

Siempre con una ruta **relativa a `public/`** (sin `/` inicial). El helper
`src/utils/assets.ts` le antepone la BASE_URL, así funciona igual en local
(`/`) y en GitHub Pages (`/about-me/`). También se aceptan URLs absolutas
(`https://…`).

- Proyectos / Blog → campo `image` en el frontmatter del `.md`.
- Foto y logo → `photo` / `logo` en `src/data/profile.ts`.
- Logos de trayectoria → campo `logo` en `src/data/trayectoria.ts`.

Mientras el campo esté en `null`, la interfaz muestra un marcador de posición
(placeholder), así que el layout nunca se rompe por una imagen faltante.

## Imágenes pendientes

Nombres sugeridos; ajústalos si prefieres, solo mantén sincronizada la ruta
en el dato/frontmatter correspondiente.

### Perfil — `profile/`
- [ ] `images/profile/avatar.jpg` — foto del hero (cuadrada, ~440×440) →
  `profile.photo`

### Marca — `logo/`
- [ ] `images/logo/juki-dev.png` — logo de la barra de navegación
  (cuadrado/circular) → `profile.logo`

### Proyectos — `projects/` (campo `image` en cada `.md`)
- [ ] `images/projects/sensor-fleet-dashboard.jpg`
- [ ] `images/projects/inventory-manager.jpg`
- [ ] `images/projects/cicd-pipeline-toolkit.jpg`
- [ ] `images/projects/telemetry-analytics.jpg`
- [ ] `images/projects/client-portal.jpg`
- [ ] `images/projects/edge-gateway-firmware.jpg`

### Blog — `blog/` (campo `image` en cada `.md`)
- [ ] `images/blog/disenando-arquitecturas-iot-resilientes.jpg`
- [ ] `images/blog/de-monolito-a-microservicios-con-docker.jpg`
- [ ] `images/blog/typescript-en-equipos-full-stack.jpg`

### Trayectoria — `trayectoria/` (campo `logo` en `src/data/trayectoria.ts`)
- [ ] `images/trayectoria/course-1.png` … `course-4.png`
- [ ] `images/trayectoria/edu-1.png`, `edu-2.png`
- [ ] `images/trayectoria/vol-1.png` … `vol-3.png`

> Nota: para imágenes **dentro del cuerpo** de un markdown, usa una URL
> absoluta (`https://…`) o una ruta que empiece por la BASE_URL, ya que esas
> no pasan por el helper de resolución.
