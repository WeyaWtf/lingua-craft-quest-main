# 🎮 Système de Gamification - Documentation Technique

**Version**: 1.0
**Date**: 2025-01-05
**Statut**: Configuration et schémas créés (Phase A complétée)

---

## 📦 Fichiers Créés (Option A)

### 1. Schéma SQL - Supabase
**Fichier**: `supabase-gamification-schema.sql`

**Tables créées** :
- ✅ `user_progress` - Progression globale (XP, niveau, coins, streaks)
- ✅ `exercise_attempts` - Historique des tentatives
- ✅ `review_schedule` - Planning de révisions (SRS)
- ✅ `daily_assignments` - Devoirs quotidiens
- ✅ `learning_path_progress` - Progression dans les paths
- ✅ `shop_items` - Articles de la boutique
- ✅ `user_inventory` - Inventaire utilisateur
- ✅ `active_powerups` - Power-ups actifs
- ✅ `achievements` - Accomplissements/badges
- ✅ `user_achievements` - Achievements débloqués
- ✅ `spaced_repetition_config` - Configuration SR par path

**Fonctionnalités** :
- Triggers automatiques (updated_at, niveau auto-calculé)
- Fonctions SQL utilitaires
- Row Level Security (RLS) configuré
- Indexes pour performances
- Données initiales (achievements, shop items, config SR)

### 2. Types TypeScript
**Fichier**: `src/types/gamification.ts`

**Types principaux** :
- `UserProgress` - Profil utilisateur gamifié
- `ExerciseAttempt` - Tentative d'exercice
- `ReviewSchedule` - Planning de révision
- `DailyAssignment` - Devoirs du jour
- `LearningPathProgress` - Progression path
- `ShopItem` / `UserInventory` - Boutique
- `Achievement` / `UserAchievement` - Accomplissements
- `SpacedRepetitionConfig` - Configuration SR
- Plus de 30 types et interfaces

### 3. Configuration Répétition Espacée
**Fichier**: `src/config/spacedRepetition.ts`

**Presets disponibles** :
- `DEFAULT` - Équilibré (1, 2, 4, 7, 14, 30, 60 jours)
- `INTENSIVE` - Apprentissage rapide
- `RELAXED` - Long terme
- `BEGINNER` - Support renforcé
- `EXPERT` - Progression rapide

**Fonctions** :
- `validateSRConfig()` - Validation configuration
- `createCustomConfig()` - Config personnalisée
- `estimateDaysToMastery()` - Estimation durée
- `getNextInterval()` - Prochain intervalle

### 4. Utilitaires de Calcul
**Fichier**: `src/utils/gamification.ts`

**Fonctions de calcul** :

**Niveaux et XP** :
- `calculateLevel(totalXP)` - Calcul niveau
- `xpForNextLevel(level)` - XP requis
- `getLevelProgress(totalXP)` - Progression détaillée

**Récompenses** :
- `calculateExerciseRewards()` - XP/coins exercice
- `calculateTopicReadXP()` - XP lecture topic
- `calculateChapterRewards()` - Complétion chapitre
- `calculatePathRewards()` - Complétion path

**Streaks** :
- `updateStreak()` - Mise à jour série
- Détection jalons (7, 14, 30, 60, 90, 180, 365 jours)
- Support streak freeze

**Répétition Espacée** :
- `calculateNextReview()` - Algorithme complet
- `isOverdue()` / `daysOverdue()` - Vérification retards

**Utilitaires UI** :
- `formatNumber()` - Format lisible (1k, 1M)
- `formatPercentage()` / `formatDuration()`
- `getScoreColor()` - Couleur selon score
- `getMasteryEmoji()` - Emoji selon maîtrise

---

## 🔧 Installation et Déploiement

### Étape 1 : Appliquer le Schéma SQL

**Option 1 : Via Supabase Dashboard**
1. Aller sur https://app.supabase.com
2. Sélectionner votre projet
3. SQL Editor → New Query
4. Copier-coller le contenu de `supabase-gamification-schema.sql`
5. Run (Exécuter)

**Option 2 : Via CLI Supabase**
```bash
supabase db push --local
# ou pour production
supabase db push
```

**⚠️ IMPORTANT** : Créer un backup AVANT d'appliquer le schéma !

### Étape 2 : Vérifier les Tables

```sql
-- Vérifier que toutes les tables sont créées
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE '%progress%'
   OR table_name LIKE '%achievement%'
   OR table_name LIKE '%shop%';
```

### Étape 3 : Tester les Fonctions SQL

```sql
-- Tester calcul de niveau
SELECT calculate_level(0);    -- Devrait retourner 1
SELECT calculate_level(100);  -- Devrait retourner 2
SELECT calculate_level(1000); -- Devrait retourner ~5

-- Tester XP requis
SELECT xp_for_next_level(1);  -- Devrait retourner ~283
SELECT xp_for_next_level(5);  -- Devrait retourner ~908
```

