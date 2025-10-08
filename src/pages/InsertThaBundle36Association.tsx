import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle36Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ทั้ง|tháng",
                  "right": "both, all",
                  "id": "1-1"
            },
            {
                  "left": "หรือ|rʉ̌ʉ",
                  "right": "or (question particle)",
                  "id": "1-2"
            },
            {
                  "left": "ไหม|mǎi",
                  "right": "question particle",
                  "id": "1-3"
            },
            {
                  "left": "ไม่|mâi",
                  "right": "not",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ใช่|châi",
                  "right": "yes, correct",
                  "id": "2-1"
            },
            {
                  "left": "ไม่ใช่|mâi châi",
                  "right": "no, not",
                  "id": "2-2"
            },
            {
                  "left": "ค่ะ|khâ",
                  "right": "polite particle (female)",
                  "id": "2-3"
            },
            {
                  "left": "ครับ|khráp",
                  "right": "polite particle (male)",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "นะ|ná",
                  "right": "particle (softener)",
                  "id": "3-1"
            },
            {
                  "left": "สิ|sì",
                  "right": "particle (urging)",
                  "id": "3-2"
            },
            {
                  "left": "ล่ะ|lâ",
                  "right": "particle (and you?)",
                  "id": "3-3"
            },
            {
                  "left": "หรอก|rɔ̀ɔk",
                  "right": "particle (really)",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "เลย|ləəi",
                  "right": "at all, so",
                  "id": "4-1"
            },
            {
                  "left": "จริง|jing",
                  "right": "true, real",
                  "id": "4-2"
            },
            {
                  "left": "จริงๆ|jing jing",
                  "right": "really",
                  "id": "4-3"
            },
            {
                  "left": "แน่นอน|nɛ̂ɛ nɔɔn",
                  "right": "certainly",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "อาจจะ|àat jà",
                  "right": "maybe",
                  "id": "5-1"
            },
            {
                  "left": "คงจะ|khong jà",
                  "right": "probably",
                  "id": "5-2"
            },
            {
                  "left": "น่าจะ|nâa jà",
                  "right": "should be",
                  "id": "5-3"
            },
            {
                  "left": "ต้อง|tɔ̂ng",
                  "right": "must",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ควร|khuan",
                  "right": "should",
                  "id": "6-1"
            },
            {
                  "left": "อยาก|yàak",
                  "right": "want",
                  "id": "6-2"
            },
            {
                  "left": "ชอบ|chɔ̂ɔp",
                  "right": "like",
                  "id": "6-3"
            },
            {
                  "left": "รัก|rák",
                  "right": "love",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "เกลียด|glìat",
                  "right": "hate",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 36 Association",
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
        toast.success("Bundle 36 Association inséré avec succès !");
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
            Insérer Bundle 36 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 876-900 (25 mots)
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

export default InsertThaBundle36Association;
