---
name: escribir-contenido
description: Voz y tono del portafolio de juki-dev para redactar, reescribir o revisar contenido en español — posts del blog (content/blog/<slug>/index.md) y fichas de proyecto (content/projects/<slug>/index.md). Úsala antes de escribir la primera línea de cualquier .md bajo content/, y también al revisar un borrador existente o al traducir/adaptar texto ajeno a esta voz.
---

# Voz y tono — contenido del portafolio

Esta skill codifica cómo suena el contenido de este sitio. Los patrones salen
de los archivos que ya viven en `content/`: son la referencia, no un ideal.
Cuando dudes, abre un archivo existente y copia su forma.

## Principio rector

**Sobrio antes que impresionante.** El texto convence mostrando el mecanismo
y la magnitud, nunca con adjetivos. Si una frase se puede borrar sin perder
información, se borra.

La marca de la casa es la frase antiheroica: reconocer la expectativa
grandilocuente y desinflarla.

> Migrar un monolito a microservicios suena a rediseño heroico, pero la
> migración que mejor funcionó en mi experiencia fue la más aburrida.

> Ningún paso individual de esta migración fue espectacular. La suma, después
> de varios meses, sí lo fue.

## Reglas de voz (aplican a todo)

- **Español neutro, primera persona del singular** para el trabajo propio:
  *Construí, Desarrollé, Diseñé, Rediseñé, extraje, mantuve*. Nunca un
  "nosotros" que esconda quién hizo qué.
- **Presente atemporal** para explicar mecanismos; **pasado** para narrar lo
  que hiciste.
- **Nunca te diriges al lector.** Ni "tú" ni "usted" ni imperativos hacia
  fuera. Se usan construcciones impersonales: *hay que monitorear*, *conviene*,
  *basta con*, o el infinitivo como título de sección.
- **Sin preguntas retóricas, sin exclamaciones, sin emoji.** No aparece ni una
  sola en todo el corpus actual. Mantenlo así.
- **Toda afirmación fuerte trae mecanismo o número.** "Bajó de horas a menos de
  un minuto", "más de 300 sensores", "cero pérdida de lecturas". Si no tienes
  la cifra, **matiza en vez de inventarla**: *notable*, *significativamente*,
  *la mayoría de los casos*, *varias veces el volumen original*.
- **Anglicismos técnicos estándar se dejan en inglés** (backoff, jitter,
  buffer, gateway, health check, monorepo, offline-first, time-series). No los
  traduzcas a la fuerza; sí se integran a la sintaxis española.
- **Backticks para identificadores y rutas**: `updatedAt`, `interface`, `api/`.
- **Comillas dobles para el término prestado o irónico**: un cambio
  "rompiente", no se puede "recargar la página".
- **Raya (—) con moderación**, solo para incisos enumerativos:
  *monitorear al dispositivo mismo — batería, intensidad de señal,
  temperatura — para distinguir…*
- **Dos puntos como giro de sentido**, recurso frecuente y bienvenido:
  *la conectividad no es un detalle de infraestructura: es una condición de
  diseño.*

## Formato del archivo

- El cuerpo markdown va **con salto de línea manual a ~76 caracteres** (máximo
  78). El frontmatter **no** se parte, aunque pase de 90.
- Solo `##` en el cuerpo. El `title` del frontmatter hace de `#`; nunca
  escribas un `#` dentro del cuerpo.
- Sin negritas decorativas dentro de los párrafos. El corpus no usa `**` en el
  cuerpo de ningún post ni proyecto.
- Agregar contenido es agregar una carpeta con su `index.md` dentro; no se
  toca código. El nombre de la **carpeta** es el slug de la URL: minúsculas,
  guiones, sin tildes (`content/blog/disenando-arquitecturas-iot-resilientes/`).
- `image: null` hasta que exista el archivo real. Cuando exista, va en la
  misma carpeta que el `index.md` y se referencia solo por su nombre
  (`image: portada.jpg`), igual que las imágenes del cuerpo
  (`![Diagrama](diagrama.png)`).
- **Tags**: reutiliza el vocabulario existente antes de inventar uno —
  `AWS`, `Python`, `Vue`, `TypeScript`, `Docker`, `MongoDB`, `Node.js`, `IoT`,
  `DevOps`, `Arquitectura`, `Full-stack`. Dos por documento, tres como máximo.

## Post de blog

### Frontmatter

```yaml
---
title: TypeScript en equipos full-stack
date: 2026-06-05
excerpt: Cómo compartir tipos entre backend y frontend sin fricción.
tags: [TypeScript, Full-stack]
image: null
---
```

- `title`: español, mayúscula solo inicial y en nombres propios, **sin punto
  final**. Enuncia el tema, no promete resultados ("7 trucos para…" no existe
  aquí).
- `excerpt`: una sola frase, 8–14 palabras, **con punto final**. Dice qué se
  llevará el lector, no vende.
- `date`: ISO `YYYY-MM-DD`, sin comillas.

### Estructura del cuerpo

1. **Entradilla de 2–3 líneas, sin encabezado.** Plantea una tensión y la
   reencuadra de inmediato. Tres arranques válidos del corpus:
   - Expectativa → desmentido: *"suena a rediseño heroico, pero…"*
   - Promesa → matiz: *"La promesa de X es Y. La práctica tiene más matices."*
   - Definición → reencuadre con dos puntos: *"no es un detalle de
     infraestructura: es una condición de diseño."*