---

## 📊 Utilisation des Utilitaires

### Exemple 1 : Calculer Récompenses Exercice

```typescript
import { calculateExerciseRewards } from '@/utils/gamification';

const rewards = calculateExerciseRewards(
  'flashcard',  // Type
  2,            // Difficulté (1-5)
  85,           // Score (0-100)
  'new',        // Contexte
  10            // Streak actuel
);

console.log(rewards);
// {
//   context: 'new',
//   xp: 20,
//   coins: 10,
//   multipliers: { ... }
// }
```

### Exemple 2 : Progression Niveau

```typescript
import { getLevelProgress } from '@/utils/gamification';

const progress = getLevelProgress(1250);

console.log(progress);
// {
//   current_level: 5,
//   xp_current_level: 559,
//   xp_next_level: 908,
//   xp_in_current_level: 691,
//   xp_needed_for_level: 349,
//   progress_percentage: 198%
// }
```

### Exemple 3 : Calcul Prochaine Révision

```typescript
import { calculateNextReview } from '@/utils/gamification';
import { DEFAULT_SPACED_REPETITION_CONFIG } from '@/config/spacedRepetition';

const attempt: ExerciseAttempt = {
  score: 90,
  // ... autres champs
};

const currentSchedule: ReviewSchedule = {
  interval_days: 2,
  repetitions: 1,
  // ... autres champs
};

const newSchedule = calculateNextReview(
  attempt,
  currentSchedule,
  DEFAULT_SPACED_REPETITION_CONFIG
);

console.log(newSchedule.next_review_date); // Date dans 4 jours
console.log(newSchedule.mastery_level);     // 'reviewing'
```

---

## 🎯 Prochaines Étapes (Phase B)

### À Implémenter

**1. Contextes React** :
- [ ] `UserProgressContext` - Gestion état utilisateur
- [ ] `GamificationContext` - État global gamification
- [ ] Hooks personnalisés (`useUserProgress`, `useRewards`, etc.)

**2. Composants UI** :
- [ ] `<LevelBadge />` - Affichage niveau
- [ ] `<XPProgress />` - Barre de progression XP
- [ ] `<CoinDisplay />` - Affichage pièces
- [ ] `<StreakIndicator />` - Indicateur série
- [ ] `<RewardToast />` - Toast de récompense

**3. Pages** :
- [ ] `/profile` - Profil utilisateur
- [ ] `/assignments` - Mes devoirs
- [ ] `/shop` - Boutique
- [ ] `/achievements` - Accomplissements
- [ ] `/leaderboard` - Classement (optionnel)

**4. Intégration Exercices** :
- [ ] Enregistrer tentatives dans `exercise_attempts`
- [ ] Calculer et attribuer XP/coins
- [ ] Créer/mettre à jour `review_schedule`
- [ ] Afficher récompenses après exercice

**5. Système de Devoirs** :
- [ ] Générateur de devoirs quotidiens (cron job)
- [ ] Logique de priorisation
- [ ] Notifications de rappel
- [ ] Interface de suivi

---

## 📚 Ressources

### Documentation Référence
- `mrkdwn/gamification-learning-system.md` - Spécifications complètes
- `supabase-gamification-schema.sql` - Schéma base de données
- `src/types/gamification.ts` - Types TypeScript

### Algorithmes Implémentés
- **Courbe d'Oubli** (Ebbinghaus)
- **Répétition Espacée** (Leitner/SuperMemo)
- **Calcul Niveau** (Formule exponentielle)
- **Système de Streaks** (avec freeze support)

### Configuration
- 5 presets de répétition espacée
- 10 achievements par défaut
- 9 articles de boutique initiaux
- Formules de calcul XP/coins optimisées

---

## 🔒 Sécurité

### Row Level Security (RLS)

Toutes les tables ont RLS activé avec policies :

**Lecture** :
- Utilisateurs voient uniquement leurs propres données
- Shop items et achievements sont publics

**Écriture** :
- Utilisateurs peuvent modifier uniquement leurs données
- Pas d'accès admin pour l'instant

### Validation

- Contraintes SQL (CHECK) sur valeurs
- Validation TypeScript côté client
- Fonctions de validation configurables

---

## 📈 Performance

### Indexes Créés

Toutes les tables ont indexes sur :
- `user_id` (accès utilisateur rapide)
- Colonnes de tri (`total_xp DESC`, `level DESC`)
- Colonnes de filtrage (`next_review_date`, `completed`)
- Indexes composites pour requêtes communes

### Optimisations

