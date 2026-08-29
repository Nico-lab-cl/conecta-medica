const NS = window.ConectaDesignSystem_3fd8ff || {};

const { ServiceCard, ProfessionalCard, ResourceCard, StepBlock, Accordion, PriceBlock, StatusChip, Pullquote, ConectaThread } = NS;
function Card(){return (<div className="stack" style={{gap:28}}>
  <div><div className="lbl">tarjeta de prestación · eje 6 col + orbitantes 2 col</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:16}}>
      <ServiceCard level="axis" style={{gridColumn:"span 6"}} icon="activity" title="Conecta Hematología" summary="Anemias, alteraciones de plaquetas y seguimiento oncohematológico, con un solo equipo a cargo de tu caso." chips={["presencial","telemedicina"]} />
      <ServiceCard style={{gridColumn:"span 3"}} icon="stethoscope" title="Gastroenterología" summary="Estudio digestivo cuando la anemia lo pide." />
      <ServiceCard style={{gridColumn:"span 3"}} icon="salad" title="Nutrición y dietética" summary="Plan alimentario durante el tratamiento." />
    </div></div>
  <div className="row" style={{gap:16,alignItems:"stretch"}}>
    <ProfessionalCard style={{flex:1}} name="Dr. Carlos Flores Angulo" role="Hematología" subtitle="Doctorando en epidemiología" />
    <ResourceCard style={{width:260}} videoId="conecta-pendiente" title="Qué mide un hemograma" duration="6 min" />
  </div>
  <div><div className="lbl">pasos de la atención · con el hilo Conecta</div>
    <ConectaThread nodes={4} active={1} style={{marginBottom:12}} />
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
      <StepBlock number={1} title="Agendas">Eliges día y modalidad. No necesitas derivación.</StepBlock>
      <StepBlock number={2} title="Consulta">40 minutos con tus exámenes previos a la vista.</StepBlock>
      <StepBlock number={3} title="Exámenes" active={false}>Solo los que faltan, con la orden en la mano.</StepBlock>
      <StepBlock number={4} title="Plan" active={false}>Un plan escrito y quién lo sigue contigo.</StepBlock>
    </div></div>
  <div className="row" style={{gap:16,alignItems:"flex-start"}}>
    <div style={{flex:1}}><div className="lbl">preguntas frecuentes</div><Accordion items={[{q:"¿Atienden por Fonasa o isapre?",a:"No. La atención es solo particular. Entregamos boleta para que la presentes a tu seguro."},{q:"¿Necesito derivación para agendar?",a:"No. Puedes agendar directamente."}]} /></div>
    <div style={{width:230}}><div className="lbl">chips de estado</div><div className="row" style={{gap:8}}><StatusChip kind="presencial" /><StatusChip kind="telemedicina" /><StatusChip kind="sabado" /></div></div>
  </div>
  <div><div className="lbl">bloque de precio</div><PriceBlock /></div>
  <div><div className="lbl">cita y dato destacado</div>
    <Pullquote source="Dr. Carlos Flores Angulo, hematólogo" style={{margin:0}}>El paciente no debería tener que explicar su caso desde cero en cada puerta.</Pullquote>
    <Pullquote kind="data" source="Duración de la consulta en Conecta" style={{marginTop:16,marginBottom:0}}>40 minutos de consulta</Pullquote></div>
</div>);}


window.__CARDS = window.__CARDS || {}; window.__CARDS["content"] = Card;
