import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import TimelineItem from "./TimelineItem";

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
    icon: "🏛️",
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
    icon: "🎓",
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

  const handleItemExpand = (id: number) => {
    setExpandedItem(id);
  };

  const handleCloseExpanded = () => {
    setExpandedItem(null);
  };

  const handleBackToHome = () => {
    navigate("/", { state: { fromFolder: true } });
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

      {/* Expanded view overlay */}
      {expandedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: `linear-gradient(135deg, ${evenimenteData
              .find((item) => item.id === expandedItem)
              ?.color.replace("from-", "")
              .replace(" to-", ", ")})`,
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseExpanded}
              className="float-right text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="text-6xl mb-4">
                {evenimenteData.find((item) => item.id === expandedItem)?.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                {evenimenteData.find((item) => item.id === expandedItem)?.title}
              </h3>
              <p className="text-lg text-gray-700 mb-8">
                {
                  evenimenteData.find((item) => item.id === expandedItem)
                    ?.description
                }
              </p>

              {/* Placeholder for photo collection */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {[1, 2, 3, 4, 5, 6].map((photo) => (
                  <div
                    key={photo}
                    className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-500"
                  >
                    📸 Fotografie {photo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EvenimenteSpecialeTimeline;
