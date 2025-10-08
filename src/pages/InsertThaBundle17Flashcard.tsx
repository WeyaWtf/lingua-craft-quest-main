import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle17Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "water",
            "back": "น้ำ|náam",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "I, me",
            "back": "ฉัน|chǎn",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "you",
            "back": "คุณ|khun",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "he, she",
            "back": "เขา|khǎo",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "we",
            "back": "เรา|rao",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "this",
            "back": "นี่|nîi",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "that",
            "back": "นั่น|nân",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "at, place",
            "back": "ที่|thîi",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "in",
            "back": "ใน|nai",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "on",
            "back": "บน|bon",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "under",
            "back": "ใต้|tâi",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "with",
            "back": "กับ|gàp",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "and",
            "back": "และ|láe",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "or",
            "back": "หรือ|rǔue",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "but",
            "back": "แต่|tàae",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "go",
            "back": "ไป|pai",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "come",
            "back": "มา|maa",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "stay, be at",
            "back": "อยู่|yùu",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "have",
            "back": "มี|mii",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "be",
            "back": "เป็น|pen",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "do, make",
            "back": "ทำ|tham",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "can, able to",
            "back": "ได้|dâai",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "give",
            "back": "ให้|hâi",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "take, want",
            "back": "เอา|ao",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "speak",
            "back": "พูด|phûut",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 17 Flashcards",
      difficulty: 1,
      source: "official",
      language: "thai",
      tags: ["vocabulary", "thai", "beginner", "CU-TFL"],
      content: { cards, shuffleSides: true },
      author_id: "demo",
      is_published: true
    };

    try {
      const { error } = await supabase.from("exercises").insert(exerciseData);

      if (error) {
        toast.error("Erreur lors de l'insertion");
        console.error(error);
      } else {
        toast.success("Bundle 17 Flashcards inséré avec succès !");
        setTimeout(() => navigate("/catalog"), 1500);
      }
    } catch (err) {
      toast.error("Erreur inattendue");
      console.error(err);
    } finally {
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Insérer Bundle 17 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 401-425 (25 flashcards)
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Button
              onClick={insertExercise}
              disabled={isInserting}
              className="w-full"
              size="lg"
            >
              {isInserting ? "Insertion en cours..." : "Insérer l'exercice"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertThaBundle17Flashcard;
