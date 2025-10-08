import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle8Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "appointment",
            "back": "การนัดหมาย|gaan nát mǎai",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "interview",
            "back": "การสัมภาษณ์|gaan sǎm-phâat",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "conversation",
            "back": "การสนทนา|gaan sǒn-thá-naa",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "chat",
            "back": "การพูดคุย|gaan phûut khui",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "debate",
            "back": "การถกเถียง|gaan thòk thǐang",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "argue",
            "back": "การโต้เถียง|gaan tôo thǐang",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "agreement",
            "back": "การตกลง|gaan tòk-long",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "acceptance",
            "back": "การยอมรับ|gaan yɔɔm ráp",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "refusal",
            "back": "การปฏิเสธ|gaan pà-tì-sèet",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "approval",
            "back": "การอนุมัติ|gaan à-nú-mát",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "cancellation",
            "back": "การยกเลิก|gaan yók lə̂ək",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "postponement",
            "back": "การเลื่อน|gaan lʉ̂an",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "confirmation",
            "back": "การยืนยัน|gaan yʉʉn yan",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "correction",
            "back": "การแก้ไข|gaan gɛ̂ɛ khǎi",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "improvement",
            "back": "การปรับปรุง|gaan pràp prung",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "repair",
            "back": "การซ่อมแซม|gaan sɔ̂ɔm sɛɛm",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "maintenance",
            "back": "การดูแล|gaan duu lɛɛ",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "cleaning",
            "back": "การทำความสะอาด|gaan tham khwaam sà-àat",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "organization",
            "back": "การจัดระเบียบ|gaan jàt rá-bìap",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "preparation",
            "back": "การเตรียม|gaan triam",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "planning",
            "back": "การวางแผน|gaan waang phɛ̌ɛn",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "decision",
            "back": "การตัดสินใจ|gaan tàt sǐn jai",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "selection",
            "back": "การเลือก|gaan lʉ̂ak",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "consideration",
            "back": "การพิจารณา|gaan phí-jaa-rá-naa",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "calculation",
            "back": "การคำนวณ|gaan kham-nuan",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 8 Flashcards",
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
        toast.success("Bundle 8 Flashcards inséré avec succès !");
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
            Insérer Bundle 8 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 176-200 (25 flashcards)
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

export default InsertThaBundle8Flashcard;
