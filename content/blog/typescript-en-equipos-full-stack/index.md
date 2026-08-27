---
title: TypeScript en equipos full-stack
date: 2026-06-05
excerpt: Cómo compartir tipos entre backend y frontend sin fricción.
tags: [TypeScript, Full-stack]
image: null
---

La promesa de TypeScript en un equipo full-stack es compartir un único
contrato de datos entre backend y frontend. La práctica tiene más matices.

## Un paquete de tipos, no una copia

Duplicar interfaces entre `api/` y `web/` funciona hasta que alguien
actualiza un lado y olvida el otro. Un paquete compartido dentro del mismo
monorepo, importado por ambos, elimina esa clase de bug por construcción.

## Los tipos no reemplazan la validación en runtime

TypeScript se borra al compilar. Un payload que llega mal formado desde
fuera del sistema no se detiene en un `interface`; hace falta validación en
runtime (por ejemplo con un esquema) en el borde de la API, y derivar los
tipos estáticos de ese esquema en vez de mantenerlos por separado.

## Generar tipos desde la fuente de verdad

Cuando el backend expone un esquema (OpenAPI, o el propio esquema de
validación), generar los tipos del frontend a partir de ahí evita que el
contrato compartido dependa de que alguien lo actualice a mano.

## El costo real es de proceso, no de lenguaje

La fricción de compartir tipos casi nunca es técnica: es acordar quién es
dueño del contrato y cuándo se considera un cambio "rompiente". Resolver
eso como equipo importa más que cualquier configuración de build.
