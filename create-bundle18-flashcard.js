// Script pour créer l'exercice Bundle 18 Flashcard
// Exécuter avec: node create-bundle18-flashcard.js

const bundle18Cards = [
  { front: "another, again", back: "もう|mou", category: "vocabulary", id: "426" },
  { front: "collect, gather", back: "集める|atsumeru", category: "vocabulary", id: "427" },
  { front: "voice, sound", back: "声|koe", category: "vocabulary", id: "428" },
  { front: "first time", back: "初めて|hajimete", category: "vocabulary", id: "429" },
  { front: "change, turn into", back: "変わる|kawaru", category: "vocabulary", id: "430" },
  { front: "first of all", back: "まず|mazu", category: "vocabulary", id: "431" },
  { front: "society", back: "社会|shakai", category: "vocabulary", id: "432" },
  { front: "program", back: "プログラム|puroguramu", category: "vocabulary", id: "433" },
  { front: "strength, power", back: "力|chikara", category: "vocabulary", id: "434" },
  { front: "this time", back: "今回|konkai", category: "vocabulary", id: "435" },
  { front: "schedule, plan", back: "予定|yotei", category: "vocabulary", id: "436" },
  { front: "as is, still", back: "まま|mama", category: "vocabulary", id: "437" },
  { front: "television", back: "テレビ|terebi", category: "vocabulary", id: "438" },
  { front: "decrease", back: "減る|heru", category: "vocabulary", id: "439" },
  { front: "disappear", back: "消える|kieru", category: "vocabulary", id: "440" },
  { front: "family, household", back: "家族|kazoku", category: "vocabulary", id: "441" },
  { front: "compare", back: "比べる|kuraberu", category: "vocabulary", id: "442" },
  { front: "be born", back: "生まれる|umareru", category: "vocabulary", id: "443" },
  { front: "free", back: "ただ|tada", category: "vocabulary", id: "444" },
  { front: "these", back: "これら|korera", category: "vocabulary", id: "445" },
  { front: "investigate", back: "調べる|shiraberu", category: "vocabulary", id: "446" },
  { front: "accident, trouble", back: "事故|jiko", category: "vocabulary", id: "447" },
  { front: "telephone", back: "電話|denwa", category: "vocabulary", id: "448" },
  { front: "foreign country", back: "外国|gaikoku", category: "vocabulary", id: "449" },
  { front: "bank", back: "銀行|ginkou", category: "vocabulary", id: "450" }
];

const exerciseData = {
  type: "flashcard",
  title: "Bundle 18 - Flashcard (Mots 426-450)",
  difficulty: 1,
  source: "personal",
  language: "japanese",
  tags: ["vocabulary", "japanese", "beginner", "N5", "bundle18"],
  content: {
    cards: bundle18Cards,
    shuffleSides: true
  },
  author_id: "demo",
  is_published: true
};

console.log("=== Exercice Bundle 18 Flashcard ===");
console.log(JSON.stringify(exerciseData, null, 2));
console.log("\n\nPour insérer dans Supabase, copiez cet objet et utilisez-le dans votre application.");
