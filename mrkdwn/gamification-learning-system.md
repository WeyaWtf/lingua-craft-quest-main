# Système de Gamification et Suivi d'Apprentissage - Lingua Craft Quest

## 📋 Vue d'ensemble

Ce document présente le design complet d'un système d'apprentissage gamifié intégrant :
- 🎮 **Gamification** (points, niveaux, récompenses)
- 📊 **Tracking des performances** et erreurs
- 📝 **Système de devoirs** basé sur les learning paths
- 🔄 **Répétition espacée** selon les courbes d'oubli
- 🏪 **Boutique** de récompenses

---

## 🧠 Fondements Scientifiques

### Courbe de l'oubli (Ebbinghaus)

**Principe** : Sans révision, 50% des informations sont perdues dans les premières 24h.

**Solution** : Répétition espacée optimisée

```
Jour 1     → Apprentissage initial (100% mémorisation)
Jour 1 soir → 1ère révision (-50% oubli sans révision)
Jour 2     → 2ème révision
Jour 4     → 3ème révision
Jour 7     → 4ème révision
Jour 14    → 5ème révision
Jour 30    → 6ème révision
Jour 60    → 7ème révision (verrouillage long terme)
```

### Les 4 Piliers d'Apprentissage Actif

1. **Écoute/Lecture active** (avec concentration)
2. **Pratique passive** (background immersion)
3. **Shadowing** (reproduction immédiate)
4. **Rappel actif** (retrieval practice)

### Métacognition et Apprentissage Actif

**Principe clé** : L'apprentissage efficace nécessite :
- 🧩 Effort mental conscient
- 🔍 Réflexion sur sa propre compréhension
- 🎯 Identification précise des confusions
- 💪 Engagement actif (pas passif)

**Formule** :
```
Apprentissage Réel = Information × Effort Mental × Métacognition
```

---

## 🎯 Architecture du Système

### 1. Modèle de Données

#### User Profile Extension
```typescript
interface UserProgress {
  user_id: string;
  total_xp: number;           // Points d'expérience totaux
  level: number;              // Niveau actuel
  coins: number;              // Monnaie virtuelle
  current_streak: number;     // Jours consécutifs
  longest_streak: number;     // Record de jours consécutifs
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### Exercise Attempt (Tentatives d'exercices)
```typescript
interface ExerciseAttempt {
  id: string;
  user_id: string;
  exercise_id: string;
  learning_path_id?: string;  // Optionnel si fait via learning path

  // Performance
  score: number;              // Score obtenu (0-100%)
  time_spent: number;         // Temps passé (secondes)
  errors: ErrorDetail[];      // Détails des erreurs

  // Contexte
  is_review: boolean;         // Est-ce une révision ?
  review_iteration: number;   // Quelle itération de révision (1, 2, 3...)

  // Gamification
  xp_earned: number;
  coins_earned: number;

  completed_at: timestamp;
}

interface ErrorDetail {
  question_id: string;
  user_answer: string;
  correct_answer: string;
  error_type: 'vocabulary' | 'grammar' | 'translation' | 'association';
  retry_count: number;        // Nombre de tentatives avant succès
}
```

#### Review Schedule (Planning de révisions)
```typescript
interface ReviewSchedule {
  id: string;
  user_id: string;
  exercise_id: string;
  learning_path_id?: string;

  // Historique
  first_attempt_date: timestamp;
  last_review_date: timestamp;
  next_review_date: timestamp;

  // Algorithme de répétition
  interval_days: number;      // Intervalle actuel (1, 2, 4, 7, 14, 30, 60)
  ease_factor: number;        // Facteur de facilité (1.3 - 2.5)
  repetitions: number;        // Nombre de révisions réussies

  // État
  mastery_level: 'new' | 'learning' | 'reviewing' | 'mastered';
  difficulty_rating: 1 | 2 | 3 | 4 | 5;  // Auto-évaluation utilisateur
}
```

#### Daily Assignment (Devoirs quotidiens)
```typescript
interface DailyAssignment {
  id: string;
  user_id: string;
  date: date;

  // Exercices assignés
  new_exercises: ExerciseAssignment[];      // Nouveaux contenus
  review_exercises: ExerciseAssignment[];   // Révisions

  // Progression
  completed: boolean;
  completion_rate: number;    // 0-100%
  total_xp_available: number;
  xp_earned: number;
  coins_earned: number;
}

interface ExerciseAssignment {
  exercise_id: string;
  learning_path_id?: string;
  chapter_id?: string;
  type: 'new' | 'review';
  priority: 'high' | 'medium' | 'low';
  xp_reward: number;
  coin_reward: number;
  completed: boolean;
}
```

#### Learning Path Progress
```typescript
interface LearningPathProgress {
  id: string;
  user_id: string;
  learning_path_id: string;

