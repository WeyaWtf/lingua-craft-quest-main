import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle19Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "cheap",
            "back": "ถูก|thùuk",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "good",
            "back": "ดี|dii",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "bad",
            "back": "ไม่ดี|mâi dii",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "new",
            "back": "ใหม่|mài",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "old",
            "back": "เก่า|gào",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "big",
            "back": "ใหญ่|yài",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "small",
            "back": "เล็ก|lék",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "long",
            "back": "ยาว|yaao",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "short",
            "back": "สั้น|sân",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "tall, high",
            "back": "สูง|sǔung",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "short (height)",
            "back": "เตี้ย|tîa",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "thick",
            "back": "หนา|nǎa",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "thin",
            "back": "บาง|baang",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "hot",
            "back": "ร้อน|rɔ́ɔn",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "cold",
            "back": "หนาว|nǎao",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "warm",
            "back": "อุ่น|ùn",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "cool",
            "back": "เย็น|yen",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "dry",
            "back": "แห้ง|hɛ̂ɛng",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "wet",
            "back": "เปียก|pìak",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "clean",
            "back": "สะอาด|sà-àat",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "dirty",
            "back": "สกปรก|sòk-ga-pròk",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "beautiful",
            "back": "สวย|sǔai",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "handsome",
            "back": "หล่อ|lɔ̀ɔ",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "cute",
            "back": "น่ารัก|nâa rák",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "fat",
            "back": "อ้วน|ûan",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 19 Flashcards",
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
        toast.success("Bundle 19 Flashcards inséré avec succès !");
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
            Insérer Bundle 19 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 451-475 (25 flashcards)
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

export default InsertThaBundle19Flashcard;
