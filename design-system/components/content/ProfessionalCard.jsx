/* Tarjeta de profesional. Sin foto disponible se usa un monograma sobre azul nube:
   nunca un avatar genérico ni una silueta. */
function ProfessionalCard({
  name,
  role,
  subtitle,
  href = "#",
  photoSrc,
  initials,
  style
}) {
  const HONORIFICS = ["dr.", "dra.", "prof.", "prof", "dr", "dra", "sr.", "sra."];
  const mono = initials || (name || "").split(" ").filter(Boolean).filter(w => !HONORIFICS.includes(w.toLowerCase())).slice(0, 2).map(w => w[0]).join("");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      padding: 24,
      background: "var(--surface-card, #fff)",
      border: "1px solid var(--color-line, #E2E7EE)",
      borderRadius: "var(--radius-lg, 16px)",
      boxShadow: "var(--shadow-1, 0 1px 2px rgba(20,24,29,.06))",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      width: 88,
      height: 88,
      flexShrink: 0,
      borderRadius: "var(--radius-md, 8px)",
      background: photoSrc ? `center/cover no-repeat url(${photoSrc})` : "var(--surface-alt, #EDF3FC)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-serif, serif)",
      fontWeight: 600,
      fontSize: 30,
      color: "var(--color-blue, #12489E)"
    }
  }, !photoSrc && mono), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans, sans-serif)",
      fontWeight: 600,
      fontSize: "var(--text-h4, 19px)",
      color: "var(--color-ink, #14181D)"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--color-blue, #12489E)"
    }
  }, role), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.55,
      color: "var(--color-gray, #5B646E)"
    }
  }, subtitle), /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "conecta-prof-link",
    style: {
      marginTop: 4,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      color: "var(--color-blue, #12489E)",
      fontWeight: 500,
      fontSize: "var(--text-body-sm, 15px)",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      textDecorationThickness: "1px",
      width: "fit-content"
    }
  }, "Ver perfil", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16
  })), /*#__PURE__*/React.createElement("style", null, `.conecta-prof-link:hover{color:var(--color-blue-deep,#0A2B5E)}.conecta-prof-link:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-radius:2px}`)));
}
Object.assign(__ds_scope, { ProfessionalCard });
