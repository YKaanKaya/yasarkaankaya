import type { Metadata } from "next"
import { ArrowDown, ArrowUpRight, Check, Github, GraduationCap } from "lucide-react"
import { EvidenceGallery } from "./EvidenceGallery"
import styles from "./showcase.module.css"

const repository = "https://github.com/YKaanKaya/deeplearning-ai-agentic-evaluation"
const certificate = "https://learn.deeplearning.ai/certificates/03976233-64c4-4195-a504-d5676a73f825"
const url = "https://yasarkaankaya.com/showcase/agentic-evaluation/"
const title = "Evaluating AI Agents: An Educational Case Study | Kaan Kaya"
const description = "A course-based walkthrough of why a helpful AI reply can hide an unfinished task. Learn how traces, reliable evaluators and regression tests expose agent failures in a fictional retail scenario."

export const metadata: Metadata = {
  title,
  description,
  keywords: ["educational case study", "agent evaluation", "Phoenix", "DeepLearning.AI", "LLM judges", "regression testing", "AI agents"],
  alternates: { canonical: url },
  openGraph: { title, description, type: "article", url, images: [{ url: "/agentic-evaluation/m5-comparison.webp", alt: "Saved Phoenix comparison of a completed refund and an unfinished request" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/agentic-evaluation/m5-comparison.webp"] },
  robots: { index: true, follow: true },
}

const chapters = [
  { number: "01", title: "First, make the hidden work visible.", folder: "Module-01-foundations-of-evals", question: "What actually happened?", method: "An agent is a language model connected to tools that can look up information or take actions. A trace records that sequence: the request, model calls, tool inputs, results and timing. Phoenix makes those linked steps inspectable.", observation: "The tracing labs connect an answer to the catalog lookup or other tool call behind it. That gives debugging a starting point beyond reading the final sentence.", lesson: "Find the failed step before deciding what to change." },
  { number: "02", title: "Turn an incident into a repeatable test.", folder: "Module-02-observing-and-benchmarking-agents", question: "How would we catch this again?", method: "An evaluation is a repeatable check against an explicit requirement. Requirements become test cases, collected into a benchmark: a fixed set used to test behavior. Manual error labels and curated synthetic questions help cover different ways the agent can fail.", observation: "A useful benchmark needs cases the agent already handles as well as targeted failures. A failures-only set helps debugging, but cannot estimate how often real customers would encounter the problem.", lesson: "Keep the requirement, case identity and expected behavior together." },
  { number: "03", title: "Check the judge before trusting the score.", folder: "Module-03-building-evaluators-you-can-trust", question: "Is the measurement dependable?", method: "Some rules can be checked in code. Others use a language model as a judge with a written scoring rubric. The judge then needs its own validation against reviewed human labels and a separate test set.", observation: "Each saved policy judge matches 9 of 12 reference labels on the final test: 0.750 accuracy and 0.400 Cohen’s kappa. This measures judge agreement, not agent task success. A perfect intermediate score follows reference-label changes, so it does not demonstrate a better judge.", lesson: "A score is evidence to inspect, not automatic ground truth." },
  { number: "04", title: "Measure the work and the outcome separately.", folder: "Module-04-evaluating-agent-actions-and-outcomes", question: "Was the right action completed correctly?", method: "Check which tools were selected, whether their arguments were correct, the order of actions, policy compliance and the resulting state. Each answers a different question about the same request.", observation: "Across 12 saved cases, selection fails 6 and invocation fails 8; outcome and policy each fail 1. These failures overlap. One overall answer score would hide the distinction.", lesson: "Check supported facts, correct actions and task completion as separate layers." },
  { number: "05", title: "Improve one behavior without breaking another.", folder: "Module-05-improving-agentic-applications", question: "Did the change help the same cases?", method: "Compare versions on fixed cases, retain known-good examples and inspect quality alongside tool calls and latency. Turn production-style failures into future regression cases.", observation: "The practice refund case reveals an outcome regression. Separately, the graded notebook’s positional comparison suggests a case-level change that disappears when results are matched by identity: all versions ground the same 3 of 5 failure cases.", lesson: "Protect working behavior—and validate the comparison itself." },
]

const cycle = [
  { number: "01", title: "Trace", text: "Find the failed step" },
  { number: "02", title: "Test", text: "State the requirement" },
  { number: "03", title: "Validate", text: "Check the evaluator" },
  { number: "04", title: "Separate", text: "Facts, actions, outcome" },
  { number: "05", title: "Compare", text: "Protect working cases" },
]

function SourceLink({ path, children }: { path: string; children: React.ReactNode }) {
  return <a className={styles.sourceLink} href={`${repository}/blob/main/${path}`} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={14} aria-hidden="true" /></a>
}

export default function AgenticEvaluationPage() {
  return (
    <article className={styles.page} itemScope itemType="https://schema.org/LearningResource">
      <meta itemProp="name" content="Evaluating and Improving Agentic Applications: Educational Case Study" />
      <meta itemProp="author" content="Kaan Kaya" />
      <meta itemProp="learningResourceType" content="Educational case study" />
      <a className={styles.skipLink} href="#case">Skip to the refund case</a>
      <div className={styles.container}>
        <header id="top" className={styles.hero}>
          <div>
            <p className={styles.educationLabel}>Educational material · course-based case study</p>
            <p className={styles.courseTitle}>Evaluating and Improving Agentic Applications</p>
            <h1>An AI agent can<br />sound right and still<br /><em>get the job wrong.</em></h1>
            <p className={styles.introduction}>A customer asks for a refund. The reply passes grounding and policy checks—but the refund is unfinished. How do you catch that before the same failure reaches more people?</p>
            <p className={styles.courseCredit}>This is my documented learning journey through DeepLearning.AI’s course, taught by Laurie Voss and built with Arize AI, using the fictional Northwind Apparel support agent.</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="#case">Follow the refund case <ArrowDown size={15} aria-hidden="true" /></a>
              <a className={styles.secondaryButton} href={repository} target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /> Learning repository <ArrowUpRight size={15} aria-hidden="true" /></a>
            </div>
            <a className={styles.jumpLink} href={certificate} target="_blank" rel="noreferrer"><GraduationCap size={17} aria-hidden="true" /> Course completed 14 November 2026 <ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
          <aside className={styles.refundCard} aria-label="Reconstruction of one saved synthetic refund case">
            <div className={styles.caseCardHeader}><span>ONE REQUEST / TWO OUTCOMES</span><span className={styles.dot} aria-hidden="true" /></div>
            <p className={styles.requestLabel}>The task</p>
            <h2>Complete an<br />eligible refund.</h2>
            <div className={styles.refundVersions}>
              <div><span className={styles.versionLabel}>VERSION 2</span><strong>$98 refund<br />processed</strong><span className={styles.outcomePass}>Outcome: pass</span></div>
              <div className={styles.incompleteVersion}><span className={styles.versionLabel}>VERSION 3</span><strong>Asks for<br />confirmation</strong><span className={styles.outcomeFail}>Outcome: fail</span></div>
            </div>
            <div className={styles.sharedScores}><span>Grounding <strong>Pass in both</strong></span><span>Policy <strong>Pass in both</strong></span></div>
            <p className={styles.reconstructionNote}>Reconstruction of one saved synthetic practice case, not a transcript. The full comparison contains 3 failure cases and 3 known-good cases.</p>
            <a className={styles.sourceLink} href="#evidence">See the saved Phoenix comparison <ArrowDown size={13} aria-hidden="true" /></a>
          </aside>
        </header>

        <nav className={styles.pageNav} aria-label="On this page">
          <a href="#case">The failure</a><a href="#journey">How to investigate</a><a href="#evidence">Inside Phoenix</a><a href="#findings">Check the measurement</a><a href="#sources">Course & sources</a>
        </nav>

        <section id="case" className={styles.section} aria-labelledby="case-title">
          <div className={styles.sectionHeader}><p className={styles.eyebrow}>Start with the customer’s goal</p><div><h2 id="case-title">The task ends when<br /><em>the right thing happens.</em></h2><p>An AI agent does more than generate text: it can use tools to search a catalog, check an order or issue a refund. That makes its actions—and their consequences—part of what needs testing.</p></div></div>
          <div className={styles.caseExplanation}>
            <p>In the saved Northwind practice comparison, version 2 processes a $98 refund. Version 3 asks for confirmation instead. Both receive positive grounding and policy labels, but version 3 fails the tool-selection and outcome checks for this request.</p>
            <p>“Grounded” means the response is supported by the available evidence under the rubric. It does not mean every required action happened. The difference matters whenever an agent can change something outside the conversation.</p>
          </div>
          <div className={styles.threeQuestions}>
            <div><span>01 / THE ANSWER</span><h3>Are its facts supported?</h3><p>Compare claims with the information the agent retrieved. This is the grounding question.</p></div>
            <div><span>02 / THE ACTIONS</span><h3>Did it follow the right steps?</h3><p>Inspect tool choice, arguments, identity checks and policy—not just how helpful the reply sounds.</p></div>
            <div><span>03 / THE OUTCOME</span><h3>Did the requested change happen?</h3><p>Look for evidence of completion, such as the refund record. A promise or clarification is a different outcome.</p></div>
          </div>
          <p className={styles.caseTakeaway}><strong>Why evaluations matter:</strong> they turn these questions into repeatable checks, so silent omissions and regressions can be found before a change is released.</p>
          <p className={styles.scopeNote}>Teaching example from one small saved practice run. It illustrates a failure mode; it does not estimate production reliability or prove that one prompt is generally better.</p>
          <SourceLink path="Module-05-improving-agentic-applications/labs/lab-1-evaluate-what-the-agent-does/CAPTURE.md">Read the refund case and its test context</SourceLink>
        </section>

        <section id="journey" className={styles.section} aria-labelledby="journey-title">
          <div className={styles.sectionHeader}><p className={styles.eyebrow}>The investigation / five chapters</p><div><h2 id="journey-title">From one failed request<br /><em>to a better test process.</em></h2><p>The course builds a workflow for answering increasingly demanding questions. Each chapter adds a way to inspect behavior that the previous one could miss.</p></div></div>
          <ol className={styles.cycle}>
            {cycle.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
          </ol>
          <div className={styles.journey}>
            {chapters.map((chapter) => <details key={chapter.number} className={styles.module} open={chapter.number === "01"}>
              <summary><span className={styles.moduleNumber}>{chapter.number}</span><div><h3>{chapter.title}</h3><p>{chapter.question}</p></div><span className={styles.expandIcon} aria-hidden="true">+</span></summary>
              <div className={styles.moduleBody}><div><h4>What this adds</h4><p>{chapter.method}</p></div><div><h4>What the saved work shows</h4><p>{chapter.observation}</p></div><div className={styles.moduleLesson}><Check size={17} aria-hidden="true" /><p>{chapter.lesson}</p></div><SourceLink path={`${chapter.folder}/README.md`}>Explore chapter {chapter.number} and its evidence</SourceLink></div>
            </details>)}
          </div>
          <p className={styles.loopNote}>Each new failure becomes a candidate for the next regression test: a check that working behavior keeps working.</p>
        </section>

        <section id="evidence" className={styles.section} aria-labelledby="evidence-title">
          <div className={styles.sectionHeader}><p className={styles.eyebrow}>Inside the educational labs</p><div><h2 id="evidence-title">Follow the evidence<br /><em>behind the conclusion.</em></h2><p>Phoenix is the inspection workspace used in the course. It brings the agent’s trace, tool calls and evaluator annotations together so a score can be checked against what actually happened.</p></div></div>
          <EvidenceGallery />
          <SourceLink path="docs/RESULTS.md">Read the full results, sources and limitations</SourceLink>
        </section>

        <section id="findings" className={styles.section} aria-labelledby="findings-title">
          <div className={styles.sectionHeader}><p className={styles.eyebrow}>The next lesson / check the checker</p><div><h2 id="findings-title">A better-looking score<br /><em>can tell the wrong story.</em></h2><p>Once there is a test process, its own reliability becomes part of the problem. Two saved findings show why measurements need the same scrutiny as the agent.</p></div></div>
          <div className={styles.findingGrid}>
            <div className={styles.leadFinding}><span className={styles.eyebrow}>Comparison integrity / Module 5 graded lab</span><h3>Match the case before comparing the score.</h3><p>Different experiment versions can return cases in different orders. Matching rows by position can make one case appear to improve while another appears to regress.</p><p>In the saved graded notebook, matching by case identity leaves v1, v2 and v3 with the same result: <strong>3 of 5 failure cases grounded</strong>, with the same failures. The apparent case-level improvement in the original positional summary is unsupported.</p><p className={styles.smallNote}>This five-case graded set is separate from the three-plus-three practice comparison above. The original course notebook remains unchanged.</p><details className={styles.codeDetail}><summary>See the independent comparison example</summary><pre aria-label="Synthetic case identity comparison code"><code>{`# Validate unique identities and equal case sets\nversions = align_scores({\n    "baseline": baseline, "candidate": candidate\n})\npaired = [\n    (case, versions["baseline"][case],\n     versions["candidate"][case])\n    for case, _ in baseline\n]`}</code></pre><p className={styles.smallNote}>A separately authored synthetic demonstration, drafted with AI assistance during publication. It uses no course questions or API calls.</p><SourceLink path="experiments/identity-alignment.ipynb">Open the runnable educational notebook</SourceLink></details></div>
            <div className={styles.findingStack}>
              <div><span className={styles.eyebrow}>Evaluator reliability / Module 3</span><h3>Who checks the judge?</h3><p>Each saved policy judge matches <strong>9 of 12 reference labels</strong> on the final test: 0.750 accuracy and 0.400 Cohen’s kappa. Kappa measures agreement beyond chance. These numbers describe the judge’s agreement with the reference, not the agent’s success rate.</p><p>A separate 1.000 validation score follows label changes. Comparing that number directly with an earlier score would confuse a changed reference with an improved evaluator.</p></div>
              <div><span className={styles.eyebrow}>The transferable habit</span><h3>Ask what each number can support.</h3><p>Keep test cases and labels stable, inspect disagreements, and retain known-good cases. Record tool use, latency and cost beside quality. These snapshots do not establish a repeatable speedup or a general performance gain.</p></div>
            </div>
          </div>
          <div className={styles.takeaways}><h3>What this workflow helps you do</h3><ul><li>Locate the failed step before changing a prompt.</li><li>Check evaluator reliability before using its scores to choose a version.</li><li>Catch regressions in behavior that already worked.</li><li>Use observed failures to expand future test coverage.</li></ul></div>
          <SourceLink path="docs/RESULTS.md">Inspect the measurements and their caveats</SourceLink>
        </section>

        <section id="sources" className={`${styles.section} ${styles.sources}`} aria-labelledby="sources-title">
          <div><p className={styles.educationLabel}>Educational material / clearly attributed</p><h2 id="sources-title">Coursework made useful<br /><em>for the next learner.</em></h2><p>This case study documents my work through <a href="https://www.deeplearning.ai/courses/evaluating-and-improving-agentic-applications/" target="_blank" rel="noreferrer">Evaluating and Improving Agentic Applications</a> by DeepLearning.AI, taught by Laurie Voss and built with Arize AI. Northwind, the supplied agent and the course exercises belong to their creators.</p><p>The public learning repository contains original summaries, coursework analysis, selected recordings and an independent synthetic example. It is a teaching resource built from saved educational experiments; it does not present a production support system or a production benchmark.</p><p>The course notebooks and their original cell order are preserved locally. The full hosted runtime and supporting helper tree are not included, and the labs were not rerun for this publication. AI assistance supported documentation and publication-time analysis.</p></div>
          <div className={styles.sourcePanel}><h3>Keep exploring</h3><SourceLink path="docs/METHODS.md">Evaluation methods explained</SourceLink><SourceLink path="docs/RESULTS.md">Saved results and limitations</SourceLink><SourceLink path="docs/ENVIRONMENT.md">Hosted and local reproduction</SourceLink><SourceLink path="docs/ATTRIBUTION.md">Attribution and publication scope</SourceLink><p>Course completion is verified by the public certificate dated 14 November 2026. Course grades are separate from agent-performance measurements.</p><a className={styles.primaryButton} href={certificate} target="_blank" rel="noreferrer"><GraduationCap size={17} aria-hidden="true" /> View course certificate <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </section>
      </div>
    </article>
  )
}
