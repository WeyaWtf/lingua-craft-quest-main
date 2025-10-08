import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function MigratePath() {
  const [loading, setLoading] = useState(false);
  const [migrated, setMigrated] = useState(false);
  const [pathId, setPathId] = useState<string>("");
  const navigate = useNavigate();

  const migrateJapList1000 = async () => {
    setLoading(true);
    try {
      // 1. Charger le parcours
      const { data: pathData, error: loadError } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('title', 'JAP LIST 1000')
        .single();

      if (loadError || !pathData) {
        toast.error('Erreur lors du chargement du parcours');
        console.error(loadError);
        setLoading(false);
        return;
      }

      const exerciseIds = pathData.exercise_ids || [];

      if (exerciseIds.length === 0) {
        toast.error('Aucun exercice à migrer');
        setLoading(false);
        return;
      }

      // 2. Charger les informations des exercices
      const { data: exercises, error: exError } = await supabase
        .from('exercises')
        .select('id, title')
        .in('id', exerciseIds);

      if (exError || !exercises) {
        toast.error('Erreur lors du chargement des exercices');
        console.error(exError);
        setLoading(false);
        return;
      }

      // 3. Créer la structure hiérarchique
      // On va créer un chapitre qui contient tous les exercices
      const structure = [
        {
          type: 'chapter',
          id: 'chapter-jap-1000-words',
          title: 'Japanese 1000 Words',
          items: exerciseIds.map(id => ({
            type: 'exercise',
            id: id
          }))
        }
      ];

      // 4. Mettre à jour le parcours avec la nouvelle structure
      const { error: updateError } = await supabase
        .from('learning_paths')
        .update({
          structure: structure,
          updated_at: new Date().toISOString()
        })
        .eq('id', pathData.id);

      if (updateError) {
        toast.error('Erreur lors de la mise à jour du parcours');
        console.error(updateError);
        setLoading(false);
        return;
      }

      toast.success(`Migration réussie ! ${exerciseIds.length} exercices récupérés`);
      setMigrated(true);
      setPathId(pathData.id);
    } catch (err) {
      console.error('Error during migration:', err);
      toast.error('Erreur lors de la migration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Migration du parcours JAP LIST 1000</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Problème détecté</h2>
        <p className="text-gray-700 mb-4">
          Le parcours "JAP LIST 1000" contient 10 exercices dans la base de données,
          mais ils ne sont pas visibles dans l'éditeur car la structure hiérarchique est vide.
        </p>
        <p className="text-gray-700 mb-4">
          Ce script va créer automatiquement un chapitre "Japanese 1000 Words" et y placer
          tous les 10 exercices pour que tu puisses les voir et les modifier dans l'éditeur.
        </p>
      </Card>

      {!migrated ? (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Action requise</h2>
          <p className="text-gray-700 mb-6">
            Clique sur le bouton ci-dessous pour récupérer tes 10 exercices et
            les ajouter à la structure du parcours.
          </p>
          <Button
            onClick={migrateJapList1000}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? 'Migration en cours...' : '🔄 Récupérer mes exercices'}
          </Button>
        </Card>
      ) : (
        <Card className="p-6 bg-green-50 border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Migration réussie !</h2>
          <p className="text-gray-700 mb-6">
            Tes 10 exercices ont été récupérés et ajoutés à un chapitre "Japanese 1000 Words".
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/paths')}
              variant="outline"
            >
              Retour aux parcours
            </Button>
            <Button
              onClick={() => navigate(`/editor/path/${pathId}`)}
              className="bg-green-600 hover:bg-green-700"
            >
              Ouvrir l'éditeur
            </Button>
          </div>
        </Card>
      )}

      <div className="mt-6">
        <Button
          onClick={() => navigate('/debug-path')}
          variant="ghost"
        >
          ← Retour au diagnostic
        </Button>
      </div>
    </div>
  );
}
