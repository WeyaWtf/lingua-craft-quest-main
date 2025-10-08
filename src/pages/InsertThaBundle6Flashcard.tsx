import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle6Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "practice, follow",
            "back": "ปฏิบัติ|pà-tì-bàt",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "violate",
            "back": "ฝ่าฝืน|fàa fʉ̌ʉn",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "respect",
            "back": "เคารพ|khao-róp",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "violate",
            "back": "ละเมิด|lá-mə̂ət",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "announce",
            "back": "ประกาศ|prà-gàat",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "inform",
            "back": "แจ้ง|jɛ̂ɛng",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "report",
            "back": "รายงาน|raai-ngaan",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "news",
            "back": "ข่าว|khàao",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "information",
            "back": "ข้อมูล|khɔ̂ɔ muun",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "statistics",
            "back": "สถิติ|sà-thì-tì",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "numbers",
            "back": "ตัวเลข|tua lêek",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "amount",
            "back": "จำนวน|jam-nuan",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "percent",
            "back": "ร้อยละ|rɔ́ɔi lá",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "increase",
            "back": "เพิ่มขึ้น|phə̂əm khʉ̂n",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "decrease",
            "back": "ลดลง|lót long",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "constant",
            "back": "คงที่|khong thîi",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "change",
            "back": "เปลี่ยนแปลง|plìan plɛɛng",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "develop",
            "back": "พัฒนา|phát-thá-naa",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "progress",
            "back": "เจริญ|jà-rəən",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "advance",
            "back": "ก้าวหน้า|gâao nâa",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "backward",
            "back": "ล้าหลัง|láa lǎng",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "modern",
            "back": "ทันสมัย|than sà-mǎi",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "ancient",
            "back": "โบราณ|boo-raan",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "contemporary",
            "back": "ร่วมสมัย|rûam sà-mǎi",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "future",
            "back": "อนาคต|à-naa-khót",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 6 Flashcards",
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
        toast.success("Bundle 6 Flashcards inséré avec succès !");
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
            Insérer Bundle 6 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 126-150 (25 flashcards)
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

export default InsertThaBundle6Flashcard;
