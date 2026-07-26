import React, { useEffect, useState } from 'react';
import './App.css';

const GITHUB_USER = 'Rodrigo-Silva-Alarcon';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}`;

const languageColors = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  HTML: '#e34c26', CSS: '#563d7c', PHP: '#4F5D95', 'C#': '#178600',
  Java: '#b07219', Ruby: '#701516', Go: '#00ADD8', Rust: '#dea584',
  Dart: '#00B4AB', Shell: '#89e051', Dockerfile: '#384d54',
  'Jupyter Notebook': '#DA5B0B', SQL: '#e38c00',
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState({ repos: 0, languages: [], stars: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reposRes, userRes] = await Promise.all([
          fetch(`${GITHUB_API}/repos?sort=updated&per_page=12&type=owner`),
          fetch(GITHUB_API),
        ]);
        const reposData = await reposRes.json();
        const userData = await userRes.json();

        const filteredRepos = reposData.filter(
          (r) => r.name !== 'portfolio' && r.name !== 'Rodrigo-Silva-Alarcon'
        );

        const langCount = {};
        let totalStars = 0;
        filteredRepos.forEach((repo) => {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
          totalStars += repo.stargazers_count || 0;
        });

        const languages = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .map(([name, count]) => ({ name, count }));

        setRepos(filteredRepos);
        setStats({
          repos: userData.public_repos || filteredRepos.length,
          languages,
          stars: totalStars,
        });
      } catch (err) {
        console.error('GitHub API error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('.reveal').forEach((el) => observer.unobserve(el));
    };
  }, [loading]);

  const copyEmail = () => {
    navigator.clipboard.writeText('rodrigoalarconcuellar@hotmail.com');
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const timeline = [
    { year: '2024', title: 'Ingeniería en Sistemas', detail: 'Graduación en la UTEPSA, Santa Cruz de la Sierra.' },
    { year: '2024', title: 'Sistema de Gestión Comercial', detail: 'Lanzamiento y desarrollo con .NET y SQL.' },
    { year: '2025', title: 'FastAPI Realtime Platform', detail: 'Plataforma backend con API REST autenticada (JWT) y WebSockets en tiempo real. FastAPI, PostgreSQL, Docker.' },
    { year: '2026', title: 'Integración con IA', detail: 'Foco en IA generativa y automatización de procesos de software.' },
  ];

  const skills = {
    backend: ['C#', '.NET', 'PHP', 'FastAPI', 'APIs REST'],
    frontend: ['JavaScript', 'React', 'HTML5', 'CSS3'],
    database: ['PostgreSQL', 'MySQL', 'SQL Server'],
    devops: ['Docker', 'Git', 'Linux', 'CI/CD'],
  };

  return (
    <div className="portfolio-app">
      {/* Grid Background Overlay */}
      <div className="grid-bg" />

      {/* Navigation */}
      <nav className={`header ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo-text">
            <span className="logo-bracket">&lt;</span>RSA<span className="logo-bracket">/&gt;</span>
          </div>
          <div className="nav-links">
            <a href="#about">Sobre Mí</a>
            <a href="#github-stats">Stats</a>
            <a href="#skills">Habilidades</a>
            <a href="#projects">Proyectos</a>
            <a href="#timeline">Trayectoria</a>
            <a href="#contact" className="btn-primary-sm">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section fade-in">
        <div className="hero-content">
          <div className="hero-terminal">
            <span className="terminal-line">$ whoami</span>
          </div>
          <h1 className="hero-name">
            Rodrigo <span className="text-accent">Silva Alarcón</span>
          </h1>
          <h2 className="hero-title">
            <span className="text-dim">{'{'}</span> Ingeniero en Sistemas <span className="text-dim">{'}'}</span>
          </h2>
          <p className="hero-subtitle">
            <span className="text-dim">{'// '}</span>Full Stack Developer · Integración de Soluciones con IA · Automatización de Procesos
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">Ver Proyectos</a>
            <button
              onClick={copyEmail}
              className={`btn-outline ${copyFeedback ? 'copied' : ''}`}
            >
              {copyFeedback ? '$ copied ✓' : 'rodrigoalarconcuellar@hotmail.com'}
            </button>
          </div>
          <div className="hero-scroll-hint">
            <span className="scroll-line" />
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-header reveal">
          <span className="section-number">01</span>
          <h2 className="section-title">Sobre <span className="text-accent">Mí</span></h2>
          <div className="section-line" />
        </div>
        <div className="about-card reveal">
          <div className="about-text">
            <p className="about-highlight">
              Ingeniero en Sistemas de la UTEPSA con enfoque analítico para la resolución de problemas complejos.
            </p>
            <p>
              Experiencia en el desarrollo de sistemas de gestión, aplicaciones web escalables y arquitectura de
              soluciones backend. Apasionado por optimizar procesos de desarrollo mediante IA, automatización y
              buenas prácticas de ingeniería de software.
            </p>
          </div>
          <div className="about-quick-stats">
            <div className="quick-stat">
              <span className="quick-stat-value">{stats.repos}+</span>
              <span className="quick-stat-label">Repos Públicos</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-value">{stats.stars}</span>
              <span className="quick-stat-label">GitHub Stars</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat-value">{stats.languages.length}</span>
              <span className="quick-stat-label">Lenguajes</span>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Stats Section */}
      <section id="github-stats" className="github-stats-section">
        <div className="section-header reveal">
          <span className="section-number">02</span>
          <h2 className="section-title">GitHub <span className="text-accent">Stats</span></h2>
          <div className="section-line" />
        </div>

        {loading ? (
          <div className="loading-state reveal">
            <div className="loading-bar" />
            <span>Cargando datos de GitHub...</span>
          </div>
        ) : (
          <>
            <div className="stats-grid reveal">
              <div className="stat-card">
                <div className="stat-icon">◈</div>
                <div className="stat-info">
                  <span className="stat-value">{stats.repos}</span>
                  <span className="stat-label">Repositorios Públicos</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">★</div>
                <div className="stat-info">
                  <span className="stat-value">{stats.stars}</span>
                  <span className="stat-label">Stars Acumulados</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⟐</div>
                <div className="stat-info">
                  <span className="stat-value">{stats.languages.length}</span>
                  <span className="stat-label">Lenguajes Usados</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">↻</div>
                <div className="stat-info">
                  <span className="stat-value">{repos.length}</span>
                  <span className="stat-label">Proyectos Recientes</span>
                </div>
              </div>
            </div>

            {/* Languages Distribution */}
            <div className="languages-section reveal">
              <h3 className="subsection-title">Distribución de Lenguajes</h3>
              <div className="languages-bars">
                {stats.languages.map((lang) => {
                  const maxCount = stats.languages[0]?.count || 1;
                  const width = (lang.count / maxCount) * 100;
                  return (
                    <div key={lang.name} className="language-bar-row">
                      <span className="language-name">{lang.name}</span>
                      <div className="language-bar-track">
                        <div
                          className="language-bar-fill"
                          style={{
                            width: `${width}%`,
                            backgroundColor: languageColors[lang.name] || '#6e7681',
                          }}
                        />
                      </div>
                      <span className="language-count">{lang.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="section-header reveal">
          <span className="section-number">03</span>
          <h2 className="section-title">Stack <span className="text-accent">Técnico</span></h2>
          <div className="section-line" />
        </div>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="skill-card reveal">
              <div className="skill-card-header">
                <span className="skill-icon">
                  {category === 'backend' && '⚙'}
                  {category === 'frontend' && '◇'}
                  {category === 'database' && '◉'}
                  {category === 'devops' && '⬡'}
                </span>
                <h4 className="skill-category">{category}</h4>
              </div>
              <ul className="skill-list">
                {items.map((skill) => (
                  <li key={skill}>
                    <span className="skill-bullet">›</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section - Dynamic from GitHub */}
      <section id="projects" className="projects-section">
        <div className="section-header reveal">
          <span className="section-number">04</span>
          <h2 className="section-title">Proyectos <span className="text-accent">Recientes</span></h2>
          <div className="section-line" />
        </div>
        <p className="projects-auto-label reveal">
          <span className="pulse-dot" />
          Actualización automática desde GitHub
        </p>
        <div className="projects-grid">
          {repos.map((repo, index) => (
            <div
              key={repo.id}
              className="project-card reveal"
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <div className="project-card-top">
                <span className="project-folder">📁 {repo.name}</span>
                <div className="project-stars">
                  {repo.stargazers_count > 0 && (
                    <>
                      <span className="star-icon">★</span>
                      {repo.stargazers_count}
                    </>
                  )}
                </div>
              </div>
              <p className="project-description">
                {repo.description || 'Sin descripción disponible.'}
              </p>
              <div className="project-card-bottom">
                {repo.language && (
                  <span
                    className="project-language"
                    style={{ color: languageColors[repo.language] || '#8b949e' }}
                  >
                    <span
                      className="language-dot"
                      style={{ backgroundColor: languageColors[repo.language] || '#8b949e' }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="project-date">
                  {new Date(repo.updated_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Ver Repositorio →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="timeline-section">
        <div className="section-header reveal">
          <span className="section-number">05</span>
          <h2 className="section-title">Trayectoria <span className="text-accent">Profesional</span></h2>
          <div className="section-line" />
        </div>
        <div className="timeline-container">
          {timeline.map((item, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} reveal`}>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="contact-section">
        <div className="contact-container reveal">
          <span className="section-number">06</span>
          <h2 className="section-title">¿Listo para <span className="text-accent">Colaborar?</span></h2>
          <p className="contact-text">Hablemos sobre cómo puedo aportar valor a tu equipo.</p>
          <div className="contact-links">
            <a href="mailto:rodrigoalarconcuellar@hotmail.com" className="contact-item">
              <span className="contact-icon">✉</span>
              Email
            </a>
            <a href="https://linkedin.com/in/rodrigo-silva-alarcón-b45863338" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span className="contact-icon">⟁</span>
              LinkedIn
            </a>
            <a href="https://github.com/Rodrigo-Silva-Alarcon" target="_blank" rel="noopener noreferrer" className="contact-item">
              <span className="contact-icon">⊚</span>
              GitHub
            </a>
          </div>
          <div className="footer-bottom">
            <p>
              <span className="text-dim">{'// '}</span>© 2026 Rodrigo Silva Alarcón · Ingeniero en Sistemas
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
