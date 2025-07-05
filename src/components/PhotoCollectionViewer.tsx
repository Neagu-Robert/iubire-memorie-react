import React from "react";
import { X } from "lucide-react";
import PhotoStack from "./PhotoStack";
import AnimatedCollage from "./AnimatedCollage";

interface Photo {
  id: number;
  src: string;
  alt: string;
}

interface PhotoCollectionViewerProps {
  photos: Photo[];
  title: string;
  description: string;
  musicSrc?: string;
  onClose: () => void;
  mode: "browse" | "collage";
}

const PhotoCollectionViewer: React.FC<PhotoCollectionViewerProps> = ({
  photos,
  title,
  description,
  musicSrc,
  onClose,
  mode,
}) => {
  if (mode === "browse") {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <PhotoStack photos={photos} />
      </div>
    );
  }

  if (mode === "collage") {
    return (
      <AnimatedCollage
        photos={photos}
        title={title}
        musicSrc={musicSrc}
        onClose={onClose}
      />
    );
  }

  return null;
};

export default PhotoCollectionViewer;
