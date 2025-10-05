// ============================================================================
// TYPES TYPESCRIPT - SYSTÈME DE GAMIFICATION
// Version: 1.0
// Date: 2025-01-05
// ============================================================================

// ============================================================================
// 1. USER PROGRESS
// ============================================================================

export interface UserProgress {
  id: string;
  user_id: string;

  // Gamification
  total_xp: number;
  level: number;
  coins: number;

  // Streaks
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;

  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface LevelProgress {
  current_level: number;
  xp_current_level: number;
  xp_next_level: number;
  xp_in_current_level: number;
  xp_needed_for_level: number;
  progress_percentage: number;
}

// ============================================================================
// 2. EXERCISE ATTEMPTS
// ============================================================================

export interface ErrorDetail {
  question_id: string;
  user_answer: string;
  correct_answer: string;
  error_type: 'vocabulary' | 'grammar' | 'translation' | 'association';
  retry_count: number;
}

export interface ExerciseAttempt {
  id: string;
  user_id: string;
  exercise_id: string;
  learning_path_id?: string;

  // Performance
  score: number;
  time_spent_seconds: number;
  errors: ErrorDetail[];

  // Contexte
  is_review: boolean;
  review_iteration: number;

  // Gamification
  xp_earned: number;
  coins_earned: number;

  // Métadonnées
  completed_at: string;
}

// ============================================================================
// 3. REVIEW SCHEDULE
// ============================================================================

export type MasteryLevel = 'new' | 'learning' | 'reviewing' | 'mastered';

export interface ReviewSchedule {
  id: string;
  user_id: string;
  exercise_id: string;
  learning_path_id?: string;

  // Historique
  first_attempt_date: string;
  last_review_date: string;
  next_review_date: string;

  // Algorithme
  interval_days: number;
  ease_factor: number;
  repetitions: number;

  // État
  mastery_level: MasteryLevel;
  difficulty_rating?: 1 | 2 | 3 | 4 | 5;

  // Timestamps
  created_at: string;
  updated_at: string;
}

// ============================================================================
// 4. DAILY ASSIGNMENTS
// ============================================================================

export type AssignmentPriority = 'high' | 'medium' | 'low';

export interface ExerciseAssignment {
  exercise_id: string;
  learning_path_id?: string;
  chapter_id?: string;
  type: 'new' | 'review';
  priority: AssignmentPriority;
  xp_reward: number;
  coin_reward: number;
  completed: boolean;
}

export interface DailyAssignment {
  id: string;
  user_id: string;
  assignment_date: string;

  // Exercices assignés
  new_exercises: ExerciseAssignment[];
  review_exercises: ExerciseAssignment[];

  // Progression
  completed: boolean;
  completion_rate: number;

  // Récompenses
  total_xp_available: number;
  xp_earned: number;
  total_coins_available: number;
  coins_earned: number;

  // Timestamps
  created_at: string;
  updated_at: string;
}

// ============================================================================
// 5. LEARNING PATH PROGRESS
// ============================================================================

export interface LearningPathProgress {
  id: string;
  user_id: string;
  learning_path_id: string;

  // Progression
  current_chapter_id?: string;
  current_exercise_index: number;
  completed_exercises: string[];
  completed_chapters: string[];

  // Topics
  topics_read: string[];
  topics_completed: string[];

  // Stats
  total_xp_earned: number;
  total_coins_earned: number;
  completion_percentage: number;

