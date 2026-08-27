# Imágenes del portafolio

El sitio tiene **dos lugares** para imágenes, según a qué pertenezcan.

## 1. Imágenes de contenido → dentro de la carpeta del post

Cada post y cada proyecto es una **carpeta**: un `index.md` con el texto y,
al lado, las imágenes que usa. El nombre de la carpeta es el slug de la URL.

```
content/blog/mi-post/
├── index.md
├── portada.jpg
├── diagrama.png
└── capturas/
    └── antes.png
```

Y se referencian con una ruta **relativa al `index.md`**, que casi siempre es
solo el nombre del archivo:

```markdown
---
image: portada.jpg
---

![Diagrama del flujo](diagrama.png)
![Estado previo](capturas/antes.png)
```

Eso es todo: dejas el archivo en la carpeta y lo nombras. Vite las indexa en
build (`src/content/images.ts`), les pone hash de contenido y les antepone la
BASE_URL, así que la misma referencia funciona en local (`/`) y en GitHub
Pages (`/about-me/`) sin editar nada después de desplegar.

Crear una entrada nueva es crear la carpeta con su `index.md` dentro. Una
carpeta sin `index.md` no se publica, y el build lo avisa en vez de dejarla
pasar en silencio.

Ventajas de este camino sobre `public/`:

- **Cache-busting automático.** El nombre publicado incluye un hash del
  contenido; si cambias la imagen, cambia la URL y el navegador no sirve la
  vieja.
- **El build falla si falta la imagen.** `npm run check:images` (parte de
  `npm run build`) recorre los `index.md` y corta el build ante una referencia
  que no existe, en vez de dejar un `<img>` roto en producción.
- **El post es una unidad.** Lo mueves, lo archivas o lo borras entero, sin
  imágenes huérfanas en otra carpeta.
- Las imágenes menores a 4 KB se incrustan como data URI, sin pedido HTTP.

### Escapes disponibles

- URL absoluta (`https://…`) o `data:` → pasa intacta.
- `images/…` → sigue apuntando a `public/images/` (útil para algo compartido
  entre varios posts, como el logo).
- `/content/blog/otro-post/x.png` → la carpeta de otro post.

## 2. Imágenes de interfaz → `public/images/`

Foto de perfil, logo y logos de trayectoria no pertenecen a ningún `.md`: son
datos de la interfaz. Siguen en `public/images/**` y se referencian con una
ruta relativa a `public/` (sin `/` inicial), p. ej.
`images/trayectoria/edu-1.png`. `src/utils/assets.ts` les antepone la
BASE_URL.

- Foto y logo → `photo` / `logo` en `src/data/profile.ts`.
- Logos de trayectoria → campo `logo` en `src/data/trayectoria.ts`.

Mientras el campo esté en `null`, la interfaz muestra un marcador de posición,
así que el layout nunca se rompe por una imagen faltante.

## Imágenes pendientes

### Perfil — `public/images/profile/`
- [ ] `images/profile/avatar.jpg` — foto del hero (cuadrada, ~440×440) →
  `profile.photo`

### Marca — `public/images/logo/`
- [x] `images/logo/juki-dev.png` — logo de la barra de navegación

### Trayectoria — `public/images/trayectoria/` (campo `logo` en `src/data/trayectoria.ts`)
- [ ] `images/trayectoria/course-1.png` … `course-4.png`
- [ ] `images/trayectoria/edu-1.png`, `edu-2.png`
- [ ] `images/trayectoria/vol-1.png` … `vol-3.png`

### Portadas de contenido (campo `image` en cada `index.md`, junto a él)
- [ ] `content/projects/sensor-fleet-dashboard/portada.jpg`
- [ ] `content/projects/inventory-manager/portada.jpg`
- [ ] `content/projects/cicd-pipeline-toolkit/portada.jpg`
- [ ] `content/projects/telemetry-analytics/portada.jpg`
- [ ] `content/projects/client-portal/portada.jpg`
- [ ] `content/projects/edge-gateway-firmware/portada.jpg`
- [ ] `content/blog/disenando-arquitecturas-iot-resilientes/portada.jpg`
- [ ] `content/blog/de-monolito-a-microservicios-con-docker/portada.jpg`
- [ ] `content/blog/typescript-en-equipos-full-stack/portada.jpg`
