// ============================================================================
// UTILITAIRES - CALCULS DE GAMIFICATION
// Version: 1.0
// Date: 2025-01-05
// ============================================================================

import type {
  ExerciseAttempt,
  ExerciseContext,
  ExerciseReward,
  LevelProgress,
  ReviewSchedule,
  StreakUpdate,
  SpacedRepetitionConfig,
  MasteryLevel,
  RewardCalculation
} from '@/types/gamification';

// ============================================================================
// CALCULS DE NIVEAU ET XP
// ============================================================================

/**
 * Calculer le niveau basé sur XP total
 * Formule : level = floor((xp / 100) ^ (1/1.5)) + 1
 *
 * @param totalXP - XP total accumulé
 * @returns Niveau actuel
 */
export function calculateLevel(totalXP: number): number {
  if (totalXP < 0) return 1;
  return Math.floor(Math.pow(totalXP / 100, 1 / 1.5)) + 1;
}

/**
 * Calculer l'XP requis pour atteindre un niveau spécifique
 * Formule : xp = 100 * (level ^ 1.5)
 *
 * @param level - Niveau cible
 * @returns XP total requis pour ce niveau
 */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.round(100 * Math.pow(level, 1.5));
}

/**
 * Calculer l'XP requis pour le prochain niveau
 *
 * @param currentLevel - Niveau actuel
 * @returns XP requis pour niveau suivant
 */
export function xpForNextLevel(currentLevel: number): number {
  return xpForLevel(currentLevel + 1);
}

/**
 * Calculer la progression détaillée du niveau
 *
 * @param totalXP - XP total accumulé
 * @returns Informations complètes sur la progression
 */
export function getLevelProgress(totalXP: number): LevelProgress {
  const currentLevel = calculateLevel(totalXP);
  const xpCurrentLevel = xpForLevel(currentLevel);
  const xpNextLevel = xpForNextLevel(currentLevel);

  const xpInCurrentLevel = totalXP - xpCurrentLevel;
  const xpNeededForLevel = xpNextLevel - xpCurrentLevel;

  return {
    current_level: currentLevel,
    xp_current_level: xpCurrentLevel,
    xp_next_level: xpNextLevel,
    xp_in_current_level: xpInCurrentLevel,
    xp_needed_for_level: xpNeededForLevel,
    progress_percentage: (xpInCurrentLevel / xpNeededForLevel) * 100
  };
}

// ============================================================================
// CALCULS DE RÉCOMPENSES
// ============================================================================

/**
 * XP de base par type d'exercice
 */
const BASE_XP_BY_TYPE: Record<string, number> = {
  flashcard: 10,
  association: 15,
  translation: 20,
  alphabet: 5,
  default: 10
};

/**
 * Pièces de base par type d'exercice
 */
const BASE_COINS_BY_TYPE: Record<string, number> = {
  flashcard: 5,
  association: 7,
  translation: 10,
  alphabet: 3,
  default: 5
};

/**
 * Calculer les récompenses pour un exercice complété
 *
 * @param exerciseType - Type d'exercice
 * @param difficulty - Difficulté (1-5)
 * @param score - Score obtenu (0-100)
 * @param context - Contexte (nouveau, révision, retard)
 * @param currentStreak - Série actuelle de jours
 * @returns XP et pièces gagnées
 */
export function calculateExerciseRewards(
  exerciseType: string,
  difficulty: number,
  score: number,
  context: ExerciseContext = 'new',
  currentStreak: number = 0
): ExerciseReward {
  // Base
  const baseXP = BASE_XP_BY_TYPE[exerciseType] || BASE_XP_BY_TYPE.default;
  const baseCoins = BASE_COINS_BY_TYPE[exerciseType] || BASE_COINS_BY_TYPE.default;

  // Multiplicateurs
  const difficultyMultiplier = Math.max(1, difficulty);
  const performanceMultiplier = score / 100;

  const contextMultiplier = {
    new: 1.0,
    review: 0.5,    // Moins d'XP pour révisions
    overdue: 1.5    // Bonus pour rattraper retard
  }[context];

  const streakMultiplier = currentStreak >= 7 ? 1.2 : 1.0;

  // Calculs
  const xp = Math.round(
    baseXP *
    difficultyMultiplier *
    performanceMultiplier *
    contextMultiplier *
    streakMultiplier
  );

  // Bonus pour score parfait
  const perfectBonus = score === 100 ? 1.5 : 1.0;
  const coins = Math.round(
    baseCoins *
    difficultyMultiplier *
    perfectBonus
  );

  return {
    context,
    xp,
    coins,
    multipliers: {
      difficulty: difficultyMultiplier,
      performance: performanceMultiplier,
      context: contextMultiplier,
      streak: streakMultiplier
    }
  };
}

