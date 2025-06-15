'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface AnalyticsScriptProps {
  type: 'notebook' | 'showcase';
  slug?: string;
  title?: string;
}

export default function AnalyticsScript({ type, slug, title }: AnalyticsScriptProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.DD_RUM) {
      // Safe access to DD_RUM methods with proper null checks
      const ddRum = window.DD_RUM;
      
      if (typeof ddRum.onReady === 'function') {
        ddRum.onReady(() => {
          if (type === 'notebook' && slug && title && typeof ddRum.addAction === 'function') {
            ddRum.addAction('notebook_view', {
              notebook_slug: slug,
              notebook_title: title,
              section: 'nvidia_multimodal_ai'
            });
            console.log(`Tracked notebook view: ${title}`);
          } else if (type === 'showcase' && typeof ddRum.addAction === 'function') {
            ddRum.addAction('showcase_view', {
              showcase_name: 'NVIDIA Multimodal AI',
              timestamp: new Date().toISOString()
            });
            console.log('Tracked showcase view');
          }
        });
      }
    }
  }, [pathname, type, slug, title]);

  return null;
}
