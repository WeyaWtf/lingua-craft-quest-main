import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle29Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "เริ่ม|rə̂əm",
                  "right": "start",
                  "id": "1-1"
            },
            {
                  "left": "หยุด|yùt",
                  "right": "stop",
                  "id": "1-2"
            },
            {
                  "left": "ต่อ|tɔ̀ɔ",
                  "right": "continue",
                  "id": "1-3"
            },
            {
                  "left": "รอ|rɔɔ",
                  "right": "wait",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "รีบ|rîip",
                  "right": "hurry",
                  "id": "2-1"
            },
            {
                  "left": "สาย|sǎai",
                  "right": "late",
                  "id": "2-2"
            },
            {
                  "left": "ทัน|than",
                  "right": "in time",
                  "id": "2-3"
            },
            {
                  "left": "พลาด|phlâat",
                  "right": "miss",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ลืม|lʉʉm",
                  "right": "forget",
                  "id": "3-1"
            },
            {
                  "left": "จำ|jam",
                  "right": "remember",
                  "id": "3-2"
            },
            {
                  "left": "นึก|nʉ́k",
                  "right": "think of",
                  "id": "3-3"
            },
            {
                  "left": "ฝัน|fǎn",
                  "right": "dream",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ตื่นเต้น|tʉ̀ʉn tên",
                  "right": "excited",
                  "id": "4-1"
            },
            {
                  "left": "กลัว|gluua",
                  "right": "afraid",
                  "id": "4-2"
            },
            {
                  "left": "กังวล|gang-won",
                  "right": "worry",
                  "id": "4-3"
            },
            {
                  "left": "โกรธ|gròot",
                  "right": "angry",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "เศร้า|sâo",
                  "right": "sad",
                  "id": "5-1"
            },
            {
                  "left": "ดีใจ|dii jai",
                  "right": "happy",
                  "id": "5-2"
            },
            {
                  "left": "สนุก|sà-nùk",
                  "right": "fun",
                  "id": "5-3"
            },
            {
                  "left": "เบื่อ|bʉ̀a",
                  "right": "bored",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "เหนื่อย|nʉ̀ai",
                  "right": "tired",
                  "id": "6-1"
            },
            {
                  "left": "ง่วง|ngûang",
                  "right": "sleepy",
                  "id": "6-2"
            },
            {
                  "left": "หิว|hǐu",
                  "right": "hungry",
                  "id": "6-3"
            },
            {
                  "left": "อิ่ม|ìm",
                  "right": "full (stomach)",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "กระหาย|grà-hǎai",
                  "right": "thirsty",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 29 Association",
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
        toast.success("Bundle 29 Association inséré avec succès !");
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
            Insérer Bundle 29 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 701-725 (25 mots)
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

export default InsertThaBundle29Association;
