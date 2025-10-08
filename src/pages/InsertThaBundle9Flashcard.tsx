import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle9Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "measurement",
            "back": "การวัด|gaan wát",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "weighing",
            "back": "การชั่ง|gaan châng",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "counting",
            "back": "การนับ|gaan náp",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "comparison",
            "back": "การเปรียบเทียบ|gaan prìap thîap",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "analysis",
            "back": "การวิเคราะห์|gaan wí-khrɔ́",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "observation",
            "back": "การสังเกต|gaan sǎng-gèet",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "experiment",
            "back": "การทดลอง|gaan thót lɔɔng",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "research",
            "back": "การวิจัย|gaan wí-jai",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "education, study",
            "back": "การศึกษา|gaan sʉ̀k-sǎa",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "learning",
            "back": "การเรียนรู้|gaan rian rúu",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "training",
            "back": "การฝึกฝน|gaan fʉ̀k fǒn",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "teaching",
            "back": "การสอน|gaan sɔ̌ɔn",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "explanation",
            "back": "การอธิบาย|gaan à-thí-baai",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "introduction",
            "back": "การแนะนำ|gaan náe nam",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "performance",
            "back": "การแสดง|gaan sà-dɛɛng",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "presentation",
            "back": "การนำเสนอ|gaan nam sà-nə̌ə",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "demonstration",
            "back": "การสาธิต|gaan sǎa-thít",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "lecture",
            "back": "การบรรยาย|gaan ban-yaai",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "discussion",
            "back": "การอภิปราย|gaan à-phí-praai",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "seminar",
            "back": "การสัมมนา|gaan sǎm-má-naa",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "conference",
            "back": "การประชุม|gaan prà-chum",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "competition",
            "back": "การแข่งขัน|gaan khɛ̀ng khǎn",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "sports competition",
            "back": "การแข่งกีฬา|gaan khɛ̀ng gii-laa",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "concert",
            "back": "การแสดงดนตรี|gaan sà-dɛɛng don-trii",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "play",
            "back": "การแสดงละคร|gaan sà-dɛɛng lá-khɔɔn",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 9 Flashcards",
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
        toast.success("Bundle 9 Flashcards inséré avec succès !");
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
            Insérer Bundle 9 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 201-225 (25 flashcards)
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

export default InsertThaBundle9Flashcard;
