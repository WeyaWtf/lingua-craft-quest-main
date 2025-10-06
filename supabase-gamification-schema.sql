-- ============================================================================
-- SCHEMA SQL - SYSTÈME DE GAMIFICATION
-- Version: 1.0
-- Date: 2025-01-05
-- Description: Tables pour XP, coins, niveaux, répétition espacée, devoirs
-- ============================================================================

-- ============================================================================
-- 1. USER PROGRESS (Progression utilisateur globale)
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Gamification
  total_xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  coins INTEGER NOT NULL DEFAULT 0,

  -- Streaks
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes
  UNIQUE(user_id),
  CHECK (total_xp >= 0),
  CHECK (level >= 1),
  CHECK (coins >= 0),
  CHECK (current_streak >= 0),
  CHECK (longest_streak >= 0)
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_level ON user_progress(level DESC);
CREATE INDEX IF NOT EXISTS idx_user_progress_total_xp ON user_progress(total_xp DESC);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_user_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_user_progress_updated_at();

-- ============================================================================
-- 2. EXERCISE ATTEMPTS (Tentatives d'exercices)
-- ============================================================================

CREATE TABLE IF NOT EXISTS exercise_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  learning_path_id UUID,  -- Optional: will add FK constraint when learning_paths table exists

  -- Performance
  score DECIMAL(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,
  errors JSONB NOT NULL DEFAULT '[]',

  -- Contexte
  is_review BOOLEAN NOT NULL DEFAULT false,
  review_iteration INTEGER NOT NULL DEFAULT 0,

  -- Gamification
  xp_earned INTEGER NOT NULL DEFAULT 0,
  coins_earned INTEGER NOT NULL DEFAULT 0,

  -- Métadonnées
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes
  CHECK (time_spent_seconds >= 0),
  CHECK (review_iteration >= 0),
  CHECK (xp_earned >= 0),
  CHECK (coins_earned >= 0)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_user_id ON exercise_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_exercise_id ON exercise_attempts(exercise_id);
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_learning_path_id ON exercise_attempts(learning_path_id);
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_completed_at ON exercise_attempts(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_exercise_attempts_user_exercise ON exercise_attempts(user_id, exercise_id);

-- ============================================================================
-- 3. REVIEW SCHEDULE (Planning de révisions)
-- ============================================================================

CREATE TABLE IF NOT EXISTS review_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  learning_path_id UUID,  -- Optional: will add FK constraint when learning_paths table exists

  -- Historique
  first_attempt_date TIMESTAMPTZ NOT NULL,
  last_review_date TIMESTAMPTZ NOT NULL,
  next_review_date TIMESTAMPTZ NOT NULL,

  -- Algorithme de répétition espacée
  interval_days INTEGER NOT NULL DEFAULT 1,
  ease_factor DECIMAL(3,2) NOT NULL DEFAULT 2.50,
  repetitions INTEGER NOT NULL DEFAULT 0,

  -- État
  mastery_level VARCHAR(20) NOT NULL DEFAULT 'new',
  difficulty_rating INTEGER CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes
  UNIQUE(user_id, exercise_id),
  CHECK (interval_days > 0),
  CHECK (ease_factor >= 1.3 AND ease_factor <= 2.5),
  CHECK (repetitions >= 0),
  CHECK (mastery_level IN ('new', 'learning', 'reviewing', 'mastered'))
);

-- Index
CREATE INDEX IF NOT EXISTS idx_review_schedule_user_id ON review_schedule(user_id);
CREATE INDEX IF NOT EXISTS idx_review_schedule_exercise_id ON review_schedule(exercise_id);
CREATE INDEX IF NOT EXISTS idx_review_schedule_next_review ON review_schedule(next_review_date);
CREATE INDEX IF NOT EXISTS idx_review_schedule_user_next_review ON review_schedule(user_id, next_review_date);
CREATE INDEX IF NOT EXISTS idx_review_schedule_mastery ON review_schedule(mastery_level);

-- Trigger updated_at
CREATE TRIGGER review_schedule_updated_at
  BEFORE UPDATE ON review_schedule
  FOR EACH ROW
  EXECUTE FUNCTION update_user_progress_updated_at();

-- ============================================================================
-- 4. DAILY ASSIGNMENTS (Devoirs quotidiens)
-- ============================================================================

CREATE TABLE IF NOT EXISTS daily_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assignment_date DATE NOT NULL,

  -- Contenu
  new_exercises JSONB NOT NULL DEFAULT '[]',
  review_exercises JSONB NOT NULL DEFAULT '[]',

  -- Progression
  completed BOOLEAN NOT NULL DEFAULT false,
  completion_rate DECIMAL(5,2) NOT NULL DEFAULT 0,

  -- Récompenses
  total_xp_available INTEGER NOT NULL DEFAULT 0,
  xp_earned INTEGER NOT NULL DEFAULT 0,
  total_coins_available INTEGER NOT NULL DEFAULT 0,
  coins_earned INTEGER NOT NULL DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes
  UNIQUE(user_id, assignment_date),
  CHECK (completion_rate >= 0 AND completion_rate <= 100),
  CHECK (total_xp_available >= 0),
  CHECK (xp_earned >= 0 AND xp_earned <= total_xp_available),
  CHECK (total_coins_available >= 0),
  CHECK (coins_earned >= 0 AND coins_earned <= total_coins_available)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_daily_assignments_user_id ON daily_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_assignments_date ON daily_assignments(assignment_date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_assignments_user_date ON daily_assignments(user_id, assignment_date);
CREATE INDEX IF NOT EXISTS idx_daily_assignments_completed ON daily_assignments(completed);

-- Trigger updated_at
CREATE TRIGGER daily_assignments_updated_at
  BEFORE UPDATE ON daily_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_user_progress_updated_at();

-- ============================================================================
-- 5. LEARNING PATH PROGRESS (Progression dans les learning paths)
-- ============================================================================
-- NOTE: This table is disabled until learning_paths table is created
-- Uncomment when learning_paths table exists

/*
CREATE TABLE IF NOT EXISTS learning_path_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  learning_path_id UUID NOT NULL,  -- Will add FK constraint when learning_paths exists

  -- Progression
  current_chapter_id UUID,
  current_exercise_index INTEGER NOT NULL DEFAULT 0,
  completed_exercises JSONB NOT NULL DEFAULT '[]',
  completed_chapters JSONB NOT NULL DEFAULT '[]',

  -- Topics
  topics_read JSONB NOT NULL DEFAULT '[]',
  topics_completed JSONB NOT NULL DEFAULT '[]',

  -- Stats
  total_xp_earned INTEGER NOT NULL DEFAULT 0,
  total_coins_earned INTEGER NOT NULL DEFAULT 0,
  completion_percentage DECIMAL(5,2) NOT NULL DEFAULT 0,

  -- Timestamps
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_activity TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- Contraintes
  UNIQUE(user_id, learning_path_id),
  CHECK (current_exercise_index >= 0),
  CHECK (total_xp_earned >= 0),
  CHECK (total_coins_earned >= 0),
  CHECK (completion_percentage >= 0 AND completion_percentage <= 100)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_learning_path_progress_user_id ON learning_path_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_path_progress_path_id ON learning_path_progress(learning_path_id);
CREATE INDEX IF NOT EXISTS idx_learning_path_progress_user_path ON learning_path_progress(user_id, learning_path_id);
CREATE INDEX IF NOT EXISTS idx_learning_path_progress_completion ON learning_path_progress(completion_percentage);
*/

-- ============================================================================
-- 6. SHOP ITEMS (Articles de la boutique)
-- ============================================================================

CREATE TABLE IF NOT EXISTS shop_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Informations
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(20) NOT NULL,

  -- Prix
  price_coins INTEGER NOT NULL,

  -- Métadonnées
  image_url TEXT,
  metadata JSONB DEFAULT '{}',
  is_available BOOLEAN NOT NULL DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes
  CHECK (price_coins > 0),
  CHECK (category IN ('avatar', 'theme', 'powerup', 'content'))
);

-- Index
CREATE INDEX IF NOT EXISTS idx_shop_items_category ON shop_items(category);
CREATE INDEX IF NOT EXISTS idx_shop_items_available ON shop_items(is_available);

-- ============================================================================
-- 7. USER INVENTORY (Inventaire utilisateur)
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES shop_items(id) ON DELETE CASCADE,

  -- État
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_equipped BOOLEAN NOT NULL DEFAULT false,
  quantity INTEGER NOT NULL DEFAULT 1,

  -- Métadonnées (pour powerups avec durée)
  metadata JSONB DEFAULT '{}',

  -- Contraintes
  CHECK (quantity > 0)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_user_inventory_user_id ON user_inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_user_inventory_item_id ON user_inventory(item_id);
CREATE INDEX IF NOT EXISTS idx_user_inventory_equipped ON user_inventory(user_id, is_equipped);

-- ============================================================================
-- 8. ACTIVE POWERUPS (Power-ups actifs)
-- ============================================================================

CREATE TABLE IF NOT EXISTS active_powerups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES shop_items(id) ON DELETE CASCADE,

  -- Durée
  activated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,

  -- Type de powerup
  powerup_type VARCHAR(50) NOT NULL,

  -- Métadonnées
  metadata JSONB DEFAULT '{}',

  -- Contraintes
  CHECK (expires_at > activated_at),
  CHECK (powerup_type IN ('double_xp', 'freeze_streak', 'hint_pack', 'skip_review'))
);

-- Index
CREATE INDEX IF NOT EXISTS idx_active_powerups_user_id ON active_powerups(user_id);
CREATE INDEX IF NOT EXISTS idx_active_powerups_expires ON active_powerups(expires_at);
CREATE INDEX IF NOT EXISTS idx_active_powerups_user_active ON active_powerups(user_id, expires_at);

-- ============================================================================
-- 9. ACHIEVEMENTS / BADGES (Accomplissements)
-- ============================================================================

CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Informations
  code VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,

  -- Récompenses
  xp_reward INTEGER NOT NULL DEFAULT 0,
  coin_reward INTEGER NOT NULL DEFAULT 0,

  -- Critères
  criteria JSONB NOT NULL,

  -- Métadonnées
  icon_url TEXT,
  rarity VARCHAR(20) DEFAULT 'common',

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes
  CHECK (xp_reward >= 0),
  CHECK (coin_reward >= 0),
  CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);

CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(category);
CREATE INDEX IF NOT EXISTS idx_achievements_rarity ON achievements(rarity);

-- ============================================================================
-- 10. USER ACHIEVEMENTS (Achievements débloqués)
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,

  -- Progression
  progress INTEGER NOT NULL DEFAULT 0,
  unlocked BOOLEAN NOT NULL DEFAULT false,
  unlocked_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes
  UNIQUE(user_id, achievement_id),
  CHECK (progress >= 0)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_unlocked ON user_achievements(user_id, unlocked);

-- ============================================================================
-- 11. SPACED REPETITION CONFIG (Configuration par learning path)
-- ============================================================================

CREATE TABLE IF NOT EXISTS spaced_repetition_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_path_id UUID,  -- Optional: will add FK constraint when learning_paths exists

  -- Configuration globale si learning_path_id est NULL
  is_default BOOLEAN NOT NULL DEFAULT false,

  -- Paramètres
  initial_interval_days INTEGER NOT NULL DEFAULT 1,
  interval_multipliers INTEGER[] NOT NULL DEFAULT ARRAY[1, 2, 4, 7, 14, 30, 60],

  -- Seuils
  mastery_threshold INTEGER NOT NULL DEFAULT 90,
  review_threshold INTEGER NOT NULL DEFAULT 70,

  -- Ajustements difficulté
  easy_multiplier DECIMAL(3,2) NOT NULL DEFAULT 1.50,
  medium_multiplier DECIMAL(3,2) NOT NULL DEFAULT 1.00,
  hard_multiplier DECIMAL(3,2) NOT NULL DEFAULT 0.70,

  -- Limites
  max_interval_days INTEGER NOT NULL DEFAULT 180,
  min_reviews_before_mastery INTEGER NOT NULL DEFAULT 5,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes
  CHECK (initial_interval_days > 0),
  CHECK (mastery_threshold > 0 AND mastery_threshold <= 100),
  CHECK (review_threshold > 0 AND review_threshold <= 100),
  CHECK (easy_multiplier > 0),
  CHECK (medium_multiplier > 0),
  CHECK (hard_multiplier > 0),
  CHECK (max_interval_days > 0),
  CHECK (min_reviews_before_mastery > 0)
);

