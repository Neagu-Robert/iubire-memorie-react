
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  color: string;
}

interface MusicContextType {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  isVinylCollectionOpen: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  setCurrentSongIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsVinylCollectionOpen: (open: boolean) => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
  shuffleSong: () => void;
  pauseMusic: () => void;
  resumeMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const songs: Song[] = [
  { 
    id: 1, 
    title: "Romantic Melody", 
    artist: "Love Songs", 
    src: "/songs/timeline/DNCE - Cake By The Ocean (Lyrics).mp3",
    color: "from-red-600 to-red-800" 
  },
  { 
    id: 2, 
    title: "Sweet Dreams", 
    artist: "Tender Moments", 
    src: "/songs/timeline/Fall Out Boy - Irresistible (Audio).mp3",
    color: "from-purple-600 to-purple-800" 
  },
  { 
    id: 3, 
    title: "Heart's Desire", 
    artist: "Passionate Beats", 
    src: "/songs/timeline/Green Day - Holiday (Official Audio).mp3",
    color: "from-pink-600 to-pink-800" 
  },
  { 
    id: 4, 
    title: "Moonlight Dance", 
    artist: "Evening Serenade", 
    src: "/songs/timeline/Lidia Buble feat. Amira - Le-am spus si fetelor (Official Video).mp3",
    color: "from-blue-600 to-blue-800" 
  },
  { 
    id: 5, 
    title: "Golden Hour", 
    artist: "Sunset Vibes", 
    src: "/songs/timeline/Moves Like Jagger - Maroon 5 (Feat. Christina Aguilera) (Lyrics).mp3",
    color: "from-orange-600 to-orange-800" 
  },
];

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVinylCollectionOpen, setIsVinylCollectionOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const shuffleSong = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentSongIndex(randomIndex);
  };

  const pauseMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  // Handle song changes
  useEffect(() => {
    if (audioRef.current && songs[currentSongIndex]) {
      audioRef.current.src = songs[currentSongIndex].src;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentSongIndex, isPlaying]);

  const value = {
    songs,
    currentSongIndex,
    isPlaying,
    isVinylCollectionOpen,
    audioRef,
    setCurrentSongIndex,
    setIsPlaying,
    setIsVinylCollectionOpen,
    playNextSong,
    playPreviousSong,
    shuffleSong,
    pauseMusic,
    resumeMusic,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio ref={audioRef} loop={false} preload="auto" />
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
