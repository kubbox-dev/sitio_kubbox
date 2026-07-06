export default function TrajectorySection() {
  const left = [
    {
      id: 1,
      title: "Más de 18 años de experiencia",
      icon: "/images/Nosotros/18 años de experiencia.svg",
    },
    {
      id: 2,
      title: "Clientes en varios países",
      icon: "/images/Nosotros/varios países.svg",
    },
    {
      id: 3,
      title: "Equipo interdisciplinario",
      icon: "/images/Nosotros/equipo especializado.svg",
    },
    {
      id: 4,
      title: "Desarrollo personalizado",
      icon: "/images/Nosotros/desarrollo personalizado.svg",
    },
    {
      id: 5,
      title: "Metodologías ágiles",
      icon: "/images/Nosotros/metodologías ágiles.svg",
    },
  ];

  const right = [
    {
      id: 6,
      title: "Acompañamiento permanente",
      icon: "/images/Nosotros/acompañamiento permanente.svg",
    },
    {
      id: 7,
      title: "Soluciones escalables",
      icon: "/images/Nosotros/soluciones escalables.svg",
    },
    {
      id: 8,
      title: "Servicio consultivo",
      icon: "/images/Nosotros/servicio cercano.svg",
    },
    {
      id: 9,
      title: "Compromiso con la innovación",
      icon: "/images/Nosotros/compromiso con la innovación.svg",
    },
    {
      id: 10,
      title: "Orientación a resultados",
      icon: "/images/Nosotros/orientación a resultados.svg",
    },
  ];

  return (
    <section
      id="trajectory"
      style={{ paddingBlock: "clamp(3rem, 8vw, 5.5rem)" }}
    >
      <div
        style={{
          maxWidth: "var(--container)",
          marginInline: "auto",
          paddingInline: "var(--container-pad)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem,4.5vw,3rem)",
              textTransform: "uppercase",
              color: "var(--c-lime)",
              margin: 0,
            }}
          >
            DESDE 2008
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem,1.2vw,1rem)",
              color: "rgba(255,255,255,0.82)",
              maxWidth: "min(56rem,100%)",
              marginInline: "auto",
            }}
          >
            Hemos construido relaciones de largo plazo basadas en confianza,
            calidad y resultados.
          </p>
        </div>

        <div className="trajectory-grid">
          <div className="trajectory-box">
            {left.map((item) => (
              <div key={item.id} className="trajectory-item">
                <div className="trajectory-icon">
                  <img src={item.icon} alt="" />
                </div>
                <div className="trajectory-text">{item.title}</div>
              </div>
            ))}
          </div>

          <div className="trajectory-box">
            {right.map((item) => (
              <div key={item.id} className="trajectory-item">
                <div className="trajectory-icon">
                  <img src={item.icon} alt="" />
                </div>
                <div className="trajectory-text">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
