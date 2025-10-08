import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, HelpCircle, FileText, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import {
  GrammarTransformationContent,
  GrammarTransformationState,
  compareTranslation,
  type TransformationType
} from "@/types/newExercises";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GrammarTransformationPlayerProps {
  content: GrammarTransformationContent;
  onComplete?: (score: number) => void;
}

const GrammarTransformationPlayer = ({ content, onComplete }: GrammarTransformationPlayerProps) => {
  const [state, setState] = useState<GrammarTransformationState>({
    currentExerciseIndex: 0,
    phase: 'transformation',
    userTransformation: '',
    userTranslation: '',
    hintsUsed: 0,
    score: {
      transformationPoints: 0,
      translationCorrect: false,
      creativityBonus: 0,
    }
  });

  const [showHints, setShowHints] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showConjugationHint, setShowConjugationHint] = useState(false);
  const [showRuleHint, setShowRuleHint] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    transformationCorrect: boolean;
    transformationScore: number;
    differences: string[];
    translationCorrect: boolean;
  } | null>(null);

  const currentExercise = content.exercises[state.currentExerciseIndex];

  const getTransformationTypeLabel = (type: TransformationType): string => {
    const labels = {
      tense: '⚡ Transformation temporelle',
      modal: '🔄 Transformation modale',
      person: '👤 Changement de personne',
      connector: '🔗 Ajout de connecteur',
      politeness: '📊 Changement de politesse',
      voice: '🎭 Changement de voix'
    };
    return labels[type];
  };

  const handleUseHint = (hintType: 'conjugation' | 'rule') => {
    const hintPenalty = content.hintPenalty || 10;
    setState({
      ...state,
      hintsUsed: state.hintsUsed + 1
    });

    if (hintType === 'conjugation') {
      setShowConjugationHint(true);
    } else {
      setShowRuleHint(true);
    }

    toast.info(`Indice utilisé ! -${hintPenalty} points`);
  };

  const compareTransformations = (userAnswer: string, expected: string, variations?: string[]): { correct: boolean; score: number; differences: string[] } => {
    const normalize = (text: string) => text.toLowerCase().trim().replace(/[.,!?;:]/g, '');
    const user = normalize(userAnswer);
    const exp = normalize(expected);

    // Check exact match
    if (user === exp) {
      return { correct: true, score: 100, differences: [] };
    }

    // Check acceptable variations
    if (variations) {
      for (const variation of variations) {
        if (normalize(variation) === user) {
          return { correct: true, score: 100, differences: [] };
        }
      }
    }

    // Calculate similarity
    const userWords = user.split(/\s+/);
    const expWords = exp.split(/\s+/);
    
    const matchingWords = userWords.filter(word => 
      expWords.some(ew => ew === word)
    ).length;

    const differences: string[] = [];
    expWords.forEach((word, index) => {
      if (userWords[index] !== word) {
        differences.push(`Position ${index + 1}: attendu "${word}", reçu "${userWords[index] || '(manquant)'}"`);
      }
    });

    const similarityScore = (matchingWords / expWords.length) * 100;

    if (similarityScore >= 70) {
      return { correct: false, score: 70, differences };
    } else if (similarityScore >= 50) {
      return { correct: false, score: 50, differences };
    } else {
      return { correct: false, score: 0, differences };
    }
  };

  const validateTransformation = () => {
    const result = compareTransformations(
      state.userTransformation,
      currentExercise.expectedAnswer,
      currentExercise.acceptableVariations
    );

    const hintPenalty = content.hintPenalty || 10;
    const finalScore = Math.max(0, result.score - (state.hintsUsed * hintPenalty));

    setState({
      ...state,
      phase: 'correction',
      score: {
        ...state.score,
        transformationPoints: finalScore
      }
    });

    setValidationResult({
      transformationCorrect: result.correct,
      transformationScore: finalScore,
      differences: result.differences,
      translationCorrect: false
    });

    if (result.correct) {
      toast.success(`Parfait ! +${finalScore} points`);
    } else if (result.score >= 50) {
      toast.warning(`Presque ! Structure correcte mais quelques détails à revoir. +${finalScore} points`);
    } else {
      toast.error("La transformation n'est pas correcte.");
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
      toast.success("Excellente traduction ! +50 points");
    } else {
      toast.error("La traduction n'est pas tout à fait correcte.");
    }
  };

  const goToNextExercise = () => {
    if (state.currentExerciseIndex < content.exercises.length - 1) {
      setState({
        currentExerciseIndex: state.currentExerciseIndex + 1,
        phase: 'transformation',
        userTransformation: '',
        userTranslation: '',
        hintsUsed: 0,
        score: state.score
      });
      setValidationResult(null);
      setShowHints(false);
      setShowConjugationHint(false);
      setShowRuleHint(false);
    } else {
      // Calcul du score final
      const totalScore = state.score.transformationPoints + 
                        (state.score.translationCorrect ? 50 : 0) +
                        state.score.creativityBonus;
      onComplete?.(totalScore);
    }
  };

  const goToPreviousExercise = () => {
    if (state.currentExerciseIndex > 0) {
      setState({
        ...state,
        currentExerciseIndex: state.currentExerciseIndex - 1,
        phase: 'transformation',
        userTransformation: '',
        userTranslation: '',
        hintsUsed: 0
      });
      setValidationResult(null);
      setShowConjugationHint(false);
      setShowRuleHint(false);
    }
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
                💬 Transformation Grammaticale
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
            state.phase === 'transformation' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <span className="font-semibold">1. Transformation</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            state.phase === 'correction' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            <span className="font-semibold">2. Traduction</span>
          </div>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {state.phase === 'transformation' 
                  ? 'Transformez la phrase selon l\'instruction'
                  : 'Traduisez maintenant la phrase transformée'
                }
              </CardTitle>
              <div className="flex gap-2">
                {currentExercise.transformation.examples && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHints(!showHints)}
                  >
                    <HelpCircle className="w-4 h-4 mr-1" />
                    Exemples
                  </Button>
                )}
                {content.generalNotes && (
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
            {/* Transformation Type Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {getTransformationTypeLabel(currentExercise.transformation.type)}
              </Badge>
            </div>

            {/* Base Sentence */}
            <div className="p-6 bg-accent/20 rounded-lg border-2 border-border">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Phrase de base :</p>
              <p className="text-2xl font-medium">{currentExercise.baseSentence}</p>
            </div>

            {/* Transformation Instruction */}
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="text-2xl">📝</div>
                <div className="flex-1">
                  <p className="font-semibold text-blue-900 mb-1">Instruction :</p>
                  <p className="text-blue-800">{currentExercise.transformation.instruction}</p>
                </div>
              </div>
            </div>

            {/* Examples */}
            {showHints && currentExercise.transformation.examples && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm font-semibold text-purple-900 mb-2">💡 Exemples similaires :</p>
                <div className="space-y-2">
                  {currentExercise.transformation.examples.map((example, index) => (
                    <p key={index} className="text-sm text-purple-800">• {example}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Transformation Phase */}
            {state.phase === 'transformation' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="transformation" className="text-base mb-2 block">
                    Votre transformation :
                  </Label>
                  <Input
                    id="transformation"
                    placeholder="Écrivez la phrase transformée..."
                    value={state.userTransformation}
                    onChange={(e) => setState({ ...state, userTransformation: e.target.value })}
                    className="text-lg"
                  />
                </div>

                {/* Hints Buttons */}
                {content.allowHints && currentExercise.hints && (
                  <div className="flex gap-3">
                    {currentExercise.hints.conjugation && !showConjugationHint && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUseHint('conjugation')}
                      >
                        <Lightbulb className="w-4 h-4 mr-1" />
                        Indice conjugaison (-{content.hintPenalty || 10}pts)
                      </Button>
                    )}
                    {currentExercise.hints.rule && !showRuleHint && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUseHint('rule')}
                      >
                        <Lightbulb className="w-4 h-4 mr-1" />
                        Indice règle (-{content.hintPenalty || 10}pts)
                      </Button>
                    )}
                  </div>
                )}

                {/* Shown Hints */}
                {showConjugationHint && currentExercise.hints?.conjugation && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-semibold text-yellow-900 mb-1">💡 Indice conjugaison :</p>
                    <p className="text-sm text-yellow-800">{currentExercise.hints.conjugation}</p>
                  </div>
                )}

                {showRuleHint && currentExercise.hints?.rule && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-semibold text-yellow-900 mb-1">💡 Règle grammaticale :</p>
                    <p className="text-sm text-yellow-800">{currentExercise.hints.rule}</p>
                  </div>
                )}

                {/* Hints Used Counter */}
                {state.hintsUsed > 0 && (
                  <p className="text-sm text-muted-foreground text-center">
                    Indices utilisés : {state.hintsUsed} (-{state.hintsUsed * (content.hintPenalty || 10)} points)
                  </p>
                )}

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={validateTransformation}
                    disabled={!state.userTransformation.trim()}
                    className="min-w-[200px]"
                  >
                    Valider la transformation
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Correction Phase */}
            {state.phase === 'correction' && validationResult && (
              <div className="space-y-4">
                {/* Transformation Result */}
                <div className={`p-4 rounded-lg border-2 ${
                  validationResult.transformationCorrect
                    ? 'bg-green-50 border-green-200'
                    : validationResult.transformationScore >= 50
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {validationResult.transformationCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <p className="font-semibold">
                      Score : {validationResult.transformationScore} / 100 points
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-semibold mb-1">Votre transformation :</p>
                      <p className="text-sm">{state.userTransformation}</p>
                    </div>

                    {!validationResult.transformationCorrect && (
                      <>
                        <div>
                          <p className="text-sm font-semibold mb-1">Transformation attendue :</p>
                          <p className="text-sm text-green-800">{currentExercise.expectedAnswer}</p>
                        </div>

                        {validationResult.differences.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold mb-1">Différences :</p>
                            <ul className="text-sm space-y-1">
                              {validationResult.differences.map((diff, index) => (
                                <li key={index} className="text-red-700">• {diff}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    {currentExercise.explanation && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm font-semibold mb-1">📚 Explication :</p>
                        <p className="text-sm">{currentExercise.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Translation Input */}
                <div>
                  <Label htmlFor="translation" className="text-base mb-2 block">
                    Traduisez la phrase transformée correcte :
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
        {state.phase === 'correction' && validationResult && (
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Score de l'exercice :</p>
                  <p className="text-2xl font-bold text-primary">
                    {state.score.transformationPoints + (state.score.translationCorrect ? 50 : 0)} points
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Transformation : {state.score.transformationPoints}pts</p>
                  <p>Traduction : {state.score.translationCorrect ? 50 : 0}pts</p>
                  {state.hintsUsed > 0 && (
                    <p className="text-red-600">Pénalité indices : -{state.hintsUsed * (content.hintPenalty || 10)}pts</p>
                  )}
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
            <DialogTitle>📝 Notes générales</DialogTitle>
          </DialogHeader>
          <div>
            <p className="text-sm text-muted-foreground">{content.generalNotes}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GrammarTransformationPlayer;
