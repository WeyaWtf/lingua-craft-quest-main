import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const InsertHiraganaFlashcards = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const hiraganaFlashcards = {
    cards: [
      // Vowels (a)
      { front: "あ", back: "a", category: "Vowels" },
      { front: "い", back: "i", category: "Vowels" },
      { front: "う", back: "u", category: "Vowels" },
      { front: "え", back: "e", category: "Vowels" },
      { front: "お", back: "o", category: "Vowels" },

      // K row
      { front: "か", back: "ka", category: "K row" },
      { front: "き", back: "ki", category: "K row" },
      { front: "く", back: "ku", category: "K row" },
      { front: "け", back: "ke", category: "K row" },
      { front: "こ", back: "ko", category: "K row" },

      // S row
      { front: "さ", back: "sa", category: "S row" },
      { front: "し", back: "shi", category: "S row" },
      { front: "す", back: "su", category: "S row" },
      { front: "せ", back: "se", category: "S row" },
      { front: "そ", back: "so", category: "S row" },

      // T row
      { front: "た", back: "ta", category: "T row" },
      { front: "ち", back: "chi", category: "T row" },
      { front: "つ", back: "tsu", category: "T row" },
      { front: "て", back: "te", category: "T row" },
      { front: "と", back: "to", category: "T row" },

      // N row
      { front: "な", back: "na", category: "N row" },
      { front: "に", back: "ni", category: "N row" },
      { front: "ぬ", back: "nu", category: "N row" },
      { front: "ね", back: "ne", category: "N row" },
      { front: "の", back: "no", category: "N row" },

      // H row
      { front: "は", back: "ha", category: "H row" },
      { front: "ひ", back: "hi", category: "H row" },
      { front: "ふ", back: "fu", category: "H row" },
      { front: "へ", back: "he", category: "H row" },
      { front: "ほ", back: "ho", category: "H row" },

      // M row
      { front: "ま", back: "ma", category: "M row" },
      { front: "み", back: "mi", category: "M row" },
      { front: "む", back: "mu", category: "M row" },
      { front: "め", back: "me", category: "M row" },
      { front: "も", back: "mo", category: "M row" },

      // Y row
      { front: "や", back: "ya", category: "Y row" },
      { front: "ゆ", back: "yu", category: "Y row" },
      { front: "よ", back: "yo", category: "Y row" },

      // R row
      { front: "ら", back: "ra", category: "R row" },
      { front: "り", back: "ri", category: "R row" },
      { front: "る", back: "ru", category: "R row" },
      { front: "れ", back: "re", category: "R row" },
      { front: "ろ", back: "ro", category: "R row" },

      // W row
      { front: "わ", back: "wa", category: "W row" },
      { front: "を", back: "wo", category: "W row" },

      // N
      { front: "ん", back: "n", category: "N" }
    ],
    shuffleSides: false
  };

  useEffect(() => {
    const insertExercise = async () => {
      setStatus("loading");
      setMessage("Insertion en cours...");

      const exerciseData = {
        type: "flashcard",
        title: "Hiragana Flashcards - Cartes mémoire des Hiragana",
        description: "Apprenez tous les caractères hiragana avec des flashcards - 46 caractères de base du syllabaire japonais",
        difficulty: 1,
        source: "official",
        language: "japanese",
        tags: ["alphabet", "hiragana", "japanese", "flashcards"],
        content: JSON.parse(JSON.stringify(hiraganaFlashcards)),
        author_id: "demo",
        is_published: true
      };

      const { data, error } = await supabase
        .from("exercises")
        .insert([exerciseData])
        .select();

      if (error) {
        console.error("Error inserting exercise:", error);
        setStatus("error");
        setMessage(`Erreur: ${error.message}`);
        return;
      }

      console.log("Exercise inserted successfully:", data);
      setStatus("success");
      setMessage("Exercice inséré avec succès!");
    };

    insertExercise();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Insertion Hiragana Flashcards
        </h1>

        <div className="mb-6">
          <div className={`p-4 rounded-lg ${
            status === "loading" ? "bg-blue-100 text-blue-800" :
            status === "success" ? "bg-green-100 text-green-800" :
            status === "error" ? "bg-red-100 text-red-800" :
            "bg-gray-100 text-gray-800"
          }`}>
            {message}
          </div>
        </div>

        {status === "success" && (
          <Button
            onClick={() => navigate("/")}
            className="w-full"
          >
            Retour à l'accueil
          </Button>
        )}
      </div>
    </div>
  );
};

export default InsertHiraganaFlashcards;