  // Timestamps
  started_at: string;
  last_activity: string;
  completed_at?: string;
}

// ============================================================================
// 6. SHOP & INVENTORY
// ============================================================================

export type ShopCategory = 'avatar' | 'theme' | 'powerup' | 'content';

export interface ShopItem {
  id: string;
  name: string;
  description?: string;
  category: ShopCategory;
  price_coins: number;
  image_url?: string;
  metadata?: Record<string, any>;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserInventory {
  id: string;
  user_id: string;
  item_id: string;
  purchased_at: string;
  is_equipped: boolean;
  quantity: number;
  metadata?: Record<string, any>;
}

export type PowerUpType = 'double_xp' | 'freeze_streak' | 'hint_pack' | 'skip_review';

export interface ActivePowerUp {
  id: string;
  user_id: string;
  item_id: string;
  activated_at: string;
  expires_at: string;
  powerup_type: PowerUpType;
  metadata?: Record<string, any>;
}

// ============================================================================
// 7. ACHIEVEMENTS
// ============================================================================

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: string;
  xp_reward: number;
  coin_reward: number;
  criteria: Record<string, any>;
  icon_url?: string;
  rarity: AchievementRarity;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  progress: number;
  unlocked: boolean;
  unlocked_at?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// 8. SPACED REPETITION CONFIG
// ============================================================================

export interface SpacedRepetitionConfig {
  id: string;
  learning_path_id?: string;
  is_default: boolean;

  // Paramètres
  initial_interval_days: number;
  interval_multipliers: number[];

  // Seuils
  mastery_threshold: number;
  review_threshold: number;

  // Ajustements difficulté
  easy_multiplier: number;
  medium_multiplier: number;
  hard_multiplier: number;

  // Limites
  max_interval_days: number;
  min_reviews_before_mastery: number;

  // Timestamps
  created_at: string;
  updated_at: string;
}

// ============================================================================
// 9. ANALYTICS & STATS
// ============================================================================

export interface ErrorAnalytics {
  user_id: string;

  // Erreurs par type
  vocabulary_errors: number;
  grammar_errors: number;
  translation_errors: number;
  association_errors: number;

  // Patterns d'erreurs
  common_mistakes: Array<{
    question_id: string;
    error_count: number;
    last_error: string;
    context: string;
  }>;

  // Tendances
  error_rate_trend: Array<{
    date: string;
    error_rate: number;
  }>;

  // Zones à améliorer
  weak_areas: Array<{
    topic: string;
    exercise_type: string;
    success_rate: number;
    recommendation: string;
  }>;
}

export interface UserDashboard {
  // Vue d'ensemble
  overview: {
    level: number;
    total_xp: number;
    xp_to_next_level: number;
    coins: number;
    current_streak: number;
    longest_streak: number;
  };

  // Activité récente
  recent_activity: Array<{
    type: 'exercise' | 'topic' | 'chapter' | 'path';
    title: string;
    xp_earned: number;
    coins_earned: number;
    timestamp: string;
  }>;

  // Progression learning paths
  active_paths: Array<{
    path_id: string;
    title: string;
    completion_percentage: number;
    chapters_completed: number;
    total_chapters: number;
    last_activity: string;
  }>;

  // Statistiques
  stats: {
    total_exercises_completed: number;
    total_topics_read: number;
    total_time_spent_minutes: number;
    average_score: number;
    improvement_rate: number;
  };

  // Analytics d'erreurs
  error_analytics: ErrorAnalytics;

  // Classement (optionnel)
  leaderboard_position?: {
    global_rank: number;
    total_users: number;
    friends_rank?: number;
  };
}

export interface ProgressCharts {
  // XP au fil du temps
  xp_over_time: Array<{
    date: string;
    total_xp: number;
    daily_xp: number;
  }>;

  // Score moyen par type d'exercice
  score_by_type: Array<{
    exercise_type: string;
    average_score: number;
    attempt_count: number;
  }>;

  // Activité par jour de la semaine
  activity_heatmap: Array<{
    day_of_week: number;
    hour: number;
    activity_count: number;
  }>;

