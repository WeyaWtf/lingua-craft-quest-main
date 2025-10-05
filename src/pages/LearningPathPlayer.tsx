import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Circle, Lock, ChevronRight, Trophy, RotateCcw } from "lucide-react";
import { useLearningPaths } from "@/contexts/LearningPathContext";
import { useExercises } from "@/contexts/ExerciseContext";

const LearningPathPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLearningPath, getPathProgress, startPath, markExerciseComplete } = useLearningPaths();
  const { getExercise } = useExercises();

  const path = getLearningPath(id || "");
  const progress = getPathProgress(id || "");

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (id && !progress) {
      startPath(id);
    }
  }, [id, progress]);

  if (!path) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Parcours introuvable</h2>
          <p className="text-muted-foreground mb-6">Ce parcours n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate("/learning-paths")}>
            Retour aux parcours
          </Button>
        </div>
      </div>
    );
  }

  const completedExercises = progress?.completedExercises || [];
  const progressPercentage = path.exerciseIds.length > 0
    ? (completedExercises.length / path.exerciseIds.length) * 100
    : 0;

  const handleStartExercise = (exerciseId: string, index: number) => {
    // Vérifier si l'exercice précédent est complété (ou si c'est le premier)
    if (index === 0 || completedExercises.includes(path.exerciseIds[index - 1])) {
      navigate(`/player/exercise/${exerciseId}`);
    }
  };

  const handleReset = () => {
    if (id) {
      // Reset progress (à implémenter dans le context)
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <Button variant="outline" onClick={() => navigate("/learning-paths")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <Badge variant="outline">Niveau {path.difficulty}</Badge>
        </div>

        {/* Path Info */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className={`w-full h-48 bg-gradient-to-br ${path.color} rounded-2xl mb-6 flex items-center justify-center text-8xl shadow-xl animate-fade-in`}>
            {path.icon}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-3">{path.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{path.description}</p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>🌐 {path.language}</span>
              <span>•</span>
              <span>⏱️ {path.estimatedTime}</span>
              <span>•</span>
              <span>📚 {path.exerciseIds.length} exercices</span>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-foreground">Votre progression</h2>
              <span className="text-2xl font-bold text-primary">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              {completedExercises.length} / {path.exerciseIds.length} exercices complétés
            </p>
          </div>

          {/* Exercise Steps */}
          <div className="space-y-4">
            {path.exerciseIds.map((exerciseId, index) => {
              const exercise = getExercise(exerciseId);
              const isCompleted = completedExercises.includes(exerciseId);
              const isUnlocked = index === 0 || completedExercises.includes(path.exerciseIds[index - 1]);
              const isCurrent = !isCompleted && isUnlocked;

              return (
                <Card
                  key={exerciseId}
                  className={`transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-50 border-green-200"
                      : isCurrent
                      ? "bg-blue-50 border-blue-300 shadow-lg"
                      : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {/* Step Number */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isCurrent
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : isUnlocked ? (
                          <Circle className="w-6 h-6" />
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>

                      {/* Exercise Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">
                            {exercise ? exercise.title : `Exercice ${index + 1}`}
                          </CardTitle>
                          {isCompleted && (
                            <Badge className="bg-green-500 text-white">
                              ✓ Complété
                            </Badge>
                          )}
                          {isCurrent && (
                            <Badge className="bg-blue-500 text-white">
                              En cours
                            </Badge>
                          )}
                        </div>
                        <CardDescription>
                          {exercise?.description || "Description non disponible"}
                        </CardDescription>
                      </div>

                      {/* Action Button */}
                      <div>
                        {isUnlocked ? (
                          <Button
                            onClick={() => handleStartExercise(exerciseId, index)}
                            variant={isCurrent ? "default" : "outline"}
                            size="lg"
                          >
                            {isCompleted ? "Réviser" : "Commencer"}
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="lg" disabled>
                            <Lock className="w-4 h-4 mr-2" />
                            Verrouillé
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Completion Message */}
          {progressPercentage === 100 && (
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 rounded-xl p-8 text-center animate-scale-in">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-green-900 mb-3">
                Félicitations ! 🎉
              </h2>
              <p className="text-lg text-green-700 mb-6">
                Vous avez terminé le parcours "{path.title}" !
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={handleReset}>
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Recommencer
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/learning-paths")}>
                  Voir d'autres parcours
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPathPlayer;
