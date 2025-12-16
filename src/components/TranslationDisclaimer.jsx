import { useState, useEffect } from "react";
import { useLanguage, useTranslation } from "../i18n/hooks";

/**
 * TranslationDisclaimer Component
 *
 * Displays a dismissible banner when user switches to a non-English language
 * to inform them that translations are in progress.
 * Shows only once per session using localStorage.
 */
export default function TranslationDisclaimer() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show for non-English languages
    if (language === "en") {
      setIsVisible(false);
      return;
    }

    // Check if user has already seen the disclaimer for this language
    const hasSeenKey = `translation-disclaimer-seen-${language}`;
    const hasSeen = localStorage.getItem(hasSeenKey);

    if (!hasSeen) {
      setIsVisible(true);
    }
  }, [language]);

  const handleClose = () => {
    setIsVisible(false);
    // Mark as seen for this language
    const hasSeenKey = `translation-disclaimer-seen-${language}`;
    localStorage.setItem(hasSeenKey, "true");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-amber-50 border-b-2 border-amber-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {/* Info Icon */}
            <svg
              className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {/* Message */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-amber-900 mb-1">
                {t("disclaimer.translationTitle")}
              </h3>
              <p className="text-sm text-amber-800">
                {t("disclaimer.translationMessage")}
              </p>
            </div>
          </div>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-amber-600 hover:text-amber-800 transition-colors"
            aria-label="Close disclaimer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
