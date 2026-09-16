/* Genera la imagen OG a partir del logo real.

   Generaba también el favicon y los íconos, recortándolos del JPG original. Ya
   no: el vector que este archivo estaba esperando —"cuando Carlos entregue el
   vector, este script se reemplaza por SVG limpios", decía acá— existe desde el
   2026-09-02 en public/marca/, y los íconos salen de ahí con scripts/iconos.mjs.
   Dejar las dos rutas vivas significaba que el último script en correr ganaba,
   y el que gana en silencio sería el que produce el PNG borroso.

   La imagen OG sigue saliendo del recorte porque necesita el lockup completo
   —"Clínica CONECTA" con su tipografía—, y de eso todavía no hay vector. */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const ORIGEN = 'public/assets/logo-conecta-original.jpg';
const AZUL = { r: 0x12, g: 0x48, b: 0x9e };

const RECORTES = {
  /* Caja real de la tinta del archivo original, medida píxel a píxel:
     x 0.096–0.908, y 0.310–0.628. El recorte del design system
     ({ x: 0.09, y: 0.29, w: 0.82, h: 0.365 }) incluye un 15% de aire vertical
     de más, que a 44 px de alto en la cabecera deja "Clinica" casi ilegible.
     Este ajusta a la tinta con un margen mínimo. Misma marca, sin redibujar. */
  lockup: { x: 0.09, y: 0.303, w: 0.824, h: 0.332 },
  /* CORRECCIÓN respecto del design system: su recorte de isotipo
     { x: 0.50, y: 0.29, w: 0.075, h: 0.09 } arrastra hacia abajo las letras de
     "Clinica" cuando se amplía para el ícono. Este aísla la gota, que es el
     único elemento de la marca que sigue siendo legible a 32 px. */
  isotype: { x: 0.500, y: 0.304, w: 0.062, h: 0.070 },
};

const px = (v, total) => Math.max(1, Math.round(v * total));

async function recortar(variante, margen = 0) {
  const img = sharp(ORIGEN);
  const { width = 0, height = 0 } = await img.metadata();
  const c = RECORTES[variante];
  const m = margen;
  const left = px(Math.max(0, c.x - c.w * m), width);
  const top = px(Math.max(0, c.y - c.h * m), height);
  const w = px(Math.min(1 - c.x, c.w * (1 + m * 2)), width);
  const h = px(Math.min(1 - c.y, c.h * (1 + m * 2)), height);
  return sharp(ORIGEN).extract({ left, top, width: w, height: h });
}

mkdirSync('public', { recursive: true });

// --- Imagen OG 1200×630: lockup sobre blanco, con el hilo Conecta ---
const lockup = await (await recortar('lockup')).resize({ width: 620 }).png().toBuffer();
const meta = await sharp(lockup).metadata();
const hilo = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
     <line x1="120" y1="470" x2="1080" y2="470" stroke="#12489E" stroke-width="2" stroke-linecap="round"/>
     ${[0, 0.25, 0.5, 0.75, 1]
       .map(
         (t) =>
           `<circle cx="${120 + t * 960}" cy="470" r="7" fill="#FFFFFF" stroke="#12489E" stroke-width="2"/>`,
       )
       .join('')}
     <text x="120" y="545" font-family="Georgia, serif" font-size="34" fill="#0A2B5E">Atención hematológica coordinada</text>
     <text x="120" y="590" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#5B646E">Ñuñoa, Santiago · Telemedicina en todo Chile</text>
   </svg>`,
);

await sharp({
  create: { width: 1200, height: 630, channels: 3, background: '#FFFFFF' },
})
  .composite([
    { input: lockup, top: 175, left: Math.round((1200 - (meta.width ?? 720)) / 2) },
    { input: hilo, top: 0, left: 0 },
  ])
  .jpeg({ quality: 88 })
  .toFile('public/og/og-default.jpg');
console.log('imagen OG 1200x630');

console.log('\nListo. Azul de marca:', AZUL);
