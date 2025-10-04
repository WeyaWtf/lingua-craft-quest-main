import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const InsertThaiFlashcards = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const thaiFlashcards = {
    cards: [
      // High Class Consonants (11)
      { front: "ข", back: "kh (high)", category: "High Class" },
      { front: "ฃ", back: "kh (high)", category: "High Class" },
      { front: "ฉ", back: "ch (high)", category: "High Class" },
      { front: "ฐ", back: "th (high)", category: "High Class" },
      { front: "ถ", back: "th (high)", category: "High Class" },
      { front: "ผ", back: "ph (high)", category: "High Class" },
      { front: "ฝ", back: "f (high)", category: "High Class" },
      { front: "ศ", back: "s (high)", category: "High Class" },
      { front: "ษ", back: "s (high)", category: "High Class" },
      { front: "ส", back: "s (high)", category: "High Class" },
      { front: "ห", back: "h (high)", category: "High Class" },

      // Middle Class Consonants (9)
      { front: "ก", back: "k (mid)", category: "Middle Class" },
      { front: "จ", back: "ch (mid)", category: "Middle Class" },
      { front: "ฎ", back: "d (mid)", category: "Middle Class" },
      { front: "ฏ", back: "t (mid)", category: "Middle Class" },
      { front: "ด", back: "d (mid)", category: "Middle Class" },
      { front: "ต", back: "t (mid)", category: "Middle Class" },
      { front: "บ", back: "b (mid)", category: "Middle Class" },
      { front: "ป", back: "p (mid)", category: "Middle Class" },
      { front: "อ", back: "ʔ (mid)", category: "Middle Class" },

      // Low Class Consonants (24)
      { front: "ค", back: "kh (low)", category: "Low Class" },
      { front: "ฅ", back: "kh (low)", category: "Low Class" },
      { front: "ฆ", back: "kh (low)", category: "Low Class" },
      { front: "ง", back: "ng (low)", category: "Low Class" },
      { front: "ช", back: "ch (low)", category: "Low Class" },
      { front: "ซ", back: "s (low)", category: "Low Class" },
      { front: "ฌ", back: "ch (low)", category: "Low Class" },
      { front: "ญ", back: "y (low)", category: "Low Class" },
      { front: "ฑ", back: "th (low)", category: "Low Class" },
      { front: "ฒ", back: "th (low)", category: "Low Class" },
      { front: "ณ", back: "n (low)", category: "Low Class" },
      { front: "ท", back: "th (low)", category: "Low Class" },
      { front: "ธ", back: "th (low)", category: "Low Class" },
      { front: "น", back: "n (low)", category: "Low Class" },
      { front: "พ", back: "ph (low)", category: "Low Class" },
      { front: "ฟ", back: "f (low)", category: "Low Class" },
      { front: "ภ", back: "ph (low)", category: "Low Class" },
      { front: "ม", back: "m (low)", category: "Low Class" },
      { front: "ย", back: "y (low)", category: "Low Class" },
      { front: "ร", back: "r (low)", category: "Low Class" },
      { front: "ล", back: "l (low)", category: "Low Class" },
      { front: "ว", back: "w (low)", category: "Low Class" },
      { front: "ฬ", back: "l (low)", category: "Low Class" },
      { front: "ฮ", back: "h (low)", category: "Low Class" }
    ],
    shuffleSides: false
  };

  useEffect(() => {
    const insertExercise = async () => {
      setStatus("loading");
      setMessage("Insertion en cours...");

      const exerciseData = {
        type: "flashcard",
        title: "Thai Flashcards - Cartes mémoire de l'alphabet thaï",
        description: "Apprenez les 44 consonnes thaïes avec des flashcards - 11 consonnes haute classe, 9 moyenne classe et 24 basse classe",
        difficulty: 2,
        source: "official",
        language: "thai",
        tags: ["alphabet", "thai", "consonants", "flashcards"],
        content: JSON.parse(JSON.stringify(thaiFlashcards)),
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
          Insertion Thai Flashcards
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

export default InsertThaiFlashcards;
