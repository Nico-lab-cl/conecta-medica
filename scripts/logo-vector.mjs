/* Vectoriza el logo real de Clínica Conecta.

   IMPORTANTE: esto NO genera un logo nuevo ni "parecido". Traza el archivo que
   entregó el cliente (`public/assets/logo-conecta-original.jpg`) y produce un
   SVG con la misma forma. Un modelo generativo habría dibujado otra marca, y
   una marca aproximada es peor que un JPG.

   El original tiene dos tintas: el azul de "Clinica" y de la gota, y el negro de
   "CONECTA". Se separan por color, se traza cada capa por separado y se componen
   en un solo SVG de dos trazados. Así cada tinta conserva su color exacto y la
   versión monocroma blanca del pie de página sale de la misma geometría.

   Cuando Carlos entregue el vector original, este script se borra y se usa el
   suyo. Ver docs/preguntas-carlos.md, punto B-5. */
import sharp from 'sharp';
import potrace from 'potrace';
import { writeFileSync, mkdirSync } from 'node:fs';
import { promisify } from 'node:util';

const trazar = promisify(potrace.trace);

const ORIGEN = 'public/assets/logo-conecta-original.jpg';
const SALIDA = 'public/marca';
mkdirSync(SALIDA, { recursive: true });

const AZUL = '#12489E';
const NEGRO = '#14181D';

// Caja de tinta real del lockup, medida píxel a píxel (ver scripts/marca.mjs).
const LOCKUP = { x: 0.09, y: 0.303, w: 0.824, h: 0.332 };
// La gota sola, para el isotipo.
const GOTA = { x: 0.5, y: 0.304, w: 0.062, h: 0.07 };

async function recortar(c, escala = 6) {
  const { width = 500, height = 500 } = await sharp(ORIGEN).metadata();
  return sharp(ORIGEN)
    .extract({
      left: Math.round(c.x * width),
      top: Math.round(c.y * height),
      width: Math.round(c.w * width),
      height: Math.round(c.h * height),
    })
    .resize({ width: Math.round(c.w * width * escala), kernel: 'lanczos3' })
    .toBuffer();
}

/** Máscara en blanco y negro de una de las dos tintas. */
async function mascara(buf, tinta) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const salida = Buffer.alloc(width * height);

  for (let i = 0, p = 0; i < data.length; i += channels, p++) {
    const r = data[i] ?? 255;
    const g = data[i + 1] ?? 255;
    const b = data[i + 2] ?? 255;
    const luz = (r + g + b) / 3;
    const esAzul = b > 90 && b - r > 45 && b - g > 20;
    const esNegro = luz < 120 && !esAzul;
    const dentro = tinta === 'azul' ? esAzul : esNegro;
    salida[p] = dentro ? 0 : 255; // negro = tinta, blanco = fondo
  }

  /* Un desenfoque leve antes de trazar. El original es un JPG: los bordes de las
     letras traen artefactos de compresión, y potrace los sigue uno por uno,
     generando cientos de segmentos que no aportan forma y cuadruplican el peso
     del archivo. Suavizar y volver a umbralizar deja bordes limpios. */
  return sharp(salida, { raw: { width, height, channels: 1 } })
    .blur(2.5)
    .threshold(128)
    .png()
    .toBuffer();
}

/** Devuelve solo el atributo `d` del trazado que produce potrace. */
async function caminos(pngMascara) {
  const svg = await trazar(pngMascara, {
    threshold: 128,
    turdSize: 2, // mínimo: la O de CONECTA tiene un guión interior pequeño
    optCurve: true,
    optTolerance: 0.2,
    color: '#000000',
    background: 'transparent',
  });
  /* Potrace emite coordenadas con muchos decimales sobre un lienzo ampliado 6x.
     A ese tamaño de viewBox, un decimal ya es más precisión de la que cualquier
     pantalla puede mostrar, y redondear baja el archivo a menos de la mitad. */
  const d = [...svg.matchAll(/ d="([^"]+)"/g)]
    .map((m) => (m[1] ?? '').replace(/-?d+.d+/g, (n) => String(Math.round(Number(n) * 10) / 10)))
    .join(' ');
  const vb = svg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 100 100';
  return { d, vb };
}

async function construir(recorte, archivo, opciones = {}) {
  const buf = await recortar(recorte);
  const azul = await caminos(await mascara(buf, 'azul'));
  const negro = await caminos(await mascara(buf, 'negro'));
  const vb = azul.vb;

  const capas = [];
  /* fill-rule="evenodd" es obligatorio: potrace emite el contorno exterior y los
     contornos interiores como subtrazados del mismo path. Sin evenodd, la O de
     CONECTA —que es un anillo con un guión dentro— se rellena sólida y se pierde
     el elemento más distintivo del logotipo. */
  if (azul.d.trim())
    capas.push(`  <path fill="${opciones.mono ?? AZUL}" fill-rule="evenodd" d="${azul.d}"/>`);
  if (negro.d.trim() && !opciones.soloAzul)
    capas.push(`  <path fill="${opciones.mono ?? NEGRO}" fill-rule="evenodd" d="${negro.d}"/>`);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="Clínica Conecta">
${capas.join('\n')}
</svg>
`;
  writeFileSync(`${SALIDA}/${archivo}`, svg);
  const kb = (Buffer.byteLength(svg) / 1024).toFixed(1);
  console.log(`${archivo.padEnd(28)} ${kb} KB   viewBox ${vb}`);
}

await construir(LOCKUP, 'lockup.svg');
await construir(LOCKUP, 'lockup-blanco.svg', { mono: '#FFFFFF' });
await construir(GOTA, 'isotipo.svg', { soloAzul: true });
await construir(GOTA, 'isotipo-blanco.svg', { soloAzul: true, mono: '#FFFFFF' });

console.log('\nVectorizado desde el archivo original. Ninguna forma fue redibujada.');
