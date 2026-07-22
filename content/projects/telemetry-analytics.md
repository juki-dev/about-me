---
title: Telemetry Analytics
kicker: Data
description: Pipeline de ingestión y visualización de métricas IoT.
tags: [MongoDB, Python]
image: null
order: 4
repoUrl: null
liveUrl: null
---

## El problema

Las métricas de los dispositivos IoT llegaban a un volumen que la base de
datos relacional original no soportaba, y las consultas de agregación para
los reportes tardaban minutos en resolverse.

## La solución

Rediseñé el pipeline de ingestión sobre MongoDB con esquemas orientados a
series de tiempo, agregaciones pre-calculadas por ventana y un servicio en
Python que expone los datos ya agregados a los paneles de visualización.

- Colecciones time-series nativas de MongoDB para telemetría de alta
  frecuencia.
- Agregaciones incrementales calculadas fuera del camino de escritura.
- API de consulta con caché para los rangos de fecha más solicitados.

## Resultado

Las consultas de reportes pasaron de minutos a milisegundos, y el pipeline
sostiene hoy varias veces el volumen de ingestión original sin degradar el
tiempo de respuesta.
