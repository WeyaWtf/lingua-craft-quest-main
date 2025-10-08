import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle15Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ผืน|phʉ̌ʉn",
                  "right": "piece (cloth)",
                  "id": "1-1"
            },
            {
                  "left": "ลูก|lûuk",
                  "right": "ball, child",
                  "id": "1-2"
            },
            {
                  "left": "ผล|phǒn",
                  "right": "fruit, result",
                  "id": "1-3"
            },
            {
                  "left": "เปลือก|plʉ̀ak",
                  "right": "peel, shell",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "เมล็ด|má-lét",
                  "right": "seed",
                  "id": "2-1"
            },
            {
                  "left": "ราก|râak",
                  "right": "root",
                  "id": "2-2"
            },
            {
                  "left": "ลำต้น|lam tôn",
                  "right": "trunk",
                  "id": "2-3"
            },
            {
                  "left": "กิ่ง|gìng",
                  "right": "branch",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ดอก|dɔ̀ɔk",
                  "right": "blossom",
                  "id": "3-1"
            },
            {
                  "left": "กลีบ|glìip",
                  "right": "petal",
                  "id": "3-2"
            },
            {
                  "left": "ใบ|bai",
                  "right": "leaf",
                  "id": "3-3"
            },
            {
                  "left": "หนาม|nǎam",
                  "right": "thorn",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ยอด|yɔ̂ɔt",
                  "right": "top, peak",
                  "id": "4-1"
            },
            {
                  "left": "ฐาน|thǎan",
                  "right": "base, foundation",
                  "id": "4-2"
            },
            {
                  "left": "รากฐาน|râak thǎan",
                  "right": "foundation",
                  "id": "4-3"
            },
            {
                  "left": "โครงสร้าง|khroo-ng sâang",
                  "right": "structure",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "โครงร่าง|khroo-ng râang",
                  "right": "framework",
                  "id": "5-1"
            },
            {
                  "left": "รูปร่าง|rûup râang",
                  "right": "shape",
                  "id": "5-2"
            },
            {
                  "left": "รูปทรง|rûup song",
                  "right": "form",
                  "id": "5-3"
            },
            {
                  "left": "รูปแบบ|rûup bɛ̀ɛp",
                  "right": "pattern",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "แบบแผน|bɛ̀ɛp phɛ̌ɛn",
                  "right": "model",
                  "id": "6-1"
            },
            {
                  "left": "ตัวอย่าง|tua yàang",
                  "right": "sample",
                  "id": "6-2"
            },
            {
                  "left": "แบบ|bɛ̀ɛp",
                  "right": "type, form",
                  "id": "6-3"
            },
            {
                  "left": "ชนิด|chá-nít",
                  "right": "kind",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ประเภท|prà-phêet",
                  "right": "category",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 15 Association",
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
        toast.success("Bundle 15 Association inséré avec succès !");
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
            Insérer Bundle 15 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 351-375 (25 mots)
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

export default InsertThaBundle15Association;
