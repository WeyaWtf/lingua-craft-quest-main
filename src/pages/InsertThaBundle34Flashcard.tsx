import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle34Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "all, total",
            "back": "ทั้งหมด|tháng mòt",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "empty, free",
            "back": "ว่าง|wâang",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "full",
            "back": "เต็ม|tem",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "all gone",
            "back": "หมด|mòt",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "remain",
            "back": "เหลือ|lʉ̌a",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "sell",
            "back": "ขาย|khǎai",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "buy",
            "back": "ซื้อ|sʉ́ʉ",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "exchange",
            "back": "แลก|lɛ̂ɛk",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "borrow",
            "back": "ยืม|yʉʉm",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "return",
            "back": "คืน|khʉʉn",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "rent",
            "back": "เช่า|châo",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "reserve",
            "back": "จอง|jɔɔng",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "hire",
            "back": "จ้าง|jâang",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "work",
            "back": "ทำงาน|tham ngaan",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "rest",
            "back": "พัก|phák",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "take leave",
            "back": "ลา|laa",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "office",
            "back": "ออฟฟิศ|ɔ́ɔf-fít",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "company",
            "back": "บริษัท|bɔɔ-rí-sàt",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "factory",
            "back": "โรงงาน|roong ngaan",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "shop",
            "back": "ร้าน|ráan",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "market",
            "back": "ตลาด|tà-làat",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "mall",
            "back": "ห้าง|hâang",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "bank",
            "back": "ธนาคาร|thá-naa-khaan",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "hospital",
            "back": "โรงพยาบาล|roong phá-yaa-baan",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "school",
            "back": "โรงเรียน|roong rian",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 34 Flashcards",
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
        toast.success("Bundle 34 Flashcards inséré avec succès !");
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
            Insérer Bundle 34 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 826-850 (25 flashcards)
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

export default InsertThaBundle34Flashcard;
