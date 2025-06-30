
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PhotoStack from '../components/PhotoStack';

const PreferatePersonalePage = () => {
  const navigate = useNavigate();

  // Sample photos data - using placeholder images
  const photos = [
    {
      id: 1,
      src: 'photo-1649972904349-6e44c42644a7',
      alt: 'Woman with laptop'
    },
    {
      id: 2,
      src: 'photo-1488590528505-98d2b5aba04b',
      alt: 'Gray laptop computer'
    },
    {
      id: 3,
      src: 'photo-1581091226825-a6a2a5aee158',
      alt: 'Woman using laptop'
    },
    {
      id: 4,
      src: 'photo-1526374965328-7f61d4dc18c5',
      alt: 'Matrix movie still'
    },
    {
      id: 5,
      src: 'photo-1500673922987-e212871fec22',
      alt: 'Yellow lights between trees'
    },
    {
      id: 6,
      src: 'photo-1501854140801-50d01698950b',
      alt: 'Green mountains aerial view'
    },
    {
      id: 7,
      src: 'photo-1470813740244-df37b8c1edcb',
      alt: 'Blue starry night'
    },
    {
      id: 8,
      src: 'photo-1582562124811-c09040d0a901',
      alt: 'Orange tabby cat'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8b0000] via-[#660000] via-[#4a0000] to-[#330000]">
      {/* Header */}
      <div className="relative z-10 p-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-white hover:text-red-200 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Collections</span>
        </button>
        
        <div className="text-center mt-8">
          <h1 className="text-4xl font-bold text-white mb-4">Preferate Personale</h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">
            Colecția cu fotografiile noastre preferate. Trage stânga sau dreapta pentru a naviga prin imagini.
          </p>
        </div>
      </div>

      {/* Photo Stack */}
      <PhotoStack photos={photos} />
    </div>
  );
};

export default PreferatePersonalePage;
