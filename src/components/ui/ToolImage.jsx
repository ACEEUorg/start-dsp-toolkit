import { useState, useEffect } from 'react';

export default function ToolImage({ toolNumber, alt, className }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Reset state when tool number changes
    setError(false);
    setImageSrc(null);
    
    // For Vite, we need to use a different approach for image imports
    // First, try to dynamically import the image
    const loadImage = async () => {
      try {
        // Try to load the image with different extensions
        const imageUrl = `/assets/images/${toolNumber}.jpg`;
        setImageSrc(imageUrl);
      } catch (err) {
        console.error('Error loading image:', err);
        setError(true);
      }
    };
    
    loadImage();
  }, [toolNumber]);
  
  // Handle image load error
  const handleImageError = () => {
    // If the current extension fails, try the next one or use placeholder
    if (imageSrc && imageSrc.endsWith('.jpg')) {
      setImageSrc(`/assets/images/${toolNumber}.jpeg`);
    } else if (imageSrc && imageSrc.endsWith('.jpeg')) {
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
      src={error ? placeholderSrc : (imageSrc || placeholderSrc)}
      alt={alt}
      className={className || "w-full h-48 object-cover rounded-lg"}
      onError={handleImageError}
    />
  );
}