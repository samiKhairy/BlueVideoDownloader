export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag as ((action: string, event: string, data?: Record<string, unknown>) => void) | undefined;
  if (typeof gtag !== 'function') return;

  gtag('event', eventName, params ?? {});
}
