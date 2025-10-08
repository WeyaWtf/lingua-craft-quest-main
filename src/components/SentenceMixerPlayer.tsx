import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, HelpCircle, FileText, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  SentenceMixerContent,
  SentenceMixerState,
  getCategoryConfig,
  compareTranslation,
  type SentenceBlock
} from "@/types/newExercises";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SentenceMixerPlayerProps {
  content: SentenceMixerContent;
  onComplete?: (score: number) => void;
}

const SentenceMixerPlayer = ({ content, onComplete }: SentenceMixerPlayerProps) => {
  const [state, setState] = useState<SentenceMixerState>({
    currentExerciseIndex: 0,
    phase: 'reconstruction',
    userOrder: [],
    userTranslation: '',
    timeSpent: 0,
    score: {
      reconstructionCorrect: false,
      translationCorrect: false,
      reconstructionAttempts: 0,
    }
  });

  const [shuffledBlocks, setShuffledBlocks] = useState<SentenceBlock[]>([]);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [validationResult, setValidationResult] = useState<{
    reconstructionCorrect: boolean;
    translationCorrect: boolean;
  } | null>(null);

  const currentExercise = content.exercises[state.currentExerciseIndex];

  // Shuffle blocks on exercise change
  useEffect(() => {
    const blocks = [...currentExercise.blocks];
    // Fisher-Yates shuffle
    for (let i = blocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    }
    setShuffledBlocks(blocks);
    setSelectedBlocks([]);
    setStartTime(Date.now());
  }, [state.currentExerciseIndex]);

  const handleBlockClick = (blockId: string) => {
    if (state.phase !== 'reconstruction' || validationResult?.reconstructionCorrect) return;

    if (selectedBlocks.includes(blockId)) {
      // Déselectionner
      setSelectedBlocks(selectedBlocks.filter(id => id !== blockId));
    } else {
      // Sélectionner
      setSelectedBlocks([...selectedBlocks, blockId]);
    }
  };

  const resetOrder = () => {
    setSelectedBlocks([]);
    setState({
      ...state,
      score: {
        ...state.score,
        reconstructionAttempts: state.score.reconstructionAttempts + 1
      }
    });
  };

  const validateReconstruction = () => {
    const isCorrect = JSON.stringify(selectedBlocks) === JSON.stringify(currentExercise.correctOrder);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    setState({
      ...state,
      phase: isCorrect ? 'translation' : 'reconstruction',
      userOrder: selectedBlocks,
      timeSpent,
      score: {
        ...state.score,
        reconstructionCorrect: isCorrect,
        reconstructionAttempts: state.score.reconstructionAttempts + 1
      }
    });

    setValidationResult({
      reconstructionCorrect: isCorrect,
      translationCorrect: false
    });

    if (isCorrect) {
      toast.success("Excellent ! La phrase est correctement ordonnée !");
    } else {
      toast.error("L'ordre n'est pas correct. Réessayez !");
      // Reset after error
      setTimeout(() => {
        setSelectedBlocks([]);
        setValidationResult(null);
      }, 2000);
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
        phase: 'reconstruction',
        userOrder: [],
        userTranslation: '',
        timeSpent: 0,
        score: state.score
      });
      setValidationResult(null);
      setShowHints(false);
    } else {
      // Calcul du score final
      const reconstructionScore = state.score.reconstructionCorrect ? 60 : Math.max(0, 60 - (state.score.reconstructionAttempts * 10));
      const translationScore = state.score.translationCorrect ? 40 : 0;
      const totalScore = reconstructionScore + translationScore;
      onComplete?.(totalScore);
    }
  };

  const goToPreviousExercise = () => {
    if (state.currentExerciseIndex > 0) {
      setState({
        ...state,
        currentExerciseIndex: state.currentExerciseIndex - 1,
        phase: 'reconstruction',
        userOrder: [],
        userTranslation: '',
        timeSpent: 0
      });
      setValidationResult(null);
    }
  };

  const getBlockPosition = (blockId: string): number => {
    return selectedBlocks.indexOf(blockId);
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
                🔀 Mixeur de Phrases
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
            state.phase === 'reconstruction' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <span className="font-semibold">1. Reconstruction</span>
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
              <div>
                <CardTitle className="text-lg mb-2">
                  {state.phase === 'reconstruction' 
                    ? 'Cliquez sur les blocs dans le bon ordre pour reconstituer la phrase'
                    : 'Traduisez la phrase maintenant'
                  }
                </CardTitle>
                {state.phase === 'reconstruction' && (
                  <p className="text-sm text-muted-foreground">
                    Phrase de référence : <span className="font-semibold">{currentExercise.reference}</span>
                  </p>
                )}
              </div>
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

            {/* Reconstruction Phase */}
            {state.phase === 'reconstruction' && (
              <div className="space-y-6">
                {/* Selected Order Display */}
                {selectedBlocks.length > 0 && (
                  <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-green-900">
                        Ordre actuel ({selectedBlocks.length} / {currentExercise.blocks.length}) :
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetOrder}
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Recommencer
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedBlocks.map((blockId, index) => {
                        const block = shuffledBlocks.find(b => b.id === blockId);
                        if (!block) return null;
                        const categoryConfig = block.category && content.showCategories 
                          ? getCategoryConfig(block.category) 
                          : null;
                        
                        return (
                          <div key={blockId} className="relative">
                            <div
                              className="px-4 py-2 rounded-lg shadow-md text-lg font-medium border-2"
                              style={categoryConfig ? {
                                backgroundColor: categoryConfig.color.replace('bg-', '#') + '20',
                                borderColor: categoryConfig.color.replace('bg-', '#')
                              } : {
                                backgroundColor: '#f0f0f0',
                                borderColor: '#ccc'
                              }}
                            >
                              {block.text}
                            </div>
                            <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Available Blocks */}
                <div>
                  <p className="text-sm font-semibold mb-3">Blocs disponibles :</p>
                  <div className="flex flex-wrap gap-3">
                    {shuffledBlocks.map((block) => {
                      const isSelected = selectedBlocks.includes(block.id);
                      const position = getBlockPosition(block.id);
                      const categoryConfig = block.category && content.showCategories 
                        ? getCategoryConfig(block.category) 
                        : null;

                      return (
                        <button
                          key={block.id}
                          onClick={() => handleBlockClick(block.id)}
                          disabled={isSelected}
                          className={`
                            px-6 py-4 rounded-lg text-lg font-medium transition-all border-2
                            ${isSelected ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-105 shadow-md'}
                          `}
                          style={categoryConfig ? {
                            backgroundColor: categoryConfig.color.replace('bg-', '#') + '20',
                            borderColor: categoryConfig.color.replace('bg-', '#')
                          } : {
                            backgroundColor: '#ffffff',
                            borderColor: '#ddd'
                          }}
                        >
                          {block.text}
                          {categoryConfig && (
                            <span className="ml-2 text-sm">{categoryConfig.icon}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Validation Button */}
                <div className="flex justify-center gap-3">
                  <Button
                    size="lg"
                    onClick={validateReconstruction}
                    disabled={selectedBlocks.length !== currentExercise.blocks.length}
                    className="min-w-[200px]"
                  >
                    Valider l'ordre
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                {/* Attempts Counter */}
                {state.score.reconstructionAttempts > 0 && (
                  <p className="text-center text-sm text-muted-foreground">
                    Tentatives : {state.score.reconstructionAttempts}
                  </p>
                )}
              </div>
            )}

            {/* Translation Phase */}
            {state.phase === 'translation' && (
              <div className="space-y-4">
                {/* Show correct sentence */}
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-green-900 mb-2">
                    ✓ Phrase correctement ordonnée :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentExercise.correctOrder.map((blockId) => {
                      const block = currentExercise.blocks.find(b => b.id === blockId);
                      return block ? (
                        <span key={blockId} className="px-3 py-1 bg-white rounded-md text-lg font-medium">
                          {block.text}
                        </span>
                      ) : null;
                    })}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Temps : {state.timeSpent}s | Tentatives : {state.score.reconstructionAttempts}
                  </p>
                </div>

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

        {/* Difficulty Badge */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Niveau de difficulté :</span>
                <Badge variant={
                  content.difficulty === 'easy' ? 'default' :
                  content.difficulty === 'normal' ? 'secondary' : 'destructive'
                }>
                  {content.difficulty === 'easy' ? '⭐ Facile' :
                   content.difficulty === 'normal' ? '⭐⭐ Normal' : '⭐⭐⭐ Difficile'}
                </Badge>
              </div>
              {content.showCategories && (
                <p className="text-sm text-muted-foreground">
                  🎨 Catégories grammaticales affichées
                </p>
              )}
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

export default SentenceMixerPlayer;
