---
title: Inventory Manager
kicker: Web app
description: Panel de inventario con sincronización offline-first.
tags: [Vue, Node.js]
image: null
order: 2
repoUrl: null
liveUrl: null
---

## El problema

Un equipo de bodega necesitaba registrar entradas y salidas de inventario
desde tablets, pero la conexión a internet del almacén era intermitente.
Perder un registro por un corte de red no era aceptable.

## La solución

Diseñé una aplicación Vue 3 con una capa de almacenamiento local (IndexedDB)
que funciona como fuente de verdad inmediata: cada movimiento se guarda
localmente al instante y se sincroniza con el backend en Node.js apenas hay
conexión, resolviendo conflictos por marca de tiempo.

- Cola de sincronización con reintentos automáticos.
- Resolución de conflictos determinista por `updatedAt`.
- Indicador de estado de sincronización visible en todo momento.
- Reportes de stock exportables en PDF y CSV.

## Resultado

Cero pérdida de registros durante los cortes de conectividad y una reducción
notable en el tiempo de conteo de inventario semanal.
