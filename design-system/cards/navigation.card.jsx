const NS = window.ConectaDesignSystem_3fd8ff || {};

const { SiteHeader, Breadcrumbs, SiteFooter } = NS;
const LOGO = window.__resources.logo;
function Card(){return (<div className="stack" style={{gap:24}}>
  <div><div className="lbl">header 80px · en reposo</div><div className="zoom" style={{height:41,overflow:"hidden"}}><SiteHeader logoSrc={LOGO} style={{border:"1px solid var(--color-line)",borderRadius:8}} /></div></div>
  <div><div className="lbl">header 64px · comprimido al hacer scroll</div><div className="zoom" style={{height:33,overflow:"hidden"}}><SiteHeader logoSrc={LOGO} compressed style={{border:"1px solid var(--color-line)",borderRadius:8}} /></div></div>
  <div className="row" style={{alignItems:"flex-start",gap:24}}>
    <div><div className="lbl">móvil 390 · menú abierto</div><div style={{width:390,border:"1px solid var(--color-line)",borderRadius:8,overflow:"hidden"}}><SiteHeader logoSrc={LOGO} layout="mobile" menuOpen /></div></div>
    <div style={{flex:1}}><div className="lbl">breadcrumbs</div><Breadcrumbs items={[{label:"Inicio",href:"#inicio"},{label:"Prestaciones",href:"#prestaciones"},{label:"Hematología"}]} /></div>
  </div>
  <div><div className="lbl">footer</div><div className="zoom" style={{height:265,overflow:"hidden"}}><SiteFooter logoSrc={LOGO} /></div></div>
</div>);}


window.__CARDS = window.__CARDS || {}; window.__CARDS["navigation"] = Card;
