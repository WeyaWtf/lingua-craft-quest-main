// Script pour créer l'exercice Bundle 15 Association
// Exécuter avec: node create-bundle15-association.js

const bundle15AssociationPairs = [
  // Page 1
  { left: "弟|otouto", right: "younger brother", id: "351-1" },
  { left: "手|te", right: "hand", id: "352-1" },
  { left: "十日|tooka", right: "ten days, tenth", id: "353-1" },
  { left: "口|kuchi", right: "mouth", id: "354-1" },
  // Page 2
  { left: "夏|natsu", right: "summer", id: "355-2" },
  { left: "七つ|nanatsu", right: "seven (things)", id: "356-2" },
  { left: "時々|tokidoki", right: "sometimes", id: "357-2" },
  { left: "何|nani", right: "what", id: "358-2" },
  // Page 3
  { left: "人|hito", right: "person", id: "359-3" },
  { left: "一人|hitori", right: "one person", id: "360-3" },
  { left: "一日|tsuitachi", right: "first (of month)", id: "361-3" },
  { left: "九日|kokonoka", right: "nine days, ninth", id: "362-3" },
  // Page 4
  { left: "方|hou", right: "direction, side", id: "363-4" },
  { left: "他|hoka", right: "other", id: "364-4" },
  { left: "僕|boku", right: "I, me (male)", id: "365-4" },
  { left: "欲しい|hoshii", right: "want, desire", id: "366-4" },
  // Page 5
  { left: "万|man", right: "ten thousand", id: "367-5" },
  { left: "見える|mieru", right: "be visible", id: "368-5" },
  { left: "道|michi", right: "street, way", id: "369-5" },
  { left: "五つ|itsutsu", right: "five (things)", id: "370-5" },
  // Page 6
  { left: "目|me", right: "eye", id: "371-6" },
  { left: "八つ|yattsu", right: "eight (things)", id: "372-6" },
  { left: "止める|tomeru", right: "stop", id: "373-6" },
  { left: "四日|yokka", right: "four days", id: "374-6" },
  // Page 7
  { left: "夜|yoru", right: "night", id: "375-7" }
];

const exerciseData = {
  type: "association",
  title: "Bundle 15 - Association (Mots 351-375)",
  difficulty: 1,
  source: "personal",
  language: "japanese",
  tags: ["vocabulary", "japanese", "beginner", "N5", "bundle15"],
  content: {
    pairs: bundle15AssociationPairs,
    shuffleItems: true
  },
  author_id: "demo",
  is_published: true
};

console.log("=== Exercice Bundle 15 Association ===");
console.log(JSON.stringify(exerciseData, null, 2));
console.log("\n\nPour insérer dans Supabase, copiez cet objet et utilisez-le dans votre application.");
