# 📚 Système de Devoirs/Tâches - Conception Complète

## 🎯 Vue d'Ensemble

Le système de devoirs permet aux créateurs de parcours de configurer des exercices qui seront assignés automatiquement aux apprenants selon un calendrier et des règles personnalisées.

---

## 📋 Fonctionnalités du Système

### 1. **Configuration par Exercice**

Chaque exercice/topic dans un parcours peut être configuré comme devoir avec :

#### A. **Planification Temporelle**
- **Fréquence de répétition** :
  - 🔄 Une seule fois (One-time)
  - 📅 Quotidien (Daily)
  - 📆 Tous les 2 jours (Every 2 days)
  - 📆 Tous les 3 jours (Every 3 days)
  - 📅 Hebdomadaire (Weekly - jour spécifique)
  - 📅 Bi-hebdomadaire (Bi-weekly)
  - 📅 Mensuel (Monthly - date spécifique)
  - 🔢 Personnalisé (Custom - tous les X jours)

- **Échéances** :
  - 📌 Date de début (Start date)
  - 📌 Date de fin (End date) - optionnelle
  - ⏰ Heure limite quotidienne (Daily deadline) - ex: 23h59
  - 📊 Durée estimée (Estimated duration) - en minutes
  - ⚠️ Délai de grâce (Grace period) - temps supplémentaire après échéance

#### B. **Critères de Réussite**
- **Précision requise** (Required accuracy) :
  - 🎯 0-100% - score minimum pour valider
  - Exemple: 80% = l'apprenant doit avoir au moins 80% de bonnes réponses

- **Nombre de répétitions** (Repetitions required) :
  - 🔁 1-10 fois - nombre de fois que l'exercice doit être complété
  - Exemple: 3 = l'exercice doit être fait 3 fois avant validation complète

- **Réussite consécutive** (Consecutive successes) :
  - ✅ Nombre de réussites d'affilée requises
  - Exemple: 2 = doit réussir 2 fois de suite sans échec

- **Score minimum** (Minimum score) :
  - 📊 Score absolu requis (ex: 45/50 points)

#### C. **Récompenses et Motivation**
- **XP Bonus** :
  - 💎 XP de base (Base XP) - ex: 50 XP
  - ⭐ XP bonus pour perfection (Perfect score bonus) - ex: +20 XP si 100%
  - 🏆 XP bonus pour avance (Early completion bonus) - ex: +10 XP si fait avant 50% du délai
  - ⏱️ XP bonus pour rapidité (Speed bonus) - basé sur temps de complétion

- **Pièces (Coins)** :
  - 🪙 Coins de base (Base coins) - ex: 25 coins
  - 💰 Coins bonus (similaires aux XP)

- **Badges et Récompenses** :
  - 🎖️ Badge spécial si complété (Custom badge)
  - 🎁 Item débloqué (Unlock reward) - ex: nouveau thème, avatar

#### D. **Difficulté Adaptative**
- **Ajustement automatique** :
  - 📈 Augmente la difficulté si >90% de réussite
  - 📉 Diminue la difficulté si <50% de réussite
  - 🔄 Nombre de tentatives avant ajustement

- **Variation du contenu** :
  - 🎲 Mélanger les questions (Shuffle questions)
  - 🔀 Ordre aléatoire (Random order)
  - 📝 Variations de difficulté (Easy/Medium/Hard variants)

#### E. **Notifications et Rappels**
- **Système de rappels** :
  - 🔔 Notification X heures avant échéance
  - 📧 Email de rappel (optionnel)
  - ⚡ Notification push (si disponible)
  - 💬 Rappel dans l'app

- **Fréquence des rappels** :
  - 1 fois (1 heure avant)
  - 2 fois (12h avant + 1h avant)
  - 3 fois (24h avant + 12h avant + 1h avant)

#### F. **Contraintes et Dépendances**
- **Prérequis** :
  - 🔒 Exercices précédents requis
  - 🎯 Score minimum dans exercice précédent
  - 📅 Disponible après X jours d'inscription

- **Ordre imposé** :
  - ✅ Doit faire dans l'ordre (Sequential)
  - 🔓 Libre accès (Open access)

- **Tentatives** :
  - 🔢 Nombre max de tentatives par jour
  - ⏸️ Temps d'attente entre tentatives
  - ♾️ Illimité

#### G. **Tracking et Statistiques**
- **Données collectées** :
  - 📊 Taux de complétion
  - ⏱️ Temps moyen de complétion
  - 🎯 Score moyen
  - 🔁 Nombre de tentatives
  - 📅 Dates de complétion
  - 🏆 Meilleur score
  - 📈 Progression dans le temps

#### H. **Pénalités et Conséquences**
- **Si non complété** :
  - ❌ Perte de streak (séquence)
  - 📉 Perte de XP (-X points)
  - 🔒 Verrouille exercices suivants
  - ⚠️ Avertissement seulement (Warning only)
  - 🚫 Aucune pénalité (No penalty)

