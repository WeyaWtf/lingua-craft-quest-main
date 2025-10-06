# Système de Progression des Parcours d'Apprentissage

## 📋 Vue d'ensemble

Un système complet de suivi de progression a été implémenté pour permettre aux utilisateurs de suivre leur avancement dans les parcours d'apprentissage. Chaque exercice complété est enregistré en base de données avec des statistiques détaillées.

## 🗄️ Schéma de Base de Données

### Table `user_exercise_progress`

Cette table stocke la progression de chaque utilisateur sur chaque exercice.

**Fichier:** `supabase-exercise-progress-schema.sql`

**Colonnes principales:**
- `user_id` - ID de l'utilisateur (lié à auth.users)
- `exercise_id` - ID de l'exercice
- `learning_path_id` - ID du parcours (peut être NULL si exercice fait hors parcours)
- `status` - Statut: 'not_started', 'in_progress', 'completed'
- `completed_at` - Date de complétion
- `attempts_count` - Nombre de tentatives
- `success_count` - Nombre de réussites
- `xp_earned` - XP gagnés
- `coins_earned` - Pièces gagnées
- `next_review_date` - Date de prochaine révision (pour répétition espacée)

**Index créés:**
- Par utilisateur
- Par exercice
- Par parcours
- Par statut
- Par date de révision

**Vue `user_progress_summary`:**
Vue SQL qui fournit un résumé de la progression par utilisateur et parcours.

## 🔧 Application du Schéma

**IMPORTANT:** Vous devez appliquer le schéma SQL dans Supabase avant d'utiliser le système.

### Étapes:

1. Ouvrez votre projet Supabase
2. Allez dans **SQL Editor**
3. Créez une nouvelle requête
4. Copiez tout le contenu de `supabase-exercise-progress-schema.sql`
5. Exécutez la requête
6. Vérifiez que la table `user_exercise_progress` est créée dans **Table Editor**

## ✨ Fonctionnalités Implémentées

### 1. Passage du Contexte de Parcours

**Fichier modifié:** `src/pages/LearningPathPlayer.tsx`

- Tous les liens vers les exercices incluent maintenant `?pathId={id}` dans l'URL
- Permet au Player de savoir que l'exercice est lancé depuis un parcours
- Navigation: `/player/exercise/{exerciseId}?pathId={pathId}`

### 2. Fonction de Complétion d'Exercice

**Fichier modifié:** `src/pages/Player.tsx`

**Fonction:** `handleCompleteExercise()`

**Fonctionnalités:**
- ✅ Sauvegarde la progression dans `user_exercise_progress`
- ✅ Met à jour le statut de l'exercice à 'completed'
- ✅ Incrémente les compteurs (attempts, success)
- ✅ Recalcule la progression du parcours
- ✅ Met à jour `user_learning_paths` avec le nouveau pourcentage
- ✅ Affiche un toast de succès
- ✅ Redirige vers le parcours après 1,5 secondes

**Gestion intelligente:**
- Si l'entrée existe déjà → mise à jour
- Si l'entrée n'existe pas → création
- Si `pathId` existe → mise à jour de la progression du parcours
- Calcul automatique du `completion_percentage`

### 3. Bouton "Valider" sur les Exercices

**Fichier modifié:** `src/components/BurmeseAlphabetPlayer.tsx`

- Ajout d'une prop `onComplete?: () => void`
- Bouton vert "Valider" avec icône CheckCircle
- Positionné à droite de "Afficher tout"
- Style: `bg-green-600 hover:bg-green-700`

**Connexion:**
- `BurmeseAlphabetPlayer` reçoit `onComplete={handleCompleteExercise}`
- Appuyer sur "Valider" déclenche la sauvegarde de la progression

### 4. Affichage des Exercices Complétés

**Fichier modifié:** `src/pages/LearningPathPlayer.tsx`

**Nouvelles fonctionnalités:**

