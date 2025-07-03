import React, { useEffect } from "react";
import Timeline from "../components/Timeline";

const TimelinePage = () => {
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
    </div>
  );
};

export default TimelinePage;
