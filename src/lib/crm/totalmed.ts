/* Lectura de los avisos (webhooks) de TotalMed.

   TotalMed no publica el formato de sus envíos: su panel sólo dice que cada uno
   va firmado con el secreto del destino. Por eso este lector no asume nombres
   exactos. Busca el paciente y la cita por los nombres de campo habituales, en
   español y en inglés, y si algo no calza el evento igual queda guardado crudo
   en `eventos_webhook` para corregir el lector con un envío real a la vista.

   Cuando TotalMed entregue la documentación, lo que cambia es este archivo. */
import type { D1 } from './entorno';
import { iguales } from './sesion';

type Obj = Record<string, unknown>;
const esObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);

/* --------------------------------- firma --------------------------------- */

const texto = new TextEncoder();

async function hmacBytes(secreto: string, dato: string): Promise<Uint8Array> {
  const clave = await crypto.subtle.importKey(
    'raw',
    texto.encode(secreto),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  return new Uint8Array(await crypto.subtle.sign('HMAC', clave, texto.encode(dato)));
}
const hex = (b: Uint8Array) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
const b64 = (b: Uint8Array) => btoa(String.fromCharCode(...b));

/** Acepta las formas de firma más comunes: `sha256=<hex>`, `<hex>`, `<base64>`
    y la de marca de tiempo `t=<ts>,v1=<hex>` (firma sobre `<ts>.<cuerpo>`).
    La cabecera se reconoce por nombre: cualquiera que diga signature o firma. */
export async function firmaValida(cabeceras: Headers, cuerpo: string, secreto: string) {
  const valores: string[] = [];
  cabeceras.forEach((v, k) => {
    if (/signature|firma/i.test(k)) valores.push(v.trim());
  });
  if (!valores.length) return false;

  const directa = await hmacBytes(secreto, cuerpo);
  for (const valor of valores) {
    const partes = Object.fromEntries(
      valor.split(',').map((p) => {
        const i = p.indexOf('=');
        return i > 0 ? [p.slice(0, i).trim(), p.slice(i + 1).trim()] : ['', p.trim()];
      }),
    );
    if (partes['t'] && partes['v1']) {
      const conTiempo = await hmacBytes(secreto, `${partes['t']}.${cuerpo}`);
      if (iguales(partes['v1'].toLowerCase(), hex(conTiempo))) return true;
      continue;
    }
    const firma = valor.replace(/^sha256=/i, '');
    if (iguales(firma.toLowerCase(), hex(directa)) || iguales(firma, b64(directa))) return true;
  }
  return false;
}

/* -------------------------------- lectura -------------------------------- */

/** Primer valor no vacío bajo alguna de las claves, sin mirar mayúsculas. */
function campo(o: Obj | undefined, ...claves: string[]): string | null {
  if (!o) return null;
  const mapa = new Map(Object.entries(o).map(([k, v]) => [k.toLowerCase(), v]));
  for (const c of claves) {
    const v = mapa.get(c.toLowerCase());
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (typeof v === 'number') return String(v);
  }
  return null;
}

function hijo(o: Obj | undefined, ...claves: string[]): Obj | undefined {
  if (!o) return undefined;
  for (const [k, v] of Object.entries(o)) {
    if (claves.includes(k.toLowerCase()) && esObj(v)) return v;
  }
  return undefined;
}

export interface Lectura {
  tipo: string | null;
  paciente: {
    totalmedId: string | null;
    nombre: string;
    email: string | null;
    telefono: string | null;
    rut: string | null;
  } | null;
  cita: {
    totalmedId: string | null;
    servicio: string | null;
    inicio: string | null;
    estado: string | null;
    profesional: string | null;
  } | null;
}

const CLAVES_PACIENTE = ['paciente', 'patient', 'cliente', 'client', 'customer'];
const CLAVES_CITA = ['cita', 'appointment', 'reserva', 'booking', 'turno'];

export function leer(datos: unknown): Lectura {
  const raiz = esObj(datos) ? datos : {};
  const tipo = campo(raiz, 'evento', 'event', 'type', 'tipo', 'event_type');
  // Muchos proveedores envuelven todo en `data` o `payload`.
  const cuerpo = hijo(raiz, 'data', 'payload', 'objeto', 'object') ?? raiz;

  const cita = hijo(cuerpo, ...CLAVES_CITA) ?? (/(cita|appointment|reserva|booking)/i.test(tipo ?? '') ? cuerpo : undefined);
  const pac = hijo(cuerpo, ...CLAVES_PACIENTE) ?? hijo(cita, ...CLAVES_PACIENTE) ??
    (/(paciente|patient)/i.test(tipo ?? '') ? cuerpo : undefined);

  let paciente: Lectura['paciente'] = null;
  if (pac) {
    const nombre = campo(pac, 'nombre_completo', 'full_name', 'fullname', 'name') ??
      [campo(pac, 'nombre', 'nombres', 'first_name', 'firstname'), campo(pac, 'apellido', 'apellidos', 'last_name', 'lastname')]
        .filter(Boolean)
        .join(' ');
    paciente = {
      totalmedId: campo(pac, 'id', 'uuid', 'paciente_id', 'patient_id'),
      nombre,
      email: campo(pac, 'email', 'correo', 'mail')?.toLowerCase() ?? null,
      telefono: campo(pac, 'telefono', 'celular', 'phone', 'mobile', 'whatsapp'),
      rut: campo(pac, 'rut', 'documento', 'document', 'dni', 'identificacion'),
    };
  } else if (cita) {
    // Hay proveedores que mandan los datos del paciente sueltos dentro de la cita.
    const email = campo(cita, 'paciente_email', 'patient_email', 'email', 'correo');
    const nombre = campo(cita, 'paciente_nombre', 'patient_name', 'nombre_paciente') ?? '';
    if (email || nombre) {
      paciente = {
        totalmedId: campo(cita, 'paciente_id', 'patient_id'),
        nombre,
        email: email?.toLowerCase() ?? null,
        telefono: campo(cita, 'paciente_telefono', 'patient_phone', 'telefono', 'phone'),
        rut: campo(cita, 'paciente_rut', 'rut'),
      };
    }
  }

  return {
    tipo,
    paciente,
    cita: cita
      ? {
          totalmedId: campo(cita, 'id', 'uuid', 'cita_id', 'appointment_id', 'reserva_id'),
          servicio: campo(cita, 'servicio', 'tratamiento', 'service', 'treatment', 'prestacion') ??
            campo(hijo(cita, 'servicio', 'tratamiento', 'service', 'treatment'), 'nombre', 'name'),
          inicio: campo(cita, 'inicio', 'fecha_hora', 'fecha', 'start', 'starts_at', 'start_time', 'datetime', 'date'),
          estado: campo(cita, 'estado', 'status'),
          profesional: campo(cita, 'profesional', 'professional', 'doctor', 'medico') ??
            campo(hijo(cita, 'profesional', 'professional', 'doctor', 'medico'), 'nombre', 'name'),
        }
      : null,
  };
}

/* ------------------------------- guardado -------------------------------- */

/** Busca al paciente por id de TotalMed, después por correo, RUT y teléfono, y
    lo crea o completa. Nunca pisa con vacío un dato que ya estaba. */
export async function guardar(db: D1, l: Lectura): Promise<number | null> {
  if (!l.paciente) return null;
  const p = l.paciente;

  let fila: { id: number } | null = null;
  for (const [col, val] of [
    ['totalmed_id', p.totalmedId],
    ['email', p.email],
    ['rut', p.rut],
    ['telefono', p.telefono],
  ] as const) {
    if (!val) continue;
    fila = await db.prepare(`SELECT id FROM pacientes WHERE ${col} = ?`).bind(val).first<{ id: number }>();
    if (fila) break;
  }

  let id: number;
  if (fila) {
    id = fila.id;
    await db
      .prepare(
        `UPDATE pacientes SET
           totalmed_id = COALESCE(totalmed_id, ?),
           nombre = CASE WHEN ? <> '' THEN ? ELSE nombre END,
           email = COALESCE(?, email),
           telefono = COALESCE(?, telefono),
           rut = COALESCE(?, rut),
           estado = CASE WHEN estado = 'nuevo' AND ? THEN 'agendado' ELSE estado END,
           actualizado_en = datetime('now')
         WHERE id = ?`,
      )
      .bind(p.totalmedId, p.nombre, p.nombre, p.email, p.telefono, p.rut, l.cita ? 1 : 0, id)
      .run();
  } else {
    const r = await db
      .prepare(
        `INSERT INTO pacientes (totalmed_id, nombre, email, telefono, rut, estado, origen)
         VALUES (?, ?, ?, ?, ?, ?, 'totalmed')`,
      )
      .bind(p.totalmedId, p.nombre, p.email, p.telefono, p.rut, l.cita ? 'agendado' : 'nuevo')
      .run();
    id = Number(r.meta.last_row_id);
  }

  const c = l.cita;
  if (c && (c.totalmedId || c.inicio)) {
    const existente = c.totalmedId
      ? await db.prepare('SELECT id FROM citas WHERE totalmed_id = ?').bind(c.totalmedId).first<{ id: number }>()
      : await db
          .prepare('SELECT id FROM citas WHERE paciente_id = ? AND inicio = ?')
          .bind(id, c.inicio)
          .first<{ id: number }>();
    if (existente) {
      await db
        .prepare(
          `UPDATE citas SET servicio = COALESCE(?, servicio), inicio = COALESCE(?, inicio),
             estado = COALESCE(?, estado), profesional = COALESCE(?, profesional),
             actualizado_en = datetime('now')
           WHERE id = ?`,
        )
        .bind(c.servicio, c.inicio, c.estado, c.profesional, existente.id)
        .run();
    } else {
      await db
        .prepare(
          `INSERT INTO citas (paciente_id, totalmed_id, servicio, inicio, estado, profesional)
           VALUES (?, ?, ?, ?, ?, ?)`,
        )
        .bind(id, c.totalmedId, c.servicio, c.inicio, c.estado, c.profesional)
        .run();
    }
  }
  return id;
}
