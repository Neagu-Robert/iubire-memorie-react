import React, { useEffect } from 'react';
import EvenimenteSpecialeTimeline from '../components/EvenimenteSpecialeTimeline';

const EvenimenteSpecialePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <EvenimenteSpecialeTimeline />
    </div>
  );
};

export default EvenimenteSpecialePage;
