import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PhotoStack from "../components/PhotoStack";
import { preferatePersonalePhotos } from "../data/preferatePersonalePhotos";
import VintageMusicPlayer from "../components/VintageMusicPlayer";
import VinylCollection from "../components/VinylCollection";
import { useMusic } from "../contexts/MusicContext";

const PreferatePersonalePage = () => {
  const navigate = useNavigate();
  const { isVinylCollectionOpen, setIsVinylCollectionOpen } = useMusic();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use real photos from preferatePersonalePhotos
  const photos = preferatePersonalePhotos;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/backgrounds/favourites_background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <div className="relative z-10 p-6">
        <button
          onClick={() => navigate("/", { state: { fromFolder: true } })}
          className="flex items-center space-x-2 text-white hover:text-red-200 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Collections</span>
        </button>

        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Câteva din preferatele noastre
          </h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">
            Am ales câteva poze mai speciale care mi-au plăcut mai mult și știu
            că și ție îți vor plăcea. Trage stânga sau dreapta pentru a naviga
            prin imagini.
          </p>
        </div>
      </div>

      {/* Photo Stack */}
      <PhotoStack photos={photos} />
      {/* Music Player */}
      <VintageMusicPlayer onOpen={() => setIsVinylCollectionOpen(true)} />
      <VinylCollection
        isOpen={isVinylCollectionOpen}
        onClose={() => setIsVinylCollectionOpen(false)}
      />
    </div>
  );
};

export default PreferatePersonalePage;
