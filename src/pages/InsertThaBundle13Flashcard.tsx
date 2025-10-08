import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle13Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "opportunity",
            "back": "โอกาส|oo-gàat",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "luck",
            "back": "โชค|chôok",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "fate",
            "back": "โชคชะตา|chôok chá-taa",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "destiny",
            "back": "ชะตากรรม|chá-taa gam",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "future",
            "back": "อนาคต|à-naa-khót",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "hope",
            "back": "ความหวัง|khwaam wǎng",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "dream",
            "back": "ความฝัน|khwaam fǎn",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "target",
            "back": "เป้าหมาย|pâo mǎai",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "destination",
            "back": "จุดหมาย|jùt mǎai",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "result",
            "back": "ผลลัพธ์|phǒn-lá-pháp",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "consequence",
            "back": "ผลที่ตามมา|phǒn thîi taam maa",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "influence",
            "back": "อิทธิพล|ìt-thí-phon",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "impact",
            "back": "ผลกระทบ|phǒn grà-thóp",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "cause",
            "back": "สาเหตุ|sǎa-hèet",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "reason",
            "back": "เหตุผล|hèet phǒn",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "excuse",
            "back": "ข้อแก้ตัว|khɔ̂ɔ gɛ̂ɛ tua",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "explanation",
            "back": "การอธิบาย|gaan à-thí-baai",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "example",
            "back": "ตัวอย่าง|tua yàang",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "case",
            "back": "กรณี|gà-rá-nii",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "situation",
            "back": "สถานการณ์|sà-thǎa-ná-gaan",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "event",
            "back": "เหตุการณ์|hèet-gaan",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "narrative",
            "back": "เรื่องราว|rʉ̂ang raao",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "history",
            "back": "ประวัติ|prà-wàt",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "origin",
            "back": "ที่มา|thîi maa",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "source",
            "back": "แหล่งกำเนิด|lɛ̀ng gam-nə̀ət",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 13 Flashcards",
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
        toast.success("Bundle 13 Flashcards inséré avec succès !");
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
            Insérer Bundle 13 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 301-325 (25 flashcards)
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

export default InsertThaBundle13Flashcard;