  // Progression
  current_chapter_id: string;
  current_exercise_index: number;
  completed_exercises: string[];
  completed_chapters: string[];

  // Topics (lectures)
  topics_read: string[];
  topics_completed: string[];

  // Stats
  total_xp_earned: number;
  total_coins_earned: number;
  completion_percentage: number;

  started_at: timestamp;
  last_activity: timestamp;
  completed_at?: timestamp;
}
```

#### Reward & Shop
```typescript
interface ShopItem {
  id: string;
  name: string;
  description: string;
  category: 'avatar' | 'theme' | 'powerup' | 'content';
  price_coins: number;
  image_url: string;
  is_available: boolean;
}

interface UserInventory {
  user_id: string;
  item_id: string;
  purchased_at: timestamp;
  is_equipped: boolean;
}

interface PowerUp {
  type: 'double_xp' | 'freeze_streak' | 'hint_pack' | 'skip_review';
  duration_hours?: number;
  quantity?: number;
}
```

---

## 🔄 Algorithme de Répétition Espacée

### Configuration Paramétrable (Learning Path Editor)

```typescript
interface SpacedRepetitionConfig {
  // Paramètres éditables par le créateur de learning path
  initial_interval_days: number;        // Défaut: 1
  interval_multipliers: number[];       // Défaut: [1, 2, 4, 7, 14, 30, 60]

  // Seuils de performance
  mastery_threshold: number;            // Défaut: 90% (score pour passer à "mastered")
  review_threshold: number;             // Défaut: 70% (en dessous = besoin de révision)

  // Facteurs d'ajustement
  difficulty_adjustments: {
    easy: number;      // Défaut: 1.5 (multiplie l'intervalle)
    medium: number;    // Défaut: 1.0
    hard: number;      // Défaut: 0.7 (réduit l'intervalle)
  };

  // Limites
  max_interval_days: number;            // Défaut: 180
  min_reviews_before_mastery: number;   // Défaut: 5
}
```

### Planification des Révisions

```typescript
function calculateNextReview(
  attempt: ExerciseAttempt,
  schedule: ReviewSchedule,
  config: SpacedRepetitionConfig
): ReviewSchedule {

  const performance = attempt.score / 100;
  const selfRating = schedule.difficulty_rating; // 1-5 (utilisateur)

  // 1. Déterminer l'ajustement basé sur la performance
  let intervalMultiplier = 1.0;

  if (performance >= 0.9 && selfRating <= 2) {
    // Facile - allonger l'intervalle
    intervalMultiplier = config.difficulty_adjustments.easy;
  } else if (performance < 0.7 || selfRating >= 4) {
    // Difficile - raccourcir l'intervalle
    intervalMultiplier = config.difficulty_adjustments.hard;
  }

  // 2. Calculer le prochain intervalle
  const currentInterval = schedule.interval_days;
  const nextIntervalIndex = config.interval_multipliers.indexOf(currentInterval) + 1;

  let nextInterval;
  if (nextIntervalIndex < config.interval_multipliers.length) {
    nextInterval = config.interval_multipliers[nextIntervalIndex];
  } else {
    nextInterval = Math.min(
      currentInterval * 1.5,
      config.max_interval_days
    );
  }

  nextInterval = Math.round(nextInterval * intervalMultiplier);

  // 3. Mettre à jour le niveau de maîtrise
  let masteryLevel = schedule.mastery_level;
  if (performance >= config.mastery_threshold &&
      schedule.repetitions >= config.min_reviews_before_mastery) {
    masteryLevel = 'mastered';
  } else if (performance >= config.review_threshold) {
    masteryLevel = 'reviewing';
  } else {
    masteryLevel = 'learning';
  }

  return {
    ...schedule,
    last_review_date: new Date(),
    next_review_date: addDays(new Date(), nextInterval),
    interval_days: nextInterval,
    repetitions: schedule.repetitions + 1,
    mastery_level: masteryLevel
  };
}
```

### Système de Priorisation des Devoirs

```typescript
function generateDailyAssignments(
  userId: string,
  date: Date
): DailyAssignment {

  // 1. Récupérer tous les exercices en cours
  const activePaths = getUserActiveLearningPaths(userId);
  const overdueReviews = getOverdueReviews(userId, date);
  const dueReviews = getScheduledReviews(userId, date);

  // 2. Prioriser les révisions
  const reviewExercises: ExerciseAssignment[] = [];

  // Priorité HAUTE : révisions en retard
  overdueReviews.forEach(schedule => {
    reviewExercises.push({
      exercise_id: schedule.exercise_id,
      learning_path_id: schedule.learning_path_id,
      type: 'review',
      priority: 'high',
      xp_reward: calculateXP(schedule, 'overdue'),
      coin_reward: calculateCoins(schedule, 'overdue'),
      completed: false
    });
  });

  // Priorité MOYENNE : révisions du jour
  dueReviews.forEach(schedule => {
    reviewExercises.push({
      exercise_id: schedule.exercise_id,
      learning_path_id: schedule.learning_path_id,
      type: 'review',
      priority: 'medium',
      xp_reward: calculateXP(schedule, 'due'),
      coin_reward: calculateCoins(schedule, 'due'),
      completed: false
    });
  });

  // 3. Ajouter les nouveaux exercices (learning paths actifs)
  const newExercises: ExerciseAssignment[] = [];

  activePaths.forEach(pathProgress => {
    const nextExercises = getNextExercisesInPath(pathProgress, 3); // Max 3 nouveaux/jour
    nextExercises.forEach(exercise => {
      newExercises.push({
        exercise_id: exercise.id,
        learning_path_id: pathProgress.learning_path_id,
        chapter_id: exercise.chapter_id,
        type: 'new',
        priority: 'medium',
        xp_reward: calculateXP(exercise, 'new'),
        coin_reward: calculateCoins(exercise, 'new'),
        completed: false
      });
    });
  });

  // 4. Calculer les récompenses totales
  const totalXP = [...reviewExercises, ...newExercises]
    .reduce((sum, ex) => sum + ex.xp_reward, 0);
  const totalCoins = [...reviewExercises, ...newExercises]
    .reduce((sum, ex) => sum + ex.coin_reward, 0);

  return {
    id: generateId(),
    user_id: userId,
    date: date,
    new_exercises: newExercises,
    review_exercises: reviewExercises,
    completed: false,
    completion_rate: 0,
    total_xp_available: totalXP,
    xp_earned: 0,
    coins_earned: 0
  };
}
```

---

## 🎮 Système de Gamification

### Calcul des XP et Pièces

```typescript
// XP pour exercices
function calculateExerciseXP(
  exercise: Exercise,
  attempt: ExerciseAttempt,
  context: 'new' | 'review' | 'overdue'
): number {

  const baseXP = {
    'flashcard': 10,
    'association': 15,
    'translation': 20,
    'alphabet': 5
  }[exercise.type] || 10;

  // Multiplicateurs
  const difficultyMultiplier = exercise.difficulty; // 1-5
  const performanceMultiplier = attempt.score / 100; // 0-1

  const contextBonus = {
    'new': 1.0,
    'review': 0.5,      // Moins d'XP pour révisions
    'overdue': 1.5      // Bonus pour rattraper le retard
  }[context];

  const streakBonus = getUserStreak(attempt.user_id) > 7 ? 1.2 : 1.0;

  return Math.round(
    baseXP *
    difficultyMultiplier *
    performanceMultiplier *
    contextBonus *
    streakBonus
  );
}

// Pièces pour exercices
function calculateExerciseCoins(
  exercise: Exercise,
  attempt: ExerciseAttempt,
  context: 'new' | 'review' | 'overdue'
): number {

  const baseCoins = {
    'flashcard': 5,
    'association': 7,
    'translation': 10,
    'alphabet': 3
  }[exercise.type] || 5;

  // Score parfait = bonus
  const perfectBonus = attempt.score === 100 ? 1.5 : 1.0;

  return Math.round(baseCoins * exercise.difficulty * perfectBonus);
}

// XP pour lecture de topics
function calculateTopicReadXP(topic: Topic): number {
  // Base sur la longueur et complexité
  const wordCount = topic.content.split(' ').length;
  const baseXP = Math.min(50, Math.round(wordCount / 50)); // 1 XP par 50 mots, max 50

  return baseXP * topic.difficulty;
}

// Pièces pour complétion de chapitre
function calculateChapterCompletionReward(chapter: Chapter): number {
  const exerciseCount = chapter.exercises.length;
  const topicCount = chapter.topics?.length || 0;

  const baseCoins = 50;
  const exerciseBonus = exerciseCount * 5;
  const topicBonus = topicCount * 10;

  return baseCoins + exerciseBonus + topicBonus;
}

// XP pour complétion de chapitre
function calculateChapterCompletionXP(chapter: Chapter): number {
  return calculateChapterCompletionReward(chapter) * 2; // 2 XP par pièce
}

// Récompenses pour complétion de learning path
function calculatePathCompletionReward(path: LearningPath): {
  xp: number;
  coins: number;
  badge?: string;
} {
  const chapterCount = path.chapters.length;
  const totalExercises = path.chapters.reduce(
    (sum, ch) => sum + ch.exercises.length,
    0
  );

  return {
    xp: totalExercises * 50,
    coins: chapterCount * 200,
    badge: `path_completed_${path.id}` // Badge unique
  };
}
```

### Système de Niveaux

```typescript
function calculateLevel(totalXP: number): number {
  // Formule exponentielle : XP requis = 100 * (niveau ^ 1.5)
  // Niveau 1 : 100 XP
  // Niveau 2 : 283 XP
  // Niveau 3 : 520 XP
  // Niveau 10 : 3162 XP
  // Niveau 50 : 35355 XP

  return Math.floor(Math.pow(totalXP / 100, 1 / 1.5)) + 1;
}

