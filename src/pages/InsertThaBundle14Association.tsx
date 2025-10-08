import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle14Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "จุดเริ่มต้น|jùt rə̂əm tôn",
                  "right": "starting point",
                  "id": "1-1"
            },
            {
                  "left": "จุดสิ้นสุด|jùt sîn sùt",
                  "right": "ending point",
                  "id": "1-2"
            },
            {
                  "left": "ระหว่าง|rá-wàang",
                  "right": "between",
                  "id": "1-3"
            },
            {
                  "left": "ภายใน|phaai nai",
                  "right": "inside",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ภายนอก|phaai nɔ̂ɔk",
                  "right": "outside",
                  "id": "2-1"
            },
            {
                  "left": "ภายหน้า|phaai nâa",
                  "right": "in front",
                  "id": "2-2"
            },
            {
                  "left": "ภายหลัง|phaai lǎng",
                  "right": "behind",
                  "id": "2-3"
            },
            {
                  "left": "เบื้องบน|bʉ̂ang bon",
                  "right": "above",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "เบื้องล่าง|bʉ̂ang lâang",
                  "right": "below",
                  "id": "3-1"
            },
            {
                  "left": "ข้างหน้า|khâang nâa",
                  "right": "ahead",
                  "id": "3-2"
            },
            {
                  "left": "ข้างหลัง|khâang lǎng",
                  "right": "rear",
                  "id": "3-3"
            },
            {
                  "left": "ข้างซ้าย|khâang sáai",
                  "right": "left side",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ข้างขวา|khâang khwǎa",
                  "right": "right side",
                  "id": "4-1"
            },
            {
                  "left": "ตรงกลาง|trong glaang",
                  "right": "center",
                  "id": "4-2"
            },
            {
                  "left": "มุม|mum",
                  "right": "corner",
                  "id": "4-3"
            },
            {
                  "left": "ขอบ|khɔ̀ɔp",
                  "right": "edge",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ปลาย|plaai",
                  "right": "end, tip",
                  "id": "5-1"
            },
            {
                  "left": "โคน|khoon",
                  "right": "base",
                  "id": "5-2"
            },
            {
                  "left": "ส่วน|sùan",
                  "right": "part",
                  "id": "5-3"
            },
            {
                  "left": "ชิ้น|chín",
                  "right": "piece",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ก้อน|gɔ̂ɔn",
                  "right": "lump",
                  "id": "6-1"
            },
            {
                  "left": "เม็ด|mét",
                  "right": "grain, pill",
                  "id": "6-2"
            },
            {
                  "left": "หยด|yòt",
                  "right": "drop",
                  "id": "6-3"
            },
            {
                  "left": "เส้น|sên",
                  "right": "line, strand",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "แผ่น|phɛ̀ɛn",
                  "right": "sheet",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 14 Association",
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
        toast.success("Bundle 14 Association inséré avec succès !");
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
            Insérer Bundle 14 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 326-350 (25 mots)
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

export default InsertThaBundle14Association;
