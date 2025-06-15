'use client';

// Import types for Datadog RUM
// We'll use dynamic imports to prevent build errors

// Variable to hold the Datadog RUM API when loaded
let datadogRumAPI: any = null;

// Initialize Datadog RUM if available
if (typeof window !== 'undefined') {
  try {
    // Dynamic import to prevent build errors
    import('@datadog/browser-rum').then((module) => {
      datadogRumAPI = module.datadogRum;
    }).catch(err => {
      console.warn('Datadog RUM not available:', err);
    });
  } catch (error) {
    console.warn('Failed to initialize Datadog RUM:', error);
  }
}

// Generic page view tracking
export const trackPageView = (routePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.DD_RUM) {
    try {
      (window.DD_RUM as any).onReady(() => {
        (window.DD_RUM as any).addAction('page_view', {
          page_path: routePath,
          page_title: pageTitle,
          timestamp: new Date().toISOString()
        });
      });
    } catch (err) {
      console.warn('Error tracking page view:', err);
    }
  }
};

// Section view tracking
export const trackSectionView = (sectionName: string) => {
  if (typeof window !== 'undefined' && window.DD_RUM) {
    try {
      (window.DD_RUM as any).onReady(() => {
        (window.DD_RUM as any).addAction('section_view', {
          section_name: sectionName,
          timestamp: new Date().toISOString()
        });
      });
    } catch (err) {
      console.warn('Error tracking section view:', err);
    }
  }
};

// Project interaction tracking
export const trackProjectInteraction = (projectName: string, interactionType: string) => {
  if (typeof window !== 'undefined' && window.DD_RUM) {
    try {
      (window.DD_RUM as any).onReady(() => {
        (window.DD_RUM as any).addAction('project_interaction', {
          project_name: projectName,
          interaction_type: interactionType,
          timestamp: new Date().toISOString()
        });
      });
    } catch (err) {
      console.warn('Error tracking project interaction:', err);
    }
  }
};

// Custom event tracking functions for portfolio sections
export const trackNotebookView = (notebookSlug: string, notebookTitle: string) => {
  if (typeof window !== 'undefined' && window.DD_RUM) {
    try {
      (window.DD_RUM as any).onReady(() => {
        (window.DD_RUM as any).addAction('notebook_view', {
          notebook_slug: notebookSlug,
          notebook_title: notebookTitle,
          section: 'nvidia_multimodal_ai'
        });
      });
    } catch (err) {
      console.warn('Error tracking notebook view:', err);
    }
  }
};

export const trackShowcaseView = (showcaseName: string = 'NVIDIA Multimodal AI') => {
  if (typeof window !== 'undefined' && window.DD_RUM) {
    try {
      (window.DD_RUM as any).onReady(() => {
        (window.DD_RUM as any).addAction('showcase_view', {
          showcase_name: showcaseName,
          timestamp: new Date().toISOString()
        });
      });
    } catch (err) {
      console.warn('Error tracking showcase view:', err);
    }
  }
};

