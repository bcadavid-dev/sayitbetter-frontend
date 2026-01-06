import { useState } from 'react';
import ToneSelector from './components/ToneSelector';
import InputArea from './components/InputArea';
import ResultArea from './components/ResultArea';
import useUsageLimit from './hooks/useUsageLimit';
import { SparklesIcon, LoadingSpinner, AlertIcon } from './components/Icons';

const API_URL = import.meta.env.VITE_API_URL || '/api';

function App() {
  const [phrase, setPhrase] = useState('');
  const [selectedTone, setSelectedTone] = useState('neutral');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { canUse, remainingUses, incrementUsage } = useUsageLimit();

  const handleImprove = async () => {
    if (!canUse) {
      setError('Has alcanzado el límite de 3 mejoras por día. Vuelve mañana!');
      return;
    }

    if (phrase.length < 10) {
      setError('La frase debe tener al menos 10 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch(`${API_URL}/improve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phrase,
          tone: selectedTone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar la frase');
      }

      setResult(data.improvedPhrase);
      incrementUsage();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <SparklesIcon className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-600" />
              <div className="absolute inset-0 bg-indigo-400 blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            Dilo Mejor
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Transforma tus frases para redes sociales con el tono perfecto
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200">
            <div className={`w-2 h-2 rounded-full ${canUse ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {canUse ? (
              <span className="text-sm text-gray-700">
                <span className="font-semibold text-indigo-600">{remainingUses}</span> mejoras disponibles
              </span>
            ) : (
              <span className="text-sm text-red-600 font-medium">
                Límite alcanzado. Vuelve mañana
              </span>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10 space-y-8">
          {/* Input */}
          <InputArea
            value={phrase}
            onChange={setPhrase}
            disabled={isLoading}
          />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">Personaliza el tono</span>
            </div>
          </div>

          {/* Tone Selector */}
          <ToneSelector
            selectedTone={selectedTone}
            onSelectTone={setSelectedTone}
          />

          {/* Action Button */}
          <button
            onClick={handleImprove}
            disabled={isLoading || !canUse || phrase.length < 10}
            className={`
              w-full py-4 sm:py-5 rounded-xl font-semibold text-base sm:text-lg
              transition-all duration-300 flex items-center justify-center gap-3
              ${isLoading || !canUse || phrase.length < 10
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
              }
            `}
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="w-5 h-5" />
                <span>Mejorando tu frase...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                <span>Mejorar frase</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 animate-fade-in">
              <AlertIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm flex-1">{error}</p>
            </div>
          )}

          {/* Result */}
          <ResultArea result={result} />
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 sm:mt-12 space-y-3">
          <p className="text-gray-600 text-sm sm:text-base">
            Frases naturales y humanas, sin marketing ni exageraciones
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
            <span>Hecho con cariño</span>
            <span className="text-pink-400">•</span>
            <span>Potenciado por IA</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
