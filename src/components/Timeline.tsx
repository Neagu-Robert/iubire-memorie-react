import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import TimelineItem from "./TimelineItem";
import ModeSelector from "./ModeSelector";
import PhotoCollectionViewer from "./PhotoCollectionViewer";
import { getTimelinePhotos } from "../data/getTimelinePhotos";

const timelineData = [
  {
    id: 1,
    title: "Prima noastră excursie împreună",
    description:
      "Aventura care a început totul - călătoria care ne-a unit sufletele și ne-a arătat cât de frumos este să explorăm lumea împreună.",
    icon: "🚌",
    date: "Excursia magică",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 2,
    title: "Prima vizită la tine acasă",
    description:
      "Momentul când am pășit pentru prima dată în spațiul tău personal.",
    icon: "🏡",
    date: "Căminul tău",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 3,
    title: "Primul festival de Crăciun împreună",
    description:
      "Magia sărbătorilor trăită împreună - lumini, bucurie și căldura ta lângă mine.",
    icon: "🎄",
    date: "Sărbătoarea magică",
    color: "from-red-400 to-green-500",
  },
  {
    id: 4,
    title: "Prima oară împreună la piscină",
    description:
      "Râsete, joacă și relaxare - momentele simple care devin speciale când ești cu persoana potrivită.",
    icon: "🏊",
    date: "Ziua la apă",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 5,
    title: "Prima noastră excursie la munte",
    description:
      "Vârfuri înalte și priviri către orizont - am înțeles că împreună putem cuceri orice înălțime.",
    icon: "⛰️",
    date: "Aventura montană",
    color: "from-gray-400 to-stone-500",
  },
  {
    id: 6,
    title: "Prima sesiune de gătit împreună",
    description:
      "Ingrediente, râsete și puțin haos în bucătărie - rețeta perfectă pentru amintiri dulci.",
    icon: "👩‍🍳",
    date: "Bucătăria noastră",
    color: "from-orange-400 to-red-500",
  },
  {
    id: 7,
    title: "Prima ieșire la râu",
    description:
      "Un pic de mișcare cu bicicleta și rolele, pe urmă o plimbare relaxantă cu barcuța pe râu",
    icon: "🏞️",
    date: "La malul apei",
    color: "from-blue-400 to-teal-500",
  },
  {
    id: 8,
    title: "Primul concert filarmonic",
    description:
      "Pentru mine chiar a fost primul concert filarmonic, aș mai merge.",
    icon: "🎼",
    date: "Seara muzicală",
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: 9,
    title: "Primul festival medieval",
    description:
      "Călătorie în timp și povești de demult, ne simțeam ca într-o poveste.",
    icon: "🏰",
    date: "În vremuri de demult",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 10,
    title: "Prima sesiune serioasă de Catan",
    description:
      "Strategii, negocieri și râsete - am descoperit că putem face o echipa buna:)",
    icon: "🎲",
    date: "Seara jocurilor",
    color: "from-yellow-400 to-amber-500",
  },
  {
    id: 11,
    title: "Prima ieșire cu cortul",
    description: "Sub cerul plin de stele, doar noi doi și natura.",
    icon: "⛺",
    date: "Sub stele",
    color: "from-green-500 to-teal-500",
  },
  {
    id: 12,
    title: "Prima nuntă/eveniment special",
    description: "Am simțit ca mă integrez încet încet în familia ta",
    icon: "💒",
    date: "Sărbătoarea dragostei",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: 13,
    title: "Primul Crăciun petrecut împreună",
    description:
      "Cadouri, tradiții și primul nostru Crăciun ca și cuplu - începutul propriilor noastre tradiții.",
    icon: "🎁",
    date: "Crăciunul nostru",
    color: "from-red-500 to-green-400",
  },
  {
    id: 14,
    title: "Prima cabană la munte împreună",
    description:
      "A fost rândul tau să te integrezi în familia mea. Eu am încercat patinatul iar tu skiatul.",
    icon: "🏔️",
    date: "Refugiul nostru",
    color: "from-indigo-400 to-purple-500",
  },
  {
    id: 15,
    title: "Prima oară la buneii tăi",
    description:
      "Am simțit un pic din trecutul tău, văzând unde ai crescut am început să te cunosc și mai bine.",
    icon: "👴👵",
    date: "În familie",
    color: "from-violet-400 to-pink-500",
  },
];

