import type { Ajustes } from './contenido';
import type { Miga } from './rutas';

/* Datos estructurados. Todo sale del contenido real: si un dato no existe, la
   propiedad no se emite. Un JSON-LD con datos inventados es peor que ninguno. */

type Pais = {
  direccion: {
    edificio: string;
    calle: string;
    oficina: string;
    comuna: string;
    ciudad: string;
    referencia?: string | undefined;
  };
  horarios: { dia: string; desde: string; hasta: string }[];
  telefono: string | null;
};

const DIA_SCHEMA: Record<string, string> = {
  Lunes: 'Monday',
  Martes: 'Tuesday',
  Miércoles: 'Wednesday',
  Jueves: 'Thursday',
  Viernes: 'Friday',
  Sábado: 'Saturday',
  Domingo: 'Sunday',
};

const sinVacios = <T extends Record<string, unknown>>(o: T): T =>
  Object.fromEntries(
    Object.entries(o).filter(([, v]) => v !== null && v !== undefined && v !== ''),
  ) as T;

export function clinicaJsonLd(ajustes: Ajustes, pais: Pais, sitio: string) {
  const d = pais.direccion;
  return sinVacios({
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${sitio}#clinica`,
    name: ajustes.nombre,
    legalName: ajustes.razonSocial,
    url: sitio,
    description: ajustes.tagline,
    medicalSpecialty: 'Hematologic',
    priceRange: '$$',
    currenciesAccepted: 'CLP',
    telephone: ajustes.telefono,
    email: ajustes.correoAgenda,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${d.calle}, ${d.oficina}, ${d.edificio}`,
      addressLocality: d.comuna,
      addressRegion: 'Región Metropolitana',
      addressCountry: 'CL',
    },
    openingHoursSpecification: pais.horarios.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DIA_SCHEMA[h.dia] ?? h.dia,
      opens: h.desde,
      closes: h.hasta,
    })),
    availableService: {
      '@type': 'MedicalProcedure',
      name: 'Consulta de hematología',
    },
  });
}

export function medicoJsonLd(
  p: {
    nombreCompleto: string;
    especialidad: string;
    bio: string;
    foto: string | null;
    formacion: { titulo: string; institucion: string }[];
  },
  url: string,
  sitio: string,
) {
  return sinVacios({
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${url}#medico`,
    name: p.nombreCompleto,
    medicalSpecialty: 'Hematologic',
    description: p.bio,
    url,
    image: p.foto,
    worksFor: { '@id': `${sitio}#clinica` },
    alumniOf: p.formacion.length
      ? p.formacion.map((f) => ({ '@type': 'EducationalOrganization', name: f.institucion }))
      : undefined,
  });
}

export function faqJsonLd(items: { pregunta: string; respuestaCorta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: i.respuestaCorta.trim() },
    })),
  };
}

export function migasJsonLd(items: Miga[], sitio: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((m, i) =>
      sinVacios({
        '@type': 'ListItem',
        position: i + 1,
        name: m.label,
        item: m.href ? new URL(m.href, sitio).toString() : undefined,
      }),
    ),
  };
}

export function paginaMedicaJsonLd(opts: {
  titulo: string;
  descripcion: string;
  url: string;
  autor: string | null;
  fechaPublicacion: Date;
  fechaRevision: Date | null;
  sitio: string;
}) {
  return sinVacios({
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: opts.titulo,
    description: opts.descripcion,
    url: opts.url,
    inLanguage: 'es-CL',
    datePublished: opts.fechaPublicacion.toISOString().slice(0, 10),
    lastReviewed: opts.fechaRevision?.toISOString().slice(0, 10),
    reviewedBy: opts.autor
      ? { '@type': 'Physician', name: opts.autor, '@id': `${opts.sitio}equipo/#medico` }
      : undefined,
    publisher: { '@id': `${opts.sitio}#clinica` },
  });
}
