import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle23Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "doctor",
            "back": "หมอ|mɔ̌ɔ",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "police",
            "back": "ตำรวจ|tam-rùat",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "soldier",
            "back": "ทหาร|thá-hǎan",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "employee",
            "back": "พนักงาน|phá-nák-ngaan",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "boss",
            "back": "เจ้านาย|jâo naai",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "house, home",
            "back": "บ้าน|bâan",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "room",
            "back": "ห้อง|hɔ̂ng",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "door",
            "back": "ประตู|pra-tuu",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "window",
            "back": "หน้าต่าง|nâa tàang",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "table",
            "back": "โต๊ะ|tó",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "chair",
            "back": "เก้าอี้|gâo-îi",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "bed",
            "back": "เตียง|tiiang",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "cabinet",
            "back": "ตู้|tûu",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "bedroom",
            "back": "ห้องนอน|hɔ̂ng nɔɔn",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "bathroom",
            "back": "ห้องน้ำ|hɔ̂ng náam",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "kitchen",
            "back": "ครัว|khrua",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "garden",
            "back": "สวน|sǔan",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "car, vehicle",
            "back": "รถ|rót",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "car",
            "back": "รถยนต์|rót yon",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "bicycle",
            "back": "รถจักรยาน|rót jàk-grà-yaan",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "motorcycle",
            "back": "รถมอเตอร์ไซค์|rót mɔɔ-təə-sai",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "bus",
            "back": "รถบัส|rót bát",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "train",
            "back": "รถไฟ|rót fai",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "airplane",
            "back": "เครื่องบิน|khrʉ̂ang bin",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "boat",
            "back": "เรือ|rʉa",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 23 Flashcards",
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
        toast.success("Bundle 23 Flashcards inséré avec succès !");
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
            Insérer Bundle 23 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 551-575 (25 flashcards)
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

export default InsertThaBundle23Flashcard;
