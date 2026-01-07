import { useState } from "react";
import ToneSelector from "./components/ToneSelector";
import InputArea from "./components/InputArea";
import ResultArea from "./components/ResultArea";
import useUsageLimit from "./hooks/useUsageLimit";
import { SparklesIcon, LoadingSpinner, AlertIcon } from "./components/Icons";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function App() {
  const [phrase, setPhrase] = useState("");
  const [selectedTone, setSelectedTone] = useState("neutral");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { canUse, remainingUses, incrementUsage, maxUses } = useUsageLimit();

  const handleImprove = async () => {
    if (!canUse) {
      setError(`Hoy la usaste bastante.Llegaste al límite de ${maxUses} mejoras diarias. Mañana vuelve a estar disponible, o desbloquea uso continuo si quieres seguir ahora.`);
      return;
    }

    if (phrase.length < 10) {
      setError("La frase debe tener al menos 10 caracteres");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch(`${API_URL}/improve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phrase,
          tone: selectedTone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al procesar la frase");
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
      <div className="container mx-auto px-4 py-4 lg:py-6 max-w-7xl">
        {/* Header - Ultra Compacto */}
        <header className="text-center mb-4 lg:mb-5">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="relative">
              <SparklesIcon className="w-6 h-6 lg:w-8 lg:h-8 text-indigo-600" />
              <div className="absolute inset-0 bg-indigo-400 blur-lg opacity-30 animate-pulse"></div>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              Dilo Mejor
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white shadow-sm border border-gray-200 text-xs ml-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  canUse ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              {canUse ? (
                <span className="text-gray-700">
                  <span className="font-semibold text-indigo-600">
                    {remainingUses}
                  </span>
                </span>
              ) : (
                <span className="text-red-600 font-medium">0</span>
              )}
            </div>
          </div>
          <p className="text-gray-500 text-xs lg:text-sm">
            Transforma tus frases con el tono perfecto
          </p>
        </header>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Input Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-5 lg:p-6 space-y-5">
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
                <span className="bg-white px-4 text-sm text-gray-500">
                  Personaliza el tono
                </span>
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
                w-full py-3 lg:py-4 rounded-xl font-semibold text-sm lg:text-base
                transition-all duration-300 flex items-center justify-center gap-2
                ${
                  isLoading || !canUse || phrase.length < 10
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                }
              `}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="w-5 h-5" />
                  <span>Mejorando...</span>
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
          </div>

          {/* Right Column - Result Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-5 lg:p-6 flex flex-col">
            {result ? (
              <ResultArea result={result} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-4 lg:p-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center">
                    <div className="relative">
                      <SparklesIcon className="w-12 h-12 lg:w-14 lg:h-14 text-gray-300" />
                      <div className="absolute inset-0 bg-gray-200 blur-xl opacity-30"></div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-400">
                      Tu frase mejorada aparecerá aquí
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-400 max-w-xs mx-auto">
                      Escribe tu frase, elige un tono y presiona el botón
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse"></div>
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-4 lg:mt-6">
          <p className="text-gray-500 text-xs lg:text-sm">
            Frases naturales y humanas • Hecho con cariño
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
