"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react"
import { certificates, education, experience, personalInfo, projects, skills } from "@/lib/data"
import { ProjectVisual, type ProjectVisualKind } from "@/components/ui/ProjectVisual"
import type { CapabilityKind } from "@/components/ui/CapabilityAnimation"

const RetroSignal = dynamic(
  () => import("@/components/ui/RetroSignal").then((module) => module.RetroSignal),
  { ssr: false, loading: () => <div className="retro-signal-placeholder" aria-hidden="true" /> },
)

const CapabilityAnimation = dynamic(
  () => import("@/components/ui/CapabilityAnimation").then((module) => module.CapabilityAnimation),
  { ssr: false, loading: () => <div className="retro-capability-placeholder" aria-hidden="true" /> },
)

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Career", href: "#experience" },
  { label: "Method", href: "#practice" },
  { label: "Learning", href: "#archive" },
]

type PracticeStep = {
  id: CapabilityKind
  number: string
  action: string
  prompt: string
  response: string
  methods: string
  tone: "coral" | "mustard" | "teal" | "orange"
}

const practiceSteps: PracticeStep[] = [
  {
    id: "platform",
    number: "01",
    action: "Build",
    prompt: "Can the analysis survive outside the notebook?",
    response: "I start with reusable data foundations, evaluation paths, and an interface that fits the decision.",
    methods: "Platforms · data contracts · evaluation",
    tone: "coral",
  },
  {
    id: "predictive",
    number: "02",
    action: "Predict",
    prompt: "What is likely, and how stable is the signal?",
    response: "I favour strong tabular baselines, careful validation, and performance measured in operational context.",
    methods: "LightGBM · validation · frontier methods",
    tone: "mustard",
  },
  {
    id: "shap",
    number: "03",
    action: "Explain",
    prompt: "What is moving the result?",
    response: "I inspect behaviour, attribution, uncertainty, and limits before a prediction reaches a decision.",
    methods: "SHAP · Shapley values · diagnostics",
    tone: "teal",
  },
  {
    id: "causal",
    number: "04",
    action: "Estimate",
    prompt: "What might change if we intervene?",
    response: "I make the causal question and assumptions explicit, then stress-test what the evidence can support.",
    methods: "DML · DoWhy · robustness checks",
    tone: "orange",
  },
]

type ProjectMeta = {
  category: string
  summary: string
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
  kind: "original" | "learning"
  visual: ProjectVisualKind
}

