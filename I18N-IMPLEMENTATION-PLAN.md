# 🌍 Plan d'Implémentation - Internationalisation (i18n)

**Version**: Anglaise du site
**Date**: Janvier 2025
**Objectif**: Traduire l'interface utilisateur en anglais SANS modifier le contenu des exercices

---

## 📊 État d'Avancement Global

- [ ] Phase 1: Installation & Configuration (30 min)
- [ ] Phase 2: Structure & Setup (1h)
- [ ] Phase 3: Extraction des Textes (3-4h)
- [ ] Phase 4: Implémentation Progressive (6-7h)
- [ ] Phase 5: Language Switcher (30 min)
- [ ] Phase 6: Testing & Validation (1h)

**Temps Total Estimé**: 10-12 heures

---

## 🎯 Principes Directeurs

### ✅ Ce qui sera traduit (UI)
- Navigation et menus
- Titres de pages
- Boutons et labels
- Messages système
- Instructions et help text
- Formulaires et validations

### ❌ Ce qui reste intact (Contenu pédagogique)
- Exercices (birman, thaï, japonais, coréen)
- Données Supabase (`exercises`, `learning_paths`)
- Grammar bundles
- Vocabulaire d'apprentissage
- Contenu des flashcards, quiz, etc.

---

## Phase 1: Installation & Configuration

### 1.1 Installation des Dépendances
- [ ] Installer `i18next`
- [ ] Installer `react-i18next`
- [ ] Installer `i18next-browser-languagedetector`

```bash
npm install i18next react-i18next i18next-browser-languagedetector
```

### 1.2 Vérification
- [ ] Vérifier `package.json` pour confirmer les versions
- [ ] Vérifier qu'aucune erreur de dépendances

**Temps estimé**: 10 minutes

---

## Phase 2: Structure & Setup

### 2.1 Créer la Structure des Dossiers
```
src/
├── i18n/
│   ├── config.ts              # [ ] Configuration i18next
│   ├── index.ts               # [ ] Export principal
│   └── locales/
│       ├── fr/
│       │   ├── common.json    # [ ] Traductions communes FR
│       │   ├── navigation.json # [ ] Navigation FR
│       │   ├── pages.json     # [ ] Pages FR
│       │   └── components.json # [ ] Composants FR
│       └── en/
│           ├── common.json    # [ ] Traductions communes EN
│           ├── navigation.json # [ ] Navigation EN
│           ├── pages.json     # [ ] Pages EN
│           └── components.json # [ ] Composants EN
```

### 2.2 Créer les Fichiers de Configuration
- [ ] `src/i18n/config.ts` - Configuration principale
- [ ] `src/i18n/index.ts` - Export et initialisation
- [ ] Configurer auto-détection de langue
- [ ] Configurer fallback vers français
- [ ] Configurer persistence dans localStorage

### 2.3 Intégrer dans l'Application
- [ ] Modifier `src/main.tsx` pour importer i18n
- [ ] Vérifier que l'app démarre sans erreur

**Temps estimé**: 30 minutes

---

## Phase 3: Extraction des Textes

### 3.1 Navigation (Navigation.tsx)
**Fichier**: `src/components/Navigation.tsx`

#### Textes à extraire:
- [ ] "Accueil" → "Home"
- [ ] "Catalogue" → "Catalog"
- [ ] "Parcours" → "Learning Paths"
- [ ] "Exercices" → "Exercises"
- [ ] "Créer" → "Create"
- [ ] "Communauté" → "Community"
- [ ] "Koilingua" → "Koilingua" (nom de marque, invariable)
- [ ] "Mon profil" → "My Profile"
- [ ] "Paramètres" → "Settings"
- [ ] "Se déconnecter" → "Sign Out"

**Namespace**: `navigation.json`

### 3.2 Landing Page (Index.tsx)
**Fichier**: `src/pages/Index.tsx`

