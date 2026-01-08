import re

# Read the file
with open('EDITOR_GUIDE.typ', 'r') as f:
    content = f.read()

# Define the replacements
replacements = {
    r'rect\(width: 100%, height: 6cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*02-email-verification\.png\s*\]\s*\]\s*\]\s*\]': 'image("screenshots/02-email-verification.png", width: 100%)',
    r'rect\(width: 100%, height: 10cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*03-decap-cms-login\.png\s*\]\s*\]\s*\]\s*\]': 'image("screenshots/03-decap-cms-login.png", width: 100%)',
    r'rect\(width: 100%, height: 10cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*05-decap-cms-dashboard\.png\s*\]\s*\]\s*\]\s*\]': 'image("screenshots/05-decap-cms-dashboard.png", width: 100%)',
    r'rect\(width: 100%, height: 10cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*06-language-collection\.png\s*\]\s*\]\s*\]\s*\]': 'image("screenshots/06-language-collection.png", width: 100%)',
    r'rect\(width: 100%, height: 10cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*07-tools-list\.png\s*\]\s*\]\s*\]\s*\]': 'image("screenshots/07-tools-list.png", width: 100%)',
    r'rect\(width: 100%, height: 10cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*08-tool-editing-form\.png\s*\]\s*\]\s*\]\s*\]': 'image("screenshots/08-tool-editing-form.png", width: 100%)',
    r'rect\(width: 100%, height: 8cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*09-image-upload-dialog\.png\s*\]\s*\]\s*\]\s*\]': 'image("screenshots/09-image-upload-dialog.png", width: 100%)',
    r'rect\(width: 100%, height: 8cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*10-downloads-section\.png\s*\]\s*\]\s*\]\s*\]': 'image("screenshots/10-downloads-section.png", width: 100%)',
    r'rect\(width: 100%, height: 6cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*12-publish-dialog\.png\s*\]\s*\]\s*\]\s*\]': 'image("screenshots/12-publish-dialog.png", width: 100%)',
    r'rect\(width: 100%, height: 10cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*13-ui-translations\.png\s*\]\s*\]\s*\]\s*\]': 'image("screenshots/13-ui-translations.png", width: 100%)'
}

# Apply replacements
for pattern, replacement in replacements.items():
    content = re.sub(pattern, replacement, content, flags=re.MULTILINE | re.DOTALL)

# Write back
with open('EDITOR_GUIDE.typ', 'w') as f:
    f.write(content)

print("All placeholder blocks replaced!")
