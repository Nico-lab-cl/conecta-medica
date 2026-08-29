const NS = window.ConectaDesignSystem_3fd8ff || {};

const { UrgencyNotice, ClinicalDisclaimer, InfoNote } = NS;
function Card(){return (<div className="stack" style={{gap:24}}>
  <div><div className="lbl">urgencias · superficie</div><UrgencyNotice /></div>
  <div><div className="lbl">urgencias · plano (footer)</div><UrgencyNotice tone="flat" /></div>
  <div><div className="lbl">nota informativa neutra</div><InfoNote title="Trae tus exámenes previos" icon="file-text">Si tienes hemogramas o informes de los últimos 12 meses, tráelos impresos o en el teléfono.</InfoNote></div>
  <div><div className="lbl">aviso al pie de contenido clínico</div><ClinicalDisclaimer style={{marginTop:0}} /></div>
</div>);}


window.__CARDS = window.__CARDS || {}; window.__CARDS["notices"] = Card;
