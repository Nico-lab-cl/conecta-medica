/* Cita o dato destacado dentro de texto largo. */
function Pullquote({
  children,
  source,
  kind = "quote",
  style
}) {
  const data = kind === "data";
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: "40px 0",
      padding: "28px 32px",
      background: data ? "var(--surface-alt, #EDF3FC)" : "transparent",
      borderRadius: data ? "var(--radius-lg, 16px)" : 0,
      borderTop: data ? "none" : "2px solid var(--color-blue, #12489E)",
      borderBottom: data ? "none" : "1px solid var(--color-line, #E2E7EE)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: data ? "var(--font-mono, monospace)" : "var(--font-serif, serif)",
      fontWeight: data ? 400 : 600,
      fontSize: data ? "var(--text-h2, 30px)" : "var(--text-h3, 22px)",
      lineHeight: data ? 1.25 : 1.4,
      color: data ? "var(--color-blue-deep, #0A2B5E)" : "var(--color-blue, #12489E)"
    }
  }, children), source && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 12,
      fontSize: "var(--text-body-sm, 15px)",
      color: "var(--color-gray, #5B646E)"
    }
  }, source));
}
Object.assign(__ds_scope, { Pullquote });
