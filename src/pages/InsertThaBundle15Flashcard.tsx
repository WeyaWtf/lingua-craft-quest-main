import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle15Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "piece (cloth)",
            "back": "ผืน|phʉ̌ʉn",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "ball, child",
            "back": "ลูก|lûuk",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "fruit, result",
            "back": "ผล|phǒn",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "peel, shell",
            "back": "เปลือก|plʉ̀ak",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "seed",
            "back": "เมล็ด|má-lét",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "root",
            "back": "ราก|râak",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "trunk",
            "back": "ลำต้น|lam tôn",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "branch",
            "back": "กิ่ง|gìng",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "blossom",
            "back": "ดอก|dɔ̀ɔk",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "petal",
            "back": "กลีบ|glìip",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "leaf",
            "back": "ใบ|bai",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "thorn",
            "back": "หนาม|nǎam",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "top, peak",
            "back": "ยอด|yɔ̂ɔt",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "base, foundation",
            "back": "ฐาน|thǎan",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "foundation",
            "back": "รากฐาน|râak thǎan",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "structure",
            "back": "โครงสร้าง|khroo-ng sâang",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "framework",
            "back": "โครงร่าง|khroo-ng râang",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "shape",
            "back": "รูปร่าง|rûup râang",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "form",
            "back": "รูปทรง|rûup song",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "pattern",
            "back": "รูปแบบ|rûup bɛ̀ɛp",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "model",
            "back": "แบบแผน|bɛ̀ɛp phɛ̌ɛn",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "sample",
            "back": "ตัวอย่าง|tua yàang",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "type, form",
            "back": "แบบ|bɛ̀ɛp",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "kind",
            "back": "ชนิด|chá-nít",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "category",
            "back": "ประเภท|prà-phêet",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 15 Flashcards",
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
        toast.success("Bundle 15 Flashcards inséré avec succès !");
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
            Insérer Bundle 15 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 351-375 (25 flashcards)
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

export default InsertThaBundle15Flashcard;
