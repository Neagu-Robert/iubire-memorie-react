
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Hero />
      <Timeline />
    </div>
  );
};

export default Index;
