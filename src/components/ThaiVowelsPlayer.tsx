import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye } from "lucide-react";

interface ThaiVowelsPlayerProps {
  content: {
    vowels_simple_row?: Array<{ char: string; romaji: string }>;
    vowels_complex_row?: Array<{ char: string; romaji: string }>;
    tone_marks_row?: Array<{ char: string; romaji: string }>;
    special_marks_row?: Array<{ char: string; romaji: string }>;
    numbers_row?: Array<{ char: string; romaji: string }>;
  };
}

const ThaiVowelsPlayer = ({ content }: ThaiVowelsPlayerProps) => {
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
    ...(content.vowels_simple_row || []),
    ...(content.vowels_complex_row || []),
    ...(content.tone_marks_row || []),
    ...(content.special_marks_row || []),
    ...(content.numbers_row || [])
  ];

  const rows = [
    { label: "Simple Vowels", chars: content.vowels_simple_row || [] },
    { label: "Complex Vowels", chars: content.vowels_complex_row || [] },
    { label: "Tone Marks", chars: content.tone_marks_row || [] },
    { label: "Special Marks", chars: content.special_marks_row || [] },
    { label: "Numbers", chars: content.numbers_row || [] }
  ].filter(row => row.chars.length > 0);

  return (
    <div className="max-w-full mx-auto px-4">
      <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
        {/* Character rows */}
        <div className="space-y-2">
          {rows.map((row) => {
            const shouldWrap = row.chars.length > 12;

            return (
              <div key={row.label}>
                <div className="mb-4">
                  <div className="flex items-start gap-2">
                    {/* Label */}
                    <div className="flex items-center justify-center" style={{ width: "150px", minWidth: "150px" }}>
                      <span className="text-base font-bold text-blue-600">{row.label}</span>
                    </div>

                    {/* Characters grid - wrapping allowed */}
                    <div className={`flex-1 grid gap-2 ${shouldWrap ? 'grid-cols-12' : ''}`} style={!shouldWrap ? { gridTemplateColumns: `repeat(${row.chars.length}, 1fr)` } : {}}>
                      {row.chars.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => toggleReveal(item.char)}
                          className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 rounded-lg p-4 transition-all hover:scale-105 active:scale-95 min-h-[100px] flex flex-col items-center justify-center"
                        >
                          <div className="text-4xl font-bold text-slate-700 mb-2">
                            {item.char}
                          </div>
                          {revealedChars.has(item.char) && (
                            <div className="text-sm font-semibold text-blue-600 animate-fade-in">
                              {item.romaji}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dashed separator between rows */}
                <div className="border-b-2 border-dashed border-slate-300 mb-4"></div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThaiVowelsPlayer;
