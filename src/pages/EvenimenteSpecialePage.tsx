
import React, { useEffect } from "react";
import EvenimenteSpecialeTimeline from "../components/EvenimenteSpecialeTimeline";
import VintageMusicPlayer from "../components/VintageMusicPlayer";
import VinylCollection from "../components/VinylCollection";
import { useMusic } from "../contexts/MusicContext";

const EvenimenteSpecialePage = () => {
  const { isVinylCollectionOpen, setIsVinylCollectionOpen } = useMusic();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/backgrounds/special_events_background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <EvenimenteSpecialeTimeline />
      
      {/* Music Player */}
      <VintageMusicPlayer onOpen={() => setIsVinylCollectionOpen(true)} />
      <VinylCollection
        isOpen={isVinylCollectionOpen}
        onClose={() => setIsVinylCollectionOpen(false)}
      />
    </div>
  );
};

export default EvenimenteSpecialePage;
