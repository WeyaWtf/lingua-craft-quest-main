# 📚 Guide d'Utilisation - Système Complet

## ✅ Fonctionnalités Terminées

### 1. **Mon Apprentissage** (`/my-learning`)
Page principale pour gérer vos parcours inscrits:
- ✅ Vue d'ensemble avec statistiques (XP total, pièces, parcours actifs/terminés)
- ✅ Liste de tous vos parcours inscrits
- ✅ Barre de progression pour chaque parcours
- ✅ Statuts: Inscrit, En cours, Terminé, En pause
- ✅ Dernière activité affichée
- ✅ Bouton "Continuer" ou "Revoir"

### 2. **Mes Devoirs** (`/assignments`)
Devoirs quotidiens générés automatiquement:
- ✅ Devoir du jour avec progression en temps réel
- ✅ XP et pièces disponibles/gagnées
- ✅ Liste des nouveaux exercices
- ✅ Liste des révisions
- ✅ Historique des 30 derniers jours
- ✅ Auto-génération si parcours inscrit

### 3. **Inscription aux Parcours**
Sur chaque page de parcours:
- ✅ Bouton "S'inscrire à ce parcours"
- ✅ Badge "Inscrit" quand enrollé
- ✅ Stockage dans `user_learning_paths`
- ✅ Vérification automatique de l'inscription

### 4. **Structure des Parcours**
Affichage hiérarchique complet:
- ✅ Chapitres avec icône dossier
- ✅ Sous-chapitres dépliables
- ✅ Exercices (🎮) et Topics (📖)
- ✅ Navigation directe vers chaque élément
- ✅ Ordre identique à l'éditeur
- ✅ Fallback pour parcours simples

### 5. **Menu Utilisateur**
Menu déroulant complet avec 14 options:
- ✅ Mon apprentissage
- ✅ Mes devoirs
- ✅ Groupe d'apprentissage
- ✅ Notifications, Messages, Forum
- ✅ Paramètres, Paiements, Abonnements
- ✅ Crédits, Historique achats
- ✅ Profil, Aide et support

## 🚀 Comment Utiliser

### Flux Complet d'Utilisation:

#### 1. **Connexion**
```
1. Aller sur http://localhost:8081/signin
2. Se connecter avec email/password
3. OU créer un compte sur /signup
```

#### 2. **Inscription à un Parcours**
```
1. Aller sur "Parcours" dans la navigation
2. Choisir un parcours (ex: Birman - Les Fondamentaux)
3. Cliquer sur "S'inscrire à ce parcours"
4. Badge "Inscrit" apparaît
5. Structure du parcours s'affiche en dessous
```

#### 3. **Voir Mon Apprentissage**
```
1. Menu utilisateur > Mon apprentissage
2. Voir vos statistiques globales
3. Voir tous vos parcours inscrits
4. Cliquer sur un parcours pour continuer
```

#### 4. **Faire les Devoirs**
```
1. Menu utilisateur > Mes devoirs
2. Voir le devoir du jour
3. Compléter les exercices nouveaux
4. Faire les révisions
5. Suivre la progression en temps réel
```

#### 5. **Naviguer dans un Parcours**
```
1. Sur la page du parcours
2. Cliquer sur un chapitre pour le déplier
3. Voir les sous-chapitres et exercices
4. Cliquer sur un exercice/topic pour y accéder
5. Terminer et gagner XP/pièces
```

## 📊 Pages Disponibles

### Pages Principales:
- `/` - Accueil
- `/catalog` - Catalogue
- `/learning-paths` - Liste des parcours
- `/learning-path/:id` - Détail d'un parcours
- `/exercises` - Exercices
- `/creator` - Création de contenu

### Pages Utilisateur:
- ✅ `/my-learning` - Mon apprentissage
- ✅ `/assignments` - Mes devoirs
- ✅ `/test-gamification` - Test du système
- `/signin` - Connexion
- `/signup` - Inscription
- `/profile` - Profil (à implémenter)

### Pages à Implémenter:
- `/learning-groups` - Groupes
- `/notifications` - Notifications
- `/messages` - Messages
- `/forum` - Forum
- `/account-settings` - Paramètres
- `/payment-methods` - Paiements
- `/subscriptions` - Abonnements
- `/credits` - Crédits
- `/purchase-history` - Historique
- `/edit-profile` - Modifier profil
- `/help` - Aide

## 🎨 Composants Gamification

### Visibles dans Navigation (quand connecté):
- **LevelBadge** - Badge de niveau circulaire
- **CoinDisplay** - Affichage des pièces (or)
- **StreakIndicator** - Indicateur de série (feu)
- **XPProgress** - Barre de progression (uniquement test page)

### Couleurs Streak:
- 🔴 Rouge (< 7 jours)
- 🟠 Orange (7-13 jours)
- 🟠➡️🔴 Orange-Rouge (14-29 jours)
- 🟣 Violet (30+ jours)

## 💾 Tables Supabase

