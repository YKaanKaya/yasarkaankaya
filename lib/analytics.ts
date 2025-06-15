'use client';

// Create a placeholder API that matches Datadog's if the package isn't available
let datadogRumAPI: any = {
  init: () => {},
  addAction: () => {},
};

// Try to load Datadog only in browser environment
if (typeof window !== 'undefined') {
  try {
    // Dynamic import to prevent build errors
    import('@datadog/browser-rum').then((module) => {
      datadogRumAPI = module.datadogRum;
    }).catch(err => {
      console.warn('Datadog RUM not available:', err);
    });
  } catch (err) {
    console.warn('Datadog RUM import failed:', err);
  }
}

export const initDatadog = () => {
  // Only initialize in browser environment
  if (typeof window !== 'undefined') {
    try {
      // Only initialize if the required environment variables are present
      const applicationId = process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID;
      const clientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;
      
      if (!applicationId || !clientToken) {
        console.warn('Datadog RUM not initialized: missing environment variables');
        return;
      }
      
      // Use setTimeout to ensure module has time to load
      setTimeout(() => {
        datadogRumAPI.init({
          applicationId,
          clientToken,
          site: 'us5.datadoghq.com',
          service: 'portfolio',
          env: 'prod',
          sessionSampleRate: 100,
          sessionReplaySampleRate: 20,
          defaultPrivacyLevel: 'mask-user-input',
          trackResources: true,
          trackLongTasks: true,
          trackUserInteractions: true,
        });
      }, 100);
    } catch (err) {
      console.warn('Error initializing Datadog:', err);
    }
  }
};

// Generic page view tracking
export const trackPageView = (routePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined') {
    try {
      datadogRumAPI.addAction('page_view', {
        page_path: routePath,
        page_title: pageTitle,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Error tracking page view:', err);
    }
  }
};

// Section view tracking
export const trackSectionView = (sectionName: string) => {
  if (typeof window !== 'undefined') {
    try {
      datadogRumAPI.addAction('section_view', {
        section_name: sectionName,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Error tracking section view:', err);
    }
  }
};

// Project interaction tracking
export const trackProjectInteraction = (projectName: string, interactionType: string) => {
  if (typeof window !== 'undefined') {
    try {
      datadogRumAPI.addAction('project_interaction', {
        project_name: projectName,
        interaction_type: interactionType,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Error tracking project interaction:', err);
    }
  }
};

// Custom event tracking functions for portfolio sections
export const trackNotebookView = (notebookSlug: string, notebookTitle: string) => {
  if (typeof window !== 'undefined') {
    try {
      datadogRumAPI.addAction('notebook_view', {
        notebook_slug: notebookSlug,
        notebook_title: notebookTitle,
        section: 'nvidia_multimodal_ai'
      });
    } catch (err) {
      console.warn('Error tracking notebook view:', err);
    }
  }
};

export const trackShowcaseView = (showcaseName: string = 'NVIDIA Multimodal AI') => {
  if (typeof window !== 'undefined') {
    try {
      datadogRumAPI.addAction('showcase_view', {
        showcase_name: showcaseName,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Error tracking showcase view:', err);
    }
  }
};

