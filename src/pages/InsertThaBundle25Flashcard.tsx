import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle25Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "color",
            "back": "สี|sǐi",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "white",
            "back": "สีขาว|sǐi khǎao",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "black",
            "back": "สีดำ|sǐi dam",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "red",
            "back": "สีแดง|sǐi dɛɛng",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "green",
            "back": "สีเขียว|sǐi khǐao",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "blue",
            "back": "สีน้ำเงิน|sǐi náam ngəən",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "yellow",
            "back": "สีเหลือง|sǐi lʉ̌ang",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "orange",
            "back": "สีส้ม|sǐi sôm",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "purple",
            "back": "สีม่วง|sǐi mûang",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "pink",
            "back": "สีชมพู|sǐi chom-phuu",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "brown",
            "back": "สีน้ำตาล|sǐi náam taan",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "gray",
            "back": "สีเทา|sǐi thao",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "food",
            "back": "อาหาร|aa-hǎan",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "rice",
            "back": "ข้าว|khâao",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "snack, dessert",
            "back": "ขนม|khà-nǒm",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "fruit",
            "back": "ผลไม้|phǒn-lá-mái",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "vegetable",
            "back": "ผัก|phàk",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "meat, beef",
            "back": "เนื้อ|nʉ́a",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "pork",
            "back": "หมู|mǔu",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "chicken",
            "back": "ไก่|gài",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "fish",
            "back": "ปลา|plaa",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "shrimp",
            "back": "กุ้ง|gûng",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "egg",
            "back": "ไข่|khài",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "milk",
            "back": "นม|nom",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "water",
            "back": "น้ำ|náam",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 25 Flashcards",
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
        toast.success("Bundle 25 Flashcards inséré avec succès !");
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
            Insérer Bundle 25 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 601-625 (25 flashcards)
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

export default InsertThaBundle25Flashcard;
