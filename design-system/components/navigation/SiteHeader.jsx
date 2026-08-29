const NAV = [{
  label: "Unidad de hematología",
  href: "/hematologia"
}, {
  label: "Prestaciones",
  href: "/prestaciones"
}, {
  label: "Telemedicina",
  href: "/telemedicina"
}, {
  label: "Información para pacientes",
  href: "/pacientes"
}, {
  label: "Contacto",
  href: "/contacto"
}];
function SiteHeader({
  items = NAV,
  active = "/hematologia",
  compressed = false,
  layout = "desktop",
  menuOpen = false,
  logoSrc,
  onToggleMenu,
  style
}) {
  const mobile = layout === "mobile";
  const h = compressed ? 64 : 80;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "relative",
      background: "var(--color-white, #fff)",
      borderBottom: compressed ? "none" : "1px solid var(--color-line, #E2E7EE)",
      boxShadow: compressed ? "var(--shadow-1, 0 1px 2px rgba(20,24,29,.06))" : "none",
      transition: "height var(--dur-mid, 200ms) var(--ease-standard, ease), box-shadow var(--dur-mid, 200ms) var(--ease-standard, ease)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `.conecta-nav-item{position:relative;font-family:var(--font-sans,sans-serif);font-size:var(--text-body-sm,15px);font-weight:500;color:var(--color-ink,#14181D);text-decoration:none;padding:6px 0;transition:color var(--dur-fast,150ms) var(--ease-out,ease)}
.conecta-nav-item:hover{color:var(--color-blue,#12489E)}
.conecta-nav-item:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:4px;border-radius:2px}
.conecta-nav-item[aria-current=page]{color:var(--color-blue,#12489E)}
.conecta-nav-item[aria-current=page]::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:2px;background:var(--color-blue,#12489E)}
.conecta-burger{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:none;border:none;cursor:pointer;color:var(--color-ink,#14181D)}
.conecta-burger:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-radius:var(--radius-sm,4px)}
.conecta-mobile-item{display:block;font-family:var(--font-sans,sans-serif);font-size:var(--text-body,17px);font-weight:500;color:var(--color-ink,#14181D);text-decoration:none;padding:14px 0;border-bottom:1px solid var(--color-line,#E2E7EE)}
.conecta-mobile-item[aria-current=page]{color:var(--color-blue,#12489E)}`), /*#__PURE__*/React.createElement("div", {
    style: {
      height: h,
      maxWidth: "var(--container-max, 1200px)",
      margin: "0 auto",
      padding: mobile ? "0 20px" : "0 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    "aria-label": "Cl\xEDnica Conecta, inicio",
    style: {
      display: "inline-flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ConectaLogo, {
    variant: "lockup",
    height: compressed || mobile ? 36 : 44,
    src: logoSrc
  })), !mobile && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Principal",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.href,
    href: it.href,
    className: "conecta-nav-item",
    "aria-current": active === it.href ? "page" : undefined
  }, it.label))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: compressed ? "sm" : "md",
    as: "a",
    href: "/agendar",
    icon: "calendar",
    iconPosition: "left"
  }, "Agendar hora")), mobile && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    as: "a",
    href: "/agendar"
  }, "Agendar hora"), /*#__PURE__*/React.createElement("button", {
    className: "conecta-burger",
    "aria-label": menuOpen ? "Cerrar menú" : "Abrir menú",
    "aria-expanded": menuOpen,
    onClick: onToggleMenu
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: menuOpen ? "x" : "menu",
    size: 24
  })))), mobile && menuOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: h,
      background: "var(--color-white, #fff)",
      borderTop: "1px solid var(--color-line, #E2E7EE)",
      boxShadow: "var(--shadow-2, 0 4px 12px -2px rgba(20,24,29,.10))",
      padding: "8px 20px 24px",
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Principal"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.href,
    href: it.href,
    className: "conecta-mobile-item",
    "aria-current": active === it.href ? "page" : undefined
  }, it.label))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "md",
    as: "a",
    href: "/agendar",
    fullWidth: true,
    icon: "calendar",
    iconPosition: "left",
    style: {
      marginTop: 20
    }
  }, "Agendar hora"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: "var(--text-body-sm, 15px)",
      color: "var(--color-gray, #5B646E)"
    }
  }, "Atenci\xF3n solo particular \xB7 consulta $50.000")));
}
Object.assign(__ds_scope, { SiteHeader });
