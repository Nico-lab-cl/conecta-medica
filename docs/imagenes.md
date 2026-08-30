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

# El hero: dos actos

**Acto 1 · Santiago**, en zoom sobre una imagen fija.
**Acto 2 · la clínica**, en video, con los valores y los CTA encima.

La versión anterior tenía cuatro etapas de zoom (Santiago → Ñuñoa → la avenida →
el edificio) y después dos videos. El cliente pidió quedarse con el zoom de
Santiago y reemplazar todo lo que venía después por un solo video: la
administración sonriendo de frente y luego un pasillo con gente trabajando.

## Por qué el acto 1 es CSS y el acto 2 es video

No es una preferencia estética: son dos problemas de compresión opuestos.

La primera versión del viaje era un video recorrido con el scroll y se veía
pixelada. La razón no era Higgsfield: **un zoom es el peor caso posible para
comprimir video.** La compresión guarda lo que *no* cambia entre fotogramas; en un
zoom continuo se mueve cada píxel en cada fotograma, así que no hay nada que
reutilizar. Encima, poder saltar a cualquier punto con el scroll obliga a un
fotograma clave cada 8, y cada uno es una imagen completa. Para que ese recorrido
se viera nítido a 1080p harían falta entre **20 y 35 MB**.

Un zoom, en el fondo, es una transformación geométrica: `scale()`. Dejársela al
navegador sobre una imagen de 4096 px hace que la GPU remuestree del original en
cada paso, y queda nítido en todo el recorrido por 1,08 MB.

El acto 2 es exactamente lo contrario: cámara casi fija, sujetos que se mueven
poco. Ahí la compresión funciona como debe y los 9,44 s pesan **1,39 MB** — con
movimiento real, que es lo que una foto no da.

| | Acto 1 (zoom) | Acto 2 (clínica) |
|---|---|---|
| Técnica | `scale()` sobre PNG de 4096 px | H.264 1920×1080, crf 29 |
| Peso | 1,08 MB en el peor caso | 1,39 MB |
| Cuándo se descarga | Con la página (`fetchpriority="high"`) | Recién al empezar el cruce |

## El detalle que decide la nitidez del acto 1

`sizes="170vw"`, no `100vw`.

`sizes` le dice al navegador cuántos píxeles va a necesitar. Con `100vw` pide una
imagen del ancho de la pantalla — pero el zoom la amplía hasta 1,55×, así que en el
punto de máximo acercamiento estaría estirando 1440 px para llenar 2232, y se
vería exactamente igual de blanda que el video que reemplazó.

Verificado en el navegador: en un panel de 953 px sirve una imagen de **1645 px**,
1,73× el ancho, contra un zoom máximo de 1,55×. Sobran píxeles reales en el punto
más cerrado.

## El video del acto 2

Dos archivos, uno por orientación. Ambos son dos planos de 5 s unidos con un
fundido de 0,6 s, con **personal chileno** (rasgos latinoamericanos, tono de piel
y pelo acordes): la clínica está en Ñuñoa y el material tiene que parecer de acá.

| Archivo | Resolución | Peso | Quién lo recibe |
|---|---|---|---|
| `v-clinica.mp4` | 1920×1080 | 3,49 MB | Pantallas horizontales |
| `v-clinica-vertical.mp4` | 1080×1920 | 2,54 MB | Pantallas verticales |

| Plano | Qué muestra | Cámara |
|---|---|---|
| 1 | Dos personas de administración detrás del mesón, sonriendo a cámara | Fija |
| 2 | Dos personas caminando por el pasillo conversando, una tercera al fondo | Travelling lento |

Generados con `text2image_soul_v2` y animados con `kling3_0_turbo`.

### Por qué hay una versión vertical

Un video 16:9 en una pantalla de teléfono obliga a dos cosas malas a la vez.
Medido en el navegador, a 390×800 con densidad 2:

| | 16:9 en un teléfono | 9:16 en un teléfono |
|---|---|---|
| Ampliación real | **1,48×** (estira) | **0,83×** (reduce) |
| Del ancho del cuadro se ve | 27% | 87% |

Es decir: con el horizontal el teléfono estiraba píxeles *y* además tiraba a la
basura tres cuartas partes del encuadre. La versión vertical no estira nada y
muestra casi todo. En un teléfono de densidad 3 la diferencia es 2,22× contra
1,25×.

La elección se hace en el mismo punto del script donde el archivo se descarga por
primera vez, con `matchMedia('(orientation: portrait)')`, así que no se baja el
archivo equivocado. El póster va por `<picture>` con `media`, que sí funciona
—a diferencia de `media` dentro de `<video>`, que los navegadores dejaron de
soportar.

### Dos parámetros que costaron caro

- `kling3_0_turbo` recibe la imagen con `--start-image`, no `--image-references`.
- `resolution` **cae a 720p por defecto**. Una versión salió en 720p sin que nadie
  lo pidiera, justo después de un reclamo por pixelación. Hay que pasar
  `--resolution 1080p` explícitamente.

### El crf se eligió mirando el peor caso

No al 100%, sino **ampliado 1,67×**, que es lo que ve un notebook retina. A esa
escala crf 29 aplana la piel y borra el pelo; crf 26 aguanta; crf 23 conserva la
textura. El horizontal, que es el que más se amplía, va en **23**. El vertical,
que en un teléfono se reduce en vez de ampliarse, aguanta **25**.

