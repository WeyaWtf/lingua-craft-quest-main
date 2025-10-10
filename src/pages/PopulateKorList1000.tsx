import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function PopulateKorList1000() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Array<{ subchapter: string; exercisesAdded: number; success: boolean }>>([]);
  const navigate = useNavigate();

  const populatePath = async () => {
    setLoading(true);
    setResults([]);

    try {
      // Récupérer le parcours existant
      const { data: pathData, error: pathError } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('id', 'path-korean-list-1000-words')
        .single();

      if (pathError || !pathData) {
        toast.error('Parcours KOR LIST 1000 introuvable');
        setLoading(false);
        return;
      }

      // Récupérer tous les exercices KOR
      const { data: exercises, error: exError } = await supabase
        .from('exercises')
        .select('id, title')
        .ilike('title', 'KOR LIST 1000 - Bundle%')
        .order('title');

      if (exError || !exercises) {
        toast.error('Erreur lors de la récupération des exercices');
        setLoading(false);
        return;
      }

      console.log(`✅ Found ${exercises.length} KOR exercises`);

      // Créer un mapping bundle number -> exercise IDs
      const bundleMap: { [key: number]: string[] } = {};
      exercises.forEach(ex => {
        const match = ex.title.match(/Bundle (\d+)/);
        if (match) {
          const bundleNum = parseInt(match[1]);
          if (!bundleMap[bundleNum]) {
            bundleMap[bundleNum] = [];
          }
          bundleMap[bundleNum].push(ex.id);
        }
      });

      // Créer la structure avec exercices assignés
      const structure = [];
      const resultsArray = [];

      for (let i = 1; i <= 10; i++) {
        const chapterNumber = i * 100;
        const chapterId = `chapter-${chapterNumber}`;
        const subchapters = [];

        for (let j = 1; j <= 4; j++) {
          const subchapterNumber = (i - 1) * 100 + j * 25;
          const subchapterId = `subchapter-${subchapterNumber}`;

          // Calculer quel bundle correspond à ce sous-chapitre
          // Sous-chapitre 25 = Bundle 1, Sous-chapitre 50 = Bundle 2, etc.
          const bundleNumber = Math.floor((subchapterNumber - 1) / 25) + 1;

          const exerciseIds = bundleMap[bundleNumber] || [];

          subchapters.push({
            type: 'subchapter',
            id: subchapterId,
            title: `${subchapterNumber}`,
            items: exerciseIds.map(id => ({ type: 'exercise', id }))
          });

          resultsArray.push({
            subchapter: `Subchapter ${subchapterNumber}`,
            exercisesAdded: exerciseIds.length,
            success: exerciseIds.length > 0
          });
        }

        structure.push({
          type: 'chapter',
          id: chapterId,
          title: `${chapterNumber}`,
          items: subchapters
        });
      }

      // Mettre à jour le parcours
      const { error: updateError } = await supabase
        .from('learning_paths')
        .update({ structure })
        .eq('id', 'path-korean-list-1000-words');

      if (updateError) {
        toast.error('Erreur lors de la mise à jour du parcours');
        console.error(updateError);
        setLoading(false);
        return;
      }

      setResults(resultsArray);
      toast.success('Parcours KOR LIST 1000 peuplé avec succès !');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Erreur lors du peuplement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">🇰🇷 Populate KOR LIST 1000 WORDS</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Ce script va :</h2>
        <ul className="space-y-2 text-sm list-disc list-inside">
          <li>Récupérer tous les exercices "KOR LIST 1000 - Bundle X"</li>
          <li>Assigner chaque bundle au bon sous-chapitre (Bundle 1 → 25, Bundle 2 → 50, etc.)</li>
          <li>Créer une structure complète avec 10 chapitres et 40 sous-chapitres</li>
          <li>Mettre à jour le parcours dans la base de données</li>
        </ul>
      </Card>

      {!loading && results.length === 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Prêt à peupler</h2>
          <p className="text-gray-700 mb-6">
            Assurez-vous que tous les exercices KOR Bundle (1-40) ont été créés avant de lancer cette opération.
          </p>
          <Button
            onClick={populatePath}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            🚀 Peupler le parcours KOR LIST 1000
          </Button>
        </Card>
      )}

      {loading && (
        <Card className="p-6 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-700">Peuplement en cours...</p>
        </Card>
      )}

      {!loading && results.length > 0 && (
        <>
          <Card className="p-6 mb-6 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Résultats</h2>
            <div className="space-y-2">
              {results.map((result, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  )}
                  <span className="text-sm">
                    {result.subchapter}: <strong>{result.exercisesAdded}</strong> exercice(s)
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Peuplement terminé !</h2>
            <p className="text-gray-700 mb-6">
              Le parcours "KOR LIST 1000 WORDS" a été mis à jour avec tous les exercices disponibles.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/parcours')}
                variant="outline"
              >
                Voir tous les parcours
              </Button>
              <Button
                onClick={() => navigate('/parcours')}
                className="bg-green-600 hover:bg-green-700"
              >
                Ouvrir le parcours
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
