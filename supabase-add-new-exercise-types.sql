-- Script pour ajouter les nouveaux types d'exercices à la contrainte CHECK
-- Exécutez ce script dans votre Dashboard Supabase > SQL Editor

-- Supprimer l'ancienne contrainte
ALTER TABLE exercises DROP CONSTRAINT IF EXISTS exercises_type_check;

-- Ajouter la nouvelle contrainte avec tous les types d'exercices
ALTER TABLE exercises ADD CONSTRAINT exercises_type_check 
  CHECK (type IN (
    'flashcard',
    'association', 
    'quiz',
    'completion',
    'translation',
    'conversation',
    'grammar-identification',
    'sentence-mixer',
    'grammar-transformation',
    'error-hunt'
  ));

-- Vérifier que la contrainte a été ajoutée
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'exercises'::regclass 
AND conname = 'exercises_type_check';
