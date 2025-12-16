import PropTypes from "prop-types";
import { useLanguage, useTranslation } from "../../i18n/hooks";

/**
 * ExternalLinkBadge Component
 *
 * Displays a badge indicating that a link is external and English-only.
 * Only shown when the current site language is not English.
 *
 * @param {string} url - The URL to check if it's external
 */
export default function ExternalLinkBadge({ url }) {
  const { language } = useLanguage();
  const { t } = useTranslation();

  // Only show for external links when language is not English
  const isExternal =
    url && (url.startsWith("http://") || url.startsWith("https://"));
  const shouldShow = isExternal && language !== "en";

  if (!shouldShow) {
    return null;
  }

  return (
    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded border border-amber-300">
      <svg
        className="w-3 h-3 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
      {t("badge.externalLink")}
    </span>
  );
}

ExternalLinkBadge.propTypes = {
  url: PropTypes.string,
};
