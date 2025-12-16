import { useContext } from "react";
import { I18nContext } from "./context";

/**
 * Hook to access translation function
 * @returns {{ t: function }}
 */
export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return { t: context.t };
};

/**
 * Hook to access language and setLanguage
 * @returns {{ language: string, setLanguage: function, isLoading: boolean }}
 */
export const useLanguage = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useLanguage must be used within I18nProvider");
  }
  return {
    language: context.language,
    setLanguage: context.setLanguage,
    isLoading: context.isLoading,
  };
};