-- Index
CREATE INDEX IF NOT EXISTS idx_sr_config_path_id ON spaced_repetition_config(learning_path_id);
CREATE INDEX IF NOT EXISTS idx_sr_config_default ON spaced_repetition_config(is_default);

-- ============================================================================
-- FONCTIONS UTILITAIRES
-- ============================================================================

-- Fonction : Calculer le niveau basé sur XP total
CREATE OR REPLACE FUNCTION calculate_level(total_xp INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN FLOOR(POWER(total_xp / 100.0, 1.0 / 1.5)) + 1;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Fonction : XP requis pour le prochain niveau
CREATE OR REPLACE FUNCTION xp_for_next_level(current_level INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN ROUND(100 * POWER(current_level + 1, 1.5));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Fonction : Mettre à jour le niveau automatiquement
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.level = calculate_level(NEW.total_xp);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_progress_level_update
  BEFORE INSERT OR UPDATE OF total_xp ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_user_level();

-- Fonction : Initialiser user_progress pour nouveau utilisateur
CREATE OR REPLACE FUNCTION init_user_progress()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_progress (user_id, total_xp, level, coins)
  VALUES (NEW.id, 0, 1, 0)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour auto-créer user_progress (nécessite auth.users)
-- CREATE TRIGGER auto_init_user_progress
--   AFTER INSERT ON auth.users
--   FOR EACH ROW
--   EXECUTE FUNCTION init_user_progress();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Activer RLS sur toutes les tables
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_assignments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE learning_path_progress ENABLE ROW LEVEL SECURITY;  -- Disabled until table exists
ALTER TABLE shop_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_powerups ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE spaced_repetition_config ENABLE ROW LEVEL SECURITY;

-- Policies pour user_progress
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policies pour exercise_attempts
CREATE POLICY "Users can view own attempts"
  ON exercise_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attempts"
  ON exercise_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policies pour review_schedule
CREATE POLICY "Users can view own reviews"
  ON review_schedule FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own reviews"
  ON review_schedule FOR ALL
  USING (auth.uid() = user_id);

-- Policies pour daily_assignments
CREATE POLICY "Users can view own assignments"
  ON daily_assignments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own assignments"
  ON daily_assignments FOR ALL
  USING (auth.uid() = user_id);

-- Policies pour learning_path_progress (disabled until table is created)
/*
CREATE POLICY "Users can view own path progress"
  ON learning_path_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own path progress"
  ON learning_path_progress FOR ALL
  USING (auth.uid() = user_id);
*/

-- Policies pour shop_items (lecture publique)
CREATE POLICY "Anyone can view available shop items"
  ON shop_items FOR SELECT
  USING (is_available = true);

-- Policies pour user_inventory
CREATE POLICY "Users can view own inventory"
  ON user_inventory FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own inventory"
  ON user_inventory FOR ALL
  USING (auth.uid() = user_id);

-- Policies pour active_powerups
CREATE POLICY "Users can view own powerups"
  ON active_powerups FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own powerups"
  ON active_powerups FOR ALL
  USING (auth.uid() = user_id);

-- Policies pour achievements (lecture publique)
CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  USING (true);

-- Policies pour user_achievements
CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own achievements"
  ON user_achievements FOR ALL
  USING (auth.uid() = user_id);

-- Policies pour spaced_repetition_config (lecture publique)
CREATE POLICY "Anyone can view SR configs"
  ON spaced_repetition_config FOR SELECT
  USING (true);

-- ============================================================================
-- DONNÉES INITIALES
-- ============================================================================

-- Configuration par défaut de répétition espacée
INSERT INTO spaced_repetition_config (
  is_default,
  initial_interval_days,
  interval_multipliers,
  mastery_threshold,
  review_threshold,
  easy_multiplier,
  medium_multiplier,
  hard_multiplier,
  max_interval_days,
  min_reviews_before_mastery
) VALUES (
  true,
  1,
  ARRAY[1, 2, 4, 7, 14, 30, 60],
  90,
  70,
  1.50,
  1.00,
  0.70,
  180,
  5
) ON CONFLICT DO NOTHING;

-- Achievements par défaut
INSERT INTO achievements (code, name, description, category, xp_reward, coin_reward, criteria, rarity) VALUES
  ('first_exercise', 'Premier Pas', 'Complétez votre premier exercice', 'beginner', 50, 25, '{"type": "exercise_count", "value": 1}', 'common'),
  ('10_exercises', 'Débutant Déterminé', 'Complétez 10 exercices', 'progress', 100, 50, '{"type": "exercise_count", "value": 10}', 'common'),
  ('50_exercises', 'Pratiquant Assidu', 'Complétez 50 exercices', 'progress', 250, 100, '{"type": "exercise_count", "value": 50}', 'rare'),
  ('100_exercises', 'Centurion', 'Complétez 100 exercices', 'progress', 500, 250, '{"type": "exercise_count", "value": 100}', 'epic'),
  ('7_day_streak', 'Semaine Parfaite', 'Maintenez une série de 7 jours', 'streak', 200, 100, '{"type": "streak", "value": 7}', 'rare'),
  ('30_day_streak', 'Mois Légendaire', 'Maintenez une série de 30 jours', 'streak', 1000, 500, '{"type": "streak", "value": 30}', 'legendary'),
  ('first_path_complete', 'Chemin Accompli', 'Terminez votre premier learning path', 'milestone', 300, 150, '{"type": "path_complete", "value": 1}', 'rare'),
  ('perfect_score', 'Perfection', 'Obtenez un score parfait de 100%', 'skill', 100, 50, '{"type": "perfect_score", "value": 1}', 'rare'),
  ('level_10', 'Niveau X', 'Atteignez le niveau 10', 'level', 500, 250, '{"type": "level", "value": 10}', 'epic'),
  ('shopaholic', 'Collectionneur', 'Achetez 10 articles dans la boutique', 'shop', 200, 100, '{"type": "shop_purchases", "value": 10}', 'rare')
ON CONFLICT (code) DO NOTHING;

-- Articles de boutique par défaut
INSERT INTO shop_items (name, description, category, price_coins, image_url, is_available) VALUES
  ('Avatar Ninja', 'Maître des langues orientales', 'avatar', 500, '/assets/avatars/ninja.png', true),
  ('Avatar Polyglotte', 'Expert en langues multiples', 'avatar', 500, '/assets/avatars/polyglot.png', true),
  ('Thème Sombre', 'Interface élégante pour apprendre la nuit', 'theme', 300, '/assets/themes/dark.png', true),
  ('Thème Océan', 'Ambiance apaisante bleu océan', 'theme', 300, '/assets/themes/ocean.png', true),
  ('Double XP - 24h', 'Gagnez 2x plus d''XP pendant 24h', 'powerup', 200, '/assets/powerups/double_xp.png', true),
  ('Gel de Série x1', 'Protège votre série pendant 1 jour manqué', 'powerup', 100, '/assets/powerups/freeze.png', true),
  ('Gel de Série x3', 'Protège votre série pendant 3 jours manqués', 'powerup', 250, '/assets/powerups/freeze_3.png', true),
  ('Pack d''Indices x5', '5 indices utilisables dans les exercices', 'powerup', 150, '/assets/powerups/hints.png', true),
  ('Pack d''Indices x10', '10 indices utilisables dans les exercices', 'powerup', 250, '/assets/powerups/hints_10.png', true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- FIN DU SCHEMA
-- ============================================================================

-- Commentaires
COMMENT ON TABLE user_progress IS 'Progression globale de l''utilisateur (XP, niveau, coins, streaks)';
COMMENT ON TABLE exercise_attempts IS 'Historique de toutes les tentatives d''exercices';
COMMENT ON TABLE review_schedule IS 'Planning de révisions basé sur répétition espacée';
COMMENT ON TABLE daily_assignments IS 'Devoirs quotidiens générés automatiquement';
-- COMMENT ON TABLE learning_path_progress IS 'Progression dans chaque learning path';  -- Disabled until table exists
COMMENT ON TABLE shop_items IS 'Catalogue d''articles achetables';
COMMENT ON TABLE user_inventory IS 'Inventaire des articles possédés par utilisateur';
COMMENT ON TABLE active_powerups IS 'Power-ups actuellement actifs';
COMMENT ON TABLE achievements IS 'Définition des accomplissements/badges';
COMMENT ON TABLE user_achievements IS 'Accomplissements débloqués par utilisateur';
COMMENT ON TABLE spaced_repetition_config IS 'Configuration de l''algorithme de répétition espacée';
