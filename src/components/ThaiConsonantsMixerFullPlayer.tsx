import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useExercises } from "@/contexts/ExerciseContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThaiConsonantsMixerPlayer from "@/components/ThaiConsonantsMixerPlayer";

const ThaiConsonantsMixerFullPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getExercise } = useExercises();

  const exercise = getExercise(id || "");

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Exercice introuvable</h2>
          <p className="text-muted-foreground mb-6">Cet exercice n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate("/catalog")}>
            Retour au catalogue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/catalog")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au catalogue
          </Button>

          <div className="flex gap-2">
            {exercise.difficulty && (
              <Badge variant="secondary">
                Niveau {exercise.difficulty}
              </Badge>
            )}
            {exercise.language && (
              <Badge variant="outline">
                {exercise.language === "thai" ? "🇹🇭 Thaï" : exercise.language}
              </Badge>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {exercise.title}
          </h1>
          {exercise.description && (
            <p className="text-muted-foreground">
              {exercise.description}
            </p>
          )}
        </div>

        {/* Game Player */}
        <ThaiConsonantsMixerPlayer content={exercise.content} />
      </div>
    </div>
  );
};

export default ThaiConsonantsMixerFullPlayer;
