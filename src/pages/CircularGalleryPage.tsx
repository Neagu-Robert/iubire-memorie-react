import React, { useEffect } from "react";
import CircularGallery from "../components/CircularGallery";
import VintageMusicPlayer from "../components/VintageMusicPlayer";
import VinylCollection from "../components/VinylCollection";
import { useMusic } from "../contexts/MusicContext";

const CircularGalleryPage = () => {
  const { isVinylCollectionOpen, setIsVinylCollectionOpen } = useMusic();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/backgrounds/activities_background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <CircularGallery />
      {/* Music Player */}
      <VintageMusicPlayer onOpen={() => setIsVinylCollectionOpen(true)} />
      <VinylCollection
        isOpen={isVinylCollectionOpen}
        onClose={() => setIsVinylCollectionOpen(false)}
      />
    </div>
  );
};

export default CircularGalleryPage;
