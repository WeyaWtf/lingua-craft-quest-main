import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle5Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "punishment",
            "back": "โทษ|thôot",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "fine",
            "back": "ค่าปรับ|khâa pràp",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "prison",
            "back": "คุก|khúk",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "crime",
            "back": "อาชญากรรม|àat-chá-yaa-gam",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "thief",
            "back": "โจร|joon",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "murderer",
            "back": "ฆาตกร|khâat-tà-gɔɔn",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "victim",
            "back": "เหยื่อ|yʉ̀a",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "witness",
            "back": "พยาน|phá-yaan",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "evidence",
            "back": "หลักฐาน|làk-thǎan",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "investigate",
            "back": "สอบสวน|sɔ̀ɔp sǔan",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "govern",
            "back": "ปกครอง|pòk-khrɔɔng",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "government",
            "back": "รัฐบาล|rát-thà-baan",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "prime minister",
            "back": "นายกรัฐมนตรี|naai-yók rát-thà-mon-trii",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "minister",
            "back": "รัฐมนตรี|rát-thà-mon-trii",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "member",
            "back": "สมาชิก|sà-mǎa-chík",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "political party",
            "back": "พรรค|phák",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "politics",
            "back": "การเมือง|gaan mʉang",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "election",
            "back": "เลือกตั้ง|lʉ̂ak tâng",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "democracy",
            "back": "ประชาธิปไตย|prà-chaa-thíp-pà-tai",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "freedom",
            "back": "เสรีภาพ|sěe-rii-phâap",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "rights",
            "back": "สิทธิ|sìt-thí",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "duty",
            "back": "หน้าที่|nâa thîi",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "regulations",
            "back": "กฎระเบียบ|gòt rá-bìap",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "rules",
            "back": "กติกา|gà-tì-gaa",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "regulations",
            "back": "ข้อบังคับ|khɔ̂ɔ bang-kháp",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 5 Flashcards",
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
        toast.success("Bundle 5 Flashcards inséré avec succès !");
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
            Insérer Bundle 5 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 101-125 (25 flashcards)
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

export default InsertThaBundle5Flashcard;
