-- ============================================================================
-- FIX URGENT - Publier les parcours MYR et THAI
-- ============================================================================

-- Mettre is_published = true pour les parcours MYR et THAI
UPDATE learning_paths
SET is_published = true
WHERE id IN (
  'path-myr-list-1000-words',
  'path-thai-list-1000-words'
);

-- Vérifier que ça a fonctionné
SELECT 
  id,
  title,
  language,
  is_published,
  CASE 
    WHEN is_published = true THEN '✅ PUBLIÉ - Visible par tous'
    ELSE '❌ NON PUBLIÉ - Invisible'
  END as status
FROM learning_paths
ORDER BY created_at DESC;
