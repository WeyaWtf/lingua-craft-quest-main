import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateThaiList1000() {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [pathId, setPathId] = useState<string>("");
  const navigate = useNavigate();

  const createPath = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Utiliser un ID utilisateur par défaut si non connecté (pour les tests)
      const userId = user?.id || 'demo';

      // Créer la structure hiérarchique
      const structure = [];

      // 10 chapitres : 100, 200, 300... 1000
      for (let i = 1; i <= 10; i++) {
        const chapterNumber = i * 100;
        const chapterId = `chapter-${chapterNumber}`;

        // 4 sous-chapitres pour chaque chapitre
        const subchapters = [];
        for (let j = 1; j <= 4; j++) {
          const subchapterNumber = (i - 1) * 100 + j * 25;
          const subchapterId = `subchapter-${subchapterNumber}`;

          subchapters.push({
            type: 'subchapter',
            id: subchapterId,
            title: `${subchapterNumber}`,
            items: []
          });
        }

        structure.push({
          type: 'chapter',
          id: chapterId,
          title: `${chapterNumber}`,
          items: subchapters
        });
      }

      // Créer le parcours dans la base de données
      const pathId = 'path-thai-list-1000-words';

      const { data: pathData, error: createError } = await supabase
        .from('learning_paths')
        .insert({
          id: pathId,
          title: 'THAI LIST 1000 WORDS',
          description: 'Complete Thai vocabulary learning path with 1000 most common words (CU-TFL)',
          language: 'thai',
          difficulty: 1,
          estimated_time: 'Environ 200 heures',
          exercise_ids: [],
          structure: structure,
          icon: '🇹🇭',
          color: 'from-red-500 to-blue-500',
          created_by: userId,
          is_published: true,
          rating: 5.0
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating path:', createError);
        toast.error('Erreur lors de la création du parcours');
        setLoading(false);
        return;
      }

      toast.success('Parcours créé avec succès !');
      setCreated(true);
      setPathId(pathData.id);
    } catch (err) {
      console.error('Error:', err);
      toast.error('Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Créer le parcours THAI LIST 1000 WORDS</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Structure du parcours</h2>
        <div className="space-y-3 text-sm">
          <p className="font-semibold">10 Chapitres :</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Chapitre 100 → Sous-chapitres : 25, 50, 75, 100</li>
            <li>Chapitre 200 → Sous-chapitres : 125, 150, 175, 200</li>
            <li>Chapitre 300 → Sous-chapitres : 225, 250, 275, 300</li>
            <li>Chapitre 400 → Sous-chapitres : 325, 350, 375, 400</li>
            <li>Chapitre 500 → Sous-chapitres : 425, 450, 475, 500</li>
            <li>Chapitre 600 → Sous-chapitres : 525, 550, 575, 600</li>
            <li>Chapitre 700 → Sous-chapitres : 625, 650, 675, 700</li>
            <li>Chapitre 800 → Sous-chapitres : 725, 750, 775, 800</li>
            <li>Chapitre 900 → Sous-chapitres : 825, 850, 875, 900</li>
            <li>Chapitre 1000 → Sous-chapitres : 925, 950, 975, 1000</li>
          </ul>
          <p className="mt-4 text-gray-600">
            Chaque sous-chapitre pourra contenir des exercices (flashcards, associations, etc.)
          </p>
        </div>
      </Card>

      {!created ? (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Prêt à créer</h2>
          <p className="text-gray-700 mb-6">
            Ce script va créer automatiquement le parcours avec toute la structure hiérarchique.
          </p>
          <Button
            onClick={createPath}
            disabled={loading}
            size="lg"
            className="w-full"
          >
            {loading ? 'Création en cours...' : '🚀 Créer le parcours'}
          </Button>
        </Card>
      ) : (
        <Card className="p-6 bg-green-50 border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-800">✅ Parcours créé !</h2>
          <p className="text-gray-700 mb-6">
            Le parcours "THAI LIST 1000 WORDS" a été créé avec 10 chapitres et 40 sous-chapitres.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/paths')}
              variant="outline"
            >
              Voir tous les parcours
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
    </div>
  );
}
