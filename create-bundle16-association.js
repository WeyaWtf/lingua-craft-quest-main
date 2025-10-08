// Script pour créer l'exercice Bundle 16 Association
// Exécuter avec: node create-bundle16-association.js

const bundle16AssociationPairs = [
  // Page 1
  { left: "来年|rainen", right: "next year", id: "376-1" },
  { left: "六|roku", right: "six", id: "377-1" },
  { left: "悪い|warui", right: "bad", id: "378-1" },
  { left: "お手洗い|otearai", right: "toilet, bathroom", id: "379-1" },
  // Page 2
  { left: "ご主人|goshujin", right: "husband (polite)", id: "380-2" },
  { left: "本当に|hontouni", right: "really, truly", id: "381-2" },
  { left: "自分|jibun", right: "self, oneself", id: "382-2" },
  { left: "ため|tame", right: "sake, purpose", id: "383-2" },
  // Page 3
  { left: "見つかる|mitsukaru", right: "be found", id: "384-3" },
  { left: "休む|yasumu", right: "take a rest", id: "385-3" },
  { left: "ゆっくり|yukkuri", right: "slowly", id: "386-3" },
  { left: "六つ|muttsu", right: "six (things)", id: "387-3" },
  // Page 4
  { left: "花|hana", right: "flower", id: "388-4" },
  { left: "動く|ugoku", right: "move", id: "389-4" },
  { left: "線|sen", right: "line", id: "390-4" },
  { left: "七日|nanoka", right: "seven days", id: "391-4" },
  // Page 5
  { left: "以外|igai", right: "except for", id: "392-5" },
  { left: "男|otoko", right: "man, male", id: "393-5" },
  { left: "彼|kare", right: "he, boyfriend", id: "394-5" },
  { left: "女|onna", right: "woman", id: "395-5" },
  // Page 6
  { left: "妻|tsuma", right: "wife", id: "396-6" },
  { left: "百|hyaku", right: "hundred", id: "397-6" },
  { left: "辺|atari", right: "vicinity", id: "398-6" },
  { left: "店|mise", right: "shop, store", id: "399-6" },
  // Page 7
  { left: "閉まる|shimaru", right: "be shut, closed", id: "400-7" }
];

const exerciseData = {
  type: "association",
  title: "Bundle 16 - Association (Mots 376-400)",
  difficulty: 1,
  source: "personal",
  language: "japanese",
  tags: ["vocabulary", "japanese", "beginner", "N5", "bundle16"],
  content: {
    pairs: bundle16AssociationPairs,
    shuffleItems: true
  },
  author_id: "demo",
  is_published: true
};

console.log("=== Exercice Bundle 16 Association ===");
console.log(JSON.stringify(exerciseData, null, 2));
console.log("\n\nPour insérer dans Supabase, copiez cet objet et utilisez-le dans votre application.");
