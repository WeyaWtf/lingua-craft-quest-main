import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Plus, X, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useTopics } from "@/contexts/TopicContext";
import { useExercises } from "@/contexts/ExerciseContext";
import { useLearningPaths } from "@/contexts/LearningPathContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TopicEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTopic, updateTopic } = useTopics();
  const { exercises } = useExercises();
  const { learningPaths } = useLearningPaths();

  const topic = getTopic(id || "");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [icon, setIcon] = useState("📚");
  const [color, setColor] = useState("from-indigo-500 to-purple-500");
  const [language, setLanguage] = useState("japanese");
  const [tags, setTags] = useState("");
  const [exerciseIds, setExerciseIds] = useState<string[]>([]);
  const [pathIds, setPathIds] = useState<string[]>([]);

  // Modal states
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showPathModal, setShowPathModal] = useState(false);
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState("");
  const [pathSearchQuery, setPathSearchQuery] = useState("");

  useEffect(() => {
    if (topic) {
      setTitle(topic.title);
      setDescription(topic.description);
      setContent(topic.content || "");
      setIcon(topic.icon);
      setColor(topic.color);
      setLanguage(topic.language);
      setTags(topic.tags.join(", "));
      setExerciseIds(topic.exerciseIds || []);
      setPathIds(topic.pathIds || []);
    }
  }, [topic]);

  const handleSave = () => {
    if (!title || !description) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!id) {
      toast.error("Erreur: ID du topic manquant");
      return;
    }

    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);

    updateTopic(id, {
      title,
      description,
      content,
      icon,
      color,
      language,
      tags: tagArray,
      exerciseIds,
      pathIds
    });

    toast.success("Topic mis à jour avec succès !");
    navigate("/creator/topic-list");
  };

  const addExercise = (exerciseId: string) => {
    if (!exerciseIds.includes(exerciseId)) {
      setExerciseIds([...exerciseIds, exerciseId]);
    }
  };

  const removeExercise = (exerciseId: string) => {
    setExerciseIds(exerciseIds.filter(id => id !== exerciseId));
  };

  const addPath = (pathId: string) => {
    if (!pathIds.includes(pathId)) {
      setPathIds([...pathIds, pathId]);
    }
  };

  const removePath = (pathId: string) => {
    setPathIds(pathIds.filter(id => id !== pathId));
  };

  const filteredExercises = exercises.filter(ex =>
    ex.title.toLowerCase().includes(exerciseSearchQuery.toLowerCase()) &&
    !exerciseIds.includes(ex.id)
  );

  const filteredPaths = learningPaths.filter(path =>
    path.title.toLowerCase().includes(pathSearchQuery.toLowerCase()) &&
    !pathIds.includes(path.id)
  );

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Topic non trouvé</h3>
            <Button onClick={() => navigate("/creator/topic-list")} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const colorOptions = [
    { label: "Indigo", value: "from-indigo-500 to-purple-500" },
    { label: "Bleu", value: "from-blue-500 to-cyan-500" },
    { label: "Violet", value: "from-purple-500 to-pink-500" },
    { label: "Vert", value: "from-green-500 to-emerald-500" },
    { label: "Orange", value: "from-orange-500 to-amber-500" },
    { label: "Rose", value: "from-pink-500 to-rose-500" },
    { label: "Jaune-Rouge", value: "from-yellow-500 to-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/creator/topic-list")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Éditer le Topic</h1>
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Configuration du Topic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre du topic *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Japonais pour Débutants"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décrivez le contenu et les objectifs de ce topic..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="language">Langue *</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birman">🇲🇲 Birman</SelectItem>
                      <SelectItem value="Birman">🇲🇲 Birman</SelectItem>
                      <SelectItem value="thai">🇹🇭 Thaï</SelectItem>
                      <SelectItem value="korean">🇰🇷 Coréen</SelectItem>
                      <SelectItem value="japanese">🇯🇵 Japonais</SelectItem>
                      <SelectItem value="Japonais">🇯🇵 Japonais</SelectItem>
                      <SelectItem value="vietnamese">🇻🇳 Vietnamien</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="content">Contenu (Markdown) *</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="# Titre du Topic&#10;&#10;## Section 1&#10;&#10;Votre contenu en Markdown...&#10;&#10;- Liste d'items&#10;- **Gras** et *italique*&#10;&#10;## Section 2&#10;&#10;Plus de contenu..."
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Utilisez la syntaxe Markdown : # pour les titres, ** pour le gras, * pour l'italique, - pour les listes
                  </p>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="débutant, hiragana, katakana, grammaire"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icon">Icône (emoji)</Label>
                    <Input
                      id="icon"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="📚"
                      maxLength={2}
                      className="text-2xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="color">Couleur du thème</Label>
                    <select
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md"
                    >
                      {colorOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <Label>Aperçu</Label>
                  <div className={`w-full h-48 bg-gradient-to-br ${color} rounded-xl flex flex-col items-center justify-center text-white mt-2 p-6`}>
                    <div className="text-8xl mb-4">{icon}</div>
                    <h3 className="text-2xl font-bold">{title || "Titre du topic"}</h3>
                    <p className="text-sm mt-2 text-center opacity-90">
                      {description || "Description du topic..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-3">💡 Informations</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>
                    <strong>Créé le :</strong> {topic.createdAt.toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Dernière modification :</strong> {topic.updatedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Associated Paths */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>📚 Parcours associés ({pathIds.length})</CardTitle>
                <Button onClick={() => setShowPathModal(true)} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un parcours
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {pathIds.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucun parcours associé
                </p>
              ) : (
                <div className="space-y-2">
                  {pathIds.map(pathId => {
                    const path = learningPaths.find(p => p.id === pathId);
                    if (!path) return null;
                    return (
                      <div key={pathId} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 bg-gradient-to-br ${path.color} rounded-lg flex items-center justify-center text-2xl`}>
                            {path.icon}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{path.title}</p>
                            <p className="text-xs text-muted-foreground">Niveau {path.difficulty} • {path.estimatedTime}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePath(pathId)}
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Associated Exercises */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>🎯 Exercices associés ({exerciseIds.length})</CardTitle>
                <Button onClick={() => setShowExerciseModal(true)} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un exercice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {exerciseIds.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucun exercice associé
                </p>
              ) : (
                <div className="space-y-2">
                  {exerciseIds.map(exerciseId => {
                    const exercise = exercises.find(ex => ex.id === exerciseId);
                    if (!exercise) return null;
                    return (
                      <div key={exerciseId} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">{exercise.title}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{exercise.type}</Badge>
                            <Badge variant="outline" className="text-xs">Niveau {exercise.difficulty}</Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExercise(exerciseId)}
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Exercise Modal */}
        {showExerciseModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowExerciseModal(false)}>
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Ajouter un exercice</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowExerciseModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un exercice..."
                    value={exerciseSearchQuery}
                    onChange={(e) => setExerciseSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {filteredExercises.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Aucun exercice trouvé</p>
                ) : (
                  filteredExercises.map(exercise => (
                    <div
                      key={exercise.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent cursor-pointer"
                      onClick={() => {
                        addExercise(exercise.id);
                        toast.success(`Exercice "${exercise.title}" ajouté`);
                      }}
                    >
                      <div>
                        <p className="font-semibold text-sm">{exercise.title}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{exercise.type}</Badge>
                          <Badge variant="outline" className="text-xs">Niveau {exercise.difficulty}</Badge>
                          <Badge variant="outline" className="text-xs">🌐 {exercise.language}</Badge>
                        </div>
                      </div>
                      <Plus className="w-5 h-5 text-primary" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Path Modal */}
        {showPathModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPathModal(false)}>
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Ajouter un parcours</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowPathModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un parcours..."
                    value={pathSearchQuery}
                    onChange={(e) => setPathSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {filteredPaths.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Aucun parcours trouvé</p>
                ) : (
                  filteredPaths.map(path => (
                    <div
                      key={path.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent cursor-pointer"
                      onClick={() => {
                        addPath(path.id);
                        toast.success(`Parcours "${path.title}" ajouté`);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${path.color} rounded-lg flex items-center justify-center text-2xl`}>
                          {path.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{path.title}</p>
                          <p className="text-xs text-muted-foreground">Niveau {path.difficulty} • {path.estimatedTime}</p>
                        </div>
                      </div>
                      <Plus className="w-5 h-5 text-primary" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicEditor;
