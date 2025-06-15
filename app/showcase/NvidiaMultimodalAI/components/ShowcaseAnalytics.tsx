'use client';

import { useEffect } from 'react';
import { trackShowcaseView } from '@/lib/analytics';

export function ShowcaseAnalytics() {
  useEffect(() => {
    // Track showcase view when component mounts
    trackShowcaseView();
  }, []);

  return null;
}
