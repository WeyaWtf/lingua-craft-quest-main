// Script pour créer l'exercice Bundle 15 Flashcard
// Exécuter avec: node create-bundle15-flashcard.js

const bundle15Cards = [
  { front: "younger brother", back: "弟|otouto", category: "vocabulary", id: "351" },
  { front: "hand", back: "手|te", category: "vocabulary", id: "352" },
  { front: "ten days, tenth", back: "十日|tooka", category: "vocabulary", id: "353" },
  { front: "mouth", back: "口|kuchi", category: "vocabulary", id: "354" },
  { front: "summer", back: "夏|natsu", category: "vocabulary", id: "355" },
  { front: "seven (things)", back: "七つ|nanatsu", category: "vocabulary", id: "356" },
  { front: "sometimes", back: "時々|tokidoki", category: "vocabulary", id: "357" },
  { front: "what", back: "何|nani", category: "vocabulary", id: "358" },
  { front: "person", back: "人|hito", category: "vocabulary", id: "359" },
  { front: "one person", back: "一人|hitori", category: "vocabulary", id: "360" },
  { front: "first (of month)", back: "一日|tsuitachi", category: "vocabulary", id: "361" },
  { front: "nine days, ninth", back: "九日|kokonoka", category: "vocabulary", id: "362" },
  { front: "direction, side", back: "方|hou", category: "vocabulary", id: "363" },
  { front: "other", back: "他|hoka", category: "vocabulary", id: "364" },
  { front: "I, me (male)", back: "僕|boku", category: "vocabulary", id: "365" },
  { front: "want, desire", back: "欲しい|hoshii", category: "vocabulary", id: "366" },
  { front: "ten thousand", back: "万|man", category: "vocabulary", id: "367" },
  { front: "be visible", back: "見える|mieru", category: "vocabulary", id: "368" },
  { front: "street, way", back: "道|michi", category: "vocabulary", id: "369" },
  { front: "five (things)", back: "五つ|itsutsu", category: "vocabulary", id: "370" },
  { front: "eye", back: "目|me", category: "vocabulary", id: "371" },
  { front: "eight (things)", back: "八つ|yattsu", category: "vocabulary", id: "372" },
  { front: "stop", back: "止める|tomeru", category: "vocabulary", id: "373" },
  { front: "four days", back: "四日|yokka", category: "vocabulary", id: "374" },
  { front: "night", back: "夜|yoru", category: "vocabulary", id: "375" }
];

const exerciseData = {
  type: "flashcard",
  title: "Bundle 15 - Flashcard (Mots 351-375)",
  difficulty: 1,
  source: "personal",
  language: "japanese",
  tags: ["vocabulary", "japanese", "beginner", "N5", "bundle15"],
  content: {
    cards: bundle15Cards,
    shuffleSides: true
  },
  author_id: "demo",
  is_published: true
};

console.log("=== Exercice Bundle 15 Flashcard ===");
console.log(JSON.stringify(exerciseData, null, 2));
console.log("\n\nPour insérer dans Supabase, copiez cet objet et utilisez-le dans votre application.");
