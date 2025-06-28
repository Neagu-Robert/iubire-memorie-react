
import React, { useEffect } from 'react';
import CircularGallery from '../components/CircularGallery';

const CircularGalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <CircularGallery />
    </div>
  );
};

export default CircularGalleryPage;
