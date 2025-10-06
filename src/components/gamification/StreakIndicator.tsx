import { useUserProgress } from '@/contexts/UserProgressContext';
import { Flame, Loader2 } from 'lucide-react';

interface StreakIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function StreakIndicator({
  size = 'md',
  showLabel = true,
  className = ''
}: StreakIndicatorProps) {
  const { userProgress, loading } = useUserProgress();

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!userProgress) {
    return null;
  }

  const { current_streak, longest_streak } = userProgress;

  // Ne pas afficher si pas de streak
  if (current_streak === 0) {
    return null;
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const iconSize = iconSizes[size];
  const textSize = textSizes[size];

  // Couleur selon streak
  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'from-purple-500 to-purple-600 border-purple-300';
    if (streak >= 14) return 'from-orange-500 to-red-500 border-orange-300';
    if (streak >= 7) return 'from-orange-400 to-orange-500 border-orange-300';
    return 'from-red-400 to-orange-400 border-red-300';
  };

  const colorClass = getStreakColor(current_streak);

  // Milestone atteint ?
  const milestones = [7, 14, 30, 60, 90, 180, 365];
  const isMilestone = milestones.includes(current_streak);

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      title={`Série actuelle: ${current_streak} jours\nRecord: ${longest_streak} jours`}
    >
      <div className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br ${colorClass} rounded-full shadow-md border ${isMilestone ? 'animate-pulse' : ''}`}>
        <Flame className={`${iconSize} text-white ${isMilestone ? 'animate-bounce' : ''}`} />
        <span className={`${textSize} font-bold text-white`}>
          {current_streak}
        </span>
      </div>

      {showLabel && size !== 'sm' && (
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-foreground">
            {current_streak} jour{current_streak > 1 ? 's' : ''}
          </span>
          {longest_streak > current_streak && (
            <span className="text-xs text-muted-foreground">
              Record: {longest_streak}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default StreakIndicator;
