import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle21Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "เมื่อวาน|mʉ̂a waan",
                  "right": "yesterday",
                  "id": "1-1"
            },
            {
                  "left": "ปี|pii",
                  "right": "year",
                  "id": "1-2"
            },
            {
                  "left": "เดือน|dʉan",
                  "right": "month",
                  "id": "1-3"
            },
            {
                  "left": "อาทิตย์|aa-thít",
                  "right": "week",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ชั่วโมง|chûa moong",
                  "right": "hour",
                  "id": "2-1"
            },
            {
                  "left": "นาที|naa-thii",
                  "right": "minute",
                  "id": "2-2"
            },
            {
                  "left": "วินาที|wí-naa-thii",
                  "right": "second",
                  "id": "2-3"
            },
            {
                  "left": "เวลา|wee-laa",
                  "right": "time",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ตอน|tɔɔn",
                  "right": "period, when",
                  "id": "3-1"
            },
            {
                  "left": "ก่อน|gɔ̀ɔn",
                  "right": "before",
                  "id": "3-2"
            },
            {
                  "left": "หลัง|lǎng",
                  "right": "after",
                  "id": "3-3"
            },
            {
                  "left": "ตอนนี้|tɔɔn níi",
                  "right": "now",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "เดี๋ยว|dǐao",
                  "right": "in a moment",
                  "id": "4-1"
            },
            {
                  "left": "แล้ว|lɛ́ɛo",
                  "right": "already",
                  "id": "4-2"
            },
            {
                  "left": "ยัง|yang",
                  "right": "still, yet",
                  "id": "4-3"
            },
            {
                  "left": "เสมอ|sa-mə̌ə",
                  "right": "always",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "บ่อย|bɔ̀i",
                  "right": "often",
                  "id": "5-1"
            },
            {
                  "left": "บางครั้ง|baang khráng",
                  "right": "sometimes",
                  "id": "5-2"
            },
            {
                  "left": "ไม่เคย|mâi khəəi",
                  "right": "never",
                  "id": "5-3"
            },
            {
                  "left": "ทุก|thúk",
                  "right": "every",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "บาง|baang",
                  "right": "some",
                  "id": "6-1"
            },
            {
                  "left": "หลาย|lǎai",
                  "right": "many",
                  "id": "6-2"
            },
            {
                  "left": "น้อย|nɔ́i",
                  "right": "few, little",
                  "id": "6-3"
            },
            {
                  "left": "มาก|mâak",
                  "right": "much, very",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "พอ|phɔɔ",
                  "right": "enough",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 21 Association",
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
        toast.success("Bundle 21 Association inséré avec succès !");
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
            Insérer Bundle 21 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 501-525 (25 mots)
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

export default InsertThaBundle21Association;
