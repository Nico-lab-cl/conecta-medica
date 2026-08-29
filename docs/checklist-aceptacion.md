# Checklist de aceptación — estado real

Contra el §12 del brief. Sin adornos: lo que está verificado dice cómo se
verificó, y lo que no está verificado dice por qué.

Fecha: 2026-08-29

---

## Verificado

| Ítem | Estado | Cómo se comprobó |
|---|---|---|
| Sin scroll horizontal en 390 / 768 / 1366 | ✅ | Las 12 páginas cargadas en iframes de cada ancho, comparando `scrollWidth` contra `clientWidth`. Cero desbordes. |
| Una sola H1 por página | ✅ | Recuento sobre el HTML servido de las 12 rutas. Todas dan 1. |
| Canónica absoluta en todas las páginas | ✅ | Presente en las 12. |
| `title` ≤ 60 caracteres | ✅ | Máximo real: 55. Además el esquema de contenido **rechaza el build** si alguien escribe uno más largo desde el CMS. |
| Meta descripción ≤ 155 caracteres | ✅ | Máximo real: 152. Mismo guardrail en el esquema. |
| Todas las imágenes con `alt` | ✅ | Cero imágenes sin `alt` en las 12 páginas. |
| JSON-LD en todas las páginas | ✅ | `MedicalClinic` en todas; `FAQPage` en portada y preguntas; `Physician` en Conócenos; `BreadcrumbList` en interiores. |
| JS inicial < 60 KB | ✅ | **1,0 KB comprimido en las 18 páginas.** `npm run presupuesto` lo verifica y falla el build si sube. |
| Cero lorem ipsum | ✅ | Verificado por script en el HTML compilado. |
| Cero `[PENDIENTE]` visible | ✅ | Mismo script. Los pendientes viven en el CMS y en `docs/`, nunca en el sitio. |
| Cero datos de relleno del design system | ✅ | El script busca y bloquea el teléfono de ejemplo, el correo incorrecto, la dirección mal formada y el horario inventado que traía el design system. |
| Menú móvil accesible | ✅ | `aria-expanded` alterna, la etiqueta cambia entre "Abrir menú" y "Cerrar menú", los 7 enlaces presentes. |
| Formulario: validación y estados | ✅ | Datos inválidos → 422 con la lista de campos. Honeypot → 200 silencioso. Motivo fuera de la lista cerrada → 422. |
| Formulario: falla honesta | ✅ | Sin proveedor de correo configurado responde **503**, no un "enviado" falso. |
| Formulario sin JavaScript | ✅ | `method="post"` y `action` reales; el Worker responde con redirección 303. |
| `/admin` con noindex | ✅ | `robots.txt` bloquea `/admin`, `/keystatic` y `/api/`. |
| Directorio de equipo oculto con < 2 perfiles | ✅ | `/equipo/` no se genera y el ítem no aparece en el menú. El código existe y se activa solo al publicar el segundo profesional. |
| Agendamiento conmutable sin tocar código | ✅ | `agendamiento.modo` en el CMS. Los 13 CTA del sitio pasan por `<BotonAgendar>`. |
| Sin sangre, agujas ni instrumental | ✅ | Las 5 imágenes generadas revisadas una por una. |
| Sin personas ni rostros generados | ✅ | Ídem. Regla documentada en `docs/imagenes.md`. |

---

## No verificado, y por qué

| Ítem | Por qué |
|---|---|
| Lighthouse ≥ 95 ×4 en móvil y escritorio | Necesita el sitio publicado en Cloudflare con su CDN y compresión. Local no es representativo. Los dos factores que suelen hundirlo —peso de JS y saltos de maquetación— están controlados: 1,0 KB de JS y todas las imágenes con dimensiones explícitas. |
| Prueba con lector de pantalla | Requiere NVDA o VoiceOver de verdad, no se puede automatizar con fidelidad. La estructura está: `<details>` nativo, `aria-describedby` en los campos, `role="alert"` en los errores, salto al contenido, foco visible. |
| Correo recibido en `asistente@` | Requiere `RESEND_API_KEY` y verificación del dominio. Hoy el formulario responde 503, que es lo correcto. |
| Turnstile activo | Requiere cuenta de Cloudflare. El código lo verifica **en el servidor** cuando existe la clave; sin clave, ese paso se salta. |
| WhatsApp con mensaje precargado en cada CTA | El código está y los mensajes son distintos por página. **No se puede probar sin el número.** Mientras esté vacío, los botones no se renderizan: no hay número falso en el sitio. |
| MX / SPF / DKIM / DMARC | Requiere acceso al DNS. Checklist completo en `docs/dns-checklist.md`. |
| Enlaces externos con UTM | Solo hay dos enlaces externos (Google Maps y el registro de la Superintendencia) y ninguno es a un proyecto propio, así que no hay nada que atribuir todavía. |
| Alta de contenido de prueba desde `/admin` | Requiere Keystatic en modo GitHub, que necesita el repositorio. |
| Rich Results Test | Requiere URL pública. El JSON-LD se genera desde el contenido real y omite las propiedades sin dato en vez de emitir vacíos. |

---

## Cómo correr las verificaciones automáticas

```bash
npm run build && npm run presupuesto
```

Comprueba, página por página: peso del HTML, peso real del JavaScript
—siguiendo los imports de forma transitiva, no solo las etiquetas `<script>`— y
la ausencia de marcadores de pendiente, lorem ipsum y datos de relleno.
Devuelve código 1 si algo falla, así el CI puede detener un despliegue.
