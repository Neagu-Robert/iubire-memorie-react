
import React, { useState } from 'react';
import { Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FolderCardProps {
  title: string;
  description: string;
  color: string;
  route: string;
  position: 'left' | 'center-left' | 'center-right' | 'right';
}

const FolderCard: React.FC<FolderCardProps> = ({ title, description, color, route, position }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'transform -rotate-12 -translate-y-4';
      case 'center-left':
        return 'transform -rotate-6 -translate-y-8';
      case 'center-right':
        return 'transform rotate-6 -translate-y-8';
      case 'right':
        return 'transform rotate-12 -translate-y-4';
      default:
        return '';
    }
  };

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 ${getPositionClasses()} ${
        isHovered ? 'scale-110 -translate-y-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`w-48 h-32 bg-gradient-to-r ${color} rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4`}>
        <div className="flex items-center justify-between text-white mb-2">
          <Folder className={`w-6 h-6 transition-transform duration-300 ${
            isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
          }`} />
        </div>
        <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
        <p className="text-white/90 text-xs leading-tight">{description}</p>
      </div>
    </div>
  );
};

export default FolderCard;
