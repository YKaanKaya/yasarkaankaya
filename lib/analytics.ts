'use client';

import { datadogRum } from '@datadog/browser-rum';

export const initDatadog = () => {
  // Only initialize in browser environment
  if (typeof window !== 'undefined') {
    // Only initialize if the required environment variables are present
    const applicationId = process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID;
    const clientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;
    
    if (!applicationId || !clientToken) {
      console.warn('Datadog RUM not initialized: missing environment variables');
      return;
    }
    
    datadogRum.init({
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
  }
};

// Generic page view tracking
export const trackPageView = (routePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined') {
    datadogRum.addAction('page_view', {
      page_path: routePath,
      page_title: pageTitle,
      timestamp: new Date().toISOString()
    });
  }
};

// Section view tracking
export const trackSectionView = (sectionName: string) => {
  if (typeof window !== 'undefined') {
    datadogRum.addAction('section_view', {
      section_name: sectionName,
      timestamp: new Date().toISOString()
    });
  }
};

// Project interaction tracking
export const trackProjectInteraction = (projectName: string, interactionType: string) => {
  if (typeof window !== 'undefined') {
    datadogRum.addAction('project_interaction', {
      project_name: projectName,
      interaction_type: interactionType,
      timestamp: new Date().toISOString()
    });
  }
};

// Custom event tracking functions for portfolio sections
export const trackNotebookView = (notebookSlug: string, notebookTitle: string) => {
  if (typeof window !== 'undefined') {
    datadogRum.addAction('notebook_view', {
      notebook_slug: notebookSlug,
      notebook_title: notebookTitle,
      section: 'nvidia_multimodal_ai'
    });
  }
};

export const trackShowcaseView = (showcaseName: string = 'NVIDIA Multimodal AI') => {
  if (typeof window !== 'undefined') {
    datadogRum.addAction('showcase_view', {
      showcase_name: showcaseName,
      timestamp: new Date().toISOString()
    });
  }
};

