-- ============================================================================
-- CORRECTION AVEC LES VRAIS IDS de votre base de données
-- ============================================================================

-- Les vrais IDs sont path-tha-list-1000 et path-myr-list-1000
UPDATE learning_paths SET is_published = true WHERE id = 'path-tha-list-1000';
UPDATE learning_paths SET is_published = true WHERE id = 'path-myr-list-1000';

-- Vérification
SELECT 
  id,
  title,
  is_published,
  CASE 
    WHEN is_published = true THEN '✅ VISIBLE'
    ELSE '❌ INVISIBLE'
  END as status
FROM learning_paths
ORDER BY created_at DESC;
