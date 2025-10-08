import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle30Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "sick",
            "back": "ป่วย|pùai",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "comfortable, well",
            "back": "สบาย|sà-baai",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "strong, healthy",
            "back": "แข็งแรง|khɛ̌ng rɛɛng",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "weak",
            "back": "อ่อนแอ|ɔ̀ɔn ɛɛ",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "recover",
            "back": "หาย|hǎai",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "die",
            "back": "ตาย|taai",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "born",
            "back": "เกิด|gə̀ət",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "age",
            "back": "อายุ|aa-yú",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "young man",
            "back": "หนุ่ม|nùm",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "young woman",
            "back": "สาว|sǎao",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "old (age)",
            "back": "แก่|gɛ̀ɛ",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "marry",
            "back": "แต่งงาน|tɛ̀ng ngaan",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "divorce",
            "back": "หย่า|yàa",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "pregnant",
            "back": "ท้อง|thɔ́ɔng",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "give birth",
            "back": "คลอด|khlɔ̂ɔt",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "raise, feed",
            "back": "เลี้ยง|líang",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "take care of",
            "back": "ดูแล|duu lɛɛ",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "help",
            "back": "ช่วย|chûai",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "request",
            "back": "ขอ|khɔ̌ɔ",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "thank you",
            "back": "ขอบคุณ|khɔ̀ɔp khun",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "sorry",
            "back": "ขอโทษ|khɔ̌ɔ thôot",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "pleased",
            "back": "ยินดี|yin dii",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "welcome",
            "back": "ต้อนรับ|tɔ̂ɔn ráp",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "goodbye",
            "back": "ลา|laa",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "meet",
            "back": "พบ|phóp",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 30 Flashcards",
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
        toast.success("Bundle 30 Flashcards inséré avec succès !");
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
            Insérer Bundle 30 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 726-750 (25 flashcards)
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

export default InsertThaBundle30Flashcard;
