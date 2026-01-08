#import "@preview/colorful-boxes:1.3.1": *

#set page(
  paper: "a4",
  margin: (x: 2.5cm, y: 2cm),
  numbering: "1",
)

#set text(
  font: "Liberation Sans",
  size: 11pt,
  lang: "en",
)

#set heading(numbering: "1.")

#set par(justify: true, leading: 0.65em)

#show heading.where(level: 1): it => [
  #set text(size: 20pt, weight: "bold")
  #block(above: 1.5em, below: 1em)[#it]
]

#show heading.where(level: 2): it => [
  #set text(size: 14pt, weight: "bold")
  #block(above: 1.2em, below: 0.8em)[#it]
]

#show heading.where(level: 3): it => [
  #set text(size: 12pt, weight: "bold")
  #block(above: 1em, below: 0.6em)[#it]
]

#align(center)[
  #text(size: 24pt, weight: "bold")[
    Start-DSP Toolbox
  ]
  
  #v(0.5em)
  
  #text(size: 18pt)[
    Content Editor Guide
  ]
  
  #v(0.3em)
  
  #text(size: 11pt, style: "italic")[
    A Step-by-Step Guide for Non-Technical Users
  ]
  
  #v(2em)
  
  #image("assets/logos/logo-color.png", width: 40%)
  
  #v(2em)
]

#pagebreak()

#outline(indent: auto)

#pagebreak()

= Introduction

Welcome to the Start-DSP Toolbox Content Editor Guide! This document will help you edit and translate content on the Start-DSP Toolbox website, even if you have no technical background.

== What You'll Learn

By following this guide, you will be able to:

- Create a GitHub account (required for access)
- Log in to the content management system
- Edit tool translations in your language
- Edit user interface (UI) translations
- Preview and publish your changes

== What You Need

- A computer with internet access
- An email address
- About 30 minutes for initial setup
- No programming or technical knowledge required!

#colorbox(
  title: "Important Note",
  color: "blue",
  radius: 5pt,
  width: auto
)[
  You only need to complete the setup steps (creating a GitHub account and requesting access) *once*. After that, editing content is quick and easy!
]

#pagebreak()

= Getting Started

== Step 1: Create a GitHub Account

GitHub is the platform that stores our website's content. You need a free account to edit content.

=== Visit GitHub

Open your web browser and go to: #link("https://github.com")[https://github.com]

#figure(
  image("screenshots/01-github-homepage.png", width: 100%),
  caption: "GitHub homepage"
)

=== Click "Sign Up"

Click the "Sign up" button in the top-right corner of the page.

=== Enter Your Information

You'll be asked to provide:

- *Email address* - Use your work email (e.g., your university or organization email)
- *Password* - Choose a strong password
- *Username* - Pick a username (this will be visible to others)

#colorbox(
  title: "Username Tip",
  color: "green",
  radius: 5pt,
  width: auto
)[
  Choose a professional username, preferably based on your name (e.g., "john.smith" or "jsmith"). This helps us identify you when granting access.
]

=== Complete the Verification

GitHub will ask you to:
1. Verify you're human (solve a puzzle)
2. Verify your email address (check your inbox for a verification email)

Click the verification link in the email GitHub sends you.

#figure(
  rect(width: 100%, height: 6cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        [Screenshot: Email verification message]
      ]
    ]
  ],
  caption: "GitHub verification email"
)

=== Finish Setup

After verification, GitHub may ask you a few questions about how you'll use GitHub. You can skip these questions or answer them briefly - they won't affect your ability to edit the toolbox.

#pagebreak()

== Step 2: Request Access to the Toolbox

Now that you have a GitHub account, you need permission to edit the Start-DSP Toolbox content.

=== Send an Email Request

Send an email to:

#align(center)[
  #text(size: 12pt, weight: "bold")[
    Jeldo Meppen\
    #link("mailto:meppen@aceeu.org")[meppen\@aceeu.org]
  ]
]

Use this email template:

