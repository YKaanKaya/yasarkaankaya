import type { ReactNode } from "react"

export type ProjectVisualKind =
  | "deftunes"
  | "graphflow"
  | "code-arena"
  | "rag"
  | "pytorch"
  | "ml-labs"
  | "multimodal"
  | "stock-esg"

type ProjectVisualProps = {
  kind: ProjectVisualKind
}

const diagram = {
  deftunes: (
    <>
      <path className="retro-art-line retro-art-motion-wave" d="M18 38h18l8-18 13 37 12-29 13 17h31" />
      <circle className="retro-art-soft" cx="260" cy="38" r="20" />
      <path className="retro-art-line" d="M260 21v28c0 10-17 10-17 1 0-7 11-10 17-5m0-17 18-5v19c0 10-17 10-17 1 0-7 11-10 17-5" />
      <path className="retro-art-line retro-art-motion-flow" d="M52 105h37m28 0h37m28 0h37m28 0h26l-8-7m8 7-8 7" />
      {[24, 89, 154, 219].map((x, index) => (
        <g key={x}>
          <rect className={index % 2 ? "retro-art-soft" : "retro-art-fill"} x={x} y="87" width="28" height="36" rx="3" />
          <path className="retro-art-line" d={`M${x + 7} 97h14m-14 7h14m-14 7h9`} />
        </g>
      ))}
      <circle className="retro-art-fill retro-art-motion-pulse" cx="286" cy="105" r="10" />
    </>
  ),
  graphflow: (
    <>
      <rect className="retro-art-soft" x="17" y="27" width="98" height="96" rx="3" />
      <path className="retro-art-line" d="M17 51h98M17 75h98M17 99h98M49 27v96M82 27v96" />
      <path className="retro-art-line retro-art-motion-flow" d="M128 75h42m-10-10 10 10-10 10" />
      <g className="retro-art-motion-nodes">
        <path className="retro-art-line" d="M213 42l42 18 30 42-52 18-38-34 18-44m42 18-22 60m-38-34 60-26m-60 26-17-30 35-34" />
        <circle className="retro-art-fill" cx="213" cy="42" r="11" />
        <circle className="retro-art-soft" cx="255" cy="60" r="9" />
        <circle className="retro-art-fill" cx="285" cy="102" r="12" />
        <circle className="retro-art-soft" cx="233" cy="120" r="10" />
        <circle className="retro-art-fill" cx="195" cy="86" r="12" />
        <circle className="retro-art-soft" cx="178" cy="56" r="8" />
      </g>
    </>
  ),
  "code-arena": (
    <>
      <rect className="retro-art-soft" x="20" y="18" width="280" height="114" rx="5" />
      <path className="retro-art-line" d="M20 43h280M38 31h5m8 0h5m8 0h5" />
      <path className="retro-art-line" d="M82 61 62 75l20 14m156-28 20 14-20 14" />
      <path className="retro-art-line retro-art-motion-route" d="M98 111h31V87h31V64h34v25h31" />
      <circle className="retro-art-fill" cx="98" cy="111" r="7" />
      <circle className="retro-art-soft" cx="160" cy="87" r="7" />
      <path className="retro-art-fill" d="m194 50 7 13 14 2-10 10 3 14-14-7-13 7 2-14-10-10 14-2 7-13Z" />
      <path className="retro-art-line" d="M225 89v22h26m-11-11 11 11-11 11" />
    </>
  ),
  rag: (
    <>
      <g>
        <path className="retro-art-soft" d="M18 35h61l15 15v71H18z" />
        <path className="retro-art-line" d="M79 35v16h15M33 66h45M33 78h45M33 90h30" />
        <path className="retro-art-fill" d="M31 23h61l15 15v12M92 23v16h15" />
      </g>
      <path className="retro-art-line retro-art-motion-flow" d="M111 75h24m-8-8 8 8-8 8" />
      <g className="retro-art-motion-embed">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((column) => (
            <circle key={`${row}-${column}`} className={(row + column) % 3 === 0 ? "retro-art-fill" : "retro-art-soft"} cx={151 + column * 15} cy={53 + row * 15} r="4" />
          )),
        )}
      </g>
      <path className="retro-art-line retro-art-motion-flow" d="M209 75h24m-8-8 8 8-8 8" />
      <rect className="retro-art-soft" x="239" y="40" width="64" height="80" rx="5" />
      <circle className="retro-art-fill retro-art-motion-pulse" cx="258" cy="59" r="8" />
      <path className="retro-art-line" d="m264 65 9 9M250 86h39M250 98h31" />
    </>
  ),
  pytorch: (
    <>
      <g className="retro-art-motion-network">
        {[42, 68, 94, 120].map((y) => <circle key={`i-${y}`} className="retro-art-soft" cx="38" cy={y} r="7" />)}
        {[31, 53, 75, 97, 119].map((y) => <circle key={`h-${y}`} className="retro-art-fill" cx="132" cy={y} r="8" />)}
        {[48, 75, 102].map((y) => <circle key={`o-${y}`} className="retro-art-soft" cx="223" cy={y} r="9" />)}
        <path className="retro-art-line" d="M45 42 124 31M45 42l79 33M45 68l79-15M45 68l79 29M45 94l79-19M45 94l79 25M45 120l79-23m16-66 74 17m-74 5 74-5m-74 5 74 22m-74 0 74-27m-74 27 74 27m-74-5 74-22m-74 44 74-17" />
      </g>
      <path className="retro-art-line" d="M251 117V32m0 85h56" />
      <path className="retro-art-line retro-art-motion-loss" d="M257 42c12 2 16 15 22 25s12 24 26 37" />
      <circle className="retro-art-fill" cx="305" cy="104" r="5" />
    </>
  ),
  "ml-labs": (
    <>
      <path className="retro-art-line" d="M160 15v120M12 75h296" />
      <g>
        <path className="retro-art-line" d="M28 61 145 27" />
        {["39,55", "55,45", "75,52", "94,35", "116,38", "137,22"].map((point) => {
          const [cx, cy] = point.split(",")
          return <circle key={point} className="retro-art-fill" cx={cx} cy={cy} r="4" />
        })}
      </g>
      <g>
        <path className="retro-art-line" d="M176 59c34-43 76 9 116-28" />
        <circle className="retro-art-fill" cx="193" cy="30" r="5" /><circle className="retro-art-fill" cx="218" cy="42" r="5" /><circle className="retro-art-fill" cx="246" cy="28" r="5" />
        <rect className="retro-art-soft" x="207" y="55" width="10" height="10" /><rect className="retro-art-soft" x="256" y="49" width="10" height="10" /><rect className="retro-art-soft" x="279" y="61" width="10" height="10" />
      </g>
      <g className="retro-art-motion-clusters">
        {["39,98", "54,111", "67,93", "91,119", "111,101", "130,116"].map((point, index) => {
          const [cx, cy] = point.split(",")
          return <circle key={point} className={index < 3 ? "retro-art-fill" : "retro-art-soft"} cx={cx} cy={cy} r="6" />
        })}
      </g>
      <g>
        <path className="retro-art-line" d="M180 86h112v40H180zM208 86v40m28-40v40m28-40v40M180 106h112" />
        <path className="retro-art-line retro-art-motion-route" d="M194 116h28V96h28v20h28" />
        <circle className="retro-art-fill" cx="194" cy="116" r="5" /><path className="retro-art-fill" d="m278 108 8 8-8 8Z" />
      </g>
    </>
  ),
  multimodal: (
    <>
      <g>
        <rect className="retro-art-soft" x="14" y="16" width="52" height="48" rx="3" />
        <path className="retro-art-line" d="m23 53 12-14 9 9 8-13 7 18" /><circle className="retro-art-fill" cx="26" cy="29" r="4" />
        <rect className="retro-art-soft" x="14" y="86" width="52" height="48" rx="3" />
        <path className="retro-art-line" d="M22 111h5l4-13 7 26 6-20 5 12 4-9 5 4" />
        <rect className="retro-art-soft" x="78" y="16" width="52" height="48" rx="3" />
        <path className="retro-art-line" d="M88 29h31M88 40h25M88 51h31" />
        <rect className="retro-art-soft" x="78" y="86" width="52" height="48" rx="3" />
        <path className="retro-art-line" d="M78 102h52M95 86v48m17-48v48M78 118h52" />
      </g>
      <path className="retro-art-line retro-art-motion-flow" d="m66 40 76 27m-76 43 76-27m-12-43 12 27m-12 43 12-27" />
      <path className="retro-art-fill retro-art-motion-pulse" d="m174 47 28 16v32l-28 16-28-16V63z" />
      <circle className="retro-art-soft" cx="174" cy="79" r="12" />
      <path className="retro-art-line retro-art-motion-flow" d="M202 79h35" />
      <path className="retro-art-line" d="M237 79 265 42m-28 37 28 37m-28-37h48" />
      <circle className="retro-art-fill" cx="271" cy="40" r="10" /><circle className="retro-art-soft" cx="291" cy="79" r="10" /><circle className="retro-art-fill" cx="271" cy="118" r="10" />
    </>
  ),
  "stock-esg": (
    <>
      <path className="retro-art-line" d="M17 20v108h174M30 107l30-24 25 10 31-46 27 15 35-34" />
      <g className="retro-art-motion-market">
        <path className="retro-art-line" d="M43 65v47m27-50v40m27-31v37m27-71v57m27-49v35m27-63v45" />
        <rect className="retro-art-soft" x="37" y="77" width="12" height="22" /><rect className="retro-art-fill" x="64" y="69" width="12" height="20" /><rect className="retro-art-soft" x="91" y="79" width="12" height="17" /><rect className="retro-art-fill" x="118" y="48" width="12" height="27" /><rect className="retro-art-soft" x="145" y="52" width="12" height="18" /><rect className="retro-art-fill" x="172" y="31" width="12" height="24" />
      </g>
      <circle className="retro-art-soft" cx="254" cy="76" r="49" />
      <path className="retro-art-line" d="M254 27v49l42 24M254 76l-37 32" />
      <path className="retro-art-fill retro-art-motion-leaf" d="M254 76c-5-26 15-38 35-35 1 22-12 39-35 35Zm0 0c-22 4-37-10-38-30 21-5 38 6 38 30Z" />
      <path className="retro-art-line" d="M254 76c8-13 19-22 32-30m-32 30c-9-10-20-18-32-24" />
    </>
  ),
} satisfies Record<ProjectVisualKind, ReactNode>

export function ProjectVisual({ kind }: ProjectVisualProps) {
  return (
    <svg
      className={`retro-project-art retro-project-art-${kind}`}
      viewBox="0 0 320 150"
      aria-hidden="true"
      focusable="false"
    >
      {diagram[kind]}
    </svg>
  )
}
