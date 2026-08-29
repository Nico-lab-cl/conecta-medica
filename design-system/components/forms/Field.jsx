/* Envoltura de campo: etiqueta, ayuda, error y marca de requerido.
   Todo control del sistema se monta dentro de este componente. */
function Field({
  id,
  label,
  help,
  error,
  required = false,
  children,
  style
}) {
  const helpId = help ? id + "-help" : undefined;
  const errId = error ? id + "-error" : undefined;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--color-ink, #14181D)"
    }
  }, label, !required && /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "none",
      letterSpacing: 0,
      color: "var(--color-gray, #5B646E)"
    }
  }, " (opcional)")), help && /*#__PURE__*/React.createElement("div", {
    id: helpId,
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.5,
      color: "var(--color-gray, #5B646E)"
    }
  }, help), React.isValidElement(children) ? React.cloneElement(children, {
    id,
    "aria-describedby": [helpId, errId].filter(Boolean).join(" ") || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-required": required || undefined,
    "data-error": error ? "true" : undefined
  }) : children, error && /*#__PURE__*/React.createElement("div", {
    id: errId,
    role: "alert",
    style: {
      display: "flex",
      gap: 6,
      alignItems: "flex-start",
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.5,
      color: "var(--text-error, #B4472F)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "triangle-alert",
    size: 18,
    style: {
      marginTop: 1
    }
  }), error));
}
const CONTROL_CSS = `.conecta-control{width:100%;min-height:48px;padding:0 14px;background:var(--color-white,#fff);border:1px solid var(--border-control,#78828E);border-radius:var(--radius-md,8px);font-family:var(--font-sans,sans-serif);font-size:var(--text-body,17px);color:var(--color-ink,#14181D);transition:border-color var(--dur-fast,150ms) var(--ease-out,ease)}
.conecta-control::placeholder{color:var(--color-gray,#5B646E)}
.conecta-control:hover:not(:disabled){border-color:var(--color-blue,#12489E)}
.conecta-control:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-color:var(--color-blue,#12489E)}
.conecta-control[data-error=true]{border-width:2px;border-color:var(--border-error,#B4472F)}
.conecta-control:disabled{background:#F5F7FA;border-color:var(--color-line,#E2E7EE);color:var(--color-gray,#5B646E);cursor:not-allowed}
textarea.conecta-control{min-height:120px;padding:12px 14px;line-height:1.6;resize:vertical}
select.conecta-control{appearance:none;padding-right:44px;background-image:url("https://unpkg.com/lucide-static@latest/icons/chevron-down.svg");background-repeat:no-repeat;background-position:right 14px center;background-size:20px}`;
Object.assign(__ds_scope, { Field, CONTROL_CSS });
