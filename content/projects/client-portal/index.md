---
title: Client Portal
kicker: Web app
description: Portal de clientes con autenticación y facturación.
tags: [TypeScript, Vue]
image: null
order: 5
repoUrl: null
liveUrl: null
---

## El problema

Los clientes de un proveedor de servicios recibían sus facturas por correo y
no tenían forma de consultar su historial de pagos ni actualizar sus datos
de facturación sin escribir a soporte.

## La solución

Desarrollé un portal de autoservicio en Vue 3 y TypeScript, con
autenticación propia, historial de facturas descargables y actualización de
métodos de pago integrada con la pasarela del proveedor.

- Autenticación con verificación por correo y sesiones renovables.
- Historial de facturas con descarga en PDF.
- Gestión de métodos de pago y de datos de facturación.
- Tipado compartido entre frontend y backend para evitar contratos rotos.

## Resultado

Las solicitudes de soporte relacionadas con facturación bajaron
significativamente, y los clientes ahora resuelven la mayoría de sus
gestiones sin intervención humana.
