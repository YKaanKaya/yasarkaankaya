'use client';

import { NotebookViewer } from '@/app/showcase/NvidiaMultimodalAI/components/NotebookViewer';
import AnalyticsScript from '@/app/showcase/NvidiaMultimodalAI/components/AnalyticsScript';

interface NotebookClientWrapperProps {
  slug: string;
  title: string;
  file: string;
}

export default function NotebookClientWrapper({ slug, title, file }: NotebookClientWrapperProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <AnalyticsScript type="notebook" slug={slug} title={title} />
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <NotebookViewer src={file} />
    </div>
  );
}
