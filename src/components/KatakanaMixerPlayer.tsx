import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface KatakanaMixerPlayerProps {
  content: {
    vowels?: Array<{ char: string; romaji: string }>;
    k_row?: Array<{ char: string; romaji: string }>;
    s_row?: Array<{ char: string; romaji: string }>;
    t_row?: Array<{ char: string; romaji: string }>;
    n_row?: Array<{ char: string; romaji: string }>;
    h_row?: Array<{ char: string; romaji: string }>;
    m_row?: Array<{ char: string; romaji: string }>;
    y_row?: Array<{ char: string; romaji: string }>;
    r_row?: Array<{ char: string; romaji: string }>;
    w_row?: Array<{ char: string; romaji: string }>;
  };
}

const KatakanaMixerPlayer = ({ content }: KatakanaMixerPlayerProps) => {
  // Collecter tous les caractères
  const allChars = [
    ...(content.vowels || []),
    ...(content.k_row || []),
    ...(content.s_row || []),
    ...(content.t_row || []),
    ...(content.n_row || []),
    ...(content.h_row || []),
    ...(content.m_row || []),
    ...(content.y_row || []),
    ...(content.r_row || []),
    ...(content.w_row || [])
  ].filter(item => item && item.char);

  // Mélanger les caractères pour la liste à droite
  const [shuffledChars] = useState(() => {
    return [...allChars].sort(() => Math.random() - 0.5);
  });

  // État pour les caractères placés (key: "rowIdx-colIdx", value: char)
  const [placedChars, setPlacedChars] = useState<{ [key: string]: { char: string; romaji: string } }>({});

  // État pour tracker les erreurs par caractère
  const [errorCount, setErrorCount] = useState<{ [char: string]: number }>({});

  // Caractères disponibles (non encore placés)
  const availableChars = shuffledChars.filter(item =>
    !Object.values(placedChars).some(placed => placed.char === item.char)
  );

  // Structure en colonnes - tous les tableaux doivent avoir exactement 5 éléments
  const columns = [
    { header: "w", chars: [content.w_row?.[0] || null, null, null, null, content.w_row?.[1] || null] },
    { header: "r", chars: (content.r_row || []).slice(0, 5) },
    { header: "y", chars: [content.y_row?.[0] || null, null, content.y_row?.[1] || null, null, content.y_row?.[2] || null] },
    { header: "m", chars: (content.m_row || []).slice(0, 5) },
    { header: "h", chars: (content.h_row || []).slice(0, 5) },
    { header: "n", chars: (content.n_row || []).slice(0, 5) },
    { header: "t", chars: (content.t_row || []).slice(0, 5) },
    { header: "s", chars: (content.s_row || []).slice(0, 5) },
    { header: "k", chars: (content.k_row || []).slice(0, 5) },
    { header: "a", chars: (content.vowels || []).slice(0, 5) }
  ];

  const handleDrop = (e: React.DragEvent, rowIdx: number, colIdx: number, expectedChar?: string) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const draggedChar = JSON.parse(data);
    const key = `${rowIdx}-${colIdx}`;

    // Si le caractère est incorrect, incrémenter le compteur d'erreurs
    if (expectedChar && draggedChar.char !== expectedChar) {
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
    let total = 0;
    columns.forEach(col => {
      col.chars.forEach(item => {
        if (item) total++;
      });
    });
    // Ajouter le ン
    if (content.w_row?.[2]) total++;
    return total;
  };

  const getCorrectPlacements = () => {
    let correct = 0;
    columns.forEach((col, colIdx) => {
      col.chars.forEach((expectedItem, rowIdx) => {
        if (expectedItem) {
          const key = `${rowIdx}-${colIdx}`;
          const placed = placedChars[key];
          if (placed && placed.char === expectedItem.char) {
            correct++;
          }
        }
      });
    });
    // Vérifier le ン
    if (content.w_row?.[2]) {
      const key = "n-m";
      const placed = placedChars[key];
      if (placed && placed.char === content.w_row[2].char) {
        correct++;
      }
    }
    return correct;
  };

  const totalCells = getTotalCells();
  const correctPlacements = getCorrectPlacements();
  const progressPercentage = (correctPlacements / totalCells) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* Grille principale */}
        <div className="bg-slate-100 rounded-xl border-2 border-slate-300 p-8 shadow-lg">
          <div className="grid grid-cols-11 gap-2">
            {/* Empty corner cell */}
            <div></div>

            {/* Column headers */}
            {columns.map((col, idx) => (
              <div key={idx} className="text-center font-bold text-2xl text-slate-700 bg-slate-200 rounded-t-lg py-2">
                {col.header}
              </div>
            ))}

            {/* Rows */}
            {[0, 1, 2, 3, 4].map((rowIdx) => (
              <>
                {/* Row label */}
                <div key={`label-${rowIdx}`} className="flex items-center justify-center bg-slate-200 rounded-l-lg px-2">
                  <span className="text-lg font-bold text-slate-700">
                    {rowIdx === 0 ? "a" : rowIdx === 1 ? "i" : rowIdx === 2 ? "u" : rowIdx === 3 ? "e" : "o"}
                  </span>
                </div>

                {/* Cells */}
                {columns.map((col, colIdx) => {
                  const expectedItem = col.chars[rowIdx];
                  const key = `${rowIdx}-${colIdx}`;
                  const placedItem = placedChars[key];

                  if (!expectedItem) {
                    return <div key={`${rowIdx}-${colIdx}`}></div>;
                  }

                  const isCorrect = placedItem && placedItem.char === expectedItem.char;
                  const isIncorrect = placedItem && placedItem.char !== expectedItem.char;

                  return (
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      onDrop={(e) => handleDrop(e, rowIdx, colIdx, expectedItem.char)}
                      onDragOver={handleDragOver}
                      onClick={() => placedItem && handleRemoveChar(key)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        if (placedItem) handleRemoveChar(key);
                      }}
                      className={`border-2 border-dashed rounded-lg p-3 aspect-square flex flex-col items-center justify-center transition-all ${
                        isCorrect
                          ? "bg-green-400 border-green-600"
                          : isIncorrect
                          ? "bg-red-300 border-red-500 cursor-pointer hover:bg-red-400"
                          : "bg-white border-slate-400 hover:border-blue-500 hover:bg-blue-50"
                      } ${placedItem ? "cursor-pointer" : ""}`}
                    >
                      {placedItem && (
                        <>
                          <div className="text-3xl font-bold text-slate-800">
                            {placedItem.char}
                          </div>
                          {isCorrect && (
                            <div className="text-xs text-slate-600 mt-1">
                              {placedItem.romaji}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            ))}

            {/* Special n/m row */}
            <div className="flex items-center justify-center bg-slate-200 rounded-l-lg px-2">
              <span className="text-lg font-bold text-slate-700">n/m</span>
            </div>

            {/* Empty cells */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>

            {/* ン cell */}
            {content.w_row?.[2] && (
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  const data = e.dataTransfer.getData("application/json");
                  if (data) {
                    const draggedChar = JSON.parse(data);
                    // Tracker les erreurs pour ン
                    if (content.w_row?.[2] && draggedChar.char !== content.w_row[2].char) {
                      setErrorCount(prev => ({
                        ...prev,
                        [draggedChar.char]: (prev[draggedChar.char] || 0) + 1
                      }));
                    }
                    setPlacedChars(prev => ({ ...prev, "n-m": draggedChar }));
                  }
                }}
                onDragOver={handleDragOver}
                onClick={() => placedChars["n-m"] && handleRemoveChar("n-m")}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (placedChars["n-m"]) handleRemoveChar("n-m");
                }}
                className={`border-2 border-dashed rounded-lg p-3 aspect-square flex flex-col items-center justify-center transition-all ${
                  placedChars["n-m"] && placedChars["n-m"].char === content.w_row[2].char
                    ? "bg-green-400 border-green-600"
                    : placedChars["n-m"]
                    ? "bg-red-300 border-red-500 cursor-pointer hover:bg-red-400"
                    : "bg-white border-slate-400 hover:border-blue-500 hover:bg-blue-50"
                } ${placedChars["n-m"] ? "cursor-pointer" : ""}`}
              >
                {placedChars["n-m"] && (
                  <>
                    <div className="text-3xl font-bold text-slate-800">
                      {placedChars["n-m"].char}
                    </div>
                    {placedChars["n-m"].char === content.w_row[2].char && (
                      <div className="text-xs text-slate-600 mt-1">
                        {placedChars["n-m"].romaji}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
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

export default KatakanaMixerPlayer;
