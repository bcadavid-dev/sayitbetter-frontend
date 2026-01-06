import React from 'react';

const MIN_LENGTH = 10;
const MAX_LENGTH = 280;

export default function InputArea({ value, onChange, disabled }) {
  const charCount = value.length;
  const isValid = charCount >= MIN_LENGTH && charCount <= MAX_LENGTH;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Escribe tu frase
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Ej: Hoy fue un día muy productivo y aprendí muchas cosas nuevas"
        className={`
          w-full p-4 rounded-lg border-2 resize-none
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition-colors duration-200
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${!isValid && charCount > 0 ? 'border-red-300' : 'border-gray-300'}
        `}
        rows={4}
        maxLength={MAX_LENGTH}
      />
      <div className="flex justify-between items-center mt-2 text-sm">
        <span className={`
          ${charCount < MIN_LENGTH ? 'text-red-500' : 'text-gray-500'}
        `}>
          {charCount < MIN_LENGTH
            ? `Mínimo ${MIN_LENGTH} caracteres`
            : 'Listo para mejorar'
          }
        </span>
        <span className={`
          ${charCount > MAX_LENGTH - 20 ? 'text-orange-500' : 'text-gray-500'}
        `}>
          {charCount}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
