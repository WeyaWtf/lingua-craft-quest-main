import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, HelpCircle, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  GrammarIdentificationContent,
  GrammarIdentificationState,
  GRAMMATICAL_CATEGORIES,
  getCategoryConfig,
  splitSentenceIntoWords,
  calculateIdentificationScore,
  compareTranslation,
  type GrammaticalCategory,
  type WordElement
} from "@/types/newExercises";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GrammarIdentificationPlayerProps {
  content: GrammarIdentificationContent;
  onComplete?: (score: number) => void;
}

const GrammarIdentificationPlayer = ({ content, onComplete }: GrammarIdentificationPlayerProps) => {
  const [state, setState] = useState<GrammarIdentificationState>({
    currentExerciseIndex: 0,
    phase: 'identification',
    selectedElements: new Map(),
    userTranslation: '',
    score: {
      identificationCorrect: 0,
      identificationTotal: 0,
      translationCorrect: false,
    }
  });

  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    identificationScore: number;
    translationCorrect: boolean;
  } | null>(null);

  const currentExercise = content.exercises[state.currentExerciseIndex];
  const words = splitSentenceIntoWords(currentExercise.sentence);

  const handleWordClick = (wordIndex: number) => {
    if (state.phase !== 'identification') return;
    setSelectedWordIndex(wordIndex);
  };

  const handleCategorySelect = (category: GrammaticalCategory) => {
    if (selectedWordIndex === null) return;

    const word = words[selectedWordIndex];
    const wordId = `word-${selectedWordIndex}`;

    const newSelections = new Map(state.selectedElements);
    newSelections.set(wordId, category);

    setState({
      ...state,
      selectedElements: newSelections
    });

    setSelectedWordIndex(null);
    toast.success(`"${word}" identifié comme ${getCategoryConfig(category).label}`);
  };

  const validateIdentification = () => {
    const score = calculateIdentificationScore(
      state.selectedElements,
      currentExercise.elements
    );

    let correctCount = 0;
    currentExercise.elements.forEach(element => {
      const userCategory = state.selectedElements.get(element.id);
      if (userCategory === element.category) {
        correctCount++;
      }
    });

    setState({
      ...state,
      phase: 'translation',
      score: {
        ...state.score,
        identificationCorrect: correctCount,
        identificationTotal: currentExercise.elements.length
      }
    });

    setValidationResult({
      identificationScore: score,
      translationCorrect: false
    });

    if (score === 100) {
      toast.success("Parfait ! Toutes les identifications sont correctes !");
    } else {
      toast.warning(`Score d'identification : ${score.toFixed(0)}%`);
    }
  };

  const validateTranslation = () => {
    const isCorrect = compareTranslation(
      state.userTranslation,
      currentExercise.translation
    );

    setState({
      ...state,
      score: {
        ...state.score,
        translationCorrect: isCorrect
      }
    });

    setValidationResult({
      ...validationResult!,
      translationCorrect: isCorrect
    });

    if (isCorrect) {
      toast.success("Excellente traduction !");
    } else {
      toast.error("La traduction n'est pas tout à fait correcte.");
    }
  };

  const goToNextExercise = () => {
    if (state.currentExerciseIndex < content.exercises.length - 1) {
      setState({
        currentExerciseIndex: state.currentExerciseIndex + 1,
        phase: 'identification',
        selectedElements: new Map(),
        userTranslation: '',
        score: state.score
      });
      setValidationResult(null);
      setSelectedWordIndex(null);
      setShowHints(false);
    } else {
      // Calcul du score final
      const totalScore = (
        (state.score.identificationCorrect / state.score.identificationTotal) * 70 +
        (state.score.translationCorrect ? 30 : 0)
      );
      onComplete?.(totalScore);
    }
  };

  const goToPreviousExercise = () => {
    if (state.currentExerciseIndex > 0) {
      setState({
        ...state,
        currentExerciseIndex: state.currentExerciseIndex - 1,
        phase: 'identification',
        selectedElements: new Map(),
        userTranslation: ''
      });
      setValidationResult(null);
      setSelectedWordIndex(null);
    }
  };

  const getWordCategory = (wordIndex: number): GrammaticalCategory | null => {
    const wordId = `word-${wordIndex}`;
    return state.selectedElements.get(wordId) || null;
  };

  const getCorrectCategory = (wordIndex: number): GrammaticalCategory | null => {
    const element = currentExercise.elements.find(
      el => el.position === wordIndex
    );
    return element?.category || null;
  };

  const isWordCorrectlyIdentified = (wordIndex: number): boolean => {
    if (state.phase !== 'translation' && !validationResult) return false;
    const userCategory = getWordCategory(wordIndex);
    const correctCategory = getCorrectCategory(wordIndex);
    return userCategory === correctCategory;
  };

  const progress = ((state.currentExerciseIndex + 1) / content.exercises.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">
                🔍 Identification Grammaticale
              </CardTitle>
              <Badge variant="outline">
                Exercice {state.currentExerciseIndex + 1} / {content.exercises.length}
              </Badge>
            </div>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
        </Card>

        {/* Phase Indicator */}
        <div className="flex items-center justify-center gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            state.phase === 'identification' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <span className="font-semibold">1. Identification</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            state.phase === 'translation' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <span className="font-semibold">2. Traduction</span>
          </div>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {state.phase === 'identification' 
                  ? 'Cliquez sur chaque mot pour identifier sa catégorie grammaticale'
                  : 'Traduisez la phrase maintenant'
                }
              </CardTitle>
              <div className="flex gap-2">
                {currentExercise.hints && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHints(!showHints)}
                  >
                    <HelpCircle className="w-4 h-4 mr-1" />
                    Indices
                  </Button>
                )}
                {(currentExercise.notes || content.generalNotes) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNotes(!showNotes)}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Notes
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Hints */}
            {showHints && currentExercise.hints && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-1">💡 Indices</p>
                <p className="text-sm text-blue-800">{currentExercise.hints}</p>
              </div>
            )}

            {/* Sentence Display */}
            <div className="p-6 bg-accent/20 rounded-lg border-2 border-border">
              <div className="flex flex-wrap gap-2">
                {words.map((word, index) => {
                  const userCategory = getWordCategory(index);
                  const correctCategory = getCorrectCategory(index);
                  const categoryConfig = userCategory ? getCategoryConfig(userCategory) : null;
                  const isSelected = selectedWordIndex === index;
                  const isCorrect = isWordCorrectlyIdentified(index);
                  const showValidation = state.phase === 'translation' && validationResult;

                  return (
                    <div key={index} className="relative">
                      <button
                        onClick={() => handleWordClick(index)}
                        disabled={state.phase !== 'identification'}
                        className={`
                          px-4 py-3 rounded-lg text-lg font-medium transition-all
                          ${isSelected ? 'ring-2 ring-primary scale-105' : ''}
                          ${userCategory ? 'shadow-md' : 'border-2 border-dashed border-gray-300'}
                          ${state.phase === 'identification' ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
                          ${showValidation && isCorrect ? 'ring-2 ring-green-500' : ''}
                          ${showValidation && !isCorrect && userCategory ? 'ring-2 ring-red-500' : ''}
                        `}
                        style={userCategory ? {
                          backgroundColor: categoryConfig!.color.replace('bg-', '#') + '20',
                          borderColor: categoryConfig!.color.replace('bg-', '#')
                        } : {}}
                      >
                        {word}
                      </button>
                      
                      {/* Category Badge */}
                      {userCategory && (
                        <div className="absolute -top-2 -right-2">
                          <Badge 
                            className="text-xs"
                            variant={showValidation && !isCorrect ? "destructive" : "default"}
                          >
                            {getCategoryConfig(userCategory).icon}
                          </Badge>
                        </div>
                      )}

                      {/* Validation Icons */}
                      {showValidation && userCategory && (
                        <div className="absolute -bottom-2 -right-2">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category Selection (Phase 1) */}
            {state.phase === 'identification' && selectedWordIndex !== null && (
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="text-base">
                    Quelle est la catégorie de "{words[selectedWordIndex]}" ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {GRAMMATICAL_CATEGORIES.map((cat) => (
                      <Button
                        key={cat.category}
                        variant="outline"
                        onClick={() => handleCategorySelect(cat.category)}
                        className="h-auto flex-col gap-2 p-4"
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-sm font-semibold">{cat.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Validation Button (Phase 1) */}
            {state.phase === 'identification' && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={validateIdentification}
                  disabled={state.selectedElements.size === 0}
                  className="min-w-[200px]"
                >
                  Valider l'identification
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Translation Phase */}
            {state.phase === 'translation' && (
              <div className="space-y-4">
                {validationResult && (
                  <div className={`p-4 rounded-lg border-2 ${
                    validationResult.identificationScore >= 80 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <p className="font-semibold mb-2">
                      Score d'identification : {validationResult.identificationScore.toFixed(0)}%
                    </p>
                    <p className="text-sm">
                      {state.score.identificationCorrect} / {state.score.identificationTotal} éléments correctement identifiés
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="translation" className="text-base mb-2 block">
                    Traduisez la phrase complète :
                  </Label>
                  <Input
                    id="translation"
                    placeholder="Entrez votre traduction..."
                    value={state.userTranslation}
                    onChange={(e) => setState({ ...state, userTranslation: e.target.value })}
                    className="text-lg"
                    disabled={validationResult?.translationCorrect}
                  />
                </div>

                {validationResult?.translationCorrect === false && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-blue-900 mb-1">Traduction attendue :</p>
                    <p className="text-blue-800">{currentExercise.translation}</p>
                  </div>
                )}

                <div className="flex justify-center gap-3">
                  {!validationResult?.translationCorrect && (
                    <Button
                      size="lg"
                      onClick={validateTranslation}
                      disabled={!state.userTranslation.trim()}
                    >
                      Valider la traduction
                    </Button>
                  )}
                  
                  {validationResult?.translationCorrect && (
                    <Button
                      size="lg"
                      onClick={goToNextExercise}
                      className="min-w-[200px]"
                    >
                      {state.currentExerciseIndex < content.exercises.length - 1 
                        ? 'Exercice suivant'
                        : 'Terminer'
                      }
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Légende des catégories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {GRAMMATICAL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="flex items-center gap-2 p-2 rounded-lg bg-accent/20">
                  <span className="text-xl">{cat.icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{cat.label}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPreviousExercise}
            disabled={state.currentExerciseIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          <Button
            variant="outline"
            onClick={goToNextExercise}
            disabled={!validationResult?.translationCorrect}
          >
            Suivant
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Notes Dialog */}
      <Dialog open={showNotes} onOpenChange={setShowNotes}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>📝 Notes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {currentExercise.notes && (
              <div>
                <p className="font-semibold mb-2">Notes de l'exercice :</p>
                <p className="text-sm text-muted-foreground">{currentExercise.notes}</p>
              </div>
            )}
            {content.generalNotes && (
              <div>
                <p className="font-semibold mb-2">Notes générales :</p>
                <p className="text-sm text-muted-foreground">{content.generalNotes}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GrammarIdentificationPlayer;
