import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle13Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "โอกาส|oo-gàat",
                  "right": "opportunity",
                  "id": "1-1"
            },
            {
                  "left": "โชค|chôok",
                  "right": "luck",
                  "id": "1-2"
            },
            {
                  "left": "โชคชะตา|chôok chá-taa",
                  "right": "fate",
                  "id": "1-3"
            },
            {
                  "left": "ชะตากรรม|chá-taa gam",
                  "right": "destiny",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "อนาคต|à-naa-khót",
                  "right": "future",
                  "id": "2-1"
            },
            {
                  "left": "ความหวัง|khwaam wǎng",
                  "right": "hope",
                  "id": "2-2"
            },
            {
                  "left": "ความฝัน|khwaam fǎn",
                  "right": "dream",
                  "id": "2-3"
            },
            {
                  "left": "เป้าหมาย|pâo mǎai",
                  "right": "target",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "จุดหมาย|jùt mǎai",
                  "right": "destination",
                  "id": "3-1"
            },
            {
                  "left": "ผลลัพธ์|phǒn-lá-pháp",
                  "right": "result",
                  "id": "3-2"
            },
            {
                  "left": "ผลที่ตามมา|phǒn thîi taam maa",
                  "right": "consequence",
                  "id": "3-3"
            },
            {
                  "left": "อิทธิพล|ìt-thí-phon",
                  "right": "influence",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ผลกระทบ|phǒn grà-thóp",
                  "right": "impact",
                  "id": "4-1"
            },
            {
                  "left": "สาเหตุ|sǎa-hèet",
                  "right": "cause",
                  "id": "4-2"
            },
            {
                  "left": "เหตุผล|hèet phǒn",
                  "right": "reason",
                  "id": "4-3"
            },
            {
                  "left": "ข้อแก้ตัว|khɔ̂ɔ gɛ̂ɛ tua",
                  "right": "excuse",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "การอธิบาย|gaan à-thí-baai",
                  "right": "explanation",
                  "id": "5-1"
            },
            {
                  "left": "ตัวอย่าง|tua yàang",
                  "right": "example",
                  "id": "5-2"
            },
            {
                  "left": "กรณี|gà-rá-nii",
                  "right": "case",
                  "id": "5-3"
            },
            {
                  "left": "สถานการณ์|sà-thǎa-ná-gaan",
                  "right": "situation",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "เหตุการณ์|hèet-gaan",
                  "right": "event",
                  "id": "6-1"
            },
            {
                  "left": "เรื่องราว|rʉ̂ang raao",
                  "right": "narrative",
                  "id": "6-2"
            },
            {
                  "left": "ประวัติ|prà-wàt",
                  "right": "history",
                  "id": "6-3"
            },
            {
                  "left": "ที่มา|thîi maa",
                  "right": "origin",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "แหล่งกำเนิด|lɛ̀ng gam-nə̀ət",
                  "right": "source",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 13 Association",
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
        toast.success("Bundle 13 Association inséré avec succès !");
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
            Insérer Bundle 13 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 301-325 (25 mots)
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

export default InsertThaBundle13Association;
