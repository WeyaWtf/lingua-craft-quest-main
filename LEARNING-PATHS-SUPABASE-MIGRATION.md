# Migration des Parcours d'Apprentissage vers Supabase

## 🎯 Problème Résolu

**Avant:** Les parcours d'apprentissage étaient stockés dans le `localStorage` du navigateur
- ❌ Données perdues à chaque rafraîchissement
- ❌ Spécifique à chaque navigateur
- ❌ Impossible de partager entre utilisateurs

**Après:** Les parcours sont stockés dans Supabase
- ✅ Persistance permanente
- ✅ Accessibles depuis n'importe quel appareil
- ✅ Partagés entre tous les utilisateurs
- ✅ Sauvegarde automatique

## 📦 Fichiers Créés/Modifiés

### 1. Nouveau Schéma SQL
**Fichier:** `supabase-learning-paths-schema.sql`

**Table créée:** `learning_paths`

**Colonnes principales:**
- `id` - Identifiant unique (généré depuis le titre)
- `title`, `description`, `language`, `difficulty`
- `estimated_time` - Temps estimé
- `icon`, `color` - Personnalisation visuelle
- `structure` - JSON contenant chapitres/sous-chapitres/exercices
- `exercise_ids` - Liste des IDs d'exercices
- `is_published` - Publié ou brouillon
- `created_by` - Auteur du parcours
- `rating` - Note du parcours

**Vue créée:** `learning_paths_stats`
- Statistiques d'enrollment et de complétion

### 2. Context Modifié
**Fichier:** `src/contexts/LearningPathContext.tsx`

**Changements majeurs:**
- ✅ Import de `supabase` depuis `@/lib/supabase`
- ✅ Chargement des parcours depuis Supabase au montage
- ✅ Fonction `addLearningPath` asynchrone avec sauvegarde DB
- ✅ Fonction `updateLearningPath` asynchrone avec mise à jour DB
- ✅ Fonction `deleteLearningPath` asynchrone avec suppression DB
- ✅ Nouvelle fonction `refreshPaths()` pour recharger depuis DB
- ✅ State `loading` pour afficher l'état de chargement
- ✅ Toast de succès/erreur pour chaque opération

## 🚀 Étapes d'Application

### Étape 1: Appliquer le Schéma SQL

**IMPORTANT:** Vous devez d'abord créer la table dans Supabase

1. Ouvrez votre projet Supabase
2. Allez dans **SQL Editor**
3. Créez une nouvelle requête
4. Copiez tout le contenu de `supabase-learning-paths-schema.sql`
5. Cliquez sur **RUN** pour exécuter
6. Vérifiez dans **Table Editor** que `learning_paths` apparaît

### Étape 2: Appliquer le Schéma de Progression

**Si ce n'est pas déjà fait:**

1. Appliquez aussi `supabase-exercise-progress-schema.sql`
2. Appliquez aussi `supabase-enrollment-schema.sql`

Ces trois tables travaillent ensemble :
- `learning_paths` → Les parcours
- `user_learning_paths` → Les inscriptions des utilisateurs
- `user_exercise_progress` → La progression sur chaque exercice

### Étape 3: Tester

1. **Rafraîchissez la page** (F5)
2. Les parcours se chargent maintenant depuis Supabase
3. Créez un nouveau parcours → il sera sauvegardé
4. Rafraîchissez → le parcours est toujours là ! ✅

## 🔄 Flux de Données

```
┌─────────────────────┐
│   Application se    │
│    lance            │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ loadPathsFromSupabase│
│ charge tous les     │
│ parcours publiés    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Affichage dans      │
│ l'interface         │
└─────────────────────┘

┌─────────────────────┐
│ Utilisateur crée    │
│ un parcours         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ addLearningPath()   │
│ sauvegarde dans DB  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Toast de succès     │
│ Parcours visible    │
└─────────────────────┘
```

## 🔐 Sécurité (RLS)

Les Row Level Security policies sont configurées :

