import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Edit2, Trash2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useTopics } from "@/contexts/TopicContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TopicList = () => {
  const navigate = useNavigate();
  const { topics, deleteTopic } = useTopics();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Supprimer le topic "${title}" ?`)) {
      deleteTopic(id);
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
            Mes Topics
          </h1>
          <p className="text-muted-foreground text-lg">
            Gérez et modifiez vos topics thématiques
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher un topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Topic List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-20 h-20 bg-gradient-to-br ${topic.color} rounded-lg flex items-center justify-center text-4xl flex-shrink-0`}>
                      {topic.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigate(`/creator/topic/${topic.id}`)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(topic.id, topic.title)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">
                    🌐 {topic.language}
                  </Badge>
                  <Badge variant="outline">
                    📚 {topic.pathIds.length} parcours
                  </Badge>
                  <Badge variant="outline">
                    🎯 {topic.exerciseIds.length} exercices
                  </Badge>
                  {topic.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {topic.tags.length > 3 && (
                    <Badge variant="secondary">
                      +{topic.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTopics.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Aucun topic trouvé
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Essayez de modifier votre recherche" : "Commencez par créer votre premier topic"}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate("/creator/topic")}>
                Créer un topic
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicList;
