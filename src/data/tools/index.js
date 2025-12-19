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
  const data = {};

  // Simple YAML parser for our specific use case
  let currentKey = null;
  let currentValue = [];
  let inMultiline = false;
  let inList = false;

  const lines = yamlContent.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this is a key-value pair
    const keyMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):(.*)$/);

    if (keyMatch) {
      // Save previous key if exists
      if (currentKey) {
        if (inList) {
          data[currentKey] = currentValue;
        } else if (
          currentValue.length === 1 &&
          typeof currentValue[0] === "number"
        ) {
          data[currentKey] = currentValue[0];
        } else {
          data[currentKey] = currentValue.join("\n").trim();
        }
      }

      currentKey = keyMatch[1];
      const valueStart = keyMatch[2].trim();

      // Check if it's a multiline string
      if (valueStart === "|" || valueStart === ">") {
        inMultiline = true;
        inList = false;
        currentValue = [];
      } else if (valueStart === "") {
        // Could be start of a list or object
        inMultiline = false;
        inList = false;
        currentValue = [];
      } else if (valueStart.startsWith('"') || valueStart.startsWith("'")) {
        // Quoted string
        inMultiline = false;
        inList = false;
        currentValue = [valueStart.replace(/^["']|["']$/g, "")];
      } else {
        // Simple value (might have continuation lines)
        inMultiline = true;
        inList = false;
        // Check if it's a number
        if (/^\d+$/.test(valueStart)) {
          currentValue = [Number(valueStart)];
          inMultiline = false;
        } else {
          currentValue = [valueStart];
        }
      }
    } else if (line.trim().startsWith("- ")) {
      // List item
      if (currentKey) {
        inList = true;
        const item = line.trim().substring(2).trim();

        // Check if it's an object in the list
        if (item.includes(":")) {
          // Parse object properties
          if (!Array.isArray(currentValue)) {
            currentValue = [];
          }

          // Start new object or add to current
          const propMatch = item.match(/^([a-zA-Z_][a-zA-Z0-9_]*):(.*)$/);
          if (propMatch) {
            const lastItem = currentValue[currentValue.length - 1];
            if (
              lastItem &&
              typeof lastItem === "object" &&
              !lastItem[propMatch[1]]
            ) {
              lastItem[propMatch[1]] = propMatch[2]
                .trim()
                .replace(/^["']|["']$/g, "");
            } else {
              currentValue.push({
                [propMatch[1]]: propMatch[2].trim().replace(/^["']|["']$/g, ""),
              });
            }
          }
        } else {
          currentValue.push(item.replace(/^["']|["']$/g, ""));
        }
      }
    } else if (line.trim() && (inMultiline || inList)) {
      // Continuation of multiline or list item properties
      const trimmed = line.trim();

      if (inList && trimmed.includes(":")) {
        // Object property in list
        const propMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):(.*)$/);
        if (propMatch && currentValue.length > 0) {
          const lastItem = currentValue[currentValue.length - 1];
          if (typeof lastItem === "object") {
            lastItem[propMatch[1]] = propMatch[2]
              .trim()
              .replace(/^["']|["']$/g, "");
          }
        }
      } else if (inMultiline) {
        currentValue.push(line.replace(/^  /, ""));
      }
    }
  }

  // Save last key
  if (currentKey) {
    if (inList) {
      data[currentKey] = currentValue;
    } else {
      // If single value and it's already a number, keep it
      if (currentValue.length === 1 && typeof currentValue[0] === "number") {
        data[currentKey] = currentValue[0];
      } else {
        const joined = currentValue.join("\n").trim();
        // Try to parse as number
        const num = Number(joined);
        if (!isNaN(num) && joined !== "" && /^\d+$/.test(joined)) {
          data[currentKey] = num;
        } else {
          data[currentKey] = joined;
        }
      }
    }
  }

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
