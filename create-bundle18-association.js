// Script pour créer l'exercice Bundle 18 Association
// Exécuter avec: node create-bundle18-association.js

const bundle18AssociationPairs = [
  // Page 1
  { left: "もう|mou", right: "another, again", id: "426-1" },
  { left: "集める|atsumeru", right: "collect, gather", id: "427-1" },
  { left: "声|koe", right: "voice, sound", id: "428-1" },
  { left: "初めて|hajimete", right: "first time", id: "429-1" },
  // Page 2
  { left: "変わる|kawaru", right: "change, turn into", id: "430-2" },
  { left: "まず|mazu", right: "first of all", id: "431-2" },
  { left: "社会|shakai", right: "society", id: "432-2" },
  { left: "プログラム|puroguramu", right: "program", id: "433-2" },
  // Page 3
  { left: "力|chikara", right: "strength, power", id: "434-3" },
  { left: "今回|konkai", right: "this time", id: "435-3" },
  { left: "予定|yotei", right: "schedule, plan", id: "436-3" },
  { left: "まま|mama", right: "as is, still", id: "437-3" },
  // Page 4
  { left: "テレビ|terebi", right: "television", id: "438-4" },
  { left: "減る|heru", right: "decrease", id: "439-4" },
  { left: "消える|kieru", right: "disappear", id: "440-4" },
  { left: "家族|kazoku", right: "family, household", id: "441-4" },
  // Page 5
  { left: "比べる|kuraberu", right: "compare", id: "442-5" },
  { left: "生まれる|umareru", right: "be born", id: "443-5" },
  { left: "ただ|tada", right: "free", id: "444-5" },
  { left: "これら|korera", right: "these", id: "445-5" },
  // Page 6
  { left: "調べる|shiraberu", right: "investigate", id: "446-6" },
  { left: "事故|jiko", right: "accident, trouble", id: "447-6" },
  { left: "電話|denwa", right: "telephone", id: "448-6" },
  { left: "外国|gaikoku", right: "foreign country", id: "449-6" },
  // Page 7
  { left: "銀行|ginkou", right: "bank", id: "450-7" }
];

const exerciseData = {
  type: "association",
  title: "Bundle 18 - Association (Mots 426-450)",
  difficulty: 1,
  source: "personal",
  language: "japanese",
  tags: ["vocabulary", "japanese", "beginner", "N5", "bundle18"],
  content: {
    pairs: bundle18AssociationPairs,
    shuffleItems: true
  },
  author_id: "demo",
  is_published: true
};

console.log("=== Exercice Bundle 18 Association ===");
console.log(JSON.stringify(exerciseData, null, 2));
console.log("\n\nPour insérer dans Supabase, copiez cet objet et utilisez-le dans votre application.");
