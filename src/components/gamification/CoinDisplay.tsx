import { useUserProgress } from '@/contexts/UserProgressContext';
import { Coins, Loader2 } from 'lucide-react';
import { formatNumber } from '@/utils/gamification';

interface CoinDisplayProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  onClick?: () => void;
}

export function CoinDisplay({
  size = 'md',
  showLabel = true,
  className = '',
  onClick
}: CoinDisplayProps) {
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

  return (
    <div
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={onClick}
      title={`${userProgress.coins} pièces`}
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-md border border-yellow-300 dark:border-yellow-600">
        <Coins className={`${iconSize} text-yellow-900 dark:text-yellow-100`} />
        <span className={`${textSize} font-bold text-yellow-900 dark:text-yellow-100`}>
          {formatNumber(userProgress.coins)}
        </span>
      </div>

      {showLabel && size !== 'sm' && (
        <span className="text-xs text-muted-foreground hidden sm:inline">
          pièces
        </span>
      )}
    </div>
  );
}

export default CoinDisplay;
