
import React from 'react';
import { ChevronLeft, ChevronRight, X, Play, Pause, Shuffle, Volume2, Repeat } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
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
    songs,
    volume,
    setVolume,
    currentTime,
    duration,
    repeatMode,
    setRepeatMode,
    seekTo
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

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    seekTo(newTime);
  };

  const toggleRepeat = () => {
    if (repeatMode === 'off') {
      setRepeatMode('playlist');
    } else if (repeatMode === 'playlist') {
      setRepeatMode('song');
    } else {
      setRepeatMode('off');
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
        <div className="px-6 pb-32 h-full">
          <AnimatedPlaylist />
        </div>

        {/* Bottom Control Container */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900 via-amber-800 to-transparent p-6">
          {/* Progress Bar Container */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-amber-200 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1">
                <Slider
                  value={[duration ? (currentTime / duration) * 100 : 0]}
                  onValueChange={handleProgressChange}
                  max={100}
                  step={0.1}
                  className="w-full cursor-pointer"
                />
              </div>
              <span className="text-xs text-amber-200 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Controls Container */}
          <div className="flex items-center justify-center gap-4">
            {/* Repeat Button */}
            <div className="relative">
              <button
                onClick={toggleRepeat}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg ${
                  repeatMode !== 'off' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-amber-700 hover:bg-amber-600'
                }`}
              >
                <Repeat className="w-5 h-5" />
              </button>
              {repeatMode === 'song' && (
                <div className="absolute -top-2 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">1</span>
                </div>
              )}
            </div>

            {/* Previous Button */}
            <button
              onClick={playPreviousSong}
              className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            {/* Next Button */}
            <button
              onClick={playNextSong}
              className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Shuffle Button */}
            <button
              onClick={shuffleSong}
              className="w-10 h-10 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
            >
              <Shuffle className="w-5 h-5" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 ml-4">
              <Volume2 className="w-5 h-5 text-amber-200" />
              <div className="w-20">
                <Slider
                  value={[volume * 100]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-full [&_[role=slider]]:bg-white [&_[role=slider]]:border-white"
                />
              </div>
            </div>

            {/* Song Counter */}
            <div className="text-center text-amber-100 ml-4">
              <p className="text-sm opacity-80">
                {currentSongIndex + 1} of {songs.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinylCollection;
