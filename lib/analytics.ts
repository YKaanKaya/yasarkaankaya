'use client';

// Simple analytics utilities
// No external analytics service integrated

// Generic page view tracking - placeholder for future analytics integration
export const trackPageView = (routePath: string, pageTitle: string) => {
  // Analytics service removed - placeholder for future integration
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[Analytics] Page view: ${pageTitle} (${routePath})`);
  }
};

// Section view tracking - placeholder for future analytics integration
export const trackSectionView = (sectionName: string) => {
  // Analytics service removed - placeholder for future integration
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[Analytics] Section view: ${sectionName}`);
  }
};

// Project interaction tracking - placeholder for future analytics integration
export const trackProjectInteraction = (projectName: string, interactionType: string) => {
  // Analytics service removed - placeholder for future integration
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[Analytics] Project interaction: ${projectName} (${interactionType})`);
  }
};

// Custom event tracking functions for portfolio sections - placeholders for future analytics integration
export const trackNotebookView = (notebookSlug: string, notebookTitle: string) => {
  // Analytics service removed - placeholder for future integration
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[Analytics] Notebook view: ${notebookTitle} (${notebookSlug})`);
  }
};

export const trackShowcaseView = (showcaseName: string = 'NVIDIA Multimodal AI') => {
  // Analytics service removed - placeholder for future integration 
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[Analytics] Showcase view: ${showcaseName}`);
  }
};

