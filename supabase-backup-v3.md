# 📦 Supabase Backup V3 - Guide de Sauvegarde

**Date**: 2025-01-XX
**Version**: V3
**Commit**: fbfb8ed

## 🎯 Méthodes de Sauvegarde

### 1️⃣ Sauvegarde via Supabase Dashboard (Recommandé)

#### A. Export de la base de données complète

1. Accédez au **Supabase Dashboard** : https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **Database** → **Backups**
4. Cliquez sur **Download** pour télécharger la sauvegarde la plus récente

#### B. Export du schéma SQL

1. Allez dans **SQL Editor**
2. Créez une nouvelle query
3. Copiez et exécutez ce script :

```sql
-- Export complete schema
SELECT
  tablename,
  schemaname,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

4. Pour chaque table importante, exportez les données :

```sql
-- Export exercises
COPY (SELECT * FROM exercises) TO STDOUT WITH CSV HEADER;

-- Export learning_paths
COPY (SELECT * FROM learning_paths) TO STDOUT WITH CSV HEADER;

-- Export topics
COPY (SELECT * FROM topics) TO STDOUT WITH CSV HEADER;

-- Export users (si nécessaire)
COPY (SELECT * FROM users) TO STDOUT WITH CSV HEADER;
```

#### C. Sauvegarde du schéma complet

```sql
-- Get full schema
SELECT
  'CREATE TABLE ' || tablename || ' (' ||
  string_agg(column_name || ' ' || data_type, ', ') || ');'
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY tablename;
```

### 2️⃣ Sauvegarde via CLI (Avancé)

#### Installation de Supabase CLI

```bash
npm install -g supabase
```

#### Login

```bash
supabase login
```

#### Export de la base de données

```bash
# Export du schéma
supabase db dump -f supabase-schema-v3.sql --schema public

# Export des données
supabase db dump -f supabase-data-v3.sql --data-only

# Export complet (schéma + données)
supabase db dump -f supabase-full-backup-v3.sql
```

### 3️⃣ Sauvegarde manuelle via SQL

Créez un fichier `backup-queries-v3.sql` avec ces commandes :

```sql
-- ========================================
-- SUPABASE BACKUP V3 - FULL EXPORT
-- ========================================

-- 1. Export du schéma des tables principales
-- exercises table
SELECT * FROM exercises ORDER BY created_at DESC;

-- learning_paths table
SELECT * FROM learning_paths ORDER BY created_at DESC;

-- topics table
SELECT * FROM topics ORDER BY created_at DESC;

-- user_progress table
SELECT * FROM user_progress ORDER BY updated_at DESC;

-- 2. Statistiques
SELECT
  'exercises' as table_name,
  COUNT(*) as count,
  pg_size_pretty(pg_total_relation_size('exercises')) as size
FROM exercises
UNION ALL
SELECT
  'learning_paths',
  COUNT(*),
  pg_size_pretty(pg_total_relation_size('learning_paths'))
FROM learning_paths
UNION ALL
SELECT
  'topics',
  COUNT(*),
  pg_size_pretty(pg_total_relation_size('topics'))
FROM topics;

-- 3. Learning Paths avec structure
SELECT
  id,
  title,
  language,
  jsonb_array_length(structure) as chapter_count,
  created_at
FROM learning_paths
ORDER BY title;

-- 4. Exercices par langue
SELECT
  language,
  type,
  COUNT(*) as count
FROM exercises
GROUP BY language, type
ORDER BY language, count DESC;
```

## 📊 État Actuel de la Base (V3)

### Tables Principales

| Table | Description | Données Critiques |
|-------|-------------|-------------------|
| `exercises` | Tous les exercices (flashcards, quiz, etc.) | ✅ Critique |
| `learning_paths` | Parcours d'apprentissage avec structure | ✅ Critique |
| `topics` | Topics regroupant parcours et exercices | ✅ Critique |
| `user_progress` | Progression des utilisateurs | ⚠️ Important |
| `users` | Comptes utilisateurs | ⚠️ Important |

### Langues Supportées

- 🇯🇵 **Japonais** : JAP LIST 1000 WORDS (40 bundles)
- 🇲🇲 **Birman** : MYR LIST 1000 WORDS (40 bundles)
- 🇹🇭 **Thaï** : THA LIST 1000 WORDS (40 bundles)
- 🇰🇷 **Coréen** : KOR LIST 1000 WORDS (40 bundles)

## 🔄 Restauration depuis Backup

### Via Supabase Dashboard

1. Allez dans **Database** → **Backups**
2. Cliquez sur **Restore** à côté de la sauvegarde souhaitée
3. Confirmez la restauration

### Via CLI

```bash
# Restaurer le schéma
supabase db reset

