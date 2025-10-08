import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle24Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "road",
            "back": "ถนน|thà-nǒn",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "way, path",
            "back": "ทาง|thaang",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "bridge",
            "back": "สะพาน|sà-phaan",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "river",
            "back": "แม่น้ำ|mɛ̂ɛ náam",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "sea",
            "back": "ทะเล|thá-lee",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "mountain",
            "back": "ภูเขา|phuu khǎa",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "forest",
            "back": "ป่า|pàa",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "tree",
            "back": "ต้นไม้|tôn mái",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "flower",
            "back": "ดอกไม้|dɔ̀ɔk mái",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "leaf",
            "back": "ใบไม้|bai mái",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "grass",
            "back": "หญ้า|yâa",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "soil",
            "back": "ดิน|din",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "stone",
            "back": "หิน|hǐn",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "sand",
            "back": "ทราย|saai",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "water",
            "back": "น้ำ|náam",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "rain",
            "back": "ฝน|fǒn",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "wind",
            "back": "ลม|lom",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "cloud",
            "back": "เมฆ|mêek",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "sun",
            "back": "ดวงอาทิตย์|duang aa-thít",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "moon",
            "back": "ดวงจันทร์|duang jan",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "star",
            "back": "ดาว|daao",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "sky",
            "back": "ท้องฟ้า|thɔ́ɔng fáa",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "air, weather",
            "back": "อากาศ|aa-gàat",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "light",
            "back": "แสง|sɛ̌ɛng",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "shadow",
            "back": "เงา|ngao",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 24 Flashcards",
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
        toast.success("Bundle 24 Flashcards inséré avec succès !");
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
            Insérer Bundle 24 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 576-600 (25 flashcards)
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

export default InsertThaBundle24Flashcard;
