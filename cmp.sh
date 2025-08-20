#!/bin/bash

# Find images larger than 5MB and compress them
find ./public/assets/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -size +5M -print0 | 
while IFS= read -r -d '' file; do
  echo "Processing $file ($(du -h "$file" | cut -f1))"
  
  # Create backup
  cp "$file" "${file}.backup"
  
  # Compress and resize
  convert "$file" -resize 1920x1080\> -quality 85 "$file"
  
  echo "Compressed to $(du -h "$file" | cut -f1)"
  echo "-----------------------------------"
done