import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle27Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "magazine",
            "back": "นิตยสาร|nít-tá-yá-sǎan",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "pen",
            "back": "ปากกา|pàak-gaa",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "pencil",
            "back": "ดินสอ|din-sɔ̌ɔ",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "paper",
            "back": "กระดาษ|grà-dàat",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "notebook",
            "back": "สมุด|sà-mùt",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "eraser",
            "back": "ยางลบ|yaang lóp",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "ruler",
            "back": "ไม้บรรทัด|mái ban-thát",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "scissors",
            "back": "กรรไกร|gan-grai",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "glue",
            "back": "กาว|gaao",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "tape",
            "back": "เทป|thêep",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "picture",
            "back": "ภาพ|phâap",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "photo",
            "back": "รูป|rûup",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "map",
            "back": "แผนที่|phɛ̌ɛn-thîi",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "calendar",
            "back": "ปฏิทิน|pà-ti-thin",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "gift",
            "back": "ของขวัญ|khɔ̌ɔng khwǎn",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "toy",
            "back": "ของเล่น|khɔ̌ɔng lên",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "game",
            "back": "เกม|geem",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "sport",
            "back": "กีฬา|gii-laa",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "football",
            "back": "ฟุตบอล|fút-bɔɔn",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "basketball",
            "back": "บาสเก็ตบอล|bàat-sa-gèt-bɔɔn",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "volleyball",
            "back": "วอลเลย์บอล|wɔɔn-lee-bɔɔn",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "badminton",
            "back": "แบดมินตัน|bɛ̀ɛt-min-tan",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "tennis",
            "back": "เทนนิส|then-nít",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "swim",
            "back": "ว่ายน้ำ|wâai náam",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "run",
            "back": "วิ่ง|wîng",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 27 Flashcards",
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
        toast.success("Bundle 27 Flashcards inséré avec succès !");
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
            Insérer Bundle 27 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 651-675 (25 flashcards)
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

export default InsertThaBundle27Flashcard;