#### Textes à extraire:
- [ ] "Plateforme d'apprentissage collaborative" → "Collaborative learning platform"
- [ ] "Apprenez les langues à votre manière" → "Learn languages your way"
- [ ] "Créez, partagez et pratiquez..." → "Create, share and practice..."
- [ ] "Parcourir le catalogue" → "Browse catalog"
- [ ] "Créer un exercice" → "Create an exercise"
- [ ] "Types d'exercices disponibles" → "Available exercise types"
- [ ] "Cartes Flash" → "Flashcards"
- [ ] "Association" → "Association"
- [ ] "Quiz" → "Quiz"
- [ ] "Complétion" → "Completion"
- [ ] "Traduction" → "Translation"
- [ ] "Conversation" → "Conversation"
- [ ] "Catalogue Riche" → "Rich Catalog"
- [ ] "Des centaines d'exercices..." → "Hundreds of exercises..."
- [ ] "Création Intuitive" → "Intuitive Creation"
- [ ] "Créez vos propres exercices..." → "Create your own exercises..."
- [ ] "Communauté Active" → "Active Community"
- [ ] "Partagez et apprenez..." → "Share and learn..."

**Namespace**: `pages.json`

### 3.3 Creator (Creator.tsx)
**Fichier**: `src/pages/Creator.tsx`

#### Textes à extraire:
- [ ] "Créer du Contenu" → "Create Content"
- [ ] "Choisissez le type de contenu..." → "Choose the type of content..."
- [ ] "Créer un Exercice" → "Create an Exercise"
- [ ] "Flashcards, associations, traductions..." → "Flashcards, associations, translations..."
- [ ] "Créer un Parcours" → "Create a Learning Path"
- [ ] "Organisez plusieurs exercices..." → "Organize multiple exercises..."
- [ ] "Créer un Topic" → "Create a Topic"
- [ ] "Regroupez des parcours..." → "Group learning paths..."
- [ ] "Éditer un exercice" → "Edit an exercise"
- [ ] "Éditer un parcours" → "Edit a learning path"
- [ ] "Éditer un topic" → "Edit a topic"
- [ ] "Commencer" → "Start"
- [ ] "Explorer" → "Explore"
- [ ] "Quelle est la différence ?" → "What's the difference?"
- [ ] "Exercice" → "Exercise"
- [ ] "Une unité d'apprentissage unique..." → "A single learning unit..."
- [ ] "Parcours" → "Learning Path"
- [ ] "Une séquence d'exercices ordonnés..." → "A sequence of ordered exercises..."
- [ ] "Topic" → "Topic"
- [ ] "Une collection thématique..." → "A thematic collection..."
- [ ] "Exemple :" → "Example:"
- [ ] "Simple" → "Simple"
- [ ] "Interface intuitive" → "Intuitive interface"
- [ ] "Rapide" → "Fast"
- [ ] "Création en quelques clics" → "Creation in a few clicks"
- [ ] "Partagé" → "Shared"
- [ ] "Accessible à tous" → "Accessible to all"

**Namespace**: `pages.json`

### 3.4 Exercise Creator (ExerciseCreator.tsx)
**Fichier**: `src/pages/ExerciseCreator.tsx`

#### Textes à extraire (principaux):
- [ ] "Créer un Exercice" → "Create an Exercise"
- [ ] "Type d'exercice" → "Exercise Type"
- [ ] "Titre" → "Title"
- [ ] "Description" → "Description"
- [ ] "Langue" → "Language"
- [ ] "Difficulté" → "Difficulty"
- [ ] "Débutant" → "Beginner"
- [ ] "Intermédiaire" → "Intermediate"
- [ ] "Avancé" → "Advanced"
- [ ] "Tags" → "Tags"
- [ ] "Contenu" → "Content"
- [ ] "Ajouter" → "Add"
- [ ] "Supprimer" → "Delete"
- [ ] "Créer" → "Create"
- [ ] "Annuler" → "Cancel"
- [ ] "Question" → "Question"
- [ ] "Réponse" → "Answer"
- [ ] "Indice" → "Hint"

**Namespace**: `components.json`

### 3.5 Players (Flashcard, Quiz, etc.)
**Fichiers**: `src/components/*Player.tsx`

