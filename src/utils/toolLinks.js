/**
 * Tool Link Utilities
 *
 * Helpers for reasoning about the URLs in a tool's `links` array.
 */

/**
 * Project materials hosted on the Skills-Lab platform.
 *
 * Skills-Lab keeps one folder per site language, so the `.md` files point each
 * language at its own translated file. These links are therefore already
 * localized, even though they are external and carry no file extension.
 */
const SKILLS_LAB_DOWNLOAD =
  /^https?:\/\/(www\.)?skills-lab\.eu\/index\/downloadmaterialfile\//i;

/**
 * Check whether a URL points outside the site
 * @param {string} url - Link URL from the tools JSON
 * @returns {boolean} - True for absolute http(s) URLs
 */
export const isExternalUrl = (url) =>
  url.startsWith("http://") || url.startsWith("https://");

/**
 * Check whether an external URL already serves the current site language
 * @param {string} url - Link URL from the tools JSON
 * @returns {boolean} - True for Skills-Lab download links
 */
export const isLocalizedExternalUrl = (url) => SKILLS_LAB_DOWNLOAD.test(url);

/**
 * Get the file type a link points to, for the format badge
 * @param {string} url - Link URL from the tools JSON
 * @returns {string|null} - Lowercased extension, or null if the URL has none
 */
export const getLinkFileType = (url) => {
  // Skills-Lab download URLs end in a numeric file id; everything published
  // there is a PDF.
  if (isLocalizedExternalUrl(url)) {
    return "pdf";
  }

  const fileName = url.split(/[?#]/)[0].split("/").pop() || "";
  return fileName.includes(".")
    ? fileName.split(".").pop().toLowerCase()
    : null;
};

/**
 * Skills-Lab material links, in both flavours: `downloadmaterialfile` hands the
 * file over directly, `materialfilevisit` opens it in the browser. Skills-Lab
 * counts either one as a download, so both get a counter badge.
 */
const SKILLS_LAB_MATERIAL =
  /^https?:\/\/(www\.)?skills-lab\.eu\/index\/(downloadmaterialfile|materialfilevisit)\/.*materialFileId\/(\d+)/i;

/**
 * Get the Skills-Lab download-counter badge for a link
 *
 * The SVG variant is used rather than the PNG so the badge stays sharp on
 * high-DPI screens. Its width grows with the digit count, so callers should
 * size it by height and leave the width intrinsic.
 * @param {string} url - Link URL from the tools JSON
 * @returns {string|null} - Badge image URL, or null for non-Skills-Lab links
 */
export const getDownloadBadgeUrl = (url) => {
  const match = SKILLS_LAB_MATERIAL.exec(url);
  return match ? `https://www.skills-lab.eu/badge/file/${match[3]}.svg` : null;
};
