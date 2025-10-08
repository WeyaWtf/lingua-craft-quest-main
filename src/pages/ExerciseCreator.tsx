import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Eye, FileText, ArrowLeft, Plus, Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useExercises } from "@/contexts/ExerciseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ExerciseCreator = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getExercise, addExercise, updateExercise, publishExercise, deleteExercise } = useExercises();
  
  const existingExercise = id ? getExercise(id) : null;
  
  const [selectedType, setSelectedType] = useState<string>(existingExercise?.type || "flashcard");
  const [title, setTitle] = useState(existingExercise?.title || "");
  const [difficulty, setDifficulty] = useState(existingExercise?.difficulty.toString() || "1");
  const [source, setSource] = useState<string>(existingExercise?.source || "personal");
  const [language, setLanguage] = useState(existingExercise?.language || "birman");
  const [tags, setTags] = useState(existingExercise?.tags.join(", ") || "");
  
  // Flashcard specific fields - Multiple cards support
  const [flashcards, setFlashcards] = useState<Array<{ front: string; back: string; category: string; id: string }>>(
    existingExercise?.content?.cards || [{ front: "", back: "", category: "vocabulary", id: "1" }]
  );
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffleSides, setShuffleSides] = useState<boolean>(existingExercise?.content?.shuffleSides || false);

  // Association specific fields - Groupes de paires (pages)
  const [pairGroups, setPairGroups] = useState<Array<Array<{ left: string; right: string; id: string }>>>(
    existingExercise?.content?.pairGroups || [[
      { left: "", right: "", id: "1-1" }
    ]]
  );
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [shufflePairs, setShufflePairs] = useState<boolean>(existingExercise?.content?.shufflePairs || false);

  // Quiz specific fields
  const [question, setQuestion] = useState(existingExercise?.content?.question || "");
  const [answers, setAnswers] = useState<Array<{ text: string; isCorrect: boolean; id: string }>>(
    existingExercise?.content?.answers || [
      { text: "", isCorrect: true, id: "1" },
      { text: "", isCorrect: false, id: "2" },
      { text: "", isCorrect: false, id: "3" },
      { text: "", isCorrect: false, id: "4" },
    ]
  );

  // Completion specific fields
  const [sentenceTemplate, setSentenceTemplate] = useState(existingExercise?.content?.sentence || "");
  const [blanks, setBlanks] = useState<Array<{ answer: string; hint?: string; id: string }>>(
    existingExercise?.content?.blanks || [{ answer: "", hint: "", id: "1" }]
  );

  // Translation specific fields - Multiple exercises support
  const [translationExercises, setTranslationExercises] = useState<Array<{ sourceText: string; targetText: string; hints: string; notes: string; id: string }>>(
    existingExercise?.content?.exercises || [{ sourceText: "", targetText: "", hints: "", notes: "", id: "1" }]
  );
  const [currentTranslationIndex, setCurrentTranslationIndex] = useState(0);
  const [shuffleExercises, setShuffleExercises] = useState<boolean>(existingExercise?.content?.shuffleExercises || false);
  const [translationGeneralNotes, setTranslationGeneralNotes] = useState(existingExercise?.content?.generalNotes || "");

  // Search functionality
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ index: number; field: string; content: string }>>([]);

  // Page navigation modal
  const [showPageNavigator, setShowPageNavigator] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim() || selectedType !== "translation") {
      setSearchResults([]);
      return;
    }

    const results: Array<{ index: number; field: string; content: string }> = [];
    const lowerQuery = query.toLowerCase();

    translationExercises.forEach((exercise, index) => {
      if (exercise.sourceText.toLowerCase().includes(lowerQuery)) {
        results.push({ index, field: "Source", content: exercise.sourceText });
      }
      if (exercise.targetText.toLowerCase().includes(lowerQuery)) {
        results.push({ index, field: "Traduction", content: exercise.targetText });
      }
      if (exercise.hints.toLowerCase().includes(lowerQuery)) {
        results.push({ index, field: "Indices", content: exercise.hints });
      }
      if (exercise.notes.toLowerCase().includes(lowerQuery)) {
        results.push({ index, field: "Notes", content: exercise.notes });
      }
    });

    setSearchResults(results);
  };

  const goToExercise = (index: number) => {
    setCurrentTranslationIndex(index);
    setShowSearchModal(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Conversation specific fields
  const [dialogueLines, setDialogueLines] = useState<Array<{ speaker: string; text: string; translation: string; id: string }>>(
    existingExercise?.content?.dialogue || [
      { speaker: "A", text: "", translation: "", id: "1" },
      { speaker: "B", text: "", translation: "", id: "2" },
    ]
  );

  // Grammar Identification specific fields
  const [grammarExercises, setGrammarExercises] = useState<Array<{
    id: string;
    sentence: string;
    elements: Array<{ id: string; word: string; category: string; position: number }>;
    translation: string;
    hints?: string;
  }>>(
    existingExercise?.content?.exercises || [{ 
      id: "1", 
      sentence: "", 
      elements: [], 
      translation: "", 
      hints: "" 
    }]
  );
  const [currentGrammarIndex, setCurrentGrammarIndex] = useState(0);
  const [grammarGeneralNotes, setGrammarGeneralNotes] = useState(existingExercise?.content?.generalNotes || "");

  // Sentence Mixer specific fields
  const [mixerExercises, setMixerExercises] = useState<Array<{
    id: string;
    reference: string;
    blocks: Array<{ id: string; text: string; category: string; correctPosition: number }>;
    correctOrder: string[];
    translation: string;
    hints?: string;
    notes?: string;
  }>>(
    existingExercise?.content?.exercises || [{
      id: "1",
      reference: "",
      blocks: [],
      correctOrder: [],
      translation: "",
      hints: "",
      notes: ""
    }]
  );
  const [currentMixerIndex, setCurrentMixerIndex] = useState(0);
  const [mixerDifficulty, setMixerDifficulty] = useState<"easy" | "normal" | "hard">(
    existingExercise?.content?.difficulty || "easy"
  );
  const [mixerShowCategories, setMixerShowCategories] = useState<boolean>(
    existingExercise?.content?.showCategories ?? true
  );
  const [mixerGeneralNotes, setMixerGeneralNotes] = useState(existingExercise?.content?.generalNotes || "");

  const exerciseTypes = [
    { value: "flashcard", icon: "📇", label: "Carte Flash", description: "Carte recto/verso pour la mémorisation" },
    { value: "association", icon: "🔗", label: "Association", description: "Reliez les concepts, sons et significations" },
    { value: "quiz", icon: "🎯", label: "Quiz", description: "Testez vos connaissances" },
    { value: "completion", icon: "✍️", label: "Complétion", description: "Complétez les phrases" },
    { value: "translation", icon: "📖", label: "Traduction", description: "Traduisez entre langues" },
    { value: "conversation", icon: "💬", label: "Conversation", description: "Dialogues pratiques" },
    { value: "grammar-identification", icon: "🔍", label: "Identification Grammaticale", description: "Identifiez les éléments grammaticaux" },
    { value: "sentence-mixer", icon: "🔀", label: "Mixeur de Phrases", description: "Reconstructisez des phrases mélangées" },
    { value: "grammar-transformation", icon: "💬", label: "Transformation Grammaticale", description: "Transformez des phrases selon des règles" },
    { value: "error-hunt", icon: "🎯", label: "Chasse aux Erreurs", description: "Détectez et corrigez les erreurs" },
  ];

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Le titre est requis");
      return false;
    }

    if (selectedType === "flashcard") {
      if (flashcards.length === 0 || flashcards.some(card => !card.front.trim() || !card.back.trim())) {
        toast.error("Toutes les cartes doivent avoir un recto et un verso");
        return false;
      }
    }

    if (selectedType === "association") {
      if (pairGroups.length === 0) {
        toast.error("Au moins une page de paires est requise");
        return false;
      }
      for (const group of pairGroups) {
        if (group.length < 1) {
          toast.error("Chaque page doit contenir au moins 1 paire");
          return false;
        }
        if (group.some(p => !p.left.trim() || !p.right.trim())) {
          toast.error("Toutes les paires doivent être remplies");
          return false;
        }
      }
    }

    if (selectedType === "quiz") {
      if (!question.trim()) {
        toast.error("La question est requise");
        return false;
      }
      if (answers.some(a => !a.text.trim())) {
        toast.error("Toutes les réponses doivent être remplies");
        return false;
      }
      if (!answers.some(a => a.isCorrect)) {
        toast.error("Au moins une réponse correcte est requise");
        return false;
      }
    }

    if (selectedType === "completion") {
      if (!sentenceTemplate.trim()) {
        toast.error("La phrase à compléter est requise");
        return false;
      }
      if (blanks.length === 0 || blanks.some(b => !b.answer.trim())) {
        toast.error("Toutes les réponses des espaces vides sont requises");
        return false;
      }
    }

    if (selectedType === "translation") {
      if (translationExercises.length === 0) {
        toast.error("Au moins un exercice de traduction est requis");
        return false;
      }
      if (translationExercises.some(ex => !ex.sourceText.trim() || !ex.targetText.trim())) {
        toast.error("Tous les exercices doivent avoir un texte source et une traduction");
        return false;
      }
    }

    if (selectedType === "conversation") {
      if (dialogueLines.length === 0 || dialogueLines.some(l => !l.text.trim() || !l.translation.trim())) {
        toast.error("Toutes les lignes de dialogue doivent être remplies");
        return false;
      }
    }

    if (selectedType === "grammar-identification") {
      if (grammarExercises.length === 0) {
        toast.error("Au moins un exercice d'identification est requis");
        return false;
      }
      if (grammarExercises.some(ex => !ex.sentence.trim() || !ex.translation.trim())) {
        toast.error("Tous les exercices doivent avoir une phrase et une traduction");
        return false;
      }
      if (grammarExercises.some(ex => ex.elements.length === 0)) {
        toast.error("Tous les exercices doivent avoir des éléments grammaticaux à identifier");
        return false;
      }
    }

    if (selectedType === "sentence-mixer") {
      if (mixerExercises.length === 0) {
        toast.error("Au moins un exercice de mixeur est requis");
        return false;
      }
      if (mixerExercises.some(ex => !ex.reference.trim() || !ex.translation.trim())) {
        toast.error("Tous les exercices doivent avoir une référence et une traduction");
        return false;
      }
      if (mixerExercises.some(ex => ex.blocks.length === 0)) {
        toast.error("Tous les exercices doivent avoir des blocs de mots");
        return false;
      }
    }

    return true;
  };

  const getExerciseContent = () => {
    switch (selectedType) {
      case "flashcard":
        return {
          cards: flashcards.map(card => ({
            ...card,
            front: card.front.trim(),
            back: card.back.trim(),
          })),
          shuffleSides: shuffleSides,
        };
      case "association":
        return {
          pairGroups: pairGroups.map(group =>
            group.map(p => ({ ...p, left: p.left.trim(), right: p.right.trim() }))
          ),
          shufflePairs: shufflePairs,
        };
      case "quiz":
        return {
          question: question.trim(),
          answers: answers.map(a => ({ ...a, text: a.text.trim() })),
        };
      case "completion":
        return {
          sentence: sentenceTemplate.trim(),
          blanks: blanks.map(b => ({ ...b, answer: b.answer.trim() })),
        };
      case "translation":
        return {
          exercises: translationExercises.map(ex => ({
            sourceText: ex.sourceText.trim(),
            targetText: ex.targetText.trim(),
            hints: ex.hints.trim(),
            notes: ex.notes.trim(),
          })),
          shuffleExercises: shuffleExercises,
          generalNotes: translationGeneralNotes.trim(),
        };
      case "conversation":
        return {
          dialogue: dialogueLines.map(l => ({
            ...l,
            text: l.text.trim(),
            translation: l.translation.trim()
          })),
        };
      case "grammar-identification":
        return {
          exercises: grammarExercises.map(ex => ({
            id: ex.id,
            sentence: ex.sentence.trim(),
            elements: ex.elements.map(el => ({
              ...el,
              word: el.word.trim()
            })),
            translation: ex.translation.trim(),
            hints: ex.hints?.trim() || ""
          })),
          generalNotes: grammarGeneralNotes.trim()
        };
      case "sentence-mixer":
        return {
          exercises: mixerExercises.map(ex => ({
            id: ex.id,
            reference: ex.reference.trim(),
            blocks: ex.blocks.map(block => ({
              ...block,
              text: block.text.trim()
            })),
            correctOrder: ex.correctOrder,
            translation: ex.translation.trim(),
            hints: ex.hints?.trim() || "",
            notes: ex.notes?.trim() || ""
          })),
          difficulty: mixerDifficulty,
          showCategories: mixerShowCategories,
          generalNotes: mixerGeneralNotes.trim()
        };
      default:
        return {};
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const exerciseData = {
      type: selectedType as any,
      title: title.trim(),
      difficulty: parseInt(difficulty) as any,
      source: source as any,
      language,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      content: getExerciseContent(),
      authorId: "demo",
      isPublished: false,
    };

    try {
      if (existingExercise) {
        await updateExercise(existingExercise.id, exerciseData);
      } else {
        await addExercise(exerciseData);
        toast.success("Exercice sauvegardé comme brouillon !");
      }
      navigate("/exercises");
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;

    const exerciseData = {
      type: selectedType as any,
      title: title.trim(),
      difficulty: parseInt(difficulty) as any,
      source: source as any,
      language,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      content: getExerciseContent(),
      authorId: "demo",
      isPublished: true,
    };

    try {
      if (existingExercise) {
        await updateExercise(existingExercise.id, { ...exerciseData, isPublished: true });
        await publishExercise(existingExercise.id);
        toast.success("Exercice mis à jour et publié !");
      } else {
        const newExercise = await addExercise(exerciseData);
        if (newExercise) {
          await publishExercise(newExercise.id);
          toast.success("Exercice publié avec succès !");
        }
      }
      navigate("/exercises");
    } catch (error) {
      console.error("Error publishing exercise:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" onClick={() => navigate("/exercises")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {existingExercise ? "Modifier l'exercice" : "Créer un exercice"}
          </h1>
          <p className="text-muted-foreground text-lg">
            Partagez vos connaissances avec la communauté
          </p>
        </div>

        {/* General Information Section */}
        <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm animate-scale-in">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Informations générales</h2>
          </div>

          {/* Exercise Type Selection */}
          <div className="mb-6">
            <Label className="text-base mb-3 block">Type d'exercice *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {exerciseTypes.map((type) => (
                <div
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedType === type.value
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="font-semibold text-sm mb-1">{type.label}</div>
                  <div className="text-xs text-muted-foreground">{type.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <Label htmlFor="title" className="text-base mb-2">
              Titre de l'exercice *
            </Label>
            <Input
              id="title"
              placeholder="Donnez un titre descriptif à votre exercice..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base"
            />
          </div>

          {/* Metadata Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="difficulty" className="text-base mb-2">
                Niveau de difficulté
              </Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty">
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

            <div>
              <Label htmlFor="source" className="text-base mb-2">
                Source
              </Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger id="source">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="community">Communauté</SelectItem>
                  <SelectItem value="official">Officiel</SelectItem>
                  <SelectItem value="personal">Personnel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language" className="text-base mb-2">
                Langue
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birman">🇲🇲 Birman</SelectItem>
                  <SelectItem value="thai">🇹🇭 Thaï</SelectItem>
                  <SelectItem value="korean">🇰🇷 Coréen</SelectItem>
                  <SelectItem value="japanese">🇯🇵 Japonais</SelectItem>
                  <SelectItem value="vietnamese">🇻🇳 Vietnamien</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags" className="text-base mb-2">
              Tags (séparés par des virgules)
            </Label>
            <Input
              id="tags"
              placeholder="grammaire, débutant, verbes, etc."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Les tags aident à organiser et rechercher les exercices
            </p>
          </div>
        </div>

        {/* Exercise Content Section - Flashcard */}
        {selectedType === "flashcard" && (
          <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">📇</span>
              <h2 className="text-xl font-bold text-foreground">Contenu de l'exercice - Cartes flash</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Créez un ensemble de cartes flash pour cet exercice. Cliquez sur la carte pour la retourner.
            </p>

            {/* Card Preview Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base">Prévisualisation</h3>
                <span className="text-sm text-muted-foreground">
                  Carte {currentCardIndex + 1} / {flashcards.length}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
                    setIsFlipped(false);
                  }}
                  disabled={currentCardIndex === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <div
                  className="flex-1 min-h-[200px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/20 p-8 flex items-center justify-center cursor-pointer transition-all hover:border-primary/40 hover:shadow-lg"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground mb-3">
                      {isFlipped ? "Verso" : "Recto"}
                    </div>
                    <div className="text-2xl font-semibold text-foreground">
                      {isFlipped
                        ? (flashcards[currentCardIndex]?.back || "Ajoutez le verso...")
                        : (flashcards[currentCardIndex]?.front || "Ajoutez le recto...")
                      }
                    </div>
                    <div className="text-xs text-muted-foreground mt-4">
                      Cliquez pour {isFlipped ? "voir le recto" : "voir le verso"}
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setCurrentCardIndex(Math.min(flashcards.length - 1, currentCardIndex + 1));
                    setIsFlipped(false);
                  }}
                  disabled={currentCardIndex === flashcards.length - 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Card Editor Section */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-base mb-4">Édition des cartes</h3>

              <div className="space-y-6">
                {flashcards.map((card, index) => (
                  <div key={card.id} className="p-4 bg-accent/20 rounded-lg border-2 border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-sm">Carte {index + 1}</h3>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentCardIndex(index);
                            setIsFlipped(false);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Prévisualiser
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setFlashcards(flashcards.filter((_, i) => i !== index));
                            if (currentCardIndex >= flashcards.length - 1) {
                              setCurrentCardIndex(Math.max(0, currentCardIndex - 1));
                            }
                            setIsFlipped(false);
                          }}
                          disabled={flashcards.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="text-sm mb-2">Recto (en Birman) *</Label>
                        <Textarea
                          placeholder="Entrez le texte du recto..."
                          rows={6}
                          className="resize-none"
                          value={card.front}
                          onChange={(e) => {
                            const newCards = [...flashcards];
                            newCards[index].front = e.target.value;
                            setFlashcards(newCards);
                          }}
                        />
                      </div>

                      <div>
                        <Label className="text-sm mb-2">Verso (traduction/explication) *</Label>
                        <Textarea
                          placeholder="Entrez le texte du verso..."
                          rows={6}
                          className="resize-none"
                          value={card.back}
                          onChange={(e) => {
                            const newCards = [...flashcards];
                            newCards[index].back = e.target.value;
                            setFlashcards(newCards);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm mb-2">Catégorie</Label>
                      <Select
                        value={card.category}
                        onValueChange={(value) => {
                          const newCards = [...flashcards];
                          newCards[index].category = value;
                          setFlashcards(newCards);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vocabulary">Vocabulaire</SelectItem>
                          <SelectItem value="grammar">Grammaire</SelectItem>
                          <SelectItem value="expression">Expression</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => {
                  setFlashcards([...flashcards, { front: "", back: "", category: "vocabulary", id: Date.now().toString() }]);
                  setCurrentCardIndex(flashcards.length);
                  setIsFlipped(false);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une carte flash
              </Button>
            </div>

            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                ⚡ Options avancées
              </h3>

              {/* Option de mélange recto/verso */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="shuffleSides"
                    checked={shuffleSides}
                    onCheckedChange={(checked) => setShuffleSides(!!checked)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="shuffleSides" className="text-sm font-semibold cursor-pointer">
                      🔀 Mélanger recto/verso aléatoirement
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Lorsque activé, certaines cartes afficheront le recto en premier, d'autres le verso. Cela rend l'exercice plus dynamique et évite la routine.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm mb-2 flex items-center gap-2">
                    🔊 Fichier audio (optionnel)
                  </Label>
                  <Button variant="outline" className="w-full justify-start">
                    Choisir un fichier
                  </Button>
                </div>
                <div>
                  <Label className="text-sm mb-2 flex items-center gap-2">
                    🖼️ Image (optionnelle)
                  </Label>
                  <Button variant="outline" className="w-full justify-start">
                    Choisir un fichier
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exercise Content Section - Association */}
        {selectedType === "association" && (
          <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🔗</span>
              <h2 className="text-xl font-bold text-foreground">Contenu de l'exercice - Association</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Créez des pages avec 1 à 4 paires à associer (style Duolingo). Chaque page sera affichée séparément pendant l'exercice.
            </p>

            {/* Navigation entre les pages/groupes */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentGroupIndex(Math.max(0, currentGroupIndex - 1))}
                  disabled={currentGroupIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="text-center">
                  <p className="text-sm font-semibold">Page {currentGroupIndex + 1} / {pairGroups.length}</p>
                  <p className="text-xs text-muted-foreground">{pairGroups[currentGroupIndex]?.length || 0} paires</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentGroupIndex(Math.min(pairGroups.length - 1, currentGroupIndex + 1))}
                  disabled={currentGroupIndex === pairGroups.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newGroups = [...pairGroups];
                    newGroups.splice(currentGroupIndex, 1);
                    setPairGroups(newGroups);
                    setCurrentGroupIndex(Math.max(0, currentGroupIndex - 1));
                  }}
                  disabled={pairGroups.length === 1}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer cette page
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setPairGroups([...pairGroups, [
                      { left: "", right: "", id: `${pairGroups.length + 1}-1` }
                    ]]);
                    setCurrentGroupIndex(pairGroups.length);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Nouvelle page
                </Button>
              </div>
            </div>

            {/* Paires de la page actuelle */}
            <div className="space-y-4">
              {pairGroups[currentGroupIndex]?.map((pair, pairIndex) => (
                <div key={pair.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 p-4 bg-accent/20 rounded-lg border-2 border-border">
                  <div>
                    <Label className="text-sm mb-2">Élément gauche {pairIndex + 1} *</Label>
                    <Input
                      placeholder="Ex: မင်္ဂလာပါ"
                      value={pair.left}
                      onChange={(e) => {
                        const newGroups = [...pairGroups];
                        newGroups[currentGroupIndex][pairIndex].left = e.target.value;
                        setPairGroups(newGroups);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-2">Élément droit {pairIndex + 1} *</Label>
                    <Input
                      placeholder="Ex: Bonjour"
                      value={pair.right}
                      onChange={(e) => {
                        const newGroups = [...pairGroups];
                        newGroups[currentGroupIndex][pairIndex].right = e.target.value;
                        setPairGroups(newGroups);
                      }}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newGroups = [...pairGroups];
                        newGroups[currentGroupIndex] = newGroups[currentGroupIndex].filter((_, i) => i !== pairIndex);
                        setPairGroups(newGroups);
                      }}
                      disabled={pairGroups[currentGroupIndex].length <= 1}
                      title={pairGroups[currentGroupIndex].length <= 1 ? "Minimum 1 paire par page" : "Supprimer cette paire"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const newGroups = [...pairGroups];
                  const currentGroup = newGroups[currentGroupIndex];
                  if (currentGroup.length < 4) {
                    currentGroup.push({
                      left: "",
                      right: "",
                      id: `${currentGroupIndex + 1}-${currentGroup.length + 1}`
                    });
                    setPairGroups(newGroups);
                  }
                }}
                disabled={pairGroups[currentGroupIndex]?.length >= 4}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une paire (max 4 par page)
              </Button>
            </div>

            {/* Option de mélange des paires */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <Checkbox
                  id="shufflePairs"
                  checked={shufflePairs}
                  onCheckedChange={(checked) => setShufflePairs(!!checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="shufflePairs" className="text-sm font-semibold cursor-pointer">
                    🔀 Mélanger les paires aléatoirement entre les pages
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Lorsque activé, toutes les paires seront mélangées et redistribuées dans les pages à chaque session. Les pages garderont leur taille, mais les paires changeront de place.
                  </p>
                </div>
              </div>
              <p className="text-sm text-blue-900">
                💡 <strong>Conseil :</strong> Chaque page contiendra 1 à 4 paires à associer. L'utilisateur devra relier tous les éléments sur une page avant de passer à la suivante.
              </p>
            </div>
          </div>
        )}

        {/* Exercise Content Section - Quiz */}
        {selectedType === "quiz" && (
          <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🎯</span>
              <h2 className="text-xl font-bold text-foreground">Contenu de l'exercice - Quiz</h2>
            </div>

            <div className="mb-6">
              <Label htmlFor="question" className="text-base mb-2">
                Question *
              </Label>
              <Textarea
                id="question"
                placeholder="Entrez votre question..."
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base">Réponses possibles *</Label>
              {answers.map((answer, index) => (
                <div key={answer.id} className="flex items-start gap-3 p-4 bg-accent/20 rounded-lg">
                  <div className="flex items-center h-10">
                    <Checkbox
                      checked={answer.isCorrect}
                      onCheckedChange={(checked) => {
                        const newAnswers = [...answers];
                        newAnswers[index].isCorrect = !!checked;
                        setAnswers(newAnswers);
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder={`Réponse ${index + 1}`}
                      value={answer.text}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index].text = e.target.value;
                        setAnswers(newAnswers);
                      }}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setAnswers(answers.filter((_, i) => i !== index))}
                    disabled={answers.length <= 2}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => setAnswers([...answers, { text: "", isCorrect: false, id: Date.now().toString() }])}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une réponse
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              ✓ Cochez les case(s) des bonnes réponses
            </p>
          </div>
        )}

        {/* Exercise Content Section - Completion */}
        {selectedType === "completion" && (
          <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">✍️</span>
              <h2 className="text-xl font-bold text-foreground">Contenu de l'exercice - Complétion</h2>
            </div>

            <div className="mb-6">
              <Label htmlFor="sentence" className="text-base mb-2">
                Phrase à compléter *
              </Label>
              <Textarea
                id="sentence"
                placeholder="Entrez la phrase avec des espaces pour les mots manquants. Ex: Je vais ___ marché pour acheter ___ fruits."
                rows={4}
                value={sentenceTemplate}
                onChange={(e) => setSentenceTemplate(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Utilisez des tirets bas ___ pour indiquer les espaces à remplir
              </p>
            </div>

            <div className="space-y-4">
              <Label className="text-base">Réponses attendues *</Label>
              {blanks.map((blank, index) => (
                <div key={blank.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 p-4 bg-accent/20 rounded-lg">
                  <div>
                    <Label className="text-sm mb-2">Espace vide {index + 1} - Réponse *</Label>
                    <Input
                      placeholder="Réponse attendue"
                      value={blank.answer}
                      onChange={(e) => {
                        const newBlanks = [...blanks];
                        newBlanks[index].answer = e.target.value;
                        setBlanks(newBlanks);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-2">Indice (optionnel)</Label>
                    <Input
                      placeholder="Indice pour aider l'utilisateur"
                      value={blank.hint || ""}
                      onChange={(e) => {
                        const newBlanks = [...blanks];
                        newBlanks[index].hint = e.target.value;
                        setBlanks(newBlanks);
                      }}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setBlanks(blanks.filter((_, i) => i !== index))}
                      disabled={blanks.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => setBlanks([...blanks, { answer: "", hint: "", id: Date.now().toString() }])}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un espace vide
            </Button>
          </div>
        )}

        {/* Exercise Content Section - Translation */}
        {selectedType === "translation" && (
          <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">📖</span>
              <h2 className="text-xl font-bold text-foreground">Contenu de l'exercice - Traduction</h2>
            </div>

            {/* Navigation entre les exercices */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTranslationIndex(Math.max(0, currentTranslationIndex - 1))}
                  disabled={currentTranslationIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div
                  className="text-center cursor-pointer hover:bg-accent/50 px-3 py-1 rounded transition-colors"
                  onClick={() => setShowPageNavigator(true)}
                  title="Naviguer vers une page"
                >
                  <p className="text-sm font-semibold">Exercice {currentTranslationIndex + 1} / {translationExercises.length}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTranslationIndex(Math.min(translationExercises.length - 1, currentTranslationIndex + 1))}
                  disabled={currentTranslationIndex === translationExercises.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSearchModal(true)}
                  title="Rechercher dans tous les exercices"
                >
                  <Search className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newExercises = [...translationExercises];
                    newExercises.splice(currentTranslationIndex, 1);
                    setTranslationExercises(newExercises);
                    setCurrentTranslationIndex(Math.max(0, currentTranslationIndex - 1));
                  }}
                  disabled={translationExercises.length === 1}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer cet exercice
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setTranslationExercises([...translationExercises, { sourceText: "", targetText: "", hints: "", notes: "", id: Date.now().toString() }]);
                    setCurrentTranslationIndex(translationExercises.length);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Nouvel exercice
                </Button>
              </div>
            </div>

            {/* Formulaire de l'exercice actuel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <Label htmlFor="sourceText" className="text-base mb-2">
                  Texte source *
                </Label>
                <Textarea
                  id="sourceText"
                  placeholder="Entrez le texte à traduire..."
                  rows={8}
                  className="resize-none"
                  value={translationExercises[currentTranslationIndex]?.sourceText || ""}
                  onChange={(e) => {
                    const newExercises = [...translationExercises];
                    newExercises[currentTranslationIndex].sourceText = e.target.value;
                    setTranslationExercises(newExercises);
                  }}
                />
              </div>

              <div>
                <Label htmlFor="targetText" className="text-base mb-2">
                  Traduction attendue *
                </Label>
                <Textarea
                  id="targetText"
                  placeholder="Entrez la traduction correcte..."
                  rows={8}
                  className="resize-none"
                  value={translationExercises[currentTranslationIndex]?.targetText || ""}
                  onChange={(e) => {
                    const newExercises = [...translationExercises];
                    newExercises[currentTranslationIndex].targetText = e.target.value;
                    setTranslationExercises(newExercises);
                  }}
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-base mb-2">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Ajoutez des notes explicatives..."
                  rows={8}
                  className="resize-none"
                  value={translationExercises[currentTranslationIndex]?.notes || ""}
                  onChange={(e) => {
                    const newExercises = [...translationExercises];
                    newExercises[currentTranslationIndex].notes = e.target.value;
                    setTranslationExercises(newExercises);
                  }}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="hints" className="text-base mb-2">
                Indices (optionnel)
              </Label>
              <Textarea
                id="hints"
                placeholder="Ajoutez des indices pour aider l'utilisateur (ex: romanji)..."
                rows={3}
                value={translationExercises[currentTranslationIndex]?.hints || ""}
                onChange={(e) => {
                  const newExercises = [...translationExercises];
                  newExercises[currentTranslationIndex].hints = e.target.value;
                  setTranslationExercises(newExercises);
                }}
              />
            </div>

            {/* Option de mélange des exercices */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="shuffleExercises"
                  checked={shuffleExercises}
                  onCheckedChange={(checked) => setShuffleExercises(!!checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="shuffleExercises" className="text-sm font-semibold cursor-pointer">
                    🔀 Mélanger les exercices aléatoirement
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Lorsque activé, les exercices seront présentés dans un ordre aléatoire à chaque session. Cela rend la pratique plus dynamique et évite l'apprentissage par ordre.
                  </p>
                </div>
              </div>
            </div>

            {/* Notes générales de l'exercice */}
            <div className="mt-6">
              <Label htmlFor="generalNotes" className="text-base mb-2">
                📝 Notes générales de l'exercice (optionnel)
              </Label>
              <Textarea
                id="generalNotes"
                placeholder="Ajoutez des notes générales qui s'appliqueront à tout l'exercice (conseils, contexte, objectifs d'apprentissage, etc.)..."
                rows={5}
                value={translationGeneralNotes}
                onChange={(e) => setTranslationGeneralNotes(e.target.value)}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Ces notes seront accessibles à tout moment pendant l'exercice via le bouton [Notes]
              </p>
            </div>
          </div>
        )}

        {/* Exercise Content Section - Conversation */}
        {selectedType === "conversation" && (
          <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">💬</span>
              <h2 className="text-xl font-bold text-foreground">Contenu de l'exercice - Conversation</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Créez un dialogue avec des répliques et leurs traductions
            </p>

            <div className="space-y-4">
              {dialogueLines.map((line, index) => (
                <div key={line.id} className="p-4 bg-accent/20 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4 mb-3">
                    <div>
                      <Label className="text-sm mb-2">Locuteur</Label>
                      <Input
                        placeholder="A, B..."
                        value={line.speaker}
                        onChange={(e) => {
                          const newLines = [...dialogueLines];
                          newLines[index].speaker = e.target.value;
                          setDialogueLines(newLines);
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-2">Réplique (en birman) *</Label>
                      <Input
                        placeholder="Texte dans la langue cible"
                        value={line.text}
                        onChange={(e) => {
                          const newLines = [...dialogueLines];
                          newLines[index].text = e.target.value;
                          setDialogueLines(newLines);
                        }}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDialogueLines(dialogueLines.filter((_, i) => i !== index))}
                        disabled={dialogueLines.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm mb-2">Traduction *</Label>
                    <Input
                      placeholder="Traduction en français"
                      value={line.translation}
                      onChange={(e) => {
                        const newLines = [...dialogueLines];
                        newLines[index].translation = e.target.value;
                        setDialogueLines(newLines);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => setDialogueLines([...dialogueLines, { speaker: String.fromCharCode(65 + dialogueLines.length % 26), text: "", translation: "", id: Date.now().toString() }])}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une réplique
            </Button>
          </div>
        )}

        {/* Exercise Content Section - Grammar Identification */}
        {selectedType === "grammar-identification" && (
          <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🔍</span>
              <h2 className="text-xl font-bold text-foreground">Contenu de l'exercice - Identification Grammaticale</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Créez des exercices où l'utilisateur doit identifier les catégories grammaticales des mots (pronoms, noms, verbes, etc.) puis traduire la phrase complète.
            </p>

            {/* Navigation entre les exercices */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentGrammarIndex(Math.max(0, currentGrammarIndex - 1))}
                  disabled={currentGrammarIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="text-center">
                  <p className="text-sm font-semibold">Exercice {currentGrammarIndex + 1} / {grammarExercises.length}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentGrammarIndex(Math.min(grammarExercises.length - 1, currentGrammarIndex + 1))}
                  disabled={currentGrammarIndex === grammarExercises.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newExercises = [...grammarExercises];
                    newExercises.splice(currentGrammarIndex, 1);
                    setGrammarExercises(newExercises);
                    setCurrentGrammarIndex(Math.max(0, currentGrammarIndex - 1));
                  }}
                  disabled={grammarExercises.length === 1}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setGrammarExercises([...grammarExercises, {
                      id: Date.now().toString(),
                      sentence: "",
                      elements: [],
                      translation: "",
                      hints: ""
                    }]);
                    setCurrentGrammarIndex(grammarExercises.length);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Nouvel exercice
                </Button>
              </div>
            </div>

            {/* Formulaire de l'exercice actuel */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="grammarSentence" className="text-base mb-2">
                  Phrase complète * (en birman)
                </Label>
                <Input
                  id="grammarSentence"
                  placeholder="Ex: ကျွန်တော် ထမင်း စားတယ်"
                  value={grammarExercises[currentGrammarIndex]?.sentence || ""}
                  onChange={(e) => {
                    const newExercises = [...grammarExercises];
                    newExercises[currentGrammarIndex].sentence = e.target.value;
                    setGrammarExercises(newExercises);
                  }}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Séparez les mots par des espaces. Chaque mot sera analysé individuellement.
                </p>
              </div>

              <div>
                <Label className="text-base mb-2">
                  Éléments grammaticaux à identifier *
                </Label>
                <p className="text-xs text-muted-foreground mb-3">
                  Pour chaque mot de la phrase, indiquez sa catégorie grammaticale.
                </p>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Catégories disponibles :</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Badge variant="outline">👤 pronoun (Pronom)</Badge>
                    <Badge variant="outline">📦 noun (Nom)</Badge>
                    <Badge variant="outline">⚡ verb (Verbe)</Badge>
                    <Badge variant="outline">🎨 adjective (Adjectif)</Badge>
                    <Badge variant="outline">🔧 adverb (Adverbe)</Badge>
                    <Badge variant="outline">🔗 particle (Particule)</Badge>
                    <Badge variant="outline">📍 preposition (Préposition)</Badge>
                    <Badge variant="outline">🔢 number (Nombre)</Badge>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const sentence = grammarExercises[currentGrammarIndex]?.sentence || "";
                    const words = sentence.split(" ").filter(w => w.trim());
                    const elements = words.map((word, index) => ({
                      id: `word-${index}`,
                      word: word.trim(),
                      category: "noun",
                      position: index
                    }));
                    const newExercises = [...grammarExercises];
                    newExercises[currentGrammarIndex].elements = elements;
                    setGrammarExercises(newExercises);
                    toast.success(`${words.length} éléments détectés automatiquement`);
                  }}
                  className="mb-3"
                >
                  Détecter les mots automatiquement
                </Button>

                <div className="space-y-3">
                  {(grammarExercises[currentGrammarIndex]?.elements || []).map((element, idx) => (
                    <div key={element.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 p-3 bg-accent/20 rounded-lg">
                      <div>
                        <Label className="text-xs mb-1">Mot {idx + 1}</Label>
                        <Input
                          value={element.word}
                          onChange={(e) => {
                            const newExercises = [...grammarExercises];
                            newExercises[currentGrammarIndex].elements[idx].word = e.target.value;
                            setGrammarExercises(newExercises);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="text-xs mb-1">Catégorie</Label>
                        <Select
                          value={element.category}
                          onValueChange={(value) => {
                            const newExercises = [...grammarExercises];
                            newExercises[currentGrammarIndex].elements[idx].category = value;
                            setGrammarExercises(newExercises);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pronoun">👤 Pronom</SelectItem>
                            <SelectItem value="noun">📦 Nom</SelectItem>
                            <SelectItem value="verb">⚡ Verbe</SelectItem>
                            <SelectItem value="adjective">🎨 Adjectif</SelectItem>
                            <SelectItem value="adverb">🔧 Adverbe</SelectItem>
                            <SelectItem value="particle">🔗 Particule</SelectItem>
                            <SelectItem value="preposition">📍 Préposition</SelectItem>
                            <SelectItem value="number">🔢 Nombre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newExercises = [...grammarExercises];
                            newExercises[currentGrammarIndex].elements = 
                              newExercises[currentGrammarIndex].elements.filter((_, i) => i !== idx);
                            setGrammarExercises(newExercises);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={() => {
                    const newExercises = [...grammarExercises];
                    const currentElements = newExercises[currentGrammarIndex].elements;
                    currentElements.push({
                      id: `word-${currentElements.length}`,
                      word: "",
                      category: "noun",
                      position: currentElements.length
                    });
                    setGrammarExercises(newExercises);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un élément
                </Button>
              </div>

              <div>
                <Label htmlFor="grammarTranslation" className="text-base mb-2">
                  Traduction attendue *
                </Label>
                <Input
                  id="grammarTranslation"
                  placeholder="Ex: Je mange du riz"
                  value={grammarExercises[currentGrammarIndex]?.translation || ""}
                  onChange={(e) => {
                    const newExercises = [...grammarExercises];
                    newExercises[currentGrammarIndex].translation = e.target.value;
                    setGrammarExercises(newExercises);
                  }}
                />
              </div>

              <div>
                <Label htmlFor="grammarHints" className="text-base mb-2">
                  Indices (optionnel)
                </Label>
                <Textarea
                  id="grammarHints"
                  placeholder="Ex: Structure SOV : Sujet + Objet + Verbe"
                  rows={2}
                  value={grammarExercises[currentGrammarIndex]?.hints || ""}
                  onChange={(e) => {
                    const newExercises = [...grammarExercises];
                    newExercises[currentGrammarIndex].hints = e.target.value;
                    setGrammarExercises(newExercises);
                  }}
                />
              </div>
            </div>

            {/* Notes générales */}
            <div className="mt-6 pt-6 border-t border-border">
              <Label htmlFor="grammarGeneralNotes" className="text-base mb-2">
                📝 Notes générales de l'exercice (optionnel)
              </Label>
              <Textarea
                id="grammarGeneralNotes"
                placeholder="Ajoutez des notes générales accessibles pendant tout l'exercice..."
                rows={4}
                value={grammarGeneralNotes}
                onChange={(e) => setGrammarGeneralNotes(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Exercise Content Section - Sentence Mixer */}
        {selectedType === "sentence-mixer" && (
          <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🔀</span>
              <h2 className="text-xl font-bold text-foreground">Contenu de l'exercice - Mixeur de Phrases</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Créez des exercices où l'utilisateur doit remettre les mots dans le bon ordre pour reconstituer une phrase, puis la traduire.
            </p>

            {/* Difficulté et options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <Label className="text-sm mb-2">Niveau de difficulté</Label>
                <Select value={mixerDifficulty} onValueChange={(value: "easy" | "normal" | "hard") => setMixerDifficulty(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">⭐ Facile</SelectItem>
                    <SelectItem value="normal">⭐⭐ Normal</SelectItem>
                    <SelectItem value="hard">⭐⭐⭐ Difficile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="mixerShowCategories"
                  checked={mixerShowCategories}
                  onCheckedChange={(checked) => setMixerShowCategories(!!checked)}
                />
                <Label htmlFor="mixerShowCategories" className="text-sm cursor-pointer">
                  🎨 Afficher les catégories grammaticales
                </Label>
              </div>
            </div>

            {/* Navigation entre les exercices */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMixerIndex(Math.max(0, currentMixerIndex - 1))}
                  disabled={currentMixerIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="text-center">
                  <p className="text-sm font-semibold">Exercice {currentMixerIndex + 1} / {mixerExercises.length}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMixerIndex(Math.min(mixerExercises.length - 1, currentMixerIndex + 1))}
                  disabled={currentMixerIndex === mixerExercises.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newExercises = [...mixerExercises];
                    newExercises.splice(currentMixerIndex, 1);
                    setMixerExercises(newExercises);
                    setCurrentMixerIndex(Math.max(0, currentMixerIndex - 1));
                  }}
                  disabled={mixerExercises.length === 1}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setMixerExercises([...mixerExercises, {
                      id: Date.now().toString(),
                      reference: "",
                      blocks: [],
                      correctOrder: [],
                      translation: "",
                      hints: "",
                      notes: ""
                    }]);
                    setCurrentMixerIndex(mixerExercises.length);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Nouvel exercice
                </Button>
              </div>
            </div>

            {/* Formulaire de l'exercice actuel */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="mixerReference" className="text-base mb-2">
                  Phrase de référence * (traduction française)
                </Label>
                <Input
                  id="mixerReference"
                  placeholder="Ex: Je mange du riz"
                  value={mixerExercises[currentMixerIndex]?.reference || ""}
                  onChange={(e) => {
                    const newExercises = [...mixerExercises];
                    newExercises[currentMixerIndex].reference = e.target.value;
                    setMixerExercises(newExercises);
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Cette référence aidera l'utilisateur à comprendre ce qu'il doit reconstituer.
                </p>
              </div>

              <div>
                <Label className="text-base mb-2">
                  Blocs de mots * (ordre correct)
                </Label>
                <p className="text-xs text-muted-foreground mb-3">
                  Créez les blocs de mots dans le bon ordre. Ils seront mélangés automatiquement pendant l'exercice.
                </p>

                <div className="space-y-3">
                  {(mixerExercises[currentMixerIndex]?.blocks || []).map((block, idx) => (
                    <div key={block.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-4 p-3 bg-accent/20 rounded-lg">
                      <div>
                        <Label className="text-xs mb-1">Texte du bloc {idx + 1}</Label>
                        <Input
                          placeholder="Ex: ကျွန်တော်"
                          value={block.text}
                          onChange={(e) => {
                            const newExercises = [...mixerExercises];
                            newExercises[currentMixerIndex].blocks[idx].text = e.target.value;
                            setMixerExercises(newExercises);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="text-xs mb-1">Catégorie</Label>
                        <Select
                          value={block.category}
                          onValueChange={(value) => {
                            const newExercises = [...mixerExercises];
                            newExercises[currentMixerIndex].blocks[idx].category = value;
                            setMixerExercises(newExercises);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pronoun">👤 Pronom</SelectItem>
                            <SelectItem value="noun">📦 Nom</SelectItem>
                            <SelectItem value="verb">⚡ Verbe</SelectItem>
                            <SelectItem value="adjective">🎨 Adjectif</SelectItem>
                            <SelectItem value="adverb">🔧 Adverbe</SelectItem>
                            <SelectItem value="particle">🔗 Particule</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newExercises = [...mixerExercises];
                            const blocks = newExercises[currentMixerIndex].blocks;
                            newExercises[currentMixerIndex].blocks = blocks.filter((_, i) => i !== idx);
                            // Mettre à jour correctOrder
                            const removedId = blocks[idx].id;
                            newExercises[currentMixerIndex].correctOrder = 
                              newExercises[currentMixerIndex].correctOrder.filter(id => id !== removedId);
                            setMixerExercises(newExercises);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="mt-3 w-full"
                  onClick={() => {
                    const newExercises = [...mixerExercises];
                    const blocks = newExercises[currentMixerIndex].blocks;
                    const newBlockId = `b${currentMixerIndex + 1}-${blocks.length + 1}`;
                    blocks.push({
                      id: newBlockId,
                      text: "",
                      category: "noun",
                      correctPosition: blocks.length
                    });
                    // Mettre à jour correctOrder
                    newExercises[currentMixerIndex].correctOrder.push(newBlockId);
                    setMixerExercises(newExercises);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un bloc
                </Button>
              </div>

              <div>
                <Label htmlFor="mixerTranslation" className="text-base mb-2">
                  Traduction complète * (même que la référence)
                </Label>
                <Input
                  id="mixerTranslation"
                  placeholder="Ex: Je mange du riz"
                  value={mixerExercises[currentMixerIndex]?.translation || ""}
                  onChange={(e) => {
                    const newExercises = [...mixerExercises];
                    newExercises[currentMixerIndex].translation = e.target.value;
                    setMixerExercises(newExercises);
                  }}
                />
              </div>

              <div>
                <Label htmlFor="mixerHints" className="text-base mb-2">
                  Indices (optionnel)
                </Label>
                <Textarea
                  id="mixerHints"
                  placeholder="Ex: Structure SOV : Sujet + Objet + Verbe"
                  rows={2}
                  value={mixerExercises[currentMixerIndex]?.hints || ""}
                  onChange={(e) => {
                    const newExercises = [...mixerExercises];
                    newExercises[currentMixerIndex].hints = e.target.value;
                    setMixerExercises(newExercises);
                  }}
                />
              </div>

              <div>
                <Label htmlFor="mixerNotes" className="text-base mb-2">
                  Notes (optionnel)
                </Label>
                <Textarea
                  id="mixerNotes"
                  placeholder="Notes spécifiques à cet exercice..."
                  rows={2}
                  value={mixerExercises[currentMixerIndex]?.notes || ""}
                  onChange={(e) => {
                    const newExercises = [...mixerExercises];
                    newExercises[currentMixerIndex].notes = e.target.value;
                    setMixerExercises(newExercises);
                  }}
                />
              </div>
            </div>

            {/* Notes générales */}
            <div className="mt-6 pt-6 border-t border-border">
              <Label htmlFor="mixerGeneralNotes" className="text-base mb-2">
                📝 Notes générales de l'exercice (optionnel)
              </Label>
              <Textarea
                id="mixerGeneralNotes"
                placeholder="Ajoutez des notes générales accessibles pendant tout l'exercice..."
                rows={4}
                value={mixerGeneralNotes}
                onChange={(e) => setMixerGeneralNotes(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Placeholder for remaining exercise types */}
        {(selectedType === "grammar-transformation" || selectedType === "error-hunt") && (
          <div className="bg-card rounded-xl border border-border p-6 mb-6 shadow-sm animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">
                {selectedType === "grammar-transformation" && "💬"}
                {selectedType === "error-hunt" && "🎯"}
              </span>
              <h2 className="text-xl font-bold text-foreground">
                {selectedType === "grammar-transformation" && "Transformation Grammaticale"}
                {selectedType === "error-hunt" && "Chasse aux Erreurs"}
              </h2>
            </div>

            <div className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border-2 border-dashed border-primary/30 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold mb-2">Formulaire en cours de développement</h3>
              <p className="text-muted-foreground mb-4">
                Ce nouveau type d'exercice est disponible, mais son formulaire de création est en cours d'implémentation.
              </p>
              <p className="text-sm text-muted-foreground">
                Les players sont prêts et fonctionnels. Vous pourrez bientôt créer ces exercices directement depuis cette interface.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between animate-fade-in">
          {/* Left side - Delete button (only if editing existing exercise) */}
          <div>
            {existingExercise && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet exercice ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. L'exercice "{existingExercise.title}" sera définitivement supprimé
                      de la base de données et ne pourra pas être récupéré.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        try {
                          await deleteExercise(existingExercise.id);
                          toast.success("Exercice supprimé avec succès");
                          navigate("/exercises");
                        } catch (error) {
                          console.error("Error deleting exercise:", error);
                          toast.error("Erreur lors de la suppression");
                        }
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Supprimer définitivement
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {/* Right side - Save and Publish buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder comme brouillon
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Prévisualiser
            </Button>
            <Button className="bg-primary hover:bg-primary-hover" onClick={handlePublish}>
              {existingExercise?.isPublished ? "✅ Mettre à jour" : "✅ Publier l'exercice"}
            </Button>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>🔍 Rechercher dans les exercices</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 flex-1 overflow-y-auto">
            <Input
              type="text"
              placeholder="Tapez pour rechercher..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
              className="w-full"
            />

            {searchQuery.trim() && (
              <div className="space-y-2">
                {searchResults.length > 0 ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
                    </p>
                    <div className="space-y-2">
                      {searchResults.map((result, idx) => (
                        <div
                          key={idx}
                          onClick={() => goToExercise(result.index)}
                          className="p-3 bg-accent/20 hover:bg-accent/40 rounded-lg cursor-pointer transition-colors border border-border"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {result.field}
                                </Badge>
                                <Badge variant="secondary" className="text-xs font-mono">
                                  P.{result.index + 1}
                                </Badge>
                              </div>
                              <p className="text-sm line-clamp-2 break-words">
                                {result.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Aucun résultat trouvé pour "{searchQuery}"
                  </p>
                )}
              </div>
            )}

            {!searchQuery.trim() && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Tapez pour rechercher dans le texte source, la traduction, les indices ou les notes
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Page Navigator Modal */}
      <Dialog open={showPageNavigator} onOpenChange={setShowPageNavigator}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>📋 Navigation rapide - {translationExercises.length} exercices</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2">
              {translationExercises.map((exercise, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTranslationIndex(index);
                    setShowPageNavigator(false);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 text-left ${
                    index === currentTranslationIndex
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="font-mono text-xs text-muted-foreground mb-1">
                    P.{index + 1}
                  </div>
                  <div className="text-sm font-medium line-clamp-2 mb-1">
                    {exercise.sourceText || "(vide)"}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {exercise.targetText || "(vide)"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExerciseCreator;
