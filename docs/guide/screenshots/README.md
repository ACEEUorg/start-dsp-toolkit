# Screenshots for Editor Guide

This directory contains all screenshots used in the EDITOR_GUIDE.pdf.

## Naming Convention

Please name your screenshots according to this convention:

1. `01-github-homepage.png` - GitHub homepage with "Sign up" button highlighted
2. `02-email-verification.png` - Email verification message from GitHub
3. `03-decap-cms-login.png` - Decap CMS login page with "Login with GitHub" button
4. `04-github-authorization.png` - GitHub authorization page for Decap CMS
5. `05-decap-cms-dashboard.png` - Decap CMS dashboard showing all collections
6. `06-language-collection.png` - Dashboard with language collection highlighted (e.g., Tools Spanish)
7. `07-tools-list.png` - List of tools with one tool highlighted
8. `08-tool-editing-form.png` - Tool editing form with Description field active
9. `09-image-upload-dialog.png` - Image upload/selection dialog
10. `10-downloads-section.png` - Downloads section with "Add Downloads" button
11. `11-publish-button.png` - Top bar with Publish button highlighted
12. `12-publish-dialog.png` - Publish confirmation dialog with "Publish now"
13. `13-ui-translations.png` - Dashboard with UI Translations highlighted
14. `14-ui-translations-form.png` - UI translations editing form

## Image Requirements

- **Format:** PNG (preferred) or JPG
- **Size:** Keep under 2 MB per image
- **Resolution:** At least 1920×1080 or equivalent
- **Quality:** Clear, readable text
- **Highlighting:** Use red circles/arrows to highlight important elements

## How to Add Screenshots

1. Take screenshots following the guide in the main README
2. Save them with the naming convention above
3. Place them in this directory
4. Update `EDITOR_GUIDE.typ` to reference them (see instructions below)

## Updating EDITOR_GUIDE.typ

To replace a screenshot placeholder with an actual image, change:

```typst
#figure(
  rect(width: 100%, height: 8cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        [Screenshot: GitHub homepage with "Sign up" button highlighted]
      ]
    ]
  ],
  caption: "GitHub homepage"
)
```

To:

```typst
#figure(
  image("screenshots/01-github-homepage.png", width: 100%),
  caption: "GitHub homepage"
)
```

## Screenshot Checklist

- [ ] 01 - GitHub homepage
- [ ] 02 - Email verification
- [ ] 03 - Decap CMS login
- [ ] 04 - GitHub authorization
- [ ] 05 - Decap CMS dashboard
- [ ] 06 - Language collection selected
- [ ] 07 - Tools list
- [ ] 08 - Tool editing form
- [ ] 09 - Image upload dialog
- [ ] 10 - Downloads section
- [ ] 11 - Publish button
- [ ] 12 - Publish dialog
- [ ] 13 - UI Translations collection
- [ ] 14 - UI Translations form
