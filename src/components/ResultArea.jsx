import React, { useState } from 'react';
import { CopyIcon, CheckIcon, SparklesIcon } from './Icons';

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
    <div className="w-full animate-fade-in space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs lg:text-sm font-medium text-gray-700">
          <SparklesIcon className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
          <span>Tu frase mejorada</span>
        </label>
        <button
          onClick={handleCopy}
          className={`
            px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg font-medium text-xs lg:text-sm
            transition-all duration-300 flex items-center gap-1.5
            ${copied
              ? 'bg-green-600 text-white shadow-md scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-green-400 hover:shadow-sm'
            }
          `}
        >
          {copied ? (
            <>
              <CheckIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <CopyIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl lg:rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="relative w-full p-4 lg:p-5 rounded-xl lg:rounded-2xl border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 min-h-[100px] lg:min-h-[120px] shadow-sm">
          <p className="text-gray-900 leading-relaxed text-sm lg:text-base font-medium">
            {result}
          </p>
          <div className="absolute bottom-2 right-2 lg:bottom-3 lg:right-3 opacity-10">
            <SparklesIcon className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
        <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Lista para compartir</span>
      </div>
    </div>
  );
}
