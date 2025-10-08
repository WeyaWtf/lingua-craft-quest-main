import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle2Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "Canada",
            "back": "แคนาดา|khɛɛ-naa-daa",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "religion",
            "back": "ศาสนา|sàat-sà-nǎa",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "Buddhist",
            "back": "พุทธ|phút",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "Christian",
            "back": "คริสต์|khrít",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "Islam",
            "back": "อิสลาม|ìt-sà-laam",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "monk",
            "back": "พระ|phrá",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "church",
            "back": "โบสถ์|bòot",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "mosque",
            "back": "มัสยิด|mát-sà-yít",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "merit",
            "back": "บุญ|bun",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "sin",
            "back": "บาป|bàap",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "pray",
            "back": "สวดมนต์|sùat mon",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "pay respect",
            "back": "ไหว้|wâi",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "prostrate",
            "back": "กราบ|gràap",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "precepts",
            "back": "ศีล|sǐin",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "donation",
            "back": "ทาน|thaan",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "karma",
            "back": "กรรม|gam",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "nation, life",
            "back": "ชาติ|châat",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "culture",
            "back": "วัฒนธรรม|wát-thá-ná-tham",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "tradition",
            "back": "ประเพณี|prà-phee-nii",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "festival",
            "back": "เทศกาล|thêet-sà-gaan",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "Songkran",
            "back": "สงกรานต์|sǒng-graan",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "Loy Krathong",
            "back": "ลอยกระทง|lɔɔi grà-thong",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "Chinese New Year",
            "back": "ตรุษจีน|trùt jiin",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "New Year",
            "back": "ปีใหม่|pii mài",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "birthday",
            "back": "วันเกิด|wan gə̀ət",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 2 Flashcards",
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
        toast.success("Bundle 2 Flashcards inséré avec succès !");
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
            Insérer Bundle 2 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 26-50 (25 flashcards)
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

export default InsertThaBundle2Flashcard;
