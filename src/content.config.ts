import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/* ---------------------------------------------------------------------------
   Modelo de contenido de Clínica Conecta.

   Dos reglas del brief están codificadas acá a propósito, para que sean
   imposibles de saltar desde el CMS y no dependan de que alguien recuerde
   una convención:

   1. `services.aporteHematologia` es obligatorio y con largo mínimo. Ninguna
      prestación puede publicarse como especialidad suelta.
   2. `faqs.revisado` nace en false. El sitio de producción no muestra una
      respuesta clínica sin la firma del médico.

   Nada se borra: todo lleva `activo`. Los datos que aún no entrega el cliente
   son `.nullable()`, y `null` significa "no renderizar", nunca un placeholder.
--------------------------------------------------------------------------- */

const pendiente = () => z.string().nullable().default(null);

const seo = z
  .object({
    title: z.string().max(60, 'El title no puede pasar de 60 caracteres').optional(),
    description: z
      .string()
      .max(155, 'La meta descripción no puede pasar de 155 caracteres')
      .optional(),
  })
  .optional();

const modalidades = z.array(z.enum(['presencial', 'telemedicina'])).default(['presencial']);

/* --------------------------------- países -------------------------------- */

const countries = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/countries' }),
  schema: z.object({
    nombre: z.string(),
    codigo: z.enum(['cl', 've', 'es']),
    moneda: z.string(),
    locale: z.string(),
    activo: z.boolean().default(false),
    telefono: pendiente(),
    whatsapp: pendiente(),
    direccion: z.object({
      edificio: z.string(),
      calle: z.string(),
      oficina: z.string(),
      comuna: z.string(),
      ciudad: z.string(),
      referencia: z.string().optional(),
    }),
    horarios: z
      .array(z.object({ dia: z.string(), desde: z.string(), hasta: z.string() }))
      .default([]),
    notaLegal: z.string().optional(),
    medioPago: z.array(z.string()).default([]),
  }),
});

/* -------------------------------- unidades ------------------------------- */

const units = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/units' }),
  schema: z.object({
    nombre: z.string(),
    slug: z.string(),
    resumen: z.string(),
    activo: z.boolean().default(false),
    orden: z.number().default(0),
    paises: z.array(reference('countries')).default([]),
    hero: z.object({
      titulo: z.string(),
      bajada: z.string(),
      imagen: z.string().nullable().default(null),
    }),
    condiciones: z.array(z.string()).default([]),
    seo,
  }),
});

/* ------------------------------ prestaciones ----------------------------- */

const services = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/services' }),
  schema: z.object({
    nombre: z.string(),
    // El H1 no es el nombre de la especialidad, es su función dentro del
    // estudio hematológico. Ver docs/00-plan.md §5, punto 2.
    titulo: z.string(),
    slug: z.string(),
    unidad: reference('units'),
    resumen: z.string(),
    aporteHematologia: z
      .string()
      .min(
        120,
        'Obligatorio: explica cómo esta prestación aporta a la evaluación, tratamiento o seguimiento del paciente hematológico. Sin esto la prestación quedaría presentada como especialidad suelta, que es justamente lo que el proyecto no hace.',
      ),
    queIncluye: z.array(z.string()).default([]),
    queEsperar: z.array(z.string()).default([]),
    modalidades,
    paises: z.array(reference('countries')).default([]),
    profesionales: z.array(reference('professionals')).default([]),
    preguntasRelacionadas: z.array(reference('faqs')).default([]),
    // "axis" es hematología, el eje. "orbit" son las tres que giran alrededor.
    // Es la misma distinción que trae ServiceCard en el design system.
    nivel: z.enum(['axis', 'orbit']).default('orbit'),
    activo: z.boolean().default(false),
    orden: z.number().default(0),
    icono: z.string().default('stethoscope'),
    seo,
  }),
});

/* ------------------------------ profesionales ---------------------------- */

const professionals = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/professionals' }),
  /* `image()` en vez de una ruta de texto: así el retrato entra al pipeline de
     Astro —AVIF y WebP en varios anchos, con sus dimensiones— en vez de servirse
     crudo desde /public. Importa porque la misma foto se usa a 320 px en
     Conócenos y a 88 px en la tarjeta: el original pesa 173 KB y mandarlo entero
     a un avatar de 88 px es justo lo que audita docs/imagenes.md. El archivo va
     al lado del .mdx y se referencia con ruta relativa. */
  schema: ({ image }) =>
    z.object({
      nombreCompleto: z.string(),
      slug: z.string(),
      // Sin foto real no se inventa una: la tarjeta cae al monograma.
      foto: image().nullable().default(null),
      /* Recorte cuadrado de busto, para el avatar de 88 px de la tarjeta.

         No es duplicar por duplicar. El retrato del Dr. Flores es de cuerpo
         sentado: midiendo la silueta, la cara queda al 19 % del alto. Metido en
         un círculo de 88 px con object-fit:cover, el encuadre no puede acercarse
         —cover encuadra, no amplía— y la cabeza saldría de unos 20 px. Con el
         recorte, la cara queda al 40 % del cuadro y se reconoce.

         Si falta, la tarjeta usa `foto`; si tampoco hay, el monograma. */
      avatar: image().nullable().default(null),
      especialidad: z.string(),
      subespecialidad: pendiente(),
      /* La institución es opcional a propósito. El cliente puede entregar un
         título sin decir dónde lo cursó, y la plantilla de Conócenos ya lo
         contemplaba —`{f.institucion && ...}`— mientras el esquema lo exigía:
         era imposible cargar un posgrado sin inventarle una universidad. */
      formacion: z
        .array(z.object({ titulo: z.string(), institucion: pendiente(), anio: pendiente() }))
        .default([]),
      experiencia: z.array(z.string()).default([]),
      areasAtencion: z.array(z.string()).default([]),
      instituciones: z.array(z.string()).default([]),
      // Permite al paciente verificar al médico en el registro público.
      registroSuperintendencia: pendiente(),
      paises: z.array(reference('countries')).default([]),
      servicios: z.array(reference('services')).default([]),
      modalidades,
      bio: z.string(),
      activo: z.boolean().default(false),
      orden: z.number().default(0),
    }),
});

