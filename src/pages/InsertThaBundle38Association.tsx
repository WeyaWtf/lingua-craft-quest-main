import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle38Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ฉลาด|chà-làat",
                  "right": "smart",
                  "id": "1-1"
            },
            {
                  "left": "โง่|ngôo",
                  "right": "stupid",
                  "id": "1-2"
            },
            {
                  "left": "เก่ง|gèng",
                  "right": "good at",
                  "id": "1-3"
            },
            {
                  "left": "เงียบ|ngîap",
                  "right": "quiet",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ดัง|dang",
                  "right": "loud",
                  "id": "2-1"
            },
            {
                  "left": "อันตราย|an-tá-raai",
                  "right": "dangerous",
                  "id": "2-2"
            },
            {
                  "left": "ปลอดภัย|plɔ̀ɔt phai",
                  "right": "safe",
                  "id": "2-3"
            },
            {
                  "left": "ระวัง|rá-wang",
                  "right": "be careful",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ลื่น|lʉ̂ʉn",
                  "right": "slippery",
                  "id": "3-1"
            },
            {
                  "left": "แห้ง|hɛ̂ɛng",
                  "right": "dry",
                  "id": "3-2"
            },
            {
                  "left": "เปียก|pìak",
                  "right": "wet",
                  "id": "3-3"
            },
            {
                  "left": "ชื้น|chʉ́ʉn",
                  "right": "damp",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ร้อน|rɔ́ɔn",
                  "right": "hot",
                  "id": "4-1"
            },
            {
                  "left": "หนาว|nǎao",
                  "right": "cold",
                  "id": "4-2"
            },
            {
                  "left": "เย็น|yen",
                  "right": "cool",
                  "id": "4-3"
            },
            {
                  "left": "อบอุ่น|òp ùn",
                  "right": "warm",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "สด|sòt",
                  "right": "fresh",
                  "id": "5-1"
            },
            {
                  "left": "เน่า|nâo",
                  "right": "rotten",
                  "id": "5-2"
            },
            {
                  "left": "หอม|hɔ̌ɔm",
                  "right": "fragrant",
                  "id": "5-3"
            },
            {
                  "left": "เหม็น|měn",
                  "right": "smelly",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "หวาน|wǎan",
                  "right": "sweet",
                  "id": "6-1"
            },
            {
                  "left": "เค็ม|khem",
                  "right": "salty",
                  "id": "6-2"
            },
            {
                  "left": "เผ็ด|phèt",
                  "right": "spicy",
                  "id": "6-3"
            },
            {
                  "left": "เปรี้ยว|prîao",
                  "right": "sour",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ขม|khǒm",
                  "right": "bitter",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 38 Association",
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
        toast.success("Bundle 38 Association inséré avec succès !");
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
            Insérer Bundle 38 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 926-950 (25 mots)
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

export default InsertThaBundle38Association;