const projectMeta: Record<string, ProjectMeta> = {
  "Evaluating and Improving Agentic Applications": {
    category: "Course work · clearly credited",
    summary: "From Phoenix traces to case-aligned comparisons: a documented journey through trustworthy agent evaluation.",
    primaryHref: "/showcase/agentic-evaluation/",
    primaryLabel: "Explore the evaluation journey",
    secondaryHref: "https://github.com/YKaanKaya/deeplearning-ai-agentic-evaluation",
    secondaryLabel: "View source",
    kind: "learning",
    visual: "ml-labs",
  },
  "AI Code Arena Quest": {
    category: "Learning product",
    summary: "The machine-learning practice environment I wished I had: code-first challenges, real datasets, and immediate feedback.",
    primaryHref: "/showcase/AICodeArena",
    primaryLabel: "Read case study",
    secondaryHref: "https://practai-8qr1e.netlify.app/",
    secondaryLabel: "Try the product",
    kind: "original",
    visual: "code-arena",
  },
  "DeFtunes Data Pipeline": {
    category: "Data platform",
    summary: "One dataset, end to end—from ingestion and orchestration to modelling and a decision-ready dashboard.",
    primaryHref: "/showcase/deftunes",
    primaryLabel: "Read case study",
    secondaryHref: "https://github.com/YKaanKaya/deftunes-data-pipeline",
    secondaryLabel: "View source",
    kind: "original",
    visual: "deftunes",
  },
  "GraphFlow ETL Suite": {
    category: "Data product",
    summary: "A TypeScript workbench for turning tables into graph schemas and repeatable Neo4j loads.",
    primaryHref: "https://github.com/YKaanKaya/graphify",
    primaryLabel: "View source",
    kind: "original",
    visual: "graphflow",
  },
  "LectureNotes RAG System": {
    category: "Applied AI",
    summary: "A local-first retrieval system for grounded questions over my academic notes, using FAISS and private inference.",
    primaryHref: "/showcase/LectureNotesRAG",
    primaryLabel: "Read case study",
    secondaryHref: "https://github.com/YKaanKaya/LectureNotes-RAG-System",
    secondaryLabel: "View source",
    kind: "original",
    visual: "rag",
  },
  "Stock Performance & ESG Scores": {
    category: "Finance experiment",
    summary: "An early bridge between my finance background and Python, exploring company performance beside public ESG indicators.",
    primaryHref: "https://gsinfo.streamlit.app/",
    primaryLabel: "Open dashboard",
    secondaryHref: "https://github.com/YKaanKaya/globalstockinfo",
    secondaryLabel: "View source",
    kind: "original",
    visual: "stock-esg",
  },
  "PyTorch for Deep Learning": {
    category: "Course work · clearly credited",
    summary: "Forty-four notebooks covering fundamentals, architectures, tuning, interpretation, and ONNX deployment.",
    primaryHref: "/showcase/PyTorchDeepLearning",
    primaryLabel: "Browse notebooks",
    secondaryHref: "https://github.com/YKaanKaya/deeplearning-ai-pytorch",
    secondaryLabel: "View source",
    kind: "learning",
    visual: "pytorch",
  },
  "Machine Learning Specialization": {
    category: "Course work · clearly credited",
    summary: "Implementations spanning regression, neural networks, clustering, recommenders, and reinforcement learning.",
    primaryHref: "/showcase/MachineLearning",
    primaryLabel: "Browse notebooks",
    secondaryHref: "https://github.com/YKaanKaya/Machine-learning",
    secondaryLabel: "View source",
    kind: "learning",
    visual: "ml-labs",
  },
  "NVIDIA Multimodal AI Agents": {
    category: "Course work · clearly credited",
    summary: "Eight attributed notebooks on multimodal fusion, OCR, vector search, and Graph RAG.",
    primaryHref: "/showcase/NvidiaMultimodalAI/",
    primaryLabel: "Browse notebooks",
    kind: "learning",
    visual: "multimodal",
  },
}

const projectOrder = [
  "AI Code Arena Quest",
  "DeFtunes Data Pipeline",
  "GraphFlow ETL Suite",
  "LectureNotes RAG System",
  "Stock Performance & ESG Scores",
  "Evaluating and Improving Agentic Applications",
  "PyTorch for Deep Learning",
  "Machine Learning Specialization",
  "NVIDIA Multimodal AI Agents",
]

const featuredProjectTitles = new Set(projectOrder.slice(0, 4))

const orderedProjects = projectOrder
  .map((title) => projects.find((project) => project.title === title))
  .filter((project): project is (typeof projects)[number] => Boolean(project))

const featuredProjects = orderedProjects.filter((project) => featuredProjectTitles.has(project.title))
const archiveProjects = orderedProjects.filter((project) => !featuredProjectTitles.has(project.title))

const skillGroups = [
  { label: "Data platforms", items: skills.dataEngineering },
  { label: "Machine learning", items: skills.ai },
  { label: "Decision interfaces", items: skills.bi },
]

const recentCredentialNames = new Set([
  "Evaluating and Improving Agentic Applications",
  "PyTorch for Deep Learning Professional Certificate",
  "Building AI Agents with Multimodal Models",
  "Data Engineering and AWS",
])

const recentCredentials = certificates.filter((certificate) => recentCredentialNames.has(certificate.name))

function ExternalAwareLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const external = href.startsWith("http")
  return (
    <Link href={href} className={className} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      {children}
    </Link>
  )
}

