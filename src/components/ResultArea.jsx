import React, { useState } from 'react';

export default function ResultArea({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Frase mejorada
        </label>
        <button
          onClick={handleCopy}
          className={`
            px-3 py-1.5 rounded-lg font-medium text-sm
            transition-all duration-200 flex items-center gap-1
            ${copied
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }
          `}
        >
          {copied ? '✓ Copiado' : '📋 Copiar'}
        </button>
      </div>
      <div className="w-full p-4 rounded-lg border-2 border-green-300 bg-green-50 min-h-[100px]">
        <p className="text-gray-800 leading-relaxed">{result}</p>
      </div>
    </div>
  );
}