# Restaurer depuis un fichier SQL
psql -h [YOUR_HOST] -U postgres -d postgres -f supabase-full-backup-v3.sql
```

### Via SQL Editor

1. Ouvrez le fichier de sauvegarde SQL
2. Copiez le contenu dans **SQL Editor**
3. Exécutez le script

## 📁 Structure des Fichiers de Backup

```
backups/
├── v3/
│   ├── github/
│   │   └── commit-fbfb8ed.txt
│   ├── supabase/
│   │   ├── schema-v3.sql
│   │   ├── data-v3.sql
│   │   ├── full-backup-v3.sql
│   │   └── learning-paths-structure.json
│   └── documentation/
│       ├── CHANGELOG-V3.md
│       └── README-V3.md
```

## 🚀 Scripts de Restauration Automatique

### Restaurer les Learning Paths

URL: `/fix-learning-paths`

```typescript
// Restaure automatiquement la structure hiérarchique
// de tous les parcours d'apprentissage
```

### Peupler les Parcours

URL: `/setup-all-learning-paths`

```typescript
// Crée ou met à jour tous les parcours
// avec leurs exercices assignés automatiquement
```

## ⚠️ Checklist de Backup

- [x] Code source GitHub committé (fbfb8ed)
- [x] Code source pushé sur origin/main
- [ ] Schéma Supabase exporté
- [ ] Données Supabase exportées
- [ ] Learning paths structure sauvegardée (JSON)
- [ ] Documentation backup créée
- [ ] Test de restauration effectué

## 📞 Commandes Utiles

### Vérifier l'état des Learning Paths

```bash
# Via l'application
Navigate to: /check-learning-path-ids
```

### Statistiques de la base

```sql
-- Nombre total d'exercices
SELECT COUNT(*) FROM exercises;

-- Nombre de parcours
SELECT COUNT(*) FROM learning_paths;

-- Exercices par langue
SELECT language, COUNT(*) FROM exercises GROUP BY language;

-- Taille de la base
SELECT
  pg_size_pretty(pg_database_size(current_database())) as db_size;
```

## 🔐 Sécurité

- ⚠️ **Ne jamais committer** les credentials Supabase
- ⚠️ **Ne jamais pusher** les fichiers de backup avec données utilisateurs
- ✅ Utiliser `.gitignore` pour exclure les backups sensibles
- ✅ Chiffrer les backups contenant des données personnelles

## 📝 Notes Importantes

1. Les **Learning Paths** utilisent des IDs spécifiques :
   - `path-jap-list-1000-words`
   - `path-myr-list-1000-words`
   - `path-thai-list-1000-words`
   - `path-korean-list-1000-words`

2. La **structure** des parcours est stockée en JSONB :
   - 10 chapitres (100, 200, ..., 1000)
   - 4 sous-chapitres par chapitre (25, 50, 75, 100)
   - Exercices référencés par ID

3. Les **Bundles** sont mappés automatiquement :
   - Bundle 1 → Subchapter 25
   - Bundle 2 → Subchapter 50
   - etc.

## 🎯 Restauration Rapide (Emergency)

En cas de perte de données, exécuter dans cet ordre :

1. **Restaurer le code** : `git checkout fbfb8ed`
2. **Restaurer la BDD** : Supabase Dashboard → Restore backup
3. **Fixer les paths** : Navigate to `/fix-learning-paths`
4. **Peupler les paths** : Navigate to `/setup-all-learning-paths`
5. **Vérifier** : Navigate to `/check-learning-path-ids`

---

**Backup créé le** : [DATE]
**Par** : [VOTRE NOM]
**Version** : V3 (commit fbfb8ed)