  // Taux de révision
  review_completion_rate: Array<{
    week: string;
    scheduled: number;
    completed: number;
    rate: number;
  }>;
}

// ============================================================================
// 10. REWARDS & CALCULATIONS
// ============================================================================

export interface RewardCalculation {
  xp: number;
  coins: number;
  badges?: string[];
  powerups?: PowerUpType[];
}

export interface StreakUpdate {
  current_streak: number;
  longest_streak: number;
  freeze_used: boolean;
  milestone_reached?: boolean;
}

// ============================================================================
// 11. LEARNING PATH SETTINGS (pour éditeur)
// ============================================================================

export interface LearningPathRewardSettings {
  // Par exercice
  exercise_xp_multiplier: number;
  exercise_coin_multiplier: number;

  // Par topic
  topic_read_xp: number;
  topic_completion_xp: number;
  topic_completion_coins: number;

  // Par chapitre
  chapter_completion_xp: number;
  chapter_completion_coins: number;

  // Complétion totale
  path_completion_xp: number;
  path_completion_coins: number;
  path_completion_badge?: string;
}

export interface LearningPathRequirements {
  min_score_to_pass: number;
  allow_skip: boolean;
  require_sequential: boolean;
  max_attempts_per_exercise?: number;
}

export interface LearningPathDailySettings {
  enabled: boolean;
  max_new_per_day: number;
  max_reviews_per_day: number;
  priority_weight: number;
}

export interface LearningPathGamificationSettings {
  rewards: LearningPathRewardSettings;
  requirements: LearningPathRequirements;
  daily_assignments: LearningPathDailySettings;
  spaced_repetition_config_id?: string;
}

// ============================================================================
// 12. CONTEXT TYPES
// ============================================================================

export interface UserProgressContextType {
  userProgress: UserProgress | null;
  levelProgress: LevelProgress | null;
  loading: boolean;
  error: Error | null;

  // Actions
  addXP: (amount: number) => Promise<void>;
  addCoins: (amount: number) => Promise<void>;
  spendCoins: (amount: number) => Promise<boolean>;
  updateStreak: (date: Date) => Promise<StreakUpdate>;
  refreshProgress: () => Promise<void>;
}

export interface GamificationContextType {
  // User progress
  userProgress: UserProgressContextType;

  // Daily assignments
  dailyAssignment: DailyAssignment | null;
  loadDailyAssignment: (date: Date) => Promise<void>;
  completeAssignment: (assignmentId: string, exerciseId: string) => Promise<void>;

  // Review schedule
  dueReviews: ReviewSchedule[];
  overdueReviews: ReviewSchedule[];
  loadReviews: () => Promise<void>;

  // Shop
  shopItems: ShopItem[];
  userInventory: UserInventory[];
  activePowerups: ActivePowerUp[];
  purchaseItem: (itemId: string) => Promise<boolean>;

  // Achievements
  achievements: Achievement[];
  userAchievements: UserAchievement[];
  checkAchievements: () => Promise<void>;
}

// ============================================================================
// 13. API RESPONSE TYPES
// ============================================================================

export interface PurchaseResponse {
  success: boolean;
  message: string;
  new_balance?: number;
  item?: ShopItem;
}

export interface RewardResponse {
  xp_earned: number;
  coins_earned: number;
  level_up?: boolean;
  new_level?: number;
  achievements_unlocked?: Achievement[];
}

export interface ReviewCalculationResult {
  schedule: ReviewSchedule;
  next_review_date: Date;
  mastery_level: MasteryLevel;
  should_notify: boolean;
}

// ============================================================================
// 14. UTILITY TYPES
// ============================================================================

export type ExerciseContext = 'new' | 'review' | 'overdue';

export interface ExerciseReward {
  context: ExerciseContext;
  xp: number;
  coins: number;
  multipliers: {
    difficulty: number;
    performance: number;
    context: number;
    streak: number;
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  // Réexport pour faciliter l'import
  UserProgress,
  ExerciseAttempt,
  ReviewSchedule,
  DailyAssignment,
  LearningPathProgress,
  ShopItem,
  UserInventory,
  ActivePowerUp,
  Achievement,
  UserAchievement,
  SpacedRepetitionConfig,
};
