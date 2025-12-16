/**
 * PDF Fallback Utility
 *
 * Handles checking if a translated PDF exists and falls back to English if not.
 */

/**
 * Get the correct PDF URL with fallback to English
 * @param {string} url - Original PDF URL from tools JSON
 * @param {string} language - Current language code (en, es, de, el)
 * @returns {Promise<{url: string, isFallback: boolean}>} - Final URL and whether it's a fallback
 */
export const getPdfUrlWithFallback = async (url, language) => {
  console.log("[PDF Fallback] Checking URL:", url, "Language:", language);

  // If it's an external URL, return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    console.log("[PDF Fallback] External URL, no fallback needed");
    return { url, isFallback: false };
  }

  // If already English, no fallback needed
  if (language === "en") {
    console.log("[PDF Fallback] Already English, no fallback needed");
    return { url, isFallback: false };
  }

  // Ensure URL starts with / for fetch to work
  const fetchUrl = url.startsWith("/") ? url : `/${url}`;

  // Check if the translated version exists
  try {
    console.log("[PDF Fallback] Fetching HEAD for:", fetchUrl);
    const response = await fetch(fetchUrl, { method: "HEAD" });
    console.log("[PDF Fallback] Response status:", response.status);
    console.log(
      "[PDF Fallback] Content-Type:",
      response.headers.get("content-type"),
    );
    console.log(
      "[PDF Fallback] Content-Length:",
      response.headers.get("content-length"),
    );

    // Check if it's a real file with content (not HTML from dev server)
    const contentType = response.headers.get("content-type");
    const contentLength = response.headers.get("content-length");

    // File exists if:
    // 1. Response is OK
    // 2. Has a valid content length > 0
    // 3. Content type is NOT HTML (which would indicate dev server fallback)
    if (
      response.ok &&
      contentLength &&
      parseInt(contentLength) > 0 &&
      contentType &&
      !contentType.includes("text/html")
    ) {
      console.log("[PDF Fallback] Valid file exists, using original URL");
      return { url, isFallback: false };
    }
    console.log("[PDF Fallback] File does not exist or is HTML fallback");
  } catch (error) {
    console.log("[PDF Fallback] Fetch error:", error);
  }

  // Fall back to English version
  const englishUrl = url.replace(`/tools/${language}/`, "/tools/en/");
  console.log("[PDF Fallback] Falling back to English:", englishUrl);
  return { url: englishUrl, isFallback: true };
};

/**
 * Check if a PDF exists at the given URL
 * @param {string} url - PDF URL to check
 * @returns {Promise<boolean>} - True if file exists
 */
export const checkPdfExists = async (url) => {
  // External URLs are assumed to exist
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return true;
  }

  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};
