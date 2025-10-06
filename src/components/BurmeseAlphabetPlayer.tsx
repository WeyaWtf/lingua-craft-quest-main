import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye, CheckCircle } from "lucide-react";

interface BurmeseAlphabetPlayerProps {
  content: {
    k_row?: Array<{ char: string; romaji: string }>;
    s_row?: Array<{ char: string; romaji: string }>;
    t_row?: Array<{ char: string; romaji: string }>;
    t2_row?: Array<{ char: string; romaji: string }>;
    p_row?: Array<{ char: string; romaji: string }>;
    y_row?: Array<{ char: string; romaji: string }>;
    h_row?: Array<{ char: string; romaji: string }>;
  };
  onComplete?: () => void;
}

const BurmeseAlphabetPlayer = ({ content, onComplete }: BurmeseAlphabetPlayerProps) => {
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
    ...(content.k_row || []),
    ...(content.s_row || []),
    ...(content.t_row || []),
    ...(content.t2_row || []),
    ...(content.p_row || []),
    ...(content.y_row || []),
    ...(content.h_row || [])
  ];

  const rows = [
    { label: "k", chars: content.k_row || [] },
    { label: "s", chars: content.s_row || [] },
    { label: "t", chars: content.t_row || [] },
    { label: "t2", chars: content.t2_row || [] },
    { label: "p", chars: content.p_row || [] },
    { label: "y", chars: content.y_row || [] },
    { label: "h", chars: content.h_row || [] }
  ].filter(row => row.chars.length > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
        {/* Character rows */}
        <div className="space-y-3">
          {rows.map((row, rowIndex) => {
            // Special case for h_row: add empty cell at beginning
            const isHRow = row.label === "h";

            return (
              <div key={row.label}>
                <div className="grid grid-cols-[50px_repeat(5,1fr)] gap-2">
                  {/* Label */}
                  <div className="flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">{row.label}</span>
                  </div>

                  {/* Empty cell for h row */}
                  {isHRow && <div></div>}

                  {/* Characters */}
                  {row.chars.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleReveal(item.char)}
                      className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 rounded-lg p-3 transition-all hover:scale-105 active:scale-95 aspect-square flex flex-col items-center justify-center"
                    >
                      <div className="text-3xl font-bold text-slate-700 mb-1">
                        {item.char}
                      </div>
                      {revealedChars.has(item.char) && (
                        <div className="text-xs font-semibold text-blue-600 animate-fade-in">
                          {item.romaji}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Dashed separator after each row except the last */}
                {rowIndex < rows.length - 1 && (
                  <div className="border-b-2 border-dashed border-slate-300 my-3"></div>
                )}
              </div>
            );
          })}
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
              {onComplete && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={onComplete}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Valider
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurmeseAlphabetPlayer;
