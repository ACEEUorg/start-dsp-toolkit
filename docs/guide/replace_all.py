import re

# Read the file
with open('EDITOR_GUIDE.typ', 'r') as f:
    content = f.read()

# Replace all remaining placeholder blocks
content = re.sub(
    r'#figure\(\s*rect\(width: 100%, height: [0-9]+cm, stroke: 1pt \+ gray\)\[\s*#align\(center \+ horizon\)\[\s*#text\(fill: gray, style: "italic"\)\[\s*([0-9]+-[a-z-]+)\.png\s*\]\s*\]\s*\]\s*\],\s*caption: "([^"]+)"\s*\)',
    r'#figure(\n  image("screenshots/\1.png", width: 100%),\n  caption: "\2"\n)',
    content,
    flags=re.MULTILINE | re.DOTALL
)

# Write back
with open('EDITOR_GUIDE.typ', 'w') as f:
    f.write(content)

print("All remaining placeholder blocks replaced!")
