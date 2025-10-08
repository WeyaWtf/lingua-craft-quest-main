import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle36Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "both, all",
            "back": "ทั้ง|tháng",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "or (question particle)",
            "back": "หรือ|rʉ̌ʉ",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "question particle",
            "back": "ไหม|mǎi",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "not",
            "back": "ไม่|mâi",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "yes, correct",
            "back": "ใช่|châi",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "no, not",
            "back": "ไม่ใช่|mâi châi",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "polite particle (female)",
            "back": "ค่ะ|khâ",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "polite particle (male)",
            "back": "ครับ|khráp",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "particle (softener)",
            "back": "นะ|ná",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "particle (urging)",
            "back": "สิ|sì",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "particle (and you?)",
            "back": "ล่ะ|lâ",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "particle (really)",
            "back": "หรอก|rɔ̀ɔk",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "at all, so",
            "back": "เลย|ləəi",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "true, real",
            "back": "จริง|jing",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "really",
            "back": "จริงๆ|jing jing",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "certainly",
            "back": "แน่นอน|nɛ̂ɛ nɔɔn",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "maybe",
            "back": "อาจจะ|àat jà",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "probably",
            "back": "คงจะ|khong jà",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "should be",
            "back": "น่าจะ|nâa jà",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "must",
            "back": "ต้อง|tɔ̂ng",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "should",
            "back": "ควร|khuan",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "want",
            "back": "อยาก|yàak",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "like",
            "back": "ชอบ|chɔ̂ɔp",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "love",
            "back": "รัก|rák",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "hate",
            "back": "เกลียด|glìat",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 36 Flashcards",
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
        toast.success("Bundle 36 Flashcards inséré avec succès !");
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
            Insérer Bundle 36 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 876-900 (25 flashcards)
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

export default InsertThaBundle36Flashcard;
