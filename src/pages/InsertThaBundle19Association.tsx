import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle19Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ถูก|thùuk",
                  "right": "cheap",
                  "id": "1-1"
            },
            {
                  "left": "ดี|dii",
                  "right": "good",
                  "id": "1-2"
            },
            {
                  "left": "ไม่ดี|mâi dii",
                  "right": "bad",
                  "id": "1-3"
            },
            {
                  "left": "ใหม่|mài",
                  "right": "new",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "เก่า|gào",
                  "right": "old",
                  "id": "2-1"
            },
            {
                  "left": "ใหญ่|yài",
                  "right": "big",
                  "id": "2-2"
            },
            {
                  "left": "เล็ก|lék",
                  "right": "small",
                  "id": "2-3"
            },
            {
                  "left": "ยาว|yaao",
                  "right": "long",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "สั้น|sân",
                  "right": "short",
                  "id": "3-1"
            },
            {
                  "left": "สูง|sǔung",
                  "right": "tall, high",
                  "id": "3-2"
            },
            {
                  "left": "เตี้ย|tîa",
                  "right": "short (height)",
                  "id": "3-3"
            },
            {
                  "left": "หนา|nǎa",
                  "right": "thick",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "บาง|baang",
                  "right": "thin",
                  "id": "4-1"
            },
            {
                  "left": "ร้อน|rɔ́ɔn",
                  "right": "hot",
                  "id": "4-2"
            },
            {
                  "left": "หนาว|nǎao",
                  "right": "cold",
                  "id": "4-3"
            },
            {
                  "left": "อุ่น|ùn",
                  "right": "warm",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "เย็น|yen",
                  "right": "cool",
                  "id": "5-1"
            },
            {
                  "left": "แห้ง|hɛ̂ɛng",
                  "right": "dry",
                  "id": "5-2"
            },
            {
                  "left": "เปียก|pìak",
                  "right": "wet",
                  "id": "5-3"
            },
            {
                  "left": "สะอาด|sà-àat",
                  "right": "clean",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "สกปรก|sòk-ga-pròk",
                  "right": "dirty",
                  "id": "6-1"
            },
            {
                  "left": "สวย|sǔai",
                  "right": "beautiful",
                  "id": "6-2"
            },
            {
                  "left": "หล่อ|lɔ̀ɔ",
                  "right": "handsome",
                  "id": "6-3"
            },
            {
                  "left": "น่ารัก|nâa rák",
                  "right": "cute",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "อ้วน|ûan",
                  "right": "fat",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 19 Association",
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
        toast.success("Bundle 19 Association inséré avec succès !");
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
            Insérer Bundle 19 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 451-475 (25 mots)
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

export default InsertThaBundle19Association;
