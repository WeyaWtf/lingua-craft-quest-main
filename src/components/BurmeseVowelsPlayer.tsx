import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye, CheckCircle } from "lucide-react";

interface BurmeseVowelsPlayerProps {
  content: {
    independent_row?: Array<{ char: string; romaji: string }>;
    diacritics_row?: Array<{ char: string; romaji: string }>;
    diacritics2_row?: Array<{ char: string; romaji: string }>;
    medials_row?: Array<{ char: string; romaji: string }>;
    marks_row?: Array<{ char: string; romaji: string }>;
  };
  onComplete?: () => void;
}

const BurmeseVowelsPlayer = ({ content, onComplete }: BurmeseVowelsPlayerProps) => {
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
    ...(content.independent_row || []),
    ...(content.diacritics_row || []),
    ...(content.diacritics2_row || []),
    ...(content.medials_row || []),
    ...(content.marks_row || [])
  ];

  // Séparer les voyelles indépendantes en deux lignes
  const independentChars = content.independent_row || [];
  const independentRow1 = independentChars.length === 8 ? [
    independentChars[0], // အ
    independentChars[1], // ဣ
    independentChars[2], // ဤ
    independentChars[3], // ဥ
    independentChars[4]  // ဦ
  ] : independentChars;

  const independentRow2 = independentChars.length === 8 ? [
    independentChars[5], // ဩ
    independentChars[6], // ဪ
    independentChars[7]  // ဧ
  ] : [];

  const rows = [
    { label: "indep.", chars: independentRow1, isFirstIndepRow: true },
    { label: "", chars: independentRow2, isSecondIndepRow: true },
    { label: "diac.", chars: content.diacritics_row || [] },
    { label: "diac.2", chars: content.diacritics2_row || [] },
    { label: "medials", chars: content.medials_row || [] },
    { label: "marks", chars: content.marks_row || [] }
  ].filter(row => row.chars.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
        {/* Character rows */}
        <div className="space-y-3">
          {rows.map((row, rowIndex) => {
            const isSecondIndepRow = row.isSecondIndepRow;
            const showSeparator = rowIndex < rows.length - 1 && !row.isFirstIndepRow;

            return (
              <div key={`${row.label}-${rowIndex}`}>
                <div className="flex items-start gap-3">
                  {/* Label */}
                  <div className="flex items-center justify-center" style={{ width: "80px", minWidth: "80px" }}>
                    <span className="text-base font-bold text-blue-600">{row.label}</span>
                  </div>

                  {/* Characters grid - standardized width */}
                  <div className="flex flex-wrap gap-3">
                    {row.chars.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleReveal(item.char)}
                        className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 rounded-lg p-4 transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center"
                        style={{ width: "120px", height: "120px" }}
                      >
                        <div className="text-3xl font-bold text-slate-700 mb-1">
                          {item.char}
                        </div>
                        {revealedChars.has(item.char) && (
                          <div className="text-xs font-semibold text-blue-600 animate-fade-in text-center">
                            {item.romaji}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dashed separator after each row except the last and not after first indep row */}
                {showSeparator && (
                  <div className="border-b-2 border-dashed border-slate-300 my-4"></div>
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
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={onComplete}
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

export default BurmeseVowelsPlayer;
