import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, FolderPlus, ChevronRight, ChevronDown, Gamepad2, FolderTree, Folder, FolderOpen, ArrowUp, ArrowDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLearningPaths } from "@/contexts/LearningPathContext";
import { useExercises } from "@/contexts/ExerciseContext";
import { useTopics } from "@/contexts/TopicContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type PathItem =
  | { type: 'chapter'; id: string; title: string; items: PathItem[] }
  | { type: 'subchapter'; id: string; title: string; items: PathItem[] }
  | { type: 'exercise'; id: string }
  | { type: 'topic'; id: string };

const PathCreator = () => {
  const navigate = useNavigate();
  const { addLearningPath } = useLearningPaths();
  const { exercises } = useExercises();
  const { topics } = useTopics();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("birman");
  const [difficulty, setDifficulty] = useState("1");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [icon, setIcon] = useState("🎯");
  const [color, setColor] = useState("from-blue-500 to-cyan-500");
  const [pathItems, setPathItems] = useState<PathItem[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

  // Chapter/Subchapter creation
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newSubchapterTitle, setNewSubchapterTitle] = useState("");
  const [selectedParentId, setSelectedParentId] = useState<string>("");

  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState<PathItem | null>(null);
  const [draggedFromStructure, setDraggedFromStructure] = useState<boolean>(false);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  // Get all exercise and topic IDs that are already used
  const getUsedIds = (items: PathItem[]): Set<string> => {
    const used = new Set<string>();
    const traverse = (arr: PathItem[]) => {
      arr.forEach(item => {
        if (item.type === 'exercise' || item.type === 'topic') {
          used.add(item.id);
        }
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
          traverse(item.items);
        }
      });
    };
    traverse(items);
    return used;
  };

  const usedIds = getUsedIds(pathItems);

  // Language mapping for compatibility (birman = burmese, etc.)
  const languageMatches = (exLang: string, selectedLang: string): boolean => {
    const normalize = (lang: string) => lang.toLowerCase();
    const ex = normalize(exLang);
    const sel = normalize(selectedLang);

    // Direct match
    if (ex === sel) return true;

    // Burmese/Birman equivalence
    if ((ex === 'burmese' || ex === 'birman') && (sel === 'burmese' || sel === 'birman')) return true;

    // Japanese/Japonais equivalence
    if ((ex === 'japanese' || ex === 'japonais') && (sel === 'japanese' || sel === 'japonais')) return true;

    // Korean/Coréen equivalence
    if ((ex === 'korean' || ex === 'coréen') && (sel === 'korean' || sel === 'coréen')) return true;

    // Thai/Thaï equivalence
    if ((ex === 'thai' || ex === 'thaï') && (sel === 'thai' || sel === 'thaï')) return true;

    return false;
  };

  const availableExercises = exercises.filter(ex =>
    !usedIds.has(ex.id) && languageMatches(ex.language, language)
  );

  const availableTopics = topics.filter(t =>
    !usedIds.has(t.id) && languageMatches(t.language, language)
  );

  // Get all chapters and subchapters for parent selection
  const getAllContainers = (items: PathItem[], depth = 0): Array<{ id: string; title: string; depth: number; type: string }> => {
    const containers: Array<{ id: string; title: string; depth: number; type: string }> = [];
    items.forEach(item => {
      if (item.type === 'chapter' || item.type === 'subchapter') {
        containers.push({ id: item.id, title: item.title, depth, type: item.type });
        if (item.items) {
          containers.push(...getAllContainers(item.items, depth + 1));
        }
      }
    });
    return containers;
  };

  const allContainers = getAllContainers(pathItems);

  const toggleChapter = (id: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedChapters(newExpanded);
  };

  const handleAddChapter = () => {
    if (!newChapterTitle.trim()) {
      toast.error("Veuillez entrer un titre de chapitre");
      return;
    }

    const newChapter: PathItem = {
      type: 'chapter',
      id: `chapter-${Date.now()}`,
      title: newChapterTitle,
      items: []
    };

    setPathItems([...pathItems, newChapter]);
    setExpandedChapters(new Set([...expandedChapters, newChapter.id]));
    setNewChapterTitle("");
    toast.success("Chapitre ajouté");
  };

  const handleAddSubchapter = () => {
    if (!newSubchapterTitle.trim() || !selectedParentId) {
      toast.error("Veuillez entrer un titre et sélectionner un conteneur parent");
      return;
    }

    const newSubchapter: PathItem = {
      type: 'subchapter',
      id: `subchapter-${Date.now()}`,
      title: newSubchapterTitle,
      items: []
    };

    // Add subchapter to the selected parent
    const addToParent = (items: PathItem[]): PathItem[] => {
      return items.map(item => {
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.id === selectedParentId) {
          return { ...item, items: [...item.items, newSubchapter] };
        }
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
          return { ...item, items: addToParent(item.items) };
        }
        return item;
      });
    };

    setPathItems(addToParent(pathItems));
    setExpandedChapters(new Set([...expandedChapters, selectedParentId, newSubchapter.id]));
    setNewSubchapterTitle("");
    toast.success("Sous-chapitre ajouté");
  };

  const handleAddItemToContainer = (item: PathItem, containerId: string) => {
    const addToContainer = (items: PathItem[]): PathItem[] => {
      return items.map(parent => {
        if ((parent.type === 'chapter' || parent.type === 'subchapter') && parent.id === containerId) {
          return { ...parent, items: [...parent.items, item] };
        }
        if ((parent.type === 'chapter' || parent.type === 'subchapter') && parent.items) {
          return { ...parent, items: addToContainer(parent.items) };
        }
        return parent;
      });
    };

    setPathItems(addToContainer(pathItems));
    setExpandedChapters(new Set([...expandedChapters, containerId]));
  };

  const handleAddItemToRoot = (item: PathItem) => {
    setPathItems([...pathItems, item]);
  };

  const handleRemoveItem = (itemId: string) => {
    const removeFromItems = (items: PathItem[]): PathItem[] => {
      return items.filter(item => item.id !== itemId).map(item => {
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
          return { ...item, items: removeFromItems(item.items) };
        }
        return item;
      });
    };

    setPathItems(removeFromItems(pathItems));
    toast.success("Élément supprimé");
  };

  // Drag and drop handlers
  const handleDragStart = (item: PathItem, fromStructure: boolean = false) => {
    setDraggedItem(item);
    setDraggedFromStructure(fromStructure);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDropTarget(targetId);
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string | 'root') => {
    e.preventDefault();
    e.stopPropagation();
    setDropTarget(null);

    if (!draggedItem) return;

    // If dragged from structure, remove it from old location first
    if (draggedFromStructure) {
      handleRemoveItem(draggedItem.id);
    }

    // Add to new location
    if (targetId === 'root') {
      handleAddItemToRoot(draggedItem);
    } else {
      handleAddItemToContainer(draggedItem, targetId);
    }

    setDraggedItem(null);
    setDraggedFromStructure(false);
    toast.success(draggedFromStructure ? "Élément déplacé" : "Élément ajouté");
  };

  // Reorder items within their container
  const handleMoveItemUp = (itemId: string, parentPath: string[] = []) => {
    const moveUpInArray = (items: PathItem[]): PathItem[] => {
      const index = items.findIndex(item => item.id === itemId);
      if (index > 0) {
        const newItems = [...items];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        return newItems;
      }

      // Search in nested containers
      return items.map(item => {
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
          return { ...item, items: moveUpInArray(item.items) };
        }
        return item;
      });
    };

    setPathItems(moveUpInArray(pathItems));
  };

  const handleMoveItemDown = (itemId: string, parentPath: string[] = []) => {
    const moveDownInArray = (items: PathItem[]): PathItem[] => {
      const index = items.findIndex(item => item.id === itemId);
      if (index >= 0 && index < items.length - 1) {
        const newItems = [...items];
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        return newItems;
      }

      // Search in nested containers
      return items.map(item => {
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
          return { ...item, items: moveDownInArray(item.items) };
        }
        return item;
      });
    };

    setPathItems(moveDownInArray(pathItems));
  };

  const handleSave = () => {
    if (!title || !description || pathItems.length === 0) {
      toast.error("Veuillez remplir tous les champs et ajouter au moins un élément");
      return;
    }

    // Extract all exercise IDs recursively
    const extractExerciseIds = (items: PathItem[]): string[] => {
      const ids: string[] = [];
      items.forEach(item => {
        if (item.type === 'exercise') {
          ids.push(item.id);
        }
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
          ids.push(...extractExerciseIds(item.items));
        }
      });
      return ids;
    };

    const exerciseIds = extractExerciseIds(pathItems);

    const newPath = addLearningPath({
      title,
      description,
      language,
      difficulty: parseInt(difficulty) as 1 | 2 | 3 | 4 | 5,
      estimatedTime,
      exerciseIds,
      icon,
      color,
      authorId: "current-user",
      isPublished: false
    });

    toast.success("Parcours créé avec succès !");
    navigate("/learning-paths");
  };

  const colorOptions = [
    { label: "Bleu", value: "from-blue-500 to-cyan-500" },
    { label: "Violet", value: "from-purple-500 to-pink-500" },
    { label: "Vert", value: "from-green-500 to-emerald-500" },
    { label: "Jaune/Rouge", value: "from-yellow-500 to-red-500" },
    { label: "Orange", value: "from-orange-500 to-red-500" },
    { label: "Rose", value: "from-pink-500 to-rose-500" }
  ];

  const renderPathItems = (items: PathItem[], depth = 0): JSX.Element[] => {
    return items.map((item, index) => {
      const indent = depth * 24;
      const isExpanded = expandedChapters.has(item.id);
      const isFirst = index === 0;
      const isLast = index === items.length - 1;

      if (item.type === 'chapter' || item.type === 'subchapter') {
        const hasItems = item.items && item.items.length > 0;
        const Icon = isExpanded ? FolderOpen : Folder;
        const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;
        const isDropTarget = dropTarget === item.id;

        return (
          <div key={item.id}>
            <div
              className={`flex items-center gap-2 border-2 rounded-lg p-3 mb-2 transition-colors cursor-pointer ${
                isDropTarget
                  ? 'bg-amber-200 border-amber-500 shadow-lg'
                  : 'bg-amber-50 border-amber-300 hover:bg-amber-100'
              }`}
              style={{ marginLeft: `${indent}px` }}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item.id)}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleChapter(item.id)}
                className="h-6 w-6 p-0"
              >
                <ChevronIcon className="w-4 h-4" />
              </Button>
              <Icon className="w-5 h-5 text-amber-700" />
              <div className="flex-1">
                <p className="font-bold text-sm text-amber-900">{item.title}</p>
                <Badge variant="outline" className="text-xs bg-amber-200 text-amber-800 border-amber-400">
                  {item.type === 'chapter' ? 'Chapitre' : 'Sous-chapitre'} ({item.items?.length || 0} éléments)
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            {isExpanded && item.items && item.items.length > 0 && (
              <div className="ml-6 border-l-2 border-amber-200 pl-2 mb-2">
                {renderPathItems(item.items, depth + 1)}
              </div>
            )}
            {isExpanded && (!item.items || item.items.length === 0) && (
              <div
                className={`ml-6 border-l-2 pl-4 mb-2 transition-colors ${
                  dropTarget === item.id ? 'border-amber-500 bg-amber-50' : 'border-amber-200'
                }`}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, item.id)}
              >
                <p className={`text-xs italic py-2 ${
                  dropTarget === item.id ? 'text-amber-700 font-semibold' : 'text-muted-foreground'
                }`}>
                  📂 {dropTarget === item.id ? 'Déposer ici ⬇️' : 'Dossier vide - Ajoutez des exercices ou topics'}
                </p>
              </div>
            )}
          </div>
        );
      }

      if (item.type === 'exercise') {
        const exercise = exercises.find(ex => ex.id === item.id);
        return (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              handleDragStart(item, true);
            }}
            className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2 cursor-move hover:bg-blue-100 hover:border-blue-400 transition-colors"
            style={{ marginLeft: `${indent}px` }}
          >
            <Gamepad2 className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="font-semibold text-sm">🎯 {exercise?.title || "Exercice"}</p>
              <Badge variant="outline" className="text-xs">{exercise?.type}</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleMoveItemUp(item.id);
              }}
              disabled={isFirst}
              className={isFirst ? "opacity-30 cursor-not-allowed" : ""}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleMoveItemDown(item.id);
              }}
              disabled={isLast}
              className={isLast ? "opacity-30 cursor-not-allowed" : ""}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveItem(item.id);
              }}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        );
      }

      if (item.type === 'topic') {
        const topic = topics.find(t => t.id === item.id);
        return (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              handleDragStart(item, true);
            }}
            className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3 mb-2 cursor-move hover:bg-green-100 hover:border-green-400 transition-colors"
            style={{ marginLeft: `${indent}px` }}
          >
            <FolderTree className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <p className="font-semibold text-sm">{topic?.icon} {topic?.title || "Topic"}</p>
              <Badge variant="outline" className="text-xs">Topic</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleMoveItemUp(item.id);
              }}
              disabled={isFirst}
              className={isFirst ? "opacity-30 cursor-not-allowed" : ""}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleMoveItemDown(item.id);
              }}
              disabled={isLast}
              className={isLast ? "opacity-30 cursor-not-allowed" : ""}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveItem(item.id);
              }}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/creator")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Créer un Parcours</h1>
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de base</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre du parcours</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Birman - Les Fondamentaux"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décrivez l'objectif de ce parcours..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Langue</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="birman">Birman</SelectItem>
                        <SelectItem value="japonais">Japonais</SelectItem>
                        <SelectItem value="coréen">Coréen</SelectItem>
                        <SelectItem value="thaï">Thaï</SelectItem>
                        <SelectItem value="français">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulté</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Niveau 1 - Débutant</SelectItem>
                        <SelectItem value="2">Niveau 2 - Élémentaire</SelectItem>
                        <SelectItem value="3">Niveau 3 - Intermédiaire</SelectItem>
                        <SelectItem value="4">Niveau 4 - Avancé</SelectItem>
                        <SelectItem value="5">Niveau 5 - Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="estimatedTime">Temps estimé</Label>
                  <Input
                    id="estimatedTime"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="Ex: 3 heures"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icon">Icône (emoji)</Label>
                    <Input
                      id="icon"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="🎯"
                      maxLength={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="color">Couleur</Label>
                    <Select value={color} onValueChange={setColor}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <Label>Aperçu</Label>
                  <div className={`w-full h-32 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-6xl mt-2`}>
                    {icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Path Structure */}
          <div className="space-y-6">
            {/* Path Items Tree */}
            <Card>
              <CardHeader>
                <CardTitle>Structure du parcours ({pathItems.length} éléments racine)</CardTitle>
              </CardHeader>
              <CardContent
                className={`space-y-2 max-h-[500px] overflow-y-auto transition-colors ${
                  dropTarget === 'root' ? 'bg-blue-50 border-2 border-dashed border-blue-400' : ''
                }`}
                onDragOver={(e) => handleDragOver(e, 'root')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'root')}
              >
                {pathItems.length === 0 ? (
                  <div
                    className={`text-sm text-center py-8 rounded-lg border-2 border-dashed transition-colors ${
                      dropTarget === 'root'
                        ? 'text-blue-600 bg-blue-50 border-blue-400'
                        : 'text-muted-foreground bg-gray-50 border-gray-300'
                    }`}
                  >
                    <p className="mb-2">📂 Aucun élément</p>
                    <p className="text-xs">Glissez-déposez des exercices ou topics ici</p>
                  </div>
                ) : (
                  <>
                    {renderPathItems(pathItems)}
                    {dropTarget === 'root' && (
                      <div className="border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg p-4 text-center text-sm text-blue-600">
                        ⬇️ Déposer à la racine
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Add Items */}
            <Card>
              <CardHeader>
                <CardTitle>Ajouter des éléments</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chapter">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="chapter">Chapitres</TabsTrigger>
                    <TabsTrigger value="subchapter">Sous-ch.</TabsTrigger>
                    <TabsTrigger value="exercise">Exercices</TabsTrigger>
                    <TabsTrigger value="topic">Topics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="chapter" className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Titre du chapitre"
                        value={newChapterTitle}
                        onChange={(e) => setNewChapterTitle(e.target.value)}
                      />
                      <Button onClick={handleAddChapter}>
                        <FolderPlus className="w-4 h-4 mr-1" />
                        Créer
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      📁 Les chapitres sont des dossiers pouvant contenir exercices, topics et sous-chapitres
                    </p>
                  </TabsContent>

                  <TabsContent value="subchapter" className="space-y-3">
                    <Select value={selectedParentId} onValueChange={setSelectedParentId}>
                      <SelectTrigger>
                        <SelectValue placeholder="📂 Sélectionner le dossier parent" />
                      </SelectTrigger>
                      <SelectContent>
                        {allContainers.map(container => (
                          <SelectItem key={container.id} value={container.id}>
                            {"  ".repeat(container.depth)}📁 {container.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Titre du sous-chapitre"
                        value={newSubchapterTitle}
                        onChange={(e) => setNewSubchapterTitle(e.target.value)}
                      />
                      <Button onClick={handleAddSubchapter} disabled={!selectedParentId}>
                        <Plus className="w-4 h-4 mr-1" />
                        Créer
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="exercise" className="space-y-3">
                    <div className="space-y-2 max-h-[250px] overflow-y-auto">
                      {availableExercises.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Aucun exercice disponible
                        </p>
                      ) : (
                        availableExercises.map(exercise => (
                          <div
                            key={exercise.id}
                            draggable
                            onDragStart={() => handleDragStart({ type: 'exercise', id: exercise.id })}
                            className="flex items-center justify-between bg-white border rounded-lg p-2 cursor-move hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-sm">🎯 {exercise.title}</p>
                              <p className="text-xs text-muted-foreground">{exercise.type}</p>
                            </div>
                            <div className="flex gap-1">
                              {allContainers.slice(0, 2).map(container => (
                                <Button
                                  key={container.id}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleAddItemToContainer({ type: 'exercise', id: exercise.id }, container.id)}
                                  title={`→ ${container.title}`}
                                  className="h-7 px-2 text-xs"
                                >
                                  📁
                                </Button>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddItemToRoot({ type: 'exercise', id: exercise.id })}
                                title="Ajouter à la racine"
                                className="h-7"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      💡 Glissez-déposez les exercices vers les dossiers, ou cliquez sur 📁 / +
                    </p>
                  </TabsContent>

                  <TabsContent value="topic" className="space-y-3">
                    <div className="space-y-2 max-h-[250px] overflow-y-auto">
                      {availableTopics.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Aucun topic disponible
                        </p>
                      ) : (
                        availableTopics.map(topic => (
                          <div
                            key={topic.id}
                            draggable
                            onDragStart={() => handleDragStart({ type: 'topic', id: topic.id })}
                            className="flex items-center justify-between bg-white border rounded-lg p-2 cursor-move hover:bg-green-50 hover:border-green-300 transition-colors"
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{topic.icon} {topic.title}</p>
                              <p className="text-xs text-muted-foreground">{topic.description.substring(0, 40)}...</p>
                            </div>
                            <div className="flex gap-1">
                              {allContainers.slice(0, 2).map(container => (
                                <Button
                                  key={container.id}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleAddItemToContainer({ type: 'topic', id: topic.id }, container.id)}
                                  title={`→ ${container.title}`}
                                  className="h-7 px-2 text-xs"
                                >
                                  📁
                                </Button>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddItemToRoot({ type: 'topic', id: topic.id })}
                                title="Ajouter à la racine"
                                className="h-7"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      💡 Glissez-déposez les topics vers les dossiers, ou cliquez sur 📁 / +
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathCreator;
