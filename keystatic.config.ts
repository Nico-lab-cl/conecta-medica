import { config, fields, collection, singleton } from '@keystatic/core';

/* CMS de Clínica Conecta.

   Está escrito en español y con textos de ayuda en cada campo, porque quien lo
   va a usar es un médico, no un desarrollador.

   Almacenamiento: hoy `local` (edita los archivos del repo directamente al
   correr `npm run dev`). Para producción se cambia a:

     storage: { kind: 'github', repo: { owner: 'ORG', name: 'REPO' } }

   Eso es lo único que hay que cambiar cuando exista el repositorio.
   Ver docs/preguntas-carlos.md, punto A-3. */

const ayudaActivo =
  'Desactiva en vez de borrar. El contenido desaparece del sitio pero queda guardado y se puede volver a publicar.';

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'Clínica Conecta' },
    navigation: {
      Contenido: ['services', 'units', 'faqs'],
      'Personas y recursos': ['professionals', 'resources', 'categories'],
      Configuración: ['ajustes', 'chile'],
      Legales: ['legal'],
    },
  },

  singletons: {
    ajustes: singleton({
      label: 'Datos de la clínica',
      path: 'src/content/settings/site',
      format: { data: 'json' },
      schema: {
        nombre: fields.text({ label: 'Nombre público' }),
        razonSocial: fields.text({ label: 'Razón social' }),
        tagline: fields.text({ label: 'Eslogan', multiline: true }),
        correoAgenda: fields.text({
          label: 'Correo que recibe las solicitudes',
          description: 'Acá llegan todos los formularios del sitio.',
        }),
        correoContacto: fields.text({ label: 'Correo alternativo (opcional)' }),
        telefono: fields.text({
          label: 'Teléfono público',
          description: 'Déjalo vacío mientras no exista. Vacío = no se muestra en ninguna parte.',
        }),
        whatsapp: fields.text({
          label: 'WhatsApp',
          description:
            'Con código de país, por ejemplo 56912345678. Mientras esté vacío, los botones de WhatsApp NO aparecen en el sitio. Nunca ponemos un número de ejemplo.',
        }),
        precioConsulta: fields.number({ label: 'Valor de la consulta (pesos, sin puntos)' }),
        precioNota: fields.text({ label: 'Nota sobre previsión', multiline: true }),
        compromisos: fields.array(fields.text({ label: 'Compromiso' }), {
          label: 'Compromisos con el paciente',
          itemLabel: (p) => p.value ?? '',
        }),
        avisoUrgencias: fields.object(
          {
            titulo: fields.text({ label: 'Título' }),
            cuerpo: fields.text({ label: 'Texto', multiline: true }),
            telefono: fields.text({ label: 'Teléfono de urgencia' }),
          },
          { label: 'Aviso de urgencias' },
        ),
        agendamiento: fields.object(
          {
            modo: fields.select({
              label: 'Cómo se agenda hoy',
              options: [
                { label: 'Formulario propio (etapa 1)', value: 'formulario' },
                { label: 'Agenda en línea embebida (etapa 2)', value: 'iframe' },
              ],
              defaultValue: 'formulario',
            }),
            src: fields.text({
              label: 'Enlace de la agenda en línea',
              description: 'Solo se usa si arriba elegiste "Agenda en línea embebida".',
            }),
            altura: fields.number({ label: 'Alto de la agenda en píxeles', defaultValue: 900 }),
            proveedor: fields.text({ label: 'Nombre del proveedor (ej. Medinet)' }),
            politicaPrivacidadProveedor: fields.text({
              label: 'Enlace a la política de privacidad del proveedor',
              description:
                'Obligatorio si se usa la agenda embebida: el paciente entrega su RUT en la plataforma de ese proveedor.',
            }),
          },
          { label: 'Agendamiento' },
        ),
        estadoApertura: fields.object(
          {
            estado: fields.select({
              label: 'Estado',
              options: [
                { label: 'Aún no abrimos', value: 'pre-apertura' },
                { label: 'Atendiendo', value: 'abierto' },
              ],
              defaultValue: 'pre-apertura',
            }),
            fecha: fields.text({ label: 'Fecha de apertura (AAAA-MM-DD)' }),
            mensaje: fields.text({ label: 'Mensaje del chip', multiline: true }),
          },
          { label: 'Estado de apertura' },
        ),
        redes: fields.array(
          fields.object({
            red: fields.text({ label: 'Red' }),
            url: fields.url({ label: 'Enlace' }),
          }),
          { label: 'Redes sociales', itemLabel: (p) => p.fields.red.value },
        ),
      },
    }),

    chile: singleton({
      label: 'Dirección y horarios',
      path: 'src/content/countries/cl',
      format: { data: 'json' },
      schema: {
        nombre: fields.text({ label: 'País' }),
        codigo: fields.select({
          label: 'Código',
          options: [
            { label: 'Chile', value: 'cl' },
            { label: 'Venezuela', value: 've' },
            { label: 'España', value: 'es' },
          ],
          defaultValue: 'cl',
        }),
        moneda: fields.text({ label: 'Moneda' }),
        locale: fields.text({ label: 'Locale' }),
        activo: fields.checkbox({ label: 'Activo', defaultValue: true }),
        telefono: fields.text({ label: 'Teléfono' }),
        whatsapp: fields.text({ label: 'WhatsApp' }),
        direccion: fields.object(
          {
            edificio: fields.text({ label: 'Edificio' }),
            calle: fields.text({ label: 'Calle' }),
            oficina: fields.text({
              label: 'Oficina',
              description: 'Va separado de la calle a propósito: 1106 es la oficina, no el número de la calle.',
            }),
            comuna: fields.text({ label: 'Comuna' }),
            ciudad: fields.text({ label: 'Ciudad' }),
            referencia: fields.text({ label: 'Referencia (metro, hito cercano)' }),
          },
          { label: 'Dirección' },
        ),
        horarios: fields.array(
          fields.object({
            dia: fields.text({ label: 'Día' }),
            desde: fields.text({ label: 'Desde (HH:MM)' }),
            hasta: fields.text({ label: 'Hasta (HH:MM)' }),
          }),
          { label: 'Horarios de atención', itemLabel: (p) => p.fields.dia.value },
        ),
        notaLegal: fields.text({ label: 'Nota legal' }),
        medioPago: fields.array(fields.text({ label: 'Medio de pago' }), {
          label: 'Medios de pago',
          itemLabel: (p) => p.value ?? '',
        }),
      },
    }),
  },

  collections: {
    units: collection({
      label: 'Unidades',
      slugField: 'nombre',
      path: 'src/content/units/*',
      format: { contentField: 'cuerpo' },
      schema: {
        nombre: fields.slug({ name: { label: 'Nombre de la unidad' } }),
        slug: fields.text({ label: 'Slug (para la URL)' }),
        resumen: fields.text({ label: 'Resumen', multiline: true }),
        activo: fields.checkbox({ label: 'Publicada', description: ayudaActivo }),
        orden: fields.number({ label: 'Orden', defaultValue: 0 }),
        paises: fields.array(fields.text({ label: 'País' }), {
          label: 'Países',
          itemLabel: (p) => p.value ?? '',
        }),
        hero: fields.object(
          {
            titulo: fields.text({ label: 'Título del hero' }),
            bajada: fields.text({ label: 'Bajada', multiline: true }),
            imagen: fields.text({ label: 'Imagen (ruta)' }),
          },
          { label: 'Portada' },
        ),
        condiciones: fields.array(fields.text({ label: 'Condición' }), {
          label: 'Condiciones que atiende',
          description:
            'Listado de condiciones hematológicas. Mientras esté vacío, la sección no aparece en el sitio.',
          itemLabel: (p) => p.value ?? '',
        }),
        cuerpo: fields.mdx({ label: 'Contenido' }),
      },
    }),

    services: collection({
      label: 'Prestaciones',
      slugField: 'nombre',
      path: 'src/content/services/*',
      format: { contentField: 'cuerpo' },
      schema: {
        nombre: fields.slug({ name: { label: 'Nombre de la prestación' } }),
        titulo: fields.text({
          label: 'Título de la página (H1)',
          description:
            'No es el nombre de la especialidad, es su función dentro del estudio hematológico. Ej: "Gastroenterología: encontrar de dónde se pierde el hierro".',
        }),
        slug: fields.text({ label: 'Slug (para la URL)' }),
        unidad: fields.text({ label: 'Unidad a la que pertenece', defaultValue: 'conecta-hematologia' }),
        resumen: fields.text({ label: 'Resumen corto', multiline: true }),
        aporteHematologia: fields.text({
          label: 'Cómo aporta al paciente hematológico',
          multiline: true,
          description:
            'OBLIGATORIO, mínimo 120 caracteres. Explica cómo esta prestación aporta a la evaluación, el tratamiento o el seguimiento del paciente hematológico. Sin este texto el sitio no compila: es lo que impide que la prestación se lea como una especialidad suelta.',
          validation: { length: { min: 120 } },
        }),
        nivel: fields.select({
          label: 'Jerarquía',
          options: [
            { label: 'Eje (hematología)', value: 'axis' },
            { label: 'Orbita (aporta al eje)', value: 'orbit' },
          ],
          defaultValue: 'orbit',
        }),
        queIncluye: fields.array(fields.text({ label: 'Punto' }), {
          label: 'Qué incluye',
          itemLabel: (p) => p.value ?? '',
        }),
        queEsperar: fields.array(fields.text({ label: 'Punto' }), {
          label: 'Qué esperar en la consulta',
          itemLabel: (p) => p.value ?? '',
        }),
        modalidades: fields.multiselect({
          label: 'Modalidades',
          options: [
            { label: 'Presencial', value: 'presencial' },
            { label: 'Telemedicina', value: 'telemedicina' },
          ],
          defaultValue: ['presencial'],
        }),
        paises: fields.array(fields.text({ label: 'País' }), {
          label: 'Países',
          itemLabel: (p) => p.value ?? '',
        }),
        profesionales: fields.array(fields.text({ label: 'Profesional (slug)' }), {
          label: 'Profesionales de esta prestación',
          itemLabel: (p) => p.value ?? '',
        }),
        preguntasRelacionadas: fields.array(fields.text({ label: 'Pregunta (slug)' }), {
          label: 'Preguntas relacionadas',
          itemLabel: (p) => p.value ?? '',
        }),
        icono: fields.text({ label: 'Ícono', defaultValue: 'stethoscope' }),
        activo: fields.checkbox({ label: 'Publicada', description: ayudaActivo }),
        orden: fields.number({ label: 'Orden', defaultValue: 0 }),
        seo: fields.object(
          {
            title: fields.text({ label: 'Título para Google', validation: { length: { max: 60 } } }),
            description: fields.text({
              label: 'Descripción para Google',
              multiline: true,
              validation: { length: { max: 155 } },
            }),
          },
          { label: 'SEO' },
        ),
        cuerpo: fields.mdx({ label: 'Contenido adicional' }),
      },
    }),

    professionals: collection({
      label: 'Profesionales',
      slugField: 'nombreCompleto',
      path: 'src/content/professionals/*',
      format: { contentField: 'cuerpo' },
      schema: {
        nombreCompleto: fields.slug({ name: { label: 'Nombre completo' } }),
        slug: fields.text({ label: 'Slug (para la URL)' }),
        foto: fields.text({
          label: 'Foto (ruta)',
          description:
            'Déjala vacía si no hay retrato real. El sitio muestra un monograma. Nunca usamos foto de banco de imágenes.',
        }),
        especialidad: fields.text({ label: 'Especialidad' }),
        subespecialidad: fields.text({ label: 'Subespecialidad' }),
        formacion: fields.array(
          fields.object({
            titulo: fields.text({ label: 'Título' }),
            institucion: fields.text({ label: 'Institución' }),
            anio: fields.text({ label: 'Año' }),
          }),
          { label: 'Formación', itemLabel: (p) => p.fields.titulo.value },
        ),
        experiencia: fields.array(fields.text({ label: 'Punto' }), {
          label: 'Experiencia',
          itemLabel: (p) => p.value ?? '',
        }),
        areasAtencion: fields.array(fields.text({ label: 'Área' }), {
          label: 'Áreas de atención',
          itemLabel: (p) => p.value ?? '',
        }),
        instituciones: fields.array(fields.text({ label: 'Institución' }), {
          label: 'Instituciones',
          itemLabel: (p) => p.value ?? '',
        }),
        registroSuperintendencia: fields.text({
          label: 'N° de registro en la Superintendencia de Salud',
          description:
            'Permite que el paciente verifique al médico en el registro público. Muy recomendable para la confianza del sitio.',
        }),
        paises: fields.array(fields.text({ label: 'País' }), {
          label: 'Países',
          itemLabel: (p) => p.value ?? '',
        }),
        servicios: fields.array(fields.text({ label: 'Prestación (slug)' }), {
          label: 'Prestaciones en las que atiende',
          itemLabel: (p) => p.value ?? '',
        }),
        modalidades: fields.multiselect({
          label: 'Modalidades',
          options: [
            { label: 'Presencial', value: 'presencial' },
            { label: 'Telemedicina', value: 'telemedicina' },
          ],
          defaultValue: ['presencial'],
        }),
        bio: fields.text({ label: 'Biografía corta', multiline: true }),
        activo: fields.checkbox({ label: 'Publicado', description: ayudaActivo }),
        orden: fields.number({ label: 'Orden', defaultValue: 0 }),
        cuerpo: fields.mdx({ label: 'Perfil extendido' }),
      },
    }),

    faqs: collection({
      label: 'Preguntas frecuentes',
      slugField: 'pregunta',
      path: 'src/content/faqs/*',
      format: { contentField: 'cuerpo' },
      schema: {
        pregunta: fields.slug({ name: { label: 'Pregunta' } }),
        slug: fields.text({ label: 'Slug (para la URL)' }),
        respuestaCorta: fields.text({
          label: 'Respuesta corta',
          multiline: true,
          description:
            'Entre 40 y 60 palabras. Es lo que Google usa para el resumen automático y lo que se ve en el acordeón. Responde de frente, sin rodeos.',
          validation: { length: { min: 80, max: 420 } },
        }),
        cuandoConsultar: fields.text({
          label: 'Cuándo consultar',
          multiline: true,
          description: 'Señales concretas que justifican pedir hora.',
        }),
        categoria: fields.select({
          label: 'Tipo de pregunta',
          options: [
            { label: 'Clínica (requiere firma del médico)', value: 'clinica' },
            { label: 'Operativa', value: 'operativa' },
          ],
          defaultValue: 'operativa',
        }),
        servicios: fields.array(fields.text({ label: 'Prestación (slug)' }), {
          label: 'Prestaciones relacionadas',
          itemLabel: (p) => p.value ?? '',
        }),
        revisado: fields.checkbox({
          label: 'Revisada y aprobada por el médico',
          description:
            'Las preguntas clínicas NO se publican mientras esta casilla esté desmarcada. Es una protección deliberada.',
        }),
        revisadoPor: fields.text({ label: 'Revisada por (slug del profesional)' }),
        fechaRevision: fields.text({ label: 'Fecha de revisión (AAAA-MM-DD)' }),
        destacada: fields.checkbox({ label: 'Mostrar en la portada' }),
        orden: fields.number({ label: 'Orden', defaultValue: 0 }),
        activo: fields.checkbox({ label: 'Activa', defaultValue: true, description: ayudaActivo }),
        cuerpo: fields.mdx({ label: 'Respuesta completa' }),
      },
    }),

    resources: collection({
      label: 'Información para pacientes',
      slugField: 'titulo',
      path: 'src/content/resources/*',
      format: { contentField: 'cuerpo' },
      schema: {
        titulo: fields.slug({ name: { label: 'Título' } }),
        slug: fields.text({ label: 'Slug (para la URL)' }),
        tipo: fields.select({
          label: 'Tipo',
          options: [
            { label: 'Video', value: 'video' },
            { label: 'Artículo', value: 'articulo' },
            { label: 'Guía', value: 'guia' },
            { label: 'Preparación', value: 'preparacion' },
          ],
          defaultValue: 'articulo',
        }),
        categoria: fields.text({ label: 'Categoría (slug)' }),
        urlYoutube: fields.text({
          label: 'Enlace de YouTube',
          description: 'Pega el enlace completo del video. El video se carga solo cuando el visitante lo reproduce.',
        }),
        portada: fields.text({ label: 'Portada (ruta)' }),
        duracion: fields.text({ label: 'Duración (ej. 4 min)' }),
        descripcion: fields.text({ label: 'Descripción', multiline: true }),
        keyword: fields.text({ label: 'Palabra clave principal' }),
        servicios: fields.array(fields.text({ label: 'Prestación (slug)' }), {
          label: 'Prestaciones relacionadas',
          itemLabel: (p) => p.value ?? '',
        }),
        revisadoPor: fields.text({ label: 'Revisado por (slug del profesional)' }),
        revisado: fields.checkbox({ label: 'Revisado por el médico' }),
        fechaPublicacion: fields.text({ label: 'Fecha de publicación (AAAA-MM-DD)' }),
        fechaRevision: fields.text({ label: 'Fecha de última revisión (AAAA-MM-DD)' }),
        activo: fields.checkbox({ label: 'Publicado', description: ayudaActivo }),
        orden: fields.number({ label: 'Orden', defaultValue: 0 }),
        cuerpo: fields.mdx({ label: 'Contenido' }),
      },
    }),

    categories: collection({
      label: 'Categorías',
      slugField: 'nombre',
      path: 'src/content/categories/*',
      format: { data: 'json' },
      schema: {
        nombre: fields.slug({ name: { label: 'Nombre' } }),
        slug: fields.text({ label: 'Slug' }),
        descripcion: fields.text({ label: 'Descripción', multiline: true }),
        orden: fields.number({ label: 'Orden', defaultValue: 0 }),
      },
    }),

    legal: collection({
      label: 'Textos legales',
      slugField: 'titulo',
      path: 'src/content/legal/*',
      format: { contentField: 'cuerpo' },
      schema: {
        titulo: fields.slug({ name: { label: 'Título' } }),
        slug: fields.text({ label: 'Slug' }),
        vigenteDesde: fields.text({ label: 'Vigente desde (AAAA-MM-DD)' }),
        revisadoPorAbogado: fields.checkbox({
          label: 'Revisado por abogado',
          description: 'Mientras esté sin marcar, el sitio muestra el texto con una advertencia de borrador.',
        }),
        cuerpo: fields.mdx({ label: 'Texto' }),
      },
    }),
  },
});
