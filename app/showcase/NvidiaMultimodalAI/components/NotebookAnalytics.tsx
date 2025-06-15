'use client';

import { useEffect } from 'react';
import { trackNotebookView } from '@/lib/analytics';

interface NotebookAnalyticsProps {
  slug: string;
  title: string;
}

export function NotebookAnalytics({ slug, title }: NotebookAnalyticsProps) {
  useEffect(() => {
    // Track notebook view when component mounts
    trackNotebookView(slug, title);
  }, [slug, title]);

  return null;
}
