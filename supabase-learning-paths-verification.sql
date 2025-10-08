-- ============================================================================
-- VERIFICATION - LEARNING PATHS
-- Vérifier et corriger l'état de publication des parcours
-- ============================================================================

-- 1. Vérifier l'état actuel des parcours
SELECT 
  id,
  title,
  language,
  is_published,
  created_by,
  created_at
FROM learning_paths
ORDER BY created_at DESC;

-- 2. S'assurer que tous les parcours LIST 1000 sont publiés
UPDATE learning_paths
SET is_published = true
WHERE id IN (
  'path-jap-list-1000-words',
  'path-myr-list-1000-words',
  'path-thai-list-1000-words'
);

-- 3. Vérifier le résultat
SELECT 
  id,
  title,
  is_published,
  'Should be visible to everyone' as status
FROM learning_paths
WHERE id IN (
  'path-jap-list-1000-words',
  'path-myr-list-1000-words',
  'path-thai-list-1000-words'
);

-- 4. Compter les parcours publiés vs non publiés
SELECT 
  is_published,
  COUNT(*) as count
FROM learning_paths
GROUP BY is_published;