#rect(
  width: 100%,
  stroke: 1pt + gray,
  inset: 1em,
  radius: 5pt
)[
  *Subject:* Request for Start-DSP Toolbox Editor Access

  Dear Jeldo,

  I would like to request access to edit content on the Start-DSP Toolbox website.

  My GitHub account details:
  - *GitHub Username:* [your username]
  - *Email Address:* [your email]
  - *Language(s) I will edit:* [e.g., German, Spanish]

  Thank you!

  Best regards,\
  [Your name]
]

=== Wait for Access Confirmation

Jeldo will grant you access to the toolbox and send you a confirmation email. This usually takes 1-2 business days.

#colorbox(
  title: "What Happens Next?",
  color: "blue",
  radius: 5pt,
  width: auto
)[
  Once you receive the confirmation email, you're ready to start editing! Continue to the next section.
]

#pagebreak()

= Logging In to the Content Editor

== Step 3: Access the Content Management System

The Start-DSP Toolbox uses a system called "Decap CMS" to make editing easy - no coding required!

=== Open the Editor

Go to the admin page in your web browser:

#align(center)[
  #text(size: 12pt, weight: "bold")[
    #link("https://toolbox.start-dsp.eu/admin")[https://toolbox.start-dsp.eu/admin]
  ]
]

#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        03-decap-cms-login.png
      ]
    ]
  ],
  caption: "Decap CMS login page"
)

=== Click "Login with GitHub"

You'll see a button that says "Login with GitHub" or "Authenticate with GitHub". Click it.

=== Authorize the Application

GitHub will ask you to authorize "Decap CMS" to access the Start-DSP Toolbox repository.

Click *"Authorize"* or *"Continue"*.

#figure(
  rect(width: 100%, height: 8cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        04-github-authorization.png
      ]
    ]
  ],
  caption: "GitHub authorization screen"
)

=== You're In!

After authorization, you'll see the Decap CMS dashboard. This is your editing home base!

#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        05-decap-cms-dashboard.png
      ]
    ]
  ],
  caption: "Decap CMS dashboard - your editing workspace"
)

#colorbox(
  title: "Bookmark This Page!",
  color: "green",
  radius: 5pt,
  width: auto
)[
  Save #link("https://toolbox.start-dsp.eu/admin")[https://toolbox.start-dsp.eu/admin] as a bookmark in your browser. This is the only page you'll need to access for editing.
]

#pagebreak()

= Editing Tool Translations

== Step 4: Find the Tool You Want to Edit

The toolbox contains 24 tools, each available in multiple languages.

=== Navigate to Your Language

On the Decap CMS dashboard, you'll see different collections on the left side:

- *Tools (English)*
- *Tools (Spanish)*
- *Tools (German)*
- *Tools (Greek)*
- *UI Translations*

Click on the language you want to edit (e.g., "Tools (Spanish)" if you're editing Spanish translations).

#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        06-language-collection.png
      ]
    ]
  ],
  caption: "Selecting a language collection"
)

=== Choose a Tool

You'll see a list of all 24 tools. Click on the tool you want to edit.

Each tool shows:
- Tool number (e.g., "01")
- Tool name
- A preview image

#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        07-tools-list.png
      ]
    ]
  ],
  caption: "List of tools in your selected language"
)

#pagebreak()

== Step 5: Edit Tool Content

When you click on a tool, you'll see an editing form with all the tool's information.

=== Understanding the Fields

Each tool has these fields:

#table(
  columns: (auto, 1fr, auto),
  stroke: 0.5pt + gray,
  align: left,
  [*Field*], [*Description*], [*Editable?*],
  [Tool Number], [The tool's number (1-24) - Hidden from editors], [❌ Hidden],
  [Name], [The tool's title], [✅ Yes],
  [Image], [The tool's visual], [✅ Yes],
  [Summary], [A brief one-sentence description], [✅ Yes],
  [Description], [Detailed explanation of the tool], [✅ Yes],
  [Outcomes], [Expected results from using the tool], [✅ Yes],
  [Instructions], [How to use the tool], [✅ Yes],
  [Benefits], [Why this tool is valuable], [✅ Yes],
  [Purpose], [The tool's category], [✅ Yes],
  [Prerequisite Tools], [Tools to complete first], [✅ Yes],
  [Partner], [Responsible organization], [✅ Yes],
  [Downloads], [Files and resources], [✅ Yes],
)

#colorbox(
  title: "Tool Numbers Are Protected",
  color: "green",
  radius: 5pt,
  width: auto
)[
  The "Tool Number" field is hidden and cannot be edited. This ensures tools remain properly linked across all languages.
]

=== Editing Text Fields

To edit any text field:

1. Click inside the text box
2. Make your changes
3. The changes are saved automatically as you type

#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        08-tool-editing-form.png
      ]
    ]
  ],
  caption: "Editing a tool's description"
)

