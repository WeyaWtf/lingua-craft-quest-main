import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle4Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "tax",
            "back": "ภาษี|phaa-sǐi",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "income",
            "back": "รายได้|raai dâai",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "expense",
            "back": "ค่าใช้จ่าย|khâa chái jàai",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "salary",
            "back": "เงินเดือน|ngəən dʉan",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "bonus",
            "back": "โบนัส|boo-nát",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "goods",
            "back": "สินค้า|sǐn-kháa",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "service",
            "back": "บริการ|bɔɔ-rí-gaan",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "customer",
            "back": "ลูกค้า|lûuk kháa",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "employee",
            "back": "พนักงาน|phá-nák-ngaan",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "manager",
            "back": "ผู้จัดการ|phûu jàt-gaan",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "owner",
            "back": "เจ้าของ|jâo khɔ̌ɔng",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "partner",
            "back": "หุ้นส่วน|hûn sùan",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "contract",
            "back": "สัญญา|sǎn-yaa",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "agreement",
            "back": "ข้อตกลง|khɔ̂ɔ tòk-long",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "law",
            "back": "กฎหมาย|gòt-mǎai",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "court",
            "back": "ศาล|sǎan",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "lawyer",
            "back": "ทนายความ|thá-naai khwaam",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "judge",
            "back": "ผู้พิพากษา|phûu phí-phâak-sǎa",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "case",
            "back": "คดี|khá-dii",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "offense",
            "back": "ความผิด|khwaam phìt",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "innocent",
            "back": "บริสุทธิ์|bɔɔ-rí-sùt",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "guilty",
            "back": "ผิด|phìt",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "arrest",
            "back": "จับ|jàp",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "imprison",
            "back": "ขัง|khǎng",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "release",
            "back": "ปล่อย|plɔ̀i",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 4 Flashcards",
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
        toast.success("Bundle 4 Flashcards inséré avec succès !");
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
            Insérer Bundle 4 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 76-100 (25 flashcards)
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

export default InsertThaBundle4Flashcard;
