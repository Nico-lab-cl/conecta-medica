/* Quita el borde negro de película que Soul Location agrega a algunas imágenes.

   El modelo emula una copia analógica y a veces deja un marco oscuro de unos
   pocos píxeles. Sirve para una foto suelta; en una serie que se muestra junta
   rompe la consistencia, porque unas lo traen y otras no.

   Detecta filas y columnas casi negras en los bordes y las recorta. Si no hay
   borde, no toca el archivo. */
import sharp from 'sharp';
import { readdirSync } from 'node:fs';

const DIR = 'src/assets/imagenes';
const UMBRAL = 42; // por debajo de esto se considera borde
const MAX = 0.04; // no recorta más del 4% por lado: sería otro problema

async function bordes(archivo) {
  const img = sharp(archivo);
  const { width = 0, height = 0 } = await img.metadata();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const c = info.channels;

  const luz = (x, y) => {
    const i = (y * width + x) * c;
    return ((data[i] ?? 0) + (data[i + 1] ?? 0) + (data[i + 2] ?? 0)) / 3;
  };

  const filaOscura = (y) => {
    let suma = 0;
    for (let x = 0; x < width; x += 8) suma += luz(x, y);
    return suma / Math.ceil(width / 8) < UMBRAL;
  };
  const colOscura = (x) => {
    let suma = 0;
    for (let y = 0; y < height; y += 8) suma += luz(x, y);
    return suma / Math.ceil(height / 8) < UMBRAL;
  };

  let arriba = 0;
  while (arriba < height * MAX && filaOscura(arriba)) arriba++;
  let abajo = 0;
  while (abajo < height * MAX && filaOscura(height - 1 - abajo)) abajo++;
  let izq = 0;
  while (izq < width * MAX && colOscura(izq)) izq++;
  let der = 0;
  while (der < width * MAX && colOscura(width - 1 - der)) der++;

  return { width, height, arriba, abajo, izq, der };
}

let tocados = 0;
for (const f of readdirSync(DIR).filter((f) => f.endsWith('.png'))) {
  const ruta = `${DIR}/${f}`;
  const b = await bordes(ruta);
  if (b.arriba + b.abajo + b.izq + b.der === 0) continue;

  const buf = await sharp(ruta)
    .extract({
      left: b.izq,
      top: b.arriba,
      width: b.width - b.izq - b.der,
      height: b.height - b.arriba - b.abajo,
    })
    .png()
    .toBuffer();
  await sharp(buf).toFile(ruta);
  console.log(
    `${f}: recortado ${b.arriba}/${b.abajo}/${b.izq}/${b.der} px (arriba/abajo/izq/der)`,
  );
  tocados++;
}
console.log(tocados === 0 ? 'ninguna imagen traía borde' : `${tocados} imagen(es) recortadas`);