=== Tips for Good Translations

- *Be consistent:* Use the same terminology throughout all tools
- *Keep the length similar:* Try to match the length of the original text
- *Check formatting:* Preserve any bullet points, line breaks, or special formatting
- *Test readability:* Read your translation out loud to check if it sounds natural

#pagebreak()

=== Editing Images

Each tool has an image. To change it:

1. Click on the image field
2. You can either:
   - *Upload a new image:* Click "Upload" and select a file from your computer
   - *Choose an existing image:* Click "Choose existing" to select from uploaded images

#figure(
  rect(width: 100%, height: 8cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        09-image-upload-dialog.png
      ]
    ]
  ],
  caption: "Uploading or selecting a tool image"
)

#colorbox(
  title: "Image Guidelines",
  color: "blue",
  radius: 5pt,
  width: auto
)[
  - *Format:* JPG or PNG
  - *Size:* At least 800×600 pixels
  - *File size:* Under 2 MB
  - *Content:* Professional, relevant to the tool
]

=== Editing Downloads/Files

Each tool can have downloadable files (PDFs, templates, etc.). To manage them:

1. Scroll to the "Downloads" section
2. Each download has:
   - *Title:* The link text users will see
   - *File:* The actual downloadable file

To add a new download:
1. Click "+ Add Downloads"
2. Enter a title
3. Upload the file

To remove a download:
1. Click the ❌ next to the download
2. Confirm deletion

#figure(
  rect(width: 100%, height: 8cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        10-downloads-section.png
      ]
    ]
  ],
  caption: "Managing tool downloads"
)

#pagebreak()

== Step 6: Preview Your Changes

Before publishing, always preview your changes!

=== Save as Draft

Your changes are automatically saved as you work. You don't need to click a "Save" button.

=== Check the Status

Look at the top of the page. You'll see:

- *"Draft"* - Changes not yet published
- *"Ready"* - Ready to publish
- *"Published"* - Live on the website

=== Review Your Work

Scroll through all the fields you edited and double-check:
- Spelling and grammar
- Formatting is preserved
- All required fields are filled
- Downloads work correctly

#colorbox(
  title: "Common Mistakes to Avoid",
  color: "red",
  radius: 5pt,
  width: auto
)[
  ❌ Leaving required fields empty\
  ❌ Uploading files that are too large\
  ❌ Using informal language in professional descriptions\
  ❌ Forgetting to publish after editing\
  ❌ Not previewing changes before publishing
]

#pagebreak()

= Publishing Your Changes

== Step 7: Publish to the Website

When you're happy with your changes, it's time to make them live!

=== Click "Publish"

At the top-right of the editing page, click the *"Publish"* button.

#figure(
  image("screenshots/12-publish-button.png", width: 100%),
  caption: "The Publish button"
)

=== Choose "Publish Now"

A dialog will appear asking when to publish. Select *"Publish now"*.

#figure(
  rect(width: 100%, height: 6cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        12-publish-dialog.png
      ]
    ]
  ],
  caption: "Publish confirmation dialog"
)

=== Wait for Deployment

After clicking "Publish now":

1. Your changes are saved to the repository
2. The website automatically rebuilds (takes 2-5 minutes)
3. Your changes appear on the live website

You'll see a success message: *"Entry published!"*

#colorbox(
  title: "When Will My Changes Appear?",
  color: "blue",
  radius: 5pt,
  width: auto
)[
  Changes typically appear on the live website within *5 minutes* of publishing. If you don't see them after 10 minutes, try refreshing your browser (press Ctrl+F5 or Cmd+Shift+R).
]

=== Verify on the Live Site

After a few minutes, visit the live toolbox:

