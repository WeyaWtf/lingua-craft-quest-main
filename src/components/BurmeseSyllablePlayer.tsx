import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RotateCcw, Eye, CheckCircle } from "lucide-react";

interface SyllableData {
  consonant: string;
  romanization: string;
  open_vowels: {
    a: Array<{ tone: string; burmese: string; rom: string; ipa: string }>;
    i: Array<{ tone: string; burmese: string; rom: string; ipa: string }>;
    u: Array<{ tone: string; burmese: string; rom: string; ipa: string }>;
    e: Array<{ tone: string; burmese: string; rom: string; ipa: string }>;
    o: Array<{ tone: string; burmese: string; rom: string; ipa: string }>;
  };
  stopped_finals: Array<{ rime: string; burmese: string; rom: string; ipa: string }>;
  nasal_finals: {
    ang: Array<{ tone: string; burmese: string; rom: string; ipa: string }>;
    an: Array<{ tone: string; burmese: string; rom: string; ipa: string }>;
    aung: Array<{ tone: string; burmese: string; rom: string; ipa: string }>;
  };
  medials: Array<{ medial: string; burmese: string; rom: string; ipa: string }>;
}

interface BurmeseSyllablePlayerProps {
  content: {
    syllables: SyllableData[];
  };
  onComplete?: () => void;
}

