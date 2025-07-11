import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import TimelineItem from "./TimelineItem";
import ModeSelector from "./ModeSelector";
import PhotoCollectionViewer from "./PhotoCollectionViewer";
import { getEvenimenteSpecialePhotos } from "../data/getEvenimenteSpecialePhotos";

const evenimenteData = [
  {
    id: 1,
    title: "Serbarea de Crăciun",
    description:
      "Am însuflat magia Sarbătorilor împreuna cu prietenii noștri printr-o șceneta frumoasă.",
    icon: "🎄",
    date: "Decembrie magic",
    color: "from-red-400 to-green-500",
  },
  {
    id: 2,
    title: "Zile de naștere la Old Mill",
    description: "Locul preferat de sărbătorit al colegilor noștri.",
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
      "Sărbătoarea dragostei, am redescoperit pasiunea de a dansa împreună și am creat amintiri de neuitat.",
    icon: "💝",
    date: "14 Februarie",
    color: "from-pink-500 to-red-400",
  },
];

const evenimentePhotos = getEvenimenteSpecialePhotos();

const EvenimenteSpecialeTimeline = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [viewMode, setViewMode] = useState<"browse" | "collage">("browse");
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

  const handleItemExpand = (id: number, mode: "browse" | "collage") => {
    console.log(
      "EvenimenteSpeciale: handleItemExpand called with id:",
      id,
      "mode:",
      mode
    );
    setExpandedItem(id);
    setViewMode(mode);
    setShowPhotoViewer(true);
    setShowModeSelector(false);
  };

  const handleModeSelect = (mode: "browse" | "collage") => {
    console.log("EvenimenteSpeciale: handleModeSelect called with mode:", mode);
    setViewMode(mode);
    setShowModeSelector(false);
    setShowPhotoViewer(true);
  };

  const handleCloseAll = () => {
    setExpandedItem(null);
    setShowPhotoViewer(false);
    setShowModeSelector(false);
  };

  const handleBackToHome = () => {
    navigate("/", { state: { fromFolder: true } });
  };

  const getCurrentItem = () => {
    return evenimenteData.find((item) => item.id === expandedItem);
  };

  const getPhotosForItem = (itemId: number) => {
    // Find the corresponding photos for the event item
    const event = evenimentePhotos[itemId - 1];
    if (!event) return [];
    return event.photos.map((src, idx) => ({
      id: idx + 1,
      src,
      alt: `Fotografie ${idx + 1} din ${event.title}`,
    }));
  };

  const getMusicForItem = (itemId: number) => {
    // Map each special event item to its corresponding music file according to the specific order
    const musicMap: { [key: number]: string } = {
      1: "/songs/special_events/Andy Williams - It's the Most Wonderful Time of the Year (Official Audio).mp3", // Serbare craciun
      2: "/songs/special_events/Akcent - Dragoste de inchiriat (Official Video).mp3", // Old mill
      3: "/songs/special_events/Major Lazer & DJ Snake - Lean On (feat. MØ) [Official Lyric Video].mp3", // familie
      4: "/songs/special_events/Fly Project - Toca Toca  Official Music Video.mp3", // majorat
      5: "/songs/special_events/Rihanna - We Found Love (Lyrics) ft. Calvin Harris.mp3", // absolviri
      // 6: iesiri dragi - no song (exception)
      7: "/songs/special_events/Felix Jaehn - Ain't Nobody (Loves Me Better) (Official Video) ft. Jasmine Thompson.mp3", // ziua indragostitilor
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

      {/* Mode Selector */}
      {showModeSelector && expandedItem && (
        <ModeSelector
          title={getCurrentItem()?.title || ""}
          description={getCurrentItem()?.description || ""}
          hasMusic={hasMusic(expandedItem)}
          onModeSelect={handleModeSelect}
          onClose={handleCloseAll}
        />
      )}

      {/* Photo Collection Viewer */}
      {showPhotoViewer && expandedItem && (
        <PhotoCollectionViewer
          photos={getPhotosForItem(expandedItem)}
          title={getCurrentItem()?.title || ""}
          description={getCurrentItem()?.description || ""}
          musicSrc={getMusicForItem(expandedItem)}
          onClose={handleCloseAll}
          mode={viewMode}
        />
      )}
    </section>
  );
};

export default EvenimenteSpecialeTimeline;
