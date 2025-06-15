/**
 * Type declarations for Datadog RUM global object
 */
interface DatadogRUM {
  onReady: (callback: () => void) => void;
  init: (options: DatadogRUMOptions) => void;
  addAction: (name: string, data: Record<string, any>) => void;
}

interface DatadogRUMOptions {
  applicationId: string;
  clientToken: string;
  site?: string;
  service?: string;
  env?: string;
  version?: string;
  sessionSampleRate?: number;
  sessionReplaySampleRate?: number;
  trackUserInteractions?: boolean;
  trackResources?: boolean;
  trackLongTasks?: boolean;
  defaultPrivacyLevel?: 'mask' | 'mask-user-input' | 'allow';
}

interface Window {
  DD_RUM?: DatadogRUM;
}