#### Textes communs à extraire:
- [ ] "Suivant" → "Next"
- [ ] "Précédent" → "Previous"
- [ ] "Vérifier" → "Check"
- [ ] "Rejouer" → "Retry"
- [ ] "Terminer" → "Finish"
- [ ] "Résultat" → "Result"
- [ ] "Score" → "Score"
- [ ] "Correct" → "Correct"
- [ ] "Incorrect" → "Incorrect"
- [ ] "Bravo !" → "Well done!"
- [ ] "Essayez encore" → "Try again"
- [ ] "Afficher la réponse" → "Show answer"
- [ ] "Continuer" → "Continue"

**Namespace**: `components.json`

### 3.6 Messages Système (Toast)
**Fichiers**: Dispersés dans tous les composants

#### Textes à extraire:
- [ ] "Exercice créé avec succès" → "Exercise created successfully"
- [ ] "Erreur lors de la création" → "Error creating"
- [ ] "Parcours créé avec succès" → "Learning path created successfully"
- [ ] "Modification enregistrée" → "Changes saved"
- [ ] "Erreur lors de l'enregistrement" → "Error saving"
- [ ] "Suppression réussie" → "Successfully deleted"
- [ ] "Chargement..." → "Loading..."
- [ ] "Connexion réussie" → "Successfully signed in"
- [ ] "Déconnexion réussie" → "Successfully signed out"

**Namespace**: `common.json`

### 3.7 Formulaires Auth (SignIn/SignUp)
**Fichiers**: `src/pages/SignIn.tsx`, `src/pages/SignUp.tsx`

#### Textes à extraire:
- [ ] "Se connecter" → "Sign In"
- [ ] "S'inscrire" → "Sign Up"
- [ ] "Email" → "Email"
- [ ] "Mot de passe" → "Password"
- [ ] "Confirmer le mot de passe" → "Confirm password"
- [ ] "Nom d'utilisateur" → "Username"
- [ ] "Vous avez déjà un compte ?" → "Already have an account?"
- [ ] "Vous n'avez pas de compte ?" → "Don't have an account?"
- [ ] "Mot de passe oublié ?" → "Forgot password?"

**Namespace**: `common.json`

**Temps estimé**: 3-4 heures

---

## Phase 4: Implémentation Progressive

### 4.1 Priorité 1 - Navigation & Core (1h)

#### Fichiers à modifier:
- [ ] `src/components/Navigation.tsx`
  - Importer `useTranslation`
  - Remplacer tous les textes hardcodés
  - Tester le changement de langue

- [ ] `src/pages/Index.tsx`
  - Importer `useTranslation`
  - Remplacer hero section
  - Remplacer features
  - Remplacer exercise types

#### Validation:
- [ ] Navigation s'affiche en FR/EN
- [ ] Landing page s'affiche en FR/EN
- [ ] Aucune régression visuelle

### 4.2 Priorité 2 - Pages Principales (2h)

#### Fichiers à modifier:
- [ ] `src/pages/Creator.tsx`
  - Traduire tous les titres
  - Traduire descriptions
  - Traduire boutons

- [ ] `src/pages/Catalog.tsx`
  - Traduire filtres
  - Traduire labels
  - Traduire messages vides

- [ ] `src/pages/Exercises.tsx`
  - Traduire titres
  - Traduire filtres
  - Traduire états

- [ ] `src/pages/LearningPaths.tsx`
  - Traduire navigation
  - Traduire labels
  - Traduire descriptions

#### Validation:
- [ ] Toutes les pages principales en FR/EN
- [ ] Navigation fluide entre pages
- [ ] Cohérence des traductions

### 4.3 Priorité 3 - Composants & Forms (2h)

#### Players:
- [ ] `src/components/FlashcardPlayer.tsx`
- [ ] `src/components/QuizPlayer.tsx`
- [ ] `src/components/TranslationPlayer.tsx`
- [ ] `src/components/AssociationPlayer.tsx`
- [ ] `src/components/SentenceMixerPlayer.tsx`

#### Forms:
- [ ] `src/pages/ExerciseCreator.tsx`
- [ ] `src/pages/PathCreator.tsx`
- [ ] `src/pages/TopicCreator.tsx`

#### Auth:
- [ ] `src/pages/SignIn.tsx`
- [ ] `src/pages/SignUp.tsx`

