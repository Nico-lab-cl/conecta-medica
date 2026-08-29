function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LUCIDE = "https://unpkg.com/lucide-static@latest/icons/";
const SIMPLE = "https://unpkg.com/simple-icons@latest/icons/";

/* Ícono monocromo. El SVG llega como máscara CSS, así que hereda el color
   del texto y nunca se ve como una imagen pegada. */
function Icon({
  name,
  size = 20,
  color = "currentColor",
  set = "lucide",
  style,
  ...rest
}) {
  const url = (set === "simple" ? SIMPLE : LUCIDE) + name + ".svg";
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flexShrink: 0,
      background: color,
      WebkitMaskImage: `url(${url})`,
      maskImage: `url(${url})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
