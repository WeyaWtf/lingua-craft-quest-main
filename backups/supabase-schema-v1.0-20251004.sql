-- Schema pour la table exercises
-- Exécutez ce script dans votre Dashboard Supabase > SQL Editor

-- Créer la table exercises
CREATE TABLE IF NOT EXISTS exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('flashcard', 'association', 'quiz', 'completion', 'translation', 'conversation')),
  title TEXT NOT NULL,
  description TEXT,
  difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
  source TEXT NOT NULL CHECK (source IN ('community', 'official', 'personal')),
  language TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  content JSONB NOT NULL DEFAULT '{}',
  author_id TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completions INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0
);

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_exercises_type ON exercises(type);
CREATE INDEX IF NOT EXISTS idx_exercises_language ON exercises(language);
CREATE INDEX IF NOT EXISTS idx_exercises_is_published ON exercises(is_published);
CREATE INDEX IF NOT EXISTS idx_exercises_author_id ON exercises(author_id);
CREATE INDEX IF NOT EXISTS idx_exercises_created_at ON exercises(created_at DESC);

-- Activer Row Level Security (RLS)
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Politique: Tout le monde peut lire les exercices publiés
CREATE POLICY "Public exercises are viewable by everyone"
  ON exercises FOR SELECT
  USING (is_published = true);

-- Politique: Tout le monde peut lire ses propres exercices
CREATE POLICY "Users can view their own exercises"
  ON exercises FOR SELECT
  USING (true);

-- Politique: Les utilisateurs peuvent créer leurs propres exercices
CREATE POLICY "Users can create exercises"
  ON exercises FOR INSERT
  WITH CHECK (true);

-- Politique: Les utilisateurs peuvent mettre à jour leurs propres exercices
CREATE POLICY "Users can update their own exercises"
  ON exercises FOR UPDATE
  USING (true);

-- Politique: Les utilisateurs peuvent supprimer leurs propres exercices
CREATE POLICY "Users can delete their own exercises"
  ON exercises FOR DELETE
  USING (true);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON exercises
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insérer quelques exercices d'exemple
INSERT INTO exercises (type, title, description, difficulty, source, language, tags, content, author_id, is_published, completions, rating)
VALUES
  (
    'flashcard',
    'Alphabet birman',
    'Maîtrisez les 33 consonnes et voyelles birmanes',
    1,
    'official',
    'Birman',
    ARRAY['alphabet', 'débutant', 'écriture'],
    '{"cards": [{"front": "မင်္ဂလာပါ", "back": "Bonjour", "category": "vocabulary", "id": "1"}]}',
    'demo',
    true,
    234,
    4.8
  ),
  (
    'association',
    'Salutations essentielles',
    'Apprenez les formules de politesse de base',
    1,
    'community',
    'Birman',
    ARRAY['vocabulaire', 'conversation', 'débutant'],
    '{"pairs": [{"left": "မင်္ဂလာပါ", "right": "Bonjour", "id": "1"}, {"left": "နေကောင်းလား", "right": "Comment allez-vous ?", "id": "2"}]}',
    'demo',
    true,
    189,
    4.6
  );