function getXPForNextLevel(currentLevel: number): number {
  return Math.round(100 * Math.pow(currentLevel + 1, 1.5));
}

function getLevelProgress(totalXP: number): {
  current_level: number;
  xp_current_level: number;
  xp_next_level: number;
  progress_percentage: number;
} {
  const currentLevel = calculateLevel(totalXP);
  const xpCurrentLevel = Math.round(100 * Math.pow(currentLevel, 1.5));
  const xpNextLevel = getXPForNextLevel(currentLevel);

  const xpInCurrentLevel = totalXP - xpCurrentLevel;
  const xpNeededForLevel = xpNextLevel - xpCurrentLevel;

  return {
    current_level: currentLevel,
    xp_current_level: xpCurrentLevel,
    xp_next_level: xpNextLevel,
    progress_percentage: (xpInCurrentLevel / xpNeededForLevel) * 100
  };
}
```

### Système de Séries (Streaks)

```typescript
function updateStreak(userId: string, activityDate: Date): {
  current_streak: number;
  longest_streak: number;
  freeze_used: boolean;
} {

  const user = getUserProgress(userId);
  const lastActivity = user.last_activity_date;
  const daysSinceLastActivity = differenceInDays(activityDate, lastActivity);

  let newStreak = user.current_streak;
  let freezeUsed = false;

  if (daysSinceLastActivity === 0) {
    // Même jour - pas de changement
    return {
      current_streak: newStreak,
      longest_streak: user.longest_streak,
      freeze_used: false
    };
  } else if (daysSinceLastActivity === 1) {
    // Jour consécutif - incrémenter
    newStreak += 1;
  } else if (daysSinceLastActivity === 2 && hasStreakFreeze(userId)) {
    // 1 jour manqué mais freeze disponible
    useStreakFreeze(userId);
    newStreak += 1;
    freezeUsed = true;
  } else {
    // Série cassée
    newStreak = 1;
  }

  const newLongestStreak = Math.max(user.longest_streak, newStreak);

  updateUserProgress(userId, {
    current_streak: newStreak,
    longest_streak: newLongestStreak,
    last_activity_date: activityDate
  });

  return {
    current_streak: newStreak,
    longest_streak: newLongestStreak,
    freeze_used: freezeUsed
  };
}
```

---

## 📊 Système de Tracking des Erreurs

### Analyse des Erreurs

```typescript
interface ErrorAnalytics {
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
    last_error: timestamp;
    context: string;
  }>;

  // Tendances
  error_rate_trend: Array<{
    date: date;
    error_rate: number;  // Pourcentage
  }>;

  // Zones à améliorer
  weak_areas: Array<{
    topic: string;
    exercise_type: string;
    success_rate: number;
    recommendation: string;
  }>;
}

function analyzeUserErrors(userId: string, timeframe: 'week' | 'month' | 'all'): ErrorAnalytics {
  const attempts = getExerciseAttempts(userId, timeframe);

  // Agréger les erreurs
  const analytics: ErrorAnalytics = {
    user_id: userId,
    vocabulary_errors: 0,
    grammar_errors: 0,
    translation_errors: 0,
    association_errors: 0,
    common_mistakes: [],
    error_rate_trend: [],
    weak_areas: []
  };

  // Compter les erreurs par type
  attempts.forEach(attempt => {
    attempt.errors.forEach(error => {
      analytics[`${error.error_type}_errors`] += 1;
    });
  });

  // Identifier les erreurs communes
  const errorFrequency = new Map<string, number>();
  attempts.forEach(attempt => {
    attempt.errors.forEach(error => {
      const key = error.question_id;
      errorFrequency.set(key, (errorFrequency.get(key) || 0) + 1);
    });
  });

  analytics.common_mistakes = Array.from(errorFrequency.entries())
    .filter(([_, count]) => count > 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([question_id, count]) => ({
      question_id,
      error_count: count,
      last_error: getLastErrorDate(userId, question_id),
      context: getQuestionContext(question_id)
    }));

  // Calculer les tendances
  analytics.error_rate_trend = calculateErrorRateTrend(attempts);

  // Identifier les zones faibles
  analytics.weak_areas = identifyWeakAreas(attempts);

  return analytics;
}

