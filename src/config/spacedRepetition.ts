// ============================================================================
// CONFIGURATION - RÉPÉTITION ESPACÉE
// Version: 1.0
// Date: 2025-01-05
// ============================================================================

import type { SpacedRepetitionConfig } from '@/types/gamification';

/**
 * Configuration par défaut de la répétition espacée
 * Basée sur les recherches d'Ebbinghaus et la méthode Leitner
 */
export const DEFAULT_SPACED_REPETITION_CONFIG: Omit<SpacedRepetitionConfig, 'id' | 'created_at' | 'updated_at'> = {
  learning_path_id: undefined,
  is_default: true,

  // Intervalle initial (1 jour)
  initial_interval_days: 1,

  // Séquence de Fibonacci modifiée pour intervalles optimaux
  // Jour 1, 2, 4, 7, 14, 30, 60, 120, 180
  interval_multipliers: [1, 2, 4, 7, 14, 30, 60, 120, 180],

  // Seuils de performance
  mastery_threshold: 90,    // ≥ 90% = maîtrisé
  review_threshold: 70,     // ≥ 70% = besoin de révision normale
                            // < 70% = retour en apprentissage

  // Facteurs d'ajustement selon difficulté auto-évaluée
  easy_multiplier: 1.5,     // Facile → intervalle × 1.5
  medium_multiplier: 1.0,   // Moyen → intervalle × 1.0 (pas de changement)
  hard_multiplier: 0.7,     // Difficile → intervalle × 0.7 (raccourci)

  // Limites de sécurité
  max_interval_days: 180,   // Maximum 6 mois entre révisions
  min_reviews_before_mastery: 5  // Minimum 5 révisions avant "mastered"
};

/**
 * Configuration intensive (pour apprentissage rapide)
 * Intervalles plus courts, révisions plus fréquentes
 */
export const INTENSIVE_CONFIG: Omit<SpacedRepetitionConfig, 'id' | 'created_at' | 'updated_at'> = {
  ...DEFAULT_SPACED_REPETITION_CONFIG,
  is_default: false,
  interval_multipliers: [1, 1, 2, 3, 5, 7, 14, 21, 30, 60],
  mastery_threshold: 95,
  min_reviews_before_mastery: 7
};

/**
 * Configuration relaxée (pour apprentissage à long terme)
 * Intervalles plus longs, moins de révisions
 */
export const RELAXED_CONFIG: Omit<SpacedRepetitionConfig, 'id' | 'created_at' | 'updated_at'> = {
  ...DEFAULT_SPACED_REPETITION_CONFIG,
  is_default: false,
  interval_multipliers: [1, 3, 7, 14, 30, 60, 120, 180],
  mastery_threshold: 85,
  min_reviews_before_mastery: 4
};

/**
 * Configuration pour débutants (plus de support)
 * Intervalles courts au début avec progression graduelle
 */
export const BEGINNER_CONFIG: Omit<SpacedRepetitionConfig, 'id' | 'created_at' | 'updated_at'> = {
  ...DEFAULT_SPACED_REPETITION_CONFIG,
  is_default: false,
  interval_multipliers: [1, 1, 2, 2, 4, 7, 14, 21, 30, 60],
  review_threshold: 60,    // Plus tolérant
  mastery_threshold: 85,
  min_reviews_before_mastery: 6
};

/**
 * Configuration pour experts (progression rapide)
 * Intervalles longs, seuils élevés
 */
export const EXPERT_CONFIG: Omit<SpacedRepetitionConfig, 'id' | 'created_at' | 'updated_at'> = {
  ...DEFAULT_SPACED_REPETITION_CONFIG,
  is_default: false,
  interval_multipliers: [1, 3, 7, 14, 30, 60, 90, 180],
  mastery_threshold: 95,
  review_threshold: 80,
  min_reviews_before_mastery: 4
};

/**
 * Présets disponibles pour l'éditeur de learning path
 */
export const SR_PRESETS = {
  default: DEFAULT_SPACED_REPETITION_CONFIG,
  intensive: INTENSIVE_CONFIG,
  relaxed: RELAXED_CONFIG,
  beginner: BEGINNER_CONFIG,
  expert: EXPERT_CONFIG
} as const;

export type SRPresetKey = keyof typeof SR_PRESETS;

/**
 * Labels et descriptions pour l'UI
 */
