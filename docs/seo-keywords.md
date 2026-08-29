# Investigación de keywords — conectamedica.com

Fuente: Ubersuggest (MCP), ubicación **Chile (locId 2152)**, idioma español. Consultado el 2026-08-29.
`SD` = dificultad SEO 0-100. Volumen = búsquedas mensuales en Chile.

---

## 1. Hallazgo principal (afecta la arquitectura de contenido)

**El tráfico no está en "hematólogo Santiago". Está en las preguntas clínicas.**

| Semilla transaccional/local | Volumen CL | SD |
|---|---|---|
| hematologo | 0 | 30 |
| hematologo santiago | 0 | 17 |
| hematologo online | 0 | 17 |
| hematologo particular | sin datos | — |
| telemedicina hematologia | 0 | 17 |
| medico hematologo online | 0 | 12 |

| Semilla informacional | Volumen CL | SD |
|---|---|---|
| ganglios inflamados | **9.900** | 18 |
| ganglios inflamados en el cuello | **4.400** | 23 |
| leucocitos bajos | **2.400** | 17 |
| ferritina baja | **1.900** | 14 |
| plaquetas bajas que significa | 720 | 20 |

Volumen 0 no significa que nadie busque "hematólogo Santiago": significa que está bajo el umbral de reporte de Ubersuggest. Pero el orden de magnitud es inequívoco. **La demanda local de especialista se capta por Google Business Profile y Maps, no por posicionamiento orgánico.** Las páginas transaccionales (`/precios/`, `/telemedicina/`, `/contacto/`) se optimizan para conversión y para marca, no para volumen.

## 2. Segundo hallazgo: no hay hematología chilena en estos resultados

SERP de `ferritina baja` en Chile: Mayo Clinic, MedlinePlus, MSD Manuals, y después blogs españoles y de laboratorios (ambar-lab DA 26, clinicpoint DA 27, saludonnet DA 41, promofarma DA 54).
SERP de `plaquetas bajas cuando preocuparse` en Chile: Mayo Clinic, Mapfre (España), bonomedico (España), familiaysalud (España), cancer.org, NIH.

**No aparece un solo hematólogo chileno.** Los resultados que sí rankean con dominios débiles (DA 12–27, posiciones 4 y 5) demuestran que la autoridad de dominio no es la barrera en estas consultas. Un especialista chileno, escribiendo con contexto chileno (nombre de los exámenes acá, hemograma, referencia a MINSAL, qué hacer en el sistema de salud chileno) tiene una ventana real.

## 3. Tercer hallazgo: AI Overview y People Also Ask ocupan las posiciones 1 y 2

En **ambos** SERPs analizados las dos primeras posiciones son AI Overview y People Also Ask. El clic orgánico empieza en la posición 3.

Consecuencia de diseño, no de opinión: cada respuesta debe abrir con una **respuesta directa de 40 a 60 palabras** antes de cualquier desarrollo, con la pregunta como H2 literal. Es exactamente la estructura *pregunta → respuesta corta → detalle → cuándo consultar* que ya define el brief. Los datos la confirman.

## 4. Recomendación de arquitectura que surge de los datos

El brief pone las 7 preguntas clínicas dentro de `/preguntas-frecuentes/`. **Una sola página no puede posicionar para 7 consultas distintas sin canibalizarse.**

Propuesta:

- `/preguntas-frecuentes/` = **hub**. Respuesta corta de cada pregunta + enlace a la página completa. Marcado `FAQPage`. Posiciona para la marca y para consultas operativas.
- `/informacion-para-pacientes/[slug]/` = **una página por pregunta clínica**, con `MedicalWebPage`, autor, fecha de revisión y enlace a su prestación. Es la que compite por la keyword.

Esto no agrega rutas nuevas: usa la ruta de recursos que el brief ya definió.

---

## 5. Tabla keyword → URL

Una keyword principal por URL. Sin canibalización.

