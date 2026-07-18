"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowDownRight, ArrowUpRight, Boxes, BrainCircuit, Check, Github,
  GitMerge, Linkedin, Mail, MapPin, Menu, Network, Orbit, X,
} from "lucide-react"
import { experience, personalInfo, projects } from "@/lib/data"

const navItems = [
  { label: "Now", href: "#now" },
  { label: "Approach", href: "#approach" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
]

const currentWork = [
  { index: "01", title: "Decision platforms", description: "Reusable foundations connecting trusted data, modelling workflows, evaluation, and decision-facing outputs.", detail: "Platform building", icon: Boxes },
  { index: "02", title: "Decision modelling", description: "Predictive workflows designed to support scenario analysis and informed operational choices.", detail: "Predictive analytics", icon: Orbit },
  { index: "03", title: "Explainable ML", description: "Transparent diagnostics that help stakeholders understand important patterns and model limitations.", detail: "Interpretability", icon: BrainCircuit },
  { index: "04", title: "Causal evidence", description: "Structured methods for reasoning about effects, assumptions, uncertainty, and robustness.", detail: "Causal inference", icon: GitMerge },
]

const principles = [
  ["Prediction", "Learn the operational pattern", "LightGBM"],
  ["Attribution", "Expose the model's reasoning", "SHAP / Shapley"],
  ["Causality", "Test what may change the outcome", "DML / DoWhy"],
  ["Decision", "Ship evidence into a usable system", "Platform"],
]

const projectDescriptions: Record<string, string> = {
  "AI Code Arena Quest": "An interactive learning product that turns machine-learning concepts into hands-on practice.",
  "DeFtunes Data Pipeline": "An end-to-end analytical platform built across orchestration, transformation, warehousing, and BI.",
  "PyTorch for Deep Learning": "A practical body of work spanning modern neural architectures, optimization, and deployment.",
  "LectureNotes RAG System": "A GPU-accelerated retrieval system for grounded question answering over technical material.",
}

const selectedProjects = ["DeFtunes Data Pipeline", "AI Code Arena Quest", "PyTorch for Deep Learning", "LectureNotes RAG System"]
  .map((name) => projects.find((project) => project.title === name))
  .filter((project): project is (typeof projects)[number] => Boolean(project))

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }

