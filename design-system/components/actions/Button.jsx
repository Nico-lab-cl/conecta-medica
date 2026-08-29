function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 40,
    padding: "0 16px",
    font: "var(--text-body-sm, 15px)",
    icon: 18,
    gap: 8
  },
  md: {
    height: 48,
    padding: "0 20px",
    font: "var(--text-body, 17px)",
    icon: 20,
    gap: 8
  },
  lg: {
    height: 56,
    padding: "0 28px",
    font: "var(--text-body-lg, 18px)",
    icon: 22,
    gap: 10
  }
};
function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  loading = false,
  disabled = false,
  fullWidth = false,
  as = "button",
  children,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const isText = variant === "text";
  const off = disabled || loading;
  const skin = {
    primary: {
      background: off ? "var(--action-disabled-bg, #E2E7EE)" : "var(--action-primary-bg, #12489E)",
      color: off ? "var(--action-disabled-fg, #5B646E)" : "var(--action-primary-fg, #fff)",
      border: "1px solid transparent"
    },
    secondary: {
      background: "transparent",
      color: off ? "var(--action-disabled-fg, #5B646E)" : "var(--action-secondary-fg, #12489E)",
      border: `1px solid ${off ? "var(--color-line, #E2E7EE)" : "var(--color-blue, #12489E)"}`
    },
    text: {
      background: "transparent",
      color: off ? "var(--action-disabled-fg, #5B646E)" : "var(--color-blue, #12489E)",
      border: "1px solid transparent",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      textDecorationThickness: "1px"
    }
  }[variant];
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: as === "button" ? off : undefined,
    "aria-busy": loading || undefined,
    "data-variant": variant,
    className: "conecta-btn",
    style: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      minHeight: s.height,
      minWidth: 44,
      padding: isText ? "0 2px" : s.padding,
      borderRadius: isText ? "var(--radius-sm, 4px)" : "var(--radius-md, 8px)",
      fontFamily: "var(--font-sans, sans-serif)",
      fontSize: s.font,
      fontWeight: 600,
      lineHeight: 1,
      cursor: off ? "not-allowed" : "pointer",
      textDecorationColor: "currentColor",
      transition: "background-color var(--dur-fast, 150ms) var(--ease-out, ease), color var(--dur-fast, 150ms) var(--ease-out, ease), border-color var(--dur-fast, 150ms) var(--ease-out, ease)",
      ...skin,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, `.conecta-btn{-webkit-tap-highlight-color:transparent}
.conecta-btn:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px}
.conecta-btn[data-variant=primary]:hover:not(:disabled){background:var(--action-primary-bg-hover,#0A2B5E)}
.conecta-btn[data-variant=primary]:active:not(:disabled){background:#08214A}
.conecta-btn[data-variant=secondary]:hover:not(:disabled){background:var(--surface-alt,#EDF3FC)}
.conecta-btn[data-variant=secondary]:active:not(:disabled){background:#DCE8F9}
.conecta-btn[data-variant=text]:hover:not(:disabled){color:var(--color-blue-deep,#0A2B5E)}
@keyframes conecta-spin{to{transform:rotate(360deg)}}`), loading && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.icon,
      height: s.icon,
      borderRadius: 999,
      border: "2px solid currentColor",
      borderTopColor: "transparent",
      animation: "conecta-spin 700ms linear infinite",
      flexShrink: 0
    }
  }), !loading && icon && iconPosition === "left" && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }), /*#__PURE__*/React.createElement("span", null, children), !loading && icon && iconPosition === "right" && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }));
}
Object.assign(__ds_scope, { Button });
