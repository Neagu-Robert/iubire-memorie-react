import React, { useEffect } from "react";
import CircularGallery from "../components/CircularGallery";

const CircularGalleryPage = () => {
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
    </div>
  );
};

export default CircularGalleryPage;
