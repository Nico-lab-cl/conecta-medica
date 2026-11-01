/* Lo que el CRM necesita del Worker: la base D1 y tres secretos.

   Los secretos se cargan en Cloudflare (Workers → conecta-medica → Settings →
   Variables and Secrets), nunca en el repo. En local van en `.dev.vars`.

     ADMIN_PASSWORD           la clave para entrar a /admin
     ADMIN_SECRET             firma la cookie de sesión; cualquier texto largo
                              y al azar. Cambiarlo cierra todas las sesiones.
     TOTALMED_WEBHOOK_SECRET  el secreto que muestra TotalMed al agregar el
                              destino del webhook */

/** Lo justo de la API de D1 que se usa, para no cargar los tipos globales del
    Worker encima de los del navegador. */
export interface D1Resultado<T> {
  results: T[];
  meta: { last_row_id?: number; changes?: number };
}
export interface D1Sentencia {
  bind(...valores: unknown[]): D1Sentencia;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Resultado<T>>;
  run(): Promise<D1Resultado<never>>;
}
export interface D1 {
  prepare(sql: string): D1Sentencia;
}

export interface EntornoCRM {
  DB?: D1;
  ADMIN_PASSWORD?: string;
  ADMIN_SECRET?: string;
  TOTALMED_WEBHOOK_SECRET?: string;
}

export function entorno(locals: unknown): EntornoCRM {
  return (locals as { runtime?: { env?: EntornoCRM } }).runtime?.env ?? {};
}