const Timeline = () => {
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
    setExpandedItem(id);
    setViewMode(mode);
    setShowPhotoViewer(true);
    setShowModeSelector(false);
  };

  const handleModeSelect = (mode: "browse" | "collage") => {
    setViewMode(mode);
    setShowModeSelector(false);
    setShowPhotoViewer(true);
  };

  const handleCloseAll = () => {
    setExpandedItem(null);
    setShowPhotoViewer(false);
    setShowModeSelector(false);
  };

  const getCurrentItem = () => {
    return timelineData.find((item) => item.id === expandedItem);
  };

  const timelinePhotos = getTimelinePhotos();

  const getPhotosForItem = (itemId: number) => {
    // Find the corresponding photos for the timeline item
    const milestone = timelinePhotos[itemId - 1];
    if (!milestone) return [];
    return milestone.photos.map((src, idx) => ({
      id: idx + 1,
      src,
      alt: `Fotografie ${idx + 1} din ${milestone.title}`,
    }));
  };

  const getMusicForItem = (itemId: number) => {
    // Map each timeline item to its corresponding music file according to the specific order
    const musicMap: { [key: number]: string } = {
      1: "/songs/timeline/Green Day - Holiday (Official Audio).mp3", // prima excursie
      2: "/songs/timeline/Suzume no TojimariSuzumeTheme Song.mp3", // prima vizita
      3: "/songs/timeline/Lindsey Stirling - Carol of the Bells (Official Music Video).mp3", // festival craciun
      4: "/songs/timeline/Zara Larsson - Lush Life.mp3", // piscina
      5: "/songs/timeline/Moves Like Jagger - Maroon 5 (Feat. Christina Aguilera) (Lyrics).mp3", // excursie munte
      7: "/songs/timeline/DNCE - Cake By The Ocean (Lyrics).mp3", // iesire rau
      8: "/songs/timeline/Sia - Cheap Thrills (Lyrics) ft. Sean Paul.mp3", // concert filarmonic
      9: "/songs/timeline/Fall Out Boy - Irresistible (Audio).mp3", // festival medieval
      11: "/songs/timeline/Lidia Buble feat. Amira - Le-am spus si fetelor (Official Video).mp3", // iesire cu cortul
      12: "/songs/timeline/Pitbull - Give Me Everything (Lyrics) Ft. Ne-Yo, Afrojack, Nayer.mp3", // nunta
      13: "/songs/timeline/Mariah Carey - All I Want For Christmas Is You (Lyrics).mp3", // Craciun impreuna
      14: "/songs/timeline/Pitbull - International Love (Lyrics) ft. Chris Brown.mp3", // cabana munte
      15: "/songs/timeline/VESCAN feat. Kamelia - Piesa mea preferata (Official Single).mp3", // buneii
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Povestea noastră de dragoste
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Fiecare moment contează, fiecare amintire este prețioasă
            </p>
            <div className="text-lg text-white/80 italic">
              Am numit următoarea colecție "primul/prima". Și nu, nu este o
              competiție 😉
            </div>
          </div>
          <button
            onClick={() => navigate("/", { state: { fromFolder: true } })}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
            aria-label="Înapoi la pagina principală"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-400 via-pink-400 to-purple-500 h-full rounded-full shadow-lg"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
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
        <div className="text-center mt-20 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Sper că am făcut o *prima* impresie bună 😊
          </h3>
          <p className="text-lg text-gray-700">
            Cu toate gândurile mele de dragoste pentru tine în această zi
            specială!
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

export default Timeline;
