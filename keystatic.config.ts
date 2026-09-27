import { config, fields, collection, singleton } from '@keystatic/core';

/* CMS de Clínica Conecta.

   Está escrito en español y con textos de ayuda en cada campo, porque quien lo
   va a usar es un médico, no un desarrollador.

   ALMACENAMIENTO. Hasta el 2026-09-21 era `local`: el CMS sólo funcionaba en
   el computador de un desarrollador corriendo `npm run dev`, así que el
   cliente no podía entrar desde su navegador.

   En producción es `cloud` (Keystatic Cloud), y no `github`, por una razón
   práctica: en modo `github` cada persona que edita necesita su propia cuenta
   de GitHub con permiso de escritura en el repo, y eso es mucho pedirle a un
   médico que sólo quiere corregir una frase. Con Keystatic Cloud entra con
   correo y contraseña, y Keystatic hace el commit en GitHub por él.

   El contenido sigue viviendo en el repo, no en Keystatic: Cloud sólo pone el
   inicio de sesión y hace de intermediario con GitHub. Cada guardado es un
   commit en `main`, Cloudflare lo publica solo, y si algún día se deja Cloud,
   volver a `github` es cambiar este bloque. Nada se pierde.

   En desarrollo queda en `local`: se edita directo en los archivos, sin
   iniciar sesión. Paso a paso y cuentas en docs/cms-produccion.md. */

const ayudaActivo =
  'Desactiva en vez de borrar. El contenido desaparece del sitio pero queda guardado y se puede volver a publicar.';

