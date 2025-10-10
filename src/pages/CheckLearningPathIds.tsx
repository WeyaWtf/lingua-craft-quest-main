import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

export default function CheckLearningPathIds() {
  const [loading, setLoading] = useState(false);
  const [paths, setPaths] = useState<Array<{ id: string; title: string }>>([]);

  const checkPaths = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('learning_paths')
        .select('id, title')
        .order('title');

      if (error) {
        console.error('Error:', error);
        toast.error('Erreur lors de la récupération des parcours');
        setLoading(false);
        return;
      }

      setPaths(data || []);
      toast.success(`${data?.length || 0} parcours trouvés`);
    } catch (err) {
      console.error('Error:', err);
      toast.error('Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">🔍 Check Learning Path IDs</h1>

        <Card className="p-6 mb-6">
          <p className="text-muted-foreground mb-4">
            Click the button to see all learning path IDs in the database.
          </p>
          <Button onClick={checkPaths} disabled={loading} size="lg" className="w-full">
            {loading ? "Checking..." : "Check Learning Paths"}
          </Button>
        </Card>

        {paths.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Found {paths.length} Learning Paths:</h2>
            <div className="space-y-2">
              {paths.map((path) => (
                <div key={path.id} className="p-3 bg-gray-50 rounded border">
                  <div className="font-mono text-sm text-blue-600">{path.id}</div>
                  <div className="text-sm font-semibold">{path.title}</div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
