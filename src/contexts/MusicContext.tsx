
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
  // Timeline songs
  { 
    id: 1, 
    title: "DNCE - Cake By The Ocean", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/DNCE - Cake By The Ocean (Lyrics).mp3",
    color: "from-red-600 to-red-800" 
  },
  { 
    id: 2, 
    title: "Fall Out Boy - Irresistible", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Fall Out Boy - Irresistible (Audio).mp3",
    color: "from-purple-600 to-purple-800" 
  },
  { 
    id: 3, 
    title: "Green Day - Holiday", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Green Day - Holiday (Official Audio).mp3",
    color: "from-pink-600 to-pink-800" 
  },
  { 
    id: 4, 
    title: "Lidia Buble feat. Amira - Le-am spus si fetelor", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Lidia Buble feat. Amira - Le-am spus si fetelor (Official Video).mp3",
    color: "from-blue-600 to-blue-800" 
  },
  { 
    id: 5, 
    title: "Lindsey Stirling - Carol of the Bells", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Lindsey Stirling - Carol of the Bells (Official Music Video).mp3",
    color: "from-orange-600 to-orange-800" 
  },
  { 
    id: 6, 
    title: "Mariah Carey - All I Want For Christmas Is You", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Mariah Carey - All I Want For Christmas Is You (Lyrics).mp3",
    color: "from-green-600 to-green-800" 
  },
  { 
    id: 7, 
    title: "Maroon 5 - Moves Like Jagger", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Moves Like Jagger - Maroon 5 (Feat. Christina Aguilera) (Lyrics).mp3",
    color: "from-cyan-600 to-cyan-800" 
  },
  { 
    id: 8, 
    title: "Pitbull - Give Me Everything", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Pitbull - Give Me Everything (Lyrics) Ft. Ne-Yo, Afrojack, Nayer.mp3",
    color: "from-indigo-600 to-indigo-800" 
  },
  { 
    id: 9, 
    title: "Pitbull - International Love", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Pitbull - International Love (Lyrics) ft. Chris Brown.mp3",
    color: "from-rose-600 to-rose-800" 
  },
  { 
    id: 10, 
    title: "Sia - Cheap Thrills", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Sia - Cheap Thrills (Lyrics) ft. Sean Paul.mp3",
    color: "from-emerald-600 to-emerald-800" 
  },
  { 
    id: 11, 
    title: "Suzume Theme Song", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Suzume no TojimariSuzumeTheme Song.mp3",
    color: "from-violet-600 to-violet-800" 
  },
  { 
    id: 12, 
    title: "VESCAN feat. Kamelia - Piesa mea preferata", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/VESCAN feat. Kamelia - Piesa mea preferata (Official Single).mp3",
    color: "from-amber-600 to-amber-800" 
  },
  { 
    id: 13, 
    title: "Zara Larsson - Lush Life", 
    artist: "Timeline Collection", 
    src: "/songs/timeline/Zara Larsson - Lush Life.mp3",
    color: "from-teal-600 to-teal-800" 
  },
  
  // Special events songs
  { 
    id: 14, 
    title: "Akcent - Dragoste de inchiriat", 
    artist: "Special Events Collection", 
    src: "/songs/special_events/Akcent - Dragoste de inchiriat (Official Video).mp3",
    color: "from-red-500 to-red-700" 
  },
  { 
    id: 15, 
    title: "Andy Williams - It's the Most Wonderful Time of the Year", 
    artist: "Special Events Collection", 
    src: "/songs/special_events/Andy Williams - It's the Most Wonderful Time of the Year (Official Audio).mp3",
    color: "from-purple-500 to-purple-700" 
  },
  { 
    id: 16, 
    title: "Felix Jaehn - Ain't Nobody", 
    artist: "Special Events Collection", 
    src: "/songs/special_events/Felix Jaehn - Ain't Nobody (Loves Me Better) (Official Video) ft. Jasmine Thompson.mp3",
    color: "from-pink-500 to-pink-700" 
  },
  { 
    id: 17, 
    title: "Fly Project - Toca Toca", 
    artist: "Special Events Collection", 
    src: "/songs/special_events/Fly Project - Toca Toca  Official Music Video.mp3",
    color: "from-blue-500 to-blue-700" 
  },
  { 
    id: 18, 
    title: "Major Lazer & DJ Snake - Lean On", 
    artist: "Special Events Collection", 
    src: "/songs/special_events/Major Lazer & DJ Snake - Lean On (feat. MØ) [Official Lyric Video].mp3",
    color: "from-orange-500 to-orange-700" 
  },
  { 
    id: 19, 
    title: "Rihanna - We Found Love", 
    artist: "Special Events Collection", 
    src: "/songs/special_events/Rihanna - We Found Love (Lyrics) ft. Calvin Harris.mp3",
    color: "from-green-500 to-green-700" 
  },
  
  // Favourite activities songs
  { 
    id: 20, 
    title: "OneRepublic - Counting Stars", 
    artist: "Favourite Activities Collection", 
    src: "/songs/favourite_activities/OneRepublic - Counting Stars (Lyrics).mp3",
    color: "from-cyan-500 to-cyan-700" 
  },
  
  // My favourites songs
  { 
    id: 21, 
    title: "Axwell Λ Ingrosso - More Than You Know", 
    artist: "My Favourites Collection", 
    src: "/songs/my_favourites/Axwell  Ingrosso - More Than You Know.mp3",
    color: "from-indigo-500 to-indigo-700" 
  }
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
