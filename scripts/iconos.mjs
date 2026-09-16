/* Íconos del sitio: pestaña, pantalla de inicio y manifiesto.

   Todo sale de UN vector, `public/marca/isotipo-limpio.svg`, que es el mismo
   isotipo que muestra la cabecera. Antes salían de `scripts/marca.mjs`, que los
   recortaba del JPG original de la marca: el favicon terminaba siendo un PNG de
   128 px incrustado dentro de un SVG —16,6 KB para un ícono de pestaña— y se
   veía blando a cualquier tamaño. El JPG sigue siendo la fuente de la imagen OG,
   que es lo único que todavía necesita el archivo original.

   POR QUÉ LOS ÍCONOS LLEVAN PLACA Y EL SITIO NO

   El isotipo es un rehilete de seis aspas entrelazadas, y lo que lo hace
   legible son los huecos blancos entre ellas. Se rasterizó a 16, 20 y 32 px
   para mirarlo píxel a píxel: a 16 px, con la marca suelta sobre transparente,
   los huecos se cierran y queda una mancha gris sin silueta. Con margen del
   12 % empeora, porque la marca se achica todavía más.

   Sobre placa azul con la marca en blanco, a 16 px se reconoce: la placa le da
   una silueta definida y sube el contraste del glifo. Por eso los íconos llevan
   placa y la cabecera no —ahí la marca se muestra a 44 px, donde no hace falta.

   Esto NO cambia el isotipo, que es la condición que puso el cliente: es el
   mismo vector, sobre un fondo. Si algún día se quiere la marca suelta en la
   pestaña, basta con poner PLACA en false acá abajo, pero conviene volver a
   mirar los 16 px antes.

   Se ejecuta a mano, no en el build: los íconos cambian cuando cambia la marca,
   no en cada despliegue.

       npm run iconos
*/
import sharp from 'sharp';
import fs from 'node:fs';
const { readFileSync, writeFileSync, mkdirSync } = fs;

const FUENTE_COLOR = 'public/marca/isotipo-limpio.svg';
const FUENTE_BLANCO = 'public/marca/isotipo-limpio-blanco.svg';

/* El azul del isotipo, tomado del propio archivo. No es el #12489E de la
   paleta: el SVG de la cabecera viene en #214478 y la placa tiene que ser del
   mismo tono, o el ícono y la cabecera se ven como dos azules distintos. */
const AZUL = (readFileSync(FUENTE_COLOR, 'utf8').match(/fill="(#[0-9A-Fa-f]{6})"/) ?? [])[1];
if (!AZUL) throw new Error(`No pude leer el color de ${FUENTE_COLOR}`);

const PLACA = true;

/** Contenido interno del SVG, para poder anidarlo dentro de otro. */
function interior(archivo) {
  const s = readFileSync(archivo, 'utf8');
  const i = s.indexOf('>', s.indexOf('<svg'));
  const j = s.lastIndexOf('</svg>');
  return s.slice(i + 1, j).trim();
}

/** viewBox del original, que el SVG anidado necesita para escalar solo. */
function caja(archivo) {
  const m = readFileSync(archivo, 'utf8').match(/viewBox="([^"]+)"/);
  if (!m) throw new Error(`Sin viewBox: ${archivo}`);
  return m[1];
}

/**
 * Arma el ícono cuadrado.
 * @param lado   tamaño en px del cuadrado
 * @param radio  esquinas; 0 para los íconos que el sistema recorta por su cuenta
 * @param ocupa  fracción del lado que ocupa la marca
 */
function svgIcono(lado, radio, ocupa) {
  const fuente = PLACA ? FUENTE_BLANCO : FUENTE_COLOR;
  const marca = Math.round(lado * ocupa);
  const off = Math.round((lado - marca) / 2);
  const fondo = PLACA
    ? `<rect width="${lado}" height="${lado}" rx="${radio}" fill="${AZUL}"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lado} ${lado}" width="${lado}" height="${lado}" role="img" aria-label="Clínica Conecta">
  <title>Clínica Conecta</title>
  ${fondo}
  <svg x="${off}" y="${off}" width="${marca}" height="${marca}" viewBox="${caja(fuente)}" preserveAspectRatio="xMidYMid meet">
    ${interior(fuente)}
  </svg>
</svg>
`;
}

