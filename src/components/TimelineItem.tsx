
import React, { useState } from 'react';
import { Folder } from 'lucide-react';

interface TimelineItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    icon: string;
    date: string;
    color: string;
  };
  index: number;
  isVisible: boolean;
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, isVisible, isLeft }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      data-timeline-item
      data-id={item.id}
      className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'} transition-all duration-1000 delay-${index * 100} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
        <div className={`w-4 h-4 bg-gradient-to-r ${item.color} rounded-full border-4 border-white shadow-lg transition-transform duration-300 ${
          isVisible ? 'scale-100' : 'scale-0'
        }`}></div>
      </div>

      {/* Content */}
      <div className={`w-full max-w-md ${isLeft ? 'pr-8' : 'pl-8'}`}>
        <div
          className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
            isOpen ? 'shadow-2xl' : ''
          }`}
          onClick={handleToggle}
        >
          {/* Folder tab */}
          <div className={`relative bg-gradient-to-r ${item.color} p-4 transition-all duration-300 ${
            isOpen ? 'rounded-t-xl' : 'rounded-xl'
          }`}>
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className={`text-2xl transition-transform duration-300 ${
                  isOpen ? 'scale-110' : 'scale-100'
                }`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.date}</p>
                </div>
              </div>
              <Folder className={`w-6 h-6 transition-transform duration-300 ${
                isOpen ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
              }`} />
            </div>
          </div>

          {/* Folder content */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="p-6 bg-white">
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Apasă din nou pentru a închide
              </div>
            </div>
          </div>

          {/* Subtle animation overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
