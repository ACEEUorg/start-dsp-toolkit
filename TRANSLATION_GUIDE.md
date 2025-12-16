# Translation Guide
## Start-DSP Entrepreneurial University Toolbox

This guide explains how to provide translations for the website in Spanish (ES), German (DE), and Greek (EL).

---

## 📋 What You Need to Provide

### 1. UI Strings Translation (3 files)

Translate the English UI strings file for each language:

**Source file:** `src/i18n/translations/en.js`

**Files to provide:**
- `src/i18n/translations/es.js` (Spanish)
- `src/i18n/translations/de.js` (German)
- `src/i18n/translations/el.js` (Greek)

**Instructions:**
1. Copy the structure from `en.js`
2. Translate all values (text after the colon)
3. Keep all keys (text before the colon) unchanged
4. Remove the `[ES]`, `[DE]`, `[EL]` prefixes from the placeholder text

**Example:**
```javascript
// English (en.js)
"header.title": "Start-DSP Entrepreneurial University Toolbox",

// Spanish (es.js)
"header.title": "Caja de Herramientas para Universidades Emprendedoras Start-DSP",
```

---

### 2. Tools Data Translation (3 files)

Translate the tools database for each language:

**Source file:** `src/data/tools/en.json`

**Files to provide:**
- `src/data/tools/es.json` (Spanish)
- `src/data/tools/de.json` (German)
- `src/data/tools/el.json` (Greek)

**Instructions:**
1. Copy the entire structure from `en.json`
2. Translate the following fields for each tool:
   - `name`
   - `summary`
   - `description`
   - `outcomes`
   - `instructions`
   - `benefits`
   - `purpose`
   - `prerequisiteTools`
   - `links[].title` (download link titles)
3. **Keep unchanged:**
   - `number`
   - `partner`
   - `links[].url` for external URLs (those starting with `http`)
4. **Update PDF URLs:**
   - Change `assets/pdfs/en/` to `assets/pdfs/es/` (or `de/`, `el/`)
   - Example: `"url": "assets/pdfs/es/tool_1.1_TheEntrepreneurialWallPack.pdf"`
5. Translate the `validOptions.purpose` array

**Example:**
```json
{
  "number": 1,
  "name": "El Paquete de Pared Emprendedora",
  "summary": "El Paquete de Pared Emprendedora ofrece citas...",
  "links": [
    {
      "title": "El Paquete de Pared Emprendedora: Plantillas, Citas y Guía de IA",
      "url": "assets/pdfs/es/tool_1.1_TheEntrepreneurialWallPack.pdf"
    }
  ]
}
```

---

### 3. PDF Files Translation (~34 PDFs × 3 languages = ~102 files)

Translate all PDF documents and place them in the correct language directory:

**Directories:**
- `public/assets/pdfs/es/` (Spanish PDFs)
- `public/assets/pdfs/de/` (German PDFs)
- `public/assets/pdfs/el/` (Greek PDFs)

**File Naming:**
- Use **exactly the same filenames** as the English versions
- Find English PDFs in: `public/assets/pdfs/en/`

