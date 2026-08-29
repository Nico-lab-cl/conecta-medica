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
