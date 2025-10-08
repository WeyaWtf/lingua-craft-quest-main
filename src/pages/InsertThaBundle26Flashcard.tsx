import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle26Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "tea",
            "back": "ชา|chaa",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "coffee",
            "back": "กาแฟ|gaa-fɛɛ",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "beer",
            "back": "เบียร์|biia",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "liquor",
            "back": "เหล้า|lâo",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "fruit juice",
            "back": "น้ำผลไม้|náam phǒn-lá-mái",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "soft drink",
            "back": "น้ำอัดลม|náam àt lom",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "shirt",
            "back": "เสื้อ|sʉ̂a",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "pants",
            "back": "กางเกง|gaang-geeng",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "skirt",
            "back": "กระโปรง|grà-proong",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "outfit, dress",
            "back": "ชุด|chút",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "shoes",
            "back": "รองเท้า|rɔɔng tháo",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "socks",
            "back": "ถุงเท้า|thǔng tháo",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "hat",
            "back": "หมวก|mùak",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "glasses",
            "back": "แว่นตา|wɛ̂n taa",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "watch, clock",
            "back": "นาฬิกา|naa-lí-gaa",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "bag",
            "back": "กระเป๋า|grà-pǎo",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "umbrella",
            "back": "ร่ม|rôm",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "key",
            "back": "กุญแจ|gun-jɛɛ",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "telephone",
            "back": "โทรศัพท์|thoo-rá-sàp",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "mobile phone",
            "back": "มือถือ|mʉʉ thʉ̌ʉ",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "computer",
            "back": "คอมพิวเตอร์|khɔm-phiu-təə",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "TV",
            "back": "ทีวี|thii-wii",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "radio",
            "back": "วิทยุ|wít-thá-yú",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "book",
            "back": "หนังสือ|nǎng-sʉ̌ʉ",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "newspaper",
            "back": "หนังสือพิมพ์|nǎng-sʉ̌ʉ phim",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 26 Flashcards",
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
        toast.success("Bundle 26 Flashcards inséré avec succès !");
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
            Insérer Bundle 26 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 626-650 (25 flashcards)
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

export default InsertThaBundle26Flashcard;
