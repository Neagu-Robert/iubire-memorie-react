
import React, { useState, useRef } from 'react';

interface Photo {
  id: number;
  src: string;
  alt: string;
}

interface PhotoStackProps {
  photos: Photo[];
}

const PhotoStack: React.FC<PhotoStackProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    setDragOffset({ x: deltaX, y: 0 });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const threshold = 100; // Minimum drag distance to trigger navigation
    
    if (dragOffset.x > threshold) {
      // Dragged right - go to previous photo
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    } else if (dragOffset.x < -threshold) {
      // Dragged left - go to next photo
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const getVisiblePhotos = () => {
    const visible = [];
    for (let i = 0; i < Math.min(5, photos.length); i++) {
      const index = (currentIndex + i) % photos.length;
      visible.push({
        photo: photos[index],
        zIndex: photos.length - i,
        offset: i,
        rotation: i * 2 - 4, // Slight rotation for stack effect
        scale: 1 - i * 0.05 // Slight scale reduction for depth
      });
    }
    return visible;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div
        ref={containerRef}
        className="relative w-80 h-96 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {getVisiblePhotos().map(({ photo, zIndex, offset, rotation, scale }) => (
          <div
            key={`${photo.id}-${currentIndex}-${offset}`}
            className="absolute inset-0 transition-all duration-300 ease-out"
            style={{
              zIndex,
              transform: `
                translateX(${offset === 0 ? dragOffset.x : offset * 8}px) 
                translateY(${offset * 12}px) 
                rotate(${rotation}deg) 
                scale(${scale})
              `,
              opacity: offset > 3 ? 0 : 1 - offset * 0.2
            }}
          >
            <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden border-8 border-white">
              <img
                src={`https://images.unsplash.com/${photo.src}`}
                alt={photo.alt}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-white/80 text-sm mb-2">
          Drag left or right to navigate
        </p>
        <div className="flex space-x-2">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoStack;
