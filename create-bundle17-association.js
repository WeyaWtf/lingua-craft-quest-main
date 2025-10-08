// Script pour créer l'exercice Bundle 17 Association
// Exécuter avec: node create-bundle17-association.js

const bundle17AssociationPairs = [
  // Page 1
  { left: "問題|mondai", right: "problem, question", id: "401-1" },
  { left: "必要|hitsuyou", right: "need, necessary", id: "402-1" },
  { left: "もつ|motsu", right: "last long", id: "403-1" },
  { left: "開く|hiraku", right: "open", id: "404-1" },
  // Page 2
  { left: "昨年|sakunen", right: "last year (formal)", id: "405-2" },
  { left: "治る|naoru", right: "be cured", id: "406-2" },
  { left: "ドル|doru", right: "dollar", id: "407-2" },
  { left: "システム|shisutemu", right: "system", id: "408-2" },
  // Page 3
  { left: "以上|ijou", right: "more than", id: "409-3" },
  { left: "最近|saikin", right: "recent, latest", id: "410-3" },
  { left: "世界|sekai", right: "world", id: "411-3" },
  { left: "コンピューター|konpyu-ta-", right: "computer", id: "412-3" },
  // Page 4
  { left: "やる|yaru", right: "give (inferior)", id: "413-4" },
  { left: "意味|imi", right: "meaning, sense", id: "414-4" },
  { left: "増える|fueru", right: "increase, accrue", id: "415-4" },
  { left: "選ぶ|erabu", right: "choose, elect", id: "416-4" },
  // Page 5
  { left: "生活|seikatsu", right: "life, living", id: "417-5" },
  { left: "進める|susumeru", right: "go ahead", id: "418-5" },
  { left: "続ける|tsuzukeru", right: "continue", id: "419-5" },
  { left: "ほとんど|hotondo", right: "almost, hardly", id: "420-5" },
  // Page 6
  { left: "会社|kaisha", right: "company", id: "421-6" },
  { left: "家|ie", right: "house, dwelling", id: "422-6" },
  { left: "多く|ooku", right: "much, largely", id: "423-6" },
  { left: "話|hanashi", right: "talk, story", id: "424-6" },
  // Page 7
  { left: "上がる|agaru", right: "go up, rise", id: "425-7" }
];

const exerciseData = {
  type: "association",
  title: "Bundle 17 - Association (Mots 401-425)",
  difficulty: 1,
  source: "personal",
  language: "japanese",
  tags: ["vocabulary", "japanese", "beginner", "N5", "bundle17"],
  content: {
    pairs: bundle17AssociationPairs,
    shuffleItems: true
  },
  author_id: "demo",
  is_published: true
};

console.log("=== Exercice Bundle 17 Association ===");
console.log(JSON.stringify(exerciseData, null, 2));
console.log("\n\nPour insérer dans Supabase, copiez cet objet et utilisez-le dans votre application.");
