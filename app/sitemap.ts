import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/showcase/AICodeArena/", "/showcase/deftunes/", "/showcase/LectureNotesRAG/", "/showcase/MachineLearning/", "/showcase/PyTorchDeepLearning/", "/showcase/NvidiaMultimodalAI/", "/showcase/agentic-evaluation/"]
  return routes.map((route) => ({ url: `https://yasarkaankaya.com${route}` }))
}
