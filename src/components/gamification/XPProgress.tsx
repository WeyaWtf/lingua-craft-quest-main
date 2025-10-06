import { useUserProgress } from '@/contexts/UserProgressContext';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';
import { formatNumber } from '@/utils/gamification';

interface XPProgressProps {
  showLabel?: boolean;
  className?: string;
}

export function XPProgress({ showLabel = true, className = '' }: XPProgressProps) {
  const { userProgress, levelProgress, loading } = useUserProgress();

  if (loading || !userProgress || !levelProgress) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
            <Zap className="w-4 h-4" />
            <span className="font-semibold">XP</span>
          </div>
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">
              {formatNumber(levelProgress.xp_in_current_level)}
            </span>
            {' / '}
            {formatNumber(levelProgress.xp_needed_for_level)}
          </span>
        </div>
      )}

      <Progress
        value={levelProgress.progress_percentage}
        className="h-2 bg-blue-100 dark:bg-blue-950"
      />

      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Niveau {userProgress.level}</span>
          <span>Niveau {userProgress.level + 1}</span>
        </div>
      )}
    </div>
  );
}

export default XPProgress;
