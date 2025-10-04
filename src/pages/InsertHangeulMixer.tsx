import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const InsertHangeulMixer = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const hangeulData = {
    basic_consonants: [
      { char: "ㄱ", romanization: "g/k" },
      { char: "ㄴ", romanization: "n" },
      { char: "ㄷ", romanization: "d/t" },
      { char: "ㄹ", romanization: "r/l" },
      { char: "ㅁ", romanization: "m" },
      { char: "ㅂ", romanization: "b/p" },
      { char: "ㅅ", romanization: "s" },
      { char: "ㅇ", romanization: "ng/silent" },
      { char: "ㅈ", romanization: "j" },
      { char: "ㅊ", romanization: "ch" },
      { char: "ㅋ", romanization: "k" },
      { char: "ㅌ", romanization: "t" },
      { char: "ㅍ", romanization: "p" },
      { char: "ㅎ", romanization: "h" }
    ],
    complex_consonants: [
      { char: "ㄲ", romanization: "kk" },
      { char: "ㄸ", romanization: "tt" },
      { char: "ㅃ", romanization: "pp" },
      { char: "ㅆ", romanization: "ss" },
      { char: "ㅉ", romanization: "jj" }
    ],
    basic_vowels: [
      { char: "ㅏ", romanization: "a" },
      { char: "ㅑ", romanization: "ya" },
      { char: "ㅓ", romanization: "eo" },
      { char: "ㅕ", romanization: "yeo" },
      { char: "ㅗ", romanization: "o" },
      { char: "ㅛ", romanization: "yo" },
      { char: "ㅜ", romanization: "u" },
      { char: "ㅠ", romanization: "yu" },
      { char: "ㅡ", romanization: "eu" },
      { char: "ㅣ", romanization: "i" }
    ],
    complex_vowels: [
      { char: "ㅐ", romanization: "ae" },
      { char: "ㅒ", romanization: "yae" },
      { char: "ㅔ", romanization: "e" },
      { char: "ㅖ", romanization: "ye" },
      { char: "ㅘ", romanization: "wa" },
      { char: "ㅙ", romanization: "wae" },
      { char: "ㅚ", romanization: "oe" },
      { char: "ㅝ", romanization: "wo" },
      { char: "ㅞ", romanization: "we" },
      { char: "ㅟ", romanization: "wi" },
      { char: "ㅢ", romanization: "ui" }
    ]
  };

  useEffect(() => {
    const insertExercise = async () => {
      setStatus("loading");
      setMessage("Insertion en cours...");

      const exerciseData = {
        type: "flashcard",
        title: "Hangeul Mixer - Jeu de placement de l'alphabet coréen",
        description: "Replacez tous les caractères coréens (Hangeul) à leur position correcte - Glissez-déposez les caractères depuis la liste de droite",
        difficulty: 2,
        source: "official",
        language: "korean",
        tags: ["alphabet", "hangeul", "korean", "game", "drag-drop", "mixer"],
        content: JSON.parse(JSON.stringify(hangeulData)),
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
          Insertion Hangeul Mixer
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

export default InsertHangeulMixer;
