import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle22Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "too much",
            "back": "เกิน|gəən",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "person",
            "back": "คน|khon",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "man",
            "back": "ผู้ชาย|phûu chaai",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "woman",
            "back": "ผู้หญิง|phûu yǐng",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "child",
            "back": "เด็ก|dèk",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "adult",
            "back": "ผู้ใหญ่|phûu yài",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "father",
            "back": "พ่อ|phɔ̂ɔ",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "mother",
            "back": "แม่|mɛ̂ɛ",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "child (offspring)",
            "back": "ลูก|lûuk",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "older sibling",
            "back": "พี่|phîi",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "younger sibling",
            "back": "น้อง|nɔ́ɔng",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "grandfather (paternal)",
            "back": "ปู่|pùu",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "grandmother (paternal)",
            "back": "ย่า|yâa",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "grandfather (maternal)",
            "back": "ตา|taa",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "grandmother (maternal)",
            "back": "ยาย|yaai",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "uncle (older)",
            "back": "ลุง|lung",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "aunt (older)",
            "back": "ป้า|pâa",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "uncle/aunt (younger)",
            "back": "น้า|náa",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "nephew, niece",
            "back": "หลาน|lǎan",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "friend",
            "back": "เพื่อน|phʉ̂an",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "boyfriend, girlfriend",
            "back": "แฟน|fɛɛn",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "husband",
            "back": "สามี|sǎa-mii",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "wife",
            "back": "ภรรยา|phan-rá-yaa",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "teacher",
            "back": "ครู|khruu",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "student",
            "back": "นักเรียน|nák rian",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 22 Flashcards",
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
        toast.success("Bundle 22 Flashcards inséré avec succès !");
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
            Insérer Bundle 22 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 526-550 (25 flashcards)
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

export default InsertThaBundle22Flashcard;