const png = (svg, lado) =>
  sharp(Buffer.from(svg), { density: 1200 }).resize(lado, lado).png({ compressionLevel: 9 });

mkdirSync('public', { recursive: true });

/* 1. El SVG de la pestaña. Es el que usan Chrome, Firefox, Edge y Safari 16+,
      y el único que se ve nítido en pantallas de cualquier densidad. */
const faviconSvg = svgIcono(64, 14, 0.78);
writeFileSync('public/favicon.svg', faviconSvg);
console.log('favicon.svg', faviconSvg.length, 'bytes');

/* 2. favicon.ico en la raíz, que es la pieza que AHORRA HTML.

      Los navegadores viejos que no entienden un favicon vectorial necesitan un
      PNG, y lo normal sería declararlo con dos <link rel="icon" sizes="...">.
      Acá eso no cabe: la portada está a 42 bytes del presupuesto de 60 KB de
      HTML que comprueba scripts/presupuesto.mjs, y dos etiquetas más en las
      veinte páginas lo revientan.

      Pero /favicon.ico no se declara: todo navegador lo pide solo a la raíz si
      no encuentra otra cosa. Cero bytes de HTML y el respaldo igual existe.

      El formato es simple y sharp no lo escribe, así que se arma a mano: una
      cabecera de 6 bytes, una entrada de 16 por tamaño, y los PNG pegados
      detrás. PNG dentro de ICO lo aceptan Windows Vista en adelante y todos los
      navegadores que todavía piden .ico. */
async function escribirIco(destino, lados) {
  const imagenes = [];
  for (const lado of lados) {
    imagenes.push({ lado, datos: await png(svgIcono(64, 14, 0.78), lado).toBuffer() });
  }
  const cabecera = Buffer.alloc(6);
  cabecera.writeUInt16LE(0, 0); // reservado
  cabecera.writeUInt16LE(1, 2); // 1 = ícono
  cabecera.writeUInt16LE(imagenes.length, 4);

  let offset = 6 + imagenes.length * 16;
  const entradas = [];
  for (const { lado, datos } of imagenes) {
    const e = Buffer.alloc(16);
    e.writeUInt8(lado >= 256 ? 0 : lado, 0); // 0 significa 256
    e.writeUInt8(lado >= 256 ? 0 : lado, 1);
    e.writeUInt8(0, 2); // paleta
    e.writeUInt8(0, 3); // reservado
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por píxel
    e.writeUInt32LE(datos.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += datos.length;
    entradas.push(e);
  }
  fs.writeFileSync(
    destino,
    Buffer.concat([cabecera, ...entradas, ...imagenes.map((i) => i.datos)]),
  );
}
await escribirIco('public/favicon.ico', [16, 32]);
console.log('favicon.ico');

/* 3. Pantalla de inicio de iOS. SIN esquinas redondeadas: iOS aplica su propia
      máscara y, si el archivo ya viene redondeado, quedan dos redondeos, uno
      dentro del otro. Y con más aire, porque el recorte de iOS come borde. */
await png(svgIcono(180, 0, 0.7), 180).toFile('public/apple-touch-icon.png');
console.log('apple-touch-icon.png');

/* 4. Manifiesto. El "any" va redondeado; el "maskable" va a sangre y con la
      marca dentro del 80 % central, que es la zona que Android garantiza no
      recortar sea cual sea la forma que use el lanzador. */
for (const lado of [192, 512]) {
  await png(svgIcono(lado, Math.round(lado * 0.22), 0.78), lado).toFile(`public/icono-${lado}.png`);
  console.log(`icono-${lado}.png`);
}
await png(svgIcono(512, 0, 0.58), 512).toFile('public/icono-maskable-512.png');
console.log('icono-maskable-512.png');

console.log('\nListo. Azul de la placa:', AZUL, PLACA ? '' : '(sin placa)');
