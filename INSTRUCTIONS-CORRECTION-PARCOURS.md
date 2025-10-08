# 🔧 Instructions pour Corriger l'Affichage des Parcours

## Problème identifié

Les parcours d'apprentissage (Thai LIST 1000 et MYR LIST 1000) existent dans la base de données mais ne sont visibles que lorsque vous êtes connecté. Le problème vient des politiques RLS (Row Level Security) dans Supabase qui bloquent l'accès public aux parcours.

## Solution permanente

### Étape 1 : Accéder à Supabase SQL Editor

1. Ouvrez votre projet Supabase : https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **SQL Editor** (dans le menu de gauche)

### Étape 2 : Appliquer le correctif RLS

1. Créez une nouvelle requête SQL
2. Copiez-collez le contenu du fichier **`supabase-learning-paths-schema-fix.sql`**
3. Cliquez sur **Run** (ou Ctrl+Enter)

Ce script va :
- ✅ Supprimer l'ancienne politique restrictive
- ✅ Créer une nouvelle politique permettant l'accès public aux parcours publiés
- ✅ Créer une politique séparée pour que les créateurs voient leurs propres parcours

### Étape 3 : Vérifier et corriger les parcours existants

1. Créez une nouvelle requête SQL
2. Copiez-collez le contenu du fichier **`supabase-learning-paths-verification.sql`**
3. Cliquez sur **Run** (ou Ctrl+Enter)

Ce script va :
- 🔍 Afficher l'état actuel de tous les parcours
- ✅ S'assurer que les 3 parcours LIST 1000 sont marqués comme publiés
- ✅ Vérifier que tout est correct

### Étape 4 : Tester

1. **Sans connexion :** Ouvrez votre application dans Edge (ou en navigation privée)
2. Allez sur la page **Parcours**
3. Vous devriez maintenant voir les 3 parcours :
   - 🇯🇵 **JAP LIST 1000 WORDS**
   - 🇲🇲 **MYR LIST 1000 WORDS**
   - 🇹🇭 **THAI LIST 1000 WORDS**

## Pourquoi ça marchait quand vous étiez connecté ?

L'ancienne politique RLS avait cette condition :
```sql
USING (is_published = true OR auth.uid() = created_by)
```

Quand vous étiez connecté et que vous étiez le créateur des parcours, la condition `auth.uid() = created_by` était vraie, donc vous pouviez voir les parcours.

Quand vous n'étiez pas connecté, `auth.uid()` était `NULL`, donc la condition devenait :
```sql
USING (is_published = true OR NULL = created_by)
```

Et comme `NULL = anything` retourne toujours `NULL` (et non `true`), seule la première partie `is_published = true` comptait, mais elle ne fonctionnait pas correctement à cause de l'opérateur `OR` mal géré avec `NULL`.

## Solution appliquée

La nouvelle politique est plus simple et explicite :
```sql
-- Pour tout le monde (connecté ou non)
CREATE POLICY "Public can view all published learning paths"
  ON learning_paths FOR SELECT
  USING (is_published = true);

-- Pour les créateurs uniquement
CREATE POLICY "Creators can view their own learning paths"
  ON learning_paths FOR SELECT
  USING (auth.uid() IS NOT NULL AND auth.uid() = created_by);
```

Maintenant, les deux politiques sont séparées et claires :
- ✅ Si un parcours est publié → visible par tous
- ✅ Si un utilisateur est le créateur → il voit tous ses parcours (publiés ou non)

## Garantie pour l'avenir

Avec cette correction :
- ✅ Tous les parcours marqués `is_published = true` seront visibles par tous
- ✅ Aucun nouveau parcours ne disparaîtra tant qu'il est publié
- ✅ Les créateurs peuvent toujours gérer leurs propres parcours non publiés

---

## 🆘 En cas de problème

Si après avoir appliqué les scripts, les parcours ne sont toujours pas visibles :

1. Vérifiez dans le SQL Editor que les politiques ont bien été créées :
```sql
SELECT * FROM pg_policies WHERE tablename = 'learning_paths';
```

2. Vérifiez que les parcours sont bien marqués comme publiés :
```sql
SELECT id, title, is_published FROM learning_paths;
```

3. Si `is_published` est `false`, mettez-le à `true` manuellement :
```sql
UPDATE learning_paths SET is_published = true WHERE id = 'path-myr-list-1000-words';
UPDATE learning_paths SET is_published = true WHERE id = 'path-thai-list-1000-words';
