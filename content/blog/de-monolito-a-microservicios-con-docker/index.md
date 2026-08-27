---
title: De monolito a microservicios con Docker
date: 2026-06-28
excerpt: Lecciones de una migración real, paso a paso.
tags: [Docker, DevOps]
image: null
---

Migrar un monolito a microservicios suena a rediseño heroico, pero la
migración que mejor funcionó en mi experiencia fue la más aburrida: paso a
paso, con Docker como bisagra entre lo viejo y lo nuevo.

## Empezar por el borde, no por el núcleo

El primer servicio que extraje no fue el más importante del sistema, sino
el más aislado: el envío de notificaciones. Bajo riesgo, alto aprendizaje
sobre el proceso de extracción en sí.

## Contenerizar el monolito primero

Antes de partirlo, lo metí completo en un contenedor. Eso obligó a hacer
explícita toda la configuración implícita (rutas, variables de entorno,
dependencias del sistema) que años de despliegues manuales habían
acumulado.

## Un docker-compose por ambiente, no por servicio

En vez de multiplicar archivos de compose por cada microservicio nuevo,
mantuve un único árbol de composición por ambiente (local, staging) que
crecía a medida que un servicio se extraía. Facilitó ver el sistema
completo de un vistazo.

## La base de datos se parte al final, no al principio

Partir la base de datos antes que el código obliga a resolver consistencia
distribuida antes de tener los límites de dominio claros. Mejor mover
código primero, y dejar que los límites de datos se revelen con el uso.

Ningún paso individual de esta migración fue espectacular. La suma, después
de varios meses, sí lo fue.
