"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Theme = "dark" | "light";

/* ---------- Inline SVG icons (lucide-style, stroke = currentColor) ---------- */
const ICON_PATHS: Record<string, ReactNode> = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </>
  ),
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </>
  ),
  cpu: (
    <>
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </>
  ),
  "trending-up": (
    <>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  server: (
    <>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </>
  ),
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
  "monitor-smartphone": (
    <>
      <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
      <path d="M10 19v-3.96 3.15" />
      <path d="M7 19h5" />
      <rect width="6" height="10" x="16" y="12" rx="2" />
    </>
  ),
  braces: (
    <>
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
      <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
    </>
  ),
  "square-kanban": (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 7v7" />
      <path d="M12 7v4" />
      <path d="M16 7v9" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <line x1="8" x2="8" y1="17" y2="11" />
      <line x1="13" x2="13" y1="17" y2="7" />
      <line x1="18" x2="18" y1="17" y2="13" />
    </>
  ),
  x: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

type Project = {
  title: string;
  dates: string;
  eyebrow: string;
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
    eyebrow: "Full-Stack · Productivity",
    description:
      "A full-stack task board with boards, lists and cards, drag-and-drop, and search and filtering. FastAPI + SQLAlchemy backend with a Next.js 15 / React 19 / TypeScript frontend, seeded with a Product Launch board.",
    image: "/images/project-taskboard.png",
    imageAlt: "TaskBoard board view with columns and cards",
    tags: ["Next.js 15", "React 19", "TypeScript", "FastAPI", "SQLAlchemy", "SQLite"],
    githubUrl: "https://github.com/nehilbhakta/task-board",
    liveUrl: "https://nehilbhakta-taskboard.vercel.app",
    featured: true,
    stats: ["4 lists", "7 seeded cards", "Drag-and-drop", "4 backend tests passed"],
  },
  {
    title: "RLVR Environment",
    dates: "Nov 2026 – Present",
    eyebrow: "Machine Learning · Reinforcement Learning",
    description:
      "A Gymnasium-style reinforcement learning environment with verifiable rewards: 10 code tasks checked by unit tests and 10 math tasks checked by exact answers. Reward comes only from the verifier — never from a model judging itself.",
    image: "/images/project-rlvr.webp",
    imageAlt: "RLVR Environment project cover",
    tags: ["Python", "Gymnasium", "Reinforcement Learning", "pytest"],
    githubUrl: "https://github.com/nehilbhakta/rlvr-env",
    liveUrl: "https://nehilbhakta-rlvr-demo.vercel.app",
    stats: ["20 tasks", "Baseline 2/20", "Oracle 20/20", "Tiny-model experiment 7/20"],
  },
  {
    title: "Supply Chain KPI Dashboard",
    dates: "Nov 2026 – Present",
    eyebrow: "Data Analytics · Supply Chain",
    description:
      "A supply chain analytics dashboard over simulated procurement data: spend, on-time delivery, supplier scorecards and stockout risk, with a data dictionary and a Tableau spec.",
    image: "/images/project-supplychain.webp",
    imageAlt: "Supply Chain KPI Dashboard project cover",
    tags: ["Python", "Pandas", "Data Analysis", "Tableau"],
    githubUrl: "https://github.com/nehilbhakta/supply-chain-kpi",
    liveUrl: "https://nehilbhakta-supplychain.vercel.app",
    stats: ["732 POs", "$13.77M spend", "90.2% on-time delivery"],
    note: "All data in this project is simulated.",
  },
  {
    title: "Heart Attack Risk Prediction & Alert Pipeline",
    dates: "Apr 2026",
    eyebrow: "Machine Learning · Healthcare",
    description:
      "An end-to-end risk prediction and alert pipeline: an XGBoost model trained on the UCI Cleveland heart disease dataset, served by a FastAPI API with a patient dashboard and live alerts.",
    image: "/images/project-heartrisk.png",
    imageAlt: "Heart Attack Risk Prediction dashboard home",
    tags: ["Python", "XGBoost", "FastAPI", "Machine Learning"],
    githubUrl: "https://github.com/nehilbhakta/heart-attack-risk-prediction",
    liveUrl: "https://nehilbhakta-heartrisk.vercel.app",
    stats: ["303 rows (UCI Cleveland)", "Test AUC 0.957", "20 simulated patients"],
    note: "Demo / educational project using simulated patient data. Not a medical device.",
  },
  {
    title: "Restaurant Reservation API",
    dates: "Mar 2026",
    eyebrow: "Backend · REST API",
    description:
      "A REST API for restaurant reservations — tables, bookings and availability — built with FastAPI and SQLAlchemy, with validated request models and clear endpoint design.",
    image: "/images/project-restaurant-api.webp",
    imageAlt: "Restaurant Reservation API project cover",
    tags: ["FastAPI", "Python", "SQLAlchemy", "REST APIs"],
    githubUrl: "https://github.com/nehilbhakta/kyobee-reservation-api",
    liveUrl: "https://nehilbhakta-kyobee-api.onrender.com/docs",
  },
  {
    title: "E-Commerce Sales Dashboard",
    dates: "Sep – Dec 2025",
    eyebrow: "Data Visualisation · Tableau",
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

type CaseStudy = {
  steps: { title: string; text: string }[];
  challenge: string;
  approach: string;
  outcomes: string;
  contribution: string[];
  decisions: string[];
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  "TaskBoard — Full-Stack Task Board": {
    steps: [
      { title: "Create a board", text: "Start with a board for a project, then add lists like Backlog, In Progress and Done." },
      { title: "Add cards", text: "Each card holds a description, priority, due date and labels — the details that make a task actionable." },
      { title: "Drag and drop", text: "Move cards between lists or reorder them inside a list with HTML5 drag events; the move saves to the API immediately." },
      { title: "Search and filter", text: "Find any card by text, or filter by priority or label when a board grows." },
    ],
    challenge:
      "A task board is easy to sketch and hard to make feel right: drag-and-drop has to work on the first try, every move has to save, and the board has to stay fast as cards pile up — with no heavy UI library doing the work.",
    approach:
      "Kept the stack boring on purpose: FastAPI + SQLAlchemy on the backend with a clean Board → List → Card model and Pydantic validation, and a Next.js frontend that talks to it through one small API client. Drag-and-drop is plain HTML5 drag events, and the database is SQLite by default with PostgreSQL behind a single env var.",
    outcomes:
      "A working board seeded with a realistic Product Launch board (4 lists, 7 cards) on first run, 4 backend tests passing, and the whole thing deployed live on free tiers — Vercel frontend, Render backend — with demo data re-seeding itself on startup.",
    contribution: [
      "Built the whole thing end to end — data model, REST API, tests, and the Next.js frontend.",
      "Designed the drag-and-drop interaction and the card detail dialog, with no UI component library.",
    ],
    decisions: [
      "SQLite by default, PostgreSQL via DATABASE_URL — the same code runs locally and in production.",
      "No heavy UI library: custom CSS keeps the frontend light and the drag behaviour fully under my control.",
    ],
  },
  "RLVR Environment": {
    steps: [
      { title: "Pick a task", text: "The agent is given one of 20 tasks — 10 code, 10 math — with a prompt and a difficulty." },
      { title: "Submit an answer", text: "For code, the agent writes a function; for math, it gives a number." },
      { title: "The verifier decides", text: "Code answers run against hidden unit tests; math answers are matched exactly. Reward is 1.0 or 0.0 — nothing in between." },
      { title: "One shot", text: "One episode, one answer. No second tries, no model judging its own work." },
    ],
    challenge:
      "Reward models are the weak point of RL for reasoning: if a model grades itself, it learns to please the grader, not to be right. The challenge was building an environment where the reward can only come from something checkable.",
    approach:
      "A Gymnasium-style environment where every task has a verifier — pytest-style unit tests for code, exact-answer matching for math. The reward is binary and comes only from the verifier, and the env follows the standard reset/step API so any Gymnasium-compatible training loop can use it.",
    outcomes:
      "The heuristic baseline scores 2/20 and the oracle 20/20 — the spread that proves the verifiers work. A 299K-parameter transformer trained from scratch on the env scores 7/20, and the held-out results are reported honestly, including where it fails: it never learned general arithmetic.",
    contribution: [
      "Designed the 20-task bank, the verifiers, and the Gymnasium API surface.",
      "Ran the baseline, oracle and tiny-model experiments and wrote up the honest results — including the failures.",
    ],
    decisions: [
      "Binary rewards on purpose: verifiable rewards are sharp, even if the signal is sparse.",
      "Code runs in-process with exec for speed — flagged as not a sandbox, with containerisation as the production answer.",
    ],
  },
  "Supply Chain KPI Dashboard": {
    steps: [
      { title: "Generate the data", text: "A deterministic generator (seed 42) produces 732 purchase orders, inventory snapshots and price changes across 10 suppliers, 3 sites and 40 SKUs." },
      { title: "Compute the KPIs", text: "pandas turns the raw lines into on-time delivery, lead-time variance, stockout risk, excess inventory and price variance." },
      { title: "Score the suppliers", text: "Every supplier gets a scorecard; the worst performer gets a full miss report with root cause and prevention." },
      { title: "Build the dashboard", text: "A Tableau spec turns the same numbers into a dashboard a planner can actually use." },
    ],
    challenge:
      "Supply chain data only helps if people trust it: every KPI needs a written definition and formula, the numbers need audit checks, and a bad supplier needs evidence, not a gut feeling.",
    approach:
      "Generated a reproducible simulated dataset with a fixed seed, computed every KPI in pandas with a data dictionary that defines each one, wrote a supplier scorecard with a structured miss report, and specified the Tableau dashboard from the same CSVs — with “simulated” labelled everywhere so the data is never mistaken for real.",
    outcomes:
      "732 POs, $13.77M spend, 90.2% on-time delivery; Desert Freight Logistics identified at 69.1% OTD with +1.68 days lateness and a 4.00% defect rate; 9 stockout-risk SKUs and $586,612 of excess inventory surfaced — all verified by 18 automated checks.",
    contribution: [
      "Built the data generator, the KPI analysis and the supplier scorecard end to end.",
      "Wrote the data dictionary and the Tableau dashboard spec so the analysis is reproducible from the CSVs.",
    ],
    decisions: [
      "Simulated data, labelled everywhere — honest about what the findings are and aren't.",
      "A miss report format (what happened, trend, scope, impact, hypothesis, prevention) instead of a single bad score.",
    ],
  },
  "Heart Attack Risk Prediction & Alert Pipeline": {
    steps: [
      { title: "Simulate vitals", text: "20 simulated patients, each with 7 days of vitals — heart rate, blood pressure, sleep, activity." },
      { title: "Train the model", text: "XGBoost trains on the UCI Cleveland dataset (303 rows) and saves the model with its feature list and metrics." },
      { title: "Score a patient", text: "The API returns a risk probability with a low / medium / high band and the driving factors in plain words." },
      { title: "Raise an alert", text: "A high-risk prediction creates a persistent alert — the local equivalent of Lambda + SNS — until someone resolves it." },
    ],
    challenge:
      "This started as an AWS course project (S3, EMR/Spark, SageMaker, Lambda, SNS, Athena) — powerful, but it cost money and couldn't be run or inspected on a laptop. The challenge was keeping the same architecture while making it free and local.",
    approach:
      "Rebuilt the pipeline with local equivalents: SQLite instead of S3/Athena, a Python aggregation step instead of Spark, XGBoost trained locally instead of SageMaker, FastAPI instead of Lambda, and an alerts table instead of SNS. The original overfit synthetic data (validation AUC ~0.51); this version trains on the real UCI Cleveland data.",
    outcomes:
      "Test ROC-AUC 0.957 (accuracy 0.885, recall 0.964), 5-fold CV 0.896 ± 0.015 — a model that generalises, with 20 simulated patients and a live alerts page. Deployed on Vercel + Render.",
    contribution: [
      "Rebuilt the full AWS pipeline as a free local app — model training, API, patient dashboard and alerts.",
      "Wrote the honest metrics section, including the train/test gap and where the model would not transfer.",
    ],
    decisions: [
      "Local-first rebuild: same architecture, zero cloud cost, runnable on any laptop.",
      "Disclaimer kept everywhere: demo / educational, simulated patients, not a medical device.",
    ],
  },
  "Restaurant Reservation API": {
    steps: [
      { title: "Create a reservation", text: "POST /reservations with a validated payload — guest, party size, date and time." },
      { title: "Look it up", text: "GET a single reservation by ID, or list them paginated." },
      { title: "Change its status", text: "PATCH the status to confirm or cancel a booking." },
      { title: "Read the docs", text: "Swagger docs at /docs document every endpoint, so the API is testable from a browser." },
    ],
    challenge:
      "A reservation API lives or dies on validation: bad dates, impossible party sizes and missing guests have to be rejected at the door, not discovered in the database.",
    approach:
      "FastAPI with Pydantic request models so every payload is validated before it touches the database, SQLAlchemy for the data layer, and a small, explicit endpoint set — create, read, list, update status, delete — with a /health check and Swagger docs.",
    outcomes:
      "A clean, documented API deployed live on Render, with CORS configured so the Swagger docs work from any browser.",
    contribution: [
      "Designed the reservation model and the endpoint set, with Pydantic validation on every write.",
      "Set up the Render deployment with a one-form blueprint and verified the live docs.",
    ],
    decisions: [
      "Pydantic models on every endpoint — validation at the boundary, not in the handlers.",
      "CORS open by default for the docs, with an env var to lock it down when a frontend is added.",
    ],
  },
  "E-Commerce Sales Dashboard": {
    steps: [
      { title: "Start with raw orders", text: "The team's order dataset: revenue, categories, regions and time." },
      { title: "Build the views", text: "Revenue, category and regional trends with interactive filters in Tableau." },
      { title: "Let the owner explore", text: "Filters let a store owner slice by category or region and see what changes." },
      { title: "Turn it into decisions", text: "The dashboard answers what sells, where, and what's trending — not just what happened." },
    ],
    challenge:
      "A group project with four people and one dataset: the dashboard had to be clear enough for a store owner to act on, not just a chart gallery.",
    approach:
      "Built the Tableau dashboard with my team (Group 2, IFT 533) — revenue, category and regional trends with interactive filters — and published it to Tableau Public so anyone can explore it.",
    outcomes:
      "Total revenue 78,592,678 across the dataset, with Karnataka the top state at 13,335,534. The dashboard is live on Tableau Public.",
    contribution: [
      "Built the Tableau dashboard with my IFT 533 team (Group 2) — views, filters and the published workbook.",
      "Presented the findings as decisions a store owner can act on, not just totals.",
    ],
    decisions: [
      "Tableau Public for the live dashboard — free, shareable, explorable.",
      "Filters over fixed charts: the owner asks their own questions instead of reading mine.",
    ],
  },
};

type Tool = { name: string; logo?: string; glyph?: string };

const TOOLBOX: { category: string; icon: string; tools: Tool[] }[] = [
  {
    category: "Frontend",
    icon: "code",
    tools: [
      { name: "React", logo: "react" },
      { name: "Next.js", logo: "nextjs" },
      { name: "JavaScript", logo: "javascript" },
      { name: "TypeScript", logo: "typescript" },
      { name: "HTML5", logo: "html5" },
      { name: "CSS", logo: "css" },
      { name: "Responsive Web Design", glyph: "monitor-smartphone" },
    ],
  },
  {
    category: "Backend",
    icon: "server",
    tools: [
      { name: "Node.js", logo: "nodedotjs" },
      { name: "Express.js", logo: "express" },
      { name: "Python", logo: "python" },
      { name: "FastAPI", logo: "fastapi" },
      { name: "SQLAlchemy", logo: "sqlalchemy" },
      { name: "REST APIs", glyph: "braces" },
      { name: "RESTful API Design", glyph: "code" },
    ],
  },
  {
    category: "Databases",
    icon: "database",
    tools: [
      { name: "MongoDB", logo: "mongodb" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "MySQL", logo: "mysql" },
      { name: "SQLite", logo: "sqlite" },
    ],
  },
  {
    category: "Cloud & Data",
    icon: "cloud",
    tools: [
      { name: "AWS", logo: "aws" },
      { name: "Tableau", glyph: "chart" },
    ],
  },
  {
    category: "Tools",
    icon: "wrench",
    tools: [
      { name: "Git", logo: "git" },
      { name: "GitHub", logo: "github" },
      { name: "Docker", logo: "docker" },
      { name: "Linux", logo: "linux" },
      { name: "Figma", logo: "figma" },
      { name: "Scrum", glyph: "square-kanban" },
    ],
  },
];

const ABOUT_HIGHLIGHTS: { icon: string; title: string; text: string }[] = [
  {
    icon: "sparkles",
    title: "Full-stack products",
    text: "2+ years at Ordex building React and Next.js frontends for 10+ client products — restaurant waitlists, childcare marketplaces, ERP and real estate.",
  },
  {
    icon: "cpu",
    title: "Applied machine learning",
    text: "An XGBoost heart-risk model with test AUC 0.957, and a Gymnasium-style RLVR environment with verifiable rewards — oracle 20/20.",
  },
  {
    icon: "trending-up",
    title: "Data that decides",
    text: "A supply-chain dashboard over 732 purchase orders and $13.77M in spend, and a Tableau sales dashboard that turns raw orders into clear decisions.",
  },
];

const ABOUT_PRINCIPLES: { icon: string; title: string; text: string }[] = [
  {
    icon: "server",
    title: "Production-ready by default",
    text: "Reliability, testing and observability are built in, not added afterwards.",
  },
  {
    icon: "chart",
    title: "Measurable outcomes",
    text: "Every system is tied to a metric it is expected to move, and measured against it.",
  },
  {
    icon: "square-kanban",
    title: "Built with the team",
    text: "Clear pull requests, documentation and honest numbers keep the whole team moving.",
  },
];

const ABOUT_STATS: { value: string; label: string }[] = [
  { value: "6+", label: "Projects shipped" },
  { value: "2+", label: "Years of experience" },
  { value: "3.78", label: "Master's GPA" },
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
  const [copied, setCopied] = useState(false);
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [navIndicator, setNavIndicator] = useState({ x: 0, w: 0 });
  const [toggleIndicator, setToggleIndicator] = useState({ x: 0, w: 0 });
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sections = ["about", "journey", "toolbox", "work"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("nehil-portfolio-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("nehil-portfolio-theme", theme);
  }, [theme]);

  // Sliding nav highlight: measure the active link and glide the pill to it.
  useLayoutEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      if (!nav) return;
      const link = nav.querySelector<HTMLAnchorElement>(`a[data-section="${activeSection}"]`);
      if (!link) return;
      const navRect = nav.getBoundingClientRect();
      const r = link.getBoundingClientRect();
      setNavIndicator({ x: r.left - navRect.left, w: r.width });
    };
    measure();
    window.addEventListener("resize", measure);
    if (document.fonts) document.fonts.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeSection]);

  // Same sliding treatment for the Journey Work/Education toggle.
  useLayoutEffect(() => {
    const measure = () => {
      const toggle = toggleRef.current;
      if (!toggle) return;
      const btn = toggle.querySelector<HTMLButtonElement>(`button[data-tab="${journeyTab}"]`);
      if (!btn) return;
      const tRect = toggle.getBoundingClientRect();
      const r = btn.getBoundingClientRect();
      setToggleIndicator({ x: r.left - tRect.left, w: r.width });
    };
    measure();
    window.addEventListener("resize", measure);
    if (document.fonts) document.fonts.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [journeyTab]);

  // Scroll-reveal for sections and cards.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Case study modal: lock body scroll and close on Escape.
  useEffect(() => {
    if (!caseStudy) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCaseStudy(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [caseStudy]);

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

  return (
    <>
      <header className={scrolled ? "nav scrolled" : "nav"}>
        <div className="nav-inner">
          <a className="brand" href="#top">
            <img src={avatarSrc} alt="Nehil Bhakta" />
            Nehil.
          </a>
          <nav className="nav-links" ref={navRef} aria-label="Sections">
            <span
              className="nav-indicator"
              style={{ transform: `translateX(${navIndicator.x}px)`, width: navIndicator.w }}
              aria-hidden="true"
            />
            <a href="#about" data-section="about" className={activeSection === "about" ? "active" : undefined}>About</a>
            <a href="#journey" data-section="journey" className={activeSection === "journey" ? "active" : undefined}>Journey</a>
            <a href="#toolbox" data-section="toolbox" className={activeSection === "toolbox" ? "active" : undefined}>Toolbox</a>
            <a href="#work" data-section="work" className={activeSection === "work" ? "active" : undefined}>Work</a>
          </nav>
          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <span className="theme-icon sun">
                <Icon name="sun" size={20} />
              </span>
              <span className="theme-icon moon">
                <Icon name="moon" size={20} />
              </span>
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
                <h1>Nehil Bhakta</h1>
                <p className="tagline">
                  Building{" "}
                  <span className="gradient-animated">intelligent web products</span>{" "}
                  and AI-driven experiences.
                </p>
                <p className="role-line">
                  I&apos;m a frontend and full-stack developer who likes building products
                  people actually use — from restaurant waitlists and childcare marketplaces
                  to dashboards that turn messy data into clear decisions. Currently
                  finishing my MS IT at Arizona State University.
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
                    <Icon name="download" size={17} /> Download CV
                  </a>
                  <a
                    className="icon-btn"
                    href="https://github.com/nehilbhakta"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                  >
                    <img src="/icons/github-white.svg" alt="" />
                  </a>
                  <a
                    className="icon-btn"
                    href="https://www.linkedin.com/in/nehil-bhakta"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <img src="/icons/linkedin-white.svg" alt="" />
                  </a>
                </div>
                <a className="scroll-cue" href="#work">
                  View selected projects <span className="arrow">↓</span>
                </a>
              </div>
              <div className="hero-card">
                <img src={avatarSrc} alt="3D avatar of Nehil Bhakta" />
                <div className="hero-badge">
                  <span className="hero-badge-icon">
                    <Icon name="rocket" size={20} />
                  </span>
                  <div>
                    <b>6+</b>
                    <span>Projects shipped</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="stack-strip">
              <p className="stack-cta">
                I&apos;m happy to show you <span className="grad-text">my work</span> — have a
                look around.
              </p>
              <a className="btn btn-primary btn-sm" href="#contact">
                Let&apos;s connect <Icon name="arrow-up-right" size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* 01 About */}
        <section id="about" className="reveal">
          <div className="container">
            <span className="section-label">01 · About</span>
            <h2 className="section-title">Hi, I&apos;m Nehil.</h2>
            <div className="about-grid">
              <div className="about-bio">
                <span className="about-eyebrow">Frontend · Full-Stack · Data · Applied ML</span>
                <p>
                  I&apos;m a frontend and full-stack developer who likes building products
                  people actually use — from restaurant waitlists and childcare marketplaces
                  to dashboards that turn messy data into clear decisions. I started in
                  UI/UX design, moved into React and Next.js development, and now I&apos;m
                  finishing my master&apos;s at Arizona State University{" "}
                  <strong>(GPA 3.78/4.0)</strong>, where I&apos;ve been going deeper into
                  full-stack systems, data and applied machine learning. I care most about
                  the details that make software feel effortless: a clean interface, a fast
                  interaction, and a backend that just works.
                </p>
              </div>
              <div className="about-highlights">
                {ABOUT_HIGHLIGHTS.map((item) => (
                  <div className="highlight-card" key={item.title}>
                    <span className="highlight-icon">
                      <Icon name={item.icon} size={23} />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-principles">
              {ABOUT_PRINCIPLES.map((item) => (
                <div className="principle-card reveal" key={item.title}>
                  <span className="highlight-icon">
                    <Icon name={item.icon} size={23} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <div className="about-stats">
              {ABOUT_STATS.map((stat) => (
                <div className="about-stat" key={stat.label}>
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 Journey */}
        <section id="journey" className="reveal">
          <div className="container">
            <span className="section-label">02 · Journey</span>
            <h2 className="section-title">Where I&apos;ve worked &amp; studied</h2>
            <div className="toggle" ref={toggleRef} role="tablist" aria-label="Journey view">
              <span
                className="toggle-indicator"
                style={{ transform: `translateX(${toggleIndicator.x}px)`, width: toggleIndicator.w }}
                aria-hidden="true"
              />
              <button
                data-tab="work"
                className={journeyTab === "work" ? "active" : ""}
                onClick={() => setJourneyTab("work")}
              >
                Work Experience
              </button>
              <button
                data-tab="education"
                className={journeyTab === "education" ? "active" : ""}
                onClick={() => setJourneyTab("education")}
              >
                Education
              </button>
            </div>
            <div className="timeline">
              {journeyItems.map((item) => (
                <div className="timeline-entry" key={item.org}>
                  <span className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-card">
                    <h3>{item.org}</h3>
                    <p className="meta">
                      {item.role} · {item.meta} · {item.dates}
                    </p>
                    <ul>
                      {item.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Toolbox */}
        <section id="toolbox" className="reveal">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="section-label">03 · Toolbox</span>
                <h2 className="section-title">
                  Skills &amp; <span className="title-accent">technologies</span>
                </h2>
              </div>
              <p className="section-sub">
                The languages, frameworks and platforms I work with most, across frontend
                apps, backend services, data stores, cloud infrastructure and ML tooling.
              </p>
            </div>
            <div className="tool-grid">
              {TOOLBOX.map((group) => (
                <div className="tool-card reveal" key={group.category}>
                  <div className="tool-head">
                    <span className="tool-icon">
                      <Icon name={group.icon} size={23} />
                    </span>
                    <div>
                      <h3>{group.category}</h3>
                      <span>
                        {group.tools.length} tool{group.tools.length === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                  <div className="tool-pills">
                    {group.tools.map((tool) => (
                      <span key={tool.name}>
                        <span className="tool-logo">
                          {tool.logo ? (
                            <img src={`/icons/${tool.logo}.svg`} alt="" loading="lazy" />
                          ) : (
                            <Icon name={tool.glyph ?? "code"} size={16} />
                          )}
                        </span>
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Selected work */}
        <section id="work" className="reveal">
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
                  className={project.featured ? "project-card featured reveal" : "project-card reveal"}
                  key={project.title}
                >
                  <div className="project-media">
                    <img src={project.image} alt={project.imageAlt} loading="lazy" />
                    {project.featured && <span className="featured-badge">Featured</span>}
                  </div>
                  <div className="project-body">
                    <span className="project-eyebrow">{project.eyebrow}</span>
                    <div className="project-top">
                      <span className="project-dates">{project.dates}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    {project.stats && (
                      <div className="project-stats">
                        {project.stats.slice(0, 3).map((s) => (
                          <span key={s}>
                            <b>{s}</b>
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="project-tags">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="more">+{project.tags.length - 4}</span>
                      )}
                    </div>
                    {project.note && <p className="project-note">{project.note}</p>}
                    <div className="project-links">
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {project.liveUrl ? (
                          <a
                            className="btn btn-primary btn-sm"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live app <Icon name="arrow-up-right" size={15} />
                          </a>
                        ) : project.tableauUrl ? (
                          <a
                            className="btn btn-primary btn-sm"
                            href={project.tableauUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View on Tableau <Icon name="arrow-up-right" size={15} />
                          </a>
                        ) : null}
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => setCaseStudy(project)}
                        >
                          Case study →
                        </button>
                      </div>
                      {project.githubUrl && (
                        <a
                          className="icon-btn sm"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="View on GitHub"
                          title="View on GitHub"
                        >
                          <img src="/icons/github-white.svg" alt="" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05 Contact */}
        <section id="contact" className="reveal">
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

      {/* Case study modal */}
      {caseStudy && CASE_STUDIES[caseStudy.title] && (
        <div
          className="modal-overlay"
          onClick={() => setCaseStudy(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${caseStudy.title} case study`}
        >
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setCaseStudy(null)}
              aria-label="Close case study"
            >
              <Icon name="x" size={18} />
            </button>
            <div className="modal-cover">
              <img src={caseStudy.image} alt={caseStudy.imageAlt} />
            </div>
            <div className="modal-body">
              <span className="project-eyebrow">{caseStudy.eyebrow}</span>
              <h2>{caseStudy.title}</h2>
              <p>{caseStudy.description}</p>
              <div className="modal-actions">
                {caseStudy.liveUrl ? (
                  <a
                    className="btn btn-primary btn-sm"
                    href={caseStudy.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open project <Icon name="arrow-up-right" size={15} />
                  </a>
                ) : caseStudy.tableauUrl ? (
                  <a
                    className="btn btn-primary btn-sm"
                    href={caseStudy.tableauUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Tableau <Icon name="arrow-up-right" size={15} />
                  </a>
                ) : null}
                {caseStudy.githubUrl && (
                  <a
                    className="btn btn-ghost btn-sm"
                    href={caseStudy.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
              {caseStudy.stats && (
                <div className="modal-stats">
                  {caseStudy.stats.slice(0, 3).map((s) => (
                    <div className="modal-stat" key={s}>
                      <b>{s}</b>
                    </div>
                  ))}
                </div>
              )}
              <p className="modal-section-label">How it works</p>
              <div className="modal-steps">
                {CASE_STUDIES[caseStudy.title].steps.map((step, i) => (
                  <div className="modal-step" key={step.title}>
                    <b>0{i + 1}</b>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
              <div className="modal-rows">
                <div className="modal-row">
                  <b>Challenge</b>
                  <p>{CASE_STUDIES[caseStudy.title].challenge}</p>
                </div>
                <div className="modal-row">
                  <b>Approach</b>
                  <p>{CASE_STUDIES[caseStudy.title].approach}</p>
                </div>
                <div className="modal-row">
                  <b>Outcomes</b>
                  <p>{CASE_STUDIES[caseStudy.title].outcomes}</p>
                </div>
              </div>
              <p className="modal-section-label">What I owned</p>
              <div className="modal-owned">
                <div className="modal-owned-card">
                  <h4>My contribution</h4>
                  <ul>
                    {CASE_STUDIES[caseStudy.title].contribution.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div className="modal-owned-card">
                  <h4>Design decisions</h4>
                  <ul>
                    {CASE_STUDIES[caseStudy.title].decisions.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="modal-section-label">Built with</p>
              <div className="modal-built">
                {caseStudy.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {caseStudy.note && <p className="project-note">{caseStudy.note}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
