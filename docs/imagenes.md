# Imágenes del sitio

Generadas con Higgsfield, modelo **Soul Location** (`soul_location`), el 2026-08-29.
Los prompts quedan acá para poder regenerar con el mismo lenguaje visual si hace falta
reencuadrar, cambiar una escena o producir variantes.

## La regla que rige todas estas imágenes

Acordada antes de generar nada (ver `docs/preguntas-carlos.md` §D):

**Sí:** fotorrealismo en ambiente, arquitectura, contexto urbano y naturaleza muerta.
Luz natural, óptica coherente, grano de película, paleta contenida.

**Nunca:**
- rostros o personas identificables, ni nada que pueda leerse como el Dr. Flores, su
  equipo o sus pacientes;
- el interior de *esta* clínica presentado como si fuera real;
- sangre, agujas, tubos, punciones, instrumental clínico;
- texto, logotipos o señalética legible dentro de la imagen.

Por eso ninguna imagen muestra una consulta, una sala de espera con pacientes ni un
médico. Un sitio de salud que muestra personal que no existe pierde la confianza el día
que el paciente llega y no reconoce a nadie.

Todas se generaron con la misma cola de estilo, que es lo que las hace leerse como una
sola serie: *"Shot on 35mm/50mm, natural light only, slight film grain, restrained
palette, editorial photography, not stock photography."*

## Inventario

Diecisiete imágenes, todas del mismo modelo y con la misma cola de estilo. Eso es
lo que hace que se lean como un solo set y no como fotos sueltas de banco.

| Archivo | Dónde se usa | Formato |
|---|---|---|
| `hero-ancho` | Portada, banda a sangre | 21:9 |
| `hero-corredor` | Unidad Conecta Hematología | 16:9 |
| `edificio-nunoa` | Conócenos | 21:9 |
| `calle-nunoa` | Contacto, cómo llegar | 4:3 |
| `prestaciones-banda` | Listado de prestaciones | 21:9 |
| `p-hematologia` | Prestación hematología + su tarjeta | 3:2 |
| `p-gastroenterologia` | Prestación gastroenterología + su tarjeta | 3:2 |
| `p-nutricion` | Prestación nutrición + su tarjeta | 3:2 |
| `p-imagenes` | Prestación imágenes + su tarjeta | 3:2 |
| `mesa-lectura` | Preguntas frecuentes | 21:9 |
| `escritorio` | Precios | 4:3 |
| `examenes-previos` | Conócenos, "por qué existe Conecta" | 4:3 |
| `guias-impresas` | Información para pacientes | 3:2 |
| `reloj-pared` | Agendar | 3:2 |
| `telemedicina` | Telemedicina | 4:3 |
| `textura-muro` | Reserva, fondo sutil | 16:9 |

Fuente en `src/assets/imagenes/`. El registro de qué imagen va en qué página, con
su texto alternativo, está en `src/lib/imagenes.ts`: el `alt` se escribe una vez
junto a la imagen y no en cada página, para que no se contradiga ni se olvide.

Astro genera AVIF y WebP en varios anchos durante el build, con dimensiones
explícitas para no provocar saltos de maquetación.

## Dos utilidades que acompañan al set

**`scripts/recortar-bordes.mjs`** — Soul Location emula una copia analógica y a
veces deja un marco negro de unos píxeles. En una foto suelta pasa por estilo; en
una serie que se muestra junta, unas con marco y otras sin él se ve descuidado. El
script detecta filas y columnas casi negras en los bordes y las recorta. Si no hay
borde, no toca el archivo.

**`scripts/og.mjs`** — arma las trece tarjetas de Open Graph, una por página,
componiendo la fotografía de esa página con un degradado, el hilo Conecta, el
lockup sobre placa blanca y el titular. Se ejecuta en local y **no gasta
créditos**. Es lo que se ve cuando alguien comparte un enlace por WhatsApp, que en
Chile es como circula de verdad la recomendación de un médico.

## Prompts exactos

### hero-corredor · 16:9

> Interior of a quiet modern medical office building in Santiago de Chile, late
> afternoon. A wide corridor with floor-to-ceiling windows on the right, warm low
> sunlight raking across a pale limestone floor and a plain white wall. A single wooden
> bench, one potted plant. Through the glass, blurred silhouette of the Andes mountains
> and low city rooftops. Completely empty, no people, no signage, no medical equipment,
> no text. Shot on 35mm, natural light only, slight film grain, restrained cool-neutral
> palette with warm sunlight, calm and precise, editorial architectural photography, not
> stock photography.

### calle-nunoa · 4:3

> A residential avenue in Ñuñoa, Santiago de Chile, on a clear autumn afternoon. Mature
> plane trees lining a wide sidewalk, dappled sunlight on grey pavement, mid-century
> apartment buildings in beige and white, a low concrete planter. The Andes faintly
> visible at the end of the street. No people, no cars in focus, no readable signage, no
> text. Shot on 35mm, natural light, slight film grain, calm restrained palette,
> editorial documentary photography of a real neighbourhood, not stock photography.

