# Plan de arquitectura y diseño — conectamedica.com

Estado: **construido**. Las secciones 1 a 5 son el plan original; la sección 6 registra
lo que cambió al construirlo y por qué.
Fecha: 2026-08-29

---

## 1. Alcance entendido (supuestos, una línea cada uno)

1. Se construye **un solo sitio, un solo país (Chile, en la raíz)**, con la arquitectura multipaís lista pero inactiva.
2. Se publica **una sola unidad**: Conecta Hematología; Investigación Clínica y Medicina Familiar quedan como registros desactivados en el CMS.
3. Las 4 prestaciones se publican, y las 3 no hematológicas **siempre** se presentan por su aporte al paciente hematológico.
4. La clínica **no ha abierto**: ningún copy en pasado, ninguna cifra de operación, ningún testimonio.
5. **Nada inventado**: todo dato faltante va como `[PENDIENTE-CARLOS: …]`, visible en el CMS y **oculto en el sitio público**.
6. Agendamiento etapa 1 = formulario + WhatsApp; `/agendar/` existe desde el día uno y conmuta a iframe Medinet cambiando **un campo** en el CMS.
7. Todo CTA de agenda pasa por un único componente `BotonAgendar`; ningún `href` de agenda hardcodeado en páginas.
8. Stack cerrado: Astro 5 estático + TS estricto + Tailwind v4 + Keystatic (GitHub mode) + Cloudflare Pages + Worker para el formulario.
9. Islas de React **solo** en: formulario, acordeón FAQ, menú móvil, filtros de recursos, embed Medinet. Todo lo demás es HTML estático.
10. El design system de Claude Design es **la fuente de verdad visual**; los tokens del brief (§6) se usan para validar que coinciden, no para reemplazarlo.
11. El formulario recoge **solo** nombre, teléfono, correo, comuna, motivo (lista cerrada), modalidad y consentimiento. Cero campo libre de síntomas.
12. Analítica sin cookies (Cloudflare Web Analytics) ⇒ **sin banner de consentimiento**.
13. El presupuesto de rendimiento es criterio de aceptación, no aspiración: LCP < 2.0s, CLS < 0.05, JS inicial < 60KB gzip, Lighthouse ≥ 95 ×4.
14. Las 7 respuestas clínicas se escriben en borrador con `revisado: false` y **no se publican** hasta el visto bueno del Dr. Flores.
15. Los textos legales se entregan como borrador para revisión de abogado, marcados como tal dentro del propio archivo.
16. Higgsfield se usa para imagen de marca y de ambiente, **no** para inventar médicos, pacientes ni el interior de esta clínica.

---

## 2. Árbol de carpetas

