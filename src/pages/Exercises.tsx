import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import ExerciseCard from "@/components/ExerciseCard";
import { useExercises } from "@/contexts/ExerciseContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Exercises = () => {
  const navigate = useNavigate();
  const { exercises } = useExercises();
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const myExercises = exercises.filter((ex) => ex.authorId === "demo");
  
  const filteredExercises = myExercises.filter((ex) => {
    if (filter === "published") return ex.isPublished;
    if (filter === "draft") return !ex.isPublished;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Mes exercices
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez vos exercices créés
            </p>
          </div>
          
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-hover"
            onClick={() => navigate("/creator")}
          >
            <Plus className="w-5 h-5 mr-2" />
            Créer un exercice
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{myExercises.length}</div>
                <div className="text-sm text-muted-foreground">Total exercices</div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">
                  {myExercises.filter((ex) => ex.isPublished).length}
                </div>
                <div className="text-sm text-muted-foreground">Publiés</div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">
                  {myExercises.filter((ex) => !ex.isPublished).length}
                </div>
                <div className="text-sm text-muted-foreground">Brouillons</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Filter */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="all">Tous ({myExercises.length})</TabsTrigger>
            <TabsTrigger value="published">
              Publiés ({myExercises.filter((ex) => ex.isPublished).length})
            </TabsTrigger>
            <TabsTrigger value="draft">
              Brouillons ({myExercises.filter((ex) => !ex.isPublished).length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Exercise Grid */}
        {filteredExercises.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Aucun exercice trouvé
            </h3>
            <p className="text-muted-foreground mb-6">
              {filter === "draft"
                ? "Vous n'avez aucun brouillon"
                : filter === "published"
                ? "Vous n'avez aucun exercice publié"
                : "Commencez par créer votre premier exercice"}
            </p>
            <Button onClick={() => navigate("/creator")}>
              <Plus className="w-4 h-4 mr-2" />
              Créer un exercice
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ExerciseCard
                  {...exercise}
                  description={exercise.description || ""}
                  onPlay={() => navigate(`/player/exercise/${exercise.id}`)}
                  onEdit={() => navigate(`/creator/exercise/${exercise.id}`)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercises;