function identifyWeakAreas(attempts: ExerciseAttempt[]): Array<{
  topic: string;
  exercise_type: string;
  success_rate: number;
  recommendation: string;
}> {

  const performanceByArea = new Map<string, {
    total: number;
    successful: number;
    exercise_type: string;
  }>();

  attempts.forEach(attempt => {
    const exercise = getExercise(attempt.exercise_id);
    const key = `${exercise.tags[0]}_${exercise.type}`;

    if (!performanceByArea.has(key)) {
      performanceByArea.set(key, {
        total: 0,
        successful: 0,
        exercise_type: exercise.type
      });
    }

    const area = performanceByArea.get(key)!;
    area.total += 1;
    if (attempt.score >= 70) {
      area.successful += 1;
    }
  });

  return Array.from(performanceByArea.entries())
    .map(([key, stats]) => {
      const [topic, exercise_type] = key.split('_');
      const success_rate = (stats.successful / stats.total) * 100;

      return {
        topic,
        exercise_type,
        success_rate,
        recommendation: generateRecommendation(success_rate, exercise_type)
      };
    })
    .filter(area => area.success_rate < 70)
    .sort((a, b) => a.success_rate - b.success_rate);
}

function generateRecommendation(successRate: number, exerciseType: string): string {
  if (successRate < 40) {
    return `Révision intensive recommandée. Considérez de revoir les topics de base avant de continuer.`;
  } else if (successRate < 70) {
    return `Besoin de plus de pratique. Essayez de refaire ces exercices quotidiennement.`;
  } else {
    return `Continue comme ça ! Des révisions régulières suffiront.`;
  }
}
```

---

## 🏪 Système de Boutique

### Catégories d'Articles

```typescript
const SHOP_ITEMS: ShopItem[] = [
  // Avatars
  {
    id: 'avatar_ninja',
    name: 'Avatar Ninja',
    description: 'Maître des langues orientales',
    category: 'avatar',
    price_coins: 500,
    image_url: '/assets/avatars/ninja.png',
    is_available: true
  },

  // Thèmes
  {
    id: 'theme_dark',
    name: 'Thème Sombre',
    description: 'Interface élégante pour apprendre la nuit',
    category: 'theme',
    price_coins: 300,
    image_url: '/assets/themes/dark.png',
    is_available: true
  },

  // Power-ups
  {
    id: 'powerup_double_xp',
    name: 'Double XP - 24h',
    description: 'Gagnez 2x plus d\'XP pendant 24h',
    category: 'powerup',
    price_coins: 200,
    image_url: '/assets/powerups/double_xp.png',
    is_available: true
  },
  {
    id: 'powerup_streak_freeze',
    name: 'Gel de Série',
    description: 'Protège votre série pendant 1 jour manqué',
    category: 'powerup',
    price_coins: 100,
    image_url: '/assets/powerups/freeze.png',
    is_available: true
  },
  {
    id: 'powerup_hint_pack',
    name: 'Pack d\'Indices (×5)',
    description: '5 indices utilisables dans les exercices',
    category: 'powerup',
    price_coins: 150,
    image_url: '/assets/powerups/hints.png',
    is_available: true
  },

  // Contenu premium
  {
    id: 'content_advanced_kanji',
    name: 'Pack Kanji Avancé',
    description: 'Débloquez 1000 kanji de niveau N2',
    category: 'content',
    price_coins: 1000,
    image_url: '/assets/content/kanji.png',
    is_available: true
  }
];
```

### Logique d'Achat

```typescript
async function purchaseItem(
  userId: string,
  itemId: string
): Promise<{
  success: boolean;
  message: string;
  new_balance?: number;
}> {

  const user = await getUserProgress(userId);
  const item = SHOP_ITEMS.find(i => i.id === itemId);

  if (!item) {
    return { success: false, message: 'Article introuvable' };
  }

  if (!item.is_available) {
    return { success: false, message: 'Article non disponible' };
  }

  if (user.coins < item.price_coins) {
    return {
      success: false,
      message: `Pas assez de pièces. Il vous manque ${item.price_coins - user.coins} pièces.`
    };
  }

  // Vérifier si déjà possédé (sauf powerups consommables)
  if (item.category !== 'powerup') {
    const alreadyOwned = await checkInventory(userId, itemId);
    if (alreadyOwned) {
      return { success: false, message: 'Vous possédez déjà cet article' };
    }
  }

  // Transaction
  await db.transaction(async (trx) => {
    // Débiter les pièces
    await trx('user_progress')
      .where({ user_id: userId })
      .decrement('coins', item.price_coins);

    // Ajouter à l'inventaire
    await trx('user_inventory').insert({
      user_id: userId,
      item_id: itemId,
      purchased_at: new Date(),
      is_equipped: false
    });

    // Si powerup, ajouter à la table active
    if (item.category === 'powerup') {
      await activatePowerUp(userId, itemId, trx);
    }
  });

  const newBalance = user.coins - item.price_coins;

  return {
    success: true,
    message: `${item.name} acheté avec succès !`,
    new_balance: newBalance
  };
}
```

---

## 📱 Interface Utilisateur - Menu Compte

### Composants du Menu Utilisateur

Basé sur la capture d'écran fournie :

```typescript
interface UserMenuItems {
  sections: [
    {
      title: "Mon apprentissage",
      items: [
        {
          icon: "🎓",
          label: "Mon apprentissage",
          route: "/my-learning",
          badge?: number  // Nombre de devoirs en attente
        },
        {
          icon: "📝",
          label: "Mes devoirs",
          route: "/assignments",
          badge?: number  // Devoirs du jour
        },
        {
          icon: "👥",
          label: "Groupe d'apprentissage",
          route: "/groups"
        }
      ]
    },
    {
      title: "Communication",
      items: [
        {
          icon: "🔔",
          label: "Notifications",
          route: "/notifications",
          badge?: number  // Non lues
        },
        {
          icon: "💬",
          label: "Messages",
          route: "/messages",
          badge?: number  // Non lus
        },
        {
          icon: "💭",
          label: "Forum",
          route: "/forum"
        }
      ]
    },
    {
      title: "Compte",
      items: [
        {
          icon: "⚙️",
          label: "Paramètres du compte",
          route: "/settings"
        },
        {
          icon: "💳",
          label: "Modes de paiement",
          route: "/payment"
        },
        {
          icon: "📄",
          label: "Abonnements",
          route: "/subscriptions"
        },
        {
          icon: "🪙",
          label: "Crédits",
          route: "/shop",
          info: user.coins  // Afficher le solde
        },
        {
          icon: "📜",
          label: "Historique des achats",
          route: "/purchase-history"
        }
      ]
    },
    {
      title: "Profil",
      items: [
        {
          icon: "👤",
          label: "Profil public",
          route: `/profile/${user.id}`
        },
        {
          icon: "✏️",
          label: "Modifier le profil",
          route: "/profile/edit"
        },
        {
          icon: "❓",
          label: "Aide et support",
          route: "/support"
        }
      ]
    }
  ],
  footer: {
    label: "Se déconnecter",
    action: "logout"
  }
}
```

### Page "Mes Devoirs"

```typescript
interface AssignmentsPageProps {
  dailyAssignment: DailyAssignment;
  userProgress: UserProgress;
  analytics: ErrorAnalytics;
}

