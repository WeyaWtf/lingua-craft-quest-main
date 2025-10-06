import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Circle, Lock, ChevronRight, ChevronDown, Trophy, RotateCcw, UserPlus, BookOpen, Gamepad2 } from "lucide-react";
import { useLearningPaths } from "@/contexts/LearningPathContext";
import { useExercises } from "@/contexts/ExerciseContext";
import { useTopics } from "@/contexts/TopicContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const LearningPathPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLearningPath, getPathProgress, startPath, markExerciseComplete } = useLearningPaths();
  const { getExercise } = useExercises();
  const { getTopic } = useTopics();

  const path = getLearningPath(id || "");
  const progress = getPathProgress(id || "");

  const [currentStep, setCurrentStep] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [completedExerciseIds, setCompletedExerciseIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (id && !progress) {
      startPath(id);
    }
    checkEnrollment();
    loadCompletedExercises();
  }, [id, progress]);

  const loadCompletedExercises = async () => {
    if (!id) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_exercise_progress')
        .select('exercise_id')
        .eq('user_id', user.id)
        .eq('learning_path_id', id)
        .eq('status', 'completed');

      if (error) {
        console.error('Error loading completed exercises:', error);
        return;
      }

      const completedIds = new Set(data?.map(item => item.exercise_id) || []);
      setCompletedExerciseIds(completedIds);
    } catch (err) {
      console.error('Error loading completed exercises:', err);
    }
  };

  const checkEnrollment = async () => {
    if (!id) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsEnrolled(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_learning_paths')
        .select('*')
        .eq('user_id', user.id)
        .eq('learning_path_id', id)
        .single();

      setIsEnrolled(!!data);
    } catch (err) {
      console.error('Error checking enrollment:', err);
    }
  };

  const handleEnroll = async () => {
    if (!id) return;

    try {
      setEnrolling(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error('Vous devez être connecté pour vous inscrire');
        navigate('/signin');
        return;
      }

      // Check if already enrolled
      const { data: existing } = await supabase
        .from('user_learning_paths')
        .select('*')
        .eq('user_id', user.id)
        .eq('learning_path_id', id)
        .single();

      if (existing) {
        setIsEnrolled(true);
        toast.info('Vous êtes déjà inscrit à ce parcours');
        return;
      }

      // Insert new enrollment
      const { error } = await supabase
        .from('user_learning_paths')
        .insert({
          user_id: user.id,
          learning_path_id: id,
          status: 'enrolled',
          started_at: new Date().toISOString()
        });

      if (error) {
        // Check if it's a duplicate key error
        if (error.code === '23505') {
          setIsEnrolled(true);
          toast.info('Vous êtes déjà inscrit à ce parcours');
          return;
        }
        throw error;
      }

      setIsEnrolled(true);
      toast.success('Inscription réussie au parcours !');
    } catch (err: any) {
      console.error('Error enrolling:', err);
      toast.error(err.message || 'Erreur lors de l\'inscription');
    } finally {
      setEnrolling(false);
    }
  };

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  if (!path) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Parcours introuvable</h2>
          <p className="text-muted-foreground mb-6">Ce parcours n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate("/learning-paths")}>
            Retour aux parcours
          </Button>
        </div>
      </div>
    );
  }

  const completedExercises = Array.from(completedExerciseIds);
  const progressPercentage = path.exerciseIds.length > 0
    ? (completedExerciseIds.size / path.exerciseIds.length) * 100
    : 0;

  const handleStartExercise = (exerciseId: string, index: number) => {
    // Vérifier si l'exercice précédent est complété (ou si c'est le premier)
    if (index === 0 || completedExercises.includes(path.exerciseIds[index - 1])) {
      navigate(`/player/exercise/${exerciseId}?pathId=${id}`);
    }
  };

  const handleReset = () => {
    if (id) {
      // Reset progress (à implémenter dans le context)
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <Button variant="outline" onClick={() => navigate("/learning-paths")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <Badge variant="outline">Niveau {path.difficulty}</Badge>
        </div>

        {/* Path Info */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className={`w-full h-48 bg-gradient-to-br ${path.color} rounded-2xl mb-6 flex items-center justify-center text-8xl shadow-xl animate-fade-in`}>
            {path.icon}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-3">{path.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{path.description}</p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>🌐 {path.language}</span>
              <span>•</span>
              <span>⏱️ {path.estimatedTime}</span>
              <span>•</span>
              <span>📚 {path.exerciseIds.length} exercices</span>
            </div>
          </div>

          {/* Enrollment Button */}
          {!isEnrolled && (
            <div className="mb-6">
              <Button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full py-6 text-lg"
                size="lg"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {enrolling ? "Inscription en cours..." : "S'inscrire à ce parcours"}
              </Button>
            </div>
          )}

          {/* Overall Progress */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-foreground">Votre progression</h2>
              <span className="text-2xl font-bold text-primary">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">
              {completedExerciseIds.size} / {path.exerciseIds.length} exercices complétés
            </p>
            {isEnrolled && (
              <Badge variant="default" className="mt-2">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Inscrit
              </Badge>
            )}
          </div>

          {/* Path Structure */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Structure du parcours</h2>

            {path.structure && path.structure.length > 0 ? (
              // Render structured content (chapters/subchapters)
              path.structure.map((item: any) => {
                if (item.type === 'chapter') {
                  const isExpanded = expandedChapters.has(item.id);
                  return (
                    <Card key={item.id} className="overflow-hidden">
                      <CardHeader
                        className="cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => toggleChapter(item.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <Badge variant="secondary">{item.items?.length || 0} éléments</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      {isExpanded && item.items && (
                        <CardContent className="space-y-2 pl-8 pb-4">
                          {item.items.map((subItem: any, idx: number) => {
                            if (subItem.type === 'subchapter') {
                              const isSubExpanded = expandedChapters.has(subItem.id);
                              return (
                                <div key={subItem.id}>
                                  <div
                                    className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleChapter(subItem.id);
                                    }}
                                  >
                                    {isSubExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    <span className="font-medium">{subItem.title}</span>
                                    <Badge variant="outline" className="ml-auto">{subItem.items?.length || 0}</Badge>
                                  </div>
                                  {isSubExpanded && subItem.items && (
                                    <div className="pl-6 space-y-1 mt-1">
                                      {subItem.items.map((contentItem: any) => (
                                        <div key={contentItem.id} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent">
                                          {contentItem.type === 'exercise' ? (
                                            <>
                                              <Gamepad2 className="w-4 h-4 text-blue-600" />
                                              <span className="text-sm">{getExercise(contentItem.id)?.title || 'Exercice'}</span>
                                              {completedExerciseIds.has(contentItem.id) && (
                                                <CheckCircle2 className="w-4 h-4 text-green-600 ml-2" />
                                              )}
                                              <Button
                                                size="sm"
                                                variant="ghost"
                                                className="ml-auto"
                                                onClick={() => navigate(`/player/exercise/${contentItem.id}?pathId=${id}`)}
                                              >
                                                <ChevronRight className="w-4 h-4" />
                                              </Button>
                                            </>
                                          ) : (
                                            <>
                                              <BookOpen className="w-4 h-4 text-green-600" />
                                              <span className="text-sm">{getTopic(contentItem.id)?.title || 'Topic'}</span>
                                              <Button
                                                size="sm"
                                                variant="ghost"
                                                className="ml-auto"
                                                onClick={() => navigate(`/topic/${contentItem.id}`)}
                                              >
                                                <ChevronRight className="w-4 h-4" />
                                              </Button>
                                            </>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            } else if (subItem.type === 'exercise') {
                              const exercise = getExercise(subItem.id);
                              return (
                                <div key={subItem.id} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent">
                                  <Gamepad2 className="w-4 h-4 text-blue-600" />
                                  <span>{exercise?.title || 'Exercice'}</span>
                                  {completedExerciseIds.has(subItem.id) && (
                                    <CheckCircle2 className="w-4 h-4 text-green-600 ml-2" />
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="ml-auto"
                                    onClick={() => navigate(`/player/exercise/${subItem.id}?pathId=${id}`)}
                                  >
                                    <ChevronRight className="w-4 h-4" />
                                  </Button>
                                </div>
                              );
                            } else if (subItem.type === 'topic') {
                              const topic = getTopic(subItem.id);
                              return (
                                <div key={subItem.id} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-accent">
                                  <BookOpen className="w-4 h-4 text-green-600" />
                                  <span>{topic?.title || 'Topic'}</span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="ml-auto"
                                    onClick={() => navigate(`/topic/${subItem.id}`)}
                                  >
                                    <ChevronRight className="w-4 h-4" />
                                  </Button>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </CardContent>
                      )}
                    </Card>
                  );
                }
                return null;
              })
            ) : (
              // Fallback to simple exercise list
              path.exerciseIds.map((exerciseId, index) => {
                const exercise = getExercise(exerciseId);
                const isCompleted = completedExerciseIds.has(exerciseId);

                return (
                  <Card key={exerciseId} className="transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-blue-500 text-white">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{exercise?.title || `Exercice ${index + 1}`}</CardTitle>
                          <CardDescription>{exercise?.description || ""}</CardDescription>
                        </div>
                        <Button
                          onClick={() => navigate(`/player/exercise/${exerciseId}?pathId=${id}`)}
                          variant="outline"
                        >
                          {isCompleted ? "Réviser" : "Commencer"}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })
            )}
          </div>

          {/* Completion Message */}
          {progressPercentage === 100 && (
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 rounded-xl p-8 text-center animate-scale-in">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-green-900 mb-3">
                Félicitations ! 🎉
              </h2>
              <p className="text-lg text-green-700 mb-6">
                Vous avez terminé le parcours "{path.title}" !
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={handleReset}>
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Recommencer
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/learning-paths")}>
                  Voir d'autres parcours
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPathPlayer;
