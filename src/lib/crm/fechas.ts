/* Fechas del CRM, siempre mostradas en hora de Chile.

   Llegan de dos lados y significan cosas distintas cuando no traen zona:
   - las que pone D1 (`datetime('now')`, "2026-11-01 06:33:00") están en UTC;
   - las de las citas de TotalMed sin zona ("2026-11-20 10:00") ya son la hora
     local de la consulta, y convertirlas la correría tres horas. */

const ZONA = 'America/Santiago';
const conZona = (s: string) => /(Z|[+-]\d{2}:?\d{2})$/.test(s);

function formatear(s: string | null, enUtcSiNoTrae: boolean, estilo: 'medium' | 'full') {
  if (!s) return '—';
  const iso = s.includes('T') ? s : s.replace(' ', 'T');
  const local = !conZona(iso) && !enUtcSiNoTrae;
  // Sin zona se lee como UTC. Si era hora local, se muestra también en UTC y
  // sale tal cual vino.
  const d = new Date(conZona(iso) ? iso : `${iso}Z`);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleString('es-CL', {
    timeZone: local ? 'UTC' : ZONA,
    dateStyle: estilo,
    timeStyle: 'short',
  });
}

/** Marca de tiempo de la base (UTC). */
export const fechaRegistro = (s: string | null, estilo: 'medium' | 'full' = 'medium') =>
  formatear(s, true, estilo);

/** Inicio de una cita de TotalMed. */
export const fechaCita = (s: string | null, estilo: 'medium' | 'full' = 'medium') =>
  formatear(s, false, estilo);
