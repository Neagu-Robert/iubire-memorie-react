import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import TimelineItem from "./TimelineItem";
import PhotoCollectionViewer from "./PhotoCollectionViewer";

const evenimenteData = [
  {
    id: 1,
    title: "Serbarea de Crăciun",
    description:
      "Magia sărbătorilor de iarnă, când totul strălucește și inimile sunt pline de bucurie și recunoștință.",
    icon: "🎄",
    date: "Decembrie magic",
    color: "from-red-400 to-green-500",
  },
  {
    id: 2,
    title: "Zile de naștere la Old Mill",
    description:
      "Serbări speciale în locul nostru preferat, unde fiecare an în plus este celebrat cu stil și eleganță.",
    icon: "🍕",
    date: "Aniversări elegante",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 3,
    title: "Zile de naștere în familie",
    description:
      "Căldura familiei și bucuria de a fi împreună în momentele cele mai importante ale anului.",
    icon: "🎂",
    date: "În cercul familiei",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: 4,
    title: "Majoratul",
    description:
      "Trecerea în lumea adulților, cu toate emoțiile și speranțele unei noi etape din viață.",
    icon: "🎉",
    date: "18 ani împliniți",
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: 5,
    title: "Absolviri",
    description:
      "Sfârșitul unei călătorii și începutul alteia - diplomele care marchează realizările noastre academice.",
    icon: "🎓",
    date: "Succese academice",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 6,
    title: "Ieșiri cu cei dragi",
    description:
      "Momentele spontane petrecute alături de oamenii care contează cu adevărat în viața noastră.",
    icon: "👨‍👩‍👧‍👦",
    date: "Timp de calitate",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 7,
    title: "Ziua îndrăgostiților",
    description:
      "Sărbătoarea dragostei când inimile bat la unison și fiecare gest devine o declarație de iubire.",
    icon: "💝",
    date: "14 Februarie",
    color: "from-pink-500 to-red-400",
  },
];

const EvenimenteSpecialeTimeline = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [viewMode, setViewMode] = useState<'browse' | 'collage'>('browse');
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute("data-id") || "0");
            setVisibleItems((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll("[data-timeline-item]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleItemExpand = (id: number, mode: 'browse' | 'collage') => {
    setExpandedItem(id);
    setViewMode(mode);
    setShowPhotoViewer(true);
  };

  const handleCloseExpanded = () => {
    setExpandedItem(null);
    setShowPhotoViewer(false);
  };

  const handleBackToHome = () => {
    navigate("/", { state: { fromFolder: true } });
  };

  const getCurrentItem = () => {
    return evenimenteData.find(item => item.id === expandedItem);
  };

  const getPhotosForItem = (itemId: number) => {
    // Placeholder photos - you can replace with actual photo data
    return [1, 2, 3, 4, 5, 6].map(num => ({
      id: num,
      src: `/photos/special-events/item-${itemId}/photo-${num}.jpg`,
      alt: `Fotografie ${num} din ${getCurrentItem()?.title || 'colecție'}`
    }));
  };

  const getMusicForItem = (itemId: number) => {
    // Map each special event item to its corresponding music file according to the specific order
    const musicMap: { [key: number]: string } = {
      1: '/songs/special_events/Andy Williams - It\'s the Most Wonderful Time of the Year (Official Audio).mp3', // Serbare craciun
      2: '/songs/special_events/Akcent - Dragoste de inchiriat (Official Video).mp3', // Old mill
      3: '/songs/special_events/Major Lazer & DJ Snake - Lean On (feat. MØ) [Official Lyric Video].mp3', // familie
      4: '/songs/special_events/Fly Project - Toca Toca  Official Music Video.mp3', // majorat
      5: '/songs/special_events/Rihanna - We Found Love (Lyrics) ft. Calvin Harris.mp3', // absolviri
      // 6: iesiri dragi - no song (exception)
      7: '/songs/special_events/Felix Jaehn - Ain\'t Nobody (Loves Me Better) (Official Video) ft. Jasmine Thompson.mp3' // ziua indragostitilor
    };
    
    return musicMap[itemId]; // Return undefined for items without songs
  };

  const hasMusic = (itemId: number) => {
    return getMusicForItem(itemId) !== undefined;
  };

  return (
    <section id="timeline" className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-md">
              <h2 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
                Evenimente speciale
              </h2>
              <p className="text-xl text-purple-600 max-w-2xl">
                Sărbători și momente de neuitat care ne-au marcat călătoria
                împreună
              </p>
            </div>
          </div>
          <button
            onClick={handleBackToHome}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            aria-label="Înapoi la pagina principală"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-500 h-full rounded-full shadow-lg"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {evenimenteData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isVisible={visibleItems.includes(item.id)}
                isLeft={index % 2 === 0}
                onExpand={handleItemExpand}
                hasMusic={hasMusic(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Final message */}
        <div className="text-center mt-20 p-8 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Fiecare eveniment special este o comoară în povestea noastră 💎
          </h3>
          <p className="text-lg text-gray-700">
            Să continuăm să creăm amintiri frumoase împreună!
          </p>
        </div>
      </div>

      {/* Photo Collection Viewer */}
      {showPhotoViewer && expandedItem && (
        <PhotoCollectionViewer
          photos={getPhotosForItem(expandedItem)}
          title={getCurrentItem()?.title || ''}
          description={getCurrentItem()?.description || ''}
          musicSrc={getMusicForItem(expandedItem)}
          onClose={handleCloseExpanded}
          initialMode={viewMode}
        />
      )}
    </section>
  );
};

export default EvenimenteSpecialeTimeline;
