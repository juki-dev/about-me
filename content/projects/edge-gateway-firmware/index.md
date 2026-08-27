---
title: Edge Gateway Firmware
kicker: IoT
description: Firmware de puerta de enlace para dispositivos de borde.
tags: [IoT, AWS]
image: null
order: 6
repoUrl: null
liveUrl: null
---

## El problema

Los dispositivos de borde de un proyecto de agricultura de precisión
necesitaban agregar lecturas de varios sensores locales y reenviarlas a la
nube de forma confiable, incluso con conectividad celular inestable.

## La solución

Desarrollé el firmware de la puerta de enlace: agrega las lecturas de los
sensores conectados por LoRa, las almacena en un buffer local persistente y
las envía a AWS IoT Core por MQTT con reintentos exponenciales cuando la
conexión celular se restablece.

- Agregación de múltiples sensores LoRa en un único gateway.
- Buffer persistente en memoria flash ante cortes de conectividad.
- Actualizaciones de firmware over-the-air firmadas.
- Telemetría de salud del propio gateway (batería, señal, temperatura).

## Resultado

Cero pérdida de lecturas durante los cortes de conectividad celular, y el
mismo firmware se reutiliza hoy en varios despliegues de campo.