2. **3–4 secciones `##`.** Cada encabezado es **una afirmación completa**, no
   una etiqueta temática. El molde más característico es el contraste
   *X, no Y*:
   - `## Empezar por el borde, no por el núcleo`
   - `## La base de datos se parte al final, no al principio`
   - `## Un paquete de tipos, no una copia`
   - `## Los tipos no reemplazan la validación en runtime`

   Numera los `##` (`## 1. …`) **solo** si el post se presenta explícitamente
   como una lista de patrones.
3. **Un párrafo por sección**, 3–6 líneas. Estructura interna: qué falla →
   por qué → qué hacer en su lugar. **Sin viñetas**: las listas son territorio
   de las fichas de proyecto, no del blog.
4. **Cierre de 2–3 líneas que sube un nivel de abstracción.** Suele empezar
   por una negación (*"Ningún paso…", "Ninguno de estos patrones…"*) y termina
   con la consecuencia real. Es opcional: si la última sección ya cierra la
   idea, no fuerces un párrafo extra.

## Ficha de proyecto

### Frontmatter

```yaml
---
title: Sensor Fleet Dashboard
kicker: IoT
description: Monitoreo en tiempo real de sensores desplegados en campo.
tags: [AWS, Python]
image: null
order: 1
repoUrl: null
liveUrl: null
---
```

- `title`: **en inglés**, nombre de producto en Title Case
  (*Edge Gateway Firmware*, *Client Portal*). Contraste deliberado con el
  cuerpo, que va en español.
- `kicker`: categoría de una o dos palabras. Reutiliza las existentes —
  `IoT`, `Web app`, `DevOps`, `Data`.
- `description`: español, una frase nominal con punto final. Es la tarjeta del
  listado: qué es, no cómo se hizo.
- `order`: entero único; define el orden en la grilla. Toma el siguiente libre.

### Estructura del cuerpo — esqueleto fijo

Siempre estos tres encabezados, en este orden, con estas palabras exactas:

```markdown
## El problema

## La solución

## Resultado
```

**`## El problema`** — 3–5 líneas, **en tercera persona**. El protagonista es
el cliente o el equipo, no la tecnología: *"Un equipo de bodega necesitaba…"*,
*"Un cliente con más de 300 sensores…"*. Nombra la restricción concreta
(volumen, conectividad, tiempo) y por qué dolía. Aquí no aparece ninguna
herramienta.

**`## La solución`** — un párrafo + una lista.
- El párrafo abre con **verbo en primera persona y pasado**: *Construí,
  Desarrollé, Diseñé, Rediseñé*. Nombra el stack concreto y **cómo** resuelve
  el problema del apartado anterior, no solo qué se usó.
- Debajo, **3–4 viñetas**, una línea cada una, en forma nominal y con punto
  final: *"Buffer persistente en memoria flash ante cortes de conectividad."*
  Son capacidades del sistema, no tareas hechas. Nunca empiezan con verbo
  conjugado.

**`## Resultado`** — 2–3 líneas con dos mitades:
1. La magnitud del cambio, en formato antes → después: *"bajó de días a
   horas"*, *"de minutos a milisegundos"*, *"cero pérdida de registros"*.
2. La permanencia: qué sigue vivo hoy — *"se usa hoy como estándar interno en
   más de una decena de repositorios"*, *"el mismo firmware se reutiliza en
   varios despliegues de campo"*.

Nunca menciones nombres reales de clientes: *un cliente*, *un proveedor de
servicios*, *un proyecto de agricultura de precisión*.

## Antipatrones — no escribas así

| Evitar | Por qué | En su lugar |
| --- | --- | --- |
| "¡La solución definitiva!" | Hype sin dato | La magnitud medida del cambio |
| "Como sabrás, tú puedes…" | Apela al lector | *"Basta con…"*, *"Hay que…"* |
| "Mejoró muchísimo el rendimiento" | Adjetivo sin mecanismo | *"de minutos a milisegundos"* |
| "En este artículo veremos…" | Meta-texto de relleno | Entra directo a la tensión |
| `## Introducción` / `## Conclusión` | Etiqueta genérica | Encabezado que afirma algo |
| Viñetas en un post del blog | Rompe el formato de prosa | Un párrafo por sección |
| "utilizamos la herramienta X" | Plural difuso | *"Construí… con X"* |
| Inventar una cifra que no tienes | Falso dato | *"una reducción notable"* |

## Antes de dar por cerrado un archivo

1. ¿El cuerpo va cortado a ≤78 columnas y el frontmatter completo?
2. ¿Cada `##` afirma algo por sí solo, leído fuera de contexto?
3. ¿Cada número o superlativo es verificable? Si no, ¿está matizado?
4. ¿Cero emoji, cero exclamaciones, cero preguntas al lector, cero "tú"?
5. En un proyecto: ¿están los tres encabezados exactos, el `order` libre y el
   verbo en primera persona abriendo *La solución*?
6. En un post: ¿la entradilla plantea una tensión en las primeras dos líneas?
7. `npm run build` sigue pasando (el markdown se parsea en build time).
