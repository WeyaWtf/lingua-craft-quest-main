import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle18Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "tell",
            "back": "บอก|bɔ̀ɔk",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "ask",
            "back": "ถาม|thǎam",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "answer",
            "back": "ตอบ|tɔ̀ɔp",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "know",
            "back": "รู้|rúu",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "think",
            "back": "คิด|khít",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "understand",
            "back": "เข้าใจ|khâo jai",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "look, watch",
            "back": "ดู|duu",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "listen",
            "back": "ฟัง|fang",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "read",
            "back": "อ่าน|àan",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "write",
            "back": "เขียน|khǐan",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "eat",
            "back": "กิน|gin",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "drink",
            "back": "ดื่ม|dʉ̀ʉm",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "sleep",
            "back": "นอน|nɔɔn",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "wake up",
            "back": "ตื่น|tʉ̀ʉn",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "walk",
            "back": "เดิน|dəən",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "run",
            "back": "วิ่ง|wîng",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "sit",
            "back": "นั่ง|nâng",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "stand",
            "back": "ยืน|yʉʉn",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "buy",
            "back": "ซื้อ|sʉ́ʉ",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "sell",
            "back": "ขาย|khǎai",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "pay",
            "back": "จ่าย|jàai",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "price",
            "back": "ราคา|raakhaa",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "money",
            "back": "เงิน|ngəən",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "baht",
            "back": "บาท|bàat",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "expensive",
            "back": "แพง|phɛɛng",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 18 Flashcards",
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
        toast.success("Bundle 18 Flashcards inséré avec succès !");
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
            Insérer Bundle 18 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 426-450 (25 flashcards)
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

export default InsertThaBundle18Flashcard;
