import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const InsertBurmeseFlashcards = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const burmeseFlashcards = {
    cards: [
      // K row
      { front: "က", back: "ka", category: "K row" },
      { front: "ခ", back: "kha", category: "K row" },
      { front: "ග", back: "ga", category: "K row" },
      { front: "ဃ", back: "gha", category: "K row" },
      { front: "င", back: "nga", category: "K row" },

      // S row
      { front: "စ", back: "sa", category: "S row" },
      { front: "ဆ", back: "hsa", category: "S row" },
      { front: "ဇ", back: "za", category: "S row" },
      { front: "ဈ", back: "zha", category: "S row" },
      { front: "ည", back: "nya", category: "S row" },

      // T row
      { front: "ဋ", back: "ta", category: "T row" },
      { front: "ဌ", back: "hta", category: "T row" },
      { front: "ဍ", back: "da", category: "T row" },
      { front: "ဎ", back: "dha", category: "T row" },
      { front: "ဏ", back: "na", category: "T row" },

      // T2 row
      { front: "တ", back: "ta", category: "T2 row" },
      { front: "ထ", back: "hta", category: "T2 row" },
      { front: "ဒ", back: "da", category: "T2 row" },
      { front: "ဓ", back: "dha", category: "T2 row" },
      { front: "န", back: "na", category: "T2 row" },

      // P row
      { front: "ပ", back: "pa", category: "P row" },
      { front: "ဖ", back: "pha", category: "P row" },
      { front: "ဗ", back: "ba", category: "P row" },
      { front: "ဘ", back: "bha", category: "P row" },
      { front: "မ", back: "ma", category: "P row" },

      // Y row
      { front: "ယ", back: "ya", category: "Y row" },
      { front: "ရ", back: "ra", category: "Y row" },
      { front: "လ", back: "la", category: "Y row" },
      { front: "ဝ", back: "wa", category: "Y row" },

      // H row
      { front: "သ", back: "tha", category: "H row" },
      { front: "ဟ", back: "ha", category: "H row" },
      { front: "ဠ", back: "la", category: "H row" },
      { front: "အ", back: "a", category: "H row" }
    ],
    shuffleSides: false
  };

  useEffect(() => {
    const insertExercise = async () => {
      setStatus("loading");
      setMessage("Insertion en cours...");

      const exerciseData = {
        type: "flashcard",
        title: "Burmese Flashcards - Cartes mémoire de l'alphabet birman",
        description: "Apprenez les 33 consonnes birmanes avec des flashcards - Organisées par rangées K, S, T, P, Y et H",
        difficulty: 2,
        source: "official",
        language: "burmese",
        tags: ["alphabet", "burmese", "consonants", "flashcards"],
        content: JSON.parse(JSON.stringify(burmeseFlashcards)),
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
          Insertion Burmese Flashcards
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

export default InsertBurmeseFlashcards;
