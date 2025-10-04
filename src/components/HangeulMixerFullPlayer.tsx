import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import HangeulMixerPlayer from "./HangeulMixerPlayer";

const HangeulMixerFullPlayer = () => {
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<any>(null);

  useEffect(() => {
    const fetchExercise = async () => {
      const { data, error } = await supabase
        .from("exercises")
        .select("*")
        .eq("title", "Hangeul Mixer - Jeu de placement de l'alphabet coréen")
        .single();

      if (error) {
        console.error("Error fetching exercise:", error);
        return;
      }

      setExercise(data);
    };

    fetchExercise();
  }, []);

  if (!exercise) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-full mx-auto px-4">
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{exercise.title}</h1>
            <p className="text-slate-600 mt-1">{exercise.description}</p>
          </div>
        </div>

        <HangeulMixerPlayer content={exercise.content} />
      </div>
    </div>
  );
};

export default HangeulMixerFullPlayer;
