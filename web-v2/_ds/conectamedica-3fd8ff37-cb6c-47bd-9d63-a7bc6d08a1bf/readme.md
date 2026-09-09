# Conecta — Sistema de Diseño

Guía de estilo viva de **Clínica Conecta SpA** (conectamedica.com). Traducible directo a Tailwind v4 + Astro: todo vive como tokens CSS.

## Contexto

Clínica chilena que abre en 1–3 meses en Ñuñoa, Santiago (Edificio New Egaña, Av. Américo Vespucio 1106). Fundada por el Dr. Carlos Flores Angulo, hematólogo y doctorando en epidemiología. Primera unidad: **Conecta Hematología**. Gastroenterología, nutrición y dietética e interpretación de imágenes orbitan ese eje. Telemedicina para regiones. Atención solo particular, consulta $50.000.

**Quién lee el sitio:** alguien que acaba de recibir un hemograma alterado y está asustado; adultos mayores; pacientes en tratamiento oncohematológico con la energía justa. Legible, calmado y predecible antes que bonito.

**Restricciones duras:** azul clínico · mucho blanco, el color solo en botones y títulos · cero sangre, tubos, agujas o gotas rojas · sin fotos de personas.

## Fuentes recibidas

- Brief del cliente (pegado en la sesión del 28-08-2026) — única fuente de esta ronda.
- **Logo:** `assets/logo-conecta-original.jpg` (entregado el 28-08-2026). JPG de 500×500 con fondo blanco y sin transparencia: sirve para el lockup del header y el isotipo, pero **no permite versión monocromática para el footer**. Falta el vector o un PNG con transparencia. Ningún archivo de este sistema redibuja la marca: todas las variantes son recortes del original.
- Sin codebase, sin Figma, sin decks.

## Fundamentos (Ronda 1)

Tokens en `tokens/`, todos alcanzables desde `styles.css`:

| Archivo | Contenido |
| --- | --- |
| `tokens/fonts.css` | Familias: Source Serif 4 (títulos), Inter (cuerpo), IBM Plex Mono (eyebrows, etiquetas, datos) |
| `tokens/colors.css` | 8 colores base + `--color-line-strong` para bordes de controles, más alias semánticos |
| `tokens/typography.css` | Escala fluida con `clamp()`: display → eyebrow |
| `tokens/spacing.css` | Escala 8px, ritmo de sección, contenedores, grilla, breakpoints |
| `tokens/shape.css` | 3 radios, grosores, anillo de foco, 2 sombras |
| `tokens/motion.css` | Duraciones, easing, hilo Conecta, `prefers-reduced-motion` |

### Contraste verificado

Sobre blanco: tinta 17.82:1 (AAA) · azul profundo 13.81:1 (AAA) · azul Conecta 8.35:1 (AAA) · gris 6.01:1 (AA) · alerta 5.41:1 (AA).
Sobre azul nube `#EDF3FC`: tinta 15.98:1 (AAA) · azul Conecta 7.49:1 (AAA) · gris 5.39:1 (AA) · alerta 4.85:1 (AA).
Blanco sobre azul Conecta 8.35:1, sobre azul profundo 13.81:1, sobre alerta 5.41:1.

**Cambio respecto al brief:** `#E2E7EE` (línea) da 1.24:1 sobre blanco — sirve como divisor decorativo, pero **falla** el mínimo 3:1 de WCAG 1.4.11 para el borde de un input. Se agregó **`#78828E` (línea fuerte, 3.90:1)** exclusivamente para bordes de controles de formulario. Ningún hex del brief se modificó.

**Regla de uso del gris `#5B646E`:** AA pero no AAA. Solo metadatos y texto secundario corto, mínimo 16px. Texto corrido siempre en tinta.

Sin dark mode. Sin degradados de marca. Sin glassmorphism.

## Fundamentos de contenido

El sistema le habla a alguien asustado. El tono se juzga contra eso antes que contra la estética.

