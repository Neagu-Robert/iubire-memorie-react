
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';
import { Button } from './ui/button';

interface Event {
  title: string;
  description: string;
  imageCount: number;
  startIndex: number;
}

const events: Event[] = [
  {
    title: "Ieșiri romantice în oraș",
    description: "Momentele noastre frumoase prin orașul drag",
    imageCount: 16,
    startIndex: 0
  },
  {
    title: "Plimbări relaxante",
    description: "Pași liniștiți prin parcuri și străzi",
    imageCount: 22,
    startIndex: 16
  },
  {
    title: "Activități sportive",
    description: "Mișcare și energie împreună",
    imageCount: 4,
    startIndex: 38
  },
  {
    title: "Datul pe leagăn",
    description: "Momente de bucurie și nostalgie",
    imageCount: 15,
    startIndex: 42
  },
  {
    title: "Cititul",
    description: "Cărți și povești împărtășite",
    imageCount: 2,
    startIndex: 57
  },
  {
    title: "Sesiuni de gătit",
    description: "Creativitate culinară în bucătărie",
    imageCount: 7,
    startIndex: 59
  },
  {
    title: "Jocurile",
    description: "Distracție și râsete",
    imageCount: 4,
    startIndex: 66
  },
  {
    title: "Petrecut timp cu cei dragi",
    description: "Familie și prieteni alături",
    imageCount: 10,
    startIndex: 70
  },
  {
    title: "Preferatul meu: petrecut timp cu tine oricând, oriunde am fi",
    description: "Cele mai prețioase momente împreună",
    imageCount: 3,
    startIndex: 80
  }
];

const CircularGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentEvent, setCurrentEvent] = useState(events[0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate placeholder images array (83 total)
  const images = Array.from({ length: 83 }, (_, i) => ({
    id: i + 1,
    src: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=400&h=400&fit=crop`,
    alt: `Image ${i + 1}`
  }));

  // Calculate which event we're currently in
  useEffect(() => {
    const current = events.find(event => 
      currentImageIndex >= event.startIndex && 
      currentImageIndex < event.startIndex + event.imageCount
    );
    if (current && current !== currentEvent) {
      setCurrentEvent(current);
    }
  }, [currentImageIndex, currentEvent]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, images.length]);

  const goToNext = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  // Calculate positions for circular arrangement
  const getImageStyle = (index: number) => {
    const totalImages = 12; // Number of visible images in circle
    const radius = 280;
    const centerX = 300;
    const centerY = 300;
    
    // Calculate relative position from current image
    let relativeIndex = index - currentImageIndex;
    if (relativeIndex < -Math.floor(totalImages / 2)) {
      relativeIndex += images.length;
    } else if (relativeIndex > Math.floor(totalImages / 2)) {
      relativeIndex -= images.length;
    }
    
    // Only show images within the visible range
    if (Math.abs(relativeIndex) > Math.floor(totalImages / 2)) {
      return { display: 'none' };
    }
    
    const angle = (relativeIndex * (360 / totalImages)) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(angle - Math.PI / 2);
    
    const scale = relativeIndex === 0 ? 1.3 : 0.8;
    const zIndex = relativeIndex === 0 ? 10 : 1;
    const opacity = Math.abs(relativeIndex) > 4 ? 0.3 : 1;
    
    return {
      position: 'absolute' as const,
      left: `${x - 60}px`,
      top: `${y - 60}px`,
      transform: `scale(${scale})`,
      zIndex,
      opacity,
      transition: 'all 0.5s ease-in-out'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Galeria Noastră Circulară</h1>
          <div className="transition-all duration-500 ease-in-out">
            <h2 className="text-2xl font-semibold text-purple-600 mb-2">{currentEvent.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{currentEvent.description}</p>
          </div>
        </div>

        {/* Circular Gallery Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative w-[600px] h-[600px] mx-auto">
            {images.map((image, index) => {
              const style = getImageStyle(index);
              if (style.display === 'none') return null;
              
              return (
                <div
                  key={image.id}
                  className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white cursor-pointer hover:border-purple-300"
                  style={style}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button
            onClick={goToPrevious}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={toggleAutoPlay}
            variant="outline"
            className="px-6"
          >
            {isAutoPlay ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play
              </>
            )}
          </Button>
          
          <Button
            onClick={goToNext}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-500 mb-2">
            Imagine {currentImageIndex + 1} din {images.length}
          </div>
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentImageIndex + 1) / images.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Event Navigation */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {events.map((event, index) => (
            <Button
              key={index}
              onClick={() => setCurrentImageIndex(event.startIndex)}
              variant={event === currentEvent ? "default" : "outline"}
              size="sm"
              className="text-xs"
            >
              {event.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircularGallery;
