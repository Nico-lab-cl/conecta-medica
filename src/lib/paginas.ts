import { getEntry, type CollectionEntry, type CollectionKey } from 'astro:content';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { Foto } from './imagenes';

/* Páginas internas editables.

   Cada página interna lee su texto y su foto de cabecera de un archivo de
   src/content/paginas/, que el cliente edita desde el CMS en "Páginas". Este
   archivo es el puente: lee la entrada, decide qué foto va y arma la imagen
   para compartir.

   LA FOTO. Si el cliente subió una, manda esa. Si el campo está vacío, se usa
   la fotografía con la que el sitio se entregó (FOTO_PAGINA). Nunca queda una
   página sin foto por dejar el campo en blanco.

   EL ALT no se hereda: una foto nueva con la descripción de la anterior
   describiría algo que ya no está en pantalla. Sin descripción, va vacío.

   LA TARJETA PARA COMPARTIR (Open Graph). Las tarjetas de public/og/ se arman
   con scripts/og.mjs a partir de las fotos de fábrica. Si el cliente cambia la
   foto de una página, la tarjeta vieja seguiría mostrando la anterior cuando
   alguien comparta el enlace por WhatsApp. Por eso, con foto subida, la tarjeta
   pasa a ser esa misma foto recortada a 1200 × 630. */

type ColeccionPagina = Extract<CollectionKey, `pagina${string}`>;

export async function leerPagina<C extends ColeccionPagina>(
  coleccion: C,
  id: string,
): Promise<CollectionEntry<C>['data']> {
  const entrada = await getEntry(coleccion, id);
  if (!entrada) {
    throw new Error(
      `Falta src/content/paginas/${id}.json: es el texto de esa página y sin él no tiene qué mostrar.`,
    );
  }
  return entrada.data;
}

/** La foto que va: la subida por el cliente, o la de fábrica. */
export function fotoElegida(
  subida: { foto?: ImageMetadata | null; fotoAlt?: string | null },
  deFabrica: Foto,
): Foto {
  if (subida.foto) return { src: subida.foto, alt: subida.fotoAlt ?? '' };
  return deFabrica;
}

/** La imagen para compartir: la tarjeta de fábrica, o la foto subida recortada. */
export async function imagenParaCompartir(
  subida: { foto?: ImageMetadata | null },
  tarjetaDeFabrica: string,
): Promise<string> {
  if (!subida.foto) return tarjetaDeFabrica;
  const og = await getImage({ src: subida.foto, width: 1200, height: 630, fit: 'cover', format: 'jpg', quality: 80 });
  return og.src;
}

/** Las props de cabecera que toda página interna le pasa a <Pagina>. */
export async function propsCabecera(
  p: {
    seo: { titulo: string; descripcion: string };
    cabecera: { eyebrow: string; titulo: string; bajada: string; foto: ImageMetadata | null; fotoAlt: string | null };
  },
  deFabrica: { foto: Foto; og: string },
) {
  return {
    titulo: p.seo.titulo,
    descripcion: p.seo.descripcion,
    eyebrow: p.cabecera.eyebrow,
    h1: p.cabecera.titulo,
    bajada: p.cabecera.bajada,
    foto: fotoElegida(p.cabecera, deFabrica.foto),
    imagenOg: await imagenParaCompartir(p.cabecera, deFabrica.og),
  };
}
