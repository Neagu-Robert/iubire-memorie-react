import React, { useState, useEffect, useRef } from "react";
import { X, Play, Pause, RotateCcw } from "lucide-react";
import { useMusic } from "../contexts/MusicContext";

interface Photo {
  id: number;
  src: string;
  alt: string;
}

interface AnimatedCollageProps {
  photos: Photo[];
  title: string;
  musicSrc?: string;
  onClose: () => void;
}

const AnimatedCollage: React.FC<AnimatedCollageProps> = ({
  photos,
  title,
  musicSrc,
  onClose,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Use global music context
  const globalMusic = useMusic();

  // Sync collage audio volume with global volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = globalMusic.volume;
    }
  }, [globalMusic.volume]);

  useEffect(() => {
    // Auto-start music when component loads (only if musicSrc exists)
    if (audioRef.current && musicSrc) {
      // Pause global music when collage starts
      globalMusic.pauseMusic();

      // Use global volume instead of hardcoded 0.7
      audioRef.current.volume = globalMusic.volume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(console.error);
    } else if (musicSrc) {
      // If we have music but audio element isn't ready yet, start playing anyway
      globalMusic.pauseMusic();
      setIsPlaying(true);
    } else {
      // If no music, start the slideshow anyway
      setIsPlaying(true);
    }
  }, [musicSrc, globalMusic]);

  useEffect(() => {
    if (isPlaying && photos.length > 1) {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
          setIsTransitioning(false);
        }, 300);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, photos.length]);

  const togglePlayPause = () => {
    if (audioRef.current && musicSrc) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Pause global music when resuming collage music
        globalMusic.pauseMusic();
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(console.error);
      }
    } else {
      // If no music, just toggle the slideshow
      setIsPlaying(!isPlaying);
    }
  };

  const restartCollage = () => {
    setCurrentPhotoIndex(0);
    if (audioRef.current && musicSrc) {
      globalMusic.pauseMusic();
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(console.error);
    } else {
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent text-white p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{title}</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Photo Display */}
        <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
          {photos.length > 0 && (
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <img
                src={photos[currentPhotoIndex].src}
                alt={photos[currentPhotoIndex].alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className="w-full h-full bg-gray-200 flex items-center justify-center hidden">
                <span className="text-gray-500 text-lg">
                  {photos[currentPhotoIndex].alt}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={restartCollage}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
            <div className="text-sm opacity-75">
              {currentPhotoIndex + 1} / {photos.length}
            </div>
          </div>
        </div>

        {/* Hidden Audio Element - only render if musicSrc exists */}
        {musicSrc && (
          <audio ref={audioRef} src={musicSrc} loop preload="auto" />
        )}
      </div>
    </div>
  );
};

export default AnimatedCollage;
