'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initDatadog, trackPageView } from '@/lib/analytics';

export function DatadogProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Datadog only once
    initDatadog();
  }, []);

  useEffect(() => {
    // Track page view on route changes
    if (pathname) {
      const pageTitle = document.title || 'Portfolio Page';
      trackPageView(pathname, pageTitle);
    }
  }, [pathname]); // Re-run when the path changes

  return null;
}
