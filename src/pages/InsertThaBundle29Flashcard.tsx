import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle29Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "start",
            "back": "เริ่ม|rə̂əm",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "stop",
            "back": "หยุด|yùt",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "continue",
            "back": "ต่อ|tɔ̀ɔ",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "wait",
            "back": "รอ|rɔɔ",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "hurry",
            "back": "รีบ|rîip",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "late",
            "back": "สาย|sǎai",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "in time",
            "back": "ทัน|than",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "miss",
            "back": "พลาด|phlâat",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "forget",
            "back": "ลืม|lʉʉm",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "remember",
            "back": "จำ|jam",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "think of",
            "back": "นึก|nʉ́k",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "dream",
            "back": "ฝัน|fǎn",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "excited",
            "back": "ตื่นเต้น|tʉ̀ʉn tên",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "afraid",
            "back": "กลัว|gluua",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "worry",
            "back": "กังวล|gang-won",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "angry",
            "back": "โกรธ|gròot",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "sad",
            "back": "เศร้า|sâo",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "happy",
            "back": "ดีใจ|dii jai",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "fun",
            "back": "สนุก|sà-nùk",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "bored",
            "back": "เบื่อ|bʉ̀a",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "tired",
            "back": "เหนื่อย|nʉ̀ai",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "sleepy",
            "back": "ง่วง|ngûang",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "hungry",
            "back": "หิว|hǐu",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "full (stomach)",
            "back": "อิ่ม|ìm",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "thirsty",
            "back": "กระหาย|grà-hǎai",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 29 Flashcards",
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
        toast.success("Bundle 29 Flashcards inséré avec succès !");
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
            Insérer Bundle 29 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 701-725 (25 flashcards)
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

export default InsertThaBundle29Flashcard;