export default config({
  storage: import.meta.env.PROD ? { kind: 'cloud' } : { kind: 'local' },
  cloud: { project: 'conectamedica/conecta-medica' },

  ui: {
    brand: { name: 'Clínica Conecta' },
    navigation: {
      Contenido: ['portada', 'services', 'units', 'faqs'],
      'Personas y recursos': ['professionals', 'resources', 'categories'],
      Configuración: ['ajustes', 'chile'],
      Legales: ['legal'],
    },
  },

  singletons: {
    /* PORTADA. Hasta el 2026-09-21 todo este texto estaba escrito dentro de
       src/pages/index.astro y sólo se podía cambiar tocando código.

       Los textos aceptan MARCADORES entre llaves, que se rellenan solos con los
       datos reales al publicar: {precio}, {notaPrecio}, {comuna}, {ciudad},
       {referencia}, {preguntas}, {sabado}, {nombre}, {razonSocial}. Así, si el
       precio cambia en "Datos de la clínica", la portada no queda mintiendo.
       Un marcador mal escrito no se imprime en crudo: desaparece. */
    portada: singleton({
      label: 'Portada del sitio',
      path: 'src/content/settings/portada',
      format: { data: 'json' },
      schema: {
        hero: fields.array(
          fields.object({
            eyebrow: fields.text({ label: 'Línea superior' }),
            titulo: fields.text({ label: 'Titular', multiline: true }),
            tituloSinSabado: fields.text({
              label: 'Titular alternativo',
              multiline: true,
              description:
                'Sólo lo usa el cuadro que anuncia el sábado. Se muestra si en "Dirección y horarios" no hay atención de sábado cargada. Déjalo vacío en los demás cuadros.',
            }),
            texto: fields.text({ label: 'Texto', multiline: true }),
            botonLabel: fields.text({
              label: 'Texto del segundo botón',
              description: 'El primer botón siempre es "Agendar hora" y no se cambia desde acá.',
            }),
            botonDestino: fields.select({
              label: 'A dónde lleva el segundo botón',
              options: [
                { label: 'Agendar hora', value: 'agendar' },
                { label: 'Telemedicina', value: 'telemedicina' },
                { label: 'Precios', value: 'precios' },
                { label: 'Preguntas frecuentes', value: 'preguntas' },
                { label: 'Qué llevar a la consulta', value: 'que-llevar' },
                { label: 'Contacto', value: 'contacto' },
                { label: 'Conócenos', value: 'conocenos' },
                { label: 'Conecta Hematología', value: 'unidad' },
                { label: 'Prestaciones', value: 'prestaciones' },
                { label: 'Información para pacientes', value: 'pacientes' },
              ],
              defaultValue: 'agendar',
            }),
            imagen: fields.image({
              label: 'Fotografía de fondo',
              directory: 'src/content/settings',
              publicPath: './',
              description:
                'Opcional. Si la dejas vacía se mantiene la fotografía que este cuadro tiene hoy. Va a pantalla completa detrás del texto, así que conviene una imagen horizontal y de al menos 1600 px de ancho. Regla del proyecto: si hay personas, van anónimas.',
            }),
            imagenAlt: fields.text({
              label: 'Descripción de la fotografía',
              multiline: true,
              description: 'Obligatoria si subiste una foto. Describe lo que se ve.',
            }),
          }),
          {
            label: 'Cuadros de portada',
            description:
              'Los cuadros que se van alternando arriba de todo. El primero es el que ve Google como título principal de la página.',
            itemLabel: (p) => p.fields.titulo.value || p.fields.eyebrow.value,
          },
        ),
        accesosTitulo: fields.text({ label: 'Título de la grilla de accesos' }),
        accesosApunte: fields.text({ label: 'Apunte bajo el título', multiline: true }),
        accesos: fields.array(
          fields.object({
            icono: fields.text({
              label: 'Ícono',
              description:
                'Nombre del ícono: calendar, video, file-text, info, map-pin, message-circle, stethoscope, check, arrow-right.',
            }),
            titulo: fields.text({ label: 'Título' }),
            texto: fields.text({ label: 'Texto', multiline: true }),
            destino: fields.select({
              label: 'A dónde lleva',
              options: [
                { label: 'Agendar hora', value: 'agendar' },
                { label: 'Telemedicina', value: 'telemedicina' },
                { label: 'Precios', value: 'precios' },
                { label: 'Preguntas frecuentes', value: 'preguntas' },
                { label: 'Qué llevar a la consulta', value: 'que-llevar' },
                { label: 'Contacto', value: 'contacto' },
                { label: 'Conócenos', value: 'conocenos' },
                { label: 'Conecta Hematología', value: 'unidad' },
                { label: 'Prestaciones', value: 'prestaciones' },
                { label: 'Información para pacientes', value: 'pacientes' },
              ],
              defaultValue: 'agendar',
            }),
          }),
          {
            label: '¿Qué necesitas hacer?',
            description: 'La grilla de accesos. Seis es lo que el diseño contempla.',
            itemLabel: (p) => p.fields.titulo.value,
          },
        ),
        unidad: fields.object(
          {
            eyebrow: fields.text({ label: 'Línea superior' }),
            titulo: fields.text({ label: 'Título', multiline: true }),
            parrafos: fields.array(fields.text({ label: 'Párrafo', multiline: true }), {
              label: 'Párrafos',
              itemLabel: (p) => (p.value ?? '').slice(0, 60),
            }),
          },
          { label: 'Sección Conecta Hematología' },
        ),
        telemedicina: fields.object(
          {
            eyebrow: fields.text({ label: 'Línea superior' }),
            titulo: fields.text({ label: 'Título', multiline: true }),
            texto: fields.text({ label: 'Texto', multiline: true }),
            puntos: fields.array(fields.text({ label: 'Punto' }), {
              label: 'Qué se resuelve a distancia',
              description:
                'Tiene que decir lo mismo que la página de Telemedicina. Si acá se promete algo que allá se descarta, el sitio se contradice.',
              itemLabel: (p) => p.value ?? '',
            }),
          },
          { label: 'Sección Telemedicina' },
        ),
        material: fields.object(
          {
            eyebrow: fields.text({ label: 'Línea superior' }),
            titulo: fields.text({ label: 'Título', multiline: true }),
          },
          { label: 'Sección Información para pacientes' },
        ),
        conocenos: fields.object(
          {
            eyebrow: fields.text({ label: 'Línea superior' }),
            titulo: fields.text({ label: 'Título', multiline: true }),
            texto: fields.text({ label: 'Texto', multiline: true }),
            secuencia: fields.array(fields.text({ label: 'Paso' }), {
              label: 'Los pasos de la atención',
              itemLabel: (p) => p.value ?? '',
            }),
          },
          { label: 'Sección Conócenos' },
        ),
        preguntas: fields.object(
          {
            eyebrow: fields.text({ label: 'Línea superior' }),
            titulo: fields.text({ label: 'Título', multiline: true }),
          },
          { label: 'Sección Preguntas frecuentes' },
        ),
        cierre: fields.object(
          {
            titulo: fields.text({ label: 'Título', multiline: true }),
            bajada: fields.text({ label: 'Texto', multiline: true }),
          },
          { label: 'Bloque de cierre' },
        ),
      },
    }),

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
        /* Si no se sube nada, la prestación sigue usando la fotografía que ya
           tiene en src/lib/imagenes.ts. Subir acá reemplaza esa foto sin tocar
           código. Ver la nota de `services` en src/content.config.ts. */
        foto: fields.image({
          label: 'Fotografía de la prestación',
          directory: 'src/content/services',
          publicPath: './',
          description:
            'Opcional. Si la dejas vacía se mantiene la fotografía que la prestación tiene hoy. Regla del proyecto: si aparecen personas, van siempre anónimas —de espaldas, solo las manos o fuera de foco—, nunca una cara identificable.',
        }),
        fotoAlt: fields.text({
          label: 'Descripción de la fotografía',
          multiline: true,
          description:
            'Obligatoria si subiste una foto. Es lo que escucha quien usa lector de pantalla y lo que Google lee. Describe lo que se ve, no lo que significa: "Unas manos ajustan el foco de un microscopio", no "Atención de calidad".',
        }),
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
        /* Antes era un campo de texto donde había que escribir la ruta a mano:
           si el archivo no existía, simplemente no salía foto y nadie se
           enteraba. Ahora se sube desde el CMS. El archivo queda junto al .mdx
           y el valor guardado es "./nombre.webp", que es exactamente lo que el
           `image()` del esquema de Astro espera, así que el retrato entra al
           pipeline de optimización en vez de servirse crudo. */
        foto: fields.image({
          label: 'Retrato',
          directory: 'src/content/professionals',
          publicPath: './',
          description:
            'Déjala vacía si no hay retrato real: el sitio muestra un monograma con las iniciales. Nunca usamos foto de banco de imágenes. Sube el original, sin recortar ni comprimir: el sitio genera solo los tamaños que necesita.',
        }),
        avatar: fields.image({
          label: 'Recorte cuadrado de la cara',
          directory: 'src/content/professionals',
          publicPath: './',
          description:
            'Opcional. El mismo retrato recortado cuadrado, de los hombros hacia arriba, para el círculo pequeño de las tarjetas. Si no lo subes se usa el retrato completo, donde la cara puede salir muy chica.',
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
