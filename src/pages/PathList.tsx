import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Edit2, Trash2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLearningPaths } from "@/contexts/LearningPathContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PathList = () => {
  const navigate = useNavigate();
  const { learningPaths, deleteLearningPath } = useLearningPaths();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPaths = learningPaths.filter(path =>
    path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    path.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Supprimer le parcours "${title}" ?`)) {
      deleteLearningPath(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate("/creator")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <h1 className="text-4xl font-bold text-foreground mb-2">
            Mes Parcours
          </h1>
          <p className="text-muted-foreground text-lg">
            Gérez et modifiez vos parcours d'apprentissage
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un parcours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Path List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredPaths.map((path) => (
            <Card key={path.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-20 h-20 bg-gradient-to-br ${path.color} rounded-lg flex items-center justify-center text-4xl flex-shrink-0`}>
                      {path.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                      <CardDescription>{path.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigate(`/creator/path/${path.id}/edit`)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(path.id, path.title)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    Niveau {path.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    🌐 {path.language}
                  </Badge>
                  <Badge variant="outline">
                    ⏱️ {path.estimatedTime}
                  </Badge>
                  <Badge variant="outline">
                    📚 {path.exerciseIds.length} exercices
                  </Badge>
                  {path.rating && (
                    <Badge variant="secondary">
                      ⭐ {path.rating}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPaths.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Aucun parcours trouvé
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Essayez de modifier votre recherche" : "Commencez par créer votre premier parcours"}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate("/creator/path")}>
                Créer un parcours
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PathList;