/**
 * Calculer XP pour lecture d'un topic
 *
 * @param wordCount - Nombre de mots dans le topic
 * @param difficulty - Difficulté (1-5)
 * @returns XP gagné
 */
export function calculateTopicReadXP(wordCount: number, difficulty: number = 1): number {
  // 1 XP par 50 mots, max 50 XP de base
  const baseXP = Math.min(50, Math.round(wordCount / 50));
  return baseXP * difficulty;
}

/**
 * Calculer récompenses pour complétion de chapitre
 *
 * @param exerciseCount - Nombre d'exercices dans le chapitre
 * @param topicCount - Nombre de topics dans le chapitre
 * @returns Récompenses (XP et pièces)
 */
export function calculateChapterRewards(
  exerciseCount: number,
  topicCount: number = 0
): RewardCalculation {
  const baseCoins = 50;
  const exerciseBonus = exerciseCount * 5;
  const topicBonus = topicCount * 10;

  const coins = baseCoins + exerciseBonus + topicBonus;
  const xp = coins * 2; // 2 XP par pièce

  return { xp, coins };
}

/**
 * Calculer récompenses pour complétion de learning path
 *
 * @param chapterCount - Nombre de chapitres
 * @param totalExercises - Total d'exercices
 * @returns Récompenses complètes
 */
export function calculatePathRewards(
  chapterCount: number,
  totalExercises: number
): RewardCalculation {
  const xp = totalExercises * 50;
  const coins = chapterCount * 200;

  return {
    xp,
    coins,
    badges: [`path_completed_${Date.now()}`] // Badge unique
  };
}

// ============================================================================
// GESTION DES SÉRIES (STREAKS)
// ============================================================================

/**
 * Calculer la différence en jours entre deux dates
 */
function daysBetween(date1: Date, date2: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / msPerDay);
}

/**
 * Mettre à jour la série de jours consécutifs
 *
 * @param lastActivityDate - Date de dernière activité
 * @param currentStreak - Série actuelle
 * @param longestStreak - Série la plus longue
 * @param activityDate - Date de l'activité actuelle
 * @param hasStreakFreeze - Utilisateur a-t-il un freeze disponible ?
 * @returns Mise à jour de la série
 */
export function updateStreak(
  lastActivityDate: Date | null,
  currentStreak: number,
  longestStreak: number,
  activityDate: Date = new Date(),
  hasStreakFreeze: boolean = false
): StreakUpdate {
  if (!lastActivityDate) {
    // Première activité
    return {
      current_streak: 1,
      longest_streak: Math.max(1, longestStreak),
      freeze_used: false,
      milestone_reached: false
    };
  }

  const daysSinceLastActivity = daysBetween(lastActivityDate, activityDate);

  let newStreak = currentStreak;
  let freezeUsed = false;
  let milestoneReached = false;

  if (daysSinceLastActivity === 0) {
    // Même jour - pas de changement
    return {
      current_streak: newStreak,
      longest_streak: longestStreak,
      freeze_used: false,
      milestone_reached: false
    };
  } else if (daysSinceLastActivity === 1) {
    // Jour consécutif - incrémenter
    newStreak += 1;
  } else if (daysSinceLastActivity === 2 && hasStreakFreeze) {
    // 1 jour manqué mais freeze disponible
    newStreak += 1;
    freezeUsed = true;
  } else {
    // Série cassée
    newStreak = 1;
  }

  // Vérifier les jalons
  const milestones = [7, 14, 30, 60, 90, 180, 365];
  if (newStreak > currentStreak && milestones.includes(newStreak)) {
    milestoneReached = true;
  }

  const newLongestStreak = Math.max(longestStreak, newStreak);

  return {
    current_streak: newStreak,
    longest_streak: newLongestStreak,
    freeze_used: freezeUsed,
    milestone_reached: milestoneReached
  };
}

// ============================================================================
// ALGORITHME DE RÉPÉTITION ESPACÉE
// ============================================================================

/**
 * Ajouter des jours à une date
 */
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Calculer la prochaine date de révision
 *
 * @param attempt - Tentative d'exercice
 * @param currentSchedule - Planning actuel
 * @param config - Configuration SR
 * @returns Nouveau planning de révision
 */
