import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const InsertKatakanaFlashcards = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const katakanaFlashcards = {
    cards: [
      // Vowels (a)
      { front: "ア", back: "a", category: "Vowels" },
      { front: "イ", back: "i", category: "Vowels" },
      { front: "ウ", back: "u", category: "Vowels" },
      { front: "エ", back: "e", category: "Vowels" },
      { front: "オ", back: "o", category: "Vowels" },

      // K row
      { front: "カ", back: "ka", category: "K row" },
      { front: "キ", back: "ki", category: "K row" },
      { front: "ク", back: "ku", category: "K row" },
      { front: "ケ", back: "ke", category: "K row" },
      { front: "コ", back: "ko", category: "K row" },

      // S row
      { front: "サ", back: "sa", category: "S row" },
      { front: "シ", back: "shi", category: "S row" },
      { front: "ス", back: "su", category: "S row" },
      { front: "セ", back: "se", category: "S row" },
      { front: "ソ", back: "so", category: "S row" },

      // T row
      { front: "タ", back: "ta", category: "T row" },
      { front: "チ", back: "chi", category: "T row" },
      { front: "ツ", back: "tsu", category: "T row" },
      { front: "テ", back: "te", category: "T row" },
      { front: "ト", back: "to", category: "T row" },

      // N row
      { front: "ナ", back: "na", category: "N row" },
      { front: "ニ", back: "ni", category: "N row" },
      { front: "ヌ", back: "nu", category: "N row" },
      { front: "ネ", back: "ne", category: "N row" },
      { front: "ノ", back: "no", category: "N row" },

      // H row
      { front: "ハ", back: "ha", category: "H row" },
      { front: "ヒ", back: "hi", category: "H row" },
      { front: "フ", back: "fu", category: "H row" },
      { front: "ヘ", back: "he", category: "H row" },
      { front: "ホ", back: "ho", category: "H row" },

      // M row
      { front: "マ", back: "ma", category: "M row" },
      { front: "ミ", back: "mi", category: "M row" },
      { front: "ム", back: "mu", category: "M row" },
      { front: "メ", back: "me", category: "M row" },
      { front: "モ", back: "mo", category: "M row" },

      // Y row
      { front: "ヤ", back: "ya", category: "Y row" },
      { front: "ユ", back: "yu", category: "Y row" },
      { front: "ヨ", back: "yo", category: "Y row" },

      // R row
      { front: "ラ", back: "ra", category: "R row" },
      { front: "リ", back: "ri", category: "R row" },
      { front: "ル", back: "ru", category: "R row" },
      { front: "レ", back: "re", category: "R row" },
      { front: "ロ", back: "ro", category: "R row" },

      // W row
      { front: "ワ", back: "wa", category: "W row" },
      { front: "ヲ", back: "wo", category: "W row" },

      // N
      { front: "ン", back: "n", category: "N" }
    ],
    shuffleSides: false
  };

  useEffect(() => {
    const insertExercise = async () => {
      setStatus("loading");
      setMessage("Insertion en cours...");

      const exerciseData = {
        type: "flashcard",
        title: "Katakana Flashcards - Cartes mémoire des Katakana",
        description: "Apprenez tous les caractères katakana avec des flashcards - 46 caractères de base du syllabaire japonais",
        difficulty: 1,
        source: "official",
        language: "japanese",
        tags: ["alphabet", "katakana", "japanese", "flashcards"],
        content: JSON.parse(JSON.stringify(katakanaFlashcards)),
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
          Insertion Katakana Flashcards
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

export default InsertKatakanaFlashcards;
