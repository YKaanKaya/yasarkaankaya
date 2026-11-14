"use client"

import Image from "next/image"
import { useState } from "react"
import { Play, Square } from "lucide-react"
import styles from "./showcase.module.css"

const recordings = [
  { id: "m1-tracing", label: "01 / Open the trace", title: "See the work behind the answer", description: "Phoenix exposes the agent's nested execution. Inspect model and tool spans rather than judging the final reply alone.", alt: "Saved Phoenix trace view from the Northwind support-agent tracing lab" },
  { id: "m3-validation", label: "03 / Challenge the judge", title: "Inspect what is being scored", description: "Phoenix correctness annotations expose one evaluation layer. Read the rule and the individual judgment before treating a score as evidence; correctness and policy compliance are separate checks.", alt: "Saved Phoenix correctness annotations from Module 3" },
  { id: "m4-layered", label: "04 / Separate the layers", title: "Tool use and outcomes tell different stories", description: "Across 12 saved cases, tool selection fails 6 and invocation fails 8, while outcome and policy checks each fail 1. Different evaluators expose different failure modes.", alt: "Saved multi-layer Phoenix evaluation of tool use, policy compliance and task outcomes" },
  { id: "m5-comparison", label: "05 / Compare by identity", title: "Read the tradeoff, then inspect the case", description: "This practice comparison covers 3 failure cases and 3 known-good cases. v3 preserves grounding on all 3 known-good cases, but selection and outcome pass on only 2. These are small, separate snapshots.", alt: "Reviewed excerpt of the latest Phoenix practice comparison showing failure and known-good cases" },
]

export function EvidenceGallery() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div>
      <p className={styles.mediaNote}>Still images load first. Play a recording to load its animation; stop it at any time. Only one recording plays at once.</p>
      <div className={styles.gallery}>
        {recordings.map((recording) => {
          const playing = active === recording.id
          return (
            <figure key={recording.id} className={styles.recording}>
              <div className={styles.mediaFrame}>
                <Image
                  key={`${recording.id}-${playing}`}
                  src={`/agentic-evaluation/${recording.id}.${playing ? "gif" : "webp"}`}
                  alt={recording.alt}
                  width={1600}
                  height={1000}
                  unoptimized
                  loading="lazy"
                />
                <button
                  type="button"
                  className={styles.playButton}
                  aria-pressed={playing}
                  aria-label={`${playing ? "Stop" : "Play"} recording: ${recording.title}`}
                  onClick={() => setActive(playing ? null : recording.id)}
                >
                  {playing ? <Square size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                  {playing ? "Stop recording" : "Play recording"}
                </button>
              </div>
              <figcaption>
                <span className={styles.eyebrow}>{recording.label}</span>
                <h3>{recording.title}</h3>
                <p>{recording.description}</p>
              </figcaption>
            </figure>
          )
        })}
      </div>
      <p className={styles.srOnly} role="status">{active ? "Recording playing. Use its Stop recording button to return to the still image." : "All recordings show still images."}</p>
    </div>
  )
}
