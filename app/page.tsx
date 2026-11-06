"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

type Project = {
  title: string;
  dates: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  githubUrl?: string;
  tableauUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  stats?: string[];
  note?: string;
};

const PROJECTS: Project[] = [
  {
    title: "TaskBoard — Full-Stack Task Board",
    dates: "Nov 2026 – Present",
    description:
      "A full-stack task board with boards, lists and cards, drag-and-drop, and search and filtering. FastAPI + SQLAlchemy backend with a Next.js 15 / React 19 / TypeScript frontend, seeded with a Product Launch board.",
    image: "/images/project-taskboard.png",
    imageAlt: "TaskBoard board view with columns and cards",
    tags: ["Next.js 15", "React 19", "TypeScript", "FastAPI", "SQLAlchemy", "SQLite"],
    githubUrl: "https://github.com/nehilbhakta/task-board",
    liveUrl: "",
    featured: true,
    stats: ["4 lists", "7 seeded cards", "Drag-and-drop", "4 backend tests passed"],
  },
  {
    title: "RLVR Environment",
    dates: "Nov 2026 – Present",
    description:
      "A Gymnasium-style reinforcement learning environment with verifiable rewards: 10 code tasks checked by unit tests and 10 math tasks checked by exact answers. Reward comes only from the verifier — never from a model judging itself.",
    image: "/images/project-rlvr.webp",
    imageAlt: "RLVR Environment project cover",
    tags: ["Python", "Gymnasium", "Reinforcement Learning", "pytest"],
    githubUrl: "https://github.com/nehilbhakta/rlvr-env",
    liveUrl: "",
    stats: ["20 tasks", "Baseline 2/20", "Oracle 20/20", "Tiny-model experiment 7/20"],
  },
  {
    title: "Supply Chain KPI Dashboard",
    dates: "Nov 2026 – Present",
    description:
      "A supply chain analytics dashboard over simulated procurement data: spend, on-time delivery, supplier scorecards and stockout risk, with a data dictionary and a Tableau spec.",
    image: "/images/project-supplychain.webp",
    imageAlt: "Supply Chain KPI Dashboard project cover",
    tags: ["Python", "Pandas", "Data Analysis", "Tableau"],
    githubUrl: "https://github.com/nehilbhakta/supply-chain-kpi",
    liveUrl: "",
    stats: ["732 POs", "$13.77M spend", "90.2% on-time delivery"],
    note: "All data in this project is simulated.",
  },
  {
    title: "Heart Attack Risk Prediction & Alert Pipeline",
    dates: "Apr 2026",
    description:
      "An end-to-end risk prediction and alert pipeline: an XGBoost model trained on the UCI Cleveland heart disease dataset, served by a FastAPI API with a patient dashboard and live alerts.",
    image: "/images/project-heartrisk.png",
    imageAlt: "Heart Attack Risk Prediction dashboard home",
    tags: ["Python", "XGBoost", "FastAPI", "Machine Learning"],
    githubUrl: "https://github.com/nehilbhakta/heart-attack-risk-prediction",
    liveUrl: "",
    stats: ["303 rows (UCI Cleveland)", "Test AUC 0.957", "20 simulated patients"],
    note: "Demo / educational project using simulated patient data. Not a medical device.",
  },
  {
    title: "Restaurant Reservation API",
    dates: "Mar 2026",
    description:
      "A REST API for restaurant reservations — tables, bookings and availability — built with FastAPI and SQLAlchemy, with validated request models and clear endpoint design.",
    image: "/images/project-restaurant-api.webp",
    imageAlt: "Restaurant Reservation API project cover",
    tags: ["FastAPI", "Python", "SQLAlchemy", "REST APIs"],
    githubUrl: "https://github.com/nehilbhakta/kyobee-reservation-api",
    liveUrl: "",
  },
  {
    title: "E-Commerce Sales Dashboard",
    dates: "Sep – Dec 2025",
    description:
      "A Tableau sales dashboard built for a group project at ASU: revenue, category and regional trends with interactive filters, turning raw order data into decisions a store owner can act on.",
    image: "/images/project-ecommerce.png",
    imageAlt: "E-Commerce Sales Dashboard overview",
    tags: ["Tableau", "Data Visualisation", "SQL"],
    tableauUrl:
      "https://public.tableau.com/app/profile/nehil.bhakta/viz/IFT533_Group2Project/Dashboard1",
    liveUrl: "",
  },
];

const TOOLBOX: { category: string; tools: string[] }[] = [
  {
    category: "Frontend",
    tools: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS", "Responsive Web Design"],
  },
  {
    category: "Backend",
    tools: ["Node.js", "Express.js", "Python", "FastAPI", "SQLAlchemy", "REST APIs", "RESTful API Design"],
  },
  { category: "Databases", tools: ["MongoDB", "PostgreSQL", "MySQL", "SQLite"] },
  { category: "Cloud & Data", tools: ["AWS", "Tableau"] },
  { category: "Tools", tools: ["Git", "GitHub", "Docker", "Linux", "Figma", "Scrum"] },
];

