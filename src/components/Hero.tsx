
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTimeline = () => {
    const timelineElement = document.getElementById('timeline');
    if (timelineElement) {
      timelineElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-400 via-purple-500 to-violet-600">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
        <div className={`transition-all duration-2000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
            <span className="block mb-2">La mulți ani,</span>
            <span className="block bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
              iubito! 💖
            </span>
          </h1>
          
          <div className={`transition-all duration-2000 delay-500 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed text-purple-100">
              Am creat un mic traseu cu amintirile noastre
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-2000 delay-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <button 
            onClick={scrollToTimeline}
            className="group flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors duration-300"
            aria-label="Scroll to timeline"
          >
            <span className="text-sm font-medium">Descoperă povestea noastră</span>
            <div className="p-2 rounded-full border border-white/30 group-hover:border-white/60 transition-colors duration-300">
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>

      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
};

export default Hero;
