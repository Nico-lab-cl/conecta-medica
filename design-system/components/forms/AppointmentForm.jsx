const MOTIVOS = ["Hemograma alterado", "Anemia", "Plaquetas bajas o altas", "Control de tratamiento hematológico", "Interpretación de imágenes", "Otra derivación de mi médico"];
const COMUNAS = ["Ñuñoa", "Providencia", "Las Condes", "La Reina", "Macul", "Peñalolén", "Santiago Centro", "Otra comuna", "Otra región"];

/* Formulario de solicitud de hora. Sin ningún campo libre para síntomas o antecedentes. */
function AppointmentForm({
  state = "idle",
  errors = {},
  onSubmit,
  style
}) {
  const [status, setStatus] = React.useState(state);
  React.useEffect(() => setStatus(state), [state]);
  const submit = e => {
    e.preventDefault();
    if (onSubmit) return onSubmit(e);
    setStatus("loading");
    setTimeout(() => setStatus("sent"), 1200);
  };
  if (status === "sent") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 32,
        background: "var(--surface-alt, #EDF3FC)",
        borderRadius: "var(--radius-lg, 16px)",
        maxWidth: 620,
        ...style
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 32,
      color: "var(--color-blue, #12489E)"
    }), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontFamily: "var(--font-serif, serif)",
        fontWeight: 600,
        fontSize: "var(--text-h2, 30px)",
        lineHeight: 1.2,
        color: "var(--color-blue, #12489E)"
      }
    }, "Solicitud enviada"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "var(--text-body, 17px)",
        lineHeight: 1.6,
        maxWidth: "56ch"
      }
    }, "Te llamamos dentro del pr\xF3ximo d\xEDa h\xE1bil para confirmar d\xEDa y hora. Si necesitas algo antes, escr\xEDbenos por WhatsApp."), /*#__PURE__*/React.createElement(__ds_scope.WhatsAppButton, {
      variant: "inline",
      style: {
        alignSelf: "flex-start",
        marginTop: 4
      }
    }));
  }
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      maxWidth: 620,
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, __ds_scope.CONTROL_CSS), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "nombre",
    label: "Nombre y apellido",
    required: true,
    error: errors.nombre,
    style: {
      gridColumn: "span 2"
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "conecta-control",
    name: "nombre",
    autoComplete: "name"
  })), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "telefono",
    label: "Tel\xE9fono",
    help: "Lo usamos solo para confirmar tu hora.",
    required: true,
    error: errors.telefono
  }, /*#__PURE__*/React.createElement("input", {
    className: "conecta-control",
    name: "telefono",
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    placeholder: "+56 9 1234 5678"
  })), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "correo",
    label: "Correo",
    required: true,
    error: errors.correo
  }, /*#__PURE__*/React.createElement("input", {
    className: "conecta-control",
    name: "correo",
    type: "email",
    autoComplete: "email"
  })), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "comuna",
    label: "Comuna",
    required: true,
    error: errors.comuna
  }, /*#__PURE__*/React.createElement("select", {
    className: "conecta-control",
    name: "comuna",
    defaultValue: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Selecciona"), COMUNAS.map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c)))), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "modalidad",
    label: "Modalidad",
    required: true,
    error: errors.modalidad
  }, /*#__PURE__*/React.createElement("select", {
    className: "conecta-control",
    name: "modalidad",
    defaultValue: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Selecciona"), /*#__PURE__*/React.createElement("option", null, "Presencial en \xD1u\xF1oa"), /*#__PURE__*/React.createElement("option", null, "Telemedicina"))), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "motivo",
    label: "Motivo de la consulta",
    help: "Elige la opci\xF3n m\xE1s cercana. No escribas s\xEDntomas ni antecedentes ac\xE1.",
    required: true,
    error: errors.motivo,
    style: {
      gridColumn: "span 2"
    }
  }, /*#__PURE__*/React.createElement("select", {
    className: "conecta-control",
    name: "motivo",
    defaultValue: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Selecciona"), MOTIVOS.map(m => /*#__PURE__*/React.createElement("option", {
    key: m
  }, m))))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.55,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "consentimiento",
    required: true,
    style: {
      width: 22,
      height: 22,
      marginTop: 2,
      accentColor: "var(--color-blue, #12489E)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", null, "Autorizo a Cl\xEDnica Conecta a contactarme por tel\xE9fono, correo o WhatsApp para coordinar esta hora. No enviaremos publicidad.")), errors.consentimiento && /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: "flex",
      gap: 6,
      fontSize: "var(--text-body-sm, 15px)",
      color: "var(--text-error, #B4472F)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "triangle-alert",
    size: 18
  }), errors.consentimiento), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    loading: status === "loading"
  }, "Solicitar hora"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-caption, 14px)",
      color: "var(--color-gray, #5B646E)"
    }
  }, "Respondemos dentro del pr\xF3ximo d\xEDa h\xE1bil.")));
}
Object.assign(__ds_scope, { MOTIVOS, AppointmentForm });
