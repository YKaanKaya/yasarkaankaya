"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react"

const caseFiles = [
  { match: "/showcase/agentic-evaluation", code: "AE.07", category: "Agent evaluation", kind: "Educational material · course case study", tone: "mustard", repository: "https://github.com/YKaanKaya/deeplearning-ai-agentic-evaluation", sourceLabel: "Learning repository" },
  { match: "/showcase/deftunes", code: "DE.01", category: "Data platform", kind: "Original build", tone: "coral", repository: "https://github.com/YKaanKaya/deftunes-data-pipeline" },
  { match: "/showcase/AICodeArena", code: "ML.02", category: "Learning product", kind: "Original build", tone: "mustard", repository: "https://github.com/YKaanKaya/ai-code-arena-quest" },
  { match: "/showcase/MachineLearning", code: "ML.03", category: "Machine learning", kind: "Course work · clearly credited", tone: "teal", repository: "https://github.com/YKaanKaya/Machine-learning" },
  { match: "/showcase/PyTorchDeepLearning", code: "DL.04", category: "Deep learning", kind: "Course work · clearly credited", tone: "coral", repository: "https://github.com/YKaanKaya/deeplearning-ai-pytorch" },
  { match: "/showcase/LectureNotesRAG", code: "AI.05", category: "Retrieval systems", kind: "Original build", tone: "orange", repository: "https://github.com/YKaanKaya/LectureNotes-RAG-System" },
  {
    match: "/showcase/NvidiaMultimodalAI",
    code: "MM.06",
    category: "Multimodal AI",
    kind: "Course work · clearly credited",
    tone: "nvidia",
    repository: "https://learn.nvidia.com/certificates?id=kpMpsOlPTBKph9g3PLBXpw",
    sourceLabel: "Course credential",
  },
]

export function ShowcaseChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const activeCase = caseFiles.find((item) => pathname.startsWith(item.match)) ?? caseFiles[0]
  const isNotebook = pathname.includes("/notebook/")

  return (
    <div className="showcase-system" data-tone={activeCase.tone}>
      <header className="showcase-chrome-nav">
        <div className="showcase-chrome-container flex h-[68px] items-center justify-between gap-6">
          <Link href="/#projects" className="showcase-back-link">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
          </Link>
          <div className="showcase-chrome-wordmark">KAAN KAYA <span>/ PUBLIC WORK</span></div>
          <a href={activeCase.repository} target="_blank" rel="noreferrer" className="showcase-github-link">
            <Github className="h-3.5 w-3.5" /> {"sourceLabel" in activeCase ? activeCase.sourceLabel : "Project source"} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <div className="showcase-case-band">
        <div className="showcase-chrome-container showcase-case-strip">
          <span>{isNotebook ? "Research notebook" : activeCase.kind}</span>
          <span>{activeCase.category}</span>
          <strong>{activeCase.code}</strong>
        </div>
      </div>

      <main className="showcase-main">{children}</main>

      <footer className="showcase-chrome-footer">
        <div className="showcase-chrome-container flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p>Kaan Kaya · Data Scientist · Luxembourg</p>
          <Link href="/#projects">Browse all projects <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </div>
      </footer>
    </div>
  )
}
