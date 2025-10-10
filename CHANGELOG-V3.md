# 📋 Changelog V3

**Date**: January 2025
**Commit**: `fbfb8ed`
**Version**: V3.0

## 🎯 Résumé

Cette version majeure introduit un système complet de gestion des parcours d'apprentissage de 1000 mots pour 4 langues, ainsi qu'une progression pédagogique complète pour le birman, du niveau syllabe au niveau phrase.

## 🚀 Nouvelles Fonctionnalités

### 1. Infrastructure Learning Paths (1000 Mots)

#### Pages de Gestion Unifiée

- **SetupAllLearningPaths** (`/setup-all-learning-paths`)
  - Setup automatique des 4 parcours (JAP/MYR/THA/KOR)
  - Création si inexistant, mise à jour sinon
  - Auto-découverte et assignation des exercices
  - Structure complète : 10 chapitres × 4 sous-chapitres

#### Pages de Population par Langue

- **PopulateJapList1000** (`/populate-jap-list-1000`)
  - Peuple le parcours japonais avec les Bundles 1-40
  - Mapping automatique : Bundle N → Subchapter (N×25)

- **PopulateMyrList1000** (`/populate-myr-list-1000`)
  - Peuple le parcours birman avec les Bundles 1-40
  - Recherche par pattern "MYR LIST 1000 - Bundle X"

- **PopulateThaList1000** (`/populate-tha-list-1000`)
  - Peuple le parcours thaï avec les Bundles 1-40
  - Recherche par pattern "THA LIST 1000 - Bundle X"

- **PopulateKorList1000** (`/populate-kor-list-1000`)
  - Peuple le parcours coréen avec les Bundles 1-40
  - Recherche par pattern "KOR LIST 1000 - Bundle X"

#### Outils de Maintenance

- **FixAllLearningPaths** (`/fix-learning-paths`)
  - Restaure la structure hiérarchique des 4 parcours
  - Utilise `ON CONFLICT ... DO UPDATE` (idempotent)
  - Crée 10 chapitres et 40 sous-chapitres vides

- **CheckLearningPathIds** (`/check-learning-path-ids`)
  - Outil de diagnostic
  - Affiche tous les IDs de learning paths dans la BDD
  - Utile pour débugger les problèmes de référence

### 2. Progression Pédagogique Birmane

#### Phase 1: Syllables (Lire les syllabes)

- **InsertBurmeseSyllables** (`/insert/burmese-syllables`)
  - Encyclopédie complète des syllabes birmanes
  - 21 consonnes avec tous leurs variants
  - 5 voyelles ouvertes × 3 tons = 15 combinaisons par consonne
  - Finales stoppées, nasales, et médiales
  - Type: `completion`

#### Phase 2: Syllable Recognition (Reconnaître rapidement)

- **InsertBurmeseSyllableFlashcards** (`/insert/burmese-syllable-flashcards`)
  - 60 syllabes fréquentes
  - Organisées par catégorie grammaticale
  - Format: syllabe → romanisation + IPA
  - Type: `flashcard`

#### Phase 3: Word Construction (Assembler des mots)

- **InsertBurmeseWordMixer** (`/insert/burmese-word-mixer`)
  - 25 mots communs décomposés en syllabes
  - Exercice de reconstruction
  - Type: `sentence-mixer` (repurposé pour les mots)

#### Phase 4: Word Association (Vocabulaire thématique)

- **InsertBurmeseWordAssociation** (`/insert/burmese-word-association`)
  - 60 mots en 15 groupes thématiques de 4
  - Type: `association`
  - Correction : Erreurs de syntaxe (array brackets) fixées

#### Phase 5: Vocabulary Expansion (100 mots essentiels)

- **InsertBurmeseVocabFlashcards** (`/insert/burmese-vocab-flashcards`)
  - 100 mots essentiels avec métadonnées complètes
  - Breakdown syllabique + IPA dans `extra`
  - 10 catégories thématiques
  - Type: `flashcard`

#### Phase 6: Simple Sentences (Phrases basiques)

- **InsertBurmeseSimpleSentences** (`/insert/burmese-simple-sentences`)
  - 20 phrases de base
  - Breakdown syllabe par syllabe avec romanisation et sens
  - Format adapté au translation player
  - Type: `translation`
  - Correction : Format de données adapté

### 3. Player Interactif Birman

- **BurmeseSyllablePlayer** (`src/components/BurmeseSyllablePlayer.tsx`)
  - Player dédié pour l'encyclopédie des syllabes
  - Navigation par consonne
  - Affichage des tableaux de voyelles, tons, finales, médiales
  - Intégré dans Player.tsx pour le type `completion`