#align(center)[
  #text(size: 12pt, weight: "bold")[
    #link("https://toolbox.start-dsp.eu")[https://toolbox.start-dsp.eu]
  ]
]

Navigate to the tool you edited and verify your changes appear correctly.

#pagebreak()

= Editing UI Translations

UI translations are the interface text that appears throughout the website (buttons, labels, menus, etc.).

== Step 8: Access UI Translations

=== Open UI Translations Collection

From the Decap CMS dashboard, click on *"UI Translations"* in the left sidebar.

#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        13-ui-translations.png
      ]
    ]
  ],
  caption: "UI Translations collection"
)

=== Select Your Language

You'll see four language options:
- English Translations
- Spanish Translations
- German Translations
- Greek Translations

Click on the language you want to edit.

== Step 9: Edit UI Text

=== Understanding UI Fields

The UI translations include all text visible on the website interface:

*Navigation & Headers:*
- Header Title
- Navigation Toolbox
- Navigation Project Website

*Search & Filters:*
- Search Placeholder
- Filter All Purposes

*Tool Detail Page:*
- Back to Toolbox
- Purpose, Benefits, Description, etc.

*Other Elements:*
- Cookie consent messages
- Footer text
- Language names
- Error messages

#pagebreak()

=== Edit the Text

1. Click on any field to edit it
2. Type your translation
3. Changes save automatically

#figure(
  image("screenshots/14-ui-translations-form.png", width: 100%),
  caption: "Editing UI translations"
)

#colorbox(
  title: "Keep UI Text Concise!",
  color: "blue",
  radius: 5pt,
  width: auto
)[
  UI text appears in buttons, menus, and labels. Keep translations *short and clear* so they fit in the interface. Avoid long sentences.
]

=== Special Characters

Some fields may contain special formatting:

- *Quotes:* Preserve quotation marks exactly as shown
- *Placeholders:* Text like `{name}` should remain unchanged
- *Line breaks:* Preserve paragraph structure

=== Publish UI Changes

When finished:

1. Click *"Publish"* at the top-right
2. Choose *"Publish now"*
3. Wait 2-5 minutes for deployment
4. Check the live website

#pagebreak()

= Troubleshooting

== Common Issues and Solutions

=== "I can't log in"

*Problem:* The login page doesn't work or shows an error.

*Solutions:*
- Make sure you're using the correct URL: #link("https://toolbox.start-dsp.eu/admin")[https://toolbox.start-dsp.eu/admin]
- Verify you've been granted access by Jeldo
- Try logging out of GitHub and back in
- Clear your browser cache and cookies
- Try a different browser (Chrome, Firefox, or Edge)

=== "I don't see the Publish button"

*Problem:* You've made changes but can't find how to publish.

*Solutions:*
- Scroll to the top of the page - the Publish button is in the top-right corner
- Make sure you've made actual changes to the content
- Check if you're in "Preview" mode - switch to "Edit" mode

=== "My changes aren't appearing on the website"

*Problem:* You published changes but don't see them on the live site.

*Solutions:*
- Wait 5-10 minutes - deployment takes time
- Refresh your browser with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Clear your browser cache
- Try viewing the site in a private/incognito browser window
- Check that you actually clicked "Publish now" and not "Save draft"

=== "I accidentally changed the wrong tool"

*Problem:* You edited the wrong tool or language by mistake.

*Solutions:*
- Don't panic! You can revert changes
- Click "Workflow" in the top menu to see pending changes
- Find your change and click "Delete unpublished entry"
- If already published, contact Jeldo Meppen for help

=== "The image upload isn't working"

*Problem:* Images won't upload or show an error.

*Solutions:*
- Check the file size - must be under 2 MB
- Use JPG or PNG format only
- Ensure stable internet connection
- Try a different image or resize the current one

=== "I'm locked out of my GitHub account"

*Problem:* Can't access your GitHub account.

*Solutions:*
- Use GitHub's password reset: #link("https://github.com/password_reset")[https://github.com/password\_reset]
- Check your email for verification messages
- Contact Jeldo if you need to create a new account

#pagebreak()

== Getting Help

If you encounter issues not covered in this guide:

