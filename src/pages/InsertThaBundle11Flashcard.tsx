import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle11Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "obstacle",
            "back": "อุปสรรค|ùp-pà-sàk",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "problem-solving",
            "back": "การแก้ปัญหา|gaan gɛ̂ɛ pan-hǎa",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "solution",
            "back": "วิธีแก้|wí-thii gɛ̂ɛ",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "answer",
            "back": "คำตอบ|kham tɔ̀ɔp",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "question",
            "back": "คำถาม|kham thǎam",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "doubt",
            "back": "ข้อสงสัย|khɔ̂ɔ sǒng sǎi",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "suspicion",
            "back": "ความสงสัย|khwaam sǒng sǎi",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "belief",
            "back": "ความเชื่อ|khwaam chʉ̂a",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "confidence",
            "back": "ความเชื่อมั่น|khwaam chʉ̂a mân",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "trust",
            "back": "ความไว้วางใจ|khwaam wái waang jai",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "honesty",
            "back": "ความซื่อสัตย์|khwaam sʉ̂ʉ sàt",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "sincerity",
            "back": "ความจริงใจ|khwaam jing jai",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "compassion",
            "back": "ความเมตตา|khwaam mêet-taa",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "kindness",
            "back": "ความกรุณา|khwaam gà-rú-naa",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "patience",
            "back": "ความอดทน|khwaam òt thon",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "effort",
            "back": "ความพยายาม|khwaam phá-yaa-yaam",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "intention",
            "back": "ความตั้งใจ|khwaam tâng jai",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "determination",
            "back": "ความมุ่งมั่น|khwaam mûng mân",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "enthusiasm",
            "back": "ความกระตือรือร้น|khwaam grà-tʉʉ rʉʉ rón",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "interest",
            "back": "ความสนใจ|khwaam sǒn jai",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "concern",
            "back": "ความห่วงใย|khwaam hùang yai",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "attention",
            "back": "ความเอาใจใส่|khwaam ao jai sài",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "caution",
            "back": "ความระมัดระวัง|khwaam rá-mát rá-wang",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "safety",
            "back": "ความปลอดภัย|khwaam plɔ̀ɔt phai",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "convenience",
            "back": "ความสะดวก|khwaam sà-dùak",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 11 Flashcards",
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
        toast.success("Bundle 11 Flashcards inséré avec succès !");
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
            Insérer Bundle 11 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 251-275 (25 flashcards)
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

export default InsertThaBundle11Flashcard;