### 4. Documentation Grammar Bundles

#### Birman (15 nouveaux bundles)

- Levels 4-16 : `burmese-level-{N}-bundle.md`
- Levels 17-18 : `burmese_level_{N}.md`
- Organisés dans `grammar/Burmese grammar/Bundles/`

#### Japonais (20 bundles)

- Levels 1-20 : `japanese_level_{N}.md`
- Organisés dans `grammar/Japanese grammar/bundle/`

#### Thaï (20 bundles)

- Levels 1-20 : `thai_level_{N}_bundle.md`
- Organisés dans `grammar/Thaï grammar/bundle/`
- Note : thai_level_1 déplacé dans /bundle/

## 🐛 Corrections de Bugs

### InsertBurmeseWordAssociation
- **Problème** : Erreurs de syntaxe aux lignes 47 et 63
- **Cause** : Utilisation de `},` au lieu de `],` pour fermer les arrays
- **Fix** : Changement de tous les array closings en `],`

### InsertBurmeseSimpleSentences
- **Problème** : "Aucun exercice de traduction défini" dans le player
- **Cause** : Format custom avec `breakdown` non reconnu par le player
- **Fix** : Transformation des données pour correspondre au format attendu :
  ```typescript
  {
    sourceText: sentence.burmese,
    targetText: sentence.translation,
    hints: breakdownText + notes
  }
  ```

### Player.tsx
- **Problème** : Type "completion" non géré
- **Cause** : Nouveau type d'exercice non pris en compte
- **Fix** : Ajout du case "completion" avec détection encyclopedia/syllables
  ```typescript
  case "completion":
    if (exercise.tags?.includes("encyclopedia")) {
      return <BurmeseSyllablePlayer ... />;
    }
  ```

### Creator.tsx
- **Problème** : Capitalisation incorrecte
- **Cause** : "editer" au lieu de "Éditer"
- **Fix** : Changement en "Éditer" (3 occurrences)

### InsertBurmeseSyllables
- **Problème** : Type "syllable_encyclopedia" rejeté par la BDD
- **Cause** : Type non dans la liste autorisée
- **Fix** : Changement en type "completion"

## 🗄️ Base de Données

### Scripts SQL

- **FIX-ALL-LEARNING-PATHS-PERMANENT.sql**
  - Restaure la structure de tous les parcours
  - Utilise `ON CONFLICT (id) DO UPDATE`
  - Idempotent : peut être exécuté plusieurs fois

### Structure Learning Paths

```json
{
  "type": "chapter",
  "id": "chapter-100",
  "title": "100",
  "items": [
    {
      "type": "subchapter",
      "id": "subchapter-25",
      "title": "25",
      "items": [
        { "type": "exercise", "id": "..." }
      ]
    }
  ]
}
```

### IDs des Learning Paths

- JAP: `path-jap-list-1000-words`
- MYR: `path-myr-list-1000-words`
- THA: `path-thai-list-1000-words`
- KOR: `path-korean-list-1000-words`

## 📁 Architecture

### Nouveaux Fichiers

```
src/
├── components/
│   └── BurmeseSyllablePlayer.tsx        [NEW]
└── pages/
    ├── CheckLearningPathIds.tsx         [NEW]
    ├── FixAllLearningPaths.tsx          [NEW]
    ├── SetupAllLearningPaths.tsx        [NEW]
    ├── PopulateJapList1000.tsx          [NEW]
    ├── PopulateMyrList1000.tsx          [NEW]
    ├── PopulateThaList1000.tsx          [NEW]
    ├── PopulateKorList1000.tsx          [NEW]
    ├── InsertBurmeseSyllables.tsx       [NEW]
    ├── InsertBurmeseSyllableFlashcards.tsx [NEW]
    ├── InsertBurmeseWordMixer.tsx       [NEW]
    ├── InsertBurmeseWordAssociation.tsx [NEW]
    ├── InsertBurmeseVocabFlashcards.tsx [NEW]
    └── InsertBurmeseSimpleSentences.tsx [NEW]

grammar/
├── Burmese grammar/
│   ├── Bundles/                         [NEW]
│   │   ├── burmese-level-{4-16}-bundle.md
│   │   └── burmese_level_{17-20}.md
│   └── burmese-level-{4-16}-bundle.md   [NEW]
├── Japanese grammar/
│   └── bundle/                          [NEW]
│       └── japanese_level_{1-20}.md
└── Thaï grammar/
    └── bundle/                          [NEW]
        └── thai_level_{1-20}_bundle.md

FIX-ALL-LEARNING-PATHS-PERMANENT.sql     [NEW]
```