- **Retard** :
  - ⏰ Pénalité progressive (-5 XP par heure de retard)
  - 📊 Affecte le score final (ex: max 80% si en retard)

#### I. **Groupes et Cohorts**
- **Assignment par groupe** :
  - 👥 Tous les apprenants (All learners)
  - 🎓 Groupe spécifique (Specific cohort)
  - 🌟 Niveau spécifique (Specific level range)
  - 📅 Date d'inscription (Enrollment date range)

---

## 🗂️ Structure de Données

### AssignmentConfig (Interface TypeScript)

```typescript
interface AssignmentConfig {
  // === ACTIVATION ===
  enabled: boolean;

  // === PLANIFICATION ===
  schedule: {
    frequency: 'once' | 'daily' | 'every_2_days' | 'every_3_days' | 'weekly' | 'biweekly' | 'monthly' | 'custom';
    customDays?: number; // Si frequency = 'custom'
    weekDay?: number; // 0-6 pour weekly
    monthDay?: number; // 1-31 pour monthly
    startDate: Date;
    endDate?: Date;
    dailyDeadline?: string; // "23:59"
    estimatedDuration: number; // minutes
    gracePeriod: number; // minutes
  };

  // === CRITÈRES DE RÉUSSITE ===
  completion: {
    requiredAccuracy: number; // 0-100
    repetitionsRequired: number;
    consecutiveSuccesses?: number;
    minimumScore?: number;
  };

  // === RÉCOMPENSES ===
  rewards: {
    baseXP: number;
    baseCoins: number;
    perfectScoreBonus: number; // XP
    earlyCompletionBonus: number; // XP
    speedBonus: {
      enabled: boolean;
      thresholdMinutes: number;
      bonusXP: number;
    };
    customBadge?: string;
    unlockReward?: string;
  };

  // === DIFFICULTÉ ADAPTATIVE ===
  adaptive: {
    enabled: boolean;
    increaseThreshold: number; // % success rate
    decreaseThreshold: number;
    attemptsBeforeAdjust: number;
  };

  // === VARIATION ===
  variation: {
    shuffleQuestions: boolean;
    randomOrder: boolean;
    difficultyVariants: boolean;
  };

  // === NOTIFICATIONS ===
  notifications: {
    enabled: boolean;
    reminderTimes: number[]; // hours before deadline
    emailEnabled: boolean;
    pushEnabled: boolean;
  };

  // === CONTRAINTES ===
  constraints: {
    prerequisites: string[]; // exercise IDs
    minimumPrereqScore?: number;
    availableAfterDays?: number;
    sequential: boolean;
    maxAttemptsPerDay?: number;
    waitTimeBetweenAttempts?: number; // minutes
  };

  // === PÉNALITÉS ===
  penalties: {
    onMissed: 'none' | 'warning' | 'lose_xp' | 'lose_streak' | 'lock_next';
    xpPenalty?: number;
    latePenaltyPerHour?: number;
    maxScoreIfLate?: number; // %
  };

  // === GROUPES ===
  targeting: {
    targetGroup: 'all' | 'cohort' | 'level' | 'enrollment_date';
    cohortId?: string;
    levelRange?: { min: number; max: number };
    enrollmentDateRange?: { start: Date; end: Date };
  };
}
```

---

## 🎨 Interface Utilisateur

### Page "Devoirs" dans PathEditor/PathCreator

#### Layout Principal
```
┌─────────────────────────────────────────────────────────┐
│ [Exercices] [Topics] [📋 Devoirs/Tâches]               │ ← Tabs
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 📚 Configuration des Devoirs                            │
│                                                           │
│ Sélectionnez un exercice pour configurer ses devoirs    │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🔍 Rechercher un exercice...                        │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [+] CH1: Introduction au Birman                     │ │
│ │     ├─ [⚙️] Burmese Alphabet Chart        [Actif]  │ │
│ │     ├─ [ ] Thai Flashcards              [Inactif]  │ │
│ │     └─ [+] CH1.1: Voyelles                          │ │
│ │            ├─ [⚙️] Burmese Vowels         [Actif]  │ │
│ │            └─ [ ] Practice Exercise     [Inactif]  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ [+ Configurer un nouveau devoir]                         │
└─────────────────────────────────────────────────────────┘
```