- **Segunda persona singular, sin usted.** «Si acabas de recibir un hemograma alterado» — cercano sin ser informal. La clínica habla en primera persona plural: «revisamos tus exámenes previos».
- **Frases cortas, información concreta primero.** El dato útil antes del argumento: «La consulta dura 40 minutos», «Atención solo particular, sin convenios», «$50.000».
- **Cero eufemismos y cero alarma.** No se dice «no te preocupes» ni «la detección temprana salva vidas». Se dice qué pasa, cuánto dura y qué sigue.
- **Sin lenguaje de marketing.** Nada de «excelencia», «vanguardia», «tu salud es lo primero», «equipo de clase mundial». La clínica todavía no abre: nunca se afirma lo que no existe.
- **Vocabulario clínico traducido.** El término técnico va acompañado de su explicación en la misma frase: «trombocitopenia (plaquetas bajas)».
- **Mayúsculas:** sentence case en títulos y botones. Mayúsculas completas solo en eyebrows y etiquetas de campo, siempre en mono. Nunca en botones.
- **Sin emoji, en ninguna superficie.**
- **Botones con el mismo nombre en toda la ruta.** El botón dice «Solicitar hora»; la confirmación dice «Solicitud enviada». Si el botón cambia de nombre, cambia en los tres lugares.
- **Números:** precios en pesos con punto de miles y sin decimales ($50.000). Horarios en formato 24h con guión corto (09:00–18:00). Teléfono agrupado (+56 9 1234 5678).
- **Aviso clínico obligatorio** al pie de todo contenido médico: «Información general, no reemplaza una evaluación médica».

## Fundamentos visuales

- **Color:** blanco dominante. El color aparece en botones, títulos, enlaces, íconos y el hilo. El azul nube tinta secciones alternas (máximo una de cada tres); el azul profundo es fondo solo en el footer. El azul Conecta nunca es fondo de sección. Sin dark mode, sin degradados, sin glassmorphism, sin transparencias ni blur en ninguna superficie.
- **Tipografía:** Source Serif 4 en display→h3 (registro académico, coherente con un fundador investigador), Inter desde h4 hacia abajo, IBM Plex Mono solo en eyebrows, etiquetas de campo y datos. Los títulos van en azul Conecta; el cuerpo siempre en tinta.
- **Fondos:** planos. Sin fotos de personas (la clínica no abre aún), sin texturas, sin patrones, sin imágenes a sangre. Donde una foto pediría espacio, va un bloque de azul nube con el hilo o con un dato en mono. La ilustración abstracta —líneas, nunca órganos ni células— reemplaza la foto solo cuando el bloque quedaría vacío de otro modo.
- **Tarjetas:** fondo blanco, borde 1px `--color-line`, radio 16px, `--shadow-1`. La tarjeta de hematología es la excepción: fondo azul nube, 6 columnas y título en h3; las otras tres prestaciones son 2 columnas con título h4. La jerarquía se resuelve con tamaño y superficie, nunca con un borde izquierdo de color.
- **Bordes:** 1px en divisores y tarjetas, 1px `--color-line-strong` en controles de formulario, 2px en anillo de foco y en el subrayado del ítem activo del header.
- **Sombras:** dos niveles. `--shadow-1` para tarjetas y para el header al hacer scroll; `--shadow-2` solo para el menú móvil abierto. Sin sombras internas y sin sombras de color.
- **Radios:** 4 / 8 / 16px. La píldora (999px) existe solo en los chips de estado.
- **Hover:** el botón primario oscurece a azul profundo; el secundario tinta su fondo a azul nube; el enlace en texto corrido mantiene el subrayado y pasa a azul profundo. Nada se mueve, nada escala, nada se eleva.
- **Press:** el botón oscurece un paso más y no se encoge.
- **Foco:** anillo de 2px azul Conecta con 2px de offset, en todo elemento interactivo, nunca removido.
- **Animación:** 150–200ms en hover y foco con `--ease-out`. Una única animación orquestada al cargar: el hilo Conecta dibujándose (`stroke-dashoffset`, 1400ms). No se anima nada al hacer scroll.
- **Layout:** contenedor de 1200px, texto largo de 720px, grilla de 12 columnas. El header es fijo y se reduce con `--shadow-1` al hacer scroll; el botón de WhatsApp es fijo abajo a la derecha. Nada más queda fijo.

## Iconografía

**No se entregaron íconos.** Sustitución declarada: **Lucide** desde CDN (`https://unpkg.com/lucide-static@latest`), trazo de 2px, sin relleno, esquinas redondeadas — el mismo grosor del hilo Conecta, lo que hace que íconos y elemento firma se lean como un solo sistema.