// Layout de la page
<AssignmentsPage>
  <Header>
    <UserLevel level={userProgress.level} xp={userProgress.total_xp} />
    <StreakIndicator streak={userProgress.current_streak} />
    <CoinBalance coins={userProgress.coins} />
  </Header>

  <DailySummary>
    <ProgressRing
      completed={dailyAssignment.review_exercises.filter(e => e.completed).length}
      total={dailyAssignment.review_exercises.length}
      label="Révisions"
    />
    <ProgressRing
      completed={dailyAssignment.new_exercises.filter(e => e.completed).length}
      total={dailyAssignment.new_exercises.length}
      label="Nouveau"
    />
    <PotentialRewards
      xp={dailyAssignment.total_xp_available - dailyAssignment.xp_earned}
      coins={dailyAssignment.total_coins_available - dailyAssignment.coins_earned}
    />
  </DailySummary>

  <AssignmentsList>
    {/* Révisions urgentes en premier */}
    <Section title="🔥 Révisions Urgentes" priority="high">
      {dailyAssignment.review_exercises
        .filter(e => e.priority === 'high')
        .map(exercise => (
          <ExerciseCard
            exercise={exercise}
            showDueDate={true}
            onComplete={completeExercise}
          />
        ))}
    </Section>

    {/* Révisions du jour */}
    <Section title="📅 Révisions du Jour" priority="medium">
      {dailyAssignment.review_exercises
        .filter(e => e.priority === 'medium')
        .map(exercise => (
          <ExerciseCard
            exercise={exercise}
            onComplete={completeExercise}
          />
        ))}
    </Section>

    {/* Nouveaux exercices */}
    <Section title="✨ Continuer votre apprentissage">
      {dailyAssignment.new_exercises.map(exercise => (
        <ExerciseCard
          exercise={exercise}
          isNew={true}
          onComplete={completeExercise}
        />
      ))}
    </Section>
  </AssignmentsList>

  <WeakAreasSection>
    <Title>📊 Zones à améliorer</Title>
    {analytics.weak_areas.slice(0, 3).map(area => (
      <WeakAreaCard
        topic={area.topic}
        successRate={area.success_rate}
        recommendation={area.recommendation}
      />
    ))}
  </WeakAreasSection>
</AssignmentsPage>
```

---

## 🔧 Paramètres de Learning Path (Éditeur)

### Configuration pour les Créateurs

```typescript
interface LearningPathSettings {
  // Répétition espacée
  spaced_repetition: SpacedRepetitionConfig;

