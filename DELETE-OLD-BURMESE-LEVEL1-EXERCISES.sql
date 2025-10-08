-- ====================================================================
-- SUPPRESSION DES ANCIENS EXERCICES BIRMAN NIVEAU 1
-- ====================================================================
-- Ce fichier SQL permet de supprimer les anciens exercices de birman
-- niveau 1 qui ont seulement 25 et 30 phrases.
-- 
-- À exécuter dans Supabase SQL Editor AVANT de recréer les exercices
-- avec les nouveaux fichiers qui contiennent 100 phrases.
-- ====================================================================

-- Supprimer l'ancien exercice "Birman Niveau 1 - Identification Grammaticale"
-- (celui qui a seulement 25 phrases)
DELETE FROM exercises 
WHERE title = 'Birman Niveau 1 - Identification Grammaticale'
AND language = 'burmese'
AND type = 'grammar-identification';

-- Supprimer l'ancien exercice "Birman Niveau 1 - Mixeur de Phrases"
-- (celui qui a seulement 30 phrases)
DELETE FROM exercises 
WHERE title = 'Birman Niveau 1 - Mixeur de Phrases'
AND language = 'burmese'
AND type = 'sentence-mixer';

-- Vérifier qu'il n'y a plus d'exercices birman niveau 1 en base
SELECT 
    id, 
    title, 
    type, 
    difficulty,
    created_at,
    jsonb_array_length(content->'exercises') as nombre_phrases
FROM exercises 
WHERE language = 'burmese' 
AND difficulty = 1
AND type IN ('grammar-identification', 'sentence-mixer')
ORDER BY created_at DESC;

-- ====================================================================
-- APRÈS AVOIR EXÉCUTÉ CE SCRIPT :
-- ====================================================================
-- 1. Allez sur votre application web
-- 2. Naviguez vers les pages d'insertion :
--    - Pour l'Identification Grammaticale : /insert-burmese-level1-grammar
--    - Pour le Mixeur de Phrases : /insert-burmese-level1-mixer
-- 3. Cliquez sur les boutons pour créer les nouveaux exercices
-- 4. Les nouveaux exercices auront 100 phrases chacun !
-- ====================================================================
