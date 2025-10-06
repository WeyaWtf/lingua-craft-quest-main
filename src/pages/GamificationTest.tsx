import { useUserProgress } from '@/contexts/UserProgressContext';
import { useRewards } from '@/hooks/useRewards';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { XPProgress } from '@/components/gamification/XPProgress';
import { CoinDisplay } from '@/components/gamification/CoinDisplay';
import { StreakIndicator } from '@/components/gamification/StreakIndicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GamificationTest() {
  const { userProgress, levelProgress, loading, error, addXP, addCoins, updateStreak } = useUserProgress();
  const { recordExerciseAttempt } = useRewards();

  const handleAddXP = async () => {
    await addXP(50);
  };

  const handleAddCoins = async () => {
    await addCoins(25);
  };

  const handleUpdateStreak = async () => {
    await updateStreak(new Date());
  };

  const handleSimulateExercise = async () => {
    // Simulate completing an exercise with 85% score
    await recordExerciseAttempt(
      'test-exercise-id',
      'flashcard',
      2, // difficulty
      85, // score
      120, // 2 minutes
      [],
      'new'
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Chargement du système de gamification...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">Erreur</CardTitle>
            <CardDescription>{error.message || String(error)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Assurez-vous d'être connecté et que le schéma de la base de données est appliqué.
            </p>
            <Button onClick={() => window.location.reload()}>
              Recharger la page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userProgress) {
    return (
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Aucune progression utilisateur</CardTitle>
            <CardDescription>Vous devez être connecté pour tester le système de gamification.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Veuillez vous connecter pour accéder à cette page.
            </p>
            <Button onClick={() => window.location.href = '/signin'}>
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gamification Test Page</h1>
        <p className="text-muted-foreground">Test the gamification system components and functionality</p>
      </div>

      {/* UI Components Display */}
      <Card>
        <CardHeader>
          <CardTitle>UI Components</CardTitle>
          <CardDescription>All gamification indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Level Badge (with XP)</p>
              <LevelBadge size="lg" showXP={true} />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Coin Display</p>
              <CoinDisplay size="lg" showLabel={true} />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Streak Indicator</p>
              <StreakIndicator size="lg" showLabel={true} />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Level Badge (compact)</p>
              <LevelBadge size="md" showXP={false} />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">XP Progress Bar</p>
            <XPProgress showLabel={true} />
          </div>
        </CardContent>
      </Card>

      {/* User Progress Data */}
      <Card>
        <CardHeader>
          <CardTitle>User Progress Data</CardTitle>
          <CardDescription>Raw data from UserProgressContext</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium">Total XP</p>
              <p className="text-2xl font-bold text-blue-600">{userProgress.total_xp}</p>
            </div>
            <div>
              <p className="font-medium">Level</p>
              <p className="text-2xl font-bold text-purple-600">{userProgress.level}</p>
            </div>
            <div>
              <p className="font-medium">Coins</p>
              <p className="text-2xl font-bold text-yellow-600">{userProgress.coins}</p>
            </div>
            <div>
              <p className="font-medium">Current Streak</p>
              <p className="text-2xl font-bold text-orange-600">{userProgress.current_streak}</p>
            </div>
            <div>
              <p className="font-medium">Longest Streak</p>
              <p className="text-2xl font-bold text-red-600">{userProgress.longest_streak}</p>
            </div>
            <div>
              <p className="font-medium">Last Activity</p>
              <p className="text-sm text-muted-foreground">
                {userProgress.last_activity_date || 'Never'}
              </p>
            </div>
          </div>

          {levelProgress && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">Level Progress Details</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>XP in current level: {levelProgress.xp_in_current_level}</p>
                <p>XP needed for next level: {levelProgress.xp_needed_for_level}</p>
                <p>Progress: {levelProgress.progress_percentage.toFixed(1)}%</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Test Actions</CardTitle>
          <CardDescription>Manually trigger gamification events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleAddXP} variant="default">
              Add 50 XP
            </Button>
            <Button onClick={handleAddCoins} variant="secondary">
              Add 25 Coins
            </Button>
            <Button onClick={handleUpdateStreak} variant="outline">
              Update Streak (Today)
            </Button>
            <Button onClick={handleSimulateExercise} variant="default" className="bg-green-600 hover:bg-green-700">
              Simulate Exercise Completion
            </Button>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-sm font-medium mb-1">Tips:</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Add XP multiple times to see level progression</li>
              <li>Level automatically updates when XP threshold is reached</li>
              <li>Simulate Exercise awards XP + Coins based on score and difficulty</li>
              <li>Streak updates once per day (check last_activity_date)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
