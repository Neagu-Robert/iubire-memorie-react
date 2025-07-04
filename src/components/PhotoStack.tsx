import React, { useState, useRef, useCallback } from "react";

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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      e.preventDefault();
      const deltaX = e.clientX - dragStart.x;
      setDragOffset({ x: deltaX, y: 0 });
    },
    [isDragging, dragStart.x]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    const threshold = 80; // Reduced threshold for better responsiveness

    if (dragOffset.x > threshold) {
      // Dragged right - go to previous photo
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    } else if (dragOffset.x < -threshold) {
      // Dragged left - go to next photo
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }

    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  }, [isDragging, dragOffset.x, photos.length]);

  const getVisiblePhotos = () => {
    const visible = [];
    for (let i = 0; i < Math.min(5, photos.length); i++) {
      const index = (currentIndex + i) % photos.length;
      visible.push({
        photo: photos[index],
        zIndex: photos.length - i,
        offset: i,
        rotation: i * 2 - 4, // Slight rotation for stack effect
        scale: 1 - i * 0.05, // Slight scale reduction for depth
      });
    }
    return visible;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div
        ref={containerRef}
        className="relative w-[28rem] h-[36rem] cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {getVisiblePhotos().map(
          ({ photo, zIndex, offset, rotation, scale }) => (
            <div
              key={`${photo.id}-${currentIndex}-${offset}`}
              className={`absolute inset-0 ${
                isDragging && offset === 0
                  ? ""
                  : "transition-transform duration-200 ease-out"
              }`}
              style={{
                zIndex,
                transform: `
                translateX(${offset === 0 ? dragOffset.x : offset * 8}px) 
                translateY(${offset * 12}px) 
                rotate(${rotation}deg) 
                scale(${scale})
              `,
                opacity: offset > 3 ? 0 : 1 - offset * 0.2,
              }}
            >
              <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden border-8 border-white">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">{photo.alt}</span>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/80 text-sm mb-2">
          Drag left or right to navigate
        </p>
        <div className="text-white/90 text-base font-semibold">
          {photos.length > 0
            ? `${currentIndex + 1} out of ${photos.length}`
            : ""}
        </div>
      </div>
    </div>
  );
};

export default PhotoStack;
