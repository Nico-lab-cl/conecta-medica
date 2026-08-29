/* Imágenes de Open Graph por página.

   Es lo que se ve cuando alguien comparte un enlace del sitio por WhatsApp, que
   en Chile es como circula de verdad la recomendación de un médico. Una tarjeta
   genérica en ese momento cuesta más que cualquier detalle de la página.

   Cada tarjeta compone: la fotografía de esa página, un degradado oscuro hacia
   abajo para que el texto se lea, el lockup de la marca sobre una placa blanca,
   y el título. Sin créditos de generación: se arma en local con las imágenes que
   ya existen. */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const IMG = 'src/assets/imagenes';
const SALIDA = 'public/og';
const W = 1200;
const H = 630;

const TARJETAS = [
  { salida: 'inicio', foto: 'c-hero', titulo: 'Atención hematológica coordinada', pie: 'Ñuñoa, Santiago · Telemedicina en todo Chile' },
  { salida: 'unidad', foto: 'c-consulta', titulo: 'Conecta Hematología', pie: 'Evaluación, estudio y seguimiento coordinado' },
  { salida: 'prestaciones', foto: 'c-microscopio', titulo: 'Las cuatro prestaciones', pie: 'La hematología es el eje. Lo demás entra cuando tu caso lo pide' },
  { salida: 'hematologia', foto: 'c-hemograma', titulo: 'Consulta de hematología', pie: 'Revisamos los exámenes que ya te hiciste' },
  { salida: 'gastroenterologia', foto: 'c-gastro', titulo: 'De dónde se pierde el hierro', pie: 'Gastroenterología dentro del estudio hematológico' },
  { salida: 'nutricion-y-dietetica', foto: 'c-nutricion', titulo: 'Que el hierro que comes llegue', pie: 'Nutrición junto al tratamiento hematológico' },
  { salida: 'interpretacion-de-imagenes', foto: 'c-imagenes', titulo: 'Leer tus ganglios y tu bazo', pie: 'Interpretación de imágenes con la pregunta hematológica' },
  { salida: 'telemedicina', foto: 'c-telemedicina', titulo: 'Hematología a distancia', pie: 'En todo Chile · Consulta $50.000' },
  { salida: 'preguntas', foto: 'mesa-lectura', titulo: 'Preguntas frecuentes', pie: 'Anemia, plaquetas, ganglios y anticoagulantes' },
  { salida: 'precios', foto: 'escritorio', titulo: 'Consulta $50.000', pie: 'Atención particular. El precio, publicado' },
  { salida: 'contacto', foto: 'calle-nunoa', titulo: 'Cómo llegar', pie: 'Edificio New Egaña · Metro Plaza Egaña' },
  { salida: 'conocenos', foto: 'edificio-nunoa', titulo: 'Una consulta que coordina', pie: 'Clínica Conecta · Ñuñoa, Santiago' },
  { salida: 'pacientes', foto: 'guias-impresas', titulo: 'Información para pacientes', pie: 'Entender lo que te está pasando' },
  { salida: 'agendar', foto: 'reloj-pared', titulo: 'Agenda tu hora', pie: 'Sin derivación previa · Te confirmamos en un día hábil' },
];

mkdirSync(SALIDA, { recursive: true });

/* El lockup ahora es vectorial (scripts/logo-vector.mjs), así que la placa sale
   nítida en vez de recortada del JPG. */
const lockup = await sharp('public/marca/lockup.svg', { density: 400 })
  .resize({ width: 250 })
  .png()
  .toBuffer();
const lockupMeta = await sharp(lockup).metadata();
const placa = await sharp({
  create: {
    width: (lockupMeta.width ?? 250) + 52,
    height: (lockupMeta.height ?? 100) + 36,
    channels: 4,
    background: '#FFFFFF',
  },
})
  .composite([{ input: lockup, top: 18, left: 26 }])
  .png()
  .toBuffer();

const escapar = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

for (const t of TARJETAS) {
  const fondo = await sharp(`${IMG}/${t.foto}.png`)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 1.02 })
    .toBuffer();

  const capa = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.30" stop-color="#0A2B5E" stop-opacity="0"/>
        <stop offset="0.68" stop-color="#0A2B5E" stop-opacity="0.62"/>
        <stop offset="1"    stop-color="#0A2B5E" stop-opacity="0.92"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#v)"/>
    <line x1="64" y1="454" x2="1136" y2="454" stroke="#FFFFFF" stroke-opacity="0.55" stroke-width="2" stroke-linecap="round"/>
    ${[0, 0.25, 0.5, 0.75, 1]
      .map(
        (p) =>
          `<circle cx="${64 + p * 1072}" cy="454" r="6" fill="#0A2B5E" stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="2"/>`,
      )
      .join('')}
    <text x="64" y="522" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="600" fill="#FFFFFF">${escapar(t.titulo)}</text>
    <text x="64" y="566" font-family="Helvetica, Arial, sans-serif" font-size="25" fill="#D6E3F7">${escapar(t.pie)}</text>
  </svg>`);

  await sharp(fondo)
    .composite([
      { input: capa, top: 0, left: 0 },
      { input: placa, top: 56, left: 64 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`${SALIDA}/${t.salida}.jpg`);

  console.log('og/' + t.salida + '.jpg');
}

// La tarjeta de inicio también es la de reserva del sitio.
await sharp(`${SALIDA}/inicio.jpg`).toFile(`${SALIDA}/og-default.jpg`);
console.log('og/og-default.jpg (reserva)');
console.log(`\n${TARJETAS.length + 1} tarjetas generadas, sin gastar créditos.`);
