import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import { CheckCircle, AlertCircle } from "lucide-react";

const FixAllLearningPaths = () => {
  const navigate = useNavigate();
  const [isFixing, setIsFixing] = useState(false);
  const [results, setResults] = useState<Array<{ path: string; success: boolean; message: string }>>([]);

  const createStructure = () => {
    return [
      {
        id: "ch-100",
        title: "Chapter 1-100",
        type: "chapter",
        subchapters: [
          { id: "sch-25", title: "Subchapter 1-25", type: "subchapter", exerciseIds: [] },
          { id: "sch-50", title: "Subchapter 26-50", type: "subchapter", exerciseIds: [] },
          { id: "sch-75", title: "Subchapter 51-75", type: "subchapter", exerciseIds: [] },
          { id: "sch-100", title: "Subchapter 76-100", type: "subchapter", exerciseIds: [] }
        ]
      },
      {
        id: "ch-200",
        title: "Chapter 101-200",
        type: "chapter",
        subchapters: [
          { id: "sch-125", title: "Subchapter 101-125", type: "subchapter", exerciseIds: [] },
          { id: "sch-150", title: "Subchapter 126-150", type: "subchapter", exerciseIds: [] },
          { id: "sch-175", title: "Subchapter 151-175", type: "subchapter", exerciseIds: [] },
          { id: "sch-200", title: "Subchapter 176-200", type: "subchapter", exerciseIds: [] }
        ]
      },
      {
        id: "ch-300",
        title: "Chapter 201-300",
        type: "chapter",
        subchapters: [
          { id: "sch-225", title: "Subchapter 201-225", type: "subchapter", exerciseIds: [] },
          { id: "sch-250", title: "Subchapter 226-250", type: "subchapter", exerciseIds: [] },
          { id: "sch-275", title: "Subchapter 251-275", type: "subchapter", exerciseIds: [] },
          { id: "sch-300", title: "Subchapter 276-300", type: "subchapter", exerciseIds: [] }
        ]
      },
      {
        id: "ch-400",
        title: "Chapter 301-400",
        type: "chapter",
        subchapters: [
          { id: "sch-325", title: "Subchapter 301-325", type: "subchapter", exerciseIds: [] },
          { id: "sch-350", title: "Subchapter 326-350", type: "subchapter", exerciseIds: [] },
          { id: "sch-375", title: "Subchapter 351-375", type: "subchapter", exerciseIds: [] },
          { id: "sch-400", title: "Subchapter 376-400", type: "subchapter", exerciseIds: [] }
        ]
      },
      {
        id: "ch-500",
        title: "Chapter 401-500",
        type: "chapter",
        subchapters: [
          { id: "sch-425", title: "Subchapter 401-425", type: "subchapter", exerciseIds: [] },
          { id: "sch-450", title: "Subchapter 426-450", type: "subchapter", exerciseIds: [] },
          { id: "sch-475", title: "Subchapter 451-475", type: "subchapter", exerciseIds: [] },
          { id: "sch-500", title: "Subchapter 476-500", type: "subchapter", exerciseIds: [] }
        ]
      },
      {
        id: "ch-600",
        title: "Chapter 501-600",
        type: "chapter",
        subchapters: [
          { id: "sch-525", title: "Subchapter 501-525", type: "subchapter", exerciseIds: [] },
          { id: "sch-550", title: "Subchapter 526-550", type: "subchapter", exerciseIds: [] },
          { id: "sch-575", title: "Subchapter 551-575", type: "subchapter", exerciseIds: [] },
          { id: "sch-600", title: "Subchapter 576-600", type: "subchapter", exerciseIds: [] }
        ]
      },
      {
        id: "ch-700",
        title: "Chapter 601-700",
        type: "chapter",
        subchapters: [
          { id: "sch-625", title: "Subchapter 601-625", type: "subchapter", exerciseIds: [] },
          { id: "sch-650", title: "Subchapter 626-650", type: "subchapter", exerciseIds: [] },
          { id: "sch-675", title: "Subchapter 651-675", type: "subchapter", exerciseIds: [] },
          { id: "sch-700", title: "Subchapter 676-700", type: "subchapter", exerciseIds: [] }
        ]
      },
      {
        id: "ch-800",
        title: "Chapter 701-800",
        type: "chapter",
        subchapters: [
          { id: "sch-725", title: "Subchapter 701-725", type: "subchapter", exerciseIds: [] },
          { id: "sch-750", title: "Subchapter 726-750", type: "subchapter", exerciseIds: [] },
          { id: "sch-775", title: "Subchapter 751-775", type: "subchapter", exerciseIds: [] },
          { id: "sch-800", title: "Subchapter 776-800", type: "subchapter", exerciseIds: [] }
        ]
      },
      {
        id: "ch-900",
        title: "Chapter 801-900",
        type: "chapter",
        subchapters: [
          { id: "sch-825", title: "Subchapter 801-825", type: "subchapter", exerciseIds: [] },
          { id: "sch-850", title: "Subchapter 826-850", type: "subchapter", exerciseIds: [] },
          { id: "sch-875", title: "Subchapter 851-875", type: "subchapter", exerciseIds: [] },
          { id: "sch-900", title: "Subchapter 876-900", type: "subchapter", exerciseIds: [] }
        ]
      },
      {
        id: "ch-1000",
        title: "Chapter 901-1000",
        type: "chapter",
        subchapters: [
          { id: "sch-925", title: "Subchapter 901-925", type: "subchapter", exerciseIds: [] },
          { id: "sch-950", title: "Subchapter 926-950", type: "subchapter", exerciseIds: [] },
          { id: "sch-975", title: "Subchapter 951-975", type: "subchapter", exerciseIds: [] },
          { id: "sch-1000", title: "Subchapter 976-1000", type: "subchapter", exerciseIds: [] }
        ]
      }
    ];
  };

  const fixLearningPath = async (id: string, name: string, emoji: string) => {
    try {
      const structure = createStructure();

      const { error } = await supabase
        .from('learning_paths')
        .update({ structure })
        .eq('id', id);

      if (error) {
        return { path: `${emoji} ${name}`, success: false, message: error.message };
      }

      return { path: `${emoji} ${name}`, success: true, message: "Structure restaurée avec succès" };
    } catch (err) {
      return { path: `${emoji} ${name}`, success: false, message: String(err) };
    }
  };

  const fixAllPaths = async () => {
    setIsFixing(true);
    setResults([]);

    const paths = [
      { id: "jap-list-1000", name: "JAP LIST 1000 WORDS", emoji: "🇯🇵" },
      { id: "myr-list-1000", name: "MYR LIST 1000 WORDS", emoji: "🇲🇲" },
      { id: "tha-list-1000", name: "THA LIST 1000 WORDS", emoji: "🇹🇭" },
      { id: "kor-list-1000", name: "KOR LIST 1000 WORDS", emoji: "🇰🇷" }
    ];

    const allResults = [];

    for (const path of paths) {
      const result = await fixLearningPath(path.id, path.name, path.emoji);
      allResults.push(result);
      setResults([...allResults]);
    }

    const allSuccess = allResults.every(r => r.success);

    if (allSuccess) {
      toast.success("Tous les parcours d'apprentissage ont été restaurés avec succès !");
      setTimeout(() => navigate("/parcours"), 2000);
    } else {
      toast.error("Certains parcours n'ont pas pu être restaurés. Vérifiez les détails ci-dessous.");
    }

    setIsFixing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-foreground">
            🔧 Fix Permanent des Parcours d'Apprentissage
          </h1>
          <p className="text-muted-foreground">
            Cette opération va restaurer la structure complète (chapitres et sous-chapitres) de tous les parcours d'apprentissage.
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div className="text-left space-y-2">
              <h3 className="font-semibold text-lg">Parcours concernés :</h3>
              <ul className="space-y-1 text-sm">
                <li>🇯🇵 JAP LIST 1000 WORDS</li>
                <li>🇲🇲 MYR LIST 1000 WORDS</li>
                <li>🇹🇭 THA LIST 1000 WORDS</li>
                <li>🇰🇷 KOR LIST 1000 WORDS</li>
              </ul>
            </div>

            <div className="text-left space-y-2">
              <h3 className="font-semibold text-lg">Structure restaurée :</h3>
              <p className="text-sm text-muted-foreground">
                • 10 chapitres (1-100, 101-200, ..., 901-1000)<br/>
                • 4 sous-chapitres par chapitre (1-25, 26-50, 51-75, 76-100, etc.)<br/>
                • Total : 40 sections par parcours
              </p>
            </div>
          </div>

          {results.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-lg">Résultats :</h3>
              <div className="space-y-2">
                {results.map((result, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-background rounded">
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    )}
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{result.path}</div>
                      <div className={`text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                        {result.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={fixAllPaths}
            disabled={isFixing}
            size="lg"
            className="w-full"
          >
            {isFixing ? "Restauration en cours..." : "🔧 Restaurer tous les parcours"}
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/parcours")}
            className="w-full"
          >
            Retour aux parcours
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FixAllLearningPaths;
