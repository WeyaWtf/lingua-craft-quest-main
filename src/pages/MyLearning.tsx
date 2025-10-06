import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useLearningPaths } from '@/contexts/LearningPathContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  BookOpen,
  Calendar,
  Target
} from 'lucide-react';
import { toast } from 'sonner';

interface EnrolledPath {
  id: string;
  learning_path_id: string;
  status: string;
  enrolled_at: string;
  completion_percentage: number;
  total_xp_earned: number;
  total_coins_earned: number;
  last_activity: string;
}

export default function MyLearning() {
  const navigate = useNavigate();
  const { getLearningPath } = useLearningPaths();
  const [enrolledPaths, setEnrolledPaths] = useState<EnrolledPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalXP: 0,
    totalCoins: 0,
    activePaths: 0,
    completedPaths: 0,
  });

  useEffect(() => {
    loadEnrolledPaths();
  }, []);

  const loadEnrolledPaths = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signin');
        return;
      }

      const { data: paths, error } = await supabase
        .from('user_learning_paths')
        .select('*')
        .eq('user_id', user.id)
        .order('last_activity', { ascending: false });

      if (error) throw error;

      setEnrolledPaths(paths || []);

      // Calculate stats
      const totalXP = paths?.reduce((sum, p) => sum + (p.total_xp_earned || 0), 0) || 0;
      const totalCoins = paths?.reduce((sum, p) => sum + (p.total_coins_earned || 0), 0) || 0;
      const activePaths = paths?.filter(p => p.status === 'in_progress' || p.status === 'enrolled').length || 0;
      const completedPaths = paths?.filter(p => p.status === 'completed').length || 0;

      setStats({ totalXP, totalCoins, activePaths, completedPaths });

    } catch (err) {
      console.error('Error loading enrolled paths:', err);
      toast.error('Erreur de chargement des parcours');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'enrolled':
        return <Badge variant="outline">Inscrit</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-600">En cours</Badge>;
      case 'completed':
        return <Badge className="bg-green-600">Terminé</Badge>;
      case 'paused':
        return <Badge variant="secondary">En pause</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Jamais';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
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
              <p className="text-muted-foreground">Chargement de votre apprentissage...</p>
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
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <GraduationCap className="w-8 h-8" />
            Mon apprentissage
          </h1>
          <p className="text-muted-foreground">
            Suivez votre progression et continuez votre parcours d'apprentissage
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>XP Total Gagné</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{stats.totalXP}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pièces Gagnées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span className="text-2xl font-bold text-yellow-600">{stats.totalCoins}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Parcours Actifs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">{stats.activePaths}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Parcours Terminés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{stats.completedPaths}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Paths */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Mes parcours</h2>
            <Button onClick={() => navigate('/learning-paths')} variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Parcourir les parcours
            </Button>
          </div>

          {enrolledPaths.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enrolledPaths.map((enrolled) => {
                const path = getLearningPath(enrolled.learning_path_id);
                if (!path) return null;

                return (
                  <Card
                    key={enrolled.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/learning-path/${enrolled.learning_path_id}`)}
                  >
                    <CardHeader>
                      <div className={`w-full h-32 bg-gradient-to-br ${path.color} rounded-lg mb-4 flex items-center justify-center text-5xl`}>
                        {path.icon}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{path.title}</CardTitle>
                          {getStatusBadge(enrolled.status)}
                        </div>
                        <CardDescription className="line-clamp-2">
                          {path.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-medium">{Math.round(enrolled.completion_percentage)}%</span>
                        </div>
                        <Progress value={enrolled.completion_percentage} />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span>{enrolled.total_xp_earned} XP</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-600" />
                          <span>{enrolled.total_coins_earned} 🪙</span>
                        </div>
                      </div>

                      {/* Last Activity */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Dernière activité: {formatDate(enrolled.last_activity || enrolled.enrolled_at)}</span>
                      </div>

                      {/* Action Button */}
                      <Button className="w-full" variant={enrolled.status === 'completed' ? 'outline' : 'default'}>
                        {enrolled.status === 'completed' ? 'Revoir' : 'Continuer'}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Aucun parcours inscrit</h3>
                <p className="text-muted-foreground mb-6">
                  Commencez votre apprentissage en vous inscrivant à un parcours
                </p>
                <Button onClick={() => navigate('/learning-paths')}>
                  Explorer les parcours
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>Continuez votre progression</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={() => navigate('/assignments')} variant="default">
              <Calendar className="w-4 h-4 mr-2" />
              Mes devoirs du jour
            </Button>
            <Button onClick={() => navigate('/test-gamification')} variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Voir mes stats
            </Button>
            <Button onClick={() => navigate('/learning-paths')} variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Découvrir de nouveaux parcours
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
