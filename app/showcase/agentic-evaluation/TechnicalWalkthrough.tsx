"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowDown, ArrowUpRight, Code2, Play, Square } from "lucide-react"
import { stages } from "./walkthrough-data"
import styles from "./showcase.module.css"

const repository = "https://github.com/YKaanKaya/deeplearning-ai-agentic-evaluation"

export function TechnicalWalkthrough() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className={styles.walkthrough}>
      <p className={styles.mediaNote}>Every stage below is visible. Recordings start as still images; Play loads that GIF, Stop restores its poster, and only one recording plays at a time.</p>
      {stages.map((stage, index) => {
        const playing = active === stage.id
        return (
          <section key={stage.id} id={stage.id} className={styles.stage} aria-labelledby={`${stage.id}-title`}>
            <header className={styles.stageHeading}>
              <span className={styles.stageNumber}>{stage.number}</span>
              <div><p className={styles.eyebrow}>{stage.category}</p><h2 id={`${stage.id}-title`}>{stage.title}</h2><p>{stage.explanation}</p></div>
            </header>
            <dl className={styles.contract}>
              <div><dt>Inherits</dt><dd>{stage.input}</dd></div>
              <div><dt>Adds</dt><dd>{stage.adds}</dd></div>
              <div><dt>Produces</dt><dd>{stage.outputContract}</dd></div>
            </dl>
            <p className={styles.courseImplementation}><strong>In the course:</strong> {stage.courseImplementation}</p>
            <div className={styles.stageGrid}>
              <div className={styles.codeColumn}>
                <div className={styles.codePanel}>
                  <div className={styles.codeHeader}><span><Code2 size={14} aria-hidden="true" /> Python excerpt / runnable companion</span><a href={`${repository}/blob/main/${stage.codePath}`} target="_blank" rel="noreferrer" aria-label={`Open ${stage.codePath} on GitHub`}>{stage.codePath.split("/").pop()}<ArrowUpRight size={13} aria-hidden="true" /></a></div>
                  <pre tabIndex={0} aria-label={`Module ${stage.number} code excerpt`}><code>{stage.code}</code></pre>
                  <p className={styles.codeCaption}>{stage.codeExplanation}</p>
                </div>
                <div className={styles.outputPanel}><div className={styles.outputHeader}><span className={styles.outputDot} aria-hidden="true" /><h3>Companion output</h3><span>Deterministic replay</span></div><pre tabIndex={0} aria-label={`Module ${stage.number} companion output`}><code>{stage.output}</code></pre><p>{stage.outputExplanation}</p></div>
              </div>
              <div className={styles.evidenceColumn}>
                <figure className={styles.recording}>
                  <div className={styles.mediaTop}><span>Saved course run / {stage.mediaSurface}</span><div><a href={`/agentic-evaluation/${stage.media}.webp`} target="_blank" rel="noreferrer">Full-size still <ArrowUpRight size={12} aria-hidden="true" /></a><a href={`/agentic-evaluation/${stage.media}.gif`} target="_blank" rel="noreferrer">Full-size GIF <ArrowUpRight size={12} aria-hidden="true" /></a></div></div>
                  <div className={styles.mediaFrame}><Image key={`${stage.media}-${playing}`} src={`/agentic-evaluation/${stage.media}.${playing ? "gif" : "webp"}`} alt={stage.alt} width={1600} height={1000} unoptimized loading="lazy" /><button type="button" className={styles.playButton} aria-pressed={playing} aria-label={`${playing ? "Stop" : "Play"} module ${stage.number} recording`} onClick={() => setActive(playing ? null : stage.id)}>{playing ? <Square size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}{playing ? "Stop recording" : "Play recording"}</button></div>
                  <figcaption><h3>What to watch</h3><ol>{stage.watch.map((cue) => <li key={cue}>{cue}</li>)}</ol></figcaption>
                </figure>
                <div className={styles.savedFinding}><span>Observed in the saved coursework</span><p>{stage.observation}</p><small>{stage.limitation}</small></div>
              </div>
            </div>
            <div className={styles.stageLinks}><a href={`${repository}/blob/main/${stage.codePath}`} target="_blank" rel="noreferrer">Inspect the code <ArrowUpRight size={13} aria-hidden="true" /></a><a href={`${repository}/blob/main/docs/TECHNICAL_WALKTHROUGH.md#${stage.id}`} target="_blank" rel="noreferrer">Read the technical deep dive <ArrowUpRight size={13} aria-hidden="true" /></a><a href={`${repository}/blob/main/${stage.capturePath}`} target="_blank" rel="noreferrer">Open the lab evidence <ArrowUpRight size={13} aria-hidden="true" /></a></div>
            <div className={styles.handoff}><span>{index === stages.length - 1 ? "Feed back into the next test" : `Why module ${String(index + 2).padStart(2, "0")} comes next`}</span><p>{stage.handoff}</p>{index < stages.length - 1 && <a href={`#${stages[index + 1].id}`} aria-label={`Continue to module ${index + 2}`}><ArrowDown size={17} aria-hidden="true" /></a>}</div>
          </section>
        )
      })}
      <p className={styles.srOnly} role="status">{active ? `Module ${active.replace("module-", "")} recording is playing. Use Stop recording to return to its still image.` : "All recordings show still images."}</p>
    </div>
  )
}