- **Chargement de la progression:**
  - Fonction `loadCompletedExercises()` appelée au montage
  - Récupère tous les exercices avec `status='completed'`
  - Stocke les IDs dans un `Set<string>`

- **Indicateurs visuels:**
  - Icône verte ✅ (`CheckCircle2`) à côté des exercices complétés
  - Affichée pour tous les types d'exercices (dans chapitres, sous-chapitres, racine)

- **Calcul de progression:**
  - Utilise `completedExerciseIds.size` au lieu du context local
  - Barre de progression mise à jour en temps réel
  - Affichage: `X / Y exercices complétés`

## 📊 Flux de Données

```
1. Utilisateur ouvre un parcours
   └─> LearningPathPlayer charge les exercices complétés

2. Utilisateur clique sur un exercice
   └─> Navigation vers /player/exercise/{id}?pathId={pathId}

3. Utilisateur termine l'exercice et clique "Valider"
   └─> handleCompleteExercise() est appelé
       ├─> Sauvegarde dans user_exercise_progress
       ├─> Met à jour user_learning_paths
       ├─> Affiche toast de succès
       └─> Redirige vers le parcours

4. Retour au parcours
   └─> loadCompletedExercises() rafraîchit la liste
   └─> Icônes ✅ affichées sur les exercices terminés
   └─> Barre de progression mise à jour
```

## 🎯 Avantages du Système

### Pour l'Utilisateur:
- ✅ Suivi précis de la progression
- ✅ Visualisation claire des exercices complétés
- ✅ Motivation avec les pourcentages de complétion
- ✅ Historique des tentatives et réussites
- ✅ Système de répétition espacée (préparé pour l'avenir)

### Pour le Système:
- ✅ Données persistantes en base de données
- ✅ Statistiques détaillées par utilisateur
- ✅ Support multi-parcours
- ✅ Extensible (XP, coins, streaks)
- ✅ Vue SQL pour analyses rapides
- ✅ RLS activée pour la sécurité

## 🔮 Extensions Futures Possibles

Le schéma SQL est déjà préparé pour:
- **Système de répétition espacée** (`next_review_date`, `review_interval_days`, `ease_factor`)
- **Gamification avancée** (`xp_earned`, `coins_earned`)
- **Streaks** (`current_streak`, `best_streak`)
- **Scores** (`best_score`, `last_score`, `average_score`)
- **Statistiques détaillées** via la vue `user_progress_summary`

## 🐛 Dépannage

### L'exercice ne se marque pas comme complété

**Vérifications:**
1. Le schéma SQL est-il appliqué dans Supabase ?
2. L'utilisateur est-il connecté ?
3. Vérifiez les erreurs dans la console navigateur
4. Vérifiez que les RLS policies sont activées

### La barre de progression ne se met pas à jour

**Solutions:**
1. Rafraîchissez la page
2. Vérifiez que `loadCompletedExercises()` est appelé
3. Consultez la table `user_exercise_progress` dans Supabase

### Erreur "table does not exist"

**Solution:**
→ Appliquez le fichier `supabase-exercise-progress-schema.sql` dans SQL Editor

## 📝 Fichiers Modifiés

1. `supabase-exercise-progress-schema.sql` ✨ NOUVEAU
2. `src/pages/LearningPathPlayer.tsx` ✏️ MODIFIÉ
3. `src/pages/Player.tsx` ✏️ MODIFIÉ
4. `src/components/BurmeseAlphabetPlayer.tsx` ✏️ MODIFIÉ

## ✅ Prochaines Étapes

1. **Appliquer le schéma SQL** dans Supabase
2. **Tester la progression** en complétant quelques exercices
3. **Étendre le bouton "Valider"** à d'autres types d'exercices
4. **Implémenter la répétition espacée** pour les révisions
5. **Ajouter des statistiques** dans la page "Mon apprentissage"

---

**Auteur:** Assistant Claude
**Date:** 2025-10-06
**Version:** 1.0
