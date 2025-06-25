
import React, { useEffect, useState } from 'react';
import TimelineItem from './TimelineItem';

const timelineData = [
  {
    id: 1,
    title: "Prima întâlnire",
    description: "Ziua în care totul a început. Privirea ta a schimbat totul pentru mine.",
    icon: "💕",
    date: "Data specială",
    color: "from-pink-400 to-rose-500"
  },
  {
    id: 2,
    title: "Prima noastră vacanță",
    description: "Aventura care ne-a unit și mai mult. Amintiri de neuitat.",
    icon: "✈️",
    date: "Vacanța magică",
    color: "from-blue-400 to-cyan-500"
  },
  {
    id: 3,
    title: "Prima sărbătoare împreună",
    description: "Momentul când am simțit că suntem o echipă adevărată.",
    icon: "🎄",
    date: "Sărbătoarea noastră",
    color: "from-green-400 to-emerald-500"
  },
  {
    id: 4,
    title: "Ziua aniversării tale",
    description: "Prima dată când am sărbătorit ziua ta specială împreună.",
    icon: "🎂",
    date: "Ziua ta specială",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: 5,
    title: "Primul nostru concert",
    description: "Muzica care ne-a unit sufletele și ne-a făcut să dansăm.",
    icon: "🎵",
    date: "Seara muzicală",
    color: "from-purple-400 to-indigo-500"
  },
  {
    id: 6,
    title: "Momentul 'Te iubesc'",
    description: "Cuvintele care au schimbat totul. Primul nostru 'Te iubesc'.",
    icon: "💖",
    date: "Declarația de iubire",
    color: "from-red-400 to-pink-500"
  },
  {
    id: 7,
    title: "Prima noastră casă",
    description: "Locul unde am început să construim visurile noastre împreună.",
    icon: "🏠",
    date: "Căminul nostru",
    color: "from-teal-400 to-cyan-500"
  },
  {
    id: 8,
    title: "Aventura în natură",
    description: "Călătoria care ne-a arătat cât de bine ne completăm.",
    icon: "🌲",
    date: "În natură",
    color: "from-green-500 to-lime-500"
  },
  {
    id: 9,
    title: "Realizarea viselor",
    description: "Momentul când am înțeles că împreună putem orice.",
    icon: "⭐",
    date: "Împlinirea visurilor",
    color: "from-amber-400 to-yellow-500"
  },
  {
    id: 10,
    title: "Astăzi - Ziua ta specială",
    description: "Aici și acum, sărbătorind femeia incredibilă care ești.",
    icon: "🌟",
    date: "La mulți ani!",
    color: "from-purple-500 to-pink-500"
  }
];

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            setVisibleItems(prev => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll('[data-timeline-item]');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Povestea noastră de dragoste
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fiecare moment contează, fiecare amintire este prețioasă
          </p>
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
              />
            ))}
          </div>
        </div>

        {/* Final message */}
        <div className="text-center mt-20 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Și aceasta este doar începutul... 💫
          </h3>
          <p className="text-lg text-gray-700">
            Cu toate gândurile mele de dragoste pentru tine în această zi specială!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
