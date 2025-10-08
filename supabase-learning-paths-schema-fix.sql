-- ============================================================================
-- FIX RLS - LEARNING PATHS
-- Correction pour permettre l'accès public aux parcours publiés
-- ============================================================================

-- Supprimer l'ancienne politique de lecture
DROP POLICY IF EXISTS "Anyone can view published learning paths" ON learning_paths;

-- Créer une nouvelle politique explicite pour l'accès public
CREATE POLICY "Public can view all published learning paths"
  ON learning_paths FOR SELECT
  USING (
    is_published = true
  );

-- Créer une politique pour que les créateurs voient leurs propres parcours (publiés ou non)
CREATE POLICY "Creators can view their own learning paths"
  ON learning_paths FOR SELECT
  USING (
    auth.uid() IS NOT NULL AND auth.uid() = created_by
  );

-- Commentaire
COMMENT ON POLICY "Public can view all published learning paths" ON learning_paths IS 
  'Permet à tous (connectés ou non) de voir les parcours publiés';

COMMENT ON POLICY "Creators can view their own learning paths" ON learning_paths IS 
  'Permet aux créateurs de voir tous leurs parcours (publiés ou non)';
