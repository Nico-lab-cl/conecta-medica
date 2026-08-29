const NS = window.ConectaDesignSystem_3fd8ff || {};

const { Field, AppointmentForm, CONTROL_CSS } = NS;
function Card(){return (<div className="stack" style={{gap:28}}>
  <style>{CONTROL_CSS}</style>
  <div><div className="lbl">estados del control</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <Field id="d1" label="Nombre y apellido" required><input className="conecta-control" defaultValue="María Fuentes" /></Field>
      <Field id="d2" label="Teléfono" help="Lo usamos solo para confirmar tu hora." required error="Escribe un teléfono de 9 dígitos."><input className="conecta-control" defaultValue="+56 9 123" /></Field>
      <Field id="d3" label="Comuna" required><select className="conecta-control" defaultValue="Ñuñoa"><option>Ñuñoa</option></select></Field>
      <Field id="d4" label="Mensaje" ><textarea className="conecta-control" disabled placeholder="No se usa en el sitio" /></Field>
    </div></div>
  <div><div className="lbl">solicitud de hora · en carga</div><AppointmentForm state="loading" style={{maxWidth:"100%"}} /></div>
  <div><div className="lbl">confirmación</div><AppointmentForm state="sent" style={{maxWidth:"100%"}} /></div>
</div>);}


window.__CARDS = window.__CARDS || {}; window.__CARDS["forms"] = Card;
