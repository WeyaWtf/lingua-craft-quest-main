import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle12Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "comfort",
            "back": "ความสบาย|khwaam sà-baai",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "cleanliness",
            "back": "ความสะอาด|khwaam sà-àat",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "orderliness",
            "back": "ความเป็นระเบียบ|khwaam pen rá-bìap",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "responsibility",
            "back": "ความรับผิดชอบ|khwaam ráp phìt chɔ̂ɔp",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "justice",
            "back": "ความยุติธรรม|khwaam yút-tì-tham",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "equality",
            "back": "ความเท่าเทียม|khwaam thâo thiiam",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "difference",
            "back": "ความแตกต่าง|khwaam tɛ̀ɛk tàang",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "diversity",
            "back": "ความหลากหลาย|khwaam lǎak lǎai",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "similarity",
            "back": "ความเหมือน|khwaam mʉ̌an",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "uniqueness",
            "back": "ความเป็นเอกลักษณ์|khwaam pen èek-gà-lák",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "specialty",
            "back": "ความพิเศษ|khwaam phí-sèet",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "beauty",
            "back": "ความสวยงาม|khwaam sǔai ngaam",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "attractiveness",
            "back": "ความน่าสนใจ|khwaam nâa sǒn jai",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "entertainment",
            "back": "ความบันเทิง|khwaam ban-thəəng",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "enjoyment",
            "back": "ความเพลิดเพลิน|khwaam phləət phləən",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "well-being",
            "back": "ความสุขสบาย|khwaam sùk sà-baai",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "prosperity",
            "back": "ความเจริญรุ่งเรือง|khwaam jà-rəən rûng rʉang",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "wealth",
            "back": "ความมั่งคั่ง|khwaam mâng khâng",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "poverty",
            "back": "ความยากจน|khwaam yâak jon",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "difficulty",
            "back": "ความลำบาก|khwaam lam-bàak",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "suffering",
            "back": "ความทุกข์|khwaam thúk",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "pain",
            "back": "ความเจ็บปวด|khwaam jèp pùat",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "danger",
            "back": "ความอันตราย|khwaam an-tá-raai",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "risk",
            "back": "ความเสี่ยง|khwaam sìang",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "possibility",
            "back": "ความเป็นไปได้|khwaam pen pai dâai",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 12 Flashcards",
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
        toast.success("Bundle 12 Flashcards inséré avec succès !");
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
            Insérer Bundle 12 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 276-300 (25 flashcards)
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

export default InsertThaBundle12Flashcard;
