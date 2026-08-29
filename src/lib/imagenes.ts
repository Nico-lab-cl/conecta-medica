import type { ImageMetadata } from 'astro';

/* --------------------------- escenas clínicas --------------------------- */
import cHero from '../assets/imagenes/c-hero.png';
import cConsulta from '../assets/imagenes/c-consulta.png';
import cHemograma from '../assets/imagenes/c-hemograma.png';
import cMicroscopio from '../assets/imagenes/c-microscopio.png';
import cGastro from '../assets/imagenes/c-gastro.png';
import cNutricion from '../assets/imagenes/c-nutricion.png';
import cImagenes from '../assets/imagenes/c-imagenes.png';
import cTelemedicina from '../assets/imagenes/c-telemedicina.png';

/* ------------------------- contexto y ambiente -------------------------- */
import edificioNunoa from '../assets/imagenes/edificio-nunoa.png';
import calleNunoa from '../assets/imagenes/calle-nunoa.png';
import mesaLectura from '../assets/imagenes/mesa-lectura.png';
import escritorio from '../assets/imagenes/escritorio.png';
import examenesPrevios from '../assets/imagenes/examenes-previos.png';
import guiasImpresas from '../assets/imagenes/guias-impresas.png';
import relojPared from '../assets/imagenes/reloj-pared.png';
import heroAncho from '../assets/imagenes/hero-ancho.png';

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
export const FOTO_PRESTACION: Record<string, Foto> = {
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
};

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
