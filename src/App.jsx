import { Routes, Route, useLocation } from "react-router";
import { useEffect } from "react";
import MainNav from "./components/navigation/MainNav";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import TranslationDisclaimer from "./components/TranslationDisclaimer";
import ToolboxPage from "./pages/ToolboxPage";
import ToolDetailPage from "./pages/ToolDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { initializeAnalytics, trackPageView } from "./utils/analytics";
import { useTranslation, useLanguage } from "./i18n/hooks";

export default function App() {
  const location = useLocation();
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const path = location.pathname + location.search;
    let title = "Start-DSP Toolbox";

    // Set page title based on route
    if (location.pathname === "/" || location.pathname === "/toolbox") {
      title = "Toolbox - Start-DSP Toolbox";
    } else if (location.pathname.startsWith("/tool/")) {
      const toolNumber = location.pathname.split("/")[2];
      title = `Tool ${toolNumber} - Start-DSP Toolbox`;
    }

    trackPageView(path, title, language);
  }, [location, language]);

  return (
    <div className="min-h-screen flex flex-col">
      <TranslationDisclaimer />
      <MainNav />
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-display font-bold tracking-tight text-seafoam-900">
            {t("header.title")}
          </h1>
        </div>
      </header>

      <main className="grow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ToolboxPage />} />
            <Route path="/toolbox" element={<ToolboxPage />} />
            <Route path="/tool/:number" element={<ToolDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
