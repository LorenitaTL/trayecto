"use client";

import { useState } from "react";

const INITIAL_FORM = {
  name: "",
  age: "",
  programUnderstanding: "",

  paymentCapacity: "",
  priceBarrier: "",
  baseContribution: "",
  preferredAccess: "",
  valueForPayment: [],
  paymentCommitment: "",
  optionalSpecialization: "",
  individualMentoring: "",
  successFee: "",
  successFeeBarrier: "",

  unclearSection: "",
  trustElements: [],
  trustElementsOther: "",
  suggestedChange: "",
  privacyConsent: false,
};

const VALUE_OPTIONS = [
  "Diagnóstico inicial",
  "Cursos",
  "Proyectos reales",
  "Mentoría",
  "Portafolio",
  "Certificación",
  "Revisión de currículum",
  "Simulación de entrevista",
  "Acceso a oportunidades laborales",
];

const TRUST_OPTIONS = [
  "Testimonios",
  "Organizaciones aliadas",
  "Perfiles de mentores",
  "Ejemplos de proyectos",
  "Certificaciones",
  "Precios claros",
  "Aviso de privacidad",
  "Resultados de participantes",
  "Otro",
];

function RadioGroup({
  name,
  question,
  options,
  value,
  onChange,
  required = true,
}) {
  return (
    <fieldset className="validation-fieldset">
      <legend>
        {question}
        {required && <span className="required-mark"> *</span>}
      </legend>

      <div className="validation-options">
        {options.map((option) => (
          <label className="validation-option" key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(event) => onChange(event.target.value)}
              required={required}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function CheckboxGroup({
  question,
  options,
  values,
  onToggle,
  minimum,
}) {
  return (
    <fieldset className="validation-fieldset">
      <legend>
        {question} <span className="required-mark">*</span>
      </legend>

      <p className="validation-hint">
        Selecciona al menos {minimum} opciones.
      </p>

      <div className="validation-options">
        {options.map((option) => (
          <label className="validation-option" key={option}>
            <input
              type="checkbox"
              value={option}
              checked={values.includes(option)}
              onChange={() => onToggle(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function ValidationForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleArrayValue(field, value) {
    setForm((current) => {
      const currentValues = current[field];

      return {
        ...current,
        [field]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  }

  function validateForm() {
    if (!form.name.trim()) {
      return "Escribe tu nombre o seudónimo.";
    }

    if (!form.age) {
      return "Selecciona tu edad.";
    }

    if (!form.programUnderstanding.trim()) {
      return "Explica qué entendiste del programa.";
    }

    if (!form.paymentCapacity) {
      return "Indica si podrías realizar alguna aportación.";
    }

    if (!form.priceBarrier) {
      return "Indica si la aportación podría impedirte participar.";
    }

    if (!form.baseContribution) {
      return "Selecciona la aportación máxima que podrías realizar.";
    }

    if (!form.preferredAccess) {
      return "Selecciona una modalidad de acceso.";
    }

    if (form.valueForPayment.length < 3) {
      return "Selecciona al menos tres elementos que debería incluir el programa.";
    }

    if (!form.paymentCommitment) {
      return "Indica qué harías para reservar tu lugar.";
    }

    if (!form.optionalSpecialization) {
      return "Indica si pagarías por una ruta especializada.";
    }

    if (!form.individualMentoring) {
      return "Indica si pagarías por una mentoría individual.";
    }

    if (!form.successFee) {
      return "Responde la pregunta sobre la cuota de recuperación.";
    }

    if (!form.successFeeBarrier) {
      return "Indica si la cuota sería un impedimento.";
    }

    if (!form.unclearSection.trim()) {
      return 'Indica qué parte no quedó clara o escribe "Todo quedó claro".';
    }

    if (form.trustElements.length < 5) {
      return "Selecciona al menos cinco elementos de confianza.";
    }

    if (
      form.trustElements.includes("Otro") &&
      !form.trustElementsOther.trim()
    ) {
      return "Especifica el otro elemento de confianza.";
    }

    if (!form.privacyConsent) {
      return "Debes aceptar el uso anónimo de las respuestas.";
    }

    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source: "trayecto-validation-form",
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "request_failed");
      }

      setForm(INITIAL_FORM);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        "No pudimos enviar tu respuesta. Revisa tu conexión e inténtalo nuevamente."
      );
    }
  }

if (status === "success") {
  return (
    <div className="validation-success">
      <div className="validation-stamp">✓</div>

      <h3>Gracias por participar</h3>

      <p>
        Tu respuesta fue registrada correctamente y será utilizada de forma
        anónima para mejorar Trayecto.
      </p>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setStatus("idle")}
      >
        Enviar otra respuesta
      </button>
    </div>
  );
}

  return (
    <form className="validation-form" onSubmit={handleSubmit} noValidate>
      <div className="validation-block">
        <h3>Sección 1. Perfil y comprensión</h3>

        <label className="validation-label" htmlFor="validation-name">
          ¿Cuál es tu nombre? <span className="required-mark">*</span>
        </label>

        <input
          id="validation-name"
          className="validation-control"
          type="text"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          maxLength={100}
          required
        />

        <RadioGroup
          name="age"
          question="¿Cuál es tu edad?"
          options={["18", "19", "20", "21", "22", "23", "24", "25"]}
          value={form.age}
          onChange={(value) => updateField("age", value)}
        />

        <label
          className="validation-label"
          htmlFor="program-understanding"
        >
          Después de revisar la página, ¿cómo explicarías con tus propias
          palabras qué ofrece el programa?{" "}
          <span className="required-mark">*</span>
        </label>

        <textarea
          id="program-understanding"
          className="validation-control validation-textarea"
          value={form.programUnderstanding}
          onChange={(event) =>
            updateField("programUnderstanding", event.target.value)
          }
          rows={5}
          maxLength={500}
          required
        />
      </div>

      <div className="validation-block">
        <h3>Sección 2. Intención de compra</h3>

        <div className="validation-notice">
          <strong>Aclaración:</strong> no se te pedirá ningún método de pago
          ni datos bancarios. Solo queremos conocer qué opción elegirías si
          el programa estuviera disponible.
        </div>

        <RadioGroup
          name="paymentCapacity"
          question="Considerando tu situación actual, ¿podrías realizar alguna aportación para participar en el programa completo?"
          options={[
            "Sí",
            "Tal vez, dependiendo de lo que incluya",
            "Solo con una beca parcial",
            "Solo con una beca completa",
            "No",
          ]}
          value={form.paymentCapacity}
          onChange={(value) => updateField("paymentCapacity", value)}
        />

        <RadioGroup
          name="priceBarrier"
          question="¿La aportación económica podría impedirte participar?"
          options={["Sí", "No", "Tal vez"]}
          value={form.priceBarrier}
          onChange={(value) => updateField("priceBarrier", value)}
        />

        <RadioGroup
          name="baseContribution"
          question="¿Cuál sería la aportación máxima que realmente podrías realizar por el programa completo?"
          options={[
            "$0 MXN",
            "$49 MXN",
            "$99 MXN",
            "$149 MXN",
            "$199 MXN",
            "Más de $199 MXN",
          ]}
          value={form.baseContribution}
          onChange={(value) => updateField("baseContribution", value)}
        />

        <RadioGroup
          name="preferredAccess"
          question="En caso de que requieras apoyo, ¿qué modalidad de acceso elegirías?"
          options={[
            "Beca completa",
            "Beca parcial más una aportación",
            "Cuota única de recuperación",
            "Pago en parcialidades",
          ]}
          value={form.preferredAccess}
          onChange={(value) => updateField("preferredAccess", value)}
        />

        <CheckboxGroup
          question="¿Qué tendría que incluir el programa para justificar esa aportación?"
          options={VALUE_OPTIONS}
          values={form.valueForPayment}
          onToggle={(value) =>
            toggleArrayValue("valueForPayment", value)
          }
          minimum={3}
        />

        <RadioGroup
          name="paymentCommitment"
          question="Si hoy pudieras reservar tu lugar sin realizar , ¿Què elección tomarías?"
          options={[
            "Reservaría con la cuota seleccionada",
            "Solicitaría una beca",
            "Pediría más información",
            "No reservaría",
          ]}
          value={form.paymentCommitment}
          onChange={(value) => updateField("paymentCommitment", value)}
        />

        <RadioGroup
          name="optionalSpecialization"
          question="Si tuvieras oportunidad de tomar algún curso avanzado en especial ¿Estarías dispuesto a participar?"
          options={[
            "Sí",
            "No",
            "Tal vez",
          ]}
          value={form.optionalSpecialization}
          onChange={(value) =>
            updateField("optionalSpecialization", value)
          }
        />

        <RadioGroup
          name="individualMentoring"
          question="¿Pagarías por una sesión individual adicional de mentoría?"
          options={[
            "Sí, hasta $49 MXN",
            "Sí, hasta $79 MXN",
            "Sí, hasta $99 MXN",
            "Solo con beca",
            "No",
          ]}
          value={form.individualMentoring}
          onChange={(value) =>
            updateField("individualMentoring", value)
          }
        />

        <RadioGroup
          name="successFee"
          question="¿Pagarías una cuota de recuperación de $499 MXN al terminar el programa y encontrar trabajo con el primer pago de tu empleo?"
          options={["Sí", "No", "Tal vez"]}
          value={form.successFee}
          onChange={(value) => updateField("successFee", value)}
        />

        <RadioGroup
          name="successFeeBarrier"
          question="¿El pago de la cuota de recuperación sería un impedimento para registrarte en el programa?"
          options={["Sí", "No", "Tal vez"]}
          value={form.successFeeBarrier}
          onChange={(value) =>
            updateField("successFeeBarrier", value)
          }
        />
      </div>

      <div className="validation-block">
        <h3>Sección 3. Retroalimentación</h3>

        <label className="validation-label" htmlFor="unclear-section">
          ¿Qué parte de la página no quedó clara? Si todo fue claro, puedes
          escribir “Todo quedó claro”.{" "}
          <span className="required-mark">*</span>
        </label>

        <textarea
          id="unclear-section"
          className="validation-control validation-textarea"
          value={form.unclearSection}
          onChange={(event) =>
            updateField("unclearSection", event.target.value)
          }
          rows={4}
          maxLength={500}
          required
        />

        <CheckboxGroup
          question="¿Qué te generaría mayor confianza para participar en el programa, en caso de que fuera real?"
          options={TRUST_OPTIONS}
          values={form.trustElements}
          onToggle={(value) =>
            toggleArrayValue("trustElements", value)
          }
          minimum={5}
        />

        {form.trustElements.includes("Otro") && (
          <>
            <label
              className="validation-label"
              htmlFor="trust-other"
            >
              Especifica otro elemento de confianza{" "}
              <span className="required-mark">*</span>
            </label>

            <input
              id="trust-other"
              className="validation-control"
              type="text"
              value={form.trustElementsOther}
              onChange={(event) =>
                updateField("trustElementsOther", event.target.value)
              }
              maxLength={150}
            />
          </>
        )}

        <label className="validation-label" htmlFor="suggested-change">
          ¿Qué cambiarías del programa o de la página?
        </label>

        <textarea
          id="suggested-change"
          className="validation-control validation-textarea"
          value={form.suggestedChange}
          onChange={(event) =>
            updateField("suggestedChange", event.target.value)
          }
          rows={4}
          maxLength={500}
        />

        <label className="validation-consent">
          <input
            type="checkbox"
            checked={form.privacyConsent}
            onChange={(event) =>
              updateField("privacyConsent", event.target.checked)
            }
            required
          />

          <span>
            Acepto que mis respuestas sean utilizadas de forma anónima para
            fines académicos. <span className="required-mark">*</span>
          </span>
        </label>
      </div>

      {errorMessage && (
        <div className="form-msg err" role="alert">
          {errorMessage}
        </div>
      )}

      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={status === "loading"}
      >
        {status === "loading"
          ? "Enviando…"
          : "Enviar respuestas"}
      </button>
    </form>
  );
}