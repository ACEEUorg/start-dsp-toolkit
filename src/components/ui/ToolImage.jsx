import { useState, useEffect } from "react";

export default function ToolImage({ toolNumber, customImage, alt, className }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state when tool number or custom image changes
    setError(false);
    setImageSrc(null);

    // For Vite, we need to use a different approach for image imports
    // First, try to dynamically import the image
    const loadImage = async () => {
      try {
        // If a custom image is provided in the frontmatter, use it
        if (customImage) {
          setImageSrc(customImage);
        } else {
          // Otherwise, fall back to the numbered image
          const imageUrl = `/assets/images/${toolNumber}.jpg`;
          setImageSrc(imageUrl);
        }
      } catch (err) {
        console.error("Error loading image:", err);
        setError(true);
      }
    };

    loadImage();
  }, [toolNumber, customImage]);

  // Handle image load error
  const handleImageError = () => {
    // If using custom image, fall back to numbered images
    if (customImage && imageSrc === customImage) {
      setImageSrc(`/assets/images/${toolNumber}.jpg`);
      return;
    }

    // If the current extension fails, try the next one or use placeholder
    if (imageSrc && imageSrc.endsWith(".jpg")) {
      setImageSrc(`/assets/images/${toolNumber}.jpeg`);
    } else if (imageSrc && imageSrc.endsWith(".jpeg")) {
      setImageSrc(`/assets/images/${toolNumber}.png`);
    } else {
      // All extensions failed, use placeholder
      setError(true);
    }
  };

  // Placeholder image when no image is found
  const placeholderSrc = `https://picsum.photos/seed/tool-${toolNumber}/400/300`;

  return (
    <img
      src={error ? placeholderSrc : imageSrc || placeholderSrc}
      alt={alt}
      className={className || "w-full h-48 object-cover rounded-lg"}
      onError={handleImageError}
    />
  );
}
