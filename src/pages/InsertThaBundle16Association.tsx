import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle16Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "หมวดหมู่|mùat mùu",
                  "right": "classification",
                  "id": "1-1"
            },
            {
                  "left": "กลุ่ม|glùm",
                  "right": "group",
                  "id": "1-2"
            },
            {
                  "left": "พวก|phûak",
                  "right": "group (of people)",
                  "id": "1-3"
            },
            {
                  "left": "ฝูง|fǔung",
                  "right": "herd, flock",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ทีม|thiim",
                  "right": "team",
                  "id": "2-1"
            },
            {
                  "left": "คณะ|khá-ná",
                  "right": "committee",
                  "id": "2-2"
            },
            {
                  "left": "องค์กร|ong-gɔɔn",
                  "right": "organization",
                  "id": "2-3"
            },
            {
                  "left": "สมาคม|sà-maa-khom",
                  "right": "association",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "สถาบัน|sà-thǎa-ban",
                  "right": "institution",
                  "id": "3-1"
            },
            {
                  "left": "มูลนิธิ|muun-ní-thí",
                  "right": "foundation",
                  "id": "3-2"
            },
            {
                  "left": "ชุมชน|chum-chon",
                  "right": "community",
                  "id": "3-3"
            },
            {
                  "left": "สังคม|sǎng-khom",
                  "right": "society",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "โลก|lôok",
                  "right": "world",
                  "id": "4-1"
            },
            {
                  "left": "จักรวาล|jàk-grà-waan",
                  "right": "universe",
                  "id": "4-2"
            },
            {
                  "left": "ธรรมชาติ|tham-má-châat",
                  "right": "nature",
                  "id": "4-3"
            },
            {
                  "left": "สิ่งแวดล้อม|sìng wɛ̂ɛt lɔ́ɔm",
                  "right": "environment",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "มลพิษ|mon-lá-phít",
                  "right": "pollution",
                  "id": "5-1"
            },
            {
                  "left": "ขยะ|khà-yà",
                  "right": "garbage",
                  "id": "5-2"
            },
            {
                  "left": "พลังงาน|phá-lang ngaan",
                  "right": "energy",
                  "id": "5-3"
            },
            {
                  "left": "ไฟฟ้า|fai fáa",
                  "right": "electricity",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "น้ำมัน|náam man",
                  "right": "oil",
                  "id": "6-1"
            },
            {
                  "left": "ก๊าซ|gáat",
                  "right": "gas",
                  "id": "6-2"
            },
            {
                  "left": "ถ่านหิน|thàan hǐn",
                  "right": "coal",
                  "id": "6-3"
            },
            {
                  "left": "แสงอาทิตย์|sɛ̌ɛng aa-thít",
                  "right": "sunlight",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ลม|lom",
                  "right": "wind",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 16 Association",
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
        toast.success("Bundle 16 Association inséré avec succès !");
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
            Insérer Bundle 16 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 376-400 (25 mots)
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

export default InsertThaBundle16Association;
