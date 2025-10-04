import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const InsertHangeulFlashcards = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const hangeulFlashcards = {
    cards: [
      // 14 Basic Consonants
      { front: "ㄱ", back: "g/k", category: "Basic Consonants" },
      { front: "ㄴ", back: "n", category: "Basic Consonants" },
      { front: "ㄷ", back: "d/t", category: "Basic Consonants" },
      { front: "ㄹ", back: "r/l", category: "Basic Consonants" },
      { front: "ㅁ", back: "m", category: "Basic Consonants" },
      { front: "ㅂ", back: "b/p", category: "Basic Consonants" },
      { front: "ㅅ", back: "s", category: "Basic Consonants" },
      { front: "ㅇ", back: "ng/silent", category: "Basic Consonants" },
      { front: "ㅈ", back: "j", category: "Basic Consonants" },
      { front: "ㅊ", back: "ch", category: "Basic Consonants" },
      { front: "ㅋ", back: "k", category: "Basic Consonants" },
      { front: "ㅌ", back: "t", category: "Basic Consonants" },
      { front: "ㅍ", back: "p", category: "Basic Consonants" },
      { front: "ㅎ", back: "h", category: "Basic Consonants" },

      // 5 Complex Consonants
      { front: "ㄲ", back: "kk", category: "Complex Consonants" },
      { front: "ㄸ", back: "tt", category: "Complex Consonants" },
      { front: "ㅃ", back: "pp", category: "Complex Consonants" },
      { front: "ㅆ", back: "ss", category: "Complex Consonants" },
      { front: "ㅉ", back: "jj", category: "Complex Consonants" },

      // 10 Basic Vowels
      { front: "ㅏ", back: "a", category: "Basic Vowels" },
      { front: "ㅑ", back: "ya", category: "Basic Vowels" },
      { front: "ㅓ", back: "eo", category: "Basic Vowels" },
      { front: "ㅕ", back: "yeo", category: "Basic Vowels" },
      { front: "ㅗ", back: "o", category: "Basic Vowels" },
      { front: "ㅛ", back: "yo", category: "Basic Vowels" },
      { front: "ㅜ", back: "u", category: "Basic Vowels" },
      { front: "ㅠ", back: "yu", category: "Basic Vowels" },
      { front: "ㅡ", back: "eu", category: "Basic Vowels" },
      { front: "ㅣ", back: "i", category: "Basic Vowels" },

      // 11 Complex Vowels
      { front: "ㅐ", back: "ae", category: "Complex Vowels" },
      { front: "ㅒ", back: "yae", category: "Complex Vowels" },
      { front: "ㅔ", back: "e", category: "Complex Vowels" },
      { front: "ㅖ", back: "ye", category: "Complex Vowels" },
      { front: "ㅘ", back: "wa", category: "Complex Vowels" },
      { front: "ㅙ", back: "wae", category: "Complex Vowels" },
      { front: "ㅚ", back: "oe", category: "Complex Vowels" },
      { front: "ㅝ", back: "wo", category: "Complex Vowels" },
      { front: "ㅞ", back: "we", category: "Complex Vowels" },
      { front: "ㅟ", back: "wi", category: "Complex Vowels" },
      { front: "ㅢ", back: "ui", category: "Complex Vowels" }
    ],
    shuffleSides: false
  };

  useEffect(() => {
    const insertExercise = async () => {
      setStatus("loading");
      setMessage("Insertion en cours...");

      const exerciseData = {
        type: "flashcard",
        title: "Hangeul Flashcards - Cartes mémoire de l'alphabet coréen",
        description: "Apprenez l'alphabet coréen (Hangeul) avec des flashcards - 14 consonnes de base, 5 consonnes complexes, 10 voyelles de base et 11 voyelles complexes",
        difficulty: 1,
        source: "official",
        language: "korean",
        tags: ["alphabet", "hangeul", "korean", "flashcards", "consonants", "vowels"],
        content: JSON.parse(JSON.stringify(hangeulFlashcards)),
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
          Insertion Hangeul Flashcards
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

export default InsertHangeulFlashcards;
