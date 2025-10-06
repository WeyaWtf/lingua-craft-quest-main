-- ============================================================================
-- SCHEMA SQL - LEARNING PATHS (Parcours d'apprentissage)
-- Description: Table pour stocker les parcours d'apprentissage de manière persistante
-- ============================================================================

-- Table pour les parcours d'apprentissage
CREATE TABLE IF NOT EXISTS learning_paths (
  id VARCHAR(255) PRIMARY KEY, -- Format: path-{slug}
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  language VARCHAR(100) NOT NULL,
  difficulty INTEGER NOT NULL CHECK (difficulty >= 1 AND difficulty <= 5),
  estimated_time VARCHAR(100) NOT NULL,
  icon VARCHAR(10) NOT NULL DEFAULT '🎯',
  color VARCHAR(100) NOT NULL DEFAULT 'from-blue-500 to-cyan-500',

  -- Structure hiérarchique (JSON)
  structure JSONB DEFAULT '[]',

  -- Liste des IDs d'exercices (pour compatibilité)
  exercise_ids JSONB DEFAULT '[]',

  -- Métadonnées
  rating DECIMAL(2,1) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  total_enrollments INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  is_official BOOLEAN DEFAULT false,

  -- Auteur
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_learning_paths_language ON learning_paths(language);
CREATE INDEX IF NOT EXISTS idx_learning_paths_difficulty ON learning_paths(difficulty);
CREATE INDEX IF NOT EXISTS idx_learning_paths_published ON learning_paths(is_published);
CREATE INDEX IF NOT EXISTS idx_learning_paths_created_by ON learning_paths(created_by);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_learning_paths_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER learning_paths_updated_at
  BEFORE UPDATE ON learning_paths
  FOR EACH ROW
  EXECUTE FUNCTION update_learning_paths_updated_at();

-- RLS (Row Level Security)
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;

-- Policies - Lecture publique, création/modification pour créateurs
CREATE POLICY "Anyone can view published learning paths"
  ON learning_paths FOR SELECT
  USING (is_published = true OR auth.uid() = created_by);

CREATE POLICY "Authenticated users can create learning paths"
  ON learning_paths FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own learning paths"
  ON learning_paths FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own learning paths"
  ON learning_paths FOR DELETE
  USING (auth.uid() = created_by);

-- Commentaire
COMMENT ON TABLE learning_paths IS 'Parcours d''apprentissage persistants stockés dans Supabase';

-- Vue pour statistiques des parcours
CREATE OR REPLACE VIEW learning_paths_stats AS
SELECT
  lp.id,
  lp.title,
  lp.language,
  lp.difficulty,
  COUNT(DISTINCT ulp.user_id) as total_users_enrolled,
  AVG(ulp.completion_percentage) as avg_completion_percentage,
  COUNT(DISTINCT ulp.user_id) FILTER (WHERE ulp.status = 'completed') as total_users_completed
FROM learning_paths lp
LEFT JOIN user_learning_paths ulp ON lp.id = ulp.learning_path_id
GROUP BY lp.id, lp.title, lp.language, lp.difficulty;

COMMENT ON VIEW learning_paths_stats IS 'Statistiques des parcours d''apprentissage';