### escritorio · 4:3

> Close view of a plain wooden desk beside a large window, morning daylight. On the desk:
> a closed grey notebook, a simple ballpoint pen, a clear glass of water half full,
> casting a soft shadow. Plain white wall behind. Nothing else. No people, no hands, no
> screens, no medical objects, no text, no logos. Shot on 50mm, shallow depth of field,
> natural light only, subtle film grain, muted neutral palette with one small cool blue
> accent, quiet and precise still life, editorial photography, not stock photography.

### examenes-previos · 4:3

> A neat stack of printed A4 paper sheets and a few older, slightly yellowed pages, lying
> on a pale wooden table in soft window daylight. The pages are blurred and unreadable,
> no legible text, no charts, no logos, no medical data. A paper clip holds one small
> bundle. Plain background. No people, no hands. Shot on 50mm, shallow depth of field,
> natural light, slight film grain, calm neutral palette, quiet documentary still life,
> editorial photography, not stock photography.

### telemedicina · 4:3

> A closed silver laptop on a light wooden table beside a window, seen from a low angle,
> late afternoon sunlight crossing the surface. A ceramic mug beside it. Out of focus in
> the background, a bright room with a plant. No people, no hands, no screen content, no
> text, no logos, no medical objects. Shot on 35mm, natural light only, warm soft
> shadows, subtle film grain, restrained neutral palette, calm and unhurried, editorial
> photography, not stock photography.


### p-hematologia · 3:2 · prestación de hematología

> A pale oak desk beside a bright window on a clear morning, high key. An open
> cream folder with a neat stack of printed pages, completely out of focus and
> unreadable. Beside it a second smaller stack of older pages. A thin pen. Plain
> white wall behind, soft even daylight filling the frame, very light and airy,
> minimal shadows.

### p-gastroenterologia · 3:2

> A half-open pale door in a quiet bright hallway, late afternoon. Warm low
> sunlight spills through the gap onto a smooth concrete floor, revealing part of
> an empty room beyond. Plain white walls, one shadow line across the floor.
> Nothing else in frame. A sense of looking for what is behind something.

### p-nutricion · 3:2

> Still life on a pale wooden kitchen table in soft north-facing daylight. Three
> simple ceramic bowls holding dry brown lentils, dried white beans, and fresh
> spinach leaves. A folded linen cloth. Nothing else on the table. Muted earthy
> greens and browns against a plain off-white wall.

### p-imagenes · 3:2

> Several overlapping sheets of translucent frosted glass leaning against a large
> window, seen from close range in flat overcast daylight. Light passes through
> the layers creating soft grey gradients and faint edges where they overlap.
> Abstract, cool grey and pale blue, no objects behind them, completely
> non-clinical.

### hero-ancho · 21:9 · banda de la portada

> Interior of a quiet modern office building in Santiago de Chile, late afternoon.
> A wide bright space with floor-to-ceiling windows along the right side, warm low
> sunlight raking across a pale limestone floor and casting long window-frame
> shadows. One low wooden bench, one large potted plant. Through the glass, the
> hazy blue silhouette of the Andes mountains above low city rooftops. Completely
> empty and still. Wide cinematic framing with generous negative space on the left
> for text.

### prestaciones-banda · 21:9

> A long bright corridor with four tall windows in a row along one wall, seen
> straight on, morning light. Four evenly spaced rectangles of sunlight fall
> across a pale concrete floor. Plain white walls, completely empty, strong rhythm
> and repetition. Wide cinematic framing.

### edificio-nunoa · 21:9

> Low angle exterior of a clean modern mid-rise office building in Ñuñoa, Santiago
> de Chile, golden hour. Pale stone and glass façade, mature plane trees in front,
> long soft shadows. The Andes mountains rising behind the building, hazy and
> blue. Wide cinematic framing, empty street.

### mesa-lectura · 21:9

> A long empty light wood table beside a tall window in a quiet room, morning
> light. A single glass of water and a closed grey notebook near one end, the rest
> of the table bare. Plain white wall, a soft rectangle of sunlight across the
> surface. Wide horizontal composition with generous empty space.

### guias-impresas · 3:2

> A small neat pile of thin printed booklets with plain uncoated covers, stacked
> on a pale wooden surface near a window. Covers are blank and unbranded, no
> readable text. Soft side light, gentle shadows, a shallow depth of field. Calm
> and tactile.

### reloj-pared · 3:2

> A plain round white wall clock on a smooth pale plaster wall, photographed
> slightly off-centre in soft afternoon light. The clock face is minimal with thin
> black hands and no numerals or branding. A long diagonal shadow crosses the
> wall. Generous empty space around it.

