import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle30Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ป่วย|pùai",
                  "right": "sick",
                  "id": "1-1"
            },
            {
                  "left": "สบาย|sà-baai",
                  "right": "comfortable, well",
                  "id": "1-2"
            },
            {
                  "left": "แข็งแรง|khɛ̌ng rɛɛng",
                  "right": "strong, healthy",
                  "id": "1-3"
            },
            {
                  "left": "อ่อนแอ|ɔ̀ɔn ɛɛ",
                  "right": "weak",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "หาย|hǎai",
                  "right": "recover",
                  "id": "2-1"
            },
            {
                  "left": "ตาย|taai",
                  "right": "die",
                  "id": "2-2"
            },
            {
                  "left": "เกิด|gə̀ət",
                  "right": "born",
                  "id": "2-3"
            },
            {
                  "left": "อายุ|aa-yú",
                  "right": "age",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "หนุ่ม|nùm",
                  "right": "young man",
                  "id": "3-1"
            },
            {
                  "left": "สาว|sǎao",
                  "right": "young woman",
                  "id": "3-2"
            },
            {
                  "left": "แก่|gɛ̀ɛ",
                  "right": "old (age)",
                  "id": "3-3"
            },
            {
                  "left": "แต่งงาน|tɛ̀ng ngaan",
                  "right": "marry",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "หย่า|yàa",
                  "right": "divorce",
                  "id": "4-1"
            },
            {
                  "left": "ท้อง|thɔ́ɔng",
                  "right": "pregnant",
                  "id": "4-2"
            },
            {
                  "left": "คลอด|khlɔ̂ɔt",
                  "right": "give birth",
                  "id": "4-3"
            },
            {
                  "left": "เลี้ยง|líang",
                  "right": "raise, feed",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ดูแล|duu lɛɛ",
                  "right": "take care of",
                  "id": "5-1"
            },
            {
                  "left": "ช่วย|chûai",
                  "right": "help",
                  "id": "5-2"
            },
            {
                  "left": "ขอ|khɔ̌ɔ",
                  "right": "request",
                  "id": "5-3"
            },
            {
                  "left": "ขอบคุณ|khɔ̀ɔp khun",
                  "right": "thank you",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ขอโทษ|khɔ̌ɔ thôot",
                  "right": "sorry",
                  "id": "6-1"
            },
            {
                  "left": "ยินดี|yin dii",
                  "right": "pleased",
                  "id": "6-2"
            },
            {
                  "left": "ต้อนรับ|tɔ̂ɔn ráp",
                  "right": "welcome",
                  "id": "6-3"
            },
            {
                  "left": "ลา|laa",
                  "right": "goodbye",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "พบ|phóp",
                  "right": "meet",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 30 Association",
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
        toast.success("Bundle 30 Association inséré avec succès !");
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
            Insérer Bundle 30 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 726-750 (25 mots)
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

export default InsertThaBundle30Association;
