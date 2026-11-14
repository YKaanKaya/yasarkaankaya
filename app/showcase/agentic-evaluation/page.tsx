import type { Metadata } from "next"
import { ArrowDown, ArrowUpRight, Github, GraduationCap } from "lucide-react"
import { TechnicalWalkthrough } from "./TechnicalWalkthrough"
import styles from "./showcase.module.css"

const repository = "https://github.com/YKaanKaya/deeplearning-ai-agentic-evaluation"
const certificate = "https://www.deeplearning.ai/certificates/03976233-64c4-4195-a504-d5676a73f825"
const url = "https://yasarkaankaya.com/showcase/agentic-evaluation/"
const title = "Inside an Agent Evaluation Pipeline | Kaan Kaya"
const description = "A technical educational walkthrough with Python code, data contracts and saved lab recordings: trace an agent, build a benchmark, validate evaluators, check outcomes and compare regressions."

export const metadata: Metadata = {
  title,
  description,
  keywords: ["agent evaluation", "technical walkthrough", "Python", "Phoenix", "DeepLearning.AI", "LLM judges", "regression testing"],
  alternates: { canonical: url },
  openGraph: { title, description, type: "article", url, images: [{ url: "/agentic-evaluation/m5-comparison.webp", alt: "Saved Phoenix comparison of a completed and unfinished refund" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/agentic-evaluation/m5-comparison.webp"] },
  robots: { index: true, follow: true },
}

const navigation = [
  { id: "module-1", number: "01", label: "Trace" },
  { id: "module-2", number: "02", label: "Benchmark" },
  { id: "module-3", number: "03", label: "Validate" },
  { id: "module-4", number: "04", label: "Verify" },
  { id: "module-5", number: "05", label: "Compare" },
]

export default function AgenticEvaluationPage() {
  return (
    <article className={styles.page} itemScope itemType="https://schema.org/LearningResource">
      <meta itemProp="name" content="Evaluating and Improving Agentic Applications: Technical Walkthrough" />
      <meta itemProp="author" content="Kaan Kaya" />
      <meta itemProp="learningResourceType" content="Educational technical case study" />
      <a className={styles.skipLink} href="#module-1">Skip to the code walkthrough</a>
      <div className={styles.container}>
        <header id="top" className={styles.hero}>
          <div>
            <p className={styles.educationLabel}>Educational material · technical case study</p>
            <p className={styles.courseTitle}>Evaluating and Improving Agentic Applications</p>
            <h1>From agent execution<br />to <em>verified behavior.</em></h1>
            <p className={styles.introduction}>Follow the code from a customer request to a regression test. Five modules build one evaluation workflow—each adding a data structure, a check and a way to inspect what happened.</p>
            <p className={styles.courseCredit}>Kaan Kaya’s documented DeepLearning.AI coursework, taught by Laurie Voss and built with Arize AI. The scenario is Northwind Apparel, a fictional retailer whose agent looks up products, checks orders and handles refunds.</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="#module-1">Start with the trace <ArrowDown size={15} aria-hidden="true" /></a>
              <a className={styles.secondaryButton} href={repository} target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> Explore the code <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
            <a className={styles.jumpLink} href={certificate} target="_blank" rel="noreferrer"><GraduationCap size={17} aria-hidden="true" /> Course completed 14 November 2026 <ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
          <aside className={styles.heroPath} aria-label="The cumulative evaluation pipeline">
            <div className={styles.panelTop}><span>ONE WORKFLOW / FIVE LAYERS</span><span className={styles.dot} aria-hidden="true" /></div>
            <ol>
              <li><a href="#module-1"><span>01</span><div><strong>Execution → trace</strong><small>Capture the model and tool steps.</small></div></a></li>
              <li><a href="#module-2"><span>02</span><div><strong>Traces → benchmark</strong><small>Give each requirement a stable case.</small></div></a></li>
              <li><a href="#module-3"><span>03</span><div><strong>Cases → trusted scores</strong><small>Check the rules and the judge.</small></div></a></li>
              <li><a href="#module-4"><span>04</span><div><strong>Scores → verified outcomes</strong><small>Inspect actions and resulting state.</small></div></a></li>
              <li><a href="#module-5"><span>05</span><div><strong>Versions → regression decision</strong><small>Compare the same cases before choosing.</small></div></a></li>
            </ol>
          </aside>
        </header>

        <section id="system" className={styles.systemSection} aria-labelledby="system-title">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>The system being evaluated</p><div><h2 id="system-title">The answer is only<br /><em>one output.</em></h2><p>An agent connects a language model to tools. A request may produce both a response and a change in a database. Evaluation checks the facts, the actions and the resulting state. In these labs, Arize Phoenix is the workspace for inspecting linked traces, test datasets and evaluator scores.</p></div></div>
          <div className={styles.architecture} aria-label="Request flows through an agent, model and tools, with traces feeding the evaluation pipeline">
            <div className={styles.requestNode}><span>INPUT</span><strong>Customer request</strong><p>For example: an eligible refund.</p></div>
            <span className={styles.flowArrow} aria-hidden="true">→</span>
            <div className={styles.agentNode}><span>AGENT EXECUTION</span><strong>Language model + tools</strong><div><span>Catalog lookup</span><span>Order tools</span><span>Refund action</span></div><p>Produces a reply and may change state.</p></div>
            <span className={styles.flowArrow} aria-hidden="true">→</span>
            <div className={styles.stateNode}><span>OBSERVABLE OUTPUTS</span><strong>Response + state</strong><p>What was said, which calls ran, and whether the refund exists.</p></div>
            <div className={styles.telemetryRail}><span aria-hidden="true">↳</span><p><strong>Linked spans</strong> record inputs, outputs, tool arguments and order → <strong>test cases</strong> → <strong>layered scores</strong> → <strong>paired experiments</strong>.</p></div>
          </div>
          <div className={styles.motivation}>
            <div><p className={styles.eyebrow}>Why separate those checks?</p><h3>A grounded reply can leave a refund unfinished.</h3><p>In one saved course practice case, v2 processes a $98 refund; v3 asks for confirmation. Both pass grounding and policy checks, while v3 fails selection and outcome. That is why the pipeline below tests more than the final sentence.</p></div>
            <div className={styles.motivationResult}><span>Saved practice case</span><div><strong>v2</strong><p>$98 processed</p><b>Outcome pass</b></div><div><strong>v3</strong><p>Confirmation requested</p><b>Outcome fail</b></div><a href="#module-5">Inspect the recording <ArrowDown size={13} aria-hidden="true" /></a></div>
          </div>
        </section>

        <div className={styles.readingGuide}>
          <p><strong>Two kinds of evidence, clearly separated.</strong> The Python snippets and outputs come from a new, runnable deterministic companion with three synthetic <code>DEMO-*</code> cases and a $42 refund. That code is one executable pipeline. The GIFs illustrate the course’s conceptual progression across different saved labs and sessions, including the separate $98 example. They were not generated by the companion, which does not reproduce Phoenix or call a model.</p>
          <a href={`${repository}/blob/main/docs/TECHNICAL_WALKTHROUGH.md`} target="_blank" rel="noreferrer">Open the complete technical walkthrough <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>

        <nav className={styles.moduleNav} aria-label="Jump to a module">
          {navigation.map((item) => <a key={item.id} href={`#${item.id}`}><span>{item.number}</span>{item.label}<ArrowDown size={12} aria-hidden="true" /></a>)}
        </nav>

        <TechnicalWalkthrough />

        <section id="run-it" className={styles.runSection} aria-labelledby="run-title">
          <div><p className={styles.eyebrow}>Run the cumulative example</p><h2 id="run-title">Read it here.<br /><em>Inspect it in the repository.</em></h2><p>The companion runs locally with Python’s standard library. It replays fixtures so every stage can be inspected without credentials, model costs or a hosted course runtime.</p><pre className={styles.runCommand}><code>python -m technical_companion</code></pre><div className={styles.actions}><a className={styles.primaryButton} href={`${repository}/tree/main/technical_companion`} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> Open all five code modules <ArrowUpRight size={14} aria-hidden="true" /></a><a className={styles.sourceLink} href={`${repository}/blob/main/docs/TECHNICAL_WALKTHROUGH.md`} target="_blank" rel="noreferrer">Read setup, outputs and design notes <ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
          <aside className={styles.runScope}><h3>What to take into your next agent</h3><ol><li>Preserve case and trace identity through every transformation.</li><li>Validate the evaluator before using its scores to choose a version.</li><li>Check required actions and persistent state alongside supported claims.</li><li>Keep working cases in the benchmark so a fix cannot silently break them.</li></ol><p>The saved samples are small educational exercises. They do not establish production reliability, causal speedups or a general prompt improvement.</p></aside>
        </section>

        <section id="sources" className={styles.sources} aria-labelledby="sources-title">
          <div><p className={styles.educationLabel}>Educational material / course attribution</p><h2 id="sources-title">Course foundation.<br /><em>Inspectable technical work.</em></h2><p>This showcase documents coursework from <a href="https://www.deeplearning.ai/courses/evaluating-and-improving-agentic-applications/" target="_blank" rel="noreferrer">Evaluating and Improving Agentic Applications</a> by DeepLearning.AI, taught by Laurie Voss and built with Arize AI. Northwind, the supplied agent and the course exercises belong to their creators.</p><p>The public repository contains original analysis, reviewed recording excerpts and independently authored companion code prepared with AI assistance. Original course notebooks and solutions remain local. Their cell order is preserved; missing helpers and data snapshots prevent a complete local reproduction of the hosted labs.</p></div>
          <div className={styles.sourcePanel}><h3>Deep-dive references</h3>{[{ path: "docs/TECHNICAL_WALKTHROUGH.md", label: "Code and data contracts" }, { path: "docs/RESULTS.md", label: "Saved results and limitations" }, { path: "docs/ENVIRONMENT.md", label: "Environment and reproduction" }, { path: "docs/MEDIA.md", label: "Recording sources and frames" }, { path: "docs/ATTRIBUTION.md", label: "Attribution and publication scope" }].map((item) => <a className={styles.sourceLink} key={item.path} href={`${repository}/blob/main/${item.path}`} target="_blank" rel="noreferrer">{item.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}<a className={styles.certificateLink} href={certificate} target="_blank" rel="noreferrer"><GraduationCap size={17} aria-hidden="true" /> View verified course certificate <ArrowUpRight size={14} aria-hidden="true" /></a></div>
        </section>
      </div>
    </article>
  )
}
