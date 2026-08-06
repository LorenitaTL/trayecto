"use client";

import { useState } from "react";
import ValidationForm from "./components/ValidationForm";

const STATIONS = [
  {
    code: "T-01",
    title: "Diagnóstico",
    text: "Antes de empezar, identificamos tu punto de partida — qué sabes hacer, qué te falta y qué buscas — para armar tu ruta.",
  },
  {
    code: "T-02",
    title: "Formación",
    text: "Módulos digitales flexibles en habilidades digitales, habilidades blandas e inteligencia artificial, pensados para verse desde tu celular.",
  },
  {
    code: "T-03",
    title: "Práctica",
    text: "Proyectos y retos con organizaciones reales, no ejercicios aislados. Aquí es donde se construye la experiencia que hoy te falta.",
  },
  {
    code: "T-04",
    title: "Mentoría",
    text: "Acompañamiento grupal constante, con momentos de orientación individual en los puntos donde más se necesita.",
  },
  {
    code: "T-05",
    title: "Evaluación",
    text: "Retroalimentación de instructores sobre lo que entregas, con rúbricas claras — no solo exámenes de opción múltiple.",
  },
  {
    code: "T-06",
    title: "Evidencia",
    text: "Un portafolio digital y certificaciones que respaldan lo que realmente sabes hacer, no solo lo que tomaste.",
  },
  {
    code: "T-07",
    title: "Preparación profesional",
    text: "Currículum, perfil y simulación de entrevistas — con retroalimentación directa, no una plantilla genérica.",
  },
  {
    code: "T-08",
    title: "Vinculación",
    text: "Bolsa de trabajo y convenios con organizaciones aliadas para prácticas y vacantes de nivel inicial.",
  },
  {
    code: "T-09",
    title: "Seguimiento",
    text: "El acompañamiento no termina al egresar: seguimos contigo en postulaciones, entrevistas y tus primeros meses de trabajo.",
    isLast: true,
  },
];

const BARS = [
  { code: "RT5", label: "Acompañamiento personalizado", value: 16.7 },
  { code: "RT8", label: "Seguimiento, evaluación y retroalimentación", value: 16.56 },
  { code: "RT2", label: "Aprendizaje práctico y basado en proyectos", value: 14.83 },
  { code: "RT1", label: "Alineación con el mercado laboral", value: 12.42 },
  { code: "RT4", label: "Preparación del perfil y proceso de selección", value: 11.87 },
  { code: "RT6", label: "Vinculación con oportunidades laborales", value: 10.74 },
  { code: "RT3", label: "Evidencias verificables de competencia", value: 10.53 },
  { code: "RT7", label: "Accesibilidad y flexibilidad", value: 6.36 },
];

const CONCEPTS = [
  { code: "C-1", name: "Plataforma digital autónoma", score: "8.00", selected: false },
  {
    code: "C-2",
    name: "Programa híbrido de formación y mentoría",
    score: "8.25",
    selected: true,
  },
  {
    code: "C-3",
    name: "Centro comunitario de vinculación",
    score: "8.29",
    selected: false,
  },
];

const SCHEDULE_OPTS = [
  "Entre semana, mañana",
  "Entre semana, tarde",
  "Entre semana, noche",
  "Fines de semana",
];

const OCCUPATION_OPTS = [
  "Estudiante",
  "Trabajo formal",
  "Trabajo informal",
  "Buscando empleo",
  "Otro",
];

