import { useState, useEffect } from "react";
import {
  hasConsentDecision,
  grantConsent,
  denyConsent,
} from "../utils/analytics";
import { useTranslation } from "../i18n/hooks";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user has already made a consent decision
    const hasDecision = hasConsentDecision();
    setShowBanner(!hasDecision);
  }, []);

  const handleAccept = () => {
    grantConsent();
    setShowBanner(false);
  };

  const handleDecline = () => {
    denyConsent();
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-seafoam-300 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("cookie.title")}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t("cookie.message")}
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-initial px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              aria-label={t("cookie.decline")}
            >
              {t("cookie.decline")}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-initial px-6 py-3 bg-seafoam-600 text-white font-medium rounded-lg hover:bg-seafoam-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-seafoam-500 focus:ring-offset-2"
              aria-label={t("cookie.accept")}
            >
              {t("cookie.accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