#### Validation:
- [ ] Tous les players fonctionnent en FR/EN
- [ ] Formulaires validés en FR/EN
- [ ] Messages d'erreur traduits

### 4.4 Priorité 4 - Composants Secondaires (1-2h)

#### À modifier:
- [ ] `src/components/ExerciseCard.tsx`
- [ ] `src/components/PathCard.tsx`
- [ ] `src/pages/PathEditor.tsx`
- [ ] `src/pages/ExerciseList.tsx`
- [ ] `src/pages/PathList.tsx`
- [ ] `src/pages/TopicList.tsx`
- [ ] `src/pages/MyLearning.tsx`
- [ ] `src/pages/Assignments.tsx`

#### Validation:
- [ ] Tous les composants affichent correctement
- [ ] Pas de texte français manquant
- [ ] Cohérence globale

**Temps estimé**: 6-7 heures

---

## Phase 5: Language Switcher

### 5.1 Créer le Composant
- [ ] Créer `src/components/LanguageSwitcher.tsx`
- [ ] Ajouter flags 🇫🇷 / 🇬🇧
- [ ] Ajouter dropdown ou toggle
- [ ] Gérer le changement de langue
- [ ] Sauvegarder dans localStorage

### 5.2 Intégrer dans Navigation
- [ ] Ajouter le switcher dans `Navigation.tsx`
- [ ] Positionner à droite (près du profil)
- [ ] Style cohérent avec le design

### 5.3 Tester
- [ ] Changement instantané de langue
- [ ] Persistence après refresh
- [ ] Détection automatique au premier chargement

**Temps estimé**: 30 minutes

---

## Phase 6: Testing & Validation

### 6.1 Tests Fonctionnels
- [ ] Tester toutes les pages en français
- [ ] Tester toutes les pages en anglais
- [ ] Tester le changement de langue dynamique
- [ ] Tester la persistence (refresh page)
- [ ] Tester la détection auto (nouveau visiteur)

### 6.2 Tests de Contenu
- [ ] Vérifier que les exercices sont intacts (birman, thaï, etc.)
- [ ] Vérifier que les learning paths sont intacts
- [ ] Vérifier que la BDD n'est pas modifiée
- [ ] Vérifier les grammar bundles

### 6.3 Tests UI/UX
- [ ] Vérifier l'alignement des textes
- [ ] Vérifier les débordements (texte trop long)
- [ ] Vérifier la cohérence des traductions
- [ ] Vérifier les pluriels et genres

### 6.4 Tests Edge Cases
- [ ] Langue navigateur non supportée → fallback FR
- [ ] LocalStorage vide → détection auto
- [ ] Changement rapide de langue → pas de bugs
- [ ] Texte manquant → affiche key ou fallback

### 6.5 Validation Finale
- [ ] Checklist complète ✅
- [ ] Aucune régression
- [ ] Performance OK (pas de ralentissement)
- [ ] Documentation à jour

**Temps estimé**: 1 heure

---

## 📁 Structure des Fichiers de Traduction

### common.json (FR)
```json
{
  "buttons": {
    "start": "Commencer",
    "explore": "Explorer",
    "create": "Créer",
    "edit": "Éditer",
    "delete": "Supprimer",
    "save": "Enregistrer",
    "cancel": "Annuler",
    "next": "Suivant",
    "previous": "Précédent",
    "finish": "Terminer",
    "check": "Vérifier",
    "retry": "Rejouer",
    "continue": "Continuer"
  },
  "messages": {
    "success": "Succès",
    "error": "Erreur",
    "loading": "Chargement...",
    "noData": "Aucune donnée disponible",
    "confirmDelete": "Êtes-vous sûr de vouloir supprimer ?",
    "exerciseCreated": "Exercice créé avec succès",
    "pathCreated": "Parcours créé avec succès",
    "changesSaved": "Modifications enregistrées",
    "errorSaving": "Erreur lors de l'enregistrement"
  },
  "auth": {
    "signIn": "Se connecter",
    "signUp": "S'inscrire",
    "signOut": "Se déconnecter",
    "email": "Email",
    "password": "Mot de passe",
    "confirmPassword": "Confirmer le mot de passe",
    "username": "Nom d'utilisateur",
    "forgotPassword": "Mot de passe oublié ?",
    "alreadyHaveAccount": "Vous avez déjà un compte ?",
    "noAccount": "Vous n'avez pas de compte ?"
  },
  "difficulty": {
    "beginner": "Débutant",
    "intermediate": "Intermédiaire",
    "advanced": "Avancé"
  }
}
```

