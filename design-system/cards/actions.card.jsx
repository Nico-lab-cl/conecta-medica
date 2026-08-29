const NS = window.ConectaDesignSystem_3fd8ff || {};

const { Button, WhatsAppButton, TextLink } = NS;
function Card(){return (<div className="stack">
  <div><div className="lbl">variantes · md</div><div className="row"><Button variant="primary" icon="calendar" iconPosition="left">Agendar hora</Button><Button variant="secondary">Ver prestaciones</Button><Button variant="text" icon="arrow-right">Leer más</Button></div></div>
  <div><div className="lbl">tamaños · sm 40 / md 48 / lg 56</div><div className="row"><Button size="sm">Solicitar hora</Button><Button size="md">Solicitar hora</Button><Button size="lg">Solicitar hora</Button></div></div>
  <div><div className="lbl">estados</div><div className="row"><Button loading>Solicitar hora</Button><Button disabled>No disponible</Button><Button variant="secondary" disabled>No disponible</Button></div></div>
  <div className="row" style={{gap:32,alignItems:"flex-end"}}>
    <div><div className="lbl">whatsapp · flotante / inline</div><div className="row"><WhatsAppButton /><WhatsAppButton variant="inline" /></div></div>
  </div>
  <div><div className="lbl">enlace en texto corrido</div><p style={{margin:0,fontSize:"var(--text-body)",lineHeight:1.6,maxWidth:"60ch"}}>La primera unidad es <TextLink href="#">Conecta Hematología</TextLink>, y puedes <TextLink href="#" arrow>agendar una hora</TextLink> sin derivación previa.</p></div>
</div>);}


window.__CARDS = window.__CARDS || {}; window.__CARDS["actions"] = Card;
