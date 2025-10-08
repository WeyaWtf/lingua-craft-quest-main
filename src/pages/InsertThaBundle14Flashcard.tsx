import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle14Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "starting point",
            "back": "จุดเริ่มต้น|jùt rə̂əm tôn",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "ending point",
            "back": "จุดสิ้นสุด|jùt sîn sùt",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "between",
            "back": "ระหว่าง|rá-wàang",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "inside",
            "back": "ภายใน|phaai nai",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "outside",
            "back": "ภายนอก|phaai nɔ̂ɔk",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "in front",
            "back": "ภายหน้า|phaai nâa",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "behind",
            "back": "ภายหลัง|phaai lǎng",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "above",
            "back": "เบื้องบน|bʉ̂ang bon",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "below",
            "back": "เบื้องล่าง|bʉ̂ang lâang",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "ahead",
            "back": "ข้างหน้า|khâang nâa",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "rear",
            "back": "ข้างหลัง|khâang lǎng",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "left side",
            "back": "ข้างซ้าย|khâang sáai",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "right side",
            "back": "ข้างขวา|khâang khwǎa",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "center",
            "back": "ตรงกลาง|trong glaang",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "corner",
            "back": "มุม|mum",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "edge",
            "back": "ขอบ|khɔ̀ɔp",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "end, tip",
            "back": "ปลาย|plaai",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "base",
            "back": "โคน|khoon",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "part",
            "back": "ส่วน|sùan",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "piece",
            "back": "ชิ้น|chín",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "lump",
            "back": "ก้อน|gɔ̂ɔn",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "grain, pill",
            "back": "เม็ด|mét",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "drop",
            "back": "หยด|yòt",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "line, strand",
            "back": "เส้น|sên",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "sheet",
            "back": "แผ่น|phɛ̀ɛn",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 14 Flashcards",
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
        toast.success("Bundle 14 Flashcards inséré avec succès !");
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
            Insérer Bundle 14 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 326-350 (25 flashcards)
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

export default InsertThaBundle14Flashcard;
