# Design system Conecta — origen de estos archivos

Proyecto de Claude Design: `3fd8ff37-cb6c-47bd-9d63-a7bc6d08a1bf` ("Conectamedica").
Importado el 2026-08-29. **Esta carpeta es material de referencia, no código de producción.**
El sitio vive en `src/`; los componentes se portan de aquí a Astro.

## Cómo llegó cada cosa

| Contenido | Vía | Fidelidad |
|---|---|---|
| `tokens/*.css`, `styles.css` | RPC `GetFile` de claude.ai leído por tramos | Textual, salvo una línea (ver abajo) |
| `_ds_bundle.js` y `components/**` | Export HTML `Conecta - Guía de estilo.html` | Textual, pero **JSX ya compilado** |
| `assets/iconos/*.svg` (24) | mismo export | Textual |
| `assets/logo-conecta-original.jpg` | mismo export | Textual |
| `cards/*.card.jsx` (6) | mismo export | Textual |
| `guia-estilo.html` | mismo export, plantilla renderizada | Textual |

## Lo que falta y por qué

1. **`components/**/*.d.ts` y `*.prompt.md`** — no venían en el export HTML. Son el contrato de props y la nota de intención de diseño de cada componente. Se pueden recuperar con `/design-login` + `DesignSync`. Mientras tanto, los props se infieren del cuerpo de cada función, que está completo.
2. **`components/**/*.jsx` sin compilar** — lo que hay aquí es la salida de Babel (`React.createElement`), no el JSX original. Es funcionalmente idéntico y perfectamente legible, pero menos cómodo de leer.
3. **`guidelines/*.html` (18 fichas)** — documentación de tokens. Su contenido está implícito en `tokens/`.
4. **Una línea de `tokens/fonts.css`** — un `@import` a Google Fonts que el filtro del canal bloqueó. Existía solo para que las fichas del panel de diseño rendericen. En producción no se usa: el brief exige fuentes autoalojadas con Fontsource.
5. **29 archivos `.woff2`** venían en el export con nombres UUID, sin metadatos de familia ni peso. Se descartaron a propósito: son subsets de Google Fonts y producción los toma de `@fontsource-variable`.

## Inventario

- **22 fuentes de componente** en `components/` (17 componentes + 5 constantes exportadas: `LOGO_CROPS`, `MOTIVOS`, `CONTROL_CSS` y otras).
- **24 íconos**: activity, arrow_right, calendar, check, chevron_down, chevron_right, clock, download, external_link, file_text, info, map_pin, menu, message_circle, minus, phone, play, plus, salad, stethoscope, triangle_alert, video, whatsapp, x.
- Los íconos se aplican **como máscara CSS**, no como `<img>`: heredan `currentColor`. Ver `components/core/Icon.jsx`.

## Hallazgos que corrigen el brief o el plan

- `ServiceCard` ya codifica la regla editorial: `level="axis"` (hematología) vs `level="orbit"` (las otras tres).
- `ConectaThread` **no es un SVG**: son divs con una pista, un relleno escalado y nodos con estado. Ver `docs/00-plan.md` §4.
- `AppointmentForm` exporta `MOTIVOS`: la lista cerrada de motivos de contacto ya está definida. No hay que inventarla.
- El comentario de `AppointmentForm` lo dice explícito: *"Sin ningún campo libre para síntomas o antecedentes."* La restricción de la Ley 21.719 está en el componente.
- `SiteHeader` tiene estado `compressed` (80px en reposo → 64px al hacer scroll) y `layout="mobile"` con `menuOpen`.
- `ResourceCard` ya implementa la fachada de YouTube: la portada es imagen y el iframe se carga solo al hacer clic.
- `ProfessionalCard` resuelve la ausencia de foto con un monograma sobre azul nube. Sirve mientras no llegue el retrato del Dr. Flores.
