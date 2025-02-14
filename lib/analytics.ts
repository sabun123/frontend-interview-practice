interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

type WindowWithDataLayer = Window & {
  dataLayer: Array<Record<string, unknown>>;
  gtag: (
    command: 'config' | 'event',
    targetId: string,
    config: Record<string, unknown>
  ) => void;
};

declare const window: WindowWithDataLayer;

export const GA_TRACKING_ID = 'G-K8QSF9L6TX';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};