export function ProfilePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="profile-shell min-h-screen overflow-x-hidden">
      <header className="profile-nav">
        <div className="profile-container flex h-[72px] items-center justify-between">
          <a href="#top" className="profile-mark" aria-label="Back to top">K<span>/</span>K</a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {navItems.map((item) => <a key={item.href} href={item.href} className="profile-nav-link">{item.label}</a>)}
          </nav>
          <a className="profile-nav-cta hidden sm:inline-flex" href={`mailto:${personalInfo.email}`}>Start a conversation <ArrowUpRight className="h-3.5 w-3.5" /></a>
          <button className="profile-menu-button md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="profile-mobile-nav md:hidden">
              {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
              <a href={`mailto:${personalInfo.email}`}>Contact</a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="top" className="profile-hero">
          <div className="profile-orbit profile-orbit-one" /><div className="profile-orbit profile-orbit-two" />
          <div className="profile-container relative z-10 grid items-center gap-14 pb-16 pt-36 lg:min-h-[800px] lg:grid-cols-[1.12fr_0.88fr] lg:pb-24 lg:pt-28">
            <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
              <motion.div variants={reveal} className="profile-kicker mb-7"><span className="profile-status-dot" />Data Scientist · Luxembourg</motion.div>
              <motion.p variants={reveal} className="profile-eyebrow">Kaan Kaya / Profile 2026</motion.p>
              <motion.h1 variants={reveal} className="profile-display mt-4 max-w-[780px] text-[clamp(3.25rem,7.4vw,7.25rem)] leading-[0.88]">Models for the <em>real</em> world.</motion.h1>
              <motion.p variants={reveal} className="mt-8 max-w-[650px] text-lg leading-8 text-[#a9aea5] sm:text-xl">I build data products that move from prediction to explanation to causality—so operational teams can make better, defensible decisions.</motion.p>
              <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#now" className="profile-primary-button">Explore my approach <ArrowDownRight className="h-4 w-4" /></a>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="profile-text-link">LinkedIn <ArrowUpRight className="h-4 w-4" /></a>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.35 }} className="model-window">
              <div className="model-window-bar">
                <div className="flex items-center gap-2"><span /><span /><span /></div><p>decision_model / validation</p><p className="hidden sm:block">validated</p>
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div><p className="profile-mono-label">DECISION SYSTEM</p><h2 className="mt-2 text-xl font-medium text-[#edf0e8]">From signals to evidence</h2></div>
                  <span className="model-check"><Check className="h-3.5 w-3.5" /> live</span>
                </div>
                <div className="model-chart mt-8" aria-label="Stylized model diagnostic chart">
                  <div className="model-chart-labels"><span>observed</span><span>benchmark</span></div>
                  <svg viewBox="0 0 520 220" role="img" aria-hidden="true">
                    <defs><linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#d5ff45" stopOpacity="0.32" /><stop offset="100%" stopColor="#d5ff45" stopOpacity="0" /></linearGradient></defs>
                    <path className="chart-grid" d="M0 55H520M0 110H520M0 165H520M104 0V220M208 0V220M312 0V220M416 0V220" />
                    <path className="chart-area" d="M0 179 C45 175 57 142 101 147 C147 152 163 108 205 122 C247 136 270 84 312 91 C356 98 369 52 417 70 C458 85 480 31 520 38 L520 220 L0 220 Z" />
                    <path className="chart-line" d="M0 179 C45 175 57 142 101 147 C147 152 163 108 205 122 C247 136 270 84 312 91 C356 98 369 52 417 70 C458 85 480 31 520 38" />
                    <path className="chart-dash" d="M0 196 C72 181 101 170 155 156 C213 140 255 132 312 105 C377 75 435 58 520 27" /><circle cx="312" cy="91" r="6" />
                  </svg>
                </div>
                <div className="model-pipeline mt-7">
                  {[["01", "Predict", "LGBM"], ["02", "Explain", "SHAP"], ["03", "Estimate", "DML"]].map(([number, label, tool]) => (
                    <div key={number}><span>{number}</span><p>{label}</p><strong>{tool}</strong></div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          <div className="profile-container relative z-10 grid border-y border-[#293029] sm:grid-cols-3">
            {[["10+", "years across data, finance & risk"], ["4", "linked layers: data → decision"], ["1", "principle: useful models earn trust"]].map(([value, label]) => (
              <div key={label} className="profile-stat"><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </section>

        <section id="now" className="profile-section bg-[#f0f1e8] text-[#111510]">
          <div className="profile-container">
            <div className="profile-section-heading grid gap-8 lg:grid-cols-[0.42fr_1fr]">
              <div><p className="profile-light-label">01 / PRACTICE</p><div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#566052]"><span className="profile-status-dot" /> Selected capabilities</div></div>
              <div>
                <h2 className="profile-display max-w-[880px] text-[clamp(2.75rem,5.8vw,5.8rem)] leading-[0.94]">Building systems for <em>evidence-led decisions.</em></h2>
                <p className="mt-7 max-w-[720px] text-lg leading-8 text-[#596057]">Across my work and independent practice, I focus on reliable platforms, predictive modelling, explainability, and causal reasoning.</p>
              </div>
            </div>
            <div className="current-work-grid mt-16">
              {currentWork.map((item) => (
                <article key={item.title} className="current-work-card group">
                  <div className="flex items-start justify-between"><span className="profile-card-index">{item.index}</span><item.icon className="h-5 w-5 text-[#687264] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" /></div>
                  <h3 className="mt-14 text-2xl font-medium tracking-[-0.03em]">{item.title}</h3><p className="mt-4 leading-7 text-[#60675e]">{item.description}</p>
                  <div className="mt-8 border-t border-[#cbd0c4] pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#414a3e]">{item.detail}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="profile-section profile-approach">
          <div className="profile-container grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
            <div>
              <p className="profile-dark-label">02 / APPROACH</p><h2 className="profile-display mt-8 text-[clamp(3rem,5vw,5.7rem)] leading-[0.93]">A model is only one <em>layer.</em></h2>
              <p className="mt-8 max-w-[570px] text-lg leading-8 text-[#a9aea5]">The useful unit is a decision system: reliable inputs, strong prediction, honest explanations, causal assumptions, and an interface people can act on.</p>
              <div className="profile-quote mt-12"><Network className="h-5 w-5 text-[#d5ff45]" /><p>“Make uncertainty visible. Make reasoning inspectable. Make the next action clearer.”</p></div>
            </div>
            <div className="principle-stack">
              {principles.map(([title, description, tool], index) => (
                <article key={title} className="principle-row"><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><strong>{tool}</strong></article>
              ))}
              <div className="principle-path" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section id="work" className="profile-section bg-[#d4ff42] text-[#10140e]">
          <div className="profile-container">
            <div className="flex flex-col justify-between gap-8 border-b border-[#759220] pb-10 md:flex-row md:items-end">
              <div><p className="profile-light-label">03 / SELECTED WORK</p><h2 className="profile-display mt-6 text-[clamp(3rem,6vw,6rem)] leading-none">Built to learn.<br />Built to run.</h2></div>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="profile-ink-link">View GitHub <ArrowUpRight className="h-4 w-4" /></a>
            </div>
            <div className="project-list">
              {selectedProjects.map((project, index) => {
                const target = project.demoLink || project.link
                return (
                  <Link key={project.title} href={target} target={target.startsWith("http") ? "_blank" : undefined} rel={target.startsWith("http") ? "noreferrer" : undefined} className="project-row group">
                    <span>0{index + 1}</span><div><h3>{project.title}</h3><p>{projectDescriptions[project.title] || project.description}</p><div className="mt-4 flex flex-wrap gap-2">{project.tags.slice(0, 4).map((tag) => <em key={tag}>{tag}</em>)}</div></div>
                    <ArrowUpRight className="h-8 w-8 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section id="journey" className="profile-section bg-[#f0f1e8] text-[#111510]">
          <div className="profile-container grid gap-14 lg:grid-cols-[0.38fr_1fr] lg:gap-24">
            <div><p className="profile-light-label">04 / JOURNEY</p><h2 className="profile-display mt-7 text-5xl leading-none">Context is a feature.</h2><p className="mt-7 leading-7 text-[#62685f]">Experience across big tech, fintech, asset management, and banking shapes how I frame risk, cost, and operational decisions.</p></div>
            <div className="journey-list">
              {experience.slice(0, 5).map((job, index) => (
                <article key={`${job.company}-${job.period}`} className="journey-row">
                  <div className="journey-period">{job.period}</div>
                  <div><div className="flex flex-wrap items-baseline justify-between gap-2"><h3>{job.title}</h3><span>{job.company}</span></div><p>{index === 0 ? job.description : job.highlights[0]}</p>
                    {index === 0 && <div className="mt-5 flex flex-wrap gap-2">{job.tags.map((tag) => <em key={tag}>{tag}</em>)}</div>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="profile-contact">
          <div className="profile-container relative z-10 py-24 text-center sm:py-32">
            <p className="profile-dark-label">05 / CONTACT</p><h2 className="profile-display mx-auto mt-8 max-w-[960px] text-[clamp(3.2rem,8vw,8rem)] leading-[0.88]">Let’s make the question <em>sharper.</em></h2>
            <p className="mx-auto mt-8 max-w-[650px] text-lg leading-8 text-[#a9aea5]">I’m always interested in rigorous data science, causal inference, and the craft of turning complex models into useful products.</p>
            <a href={`mailto:${personalInfo.email}`} className="profile-contact-link mt-12">{personalInfo.email} <ArrowUpRight className="h-6 w-6" /></a>
          </div>
        </section>
      </main>

      <footer className="profile-footer">
        <div className="profile-container flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kaan Kaya · Luxembourg</p>
          <div className="flex items-center gap-5"><a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="h-4 w-4" /></a><a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a><a href={`mailto:${personalInfo.email}`} aria-label="Email"><Mail className="h-4 w-4" /></a><span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Luxembourg</span></div>
        </div>
      </footer>
    </div>
  )
}
