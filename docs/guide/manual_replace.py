# Read the file
with open('EDITOR_GUIDE.typ', 'r') as f:
    content = f.read()

# Replace each placeholder block manually
content = content.replace('''#figure(
  rect(width: 100%, height: 6cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        [Screenshot: Email verification message]
      ]
    ]
  ],
  caption: "GitHub verification email"
)''', '''#figure(
  image("screenshots/02-email-verification.png", width: 100%),
  caption: "GitHub verification email"
)''')

content = content.replace('''#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        03-decap-cms-login.png
      ]
    ]
  ],
  caption: "Decap CMS login page"
)''', '''#figure(
  image("screenshots/03-decap-cms-login.png", width: 100%),
  caption: "Decap CMS login page"
)''')

content = content.replace('''#figure(
  rect(width: 100%, height: 8cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        [Screenshot: GitHub authorization page]
      ]
    ]
  ],
  caption: "GitHub authorization screen"
)''', '''#figure(
  image("screenshots/04-github-authorization.png", width: 100%),
  caption: "GitHub authorization screen"
)''')

content = content.replace('''#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        05-decap-cms-dashboard.png
      ]
    ]
  ],
  caption: "Decap CMS dashboard - your editing workspace"
)''', '''#figure(
  image("screenshots/05-decap-cms-dashboard.png", width: 100%),
  caption: "Decap CMS dashboard - your editing workspace"
)''')

content = content.replace('''#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        06-language-collection.png
      ]
    ]
  ],
  caption: "Selecting a language collection"
)''', '''#figure(
  image("screenshots/06-language-collection.png", width: 100%),
  caption: "Selecting a language collection"
)''')

content = content.replace('''#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        07-tools-list.png
      ]
    ]
  ],
  caption: "List of tools in your selected language"
)''', '''#figure(
  image("screenshots/07-tools-list.png", width: 100%),
  caption: "List of tools in your selected language"
)''')

content = content.replace('''#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        08-tool-editing-form.png
      ]
    ]
  ],
  caption: "Editing a tool's description"
)''', '''#figure(
  image("screenshots/08-tool-editing-form.png", width: 100%),
  caption: "Editing a tool's description"
)''')

content = content.replace('''#figure(
  rect(width: 100%, height: 8cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        09-image-upload-dialog.png
      ]
    ]
  ],
  caption: "Uploading or selecting a tool image"
)''', '''#figure(
  image("screenshots/09-image-upload-dialog.png", width: 100%),
  caption: "Uploading or selecting a tool image"
)''')

content = content.replace('''#figure(
  rect(width: 100%, height: 8cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        10-downloads-section.png
      ]
    ]
  ],
  caption: "Managing tool downloads"
)''', '''#figure(
  image("screenshots/10-downloads-section.png", width: 100%),
  caption: "Managing tool downloads"
)''')

content = content.replace('''#figure(
  rect(width: 100%, height: 6cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        12-publish-dialog.png
      ]
    ]
  ],
  caption: "Publish confirmation dialog"
)''', '''#figure(
  image("screenshots/12-publish-dialog.png", width: 100%),
  caption: "Publish confirmation dialog"
)''')

content = content.replace('''#figure(
  rect(width: 100%, height: 10cm, stroke: 1pt + gray)[
    #align(center + horizon)[
      #text(fill: gray, style: "italic")[
        13-ui-translations.png
      ]
    ]
  ],
  caption: "UI Translations collection"
)''', '''#figure(
  image("screenshots/13-ui-translations.png", width: 100%),
  caption: "UI Translations collection"
)''')

# Write back
with open('EDITOR_GUIDE.typ', 'w') as f:
    f.write(content)

print("All placeholder blocks manually replaced!")
