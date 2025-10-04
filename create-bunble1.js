// Script pour créer l'exercice Bunble 1
// Exécuter avec: node create-bunble1.js

const bunble1Cards = [
  { front: "go", back: "行く|iku", category: "vocabulary", id: "1" },
  { front: "see, look at", back: "見る|miru", category: "vocabulary", id: "2" },
  { front: "a lot of, many", back: "多い|ooi", category: "vocabulary", id: "3" },
  { front: "home, household", back: "家|ie", category: "vocabulary", id: "4" },
  { front: "this, this one", back: "これ|kore", category: "vocabulary", id: "5" },
  { front: "that, that one", back: "それ|sore", category: "vocabulary", id: "6" },
  { front: "I", back: "私|watashi", category: "vocabulary", id: "7" },
  { front: "work, job", back: "仕事|shigoto", category: "vocabulary", id: "8" },
  { front: "when", back: "いつ|itsu", category: "vocabulary", id: "9" },
  { front: "do, make", back: "する|suru", category: "vocabulary", id: "10" },
  { front: "go out, leave", back: "出る|deru", category: "vocabulary", id: "11" },
  { front: "use, make use of", back: "使う|tsukau", category: "vocabulary", id: "12" },
  { front: "place", back: "所|tokoro", category: "vocabulary", id: "13" },
  { front: "make, create", back: "作る|tsukuru", category: "vocabulary", id: "14" },
  { front: "think", back: "思う|omou", category: "vocabulary", id: "15" },
  { front: "have, possess", back: "持つ|motsu", category: "vocabulary", id: "16" },
  { front: "buy", back: "買う|kau", category: "vocabulary", id: "17" },
  { front: "time, hour", back: "時間|jikan", category: "vocabulary", id: "18" },
  { front: "know", back: "知る|shiru", category: "vocabulary", id: "19" },
  { front: "same, identical", back: "同じ|onaji", category: "vocabulary", id: "20" },
  { front: "now", back: "今|ima", category: "vocabulary", id: "21" },
  { front: "new", back: "新しい|atarashii", category: "vocabulary", id: "22" },
  { front: "become", back: "なる|naru", category: "vocabulary", id: "23" },
  { front: "(not) yet, still", back: "まだ|mada", category: "vocabulary", id: "24" },
  { front: "after", back: "あと|ato", category: "vocabulary", id: "25" }
];

const exerciseData = {
  type: "flashcard",
  title: "Bunble 1",
  difficulty: 1,
  source: "personal",
  language: "japanese",
  tags: ["vocabulary", "japanese", "beginner", "N5"],
  content: {
    cards: bunble1Cards,
    shuffleSides: true  // Activer le mélange recto/verso
  },
  author_id: "demo",
  is_published: true
};

console.log("=== Exercice Bunble 1 ===");
console.log(JSON.stringify(exerciseData, null, 2));
console.log("\n\nPour insérer dans Supabase, copiez cet objet et utilisez-le dans votre application ou exécutez:");
console.log("INSERT INTO exercises (type, title, difficulty, source, language, tags, content, author_id, is_published)");
console.log("VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);");