| crf | Peso | A 1,67× |
|---|---|---|
| 20 | 5,99 MB | Referencia |
| **23** | **3,49 MB** | Sin pérdida apreciable |
| 26 | 2,08 MB | Empieza a suavizar |
| 29 | 1,38 MB | Piel plana, pelo perdido |

## Cómo se sacó el texto ilusorio (y qué NO funcionó)

Las primeras versiones traían delatores de IA: letras ilegibles pintadas en la
pared, insignias inventadas en el pecho de los uniformes y credenciales con texto
falso. En un sitio de salud eso es doblemente malo: además de verse hecho con IA,
una insignia inventada parece la marca de otra institución. Una tanda incluso
salió con "CUMSA" bordado en los uniformes.

**Lo que no funcionó:** reforzar el negativo. Al agregar *"absolutely no text
anywhere, no badges, no crests, no name tags"* el modelo generó **más** texto que
antes: párrafos en la pared, credenciales amarillas, bordados en el pecho.
Nombrar algo en un negativo es igualmente nombrarlo.

**Lo que sí funcionó**, en dos pasos:

1. **Describir en positivo una escena donde no cabe texto.** Óptica de 50 mm a
   diafragma abierto, poca profundidad de campo, encuadre cerrado sobre las
   personas: la pared queda desenfocada, y una pared desenfocada no puede mostrar
   letras legibles. Los pasillos salieron limpios a la primera con esto.
2. **Borrar lo que igual apareció, con un modelo de edición.** `nano_banana_pro`
   con la instrucción de cambiar *solo* la tela y no tocar caras, pose ni luz
   quitó bordados, credenciales y hasta un fonendoscopio sin alterar el resto.

Corregir sobre la imagen fija y no sobre el video es lo que evita tener que
perseguir un borrón fotograma a fotograma. Comprobado cuadro por cuadro con una
tira de contactos a 1 fps antes de publicar.

## Lo que este material afirma, y lo que no

El video es material generado. **En ninguna parte del sitio se dice que sean el
equipo de Conecta ni que la clínica esté operando**, porque todavía no abre. El
texto alternativo lo describe como lo que es y los seis valores encima son los
mismos que se publican en Conócenos — afirmaciones sobre cómo se atiende, no
sobre quién aparece en pantalla.

Está construido para reemplazarse sin rehacer nada: cuando haya grabación real se
cambian los dos `.mp4` y sus pósters. Ningún otro archivo se toca. Ver
`docs/preguntas-carlos.md` §F.

---

# Resolución en todas las pantallas

Se auditó cada `<Picture>` del sitio calculando, para ocho combinaciones de
tamaño y densidad, cuántos píxeles reales necesita contra el mayor `widths` que
declara. **Salieron 27 déficits**, el peor estirando 2,19×.

La causa no era falta de material: varios componentes declaraban un tope de 700 u
800 px cuando la fuente tenía más de 2000. El navegador nunca pidió lo que sí
existía.

| Componente | Antes | Ahora |
|---|---|---|
| Contacto · calle | 700 px, estiraba 2,19× en tablet retina | 1600 px, sin déficit |
| Portada · cómo | 800 px, estiraba 1,92× | 1600 px, sin déficit |
| Tarjeta prestación | 1000 px, estiraba 1,29× en móvil | 1400 px, sin déficit |
| Portada · partida | 1400 px | 2000 px, sin déficit |
| Banda contenida | 2200 px | 2560 px, sin déficit |

**El zoom del hero además se bajó de 1,55× a 1,38×.** No es una decisión estética:
con 1,55× un notebook retina de 1440 px pedía 4896 px y la fuente tiene 4096. Con
1,38× pide 3974 y le sobran. Así el hero quedó sin déficit en todo salvo 4K, y
`sizes` bajó de `170vw` a `145vw`.

## Lo que sigue pendiente y por qué

Quedan cuatro imágenes a sangre completa cortas en escritorio retina y 4K, y el
motivo es la fuente, no el código: son de ~2000 px y un 4K a sangre pide 3840.

| Imagen | Fuente | Falta |
|---|---|---|
| Cabeceras de página (`c-*`) | ~2000 px | hasta 2,00× en 4K |
| Fondos de `SeccionMedia` | 1935 px | hasta 2,00× en 4K |
| Banda ancha del hero | 2558 px | hasta 1,50× en 4K |
| Santiago | 4096 px | 1,36× solo en 4K |

**Escalar en local no sirve.** Se probó: subir `c-hero` a 3840 px con lanczos y
enfoque triplica el peso del AVIF (93 KB → 266 KB) y la diferencia contra el
estirado del navegador es imperceptible, porque no hay detalle nuevo que
recuperar. Lo que corresponde es regenerar esas fuentes en 4K, y eso **requiere
créditos de Higgsfield** (la cuenta quedó en 2,46 tras generar los videos).

## Un defecto corregido probando en el navegador

**Sobraba casi la mitad del scroll.** Con 300svh de alto, el zoom terminaba y
quedaban unos 135svh en los que no pasaba nada más que el video en bucle. Bajado a
**200svh** (175svh en móvil): 55% para el zoom, 45% para leer los seis valores.

Y el acercamiento del video se ató a `--avance` en vez de a `--paso`, para que
siga moviéndose mientras se leen los valores en lugar de congelarse apenas termina
la transición.
