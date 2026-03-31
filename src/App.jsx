import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealedElements = document.querySelectorAll('.reveal');
    revealedElements.forEach(el => observer.observe(el));

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('rodrigoalarconcuellar@hotmail.com');
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const projects = [
    {
      title: "Sistema de Gestión Comercial",
      description: "Sistema para tiendas tecnológicas con administración de inventario, ventas y clientes. Integración MySQL/PostgreSQL.",
      tag: ".NET | SQL | C#",
      date: "2024"
    },
    {
      title: "Modelo Financiero",
      description: "Modelo de negocio estándar desarrollado para análisis de proyecciones financieras.",
      tag: "JavaScript | Finance",
      link: "https://github.com/Rodrigo-Silva-Alarcon/Modelo-Financiero"
    },
    {
      title: "Infometa V2",
      description: "Proyecto avanzado de gestión de información y personalización de datos.",
      tag: "C# | .NET",
      link: "https://github.com/Rodrigo-Silva-Alarcon/InfometaV2"
    },
    {
      title: "Surazo Digital",
      description: "Desarrollo de página web profesional para consultoría y servicios empresariales.",
      tag: "Web Design | React",
      link: "https://surazodigital.com"
    }
  ];

  const timeline = [
    { year: "2024", title: "Ingeniería en Sistemas", detail: "Graduación en la UTEPSA, Santa Cruz de la Sierra." },
    { year: "2024", title: "Sistema de Gestión Comercial", detail: "Lanzamiento y desarrollo con .NET y SQL." },
    { year: "2025", title: "Surazo Digital", detail: "Especialización en desarrollo web y consultoría digital." },
    { year: "2026", title: "Integración con IA", detail: "Foco en IA generativa y automatización de procesos de software." }
  ];

  const skills = {
    backend: ["C#", ".NET", "PHP", "APIs REST"],
    frontend: ["JavaScript", "React", "HTML5", "CSS3/Vanilla"],
    database: ["PostgreSQL", "MySQL", "SQL Server"],
    ai: ["Integración con IA", "ChatBots", "Vibe Coding"]
  };

  return (
    <div className="portfolio-app">
      {/* Navigation */}
      <nav className={`header glass ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo-text gradient-text magnetic">RSA</div>
          <div className="nav-links">
            <a href="#about">Sobre Mí</a>
            <a href="#timeline">Trayectoria</a>
            <a href="#skills">Habilidades</a>
            <a href="#projects">Proyectos</a>
            <a href="#contact" className="btn-primary-sm btn-ripple">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section fade-in">
        <div className="hero-content">
          <h1 className="hero-name">Rodrigo <span className="gradient-text">Silva Alarcón</span></h1>
          <h2 className="hero-title">Desarrollador Full Stack Junior</h2>
          <p className="hero-subtitle">Especializado en .NET, SQL e Integración de Soluciones con Inteligencia Artificial.</p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary btn-ripple">Ver Proyectos</a>
            <button onClick={copyEmail} className={`btn-outline btn-ripple ${copyFeedback ? 'copied' : ''}`}>
              {copyFeedback ? '¡Copiado!' : 'rodrigoalarconcuellar@hotmail.com'}
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="glass card about-card reveal">
          <h3>Resumen Profesional</h3>
          <p>Ingeniero en Sistemas de la UTEPSA con enfoque analítico para la resolución de problemas. Experiencia en el desarrollo de sistemas de gestión y aplicaciones web escalables. Apasionado por optimizar el desarrollo de software mediante el uso de IA y nuevas tecnologías.</p>
        </div>
      </section>

      {/* Timeline Section (Trazabilidad) */}
      <section id="timeline" className="timeline-section">
        <h2 className="section-title reveal">Mi <span className="gradient-text">Trayectoria</span></h2>
        <div className="timeline-container">
          {timeline.map((item, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} reveal`}>
              <div className="timeline-content magnetic">
                <span className="timeline-year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <h2 className="section-title reveal">Habilidades <span className="gradient-text">Técnicas</span></h2>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="glass skill-card reveal magnetic">
              <h4 className="skill-category">{category.toUpperCase()}</h4>
              <ul className="skill-list">
                {items.map(skill => <li key={skill}>{skill}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <h2 className="section-title reveal">Proyectos <span className="gradient-text">Destacados</span></h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="glass project-card reveal magnetic" style={{transitionDelay: `${index * 0.1}s`}}>
              <span className="project-tag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.link && (
                <a href={project.link} target="_blank" className="project-link btn-ripple">
                  Explorar Repo →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="contact-section reveal">
        <div className="contact-container">
          <h2 className="section-title">¿Listo para <span className="gradient-text">Colaborar?</span></h2>
          <p>Hablemos sobre cómo puedo aportar valor a tu equipo.</p>
          <div className="contact-links">
            <a href="mailto:rodrigoalarconcuellar@hotmail.com" className="contact-item btn-ripple magnetic">Hablemos</a>
            <a href="https://linkedin.com/in/rodrigo-silva-alarcón-b45863338" target="_blank" className="contact-item btn-ripple magnetic">LinkedIn</a>
            <a href="https://github.com/Rodrigo-Silva-Alarcon" className="contact-item btn-ripple magnetic">GitHub</a>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Rodrigo Silva Alarcón. Hecho con ✨ y React.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