### Tables Gamification (appliquées):
1. ✅ `user_progress` - XP, niveau, coins, streaks
2. ✅ `exercise_attempts` - Historique tentatives
3. ✅ `review_schedule` - Planning révisions
4. ✅ `daily_assignments` - Devoirs quotidiens
5. ✅ `shop_items` - Boutique (9 items)
6. ✅ `user_inventory` - Inventaire
7. ✅ `active_powerups` - Power-ups actifs
8. ✅ `achievements` - Accomplissements (10)
9. ✅ `user_achievements` - Débloqués
10. ✅ `spaced_repetition_config` - Config SRS
11. ✅ `user_learning_paths` - Enrollment

### Tables Existantes:
- `exercises` - Exercices
- `topics` - Contenus théoriques
- (autres tables du système de base)

## 🔧 API / Hooks Disponibles

### Contexts:
```typescript
import { useUserProgress } from '@/contexts/UserProgressContext';
import { useRewards } from '@/hooks/useRewards';

// Dans un composant:
const { userProgress, addXP, addCoins, updateStreak } = useUserProgress();
const { recordExerciseAttempt } = useRewards();
```

### Fonctions Principales:
```typescript
// Ajouter XP
await addXP(50);

// Ajouter pièces
await addCoins(25);

// Mettre à jour série
await updateStreak(new Date());

// Enregistrer tentative exercice
await recordExerciseAttempt(
  exerciseId,
  'flashcard',
  difficulty: 2,
  score: 85,
  timeSpent: 120,
  errors: [],
  context: 'new'
);
```

## 🎯 Formules de Calcul

### Niveau:
```
level = floor((totalXP / 100) ^ (1/1.5)) + 1
```

### XP Requis:
```
xp_needed = 100 * (level ^ 1.5)
```

### Récompenses:
```
baseXP = 10 (par défaut)
contextMultiplier = {
  new: 1.0,
  review: 0.5,
  overdue: 1.5
}
streakMultiplier = streak >= 7 ? 1.2 : 1.0

xp = baseXP × difficulty × (score/100) × contextMultiplier × streakMultiplier
coins = baseCoins × difficulty × (perfect ? 1.5 : 1.0)
```

## 🧪 Test du Système

### 1. Tester Gamification:
```
1. Aller sur /test-gamification
2. Cliquer sur "Add 50 XP" plusieurs fois
3. Observer le niveau augmenter
4. Tester coins et streak
5. Simuler un exercice complet
```

### 2. Tester Enrollment:
```
1. Aller sur /learning-paths
2. Choisir "Birman - Les Fondamentaux"
3. S'inscrire
4. Vérifier badge "Inscrit"
5. Déplier les chapitres
6. Naviguer vers exercices
```

### 3. Tester Mon Apprentissage:
```
1. S'inscrire à 2-3 parcours différents
2. Aller sur /my-learning
3. Voir les statistiques globales
4. Voir tous les parcours inscrits
5. Continuer un parcours
```

### 4. Tester Devoirs:
```
1. Être inscrit à au moins 1 parcours
2. Aller sur /assignments
3. Voir le devoir du jour (auto-créé)
4. Historique visible
```

## 📝 Prochaines Étapes (Optionnel)

### Intégration Player:
- [ ] Intégrer `useRewards` dans Player.tsx
- [ ] Attribuer XP/coins après exercice
- [ ] Mettre à jour progression parcours
- [ ] Mettre à jour daily_assignments

### Génération Devoirs Intelligente:
- [ ] Utiliser `review_schedule` pour révisions
- [ ] Algorithme de répétition espacée
- [ ] Calculer XP/coins selon difficulté
- [ ] Génération automatique quotidienne (cron)

### Récompenses par Élément:
- [ ] Ajouter `xp_reward` dans PathCreator
- [ ] Permettre définir XP par chapitre/exercice
- [ ] Stocker dans `path.structure`
- [ ] Utiliser lors de la complétion

### Pages Manquantes:
- [ ] Groupes d'apprentissage
- [ ] Notifications système
- [ ] Messages privés
- [ ] Forum communautaire
- [ ] Boutique (shop_items déjà en DB)
- [ ] Profil utilisateur détaillé

## 🎉 Résumé des Routes

### ✅ Fonctionnelles:
- `/my-learning` - Mon apprentissage
- `/assignments` - Mes devoirs
- `/test-gamification` - Test système
- `/learning-path/:id` - Parcours (avec enrollment)
- `/signin` - Connexion
- `/signup` - Inscription

### 🚧 À Implémenter:
- `/learning-groups` - Groupes
- `/notifications` - Notifications
- `/messages` - Messages
- `/forum` - Forum
- `/account-settings` - Paramètres
- `/payment-methods` - Paiements
- `/subscriptions` - Abonnements
- `/credits` - Crédits
- `/purchase-history` - Historique
- `/profile` - Profil public
- `/edit-profile` - Modifier profil
- `/help` - Aide et support

---

**Serveur:** http://localhost:8081
**Date:** 5 Octobre 2025
**Version:** 1.0 - Gamification Complète
**Statut:** ✅ Prêt pour utilisation