### common.json (EN)
```json
{
  "buttons": {
    "start": "Start",
    "explore": "Explore",
    "create": "Create",
    "edit": "Edit",
    "delete": "Delete",
    "save": "Save",
    "cancel": "Cancel",
    "next": "Next",
    "previous": "Previous",
    "finish": "Finish",
    "check": "Check",
    "retry": "Retry",
    "continue": "Continue"
  },
  "messages": {
    "success": "Success",
    "error": "Error",
    "loading": "Loading...",
    "noData": "No data available",
    "confirmDelete": "Are you sure you want to delete?",
    "exerciseCreated": "Exercise created successfully",
    "pathCreated": "Learning path created successfully",
    "changesSaved": "Changes saved",
    "errorSaving": "Error saving"
  },
  "auth": {
    "signIn": "Sign In",
    "signUp": "Sign Up",
    "signOut": "Sign Out",
    "email": "Email",
    "password": "Password",
    "confirmPassword": "Confirm password",
    "username": "Username",
    "forgotPassword": "Forgot password?",
    "alreadyHaveAccount": "Already have an account?",
    "noAccount": "Don't have an account?"
  },
  "difficulty": {
    "beginner": "Beginner",
    "intermediate": "Intermediate",
    "advanced": "Advanced"
  }
}
```

### navigation.json (FR)
```json
{
  "home": "Accueil",
  "catalog": "Catalogue",
  "learningPaths": "Parcours",
  "exercises": "Exercices",
  "create": "Créer",
  "community": "Communauté",
  "myProfile": "Mon profil",
  "settings": "Paramètres",
  "signOut": "Se déconnecter"
}
```

### navigation.json (EN)
```json
{
  "home": "Home",
  "catalog": "Catalog",
  "learningPaths": "Learning Paths",
  "exercises": "Exercises",
  "create": "Create",
  "community": "Community",
  "myProfile": "My Profile",
  "settings": "Settings",
  "signOut": "Sign Out"
}
```

### pages.json (FR)
```json
{
  "landing": {
    "tagline": "Plateforme d'apprentissage collaborative",
    "hero": "Apprenez les langues à votre manière",
    "description": "Créez, partagez et pratiquez des exercices de langues adaptés à votre niveau. Rejoignez une communauté passionnée d'apprenants.",
    "browseCatalog": "Parcourir le catalogue",
    "createExercise": "Créer un exercice",
    "exerciseTypes": "Types d'exercices disponibles"
  },
  "creator": {
    "title": "Créer du Contenu",
    "subtitle": "Choisissez le type de contenu que vous souhaitez créer pour enrichir la plateforme",
    "createExercise": "Créer un Exercice",
    "createPath": "Créer un Parcours",
    "createTopic": "Créer un Topic",
    "editExercise": "Éditer un exercice",
    "editPath": "Éditer un parcours",
    "editTopic": "Éditer un topic",
    "exerciseDescription": "Flashcards, associations, traductions, quiz, et plus encore",
    "pathDescription": "Organisez plusieurs exercices en un parcours d'apprentissage structuré",
    "topicDescription": "Regroupez des parcours et exercices par thématique",
    "difference": "Quelle est la différence ?"
  }
}
```

### pages.json (EN)
```json
{
  "landing": {
    "tagline": "Collaborative learning platform",
    "hero": "Learn languages your way",
    "description": "Create, share and practice language exercises adapted to your level. Join a passionate community of learners.",
    "browseCatalog": "Browse catalog",
    "createExercise": "Create an exercise",
    "exerciseTypes": "Available exercise types"
  },
  "creator": {
    "title": "Create Content",
    "subtitle": "Choose the type of content you want to create to enrich the platform",
    "createExercise": "Create an Exercise",
    "createPath": "Create a Learning Path",
    "createTopic": "Create a Topic",
    "editExercise": "Edit an exercise",
    "editPath": "Edit a learning path",
    "editTopic": "Edit a topic",
    "exerciseDescription": "Flashcards, associations, translations, quizzes, and more",
    "pathDescription": "Organize multiple exercises into a structured learning path",
    "topicDescription": "Group learning paths and exercises by theme",
    "difference": "What's the difference?"
  }
}
```

