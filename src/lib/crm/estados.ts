/* Etapas del paciente en el CRM. El webhook sólo mueve de "nuevo" a "agendado";
   el resto lo decide el equipo a mano. */
export const ESTADOS = [
  { valor: 'nuevo', etiqueta: 'Nuevo' },
  { valor: 'agendado', etiqueta: 'Agendado' },
  { valor: 'atendido', etiqueta: 'Atendido' },
  { valor: 'seguimiento', etiqueta: 'En seguimiento' },
  { valor: 'inactivo', etiqueta: 'Inactivo' },
] as const;

export const etiquetaEstado = (v: string) => ESTADOS.find((e) => e.valor === v)?.etiqueta ?? v;
