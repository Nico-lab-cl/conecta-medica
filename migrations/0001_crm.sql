-- CRM de pacientes (/admin). Base D1 `conecta-crm`, binding DB en wrangler.jsonc.
--
-- Los pacientes entran solos por el webhook de TotalMed cada vez que alguien
-- reserva, y el equipo les va agregando estado y notas desde /admin. La ficha
-- clínica NO vive acá: esto es seguimiento comercial y de contacto, nada más.

CREATE TABLE IF NOT EXISTS pacientes (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  totalmed_id    TEXT UNIQUE,
  nombre         TEXT NOT NULL DEFAULT '',
  email          TEXT,
  telefono       TEXT,
  rut            TEXT,
  -- nuevo · agendado · atendido · seguimiento · inactivo
  estado         TEXT NOT NULL DEFAULT 'nuevo',
  notas          TEXT NOT NULL DEFAULT '',
  origen         TEXT NOT NULL DEFAULT 'manual',
  creado_en      TEXT NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS pacientes_email ON pacientes (email);
CREATE INDEX IF NOT EXISTS pacientes_rut ON pacientes (rut);
CREATE INDEX IF NOT EXISTS pacientes_telefono ON pacientes (telefono);

CREATE TABLE IF NOT EXISTS citas (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  paciente_id    INTEGER NOT NULL REFERENCES pacientes (id) ON DELETE CASCADE,
  totalmed_id    TEXT UNIQUE,
  servicio       TEXT,
  inicio         TEXT,
  estado         TEXT,
  profesional    TEXT,
  creado_en      TEXT NOT NULL DEFAULT (datetime('now')),
  actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS citas_paciente ON citas (paciente_id, inicio);

-- Cada aviso de TotalMed se guarda crudo. Su formato no está publicado, así que
-- si un campo no se reconoce el dato no se pierde: se corrige el lector y se
-- reprocesa desde acá.
CREATE TABLE IF NOT EXISTS eventos_webhook (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  recibido_en  TEXT NOT NULL DEFAULT (datetime('now')),
  tipo         TEXT,
  firma_valida INTEGER NOT NULL DEFAULT 0,
  cabeceras    TEXT NOT NULL DEFAULT '{}',
  cuerpo       TEXT NOT NULL DEFAULT '',
  paciente_id  INTEGER REFERENCES pacientes (id) ON DELETE SET NULL,
  error        TEXT
);
