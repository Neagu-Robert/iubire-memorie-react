
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import FolderCard from '../components/FolderCard';
import AnimatedCat from '../components/AnimatedCat';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
      title: "Folder 3",
      description: "Description for third folder",
      color: "from-green-400 to-emerald-500",
      route: "/folder3",
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
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Hero />
      
      {/* New folders section */}
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 flex flex-col items-center justify-center">
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

          {/* Animated cat below the folders */}
          <AnimatedCat />
          
          <div className="text-center">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Alege una dintre colecții pentru a descoperi amintirile noastre speciale
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
