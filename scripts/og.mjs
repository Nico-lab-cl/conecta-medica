/* Imágenes de Open Graph por página.

   Es lo que se ve cuando alguien comparte un enlace del sitio por WhatsApp, que
   en Chile es como circula de verdad la recomendación de un médico. Una tarjeta
   genérica en ese momento cuesta más que cualquier detalle de la página.

   Cada tarjeta compone: la fotografía de esa página, un degradado oscuro hacia
   abajo para que el texto se lea, la marca sobre una placa blanca, y el
   título. Sin créditos de generación: se arma en local con las imágenes que ya
   existen. */
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';

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

/* Las fotos de origen eran PNG y hoy son JPG. Este script quedó apuntando a la
   extensión vieja y por eso dejó de correr en silencio: se busca el archivo en
   vez de asumirlo. */
const foto = (nombre) => {
  for (const ext of ['.jpg', '.jpeg', '.png', '.webp']) {
    if (existsSync(`${IMG}/${nombre}${ext}`)) return `${IMG}/${nombre}${ext}`;
  }
  throw new Error(`falta la foto ${nombre} en ${IMG}`);
};

/* LA PLACA DE MARCA

   Acá estaba el lockup trazado del JPG original: la gota azul con "Clinica
   CONECTA". Es el logo viejo, y era lo primero que veía cualquiera que
   recibiera un enlace del sitio por WhatsApp. El resto de la marca había
   cambiado hacía semanas; la tarjeta compartida seguía mostrando la anterior.

   Ahora la placa se arma como la cabecera: el isotipo redibujado —el rehilete—
   más el nombre en texto. Las proporciones son las de CabeceraV3 (isotipo de
   44 px, nombre de 24 px, aire de 11 px) escaladas 1,78 veces, para que la
   marca pese lo mismo dentro de una tarjeta de 1200 px.

   El nombre va en Segoe UI y no en Inter, que es la sans del sitio, porque
   estas tarjetas se rasterizan acá con las tipografías del sistema e Inter no
   está instalada. Es la humanista más cercana de las que sí están, y a este
   tamaño la diferencia no se lee. Source Serif 4 sí está instalada, así que el
   título de la tarjeta ahora es exactamente el del sitio y no Georgia. */
const ISOTIPO_ALTO = 78;
const NOMBRE_TAM = 43;
const AIRE_MARCA = 19;
const PLACA_PAD_X = 32;
const PLACA_PAD_Y = 24;
const SANS = 'Segoe UI, Nunito Sans, Helvetica, Arial, sans-serif';
const SERIF = 'Source Serif 4, Georgia, Times New Roman, serif';

const isotipo = await sharp('public/marca/isotipo-limpio.svg', { density: 600 })
  .resize({ height: ISOTIPO_ALTO })
  .png()
  .toBuffer();
const isotipoMeta = await sharp(isotipo).metadata();

/* El nombre se rasteriza en un lienzo holgado y se recorta a la tinta: es la
   única forma de saber cuánto mide antes de dimensionar la placa. */
const nombre = await sharp(
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="700" height="140">
    <text x="4" y="104" font-family="${SANS}" font-size="${NOMBRE_TAM}" fill="#16437F"><tspan font-weight="400">Clínica</tspan><tspan font-weight="600" dx="13">Conecta</tspan></text>
  </svg>`),
)
  .png()
  .trim()
  .toBuffer();
const nombreMeta = await sharp(nombre).metadata();

const isoW = isotipoMeta.width ?? 80;
const isoH = isotipoMeta.height ?? ISOTIPO_ALTO;
const nomW = nombreMeta.width ?? 220;
const nomH = nombreMeta.height ?? 44;
const placaW = PLACA_PAD_X * 2 + isoW + AIRE_MARCA + nomW;
const placaH = PLACA_PAD_Y * 2 + Math.max(isoH, nomH);

const placa = await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${placaW}" height="${placaH}"><rect width="${placaW}" height="${placaH}" rx="12" fill="#FFFFFF"/></svg>`,
  ),
)
  .composite([
    { input: isotipo, top: Math.round((placaH - isoH) / 2), left: PLACA_PAD_X },
    {
      input: nombre,
      /* Centrado por la caja de tinta, que arriba llega hasta la tilde de
         "Clínica" y abajo hasta la línea base: eso lo deja ópticamente un pelo
         alto, y dos píxeles lo compensan. */
      top: Math.round((placaH - nomH) / 2) + 2,
      left: PLACA_PAD_X + isoW + AIRE_MARCA,
    },
  ])
  .png()
  .toBuffer();

const escapar = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

for (const t of TARJETAS) {
  const fondo = await sharp(foto(t.foto))
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
    <text x="64" y="522" font-family="${SERIF}" font-size="52" font-weight="600" fill="#FFFFFF">${escapar(t.titulo)}</text>
    <text x="64" y="566" font-family="${SANS}" font-size="25" fill="#D6E3F7">${escapar(t.pie)}</text>
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
