# Trayecto — landing de validación (v1)

Prototipo de landing page para probar la intención de inscripción al concepto
seleccionado en la etapa *Which* ("Programa híbrido de formación, mentoría y
proyectos"). No es la plataforma final: es un experimento de tipo *fake
door / smoke test* para medir demanda antes de construir nada más.

## Qué incluye

- **Hero** con la propuesta de valor y CTA a la reserva.
- **El problema**, con datos reales del primer cuestionario (Anexo A).
- **El trayecto**, las 9 etapas del concepto seleccionado (diagnóstico →
  formación → práctica → mentoría → evaluación → evidencia → preparación
  profesional → vinculación → seguimiento).
- **Qué incluye**, priorizado con los porcentajes reales de la Casa de la
  Calidad (RT1–RT8).
- **Diferenciadores**, tomados de la sección 4.11 del documento.
- **Validación**, con los puntajes reales de la matriz de Pugh (8.00 / 8.25 /
  8.29) y por qué se eligió el concepto híbrido.
- **Modelo de cobro**, los 4 niveles de precio (boleto de arranque,
  estaciones desbloqueadas, rutas especializadas y fee de colocación) en
  tarjetas expandibles.
- **Preguntas frecuentes**, honestas sobre lo que todavía no está decidido
  (costo, garantía de empleo, etc.) — evita prometer de más.
- **Formulario de validación** (`ValidationForm`): perfil y comprensión del
  programa, intención de compra (qué aportación harían, qué modalidad de
  acceso preferirían, si pagarían por rutas especializadas o mentoría
  individual, si aceptarían el fee de éxito) y retroalimentación sobre la
  página. Es tu señal cuantitativa y cualitativa de intención de compra para
  el experimento.

Todo el texto y los datos están en `app/page.js`, en los arreglos
`STATIONS`, `BARS`, `CONCEPTS`, etc. — para editar copy no hace falta tocar
el diseño.

## Correrlo en local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Recibir las respuestas del formulario (importante)

El formulario hace `POST` a `/api/lead` (`app/api/lead/route.js`). Por
defecto, cada respuesta:

1. Se escribe en los **logs de la función** (visible en el dashboard de
   Vercel → tu proyecto → *Logs*). Esto ya es evidencia suficiente para
   cumplir con el punto 3 de la actividad si solo necesitas capturar 5
   respuestas rápido.
2. Si configuras la variable de entorno `LEADS_WEBHOOK_URL`, además se
   reenvía como JSON a esa URL — útil para juntar las respuestas en un
   Google Sheet en vez de leer logs.

### Opción recomendada: Google Sheets como base de datos

1. Crea un Google Sheet nuevo.
2. Extensiones → Apps Script, pega el contenido de
   [`scripts/AppScript.gs`](scripts/AppScript.gs) y guarda. Ese script está
   alineado con los campos que envía `ValidationForm`
   (`app/components/ValidationForm.js`) — si cambias las preguntas del
   formulario, actualiza también las columnas del script.
3. Implementar → Nueva implementación → Tipo "Aplicación web" → Ejecutar
   como "Yo" → Quién tiene acceso "Cualquier usuario". Copia la URL que te
   da.
4. En Vercel: Project → Settings → Environment Variables → agrega
   `LEADS_WEBHOOK_URL` con esa URL → vuelve a desplegar.

Si ya tienes la implementación creada y solo actualizas el código del
script, debes republicarla: **Implementar → Administrar implementaciones →
editar (lápiz) → Versión: Nueva versión → Implementar.** Guardar el script
sin este paso no actualiza la Web App ya desplegada.

### Alternativa: Formspree, Zapier, Make, etc.

Cualquier servicio que acepte un `POST` con JSON sirve — pon su URL en la
misma variable `LEADS_WEBHOOK_URL`.

## Desplegar en Vercel

**Opción A — desde GitHub (recomendada):**

```bash
git init
git add .
git commit -m "Trayecto v1"
```

Sube el repo a GitHub y en [vercel.com/new](https://vercel.com/new)
impórtalo. Vercel detecta Next.js automáticamente — no requiere
configuración adicional. Agrega `LEADS_WEBHOOK_URL` en Environment
Variables antes de desplegar si ya tienes tu Sheet listo.

**Opción B — con Vercel CLI:**

```bash
npm i -g vercel
vercel
```

Sigue las instrucciones; te da una URL pública lista para compartir.

## Personalizar diseño

Los tokens de color y tipografía están en `app/globals.css`, dentro de
`:root`. Cambiar `--route`, `--marigold`, etc. actualiza todo el sitio de
forma consistente.

## Sobre el sistema de diseño (para tu reporte)

- **Paleta**: papel frío (`#f3f4ef`), tinta (`#14182b`), azul-ruta
  (`#2542d6`) y marigold (`#f0a63d`) como acento de acción, verde señal
  (`#1f9e6b`) reservado para confirmaciones.
- **Tipografía**: Space Grotesk (display), IBM Plex Sans (cuerpo), IBM Plex
  Mono (códigos de estación, cifras).
- **Elemento distintivo**: el concepto de "trayecto" del propio documento
  (una ruta con estaciones) se convierte en el hilo visual de la página —
  una línea vertical con paradas numeradas (T-01…T-09) que representa
  literalmente las 9 etapas del programa, no un adorno genérico.

## Limitaciones de esta v1

- No hay base de datos propia; depende de un webhook externo o de los logs
  de Vercel.
- No hay analítica de tráfico incorporada (puedes agregar Vercel Analytics
  desde el dashboard si quieres medir visitas además de conversiones).
- Las preguntas del formulario son fijas en el código, no editables desde
  una interfaz — para este experimento no hacía falta un panel de admin.