**List of files to translate:**
```
tool_1.1_TheEntrepreneurialWallPack.pdf
tool_2.1_EntrepreneurialDictionary.pdf
tool_3.1_KPIDashboardInstructions.pdf
tool_3.2_KPIDashboard.xlsm
tool_4.1_EngageTreeUnlockFacultyEntrepreneurship.pdf
tool_5.1_EntrepreneurialResourceMappingJourney.pdf
tool_6.1_EntrepreneurialCompetencyAssesmentTool.pdf
tool_7.1_CourseDesign_canvas.pdf
tool_7.2_Course_designcards_1.pdf
tool_7.3_Course_design_cards_2.pdf
tool_8.1_EntreCompAI&VRResourceGuide.pdf
tool_9.1_Grant_application_guideline.pdf
tool_10.1_PlanningandFinancingEntrepreneurshipEducationDataCollectionTemplate.pdf
tool_15.1_SustainableBusinessModelCanvas.pdf
tool_16.1_SDGFramework(Introduction).pdf
tool_16.2_SDGFramework(ExamplesofApplication).pdf
tool_16.3_SDGFramework(ResourcesandSupports).pdf
tool_17.1_StakeholdersRadarAITool(Introduction).pdf
tool_17.2_StakeholdersRadarAITool(OurTop3Tools).pdf
tool_17.3_StakeholdersRadarAITool(HowtoUse).pdf
tool_17.4_StakeholdersRadarAITool(ResourcesandSupports).pdf
tool_18.1_IntroductionKnowledgeSharingPlatform.pdf
tool_18.2_CompareKnowledgeSharingPlatforms.pdf
tool_19.1_Startupexpenses.pdf
tool_20.1_Loancalculator.pdf
tool_21.1_FinancialProjectionsTemplate.pdf
tool_22.1_TOOLMC1_facilitationguide.pdf
tool_22.2_TOOLMC1_board.pdf
tool_22.3_TOOLMC1_cards.pdf
tool_22.4_TOOLMC1_reflectionsheet.pdf
tool_23.1_VentureEthicallyDigitalProjectGuideforTeachers.pdf
tool_23.2_VentureEthicallyDigitalProjectMaterial.pdf
tool_24.1_CSIFailedStartupsDivisionDigitalGuideforFacilitators.pdf
tool_24.2_CSIFailedStartupsDivisionProjectMaterials.pdf
```

**Note:** If a PDF is not available in a particular language yet, you can skip it. The system will automatically use the English version and show a `[EN]` badge to the user.

---

## ✅ How the System Works

### Language Auto-Detection
- On first visit, the site detects the user's browser language
- If the browser language is ES, DE, or EL, it automatically switches to that language
- The choice is saved in the browser's localStorage and persists across sessions

### Language Switcher
- Users can manually switch languages using the dropdown in the header navigation
- Shows flag emoji + native language name (e.g., "🇪🇸 Español")
- Available on both desktop and mobile views

### Fallback Behavior
- If content is not available in the selected language, English is used as fallback
- External links (YouTube, SCORE.org, etc.) show `[External - English only]` badge when language ≠ EN
- Missing PDF translations show `[EN]` badge

### Analytics
- Language is tracked in Google Analytics page views
- Allows segmentation by language to see which languages are most used

---

## 📁 File Structure After Translation

```
src/
├── i18n/
│   └── translations/
│       ├── en.js  ← Existing
│       ├── es.js  ← You provide
│       ├── de.js  ← You provide
│       └── el.js  ← You provide
├── data/
│   └── tools/
│       ├── en.json  ← Existing
│       ├── es.json  ← You provide
│       ├── de.json  ← You provide
│       └── el.json  ← You provide

public/
└── assets/
    └── pdfs/
        ├── en/     ← Existing (34 files)
        ├── es/     ← You provide
        ├── de/     ← You provide
        └── el/     ← You provide
```

---

## 🚀 Testing After Translation

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Test each language:**
   - Click the language selector in the header
   - Verify all UI strings are translated
   - Check that tool data loads correctly
   - Verify PDF links work
   - Test external link badges appear (non-English only)

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🎯 Quick Checklist

- [ ] Translate `es.js`, `de.js`, `el.js` UI strings
- [ ] Translate `es.json`, `de.json`, `el.json` tools data
- [ ] Update PDF URLs in JSON files to point to correct language subdirectory
- [ ] Translate and place PDF files in language subdirectories
- [ ] Test all languages in development mode
- [ ] Build and verify production bundle

---

## 💡 Tips

1. **Consistency:** Use the same terminology across UI strings and tools data
2. **Length:** Some UI strings have space constraints (buttons, labels) - keep translations concise
3. **Testing:** Test with actual browser language detection (Chrome: Settings → Languages)
4. **Incremental:** You can add languages one at a time - partial translations work fine
5. **Updates:** When English content changes, update all language files accordingly

---

## 📞 Need Help?

If you have questions about:
- File structure
- Translation format
- Technical implementation
- Testing procedures

Create an issue in the GitHub repository or contact the development team.
