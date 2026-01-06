import { useState } from 'react';
import ToneSelector from './components/ToneSelector';
import InputArea from './components/InputArea';
import ResultArea from './components/ResultArea';
import useUsageLimit from './hooks/useUsageLimit';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Dilo Mejor
          </h1>
          <p className="text-gray-600 text-lg">
            Mejora tus frases para redes sociales con el tono perfecto
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {canUse ? (
              <span>
                Te quedan <span className="font-semibold text-indigo-600">{remainingUses}</span> mejoras hoy
              </span>
            ) : (
              <span className="text-red-600 font-medium">
                Has alcanzado el límite diario. Vuelve mañana!
              </span>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Input */}
          <InputArea
            value={phrase}
            onChange={setPhrase}
            disabled={isLoading}
          />

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
              w-full py-4 rounded-lg font-semibold text-lg
              transition-all duration-200
              ${isLoading || !canUse || phrase.length < 10
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Mejorando...
              </span>
            ) : (
              'Mejorar frase'
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Result */}
          <ResultArea result={result} />
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Frases naturales y humanas, sin marketing ni exageraciones</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
