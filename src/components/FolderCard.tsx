
import React, { useState } from "react";
import { Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FolderCardProps {
  title: string;
  description: string;
  color: string;
  route: string;
  position: "left" | "center-left" | "center-right" | "right";
}

const FolderCard: React.FC<FolderCardProps> = ({
  title,
  description,
  color,
  route,
  position,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const getPositionClasses = () => {
    switch (position) {
      case "left":
        return "transform -rotate-12 -translate-y-4";
      case "center-left":
        return "transform -rotate-6 -translate-y-8";
      case "center-right":
        return "transform rotate-6 -translate-y-8";
      case "right":
        return "transform rotate-12 -translate-y-4";
      default:
        return "";
    }
  };

  const handleClick = () => {
    navigate(route, { state: { fromFolder: true } });
  };

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 ${getPositionClasses()} ${
        isHovered ? "scale-110 -translate-y-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Folder Body */}
      <div className="relative">
        {/* Folder Tab */}
        <div
          className={`w-20 h-6 bg-gradient-to-r ${color} rounded-t-lg absolute -top-6 left-4`}
        />
        
        {/* Main Folder */}
        <div
          className={`w-64 h-48 bg-gradient-to-br ${color} rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 p-6 relative overflow-hidden`}
        >
          {/* Folder Top Edge */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-white/10 rounded-t-lg" />
          
          {/* Folder Content - Centered */}
          <div className="flex flex-col items-center justify-center h-full text-center">
            {/* Folder Icon */}
            <Folder
              className={`w-12 h-12 text-white mb-4 transition-transform duration-300 ${
                isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"
              }`}
            />
            
            {/* Title */}
            <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
            
            {/* Description */}
            <p className="text-white/90 text-sm leading-tight px-2">{description}</p>
          </div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5 bg-white/5" />
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
