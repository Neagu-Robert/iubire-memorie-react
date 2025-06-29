
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Disc } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  color: string;
}

interface VinylCollectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const VinylCollection: React.FC<VinylCollectionProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample songs data - will be replaced with actual songs later
  const songs: Song[] = [
    { id: 1, title: "Romantic Melody", artist: "Love Songs", color: "from-red-600 to-red-800" },
    { id: 2, title: "Sweet Dreams", artist: "Tender Moments", color: "from-purple-600 to-purple-800" },
    { id: 3, title: "Heart's Desire", artist: "Passionate Beats", color: "from-pink-600 to-pink-800" },
    { id: 4, title: "Moonlight Dance", artist: "Evening Serenade", color: "from-blue-600 to-blue-800" },
    { id: 5, title: "Golden Hour", artist: "Sunset Vibes", color: "from-orange-600 to-orange-800" },
  ];

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const getVisibleVinyls = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + songs.length) % songs.length;
      visible.push({
        song: songs[index],
        offset: i,
        zIndex: 10 - Math.abs(i)
      });
    }
    return visible;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-full max-h-[80vh] bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 rounded-2xl overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="relative z-10 p-6 text-center">
          <h2 className="text-3xl font-bold text-amber-100 mb-2">Vinyl Collection</h2>
          <p className="text-amber-200">Choose your romantic soundtrack</p>
        </div>

        {/* Vinyl stack display */}
        <div className="relative flex-1 flex items-center justify-center px-8 pb-8">
          <div className="relative w-80 h-80">
            {getVisibleVinyls().map(({ song, offset, zIndex }) => (
              <div
                key={song.id}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${offset * 20}px) translateY(${Math.abs(offset) * 10}px) scale(${1 - Math.abs(offset) * 0.1})`,
                  zIndex,
                  opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3
                }}
              >
                {/* Vinyl record */}
                <div className={`w-full h-full bg-gradient-to-br ${song.color} rounded-full shadow-2xl border-4 border-black/20`}>
                  <div className="absolute inset-4 bg-black rounded-full">
                    <div className="absolute inset-2 border-2 border-gray-600 rounded-full">
                      <div className="absolute inset-4 border border-gray-500 rounded-full">
                        <div className="absolute inset-6 bg-red-900 rounded-full flex items-center justify-center">
                          <Disc className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Song info */}
                  {offset === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-lg font-bold mb-1">{song.title}</h3>
                        <p className="text-sm opacity-80">{song.artist}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-8">
          <button
            onClick={prevSong}
            className="w-12 h-12 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center text-amber-100">
            <p className="text-sm opacity-80">
              {currentIndex + 1} of {songs.length}
            </p>
          </div>
          
          <button
            onClick={nextSong}
            className="w-12 h-12 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VinylCollection;