  // Récompenses
  rewards: {
    // Par exercice
    exercise_xp_multiplier: number;      // Défaut: 1.0
    exercise_coin_multiplier: number;    // Défaut: 1.0

    // Par topic
    topic_read_xp: number;               // Défaut: calculé auto
    topic_completion_xp: number;         // Défaut: topic_read_xp * 1.5
    topic_completion_coins: number;      // Défaut: 10

    // Par chapitre
    chapter_completion_xp: number;       // Défaut: 100
    chapter_completion_coins: number;    // Défaut: 50

    // Complétion totale
    path_completion_xp: number;          // Défaut: calculé auto
    path_completion_coins: number;       // Défaut: calculé auto
    path_completion_badge: string;       // Badge unique
  };

  // Exigences
  requirements: {
    min_score_to_pass: number;           // Défaut: 70%
    allow_skip: boolean;                 // Défaut: false
    require_sequential: boolean;         // Défaut: true (ordre imposé)
    max_attempts_per_exercise: number;   // Défaut: unlimited
  };

  // Devoirs quotidiens
  daily_assignments: {
    enabled: boolean;                    // Défaut: true
    max_new_per_day: number;            // Défaut: 3
    max_reviews_per_day: number;        // Défaut: 10
    priority_weight: number;             // Défaut: 1.0 (vs autres paths)
  };
}
```

### Interface d'Édition

```typescript
<LearningPathEditor>
  <Tab label="Contenu">
    {/* Édition chapitres, exercices, topics */}
  </Tab>

  <Tab label="Gamification">
    <Section title="Récompenses">
      <NumberInput
        label="Multiplicateur XP exercices"
        value={settings.rewards.exercise_xp_multiplier}
        min={0.5}
        max={3.0}
        step={0.1}
        hint="Augmentez pour rendre ce path plus gratifiant"
      />

      <NumberInput
        label="XP complétion chapitre"
        value={settings.rewards.chapter_completion_xp}
      />

      <NumberInput
        label="Pièces complétion chapitre"
        value={settings.rewards.chapter_completion_coins}
      />

      <TextInput
        label="Badge de complétion"
        value={settings.rewards.path_completion_badge}
        hint="ID unique du badge décerné à la fin"
      />
    </Section>

    <Section title="Exigences">
      <NumberInput
        label="Score minimum pour réussir (%)"
        value={settings.requirements.min_score_to_pass}
        min={50}
        max={100}
      />

      <Checkbox
        label="Autoriser de sauter des exercices"
        checked={settings.requirements.allow_skip}
      />

      <Checkbox
        label="Ordre séquentiel obligatoire"
        checked={settings.requirements.require_sequential}
        hint="Les utilisateurs doivent suivre l'ordre défini"
      />
    </Section>
  </Tab>

  <Tab label="Répétition Espacée">
    <Section title="Intervalles de Révision">
      <ArrayInput
        label="Intervalles (en jours)"
        value={settings.spaced_repetition.interval_multipliers}
        hint="Exemple: [1, 2, 4, 7, 14, 30, 60]"
      />

      <NumberInput
        label="Seuil de maîtrise (%)"
        value={settings.spaced_repetition.mastery_threshold}
        hint="Score requis pour considérer comme maîtrisé"
      />
    </Section>

    <Section title="Ajustements de Difficulté">
      <NumberInput
        label="Facile (multiplie intervalle)"
        value={settings.spaced_repetition.difficulty_adjustments.easy}
        step={0.1}
      />

      <NumberInput
        label="Difficile (réduit intervalle)"
        value={settings.spaced_repetition.difficulty_adjustments.hard}
        step={0.1}
      />
    </Section>
  </Tab>

  <Tab label="Devoirs Quotidiens">
    <Checkbox
      label="Activer les devoirs quotidiens"
      checked={settings.daily_assignments.enabled}
    />

    <NumberInput
      label="Nouveaux exercices max/jour"
      value={settings.daily_assignments.max_new_per_day}
      min={1}
      max={10}
    />

    <NumberInput
      label="Révisions max/jour"
      value={settings.daily_assignments.max_reviews_per_day}
      min={1}
      max={50}
    />
  </Tab>
</LearningPathEditor>
```

---

## 📈 Métriques et Analytics

### Dashboard Utilisateur

```typescript
interface UserDashboard {
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
    timestamp: timestamp;
  }>;

  // Progression learning paths
  active_paths: Array<{
    path_id: string;
    title: string;
    completion_percentage: number;
    chapters_completed: number;
    total_chapters: number;
    last_activity: timestamp;
  }>;

  // Statistiques
  stats: {
    total_exercises_completed: number;
    total_topics_read: number;
    total_time_spent_minutes: number;
    average_score: number;
    improvement_rate: number;  // % amélioration dernier mois
  };

  // Analytics d'erreurs
  error_analytics: ErrorAnalytics;

  // Classement (optionnel)
  leaderboard_position?: {
    global_rank: number;
    total_users: number;
    friends_rank: number;
  };
}
```

### Graphiques de Progression

```typescript
// Données pour graphiques
interface ProgressCharts {
  // XP au fil du temps
  xp_over_time: Array<{
    date: date;
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
    day_of_week: number;  // 0-6
    hour: number;         // 0-23
    activity_count: number;
  }>;

