
import React from 'react';
import { X, Eye, Play } from 'lucide-react';

interface ModeSelectorProps {
  title: string;
  description: string;
  hasMusic: boolean;
  onModeSelect: (mode: 'browse' | 'collage') => void;
  onClose: () => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({
  title,
  description,
  hasMusic,
  onModeSelect,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => onModeSelect('browse')}
            className="flex-1 flex flex-col items-center justify-center space-y-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border-2 border-blue-200"
          >
            <Eye className="w-8 h-8 text-blue-600" />
            <span className="text-blue-600 font-semibold text-center">Vezi pozele normal</span>
          </button>

          {hasMusic && (
            <button
              onClick={() => onModeSelect('collage')}
              className="flex-1 flex flex-col items-center justify-center space-y-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors border-2 border-purple-200"
            >
              <Play className="w-8 h-8 text-purple-600" />
              <span className="text-purple-600 font-semibold text-center">Vezi cu melodie surpriză</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;
