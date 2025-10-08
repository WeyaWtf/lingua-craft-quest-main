import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle35Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "university",
            "back": "มหาวิทยาลัย|má-hǎa wít-thá-yaa-lai",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "temple",
            "back": "วัด|wát",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "church",
            "back": "โบสถ์|bòot",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "mosque",
            "back": "มัสยิด|mát-sà-yít",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "airport",
            "back": "สนามบิน|sà-nǎam bin",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "train station",
            "back": "สถานีรถไฟ|sà-thǎa-nii rót fai",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "bus station",
            "back": "สถานีรถบัส|sà-thǎa-nii rót bát",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "pier",
            "back": "ท่าเรือ|thâa rʉa",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "place",
            "back": "สถานที่|sà-thǎan thîi",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "here",
            "back": "ที่นี่|thîi nîi",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "there",
            "back": "ที่นั่น|thîi nân",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "where",
            "back": "ที่ไหน|thîi nǎi",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "which",
            "back": "ไหน|nǎi",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "what",
            "back": "อะไร|à-rai",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "who",
            "back": "ใคร|khrai",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "why",
            "back": "ทำไม|tham-mai",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "how",
            "back": "อย่างไร|yàang rai",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "when",
            "back": "เมื่อไร|mʉ̂a rai",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "how many",
            "back": "กี่|gìi",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "how much",
            "back": "เท่าไร|thâo rai",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "how much, to what extent",
            "back": "แค่ไหน|khɛ̂ɛ nǎi",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "some, any",
            "back": "บ้าง|bâang",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "also, with",
            "back": "ด้วย|dûai",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "together",
            "back": "กัน|gan",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "oneself",
            "back": "เอง|eeng",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 35 Flashcards",
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
        toast.success("Bundle 35 Flashcards inséré avec succès !");
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
            Insérer Bundle 35 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 851-875 (25 flashcards)
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

export default InsertThaBundle35Flashcard;
