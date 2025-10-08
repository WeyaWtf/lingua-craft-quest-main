import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle33Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "most",
            "back": "ที่สุด|thîi sùt",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "one",
            "back": "หนึ่ง|nʉ̀ng",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "two",
            "back": "สอง|sɔ̌ɔng",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "three",
            "back": "สาม|sǎam",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "four",
            "back": "สี่|sìi",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "five",
            "back": "ห้า|hâa",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "six",
            "back": "หก|hòk",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "seven",
            "back": "เจ็ด|jèt",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "eight",
            "back": "แปด|pɛ̀ɛt",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "nine",
            "back": "เก้า|gâo",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "ten",
            "back": "สิบ|sìp",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "twenty",
            "back": "ยี่สิบ|yîi sìp",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "thirty",
            "back": "สามสิบ|sǎam sìp",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "forty",
            "back": "สี่สิบ|sìi sìp",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "fifty",
            "back": "ห้าสิบ|hâa sìp",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "sixty",
            "back": "หกสิบ|hòk sìp",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "seventy",
            "back": "เจ็ดสิบ|jèt sìp",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "eighty",
            "back": "แปดสิบ|pɛ̀ɛt sìp",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "ninety",
            "back": "เก้าสิบ|gâo sìp",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "hundred",
            "back": "ร้อย|rɔ́ɔi",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "thousand",
            "back": "พัน|phan",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "ten thousand",
            "back": "หมื่น|mʉ̀ʉn",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "hundred thousand",
            "back": "แสน|sɛ̌ɛn",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "million",
            "back": "ล้าน|láan",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "half",
            "back": "ครึ่ง|khrʉ̂ng",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 33 Flashcards",
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
        toast.success("Bundle 33 Flashcards inséré avec succès !");
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
            Insérer Bundle 33 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 801-825 (25 flashcards)
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

export default InsertThaBundle33Flashcard;
