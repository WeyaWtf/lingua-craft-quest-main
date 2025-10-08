import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle39Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "bland",
            "back": "จืด|jʉ̀ʉt",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "delicious",
            "back": "อร่อย|à-rɔ̀i",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "not tasty",
            "back": "ไม่อร่อย|mâi à-rɔ̀i",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "tight, firm",
            "back": "แน่น|nɛ̂ɛn",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "loose",
            "back": "หลวม|lǔam",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "hard",
            "back": "แข็ง|khɛ̌ng",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "soft",
            "back": "อ่อน|ɔ̀ɔn",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "soft (texture)",
            "back": "นิ่ม|nîm",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "crispy",
            "back": "กรอบ|grɔ̀ɔp",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "sticky",
            "back": "เหนียว|nǐao",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "detailed",
            "back": "ละเอียด|lá-ìat",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "rough",
            "back": "หยาบ|yàap",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "uneven",
            "back": "ขรุขระ|khrù-khrà",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "smooth",
            "back": "เรียบ|rîap",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "shiny",
            "back": "มัน|man",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "dull",
            "back": "ด้าน|dâan",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "opaque",
            "back": "ทึบ|thʉ́p",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "clear",
            "back": "ใส|sǎi",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "turbid",
            "back": "ขุ่น|khùn",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "heavy",
            "back": "หนัก|nàk",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "light (weight)",
            "back": "เบา|bao",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "deep",
            "back": "ลึก|lʉ́k",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "shallow",
            "back": "ตื้น|tʉ̂ʉn",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "wide",
            "back": "กว้าง|gwâang",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "narrow",
            "back": "แคบ|khɛ̂ɛp",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 39 Flashcards",
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
        toast.success("Bundle 39 Flashcards inséré avec succès !");
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
            Insérer Bundle 39 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 951-975 (25 flashcards)
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

export default InsertThaBundle39Flashcard;
