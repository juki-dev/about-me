---
name: escribir-proyecto
description: Convierte un borrador crudo en una ficha de proyecto publicable bajo content/projects/<slug>/index.md, entrevistando al autor para cerrar los vacíos del relato. Úsala cuando se pida agregar, redactar o completar un proyecto del portafolio a partir de notas propias (content/drafts/*.md), o cuando haya que rehacer una ficha existente. Se apoya en la skill escribir-contenido para la voz y el tono.
---

# Escribir una ficha de proyecto

Esta skill toma material crudo — un `.md` que el autor escribió en sucio — y
lo convierte en una ficha de `content/projects/`. El borrador aporta los
hechos; la entrevista cierra lo que falta; la voz la pone
`escribir-contenido`.

El borrador **nunca se copia**. Es materia prima, no plantilla.

## Paso 0 — Cargar la voz

Antes de leer nada más, invoca la skill `escribir-contenido`. Sin ella no
tienes las reglas de voz, el esqueleto del cuerpo ni los antipatrones, y esta
skill asume que ya las conoces. Si ya se cargó en este turno, no la repitas.

## Paso 1 — Encontrar el borrador

Los borradores viven en `content/drafts/` como `.md` sueltos. El glob de Vite
solo lee `content/projects/*/index.md` y `content/blog/*/index.md`, así que esa
carpeta no entra al build.

- Si el usuario pasó una ruta como argumento, esa manda.
- Si no, lista `content/drafts/*.md` ignorando los que empiezan por `_`
  (`_plantilla.md` es la guía del autor, no un borrador).
- Un solo candidato: úsalo y dilo. Varios: pregunta cuál.
- Ninguno: apunta a `content/drafts/_plantilla.md` y ofrece hacer la
  entrevista completa sin borrador. Es un camino válido, solo más largo.

## Paso 2 — Inventariar el repo antes de preguntar

Lee `content/projects/*/index.md` y saca de ahí, **sin preguntar nada**:

| Dato | De dónde sale |
| --- | --- |
| `order` | El siguiente entero libre entre las fichas existentes |
| Vocabulario de `tags` | Los tags ya usados en todo `content/` |
| Vocabulario de `kicker` | `IoT`, `Web app`, `DevOps`, `Data` y los que haya |
| `slug` | Del `title` en inglés: minúsculas, guiones, sin tildes |
| `image` | Si existe el archivo en `public/images/projects/`; si no, `null` |

Preguntar algo que estaba en el repo o en el borrador es el peor error de
esta skill. Cada pregunta que haces gasta la paciencia del autor: reserva
esas fichas para lo que solo él sabe.

## Paso 3 — Mapear el borrador contra el esqueleto

Lee el borrador entero y ubica cada cosa en su casilla. El esqueleto de la
ficha es fijo: `## El problema`, `## La solución`, `## Resultado`.

| Señal en el borrador | Casilla |
| --- | --- |
| Quién sufría, cuántos, en qué contexto | El problema |
| Restricción concreta: volumen, conectividad, tiempo, presupuesto | El problema |
| Qué se rompía o cuánto costaba que se rompiera | El problema |
| Verbos de construcción, nombres de tecnología | La solución (párrafo) |
| Capacidades del sistema terminado | La solución (viñetas) |
| Cifras, antes/después, "ya no pasa X" | Resultado |
| "Todavía se usa", "se reutiliza en" | Resultado |

Lo que sobre después de llenar las casillas **no entra**. La ficha es corta
por diseño: unas 20 líneas de cuerpo. Si el material excedente da para un
tema propio, dilo al final en una línea y ofrece un post del blog — no lo
escribas sin que te lo pidan.

### Marca lo que hay que limpiar

El material crudo suele traer cosas que no pueden publicarse. Detéctalas en
esta pasada y resuélvelas tú, sin preguntar:

- **Nombres reales de clientes, empresas o personas** → anonimiza:
  *un cliente*, *un proveedor de servicios*, *un proyecto de agricultura de
  precisión*.
- **URLs internas, hosts, credenciales, IDs de tickets** → fuera.
- **Primera persona del plural** (*usamos*, *decidimos*) → primera del
  singular para el trabajo propio.
- **Adjetivos de venta** (*potente*, *robusto*, *definitivo*) → el mecanismo
  o la cifra que los justificaba, o nada.

Si dudas de si un nombre es público, trátalo como privado.

## Paso 4 — La entrevista

Pregunta **solo por los vacíos**. Recorre esta lista y salta todo lo que el
borrador ya respondió.

### Qué preguntar, por casilla

**El problema**
- Quién es el protagonista, en forma anonimizada, y de qué tamaño era
  (*un equipo de bodega*, *un cliente con más de 300 sensores*).
- La restricción concreta que apretaba, con su magnitud.
- Qué pasaba cuando la restricción ganaba: el costo real de no resolverlo.

**La solución**
- El stack concreto, con nombres propios de herramienta.
- El mecanismo: **cómo** eso resuelve el problema anterior. Un borrador
  suele decir qué usó y saltarse el cómo; ese es el vacío más frecuente.
- Tres o cuatro capacidades del sistema terminado.
- Qué decisión fue la no obvia, o qué alternativa se descartó. Casi siempre
  ahí está la frase que salva el párrafo.

**Resultado**
- La magnitud del cambio en formato antes → después.
- Qué sigue vivo hoy: dónde se usa, quién lo mantiene, qué se reutilizó.

**Frontmatter**
- `title` en inglés, Title Case: propón uno derivado del borrador.
- `kicker`: propón el que mejor calce del vocabulario existente.
- `description`: propón la frase; que la confirme o la corrija.
- `tags`: propón dos del vocabulario existente.
- `repoUrl` y `liveUrl`: si son públicos, la URL; si no, `null`.

### Cómo preguntar

- Agrupa en **una sola llamada a AskUserQuestion por casilla**, hasta cuatro
  preguntas. Dos rondas como máximo en total. Una ronda es lo normal cuando
  el borrador venía completo.
- **Ofrece opciones concretas derivadas del borrador**, no campos en blanco.
  Es más rápido corregir una propuesta que redactar desde cero, y siempre
  queda la opción libre.
- Propón el frontmatter ya resuelto para que solo lo confirme. No lo
  conviertas en un formulario de siete preguntas.

### La regla de las cifras

**Ninguna cifra sale de tu cabeza.** Si el borrador no la trae, pregunta una
vez. Si el autor no la tiene, matiza en vez de inventarla: *una reducción
notable*, *varias veces el volumen original*, *la mayoría de los casos*. No
insistas ni dejes un `TODO` en el archivo publicado.

Lo mismo con el "qué sigue vivo hoy": si no hay permanencia que contar, el
`## Resultado` se queda en la magnitud del cambio y ya. Un resultado corto y
cierto vale más que uno largo y adornado.

## Paso 5 — Escribir el archivo

Escribe directo `content/projects/<slug>/index.md` — crea la carpeta, que es
la que da el slug de la URL. Si el autor ya tiene imágenes, van en esa misma
carpeta y se referencian por nombre. El usuario revisa el diff en su editor,
así que no pidas permiso ni pegues la ficha completa en el chat antes de
crearla.

Aplicando lo de `escribir-contenido`: cuerpo cortado a ~76 columnas (78 como
techo), frontmatter sin partir, solo `##` en el cuerpo, sin negritas
decorativas, sin viñetas fuera de `## La solución`.

Después de escribir, resume en pocas líneas: la ruta del archivo, el `order`
asignado, y qué quedó matizado por falta de dato duro. Eso último es lo que
el autor querrá revisar primero.

## Paso 6 — Verificar

1. Los tres encabezados exactos, en orden, sin ninguno extra.
2. `## El problema` en tercera persona y sin una sola herramienta nombrada.
3. `## La solución` abre con verbo en primera persona y pasado, y sus viñetas
   son nominales — capacidades del sistema, no tareas hechas.
4. `## Resultado` trae magnitud, y permanencia si la había.
5. `order` libre y único; `slug` sin tildes; `image` apuntando a un archivo
   que existe, o `null`.
6. Cero cifras que no dijera el autor. Cero nombres reales de clientes.
7. Cero emoji, exclamaciones, preguntas al lector o "tú".
8. `npm run build` pasa — el markdown se parsea en build time y un
   frontmatter mal formado rompe la compilación, no la página.

## Rehacer una ficha existente

Mismo recorrido, con dos cambios: el "borrador" es la ficha actual más lo que
el usuario aporte en el chat, y el `order` **no se toca** salvo que lo pidan
explícitamente — mover uno reordena la grilla entera.
