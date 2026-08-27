---
title: CI/CD Pipeline Toolkit
kicker: DevOps
description: Plantillas reusables de despliegue contenedorizado.
tags: [Docker]
image: null
order: 3
repoUrl: null
liveUrl: null
---

## El problema

Cada proyecto nuevo del equipo empezaba su pipeline de CI/CD desde cero,
repitiendo los mismos errores de configuración y tardando días en llegar a
un despliegue confiable.

## La solución

Construí un set de plantillas reusables de Docker y GitHub Actions que
cualquier proyecto puede adoptar en minutos: build multi-stage optimizado
por capas, escaneo de vulnerabilidades, y despliegue progresivo con
rollback automático.

- Imágenes base versionadas y firmadas.
- Escaneo de dependencias y de la imagen final en cada build.
- Despliegue azul-verde con rollback automático ante fallos de health check.
- Documentación viva embebida en el propio repositorio de plantillas.

## Resultado

El tiempo para llevar un proyecto nuevo a producción bajó de días a horas, y
el toolkit hoy se usa como estándar interno en más de una decena de
repositorios.
