
import React, { useState } from "react";
import { Folder, FileText, Image, Heart, Calendar } from "lucide-react";
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

  const getFileIcons = () => {
    switch (position) {
      case "left":
        return [Heart, FileText, Image];
      case "center-left":
        return [Calendar, Heart, FileText];
      case "center-right":
        return [Image, Image, Heart];
      case "right":
        return [Heart, Image, FileText];
      default:
        return [FileText, Image, Heart];
    }
  };

  const handleClick = () => {
    navigate(route, { state: { fromFolder: true } });
  };

  const fileIcons = getFileIcons();

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
          className={`w-20 h-6 bg-gradient-to-r ${color} rounded-t-lg absolute -top-6 left-4 border-2 border-white/20`}
        />
        
        {/* Main Folder */}
        <div
          className={`w-64 h-48 bg-gradient-to-br ${color} rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 p-6 border-2 border-white/20 relative overflow-hidden`}
        >
          {/* Folder Top Edge */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-white/10 rounded-t-lg border-b border-white/20" />
          
          {/* Files Inside Folder */}
          <div className="mt-8 space-y-2">
            {fileIcons.map((IconComponent, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-2 bg-white/10 rounded backdrop-blur-sm border border-white/20 transition-all duration-300 ${
                  isHovered ? `translate-x-2 delay-${index * 100}` : ""
                }`}
              >
                <IconComponent className="w-4 h-4 text-white/80" />
                <div className="flex-1 h-2 bg-white/30 rounded animate-pulse" />
              </div>
            ))}
          </div>
          
          {/* Folder Info */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between text-white mb-2">
              <Folder
                className={`w-6 h-6 transition-transform duration-300 ${
                  isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"
                }`}
              />
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {fileIcons.length} files
              </span>
            </div>
            <h3 className="text-white font-bold text-sm mb-1 truncate">{title}</h3>
            <p className="text-white/80 text-xs leading-tight line-clamp-2">{description}</p>
          </div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5 bg-white/5" />
        </div>
      </div>
    </div>
  );
};

export default FolderCard;