/* -------------------------------- recursos ------------------------------- */

const categories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/categories' }),
  schema: z.object({
    nombre: z.string(),
    slug: z.string(),
    descripcion: z.string(),
    orden: z.number().default(0),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/resources' }),
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    tipo: z.enum(['video', 'articulo', 'guia', 'preparacion']),
    categoria: reference('categories'),
    urlYoutube: z.string().url().nullable().default(null),
    portada: z.string().nullable().default(null),
    duracion: pendiente(),
    descripcion: z.string(),
    keyword: z.string().optional(),
    servicios: z.array(reference('services')).default([]),
    revisadoPor: reference('professionals'),
    revisado: z.boolean().default(false),
    fechaPublicacion: z.coerce.date(),
    fechaRevision: z.coerce.date().nullable().default(null),
    activo: z.boolean().default(false),
    orden: z.number().default(0),
    seo,
  }),
});

/* ------------------------------ preguntas -------------------------------- */

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/faqs' }),
  schema: z.object({
    pregunta: z.string(),
    slug: z.string(),
    // Respuesta corta para AI Overview y People Also Ask: en los SERP de Chile
    // esas dos posiciones van antes del primer resultado orgánico.
    respuestaCorta: z
      .string()
      .min(80, 'Muy corta para responder de verdad')
      .max(420, 'La respuesta corta debe caber en 40–60 palabras'),
    cuandoConsultar: z.string().nullable().default(null),
    categoria: z.enum(['clinica', 'operativa']),
    servicios: z.array(reference('services')).default([]),
    // Las preguntas clínicas no se publican sin visto bueno del médico.
    revisado: z.boolean().default(false),
    revisadoPor: reference('professionals').optional(),
    fechaRevision: z.coerce.date().nullable().default(null),
    destacada: z.boolean().default(false),
    orden: z.number().default(0),
    activo: z.boolean().default(true),
  }),
});

/* --------------------------------- legales ------------------------------- */

const legal = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/legal' }),
  schema: z.object({
    titulo: z.string(),
    slug: z.string(),
    vigenteDesde: z.coerce.date(),
    // Los tres textos son borrador hasta que un abogado los revise.
    revisadoPorAbogado: z.boolean().default(false),
    seo,
  }),
});

/* ------------------------------- ajustes --------------------------------- */

const settings = defineCollection({
  loader: file('./src/content/settings/site.json'),
  schema: z.object({
    nombre: z.string(),
    razonSocial: z.string(),
    tagline: z.string(),
    correoAgenda: z.string().email(),
    correoContacto: z.string().email().nullable().default(null),
    telefono: pendiente(),
    whatsapp: pendiente(),
    redes: z.array(z.object({ red: z.string(), url: z.string().url() })).default([]),
    precioConsulta: z.number(),
    precioNota: z.string(),
    avisoUrgencias: z.object({
      titulo: z.string(),
      cuerpo: z.string(),
      telefono: z.string(),
    }),
    // Etapa 1: formulario propio. Etapa 2: se cambia `modo` a "iframe" y se
    // pega el enlace de Medinet. Ningún otro archivo del sitio cambia.
    agendamiento: z
      .object({
        modo: z.enum(['formulario', 'iframe']).default('formulario'),
        src: z.string().url().nullable().default(null),
        altura: z.number().default(900),
        proveedor: z.string().nullable().default(null),
        politicaPrivacidadProveedor: z.string().url().nullable().default(null),
      })
      .refine((a) => a.modo !== 'iframe' || Boolean(a.src), {
        message: 'Si el modo es "iframe" hay que indicar el enlace de la agenda.',
        path: ['src'],
      }),
    estadoApertura: z.object({
      estado: z.enum(['pre-apertura', 'abierto']),
      fecha: z.coerce.date().nullable().default(null),
      // Se muestra solo si hay algo real que decir.
      mensaje: z.string().nullable().default(null),
    }),
    compromisos: z.array(z.string()).default([]),
  }),
});

export const collections = {
  countries,
  units,
  services,
  professionals,
  categories,
  resources,
  faqs,
  legal,
  settings,
};
