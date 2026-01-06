import React from 'react';
import { MessageIcon } from './Icons';

const MIN_LENGTH = 10;
const MAX_LENGTH = 280;

export default function InputArea({ value, onChange, disabled }) {
  const charCount = value.length;
  const isValid = charCount >= MIN_LENGTH && charCount <= MAX_LENGTH;
  const progress = (charCount / MAX_LENGTH) * 100;

  return (
    <div className="w-full space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <MessageIcon className="w-5 h-5 text-indigo-600" />
        <span>Escribe tu frase</span>
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Ej: Hoy fue un día muy productivo y aprendí muchas cosas nuevas..."
          className={`
            w-full p-4 sm:p-5 rounded-xl border-2 resize-none
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
            transition-all duration-200 text-base
            ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white hover:border-gray-400'}
            ${!isValid && charCount > 0 ? 'border-red-300 focus:ring-red-300' : 'border-gray-300'}
          `}
          rows={5}
          maxLength={MAX_LENGTH}
        />
        {charCount > 0 && (
          <div className="absolute bottom-3 right-3">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold
              ${charCount >= MIN_LENGTH
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-500'
              }
            `}>
              {charCount}
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              charCount < MIN_LENGTH
                ? 'bg-gray-300'
                : charCount > MAX_LENGTH - 20
                  ? 'bg-orange-400'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className={`font-medium transition-colors ${
            charCount < MIN_LENGTH ? 'text-gray-500' : 'text-green-600'
          }`}>
            {charCount < MIN_LENGTH
              ? `Faltan ${MIN_LENGTH - charCount} caracteres`
              : '✓ Listo para mejorar'
            }
          </span>
          <span className={`transition-colors ${
            charCount > MAX_LENGTH - 20 ? 'text-orange-600 font-semibold' : 'text-gray-500'
          }`}>
            {charCount}/{MAX_LENGTH}
          </span>
        </div>
      </div>
    </div>
  );
}