export const SR_PRESET_INFO: Record<SRPresetKey, { label: string; description: string; icon: string }> = {
  default: {
    label: 'Standard',
    description: 'Équilibre optimal entre rétention et charge de travail',
    icon: '⚖️'
  },
  intensive: {
    label: 'Intensif',
    description: 'Révisions fréquentes pour apprentissage rapide',
    icon: '🔥'
  },
  relaxed: {
    label: 'Relax',
    description: 'Intervalles longs pour apprentissage à long terme',
    icon: '🌊'
  },
  beginner: {
    label: 'Débutant',
    description: 'Support renforcé avec révisions plus fréquentes au début',
    icon: '🌱'
  },
  expert: {
    label: 'Expert',
    description: 'Progression rapide avec seuils élevés',
    icon: '🚀'
  }
};

/**
 * Validation d'une configuration
 */
export function validateSRConfig(config: Partial<SpacedRepetitionConfig>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (config.initial_interval_days !== undefined && config.initial_interval_days < 1) {
    errors.push('L\'intervalle initial doit être au moins 1 jour');
  }

  if (config.interval_multipliers && config.interval_multipliers.length < 3) {
    errors.push('Au moins 3 intervalles doivent être définis');
  }

  if (config.interval_multipliers) {
    const sorted = [...config.interval_multipliers].sort((a, b) => a - b);
    if (JSON.stringify(sorted) !== JSON.stringify(config.interval_multipliers)) {
      errors.push('Les intervalles doivent être en ordre croissant');
    }
  }

  if (config.mastery_threshold !== undefined && (config.mastery_threshold < 50 || config.mastery_threshold > 100)) {
    errors.push('Le seuil de maîtrise doit être entre 50 et 100');
  }

  if (config.review_threshold !== undefined && (config.review_threshold < 30 || config.review_threshold > 100)) {
    errors.push('Le seuil de révision doit être entre 30 et 100');
  }

  if (
    config.mastery_threshold !== undefined &&
    config.review_threshold !== undefined &&
    config.review_threshold >= config.mastery_threshold
  ) {
    errors.push('Le seuil de révision doit être inférieur au seuil de maîtrise');
  }

  if (config.easy_multiplier !== undefined && config.easy_multiplier <= 1.0) {
    errors.push('Le multiplicateur "facile" doit être > 1.0');
  }

  if (config.hard_multiplier !== undefined && (config.hard_multiplier <= 0 || config.hard_multiplier >= 1.0)) {
    errors.push('Le multiplicateur "difficile" doit être entre 0 et 1.0');
  }

  if (config.max_interval_days !== undefined && config.max_interval_days < 7) {
    errors.push('L\'intervalle maximum doit être au moins 7 jours');
  }

  if (config.min_reviews_before_mastery !== undefined && config.min_reviews_before_mastery < 2) {
    errors.push('Le minimum de révisions avant maîtrise doit être au moins 2');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Créer une config personnalisée basée sur un preset
 */
export function createCustomConfig(
  preset: SRPresetKey,
  overrides: Partial<SpacedRepetitionConfig> = {}
): Omit<SpacedRepetitionConfig, 'id' | 'created_at' | 'updated_at'> {
  const baseConfig = SR_PRESETS[preset];

  return {
    ...baseConfig,
    ...overrides,
    is_default: false
  };
}

/**
 * Calculer le nombre total de jours avant maîtrise (estimation)
 */
export function estimateDaysToMastery(config: SpacedRepetitionConfig): number {
  const intervals = config.interval_multipliers.slice(0, config.min_reviews_before_mastery);
  return intervals.reduce((sum, interval) => sum + interval, 0);
}

/**
 * Obtenir le prochain intervalle dans la séquence
 */
export function getNextInterval(
  currentInterval: number,
  config: SpacedRepetitionConfig,
  adjustment: 'easy' | 'medium' | 'hard' = 'medium'
): number {
  const currentIndex = config.interval_multipliers.indexOf(currentInterval);

  let nextInterval: number;

  if (currentIndex === -1 || currentIndex >= config.interval_multipliers.length - 1) {
    // Fin de séquence ou hors séquence → augmenter progressivement
    nextInterval = Math.min(
      Math.round(currentInterval * 1.5),
      config.max_interval_days
    );
  } else {
    // Prendre le prochain dans la séquence
    nextInterval = config.interval_multipliers[currentIndex + 1];
  }

  // Appliquer l'ajustement de difficulté
  const multiplier = {
    easy: config.easy_multiplier,
    medium: config.medium_multiplier,
    hard: config.hard_multiplier
  }[adjustment];

  nextInterval = Math.round(nextInterval * multiplier);

  // Respecter les limites
  return Math.min(Math.max(1, nextInterval), config.max_interval_days);
}

/**
 * Export pour utilisation facile
 */
export default DEFAULT_SPACED_REPETITION_CONFIG;
