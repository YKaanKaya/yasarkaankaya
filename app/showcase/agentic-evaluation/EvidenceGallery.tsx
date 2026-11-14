"use client"

import Image from "next/image"
import { useState } from "react"
import { Play, Square } from "lucide-react"
import styles from "./showcase.module.css"

const recordings = [
  { id: "m5-comparison", label: "The refund case / Module 5 practice", title: "A supported reply, an unfinished task", description: "Inspect the eligible-refund comparison: v2 processes $98; v3 asks for confirmation. Both pass grounding and policy, while v3 fails selection and outcome. This is one case within a saved 3-failure / 3-known-good practice snapshot.", alt: "Saved Phoenix practice comparison showing the completed refund in v2 and the confirmation request in v3" },
  { id: "m1-tracing", label: "01 / Open the trace", title: "See the work behind the answer", description: "Phoenix exposes the agent's nested execution. Inspect model and tool spans rather than judging the final reply alone.", alt: "Saved Phoenix trace view from the Northwind support-agent tracing lab" },
  { id: "m3-validation", label: "03 / Challenge the judge", title: "Inspect what is being scored", description: "Phoenix correctness annotations expose one evaluation layer. Read the rule and the individual judgment before treating a score as evidence; correctness and policy compliance are separate checks.", alt: "Saved Phoenix correctness annotations from Module 3" },
  { id: "m4-layered", label: "04 / Separate the layers", title: "Compare the checks on the same trace", description: "Tool selection, argument checks, policy and task outcomes describe different parts of a request. Read them alongside the actual actions so a pass in one layer does not hide a failure in another.", alt: "Saved multi-layer Phoenix evaluation of tool use, policy compliance and task outcomes" },
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
