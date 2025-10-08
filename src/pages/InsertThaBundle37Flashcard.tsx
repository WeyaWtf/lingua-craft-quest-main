import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle37Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "fear",
            "back": "กลัว|gluua",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "hope",
            "back": "หวัง|wǎng",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "wish",
            "back": "ปรารถนา|praan-thá-nǎa",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "need",
            "back": "ต้องการ|tɔ̂ng gaan",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "necessary",
            "back": "จำเป็น|jam pen",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "important",
            "back": "สำคัญ|sǎm-khan",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "special",
            "back": "พิเศษ|phí-sèet",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "ordinary",
            "back": "ธรรมดา|tham-má-daa",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "strange",
            "back": "แปลก|plɛ̀ɛk",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "interesting",
            "back": "น่าสนใจ|nâa sǒn jai",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "boring",
            "back": "น่าเบื่อ|nâa bʉ̀a",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "scary",
            "back": "น่ากลัว|nâa gluua",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "cute",
            "back": "น่ารัก|nâa rák",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "ugly",
            "back": "น่าเกลียด|nâa glìat",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "pitiful",
            "back": "น่าสงสาร|nâa sǒng sǎan",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "embarrassing",
            "back": "น่าอาย|nâa aai",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "proud",
            "back": "ภูมิใจ|phuum jai",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "disappointed",
            "back": "ผิดหวัง|phìt wǎng",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "surprised",
            "back": "ประหลาดใจ|prà-làat jai",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "misunderstand",
            "back": "เข้าใจผิด|khâo jai phìt",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "sorry, sad",
            "back": "เสียใจ|sǐa jai",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "kind",
            "back": "ใจดี|jai dii",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "mean",
            "back": "ใจร้าย|jai ráai",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "lazy",
            "back": "ขี้เกียจ|khîi gìat",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "diligent",
            "back": "ขยัน|khà-yǎn",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 37 Flashcards",
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
        toast.success("Bundle 37 Flashcards inséré avec succès !");
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
            Insérer Bundle 37 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 901-925 (25 flashcards)
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

export default InsertThaBundle37Flashcard;
