import type { Metadata } from "next"
import { ArrowDown, ArrowUpRight, Check, Github, GraduationCap } from "lucide-react"
import { EvidenceGallery } from "./EvidenceGallery"
import styles from "./showcase.module.css"

const repository = "https://github.com/YKaanKaya/deeplearning-ai-agentic-evaluation"
const certificate = "https://learn.deeplearning.ai/certificates/03976233-64c4-4195-a504-d5676a73f825"
const url = "https://yasarkaankaya.com/showcase/agentic-evaluation/"
const title = "Evaluating and Improving Agentic Applications | Kaan Kaya"
const description = "A documented Northwind support-agent evaluation journey: Phoenix traces, benchmark design, evaluator validation, layered checks and case-aligned regression analysis."

export const metadata: Metadata = {
  title,
  description,
  keywords: ["agent evaluation", "Phoenix", "DeepLearning.AI", "LLM judges", "regression testing", "observability", "AI agents"],
  alternates: { canonical: url },
  openGraph: { title, description, type: "website", url, images: [{ url: "/agentic-evaluation/m5-comparison.webp", alt: "Saved Phoenix experiment comparison" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/agentic-evaluation/m5-comparison.webp"] },
  robots: { index: true, follow: true },
}

const modules = [
  { number: "01", title: "Foundations of evaluations and tracing", folder: "Module-01-foundations-of-evals", question: "What happened inside the agent?", method: "Instrument Python execution and inspect Phoenix traces, spans, tool calls and model responses.", observation: "The trace becomes a debugging record: a fluent answer is only the visible end of a larger sequence of actions.", lesson: "Start with observable behavior and a concrete definition of success." },
  { number: "02", title: "Observing and benchmarking agents", folder: "Module-02-observing-and-benchmarking-agents", question: "Which failures deserve a test?", method: "Translate Northwind support requirements into cases, label errors and use synthetic cases to expand coverage.", observation: "A benchmark needs normal requests, edge cases and failure categories. A convenient sample alone does not establish representative coverage.", lesson: "Keep requirements, case identity and failure labels connected." },
  { number: "03", title: "Building evaluators you can trust", folder: "Module-03-building-evaluators-you-can-trust", question: "Can the evaluator itself be trusted?", method: "Combine code checks with rubric-based LLM judges; compare judge decisions with human labels using accuracy and Cohen's kappa.", observation: "Both policy-compliance judges score 0.750 accuracy and 0.400 kappa on the saved 12-case final test. A separate perfect validation result follows a human-label change.", lesson: "Validate the measurement process, preserve label changes and keep the test set distinct." },
  { number: "04", title: "Evaluating actions and outcomes", folder: "Module-04-evaluating-agent-actions-and-outcomes", question: "Was the right work actually done?", method: "Evaluate tool selection, invocation arguments, trajectories, conversation context, policy compliance and final state.", observation: "The saved 12-case summary has 6 selection failures and 8 invocation failures, versus 1 outcome failure and 1 policy failure. These checks measure different things.", lesson: "Grounding, correct tool use and successful task completion need separate evidence." },
  { number: "05", title: "Comparing improvements and regressions", folder: "Module-05-improving-agentic-applications", question: "Did a change help the same cases?", method: "Compare prompt variants, inspect known-good cases for regressions and turn production-style failures into regression tests.", observation: "The graded comparison gives v1, v2 and v3 the same grounding result: 3 of 5 cases. Aligning cases by identity corrects a misleading positional comparison.", lesson: "A trustworthy comparison starts with a valid join. Inspect tradeoffs before selecting a version." },
]

const cycle = [
  { number: "01", title: "Define", text: "Requirements → test cases" },
  { number: "02", title: "Observe", text: "Traces → failure labels" },
  { number: "03", title: "Measure", text: "Validated evaluators" },
  { number: "04", title: "Compare", text: "Same cases, new variant" },
  { number: "05", title: "Regress", text: "Failures → durable tests" },
]

function SourceLink({ path, children }: { path: string; children: React.ReactNode }) {
  return <a className={styles.sourceLink} href={`${repository}/blob/main/${path}`} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={14} aria-hidden="true" /></a>
}

export default function AgenticEvaluationPage() {
  return (
    <article className={styles.page} itemScope itemType="https://schema.org/TechArticle">
      <meta itemProp="name" content="Evaluating and Improving Agentic Applications" />
      <meta itemProp="author" content="Kaan Kaya" />
      <a className={styles.skipLink} href="#journey">Skip to the module journey</a>
      <div className={styles.container}>
        <header id="top" className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>DeepLearning.AI × Arize AI / course learning journal</p>
            <p className={styles.courseTitle}>Evaluating and Improving Agentic Applications</p>
            <h1>From Agent Traces<br />to <em>Measurable<br />Improvements.</em></h1>
            <p className={styles.introduction}>How do you know an AI agent did the right thing? I followed a support agent from its first trace to a regression benchmark—and found why the evaluation code needs scrutiny too.</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href={repository} target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> Explore the repository <ArrowUpRight size={15} aria-hidden="true" /></a>
              <a className={styles.secondaryButton} href={certificate} target="_blank" rel="noreferrer"><GraduationCap size={18} aria-hidden="true" /> View certificate <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
            <a className={styles.jumpLink} href="#journey">Explore the five modules <ArrowDown size={15} aria-hidden="true" /></a>
          </div>
          <aside className={styles.caseCard} aria-label="Project at a glance">
            <div className={styles.caseCardHeader}><span>CASE FILE / AE.07</span><span className={styles.dot} aria-hidden="true" /></div>
            <p className={styles.cardLabel}>The scenario</p>
            <h2>Northwind<br />support agent</h2>
            <p>A fictional apparel retailer. Customer requests require grounded answers, policy-aware decisions and the right tool actions.</p>
            <div className={styles.traceDiagram} aria-label="A request creates agent, model and tool spans that feed evaluation">
              <span>Customer request</span>
              <div><span>Agent trace</span><div><span>Model</span><span>Tools</span></div></div>
              <strong>Evaluate behavior + outcome</strong>
            </div>
            <dl className={styles.facts}>
              <div><dt>Scope</dt><dd>5 modules</dd></div>
              <div><dt>Stack</dt><dd>Python · Phoenix · Pandas</dd></div>
              <div><dt>Completion reported</dt><dd>14 November 2026</dd></div>
            </dl>
          </aside>
        </header>

        <nav className={styles.pageNav} aria-label="On this page">
          <a href="#cycle">Evaluation cycle</a><a href="#journey">Module journey</a><a href="#evidence">Visual evidence</a><a href="#findings">Verified findings</a><a href="#sources">Sources & scope</a>
        </nav>

        <section id="cycle" className={styles.section} aria-labelledby="cycle-title">
          <div className={styles.sectionHeader}><p className={styles.eyebrow}>The working method</p><div><h2 id="cycle-title">Make improvement<br /><em>an inspectable loop.</em></h2><p>The course connects observability with evaluation. My documentation preserves the decisions, failures and comparison checks that make the loop useful.</p></div></div>
          <ol className={styles.cycle}>
            {cycle.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
          </ol>
          <p className={styles.loopNote}>↳ Use each failure to refine the requirement, the evaluator or the next regression case.</p>
        </section>

        <section id="journey" className={styles.section} aria-labelledby="journey-title">
          <div className={styles.sectionHeader}><p className={styles.eyebrow}>Five modules / one thread</p><div><h2 id="journey-title">From “looks right”<br /><em>to evidence.</em></h2><p>Open a module for the method, the saved observation and its practical lesson. The repository links provide the detailed evidence and limitations.</p></div></div>
          <div className={styles.journey}>
            {modules.map((module) => <details key={module.number} className={styles.module} open={module.number === "05"}>
              <summary><span className={styles.moduleNumber}>{module.number}</span><div><h3>{module.title}</h3><p>{module.question}</p></div><span className={styles.expandIcon} aria-hidden="true">+</span></summary>
              <div className={styles.moduleBody}><div><h4>Method</h4><p>{module.method}</p></div><div><h4>Saved observation</h4><p>{module.observation}</p></div><div className={styles.moduleLesson}><Check size={17} aria-hidden="true" /><p>{module.lesson}</p></div><SourceLink path={`${module.folder}/README.md`}>Read module {module.number} documentation</SourceLink></div>
            </details>)}
          </div>
        </section>

        <section id="evidence" className={styles.section} aria-labelledby="evidence-title">
          <div className={styles.sectionHeader}><p className={styles.eyebrow}>Inside the saved work</p><div><h2 id="evidence-title">Traces you can follow.<br /><em>Findings you can inspect.</em></h2><p>Selected captures from the hosted Phoenix labs. Captions explain the observation and its limits; the recordings document snapshots, rather than a new execution.</p></div></div>
          <EvidenceGallery />
          <SourceLink path="docs/RESULTS.md">Read the result provenance and caveats</SourceLink>
        </section>

        <section id="findings" className={styles.section} aria-labelledby="findings-title">
          <div className={styles.sectionHeader}><p className={styles.eyebrow}>Selected technical findings</p><div><h2 id="findings-title">Check the measurement<br /><em>before the conclusion.</em></h2></div></div>
          <div className={styles.findingGrid}>
            <div className={styles.leadFinding}><span className={styles.eyebrow}>Comparison integrity / Module 5</span><h3>Row position is not case identity.</h3><p>Experiment exports may return cases in different orders. Comparing the first row of one run with the first row of another can manufacture a gain or a regression.</p><p>The saved graded comparison contains the same grounding result for all three prompt versions: <strong>3/5 cases</strong>. Case alignment changes the interpretation of the original positional summary.</p><pre aria-label="Synthetic case identity comparison code"><code>{`# Validate unique identities and equal case sets\nversions = align_scores({\n    "baseline": baseline, "candidate": candidate\n})\npaired = [\n    (case, versions["baseline"][case],\n     versions["candidate"][case])\n    for case, _ in baseline\n]`}</code></pre><p className={styles.smallNote}>Publication-time synthetic example, drafted with AI assistance. Course notebooks and their cell order are preserved privately.</p><SourceLink path="experiments/identity-alignment.ipynb">Inspect the independent notebook</SourceLink></div>
            <div className={styles.findingStack}>
              <div><span className={styles.eyebrow}>Evaluator reliability / Module 3</span><h3>0.750 accuracy.<br />0.400 kappa.</h3><p>Both saved policy-compliance judges reach these values on 12 final test cases. A 1.000 validation score after changing a human label is insufficient evidence of a better judge.</p></div>
              <div><span className={styles.eyebrow}>Regression tradeoffs / Module 5</span><h3>Grounded can still<br />be unsuccessful.</h3><p>In the separate practice snapshot, v3 grounds all 3 known-good responses, while tool selection and outcome pass on 2/3. A grounded answer does not prove the requested action succeeded.</p></div>
              <div><span className={styles.eyebrow}>Cost and latency</span><h3>Record the cost<br />of the decision.</h3><p>Token use, cost and latency belong beside quality. Saved snapshots describe individual runs; they do not establish a repeatable speedup or a causal performance improvement.</p></div>
            </div>
          </div>
          <SourceLink path="docs/RESULTS.md">Inspect the saved measurements</SourceLink>
        </section>

        <section id="sources" className={`${styles.section} ${styles.sources}`} aria-labelledby="sources-title">
          <div><p className={styles.eyebrow}>Attribution & reproducibility</p><h2 id="sources-title">A course foundation.<br /><em>A documented learning journey.</em></h2><p>This work follows <a href="https://www.deeplearning.ai/courses/evaluating-and-improving-agentic-applications/" target="_blank" rel="noreferrer">Evaluating and Improving Agentic Applications</a> by DeepLearning.AI, taught by Laurie Voss and built with Arize AI. Northwind, course exercises and course-provided code remain attributed to their creators.</p><p>My contribution includes the learning documentation and implementation work. Evidence review and comparison analysis informed this showcase; the separate case-alignment example was drafted with AI assistance at publication time. The public repository contains reviewed publication material; original course downloads and unreviewed outputs remain local.</p></div>
          <div className={styles.sourcePanel}><h3>Read the evidence</h3><SourceLink path="docs/RESULTS.md">Results and limitations</SourceLink><SourceLink path="docs/ENVIRONMENT.md">Hosted vs local environment</SourceLink><SourceLink path="docs/ATTRIBUTION.md">Attribution and publication scope</SourceLink><SourceLink path="COURSE_PROGRESS.csv">Evidence-aware progress tracker</SourceLink><p>The final lab <strong>30/30</strong> and quiz <strong>10/10</strong> were reported by Kaan on 14 November 2026. These are assignment grades, not agent performance metrics.</p><a className={styles.primaryButton} href={certificate} target="_blank" rel="noreferrer">View course certificate <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </section>
      </div>
    </article>
  )
}
