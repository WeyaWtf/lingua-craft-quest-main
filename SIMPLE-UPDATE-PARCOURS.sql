-- ============================================================================
-- SCRIPT ULTRA SIMPLE - Publier les parcours MYR et THAI
-- Exécutez UNIQUEMENT ce script
-- ============================================================================

-- Mettre à jour les parcours un par un
UPDATE learning_paths SET is_published = true WHERE id = 'path-myr-list-1000-words';
UPDATE learning_paths SET is_published = true WHERE id = 'path-thai-list-1000-words';

-- Vérifier immédiatement le résultat
SELECT 
  id,
  title,
  language,
  is_published,
  CASE 
    WHEN is_published = true THEN '✅ PUBLIÉ'
    ELSE '❌ NON PUBLIÉ'
  END as status
FROM learning_paths
WHERE id IN (
  'path-jap-list-1000-words',
  'path-myr-list-1000-words',
  'path-thai-list-1000-words'
)
ORDER BY id;
