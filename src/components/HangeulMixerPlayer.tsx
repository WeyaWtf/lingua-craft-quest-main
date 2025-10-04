import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface HangeulMixerPlayerProps {
  content: {
    basic_consonants?: Array<{ char: string; romanization: string }>;
    complex_consonants?: Array<{ char: string; romanization: string }>;
    basic_vowels?: Array<{ char: string; romanization: string }>;
    complex_vowels?: Array<{ char: string; romanization: string }>;
  };
}

const HangeulMixerPlayer = ({ content }: HangeulMixerPlayerProps) => {
  const sections = [
    { label: "14 Basic Consonants", chars: content.basic_consonants || [], cols: 14 },
    { label: "5 Complex Consonants", chars: content.complex_consonants || [], cols: 5 },
    { label: "10 Basic Vowels", chars: content.basic_vowels || [], cols: 10 },
    { label: "11 Complex Vowels", chars: content.complex_vowels || [], cols: 11 }
  ];

  const allChars = [
    ...(content.basic_consonants || []),
    ...(content.complex_consonants || []),
    ...(content.basic_vowels || []),
    ...(content.complex_vowels || [])
  ];

  const [placedChars, setPlacedChars] = useState<{ [key: string]: { char: string; romanization: string } }>({});
  const [errorCount, setErrorCount] = useState<{ [char: string]: number }>({});

  const handleDragStart = (e: React.DragEvent, char: { char: string; romanization: string }) => {
    e.dataTransfer.setData("application/json", JSON.stringify(char));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, sectionIdx: number, charIdx: number, expectedChar: string) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const draggedChar = JSON.parse(data);
    const key = `${sectionIdx}-${charIdx}`;

    if (draggedChar.char !== expectedChar) {
      setErrorCount(prev => ({
        ...prev,
        [draggedChar.char]: (prev[draggedChar.char] || 0) + 1
      }));
    }

    setPlacedChars(prev => ({ ...prev, [key]: draggedChar }));
  };

  const handleRemoveChar = (key: string) => {
    setPlacedChars(prev => {
      const newPlaced = { ...prev };
      delete newPlaced[key];
      return newPlaced;
    });
  };

  const getAvailableChars = () => {
    const placedCharValues = Object.values(placedChars).map(c => c.char);
    return allChars.filter(char => !placedCharValues.includes(char.char));
  };

  const handleReset = () => {
    setPlacedChars({});
    setErrorCount({});
  };

  const getTotalCorrect = () => {
    let correct = 0;
    sections.forEach((section, sectionIdx) => {
      section.chars.forEach((char, charIdx) => {
        const key = `${sectionIdx}-${charIdx}`;
        const placed = placedChars[key];
        if (placed && placed.char === char.char) {
          correct++;
        }
      });
    });
    return correct;
  };

  const totalChars = allChars.length;
  const correctCount = getTotalCorrect();
  const progress = totalChars > 0 ? Math.round((correctCount / totalChars) * 100) : 0;

  return (
    <div className="max-w-full mx-auto px-4">
      <div className="flex gap-5">
        {/* Main grid area */}
        <div className="flex-1 bg-slate-100 rounded-xl border-2 border-slate-300 p-10 shadow-lg">
          <div className="space-y-5">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="text-base font-bold text-slate-700 mb-2">{section.label}:</h3>
                <div className="flex flex-wrap gap-2">
                  {section.chars.map((char, charIdx) => {
                    const key = `${sectionIdx}-${charIdx}`;
                    const placed = placedChars[key];
                    const isCorrect = placed && placed.char === char.char;
                    const isIncorrect = placed && placed.char !== char.char;

                    return (
                      <div
                        key={charIdx}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, sectionIdx, charIdx, char.char)}
                        onClick={() => {
                          if (isIncorrect && placed) {
                            handleRemoveChar(key);
                          }
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          if (isIncorrect && placed) {
                            handleRemoveChar(key);
                          }
                        }}
                        style={{ width: '64px', height: '64px' }}
                        className={`border-2 border-dashed rounded-lg p-2 flex flex-col items-center justify-center transition-all ${
                          isCorrect
                            ? "bg-green-100 border-green-500"
                            : isIncorrect
                            ? "bg-red-100 border-red-500 cursor-pointer hover:bg-red-200"
                            : "bg-white border-slate-400 hover:border-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {placed && (
                          <>
                            <div className="text-xl font-bold text-slate-800 mb-1">
                              {placed.char}
                            </div>
                            {isCorrect && (
                              <div className="text-[10px] font-semibold text-green-700 text-center">
                                {placed.romanization}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Dashed separator between sections except after the last one */}
                {sectionIdx < sections.length - 1 && (
                  <div className="border-t border-dashed border-slate-400 my-5"></div>
                )}
              </div>
            ))}
          </div>

          {/* Progress and Reset Button */}
          <div className="mt-8 pt-6 border-t border-slate-300">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-slate-600">
                Progression: <span className="font-bold text-slate-800">{correctCount} / {totalChars}</span> ({progress}%)
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Réinitialiser
              </Button>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Error Report */}
          {Object.keys(errorCount).length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-300">
              <h4 className="text-lg font-bold text-slate-700 mb-3">Rapport d'erreurs</h4>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {Object.entries(errorCount)
                  .sort((a, b) => b[1] - a[1])
                  .map(([char, count]) => {
                    const charInfo = allChars.find(c => c.char === char);
                    return (
                      <div
                        key={char}
                        className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl font-bold text-slate-800">{char}</div>
                          {charInfo && (
                            <div className="text-sm text-slate-600">{charInfo.romanization}</div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600">Erreurs:</span>
                          <span className="text-lg font-bold text-red-600">{count}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Available Characters Sidebar */}
        <div className="w-64 bg-white rounded-xl border-2 border-blue-300 p-5 shadow-lg">
          <h3 className="text-base font-bold text-slate-700 mb-3">
            Caractères à placer ({getAvailableChars().length})
          </h3>
          <div className="grid grid-cols-3 gap-2 max-h-[calc(100vh-250px)] overflow-y-auto">
            {getAvailableChars().map((char, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => handleDragStart(e, char)}
                className="bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-lg p-2 cursor-move transition-all hover:scale-105 active:scale-95 aspect-square flex items-center justify-center"
              >
                <div className="text-xl font-bold text-white text-center">
                  {char.char}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HangeulMixerPlayer;
