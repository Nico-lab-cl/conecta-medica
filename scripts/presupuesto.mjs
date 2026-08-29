/* Presupuesto de rendimiento y de honestidad del contenido.

   Corre sobre `dist/` después del build. Devuelve código 1 si algo se rompe,
   así el CI puede detener un despliegue en vez de avisar cuando ya está
   publicado.

   Comprueba dos familias de cosas:

   1. Rendimiento: peso del HTML y del JavaScript inicial de cada página.
   2. Honestidad: que no se filtre al sitio público ningún marcador de
      pendiente, ningún lorem ipsum y ningún número de teléfono de ejemplo.
      Esto último no es cosmético — es la regla central del encargo. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join, relative } from 'node:path';

const DIST = 'dist';

const LIMITES = {
  jsInicialKB: 60, // presupuesto del brief
  htmlKB: 60, // HTML sin comprimir por página
};

/* Patrones que NO pueden aparecer en el sitio público. */
const PROHIBIDOS = [
  { re: /\[PENDIENTE[^\]]*\]/i, que: 'marcador de pendiente visible' },
  { re: /lorem ipsum/i, que: 'lorem ipsum' },
  { re: /\+?56\s?9\s?1234\s?5678/, que: 'teléfono de ejemplo del design system' },
  { re: /contacto@conectamedica\.com/, que: 'correo incorrecto (el real es asistente@)' },
  { re: /Av\.?\s+Am[eé]rico\s+Vespucio\s+1106/i, que: 'dirección mal formada: 1106 es la oficina, no la calle' },
  { re: /Lunes a viernes\s*·?\s*09:00/i, que: 'horario de relleno del design system' },
];

function* htmls(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) yield* htmls(p);
    else if (e.endsWith('.html')) yield p;
  }
}

const kb = (n) => (n / 1024).toFixed(1);

/** Suma, en bytes comprimidos, todos los módulos que la página termina bajando. */
function pesoJsTransitivo(html) {
  const RE_RUTA = /\/_astro\/[A-Za-z0-9._-]+\.js/g;
  const RE_IMPORT = /["'](\.\/[A-Za-z0-9._-]+\.js)["']/g;

  const pendientes = [...html.matchAll(RE_RUTA)].map((m) => m[0]);
  const vistos = new Set();
  let total = 0;

  while (pendientes.length) {
    const ruta = pendientes.pop();
    if (!ruta || vistos.has(ruta)) continue;
    vistos.add(ruta);

    let contenido;
    try {
      contenido = readFileSync(join(DIST, ruta));
    } catch {
      continue; // fragmento del servidor, no del cliente
    }
    total += gzipSync(contenido).length;

    for (const m of contenido.toString().matchAll(RE_IMPORT)) {
      if (m[1]) pendientes.push('/_astro/' + m[1].slice(2));
    }
  }
  return total;
}

let fallas = 0;
const filas = [];

for (const archivo of [...htmls(DIST)].sort()) {
  const html = readFileSync(archivo, 'utf8');
  const ruta = '/' + relative(DIST, archivo).replace(/\\/g, '/').replace(/index\.html$/, '');

  /* JavaScript que la página termina bajando.

     Hay que seguirlo de forma transitiva. Una isla de Astro no aparece como
     <script src>: se declara con `component-url` y `renderer-url` dentro de un
     <astro-island>, y ese componente importa a su vez el runtime de React.
     Contar solo las etiquetas <script src> reporta 1 KB en una página que en
     realidad baja 60, que es exactamente el error que este presupuesto existe
     para evitar. */
  const js = pesoJsTransitivo(html);

  const htmlKB = Buffer.byteLength(html) / 1024;
  const jsKB = js / 1024;

  const problemas = [];
  if (jsKB > LIMITES.jsInicialKB) problemas.push(`JS ${kb(js)}KB > ${LIMITES.jsInicialKB}KB`);
  if (htmlKB > LIMITES.htmlKB) problemas.push(`HTML ${htmlKB.toFixed(1)}KB > ${LIMITES.htmlKB}KB`);

  // Solo el cuerpo visible: el JSON-LD y los comentarios no cuentan.
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  for (const p of PROHIBIDOS) {
    if (p.re.test(visible)) problemas.push(p.que);
  }

  if (problemas.length) fallas++;
  filas.push({ ruta, htmlKB: htmlKB.toFixed(1), jsKB: jsKB.toFixed(1), problemas });
}

const anchoRuta = Math.max(...filas.map((f) => f.ruta.length), 6);
console.log('');
console.log(
  '  ' + 'RUTA'.padEnd(anchoRuta) + '   HTML      JS(gz)   ESTADO',
);
console.log('  ' + '─'.repeat(anchoRuta + 30));
for (const f of filas) {
  const estado = f.problemas.length ? 'X  ' + f.problemas.join(' · ') : 'ok';
  console.log(
    '  ' +
      f.ruta.padEnd(anchoRuta) +
      '  ' +
      (f.htmlKB + 'KB').padStart(7) +
      '  ' +
      (f.jsKB + 'KB').padStart(7) +
      '   ' +
      estado,
  );
}

console.log('');
if (fallas === 0) {
  console.log(
    `  ${filas.length} páginas dentro del presupuesto (JS < ${LIMITES.jsInicialKB}KB, HTML < ${LIMITES.htmlKB}KB) y sin datos de relleno.`,
  );
} else {
  console.error(`  ${fallas} página(s) fuera de presupuesto o con datos de relleno.`);
}
console.log('');
process.exit(fallas === 0 ? 0 : 1);
