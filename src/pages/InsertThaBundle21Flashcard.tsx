import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle21Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "yesterday",
            "back": "เมื่อวาน|mʉ̂a waan",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "year",
            "back": "ปี|pii",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "month",
            "back": "เดือน|dʉan",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "week",
            "back": "อาทิตย์|aa-thít",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "hour",
            "back": "ชั่วโมง|chûa moong",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "minute",
            "back": "นาที|naa-thii",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "second",
            "back": "วินาที|wí-naa-thii",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "time",
            "back": "เวลา|wee-laa",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "period, when",
            "back": "ตอน|tɔɔn",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "before",
            "back": "ก่อน|gɔ̀ɔn",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "after",
            "back": "หลัง|lǎng",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "now",
            "back": "ตอนนี้|tɔɔn níi",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "in a moment",
            "back": "เดี๋ยว|dǐao",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "already",
            "back": "แล้ว|lɛ́ɛo",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "still, yet",
            "back": "ยัง|yang",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "always",
            "back": "เสมอ|sa-mə̌ə",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "often",
            "back": "บ่อย|bɔ̀i",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "sometimes",
            "back": "บางครั้ง|baang khráng",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "never",
            "back": "ไม่เคย|mâi khəəi",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "every",
            "back": "ทุก|thúk",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "some",
            "back": "บาง|baang",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "many",
            "back": "หลาย|lǎai",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "few, little",
            "back": "น้อย|nɔ́i",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "much, very",
            "back": "มาก|mâak",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "enough",
            "back": "พอ|phɔɔ",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 21 Flashcards",
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
        toast.success("Bundle 21 Flashcards inséré avec succès !");
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
            Insérer Bundle 21 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 501-525 (25 flashcards)
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

export default InsertThaBundle21Flashcard;