const WORK_ITEMS = [
  {
    org: "Ordex Technology Solutions LLP",
    role: "Software Developer (Frontend)",
    meta: "Full-time · Ahmedabad, India",
    dates: "Aug 2022 – Dec 2024",
    bullets: [
      "Hired full-time in the third year of my B.Tech after interviewing for an internship — and worked full-time while completing the degree.",
      "Built React and Next.js frontends for 10+ client products across hospitality, lifestyle, education, ERP and real estate, for clients in the US and India.",
      "Kyobee restaurant waitlist platform: guest self check-in screen and a live wait-status view.",
      "GiftAMeal social-impact dining app (St. Louis, Chicago, Detroit): a photo-upload flow that triggers a meal donation — the platform has funded over 92,000 meals.",
      "BabySitter US childcare marketplace (MERN): the “Find a Babysitter” search and “Register to Be a Babysitter” onboarding as responsive React interfaces.",
      "REST API integration, and agile sprints with Git code review.",
      "Began at Ordex in UI/UX design for the first few months — user research, wireframes and prototypes in Figma — before moving into frontend development.",
    ],
  },
];

const EDUCATION_ITEMS = [
  {
    org: "Arizona State University",
    role: "MS Information Technology",
    meta: "Tempe, AZ",
    dates: "Jan 2025 – Dec 2026",
    bullets: ["GPA 3.78/4.0.", "Coursework in data engineering, analytics and applied machine learning."],
  },
  {
    org: "Silver Oak University",
    role: "B.Tech Information Technology",
    meta: "Ahmedabad, India",
    dates: "Aug 2020 – May 2024",
    bullets: ["CGPA 9.5/10.", "Completed the degree while working full-time as a frontend developer at Ordex."],
  },
];

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [journeyTab, setJourneyTab] = useState<"work" | "education">("work");
  const [activeWork, setActiveWork] = useState(0);
  const [activeEdu, setActiveEdu] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("nehil-portfolio-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("nehil-portfolio-theme", theme);
  }, [theme]);

  const avatarSrc = theme === "dark" ? "/images/avatar-dark.webp" : "/images/avatar-light.webp";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("nbhakta@asu.edu");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const journeyItems = journeyTab === "work" ? WORK_ITEMS : EDUCATION_ITEMS;
  const activeIndex = journeyTab === "work" ? activeWork : activeEdu;
  const activeItem = journeyItems[activeIndex];

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top">
            <img src={avatarSrc} alt="Nehil Bhakta" />
            Nehil.
          </a>
          <nav className="nav-links" aria-label="Sections">
            <a href="#about">About</a>
            <a href="#journey">Journey</a>
            <a href="#toolbox">Toolbox</a>
            <a href="#work">Work</a>
          </nav>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <a className="btn btn-white btn-sm" href="#contact">
              Contact Me
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div>
                <span className="pill">
                  <span className="dot" /> Available for opportunities · Tempe, AZ
                </span>
                <h1>
                  Nehil Bhakta
                  <span className="gradient-text">Building intelligent web products</span>
                </h1>
                <p className="role-line">
                  Frontend &amp; Full-Stack Developer | React, Next.js, TypeScript | MS IT @
                  Arizona State University
                </p>
                <div className="chips">
                  {["React", "Next.js", "TypeScript", "Python", "AI & ML"].map((chip) => (
                    <span className="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="/Nehil_Bhakta_Resume.pdf" download>
                    ↓ Download CV
                  </a>
                  <a
                    className="btn btn-ghost"
                    href="https://github.com/nehilbhakta"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    className="btn btn-ghost"
                    href="https://www.linkedin.com/in/nehil-bhakta"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="hero-card">
                <img src={avatarSrc} alt="3D avatar of Nehil Bhakta" />
                <p>Frontend &amp; Full-Stack Developer · MS IT @ ASU</p>
              </div>
            </div>
            <div className="stack-strip" aria-label="Core stack">
              {["React", "Next.js", "TypeScript", "Python", "FastAPI", "AWS"].map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* 01 About */}
        <section id="about">
          <div className="container">
            <span className="section-label">01 · About</span>
            <h2 className="section-title">Hi, I&apos;m Nehil.</h2>
            <div className="stats">
              <div className="stat">
                <b>6</b>
                <span>Projects shipped, from full-stack apps to ML experiments</span>
              </div>
              <div className="stat">
                <b>3.78/4.0</b>
                <span>GPA — MS Information Technology, ASU</span>
              </div>
              <div className="stat">
                <b>9.5/10</b>
                <span>CGPA — B.Tech Information Technology</span>
              </div>
              <div className="stat">
                <b>2+ years</b>
                <span>Frontend developer at Ordex Technology Solutions</span>
              </div>
            </div>
            <p className="about-text">
              I&apos;m a frontend and full-stack developer who likes building products people
              actually use — from restaurant waitlists and childcare marketplaces to
              dashboards that turn messy data into clear decisions. I started in UI/UX
              design, moved into React and Next.js development, and now I&apos;m finishing my
              master&apos;s at Arizona State University, where I&apos;ve been going deeper into
              full-stack systems, data and applied machine learning. I care most about the
              details that make software feel effortless: a clean interface, a fast
              interaction, and a backend that just works.
            </p>
          </div>
        </section>

        {/* 02 Journey */}
        <section id="journey">
          <div className="container">
            <span className="section-label">02 · Journey</span>
            <h2 className="section-title">Where I&apos;ve worked &amp; studied</h2>
            <div className="toggle" role="tablist" aria-label="Journey view">
              <button
                className={journeyTab === "work" ? "active" : ""}
                onClick={() => setJourneyTab("work")}
              >
                Work Experience
              </button>
              <button
                className={journeyTab === "education" ? "active" : ""}
                onClick={() => setJourneyTab("education")}
              >
                Education
              </button>
            </div>
            <div className="journey-grid">
              <div>
                {journeyItems.map((item, i) => (
                  <div
                    key={item.org}
                    className={`timeline-item ${i === activeIndex ? "active" : ""}`}
                    onClick={() => (journeyTab === "work" ? setActiveWork(i) : setActiveEdu(i))}
                  >
                    <h3>{item.org}</h3>
                    <p>
                      {item.role} · {item.meta}
                    </p>
                    <span className="dates">{item.dates}</span>
                  </div>
                ))}
              </div>
              <div className="detail-card">
                <h3>{activeItem.org}</h3>
                <p className="meta">
                  {activeItem.role} · {activeItem.meta} · {activeItem.dates}
                </p>
                <ul>
                  {activeItem.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 03 Toolbox */}
        <section id="toolbox">
          <div className="container">
            <span className="section-label">03 · Toolbox</span>
            <h2 className="section-title">Tools I reach for</h2>
            <p className="section-sub">
              The stack I use to take an idea from a Figma frame to a deployed product.
            </p>
            <div className="tool-grid">
              {TOOLBOX.map((group) => (
                <div className="tool-card" key={group.category}>
                  <h3>{group.category}</h3>
                  <div className="tool-pills">
                    {group.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Selected work */}
        <section id="work">
          <div className="container">
            <span className="section-label">04 · Selected work</span>
            <h2 className="section-title">Things I&apos;ve built</h2>
            <p className="section-sub">
              Full-stack apps, APIs, dashboards and machine learning experiments — each one
              built to solve a real problem, not just to fill a page.
            </p>
            <div className="project-grid">
              {PROJECTS.map((project) => (
                <article
                  className={`project-card ${project.featured ? "featured" : ""}`}
                  key={project.title}
                >
                  <img src={project.image} alt={project.imageAlt} loading="lazy" />
                  <div className="project-body">
                    <div className="project-top">
                      {project.featured && <span className="featured-badge">Featured</span>}
                      <span className="project-dates">{project.dates}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.stats && (
                      <div className="project-stats">
                        {project.stats.map((s) => (
                          <span key={s}>
                            <b>{s}</b>
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {project.note && <p className="project-note">{project.note}</p>}
                    <div className="project-links">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer">
                          View on GitHub →
                        </a>
                      )}
                      {project.tableauUrl && (
                        <a href={project.tableauUrl} target="_blank" rel="noreferrer">
                          View on Tableau Public →
                        </a>
                      )}
                      {project.liveUrl ? (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer">
                          Live app →
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05 Contact */}
        <section id="contact">
          <div className="container">
            <span className="section-label">05 · Contact</span>
            <div className="contact-box">
              <h2>Get in touch</h2>
              <p>
                I&apos;m open to full-time opportunities and interesting projects. The fastest
                way to reach me is email or phone.
              </p>
              <div className="contact-rows">
                <div className="contact-item">
                  <div>
                    <small>Email</small>
                    <a href="mailto:nbhakta@asu.edu">nbhakta@asu.edu</a>
                  </div>
                  <button onClick={copyEmail}>{copied ? "Copied ✓" : "Copy"}</button>
                </div>
                <div className="contact-item">
                  <div>
                    <small>Phone</small>
                    <a href="tel:+18065448653">(806) 544-8653</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <span>© 2026 Nehil Bhakta · Tempe, AZ</span>
          <span>
            <a href="https://github.com/nehilbhakta" target="_blank" rel="noreferrer">
              GitHub
            </a>{" "}
            ·{" "}
            <a
              href="https://www.linkedin.com/in/nehil-bhakta"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
