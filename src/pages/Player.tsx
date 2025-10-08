import { useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, RotateCcw, CheckCircle2, ChevronLeft, ChevronRight, Info, Plus, FileText, HelpCircle, Eye } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useExercises } from "@/contexts/ExerciseContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import BurmeseKeyboard from "@/components/BurmeseKeyboard";
import ThaiConsonantsPlayer from "@/components/ThaiConsonantsPlayer";
import ThaiVowelsPlayer from "@/components/ThaiVowelsPlayer";
import BurmeseAlphabetPlayer from "@/components/BurmeseAlphabetPlayer";
import BurmeseVowelsPlayer from "@/components/BurmeseVowelsPlayer";
import BurmeseDiacriticsPlayer from "@/components/BurmeseDiacriticsPlayer";
import HiraganaChartPlayer from "@/components/HiraganaChartPlayer";
import KatakanaChartPlayer from "@/components/KatakanaChartPlayer";
import HangeulChartPlayer from "@/components/HangeulChartPlayer";
import HangeulChartFullPlayer from "@/components/HangeulChartFullPlayer";
import HangeulMixerFullPlayer from "@/components/HangeulMixerFullPlayer";
import KatakanaMixerPlayer from "@/components/KatakanaMixerPlayer";
import KatakanaMixerFullPlayer from "@/components/KatakanaMixerFullPlayer";
import HiraganaMixerFullPlayer from "@/components/HiraganaMixerFullPlayer";
import BurmeseAlphabetMixerFullPlayer from "@/components/BurmeseAlphabetMixerFullPlayer";
import ThaiConsonantsMixerFullPlayer from "@/components/ThaiConsonantsMixerFullPlayer";