### textura-muro · 16:9

> Extreme close view of a smooth off-white plaster wall in raking daylight,
> showing only the faintest surface texture and a soft gradient from light to
> slightly darker. Almost entirely white, no objects, no edges, no corners.
> Minimal and quiet.

## Cola de estilo común

Todos los prompts de la segunda tanda terminan con esta cola, que es la que
mantiene la serie unida:

> Shot on 35mm film, natural light only, subtle film grain, restrained neutral
> palette with one cool blue accent, calm and unhurried, editorial photography.
> No people, no faces, no hands, no text, no logos, no signage, no medical
> instruments, no blood. Not stock photography.

## Cómo regenerar

```bash
higgsfield generate create soul_location --aspect_ratio 16:9 --wait --prompt "<pegar el prompt>"
```

Nota sobre el modelo: `soul_location` agrega internamente un `full_name` a los
parámetros del trabajo (en la primera corrida fue "Centro Médico Andino"). Es una
etiqueta interna del modelo y **no aparece en la imagen** — se verificó una por una. Si
en una regeneración apareciera señalética legible, hay que descartar esa imagen: el sitio
no puede mostrar el nombre de una clínica que no existe.

## Lo que falta

- **Retrato del Dr. Flores.** Real, entregado por él. No se genera bajo ninguna
  circunstancia. Ver `docs/preguntas-carlos.md`, punto B-4.
- **Fotos del local.** No existen todavía porque la clínica no ha abierto. Cuando el
  espacio esté habilitado, estas imágenes de ambiente se reemplazan por fotografía real.
- **Portadas de recursos.** Se generarán cuando haya recursos escritos y revisados.

---

# Videos de fondo

Generados con Higgsfield, modelo **Seedance 2.0 Mini** (`seedance_2_0_mini`), el
2026-08-29. Seedance 2.0 completo requiere plan Pro o Ultimate, que esta cuenta
no tiene; el Mini entrega 720p, que para un fondo bajo un velo es de sobra.

## Cómo se generan: a partir de las fotografías que ya están en el sitio

Cada video parte de una imagen del set —`--start-image`— y **termina en la misma
imagen** —`--end-image`—. Eso hace dos cosas a la vez:

1. **Coherencia.** El video no es una escena nueva: es la misma fotografía que ya
   está en esa sección, moviéndose. No hay salto de estilo entre lo fijo y lo que
   se mueve.
2. **Bucle sin salto.** Al volver el clip exactamente a su punto de partida, el
   `loop` no da el corte que delata a un video de fondo mal hecho.

| Archivo | Nace de | Dónde va |
|---|---|---|
| `v-hero` | `c-hero` | Hero de la portada |
| `v-problema` | `c-consulta` | Sección "El problema" |
| `v-compromisos` | `c-microscopio` | Sección "Nuestros compromisos" |

## Prompts

Todos piden lo mismo en el fondo: **casi nada de movimiento**. Un fondo que se
mueve mucho compite con el texto y marea; lo que se busca es que respire.

### v-hero — desde `c-hero`

> Almost still. The doctor's hand holding the pen shifts a few millimetres over
> the printed report. Warm afternoon light drifts very slowly across the desk.
> Locked-off camera, no zoom, no pan, no cuts. Extremely subtle, calm,
> documentary.

### v-problema — desde `c-consulta`

> An empty consulting room at the end of the day. Nothing happens except light:
> the warm rectangle of afternoon sun on the floor creeps a few centimetres, dust
> drifts through the beam, the leaves of the plant move almost imperceptibly.
> Locked-off camera, no zoom, no pan, no people entering. Still and quiet.

### v-compromisos — desde `c-microscopio`

> Hands at a microscope on a white bench. One hand turns the focus knob a quarter
> turn, slowly and precisely, then rests. Daylight from the left stays constant.
> Locked-off camera, no zoom, no pan, no face ever entering frame. Careful and
> unhurried.

## Postproducción: `scripts/video.mjs`

Un video de fondo tiene un trabajo distinto al de un video que se mira: está
detrás de un velo, en bucle, en mute y sin controles. Eso permite comprimirlo
mucho más de lo que se podría con un video que el usuario mira de frente.

De cada archivo crudo salen tres:

- **MP4** (H.264, CRF 30, `faststart`) para compatibilidad universal.
- **WebM** (VP9, CRF 38), que a la misma calidad pesa menos y que prefieren
  Chrome, Firefox y Edge.
- **Póster JPG** del primer fotograma.

Se les quita la pista de audio: un fondo va siempre en mute.

Resultado: **entre 108 y 211 KB por video**, 1,3 MB los tres con sus pósters.

## Reglas de reproducción

Están en `Hero.astro` y `SeccionMedia.astro`, y valen para los tres videos:

