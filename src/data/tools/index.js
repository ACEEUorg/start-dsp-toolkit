/**
 * Tools Data Loader
 *
 * Loads pre-built JSON tool data based on the current language.
 * JSON files are generated at build time from markdown frontmatter.
 * Falls back to English if the requested language file is not available.
 */

/**
 * Load tools data for a specific language from pre-built JSON
 * @param {string} language - Language code (en, es, de, el)
 * @returns {Promise<Object>} Tools data object with tools array and validOptions
 */
export const loadTools = async (language = "en") => {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}data/tools-${language}.json`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch tools for language: ${language}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(
      `Failed to load tools for language "${language}", falling back to English`,
      error,
    );

    // Fallback to English if language fails
    if (language !== "en") {
      return loadTools("en");
    }

    // If English also fails, return empty structure
    return {
      tools: [],
      validOptions: {
        purpose: [],
      },
    };
  }
};