const Player = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getExercise } = useExercises();

  // Get pathId from query params
  const searchParams = new URLSearchParams(window.location.search);
  const pathId = searchParams.get('pathId');

  const exercise = getExercise(id || "");

  // Function to mark exercise as completed with XP/Coins rewards
  const handleCompleteExercise = async (score: number = 100) => {
    if (!id) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Vous devez être connecté pour enregistrer votre progression');
        return;
      }

      // Calculate rewards based on score
      const baseXP = 10;
      const baseCoins = 5;
      const xpEarned = Math.round(baseXP * (score / 100));
      const coinsEarned = Math.round(baseCoins * (score / 100));

      // Check if progress entry already exists
      const { data: existing } = await supabase
        .from('user_exercise_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('exercise_id', id)
        .eq('learning_path_id', pathId || '')
        .single();

      const isFirstCompletion = !existing || existing.status !== 'completed';

      if (existing) {
        // Update existing progress
        const { error } = await supabase
          .from('user_exercise_progress')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
            last_practiced_at: new Date().toISOString(),
            success_count: (existing.success_count || 0) + 1,
            attempts_count: (existing.attempts_count || 0) + 1,
            last_score: score,
            best_score: Math.max(existing.best_score || 0, score),
            xp_earned: (existing.xp_earned || 0) + xpEarned,
            coins_earned: (existing.coins_earned || 0) + coinsEarned
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Create new progress entry
        const { error } = await supabase
          .from('user_exercise_progress')
          .insert({
            user_id: user.id,
            exercise_id: id,
            learning_path_id: pathId || null,
            status: 'completed',
            completed_at: new Date().toISOString(),
            first_attempt_at: new Date().toISOString(),
            last_practiced_at: new Date().toISOString(),
            attempts_count: 1,
            success_count: 1,
            last_score: score,
            best_score: score,
            xp_earned: xpEarned,
            coins_earned: coinsEarned
          });

        if (error) throw error;
      }

      // Update user's total XP and coins in user_progress table
      const { data: userProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (userProgress) {
        await supabase
          .from('user_progress')
          .update({
            total_xp: (userProgress.total_xp || 0) + xpEarned,
            coins: (userProgress.coins || 0) + coinsEarned,
            exercises_completed: (userProgress.exercises_completed || 0) + (isFirstCompletion ? 1 : 0)
          })
          .eq('user_id', user.id);
      } else {
        // Create user progress entry if doesn't exist
        await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            total_xp: xpEarned,
            coins: coinsEarned,
            exercises_completed: 1,
            current_level: 1
          });
      }

      // Update learning path progression if pathId exists
      if (pathId) {
        // Get total exercises count and completed count for this path
        const { data: progressData } = await supabase
          .from('user_exercise_progress')
          .select('exercise_id, status')
          .eq('user_id', user.id)
          .eq('learning_path_id', pathId);

        const completedCount = progressData?.filter(p => p.status === 'completed').length || 0;
        const totalCount = progressData?.length || 1;
        const completionPercentage = (completedCount / totalCount) * 100;

        // Update the learning path progress
        const { data: pathProgress } = await supabase
          .from('user_learning_paths')
          .select('*')
          .eq('user_id', user.id)
          .eq('learning_path_id', pathId)
          .single();

        if (pathProgress) {
          await supabase
            .from('user_learning_paths')
            .update({
              completion_percentage: completionPercentage,
              status: completionPercentage === 100 ? 'completed' : 'in_progress',
              last_activity: new Date().toISOString(),
              total_xp_earned: (pathProgress.total_xp_earned || 0) + xpEarned,
              total_coins_earned: (pathProgress.total_coins_earned || 0) + coinsEarned
            })
            .eq('user_id', user.id)
            .eq('learning_path_id', pathId);
        }
      }

      toast.success(`✅ Exercice complété ! +${xpEarned} XP, +${coinsEarned} 🪙`, {
        duration: 3000,
      });

      // Navigate back after a short delay
      setTimeout(() => {
        if (pathId) {
          navigate(`/learning-path/${pathId}`);
        } else {
          navigate(-1);
        }
      }, 2000);
    } catch (err: any) {
      console.error('Error completing exercise:', err);
      toast.error('Erreur lors de l\'enregistrement de la progression');
    }
  };

  // LOCKED: Route Katakana Mixer to its isolated player (before useState hooks)
  if (exercise && exercise.title === "Katakana Mixer - Jeu de placement des Katakana") {
    return <KatakanaMixerFullPlayer />;
  }

  // LOCKED: Route Hiragana Mixer to its isolated player (before useState hooks)
  if (exercise && exercise.title === "Hiragana Mixer - Jeu de placement des Hiragana") {
    return <HiraganaMixerFullPlayer />;
  }

  // LOCKED: Route Burmese Alphabet Mixer to its isolated player (before useState hooks)
  if (exercise && exercise.title === "Burmese Alphabet Mixer - Jeu de placement de l'alphabet birman") {
    return <BurmeseAlphabetMixerFullPlayer />;
  }

  // LOCKED: Route Thai Consonants Mixer to its isolated player (before useState hooks)
  if (exercise && exercise.title === "Thai Consonants Mixer - Jeu de placement des consonnes thaïes") {
    return <ThaiConsonantsMixerFullPlayer />;
  }

  // LOCKED: Route Hangeul Chart to its isolated player (before useState hooks)
  if (exercise && exercise.title === "Hangeul Chart - Tableau de l'alphabet coréen") {
    return <HangeulChartFullPlayer />;
  }

  // LOCKED: Route Hangeul Mixer to its isolated player (before useState hooks)
  if (exercise && exercise.title === "Hangeul Mixer - Jeu de placement de l'alphabet coréen") {
    return <HangeulMixerFullPlayer />;
  }

  const [isFlipped, setIsFlipped] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [savedCards, setSavedCards] = useState<number[]>([]); // Cartes sauvegardées (difficiles)
  const [showSummary, setShowSummary] = useState(false); // Afficher le résumé final

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Exercice introuvable</h2>
          <p className="text-muted-foreground mb-6">Cet exercice n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate("/catalog")}>
            Retour au catalogue
          </Button>
        </div>
      </div>
    );
  }

  const renderFlashcardPlayer = () => {
    const content = exercise.content;
    // Support both old format (single card) and new format (multiple cards)
    const cards = content.cards || [{ front: content.front, back: content.back, category: content.category }];
    const shuffleSides = content.shuffleSides || false;

    // Générer un mélange aléatoire stable pour chaque carte
    const [cardShuffles] = useState(() => {
      if (!shuffleSides) return cards.map(() => false);
      return cards.map(() => Math.random() > 0.5);
    });

    const currentCard = cards[currentCardIndex] || cards[0];
    const isCurrentCardFlipped = shuffleSides && cardShuffles[currentCardIndex];
    const totalCards = cards.length;
    const progressPercentage = (completedCards.length / totalCards) * 100;

    const handleNextCard = () => {
      // Marquer la carte actuelle comme complétée
      if (!completedCards.includes(currentCardIndex)) {
        setCompletedCards([...completedCards, currentCardIndex]);
      }

      if (currentCardIndex < totalCards - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
        setShowFeedback(false);
      } else {
        // Dernière carte - afficher le résumé
        setShowSummary(true);
      }
    };

    const handleSaveCard = () => {
      if (!savedCards.includes(currentCardIndex)) {
        setSavedCards([...savedCards, currentCardIndex]);
        toast.success("Carte sauvegardée pour révision");
      } else {
        toast.info("Cette carte est déjà sauvegardée");
      }
    };

    const handlePrevCard = () => {
      if (currentCardIndex > 0) {
        setCurrentCardIndex(currentCardIndex - 1);
        setIsFlipped(false);
        setShowFeedback(false);
      }
    };

    const handleMarkAsCompleted = () => {
      if (!completedCards.includes(currentCardIndex)) {
        setCompletedCards([...completedCards, currentCardIndex]);
      }
      setShowFeedback(true);
    };

    return (
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Progression
            </span>
            <span className="text-sm font-medium text-foreground">
              {completedCards.length} / {totalCards} cartes complétées
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="perspective-1000">
          <div
            className={`relative w-full min-h-[400px] transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 bg-card rounded-2xl border-2 border-border shadow-xl p-12 backface-hidden cursor-pointer ${
                isFlipped ? "invisible" : ""
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-center">
                {content.imageUrl && (
                  <img src={content.imageUrl} alt="" className="max-w-xs mb-6 rounded-lg" />
                )}
                {(() => {
                  const displayText = isCurrentCardFlipped ? currentCard.back : currentCard.front;
                  // Format: "日本語|romanji" - on sépare si le pipe existe
                  const parts = displayText.split('|');
                  if (parts.length === 2) {
                    return (
                      <>
                        <p className="text-5xl font-bold text-foreground mb-2">{parts[0]}</p>
                        <p className="text-lg text-gray-500">{parts[1]}</p>
                      </>
                    );
                  }
                  return <p className="text-4xl font-bold text-foreground mb-4">{displayText}</p>;
                })()}
                {content.audioUrl && (
                  <Button variant="outline" size="lg" onClick={(e) => e.stopPropagation()}>
                    <Volume2 className="w-5 h-5 mr-2" />
                    Écouter
                  </Button>
                )}
              </div>
              <div className="absolute bottom-6 left-0 right-0 px-6">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground text-center">Cliquez pour voir la réponse</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveCard();
                    }}
                    className="w-full"
                  >
                    {savedCards.includes(currentCardIndex) ? "✓ Carte sauvegardée" : "Sauvegarder cette carte"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 bg-gradient-hero rounded-2xl border-2 border-primary shadow-xl p-12 backface-hidden rotate-y-180 cursor-pointer ${
                !isFlipped ? "invisible" : ""
              }`}
            >
              <div className="flex flex-col items-center justify-center h-full text-center">
                {(() => {
                  const displayText = isCurrentCardFlipped ? currentCard.front : currentCard.back;
                  // Format: "日本語|romanji" - on sépare si le pipe existe
                  const parts = displayText.split('|');
                  if (parts.length === 2) {
                    return (
                      <>
                        <p className="text-5xl font-bold text-white mb-2">{parts[0]}</p>
                        <p className="text-lg text-white/70 mb-4">{parts[1]}</p>
                      </>
                    );
                  }
                  return <p className="text-4xl font-bold text-white mb-4">{displayText}</p>;
                })()}
                {currentCard.category && (
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                    {currentCard.category}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
          <div className="flex gap-4">
            <Button
              size="lg"
              variant="outline"
              onClick={handlePrevCard}
              disabled={currentCardIndex === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-w-[200px]"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {isFlipped ? "Voir le recto" : "Voir le verso"}
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleSaveCard}
              className={savedCards.includes(currentCardIndex) ? "bg-blue-50 border-blue-500" : ""}
              title="Sauvegarder cette carte pour révision"
            >
              📌
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleNextCard}
              disabled={currentCardIndex === totalCards - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Bouton Valider toujours visible */}
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => handleCompleteExercise(100)}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Valider l'exercice
          </Button>
        </div>

        {/* Card Counter */}
        <div className="text-center mt-4">
          <span className="text-sm text-muted-foreground">
            Carte {currentCardIndex + 1} / {totalCards}
          </span>
        </div>

        {isFlipped && !showFeedback && (
          <div className="flex gap-4 justify-center mt-8">
            <Button
              size="lg"
              variant="outline"
              className="flex-1 max-w-[200px] border-green-500 text-green-600 hover:bg-green-50"
              onClick={handleMarkAsCompleted}
            >
              😊 Facile
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 max-w-[200px] border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              onClick={handleMarkAsCompleted}
            >
              😐 Moyen
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 max-w-[200px] border-red-500 text-red-600 hover:bg-red-50"
              onClick={handleMarkAsCompleted}
            >
              😓 Difficile
            </Button>
          </div>
        )}

        {showFeedback && !showSummary && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-scale-in">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-lg font-semibold text-green-900 mb-2">
              Bien joué ! 🎉
            </p>
            <p className="text-green-700 mb-4">
              {currentCardIndex < totalCards - 1
                ? "Continuez avec la carte suivante"
                : completedCards.length === totalCards
                  ? "Vous avez terminé toutes les cartes !"
                  : "Passez à la carte suivante ou terminez l'exercice"
              }
            </p>
            <div className="flex gap-3 justify-center">
              {currentCardIndex < totalCards - 1 ? (
                <Button onClick={() => {
                  handleNextCard();
                }}>
                  Carte suivante
                </Button>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    handleNextCard(); // This will trigger showSummary on last card
                  }}
                >
                  Voir le résumé
                </Button>
              )}
              <Button variant="outline" onClick={() => navigate(pathId ? `/learning-path/${pathId}` : "/exercises")}>
                Retour
              </Button>
            </div>
          </div>
        )}

        {/* Summary Screen - Affichage final des cartes sauvegardées */}
        {showSummary && (
          <div className="mt-8 animate-scale-in">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 text-center mb-6">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Exercice terminé !
              </h2>
              <p className="text-green-700 mb-2">
                Vous avez parcouru toutes les {totalCards} cartes.
              </p>
              <p className="text-sm text-muted-foreground">
                {savedCards.length > 0
                  ? `Vous avez sauvegardé ${savedCards.length} carte(s) pour révision.`
                  : "Vous n'avez sauvegardé aucune carte. Excellent travail !"}
              </p>
            </div>

            {savedCards.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  📚 Cartes à réviser ({savedCards.length})
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Voici les cartes que vous avez sauvegardées pendant l'exercice :
                </p>

                <div className="space-y-3">
                  {savedCards.map((cardIndex) => {
                    const card = cards[cardIndex];
                    const displayFront = isCurrentCardFlipped ? card.back : card.front;
                    const displayBack = isCurrentCardFlipped ? card.front : card.back;

                    // Parser pour afficher correctement
                    const parseFront = displayFront.split('|');
                    const parseBack = displayBack.split('|');

                    return (
                      <div key={cardIndex} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Recto :</p>
                            {parseFront.length === 2 ? (
                              <>
                                <p className="text-2xl font-bold text-foreground">{parseFront[0]}</p>
                                <p className="text-sm text-gray-500">{parseFront[1]}</p>
                              </>
                            ) : (
                              <p className="text-lg font-semibold text-foreground">{displayFront}</p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Verso :</p>
                            {parseBack.length === 2 ? (
                              <>
                                <p className="text-2xl font-bold text-foreground">{parseBack[0]}</p>
                                <p className="text-sm text-gray-500">{parseBack[1]}</p>
                              </>
                            ) : (
                              <p className="text-lg font-semibold text-foreground">{displayBack}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-center mt-6">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleCompleteExercise(100)}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Valider et sauvegarder
              </Button>
              <Button onClick={() => {
                setCurrentCardIndex(0);
                setIsFlipped(false);
                setShowFeedback(false);
                setShowSummary(false);
                setCompletedCards([]);
              }}>
                Recommencer
              </Button>
              <Button variant="outline" onClick={() => navigate(pathId ? `/learning-path/${pathId}` : "/exercises")}>
                Retour
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAssociationPlayer = () => {
    const content = exercise.content;
    const originalPairGroups = content.pairGroups || [];
    const shufflePairs = content.shufflePairs || false;

    // Mélanger les paires entre les pages si l'option est activée
    const pairGroups = useMemo(() => {
      if (!shufflePairs || originalPairGroups.length === 0) {
        return originalPairGroups;
      }

      // Collecter toutes les paires de toutes les pages
      const allPairs = originalPairGroups.flat();

      // Mélanger toutes les paires
      const shuffledPairs = [...allPairs].sort(() => Math.random() - 0.5);

      // Redistribuer les paires dans des pages de même taille que l'original
      const newGroups: Array<Array<{ left: string; right: string; id: string }>> = [];
      let currentIndex = 0;

      for (const originalGroup of originalPairGroups) {
        const groupSize = originalGroup.length;
        const newGroup = shuffledPairs.slice(currentIndex, currentIndex + groupSize);
        newGroups.push(newGroup);
        currentIndex += groupSize;
      }

      return newGroups;
    }, [originalPairGroups, shufflePairs]);

    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [matches, setMatches] = useState<{ [key: string]: string }>({});
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [completedGroups, setCompletedGroups] = useState<number[]>([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const currentGroup = pairGroups[currentGroupIndex] || [];
    const totalGroups = pairGroups.length;
    const progressPercentage = (completedGroups.length / totalGroups) * 100;

    // Mélanger les éléments de droite
    const shuffledRight = useMemo(() => {
      return [...currentGroup].map(p => ({ id: p.id, value: p.right })).sort(() => Math.random() - 0.5);
    }, [currentGroupIndex, pairGroups]);

    const handleLeftClick = (pairId: string) => {
      if (matches[pairId]) return; // Déjà associé
      setSelectedLeft(pairId);
    };

    const handleRightClick = (rightId: string, rightValue: string) => {
      if (!selectedLeft) return;

      // Associer sans vérifier si c'est correct
      setMatches({ ...matches, [selectedLeft]: rightId });
      setSelectedLeft(null);
    };

    const handleRightContextMenu = (e: React.MouseEvent, rightId: string) => {
      e.preventDefault(); // Empêcher le menu contextuel par défaut

      // Trouver la paire associée à cet élément de droite
      const leftPairId = Object.keys(matches).find(key => matches[key] === rightId);

      if (leftPairId) {
        // Supprimer l'association
        const newMatches = { ...matches };
        delete newMatches[leftPairId];
        setMatches(newMatches);
        toast.info("Association annulée");
      }
    };

    const handleLeftContextMenu = (e: React.MouseEvent, pairId: string) => {
      e.preventDefault(); // Empêcher le menu contextuel par défaut

      // Vérifier si cet élément gauche est associé
      if (matches[pairId]) {
        // Supprimer l'association
        const newMatches = { ...matches };
        delete newMatches[pairId];
        setMatches(newMatches);
        toast.info("Association annulée");
      }
    };

    const isGroupComplete = currentGroup.length > 0 && currentGroup.every(pair => matches[pair.id]);

    const handleContinue = () => {
      if (!isGroupComplete) return;

      // Vérifier si toutes les associations sont correctes
      const allCorrect = currentGroup.every(pair => {
        const matchedRightId = matches[pair.id];
        const matchedRight = shuffledRight.find(r => r.id === matchedRightId);
        return matchedRight && matchedRight.value === pair.right;
      });

      if (allCorrect) {
        // Toutes les associations sont correctes
        if (!completedGroups.includes(currentGroupIndex)) {
          setCompletedGroups([...completedGroups, currentGroupIndex]);
        }
        setShowFeedback(true);
      } else {
        // Il y a des erreurs - réinitialiser
        setMatches({});
        setSelectedLeft(null);
        toast.error("Certaines associations sont incorrectes. Réessayez !");
      }
    };

    const handleNext = () => {
      if (currentGroupIndex < totalGroups - 1) {
        setCurrentGroupIndex(currentGroupIndex + 1);
        setMatches({});
        setSelectedLeft(null);
        setShowFeedback(false);
      }
    };

    const handleReset = () => {
      setCurrentGroupIndex(0);
      setMatches({});
      setSelectedLeft(null);
      setCompletedGroups([]);
      setShowFeedback(false);
    };

    if (totalGroups === 0 || currentGroup.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            Aucune paire d'association définie pour cet exercice
          </p>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Progression
            </span>
            <span className="text-sm font-medium text-foreground">
              Page {currentGroupIndex + 1} / {totalGroups}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-8">Associez les paires</h2>

        {!showFeedback ? (
          <>
            {/* Matching Grid - Style Duolingo */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Left Column */}
              <div className="space-y-3">
                {currentGroup.map((pair) => (
                  <button
                    key={pair.id}
                    onClick={() => handleLeftClick(pair.id)}
                    onContextMenu={(e) => handleLeftContextMenu(e, pair.id)}
                    disabled={!!matches[pair.id]}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      matches[pair.id]
                        ? "bg-gray-100 border-gray-400 opacity-50 cursor-context-menu"
                        : selectedLeft === pair.id
                        ? "bg-blue-100 border-blue-500 shadow-lg scale-105"
                        : "bg-white border-gray-300 hover:border-blue-400 hover:shadow-md"
                    }`}
                    title={matches[pair.id] ? "Clic droit pour annuler l'association" : ""}
                  >
                    {(() => {
                      // Format: "日本語|romanji" - afficher kanji + romanji
                      const parts = pair.left.split('|');
                      if (parts.length === 2) {
                        return (
                          <div className="text-left">
                            <div className="text-xl font-bold text-foreground">{parts[0]}</div>
                            <div className="text-sm text-gray-500">{parts[1]}</div>
                          </div>
                        );
                      }
                      return <span className="text-lg font-semibold">{pair.left}</span>;
                    })()}
                  </button>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                {shuffledRight.map((item) => {
                  const isMatched = Object.values(matches).includes(item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleRightClick(item.id, item.value)}
                      onContextMenu={(e) => handleRightContextMenu(e, item.id)}
                      disabled={isMatched || !selectedLeft}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        isMatched
                          ? "bg-gray-100 border-gray-400 opacity-50 cursor-context-menu"
                          : !selectedLeft
                          ? "bg-gray-50 border-gray-200 cursor-not-allowed opacity-50"
                          : "bg-white border-gray-300 hover:border-blue-400 hover:shadow-md"
                      }`}
                      title={isMatched ? "Clic droit pour annuler l'association" : ""}
                    >
                      <span className="text-lg font-semibold">{item.value}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Instruction */}
            <p className="text-center text-muted-foreground mb-6">
              {selectedLeft
                ? "Maintenant, cliquez sur la correspondance à droite"
                : "Cliquez sur un élément à gauche pour commencer"}
            </p>

            {/* Continue Button */}
            {isGroupComplete && (
              <div className="text-center">
                <Button size="lg" onClick={handleContinue} className="min-w-[200px]">
                  CONTINUER
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Feedback Screen */
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-scale-in">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-900 mb-2">
              Excellent travail ! 🎉
            </h3>
            <p className="text-green-700 mb-6">
              {currentGroupIndex < totalGroups - 1
                ? "Vous avez associé toutes les paires ! Passons à la page suivante."
                : "Vous avez terminé toutes les pages !"}
            </p>

            <div className="flex gap-4 justify-center">
              {currentGroupIndex < totalGroups - 1 ? (
                <Button size="lg" onClick={handleNext}>
                  Page suivante
                </Button>
              ) : (
                <>
                  <Button size="lg" onClick={handleReset}>
                    Recommencer
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/exercises")}>
                    Terminer
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Final Completion */}
        {completedGroups.length === totalGroups && currentGroupIndex === totalGroups - 1 && showFeedback && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 rounded-xl p-6 text-center">
            <div className="text-5xl mb-3">🏆</div>
            <p className="text-xl font-bold text-green-900 mb-2">
              Félicitations ! Vous avez terminé l'exercice !
            </p>
            <p className="text-green-700">
              Toutes les {totalGroups} pages ont été complétées avec succès !
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderTranslationPlayer = () => {
    const content = exercise.content;
    const originalExercises = content.exercises || [];
    const shuffleExercises = content.shuffleExercises || false;

    // Mélanger les exercices si l'option est activée
    const exercises = useMemo(() => {
      if (!shuffleExercises || originalExercises.length === 0) {
        return originalExercises;
      }
      return [...originalExercises].sort(() => Math.random() - 0.5);
    }, [originalExercises, shuffleExercises]);

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [userTranslation, setUserTranslation] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [autoShowHints, setAutoShowHints] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [completedExercises, setCompletedExercises] = useState<number[]>([]);
    const [showSummary, setShowSummary] = useState(false);
    const [userAnswers, setUserAnswers] = useState<Array<{ exerciseIndex: number; userAnswer: string; isCorrect: boolean }>>([]);
    const [showPlusMenu, setShowPlusMenu] = useState(false);
    const [showGeneralNotes, setShowGeneralNotes] = useState(false);
    const [showPageHelp, setShowPageHelp] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const currentExercise = exercises[currentExerciseIndex];
    const totalExercises = exercises.length;
    const progressPercentage = (completedExercises.length / totalExercises) * 100;

    if (!currentExercise) {
      return (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            Aucun exercice de traduction défini
          </p>
        </div>
      );
    }

    const handleCheckAnswer = () => {
      const isCorrect = userTranslation.toLowerCase().trim() === currentExercise.targetText.toLowerCase().trim();

      setShowAnswer(true);
      if (!completedExercises.includes(currentExerciseIndex)) {
        setCompletedExercises([...completedExercises, currentExerciseIndex]);
      }

      // Enregistrer la réponse de l'utilisateur
      setUserAnswers([...userAnswers, {
        exerciseIndex: currentExerciseIndex,
        userAnswer: userTranslation,
        isCorrect: isCorrect
      }]);
    };

    const handleNext = () => {
      if (currentExerciseIndex < totalExercises - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setUserTranslation("");
        setShowHint(false);
        setShowNotes(false);
        setShowAnswer(false);
      } else {
        // Dernier exercice - afficher le résumé
        setShowSummary(true);
      }
    };

    const handleReset = () => {
      setCurrentExerciseIndex(0);
      setUserTranslation("");
      setShowHint(false);
      setShowNotes(false);
      setShowAnswer(false);
      setCompletedExercises([]);
      setShowSummary(false);
      setUserAnswers([]);
    };

    const isCorrect = userTranslation.toLowerCase().trim() === currentExercise.targetText.toLowerCase().trim();

    return (
      <div className="max-w-7xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6 max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Progression
            </span>
            <span className="text-sm font-medium text-foreground">
              {currentExerciseIndex + 1} / {totalExercises}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {!showAnswer ? (
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
            {/* Notes Panel - Gauche sur desktop, caché sur mobile */}
            <div className="hidden lg:block space-y-4">
              {/* General Notes Display - Sidebar */}
              {showGeneralNotes && content.generalNotes && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg sticky top-4 max-h-[calc(100vh-100px)] overflow-y-auto animate-slide-in-left">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-green-900">📝 Notes générales de l'exercice :</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowGeneralNotes(false)}
                    >
                      Fermer
                    </Button>
                  </div>
                  <p className="text-sm text-green-800 whitespace-pre-wrap">{content.generalNotes}</p>
                </div>
              )}

              {/* Page Help Display - Sidebar */}
              {showPageHelp && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg sticky top-4 max-h-[calc(100vh-100px)] overflow-y-auto animate-slide-in-left">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-purple-900">❓ Aide pour cette page :</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPageHelp(false)}
                    >
                      Fermer
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm text-purple-900">
                    <div>
                      <p className="font-semibold">Texte source :</p>
                      <p>{currentExercise.sourceText} {currentExercise.hints && `(${currentExercise.hints})`}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Traduction attendue :</p>
                      <p>{currentExercise.targetText}</p>
                    </div>
                    {currentExercise.notes && (
                      <div>
                        <p className="font-semibold">Notes :</p>
                        <p>{currentExercise.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Source Text */}
              <div className="bg-card rounded-xl border-2 border-border p-8 shadow-sm relative">
              {/* Bouton [+] en haut à droite */}
              <div className="absolute top-4 right-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={() => setShowPlusMenu(!showPlusMenu)}
                  title="Aide & Notes"
                >
                  <Plus className={`w-5 h-5 transition-transform ${showPlusMenu ? "rotate-45" : ""}`} />
                </Button>

                {/* Menu déroulant */}
                {showPlusMenu && (
                  <div className="absolute right-0 top-12 bg-white border border-border rounded-lg shadow-lg p-2 z-10 min-w-[150px] animate-scale-in">
                    {content.generalNotes && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          setShowGeneralNotes(!showGeneralNotes);
                          setShowPlusMenu(false);
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Notes
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        setShowPageHelp(!showPageHelp);
                        setShowPlusMenu(false);
                      }}
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Aide
                    </Button>
                  </div>
                )}
              </div>

              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-2">Traduisez cette phrase :</p>
                <p className="text-3xl font-bold text-foreground">{currentExercise.sourceText}</p>
              </div>

              {/* General Notes Display - Mobile uniquement */}
              {showGeneralNotes && content.generalNotes && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg lg:hidden">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-green-900">📝 Notes générales de l'exercice :</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowGeneralNotes(false)}
                    >
                      Fermer
                    </Button>
                  </div>
                  <p className="text-sm text-green-800 whitespace-pre-wrap">{content.generalNotes}</p>
                </div>
              )}

              {/* Page Help Display - Mobile uniquement */}
              {showPageHelp && (
                <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg lg:hidden">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-purple-900">❓ Aide pour cette page :</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPageHelp(false)}
                    >
                      Fermer
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm text-purple-900">
                    <div>
                      <p className="font-semibold">Texte source :</p>
                      <p>{currentExercise.sourceText} {currentExercise.hints && `(${currentExercise.hints})`}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Traduction attendue :</p>
                      <p>{currentExercise.targetText}</p>
                    </div>
                    {currentExercise.notes && (
                      <div>
                        <p className="font-semibold">Notes :</p>
                        <p>{currentExercise.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Hint Section avec auto-révélation */}
              {currentExercise.hints && (
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHint(!showHint)}
                    >
                      {showHint || autoShowHints ? "Masquer l'indice" : "💡 Voir l'indice"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setAutoShowHints(!autoShowHints)}
                      title={autoShowHints ? "Désactiver auto-révélation" : "Activer auto-révélation"}
                    >
                      <Eye className={`w-4 h-4 ${autoShowHints ? "text-blue-600" : "text-muted-foreground"}`} />
                    </Button>
                  </div>
                  {(showHint || autoShowHints) && (
                    <p className="text-sm text-muted-foreground italic">
                      {currentExercise.hints}
                    </p>
                  )}
                </div>
              )}
            </div>

              {/* Translation Input */}
              <div className="bg-card rounded-xl border-2 border-border p-6 shadow-sm">
                <label className="block text-sm font-medium mb-3">Votre traduction :</label>
                <textarea
                  ref={inputRef}
                  value={userTranslation}
                  onChange={(e) => setUserTranslation(e.target.value)}
                  placeholder="Entrez votre traduction ici..."
                  className="w-full min-h-[120px] p-4 border-2 border-border rounded-lg resize-none focus:border-primary focus:outline-none text-lg"
                />
              </div>

              {/* Check Button */}
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={handleCheckAnswer}
                  disabled={!userTranslation.trim()}
                  className="min-w-[200px]"
                >
                  Vérifier
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Feedback Screen */
          <div className={`rounded-xl border-2 p-8 text-center animate-scale-in mb-6 max-w-3xl mx-auto ${
            isCorrect
              ? "bg-green-50 border-green-200"
              : "bg-orange-50 border-orange-200"
          }`}>
            <div className="text-5xl mb-4">
              {isCorrect ? "✅" : "📝"}
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${
              isCorrect ? "text-green-900" : "text-orange-900"
            }`}>
              {isCorrect ? "Excellent !" : "Presque !"}
            </h3>

            {/* User's answer */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-1">Votre réponse :</p>
              <p className="text-lg font-semibold text-foreground">{userTranslation}</p>
            </div>

            {/* Correct answer */}
            {!isCorrect && (
              <div className="bg-green-100 rounded-lg p-4 mb-4">
                <p className="text-sm text-green-700 mb-1">Réponse attendue :</p>
                <p className="text-lg font-semibold text-green-900">{currentExercise.targetText}</p>
              </div>
            )}

            {/* Source with romanji */}
            {currentExercise.hints && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-700 mb-1">Texte source :</p>
                <p className="text-xl font-bold text-blue-900">{currentExercise.sourceText}</p>
                <p className="text-sm text-blue-600 mt-1">({currentExercise.hints})</p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center">
              {currentExerciseIndex < totalExercises - 1 ? (
                <Button size="lg" onClick={handleNext}>
                  Phrase suivante
                </Button>
              ) : (
                <Button size="lg" onClick={handleNext}>
                  Voir le résumé
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Answer Summary Screen */}
        {showSummary && (
          <div className="max-w-5xl mx-auto animate-scale-in">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 rounded-xl p-8 mb-6">
              <div className="text-5xl mb-3 text-center">🏆</div>
              <h2 className="text-3xl font-bold text-green-900 mb-2 text-center">
                Answer Summary
              </h2>
              <p className="text-green-700 text-center mb-4">
                Below is a summary of your answers.
              </p>
              <div className="bg-white rounded-lg p-4 inline-block mx-auto">
                <p className="text-xl font-semibold text-foreground">
                  Score: {Math.round((userAnswers.filter(a => a.isCorrect).length / totalExercises) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">
                  {userAnswers.filter(a => a.isCorrect).length} / {totalExercises} correct answers
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 shadow-lg mb-6">
              <div className="space-y-6">
                {userAnswers.map((answer, index) => {
                  const exercise = exercises[answer.exerciseIndex];
                  return (
                    <div key={index} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-muted-foreground mb-1">
                            Question {index + 1} of {totalExercises}
                          </p>
                          <p className="text-lg font-medium text-foreground mb-2">
                            {exercise.sourceText}
                          </p>
                          {exercise.hints && (
                            <p className="text-sm text-muted-foreground italic">
                              ({exercise.hints})
                            </p>
                          )}
                        </div>
                        <div className={`ml-4 px-3 py-1 rounded-full text-sm font-semibold ${
                          answer.isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className={`p-3 rounded-lg ${
                          answer.isCorrect
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}>
                          <p className="text-xs text-muted-foreground mb-1">Your Answer:</p>
                          <p className="text-base font-medium">{answer.userAnswer}</p>
                        </div>

                        {!answer.isCorrect && (
                          <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                            <p className="text-xs text-green-700 mb-1">Correct Answer:</p>
                            <p className="text-base font-medium text-green-900">{exercise.targetText}</p>
                          </div>
                        )}

                        {exercise.notes && (
                          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                            <p className="text-xs text-blue-700 mb-1">📝 Notes:</p>
                            <p className="text-sm text-blue-900">{exercise.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  const score = Math.round((userAnswers.filter(a => a.isCorrect).length / totalExercises) * 100);
                  handleCompleteExercise(score);
                }}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Valider et sauvegarder
              </Button>
              <Button size="lg" onClick={handleReset}>
                Recommencer
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate(pathId ? `/learning-path/${pathId}` : "/catalog")}>
                Retour
              </Button>
            </div>
          </div>
        )}

        {/* Burmese Keyboard - only for Burmese language */}
        {exercise.language === "birman" && (
          <BurmeseKeyboard
            onInsert={(char) => {
              if (inputRef.current) {
                const start = inputRef.current.selectionStart || 0;
                const end = inputRef.current.selectionEnd || 0;
                const newValue = userTranslation.substring(0, start) + char + userTranslation.substring(end);
                setUserTranslation(newValue);

                // Focus and set cursor position after the inserted character
                setTimeout(() => {
                  if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.selectionStart = inputRef.current.selectionEnd = start + char.length;
                  }
                }, 0);
              }
            }}
          />
        )}
      </div>
    );
  };

  const renderAlphabetPlayer = () => {
    const content = exercise.content;

    // IMPORTANT: useState must be called BEFORE any conditional returns (Rules of Hooks)
    const [revealedChars, setRevealedChars] = useState<Set<string>>(new Set());

    // LOCKED: Check if this is a locked Thai exercise
    if (exercise.title === "Thai Consonants - Les 44 consonnes thaïes (3 classes)") {
      return <ThaiConsonantsPlayer content={content} onComplete={() => handleCompleteExercise(100)} />;
    }

    if (exercise.title === "Thai Vowels & Diacritics - Voyelles et signes diacritiques thaïs") {
      return <ThaiVowelsPlayer content={content} onComplete={() => handleCompleteExercise(100)} />;
    }

    // LOCKED: Check if this is a locked Burmese exercise
    if (exercise.title === "Burmese Alphabet Chart - Tableau de l'alphabet birman") {
      return <BurmeseAlphabetPlayer content={content} onComplete={() => handleCompleteExercise(100)} />;
    }

    if (exercise.title === "Burmese Vowels & Marks - Voyelles et signes birmans") {
      return <BurmeseVowelsPlayer content={content} onComplete={() => handleCompleteExercise(100)} />;
    }

    if (exercise.title === "Burmese Diacritics - Signes diacritiques birmans (tons et voyelles)") {
      return <BurmeseDiacriticsPlayer content={content} onComplete={() => handleCompleteExercise(100)} />;
    }

    if (exercise.title === "Hiragana Chart - Tableau des Hiragana") {
      return <HiraganaChartPlayer content={content} onComplete={() => handleCompleteExercise(100)} />;
    }

    if (exercise.title === "Katakana Chart - Tableau des Katakana") {
      return <KatakanaChartPlayer content={content} onComplete={() => handleCompleteExercise(100)} />;
    }

    if (exercise.title === "Katakana Mixer - Jeu de placement des Katakana") {
      return <KatakanaMixerPlayer content={content} onComplete={() => handleCompleteExercise(100)} />;
    }

    const toggleReveal = (char: string) => {
      const newRevealed = new Set(revealedChars);
      if (newRevealed.has(char)) {
        newRevealed.delete(char);
      } else {
        newRevealed.add(char);
      }
      setRevealedChars(newRevealed);
    };

    const allChars = [
      ...(content.vowels || []),
      ...(content.k_row || []),
      ...(content.s_row || []),
      ...(content.t_row || []),
      ...(content.t2_row || []),
      ...(content.n_row || []),
      ...(content.p_row || []),
      ...(content.h_row || []),
      ...(content.m_row || []),
      ...(content.y_row || []),
      ...(content.r_row || []),
      ...(content.w_row || []),
      ...(content.tone_row || []),
      ...(content.a_row || []),
      ...(content.i_row || []),
      ...(content.i2_row || []),
      ...(content.e_row || []),
      ...(content.u_row || []),
      ...(content.ui_row || []),
      ...(content.o_row || []),
      ...(content.ai_row || []),
      ...(content.au_row || []),
      ...(content.independent_row || []),
      ...(content.diacritics_row || []),
      ...(content.diacritics2_row || []),
      ...(content.medials_row || []),
      ...(content.marks_row || []),
      ...(content.high_class_row || []),
      ...(content.middle_class_row || []),
      ...(content.low_class_row || []),
      ...(content.vowels_simple_row || []),
      ...(content.vowels_complex_row || []),
      ...(content.tone_marks_row || []),
      ...(content.special_marks_row || []),
      ...(content.numbers_row || [])
    ];

    const rows = [
      { label: "a", chars: content.vowels || [] },
      { label: "k", chars: content.k_row || [] },
      { label: "s", chars: content.s_row || [] },
      { label: "t", chars: content.t_row || [] },
      { label: "t2", chars: content.t2_row || [] },
      { label: "n", chars: content.n_row || [] },
      { label: "p", chars: content.p_row || [] },
      { label: "m", chars: content.m_row || [] },
      { label: "y", chars: content.y_row || [] },
      { label: "r", chars: content.r_row || [] },
      { label: "w", chars: content.w_row || [] },
      { label: "h", chars: content.h_row || [] },
      { label: "tone", chars: content.tone_row || [] },
      { label: "ā/a", chars: content.a_row || [] },
      { label: "i/ī", chars: content.i_row || [] },
      { label: "i2", chars: content.i2_row || [] },
      { label: "e", chars: content.e_row || [] },
      { label: "u", chars: content.u_row || [] },
      { label: "o", chars: content.o_row || [] },
      { label: "ai", chars: content.ai_row || [] },
      { label: "au", chars: content.au_row || [] },
      { label: "ui", chars: content.ui_row || [] },
      { label: "indep.", chars: content.independent_row || [] },
      { label: "diac.", chars: content.diacritics_row || [] },
      { label: "diac.2", chars: content.diacritics2_row || [] },
      { label: "medials", chars: content.medials_row || [] },
      { label: "marks", chars: content.marks_row || [] },
      { label: "High Class", chars: content.high_class_row || [] },
      { label: "Middle Class", chars: content.middle_class_row || [] },
      { label: "Low Class", chars: content.low_class_row || [] },
      { label: "Simple Vowels", chars: content.vowels_simple_row || [] },
      { label: "Complex Vowels", chars: content.vowels_complex_row || [] },
      { label: "Tone Marks", chars: content.tone_marks_row || [] },
      { label: "Special Marks", chars: content.special_marks_row || [] },
      { label: "Numbers", chars: content.numbers_row || [] }
    ].filter(row => row.chars.length > 0);

    // Check if this is a Japanese alphabet (has vowels header)
    const isJapanese = content.vowels && content.vowels.length === 5;

    return (
      <div className="max-w-full mx-auto px-4">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
          {/* Header with row labels - only for Japanese */}
          {isJapanese && (
            <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-2 mb-2">
              <div></div>
              <div className="text-center font-bold text-2xl text-blue-600">a</div>
              <div className="text-center font-bold text-2xl text-blue-600">i</div>
              <div className="text-center font-bold text-2xl text-blue-600">u</div>
              <div className="text-center font-bold text-2xl text-blue-600">e</div>
              <div className="text-center font-bold text-2xl text-blue-600">o</div>
            </div>
          )}

          {/* Character rows */}
          <div className="space-y-2">
            {rows.map((row) => {
              // Special handling for h_row in Burmese: add empty slots before and after
              const isBurmeseHRow = !isJapanese && row.label === "h" && row.chars.length === 3;

              // Check if this is a Thai class row or vowels/marks row (longer label)
              const isThaiClassRow = row.label.includes("Class");
              const isThaiVowelOrMarkRow = row.label.includes("Vowels") || row.label.includes("Marks") || row.label.includes("Numbers");
              const labelColWidth = (isThaiClassRow || isThaiVowelOrMarkRow) ? "150px" : "60px";

              // Check if this row should wrap to multiple lines (more than 12 chars)
              const shouldWrap = row.chars.length > 12;

              return (
                <div key={row.label}>
                  <div className="mb-4">
                    <div className="flex items-start gap-2">
                      {/* Label */}
                      <div className="flex items-center justify-center" style={{ width: labelColWidth, minWidth: labelColWidth }}>
                        <span className={`${(isThaiClassRow || isThaiVowelOrMarkRow) ? 'text-base' : 'text-xl'} font-bold text-blue-600`}>{row.label}</span>
                      </div>

                      {/* Characters grid - wrapping allowed */}
                      <div className={`flex-1 grid gap-2 ${shouldWrap ? 'grid-cols-12' : ''}`} style={!shouldWrap ? { gridTemplateColumns: `repeat(${row.chars.length}, 1fr)` } : {}}>
                        {/* Add empty slot before h_row in Burmese */}
                        {isBurmeseHRow && <div></div>}

                        {row.chars.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => toggleReveal(item.char)}
                            className="bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 rounded-lg p-4 transition-all hover:scale-105 active:scale-95 min-h-[100px] flex flex-col items-center justify-center"
                          >
                            <div className="text-4xl font-bold text-slate-700 mb-2">
                              {item.char}
                            </div>
                            {revealedChars.has(item.char) && (
                              <div className="text-sm font-semibold text-blue-600 animate-fade-in">
                                {item.romaji}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dashed separator between Thai class rows and vowel/mark rows */}
                  {(isThaiClassRow || isThaiVowelOrMarkRow) && (
                    <div className="border-b-2 border-dashed border-slate-300 mb-4"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer with progress */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {revealedChars.size} / {allChars.length} caractères révélés
              </p>
              <div className="flex gap-3 justify-center mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRevealedChars(new Set())}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Réinitialiser
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRevealedChars(new Set(allChars.map(c => c.char)))}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Afficher tout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlayer = () => {
    // Check if flashcard is actually an alphabet chart or Katakana Mixer
    if (exercise.type === "flashcard" && exercise.content?.alphabetMode) {
      return renderAlphabetPlayer();
    }

    // LOCKED: Route Katakana Mixer to alphabet player
    if (exercise.title === "Katakana Mixer - Jeu de placement des Katakana") {
      return renderAlphabetPlayer();
    }

    switch (exercise.type) {
      case "flashcard":
        return renderFlashcardPlayer();
      case "association":
        return renderAssociationPlayer();
      case "translation":
        return renderTranslationPlayer();
      case "alphabet":
        return renderAlphabetPlayer();
      default:
        return (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              Le lecteur pour ce type d'exercice est en cours de développement
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>

          <div className="flex items-center gap-2">
            <Badge variant="outline">Niveau {exercise.difficulty}</Badge>
            <Badge className="bg-exercise-flashcard-light text-exercise-flashcard border-exercise-flashcard/20">
              📇 {exercise.type}
            </Badge>
          </div>
        </div>

        {/* Exercise Info */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {exercise.title}
          </h1>
          <p className="text-muted-foreground">
            🌐 {exercise.language}
          </p>
        </div>

        {/* Player Area */}
        <div className="animate-scale-in">
          {renderPlayer()}
        </div>
      </div>
    </div>
  );
};

export default Player;