```
conectamedica/
├─ astro.config.mjs            output:'static', sitemap, react (solo islas)
├─ keystatic.config.tsx        CMS en español, GitHub mode
├─ tsconfig.json               strict + noUncheckedIndexedAccess
├─ wrangler.toml               Worker del formulario
├─ .github/workflows/ci.yml    build + lighthouse-ci + chequeo de presupuesto
├─ public/
│  ├─ robots.txt               Disallow: /admin
│  ├─ favicon.svg · favicon.ico · apple-touch-icon.png · site.webmanifest
│  └─ og/                      imágenes OG por página
├─ docs/
│  ├─ 00-plan.md               este archivo
│  ├─ preguntas-carlos.md      lista viva de pendientes del cliente
│  ├─ manual-carlos.md         manual no técnico del CMS (Fase 4)
│  ├─ imagenes.md              prompts Higgsfield usados, para regenerar consistente
│  ├─ seo-keywords.md          tabla keyword → URL → title → meta
│  └─ dns-checklist.md         MX/SPF/DKIM/DMARC, SSL, canónica, GSC
├─ worker/
│  └─ src/index.ts             POST /api/contacto → Turnstile → Resend → asistente@
└─ src/
   ├─ content.config.ts        9 colecciones Zod (§3)
   ├─ content/
   │  ├─ countries/cl.json
   │  ├─ units/conecta-hematologia.mdx          (+2 futuras, activo:false)
   │  ├─ services/{hematologia,gastroenterologia,
   │  │             nutricion-y-dietetica,interpretacion-de-imagenes}.mdx
   │  ├─ professionals/carlos-flores-angulo.mdx
   │  ├─ categories/*.json
   │  ├─ resources/            (vacío → estado vacío honesto)
   │  ├─ faqs/*.mdx            7 clínicas (revisado:false) + ~7 operativas
   │  ├─ legal/{politica-de-privacidad,terminos-de-uso,aviso-medico}.mdx
   │  └─ settings/site.json    incluye agendamiento{modo,src,altura}
   ├─ i18n/
   │  ├─ es-CL.json            todos los textos de UI
   │  └─ index.ts              getLocalizedPath(path,country) · t() · hreflang
   ├─ lib/
   │  ├─ collections.ts        activos() · porPais() · ordenados() · relaciones N:N
   │  ├─ whatsapp.ts           buildWhatsAppUrl(origen, intencion) — mensaje precargado
   │  ├─ schema-org.ts         MedicalClinic · Physician · FAQPage · Breadcrumb · Video
   │  ├─ seo.ts                canónica absoluta, OG, title/meta con límites duros
   │  └─ pendiente.ts          [PENDIENTE-*] solo en dev, nunca en build de producción
   ├─ styles/
   │  ├─ tokens.css            ← copia versionada de los tokens del design system
   │  └─ global.css            @theme de Tailwind v4, escala fluida, foco visible
   ├─ components/
   │  ├─ brand/       ConectaLogo · ConectaThread
   │  ├─ actions/     Button · TextLink · WhatsAppButton · BotonAgendar
   │  ├─ content/     ServiceCard · ProfessionalCard · ResourceCard · PriceBlock
   │  │               StepBlock · StatusChip · Pullquote · Accordion (isla)
   │  ├─ navigation/  SiteHeader (isla menú móvil) · SiteFooter · Breadcrumbs
   │  ├─ notices/     UrgencyNotice · ClinicalDisclaimer · InfoNote
   │  ├─ forms/       AppointmentForm (isla) · Field
   │  ├─ agenda/      MedinetEmbed (isla, IntersectionObserver)
   │  └─ seo/         Seo.astro · JsonLd.astro
   ├─ layouts/        BaseLayout · PageLayout · ArticleLayout
   └─ pages/          14 rutas + 404 + sitemap + /admin (Keystatic, noindex)
```

**Decisión de portabilidad del design system:** los componentes del brandbook vienen en `.jsx`. Se portan a `.astro` uno a uno (mismo nombre, mismo API de props, mismas clases) y **solo** quedan como React los cinco que necesitan estado. Motivo: si todas las tarjetas se montan como islas de React, el presupuesto de 60KB de JS se revienta en la home. El `.d.ts` de cada componente se conserva como contrato de props.

---

## 3. Colecciones (Zod) — decisiones que no están en el brief

Sobre el esquema del brief se agregan:

- Todas llevan `activo: boolean` y `orden: number`. **Nada se borra, se desactiva.**
- `services.aporteHematologia` es **obligatorio y con largo mínimo** (Zod `.min(120)`), para que sea imposible publicar una prestación suelta.
- `faqs.revisado: boolean` (default `false`) + `fechaRevision` + `revisadoPor`. El build **excluye** de producción las FAQ clínicas con `revisado:false` y las muestra en preview. Así se trabaja sin publicar contenido clínico sin firmar.
- `siteSettings.agendamiento: { modo:'formulario'|'iframe', src, altura }` con refinamiento Zod: si `modo` es `iframe`, `src` es obligatorio.
- `siteSettings.estadoApertura: { estado:'pre-apertura'|'abierto', fecha }` — controla el chip del hero y evita cualquier copy en pasado.
- Campos pendientes: tipo `nullable()`. `null` ⇒ el bloque no se renderiza. Nunca un placeholder visible.
- Relación N:N profesional↔servicio resuelta con `reference()` en ambos sentidos y helper de cruce en `lib/collections.ts`, sin duplicar datos.

**Reglas de render**, implementadas como guardas y no como comentarios: menos de 2 profesionales ⇒ no se renderiza `/equipo/` ni su ítem de menú; 1 unidad activa ⇒ menú directo sin desplegable; recursos vacíos ⇒ estado vacío honesto.

---

## 4. Plan de diseño

### Tokens — IMPORTADOS Y VERIFICADOS (2026-08-29)

Los seis archivos de tokens del design system están en `design-system/tokens/*.css`, traídos del proyecto de Claude Design. Se versionan ahí como fuente y se exponen a Tailwind v4 vía `@theme`.