- Tamaños: 20px en línea con texto, 24px en tarjetas y navegación, 32px en pasos numerados. Siempre en azul Conecta sobre fondo claro, blanco sobre azul profundo; en gris solo cuando el ícono es decorativo dentro de metadatos.
- Sin íconos rellenos, sin duotono, sin ícono dentro de un círculo tintado.
- Set permitido y acotado: reloj, calendario, ubicación, teléfono, mensaje, video, documento, descarga, flecha derecha, chevron, más/menos, check, alerta triangular, información.
- Prohibido: gota, tubo de ensayo, jeringa, corazón latiendo, cruz roja, estetoscopio suelto (el trazo del estetoscopio pertenece al logo, no al set de íconos).
- Sin emoji y sin caracteres unicode como íconos. El único glifo tipográfico usado como signo es la flecha «→» en enlaces de texto.
- Si el cliente entrega un set propio, reemplaza a Lucide completo: no se mezclan dos familias.

## Componentes

**brand**
- `ConectaThread` — el hilo. Una sola aparición por página, en la secuencia de la atención (decisión del cliente).
- `ConectaLogo` — la marca en pantalla. Variantes `lockup` / `full` / `isotype`, cada una un recorte del archivo entregado.

**core**
- `Icon` — Lucide en trazo de 2px, servido como máscara CSS para que herede el color del texto.

**actions**
- `Button` — primario / secundario / texto, tres tamaños, con ícono, carga y deshabilitado.
- `WhatsAppButton` — variante propia, flotante o inline. Único verde del sistema.
- `TextLink` — enlace en texto corrido, subrayado permanente.

**navigation**
- `SiteHeader` — lockup + 5 ítems + «Agendar hora»; comprimido al hacer scroll; versión móvil con menú abierto y CTA visible.
- `Breadcrumbs` — ruta desde el tercer nivel.
- `SiteFooter` — NAP, horarios, enlaces legales y aviso de urgencias.

**content**
- `ServiceCard` — `level="axis"` para hematología (6 col, azul nube) vs `orbit` para las otras tres (2 col, blancas).
- `ProfessionalCard` — monograma mientras no haya fotografías.
- `ResourceCard` — portada de YouTube sin cargar el iframe hasta el clic.
- `StepBlock` — paso numerado de la secuencia de atención.
- `Accordion` — preguntas frecuentes.
- `PriceBlock` — $50.000 con el contexto de «solo particular».
- `StatusChip` — telemedicina · presencial · sábado.
- `Pullquote` — cita en serif o dato en mono.

**forms**
- `Field` + `CONTROL_CSS` — etiqueta, ayuda, error, requerido y los estados de input/select/textarea.
- `AppointmentForm` — nombre, teléfono, correo, comuna, motivo de lista cerrada y modalidad. **Sin campo libre de síntomas o antecedentes**, con carga y pantalla de confirmación.

**notices**
- `UrgencyNotice` — el único rojo junto a los errores de formulario.
- `ClinicalDisclaimer` — pie obligatorio de contenido clínico.
- `InfoNote` — nota neutra en azul nube.

### Adiciones intencionales

- `Icon` y `Field` no están en la lista del brief: son envoltorios que existen para que la iconografía y los estados de campo sean consistentes en vez de repetirse en cada componente.
- `ConectaLogo` resuelve la sección «marca aplicada» como componente en vez de como documento.

## Índice

- `styles.css` — punto de entrada único, solo `@import`.
- `tokens/` — fonts, colors, typography, spacing, shape, motion.
- `guidelines/` — fichas de especificación (Colors, Type, Spacing, Shape, Motion, Brand) y `ronda-1.html`, la página de revisión de fundamentos.
- `components/` — brand, core, actions, navigation, content, forms, notices. Cada carpeta con `.jsx`, `.d.ts`, `.prompt.md` y una ficha.
- `thumbnail.html` — tile del sistema.
- `assets/logo-conecta-original.jpg` — archivo entregado por el cliente (500×500, fondo blanco, sin transparencia).

## Fuentes: sustitución declarada

No se recibieron binarios. Las tres familias se cargan hoy desde Google Fonts en `tokens/fonts.css`. Para producción, autoalojar desde Fontsource (`@fontsource-variable/source-serif-4`, `@fontsource-variable/inter`, `@fontsource/ibm-plex-mono`) y reemplazar el `@import` remoto por reglas `@font-face` locales.

## Pendiente

- **Footer monocromático:** requiere el logo en vector o PNG con transparencia. Interim: lockup sobre placa blanca.
- **Negro de «CONECTA»:** recomendado cambiar a tinta `#14181D` en el archivo fuente (ver ficha «El negro de CONECTA»).
- **Ronda 3:** estados especiales, tabla de reglas de uso y el bloque `@theme` final de Tailwind v4.