export function ProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePractice, setActivePractice] = useState<CapabilityKind>("platform")
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const activeStep = practiceSteps.find((step) => step.id === activePractice) ?? practiceSteps[0]

  const navigateFromMenu = (event: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    setMenuOpen(false)
    window.setTimeout(() => {
      const target = document.querySelector(href)
      if (target instanceof HTMLElement) {
        window.history.pushState(null, "", href)
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 220)
  }

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1121px)")
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    desktopQuery.addEventListener("change", closeAtDesktop)
    return () => desktopQuery.removeEventListener("change", closeAtDesktop)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="retro-profile retro-minimal-profile" id="top">
        <a href="#main-content" className="retro-skip-link">Skip to main content</a>

        <header className="retro-nav-shell">
          <div className="retro-container retro-nav">
            <a href="#top" className="retro-brand" aria-label="Kaan Kaya, back to top">
              <span className="retro-brand-disc">KK</span>
              <span><strong>Kaan Kaya</strong><small>DATA SCIENTIST</small></span>
            </a>
            <nav className="retro-desktop-nav" aria-label="Main navigation">
              {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            </nav>
            <a className="retro-nav-contact" href={`mailto:${personalInfo.email}`}>Email Kaan <ArrowUpRight aria-hidden="true" /></a>
            <button
              ref={menuButtonRef}
              className="retro-menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="retro-mobile-navigation"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.nav
                id="retro-mobile-navigation"
                className="retro-mobile-nav"
                aria-label="Mobile navigation"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="retro-container">
                  {navItems.map((item) => (
                    <a key={item.href} href={item.href} onClick={(event) => navigateFromMenu(event, item.href)}>
                      {item.label}<ArrowRight aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <main id="main-content">
          <section className="retro-band retro-hero retro-edited-hero" aria-labelledby="hero-title">
            <div className="retro-sunburst" aria-hidden="true" />
            <div className="retro-container retro-hero-grid">
              <div className="retro-hero-copy">
                <p className="retro-catalog">KAAN KAYA · DATA SCIENTIST · LUXEMBOURG</p>
                <h1 id="hero-title">From financial controls<br /><em>to decision systems.</em></h1>
                <p className="retro-hero-lede">
                  I spent a decade moving upstream—from reconciling the number, to building the data platform behind it, to modelling what informs the decision. Today I work across prediction, explainability, and causal inference.
                </p>
                <div className="retro-hero-actions">
                  <a href="#projects" className="retro-button retro-button-primary">See selected work <ArrowRight aria-hidden="true" /></a>
                  <a href="#experience" className="retro-text-link">See work history <ArrowRight aria-hidden="true" /></a>
                </div>
                <p className="retro-focus-line"><span>Current focus</span> Platforms · LightGBM · SHAP · DML / DoWhy</p>
              </div>

              <div className="retro-receiver-wrap">
                <div className="retro-receiver-shadow" aria-hidden="true" />
                <div className="retro-receiver" aria-hidden="true">
                  <div className="retro-receiver-topline">
                    <div><span>CAREER</span><strong>SIGNAL</strong></div>
                    <p>KAAN KAYA<br />LUXEMBOURG</p>
                  </div>
                  <div className="retro-receiver-screen">
                    <div className="retro-screen-labels"><span>FINANCE → DATA SCIENCE</span><span>SINCE 2015</span></div>
                    <RetroSignal />
                    <div className="retro-screen-scale" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                  </div>
                  <div className="retro-console">
                    <div className="retro-knob"><span /><small>RIGOUR</small></div>
                    <div className="retro-station"><p>ROUTE</p><div>{["P&L", "DATA", "ML", "CAUSAL"].map((step) => <span key={step}>{step}</span>)}</div></div>
                    <div className="retro-knob"><span /><small>USE</small></div>
                  </div>
                  <div className="retro-receiver-footer"><span>FINANCE TRAINED</span><span>SYSTEMS BUILDER</span><span>DECISION FOCUSED</span></div>
                </div>
              </div>
            </div>
            <div className="retro-container retro-biography-strip" aria-label="Profile summary">
              <span>Since 2015 across finance and data</span><i aria-hidden="true" />
              <span>{orderedProjects.length} public builds</span><i aria-hidden="true" />
              <span>2 master&apos;s degrees</span>
            </div>
          </section>

          <section id="projects" className="retro-band retro-projects retro-edited-section" aria-labelledby="projects-title">
            <div className="retro-container">
              <header className="retro-editorial-heading">
                <p className="retro-instrument-label">PUBLIC WORK</p>
                <div>
                  <h2 id="projects-title">What I can show<br /><em>in the open.</em></h2>
                  <p>My day-to-day work is private. These projects show how I think about systems, models, and useful products.</p>
                </div>
              </header>

              <div className="retro-featured-work">
                {featuredProjects.map((project, index) => {
                  const meta = projectMeta[project.title]
                  if (!meta) return null
                  return (
                    <article key={project.title} className="retro-featured-project retro-project-card" data-tone="coral">
                      <div className="retro-featured-cover">
                        <span className="retro-work-index">0{index + 1}</span>
                        <ProjectVisual kind={meta.visual} />
                      </div>
                      <div className="retro-featured-copy">
                        <p className="retro-project-kind">ORIGINAL BUILD · {meta.category}</p>
                        <h3>{project.title}</h3>
                        <p>{meta.summary}</p>
                        <p className="retro-project-stack">{project.tags.slice(0, 3).join(" · ")}</p>
                        <div className="retro-project-actions">
                          <ExternalAwareLink href={meta.primaryHref} className="retro-project-link">{meta.primaryLabel} <ArrowUpRight aria-hidden="true" /></ExternalAwareLink>
                          {meta.secondaryHref && (
                            <ExternalAwareLink href={meta.secondaryHref} className="retro-text-link">{meta.secondaryLabel} <ArrowUpRight aria-hidden="true" /></ExternalAwareLink>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>

              <div className="retro-work-index-list">
                <div className="retro-work-list-heading">
                  <h3>More from the lab</h3>
                  <a href={personalInfo.github} target="_blank" rel="noreferrer">Full GitHub profile <ArrowUpRight aria-hidden="true" /></a>
                </div>
                {archiveProjects.map((project) => {
                  const meta = projectMeta[project.title]
                  if (!meta) return null
                  return (
                    <article key={project.title} className="retro-work-row" data-kind={meta.kind}>
                      <p>{meta.kind === "learning" ? "COURSE WORK · CLEARLY CREDITED" : "ORIGINAL EXPERIMENT"}</p>
                      <div><h4>{project.title}</h4><span>{meta.summary}</span></div>
                      <ExternalAwareLink href={meta.primaryHref}>{meta.primaryLabel}<ArrowUpRight aria-hidden="true" /></ExternalAwareLink>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          <section id="experience" className="retro-band retro-experience retro-edited-section" aria-labelledby="experience-title">
            <div className="retro-container">
              <header className="retro-editorial-heading">
                <p className="retro-instrument-label">WORK HISTORY · 2015—PRESENT</p>
                <div>
                  <h2 id="experience-title">Data scientist from the start.<br /><em>Broader because of the route.</em></h2>
                  <p>I began in e-commerce data science, then worked through P&amp;L, market risk, regulatory reporting, platforms, and data products. Each step added context I now bring to modelling and causal work.</p>
                </div>
              </header>

              <div className="retro-career-timeline" aria-label="Full work history">
                <div className="retro-career-timeline-head">
                  <h3>Full work history</h3>
                  <p>Eight roles · finance, platforms, and data science</p>
                </div>
                <ol>
                  {experience.map((job, index) => (
                    <li key={`${job.company}-${job.period}`} className={index === 0 ? "is-current" : index === experience.length - 1 ? "is-origin" : undefined}>
                      <p className="retro-career-date">{job.period}</p>
                      <div className="retro-career-rail" aria-hidden="true"><i /></div>
                      <article className="retro-career-entry">
                        <header>
                          <div>
                            <p>{job.company}</p>
                            <h3>{job.title}</h3>
                            {index === 0 && <em>CURRENT ROLE</em>}
                            {index === experience.length - 1 && <em>FIRST DATA SCIENCE ROLE</em>}
                          </div>
                          <span><MapPin aria-hidden="true" /> {job.location}</span>
                        </header>
                        <p>{job.description}</p>
                        <small>{job.tags.slice(0, 3).join(" · ")}</small>
                      </article>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section id="practice" className="retro-band retro-practice retro-edited-section" aria-labelledby="practice-title">
            <div className="retro-container">
              <header className="retro-editorial-heading">
                <p className="retro-instrument-label">HOW I WORK</p>
                <div>
                  <h2 id="practice-title">Start with the decision.<br /><em>Work backwards.</em></h2>
                  <p>The model is only useful if the data holds up, the reasoning can be inspected, and the result fits the way people work.</p>
                </div>
              </header>

              <div className="retro-method-console" data-tone={activeStep.tone}>
                <div className="retro-method-nav" role="tablist" aria-label="How I work">
                  {practiceSteps.map((step) => (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      id={`method-tab-${step.id}`}
                      aria-selected={activePractice === step.id}
                      aria-controls="method-stage"
                      onClick={() => setActivePractice(step.id)}
                    >
                      <span>{step.number}</span><strong>{step.action}</strong><small>{step.methods}</small>
                    </button>
                  ))}
                </div>
                <motion.div
                  key={activeStep.id}
                  id="method-stage"
                  className="retro-method-stage"
                  role="tabpanel"
                  aria-labelledby={`method-tab-${activeStep.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="retro-method-copy">
                    <p>{activeStep.number} / {activeStep.action.toUpperCase()}</p>
                    <h3>{activeStep.prompt}</h3>
                    <span>{activeStep.response}</span>
                    <strong>{activeStep.methods}</strong>
                  </div>
                  <CapabilityAnimation kind={activeStep.id} />
                </motion.div>
              </div>
              <p className="retro-public-note">At Amazon, I build internal decision-support data products. Business context, scale, and implementation details remain private.</p>
            </div>
          </section>

          <section id="archive" className="retro-band retro-archive retro-edited-section" aria-labelledby="archive-title">
            <div className="retro-container">
              <header className="retro-editorial-heading">
                <p className="retro-instrument-label">EDUCATION & LEARNING</p>
                <div>
                  <h2 id="archive-title">Two disciplines.<br /><em>One practice.</em></h2>
                  <p>Finance taught me to respect the number. Computer science is helping me build the systems around it.</p>
                </div>
              </header>

              <div className="retro-degree-ledger">
                {education.map((item) => (
                  <article key={item.degree}>
                    <p>{item.period}{item.current ? " · IN PROGRESS" : ""}</p>
                    <h3>{item.degree}</h3>
                    <strong>{item.school}</strong>
                    <span>{item.description}</span>
                  </article>
                ))}
              </div>

              <div className="retro-learning-grid">
                <section aria-labelledby="credentials-title">
                  <div className="retro-minor-heading"><p>RECENT CREDENTIALS</p><h3 id="credentials-title">Selected learning</h3></div>
                  <div className="retro-credential-ledger">
                    {recentCredentials.map((certificate) => (
                      <a key={certificate.name} href={certificate.link} target="_blank" rel="noreferrer">
                        <span>{certificate.year}</span><div><strong>{certificate.name}</strong><small>{certificate.issuer}</small></div><ArrowUpRight aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                  <details className="retro-disclosure retro-credential-disclosure">
                    <summary>See all {certificates.length} credentials <ChevronDown aria-hidden="true" /></summary>
                    <div className="retro-credential-ledger">
                      {certificates.map((certificate) => {
                        const content = <><span>{certificate.year}</span><div><strong>{certificate.name}</strong><small>{certificate.issuer}</small></div>{certificate.link !== "#" && <ArrowUpRight aria-hidden="true" />}</>
                        return certificate.link === "#"
                          ? <div key={certificate.name}>{content}</div>
                          : <a key={certificate.name} href={certificate.link} target="_blank" rel="noreferrer">{content}</a>
                      })}
                    </div>
                  </details>
                </section>

                <section aria-labelledby="toolkit-title">
                  <div className="retro-minor-heading"><p>WORKING TOOLKIT</p><h3 id="toolkit-title">Tools, in context</h3></div>
                  <div className="retro-toolkit-ledger">
                    {skillGroups.map((group) => (
                      <div key={group.label}><strong>{group.label}</strong><p>{group.items.map((item) => item.name).join(" · ")}</p></div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="retro-personal-note">
                <p>Based in Luxembourg. I work in English and Turkish, speak Polish conversationally, and am learning Luxembourgish and French.</p>
                <p>Away from the screen: electric guitar, piano, and gardening.</p>
              </div>
            </div>
          </section>

          <section id="contact" className="retro-band retro-contact retro-final-contact" aria-labelledby="contact-title">
            <div className="retro-container retro-contact-inner">
              <div><p className="retro-instrument-label">CONTACT</p><h2 id="contact-title">Let&apos;s compare notes.</h2></div>
              <div className="retro-contact-panel">
                <p>If you are working on a messy decision problem—or simply want to compare approaches to explainable ML, causal inference, or data platforms—send me a note.</p>
                <div>
                  <a href={`mailto:${personalInfo.email}`}>Email Kaan <ArrowUpRight aria-hidden="true" /></a>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="retro-footer">
          <div className="retro-container">
            <div className="retro-brand"><span className="retro-brand-disc">KK</span><span><strong>Kaan Kaya</strong><small>DATA SCIENTIST</small></span></div>
            <p>© {new Date().getFullYear()} · Luxembourg · Built with care</p>
            <div><a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github aria-hidden="true" /></a><a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin aria-hidden="true" /></a><a href={`mailto:${personalInfo.email}`} aria-label="Email"><Mail aria-hidden="true" /></a></div>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}
