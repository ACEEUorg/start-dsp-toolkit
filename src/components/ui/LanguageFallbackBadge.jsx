import { useLanguage, useTranslation } from "../../i18n/hooks";

/**
 * LanguageFallbackBadge Component
 *
 * Displays a badge with English flag to indicate that content is shown in English
 * as a fallback when the selected language version is not available.
 * Only shown when the current site language is not English.
 */
export default function LanguageFallbackBadge() {
  const { language } = useLanguage();
  const { t } = useTranslation();

  // Only show when language is not English
  if (language === "en") {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-seafoam-700">
      <span
        className="fi fi-gb rounded-sm"
        style={{ width: "16px", height: "12px" }}
      ></span>
      {t("badge.fallbackLanguage")}
    </span>
  );
}
