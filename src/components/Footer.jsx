import { useTranslation, useLanguage } from "../i18n/I18nContext";

export default function Footer() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center space-x-4">
          <img
            src={`/assets/logos/eu-logo-${language}.png`}
            alt={t("footer.euLogoAlt")}
            className="h-12 w-auto"
          />
          <p className="text-sm text-gray-600 text-justify max-w-6xl">
            {t("footer.euDisclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
