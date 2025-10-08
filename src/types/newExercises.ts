// ============================================================================
// TYPES TYPESCRIPT - NOUVEAUX TYPES D'EXERCICES
// Version: 1.0
// Date: 2025-01-07
// ============================================================================

// ============================================================================
// 1. IDENTIFICATION GRAMMATICALE
// ============================================================================

export type GrammaticalCategory = 
  | 'particle' 
  | 'verb' 
  | 'pronoun' 
  | 'noun' 
  | 'adjective' 
  | 'adverb' 
  | 'other';

export interface WordElement {
  id: string;
  word: string;
  category: GrammaticalCategory;
  position: number;
}

export interface GrammarIdentificationExercise {
  id: string;
  sentence: string;
  elements: WordElement[];
  translation: string;
  hints?: string;
  notes?: string;
}

export interface GrammarIdentificationContent {
  exercises: GrammarIdentificationExercise[];
  shuffleExercises?: boolean;
  generalNotes?: string;
}

export interface GrammarIdentificationState {
  currentExerciseIndex: number;
  phase: 'identification' | 'translation';
  selectedElements: Map<string, GrammaticalCategory>;
  userTranslation: string;
  score: {
    identificationCorrect: number;
    identificationTotal: number;
    translationCorrect: boolean;
  };
}

// ============================================================================
// 2. MIXEUR DE PHRASES
// ============================================================================

export type SentenceMixerDifficulty = 'easy' | 'normal' | 'hard';

export interface SentenceBlock {
  id: string;
  text: string;
  category?: GrammaticalCategory;
  correctPosition: number;
}

export interface SentenceMixerExercise {
  id: string;
  reference: string; // Phrase de référence ou description
  blocks: SentenceBlock[];
  correctOrder: string[]; // IDs dans le bon ordre
  translation: string;
  hints?: string;
  notes?: string;
}

export interface SentenceMixerContent {
  exercises: SentenceMixerExercise[];
  difficulty: SentenceMixerDifficulty;
  showCategories?: boolean; // Pour mode facile
  shuffleExercises?: boolean;
  generalNotes?: string;
}

export interface SentenceMixerState {
  currentExerciseIndex: number;
  phase: 'reconstruction' | 'translation';
  userOrder: string[];
  userTranslation: string;
  timeSpent: number;
  score: {
    reconstructionCorrect: boolean;
    translationCorrect: boolean;
    reconstructionAttempts: number;
  };
}

// ============================================================================
// 3. TRANSFORMATION GRAMMATICALE
// ============================================================================

export type TransformationType =
  | 'tense' // Temporelle
  | 'modal' // Négative/Interrogative/Polie
  | 'person' // Changement de personne
  | 'connector' // Ajout de connecteur
  | 'politeness' // Niveau de politesse
  | 'voice'; // Voix active/passive

export interface TransformationInstruction {
  type: TransformationType;
  instruction: string;
  examples?: string[];
}

export interface GrammarTransformationExercise {
  id: string;
  baseSentence: string;
  transformation: TransformationInstruction;
  expectedAnswer: string;
  acceptableVariations?: string[]; // Variations acceptables
  hints?: {
    conjugation?: string;
    rule?: string;
  };
  explanation?: string;
  translation: string;
}

export interface GrammarTransformationContent {
  exercises: GrammarTransformationExercise[];
  allowHints?: boolean;
  hintPenalty?: number; // Points perdus par indice
  shuffleExercises?: boolean;
  generalNotes?: string;
}

export interface GrammarTransformationState {
  currentExerciseIndex: number;
  phase: 'transformation' | 'correction';
  userTransformation: string;
  userTranslation: string;
  hintsUsed: number;
  score: {
    transformationPoints: number;
    translationCorrect: boolean;
    creativityBonus: number;
  };
}

// ============================================================================
// 4. CHASSE AUX ERREURS
// ============================================================================

export type ErrorType =
  | 'particle' // Particule incorrecte
  | 'conjugation' // Conjugaison/accord erroné
  | 'word_order' // Ordre des mots incorrect
  | 'vocabulary' // Vocabulaire inapproprié
  | 'politeness'; // Niveau de politesse inadéquat

export interface SentenceError {
  id: string;
  wordIndex: number;
  type: ErrorType;
  incorrectWord: string;
  correctWord: string;
  explanation?: string;
}

