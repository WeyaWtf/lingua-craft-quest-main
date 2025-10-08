import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle3Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "งานแต่ง|ngaan tɛ̀ng",
                  "right": "wedding",
                  "id": "1-1"
            },
            {
                  "left": "งานศพ|ngaan sòp",
                  "right": "funeral",
                  "id": "1-2"
            },
            {
                  "left": "งานบวช|ngaan bùat",
                  "right": "ordination",
                  "id": "1-3"
            },
            {
                  "left": "พิธี|phí-thii",
                  "right": "ceremony",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ของขวัญ|khɔ̌ɔng khwǎn",
                  "right": "gift",
                  "id": "2-1"
            },
            {
                  "left": "การ์ด|gáat",
                  "right": "card",
                  "id": "2-2"
            },
            {
                  "left": "ดอกไม้|dɔ̀ɔk mái",
                  "right": "flower",
                  "id": "2-3"
            },
            {
                  "left": "เทียน|thiian",
                  "right": "candle",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ธูป|thûup",
                  "right": "incense",
                  "id": "3-1"
            },
            {
                  "left": "พวงมาลัย|phuang maa-lai",
                  "right": "garland",
                  "id": "3-2"
            },
            {
                  "left": "ขนมเค้ก|khà-nǒm khéek",
                  "right": "cake",
                  "id": "3-3"
            },
            {
                  "left": "อวยพร|uai phɔɔn",
                  "right": "bless",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "โชคดี|chôok dii",
                  "right": "good luck",
                  "id": "4-1"
            },
            {
                  "left": "สุขภาพ|sùk-khà-phâap",
                  "right": "health",
                  "id": "4-2"
            },
            {
                  "left": "ความสุข|khwaam sùk",
                  "right": "happiness",
                  "id": "4-3"
            },
            {
                  "left": "ความรัก|khwaam rák",
                  "right": "love",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ความสำเร็จ|khwaam sǎm-rèt",
                  "right": "success",
                  "id": "5-1"
            },
            {
                  "left": "เศรษฐกิจ|sèet-thà-gìt",
                  "right": "economy",
                  "id": "5-2"
            },
            {
                  "left": "ธุรกิจ|thú-rá-gìt",
                  "right": "business",
                  "id": "5-3"
            },
            {
                  "left": "การค้า|gaan kháa",
                  "right": "trade",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ตลาดหุ้น|tà-làat hûn",
                  "right": "stock market",
                  "id": "6-1"
            },
            {
                  "left": "ลงทุน|long thun",
                  "right": "invest",
                  "id": "6-2"
            },
            {
                  "left": "กำไร|gam-rai",
                  "right": "profit",
                  "id": "6-3"
            },
            {
                  "left": "ขาดทุน|khàat thun",
                  "right": "loss",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ดอกเบี้ย|dɔ̀ɔk bîa",
                  "right": "interest",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 3 Association",
      difficulty: 1,
      source: "official",
      language: "thai",
      tags: ["vocabulary", "thai", "beginner", "CU-TFL"],
      content: { pairGroups },
      author_id: "demo",
      is_published: true
    };

    try {
      const { error } = await supabase.from("exercises").insert(exerciseData);

      if (error) {
        toast.error("Erreur lors de l'insertion");
        console.error(error);
      } else {
        toast.success("Bundle 3 Association inséré avec succès !");
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
            Insérer Bundle 3 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 51-75 (25 mots)
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

export default InsertThaBundle3Association;
