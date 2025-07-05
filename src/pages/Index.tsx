import React, { useEffect, useState, useRef } from "react";
import Hero from "../components/Hero";
import FolderCard from "../components/FolderCard";
import InteractiveCat from "../components/InteractiveCat";
import VintageMusicPlayer from "../components/VintageMusicPlayer";
import VinylCollection from "../components/VinylCollection";
import { useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import "../index.css";
import { useMusic } from "../contexts/MusicContext";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFolders, setShowFolders] = useState(false);
  const [heroAnim, setHeroAnim] = useState("");
  const [foldersAnim, setFoldersAnim] = useState("");
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use music context
  const { isVinylCollectionOpen, setIsVinylCollectionOpen } = useMusic();

  useEffect(() => {
    setIsLoaded(true);
    if (location.state?.fromFolder) {
      setShowFolders(true);
      setFoldersAnim("swing-in-bottom-bck");
      setTimeout(() => setFoldersAnim(""), 600);
      // Clear the state so it doesn't persist on reload/back
      window.history.replaceState({}, document.title);
    } else {
      setShowFolders(false);
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Placeholder data for the 4 folders - you can update these with real titles and descriptions
  const folderData = [
    {
      id: 1,
      title: "Primele noastre",
      description: "Colecția cu toate momentele noastre speciale",
      color: "from-purple-400 to-pink-500",
      route: "/timeline",
      position: "left" as const,
    },
    {
      id: 2,
      title: "Evenimente speciale",
      description: "Sărbători și momente de neuitat din viața noastră",
      color: "from-blue-400 to-cyan-500",
      route: "/evenimente-speciale",
      position: "center-left" as const,
    },
    {
      id: 3,
      title: "Galeria Circulară",
      description: "83 de momente organizate în 9 evenimente speciale",
      color: "from-green-400 to-emerald-500",
      route: "/circular-gallery",
      position: "center-right" as const,
    },
    {
      id: 4,
      title: "Preferate personale",
      description: "Colecția cu fotografiile noastre preferate",
      color: "from-orange-400 to-red-500",
      route: "/preferate-personale",
      position: "right" as const,
    },
  ];

  // Swing transition logic
  const handleScrollDown = () => {
    setHeroAnim("swing-out-top-fwd");
    setTimeout(() => {
      setShowFolders(true);
      setHeroAnim("");
      setFoldersAnim("swing-in-bottom-bck");
      setTimeout(() => setFoldersAnim(""), 600);
    }, 550);
  };
  const handleScrollUp = () => {
    setFoldersAnim("swing-out-bottom-bck");
    setTimeout(() => {
      setShowFolders(false);
      setFoldersAnim("");
      setHeroAnim("swing-in-top-fwd");
      setTimeout(() => setHeroAnim(""), 600);
    }, 550);
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } bg-gradient-to-br from-[#8b0000] via-[#660000] via-[#4a0000] to-[#330000] overflow-hidden`}
      style={{ backgroundAttachment: "fixed" }}
    >
      {/* Hero section with swing animation */}
      <div
        className={`relative w-full h-screen ${
          !showFolders ? heroAnim : "hidden"
        }`}
        style={{
          position: !showFolders ? "relative" : "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Hero onScrollDown={handleScrollDown} />
      </div>
      {/* Folders section with swing animation */}
      {showFolders && (
        <div
          className={`relative w-full h-screen ${foldersAnim}`}
          style={{
            position: showFolders ? "relative" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          <section
            id="folders-section"
            className="min-h-screen py-20 flex flex-col items-center justify-center relative"
            style={{
              backgroundImage: "url('/backgrounds/main_background.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Upward Arrow for transition */}
            <button
              className="absolute left-1/2 top-8 transform -translate-x-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors duration-200"
              onClick={handleScrollUp}
              aria-label="Scroll to hero"
            >
              <ChevronUp className="w-10 h-10 text-red-700 animate-bounce" />
            </button>
            <div className="max-w-6xl mx-auto px-4 text-center">
              {/* Folders arranged in an arch */}
              <div className="flex justify-center items-end space-x-8 mb-12">
                {folderData.map((folder) => (
                  <FolderCard
                    key={folder.id}
                    title={folder.title}
                    description={folder.description}
                    color={folder.color}
                    route={folder.route}
                    position={folder.position}
                  />
                ))}
              </div>

              {/* Interactive cat below the folders */}
              <InteractiveCat />

              <div className="text-center">
                <p className="text-lg text-red-100 max-w-2xl mx-auto">
                  Alege una dintre colecții pentru a descoperi amintirile
                  noastre speciale
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* Vintage Music Player */}
      <VintageMusicPlayer onOpen={() => setIsVinylCollectionOpen(true)} />
      {/* Vinyl Collection Overlay */}
      <VinylCollection
        isOpen={isVinylCollectionOpen}
        onClose={() => setIsVinylCollectionOpen(false)}
      />
    </div>
  );
};

export default Index;
