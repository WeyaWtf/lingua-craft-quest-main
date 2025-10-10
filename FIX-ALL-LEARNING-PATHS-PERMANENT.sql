-- ============================================================================
-- FIX PERMANENT - TOUS LES PARCOURS D'APPRENTISSAGE
-- Objectif: Restaurer la structure complète des 4 parcours (JAP, MYR, THA, KOR)
-- Date: 2025-01-10
-- ============================================================================

-- NOTE: Ce script peut être exécuté plusieurs fois sans problème (idempotent)

-- ============================================================================
-- 1. JAPANESE LIST 1000 WORDS (devrait déjà exister et fonctionner)
-- ============================================================================

INSERT INTO learning_paths (
  id,
  title,
  description,
  language,
  difficulty,
  estimated_time,
  icon,
  color,
  structure,
  exercise_ids,
  is_published,
  is_official,
  rating
) VALUES (
  'path-jap-list-1000-words',
  'JAP LIST 1000 WORDS',
  'Complete Japanese vocabulary learning path with 1000 most common words organized in 10 chapters of 100 words each, with 4 sub-chapters per chapter.',
  'japanese',
  1,
  'Environ 200 heures',
  '🇯🇵',
  'from-red-500 to-pink-500',
  -- Structure: 10 chapitres (100, 200, ... 1000) avec 4 sous-chapitres chacun (25, 50, 75, 100)
  '[
    {"type":"chapter","id":"chapter-100","title":"100","items":[
      {"type":"subchapter","id":"subchapter-25","title":"25","items":[]},
      {"type":"subchapter","id":"subchapter-50","title":"50","items":[]},
      {"type":"subchapter","id":"subchapter-75","title":"75","items":[]},
      {"type":"subchapter","id":"subchapter-100","title":"100","items":[]}
    ]},
    {"type":"chapter","id":"chapter-200","title":"200","items":[
      {"type":"subchapter","id":"subchapter-125","title":"125","items":[]},
      {"type":"subchapter","id":"subchapter-150","title":"150","items":[]},
      {"type":"subchapter","id":"subchapter-175","title":"175","items":[]},
      {"type":"subchapter","id":"subchapter-200","title":"200","items":[]}
    ]},
    {"type":"chapter","id":"chapter-300","title":"300","items":[
      {"type":"subchapter","id":"subchapter-225","title":"225","items":[]},
      {"type":"subchapter","id":"subchapter-250","title":"250","items":[]},
      {"type":"subchapter","id":"subchapter-275","title":"275","items":[]},
      {"type":"subchapter","id":"subchapter-300","title":"300","items":[]}
    ]},
    {"type":"chapter","id":"chapter-400","title":"400","items":[
      {"type":"subchapter","id":"subchapter-325","title":"325","items":[]},
      {"type":"subchapter","id":"subchapter-350","title":"350","items":[]},
      {"type":"subchapter","id":"subchapter-375","title":"375","items":[]},
      {"type":"subchapter","id":"subchapter-400","title":"400","items":[]}
    ]},
    {"type":"chapter","id":"chapter-500","title":"500","items":[
      {"type":"subchapter","id":"subchapter-425","title":"425","items":[]},
      {"type":"subchapter","id":"subchapter-450","title":"450","items":[]},
      {"type":"subchapter","id":"subchapter-475","title":"475","items":[]},
      {"type":"subchapter","id":"subchapter-500","title":"500","items":[]}
    ]},
    {"type":"chapter","id":"chapter-600","title":"600","items":[
      {"type":"subchapter","id":"subchapter-525","title":"525","items":[]},
      {"type":"subchapter","id":"subchapter-550","title":"550","items":[]},
      {"type":"subchapter","id":"subchapter-575","title":"575","items":[]},
      {"type":"subchapter","id":"subchapter-600","title":"600","items":[]}
    ]},
    {"type":"chapter","id":"chapter-700","title":"700","items":[
      {"type":"subchapter","id":"subchapter-625","title":"625","items":[]},
      {"type":"subchapter","id":"subchapter-650","title":"650","items":[]},
      {"type":"subchapter","id":"subchapter-675","title":"675","items":[]},
      {"type":"subchapter","id":"subchapter-700","title":"700","items":[]}
    ]},
    {"type":"chapter","id":"chapter-800","title":"800","items":[
      {"type":"subchapter","id":"subchapter-725","title":"725","items":[]},
      {"type":"subchapter","id":"subchapter-750","title":"750","items":[]},
      {"type":"subchapter","id":"subchapter-775","title":"775","items":[]},
      {"type":"subchapter","id":"subchapter-800","title":"800","items":[]}
    ]},
    {"type":"chapter","id":"chapter-900","title":"900","items":[
      {"type":"subchapter","id":"subchapter-825","title":"825","items":[]},
      {"type":"subchapter","id":"subchapter-850","title":"850","items":[]},
      {"type":"subchapter","id":"subchapter-875","title":"875","items":[]},
      {"type":"subchapter","id":"subchapter-900","title":"900","items":[]}
    ]},
    {"type":"chapter","id":"chapter-1000","title":"1000","items":[
      {"type":"subchapter","id":"subchapter-925","title":"925","items":[]},
      {"type":"subchapter","id":"subchapter-950","title":"950","items":[]},
      {"type":"subchapter","id":"subchapter-975","title":"975","items":[]},
      {"type":"subchapter","id":"subchapter-1000","title":"1000","items":[]}
    ]}
  ]'::jsonb,
  '[]'::jsonb,
  true,
  true,
  5.0
)
ON CONFLICT (id) DO UPDATE SET
  structure = EXCLUDED.structure,
  updated_at = NOW();