| Keyword | Vol. CL | SD | Intención | URL destino | Title propuesto (≤60) | Meta descripción (≤155) |
|---|---|---|---|---|---|---|
| ferritina baja | 1.900 | 14 | Informacional | `/informacion-para-pacientes/ferritina-baja-que-significa/` | Ferritina baja: qué significa y cuándo consultar | Qué indica una ferritina baja en tu examen, por qué ocurre y en qué casos conviene estudiar la causa. Escrito por un hematólogo en Chile. |
| ganglios inflamados cuándo preocuparse | 9.900 (raíz) | 18 | Informacional | `/informacion-para-pacientes/ganglios-aumentados-cuando-consultar/` | Ganglios inflamados: cuándo consultar a un hematólogo | La mayoría de los ganglios aumentados no son cáncer. Qué signos sí ameritan estudio y cuándo derivar a hematología. |
| leucocitos bajos qué significa | 2.400 | 17 | Informacional | `/informacion-para-pacientes/leucocitos-bajos-que-significa/` | Leucocitos bajos: qué significa y si requiere tratamiento | Tener leucocitos bajos no siempre necesita tratamiento. Qué se evalúa, qué causas hay y cuándo consultar. |
| plaquetas bajas qué significa | 720 | 20 | Informacional | `/informacion-para-pacientes/plaquetas-bajas-que-significa/` | Plaquetas bajas: qué significa y cuándo estudiarlas | Qué son las plaquetas bajas, por qué aparecen y en qué casos se necesita evaluación hematológica. |
| anemia por falta de hierro tratamiento | 70 | 6 | Informacional | `/informacion-para-pacientes/anemia-por-falta-de-hierro-cuanto-demora-mejorar/` | Anemia por falta de hierro: cuánto demora mejorar | Tiempos reales de recuperación al iniciar tratamiento con hierro, por qué a veces vuelve y cuándo buscar la causa. |
| por qué vuelve la falta de hierro | — | — | Informacional | `/informacion-para-pacientes/por-que-vuelve-la-falta-de-hierro/` | Por qué vuelve la falta de hierro tras el tratamiento | Si la ferritina vuelve a bajar, casi siempre hay una causa de pérdida que no se ha estudiado. Qué se busca y cómo. |
| anticoagulantes alimentos prohibidos | 10 | 13 | Informacional | `/informacion-para-pacientes/cuidados-con-anticoagulantes/` | Anticoagulantes: cuidados, alimentos y signos de alarma | Qué cuidados tener si tomas anticoagulantes, qué alimentos vigilar y qué signos obligan a consultar de inmediato. |
| citopenias tratamiento | — | — | Informacional | `/informacion-para-pacientes/citopenias-siempre-requieren-tratamiento/` | ¿Toda citopenia necesita tratamiento? | No todas las citopenias requieren medicamentos ni estimulantes de médula ósea. Qué define la conducta. |
| hematólogo Santiago | 0* | 17 | Local | `/` | Hematólogo en Ñuñoa y telemedicina — Clínica Conecta | Atención hematológica coordinada en Ñuñoa y por telemedicina en todo Chile. Consulta particular $50.000. Atención de sábado. |
| hematólogo online Chile | 0* | 17 | Transaccional | `/telemedicina/` | Hematología por telemedicina en todo Chile | Consulta hematológica a distancia: qué se puede resolver en línea, qué requiere presencial y cómo se agenda. |
| consulta hematología precio | — | — | Transaccional | `/precios/` | Precio de la consulta hematológica — $50.000 | Valor de la consulta, qué incluye y por qué la atención es particular sin convenios. Sin costos ocultos. |
| segunda opinión hematología | — | — | Transaccional | `/conecta-hematologia/prestaciones/hematologia/` | Consulta y segunda opinión en hematología | Evaluación hematológica presencial o a distancia, con revisión de exámenes previos y un plan explicado en palabras simples. |
| hematólogo Plaza Egaña | — | — | Local | `/contacto/` | Cómo llegar — Edificio New Egaña, Ñuñoa | Dirección, horarios y cómo llegar desde Metro Plaza Egaña. Atención presencial y por telemedicina. |

`*` Bajo el umbral de reporte de Ubersuggest, no ausencia de demanda.

## 6. Descartadas a propósito

- `fotos de ganglios inflamados` (1.000), `fotos de ganglios inflamados axila` (260), `fotos de ganglios inflamados en el cuello` (170): intención de imagen. Producir esto obligaría a publicar fotografía clínica, que el brief prohíbe, y atrae tráfico que no convierte.
- `las plaquetas bajas pueden causar la muerte` (170): se responde dentro de la página de plaquetas, sin titular alarmista y sin optimizar para ella.
- `biodescodificacion plaquetas bajas`, `remedios naturales ganglios inflamados`: pseudociencia. No se compite ahí.
- `dengue plaquetas bajas`: fuera del alcance clínico de la unidad.

## 7. Pendiente antes de dar esto por cerrado

- Volumen de `hematologo ñuñoa`, `hematologo providencia`, `hematologo las condes`: no reportado por Ubersuggest. Se valida con Google Keyword Planner una vez que exista la cuenta de Google Business Profile.
- Prioridad de publicación sugerida: ferritina baja → ganglios → leucocitos → plaquetas. Es orden de volumen ajustado por dificultad, y coincide con las preguntas que Carlos ya identificó.