#align(center)[
  #rect(
    width: 80%,
    stroke: 2pt + blue,
    inset: 1.5em,
    radius: 5pt
  )[
    *Contact:*
    
    Jeldo Meppen\
    #link("mailto:meppen@aceeu.org")[meppen\@aceeu.org]
    
    #v(1em)
    
    When requesting help, please include:
    - What you were trying to do
    - What happened instead
    - Screenshots if possible
    - Your GitHub username
  ]
]

#pagebreak()

= Best Practices & Tips

== Translation Quality

=== Consistency is Key

- Use the same translation for recurring terms throughout all tools
- Keep a personal glossary of key terms and their translations
- Check how terms are translated in other tools before choosing new words

=== Maintain Professional Tone

- Use formal, professional language
- Avoid slang or colloquialisms
- Write in a clear, instructive manner
- Think about your target audience: university faculty and staff

=== Preserve Formatting

- If the original text has bullet points, keep them
- Maintain paragraph breaks
- Preserve bold or italic text where used
- Keep lists in the same format

== Workflow Efficiency

=== Work in Batches

Instead of publishing after every small change:

1. Edit multiple tools in one session
2. Review all your changes
3. Publish everything at once

This is more efficient and reduces deployment overhead.

=== Use the Search Function

When editing many tools, use your browser's search function (Ctrl+F or Cmd+F) to quickly find specific text across tools.

=== Regular Breaks

Translation work requires concentration:
- Take breaks every 45-60 minutes
- Review your work with fresh eyes
- Don't rush - quality over speed

== Content Guidelines

=== What to Edit

✅ *Do edit:*
- Translations to your language
- Obvious typos or errors
- Outdated information
- Missing descriptions

❌ *Don't edit:*
- Content in languages you don't speak fluently
- Technical field names or labels
- Purpose categories (these are standardized)

#text(fill: gray, style: "italic")[
  Note: Tool numbers are automatically protected and cannot be edited.
]

=== When to Add New Downloads

Only add new download files if:
- You have permission from the tool's owner
- The file is in the correct language
- The file is in a common format (PDF, DOCX, XLSX)
- You've tested that the file opens correctly

#pagebreak()

= Quick Reference Card

This page is designed to be printed and kept next to your computer!

#rect(
  width: 100%,
  stroke: 2pt + blue,
  inset: 1em,
  radius: 5pt
)[
  = Start-DSP Toolbox - Quick Reference

  == Login
  
  *URL:* #link("https://toolbox.start-dsp.eu/admin")[https://toolbox.start-dsp.eu/admin]\
  *Method:* Click "Login with GitHub"

  == Editing Tools

  + Click your language collection (left sidebar)
  + Select the tool to edit
  + Make your changes
  + Click "Publish" (top-right)
  + Choose "Publish now"
  + Wait 5 minutes for deployment

  == Editing UI Translations

  + Click "UI Translations" (left sidebar)
  + Select your language
  + Edit the text fields
  + Click "Publish" → "Publish now"

  == Important Rules

  ✅ *Always* preview before publishing\
  ✅ *Always* keep text concise for UI elements\
  ✅ *Always* test downloads after uploading\
  ℹ️ Tool numbers are automatically protected

  == Common Fields

  *Required for all tools:*
  - Name, Summary, Description
  - Outcomes, Instructions, Benefits
  - Purpose, Partner
  - At least one Download

  == Help & Support

  *Contact:* Jeldo Meppen\
  *Email:* #link("mailto:meppen@aceeu.org")[meppen\@aceeu.org]

  == URLs to Bookmark

  📝 *Edit content:* #link("https://toolbox.start-dsp.eu/admin")[toolbox.start-dsp.eu/admin]\
  🌐 *View live site:* #link("https://toolbox.start-dsp.eu")[toolbox.start-dsp.eu]
]

#pagebreak()

= Appendix: Field Descriptions

== Detailed Field Reference

This section provides detailed explanations of each field in the tool editing form.

=== Tool Number
- *Type:* Number
- *Editable:* ❌ Hidden
- *Description:* A unique identifier (1-24) for the tool. This field is hidden from editors to prevent accidental changes. The number is automatically maintained across all language versions.
- *Example:* 1, 5, 24
- *Note:* This field will not appear in the editing interface.

