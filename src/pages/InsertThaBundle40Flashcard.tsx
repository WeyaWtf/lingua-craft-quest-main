import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle40Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "bright",
            "back": "สว่าง|sàwàang",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "dark",
            "back": "มืด|mʉ̂ʉt",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "Monday",
            "back": "วันจันทร์|wan jan",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "Tuesday",
            "back": "วันอังคาร|wan ang-khaan",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "Wednesday",
            "back": "วันพุธ|wan phút",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "Thursday",
            "back": "วันพฤหัสบดี|wan phá-rʉ́-hàt-sà-bɔɔ-dii",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "Friday",
            "back": "วันศุกร์|wan sùk",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "Saturday",
            "back": "วันเสาร์|wan sǎo",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "Sunday",
            "back": "วันอาทิตย์|wan aa-thít",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "January",
            "back": "มกราคม|mók-gà-raa-khom",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "February",
            "back": "กุมภาพันธ์|gum-phaa-phan",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "March",
            "back": "มีนาคม|mii-naa-khom",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "April",
            "back": "เมษายน|mee-sǎa-yon",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "May",
            "back": "พฤษภาคม|phrʉ́t-sà-phaa-khom",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "June",
            "back": "มิถุนายน|mí-thù-naa-yon",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "July",
            "back": "กรกฎาคม|gà-rá-gà-daa-khom",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "August",
            "back": "สิงหาคม|sǐng-hǎa-khom",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "September",
            "back": "กันยายน|gan-yaa-yon",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "October",
            "back": "ตุลาคม|tù-laa-khom",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "November",
            "back": "พฤศจิกายน|phrʉ́t-sà-jì-gaa-yon",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "December",
            "back": "ธันวาคม|than-waa-khom",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "summer",
            "back": "ฤดูร้อน|rʉ́-duu rɔ́ɔn",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "rainy season",
            "back": "ฤดูฝน|rʉ́-duu fǒn",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "winter",
            "back": "ฤดูหนาว|rʉ́-duu nǎao",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "country",
            "back": "ประเทศ|prà-thêet",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 40 Flashcards",
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
        toast.success("Bundle 40 Flashcards inséré avec succès !");
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
            Insérer Bundle 40 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 976-1000 (25 flashcards)
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

export default InsertThaBundle40Flashcard;
