import { useState, useEffect } from "react";
import { I18nContext } from "./context";
import en from "./translations/en";
import es from "./translations/es";
import de from "./translations/de";
import el from "./translations/el";

const translations = { en, es, de, el };

/**
 * I18n Provider Component
 *
 * Manages language state and provides translation functions to the app.
 * - Automatically detects browser language on first visit
 * - Persists language preference in localStorage
 * - Provides translation (t) function to all child components
 */
export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage or auto-detect browser language
    const stored = localStorage.getItem("language");
    if (stored && ["en", "es", "de", "el"].includes(stored)) {
      setLanguageState(stored);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split("-")[0]; // 'es-ES' -> 'es'
      if (["es", "de", "el"].includes(browserLang)) {
        setLanguageState(browserLang);
      }
      // Default to 'en' if browser language not supported (already set above)
    }
    setIsLoading(false);
  }, []);

  const setLanguage = (lang) => {
    if (["en", "es", "de", "el"].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem("language", lang);
    }
  };

  /**
   * Translation function
   * @param {string} key - Translation key (e.g., "header.title")
   * @returns {string} Translated string or key if not found
   */
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
    isLoading,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
