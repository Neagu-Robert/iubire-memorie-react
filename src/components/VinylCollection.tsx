
import React from 'react';
import { ChevronLeft, ChevronRight, X, Play, Pause, Shuffle } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import AnimatedPlaylist from './AnimatedPlaylist';

interface VinylCollectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const VinylCollection: React.FC<VinylCollectionProps> = ({ isOpen, onClose }) => {
  const { 
    isPlaying, 
    setIsPlaying, 
    playNextSong, 
    playPreviousSong, 
    shuffleSong,
    audioRef,
    currentSongIndex,
    songs
  } = useMusic();

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }
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
          <h2 className="text-3xl font-bold text-amber-100 mb-2">Music Player</h2>
          <p className="text-amber-200">Your romantic soundtrack collection</p>
        </div>

        {/* Animated Playlist */}
        <div className="px-6 pb-20 h-full">
          <AnimatedPlaylist />
        </div>

        {/* Control buttons */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-6">
          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          
          <button
            onClick={shuffleSong}
            className="w-12 h-12 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
          >
            <Shuffle className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-8">
          <button
            onClick={playPreviousSong}
            className="w-12 h-12 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center text-amber-100">
            <p className="text-sm opacity-80">
              {currentSongIndex + 1} of {songs.length}
            </p>
          </div>
          
          <button
            onClick={playNextSong}
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
