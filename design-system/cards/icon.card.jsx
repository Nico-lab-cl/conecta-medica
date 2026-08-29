const NS = window.ConectaDesignSystem_3fd8ff || {};

const { Icon } = NS;
const SET = ["clock","calendar","map-pin","phone","message-circle","video","file-text","download","arrow-right","chevron-down","plus","minus","check","triangle-alert","info"];
function Card(){return (<div className="stack">
  <div><div className="lbl">24px · azul Conecta</div><div className="row" style={{gap:18}}>{SET.map(n=><Icon key={n} name={n} size={24} color="var(--color-blue)" />)}</div></div>
  <div className="row" style={{gap:28}}>
    <div><div className="lbl">20px en texto</div><div style={{display:"flex",alignItems:"center",gap:8}}><Icon name="clock" size={20} color="var(--color-gray)" /><span style={{fontSize:16,color:"var(--color-gray)"}}>40 minutos</span></div></div>
    <div><div className="lbl">sobre azul profundo</div><div style={{display:"flex",gap:12,background:"var(--surface-footer)",padding:"10px 14px",borderRadius:8}}>{["map-pin","phone","clock"].map(n=><Icon key={n} name={n} size={22} color="#fff" />)}</div></div>
    <div><div className="lbl">whatsapp · set simple</div><Icon name="whatsapp" set="simple" size={24} color="#0F7A46" /></div>
  </div>
</div>);}


window.__CARDS = window.__CARDS || {}; window.__CARDS["icon"] = Card;
