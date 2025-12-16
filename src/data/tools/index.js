/**
 * Tools Data Loader
 *
 * Dynamically loads tool data based on the current language.
 * Falls back to English if the requested language file is not available.
 */

/**
 * Load tools data for a specific language
 * @param {string} language - Language code (en, es, de, el)
 * @returns {Promise<Object>} Tools data object
 */
export const loadTools = async (language = 'en') => {
  try {
    const data = await import(`./${language}.json`);
    return data.default || data;
  } catch (error) {
    console.warn(`Failed to load tools for language "${language}", falling back to English`, error);
    // Fallback to English if language file missing
    const data = await import('./en.json');
    return data.default || data;
  }
};

/**
 * React hook to load tools data based on current language
 * Use with React.useState and React.useEffect
 *
 * Example:
 * ```js
 * const { language } = useLanguage();
 * const [toolsData, setToolsData] = useState(null);
 *
 * useEffect(() => {
 *   loadTools(language).then(setToolsData);
 * }, [language]);
 * ```
 */
