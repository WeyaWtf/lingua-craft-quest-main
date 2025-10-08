// Script pour créer l'exercice Bundle 17 Flashcard
// Exécuter avec: node create-bundle17-flashcard.js

const bundle17Cards = [
  { front: "problem, question", back: "問題|mondai", category: "vocabulary", id: "401" },
  { front: "need, necessary", back: "必要|hitsuyou", category: "vocabulary", id: "402" },
  { front: "last long", back: "もつ|motsu", category: "vocabulary", id: "403" },
  { front: "open", back: "開く|hiraku", category: "vocabulary", id: "404" },
  { front: "last year (formal)", back: "昨年|sakunen", category: "vocabulary", id: "405" },
  { front: "be cured", back: "治る|naoru", category: "vocabulary", id: "406" },
  { front: "dollar", back: "ドル|doru", category: "vocabulary", id: "407" },
  { front: "system", back: "システム|shisutemu", category: "vocabulary", id: "408" },
  { front: "more than", back: "以上|ijou", category: "vocabulary", id: "409" },
  { front: "recent, latest", back: "最近|saikin", category: "vocabulary", id: "410" },
  { front: "world", back: "世界|sekai", category: "vocabulary", id: "411" },
  { front: "computer", back: "コンピューター|konpyu-ta-", category: "vocabulary", id: "412" },
  { front: "give (inferior)", back: "やる|yaru", category: "vocabulary", id: "413" },
  { front: "meaning, sense", back: "意味|imi", category: "vocabulary", id: "414" },
  { front: "increase, accrue", back: "増える|fueru", category: "vocabulary", id: "415" },
  { front: "choose, elect", back: "選ぶ|erabu", category: "vocabulary", id: "416" },
  { front: "life, living", back: "生活|seikatsu", category: "vocabulary", id: "417" },
  { front: "go ahead", back: "進める|susumeru", category: "vocabulary", id: "418" },
  { front: "continue", back: "続ける|tsuzukeru", category: "vocabulary", id: "419" },
  { front: "almost, hardly", back: "ほとんど|hotondo", category: "vocabulary", id: "420" },
  { front: "company", back: "会社|kaisha", category: "vocabulary", id: "421" },
  { front: "house, dwelling", back: "家|ie", category: "vocabulary", id: "422" },
  { front: "much, largely", back: "多く|ooku", category: "vocabulary", id: "423" },
  { front: "talk, story", back: "話|hanashi", category: "vocabulary", id: "424" },
  { front: "go up, rise", back: "上がる|agaru", category: "vocabulary", id: "425" }
];

const exerciseData = {
  type: "flashcard",
  title: "Bundle 17 - Flashcard (Mots 401-425)",
  difficulty: 1,
  source: "personal",
  language: "japanese",
  tags: ["vocabulary", "japanese", "beginner", "N5", "bundle17"],
  content: {
    cards: bundle17Cards,
    shuffleSides: true
  },
  author_id: "demo",
  is_published: true
};

console.log("=== Exercice Bundle 17 Flashcard ===");
console.log(JSON.stringify(exerciseData, null, 2));
console.log("\n\nPour insérer dans Supabase, copiez cet objet et utilisez-le dans votre application.");
