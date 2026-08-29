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

| Archivo | Uso | Formato |
|---|---|---|
| `hero-corredor.png` | Hero de la portada | 16:9 · 2048×1152 |
| `calle-nunoa.png` | Cómo llegar, contacto | 4:3 · 2048×1536 |
| `escritorio.png` | "Te evaluamos con tiempo" | 4:3 · 2048×1536 |
| `examenes-previos.png` | "Revisamos tus exámenes previos" | 4:3 · 2048×1536 |
| `telemedicina.png` | Página de telemedicina | 4:3 · 2048×1536 |

Fuente en `src/assets/imagenes/`. Astro genera AVIF y WebP en el build, con
`width`/`height` explícitos para no provocar saltos de maquetación.

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
