import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

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
  volume: number;
  currentTime: number;
  duration: number;
  repeatMode: "off" | "playlist" | "song";
  audioRef: React.RefObject<HTMLAudioElement>;
  setCurrentSongIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsVinylCollectionOpen: (open: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setRepeatMode: (mode: "off" | "playlist" | "song") => void;
  setShouldAutoPlay: (shouldAutoPlay: boolean) => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
  shuffleSong: () => void;
  pauseMusic: () => void;
  resumeMusic: () => void;
  seekTo: (time: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const songs: Song[] = [
  // Timeline songs
  {
    id: 1,
    title: "DNCE - Cake By The Ocean",
    artist: "Timeline Collection",
    src: "/songs/timeline/DNCE - Cake By The Ocean (Lyrics).mp3",
    color: "from-red-600 to-red-800",
  },
  {
    id: 2,
    title: "Fall Out Boy - Irresistible",
    artist: "Timeline Collection",
    src: "/songs/timeline/Fall Out Boy - Irresistible (Audio).mp3",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: 3,
    title: "Green Day - Holiday",
    artist: "Timeline Collection",
    src: "/songs/timeline/Green Day - Holiday (Official Audio).mp3",
    color: "from-pink-600 to-pink-800",
  },
  {
    id: 4,
    title: "Lidia Buble feat. Amira - Le-am spus si fetelor",
    artist: "Timeline Collection",
    src: "/songs/timeline/Lidia Buble feat. Amira - Le-am spus si fetelor (Official Video).mp3",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 5,
    title: "Lindsey Stirling - Carol of the Bells",
    artist: "Timeline Collection",
    src: "/songs/timeline/Lindsey Stirling - Carol of the Bells (Official Music Video).mp3",
    color: "from-orange-600 to-orange-800",
  },
  {
    id: 6,
    title: "Mariah Carey - All I Want For Christmas Is You",
    artist: "Timeline Collection",
    src: "/songs/timeline/Mariah Carey - All I Want For Christmas Is You (Lyrics).mp3",
    color: "from-green-600 to-green-800",
  },
  {
    id: 7,
    title: "Maroon 5 - Moves Like Jagger",
    artist: "Timeline Collection",
    src: "/songs/timeline/Moves Like Jagger - Maroon 5 (Feat. Christina Aguilera) (Lyrics).mp3",
    color: "from-cyan-600 to-cyan-800",
  },
  {
    id: 8,
    title: "Pitbull - Give Me Everything",
    artist: "Timeline Collection",
    src: "/songs/timeline/Pitbull - Give Me Everything (Lyrics) Ft. Ne-Yo, Afrojack, Nayer.mp3",
    color: "from-indigo-600 to-indigo-800",
  },
  {
    id: 9,
    title: "Pitbull - International Love",
    artist: "Timeline Collection",
    src: "/songs/timeline/Pitbull - International Love (Lyrics) ft. Chris Brown.mp3",
    color: "from-rose-600 to-rose-800",
  },
  {
    id: 10,
    title: "Sia - Cheap Thrills",
    artist: "Timeline Collection",
    src: "/songs/timeline/Sia - Cheap Thrills (Lyrics) ft. Sean Paul.mp3",
    color: "from-emerald-600 to-emerald-800",
  },
  {
    id: 11,
    title: "Suzume Theme Song",
    artist: "Timeline Collection",
    src: "/songs/timeline/Suzume no TojimariSuzumeTheme Song.mp3",
    color: "from-violet-600 to-violet-800",
  },
  {
    id: 12,
    title: "VESCAN feat. Kamelia - Piesa mea preferata",
    artist: "Timeline Collection",
    src: "/songs/timeline/VESCAN feat. Kamelia - Piesa mea preferata (Official Single).mp3",
    color: "from-amber-600 to-amber-800",
  },
  {
    id: 13,
    title: "Zara Larsson - Lush Life",
    artist: "Timeline Collection",
    src: "/songs/timeline/Zara Larsson - Lush Life.mp3",
    color: "from-teal-600 to-teal-800",
  },

  // Special events songs
  {
    id: 14,
    title: "Akcent - Dragoste de inchiriat",
    artist: "Special Events Collection",
    src: "/songs/special_events/Akcent - Dragoste de inchiriat (Official Video).mp3",
    color: "from-red-500 to-red-700",
  },
  {
    id: 15,
    title: "Andy Williams - It's the Most Wonderful Time of the Year",
    artist: "Special Events Collection",
    src: "/songs/special_events/Andy Williams - It's the Most Wonderful Time of the Year (Official Audio).mp3",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: 16,
    title: "Felix Jaehn - Ain't Nobody",
    artist: "Special Events Collection",
    src: "/songs/special_events/Felix Jaehn - Ain't Nobody (Loves Me Better) (Official Video) ft. Jasmine Thompson.mp3",
    color: "from-pink-500 to-pink-700",
  },
  {
    id: 17,
    title: "Fly Project - Toca Toca",
    artist: "Special Events Collection",
    src: "/songs/special_events/Fly Project - Toca Toca  Official Music Video.mp3",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: 18,
    title: "Major Lazer & DJ Snake - Lean On",
    artist: "Special Events Collection",
    src: "/songs/special_events/Major Lazer & DJ Snake - Lean On (feat. MØ) [Official Lyric Video].mp3",
    color: "from-orange-500 to-orange-700",
  },
  {
    id: 19,
    title: "Rihanna - We Found Love",
    artist: "Special Events Collection",
    src: "/songs/special_events/Rihanna - We Found Love (Lyrics) ft. Calvin Harris.mp3",
    color: "from-green-500 to-green-700",
  },

  // Favourite activities songs
  {
    id: 20,
    title: "OneRepublic - Counting Stars",
    artist: "Favourite Activities Collection",
    src: "/songs/favourite_activities/OneRepublic - Counting Stars (Lyrics).mp3",
    color: "from-cyan-500 to-cyan-700",
  },

  // My favourites songs
  {
    id: 21,
    title: "Axwell Λ Ingrosso - More Than You Know",
    artist: "My Favourites Collection",
    src: "/songs/my_favourites/Axwell  Ingrosso - More Than You Know.mp3",
    color: "from-indigo-500 to-indigo-700",
  },
];

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Debug effect to track isPlaying changes
  useEffect(() => {
    console.log("isPlaying state changed to:", isPlaying);
  }, [isPlaying]);
  const [isVinylCollectionOpen, setIsVinylCollectionOpen] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatMode, setRepeatMode] = useState<"off" | "playlist" | "song">(
    "off"
  );
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const crossfadeRef = useRef<HTMLAudioElement>(null);
  const isChangingSongRef = useRef(false);

  const playNextSong = () => {
    if (repeatMode === "song") return; // Don't advance if repeating current song
    if (isChangingSongRef.current) {
      console.log("Song change already in progress, skipping");
      return;
    }

    // Check both the state and the actual audio element
    const wasPlaying =
      isPlaying || (audioRef.current && !audioRef.current.paused);
    console.log(
      "playNextSong called, wasPlaying:",
      wasPlaying,
      "audio.paused:",
      audioRef.current?.paused
    );

    isChangingSongRef.current = true;

    if (repeatMode === "playlist") {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    } else {
      const nextIndex = currentSongIndex + 1;
      if (nextIndex < songs.length) {
        setCurrentSongIndex(nextIndex);
      } else {
        setIsPlaying(false); // Stop at end if not repeating
        isChangingSongRef.current = false;
        return;
      }
    }

    // Preserve playing state - use a more reliable approach
    if (wasPlaying) {
      // Set a flag to auto-play when the song changes
      console.log("Setting shouldAutoPlay to true");
      setShouldAutoPlay(true);
    }
  };

  const playPreviousSong = () => {
    if (isChangingSongRef.current) {
      console.log("Song change already in progress, skipping");
      return;
    }

    // Check both the state and the actual audio element
    const wasPlaying =
      isPlaying || (audioRef.current && !audioRef.current.paused);
    console.log(
      "playPreviousSong called, wasPlaying:",
      wasPlaying,
      "audio.paused:",
      audioRef.current?.paused
    );

    isChangingSongRef.current = true;
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);

    // Preserve playing state - use a more reliable approach
    if (wasPlaying) {
      setShouldAutoPlay(true);
    }
  };

  const shuffleSong = () => {
    if (isChangingSongRef.current) {
      console.log("Song change already in progress, skipping");
      return;
    }

    // Check both the state and the actual audio element
    const wasPlaying =
      isPlaying || (audioRef.current && !audioRef.current.paused);
    console.log(
      "shuffleSong called, wasPlaying:",
      wasPlaying,
      "audio.paused:",
      audioRef.current?.paused
    );

    isChangingSongRef.current = true;
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentSongIndex(randomIndex);

    // Preserve playing state - use a more reliable approach
    if (wasPlaying) {
      setShouldAutoPlay(true);
    }
  };

  const pauseMusic = () => {
    console.log("pauseMusic called, isPlaying:", isPlaying);
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log("Music paused");
    }
  };

  const resumeMusic = () => {
    console.log("resumeMusic called, isPlaying:", isPlaying);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      console.log("Music resumed");
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Crossfade transition between songs
  const crossfadeToNextSong = (nextIndex: number) => {
    if (!audioRef.current || !crossfadeRef.current) return;

    const currentAudio = audioRef.current;
    const nextAudio = crossfadeRef.current;

    // Setup next song
    nextAudio.src = songs[nextIndex].src;
    nextAudio.volume = 0;
    nextAudio.currentTime = 0;

    // Start crossfade
    nextAudio.play().catch(console.error);

    const fadeTime = 1000; // 1 second crossfade
    const steps = 20;
    const stepTime = fadeTime / steps;
    let step = 0;

    const crossfadeInterval = setInterval(() => {
      step++;
      const progress = step / steps;

      currentAudio.volume = volume * (1 - progress);
      nextAudio.volume = volume * progress;

      if (step >= steps) {
        clearInterval(crossfadeInterval);
        currentAudio.pause();

        // Swap audio elements
        const tempSrc = currentAudio.src;
        const tempTime = currentAudio.currentTime;

        currentAudio.src = nextAudio.src;
        currentAudio.currentTime = nextAudio.currentTime;
        currentAudio.volume = volume;

        nextAudio.pause();
        nextAudio.volume = 0;
      }
    }, stepTime);
  };

  // Handle song changes with crossfade
  useEffect(() => {
    if (audioRef.current && songs[currentSongIndex]) {
      if (audioRef.current.src !== songs[currentSongIndex].src) {
        console.log(
          "Song changed to:",
          songs[currentSongIndex].title,
          "shouldAutoPlay:",
          shouldAutoPlay
        );

        // Store the current playing state before changing source
        const wasActuallyPlaying = audioRef.current && !audioRef.current.paused;
        console.log("Audio was actually playing:", wasActuallyPlaying);

        // Update the audio source
        audioRef.current.src = songs[currentSongIndex].src;

        // If we should auto-play (from next/previous/shuffle), wait for load then play
        if (shouldAutoPlay) {
          console.log("Attempting to auto-play new song");

          const attemptPlay = () => {
            if (!audioRef.current) return;

            // Add a small delay to ensure the audio element is ready
            setTimeout(() => {
              if (!audioRef.current) return;

              audioRef.current
                .play()
                .then(() => {
                  console.log(
                    "Auto-play successful, setting isPlaying to true"
                  );
                  setIsPlaying(true);
                  setShouldAutoPlay(false); // Reset the flag
                  isChangingSongRef.current = false; // Reset the change flag
                })
                .catch((error) => {
                  console.error("Failed to play audio:", error);
                  setShouldAutoPlay(false); // Reset flag on error
                  isChangingSongRef.current = false; // Reset the change flag
                });
            }, 50); // Small delay to ensure audio element is stable
          };

          const handleCanPlay = () => {
            console.log("Audio can play, starting playback");
            attemptPlay();
            // Remove the event listener after use
            audioRef.current?.removeEventListener("canplay", handleCanPlay);
          };

          const handleLoadedData = () => {
            console.log("Audio loaded data, attempting play");
            attemptPlay();
            // Remove the event listener after use
            audioRef.current?.removeEventListener(
              "loadeddata",
              handleLoadedData
            );
          };

          // Add event listeners for when audio is ready to play
          audioRef.current.addEventListener("canplay", handleCanPlay);
          audioRef.current.addEventListener("loadeddata", handleLoadedData);

          // Also try to play immediately in case it's already loaded
          attemptPlay();
        } else {
          // If not auto-playing, still reset the change flag
          isChangingSongRef.current = false;
        }
      }
    }
  }, [currentSongIndex, shouldAutoPlay]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    const handlePlay = () => {
      console.log("Audio play event fired, audio.paused:", audio.paused);
      if (!audio.paused && !isPlaying) {
        console.log(
          "Audio is playing but isPlaying state is false, updating..."
        );
        setIsPlaying(true);
      }
    };

    const handlePause = () => {
      console.log("Audio pause event fired, audio.paused:", audio.paused);
      if (audio.paused && isPlaying) {
        console.log("Audio is paused but isPlaying state is true, updating...");
        setIsPlaying(false);
      }
    };

    const handleLoadStart = () => {
      console.log("Audio load started - this might pause the current audio");
    };

    const handleCanPlay = () => {
      console.log("Audio can play - this might affect current playback");
    };

    const handleEnded = () => {
      console.log("Audio ended event fired");
      if (repeatMode === "song") {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        // Use the new approach for auto-advancing
        if (repeatMode === "playlist") {
          setCurrentSongIndex((prev) => (prev + 1) % songs.length);
          setShouldAutoPlay(true);
        } else {
          const nextIndex = currentSongIndex + 1;
          if (nextIndex < songs.length) {
            setCurrentSongIndex(nextIndex);
            setShouldAutoPlay(true);
          } else {
            setIsPlaying(false); // Stop at end if not repeating
          }
        }
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeatMode, currentSongIndex, isPlaying]);

  const value = {
    songs,
    currentSongIndex,
    isPlaying,
    isVinylCollectionOpen,
    volume,
    currentTime,
    duration,
    repeatMode,
    audioRef,
    setCurrentSongIndex,
    setIsPlaying,
    setIsVinylCollectionOpen,
    setVolume,
    setCurrentTime,
    setRepeatMode,
    setShouldAutoPlay,
    playNextSong,
    playPreviousSong,
    shuffleSong,
    pauseMusic,
    resumeMusic,
    seekTo,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="auto"
        onLoadStart={() => console.log("Audio load started")}
        onCanPlay={() => console.log("Audio can play event")}
        onPlay={() => console.log("Audio play event from element")}
        onPause={() => console.log("Audio pause event from element")}
      />
      <audio ref={crossfadeRef} preload="auto" />
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