- **Solo se reproducen en pantalla.** Un `IntersectionObserver` los pausa al
  salir del viewport. Un video corriendo donde nadie lo ve gasta batería y CPU.
- **No se descargan** si el usuario pidió movimiento reducido o si el navegador
  declara ahorro de datos. Queda el póster, que es el primer fotograma del mismo
  video: nadie nota que falta algo.
- **El video solo tapa la fotografía mientras corre de verdad.** Si algo lo
  pausa —una pestaña en segundo plano, una política de reproducción automática,
  una red que se corta— reaparece la imagen que está debajo. Nunca queda un
  rectángulo liso. Este comportamiento apareció probando en el navegador: la
  primera versión dejaba un bloque azul cuando el video se pausaba.
- **Nunca llevan audio** ni controles, y son `aria-hidden`: son fondo, no
  contenido.

---

# El viaje del hero

Santiago → Ñuñoa → la avenida → llegar. El usuario baja y el viaje avanza con él.

## Por qué son cuatro planos y no uno

Ningún modelo de video hace ese recorrido en una sola generación sin que se
deshaga a la mitad. Son **cuatro planos generados por separado**, cada uno desde
una imagen fija que se controla antes, y montados con fundidos de 0,7 s.

| Plano | Nace de | Qué muestra |
|---|---|---|
| 1 | `viaje-1-santiago` | Santiago desde el aire, la cuadrícula hasta la cordillera |
| 2 | `viaje-2-nunoa` | Descenso sobre los techos y las copas de Ñuñoa |
| 3 | `calle-nunoa` | La avenida con plátanos, a la altura de la vista |
| 4 | `edificio-nunoa` | Llegar: la fachada con la cordillera detrás |

Los planos 3 y 4 nacen de fotografías que **ya estaban en el sitio**. Por eso el
viaje no se siente como un video pegado encima: termina exactamente en las
imágenes que el visitante va a volver a ver en contacto y en conócenos.

Modelo: **Kling 3.0 Turbo** a 1080p, 5 s por plano. Da mejor resolución que
Seedance Mini —que topa en 720p— y sale más barato.

## Hasta dónde llega, y por qué no entra

El cliente pidió que el viaje llegara hasta los pasillos interiores de la
clínica. **Termina en la calle.**

La clínica todavía no está construida. Un paciente que ve un hero que baja hasta
un edificio y entra a unos pasillos va a creer que ese es el lugar al que va a
ir; cuando llegue y sea otro, lo que se rompe no es el diseño sino la confianza,
en un sitio de salud, el día uno. Es distinto de una imagen de ambiente: acá hay
una dirección específica.

Tampoco hay una fotografía del Edificio New Egaña real. Por eso el plano 4
muestra una fachada **de contexto**, sin señalética, y en ninguna parte se dice
que sea la del edificio. Los rótulos que acompañan el descenso —"Santiago de
Chile", "Comuna de Ñuñoa", "A pasos de Metro Plaza Egaña"— sí son verdad
verificable.

**Cuando llegue una foto del edificio real**, se regenera solo el plano 4 desde
ella y el viaje pasa a ser literalmente cierto. Cuando el espacio esté habilitado
y haya video del interior, se agrega como quinto plano. Ninguna de las dos cosas
obliga a rehacer lo demás.

## Los dos archivos, y por qué son dos

| Archivo | Peso | Para qué |
|---|---|---|
| `viaje-scroll.mp4` | 2,51 MB | Escritorio, notebook y tablet. Un fotograma clave **cada 8**, para que saltar a cualquier punto sea instantáneo. Esos fotogramas clave son la razón de que pese más de lo normal, y son justamente lo que hace posible recorrerlo con el scroll. |
| `viaje-movil.mp4` | 0,72 MB | Móvil. Compresión normal, porque ahí **no** se controla con el scroll. |
| `viaje.jpg` | 0,13 MB | Póster: el primer plano, la vista de Santiago. |

En móvil el viaje se reproduce solo, en bucle, y el hero ocupa una sola pantalla.
iOS no permite buscar dentro de un video con fluidez, y forzarlo se ve peor que
no hacerlo. Con `prefers-reduced-motion` o ahorro de datos no se descarga ningún
video: queda el póster.

## Una lección del código

La primera versión interpolaba el avance con `actual += (objetivo - actual) *
0.12` **por fotograma**. Parece correcto y no lo es: avanza al doble de velocidad
en una pantalla de 120 Hz que en una de 60, y se arrastra sin llegar nunca cuando
el navegador estrangula los cuadros. Se descubrió midiendo: en el entorno de
prueba corrían 4 fotogramas en 3 segundos y el video se quedaba a un séptimo del
recorrido.

Ahora la interpolación es **exponencial por tiempo transcurrido**, con una
constante de 90 ms. El video llega al mismo punto en el mismo lapso en cualquier
dispositivo.
