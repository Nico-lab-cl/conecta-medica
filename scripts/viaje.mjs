/* Monta el viaje del hero: Santiago → Ñuñoa → la avenida → llegar.

   Cuatro planos generados por separado, encadenados con fundidos. Ningún modelo
   hace ese recorrido en una sola generación sin que se deshaga a la mitad; cuatro
   planos controlados y montados sí.

   De la mezcla salen dos versiones, porque hacen cosas distintas:

   · `viaje-scroll` — la que recorre el scroll en escritorio y notebook. Lleva un
     fotograma clave cada 4, para que saltar a cualquier punto del video sea
     instantáneo. Sin eso, el navegador tiene que decodificar desde el fotograma
     clave anterior en cada movimiento del scroll y la reproducción se traba.
     Esos fotogramas clave son también la razón de que pese más de lo normal.

   · `viaje-movil` — más pequeña y con compresión normal. En móvil el video NO se
     controla con el scroll: iOS no permite buscar con fluidez y el resultado es
     peor que no hacerlo. Ahí el viaje se reproduce solo, en bucle.

   Y un póster del primer fotograma, que es lo que se ve mientras carga y lo que
   queda si el usuario pidió movimiento reducido. */
import { execFileSync } from 'node:child_process';
import { existsSync, statSync, unlinkSync } from 'node:fs';

const DIR = 'public/video';
const PLANOS = ['p1', 'p2', 'p3', 'p4'];
const FUNDIDO = 0.7; // segundos de cruce entre planos

const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args]);
const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(2) + ' MB';

const faltan = PLANOS.filter((p) => !existsSync(`${DIR}/${p}.mp4`));
if (faltan.length) {
  console.error('Faltan planos:', faltan.join(', '));
  process.exit(1);
}

/** Duración real de un archivo, en segundos. */
const duracion = (archivo) =>
  Number(
    execFileSync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'csv=p=0',
      archivo,
    ])
      .toString()
      .trim(),
  );

const duraciones = PLANOS.map((p) => duracion(`${DIR}/${p}.mp4`));

/* Los cuatro planos vuelven del modelo con proporciones distintas —1920×1080,
   1660×1244, 2228×928—, y `xfade` exige que coincidan exactamente. Antes de
   cruzarlos, cada uno se recorta a 16:9 desde el centro y se lleva a 1920×1080
   con la misma cadencia. Recortar y no deformar: estirar un plano para que calce
   se nota de inmediato en la arquitectura. */
const NORMALIZAR =
  'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=25,setsar=1';

/* Cadena de xfade. Cada cruce empieza en (suma de lo anterior - fundidos ya
   aplicados - FUNDIDO), que es donde termina el plano saliente menos el cruce. */
const entradas = PLANOS.flatMap((p) => ['-i', `${DIR}/${p}.mp4`]);
let filtro = PLANOS.map((_, i) => `[${i}:v]${NORMALIZAR}[n${i}];`).join('');
let etiqueta = '[n0]';
let acumulado = duraciones[0] ?? 0;

for (let i = 1; i < PLANOS.length; i++) {
  const salida = i === PLANOS.length - 1 ? '[mezcla]' : `[x${i}]`;
  const offset = (acumulado - FUNDIDO).toFixed(3);
  filtro += `${etiqueta}[n${i}]xfade=transition=fade:duration=${FUNDIDO}:offset=${offset}${salida};`;
  etiqueta = salida;
  acumulado += (duraciones[i] ?? 0) - FUNDIDO;
}

const total = acumulado.toFixed(1);

// --- Versión para el scroll: 720p, fotogramas clave densos ---
ff([
  ...entradas,
  '-filter_complex', `${filtro}[mezcla]scale=1280:-2[v]`,
  '-map', '[v]',
  '-an',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '31',
  '-g', '4',
  '-keyint_min', '4',
  '-sc_threshold', '0',
  '-profile:v', 'main',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  `${DIR}/viaje-scroll.mp4`,
]);

// --- Versión para móvil: más chica, compresión normal ---
ff([
  ...entradas,
  '-filter_complex', `${filtro}[mezcla]scale=854:-2[v]`,
  '-map', '[v]',
  '-an',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '33',
  '-profile:v', 'main',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  `${DIR}/viaje-movil.mp4`,
]);

// --- Póster ---
ff([
  '-i', `${DIR}/p1.mp4`,
  '-vf', 'scale=1280:-2',
  '-frames:v', '1',
  '-q:v', '4',
  `${DIR}/viaje.jpg`,
]);

for (const p of PLANOS) unlinkSync(`${DIR}/${p}.mp4`);

console.log(`viaje-scroll.mp4   ${mb(`${DIR}/viaje-scroll.mp4`)}   1280px · fotograma clave cada 4`);
console.log(`viaje-movil.mp4    ${mb(`${DIR}/viaje-movil.mp4`)}   854px · reproducción normal`);
console.log(`viaje.jpg          ${mb(`${DIR}/viaje.jpg`)}`);
console.log(`\nDuración del viaje: ${total} s, con fundidos de ${FUNDIDO}s entre planos.`);
