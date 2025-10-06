import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserProgress } from '@/contexts/UserProgressContext';
import {
  calculateExerciseRewards,
  calculateTopicReadXP,
  calculateChapterRewards,
  calculatePathRewards
} from '@/utils/gamification';
import type {
  ExerciseAttempt,
  ExerciseContext,
  RewardCalculation
} from '@/types/gamification';
import { toast } from 'sonner';

export function useRewards() {
  const { userProgress, addXP, addCoins, updateStreak } = useUserProgress();

  /**
   * Enregistrer une tentative d'exercice et attribuer les récompenses
   */
  const recordExerciseAttempt = useCallback(
    async (
      exerciseId: string,
      exerciseType: string,
      difficulty: number,
      score: number,
      timeSpentSeconds: number,
      errors: any[] = [],
      context: ExerciseContext = 'new',
      learningPathId?: string
    ): Promise<{ xp: number; coins: number; levelUp: boolean }> => {
      if (!userProgress) {
        throw new Error('User progress not loaded');
      }

      try {
        // Calculer récompenses
        const rewards = calculateExerciseRewards(
          exerciseType,
          difficulty,
          score,
          context,
          userProgress.current_streak
        );

        // Enregistrer la tentative en DB
        const attempt: Omit<ExerciseAttempt, 'id' | 'completed_at'> = {
          user_id: userProgress.user_id,
          exercise_id: exerciseId,
          learning_path_id: learningPathId,
          score,
          time_spent_seconds: timeSpentSeconds,
          errors,
          is_review: context === 'review' || context === 'overdue',
          review_iteration: context === 'review' ? 1 : 0,
          xp_earned: rewards.xp,
          coins_earned: rewards.coins
        };

        const { error: attemptError } = await supabase
          .from('exercise_attempts')
          .insert(attempt);

        if (attemptError) throw attemptError;

        // Ajouter XP et coins
        const previousLevel = userProgress.level;
        await addXP(rewards.xp);
        await addCoins(rewards.coins);

        // Mettre à jour streak
        await updateStreak();

        // Vérifier level up
        const levelUp = userProgress.level > previousLevel;

        // Toast de récompense
        if (levelUp) {
          toast.success(`🎉 Level Up! Niveau ${userProgress.level}`, {
            description: `+${rewards.xp} XP, +${rewards.coins} 🪙`
          });
        } else {
          toast.success(`+${rewards.xp} XP, +${rewards.coins} 🪙`);
        }

        return {
          xp: rewards.xp,
          coins: rewards.coins,
          levelUp
        };
      } catch (error) {
        console.error('Error recording exercise attempt:', error);
        throw error;
      }
    },
    [userProgress, addXP, addCoins, updateStreak]
  );

  /**
   * Enregistrer la lecture d'un topic
   */
  const recordTopicRead = useCallback(
    async (
      topicId: string,
      wordCount: number,
      difficulty: number = 1
    ): Promise<{ xp: number }> => {
      if (!userProgress) {
        throw new Error('User progress not loaded');
      }

      try {
        const xp = calculateTopicReadXP(wordCount, difficulty);

        await addXP(xp);

        toast.success(`📚 Topic lu ! +${xp} XP`);

        return { xp };
      } catch (error) {
        console.error('Error recording topic read:', error);
        throw error;
      }
    },
    [userProgress, addXP]
  );

  /**
   * Récompenser la complétion d'un chapitre
   */
  const rewardChapterCompletion = useCallback(
    async (
      chapterId: string,
      exerciseCount: number,
      topicCount: number = 0
    ): Promise<RewardCalculation> => {
      if (!userProgress) {
        throw new Error('User progress not loaded');
      }

      try {
        const rewards = calculateChapterRewards(exerciseCount, topicCount);

        await addXP(rewards.xp);
        await addCoins(rewards.coins);

        toast.success(`🏆 Chapitre Terminé !`, {
          description: `+${rewards.xp} XP, +${rewards.coins} 🪙`
        });

        return rewards;
      } catch (error) {
        console.error('Error rewarding chapter completion:', error);
        throw error;
      }
    },
    [userProgress, addXP, addCoins]
  );

  /**
   * Récompenser la complétion d'un learning path
   */
  const rewardPathCompletion = useCallback(
    async (
      pathId: string,
      chapterCount: number,
      totalExercises: number
    ): Promise<RewardCalculation> => {
      if (!userProgress) {
        throw new Error('User progress not loaded');
      }

      try {
        const rewards = calculatePathRewards(chapterCount, totalExercises);

        await addXP(rewards.xp);
        await addCoins(rewards.coins);

        toast.success(`🎉 Learning Path Complété !`, {
          description: `+${rewards.xp} XP, +${rewards.coins} 🪙`,
          duration: 5000
        });

        // TODO: Débloquer badge si spécifié dans rewards.badges

        return rewards;
      } catch (error) {
        console.error('Error rewarding path completion:', error);
        throw error;
      }
    },
    [userProgress, addXP, addCoins]
  );

  return {
    recordExerciseAttempt,
    recordTopicRead,
    rewardChapterCompletion,
    rewardPathCompletion
  };
}

export default useRewards;
