/* Prepara los videos de fondo para producción.

   Un video de fondo tiene un trabajo distinto al de un video que se mira: está
   detrás de un velo oscuro, en bucle, en mute y sin controles. Eso permite ser
   bastante más agresivo con la compresión de lo que se podría con un video que
   el usuario mira de frente.

   De cada archivo crudo salen tres cosas:
     · un MP4 (H.264) para compatibilidad universal;
     · un WebM (VP9), que a la misma calidad pesa bastante menos y que Chrome,
       Firefox y Edge prefieren;
     · un póster JPG del primer fotograma, que es lo que se ve mientras el video
       carga y lo que queda si el usuario pidió movimiento reducido.

   Se les quita la pista de audio: un fondo va siempre en mute, y el audio solo
   suma peso. */
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync, unlinkSync } from 'node:fs';

const DIR = 'public/video';
const ALTO = 720;

const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args]);

const kb = (p) => (statSync(p).size / 1024).toFixed(0) + ' KB';

const crudos = readdirSync(DIR).filter((f) => f.endsWith('-crudo.mp4'));
if (crudos.length === 0) {
  console.log('No hay videos crudos en', DIR);
  process.exit(0);
}

for (const crudo of crudos) {
  const base = crudo.replace('-crudo.mp4', '');
  const origen = `${DIR}/${crudo}`;

  // MP4 · H.264. `faststart` mueve el índice al principio para que empiece a
  // reproducir antes de terminar de descargar.
  ff([
    '-i', origen,
    '-an',
    '-vf', `scale=-2:${ALTO}`,
    '-c:v', 'libx264',
    '-preset', 'slow',
    '-crf', '30',
    '-profile:v', 'main',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    `${DIR}/${base}.mp4`,
  ]);

  // WebM · VP9 en dos pasadas de calidad constante.
  ff([
    '-i', origen,
    '-an',
    '-vf', `scale=-2:${ALTO}`,
    '-c:v', 'libvpx-vp9',
    '-crf', '38',
    '-b:v', '0',
    '-row-mt', '1',
    '-deadline', 'good',
    '-cpu-used', '2',
    `${DIR}/${base}.webm`,
  ]);

  // Póster: primer fotograma.
  ff([
    '-i', origen,
    '-vf', `scale=-2:${ALTO}`,
    '-frames:v', '1',
    '-q:v', '4',
    `${DIR}/${base}.jpg`,
  ]);

  unlinkSync(origen);

  console.log(
    `${base.padEnd(16)} mp4 ${kb(`${DIR}/${base}.mp4`).padStart(8)}` +
      `   webm ${kb(`${DIR}/${base}.webm`).padStart(8)}` +
      `   póster ${kb(`${DIR}/${base}.jpg`).padStart(8)}`,
  );
}

console.log('\nListos. Van en mute, en bucle y detrás de un velo: por eso admiten esta compresión.');
