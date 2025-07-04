import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

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
    startIndex: 0,
  },
  {
    title: "Plimbări relaxante",
    description: "Pași liniștiți prin parcuri și străzi",
    imageCount: 22,
    startIndex: 16,
  },
  {
    title: "Activități sportive",
    description: "Mișcare și energie împreună",
    imageCount: 4,
    startIndex: 38,
  },
  {
    title: "Datul pe leagăn",
    description: "Momente de bucurie și nostalgie",
    imageCount: 15,
    startIndex: 42,
  },
  {
    title: "Cititul",
    description: "Cărți și povești împărtășite",
    imageCount: 2,
    startIndex: 57,
  },
  {
    title: "Sesiuni de gătit",
    description: "Creativitate culinară în bucătărie",
    imageCount: 7,
    startIndex: 59,
  },
  {
    title: "Jocurile",
    description: "Distracție și râsete",
    imageCount: 4,
    startIndex: 66,
  },
  {
    title: "Petrecut timp cu cei dragi",
    description: "Familie și prieteni alături",
    imageCount: 10,
    startIndex: 70,
  },
  {
    title: "Preferatul meu: petrecut timp cu tine oricând, oriunde am fi",
    description: "Cele mai prețioase momente împreună",
    imageCount: 3,
    startIndex: 80,
  },
];

const CircularGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(events[0]);
  const [isHovering, setIsHovering] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isPeekCatHovered, setIsPeekCatHovered] = useState(false);
  const peekCatRef = useRef<HTMLVideoElement>(null);

  // Generate placeholder images array (83 total)
  const images = Array.from({ length: 83 }, (_, i) => ({
    id: i + 1,
    src: `https://images.unsplash.com/photo-${
      1500000000000 + i * 1000000
    }?w=300&h=400&fit=crop`,
    alt: `Image ${i + 1}`,
  }));

  // Calculate which event we're currently in
  useEffect(() => {
    const current = events.find(
      (event) =>
        currentImageIndex >= event.startIndex &&
        currentImageIndex < event.startIndex + event.imageCount
    );
    if (current && current !== currentEvent) {
      setCurrentEvent(current);
    }
  }, [currentImageIndex, currentEvent]);

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleBackToHome = () => {
    navigate("/", { state: { fromFolder: true } });
  };

  const handleCenterImageClick = () => {
    setIsEnlarged(true);
  };

  const handleEnlargedImageClick = (e: React.MouseEvent) => {
    // Close if clicking outside the image
    if (e.target === e.currentTarget) {
      setIsEnlarged(false);
    }
  };

  // Handle mouse wheel scrolling only when hovering over pictures
  const handleWheel = (e: React.WheelEvent) => {
    if (isHovering) {
      e.preventDefault();
      // Reversed directions: positive deltaY goes previous, negative goes next
      if (e.deltaY > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
  };

  // Calculate positions for horizontal arch arrangement
  const getImageStyle = (index: number) => {
    const visibleImages = 7; // Number of visible images
    const spacing = 180; // Horizontal spacing between images
    const centerX = 0; // Center position

    // Calculate relative position from current image
    let relativeIndex = index - currentImageIndex;
    if (relativeIndex < -Math.floor(visibleImages / 2)) {
      relativeIndex += images.length;
    } else if (relativeIndex > Math.floor(visibleImages / 2)) {
      relativeIndex -= images.length;
    }

    // Only show images within the visible range
    if (Math.abs(relativeIndex) > Math.floor(visibleImages / 2)) {
      return { display: "none" };
    }

    const x = centerX + relativeIndex * spacing;
    // Create slight arch effect with y position
    const y = Math.abs(relativeIndex) * 20;

    const scale =
      relativeIndex === 0
        ? 1.2
        : Math.max(0.7, 1 - Math.abs(relativeIndex) * 0.1);
    const zIndex =
      relativeIndex === 0 ? 10 : Math.max(1, 10 - Math.abs(relativeIndex));
    const opacity = Math.abs(relativeIndex) > 3 ? 0.3 : 1;

    return {
      position: "absolute" as const,
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: `translate(-50%, -50%) scale(${scale})`,
      zIndex,
      opacity,
      transition: "all 0.5s ease-in-out",
    };
  };

  return (
    <div className="min-h-screen py-8 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with X button */}
        <div className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-white mb-4">
              Activități preferate
            </h1>
            <div className="transition-all duration-500 ease-in-out">
              <h2 className="text-2xl font-semibold text-purple-600 mb-2">
                {currentEvent.title}
              </h2>
              <p className="text-gray-100 max-w-2xl mx-auto">
                {currentEvent.description}
              </p>
            </div>
          </div>
          <Button
            onClick={handleBackToHome}
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white border-gray-300"
          >
            <X className="w-5 h-5 text-black" />
          </Button>
        </div>

        {/* Horizontal Gallery Container */}
        <div
          className="relative w-full h-[500px] overflow-hidden cursor-grab active:cursor-grabbing"
          ref={containerRef}
          onWheel={handleWheel}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {images.map((image, index) => {
            const style = getImageStyle(index);
            if (style.display === "none") return null;

            const isCenter = index === currentImageIndex;

            return (
              <div
                key={image.id}
                className={`w-48 h-64 rounded-lg overflow-hidden shadow-lg border-4 border-white ${
                  isCenter
                    ? "cursor-pointer hover:border-purple-300"
                    : "cursor-pointer hover:border-purple-300"
                }`}
                style={style}
                onClick={
                  isCenter
                    ? handleCenterImageClick
                    : () => setCurrentImageIndex(index)
                }
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

        {/* Controls - moved higher */}
        <div className="flex justify-center items-center space-x-4 mt-4">
          <Button
            onClick={goToPrevious}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
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

        {/* Event Navigation - moved higher */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
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

      {/* Peek Cat Animation absolutely at the bottom center of the gallery */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
          zIndex: 50,
        }}
        className="pointer-events-auto"
      >
        <video
          ref={peekCatRef}
          src="/animations/peek_cat.webm"
          className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain cursor-pointer drop-shadow-xl"
          style={{ maxWidth: "160px" }}
          muted
          loop
          playsInline
          onMouseEnter={() => {
            setIsPeekCatHovered(true);
            if (peekCatRef.current) {
              peekCatRef.current.play();
            }
          }}
          onMouseLeave={() => {
            setIsPeekCatHovered(false);
            if (peekCatRef.current) {
              peekCatRef.current.pause();
              peekCatRef.current.currentTime = 0;
            }
          }}
        />
      </div>

      {/* Enlarged Image Modal */}
      {isEnlarged && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={handleEnlargedImageClick}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              onClick={() => setIsEnlarged(false)}
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-white/20 hover:bg-white/40 border-white/30"
            >
              <X className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularGallery;
