import React, { useEffect } from "react";
import EvenimenteSpecialeTimeline from "../components/EvenimenteSpecialeTimeline";

const EvenimenteSpecialePage = () => {
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
    </div>
  );
};

export default EvenimenteSpecialePage;
