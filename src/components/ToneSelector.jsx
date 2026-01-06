import React from 'react';

const TONES = [
  {
    id: 'intelectual',
    name: 'Intelectual',
    emoji: '🧠',
    description: 'Analítico y reflexivo',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'directo',
    name: 'Directo',
    emoji: '🎯',
    description: 'Claro y al punto',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'conciliador',
    name: 'Conciliador',
    emoji: '🤝',
    description: 'Empático y diplomático',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'sarcastico',
    name: 'Sarcástico',
    emoji: '😏',
    description: 'Irónico y mordaz',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'poetico',
    name: 'Poético',
    emoji: '✨',
    description: 'Lírico y creativo',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'neutral',
    name: 'Neutral',
    emoji: '💼',
    description: 'Equilibrado y elegante',
    color: 'from-gray-600 to-slate-700'
  }
];

export default function ToneSelector({ selectedTone, onSelectTone }) {
  return (
    <div className="w-full space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Selecciona el tono
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TONES.map((tone) => {
          const isSelected = selectedTone === tone.id;
          return (
            <button
              key={tone.id}
              onClick={() => onSelectTone(tone.id)}
              className={`
                relative overflow-hidden rounded-xl p-4
                transition-all duration-300 ease-out
                ${isSelected
                  ? 'bg-gradient-to-br ' + tone.color + ' text-white shadow-lg scale-[1.02] ring-2 ring-offset-2 ring-indigo-400'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border-2 border-gray-200'
                }
              `}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <span className={`text-3xl transition-transform duration-300 ${
                  isSelected ? 'scale-110' : ''
                }`}>
                  {tone.emoji}
                </span>
                <div>
                  <div className={`font-semibold text-sm ${
                    isSelected ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tone.name}
                  </div>
                  <div className={`text-xs mt-0.5 ${
                    isSelected ? 'text-white/90' : 'text-gray-500'
                  }`}>
                    {tone.description}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
