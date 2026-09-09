# conectamedica.com

Sitio de **Clínica Conecta SpA** — unidad de hematología en Ñuñoa, Santiago, y
telemedicina en todo Chile.

Astro 5 estático · TypeScript estricto · Tailwind v4 · Keystatic · Cloudflare.

```bash
npm install
npm run dev          # http://localhost:4321  ·  CMS en /admin
npm run build
npm run presupuesto  # verifica peso y ausencia de datos de relleno
```

---

## Lo que hay que saber antes de tocar nada

**1. Nada se inventa.** Si un dato no lo entregó el cliente, el campo es `null` y
la sección no se renderiza. No hay placeholders visibles, ni teléfonos de
ejemplo, ni fotos de banco de imágenes para personas que atienden pacientes.
`npm run presupuesto` falla el build si algo de eso se filtra.

**2. Dos reglas del brief están en el compilador, no en un comentario.**

- `services.aporteHematologia` es obligatorio con mínimo 120 caracteres. Sin ese
  párrafo la prestación no compila. Es lo que impide publicar gastroenterología,
  nutrición o imágenes como especialidades sueltas.
- Las FAQ clínicas nacen con `revisado: false` y **no se publican en producción**
  hasta que el médico las firme.

**3. Todo CTA de agenda pasa por `<BotonAgendar>`.** Pasar del formulario propio a
la agenda de Medinet es cambiar un campo en el CMS. Ningún archivo de código.

**4. Nada se borra, se desactiva.** Todas las colecciones llevan `activo`.

**5. El sitio manda 1,0 KB de JavaScript.** Cero islas de framework en las páginas
públicas: el acordeón es `<details>` nativo, el menú móvil son 12 líneas, el hilo
Conecta es CSS puro, y el formulario funciona sin JavaScript.

---

## Mapa

```
src/
  content.config.ts      9 colecciones Zod — acá viven las reglas editoriales
  content/               el contenido real, editable desde /admin
  lib/contenido.ts       toda consulta al contenido pasa por acá
  lib/whatsapp.ts        sin número configurado → no se renderiza el botón
  lib/schema.ts          JSON-LD; omite lo que no tiene dato
  components/            17 componentes portados del design system
  pages/                 14 rutas + 404 + API del formulario

design-system/           material de referencia importado de Claude Design
docs/                    plan, preguntas al cliente, SEO, imágenes, manual, DNS
scripts/marca.mjs        favicon, íconos y OG desde el logo real
scripts/presupuesto.mjs  presupuesto de rendimiento y de honestidad
```

---

## Documentación

| Documento | Para qué |
|---|---|
| [docs/00-plan.md](docs/00-plan.md) | Arquitectura, diseño y autocrítica |
| [docs/preguntas-carlos.md](docs/preguntas-carlos.md) | **Lo que falta del cliente.** Empezar por acá |
| [docs/seo-keywords.md](docs/seo-keywords.md) | Investigación de keywords y por qué el tráfico está en las FAQ |
| [docs/imagenes.md](docs/imagenes.md) | Prompts usados y la regla de qué se genera y qué no |
| [docs/manual-carlos.md](docs/manual-carlos.md) | Manual del CMS, en lenguaje no técnico |
| [docs/dns-checklist.md](docs/dns-checklist.md) | Despliegue, DNS y correo. **Nada ejecutado todavía** |
| [docs/checklist-aceptacion.md](docs/checklist-aceptacion.md) | Qué está verificado y qué no |
| [design-system/README-IMPORTACION.md](design-system/README-IMPORTACION.md) | De dónde salió cada archivo del design system |

---

## Estado

Fases 1 a 4 construidas. El repositorio ya está en GitHub.

**Despliegue: Worker de Cloudflare con assets estáticos** (no Pages). Todo está
en `wrangler.jsonc`, incluido el comando de build, así que `wrangler deploy`
construye y publica en un solo paso y no hay forma de subir algo sin compilar.
Lo que falta —dominio, DNS, correo y variables de entorno— está en
[docs/dns-checklist.md](docs/dns-checklist.md).