export function calculateNextReview(
  attempt: ExerciseAttempt,
  currentSchedule: ReviewSchedule,
  config: SpacedRepetitionConfig
): ReviewSchedule {
  const performance = attempt.score / 100;
  const selfRating = currentSchedule.difficulty_rating || 3;

  // 1. Déterminer l'ajustement basé sur la performance
  let intervalAdjustment: 'easy' | 'medium' | 'hard' = 'medium';

  if (performance >= 0.9 && selfRating <= 2) {
    intervalAdjustment = 'easy';
  } else if (performance < 0.7 || selfRating >= 4) {
    intervalAdjustment = 'hard';
  }

  // 2. Calculer le prochain intervalle
  const currentInterval = currentSchedule.interval_days;
  const currentIndex = config.interval_multipliers.indexOf(currentInterval);

  let nextInterval: number;

  if (currentIndex === -1 || currentIndex >= config.interval_multipliers.length - 1) {
    // Fin de séquence
    nextInterval = Math.min(
      currentInterval * 1.5,
      config.max_interval_days
    );
  } else {
    nextInterval = config.interval_multipliers[currentIndex + 1];
  }

  // Appliquer ajustement
  const multiplier = {
    easy: config.easy_multiplier,
    medium: config.medium_multiplier,
    hard: config.hard_multiplier
  }[intervalAdjustment];

  nextInterval = Math.round(nextInterval * multiplier);
  nextInterval = Math.min(Math.max(1, nextInterval), config.max_interval_days);

  // 3. Déterminer le niveau de maîtrise
  let masteryLevel: MasteryLevel = currentSchedule.mastery_level;

  if (performance >= config.mastery_threshold / 100 &&
      currentSchedule.repetitions + 1 >= config.min_reviews_before_mastery) {
    masteryLevel = 'mastered';
  } else if (performance >= config.review_threshold / 100) {
    masteryLevel = 'reviewing';
  } else {
    masteryLevel = 'learning';
  }

  // 4. Retourner le nouveau planning
  return {
    ...currentSchedule,
    last_review_date: new Date().toISOString(),
    next_review_date: addDays(new Date(), nextInterval).toISOString(),
    interval_days: nextInterval,
    repetitions: currentSchedule.repetitions + 1,
    mastery_level: masteryLevel,
    updated_at: new Date().toISOString()
  };
}

/**
 * Déterminer si un exercice est en retard de révision
 *
 * @param nextReviewDate - Date prévue de révision
 * @param today - Date du jour (par défaut maintenant)
 * @returns true si en retard
 */
export function isOverdue(nextReviewDate: string, today: Date = new Date()): boolean {
  const reviewDate = new Date(nextReviewDate);
  return reviewDate < today;
}

/**
 * Calculer le nombre de jours de retard
 *
 * @param nextReviewDate - Date prévue
 * @param today - Date du jour
 * @returns Nombre de jours de retard (0 si pas en retard)
 */
export function daysOverdue(nextReviewDate: string, today: Date = new Date()): number {
  if (!isOverdue(nextReviewDate, today)) return 0;

  const reviewDate = new Date(nextReviewDate);
  return daysBetween(reviewDate, today);
}

// ============================================================================
// UTILITAIRES DIVERS
// ============================================================================

/**
 * Formater les grandes nombres (ex: 1000 -> 1k, 1000000 -> 1M)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

/**
 * Formater un pourcentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return value.toFixed(decimals) + '%';
}

/**
 * Obtenir la couleur selon le score
 */
export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600';
  if (score >= 70) return 'text-yellow-600';
  if (score >= 50) return 'text-orange-600';
  return 'text-red-600';
}

/**
 * Obtenir l'emoji selon le niveau de maîtrise
 */
export function getMasteryEmoji(mastery: MasteryLevel): string {
  const emojis: Record<MasteryLevel, string> = {
    new: '🆕',
    learning: '📚',
    reviewing: '🔄',
    mastered: '✅'
  };
  return emojis[mastery];
}

/**
 * Convertir secondes en format lisible
 */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (minutes < 60) return `${minutes}m ${secs}s`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  calculateLevel,
  xpForLevel,
  xpForNextLevel,
  getLevelProgress,
  calculateExerciseRewards,
  calculateTopicReadXP,
  calculateChapterRewards,
  calculatePathRewards,
  updateStreak,
  calculateNextReview,
  isOverdue,
  daysOverdue,
  formatNumber,
  formatPercentage,
  getScoreColor,
  getMasteryEmoji,
  formatDuration
};
