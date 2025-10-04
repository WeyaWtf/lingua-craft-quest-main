import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye } from "lucide-react";

interface HangeulChartPlayerProps {
  content: {
    basic_consonants?: Array<{ char: string; romanization: string }>;
    complex_consonants?: Array<{ char: string; romanization: string }>;
    basic_vowels?: Array<{ char: string; romanization: string }>;
    complex_vowels?: Array<{ char: string; romanization: string }>;
  };
}

const HangeulChartPlayer = ({ content }: HangeulChartPlayerProps) => {
  const [revealedChars, setRevealedChars] = useState<Set<string>>(new Set());

  const toggleReveal = (char: string) => {
    const newRevealed = new Set(revealedChars);
    if (newRevealed.has(char)) {
      newRevealed.delete(char);
    } else {
      newRevealed.add(char);
    }
    setRevealedChars(newRevealed);
  };

  const allChars = [
    ...(content.basic_consonants || []),
    ...(content.complex_consonants || []),
    ...(content.basic_vowels || []),
    ...(content.complex_vowels || [])
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-slate-100 rounded-xl border-2 border-slate-300 p-8 shadow-lg">

        {/* 14 Basic Consonants */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-700 mb-4">14 BASIC CONSONANTS:</h3>
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
            {(content.basic_consonants || []).map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleReveal(item.char)}
                className="bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-lg p-4 transition-all hover:scale-105 active:scale-95 aspect-square flex flex-col items-center justify-center"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {item.char}
                </div>
                {revealedChars.has(item.char) && (
                  <div className="text-xs font-semibold text-blue-100 animate-fade-in text-center">
                    {item.romanization}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Complex Consonants */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-700 mb-4">5 COMPLEX CONSONANTS:</h3>
          <div className="grid grid-cols-5 gap-2 max-w-xl">
            {(content.complex_consonants || []).map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleReveal(item.char)}
                className="bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-lg p-4 transition-all hover:scale-105 active:scale-95 aspect-square flex flex-col items-center justify-center"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {item.char}
                </div>
                {revealedChars.has(item.char) && (
                  <div className="text-xs font-semibold text-blue-100 animate-fade-in text-center">
                    {item.romanization}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Basic Vowels */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-700 mb-4">10 BASIC VOWELS:</h3>
          <div className="grid grid-cols-10 gap-2">
            {(content.basic_vowels || []).map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleReveal(item.char)}
                className="bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-lg p-4 transition-all hover:scale-105 active:scale-95 aspect-square flex flex-col items-center justify-center"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {item.char}
                </div>
                {revealedChars.has(item.char) && (
                  <div className="text-xs font-semibold text-blue-100 animate-fade-in text-center">
                    {item.romanization}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 11 Complex Vowels */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-700 mb-4">11 COMPLEX VOWELS:</h3>
          <div className="grid grid-cols-11 gap-2">
            {(content.complex_vowels || []).map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleReveal(item.char)}
                className="bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-lg p-4 transition-all hover:scale-105 active:scale-95 aspect-square flex flex-col items-center justify-center"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {item.char}
                </div>
                {revealedChars.has(item.char) && (
                  <div className="text-xs font-semibold text-blue-100 animate-fade-in text-center">
                    {item.romanization}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer with progress */}
        <div className="mt-6 pt-6 border-t border-slate-300">
          <div className="text-center">
            <p className="text-sm text-slate-600">
              {revealedChars.size} / {allChars.length} caractères révélés
            </p>
            <div className="flex gap-3 justify-center mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRevealedChars(new Set())}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRevealedChars(new Set(allChars.map(c => c.char)))}
              >
                <Eye className="w-4 h-4 mr-2" />
                Afficher tout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HangeulChartPlayer;
