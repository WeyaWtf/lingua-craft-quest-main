# Backups V1.0 - Lingua Craft Quest

## 📦 Contenu

- **Code source** : Tag Git `v1.0`
- **Schéma Supabase** : `supabase-schema-v1.0.sql`
- **Date** : 4 octobre 2025

## 🔄 Comment restaurer

### 1. Restaurer le code (Git)

Pour revenir à la version V1.0 :

```bash
# Voir tous les tags disponibles
git tag -l

# Revenir à V1.0
git checkout v1.0

# Ou créer une nouvelle branche basée sur V1.0
git checkout -b restore-v1 v1.0
```

### 2. Restaurer Supabase

#### Option A : Via Dashboard Supabase

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **SQL Editor**
4. Copiez le contenu de `supabase-schema-v1.0.sql`
5. Exécutez le script

#### Option B : Export de données (recommandé pour backup complet)

Pour sauvegarder les **données** (pas seulement le schéma) :

1. Dashboard Supabase → **Database** → **Backups**
2. Cliquez sur **Download** pour télécharger un backup complet
3. Sauvegardez le fichier `.sql` dans ce dossier

Pour restaurer :
```bash
# Via psql (si installé)
psql -h <your-db-host> -U postgres -d postgres -f backup-data.sql
```

#### Option C : Via Supabase CLI

```bash
# Backup
supabase db dump -f backups/supabase-backup-v1.0.sql

# Restore
supabase db reset
psql -h <your-db-host> -U postgres -d postgres -f backups/supabase-backup-v1.0.sql
```

## ⚠️ Important

- Ce backup contient **uniquement le schéma**, pas les données
- Pour un backup complet avec données, utilisez l'option B ou C ci-dessus
- Testez toujours la restauration dans un environnement de dev d'abord

## 📝 Versions

- **v1.0** (4 oct 2025) : Version stable avec :
  - Flashcards (hiragana, katakana, hangeul, birman, thaï)
  - Exercices d'association
  - Exercices de traduction avec search & navigation
  - Alphabet charts avec mode révélation
  - Clavier virtuel birman
  - 153 fichiers, 36049+ lignes de code