=== Name
- *Type:* Text (short)
- *Editable:* ✅ Yes
- *Description:* The tool's title as it appears on the toolbox page and detail page.
- *Guidelines:* Keep concise (under 80 characters). Use title case.
- *Example:* "The Entrepreneurial Wall Pack"

=== Image
- *Type:* Image file
- *Editable:* ✅ Yes
- *Description:* The visual representation of the tool shown on cards and detail pages.
- *Guidelines:* 
  - Format: JPG or PNG
  - Minimum size: 800×600px
  - Maximum file size: 2 MB
  - Professional, relevant imagery

=== Summary
- *Type:* Text (medium)
- *Editable:* ✅ Yes
- *Description:* A brief one-sentence overview shown on the tool card.
- *Guidelines:* 
  - Keep to 1-2 sentences
  - Maximum ~150 characters
  - Focus on what the tool does
  - End with a period
- *Example:* "The Entrepreneurial Wall Pack offers ready-to-print quotes and templates and an AI guide to create tailored content."

=== Description
- *Type:* Text (long)
- *Editable:* ✅ Yes
- *Description:* Detailed explanation of what the tool is and how it works.
- *Guidelines:*
  - 2-4 paragraphs
  - Explain the tool's purpose and components
  - Use clear, professional language
  - Can include bullet points

=== Outcomes
- *Type:* Text (long)
- *Editable:* ✅ Yes
- *Description:* What results or outputs users can expect from using the tool.
- *Guidelines:*
  - Be specific and measurable where possible
  - Focus on concrete deliverables
  - Can be a paragraph or bullet list

=== Instructions
- *Type:* Text (long)
- *Editable:* ✅ Yes
- *Description:* Step-by-step guidance on how to use the tool.
- *Guidelines:*
  - Use numbered or bulleted steps
  - Be clear and sequential
  - Include any prerequisites
  - Mention typical timeframes if relevant

=== Benefits
- *Type:* Text (long)
- *Editable:* ✅ Yes
- *Description:* Why this tool is valuable and what advantages it provides.
- *Guidelines:*
  - Focus on value proposition
  - Can mention target audience benefits
  - Keep positive and motivating

=== Purpose
- *Type:* Dropdown selection
- *Editable:* ✅ Yes
- *Description:* The category this tool belongs to.
- *Options:*
  - Entrepreneurial Awareness & Sensitization
  - Entrepreneurial Vision & Institutional Commitment
  - Staff & Faculty Motivation, Incentives & Recognition
  - Fostering an Entrepreneurial Mindset & Culture
  - Entrepreneurship Education Planning & Financing
  - Sustainable & Impact-Driven Entrepreneurship
  - Continuous Innovation in Entrepreneurship Education

=== Prerequisite Tools
- *Type:* Text (short)
- *Editable:* ✅ Yes
- *Description:* Other tools that should be completed before using this tool.
- *Guidelines:*
  - Leave empty if no prerequisites
  - Reference tools by name
  - Separate multiple tools with commas

=== Partner
- *Type:* Dropdown selection
- *Editable:* ✅ Yes
- *Description:* The organization responsible for this tool.
- *Options:* ACEEU, EUEI, TVW, MMS, UNEAT, MC

=== Downloads
- *Type:* List of files
- *Editable:* ✅ Yes
- *Description:* Downloadable resources (templates, guides, worksheets) for this tool.
- *Each download has:*
  - *Title:* The link text shown to users
  - *File:* The actual file to download
- *Guidelines:*
  - Use descriptive titles
  - Keep file sizes reasonable (under 10 MB)
  - Use common formats (PDF, DOCX, XLSX, PNG, JPG)
  - Test that files open correctly

#pagebreak()

= Appendix: UI Translation Fields

== UI Field Reference

This section explains all the UI translation fields and where they appear on the website.

=== Header
- *header.title* - Main title at the top of every page
  - Example: "Start-DSP Entrepreneurial University Toolbox"
  - Location: Top of page, large heading

=== Navigation
- *nav.toolbox* - Toolbox navigation link
  - Example: "Toolbox"
  - Location: Main navigation menu

