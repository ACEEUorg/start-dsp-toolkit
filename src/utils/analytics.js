// Google Analytics 4 utility functions
// Handles GA4 initialization, page view tracking, and download event tracking

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
const CONSENT_KEY = "analytics_consent";

/**
 * Check if analytics is enabled (user has consented)
 * @returns {boolean} True if user has given consent
 */
export const isAnalyticsEnabled = () => {
  if (typeof window === "undefined") return false;
  const consent = localStorage.getItem(CONSENT_KEY);
  return consent === "granted";
};

/**
 * Initialize Google Analytics 4
 * Dynamically loads the gtag.js script and configures GA4
 * Only call this AFTER user has consented
 */
export const initializeAnalytics = () => {
  // Don't initialize if no measurement ID is configured
  if (!MEASUREMENT_ID) {
    console.warn("GA4 Measurement ID not configured");
    return;
  }

  // Don't initialize if user hasn't consented
  if (!isAnalyticsEnabled()) {
    return;
  }

  // Check if already initialized
  if (window.gtag) {
    return;
  }

  // Initialize dataLayer and gtag function BEFORE loading script
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // Configure GA4 immediately
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true, // GDPR compliance
    cookie_flags: "SameSite=None;Secure",
    send_page_view: true, // Explicitly enable automatic page view tracking
  });

  // Create and load gtag.js script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  console.log("GA4 initialized with ID:", MEASUREMENT_ID);
};

/**
 * Grant analytics consent and initialize GA4
 */
export const grantConsent = () => {
  localStorage.setItem(CONSENT_KEY, "granted");
  initializeAnalytics();
};

/**
 * Deny analytics consent
 */
export const denyConsent = () => {
  localStorage.setItem(CONSENT_KEY, "denied");
};

/**
 * Check if consent decision has been made
 * @returns {boolean} True if user has made a consent choice
 */
export const hasConsentDecision = () => {
  if (typeof window === "undefined") return false;
  const consent = localStorage.getItem(CONSENT_KEY);
  return consent === "granted" || consent === "denied";
};

/**
 * Track a page view in GA4
 * Call this on route changes in the SPA
 * @param {string} path - The page path (e.g., '/tool/1')
 * @param {string} title - The page title
 * @param {string} language - The current language code (en, es, de, el)
 */
export const trackPageView = (path, title, language = "en") => {
  if (!isAnalyticsEnabled()) {
    return;
  }

  // Queue the event even if gtag isn't loaded yet - dataLayer will buffer it
  if (!window.gtag) {
    console.warn("gtag not loaded yet, queuing page view");
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: path,
      page_title: title,
      language: language,
    });
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    language: language,
  });

  console.log("Page view tracked:", path, "Language:", language);
};

/**
 * Track a file download event with custom parameters
 * @param {string} fileName - The name of the downloaded file
 * @param {number} toolNumber - The tool number (1-24)
 * @param {string} toolName - The name of the tool
 * @param {string} linkTitle - The title of the download link
 */
export const trackDownload = (fileName, toolNumber, toolName, linkTitle) => {
  if (!isAnalyticsEnabled()) {
    return;
  }

  // Extract file extension
  const fileExtension = fileName.split(".").pop().toLowerCase();

  const eventData = {
    file_name: fileName,
    file_extension: fileExtension,
    link_text: linkTitle,
    tool_number: toolNumber,
    tool_name: toolName,
    event_category: "engagement",
    event_label: `Tool ${toolNumber}: ${fileName}`,
  };

  // Queue the event even if gtag isn't loaded yet - dataLayer will buffer it
  if (!window.gtag) {
    console.warn("gtag not loaded yet, queuing download event");
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "file_download",
      ...eventData,
    });
    return;
  }

  window.gtag("event", "file_download", eventData);

  console.log("Download tracked:", {
    fileName,
    toolNumber,
    toolName,
    linkTitle,
  });
};
