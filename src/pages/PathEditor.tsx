import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, FolderPlus, ChevronRight, ChevronDown, Gamepad2, FolderTree, Folder, FolderOpen, ArrowUp, ArrowDown, Trophy, Calendar, Edit } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useLearningPaths } from "@/contexts/LearningPathContext";
import { useExercises } from "@/contexts/ExerciseContext";
import { useTopics } from "@/contexts/TopicContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

type AssignmentConfig = {
  enabled: boolean;
  frequency: 'daily' | 'every_2_days' | 'every_3_days' | 'weekly';
  requiredAccuracy: number; // 0-100
  repetitionsRequired: number;
};

type PathItem =
  | { type: 'chapter'; id: string; title: string; xpReward?: number; items: PathItem[] }
  | { type: 'subchapter'; id: string; title: string; xpReward?: number; items: PathItem[] }
  | { type: 'exercise'; id: string; xpReward?: number; assignmentConfig?: AssignmentConfig }
  | { type: 'topic'; id: string; xpReward?: number; assignmentConfig?: AssignmentConfig };

const PathEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLearningPath, updateLearningPath } = useLearningPaths();
  const { exercises } = useExercises();
  const { topics } = useTopics();

  const path = getLearningPath(id || "");

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
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | 'inside'>('inside');

  // XP and Assignment config dialog
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Rename dialog for chapters/subchapters
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameItemId, setRenameItemId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    if (path) {
      setTitle(path.title);
      setDescription(path.description);
      setLanguage(path.language);
      setDifficulty(path.difficulty.toString());
      setEstimatedTime(path.estimatedTime);
      setIcon(path.icon);
      setColor(path.color);
      setPathItems(path.structure || []);

      // Expand all by default
      const allIds = new Set<string>();
      const collectIds = (items: PathItem[]) => {
        items.forEach(item => {
          if (item.type === 'chapter' || item.type === 'subchapter') {
            allIds.add(item.id);
            if (item.items) collectIds(item.items);
          }
        });
      };
      collectIds(path.structure || []);
      setExpandedChapters(allIds);
    }
  }, [path]);

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

  // Language matching
  const languageMatches = (exLang: string, selectedLang: string): boolean => {
    const normalize = (lang: string) => lang.toLowerCase();
    const ex = normalize(exLang);
    const sel = normalize(selectedLang);
    if (ex === sel) return true;
    if ((ex === 'burmese' || ex === 'birman') && (sel === 'burmese' || sel === 'birman')) return true;
    if ((ex === 'japanese' || ex === 'japonais') && (sel === 'japanese' || sel === 'japonais')) return true;
    if ((ex === 'korean' || ex === 'coréen') && (sel === 'korean' || sel === 'coréen')) return true;
    if ((ex === 'thai' || ex === 'thaï') && (sel === 'thai' || sel === 'thaï')) return true;
    return false;
  };

  const availableExercises = exercises.filter(ex =>
    !usedIds.has(ex.id) && languageMatches(ex.language, language)
  );

  const availableTopics = topics.filter(t =>
    !usedIds.has(t.id) && languageMatches(t.language, language)
  );

  // Get all containers
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
      xpReward: 50,
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
      xpReward: 25,
      items: []
    };

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

  // Drag and drop
  const handleDragStart = (item: PathItem, fromStructure: boolean = false) => {
    setDraggedItem(item);
    setDraggedFromStructure(fromStructure);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string, position: 'before' | 'after' | 'inside' = 'inside') => {
    e.preventDefault();
    e.stopPropagation();
    setDropTarget(targetId);
    setDropPosition(position);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.stopPropagation();
    setDropTarget(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string | 'root', position: 'before' | 'after' | 'inside' = 'inside') => {
    e.preventDefault();
    e.stopPropagation();
    setDropTarget(null);

    if (!draggedItem) return;

    // Prevent dropping item on itself
    if (draggedItem.id === targetId) {
      setDraggedItem(null);
      setDraggedFromStructure(false);
      return;
    }

    // Check if item already exists in structure (only for exercises/topics from available list)
    if (!draggedFromStructure && (draggedItem.type === 'exercise' || draggedItem.type === 'topic')) {
      if (usedIds.has(draggedItem.id)) {
        toast.error("Cet élément est déjà présent dans le parcours");
        setDraggedItem(null);
        setDraggedFromStructure(false);
        return;
      }
    }

    // If dragging from structure, we need to move it (remove then add in one operation)
    if (draggedFromStructure) {
      // Remove from old location and add to new location in a single state update
      setPathItems(currentItems => {
        // First, remove the item from its current location
        const removeFromItems = (items: PathItem[]): PathItem[] => {
          return items.filter(item => item.id !== draggedItem.id).map(item => {
            if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
              return { ...item, items: removeFromItems(item.items) };
            }
            return item;
          });
        };

        const itemsWithoutDragged = removeFromItems(currentItems);

        // Then, add it to the new location based on position
        if (targetId === 'root') {
          return [...itemsWithoutDragged, draggedItem];
        } else if (position === 'before' || position === 'after') {
          // Insert before or after a specific item
          const insertNearItem = (items: PathItem[]): { found: boolean; items: PathItem[] } => {
            const targetIndex = items.findIndex(item => item.id === targetId);

            if (targetIndex !== -1) {
              const newItems = [...items];
              const insertIndex = position === 'before' ? targetIndex : targetIndex + 1;
              newItems.splice(insertIndex, 0, draggedItem);
              return { found: true, items: newItems };
            }

            // Search in nested containers
            for (let i = 0; i < items.length; i++) {
              const item = items[i];
              if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
                const result = insertNearItem(item.items);
                if (result.found) {
                  const newItems = [...items];
                  newItems[i] = { ...item, items: result.items };
                  return { found: true, items: newItems };
                }
              }
            }

            return { found: false, items };
          };

          const result = insertNearItem(itemsWithoutDragged);
          return result.items;
        } else {
          // Insert inside a container (default behavior)
          const addToContainer = (items: PathItem[]): PathItem[] => {
            return items.map(parent => {
              if ((parent.type === 'chapter' || parent.type === 'subchapter') && parent.id === targetId) {
                return { ...parent, items: [...parent.items, draggedItem] };
              }
              if ((parent.type === 'chapter' || parent.type === 'subchapter') && parent.items) {
                return { ...parent, items: addToContainer(parent.items) };
              }
              return parent;
            });
          };
          return addToContainer(itemsWithoutDragged);
        }
      });

      // Ensure target is expanded
      if (targetId !== 'root' && position === 'inside') {
        setExpandedChapters(new Set([...expandedChapters, targetId]));
      }
    } else {
      // Adding new item from available list
      if (targetId === 'root') {
        handleAddItemToRoot(draggedItem);
      } else {
        handleAddItemToContainer(draggedItem, targetId);
      }
    }

    setDraggedItem(null);
    setDraggedFromStructure(false);
    toast.success(draggedFromStructure ? "Élément déplacé" : "Élément ajouté");
  };

  // Reorder
  const handleMoveItemUp = (itemId: string) => {
    const moveUpInArray = (items: PathItem[]): PathItem[] => {
      const index = items.findIndex(item => item.id === itemId);
      if (index > 0) {
        const newItems = [...items];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        return newItems;
      }

      return items.map(item => {
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
          return { ...item, items: moveUpInArray(item.items) };
        }
        return item;
      });
    };

    setPathItems(moveUpInArray(pathItems));
  };

  const handleMoveItemDown = (itemId: string) => {
    const moveDownInArray = (items: PathItem[]): PathItem[] => {
      const index = items.findIndex(item => item.id === itemId);
      if (index >= 0 && index < items.length - 1) {
        const newItems = [...items];
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        return newItems;
      }

      return items.map(item => {
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
          return { ...item, items: moveDownInArray(item.items) };
        }
        return item;
      });
    };

    setPathItems(moveDownInArray(pathItems));
  };

  // Configure XP and Assignments for an item
  const openConfigDialog = (itemId: string) => {
    setSelectedItemId(itemId);
    setConfigDialogOpen(true);
  };

  // Rename chapter/subchapter
  const openRenameDialog = (itemId: string) => {
    const item = findItemById(pathItems, itemId);
    if (item && (item.type === 'chapter' || item.type === 'subchapter')) {
      setRenameItemId(itemId);
      setRenameValue(item.title);
      setRenameDialogOpen(true);
    }
  };

  const handleRename = () => {
    if (!renameItemId || !renameValue.trim()) {
      toast.error("Veuillez entrer un titre");
      return;
    }

    const renameInArray = (items: PathItem[]): PathItem[] => {
      return items.map(item => {
        if (item.id === renameItemId && (item.type === 'chapter' || item.type === 'subchapter')) {
          return { ...item, title: renameValue.trim() };
        }
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
          return { ...item, items: renameInArray(item.items) };
        }
        return item;
      });
    };

    setPathItems(renameInArray(pathItems));
    setRenameDialogOpen(false);
    setRenameItemId(null);
    setRenameValue("");
    toast.success("Renommé avec succès");
  };

  const findItemById = (items: PathItem[], id: string): PathItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
        const found = findItemById(item.items, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateItemConfig = (itemId: string, updates: Partial<PathItem>) => {
    const updateInArray = (items: PathItem[]): PathItem[] => {
      return items.map(item => {
        if (item.id === itemId) {
          return { ...item, ...updates };
        }
        if ((item.type === 'chapter' || item.type === 'subchapter') && item.items) {
          return { ...item, items: updateInArray(item.items) };
        }
        return item;
      });
    };

    setPathItems(updateInArray(pathItems));
    toast.success("Configuration mise à jour");
  };

  const handleSave = () => {
    if (!id || !path) return;

    if (!title || !description || pathItems.length === 0) {
      toast.error("Veuillez remplir tous les champs et ajouter au moins un élément");
      return;
    }

    // Extract all exercise IDs
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

    updateLearningPath(id, {
      ...path,
      title,
      description,
      language,
      difficulty: parseInt(difficulty) as 1 | 2 | 3 | 4 | 5,
      estimatedTime,
      icon,
      color,
      structure: pathItems,
      exerciseIds
    });

    toast.success("Parcours mis à jour avec succès!");
    navigate("/creator/path-list");
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
                <div className="flex gap-2 items-center">
                  <Badge variant="outline" className="text-xs bg-amber-200 text-amber-800 border-amber-400">
                    {item.type === 'chapter' ? 'Chapitre' : 'Sous-chapitre'} ({item.items?.length || 0} éléments)
                  </Badge>
                  {item.xpReward && (
                    <Badge variant="secondary" className="text-xs bg-yellow-200 text-yellow-800">
                      <Trophy className="w-3 h-3 mr-1" />
                      {item.xpReward} XP
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  openRenameDialog(item.id);
                }}
                title="Renommer"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  openConfigDialog(item.id);
                }}
                title="Configurer XP"
              >
                <Trophy className="w-4 h-4" />
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
        const hasAssignment = item.assignmentConfig?.enabled;

        const isDropBefore = dropTarget === item.id && dropPosition === 'before';
        const isDropAfter = dropTarget === item.id && dropPosition === 'after';

        return (
          <div key={item.id} style={{ marginLeft: `${indent}px` }}>
            {isDropBefore && (
              <div className="h-1 bg-blue-500 rounded mb-1 animate-pulse"></div>
            )}
            <div
              draggable
              onDragStart={(e) => {
                e.stopPropagation();
                handleDragStart(item, true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const midpoint = rect.top + rect.height / 2;
                const position = e.clientY < midpoint ? 'before' : 'after';
                handleDragOver(e, item.id, position);
              }}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item.id, dropPosition)}
              className={`flex items-center gap-2 bg-blue-50 border rounded-lg p-3 mb-2 cursor-move transition-colors ${
                isDropBefore || isDropAfter
                  ? 'border-blue-500 shadow-lg'
                  : 'border-blue-200 hover:bg-blue-100 hover:border-blue-400'
              }`}
            >
            <Gamepad2 className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="font-semibold text-sm">🎯 {exercise?.title || "Exercice"}</p>
              <div className="flex gap-2 items-center">
                <Badge variant="outline" className="text-xs">{exercise?.type}</Badge>
                {item.xpReward && (
                  <Badge variant="secondary" className="text-xs bg-yellow-200 text-yellow-800">
                    <Trophy className="w-3 h-3 mr-1" />
                    {item.xpReward} XP
                  </Badge>
                )}
                {hasAssignment && (
                  <Badge variant="secondary" className="text-xs bg-green-200 text-green-800">
                    <Calendar className="w-3 h-3 mr-1" />
                    Devoir
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                openConfigDialog(item.id);
              }}
              title="Configurer XP et devoirs"
            >
              <Trophy className="w-4 h-4" />
            </Button>
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
            {isDropAfter && (
              <div className="h-1 bg-blue-500 rounded mt-1 mb-1 animate-pulse"></div>
            )}
          </div>
        );
      }

      if (item.type === 'topic') {
        const topic = topics.find(t => t.id === item.id);
        const hasAssignment = item.assignmentConfig?.enabled;

        const isDropBefore = dropTarget === item.id && dropPosition === 'before';
        const isDropAfter = dropTarget === item.id && dropPosition === 'after';

        return (
          <div key={item.id} style={{ marginLeft: `${indent}px` }}>
            {isDropBefore && (
              <div className="h-1 bg-green-500 rounded mb-1 animate-pulse"></div>
            )}
            <div
              draggable
              onDragStart={(e) => {
                e.stopPropagation();
                handleDragStart(item, true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const midpoint = rect.top + rect.height / 2;
                const position = e.clientY < midpoint ? 'before' : 'after';
                handleDragOver(e, item.id, position);
              }}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item.id, dropPosition)}
              className={`flex items-center gap-2 bg-green-50 border rounded-lg p-3 mb-2 cursor-move transition-colors ${
                isDropBefore || isDropAfter
                  ? 'border-green-500 shadow-lg'
                  : 'border-green-200 hover:bg-green-100 hover:border-green-400'
              }`}
            >
            <FolderTree className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <p className="font-semibold text-sm">{topic?.icon} {topic?.title || "Topic"}</p>
              <div className="flex gap-2 items-center">
                <Badge variant="outline" className="text-xs">Topic</Badge>
                {item.xpReward && (
                  <Badge variant="secondary" className="text-xs bg-yellow-200 text-yellow-800">
                    <Trophy className="w-3 h-3 mr-1" />
                    {item.xpReward} XP
                  </Badge>
                )}
                {hasAssignment && (
                  <Badge variant="secondary" className="text-xs bg-green-200 text-green-800">
                    <Calendar className="w-3 h-3 mr-1" />
                    Devoir
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                openConfigDialog(item.id);
              }}
              title="Configurer XP et devoirs"
            >
              <Trophy className="w-4 h-4" />
            </Button>
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
            {isDropAfter && (
              <div className="h-1 bg-green-500 rounded mt-1 mb-1 animate-pulse"></div>
            )}
          </div>
        );
      }

      return null;
    });
  };

  if (!path) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Parcours introuvable</h2>
          <p className="text-muted-foreground mb-6">Ce parcours n'existe pas.</p>
          <Button onClick={() => navigate("/creator/path-list")}>
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  const selectedItem = selectedItemId ? findItemById(pathItems, selectedItemId) : null;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/creator/path-list")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Édition du Parcours</h1>
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
                            onDragStart={() => handleDragStart({ type: 'exercise', id: exercise.id, xpReward: 10 })}
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
                                  onClick={() => handleAddItemToContainer({ type: 'exercise', id: exercise.id, xpReward: 10 }, container.id)}
                                  title={`→ ${container.title}`}
                                  className="h-7 px-2 text-xs"
                                >
                                  📁
                                </Button>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddItemToRoot({ type: 'exercise', id: exercise.id, xpReward: 10 })}
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
                            onDragStart={() => handleDragStart({ type: 'topic', id: topic.id, xpReward: 5 })}
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
                                  onClick={() => handleAddItemToContainer({ type: 'topic', id: topic.id, xpReward: 5 }, container.id)}
                                  title={`→ ${container.title}`}
                                  className="h-7 px-2 text-xs"
                                >
                                  📁
                                </Button>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddItemToRoot({ type: 'topic', id: topic.id, xpReward: 5 })}
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

      {/* XP and Assignment Config Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configuration - {selectedItem?.type === 'chapter' ? selectedItem.title : selectedItem?.type === 'subchapter' ? selectedItem.title : (selectedItem?.type === 'exercise' ? exercises.find(e => e.id === selectedItem.id)?.title : topics.find(t => t.id === selectedItem?.id)?.title)}</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              {/* XP Configuration */}
              <div>
                <Label htmlFor="xp-reward">Récompense XP</Label>
                <Input
                  id="xp-reward"
                  type="number"
                  value={selectedItem.xpReward || 0}
                  onChange={(e) => updateItemConfig(selectedItem.id, { xpReward: parseInt(e.target.value) || 0 })}
                  placeholder="10"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  XP gagnés lors de la complétion de cet élément
                </p>
              </div>

              {/* Assignment Configuration - Only for exercises and topics */}
              {(selectedItem.type === 'exercise' || selectedItem.type === 'topic') && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Configuration des devoirs
                    </CardTitle>
                    <CardDescription>
                      Paramétrer les devoirs automatiques pour les utilisateurs inscrits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="assignment-enabled"
                        checked={selectedItem.assignmentConfig?.enabled || false}
                        onChange={(e) => {
                          const currentConfig = selectedItem.assignmentConfig || {
                            enabled: false,
                            frequency: 'daily' as const,
                            requiredAccuracy: 80,
                            repetitionsRequired: 3
                          };
                          updateItemConfig(selectedItem.id, {
                            assignmentConfig: { ...currentConfig, enabled: e.target.checked }
                          });
                        }}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="assignment-enabled" className="cursor-pointer">
                        Activer les devoirs automatiques
                      </Label>
                    </div>

                    {selectedItem.assignmentConfig?.enabled && (
                      <>
                        <div>
                          <Label htmlFor="frequency">Fréquence de révision</Label>
                          <Select
                            value={selectedItem.assignmentConfig?.frequency || 'daily'}
                            onValueChange={(value) => {
                              const currentConfig = selectedItem.assignmentConfig!;
                              updateItemConfig(selectedItem.id, {
                                assignmentConfig: { ...currentConfig, frequency: value as any }
                              });
                            }}
                          >
                            <SelectTrigger id="frequency">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Quotidien</SelectItem>
                              <SelectItem value="every_2_days">Tous les 2 jours</SelectItem>
                              <SelectItem value="every_3_days">Tous les 3 jours</SelectItem>
                              <SelectItem value="weekly">Hebdomadaire</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="accuracy">Taux de réussite requis (%)</Label>
                          <Input
                            id="accuracy"
                            type="number"
                            min="0"
                            max="100"
                            value={selectedItem.assignmentConfig?.requiredAccuracy || 80}
                            onChange={(e) => {
                              const currentConfig = selectedItem.assignmentConfig!;
                              updateItemConfig(selectedItem.id, {
                                assignmentConfig: { ...currentConfig, requiredAccuracy: parseInt(e.target.value) || 80 }
                              });
                            }}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            L'utilisateur doit atteindre ce taux de réussite avant de passer à l'étape suivante
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="repetitions">Nombre de répétitions requises</Label>
                          <Input
                            id="repetitions"
                            type="number"
                            min="1"
                            max="10"
                            value={selectedItem.assignmentConfig?.repetitionsRequired || 3}
                            onChange={(e) => {
                              const currentConfig = selectedItem.assignmentConfig!;
                              updateItemConfig(selectedItem.id, {
                                assignmentConfig: { ...currentConfig, repetitionsRequired: parseInt(e.target.value) || 3 }
                              });
                            }}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Nombre de fois que l'exercice doit être complété avec succès
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setConfigDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Chapter/Subchapter Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renommer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rename-title">Nouveau titre</Label>
              <Input
                id="rename-title"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                placeholder="Entrez le nouveau titre"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRename();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleRename}>
              Renommer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PathEditor;
