---
title: Diseñando arquitecturas IoT resilientes
date: 2026-07-10
excerpt: Patrones para mantener flotas de sensores en línea aun con conectividad intermitente.
tags: [IoT, Arquitectura]
image: null
---

Cuando un dispositivo IoT vive en el campo, la conectividad no es un detalle
de infraestructura: es una condición de diseño. Estos son los patrones que
más me han servido para mantener una flota de sensores útil incluso cuando
la red falla.

## 1. El dispositivo nunca confía en la red

Todo dato que un sensor produce debe poder sobrevivir localmente hasta que
la red vuelva. Un buffer persistente (flash, no solo RAM) evita que un
corte de segundos se convierta en una pérdida de datos.

## 2. Reintentos con backoff, no reintentos ansiosos

Reintentar cada segundo agota la batería y satura la red apenas vuelve la
señal. El backoff exponencial con jitter reparte la carga de reconexión de
toda la flota en el tiempo.

## 3. Idempotencia en el backend

Si un dispositivo reenvía un lote de lecturas porque no recibió el ACK a
tiempo, el backend debe poder deduplicar sin ambigüedad. Un identificador
determinista por lectura (dispositivo + timestamp) resuelve la mayoría de
los casos.

## 4. Observabilidad del propio gateway

No basta con monitorear los datos que el dispositivo envía; hay que
monitorear al dispositivo mismo — batería, intensidad de señal,
temperatura — para distinguir "el sensor está apagado" de "el sensor no
tiene cobertura".

Ninguno de estos patrones es exclusivo de IoT, pero en IoT las
consecuencias de ignorarlos son mucho más visibles: un sensor que pierde
datos no se puede simplemente "recargar la página".
