import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";

type PathConfig = {
  id: string;
  title: string;
  description: string;
  language: string;
  icon: string;
  color: string;
  bundlePrefix: string;
};

export default function SetupAllLearningPaths() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Array<{ path: string; action: string; success: boolean; message: string }>>([]);
  const navigate = useNavigate();

  const pathConfigs: PathConfig[] = [
    {
      id: "path-jap-list-1000-words",
      title: "JAP LIST 1000 WORDS",
      description: "Complete Japanese vocabulary learning path with 1000 most common words",
      language: "japanese",
      icon: "🇯🇵",
      color: "from-red-500 to-pink-500",
      bundlePrefix: "JAP LIST 1000 - Bundle"
    },
    {
      id: "path-myr-list-1000-words",
      title: "MYR LIST 1000 WORDS",
      description: "Complete Burmese vocabulary learning path with 1000 most common words",
      language: "burmese",
      icon: "🇲🇲",
      color: "from-yellow-500 to-red-500",
      bundlePrefix: "MYR LIST 1000 - Bundle"
    },
    {
      id: "path-thai-list-1000-words",
      title: "THA LIST 1000 WORDS",
      description: "Complete Thai vocabulary learning path with 1000 most common words (CU-TFL)",
      language: "thai",
      icon: "🇹🇭",
      color: "from-red-500 to-blue-500",
      bundlePrefix: "THA LIST 1000 - Bundle"
    },
    {
      id: "path-korean-list-1000-words",
      title: "KOR LIST 1000 WORDS",
      description: "Complete Korean vocabulary learning path with 1000 most common words",
      language: "korean",
      icon: "🇰🇷",
      color: "from-blue-500 to-red-500",
      bundlePrefix: "KOR LIST 1000 - Bundle"
    }
  ];

  const createStructure = (exercisesMap: { [key: number]: string[] }) => {
    const structure = [];

    for (let i = 1; i <= 10; i++) {
      const chapterNumber = i * 100;
      const chapterId = `chapter-${chapterNumber}`;
      const subchapters = [];

      for (let j = 1; j <= 4; j++) {
        const subchapterNumber = (i - 1) * 100 + j * 25;
        const subchapterId = `subchapter-${subchapterNumber}`;
        const bundleNumber = Math.floor((subchapterNumber - 1) / 25) + 1;
        const exerciseIds = exercisesMap[bundleNumber] || [];

        subchapters.push({
          type: 'subchapter',
          id: subchapterId,
          title: `${subchapterNumber}`,
          items: exerciseIds.map(id => ({ type: 'exercise', id }))
        });
      }

      structure.push({
        type: 'chapter',
        id: chapterId,
        title: `${chapterNumber}`,
        items: subchapters
      });
    }

    return structure;
  };

  const setupPath = async (config: PathConfig) => {
    const resultsArray = [];

    try {
      // 1. Check if path exists
      const { data: existingPath } = await supabase
        .from('learning_paths')
        .select('id')
        .eq('id', config.id)
        .single();

      // 2. Get exercises for this language
      const { data: exercises, error: exError } = await supabase
        .from('exercises')
        .select('id, title')
        .ilike('title', `${config.bundlePrefix}%`)
        .order('title');

      if (exError) {
        return {
          path: `${config.icon} ${config.title}`,
          action: 'error',
          success: false,
          message: `Erreur lors de la récupération des exercices: ${exError.message}`
        };
      }

      // 3. Create bundle map
      const bundleMap: { [key: number]: string[] } = {};
      (exercises || []).forEach(ex => {
        const match = ex.title.match(/Bundle (\d+)/);
        if (match) {
          const bundleNum = parseInt(match[1]);
          if (!bundleMap[bundleNum]) {
            bundleMap[bundleNum] = [];
          }
          bundleMap[bundleNum].push(ex.id);
        }
      });

      const structure = createStructure(bundleMap);
      const exerciseCount = exercises?.length || 0;

      // 4. Create or update path
      if (!existingPath) {
        // Create new path
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id || 'demo';

        const { error: createError } = await supabase
          .from('learning_paths')
          .insert({
            id: config.id,
            title: config.title,
            description: config.description,
            language: config.language,
            difficulty: 1,
            estimated_time: 'Environ 200 heures',
            exercise_ids: [],
            structure: structure,
            icon: config.icon,
            color: config.color,
            created_by: userId,
            is_published: true,
            rating: 5.0
          });

        if (createError) {
          return {
            path: `${config.icon} ${config.title}`,
            action: 'create',
            success: false,
            message: `Erreur: ${createError.message}`
          };
        }

        return {
          path: `${config.icon} ${config.title}`,
          action: 'created',
          success: true,
          message: `Créé avec ${exerciseCount} exercices (${Object.keys(bundleMap).length} bundles)`
        };
      } else {
        // Update existing path
        const { error: updateError } = await supabase
          .from('learning_paths')
          .update({ structure })
          .eq('id', config.id);

        if (updateError) {
          return {
            path: `${config.icon} ${config.title}`,
            action: 'update',
            success: false,
            message: `Erreur: ${updateError.message}`
          };
        }

        return {
          path: `${config.icon} ${config.title}`,
          action: 'updated',
          success: true,
          message: `Mis à jour avec ${exerciseCount} exercices (${Object.keys(bundleMap).length} bundles)`
        };
      }
    } catch (err) {
      return {
        path: `${config.icon} ${config.title}`,
        action: 'error',
        success: false,
        message: String(err)
      };
    }
  };

  const setupAllPaths = async () => {
    setLoading(true);
    setResults([]);

    const allResults = [];

    for (const config of pathConfigs) {
      const result = await setupPath(config);
      allResults.push(result);
      setResults([...allResults]);
    }

    const allSuccess = allResults.every(r => r.success);

    if (allSuccess) {
      toast.success("Tous les parcours ont été configurés avec succès !");
      setTimeout(() => navigate("/parcours"), 2000);
    } else {
      toast.error("Certains parcours n'ont pas pu être configurés.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-foreground">
            🚀 Setup All Learning Paths (1000 Words)
          </h1>
          <p className="text-muted-foreground">
            Cette opération va créer ou mettre à jour tous les parcours d'apprentissage de 1000 mots
            avec leur structure complète et leurs exercices.
          </p>

          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <div className="text-left space-y-2">
              <h3 className="font-semibold text-lg">Parcours :</h3>
              <ul className="space-y-1 text-sm">
                <li>🇯🇵 JAP LIST 1000 WORDS (Japanese)</li>
                <li>🇲🇲 MYR LIST 1000 WORDS (Burmese)</li>
                <li>🇹🇭 THA LIST 1000 WORDS (Thai)</li>
                <li>🇰🇷 KOR LIST 1000 WORDS (Korean)</li>
              </ul>
            </div>

            <div className="text-left space-y-2">
              <h3 className="font-semibold text-lg">Structure :</h3>
              <p className="text-sm text-muted-foreground">
                • 10 chapitres (100, 200, ..., 1000)<br/>
                • 4 sous-chapitres par chapitre (25, 50, 75, 100, etc.)<br/>
                • Bundles automatiquement assignés aux sous-chapitres<br/>
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
                        [{result.action.toUpperCase()}] {result.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={setupAllPaths}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Configuration en cours...
              </>
            ) : (
              "🚀 Configurer tous les parcours"
            )}
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
}
