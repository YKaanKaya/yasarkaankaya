"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react"
import { personalInfo } from "@/lib/data"

const caseFiles = [
  { match: "/showcase/deftunes", code: "DE.01", category: "Data platform", title: "DeFtunes Data Pipeline" },
  { match: "/showcase/AICodeArena", code: "ML.02", category: "Applied learning", title: "AI Code Arena Quest" },
  { match: "/showcase/MachineLearning", code: "ML.03", category: "Machine learning", title: "Machine Learning Specialization" },
  { match: "/showcase/PyTorchDeepLearning", code: "DL.04", category: "Deep learning", title: "PyTorch for Deep Learning" },
  { match: "/showcase/LectureNotesRAG", code: "AI.05", category: "Retrieval systems", title: "LectureNotes RAG System" },
  { match: "/showcase/NvidiaMultimodalAI", code: "MM.06", category: "Multimodal AI", title: "NVIDIA Multimodal AI" },
]

export function ShowcaseChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const activeCase = caseFiles.find((item) => pathname.startsWith(item.match)) ?? caseFiles[0]
  const isNotebook = pathname.includes("/notebook/")

  return (
    <div className="showcase-system">
      <header className="showcase-chrome-nav">
        <div className="showcase-chrome-container flex h-[68px] items-center justify-between gap-6">
          <Link href="/" className="showcase-back-link">
            <ArrowLeft className="h-3.5 w-3.5" /> K/K · Profile
          </Link>
          <div className="showcase-chrome-wordmark">CASE FILES <span>/ 06</span></div>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="showcase-github-link">
            <Github className="h-3.5 w-3.5" /> GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <div className="showcase-case-band">
        <div className="showcase-chrome-container grid gap-5 py-7 md:grid-cols-[0.35fr_1fr_auto] md:items-end">
          <div>
            <p className="showcase-case-label">{isNotebook ? "Research notebook" : "Project record"}</p>
            <p className="showcase-case-code">{activeCase.code}</p>
          </div>
          <div>
            <p className="showcase-case-label">{activeCase.category}</p>
            <h1 className="showcase-case-title">{activeCase.title}</h1>
          </div>
          <div className="showcase-case-status"><span /> documented · working artifact</div>
        </div>
      </div>

      <main className="showcase-main">{children}</main>

      <footer className="showcase-chrome-footer">
        <div className="showcase-chrome-container flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p>Kaan Kaya · Data Scientist · Luxembourg</p>
          <Link href="/#work">Return to selected work <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </div>
      </footer>
    </div>
  )
}
