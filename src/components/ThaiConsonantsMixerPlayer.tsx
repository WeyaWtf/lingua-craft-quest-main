import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ThaiConsonantsMixerPlayerProps {
  content: {
    high_class_row?: Array<{ char: string; romaji: string }>;
    middle_class_row?: Array<{ char: string; romaji: string }>;
    low_class_row?: Array<{ char: string; romaji: string }>;
  };
}

const ThaiConsonantsMixerPlayer = ({ content }: ThaiConsonantsMixerPlayerProps) => {
  // Collecter tous les caractères
  const allChars = [
    ...(content.high_class_row || []),
    ...(content.middle_class_row || []),
    ...(content.low_class_row || [])
  ].filter(item => item && item.char);

  // Mélanger les caractères pour la liste à droite
  const [shuffledChars] = useState(() => {
    return [...allChars].sort(() => Math.random() - 0.5);
  });

  // État pour les caractères placés (key: "rowLabel-charIdx", value: char)
  const [placedChars, setPlacedChars] = useState<{ [key: string]: { char: string; romaji: string } }>({});

  // État pour tracker les erreurs par caractère
  const [errorCount, setErrorCount] = useState<{ [char: string]: number }>({});

  // Caractères disponibles (non encore placés)
  const availableChars = shuffledChars.filter(item =>
    !Object.values(placedChars).some(placed => placed.char === item.char)
  );

  // Structure en lignes
  const rows = [
    { label: "High Class", chars: content.high_class_row || [] },
    { label: "Middle Class", chars: content.middle_class_row || [] },
    { label: "Low Class", chars: content.low_class_row || [] }
  ].filter(row => row.chars.length > 0);

  const handleDrop = (e: React.DragEvent, rowLabel: string, charIdx: number, expectedChar: string) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const draggedChar = JSON.parse(data);
    const key = `${rowLabel}-${charIdx}`;

    // Si le caractère est incorrect, incrémenter le compteur d'erreurs
    if (draggedChar.char !== expectedChar) {
      setErrorCount(prev => ({
        ...prev,
        [draggedChar.char]: (prev[draggedChar.char] || 0) + 1
      }));
    }

    // Placer le caractère
    setPlacedChars(prev => ({
      ...prev,
      [key]: draggedChar
    }));
  };

  const handleDragStart = (e: React.DragEvent, char: { char: string; romaji: string }) => {
    e.dataTransfer.setData("application/json", JSON.stringify(char));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setPlacedChars({});
  };

  const handleRemoveChar = (key: string) => {
    setPlacedChars(prev => {
      const newPlaced = { ...prev };
      delete newPlaced[key];
      return newPlaced;
    });
  };

  // Calculer le score
  const getTotalCells = () => {
    return allChars.length;
  };

  const getCorrectPlacements = () => {
    let correct = 0;
    rows.forEach(row => {
      row.chars.forEach((expectedItem, charIdx) => {
        const key = `${row.label}-${charIdx}`;
        const placed = placedChars[key];
        if (placed && placed.char === expectedItem.char) {
          correct++;
        }
      });
    });
    return correct;
  };

  const totalCells = getTotalCells();
  const correctPlacements = getCorrectPlacements();
  const progressPercentage = (correctPlacements / totalCells) * 100;

  return (
    <div className="max-w-full mx-auto px-4">
      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* Grille principale */}
        <div className="bg-slate-100 rounded-xl border-2 border-slate-300 p-12 shadow-lg">
          <div className="space-y-4">
            {rows.map((row) => {
              const shouldWrap = row.chars.length > 12;

              return (
                <div key={row.label}>
                  <div className="flex items-start gap-5">
                    {/* Label */}
                    <div className="flex items-center justify-center bg-slate-200 rounded-lg px-5" style={{ width: "144px", minWidth: "144px" }}>
                      <span className="text-base font-bold text-slate-700">{row.label}</span>
                    </div>

                    {/* Characters grid - wrapping allowed for Low Class */}
                    <div className={`flex-1 grid gap-3 ${shouldWrap ? 'grid-cols-12' : ''}`} style={!shouldWrap ? { gridTemplateColumns: `repeat(${row.chars.length}, 1fr)` } : {}}>
                      {row.chars.map((expectedItem, charIdx) => {
                        const key = `${row.label}-${charIdx}`;
                        const placedItem = placedChars[key];
                        const isCorrect = placedItem && placedItem.char === expectedItem.char;
                        const isIncorrect = placedItem && placedItem.char !== expectedItem.char;

                        return (
                          <div
                            key={charIdx}
                            onDrop={(e) => handleDrop(e, row.label, charIdx, expectedItem.char)}
                            onDragOver={handleDragOver}
                            onClick={() => placedItem && handleRemoveChar(key)}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              if (placedItem) handleRemoveChar(key);
                            }}
                            className={`border-2 border-dashed rounded-lg p-4 aspect-square flex flex-col items-center justify-center transition-all min-h-[80px] ${
                              isCorrect
                                ? "bg-green-400 border-green-600"
                                : isIncorrect
                                ? "bg-red-300 border-red-500 cursor-pointer hover:bg-red-400"
                                : "bg-white border-slate-400 hover:border-blue-500 hover:bg-blue-50"
                            } ${placedItem ? "cursor-pointer" : ""}`}
                          >
                            {placedItem && (
                              <>
                                <div className="text-4xl font-bold text-slate-800">
                                  {placedItem.char}
                                </div>
                                {isCorrect && (
                                  <div className="text-sm text-slate-600 mt-1">
                                    {placedItem.romaji}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dashed separator */}
                  {row.label !== "Low Class" && (
                    <div className="border-t border-dashed border-slate-400 my-4"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress */}
          <div className="mt-6 pt-6 border-t border-slate-300">
            <div className="text-center">
              <p className="text-lg font-semibold text-slate-700 mb-2">
                {correctPlacements} / {totalCells} correct ({Math.round(progressPercentage)}%)
              </p>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des caractères à droite */}
        <div className="bg-white rounded-xl border-2 border-slate-300 p-6 shadow-lg">
          <h3 className="text-xl font-bold text-slate-700 mb-4">Caractères à placer</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {availableChars.map((item, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-lg p-4 cursor-move transition-all hover:scale-105 active:scale-95"
              >
                <div className="text-3xl font-bold text-white text-center">
                  {item.char}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleReset}
            className="w-full mt-4"
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>

          {/* Tableau des erreurs */}
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
                          <div className="text-2xl font-bold text-slate-800">
                            {char}
                          </div>
                          {charInfo && (
                            <div className="text-sm text-slate-600">
                              {charInfo.romaji}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600">Erreurs:</span>
                          <span className="text-lg font-bold text-red-600">
                            {count}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThaiConsonantsMixerPlayer;
