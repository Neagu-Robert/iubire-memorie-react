import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const Hero = ({ onScrollDown }: { onScrollDown?: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url('/backgrounds/Title_background.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
        <div
          className={`transition-all duration-2000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight flex flex-col md:flex-row items-center justify-center gap-4">
            <span>
              <span className="block mb-2">La mulți ani,</span>
              <span className="block bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
                Alexa! 💖
              </span>
            </span>
            {/* Kiss Cat Animation */}
            <video
              src="/animations/kiss_cat.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain ml-0 md:ml-4 drop-shadow-xl"
              style={{ maxWidth: "160px" }}
            />
          </h1>
          <div
            className={`transition-all duration-2000 delay-500 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed text-red-100">
              Am pregătit ceva special pentru tine!
            </p>
          </div>
        </div>
        {/* Downward Arrow for transition */}
        <button
          className="absolute left-1/2 bottom-8 transform -translate-x-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors duration-200"
          onClick={onScrollDown}
          aria-label="Scroll to folders"
        >
          <ChevronDown className="w-10 h-10 text-red-700 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
