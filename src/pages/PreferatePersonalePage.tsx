
import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PhotoStack from '../components/PhotoStack';

const PreferatePersonalePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample photos data - using blank placeholders
  const photos = [
    {
      id: 1,
      src: '',
      alt: 'Photo 1'
    },
    {
      id: 2,
      src: '',
      alt: 'Photo 2'
    },
    {
      id: 3,
      src: '',
      alt: 'Photo 3'
    },
    {
      id: 4,
      src: '',
      alt: 'Photo 4'
    },
    {
      id: 5,
      src: '',
      alt: 'Photo 5'
    },
    {
      id: 6,
      src: '',
      alt: 'Photo 6'
    },
    {
      id: 7,
      src: '',
      alt: 'Photo 7'
    },
    {
      id: 8,
      src: '',
      alt: 'Photo 8'
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
