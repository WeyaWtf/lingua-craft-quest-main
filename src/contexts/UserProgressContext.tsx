import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type {
  UserProgress,
  LevelProgress,
  UserProgressContextType,
  StreakUpdate
} from '@/types/gamification';
import {
  calculateLevel,
  getLevelProgress,
  updateStreak as calculateStreakUpdate
} from '@/utils/gamification';

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export function UserProgressProvider({ children }: { children: ReactNode }) {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [levelProgress, setLevelProgress] = useState<LevelProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Charger la progression de l'utilisateur
  const loadUserProgress = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setUserProgress(null);
        setLevelProgress(null);
        setLoading(false);
        return;
      }

      // Récupérer ou créer user_progress
      let { data: progress, error: fetchError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code === 'PGRST116') {
        // Pas de progression trouvée, créer un nouveau profil
        const { data: newProgress, error: createError } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            total_xp: 0,
            level: 1,
            coins: 0,
            current_streak: 0,
            longest_streak: 0,
            last_activity_date: null
          })
          .select()
          .single();

        if (createError) throw createError;
        progress = newProgress;
      } else if (fetchError) {
        throw fetchError;
      }

      setUserProgress(progress as UserProgress);

      if (progress) {
        const levelInfo = getLevelProgress(progress.total_xp);
        setLevelProgress(levelInfo);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error loading user progress:', err);
      setError(err as Error);
      setLoading(false);
    }
  };

  // Ajouter de l'XP
  const addXP = async (amount: number) => {
    if (!userProgress) return;

    try {
      const newTotalXP = userProgress.total_xp + amount;
      const newLevel = calculateLevel(newTotalXP);

      const { data, error } = await supabase
        .from('user_progress')
        .update({
          total_xp: newTotalXP,
          level: newLevel
        })
        .eq('user_id', userProgress.user_id)
        .select()
        .single();

      if (error) throw error;

      setUserProgress(data as UserProgress);
      setLevelProgress(getLevelProgress(newTotalXP));

      // Si level up, on pourrait déclencher un événement
      if (newLevel > userProgress.level) {
        // TODO: Trigger level up celebration
        console.log('🎉 LEVEL UP!', newLevel);
      }
    } catch (err) {
      console.error('Error adding XP:', err);
      throw err;
    }
  };

  // Ajouter des pièces
  const addCoins = async (amount: number) => {
    if (!userProgress) return;

    try {
      const newCoins = userProgress.coins + amount;

      const { data, error } = await supabase
        .from('user_progress')
        .update({ coins: newCoins })
        .eq('user_id', userProgress.user_id)
        .select()
        .single();

      if (error) throw error;
      setUserProgress(data as UserProgress);
    } catch (err) {
      console.error('Error adding coins:', err);
      throw err;
    }
  };

  // Dépenser des pièces
  const spendCoins = async (amount: number): Promise<boolean> => {
    if (!userProgress) return false;
    if (userProgress.coins < amount) return false;

    try {
      const newCoins = userProgress.coins - amount;

      const { data, error } = await supabase
        .from('user_progress')
        .update({ coins: newCoins })
        .eq('user_id', userProgress.user_id)
        .select()
        .single();

      if (error) throw error;
      setUserProgress(data as UserProgress);
      return true;
    } catch (err) {
      console.error('Error spending coins:', err);
      return false;
    }
  };

  // Mettre à jour la série
  const updateStreak = async (date: Date = new Date()): Promise<StreakUpdate> => {
    if (!userProgress) {
      throw new Error('No user progress loaded');
    }

    try {
      const lastActivityDate = userProgress.last_activity_date
        ? new Date(userProgress.last_activity_date)
        : null;

      // Calculer nouvelle série
      const streakUpdate = calculateStreakUpdate(
        lastActivityDate,
        userProgress.current_streak,
        userProgress.longest_streak,
        date,
        false // TODO: Vérifier si l'utilisateur a un streak freeze actif
      );

      // Mettre à jour en base
      const { data, error } = await supabase
        .from('user_progress')
        .update({
          current_streak: streakUpdate.current_streak,
          longest_streak: streakUpdate.longest_streak,
          last_activity_date: date.toISOString().split('T')[0]
        })
        .eq('user_id', userProgress.user_id)
        .select()
        .single();

      if (error) throw error;
      setUserProgress(data as UserProgress);

      return streakUpdate;
    } catch (err) {
      console.error('Error updating streak:', err);
      throw err;
    }
  };

  // Rafraîchir les données
  const refreshProgress = async () => {
    await loadUserProgress();
  };

  // Charger au montage et quand l'utilisateur change
  useEffect(() => {
    loadUserProgress();

    // Écouter les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUserProgress();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value: UserProgressContextType = {
    userProgress,
    levelProgress,
    loading,
    error,
    addXP,
    addCoins,
    spendCoins,
    updateStreak,
    refreshProgress
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
}

export default UserProgressContext;
