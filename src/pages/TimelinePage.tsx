
import React, { useEffect, useState } from "react";
import Timeline from "../components/Timeline";
import VintageMusicPlayer from "../components/VintageMusicPlayer";
import VinylCollection from "../components/VinylCollection";
import { useMusic } from "../contexts/MusicContext";

const TimelinePage = () => {
  const { isVinylCollectionOpen, setIsVinylCollectionOpen } = useMusic();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/backgrounds/timeline_background.jpeg')",
        backgroundSize: "110% auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Timeline />
      
      {/* Music Player */}
      <VintageMusicPlayer onOpen={() => setIsVinylCollectionOpen(true)} />
      <VinylCollection
        isOpen={isVinylCollectionOpen}
        onClose={() => setIsVinylCollectionOpen(false)}
      />
    </div>
  );
};

export default TimelinePage;