-- ============================================================================
-- 2. BURMESE (MYANMAR) LIST 1000 WORDS
-- ============================================================================

INSERT INTO learning_paths (
  id,
  title,
  description,
  language,
  difficulty,
  estimated_time,
  icon,
  color,
  structure,
  exercise_ids,
  is_published,
  is_official,
  rating
) VALUES (
  'path-myr-list-1000-words',
  'MYR LIST 1000 WORDS',
  'Complete Burmese vocabulary learning path with 1000 most common words organized in 10 chapters of 100 words each, with 4 sub-chapters per chapter.',
  'burmese',
  1,
  'Environ 200 heures',
  '🇲🇲',
  'from-yellow-500 to-red-500',
  -- Même structure que JAP
  '[
    {"type":"chapter","id":"chapter-100","title":"100","items":[
      {"type":"subchapter","id":"subchapter-25","title":"25","items":[]},
      {"type":"subchapter","id":"subchapter-50","title":"50","items":[]},
      {"type":"subchapter","id":"subchapter-75","title":"75","items":[]},
      {"type":"subchapter","id":"subchapter-100","title":"100","items":[]}
    ]},
    {"type":"chapter","id":"chapter-200","title":"200","items":[
      {"type":"subchapter","id":"subchapter-125","title":"125","items":[]},
      {"type":"subchapter","id":"subchapter-150","title":"150","items":[]},
      {"type":"subchapter","id":"subchapter-175","title":"175","items":[]},
      {"type":"subchapter","id":"subchapter-200","title":"200","items":[]}
    ]},
    {"type":"chapter","id":"chapter-300","title":"300","items":[
      {"type":"subchapter","id":"subchapter-225","title":"225","items":[]},
      {"type":"subchapter","id":"subchapter-250","title":"250","items":[]},
      {"type":"subchapter","id":"subchapter-275","title":"275","items":[]},
      {"type":"subchapter","id":"subchapter-300","title":"300","items":[]}
    ]},
    {"type":"chapter","id":"chapter-400","title":"400","items":[
      {"type":"subchapter","id":"subchapter-325","title":"325","items":[]},
      {"type":"subchapter","id":"subchapter-350","title":"350","items":[]},
      {"type":"subchapter","id":"subchapter-375","title":"375","items":[]},
      {"type":"subchapter","id":"subchapter-400","title":"400","items":[]}
    ]},
    {"type":"chapter","id":"chapter-500","title":"500","items":[
      {"type":"subchapter","id":"subchapter-425","title":"425","items":[]},
      {"type":"subchapter","id":"subchapter-450","title":"450","items":[]},
      {"type":"subchapter","id":"subchapter-475","title":"475","items":[]},
      {"type":"subchapter","id":"subchapter-500","title":"500","items":[]}
    ]},
    {"type":"chapter","id":"chapter-600","title":"600","items":[
      {"type":"subchapter","id":"subchapter-525","title":"525","items":[]},
      {"type":"subchapter","id":"subchapter-550","title":"550","items":[]},
      {"type":"subchapter","id":"subchapter-575","title":"575","items":[]},
      {"type":"subchapter","id":"subchapter-600","title":"600","items":[]}
    ]},
    {"type":"chapter","id":"chapter-700","title":"700","items":[
      {"type":"subchapter","id":"subchapter-625","title":"625","items":[]},
      {"type":"subchapter","id":"subchapter-650","title":"650","items":[]},
      {"type":"subchapter","id":"subchapter-675","title":"675","items":[]},
      {"type":"subchapter","id":"subchapter-700","title":"700","items":[]}
    ]},
    {"type":"chapter","id":"chapter-800","title":"800","items":[
      {"type":"subchapter","id":"subchapter-725","title":"725","items":[]},
      {"type":"subchapter","id":"subchapter-750","title":"750","items":[]},
      {"type":"subchapter","id":"subchapter-775","title":"775","items":[]},
      {"type":"subchapter","id":"subchapter-800","title":"800","items":[]}
    ]},
    {"type":"chapter","id":"chapter-900","title":"900","items":[
      {"type":"subchapter","id":"subchapter-825","title":"825","items":[]},
      {"type":"subchapter","id":"subchapter-850","title":"850","items":[]},
      {"type":"subchapter","id":"subchapter-875","title":"875","items":[]},
      {"type":"subchapter","id":"subchapter-900","title":"900","items":[]}
    ]},
    {"type":"chapter","id":"chapter-1000","title":"1000","items":[
      {"type":"subchapter","id":"subchapter-925","title":"925","items":[]},
      {"type":"subchapter","id":"subchapter-950","title":"950","items":[]},
      {"type":"subchapter","id":"subchapter-975","title":"975","items":[]},
      {"type":"subchapter","id":"subchapter-1000","title":"1000","items":[]}
    ]}
  ]'::jsonb,
  '[]'::jsonb,
  true,
  true,
  5.0
)
ON CONFLICT (id) DO UPDATE SET
  structure = EXCLUDED.structure,
  updated_at = NOW();

