import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Trophy, Clock, ChevronRight, Star, Trash2 } from "lucide-react";
import { useLearningPaths } from "@/contexts/LearningPathContext";

const LearningPaths = () => {
  const navigate = useNavigate();
  const { learningPaths, getPathProgress, deleteLearningPath } = useLearningPaths();

  const [filter, setFilter] = useState<string>("all");

  const filteredPaths = learningPaths.filter(path => {
    if (filter === "all") return true;
    return path.language.toLowerCase() === filter.toLowerCase();
  });

  const languages = Array.from(new Set(learningPaths.map(p => p.language)));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Parcours d'Apprentissage</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Suivez des parcours structurés pour progresser de manière guidée et atteindre vos objectifs linguistiques
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            Tous les parcours
          </Button>
          {languages.map(lang => (
            <Button
              key={lang}
              variant={filter === lang ? "default" : "outline"}
              onClick={() => setFilter(lang)}
              size="sm"
            >
              {lang}
            </Button>
          ))}
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPaths.map((path, index) => {
            const progress = getPathProgress(path.id);
            const completedCount = progress?.completedExercises.length || 0;
            const totalCount = path.exerciseIds.length;
            const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

            return (
              <Card
                key={path.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/learning-path/${path.id}`)}
              >
                <CardHeader>
                  <div className={`w-full h-32 bg-gradient-to-br ${path.color} rounded-lg mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform`}>
                    {path.icon}
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {path.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Niveau {path.difficulty}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Supprimer le parcours "${path.title}" ?`)) {
                            deleteLearningPath(path.id);
                          }
                        }}
                        className="h-8 w-8 p-0 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-sm mt-2">
                    {path.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Progression</span>
                      <span className="text-sm font-bold text-foreground">
                        {completedCount} / {totalCount} exercices
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{path.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-foreground">{path.rating}</span>
                    </div>
                  </div>

                  {/* Language Badge */}
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                    🌐 {path.language}
                  </Badge>
                </CardContent>

                <CardFooter>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {progressPercentage === 100 ? (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        Réviser
                      </>
                    ) : progressPercentage > 0 ? (
                      <>
                        Continuer
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Commencer
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPaths.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Aucun parcours trouvé
            </h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos filtres
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">
            💡 Pourquoi suivre un parcours ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-blue-900 mb-1">Structure optimale</h3>
              <p className="text-sm text-blue-700">
                Les exercices sont organisés dans l'ordre idéal pour votre progression
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-blue-900 mb-1">Suivi de progression</h3>
              <p className="text-sm text-blue-700">
                Visualisez votre avancement et restez motivé
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold text-blue-900 mb-1">Objectifs clairs</h3>
              <p className="text-sm text-blue-700">
                Chaque parcours a un objectif précis et mesurable
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
