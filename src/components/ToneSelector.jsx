import React from 'react';

const TONES = [
  { id: 'intelectual', name: 'Intelectual', emoji: '🧠' },
  { id: 'directo', name: 'Directo', emoji: '🎯' },
  { id: 'conciliador', name: 'Conciliador', emoji: '🤝' },
  { id: 'sarcastico', name: 'Sarcástico', emoji: '😏' },
  { id: 'poetico', name: 'Poético', emoji: '✨' },
  { id: 'neutral', name: 'Neutral/Elegante', emoji: '💼' }
];

export default function ToneSelector({ selectedTone, onSelectTone }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Elige un tono
      </label>
      <div className="flex flex-wrap gap-2">
        {TONES.map((tone) => (
          <button
            key={tone.id}
            onClick={() => onSelectTone(tone.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 ease-in-out
              ${selectedTone === tone.id
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <span className="mr-1">{tone.emoji}</span>
            {tone.name}
          </button>
        ))}
      </div>
    </div>
  );
}
