import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle38Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "smart",
            "back": "ฉลาด|chà-làat",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "stupid",
            "back": "โง่|ngôo",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "good at",
            "back": "เก่ง|gèng",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "quiet",
            "back": "เงียบ|ngîap",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "loud",
            "back": "ดัง|dang",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "dangerous",
            "back": "อันตราย|an-tá-raai",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "safe",
            "back": "ปลอดภัย|plɔ̀ɔt phai",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "be careful",
            "back": "ระวัง|rá-wang",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "slippery",
            "back": "ลื่น|lʉ̂ʉn",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "dry",
            "back": "แห้ง|hɛ̂ɛng",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "wet",
            "back": "เปียก|pìak",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "damp",
            "back": "ชื้น|chʉ́ʉn",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "hot",
            "back": "ร้อน|rɔ́ɔn",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "cold",
            "back": "หนาว|nǎao",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "cool",
            "back": "เย็น|yen",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "warm",
            "back": "อบอุ่น|òp ùn",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "fresh",
            "back": "สด|sòt",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "rotten",
            "back": "เน่า|nâo",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "fragrant",
            "back": "หอม|hɔ̌ɔm",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "smelly",
            "back": "เหม็น|měn",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "sweet",
            "back": "หวาน|wǎan",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "salty",
            "back": "เค็ม|khem",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "spicy",
            "back": "เผ็ด|phèt",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "sour",
            "back": "เปรี้ยว|prîao",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "bitter",
            "back": "ขม|khǒm",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 38 Flashcards",
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
        toast.success("Bundle 38 Flashcards inséré avec succès !");
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
            Insérer Bundle 38 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 926-950 (25 flashcards)
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

export default InsertThaBundle38Flashcard;
