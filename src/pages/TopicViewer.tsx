import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, FolderTree } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/Navigation";
import { useTopics } from "@/contexts/TopicContext";
import { useLearningPaths } from "@/contexts/LearningPathContext";
import { useExercises } from "@/contexts/ExerciseContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TopicViewer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTopic } = useTopics();
  const { learningPaths } = useLearningPaths();
  const { exercises } = useExercises();

  const topic = getTopic(id || "");

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Topic non trouvé</h3>
            <Button onClick={() => navigate("/catalog")} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au catalogue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const relatedPaths = learningPaths.filter(p => topic.pathIds.includes(p.id));
  const relatedExercises = exercises.filter(ex => topic.exerciseIds.includes(ex.id));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate("/catalog")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au catalogue
          </Button>

          <div className={`w-full h-64 bg-gradient-to-br ${topic.color} rounded-xl flex flex-col items-center justify-center text-white mb-6 shadow-xl`}>
            <div className="text-9xl mb-4">{topic.icon}</div>
            <h1 className="text-4xl font-bold">{topic.title}</h1>
            <p className="text-xl mt-2 opacity-90">{topic.description}</p>
          </div>

          {/* Tags and Language */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
              🌐 {topic.language}
            </Badge>
            {topic.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>📖 Contenu du Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-ul:text-foreground prose-ol:text-foreground">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {topic.content}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Paths */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Parcours associés
                </CardTitle>
                <CardDescription>
                  {relatedPaths.length} parcours disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {relatedPaths.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Aucun parcours associé pour le moment
                  </p>
                ) : (
                  <div className="space-y-2">
                    {relatedPaths.map(path => (
                      <button
                        key={path.id}
                        onClick={() => navigate(`/learning-path/${path.id}`)}
                        className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{path.icon}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{path.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Niveau {path.difficulty} • {path.estimatedTime}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Exercises */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderTree className="w-5 h-5" />
                  Exercices associés
                </CardTitle>
                <CardDescription>
                  {relatedExercises.length} exercices disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {relatedExercises.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Aucun exercice associé pour le moment
                  </p>
                ) : (
                  <div className="space-y-2">
                    {relatedExercises.map(exercise => (
                      <button
                        key={exercise.id}
                        onClick={() => navigate(`/player/exercise/${exercise.id}`)}
                        className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                      >
                        <p className="font-semibold text-sm">{exercise.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {exercise.type} • Niveau {exercise.difficulty}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicViewer;
