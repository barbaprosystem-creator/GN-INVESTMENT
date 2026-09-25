// Zero-PII Event Analytics Dispatcher for G&N Investment
// Captures funnel progression events without storing or sending any personal data.

export const ANALYTICS_EVENTS = {
  CTA_GET_MY_OFFER_CLICK: 'cta_get_my_offer_click',
  CLICK_TO_CALL: 'click_to_call',
  OFFER_FORM_STARTED: 'offer_form_started',
  OFFER_FORM_STEP_1_COMPLETED: 'offer_form_step_1_completed',
  OFFER_FORM_SUBMITTED: 'offer_form_submitted'
};

export function trackEvent(eventName, eventProps = {}) {
  // Ensure NO PII is ever passed in eventProps
  const sanitizedProps = {
    eventName,
    timestamp: new Date().toISOString(),
    path: window.location.pathname || '/',
    deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
    ...eventProps
  };

  // 1. Dispatch custom DOM event
  try {
    const customEvent = new CustomEvent('gn_analytics', { detail: sanitizedProps });
    window.dispatchEvent(customEvent);
  } catch (err) {
    // Non-blocking
  }

  // 2. Compatibility with dataLayer if Google Tag Manager or GA4 is present
  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(sanitizedProps);
  }

  // Log in development
  if (import.meta.env?.DEV) {
    console.log(`[Analytics Event: ${eventName}]`, sanitizedProps);
  }
}

// Global delegated tracking for CTAs and Phone calls
export function initGlobalEventTracking() {
  document.addEventListener('click', (e) => {
    // Track Click to Call
    const telLink = e.target.closest('a[href^="tel:"]');
    if (telLink) {
      trackEvent(ANALYTICS_EVENTS.CLICK_TO_CALL, {
        phoneNumber: '(502) 384-3357',
        location: telLink.getAttribute('data-location') || 'unknown'
      });
      return;
    }

    // Track Get My Offer CTA Clicks
    const offerBtn = e.target.closest('[data-analytics-cta="get-my-offer"], a[href="/get-my-offer"], a[data-nav="get-my-offer"]');
    if (offerBtn) {
      trackEvent(ANALYTICS_EVENTS.CTA_GET_MY_OFFER_CLICK, {
        ctaLocation: offerBtn.getAttribute('data-location') || 'navigation_or_page'
      });
    }
  });
}
