
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import FolderCard from '../components/FolderCard';
import InteractiveCat from '../components/InteractiveCat';
import VintageMusicPlayer from '../components/VintageMusicPlayer';
import VinylCollection from '../components/VinylCollection';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVinylCollectionOpen, setIsVinylCollectionOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoaded(true);
    if (location.state?.fromFolder) {
      const foldersSection = document.getElementById('folders-section');
      if (foldersSection) {
        foldersSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Placeholder data for the 4 folders - you can update these with real titles and descriptions
  const folderData = [
    {
      id: 1,
      title: "Primele noastre",
      description: "Colecția cu toate momentele noastre speciale",
      color: "from-purple-400 to-pink-500",
      route: "/timeline",
      position: "left" as const
    },
    {
      id: 2,
      title: "Evenimente speciale",
      description: "Sărbători și momente de neuitat din viața noastră",
      color: "from-blue-400 to-cyan-500",
      route: "/evenimente-speciale",
      position: "center-left" as const
    },
    {
      id: 3,
      title: "Galeria Circulară",
      description: "83 de momente organizate în 9 evenimente speciale",
      color: "from-green-400 to-emerald-500",
      route: "/circular-gallery",
      position: "center-right" as const
    },
    {
      id: 4,
      title: "Folder 4",
      description: "Description for fourth folder",
      color: "from-orange-400 to-red-500",
      route: "/folder4",
      position: "right" as const
    }
  ];

  return (
    <div
      className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-[#cc0000] via-[#aa0000] via-[#880000] to-[#660000]`}
      style={{ backgroundAttachment: 'fixed' }}
    >
      <Hero />
      
      {/* New folders section */}
      <section id="folders-section" className="min-h-screen bg-transparent py-20 flex flex-col items-center justify-center relative">
        <div className="max-w-6xl mx-auto px-4 text-center">
          
          {/* Folders arranged in an arch */}
          <div className="flex justify-center items-end space-x-8 mb-12">
            {folderData.map((folder) => (
              <FolderCard
                key={folder.id}
                title={folder.title}
                description={folder.description}
                color={folder.color}
                route={folder.route}
                position={folder.position}
              />
            ))}
          </div>

          {/* Interactive cat below the folders */}
          <InteractiveCat />
          
          <div className="text-center">
            <p className="text-lg text-red-100 max-w-2xl mx-auto">
              Alege una dintre colecții pentru a descoperi amintirile noastre speciale
            </p>
          </div>
        </div>
      </section>

      {/* Vintage Music Player */}
      <VintageMusicPlayer onOpen={() => setIsVinylCollectionOpen(true)} />
      
      {/* Vinyl Collection Overlay */}
      <VinylCollection 
        isOpen={isVinylCollectionOpen} 
        onClose={() => setIsVinylCollectionOpen(false)} 
      />
    </div>
  );
};

export default Index;
