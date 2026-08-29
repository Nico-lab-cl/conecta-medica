import type { APIRoute } from 'astro';

export const prerender = false;

/* Recepción del formulario de solicitud de hora.

   Corre como función de Cloudflare, en el mismo despliegue que el sitio. No hay
   base de datos: la solicitud se envía por correo y se acabó. Menos superficie,
   menos datos almacenados, menos exposición bajo la Ley 21.719.

   Tres filtros antes de enviar nada:
     1. Honeypot: si el campo invisible viene lleno, es un robot.
     2. Turnstile: verificación en el servidor, no solo el widget.
     3. Validación de los mismos campos que valida el navegador.

   Ningún campo de texto libre. Si llegara uno, no se reenvía. */

const MOTIVOS = new Set([
  'Hemograma alterado',
  'Anemia',
  'Plaquetas bajas o altas',
  'Control de tratamiento hematológico',
  'Interpretación de imágenes',
  'Otra derivación de mi médico',
]);

const MODALIDADES = new Set(['Presencial en Ñuñoa', 'Telemedicina']);

const limpiar = (v: FormDataEntryValue | null, max = 120): string =>
  String(v ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);

async function verificarTurnstile(token: string, secreto: string, ip: string | null) {
  const cuerpo = new FormData();
  cuerpo.append('secret', secreto);
  cuerpo.append('response', token);
  if (ip) cuerpo.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: cuerpo,
  });
  const j = (await r.json()) as { success?: boolean };
  return j.success === true;
}

/* Sin JavaScript el navegador envía el formulario y espera una página, no JSON.
   El destino sale de una lista cerrada: aceptar la ruta que venga en el
   formulario sería una redirección abierta. */
const RETORNOS = new Set(['/contacto/', '/agendar/']);

export const POST: APIRoute = async ({ request, locals, clientAddress, url }) => {
  const env = (locals as { runtime?: { env?: Record<string, string | undefined> } }).runtime?.env ?? {};

  let datos: FormData;
  try {
    datos = await request.formData();
  } catch {
    return new Response('Formulario ilegible', { status: 400 });
  }

  const quiereJson = (request.headers.get('accept') ?? '').includes('application/json');
  const pedido = String(datos.get('retorno') ?? '');
  const retorno = RETORNOS.has(pedido) ? pedido : '/contacto/';

  const responder = (ok: boolean, estado: number, cuerpo: unknown) => {
    if (quiereJson) {
      return new Response(JSON.stringify(cuerpo), {
        status: estado,
        headers: { 'content-type': 'application/json' },
      });
    }
    const destino = new URL(retorno, url.origin);
    if (ok) destino.searchParams.set('enviado', '1');
    else destino.searchParams.set('error', '1');
    return new Response(null, { status: 303, headers: { location: destino.toString() } });
  };

  // 1. Honeypot. Respondemos como si todo hubiera salido bien a propósito: un
  //    robot que recibe un error reintenta; uno que recibe un 200 se va.
  if (limpiar(datos.get('sitio_web'))) {
    return responder(true, 200, { ok: true });
  }

  // 2. Turnstile, solo si está configurado.
  const secreto = env['TURNSTILE_SECRET_KEY'];
  if (secreto) {
    const token = limpiar(datos.get('cf-turnstile-response'), 2048);
    if (!token || !(await verificarTurnstile(token, secreto, clientAddress ?? null))) {
      return responder(false, 403, { ok: false, error: 'verificacion' });
    }
  }

  // 3. Validación.
  const nombre = limpiar(datos.get('nombre'), 80);
  const telefono = limpiar(datos.get('telefono'), 30);
  const correo = limpiar(datos.get('correo'), 120);
  const comuna = limpiar(datos.get('comuna'), 60);
  const modalidad = limpiar(datos.get('modalidad'), 60);
  const motivo = limpiar(datos.get('motivo'), 80);
  const consentimiento = limpiar(datos.get('consentimiento'), 10);

  const errores: string[] = [];
  if (nombre.length < 3) errores.push('nombre');
  if (telefono.replace(/\D/g, '').length < 8) errores.push('telefono');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) errores.push('correo');
  if (!comuna) errores.push('comuna');
  if (!MODALIDADES.has(modalidad)) errores.push('modalidad');
  if (!MOTIVOS.has(motivo)) errores.push('motivo');
  if (!consentimiento) errores.push('consentimiento');

  if (errores.length > 0) {
    return responder(false, 422, { ok: false, errores });
  }

  const destino = env['CORREO_DESTINO'] ?? 'asistente@conectamedica.com';
  const remitente = env['CORREO_REMITENTE'] ?? 'web@conectamedica.com';
  const apiKey = env['RESEND_API_KEY'];

  const asunto = `Solicitud de hora · ${nombre} · ${motivo}`;
  const texto = [
    'Nueva solicitud de hora desde conectamedica.com',
    '',
    `Nombre:     ${nombre}`,
    `Teléfono:   ${telefono}`,
    `Correo:     ${correo}`,
    `Comuna:     ${comuna}`,
    `Modalidad:  ${modalidad}`,
    `Motivo:     ${motivo}`,
    '',
    `Recibida:   ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}`,
    '',
    'Responde a este correo para contestarle directamente al paciente.',
  ].join('\n');

  if (!apiKey) {
    // Sin proveedor de correo configurado no se puede prometer entrega.
    // Se falla ruidosamente en vez de mostrarle al paciente un "enviado" falso.
    console.error('[contacto] Falta RESEND_API_KEY: la solicitud NO se envió.', { asunto });
    return responder(false, 503, { ok: false, error: 'correo-no-configurado' });
  }

  const envio = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: `Clínica Conecta <${remitente}>`,
      to: [destino],
      reply_to: correo,
      subject: asunto,
      text: texto,
    }),
  });

  if (!envio.ok) {
    console.error('[contacto] Resend respondió', envio.status, await envio.text());
    return responder(false, 502, { ok: false, error: 'envio' });
  }

  return responder(true, 200, { ok: true });
};
