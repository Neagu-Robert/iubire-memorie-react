import React, { useEffect } from 'react';
import Timeline from '../components/Timeline';

const TimelinePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Timeline />
    </div>
  );
};

export default TimelinePage;