export interface ErrorHuntExercise {
  id: string;
  incorrectSentence: string;
  errors: SentenceError[];
  correctSentence: string;
  translation: string;
  hints?: string;
  notes?: string;
}

export interface ErrorHuntContent {
  exercises: ErrorHuntExercise[];
  maxErrorsPerSentence?: number;
  shuffleExercises?: boolean;
  generalNotes?: string;
}

export interface ErrorHuntState {
  currentExerciseIndex: number;
  phase: 'detection' | 'correction' | 'translation';
  detectedErrors: Set<number>; // Indices des mots cliqués
  corrections: Map<number, string>; // Index -> correction proposée
  userTranslation: string;
  score: {
    errorsDetected: number;
    totalErrors: number;
    correctionsValid: number;
    falseDetections: number;
    translationCorrect: boolean;
  };
}

// ============================================================================
// 5. TYPES COMMUNS
// ============================================================================

export type NewExerciseType = 
  | 'grammar-identification'
  | 'sentence-mixer'
  | 'grammar-transformation'
  | 'error-hunt';

export interface NewExerciseContent {
  'grammar-identification'?: GrammarIdentificationContent;
  'sentence-mixer'?: SentenceMixerContent;
  'grammar-transformation'?: GrammarTransformationContent;
  'error-hunt'?: ErrorHuntContent;
}

// ============================================================================
// 6. CONFIGURATION DES CATÉGORIES GRAMMATICALES
// ============================================================================

export interface GrammaticalCategoryConfig {
  category: GrammaticalCategory;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export const GRAMMATICAL_CATEGORIES: GrammaticalCategoryConfig[] = [
  {
    category: 'particle',
    label: 'Particule',
    icon: '🔹',
    color: 'bg-blue-500',
    description: 'Particules grammaticales (は, が, を, မှာ, etc.)'
  },
  {
    category: 'verb',
    label: 'Verbe',
    icon: '⚡',
    color: 'bg-red-500',
    description: 'Verbes d\'action et d\'état'
  },
  {
    category: 'pronoun',
    label: 'Pronom',
    icon: '👤',
    color: 'bg-purple-500',
    description: 'Pronoms personnels et démonstratifs'
  },
  {
    category: 'noun',
    label: 'Nom',
    icon: '📦',
    color: 'bg-green-500',
    description: 'Noms communs et propres'
  },
  {
    category: 'adjective',
    label: 'Adjectif',
    icon: '✨',
    color: 'bg-yellow-500',
    description: 'Adjectifs qualificatifs'
  },
  {
    category: 'adverb',
    label: 'Adverbe',
    icon: '🎯',
    color: 'bg-orange-500',
    description: 'Adverbes de manière, temps, lieu, etc.'
  },
  {
    category: 'other',
    label: 'Autre',
    icon: '🔸',
    color: 'bg-gray-500',
    description: 'Conjonctions, interjections, etc.'
  }
];

// ============================================================================
// 7. UTILITAIRES
// ============================================================================

export const getCategoryConfig = (category: GrammaticalCategory): GrammaticalCategoryConfig => {
  return GRAMMATICAL_CATEGORIES.find(c => c.category === category) || GRAMMATICAL_CATEGORIES[6];
};

export const splitSentenceIntoWords = (sentence: string): string[] => {
  // Gère les espaces et la ponctuation
  return sentence.trim().split(/\s+/);
};

export const calculateIdentificationScore = (
  userSelections: Map<string, GrammaticalCategory>,
  correctElements: WordElement[]
): number => {
  let correct = 0;
  correctElements.forEach(element => {
    const userCategory = userSelections.get(element.id);
    if (userCategory === element.category) {
      correct++;
    }
  });
  return (correct / correctElements.length) * 100;
};

export const compareTranslation = (
  userTranslation: string,
  correctTranslation: string,
  tolerance: number = 0.8
): boolean => {
  // Comparaison basique - peut être améliorée avec Levenshtein
  const normalize = (text: string) => text.toLowerCase().trim().replace(/[.,!?;:]/g, '');
  const user = normalize(userTranslation);
  const correct = normalize(correctTranslation);
  
  if (user === correct) return true;
  
  // Vérification de similarité basique
  const userWords = user.split(/\s+/);
  const correctWords = correct.split(/\s+/);
  
  const matchingWords = userWords.filter(word => 
    correctWords.some(cw => cw.includes(word) || word.includes(cw))
  ).length;
  
  return (matchingWords / correctWords.length) >= tolerance;
};
