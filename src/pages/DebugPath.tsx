import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DebugPath() {
  const [pathData, setPathData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPathData();
  }, []);

  const loadPathData = async () => {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('title', 'JAP LIST 1000')
      .single();

    if (error) {
      console.error('Error loading path:', error);
    } else {
      setPathData(data);
      console.log('Path data from database:', data);
    }
    setLoading(false);
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  if (!pathData) {
    return <div className="p-8">Parcours "JAP LIST 1000" non trouvé</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Debug: JAP LIST 1000</h1>

      <Card className="p-6 mb-4">
        <h2 className="font-semibold mb-2">Informations de base</h2>
        <div className="space-y-2 text-sm">
          <div><strong>ID:</strong> {pathData.id}</div>
          <div><strong>Titre:</strong> {pathData.title}</div>
          <div><strong>Description:</strong> {pathData.description}</div>
        </div>
      </Card>

      <Card className="p-6 mb-4">
        <h2 className="font-semibold mb-2">Exercise IDs</h2>
        <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(pathData.exercise_ids, null, 2)}
        </pre>
        <div className="mt-2 text-sm">
          <strong>Nombre d'exercices:</strong> {pathData.exercise_ids?.length || 0}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold mb-2">Structure</h2>
        <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(pathData.structure, null, 2)}
        </pre>
        <div className="mt-2 text-sm">
          <strong>Type de structure:</strong> {pathData.structure === null ? 'NULL' : Array.isArray(pathData.structure) ? `Array (${pathData.structure.length} éléments)` : typeof pathData.structure}
        </div>
      </Card>

      <Button onClick={loadPathData} className="mt-4">
        Recharger les données
      </Button>
    </div>
  );
}