### Fichiers Modifiés

```
src/
├── App.tsx                              [MODIFIED]
│   └── +13 routes
├── pages/
│   ├── Creator.tsx                      [MODIFIED]
│   │   └── "editer" → "Éditer"
│   └── Player.tsx                       [MODIFIED]
│       └── +case "completion"
└── .claude/
    └── settings.local.json              [MODIFIED]
```

## 🔀 Routes Ajoutées

### Learning Paths Management
- `/setup-all-learning-paths` → SetupAllLearningPaths
- `/populate-jap-list-1000` → PopulateJapList1000
- `/populate-myr-list-1000` → PopulateMyrList1000
- `/populate-tha-list-1000` → PopulateThaList1000
- `/populate-kor-list-1000` → PopulateKorList1000
- `/fix-learning-paths` → FixAllLearningPaths
- `/check-learning-path-ids` → CheckLearningPathIds

### Burmese Pedagogy
- `/insert/burmese-syllables` → InsertBurmeseSyllables
- `/insert/burmese-syllable-flashcards` → InsertBurmeseSyllableFlashcards
- `/insert/burmese-word-mixer` → InsertBurmeseWordMixer
- `/insert/burmese-word-association` → InsertBurmeseWordAssociation
- `/insert/burmese-vocab-flashcards` → InsertBurmeseVocabFlashcards
- `/insert/burmese-simple-sentences` → InsertBurmeseSimpleSentences

## 📊 Statistiques

- **89 fichiers modifiés**
- **48,786 insertions** (+)
- **24 suppressions** (-)
- **13 nouvelles pages React**
- **1 nouveau composant**
- **55+ nouveaux fichiers grammar bundles**
- **13 nouvelles routes**

## 🎓 Méthodologie Pédagogique

### Progression Birmane (6 Phases)

```
1. Syllable Encyclopedia (21 consonnes × variants)
   ↓
2. Syllable Flashcards (60 syllabes fréquentes)
   ↓
3. Word Mixer (25 mots à assembler)
   ↓
4. Word Association (60 mots thématiques)
   ↓
5. Vocabulary Flashcards (100 mots essentiels)
   ↓
6. Simple Sentences (20 phrases de base)
```

### Learning Paths Structure (4 Langues)

```
Learning Path (1000 mots)
├── Chapter 100
│   ├── Subchapter 25 (Bundle 1)
│   ├── Subchapter 50 (Bundle 2)
│   ├── Subchapter 75 (Bundle 3)
│   └── Subchapter 100 (Bundle 4)
├── Chapter 200
│   └── ... (Bundles 5-8)
...
└── Chapter 1000
    └── ... (Bundles 37-40)
```

## 🔧 Outils de Développement

### Debug Learning Paths
```
1. Check IDs: /check-learning-path-ids
2. Fix Structure: /fix-learning-paths
3. Populate: /setup-all-learning-paths
```

### Exercise Creation Flow
```
1. Create Insert{Language}Bundle{N}.tsx
2. Add route in App.tsx
3. Navigate to route and insert
4. Populate learning path
```

## 🚀 Déploiement

### GitHub
- Commit: `fbfb8ed`
- Branch: `main`
- Remote: `origin/main`

### Supabase
- Tables: `exercises`, `learning_paths`, `topics`
- Schema: Voir `FIX-ALL-LEARNING-PATHS-PERMANENT.sql`

## 📝 Notes de Migration

### De V2 à V3

1. **Learning Paths perdus** : Utiliser `/fix-learning-paths`
2. **Exercices non assignés** : Utiliser `/setup-all-learning-paths`
3. **IDs incorrects** : Vérifier avec `/check-learning-path-ids`

### Nouveaux Types d'Exercices

- Type `completion` : Utilisé pour les encyclopédies interactives
- Format `sentence-mixer` : Repurposé pour le word mixing

## 🎯 Prochaines Étapes (V4)

- [ ] Créer les Bundles coréens (KorBundle 1-40)
- [ ] Système de progression utilisateur amélioré
- [ ] Analytics des learning paths
- [ ] Export/Import de parcours
- [ ] Système de badges et achievements
- [ ] Mode hors-ligne avec sync

## 🤝 Contributeurs

- **Développement** : Claude (Anthropic) + Nemetonw
- **Contenu Birman** : Grammar bundles 4-18
- **Contenu Japonais** : Grammar bundles 1-20
- **Contenu Thaï** : Grammar bundles 1-20

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
