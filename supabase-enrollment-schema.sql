-- ============================================================================
-- SCHEMA SQL - USER LEARNING PATHS (Enrollment)
-- Description: Table pour l'inscription des utilisateurs aux parcours
-- ============================================================================

-- Table pour l'enrollment des utilisateurs aux parcours
CREATE TABLE IF NOT EXISTS user_learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  learning_path_id VARCHAR(255) NOT NULL, -- ID du parcours (string)

  -- Progression
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_activity TIMESTAMPTZ,

  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'enrolled', -- 'enrolled', 'in_progress', 'completed', 'paused'

  -- Progression détaillée
  current_chapter_index INTEGER DEFAULT 0,
  current_exercise_index INTEGER DEFAULT 0,
  completed_items JSONB DEFAULT '[]', -- Array of completed item IDs

  -- Stats
  total_xp_earned INTEGER DEFAULT 0,
  total_coins_earned INTEGER DEFAULT 0,
  completion_percentage DECIMAL(5,2) DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes
  UNIQUE(user_id, learning_path_id),
  CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  CHECK (status IN ('enrolled', 'in_progress', 'completed', 'paused'))
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_user_learning_paths_user_id ON user_learning_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_paths_path_id ON user_learning_paths(learning_path_id);
CREATE INDEX IF NOT EXISTS idx_user_learning_paths_status ON user_learning_paths(status);
CREATE INDEX IF NOT EXISTS idx_user_learning_paths_user_path ON user_learning_paths(user_id, learning_path_id);

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS user_learning_paths_updated_at ON user_learning_paths;
CREATE TRIGGER user_learning_paths_updated_at
  BEFORE UPDATE ON user_learning_paths
  FOR EACH ROW
  EXECUTE FUNCTION update_user_progress_updated_at();

-- RLS (Row Level Security)
ALTER TABLE user_learning_paths ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own enrolled paths"
  ON user_learning_paths FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in paths"
  ON user_learning_paths FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own path progress"
  ON user_learning_paths FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can unenroll from paths"
  ON user_learning_paths FOR DELETE
  USING (auth.uid() = user_id);

-- Commentaire
COMMENT ON TABLE user_learning_paths IS 'Enrollment et progression des utilisateurs dans les parcours d''apprentissage';
