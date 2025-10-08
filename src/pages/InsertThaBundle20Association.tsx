import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle20Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ผอม|phɔ̌ɔm",
                  "right": "thin",
                  "id": "1-1"
            },
            {
                  "left": "เร็ว|reo",
                  "right": "fast",
                  "id": "1-2"
            },
            {
                  "left": "ช้า|cháa",
                  "right": "slow",
                  "id": "1-3"
            },
            {
                  "left": "ง่าย|ngâai",
                  "right": "easy",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ยาก|yâak",
                  "right": "difficult",
                  "id": "2-1"
            },
            {
                  "left": "ใกล้|glâi",
                  "right": "near",
                  "id": "2-2"
            },
            {
                  "left": "ไกล|glai",
                  "right": "far",
                  "id": "2-3"
            },
            {
                  "left": "หน้า|nâa",
                  "right": "front, face",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "หลัง|lǎng",
                  "right": "back, after",
                  "id": "3-1"
            },
            {
                  "left": "ข้าง|khâang",
                  "right": "side",
                  "id": "3-2"
            },
            {
                  "left": "บน|bon",
                  "right": "above, on",
                  "id": "3-3"
            },
            {
                  "left": "ล่าง|lâang",
                  "right": "below",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ซ้าย|sáai",
                  "right": "left",
                  "id": "4-1"
            },
            {
                  "left": "ขวา|khwǎa",
                  "right": "right",
                  "id": "4-2"
            },
            {
                  "left": "กลาง|glaang",
                  "right": "middle",
                  "id": "4-3"
            },
            {
                  "left": "รอบ|rɔ̂ɔp",
                  "right": "around",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "วัน|wan",
                  "right": "day",
                  "id": "5-1"
            },
            {
                  "left": "คืน|khʉʉn",
                  "right": "night",
                  "id": "5-2"
            },
            {
                  "left": "เช้า|cháo",
                  "right": "morning",
                  "id": "5-3"
            },
            {
                  "left": "บ่าย|bàai",
                  "right": "afternoon",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "เย็น|yen",
                  "right": "evening",
                  "id": "6-1"
            },
            {
                  "left": "กลางวัน|glaang wan",
                  "right": "daytime",
                  "id": "6-2"
            },
            {
                  "left": "กลางคืน|glaang khʉʉn",
                  "right": "nighttime",
                  "id": "6-3"
            },
            {
                  "left": "วันนี้|wan níi",
                  "right": "today",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "พรุ่งนี้|phrûng níi",
                  "right": "tomorrow",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 20 Association",
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
        toast.success("Bundle 20 Association inséré avec succès !");
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
            Insérer Bundle 20 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 476-500 (25 mots)
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

export default InsertThaBundle20Association;
