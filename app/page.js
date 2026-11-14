import ProjectCard from "../components/ProjectCard";
import { ABOUT, PROJECTS, SKILLS, CERTS } from "../data/portfolio";

const GITHUB = "https://github.com/Shimaaelkanj";
const LINKEDIN = "https://www.linkedin.com/in/shaimaa-kanj";
const EMAIL = "shaimaakanj3@gmail.com";

function External({ href, className, children }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <header>
        <div className="wrap">
          <nav aria-label="Main">
            <a className="brand" href="#top">Shaimaa Kanj</a>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#certifications">Certifications</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="wrap" id="top">
        <section style={{ paddingTop: "88px" }}>
          <h1>Shaimaa Kanj</h1>
          <p className="role">AI Engineer</p>
          <p className="lead">
            I build practical AI systems: LLM applications, RAG pipelines, and AI agents, backed by solid backend engineering.
          </p>
          <p className="meta">Based in Lebanon | Open to International Opportunities &amp; Relocation</p>
          <div className="btns">
            <a className="btn primary" href="#contact">Get in touch</a>
            <External className="btn ghost" href={GITHUB}>GitHub</External>
            <External className="btn ghost" href={LINKEDIN}>LinkedIn</External>
          </div>
        </section>

        <section id="about" className="about">
          <h2>About</h2>
          {ABOUT.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          <div className="facts">
            <div className="fact"><b>Looking for</b>Junior AI Engineer, AI Engineer Intern</div>
            <div className="fact"><b>Location</b>Lebanon, Open To Relocation</div>
            <div className="fact"><b>Languages</b>Arabic, English</div>
          </div>
        </section>

        <section id="skills">
          <h2 style={{ marginBottom: "8px" }}>Skills</h2>
          <p className="meta" style={{ maxWidth: "62ch", margin: "0 0 24px" }}>
            Focused on LLM systems and applied machine learning, with the backend, data and cloud skills to build and ship them.
          </p>
          <div className="skills">
            {SKILLS.map(([name, icon, cls, items]) => (
              <article className={("skill-card " + cls).trim()} key={name}>
                <div className="skill-head">
                  <span className="skill-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: icon }} />
                  </span>
                  <h3>{name}</h3>
                </div>
                <div className="tags">
                  {items.map((item) => (
                    <span className="tag" key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <div className="projects">
            {PROJECTS.map((p) => (
              <ProjectCard p={p} key={p.title} />
            ))}
          </div>
        </section>

        <section id="certifications">
          <h2>Certifications</h2>
          <ul className="certs">
            {CERTS.map(([name, issuer]) => (
              <li className="cert" key={name}>
                <strong>{name}</strong>
                <span>{issuer}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="education">
          <h2>Education</h2>
          <div className="edu">
            <h3>Bachelor’s degree in Computer Science</h3>
            <p>Graduated 2026</p>
          </div>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <div className="contact">
            <p style={{ margin: 0, maxWidth: "60ch" }}>
              I’m open to junior AI engineering roles and internships, in Lebanon or abroad. The fastest way to reach me is by email.
            </p>
            <ul>
              <li><span>Email</span><a href={"mailto:" + EMAIL}>{EMAIL}</a></li>
              <li><span>LinkedIn</span><External href={LINKEDIN}>linkedin.com/in/shaimaa-kanj</External></li>
              <li><span>GitHub</span><External href={GITHUB}>github.com/Shimaaelkanj</External></li>
            </ul>
          </div>
        </section>

        <footer>© {year} Shaimaa Kanj</footer>
      </main>
    </>
  );
}
