import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle32Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "rotate",
            "back": "หมุน|mǔn",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "return",
            "back": "กลับ|glàp",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "turn",
            "back": "เลี้ยว|líao",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "straight",
            "back": "ตรง|trong",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "cross",
            "back": "ข้าม|khâam",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "pass through",
            "back": "ผ่าน|phàan",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "penetrate",
            "back": "ทะลุ|thá-lú",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "around",
            "back": "รอบ|rɔ̂ɔp",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "arrive",
            "back": "ถึง|thʉ̌ng",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "send",
            "back": "ส่ง|sòng",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "receive",
            "back": "รับ|ráp",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "divide, share",
            "back": "แบ่ง|bɛ̀ng",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "combine",
            "back": "รวม|ruam",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "separate",
            "back": "แยก|yɛ̂ɛk",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "mix",
            "back": "ผสม|phà-sǒm",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "increase",
            "back": "เพิ่ม|phə̂əm",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "decrease",
            "back": "ลด|lót",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "lack",
            "back": "ขาด|khàat",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "exceed",
            "back": "เกิน|gəən",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "just right",
            "back": "พอดี|phɔɔ dii",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "equal",
            "back": "เท่า|thâo",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "same, like",
            "back": "เหมือน|mʉ̌an",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "different",
            "back": "ต่าง|tàang",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "similar",
            "back": "คล้าย|khláai",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "more than",
            "back": "กว่า|gwàa",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 32 Flashcards",
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
        toast.success("Bundle 32 Flashcards inséré avec succès !");
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
            Insérer Bundle 32 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 776-800 (25 flashcards)
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

export default InsertThaBundle32Flashcard;