### components.json (FR)
```json
{
  "exerciseTypes": {
    "flashcard": "Cartes Flash",
    "association": "Association",
    "quiz": "Quiz",
    "completion": "Complétion",
    "translation": "Traduction",
    "conversation": "Conversation"
  },
  "players": {
    "showAnswer": "Afficher la réponse",
    "hideAnswer": "Masquer la réponse",
    "correct": "Correct",
    "incorrect": "Incorrect",
    "score": "Score",
    "result": "Résultat",
    "wellDone": "Bravo !",
    "tryAgain": "Essayez encore",
    "yourAnswer": "Votre réponse",
    "correctAnswer": "Réponse correcte"
  },
  "forms": {
    "title": "Titre",
    "description": "Description",
    "language": "Langue",
    "difficulty": "Difficulté",
    "tags": "Tags",
    "content": "Contenu",
    "question": "Question",
    "answer": "Réponse",
    "hint": "Indice",
    "addItem": "Ajouter un élément",
    "removeItem": "Supprimer l'élément"
  }
}
```

### components.json (EN)
```json
{
  "exerciseTypes": {
    "flashcard": "Flashcards",
    "association": "Association",
    "quiz": "Quiz",
    "completion": "Completion",
    "translation": "Translation",
    "conversation": "Conversation"
  },
  "players": {
    "showAnswer": "Show answer",
    "hideAnswer": "Hide answer",
    "correct": "Correct",
    "incorrect": "Incorrect",
    "score": "Score",
    "result": "Result",
    "wellDone": "Well done!",
    "tryAgain": "Try again",
    "yourAnswer": "Your answer",
    "correctAnswer": "Correct answer"
  },
  "forms": {
    "title": "Title",
    "description": "Description",
    "language": "Language",
    "difficulty": "Difficulty",
    "tags": "Tags",
    "content": "Content",
    "question": "Question",
    "answer": "Answer",
    "hint": "Hint",
    "addItem": "Add item",
    "removeItem": "Remove item"
  }
}
```

---

## 📝 Exemples de Code

### Avant (Hardcodé)
```tsx
// Navigation.tsx
const navItems = [
  { path: "/", label: "Accueil", icon: Home },
  { path: "/catalog", label: "Catalogue", icon: BookOpen },
  { path: "/learning-paths", label: "Parcours", icon: Route },
];

// Index.tsx
<h1 className="text-5xl font-bold">
  Apprenez les langues à votre manière
</h1>
<Button>Parcourir le catalogue</Button>
```

### Après (Traduit)
```tsx
// Navigation.tsx
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation('navigation');

  const navItems = [
    { path: "/", label: t('home'), icon: Home },
    { path: "/catalog", label: t('catalog'), icon: BookOpen },
    { path: "/learning-paths", label: t('learningPaths'), icon: Route },
  ];
  // ...
}

// Index.tsx
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation('pages');

  return (
    <h1 className="text-5xl font-bold">
      {t('landing.hero')}
    </h1>
    <Button>{t('landing.browseCatalog')}</Button>
  );
}
```

---

## 🎯 Critères de Succès

### Fonctionnel
- [x] Site disponible en français ET anglais
- [x] Changement de langue instantané
- [x] Détection automatique de la langue du navigateur
- [x] Persistence du choix utilisateur
- [x] Aucune modification du contenu pédagogique

### Technique
- [x] Pas de texte hardcodé en français
- [x] Namespaces organisés logiquement
- [x] Fichiers JSON valides
- [x] TypeScript sans erreurs
- [x] Build réussi

### UX
- [x] Traductions cohérentes et naturelles
- [x] Pas de débordement de texte
- [x] Language switcher visible et accessible
- [x] Pas de régression visuelle