function Nav() {
  return (
    <header className='nav'>
      <div className='wrap'>
        <a href='#top' className='brand'>
          TRAYECTO <span>PROGRAMA PILOTO</span>
        </a>
        <nav className='nav-links'>
          <a href='#trayecto'>El trayecto</a>
          <a href='#incluye'>Qué incluye</a>
          <a href='#validacion'>Validación</a>
          <a href='#preguntas'>Preguntas</a>
        </nav>
        {/* <a href='#boleto' className='btn btn-primary'> */}
        <a href='#preguntas' className='btn btn-primary'>          
          Reservar mi lugar
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className='hero' id='top'>
      <div className='wrap'>
        <div>
          <p className='eyebrow'>Programa piloto · validación en curso</p>
          <h1>
            De tomar un curso a <em>demostrar</em> que sabes hacerlo.
          </h1>
          <p className='hero-sub'>
            Trayecto es un programa híbrido para jóvenes de 18 a 25 años: formación
            práctica, proyectos con organizaciones reales, mentoría y una ruta clara hacia
            tu primer empleo formal — no un curso más que se queda en el diploma.
          </p>
          <div className='hero-actions'>
            {/* <a href='#boleto' className='btn btn-primary'> */}
            <a href='#preguntas' className='btn btn-primary'>              
              Reservar mi lugar
            </a>
            <a href='#trayecto' className='btn btn-ghost'>
              Ver cómo funciona
            </a>
          </div>
          <p className='hero-note'>
            Estamos formando la primera generación y ajustando el programa con
            retroalimentación real antes de construirlo por completo.
          </p>
        </div>
        <div className='hero-visual'>
          <div className='hero-line'>
            <div className='hero-stop'>
              T-01 → T-07
              <strong>Formación, práctica, mentoría y evidencia</strong>
            </div>
            <div className='hero-stop'>
              T-08
              <strong>Vinculación con organizaciones aliadas</strong>
            </div>
            <div className='hero-stop is-end'>
              T-09
              <strong>Tu primera oportunidad laboral</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problema() {
  return (
    <section className='section' id='problema'>
      <div className='wrap'>
        <div className='section-head'>
          <p className='eyebrow'>Estación 00 · Por qué existe Trayecto</p>
          <h2>La capacitación no es lo que más te falta.</h2>
          <p>
            En el cuestionario que aplicamos a jóvenes de tu edad, la falta de experiencia
            fue el obstáculo mencionado con más frecuencia para conseguir trabajo — más
            que la falta de cursos o conocimientos.
          </p>
        </div>
        <div className='stat-grid'>
          <div className='stat'>
            <b>8.0/10</b>
            <span>
              Importancia que los jóvenes le dan a "conseguir empleo" — la necesidad mejor
              calificada.
            </span>
          </div>
          <div className='stat'>
            <b>7.6/10</b>
            <span>Importancia de tener acceso a mentorías durante el proceso.</span>
          </div>
          <div className='stat'>
            <b>7.5/10</b>
            <span>Importancia de prepararse para entrevistas de trabajo.</span>
          </div>
          <div className='stat'>
            <b>9</b>
            <span>
              Necesidades distintas identificadas — casi todas con una importancia igual
              de alta.
            </span>
          </div>
        </div>
        <p className='problema-note'>
          Las diferencias entre necesidades fueron pequeñas: la empleabilidad no depende
          de una sola cosa. Por eso Trayecto no es solo un curso — es una ruta completa.
        </p>
      </div>
    </section>
  );
}

function TrayectoRoute() {
  return (
    <section className='section route-section' id='trayecto'>
      <div className='wrap'>
        <div className='section-head'>
          <p className='eyebrow'>Estaciones 01–09</p>
          <h2>El trayecto completo, no solo el curso.</h2>
          <p>
            Nueve etapas conectadas. Cada una existe porque, sola, la anterior no era
            suficiente para conseguir empleo.
          </p>
        </div>
        <div className='stations'>
          {STATIONS.map((s) => (
            <div className={`station${s.isLast ? " is-last" : ""}`} key={s.code}>
              <span className='code'>{s.code}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Incluye() {
  return (
    <section className='section' id='incluye'>
      <div className='wrap'>
        <div className='section-head'>
          <p className='eyebrow'>Qué incluye</p>
          <h2>Priorizado con datos, no con intuición.</h2>
          <p>
            Cruzamos las necesidades de los jóvenes encuestados con los requerimientos
            técnicos de la solución. Así fue como quedó ordenado por prioridad.
          </p>
        </div>
        <div className='bars'>
          {BARS.map((b) => (
            <div className='bar-row' key={b.code}>
              <div className='bar-label'>
                {b.label}
                <small>{b.code}</small>
              </div>
              <div className='bar-track'>
                <div
                  className='bar-fill'
                  style={{ width: `${(b.value / 16.7) * 100}%` }}
                />
              </div>
              <div className='bar-value'>{b.value.toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Diferenciadores() {
  return (
    <section className='section' id='diferenciadores'>
      <div className='wrap'>
        <div className='section-head'>
          <p className='eyebrow'>Diferenciadores</p>
          <h2>No elegimos entre digital o presencial.</h2>
        </div>
        <div className='diff-grid'>
          <div className='diff-card is-not'>
            <h4>Solo una plataforma de cursos</h4>
            <p>
              Sin práctica real ni acompañamiento, un certificado no alcanza para
              convencer a un empleador.
            </p>
          </div>
          <div className='diff-card is-not'>
            <h4>Solo un centro presencial</h4>
            <p>
              Requiere trasladarte y ajustar tu horario — una barrera real para quien ya
              trabaja o estudia.
            </p>
          </div>
          <div className='diff-card is-result'>
            <h4>Un trayecto híbrido</h4>
            <p>
              Formación flexible desde tu celular, combinada con proyectos, mentoría y
              vinculación reales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Validacion() {
  return (
    <section className='section' id='validacion'>
      <div className='wrap'>
        <div className='section-head'>
          <p className='eyebrow'>Así llegamos aquí</p>
          <h2>Validado con los jóvenes antes de construirlo.</h2>
          <p>
            Presentamos tres versiones de este programa a un grupo de jóvenes del público
            objetivo y les pedimos calificar cada una frente a sus propias necesidades.
          </p>
        </div>
        <div className='concepts'>
          {CONCEPTS.map((c) => (
            <div
              className={`concept-card${c.selected ? " is-selected" : ""}`}
              key={c.code}
            >
              <span className='code'>{c.code}</span>
              <h4>{c.name}</h4>
              <div className='concept-score'>
                {c.score} <small>/ 10</small>
              </div>
              {c.selected && (
                <span className='tag-selected'>Elegido como base de Trayecto</span>
              )}
            </div>
          ))}
        </div>
        <p className='problema-note'>
          El centro comunitario obtuvo el puntaje más alto por 0.04 puntos, pero al elegir
          directamente, 3 de 7 participantes prefirieron el programa híbrido y otros 3
          pidieron combinar características de ambos. Por eso Trayecto toma el híbrido
          como base y suma el diagnóstico inicial, la mentoría individual y las prácticas
          supervisadas del concepto comunitario.
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "¿Necesito computadora o buen internet?",
      a: "Trayecto está pensado para funcionar también desde celular. Estamos confirmando qué actividades necesitan conexión constante y cuáles no.",
    },
    {
      q: "¿Cuánto cuesta participar?",
      a: "Todavía estamos validando las cuotas, becas y modalidades de acceso de la primera generación.",
    },
    {
      q: "¿Tengo que ir a algún lugar físico?",
      a: "No necesariamente. La formación será principalmente digital y algunas sesiones podrán ser virtuales o presenciales.",
    },
    {
      q: "No tengo experiencia laboral. ¿Aun así puedo entrar?",
      a: "Sí. El programa está dirigido especialmente a jóvenes que buscan adquirir y demostrar su primera experiencia.",
    },
    {
      q: "¿Me garantizan un empleo al terminar?",
      a: "No se garantiza una contratación. Trayecto busca mejorar las habilidades, evidencias y preparación de los participantes para acercarlos a oportunidades laborales.",
    },
  ];

  return (
    <section className="section" id="preguntas">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Antes de reservar tu lugar</p>
          <h2>Preguntas frecuentes</h2>
        </div>

        <div className="faq">
          {items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p className="faq-a">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="section-head validation-heading">
          <p className="eyebrow">Validación del programa</p>

          <h2>Ayúdanos a mejorar Trayecto</h2>

          <p>
            Responde las siguientes preguntas después de revisar la propuesta.
            No se realizará ningún cobro ni se solicitarán datos bancarios.
          </p>
        </div>

        <ValidationForm />
      </div>
    </section>
  );
}

function Boleto() {
  const [status, setStatus] = useState("idle"); // idle | loading | ok | err
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.target;
    const data = new FormData(form);

    const schedule = SCHEDULE_OPTS.filter((opt) => data.get(`schedule_${opt}`));

    const payload = {
      name: data.get("name"),
      age: data.get("age"),
      contact: data.get("contact"),
      occupation: data.get("occupation"),
      schedule,
      intent: data.get("intent"),
      comment: data.get("comment"),
      source: "trayecto-landing",
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("err");
      setErrorMsg(
        "No pudimos enviar tu reserva. Revisa tu conexión e inténtalo de nuevo.",
      );
    }
  }

  return (
    <section className='section boleto-section' id='boleto'>
      <div className='wrap'>
        <div
          className='section-head'
          style={{ margin: "0 auto 40px", textAlign: "center", maxWidth: 560 }}
        >
          <p className='eyebrow' style={{ justifyContent: "center" }}>
            Destino final
          </p>
          <h2>Aparta tu lugar en la primera generación</h2>
          <p>
            Estamos decidiendo qué construir primero. Tu respuesta cuenta directamente
            para esa decisión.
          </p>
        </div>

        <div className='boleto'>
          {status === "ok" ? (
            <div className='success'>
              <div className='stamp'>✓</div>
              <h3>Tu lugar quedó reservado</h3>
              <p>
                Gracias por tomarte el tiempo. Te contactaremos por el medio que dejaste
                en cuanto tengamos noticias de la primera generación.
              </p>
            </div>
          ) : (
            <>
              <div className='boleto-top'>
                <p className='eyebrow'>Boleto · primera generación</p>
                <h3>Cuéntanos de ti</h3>
                <p>Toma menos de dos minutos.</p>
              </div>
              <div className='perforation' />
              <form className='boleto-form' onSubmit={handleSubmit}>
                <div className='field-row'>
                  <div className='field'>
                    <label htmlFor='name'>Nombre completo</label>
                    <input id='name' name='name' type='text' required />
                  </div>
                  <div className='field'>
                    <label htmlFor='age'>Edad</label>
                    <input id='age' name='age' type='number' min='18' max='25' required />
                  </div>
                </div>

                <div className='field'>
                  <label htmlFor='contact'>Correo electronico</label>
                  <input
                    id='contact'
                    name='contact'
                    type='text'
                    required
                    placeholder='tu@correo.com'
                  />
                </div>

                <div className='field'>
                  <label htmlFor='occupation'>Situación actual</label>
                  <select id='occupation' name='occupation' required defaultValue=''>
                    <option value='' disabled>
                      Selecciona una opción
                    </option>
                    {OCCUPATION_OPTS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='field'>
                  <label>
                    Disponibilidad de horario{" "}
                    <span className='hint'>(elige todas las que apliquen)</span>
                  </label>
                  <div className='check-grid'>
                    {SCHEDULE_OPTS.map((opt) => (
                      <label className='check-pill' key={opt}>
                        <input type='checkbox' name={`schedule_${opt}`} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className='field'>
                  <label>
                    Del 1 al 10, ¿qué tan probable es que te inscribas a la primera
                    generación?
                  </label>
                  <div className='scale-grid'>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <label className='scale-opt' key={n}>
                        <input type='radio' name='intent' value={n} required />
                        {n}
                      </label>
                    ))}
                  </div>
                  <div className='scale-caption'>
                    <span>Nada probable</span>
                    <span>Muy probable</span>
                  </div>
                </div>

                <div className='field'>
                  <label htmlFor='comment'>
                    ¿Qué te haría decir que sí sin dudarlo?{" "}
                    <span className='hint'>(opcional)</span>
                  </label>
                  <textarea id='comment' name='comment' />
                </div>

                <label className='consent'>
                  <input type='checkbox' required />
                  Acepto que me contacten sobre la primera generación de Trayecto usando
                  los datos de este formulario.
                </label>

                {status === "err" && <div className='form-msg err'>{errorMsg}</div>}

                <button
                  className='btn btn-primary btn-block'
                  type='submit'
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Enviando…" : "Reservar mi lugar"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className='wrap'>
        <span>Trayecto — prototipo de validación, no un servicio operativo todavía.</span>
        <span>Equipo 5 · Tecnológico de Estudios Superiores de Monterrey</span>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Problema />
      <TrayectoRoute />
      <Incluye />
      <Diferenciadores />
      <Validacion />
      <FAQ />
      {/* <Boleto /> */}
      <Footer />
    </>
  );
}
