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

## El problema

Un cliente con más de 300 sensores ambientales desplegados en distintas
regiones necesitaba un único panel para saber, en todo momento, qué
dispositivos estaban en línea, cuáles reportaban lecturas fuera de rango y
cuáles llevaban demasiado tiempo sin enviar telemetría.

## La solución

Construí un dashboard en tiempo real sobre AWS IoT Core, con un backend en
Python (FastAPI) que procesa los mensajes MQTT entrantes y los persiste en
DynamoDB. El frontend consume esos datos por WebSocket para reflejar el
estado de la flota sin necesidad de refrescar la página.

- Ingesta de telemetría vía AWS IoT Core y reglas de enrutamiento a Lambda.
- Alertas configurables por umbral y por inactividad del dispositivo.
- Panel de mapa con el estado de cada sensor geolocalizado.
- Exportación de históricos a CSV para análisis externo.

## Resultado

El tiempo de detección de un sensor caído bajó de horas (reporte manual) a
menos de un minuto, y el equipo de campo prioriza sus visitas de
mantenimiento con datos en vez de intuición.
