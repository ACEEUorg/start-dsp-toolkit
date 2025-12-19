import { load } from "js-yaml";

/**
 * Tools Data Loader
 *
 * Dynamically loads tool data from markdown frontmatter based on the current language.
 * Falls back to English if the requested language file is not available.
 */

/**
 * Parse YAML frontmatter from markdown content
 * @param {string} content - Raw markdown content
 * @returns {Object} Parsed frontmatter data
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {};
  }

  const yamlContent = match[1];
  const data = load(yamlContent) || {};

  // Ensure summary ends with punctuation
  if (data.summary && typeof data.summary === "string") {
    const lastChar = data.summary.slice(-1);
    if (![".", "!", "?"].includes(lastChar)) {
      data.summary = data.summary + ".";
    }
  }

  return data;
}

/**
 * Load all markdown files for a specific language from the tools directory
 * @param {string} language - Language code (en, es, de, el)
 * @returns {Promise<Object>} Tools data object with tools array and validOptions
 */
export const loadTools = async (language = "en") => {
  try {
    // Import all markdown files for the specified language folder
    const toolFiles = import.meta.glob("/content/tools/*/*.md", {
      query: "?raw",
      import: "default",
    });

    const tools = [];
    const purposes = new Set();

    // Filter for files in the language folder
    const languagePattern = new RegExp(`/content/tools/${language}/`);

    for (const [path, importFn] of Object.entries(toolFiles)) {
      if (languagePattern.test(path)) {
        const content = await importFn();
        const data = parseFrontmatter(content);

        // Add the tool data
        tools.push(data);

        // Collect unique purposes for filtering
        if (data.purpose) {
          purposes.add(data.purpose);
        }
      }
    }

    // Sort tools by number
    tools.sort((a, b) => a.number - b.number);

    return {
      tools,
      validOptions: {
        purpose: Array.from(purposes).sort(),
      },
    };
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
