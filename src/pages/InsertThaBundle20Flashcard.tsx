import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle20Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "thin",
            "back": "ผอม|phɔ̌ɔm",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "fast",
            "back": "เร็ว|reo",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "slow",
            "back": "ช้า|cháa",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "easy",
            "back": "ง่าย|ngâai",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "difficult",
            "back": "ยาก|yâak",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "near",
            "back": "ใกล้|glâi",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "far",
            "back": "ไกล|glai",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "front, face",
            "back": "หน้า|nâa",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "back, after",
            "back": "หลัง|lǎng",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "side",
            "back": "ข้าง|khâang",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "above, on",
            "back": "บน|bon",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "below",
            "back": "ล่าง|lâang",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "left",
            "back": "ซ้าย|sáai",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "right",
            "back": "ขวา|khwǎa",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "middle",
            "back": "กลาง|glaang",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "around",
            "back": "รอบ|rɔ̂ɔp",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "day",
            "back": "วัน|wan",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "night",
            "back": "คืน|khʉʉn",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "morning",
            "back": "เช้า|cháo",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "afternoon",
            "back": "บ่าย|bàai",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "evening",
            "back": "เย็น|yen",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "daytime",
            "back": "กลางวัน|glaang wan",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "nighttime",
            "back": "กลางคืน|glaang khʉʉn",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "today",
            "back": "วันนี้|wan níi",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "tomorrow",
            "back": "พรุ่งนี้|phrûng níi",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 20 Flashcards",
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
        toast.success("Bundle 20 Flashcards inséré avec succès !");
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
            Insérer Bundle 20 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 476-500 (25 flashcards)
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

export default InsertThaBundle20Flashcard;