#### Dialogue de Configuration
```
┌──────────────────────────────────────────────────────────┐
│ ⚙️ Configuration du Devoir                               │
│ Exercise: "Burmese Alphabet Chart"                       │
├──────────────────────────────────────────────────────────┤
│                                                            │
│ [📅 Planification] [🎯 Réussite] [🎁 Récompenses]        │
│ [🔔 Notifications] [🔒 Contraintes] [⚠️ Pénalités]       │
│                                                            │
│ ─── PLANIFICATION ────────────────────────────────────    │
│                                                            │
│ ☑ Activer comme devoir                                    │
│                                                            │
│ Fréquence: [▼ Hebdomadaire ▼]                            │
│ Jour: [▼ Lundi ▼]                                         │
│                                                            │
│ Date de début: [📅 2025-10-08]                           │
│ Date de fin: [📅 2025-12-31] (optionnel)                 │
│                                                            │
│ Heure limite: [⏰ 23:59]                                  │
│ Durée estimée: [⏱️ 30] minutes                           │
│ Délai de grâce: [⏳ 60] minutes                          │
│                                                            │
│ ─── CRITÈRES DE RÉUSSITE ─────────────────────────────   │
│                                                            │
│ Précision requise: [━━━━━━━━──] 80%                      │
│ Répétitions: [3] fois                                     │
│ ☐ Réussites consécutives: [2]                            │
│                                                            │
│ ─── RÉCOMPENSES ──────────────────────────────────────   │
│                                                            │
│ XP de base: [💎 50]                                       │
│ Bonus perfection: [⭐ +20] XP                             │
│ Bonus rapidité: [⚡ +10] XP (si < 15 min)                │
│                                                            │
│ Coins de base: [🪙 25]                                    │
│                                                            │
│ ☐ Badge personnalisé: [🎖️ Maître Birman]                │
│                                                            │
│              [Annuler]  [Sauvegarder]                     │
└──────────────────────────────────────────────────────────┘
```

---

## 🗄️ Schéma Base de Données

### Table: `path_assignments`
```sql
CREATE TABLE path_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_path_id VARCHAR(255) NOT NULL,
  exercise_id VARCHAR(255) NOT NULL,
  exercise_type VARCHAR(20) NOT NULL, -- 'exercise' | 'topic'

  -- Configuration complète en JSONB
  config JSONB NOT NULL,

  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),

  UNIQUE(learning_path_id, exercise_id)
);
```

### Table: `user_assignments`
```sql
CREATE TABLE user_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  path_assignment_id UUID NOT NULL REFERENCES path_assignments(id),

  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'missed', 'late'

  -- Dates
  assigned_date TIMESTAMPTZ NOT NULL,
  due_date TIMESTAMPTZ NOT NULL,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- Progression
  attempts_count INTEGER DEFAULT 0,
  successful_attempts INTEGER DEFAULT 0,
  best_score INTEGER DEFAULT 0,
  current_repetition INTEGER DEFAULT 0,

  -- Récompenses obtenues
  xp_earned INTEGER DEFAULT 0,
  coins_earned INTEGER DEFAULT 0,

  -- Pénalités
  is_late BOOLEAN DEFAULT false,
  late_minutes INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, path_assignment_id, assigned_date)
);
```

---

## 🔄 Flux de Fonctionnement

### 1. Création d'un Devoir
1. Créateur ouvre PathEditor
2. Va dans l'onglet "Devoirs/Tâches"
3. Sélectionne un exercice
4. Configure tous les paramètres
5. Sauvegarde → INSERT dans `path_assignments`

### 2. Attribution Automatique
1. Cron job quotidien (ou temps réel)
2. Pour chaque parcours avec devoirs actifs:
   - Vérifie les apprenants inscrits
   - Calcule la prochaine date d'échéance
   - INSERT dans `user_assignments`
   - Envoie notifications

### 3. Complétion par l'Apprenant
1. Apprenant voit devoir dans "Mes Devoirs"
2. Clique et fait l'exercice
3. À la validation:
   - UPDATE `user_assignments` (status, attempts, score)
   - Vérifie critères de réussite
   - Calcule récompenses (XP/coins)
   - UPDATE `user_progress`
   - Si répétitions restantes: crée prochain assignment

### 4. Vérification des Échéances
1. Cron job horaire
2. Vérifie `user_assignments` où `due_date < NOW()`
3. Si pas complété: status = 'missed'
4. Applique pénalités selon config
5. Envoie notifications

---

## 🎯 Phases d'Implémentation

### Phase 1: UI et Navigation ✅
- [x] Ajouter onglet "Devoirs/Tâches" dans PathEditor
- [x] Ajouter onglet "Devoirs/Tâches" dans PathCreator
- [x] Créer liste des exercices configurables

### Phase 2: Formulaire de Configuration
- [ ] Interface Planification
- [ ] Interface Critères de Réussite
- [ ] Interface Récompenses
- [ ] Interface Notifications
- [ ] Interface Contraintes
- [ ] Interface Pénalités

### Phase 3: Backend et BDD
- [ ] Créer schéma Supabase
- [ ] API de sauvegarde des configs
- [ ] API de récupération des configs

### Phase 4: Attribution et Logique
- [ ] Système d'attribution automatique
- [ ] Calcul des échéances
- [ ] Vérification des prérequis

### Phase 5: Page "Mes Devoirs"
- [ ] Liste des devoirs actifs
- [ ] Calendrier des échéances
- [ ] Filtres et recherche

### Phase 6: Notifications
- [ ] Système de rappels
- [ ] Emails (optionnel)
- [ ] Push notifications (optionnel)

---

**Date**: 2025-10-06
**Version**: 1.0 - Conception initiale
