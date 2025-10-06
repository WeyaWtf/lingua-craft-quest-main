import { useUserProgress } from '@/contexts/UserProgressContext';
import { Loader2 } from 'lucide-react';
import { formatNumber } from '@/utils/gamification';

interface LevelBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showXP?: boolean;
  className?: string;
}

export function LevelBadge({ size = 'md', showXP = false, className = '' }: LevelBadgeProps) {
  const { userProgress, levelProgress, loading } = useUserProgress();

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!userProgress || !levelProgress) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const badgeSize = sizeClasses[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Badge de niveau */}
      <div
        className={`${badgeSize} rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg border-2 border-blue-300 hover:scale-105 transition-transform cursor-pointer`}
        title={`Niveau ${userProgress.level} - ${formatNumber(userProgress.total_xp)} XP`}
      >
        {userProgress.level}
      </div>

      {/* Affichage XP optionnel */}
      {showXP && (
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-foreground">
            Niveau {userProgress.level}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatNumber(levelProgress.xp_in_current_level)} / {formatNumber(levelProgress.xp_needed_for_level)} XP
          </span>
        </div>
      )}
    </div>
  );
}

export default LevelBadge;