**Lecture:**
- ✅ Tout le monde peut voir les parcours `is_published = true`
- ✅ Auteur peut voir ses propres brouillons

**Création:**
- ✅ Utilisateurs authentifiés seulement
- ✅ Doit être l'auteur (`created_by = user.id`)

**Modification/Suppression:**
- ✅ Auteur seulement

## 📊 Avantages du Nouveau Système

### Pour les Créateurs
- ✅ Les parcours créés sont sauvegardés de façon permanente
- ✅ Possibilité de créer des brouillons (is_published = false)
- ✅ Édition de parcours existants
- ✅ Statistiques sur les enrollments

### Pour les Apprenants
- ✅ Accès aux parcours depuis n'importe quel appareil
- ✅ Progression sauvegardée
- ✅ Nouveaux parcours visibles immédiatement

### Pour le Système
- ✅ Base de données centralisée
- ✅ Backup automatique (Supabase)
- ✅ Scalabilité
- ✅ Possibilité d'ajouter des fonctionnalités (commentaires, partage, etc.)

## 🔮 Fonctionnalités Futures Possibles

Le schéma est prêt pour :
- **Système de notation** (rating déjà présent)
- **Parcours officiels vs communautaires** (`is_official`)
- **Statistiques détaillées** (vue `learning_paths_stats`)
- **Tracking d'enrollments** (`total_enrollments`)
- **Parcours privés/publics** (`is_published`)
- **Versionning** (via `updated_at`)

## 🐛 Dépannage

### Les parcours n'apparaissent pas

**Vérifications:**
1. Le schéma SQL est-il appliqué ?
2. Y a-t-il des parcours avec `is_published = true` dans la DB ?
3. Regardez la console navigateur pour les erreurs
4. Vérifiez que Supabase est connecté (`supabase.auth.getSession()`)

### Erreur "table does not exist"

**Solution:**
→ Appliquez `supabase-learning-paths-schema.sql` dans SQL Editor

### Les modifications ne se sauvent pas

**Solutions:**
1. Vérifiez que vous êtes connecté
2. Vérifiez que vous êtes l'auteur du parcours
3. Consultez les RLS policies dans Supabase
4. Regardez les erreurs dans la console

### Le loading est infini

**Solutions:**
1. Vérifiez la connexion à Supabase
2. Vérifiez que la table existe
3. Regardez les erreurs réseau dans DevTools

## 📝 Exemples de Code

### Créer un Parcours

```typescript
const { addLearningPath } = useLearningPaths();

const newPath = await addLearningPath({
  title: "Mon Nouveau Parcours",
  description: "Description...",
  language: "Japonais",
  difficulty: 2,
  estimatedTime: "4 heures",
  exerciseIds: ["ex-1", "ex-2"],
  structure: [...],
  icon: "🇯🇵",
  color: "from-pink-500 to-purple-500",
  authorId: "user-id",
  isPublished: true,
  rating: 5.0
});
```

### Mettre à Jour un Parcours

```typescript
const { updateLearningPath } = useLearningPaths();

await updateLearningPath("path-id", {
  title: "Nouveau Titre",
  difficulty: 3,
  structure: [...] // Nouvelle structure
});
```

### Supprimer un Parcours

```typescript
const { deleteLearningPath } = useLearningPaths();

await deleteLearningPath("path-id");
```

## ✅ Checklist de Migration

- [ ] Appliquer `supabase-learning-paths-schema.sql`
- [ ] Appliquer `supabase-enrollment-schema.sql`
- [ ] Appliquer `supabase-exercise-progress-schema.sql`
- [ ] Rafraîchir l'application
- [ ] Vérifier le chargement des parcours
- [ ] Créer un parcours de test
- [ ] Vérifier qu'il persiste après rafraîchissement
- [ ] Éditer le parcours de test
- [ ] Supprimer le parcours de test

---

**Date:** 2025-10-06
**Version:** 2.0 - Migration Supabase
**Auteur:** Assistant Claude
