import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle6Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ปฏิบัติ|pà-tì-bàt",
                  "right": "practice, follow",
                  "id": "1-1"
            },
            {
                  "left": "ฝ่าฝืน|fàa fʉ̌ʉn",
                  "right": "violate",
                  "id": "1-2"
            },
            {
                  "left": "เคารพ|khao-róp",
                  "right": "respect",
                  "id": "1-3"
            },
            {
                  "left": "ละเมิด|lá-mə̂ət",
                  "right": "violate",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ประกาศ|prà-gàat",
                  "right": "announce",
                  "id": "2-1"
            },
            {
                  "left": "แจ้ง|jɛ̂ɛng",
                  "right": "inform",
                  "id": "2-2"
            },
            {
                  "left": "รายงาน|raai-ngaan",
                  "right": "report",
                  "id": "2-3"
            },
            {
                  "left": "ข่าว|khàao",
                  "right": "news",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ข้อมูล|khɔ̂ɔ muun",
                  "right": "information",
                  "id": "3-1"
            },
            {
                  "left": "สถิติ|sà-thì-tì",
                  "right": "statistics",
                  "id": "3-2"
            },
            {
                  "left": "ตัวเลข|tua lêek",
                  "right": "numbers",
                  "id": "3-3"
            },
            {
                  "left": "จำนวน|jam-nuan",
                  "right": "amount",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ร้อยละ|rɔ́ɔi lá",
                  "right": "percent",
                  "id": "4-1"
            },
            {
                  "left": "เพิ่มขึ้น|phə̂əm khʉ̂n",
                  "right": "increase",
                  "id": "4-2"
            },
            {
                  "left": "ลดลง|lót long",
                  "right": "decrease",
                  "id": "4-3"
            },
            {
                  "left": "คงที่|khong thîi",
                  "right": "constant",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "เปลี่ยนแปลง|plìan plɛɛng",
                  "right": "change",
                  "id": "5-1"
            },
            {
                  "left": "พัฒนา|phát-thá-naa",
                  "right": "develop",
                  "id": "5-2"
            },
            {
                  "left": "เจริญ|jà-rəən",
                  "right": "progress",
                  "id": "5-3"
            },
            {
                  "left": "ก้าวหน้า|gâao nâa",
                  "right": "advance",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ล้าหลัง|láa lǎng",
                  "right": "backward",
                  "id": "6-1"
            },
            {
                  "left": "ทันสมัย|than sà-mǎi",
                  "right": "modern",
                  "id": "6-2"
            },
            {
                  "left": "โบราณ|boo-raan",
                  "right": "ancient",
                  "id": "6-3"
            },
            {
                  "left": "ร่วมสมัย|rûam sà-mǎi",
                  "right": "contemporary",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "อนาคต|à-naa-khót",
                  "right": "future",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 6 Association",
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
        toast.success("Bundle 6 Association inséré avec succès !");
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
            Insérer Bundle 6 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 126-150 (25 mots)
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

export default InsertThaBundle6Association;
