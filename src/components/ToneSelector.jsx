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
    <div className="w-full space-y-2">
      <label className="block text-xs lg:text-sm font-medium text-gray-700">
        Selecciona el tono
      </label>
      <div className="grid grid-cols-2 gap-2">
        {TONES.map((tone) => {
          const isSelected = selectedTone === tone.id;
          return (
            <button
              key={tone.id}
              onClick={() => onSelectTone(tone.id)}
              className={`
                relative overflow-hidden rounded-lg lg:rounded-xl p-2 lg:p-2.5
                transition-all duration-300 ease-out
                ${isSelected
                  ? 'bg-gradient-to-br ' + tone.color + ' text-white shadow-lg scale-[1.02] ring-2 ring-offset-2 ring-indigo-400'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md border-2 border-gray-200'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xl lg:text-2xl transition-transform duration-300 flex-shrink-0 ${
                  isSelected ? 'scale-110' : ''
                }`}>
                  {tone.emoji}
                </span>
                <div className="text-left flex-1 min-w-0">
                  <div className={`font-semibold text-xs lg:text-sm truncate ${
                    isSelected ? 'text-white' : 'text-gray-900'
                  }`}>
                    {tone.name}
                  </div>
                  <div className={`text-[10px] lg:text-xs truncate ${
                    isSelected ? 'text-white/90' : 'text-gray-500'
                  }`}>
                    {tone.description}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-1 right-1 lg:top-1.5 lg:right-1.5">
                  <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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
