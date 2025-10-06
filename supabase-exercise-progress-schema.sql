-- ============================================================================
-- SCHEMA SQL - USER EXERCISE PROGRESS (Progression des exercices)
-- Description: Table pour suivre la progression des utilisateurs sur chaque exercice
-- ============================================================================

-- Table pour la progression des exercices par utilisateur
CREATE TABLE IF NOT EXISTS user_exercise_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id VARCHAR(255) NOT NULL, -- ID de l'exercice
  learning_path_id VARCHAR(255), -- ID du parcours (NULL si exercice fait en dehors d'un parcours)

  -- Statut
  status VARCHAR(20) NOT NULL DEFAULT 'in_progress', -- 'not_started', 'in_progress', 'completed'

  -- Progression
  first_attempt_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_practiced_at TIMESTAMPTZ DEFAULT NOW(),

  -- Statistiques
  attempts_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,

  -- Score
  best_score INTEGER DEFAULT 0,
  last_score INTEGER DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,

  -- XP et récompenses
  xp_earned INTEGER DEFAULT 0,
  coins_earned INTEGER DEFAULT 0,

  -- Répétition espacée
  next_review_date TIMESTAMPTZ,
  review_interval_days INTEGER DEFAULT 1,
  ease_factor DECIMAL(3,2) DEFAULT 2.5,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes
  UNIQUE(user_id, exercise_id, learning_path_id),
  CHECK (status IN ('not_started', 'in_progress', 'completed')),
  CHECK (attempts_count >= 0),
  CHECK (success_count >= 0),
  CHECK (ease_factor >= 1.3 AND ease_factor <= 3.0)
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_user_exercise_progress_user_id ON user_exercise_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_progress_exercise_id ON user_exercise_progress(exercise_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_progress_path_id ON user_exercise_progress(learning_path_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_progress_user_exercise ON user_exercise_progress(user_id, exercise_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_progress_user_path ON user_exercise_progress(user_id, learning_path_id);
CREATE INDEX IF NOT EXISTS idx_user_exercise_progress_next_review ON user_exercise_progress(next_review_date);
CREATE INDEX IF NOT EXISTS idx_user_exercise_progress_status ON user_exercise_progress(status);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_exercise_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS user_exercise_progress_updated_at ON user_exercise_progress;
CREATE TRIGGER user_exercise_progress_updated_at
  BEFORE UPDATE ON user_exercise_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_exercise_progress_updated_at();

-- RLS (Row Level Security)
ALTER TABLE user_exercise_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own exercise progress"
  ON user_exercise_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own exercise progress"
  ON user_exercise_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own exercise progress"
  ON user_exercise_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own exercise progress"
  ON user_exercise_progress FOR DELETE
  USING (auth.uid() = user_id);

-- Commentaire
COMMENT ON TABLE user_exercise_progress IS 'Progression et statistiques des utilisateurs sur chaque exercice';

-- Vue pour obtenir un résumé rapide de la progression
CREATE OR REPLACE VIEW user_progress_summary AS
SELECT
  user_id,
  learning_path_id,
  COUNT(*) as total_exercises,
  COUNT(*) FILTER (WHERE status = 'completed') as completed_exercises,
  COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_exercises,
  SUM(xp_earned) as total_xp,
  SUM(coins_earned) as total_coins,
  AVG(average_score) as overall_average_score,
  MAX(best_streak) as best_overall_streak
FROM user_exercise_progress
GROUP BY user_id, learning_path_id;

COMMENT ON VIEW user_progress_summary IS 'Vue résumée de la progression par utilisateur et parcours';