const BurmeseSyllablePlayer = ({ content, onComplete }: BurmeseSyllablePlayerProps) => {
  const [revealedSyllables, setRevealedSyllables] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState(content.syllables[0]?.consonant || "က");

  const toggleReveal = (syllable: string) => {
    const newRevealed = new Set(revealedSyllables);
    if (newRevealed.has(syllable)) {
      newRevealed.delete(syllable);
    } else {
      newRevealed.add(syllable);
    }
    setRevealedSyllables(newRevealed);
  };

  const countTotalSyllables = () => {
    return content.syllables.reduce((total, consonant) => {
      let count = 0;
      // Open vowels: 5 vowels × 3 tones = 15
      count += 15;
      // Stopped finals
      count += consonant.stopped_finals.length;
      // Nasal finals: 3 groups × 3 tones = 9
      count += 9;
      // Medials
      count += consonant.medials.length;
      return total + count;
    }, 0);
  };

  const totalSyllables = countTotalSyllables();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-card rounded-xl border border-border shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
          <h1 className="text-3xl font-bold text-center mb-2">
            🇲🇲 Encyclopédie des Syllabes Birmanes
          </h1>
          <p className="text-center text-blue-100">
            Un guide complet sur les consonnes, voyelles, tons et finales
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-0 z-10 bg-card border-b border-border">
            <TabsList className="flex overflow-x-auto bg-slate-100 p-2 rounded-none scrollbar-thin">
              {content.syllables.map((syllable) => (
                <TabsTrigger
                  key={syllable.consonant}
                  value={syllable.consonant}
                  className="px-4 py-2 min-w-[80px] data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <span className="text-xl font-bold">{syllable.consonant}</span>
                  <span className="ml-2 text-sm">{syllable.romanization}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {content.syllables.map((syllable) => (
            <TabsContent key={syllable.consonant} value={syllable.consonant} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Voyelles Ouvertes */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                    Voyelles Ouvertes (par Ton)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-blue-500 text-white">
                          <th className="p-3 text-left">Son</th>
                          <th className="p-3 text-center">Ton Grinçant</th>
                          <th className="p-3 text-center">Ton Bas</th>
                          <th className="p-3 text-center">Ton Haut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(syllable.open_vowels).map(([vowel, tones]) => (
                          <tr key={vowel} className="border-b border-slate-200 hover:bg-blue-50">
                            <td className="p-3 font-semibold text-slate-700">/{ vowel }/</td>
                            {tones.map((tone, idx) => (
                              <td key={idx} className="p-3 text-center">
                                <button
                                  onClick={() => toggleReveal(tone.burmese)}
                                  className="w-full p-2 rounded hover:bg-slate-100 transition-all"
                                >
                                  <div className="text-4xl font-bold text-slate-700 mb-1">
                                    {tone.burmese}
                                  </div>
                                  {revealedSyllables.has(tone.burmese) && (
                                    <div className="animate-fade-in">
                                      <div className="text-sm font-bold text-red-600">
                                        {tone.rom}
                                      </div>
                                      <div className="text-xs text-green-600 italic">
                                        {tone.ipa}
                                      </div>
                                    </div>
                                  )}
                                </button>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Voyelles à Finale Stoppée */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                    Voyelles à Finale Stoppée
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-blue-500 text-white">
                          <th className="p-3 text-left">Rime</th>
                          <th className="p-3 text-center">Graphème</th>
                          <th className="p-3 text-left">Translittération</th>
                          <th className="p-3 text-left">Prononciation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {syllable.stopped_finals.map((final, idx) => (
                          <tr key={idx} className="border-b border-slate-200 hover:bg-blue-50">
                            <td className="p-3 font-semibold text-slate-700">{final.rime}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => toggleReveal(final.burmese)}
                                className="w-full p-2 rounded hover:bg-slate-100 transition-all"
                              >
                                <div className="text-4xl font-bold text-slate-700">
                                  {final.burmese}
                                </div>
                              </button>
                            </td>
                            <td className="p-3">
                              {revealedSyllables.has(final.burmese) && (
                                <span className="text-sm font-bold text-red-600 animate-fade-in">
                                  {final.rom}
                                </span>
                              )}
                            </td>
                            <td className="p-3">
                              {revealedSyllables.has(final.burmese) && (
                                <span className="text-sm text-green-600 italic animate-fade-in">
                                  {final.ipa}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Voyelles à Finale Nasale */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                    Voyelles à Finale Nasale
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-blue-500 text-white">
                          <th className="p-3 text-left">Son</th>
                          <th className="p-3 text-center">Ton Grinçant</th>
                          <th className="p-3 text-center">Ton Bas</th>
                          <th className="p-3 text-center">Ton Haut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(syllable.nasal_finals).map(([nasal, tones]) => (
                          <tr key={nasal} className="border-b border-slate-200 hover:bg-blue-50">
                            <td className="p-3 font-semibold text-slate-700">
                              /-{nasal === 'ang' ? 'aŋ' : nasal === 'an' ? 'an' : 'aʊŋ'}/
                            </td>
                            {tones.map((tone, idx) => (
                              <td key={idx} className="p-3 text-center">
                                <button
                                  onClick={() => toggleReveal(tone.burmese)}
                                  className="w-full p-2 rounded hover:bg-slate-100 transition-all"
                                >
                                  <div className="text-4xl font-bold text-slate-700 mb-1">
                                    {tone.burmese}
                                  </div>
                                  {revealedSyllables.has(tone.burmese) && (
                                    <div className="animate-fade-in">
                                      <div className="text-sm font-bold text-red-600">
                                        {tone.rom}
                                      </div>
                                      <div className="text-xs text-green-600 italic">
                                        {tone.ipa}
                                      </div>
                                    </div>
                                  )}
                                </button>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Combinaisons avec Médiales */}
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                    Combinaisons avec Médiales
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-blue-500 text-white">
                          <th className="p-3 text-left">Médiale</th>
                          <th className="p-3 text-center">Graphème</th>
                          <th className="p-3 text-left">Translittération</th>
                          <th className="p-3 text-left">Prononciation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {syllable.medials.map((medial, idx) => (
                          <tr key={idx} className="border-b border-slate-200 hover:bg-blue-50">
                            <td className="p-3 font-semibold text-slate-700">{medial.medial}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => toggleReveal(medial.burmese)}
                                className="w-full p-2 rounded hover:bg-slate-100 transition-all"
                              >
                                <div className="text-4xl font-bold text-slate-700">
                                  {medial.burmese}
                                </div>
                              </button>
                            </td>
                            <td className="p-3">
                              {revealedSyllables.has(medial.burmese) && (
                                <span className="text-sm font-bold text-red-600 animate-fade-in">
                                  {medial.rom}
                                </span>
                              )}
                            </td>
                            <td className="p-3">
                              {revealedSyllables.has(medial.burmese) && (
                                <span className="text-sm text-green-600 italic animate-fade-in">
                                  {medial.ipa}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Footer avec progression */}
        <div className="mt-6 p-6 border-t border-border bg-slate-50">
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold text-slate-700">
              {revealedSyllables.size} / {totalSyllables} syllabes révélées
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button
                variant="outline"
                onClick={() => setRevealedSyllables(new Set())}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const allSyllables = new Set<string>();
                  content.syllables.forEach(consonant => {
                    Object.values(consonant.open_vowels).forEach(tones => {
                      tones.forEach(tone => allSyllables.add(tone.burmese));
                    });
                    consonant.stopped_finals.forEach(f => allSyllables.add(f.burmese));
                    Object.values(consonant.nasal_finals).forEach(tones => {
                      tones.forEach(tone => allSyllables.add(tone.burmese));
                    });
                    consonant.medials.forEach(m => allSyllables.add(m.burmese));
                  });
                  setRevealedSyllables(allSyllables);
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Afficher tout
              </Button>
              {onComplete && (
                <Button
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

export default BurmeseSyllablePlayer;
