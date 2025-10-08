// Script pour créer l'exercice Bundle 16 Flashcard
// Exécuter avec: node create-bundle16-flashcard.js

const bundle16Cards = [
  { front: "next year", back: "来年|rainen", category: "vocabulary", id: "376" },
  { front: "six", back: "六|roku", category: "vocabulary", id: "377" },
  { front: "bad", back: "悪い|warui", category: "vocabulary", id: "378" },
  { front: "toilet, bathroom", back: "お手洗い|otearai", category: "vocabulary", id: "379" },
  { front: "husband (polite)", back: "ご主人|goshujin", category: "vocabulary", id: "380" },
  { front: "really, truly", back: "本当に|hontouni", category: "vocabulary", id: "381" },
  { front: "self, oneself", back: "自分|jibun", category: "vocabulary", id: "382" },
  { front: "sake, purpose", back: "ため|tame", category: "vocabulary", id: "383" },
  { front: "be found", back: "見つかる|mitsukaru", category: "vocabulary", id: "384" },
  { front: "take a rest", back: "休む|yasumu", category: "vocabulary", id: "385" },
  { front: "slowly", back: "ゆっくり|yukkuri", category: "vocabulary", id: "386" },
  { front: "six (things)", back: "六つ|muttsu", category: "vocabulary", id: "387" },
  { front: "flower", back: "花|hana", category: "vocabulary", id: "388" },
  { front: "move", back: "動く|ugoku", category: "vocabulary", id: "389" },
  { front: "line", back: "線|sen", category: "vocabulary", id: "390" },
  { front: "seven days", back: "七日|nanoka", category: "vocabulary", id: "391" },
  { front: "except for", back: "以外|igai", category: "vocabulary", id: "392" },
  { front: "man, male", back: "男|otoko", category: "vocabulary", id: "393" },
  { front: "he, boyfriend", back: "彼|kare", category: "vocabulary", id: "394" },
  { front: "woman", back: "女|onna", category: "vocabulary", id: "395" },
  { front: "wife", back: "妻|tsuma", category: "vocabulary", id: "396" },
  { front: "hundred", back: "百|hyaku", category: "vocabulary", id: "397" },
  { front: "vicinity", back: "辺|atari", category: "vocabulary", id: "398" },
  { front: "shop, store", back: "店|mise", category: "vocabulary", id: "399" },
  { front: "be shut, closed", back: "閉まる|shimaru", category: "vocabulary", id: "400" }
];

const exerciseData = {
  type: "flashcard",
  title: "Bundle 16 - Flashcard (Mots 376-400)",
  difficulty: 1,
  source: "personal",
  language: "japanese",
  tags: ["vocabulary", "japanese", "beginner", "N5", "bundle16"],
  content: {
    cards: bundle16Cards,
    shuffleSides: true
  },
  author_id: "demo",
  is_published: true
};

console.log("=== Exercice Bundle 16 Flashcard ===");
console.log(JSON.stringify(exerciseData, null, 2));
console.log("\n\nPour insérer dans Supabase, copiez cet objet et utilisez-le dans votre application.");
