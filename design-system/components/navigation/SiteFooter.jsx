function SiteFooter({
  logoSrc,
  style
}) {
  const link = {
    color: "#D6E3F7",
    textDecoration: "none",
    fontSize: "var(--text-body-sm, 15px)",
    lineHeight: 1.9
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-footer, #0A2B5E)",
      color: "#fff",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `.conecta-foot-link{color:#D6E3F7;text-decoration:none}.conecta-foot-link:hover{color:#fff;text-decoration:underline;text-underline-offset:3px}.conecta-foot-link:focus-visible{outline:2px solid #fff;outline-offset:2px;border-radius:2px}`), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max, 1200px)",
      margin: "0 auto",
      padding: "64px 48px 32px",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr",
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-md, 8px)",
      padding: "10px 14px",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ConectaLogo, {
    variant: "lockup",
    height: 34,
    src: logoSrc
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.7,
      color: "#D6E3F7"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#fff",
      fontWeight: 600
    }
  }, "Cl\xEDnica Conecta SpA"), /*#__PURE__*/React.createElement("div", null, "Edificio New Ega\xF1a"), /*#__PURE__*/React.createElement("div", null, "Av. Am\xE9rico Vespucio 1106, \xD1u\xF1oa, Santiago"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: "var(--font-mono, monospace)"
    }
  }, "+56 9 1234 5678"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)"
    }
  }, "contacto@conectamedica.com"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "#8FB0DE",
      marginBottom: 12
    }
  }, "Horarios"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.9,
      color: "#D6E3F7"
    }
  }, /*#__PURE__*/React.createElement("div", null, "Lunes a viernes \xB7 09:00\u201318:00"), /*#__PURE__*/React.createElement("div", null, "S\xE1bado \xB7 09:00\u201313:00"), /*#__PURE__*/React.createElement("div", null, "Domingo y festivos \xB7 cerrado"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      color: "#fff"
    }
  }, "Atenci\xF3n solo particular \xB7 $50.000"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "#8FB0DE",
      marginBottom: 12
    }
  }, "Sitio"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, [["Unidad de hematología", "/hematologia"], ["Prestaciones", "/prestaciones"], ["Telemedicina", "/telemedicina"], ["Agendar hora", "/agendar"], ["Política de privacidad", "/privacidad"], ["Términos de uso", "/terminos"]].map(([l, h]) => /*#__PURE__*/React.createElement("a", {
    key: h,
    href: h,
    className: "conecta-foot-link",
    style: link
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,.18)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max, 1200px)",
      margin: "0 auto",
      padding: "20px 48px 40px",
      display: "flex",
      flexWrap: "wrap",
      gap: 24,
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      maxWidth: "62ch"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "triangle-alert",
    size: 20,
    color: "#F0B5A5",
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.6,
      color: "#F0B5A5"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#fff"
    }
  }, "Esta no es una unidad de urgencia."), " Si tienes fiebre alta, sangrado que no se detiene o falta de aire, acude al servicio de urgencia m\xE1s cercano o llama al 131.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-caption, 14px)",
      color: "#8FB0DE"
    }
  }, "\xA9 2026 Cl\xEDnica Conecta SpA"))));
}
Object.assign(__ds_scope, { SiteFooter });
