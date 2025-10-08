import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle3Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "wedding",
            "back": "งานแต่ง|ngaan tɛ̀ng",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "funeral",
            "back": "งานศพ|ngaan sòp",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "ordination",
            "back": "งานบวช|ngaan bùat",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "ceremony",
            "back": "พิธี|phí-thii",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "gift",
            "back": "ของขวัญ|khɔ̌ɔng khwǎn",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "card",
            "back": "การ์ด|gáat",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "flower",
            "back": "ดอกไม้|dɔ̀ɔk mái",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "candle",
            "back": "เทียน|thiian",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "incense",
            "back": "ธูป|thûup",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "garland",
            "back": "พวงมาลัย|phuang maa-lai",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "cake",
            "back": "ขนมเค้ก|khà-nǒm khéek",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "bless",
            "back": "อวยพร|uai phɔɔn",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "good luck",
            "back": "โชคดี|chôok dii",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "health",
            "back": "สุขภาพ|sùk-khà-phâap",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "happiness",
            "back": "ความสุข|khwaam sùk",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "love",
            "back": "ความรัก|khwaam rák",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "success",
            "back": "ความสำเร็จ|khwaam sǎm-rèt",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "economy",
            "back": "เศรษฐกิจ|sèet-thà-gìt",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "business",
            "back": "ธุรกิจ|thú-rá-gìt",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "trade",
            "back": "การค้า|gaan kháa",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "stock market",
            "back": "ตลาดหุ้น|tà-làat hûn",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "invest",
            "back": "ลงทุน|long thun",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "profit",
            "back": "กำไร|gam-rai",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "loss",
            "back": "ขาดทุน|khàat thun",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "interest",
            "back": "ดอกเบี้ย|dɔ̀ɔk bîa",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 3 Flashcards",
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
        toast.success("Bundle 3 Flashcards inséré avec succès !");
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
            Insérer Bundle 3 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 51-75 (25 flashcards)
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

export default InsertThaBundle3Flashcard;