-- ============================================================================
-- 3. THAI LIST 1000 WORDS
-- ============================================================================

INSERT INTO learning_paths (
  id,
  title,
  description,
  language,
  difficulty,
  estimated_time,
  icon,
  color,
  structure,
  exercise_ids,
  is_published,
  is_official,
  rating
) VALUES (
  'path-tha-list-1000-words',
  'THA LIST 1000 WORDS',
  'Complete Thai vocabulary learning path with 1000 most common words organized in 10 chapters of 100 words each, with 4 sub-chapters per chapter.',
  'thai',
  1,
  'Environ 200 heures',
  '🇹🇭',
  'from-blue-500 to-red-500',
  -- Même structure que JAP
  '[
    {"type":"chapter","id":"chapter-100","title":"100","items":[
      {"type":"subchapter","id":"subchapter-25","title":"25","items":[]},
      {"type":"subchapter","id":"subchapter-50","title":"50","items":[]},
      {"type":"subchapter","id":"subchapter-75","title":"75","items":[]},
      {"type":"subchapter","id":"subchapter-100","title":"100","items":[]}
    ]},
    {"type":"chapter","id":"chapter-200","title":"200","items":[
      {"type":"subchapter","id":"subchapter-125","title":"125","items":[]},
      {"type":"subchapter","id":"subchapter-150","title":"150","items":[]},
      {"type":"subchapter","id":"subchapter-175","title":"175","items":[]},
      {"type":"subchapter","id":"subchapter-200","title":"200","items":[]}
    ]},
    {"type":"chapter","id":"chapter-300","title":"300","items":[
      {"type":"subchapter","id":"subchapter-225","title":"225","items":[]},
      {"type":"subchapter","id":"subchapter-250","title":"250","items":[]},
      {"type":"subchapter","id":"subchapter-275","title":"275","items":[]},
      {"type":"subchapter","id":"subchapter-300","title":"300","items":[]}
    ]},
    {"type":"chapter","id":"chapter-400","title":"400","items":[
      {"type":"subchapter","id":"subchapter-325","title":"325","items":[]},
      {"type":"subchapter","id":"subchapter-350","title":"350","items":[]},
      {"type":"subchapter","id":"subchapter-375","title":"375","items":[]},
      {"type":"subchapter","id":"subchapter-400","title":"400","items":[]}
    ]},
    {"type":"chapter","id":"chapter-500","title":"500","items":[
      {"type":"subchapter","id":"subchapter-425","title":"425","items":[]},
      {"type":"subchapter","id":"subchapter-450","title":"450","items":[]},
      {"type":"subchapter","id":"subchapter-475","title":"475","items":[]},
      {"type":"subchapter","id":"subchapter-500","title":"500","items":[]}
    ]},
    {"type":"chapter","id":"chapter-600","title":"600","items":[
      {"type":"subchapter","id":"subchapter-525","title":"525","items":[]},
      {"type":"subchapter","id":"subchapter-550","title":"550","items":[]},
      {"type":"subchapter","id":"subchapter-575","title":"575","items":[]},
      {"type":"subchapter","id":"subchapter-600","title":"600","items":[]}
    ]},
    {"type":"chapter","id":"chapter-700","title":"700","items":[
      {"type":"subchapter","id":"subchapter-625","title":"625","items":[]},
      {"type":"subchapter","id":"subchapter-650","title":"650","items":[]},
      {"type":"subchapter","id":"subchapter-675","title":"675","items":[]},
      {"type":"subchapter","id":"subchapter-700","title":"700","items":[]}
    ]},
    {"type":"chapter","id":"chapter-800","title":"800","items":[
      {"type":"subchapter","id":"subchapter-725","title":"725","items":[]},
      {"type":"subchapter","id":"subchapter-750","title":"750","items":[]},
      {"type":"subchapter","id":"subchapter-775","title":"775","items":[]},
      {"type":"subchapter","id":"subchapter-800","title":"800","items":[]}
    ]},
    {"type":"chapter","id":"chapter-900","title":"900","items":[
      {"type":"subchapter","id":"subchapter-825","title":"825","items":[]},
      {"type":"subchapter","id":"subchapter-850","title":"850","items":[]},
      {"type":"subchapter","id":"subchapter-875","title":"875","items":[]},
      {"type":"subchapter","id":"subchapter-900","title":"900","items":[]}
    ]},
    {"type":"chapter","id":"chapter-1000","title":"1000","items":[
      {"type":"subchapter","id":"subchapter-925","title":"925","items":[]},
      {"type":"subchapter","id":"subchapter-950","title":"950","items":[]},
      {"type":"subchapter","id":"subchapter-975","title":"975","items":[]},
      {"type":"subchapter","id":"subchapter-1000","title":"1000","items":[]}
    ]}
  ]'::jsonb,
  '[]'::jsonb,
  true,
  true,
  5.0
)
ON CONFLICT (id) DO UPDATE SET
  structure = EXCLUDED.structure,
  updated_at = NOW();