- Fonctions SQL immutables (mise en cache)
- JSONB pour données flexibles (errors, metadata)
- Triggers pour calculs automatiques
- Pagination recommandée pour listes longues

---

## 🧪 Tests Recommandés

### Tests Unitaires

```typescript
// Exemple test
import { calculateLevel } from '@/utils/gamification';

describe('calculateLevel', () => {
  it('should return 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it('should return correct level for 1000 XP', () => {
    expect(calculateLevel(1000)).toBe(5);
  });
});
```

### Tests d'Intégration

1. Créer utilisateur test
2. Compléter exercice
3. Vérifier XP/coins ajoutés
4. Vérifier niveau mis à jour
5. Vérifier review_schedule créé

---

## 🐛 Debugging

### Vérifier Données Utilisateur

```sql
-- Progression utilisateur
SELECT * FROM user_progress WHERE user_id = 'xxx';

-- Tentatives récentes
SELECT * FROM exercise_attempts
WHERE user_id = 'xxx'
ORDER BY completed_at DESC
LIMIT 10;

-- Révisions à venir
SELECT * FROM review_schedule
WHERE user_id = 'xxx'
AND next_review_date <= NOW() + INTERVAL '7 days'
ORDER BY next_review_date;
```

### Logs Utiles

```typescript
console.log('User Progress:', userProgress);
console.log('Level Progress:', levelProgress);
console.log('Rewards:', calculateExerciseRewards(...));
```

---

## 🎨 Design System

### Couleurs Recommandées

```css
/* XP/Niveau */
--xp-primary: #3b82f6;     /* Bleu */
--xp-secondary: #60a5fa;

/* Coins */
--coin-gold: #f59e0b;      /* Or */
--coin-shine: #fbbf24;

/* Streaks */
--streak-fire: #ef4444;    /* Rouge/Orange */
--streak-active: #f97316;

/* Mastery Levels */
--mastery-new: #6b7280;    /* Gris */
--mastery-learning: #3b82f6;  /* Bleu */
--mastery-reviewing: #f59e0b; /* Orange */
--mastery-mastered: #10b981;  /* Vert */
```

### Icons Recommandés

- 🏆 Niveau/Achievements
- 💰 Coins
- ⚡ XP
- 🔥 Streak
- 📚 Learning
- ✅ Mastered
- 🎯 Target/Goal

---

## 📝 Notes Importantes

### Formule Niveau

La formule `level = floor((xp / 100) ^ (1/1.5)) + 1` a été choisie pour :
- Progression initiale rapide (engagement)
- Ralentissement progressif (rétention)
- Paliers psychologiques cohérents

### Intervalles SR

La séquence `[1, 2, 4, 7, 14, 30, 60]` est basée sur :
- Recherches d'Ebbinghaus
- Optimisation Anki/SuperMemo
- Adaptée pour apprentissage langues

### Multiplicateurs

- `easy_multiplier: 1.5` - Encourage progression
- `hard_multiplier: 0.7` - Mais pas trop punitive
- Équilibre testé empiriquement

---

## 🚀 Roadmap

### v1.0 (Actuel)
- [x] Schéma SQL complet
- [x] Types TypeScript
- [x] Utilitaires de calcul
- [x] Configuration SR
- [ ] Contextes React
- [ ] Composants UI de base

### v1.1 (Future)
- [ ] Dashboard analytics complet
- [ ] Graphiques progression
- [ ] Classements / Leaderboards
- [ ] Social features
- [ ] Notifications push

### v2.0 (Avenir)
- [ ] Machine Learning pour SR personnalisé
- [ ] Recommendations intelligentes
- [ ] Gamification avancée
- [ ] Multiplayer challenges

---

## 🤝 Contribution

Ce système est conçu pour être :
- **Modulaire** - Facile à étendre
- **Configurable** - Presets et custom configs
- **Scalable** - Optimisé pour croissance
- **Testable** - Fonctions pures, isolated

---

## 📞 Support

Pour questions ou problèmes :
1. Vérifier cette documentation
2. Consulter `gamification-learning-system.md`
3. Vérifier les types TypeScript
4. Tester les fonctions utilitaires

---

**Créé le** : 2025-01-05
**Dernière mise à jour** : 2025-01-05
**Version** : 1.0.0
**Auteur** : Claude Code + User

---

## ✅ Checklist de Déploiement

Avant de passer en production :

- [ ] Backup base de données créé
- [ ] Schéma SQL testé en local
- [ ] RLS policies validées
- [ ] Types TypeScript sans erreurs
- [ ] Fonctions utilitaires testées
- [ ] Configuration SR validée
- [ ] Documentation à jour
- [ ] Git tag créé (`v1.0-gamification`)

**Statut actuel** : ✅ Phase A (Configuration) COMPLÉTÉE
**Prochaine étape** : Phase B (Implémentation React)
