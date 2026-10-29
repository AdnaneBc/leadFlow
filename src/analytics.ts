declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function track(
  eventName: string,
  params: Record<string, string | number>,
) {
  console.log("[track]", eventName, params);
  window.gtag("event", eventName, params);
}
