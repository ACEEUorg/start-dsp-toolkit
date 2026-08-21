import PropTypes from "prop-types";
import { useLanguage, useTranslation } from "../../i18n/hooks";

/**
 * EnglishOnlyBadge Component
 *
 * Flags a link whose target is only available in English. Every tool itself is
 * translated into all four site languages, so this is never about the tool —
 * it marks either a third-party site the toolbox links out to, or a single
 * material that exists in English only.
 *
 * Renders nothing on the English site, where the note carries no information.
 *
 * @param {string} labelKey - Translation key for the badge text
 */
export default function EnglishOnlyBadge({ labelKey }) {
  const { language } = useLanguage();
  const { t } = useTranslation();

  if (language === "en") {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-seafoam-700">
      <span
        className="fi fi-gb rounded-sm"
        style={{ width: "16px", height: "12px" }}
      ></span>
      {t(labelKey)}
    </span>
  );
}

EnglishOnlyBadge.propTypes = {
  labelKey: PropTypes.string.isRequired,
};
