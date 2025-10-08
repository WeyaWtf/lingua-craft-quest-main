import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle31Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "meet, find",
            "back": "เจอ|jəə",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "look for",
            "back": "หา|hǎa",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "find",
            "back": "เจอ|jəə",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "lost, disappear",
            "back": "หาย|hǎai",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "found",
            "back": "พบ|phóp",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "show",
            "back": "แสดง|sà-dɛɛng",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "hide",
            "back": "ซ่อน|sɔ̂ɔn",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "open",
            "back": "เปิด|pə̀ət",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "close",
            "back": "ปิด|pìt",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "enter",
            "back": "เข้า|khâo",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "exit",
            "back": "ออก|ɔ̀ɔk",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "go up",
            "back": "ขึ้น|khʉ̂n",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "go down",
            "back": "ลง|long",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "take",
            "back": "เอา|ao",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "put, place",
            "back": "วาง|waang",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "lift",
            "back": "ยก|yók",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "push",
            "back": "ดัน|dan",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "pull",
            "back": "ดึง|dʉng",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "throw",
            "back": "โยน|yoon",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "catch, hold",
            "back": "จับ|jàp",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "touch",
            "back": "แตะ|tɛ̀",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "push",
            "back": "ผลัก|phlàk",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "press",
            "back": "กด|gòt",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "squeeze",
            "back": "บีบ|bìip",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "twist",
            "back": "บิด|bìt",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 31 Flashcards",
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
        toast.success("Bundle 31 Flashcards inséré avec succès !");
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
            Insérer Bundle 31 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 751-775 (25 flashcards)
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

export default InsertThaBundle31Flashcard;