  // Taux de révision
  review_completion_rate: Array<{
    week: string;
    scheduled: number;
    completed: number;
    rate: number;  // %
  }>;
}
```

---

## 🎯 Plan d'Implémentation

### Phase 1 : Infrastructure de Base (2-3 semaines)
- [ ] Créer les tables de base de données
  - `user_progress`
  - `exercise_attempts`
  - `review_schedule`
  - `daily_assignments`
  - `learning_path_progress`
- [ ] Implémenter le système de calcul XP/Coins
- [ ] Créer le système de niveaux
- [ ] Développer l'algorithme de répétition espacée

### Phase 2 : Gamification (2 semaines)
- [ ] Système de récompenses par exercice
- [ ] Récompenses topics/chapitres/paths
- [ ] Système de séries (streaks)
- [ ] Badges et accomplissements
- [ ] Interface de progression utilisateur

### Phase 3 : Devoirs Quotidiens (2 semaines)
- [ ] Générateur de devoirs quotidiens
- [ ] Système de priorisation
- [ ] Page "Mes Devoirs"
- [ ] Notifications de rappel
- [ ] Historique des devoirs

### Phase 4 : Tracking & Analytics (1-2 semaines)
- [ ] Enregistrement détaillé des tentatives
- [ ] Analyse des erreurs
- [ ] Identification zones faibles
- [ ] Dashboard analytics utilisateur
- [ ] Graphiques de progression

### Phase 5 : Boutique (1-2 semaines)
- [ ] Catalogue d'articles
- [ ] Système d'inventaire
- [ ] Logique d'achat
- [ ] Power-ups actifs
- [ ] Interface boutique

### Phase 6 : Intégration Learning Paths (1 semaine)
- [ ] Paramètres éditeur learning path
- [ ] Configuration répétition espacée
- [ ] Configuration récompenses
- [ ] Tests et ajustements

### Phase 7 : UI/UX Polish (1 semaine)
- [ ] Menu utilisateur complet
- [ ] Animations et feedbacks
- [ ] Notifications toast
- [ ] Sons et effets (optionnel)
- [ ] Mode sombre

### Phase 8 : Tests & Optimisation (1 semaine)
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Optimisation performances
- [ ] Tests utilisateurs
- [ ] Ajustements basés sur feedback

---

## 🔑 Points Clés de Réussite

### 1. Équilibre Difficulté/Gratification
- Ne pas rendre l'apprentissage "trop facile"
- Récompenses proportionnelles à l'effort
- Challenge mental nécessaire pour apprentissage réel

### 2. Répétition Espacée Efficace
- Intervalles basés sur recherche scientifique
- Ajustements dynamiques selon performance
- Rappel actif (retrieval practice) privilégié

### 3. Engagement sans Frustration
- Devoirs gérables (pas trop par jour)
- Flexibilité dans les révisions
- Feedback positif et constructif

### 4. Gamification Motivante
- Progression visible et gratifiante
- Récompenses variées (XP, coins, badges)
- Séries encouragent la régularité
- Boutique offre personnalisation

### 5. Analytics Actionnables
- Données claires sur zones faibles
- Recommandations personnalisées
- Suivi de progression long terme

---

## 📚 Ressources et Références

### Théories d'Apprentissage
- **Courbe d'Oubli** (Ebbinghaus, 1885)
- **Répétition Espacée** (Pimsleur, Leitner)
- **Apprentissage Actif** (Bloom's Taxonomy)
- **Métacognition** (Flavell, 1979)

### Systèmes Existants
- **Duolingo** : Gamification, streaks, XP
- **Anki** : Algorithme SRS (SuperMemo 2)
- **WaniKani** : Niveaux, progression verrouillée
- **Memrise** : Mnémoniques, répétition espacée

### Recherches Citées
- Miguel Deera (Hyperpolyglotte) : Méthode des "îles linguistiques"
- ChatGPT Study Mode Analysis : Apprentissage actif vs passif
- Sciences cognitives : Retrieval practice, spacing effect

---

## 🎓 Conclusion

Ce système combine les meilleures pratiques de :
- **Science cognitive** (courbe d'oubli, répétition espacée)
- **Gamification** (récompenses, progression, achievement)
- **Pédagogie active** (métacognition, retrieval practice)
- **Design motivationnel** (streaks, défis, personnalisation)

**Objectif final** : Créer une plateforme où l'apprentissage est :
- ✅ Scientifiquement efficace
- ✅ Motivant et engageant
- ✅ Personnalisé et adaptatif
- ✅ Mesurable et traçable

**Philosophie** :
> "L'apprentissage efficace n'est pas facile, mais notre système rend le processus gratifiant, structuré et optimisé pour la rétention à long terme."
