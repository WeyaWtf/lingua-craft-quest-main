import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Zap, Coins, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';

interface DailyAssignment {
  id: string;
  assignment_date: string;
  new_exercises: any[];
  review_exercises: any[];
  completed: boolean;
  completion_rate: number;
  total_xp_available: number;
  xp_earned: number;
  total_coins_available: number;
  coins_earned: number;
}

export default function Assignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<DailyAssignment[]>([]);
  const [todayAssignment, setTodayAssignment] = useState<DailyAssignment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signin');
        return;
      }

      const { data, error } = await supabase
        .from('daily_assignments')
        .select('*')
        .eq('user_id', user.id)
        .order('assignment_date', { ascending: false })
        .limit(30);

      if (error) throw error;

      setAssignments(data || []);

      // Find today's assignment
      const today = new Date().toISOString().split('T')[0];
      let todayData = data?.find(a => a.assignment_date === today);

      // If no assignment exists for today, create empty one
      if (!todayData && data) {
        // Check if user has enrolled paths
        const { data: enrolledPaths } = await supabase
          .from('user_learning_paths')
          .select('learning_path_id')
          .eq('user_id', user.id)
          .in('status', ['enrolled', 'in_progress'])
          .limit(1);

        if (enrolledPaths && enrolledPaths.length > 0) {
          // Create today's assignment placeholder
          const { data: newAssignment } = await supabase
            .from('daily_assignments')
            .insert({
              user_id: user.id,
              assignment_date: today,
              new_exercises: [],
              review_exercises: [],
              total_xp_available: 0,
              total_coins_available: 0
            })
            .select()
            .single();

          todayData = newAssignment || null;
        }
      }

      setTodayAssignment(todayData || null);

    } catch (err) {
      console.error('Error loading assignments:', err);
      toast.error('Erreur de chargement des devoirs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === today.toISOString().split('T')[0]) return "Aujourd'hui";
    if (dateStr === yesterday.toISOString().split('T')[0]) return "Hier";

    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="container mx-auto p-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Chargement de vos devoirs...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Mes devoirs quotidiens</h1>
          <p className="text-muted-foreground">
            Complétez vos devoirs quotidiens pour maintenir votre série et progresser rapidement
          </p>
        </div>

        {/* Today's Assignment */}
        {todayAssignment ? (
          <Card className="border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Devoir d'aujourd'hui
                  </CardTitle>
                  <CardDescription>
                    {todayAssignment.completed ? 'Terminé !' : `${todayAssignment.new_exercises.length + todayAssignment.review_exercises.length} exercices à compléter`}
                  </CardDescription>
                </div>
                {todayAssignment.completed && (
                  <Badge variant="default" className="bg-green-600">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Complété
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progression</span>
                  <span>{Math.round(todayAssignment.completion_rate)}%</span>
                </div>
                <Progress value={todayAssignment.completion_rate} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>{todayAssignment.xp_earned} / {todayAssignment.total_xp_available} XP</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Coins className="w-4 h-4 text-yellow-600" />
                  <span>{todayAssignment.coins_earned} / {todayAssignment.total_coins_available} pièces</span>
                </div>
              </div>

              {!todayAssignment.completed && (
                <div className="space-y-3 pt-4">
                  {todayAssignment.new_exercises.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Nouveaux exercices ({todayAssignment.new_exercises.length})</h4>
                      {todayAssignment.new_exercises.slice(0, 3).map((ex: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Circle className="w-4 h-4" />
                            <span className="text-sm">{ex.title || `Exercice ${idx + 1}`}</span>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => navigate(`/player/exercise/${ex.id}`)}>
                            <PlayCircle className="w-4 h-4 mr-1" />
                            Commencer
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {todayAssignment.review_exercises.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Révisions ({todayAssignment.review_exercises.length})</h4>
                      {todayAssignment.review_exercises.slice(0, 3).map((ex: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{ex.title || `Révision ${idx + 1}`}</span>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => navigate(`/player/exercise/${ex.id}`)}>
                            <PlayCircle className="w-4 h-4 mr-1" />
                            Réviser
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                Aucun devoir pour aujourd'hui. Commencez un parcours d'apprentissage pour recevoir des devoirs quotidiens !
              </p>
              <Button className="mt-4" onClick={() => navigate('/learning-paths')}>
                Parcourir les parcours
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Assignment History */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Historique</h2>
          {assignments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center justify-between">
                      <span>{formatDate(assignment.assignment_date)}</span>
                      {assignment.completed && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Progress value={assignment.completion_rate} />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{assignment.new_exercises.length + assignment.review_exercises.length} exercices</span>
                      <span>{Math.round(assignment.completion_rate)}%</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span>{assignment.xp_earned} XP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-yellow-600" />
                        <span>{assignment.coins_earned}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Aucun historique de devoirs
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
