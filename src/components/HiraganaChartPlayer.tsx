import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye } from "lucide-react";

interface HiraganaChartPlayerProps {
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

const HiraganaChartPlayer = ({ content }: HiraganaChartPlayerProps) => {
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
  ];

  // Structure en colonnes comme sur l'image
  const columns = [
    { header: "w", chars: [content.w_row?.[0], null, null, null, content.w_row?.[1]] },
    { header: "r", chars: content.r_row || [] },
    { header: "y", chars: [content.y_row?.[0], null, content.y_row?.[1], null, content.y_row?.[2]] },
    { header: "m", chars: content.m_row || [] },
    { header: "h", chars: content.h_row || [] },
    { header: "n", chars: content.n_row || [] },
    { header: "t", chars: content.t_row || [] },
    { header: "s", chars: content.s_row || [] },
    { header: "k", chars: content.k_row || [] },
    { header: "a", chars: content.vowels || [] }
  ];

  const rowLabels = ["n/m", "wa", "ra", "ya", "ma", "ha", "na", "ta", "sa", "ka", "a"];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-slate-100 rounded-xl border-2 border-slate-300 p-8 shadow-lg">
        {/* Grid layout matching the image */}
        <div className="grid grid-cols-11 gap-2">
          {/* Empty corner cell */}
          <div></div>

          {/* Column headers - visible with background */}
          {columns.map((col, idx) => (
            <div key={idx} className="text-center font-bold text-2xl text-slate-700 bg-slate-200 rounded-t-lg py-2">
              {col.header}
            </div>
          ))}

          {/* Rows */}
          {[0, 1, 2, 3, 4].map((rowIdx) => (
            <>
              {/* Row label on the left - visible with background */}
              <div key={`label-${rowIdx}`} className="flex items-center justify-center bg-slate-200 rounded-l-lg px-2">
                <span className="text-lg font-bold text-slate-700">
                  {rowIdx === 0 ? "a" : rowIdx === 1 ? "i" : rowIdx === 2 ? "u" : rowIdx === 3 ? "e" : "o"}
                </span>
              </div>

              {/* Cells in the row */}
              {columns.map((col, colIdx) => {
                const item = col.chars[rowIdx];

                if (!item) {
                  return <div key={`${rowIdx}-${colIdx}`}></div>;
                }

                return (
                  <button
                    key={`${rowIdx}-${colIdx}`}
                    onClick={() => toggleReveal(item.char)}
                    className="bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-lg p-3 transition-all hover:scale-105 active:scale-95 aspect-square flex flex-col items-center justify-center"
                  >
                    <div className="text-3xl font-bold text-white mb-1">
                      {item.char}
                    </div>
                    {revealedChars.has(item.char) && (
                      <div className="text-xs font-semibold text-blue-100 animate-fade-in text-center">
                        {item.romaji}
                      </div>
                    )}
                  </button>
                );
              })}
            </>
          ))}

          {/* Special n/m row at bottom */}
          <div className="flex items-center justify-center bg-slate-200 rounded-l-lg px-2">
            <span className="text-lg font-bold text-slate-700">n/m</span>
          </div>

          {/* Empty cells + ん at the end */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>

          {content.w_row?.[2] && (
            <button
              onClick={() => toggleReveal(content.w_row[2].char)}
              className="bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 rounded-lg p-3 transition-all hover:scale-105 active:scale-95 aspect-square flex flex-col items-center justify-center"
            >
              <div className="text-3xl font-bold text-white mb-1">
                {content.w_row[2].char}
              </div>
              {revealedChars.has(content.w_row[2].char) && (
                <div className="text-xs font-semibold text-blue-100 animate-fade-in text-center">
                  {content.w_row[2].romaji}
                </div>
              )}
            </button>
          )}
        </div>

        {/* Footer with progress */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
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

export default HiraganaChartPlayer;
