import type { ImageMetadata } from 'astro';

/* --------------------------- escenas clínicas --------------------------- */
import cHero from '../assets/imagenes/c-hero.jpg';
import cConsulta from '../assets/imagenes/c-consulta.jpg';
import cHemograma from '../assets/imagenes/c-hemograma.jpg';
import cMicroscopio from '../assets/imagenes/c-microscopio.jpg';
import cGastro from '../assets/imagenes/c-gastro.jpg';
import cNutricion from '../assets/imagenes/c-nutricion.jpg';
import cImagenes from '../assets/imagenes/c-imagenes.jpg';
import cTelemedicina from '../assets/imagenes/c-telemedicina.jpg';

/* ------------------------- contexto y ambiente -------------------------- */
import edificioNunoa from '../assets/imagenes/edificio-nunoa.jpg';
import calleNunoa from '../assets/imagenes/calle-nunoa.jpg';
import mesaLectura from '../assets/imagenes/mesa-lectura.jpg';
import escritorio from '../assets/imagenes/escritorio.jpg';
import examenesPrevios from '../assets/imagenes/examenes-previos.jpg';
import guiasImpresas from '../assets/imagenes/guias-impresas.jpg';
import relojPared from '../assets/imagenes/reloj-pared.jpg';
import heroAncho from '../assets/imagenes/hero-ancho.jpg';

/* Registro único de imágenes.

   Las colecciones de contenido guardan rutas como texto, y Astro necesita el
   import estático para optimizar la imagen en el build. Este archivo es el
   puente: el contenido dice "hematologia" y acá está su fotografía.

   Cada entrada lleva su texto alternativo. El `alt` no se escribe en la página
   que la usa: se escribe una vez, junto a la imagen, y así no se contradice
   entre páginas ni se olvida.

   REGLA DE LAS PERSONAS (decidida con el cliente el 2026-08-29):
   sí hay personas, pero siempre anónimas — de espaldas, solo manos, o fuera de
   foco. Ninguna cara identificable, ningún pie de foto que las presente como el
   Dr. Flores o como pacientes de la clínica. El retrato del médico sigue siendo
   el suyo real, y hasta que llegue no se reemplaza por nada.
   Ver `docs/imagenes.md`. */

export interface Foto {
  src: ImageMetadata;
  alt: string;
}

const f = (src: ImageMetadata, alt: string): Foto => ({ src, alt });

/** Fotografía de cada prestación, por slug. */
/* Sin `Record<string, Foto>`: con `noUncheckedIndexedAccess` eso vuelve
   opcional cada acceso, aunque las claves sean fijas. `satisfies` conserva la
   comprobación de que cada valor es una Foto y además deja que TypeScript sepa
   exactamente qué claves existen. */
export const FOTO_PRESTACION = {
  hematologia: f(
    cHemograma,
    'Alguien sostiene un informe de laboratorio impreso a contraluz, marcando una línea con un lápiz.',
  ),
  gastroenterologia: f(
    cGastro,
    'Sala de procedimientos vacía y ordenada, con una camilla cubierta de papel limpio y luz natural.',
  ),
  'nutricion-y-dietetica': f(
    cNutricion,
    'Unas manos sirven lentejas cocidas en un bol junto a otro con hojas de espinaca, en una cocina con luz de ventana.',
  ),
  'interpretacion-de-imagenes': f(
    cImagenes,
    'Una persona de espaldas revisa un estudio de imágenes en un monitor, en una sala en penumbra.',
  ),
} satisfies Record<string, Foto>;

/* Los slugs vienen de la colección de contenido, así que son `string` y no las
   claves literales de arriba. Esta función es el único punto donde se ensancha
   el tipo, y devuelve `undefined` explícito para una prestación sin fotografía
   en vez de dejar que el acceso mienta. */
export function fotoDePrestacion(slug: string): Foto | undefined {
  return (FOTO_PRESTACION as Record<string, Foto>)[slug];
}

/** Fotografía de cabecera de cada página. */
export const FOTO_PAGINA = {
  inicio: f(
    cHero,
    'Consulta médica vista desde atrás: sobre el escritorio, un informe de laboratorio y una mano señalando una línea, con luz de tarde entrando por la ventana.',
  ),
  unidad: f(
    cConsulta,
    'Box de consulta vacío y luminoso, con un escritorio, dos sillas y una camilla cubierta de papel limpio.',
  ),
  prestaciones: f(
    cMicroscopio,
    'Unas manos ajustan el foco de un microscopio de laboratorio sobre un mesón blanco.',
  ),
  conocenos: f(
    edificioNunoa,
    'Edificio de oficinas de fachada clara en Ñuñoa a la hora dorada, con árboles al frente y la cordillera detrás.',
  ),
  preguntas: f(
    mesaLectura,
    'Mesa larga de madera clara junto a una ventana, con un vaso de agua y un cuaderno cerrado.',
  ),
  precios: f(
    escritorio,
    'Mesa de madera junto a una ventana, con un cuaderno cerrado, un lápiz y un vaso de agua.',
  ),
  telemedicina: f(
    cTelemedicina,
    'Una persona de espaldas en su casa, frente a un notebook en videollamada, con un informe de laboratorio sobre la mesa.',
  ),
  pacientes: f(
    guiasImpresas,
    'Pila de cuadernillos impresos de portada lisa sobre una superficie de madera clara.',
  ),
  agendar: f(
    relojPared,
    'Reloj de pared blanco y minimalista sobre un muro liso, con una sombra diagonal de la tarde.',
  ),
  contacto: f(
    calleNunoa,
    'Avenida residencial de Ñuñoa con plátanos orientales y la cordillera al fondo.',
  ),
  historia: f(
    examenesPrevios,
    'Pila de hojas impresas y algunas páginas antiguas amarillentas sobre una mesa, bajo luz de ventana.',
  ),
  espacio: f(
    heroAncho,
    'Sala amplia y vacía de un edificio de oficinas en Santiago, con ventanales de piso a techo y la ciudad al fondo.',
  ),
} as const;
