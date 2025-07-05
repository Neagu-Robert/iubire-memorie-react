
import React from 'react';
import { Play, Pause, Music, Volume2 } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';

const AnimatedPlaylist: React.FC = () => {
  const { 
    songs, 
    currentSongIndex, 
    isPlaying, 
    setCurrentSongIndex, 
    setIsPlaying,
    audioRef 
  } = useMusic();

  const togglePlayPause = () => {
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

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
    if (isPlaying) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Current Playing Song Header */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 p-6 rounded-t-2xl border-b border-amber-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${songs[currentSongIndex]?.color} rounded-full flex items-center justify-center shadow-lg ${isPlaying ? 'animate-pulse' : ''}`}>
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-100">{songs[currentSongIndex]?.title}</h3>
              <p className="text-amber-200">{songs[currentSongIndex]?.artist}</p>
            </div>
          </div>
          <button
            onClick={togglePlayPause}
            className="w-14 h-14 bg-amber-700 hover:bg-amber-600 rounded-full flex items-center justify-center text-white transition-colors duration-200 shadow-lg"
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900">
        <div className="p-4">
          <h4 className="text-lg font-semibold text-amber-100 mb-4 flex items-center">
            <Volume2 className="w-5 h-5 mr-2" />
            Playlist
          </h4>
          <div className="space-y-2">
            {songs.map((song, index) => (
              <div
                key={song.id}
                onClick={() => selectSong(index)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  index === currentSongIndex
                    ? 'bg-amber-700 border-2 border-amber-500 shadow-lg transform scale-105'
                    : 'bg-amber-800/50 hover:bg-amber-700/70 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${song.color} rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === currentSongIndex && isPlaying ? 'animate-spin' : ''
                  }`}>
                    <Music className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${
                      index === currentSongIndex ? 'text-amber-100' : 'text-amber-200'
                    }`}>
                      {song.title}
                    </p>
                    <p className={`text-sm truncate ${
                      index === currentSongIndex ? 'text-amber-200' : 'text-amber-300'
                    }`}>
                      {song.artist}
                    </p>
                  </div>
                  {index === currentSongIndex && (
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-4 bg-amber-300 rounded animate-pulse"></div>
                      <div className="w-1 h-6 bg-amber-300 rounded animate-pulse delay-75"></div>
                      <div className="w-1 h-5 bg-amber-300 rounded animate-pulse delay-150"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedPlaylist;