---

## 📊 Récapitulatif des Fichiers

### À Créer (9 fichiers)
1. [ ] `src/i18n/config.ts`
2. [ ] `src/i18n/index.ts`
3. [ ] `src/i18n/locales/fr/common.json`
4. [ ] `src/i18n/locales/fr/navigation.json`
5. [ ] `src/i18n/locales/fr/pages.json`
6. [ ] `src/i18n/locales/fr/components.json`
7. [ ] `src/i18n/locales/en/common.json`
8. [ ] `src/i18n/locales/en/navigation.json`
9. [ ] `src/i18n/locales/en/pages.json`
10. [ ] `src/i18n/locales/en/components.json`
11. [ ] `src/components/LanguageSwitcher.tsx`

### À Modifier (Prioritaires - 30+ fichiers)
1. [ ] `src/main.tsx`
2. [ ] `src/components/Navigation.tsx`
3. [ ] `src/pages/Index.tsx`
4. [ ] `src/pages/Creator.tsx`
5. [ ] `src/pages/ExerciseCreator.tsx`
6. [ ] `src/pages/PathCreator.tsx`
7. [ ] `src/pages/TopicCreator.tsx`
8. [ ] `src/pages/Catalog.tsx`
9. [ ] `src/pages/Exercises.tsx`
10. [ ] `src/pages/LearningPaths.tsx`
11. [ ] `src/pages/SignIn.tsx`
12. [ ] `src/pages/SignUp.tsx`
13. [ ] `src/components/FlashcardPlayer.tsx`
14. [ ] `src/components/QuizPlayer.tsx`
15. [ ] `src/components/TranslationPlayer.tsx`
16. [ ] `src/components/AssociationPlayer.tsx`
17. [ ] `src/components/SentenceMixerPlayer.tsx`
18. [ ] + autres composants/players selon besoins

---

## 🚀 Ordre d'Exécution Recommandé

### Jour 1 (3-4h)
1. Phase 1: Installation
2. Phase 2: Structure & Setup
3. Phase 3: Extraction (début)

### Jour 2 (3-4h)
1. Phase 3: Extraction (fin)
2. Phase 4.1: Navigation & Core

### Jour 3 (3-4h)
1. Phase 4.2: Pages principales
2. Phase 4.3: Composants (début)

### Jour 4 (2-3h)
1. Phase 4.3: Composants (fin)
2. Phase 5: Language Switcher

### Jour 5 (1-2h)
1. Phase 6: Testing complet
2. Corrections et ajustements
3. Documentation

---

## ⚠️ Points d'Attention

### Pièges à Éviter
- [ ] Ne PAS traduire les noms de marque (Koilingua)
- [ ] Ne PAS traduire le contenu des exercices (birman, thaï, etc.)
- [ ] Ne PAS modifier la structure de la BDD
- [ ] Vérifier les pluriels (EN: 1 exercise / 2 exercises)
- [ ] Vérifier la longueur des textes (débordements)

### Best Practices
- [ ] Utiliser des keys descriptives (`landing.hero` pas `text1`)
- [ ] Grouper par contexte (navigation, pages, components)
- [ ] Toujours tester en FR ET EN
- [ ] Commit réguliers avec messages clairs
- [ ] Documenter les choix de traduction ambigus

---

## 📞 Support & Ressources

### Documentation
- [react-i18next](https://react.i18next.com/)
- [i18next](https://www.i18next.com/)

### Commandes Utiles
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build
npm run build

# Test build
npm run preview
```

---

## ✅ Validation Finale

Avant de considérer le travail terminé:

- [ ] Tous les checkboxes cochés
- [ ] Site testé en FR et EN
- [ ] Contenu pédagogique intact
- [ ] Aucune erreur console
- [ ] Build production réussi
- [ ] Documentation à jour
- [ ] Commit et push sur GitHub

---

**Date de création**: Janvier 2025
**Dernière mise à jour**: [À remplir]
**Status**: 🔄 En cours | ✅ Terminé

---

*Ce document sert de guide complet pour l'implémentation de l'internationalisation. Cochez chaque case au fur et à mesure de la progression.*