- *nav.projectWebsite* - Link back to main project site
  - Example: "Back to Start-DSP Project Website"
  - Location: Main navigation menu

=== Search & Filters
- *search.placeholder* - Search box placeholder text
  - Example: "Search tools by name or description..."
  - Location: Toolbox page, search field

- *filter.allPurposes* - Default filter option
  - Example: "All Purposes"
  - Location: Toolbox page, purpose dropdown

=== Tool Detail Page
- *toolDetail.backToToolbox* - Back button text
  - Example: "Back to Toolbox"
  - Location: Tool detail page, top link

- *toolDetail.purpose* - Purpose section label
  - Example: "Purpose"
  - Location: Tool detail page, section heading

- *toolDetail.benefits* - Benefits section label
  - Example: "Benefits"
  - Location: Tool detail page, section heading

- *toolDetail.prerequisiteTools* - Prerequisites section label
  - Example: "Prerequisite Tools"
  - Location: Tool detail page, section heading

- *toolDetail.description* - Description section label
  - Example: "Description"
  - Location: Tool detail page, section heading

- *toolDetail.instructions* - Instructions section label
  - Example: "Instructions"
  - Location: Tool detail page, section heading

- *toolDetail.outcomes* - Outcomes section label
  - Example: "Outcomes"
  - Location: Tool detail page, section heading

- *toolDetail.responsiblePartner* - Partner label
  - Example: "Responsible Partner:"
  - Location: Tool detail page, partner attribution

=== Badges
- *badge.fallbackLanguage* - Language fallback indicator
  - Example: "Available in English"
  - Location: Tool cards when content not available in current language

- *badge.externalLink* - External link indicator
  - Example: "External - English only"
  - Location: Download links to external resources

=== Translation Disclaimer
- *disclaimer.translationTitle* - Disclaimer heading
  - Example: "Translations in Progress"
  - Location: Top banner on non-English pages

- *disclaimer.translationMessage* - Disclaimer text
  - Example: "We are currently translating the toolbox content. Some tools and materials may still be available in English only."
  - Location: Top banner on non-English pages

=== Cookie Consent
- *cookie.title* - Cookie banner heading
  - Example: "Cookie Consent"
  - Location: Bottom cookie consent banner

- *cookie.message* - Cookie explanation text
  - Example: "We use Google Analytics to understand how visitors use our site..."
  - Location: Bottom cookie consent banner

- *cookie.accept* - Accept button text
  - Example: "Accept"
  - Location: Cookie consent banner, accept button

- *cookie.decline* - Decline button text
  - Example: "Decline"
  - Location: Cookie consent banner, decline button

=== Footer
- *footer.euDisclaimer* - EU funding disclaimer
  - Example: "This project has been funded with support from the European Commission..."
  - Location: Page footer

- *footer.euLogoAlt* - EU logo alt text
  - Example: "Co-funded by the European Union"
  - Location: Footer EU flag image alt text

=== Language Selector
- *language.en* - English language name
  - Example: "English"
  - Location: Language dropdown

- *language.es* - Spanish language name
  - Example: "Español"
  - Location: Language dropdown

- *language.de* - German language name
  - Example: "Deutsch"
  - Location: Language dropdown

- *language.el* - Greek language name
  - Example: "Ελληνικά"
  - Location: Language dropdown

=== 404 Error Page
- *notFound.message* - Error heading
  - Example: "Page not found"
  - Location: 404 error page

- *notFound.description* - Error explanation
  - Example: "The page you're looking for doesn't exist."
  - Location: 404 error page

- *notFound.backToHome* - Return link text
  - Example: "Back to Toolbox"
  - Location: 404 error page, return button

#pagebreak()

#align(center)[
  #v(2em)
  #text(size: 16pt, weight: "bold")[
    Thank You!
  ]
  
  #v(1em)
  
  Thank you for contributing to the Start-DSP Toolbox.\
  Your translations help make entrepreneurship education\
  accessible to universities across Europe.
  
  #v(2em)
  
  #image("../assets/logos/eu-logo-en.png", width: 60%)
  
  #v(1em)
  
  #text(size: 9pt, style: "italic")[
    This project has been funded with support from the European Commission.
  ]
]
