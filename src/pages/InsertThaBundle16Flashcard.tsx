import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle16Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "classification",
            "back": "หมวดหมู่|mùat mùu",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "group",
            "back": "กลุ่ม|glùm",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "group (of people)",
            "back": "พวก|phûak",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "herd, flock",
            "back": "ฝูง|fǔung",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "team",
            "back": "ทีม|thiim",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "committee",
            "back": "คณะ|khá-ná",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "organization",
            "back": "องค์กร|ong-gɔɔn",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "association",
            "back": "สมาคม|sà-maa-khom",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "institution",
            "back": "สถาบัน|sà-thǎa-ban",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "foundation",
            "back": "มูลนิธิ|muun-ní-thí",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "community",
            "back": "ชุมชน|chum-chon",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "society",
            "back": "สังคม|sǎng-khom",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "world",
            "back": "โลก|lôok",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "universe",
            "back": "จักรวาล|jàk-grà-waan",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "nature",
            "back": "ธรรมชาติ|tham-má-châat",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "environment",
            "back": "สิ่งแวดล้อม|sìng wɛ̂ɛt lɔ́ɔm",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "pollution",
            "back": "มลพิษ|mon-lá-phít",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "garbage",
            "back": "ขยะ|khà-yà",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "energy",
            "back": "พลังงาน|phá-lang ngaan",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "electricity",
            "back": "ไฟฟ้า|fai fáa",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "oil",
            "back": "น้ำมัน|náam man",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "gas",
            "back": "ก๊าซ|gáat",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "coal",
            "back": "ถ่านหิน|thàan hǐn",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "sunlight",
            "back": "แสงอาทิตย์|sɛ̌ɛng aa-thít",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "wind",
            "back": "ลม|lom",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 16 Flashcards",
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
        toast.success("Bundle 16 Flashcards inséré avec succès !");
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
            Insérer Bundle 16 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 376-400 (25 flashcards)
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

export default InsertThaBundle16Flashcard;
