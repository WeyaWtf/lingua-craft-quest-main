import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, HelpCircle, FileText, Target } from "lucide-react";
import { toast } from "sonner";
import {
  ErrorHuntContent,
  ErrorHuntState,
  compareTranslation,
  splitSentenceIntoWords,
  type ErrorType
} from "@/types/newExercises";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorHuntPlayerProps {
  content: ErrorHuntContent;
  onComplete?: (score: number) => void;
}

const ErrorHuntPlayer = ({ content, onComplete }: ErrorHuntPlayerProps) => {
  const [state, setState] = useState<ErrorHuntState>({
    currentExerciseIndex: 0,
    phase: 'detection',
    detectedErrors: new Set(),
    corrections: new Map(),
    userTranslation: '',
    score: {
      errorsDetected: 0,
      totalErrors: 0,
      correctionsValid: 0,
      falseDetections: 0,
      translationCorrect: false,
    }
  });

  const [showHints, setShowHints] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    detectionResult: Array<{ index: number; correct: boolean }>;
    correctionResults: Array<{ index: number; correct: boolean }>;
    translationCorrect: boolean;
  } | null>(null);

  const currentExercise = content.exercises[state.currentExerciseIndex];
  const words = splitSentenceIntoWords(currentExercise.incorrectSentence);

  const getErrorTypeLabel = (type: ErrorType): string => {
    const labels = {
      particle: '🔹 Particule incorrecte',
      conjugation: '⚡ Conjugaison/accord erroné',
      word_order: '📝 Ordre des mots incorrect',
      vocabulary: '📖 Vocabulaire inapproprié',
      politeness: '👔 Niveau de politesse inadéquat'
    };
    return labels[type];
  };

  const handleWordClick = (wordIndex: number) => {
    if (state.phase !== 'detection') return;

    const newDetectedErrors = new Set(state.detectedErrors);
    if (newDetectedErrors.has(wordIndex)) {
      newDetectedErrors.delete(wordIndex);
      toast.info("Erreur retirée");
    } else {
      newDetectedErrors.add(wordIndex);
      toast.success("Erreur détectée");
    }

    setState({
      ...state,
      detectedErrors: newDetectedErrors
    });
  };

  const validateDetection = () => {
    const actualErrors = new Set(currentExercise.errors.map(e => e.wordIndex));
    const userErrors = state.detectedErrors;

    let correctDetections = 0;
    let falseDetections = 0;

    userErrors.forEach(index => {
      if (actualErrors.has(index)) {
        correctDetections++;
      } else {
        falseDetections++;
      }
    });

    const detectionResult = Array.from(actualErrors).map(index => ({
      index,
      correct: userErrors.has(index)
    }));

    setState({
      ...state,
      phase: 'correction',
      score: {
        ...state.score,
        errorsDetected: correctDetections,
        totalErrors: currentExercise.errors.length,
        falseDetections
      }
    });

    setValidationResult({
      detectionResult,
      correctionResults: [],
      translationCorrect: false
    });

    if (correctDetections === currentExercise.errors.length && falseDetections === 0) {
      toast.success("Parfait ! Toutes les erreurs trouvées !");
    } else {
      toast.warning(`${correctDetections}/${currentExercise.errors.length} erreurs trouvées`);
    }
  };

  const handleCorrectionChange = (wordIndex: number, correction: string) => {
    const newCorrections = new Map(state.corrections);
    newCorrections.set(wordIndex, correction);
    setState({
      ...state,
      corrections: newCorrections
    });
  };

  const validateCorrections = () => {
    const correctionResults = currentExercise.errors.map(error => {
      const userCorrection = state.corrections.get(error.wordIndex);
      const isCorrect = userCorrection?.toLowerCase().trim() === error.correctWord.toLowerCase().trim();
      return {
        index: error.wordIndex,
        correct: isCorrect
      };
    });

    const correctCorrections = correctionResults.filter(r => r.correct).length;

    setState({
      ...state,
      phase: 'translation',
      score: {
        ...state.score,
        correctionsValid: correctCorrections
      }
    });

    setValidationResult({
      ...validationResult!,
      correctionResults,
      translationCorrect: false
    });

    if (correctCorrections === currentExercise.errors.length) {
      toast.success("Excellentes corrections !");
    } else {
      toast.warning(`${correctCorrections}/${currentExercise.errors.length} corrections valides`);
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
        phase: 'detection',
        detectedErrors: new Set(),
        corrections: new Map(),
        userTranslation: '',
        score: state.score
      });
      setValidationResult(null);
      setShowHints(false);
    } else {
      // Calcul du score final
      const detectionScore = (state.score.errorsDetected / state.score.totalErrors) * 40 - (state.score.falseDetections * 5);
      const correctionScore = (state.score.correctionsValid / state.score.totalErrors) * 40;
      const translationScore = state.score.translationCorrect ? 20 : 0;
      const totalScore = Math.max(0, detectionScore + correctionScore + translationScore);
      onComplete?.(totalScore);
    }
  };

  const goToPreviousExercise = () => {
    if (state.currentExerciseIndex > 0) {
      setState({
        ...state,
        currentExerciseIndex: state.currentExerciseIndex - 1,
        phase: 'detection',
        detectedErrors: new Set(),
        corrections: new Map(),
        userTranslation: ''
      });
      setValidationResult(null);
    }
  };

  const isWordAnError = (wordIndex: number): boolean => {
    return currentExercise.errors.some(e => e.wordIndex === wordIndex);
  };

  const getErrorForWord = (wordIndex: number) => {
    return currentExercise.errors.find(e => e.wordIndex === wordIndex);
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
                🎯 Chasse aux Erreurs
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
            state.phase === 'detection' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <span className="font-semibold">1. Détection</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            state.phase === 'correction' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <span className="font-semibold">2. Correction</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            state.phase === 'translation' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <span className="font-semibold">3. Traduction</span>
          </div>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {state.phase === 'detection' 
                  ? 'Cliquez sur les mots contenant des erreurs'
                  : state.phase === 'correction'
                  ? 'Proposez une correction pour chaque erreur'
                  : 'Traduisez la phrase correcte'
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

            {/* Error count info */}
            <div className="flex items-center justify-center gap-4">
              <Badge variant="outline" className="text-base px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                {currentExercise.errors.length} erreur{currentExercise.errors.length > 1 ? 's' : ''} à trouver
              </Badge>
              {state.phase === 'detection' && state.detectedErrors.size > 0 && (
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {state.detectedErrors.size} sélectionnée{state.detectedErrors.size > 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {/* Sentence Display - Detection Phase */}
            {state.phase === 'detection' && (
              <div className="p-6 bg-accent/20 rounded-lg border-2 border-border">
                <div className="flex flex-wrap gap-2">
                  {words.map((word, index) => {
                    const isDetected = state.detectedErrors.has(index);
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleWordClick(index)}
                        className={`
                          px-4 py-3 rounded-lg text-lg font-medium transition-all border-2
                          cursor-pointer hover:scale-105
                          ${isDetected ? 'bg-red-100 border-red-500 shadow-md' : 'bg-white border-gray-300'}
                        `}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Validation Button - Detection Phase */}
            {state.phase === 'detection' && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={validateDetection}
                  disabled={state.detectedErrors.size === 0}
                  className="min-w-[200px]"
                >
                  Valider la détection
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Correction Phase */}
            {state.phase === 'correction' && validationResult && (
              <div className="space-y-6">
                {/* Detection Results */}
                <div className={`p-4 rounded-lg border-2 ${
                  state.score.falseDetections === 0 && state.score.errorsDetected === state.score.totalErrors
                    ? 'bg-green-50 border-green-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className="font-semibold mb-2">
                    Résultat de la détection : {state.score.errorsDetected}/{state.score.totalErrors}
                  </p>
                  {state.score.falseDetections > 0 && (
                    <p className="text-sm text-red-600">
                      ⚠️ {state.score.falseDetections} fausse{state.score.falseDetections > 1 ? 's' : ''} détection{state.score.falseDetections > 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                {/* Sentence with highlighted errors */}
                <div className="p-6 bg-accent/20 rounded-lg border-2 border-border">
                  <p className="text-sm font-semibold mb-3">Phrase avec erreurs marquées :</p>
                  <div className="flex flex-wrap gap-2">
                    {words.map((word, index) => {
                      const isError = isWordAnError(index);
                      const wasDetected = state.detectedErrors.has(index);
                      
                      return (
                        <div key={index} className="relative">
                          <div
                            className={`
                              px-4 py-3 rounded-lg text-lg font-medium border-2
                              ${isError ? 'bg-red-100 border-red-500' : 'bg-white border-gray-300'}
                            `}
                          >
                            {word}
                          </div>
                          {isError && (
                            <div className="absolute -top-2 -right-2">
                              {wasDetected ? (
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

                {/* Correction Inputs */}
                <div className="space-y-4">
                  <p className="font-semibold">Proposez les corrections :</p>
                  {currentExercise.errors.map((error, index) => (
                    <Card key={index} className="border-2 border-primary/20">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{getErrorTypeLabel(error.type)}</Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm mb-2 block">Mot incorrect :</Label>
                              <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-md">
                                <p className="font-medium text-red-700">{error.incorrectWord}</p>
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor={`correction-${index}`} className="text-sm mb-2 block">
                                Votre correction :
                              </Label>
                              <Input
                                id={`correction-${index}`}
                                placeholder="Correction..."
                                value={state.corrections.get(error.wordIndex) || ''}
                                onChange={(e) => handleCorrectionChange(error.wordIndex, e.target.value)}
                              />
                            </div>
                          </div>

                          {error.explanation && (
                            <div className="mt-2 p-2 bg-blue-50 rounded-md">
                              <p className="text-xs text-blue-800">💡 {error.explanation}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={validateCorrections}
                    disabled={state.corrections.size !== currentExercise.errors.length}
                    className="min-w-[200px]"
                  >
                    Valider les corrections
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Translation Phase */}
            {state.phase === 'translation' && validationResult && (
              <div className="space-y-4">
                {/* Show correction results */}
                <div className={`p-4 rounded-lg border-2 ${
                  state.score.correctionsValid === state.score.totalErrors
                    ? 'bg-green-50 border-green-200'
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <p className="font-semibold mb-2">
                    Corrections validées : {state.score.correctionsValid}/{state.score.totalErrors}
                  </p>
                </div>

                {/* Show correct sentence */}
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-green-900 mb-2">✓ Phrase correcte :</p>
                  <p className="text-lg text-green-800">{currentExercise.correctSentence}</p>
                </div>

                <div>
                  <Label htmlFor="translation" className="text-base mb-2 block">
                    Traduisez la phrase correcte :
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

        {/* Score Summary */}
        {state.phase === 'translation' && validationResult && (
          <Card>
            <CardContent className="py-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold">Score de l'exercice :</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Détection</p>
                    <p className="font-semibold">{state.score.errorsDetected}/{state.score.totalErrors}</p>
                    {state.score.falseDetections > 0 && (
                      <p className="text-xs text-red-600">-{state.score.falseDetections} fausse(s)</p>
                    )}
                  </div>
                  <div>
                    <p className="text-muted-foreground">Corrections</p>
                    <p className="font-semibold">{state.score.correctionsValid}/{state.score.totalErrors}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Traduction</p>
                    <p className="font-semibold">{state.score.translationCorrect ? '✓' : '✗'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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

export default ErrorHuntPlayer;