-- ============================================================================
-- 4. KOREAN LIST 1000 WORDS (si applicable)
-- ============================================================================

INSERT INTO learning_paths (
  id,
  title,
  description,
  language,
  difficulty,
  estimated_time,
  icon,
  color,
  structure,
  exercise_ids,
  is_published,
  is_official,
  rating
) VALUES (
  'path-kor-list-1000-words',
  'KOR LIST 1000 WORDS',
  'Complete Korean vocabulary learning path with 1000 most common words organized in 10 chapters of 100 words each, with 4 sub-chapters per chapter.',
  'korean',
  1,
  'Environ 200 heures',
  '🇰🇷',
  'from-blue-500 to-green-500',
  -- Même structure que JAP
  '[
    {"type":"chapter","id":"chapter-100","title":"100","items":[
      {"type":"subchapter","id":"subchapter-25","title":"25","items":[]},
      {"type":"subchapter","id":"subchapter-50","title":"50","items":[]},
      {"type":"subchapter","id":"subchapter-75","title":"75","items":[]},
      {"type":"subchapter","id":"subchapter-100","title":"100","items":[]}
    ]},
    {"type":"chapter","id":"chapter-200","title":"200","items":[
      {"type":"subchapter","id":"subchapter-125","title":"125","items":[]},
      {"type":"subchapter","id":"subchapter-150","title":"150","items":[]},
      {"type":"subchapter","id":"subchapter-175","title":"175","items":[]},
      {"type":"subchapter","id":"subchapter-200","title":"200","items":[]}
    ]},
    {"type":"chapter","id":"chapter-300","title":"300","items":[
      {"type":"subchapter","id":"subchapter-225","title":"225","items":[]},
      {"type":"subchapter","id":"subchapter-250","title":"250","items":[]},
      {"type":"subchapter","id":"subchapter-275","title":"275","items":[]},
      {"type":"subchapter","id":"subchapter-300","title":"300","items":[]}
    ]},
    {"type":"chapter","id":"chapter-400","title":"400","items":[
      {"type":"subchapter","id":"subchapter-325","title":"325","items":[]},
      {"type":"subchapter","id":"subchapter-350","title":"350","items":[]},
      {"type":"subchapter","id":"subchapter-375","title":"375","items":[]},
      {"type":"subchapter","id":"subchapter-400","title":"400","items":[]}
    ]},
    {"type":"chapter","id":"chapter-500","title":"500","items":[
      {"type":"subchapter","id":"subchapter-425","title":"425","items":[]},
      {"type":"subchapter","id":"subchapter-450","title":"450","items":[]},
      {"type":"subchapter","id":"subchapter-475","title":"475","items":[]},
      {"type":"subchapter","id":"subchapter-500","title":"500","items":[]}
    ]},
    {"type":"chapter","id":"chapter-600","title":"600","items":[
      {"type":"subchapter","id":"subchapter-525","title":"525","items":[]},
      {"type":"subchapter","id":"subchapter-550","title":"550","items":[]},
      {"type":"subchapter","id":"subchapter-575","title":"575","items":[]},
      {"type":"subchapter","id":"subchapter-600","title":"600","items":[]}
    ]},
    {"type":"chapter","id":"chapter-700","title":"700","items":[
      {"type":"subchapter","id":"subchapter-625","title":"625","items":[]},
      {"type":"subchapter","id":"subchapter-650","title":"650","items":[]},
      {"type":"subchapter","id":"subchapter-675","title":"675","items":[]},
      {"type":"subchapter","id":"subchapter-700","title":"700","items":[]}
    ]},
    {"type":"chapter","id":"chapter-800","title":"800","items":[
      {"type":"subchapter","id":"subchapter-725","title":"725","items":[]},
      {"type":"subchapter","id":"subchapter-750","title":"750","items":[]},
      {"type":"subchapter","id":"subchapter-775","title":"775","items":[]},
      {"type":"subchapter","id":"subchapter-800","title":"800","items":[]}
    ]},
    {"type":"chapter","id":"chapter-900","title":"900","items":[
      {"type":"subchapter","id":"subchapter-825","title":"825","items":[]},
      {"type":"subchapter","id":"subchapter-850","title":"850","items":[]},
      {"type":"subchapter","id":"subchapter-875","title":"875","items":[]},
      {"type":"subchapter","id":"subchapter-900","title":"900","items":[]}
    ]},
    {"type":"chapter","id":"chapter-1000","title":"1000","items":[
      {"type":"subchapter","id":"subchapter-925","title":"925","items":[]},
      {"type":"subchapter","id":"subchapter-950","title":"950","items":[]},
      {"type":"subchapter","id":"subchapter-975","title":"975","items":[]},
      {"type":"subchapter","id":"subchapter-1000","title":"1000","items":[]}
    ]}
  ]'::jsonb,
  '[]'::jsonb,
  true,
  true,
  5.0
)
ON CONFLICT (id) DO UPDATE SET
  structure = EXCLUDED.structure,
  updated_at = NOW();

-- ============================================================================
-- VÉRIFICATION FINALE
-- ============================================================================

-- Afficher tous les parcours avec leur structure
SELECT
  id,
  title,
  language,
  jsonb_array_length(structure) as nb_chapters,
  is_published,
  updated_at
FROM learning_paths
WHERE id LIKE 'path-%-list-1000-words'
ORDER BY language;

-- Message de succès
DO $$
BEGIN
  RAISE NOTICE '✅ Tous les parcours d''apprentissage ont été restaurés avec leur structure complète !';
  RAISE NOTICE 'Les 4 parcours (JAP, MYR, THA, KOR) ont maintenant 10 chapitres avec 4 sous-chapitres chacun.';
END $$;
