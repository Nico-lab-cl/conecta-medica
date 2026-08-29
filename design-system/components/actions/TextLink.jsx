function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Enlace en texto corrido: siempre subrayado, nunca solo color. */
function TextLink({
  href = "#",
  external = false,
  arrow = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: "conecta-link",
    target: external ? "_blank" : undefined,
    rel: external ? "noopener noreferrer" : undefined,
    style: {
      color: "var(--text-link, #12489E)",
      textDecoration: "underline",
      textDecorationThickness: "1px",
      textUnderlineOffset: "3px",
      fontWeight: 500,
      transition: "color var(--dur-fast, 150ms) var(--ease-out, ease)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, `.conecta-link:hover{color:var(--text-link-hover,#0A2B5E);text-decoration-thickness:2px}.conecta-link:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-radius:2px}`), children, arrow && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16,
    style: {
      marginLeft: 4,
      verticalAlign: "-2px"
    }
  }), external && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "external-link",
    size: 14,
    style: {
      marginLeft: 4,
      verticalAlign: "-1px"
    }
  }));
}
Object.assign(__ds_scope, { TextLink });