**Coinciden con el brief:** los 7 colores (#12489E, #0A2B5E, #EDF3FC, #14181D, #5B646E, #E2E7EE, #B4472F), contenedor 1200px, prosa 720px, cuerpo 17→18px, escala de 8px, sombra `0 1px 2px rgba(20,24,29,.06)`, tres familias tipográficas, foco de 2px, área táctil 44px.

**Difieren del brief. Manda el design system:**

| Punto | Brief §6 | Design system | Consecuencia |
|---|---|---|---|
| Bordes de control | solo `#E2E7EE` | agrega `--color-line-strong:#78828E` (3.90:1) | `#E2E7EE` **no cumple** contraste no-textual en inputs. Los campos del formulario usan `line-strong`. El brief tenía un hueco de accesibilidad. |
| Radios | "8px" | 4 / 8 / 16 / 999px | Las tarjetas van a **16px**, no 8. Los chips de estado son la única píldora. Corrige mi plan anterior. |
| Sombras | una | `--shadow-1` y `--shadow-2` | Hay un segundo nivel para elevación puntual. |
| Duración del hilo | 900ms (mi propuesta) | `--dur-thread:1400ms` | Se usa 1400ms con `--ease-thread`. |
| Estado del hilo | no contemplado | `--thread-stroke-muted:#B9CCE8` | **El hilo tiene estados.** Hay un trazo apagado para "pasos no alcanzados": los 4 pasos de la home se dibujan progresivamente, no todos activos. |
| Medida de línea | 62–70ch | `--measure-prose:66ch` | Valor fijo, no rango. |
| Reduced motion | respetarlo | todas las duraciones caen a `1ms` en el propio token | No hay que escribir media queries por componente. |

Breakpoints declarados: 390 · 768 · 1366 · 1600 · 1920. Son exactamente los del checklist de aceptación.

- Tipografía: Source Serif 4 (serif) · Inter (sans) · IBM Plex Mono (eyebrows, 14px, mayúsculas, tracking 0.12em). Autoalojadas con Fontsource, subset latino, `font-display: swap`.
- Piso tipográfico absoluto del sistema: **14px**. Nada por debajo en toda la interfaz.
- Sin degradados, sin glass, sin dark mode.

### El hilo Conecta — CORREGIDO CONTRA LA IMPLEMENTACIÓN REAL (2026-08-29)

Mi plan inicial decía "un `path` SVG animado con `stroke-dashoffset`". **Está mal.** El componente real (`design-system/components/brand/ConectaThread.jsx`) no usa SVG:

- Tres capas de `div` posicionados: una **pista** en `--thread-stroke-muted`, un **relleno** en `--thread-stroke` cuya longitud es `calc((100% - r*2) * active/(n-1))`, y **n nodos** circulares.
- Cada nodo está encendido o apagado según `i <= active`. Con `active = -1` se muestran todos encendidos.
- La animación es `scaleX` (o `scaleY`) sobre el relleno, con `--dur-thread` y `--ease-thread`, no un trazo dibujándose.
- Props reales: `orientation` (`horizontal` | `vertical`), `nodes`, `active`, `animate`, `thickness`, `nodeRadius`.
- `aria-hidden="true"` ya viene puesto. La regla de `prefers-reduced-motion` viene dentro del propio componente.

Consecuencia para el diseño: el hilo **no es un trazo continuo que serpentea por toda la página**. Es un conector recto entre nodos, reutilizable en horizontal y vertical, con estado de progreso. Es más sobrio de lo que yo había imaginado y encaja mejor con el brief: la única licencia visual, sin filigrana.

Dónde se usa:
- **Cómo funciona la atención**: horizontal, `nodes={4}`. Aquí el estado sí significa algo.
- **Las 4 prestaciones**: horizontal, uniendo las tarjetas.
- **Móvil**: `orientation="vertical"` para la misma secuencia.

Portado a Astro se convierte en CSS puro con custom properties: cero JavaScript.

### Jerarquía de prestaciones — ya resuelta en el design system

`ServiceCard` tiene `level="axis"` y `level="orbit"`. Cita del propio componente: *"axis es hematología: el eje. orbit son las tres que giran alrededor."* La jerarquía se resuelve con **superficie y tamaño** (azul nube + 32px de padding + ícono de 32px contra blanco + 24px + ícono de 24px), no con color de borde.

La regla editorial del brief —que las tres prestaciones no hematológicas nunca se presenten como especialidades sueltas— **ya está codificada en el sistema de diseño**. No hay que inventarla.

### Wireframe de la home

```
┌──────────────────────────────────────────────────────────────┐
│ [lockup horizontal]   Conócenos  Hematología  Info  Precios   │
│                       Preguntas  Contacto   [Solicitar hora]  │
├──────────────────────────────────────────────────────────────┤
│                                            ╭──────────────╮   │
│  Atención hematológica coordinada,         │              │   │
│  presencial y a distancia.                 │   imagen /   │   │
│                                            │ hilo conecta │   │
│  Tu salud hematológica, conectada con      │              │   │
│  quienes la entienden.                     ╰──────────────╯   │
│                                                               │
│  [ Solicitar hora ]  [ Cómo funciona la atención → ]          │
│  · telemedicina en todo Chile · $50.000 · atención de sábado  │
│  ╲__________________ hilo _________________________________   │
├──────────────────────────────────────────────────────────────┤
│  EL PROBLEMA          (fondo azul-nube, 3 frases, 720px)      │
├──────────────────────────────────────────────────────────────┤
│  CÓMO FUNCIONA LA ATENCIÓN                                    │
│   ①────────②────────③────────④   ← el hilo une los 4 pasos    │
│  solicitas  evaluación  estudio   coordinación                │
├──────────────────────────────────────────────────────────────┤
│  CONECTA HEMATOLOGÍA                                          │
│  ┌────────┬────────┬────────┬────────┐  ← el hilo enhebra     │
│  │Hemato- │Gastro- │Nutri-  │Imáge-  │    las 4 tarjetas      │
│  │logía   │entero. │ción    │nes     │                        │
│  └────────┴────────┴────────┴────────┘                        │
├──────────────────────────────────────────────────────────────┤
│  TELEMEDICINA   qué se resuelve a distancia · y qué no        │
├──────────────────────────────────────────────────────────────┤
│  COMPROMISOS    4 ítems, sin iconos decorativos               │
├──────────────────────────────────────────────────────────────┤
│  PREGUNTAS FRECUENTES  4 destacadas (acordeón) → ver todas    │
├──────────────────────────────────────────────────────────────┤
│  UBICACIÓN Y HORARIOS   mapa estático · horarios · CTA final  │
├──────────────────────────────────────────────────────────────┤
│  FOOTER azul oscuro · el hilo cierra · AVISO DE URGENCIAS 131 │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. Autocrítica del plan

**Qué de esto es lo que haría para cualquier clínica genérica, y cómo se corrige:**

1. **La home "problema → 4 pasos → servicios → compromisos → FAQ → CTA" es la plantilla estándar de clínica.** Corrección: el bloque de 4 pasos deja de ser decorativo y pasa a ser el único lugar donde el hilo tiene función informativa; y "el problema" no se escribe como dolor genérico ("¿cansado de esperar?") sino con las tres fricciones concretas del paciente hematológico: exámenes repetidos, especialistas que no se hablan entre sí, y distancia al centro donde está la hematología.
2. **La ficha de prestación "qué incluye → modalidad → CTA" es plantilla de directorio médico.** Corrección: se invierte el orden. El párrafo `aporteHematologia` va **arriba, antes de "qué incluye"**, y el H1 de gastroenterología no es "Gastroenterología" sino su función real dentro del estudio hematológico. Sin ese párrafo la prestación no compila.
3. **"Conócenos" con misión, visión y valores es relleno corporativo para una clínica de un solo médico.** Corrección: la página abre con el Dr. Flores, su formación verificable y el enlace al Registro Nacional de Prestadores; misión y visión se reducen a dos párrafos y los valores a seis, al final.
4. **El hero abstracto azul con líneas es literalmente el hero de toda healthtech reciente.** Corrección: es exactamente donde se juega el encargo de imagen realista. Ver pregunta abierta A-2.
5. **Las FAQ tratadas como volcado de SEO.** Corrección: las 7 preguntas clínicas reales son el activo más valioso del sitio y el único contenido que ningún competidor local tiene escrito así. Estructura fija pregunta → respuesta corta → detalle → **cuándo consultar**, cada una enlazada a su prestación, con fecha de revisión y autor visibles. Eso es E-E-A-T real, no marcado JSON-LD.
6. **Riesgo que el brief no cubre:** un sitio impecable de una clínica que aún no abre puede leerse como fachada. La defensa no es diseño, es honestidad explícita: chip de estado de apertura, precio publicado, ausencia de convenios dicha sin eufemismo, y aviso de urgencias en cada página. Está en el modelo de contenido (`estadoApertura`), no en el copy.
7. **Riesgo técnico subestimado en el brief:** el iframe de Medinet puede tirar abajo el Lighthouse de `/agendar/` y no se puede arreglar por dentro. Por eso se monta con IntersectionObserver y esa ruta se mide con un presupuesto propio, documentado aparte.

---

## 6. Desviaciones respecto de este plan (registro de lo construido)

Escritas acá porque cada una es una decisión, no un descuido.

### 6.1 Cero islas de React en el sitio público

El plan decía "islas de React solo en formulario, acordeón, menú móvil, filtros y
embed". Terminaron siendo **cero**.

- **Acordeón** → `<details>`/`<summary>` nativo. Misma semántica para lectores de
  pantalla, y además Ctrl+F encuentra texto dentro de una respuesta cerrada, cosa
  que un acordeón de React no permite.
- **Menú móvil** → 12 líneas de script. React costaba ~40 KB para alternar un
  atributo.
- **Formulario** → medido: la versión en React pesaba **64,5 KB comprimidos** en
  `/contacto/` y `/agendar/`, por encima del presupuesto de 60 KB. Reescrito sin
  framework, y de paso **funciona sin JavaScript**: `method="post"` real y
  redirección 303 desde el Worker. Para un público con adultos mayores y
  conexiones móviles de regiones, que el camino de conversión dependa de que
  cargue un framework era un riesgo evitable.
- **Embed de la agenda** → IntersectionObserver en 20 líneas.

Resultado: **1,0 KB de JavaScript en las 18 páginas**, contra un presupuesto de 60.
React sigue instalado porque Keystatic lo necesita, pero solo en `/admin`.

### 6.2 Los íconos no vienen de un CDN

`Icon.jsx` del design system carga los SVG desde `unpkg.com` como máscara CSS.
Eso son 24 peticiones a un tercero que no controlamos y que puede caerse.
Los 24 íconos están autoalojados en `/iconos/`. Misma técnica de máscara, misma
herencia de color.

### 6.3 El menú de escritorio tiene cinco ítems, no siete

Con siete se partía en dos líneas y la cabecera crecía de 80 a 104px. Los que
salieron no desaparecen: están en el pie y enlazados desde el contenido. Dos
ítems son condicionales y aparecen solos cuando exista el contenido que los
justifica.

### 6.4 Recortes del logo corregidos contra el archivo real

Midiendo la caja de tinta píxel a píxel en el original:

- El **isotipo** del design system (`x 0.50, y 0.29, w 0.075, h 0.09`) arrastra
  las letras de "Clinica" al ampliarlo para un ícono. Corregido a la gota sola.
- El **lockup** incluye un 15% de aire vertical de más, que a 44px de alto deja
  "Clinica" casi ilegible. Ajustado a la tinta real.

Ninguno de los dos redibuja la marca: siguen siendo ventanas sobre el mismo
archivo. Cuando llegue el vector, los tres recortes se reemplazan por SVG limpios.

### 6.5 Datos falsos del design system que NO se publicaron

El `SiteFooter.jsx` del design system trae, como relleno de maqueta:

| Dato en el design system | Realidad |
|---|---|
| `+56 9 1234 5678` | No existe. El campo va vacío y los botones de WhatsApp no se renderizan. |
| `contacto@conectamedica.com` | El correo real es `asistente@conectamedica.com`. |
| `Av. Américo Vespucio 1106` | **1106 es la oficina, no el número de la calle.** Publicarlo así manda pacientes a una dirección equivocada. |
| `Lunes a viernes 09:00–18:00` | El horario real es martes, miércoles, viernes y sábado, en bloques de tarde. |

Los cuatro están ahora en la lista de patrones prohibidos de
`scripts/presupuesto.mjs`: si alguno se vuelve a colar, el build falla.

### 6.6 Bug encontrado en pruebas

Con `trailingSlash: 'always'`, la ruta `/api/contacto` devolvía **404**. El
formulario no habría enviado nada en producción, y el fallo habría sido
silencioso desde el punto de vista del paciente. Corregido a `/api/contacto/`.

### 6.7 Lo que la investigación de keywords cambió

Ver `docs/seo-keywords.md`. En resumen: el tráfico está en las preguntas
clínicas, no en "hematólogo Santiago"; no hay hematología chilena en esos
resultados; y AI Overview ocupa la primera posición, lo que convierte la
estructura *respuesta corta arriba* de preferencia editorial en requisito
técnico.

---

## 7. Rediseño contra la referencia del cliente (2026-08-29, segunda ronda)

El cliente rechazó la primera versión: *"muy genérica, las imágenes ni siquiera
conectan con la wea, el hero es un espacio blanco con texto y CTA y abajo sale un
botón, está todo muy desordenado"*. Puso `laverocktx.com` como referencia de UX.

Tenía razón, y en cosas concretas.

### Qué estaba mal

| Problema | Diagnóstico |
|---|---|
| Hero | Texto sobre blanco con la fotografía **debajo**: dos bloques que no se leían como uno. La referencia pone la imagen a pantalla completa con el titular encima. |
| Imágenes | Un vaso de agua, unos porotos, una lámina de vidrio esmerilado. Bonitas y mudas. Evitar inventar terminó en no comunicar, que tampoco sirve. |
| Ritmo | Blanco y azul nube, nada más. La referencia alterna blanco, gris y **azul marino profundo**. Sin oscuro, un sitio se lee plano por más cuidada que esté la tipografía. |
| Jerarquía de CTA | Dos botones del mismo peso compitiendo en una fila. |

### Qué se decidió, y qué reglas del brief levanta

El cliente autorizó explícitamente cuatro cosas que el brief maestro prohibía:

1. **Personas fotorrealistas generadas.** Con una condición que puse yo y que se
   respeta en las nueve imágenes: **siempre anónimas** —de espaldas, solo manos, o
   fuera de foco— y ningún pie de foto que las presente como el Dr. Flores o como
   pacientes suyos. El retrato del médico sigue esperando el suyo real.
2. **Secciones oscuras.** `#0A2B5E`, que ya estaba en los tokens, alternando con
   blanco y azul nube. Resuelto en `.seccion-oscura`, que redefine los alias
   semánticos: ningún componente necesita saber sobre qué fondo está.
3. **Hero a pantalla completa** con la cabecera transparente encima.
4. **El presupuesto de rendimiento cede ante la referencia.** En la práctica no
   hizo falta gastarlo: los efectos de scroll se resolvieron con `position:sticky`
   y `animation-timeline: view()`, ambos CSS puro. El sitio sigue en 1,0 KB de JS.

Se mantiene una restricción del cliente que él **no** levantó: **cero sangre**. El
modelo insistió dos veces en llenar los tubos de ensayo, así que esa imagen se
descartó en vez de publicarla.

### Qué se construyó

- **`Hero.astro`** — fotografía a pantalla completa (`100svh`, no `vh`, que en
  móvil corta por debajo del pliegue), titular encima abajo a la izquierda, velo
  de tres capas: una para el pie, otra para el costado del texto y una franja
  superior corta que le garantiza contraste a la cabecera transparente sin
  oscurecer el resto de la imagen. Soporta video opcional que solo se monta si el
  usuario no pidió movimiento reducido ni tiene ahorro de datos.
- **Cabecera transparente sobre el hero**, con el lockup en blanco, que se vuelve
  sólida al pasar el hero. El centinela del IntersectionObserver se corre a 78svh.
- **`Pagina.astro` reescrito** — la fotografía dejó de ser una banda suelta después
  del título y pasó a ser la cabecera. Sin `foto`, cae al bloque sobre blanco: los
  textos legales no necesitan una imagen y ponérsela sería relleno.
- **Bloque oscuro de declaración** para "el problema", que es el momento de mayor
  peso narrativo de la portada.
- **Columna fija** en "cómo funciona": el título y el hilo se quedan quietos
  mientras los cuatro pasos scrollean al lado. Es el recurso de la referencia,
  con `position: sticky` y cero JavaScript.
- **Sección partida** para telemedicina: media pantalla de fotografía, media de
  texto.
- **Logo vectorizado** — `scripts/logo-vector.mjs` traza el JPG real con potrace y
  produce cuatro SVG: lockup en color y en blanco, isotipo en color y en blanco.
  No genera un logo nuevo: un modelo generativo habría dibujado otra marca, y una
  marca aproximada es peor que un JPG. La O de CONECTA, que es un anillo con un
  guión dentro, exigió `fill-rule="evenodd"`: sin eso se rellenaba sólida y se
  perdía el elemento más distintivo del logotipo.
