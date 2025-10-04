import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Keyboard, X } from "lucide-react";

interface BurmeseKeyboardProps {
  onInsert: (char: string) => void;
}

const BurmeseKeyboard = ({ onInsert }: BurmeseKeyboardProps) => {
  const [showKeyboard, setShowKeyboard] = useState(false);

  const consonants = [
    { label: "k", chars: ["က", "ခ", "ဂ", "ဃ", "င"] },
    { label: "c", chars: ["စ", "ဆ", "ဇ", "ဈ", "ည"] },
    { label: "T", chars: ["ဋ", "ဌ", "ဍ", "ဎ", "ဏ"] },
    { label: "t", chars: ["တ", "ထ", "ဒ", "ဓ", "န"] },
    { label: "p", chars: ["ပ", "ဖ", "ဗ", "ဘ", "မ"] },
    { label: "y", chars: ["ယ", "ရ", "လ", "ဝ", "သ"] },
    { label: "h", chars: ["ဟ", "ဠ", "အ"] }
  ];

  const vowels = [
    { label: "ā/a", chars: ["◌ါ", "◌ာ", "◌ၚ", "◌ံ", "◌ိံ", "◌ေ"] },
    { label: "i/ī", chars: ["◌ိ", "◌ီ", "◌ံ", "◌ိံ", "◌ေ"] },
    { label: "u/ū", chars: ["◌ု", "◌ူ"] },
    { label: "e", chars: ["◌ေ"] },
    { label: "o", chars: ["◌ော", "◌ော်"] },
    { label: "ô", chars: ["◌ော်"] },
    { label: "ai", chars: ["◌ဲ", "◌ံ", "◌ဲ့"] },
    { label: "au", chars: ["◌ော", "◌ေား", "◌ို"] }
  ];

  const medials = [
    { label: "medials", chars: ["◌ျ", "◌ြ", "◌ွ", "◌ှ"] }
  ];

  const numbers = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];

  if (!showKeyboard) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowKeyboard(true)}
        className="fixed bottom-4 right-4 z-50 shadow-lg"
        title="Afficher le clavier birman"
      >
        <Keyboard className="w-4 h-4 mr-2" />
        Clavier birman
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card border-2 border-border rounded-xl shadow-2xl p-4 max-w-4xl max-h-[80vh] overflow-y-auto animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Keyboard className="w-5 h-5" />
          Clavier birman
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowKeyboard(false)}
          className="h-8 w-8"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Consonants */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-semibold">Consonnes</p>
        <div className="space-y-2">
          {consonants.map((row) => (
            <div key={row.label} className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary w-8">{row.label}</span>
              <div className="flex gap-1 flex-wrap">
                {row.chars.map((char) => (
                  <button
                    key={char}
                    onClick={() => onInsert(char)}
                    className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded px-3 py-2 text-xl font-bold text-slate-700 transition-all hover:scale-105 active:scale-95 min-w-[45px]"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vowels */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-semibold">Voyelles</p>
        <div className="grid grid-cols-2 gap-2">
          {vowels.map((row) => (
            <div key={row.label} className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-600 w-12">{row.label}</span>
              <div className="flex gap-1 flex-wrap">
                {row.chars.map((char, idx) => (
                  <button
                    key={`${char}-${idx}`}
                    onClick={() => onInsert(char)}
                    className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded px-2 py-1 text-lg font-bold text-slate-700 transition-all hover:scale-105 active:scale-95 min-w-[40px]"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medials */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-semibold">Médiales</p>
        <div className="flex gap-1">
          {medials[0].chars.map((char) => (
            <button
              key={char}
              onClick={() => onInsert(char)}
              className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded px-3 py-2 text-xl font-bold text-slate-700 transition-all hover:scale-105 active:scale-95"
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* Numbers */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-semibold">Chiffres</p>
        <div className="flex gap-1 flex-wrap">
          {numbers.map((num, idx) => (
            <button
              key={num}
              onClick={() => onInsert(num)}
              className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded px-3 py-2 text-lg font-bold text-slate-700 transition-all hover:scale-105 active:scale-95 min-w-[40px]"
            >
              <div>{num}</div>
              <div className="text-xs text-muted-foreground">{idx}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BurmeseKeyboard;
