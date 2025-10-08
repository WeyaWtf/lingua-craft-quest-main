import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle32Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "หมุน|mǔn",
                  "right": "rotate",
                  "id": "1-1"
            },
            {
                  "left": "กลับ|glàp",
                  "right": "return",
                  "id": "1-2"
            },
            {
                  "left": "เลี้ยว|líao",
                  "right": "turn",
                  "id": "1-3"
            },
            {
                  "left": "ตรง|trong",
                  "right": "straight",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ข้าม|khâam",
                  "right": "cross",
                  "id": "2-1"
            },
            {
                  "left": "ผ่าน|phàan",
                  "right": "pass through",
                  "id": "2-2"
            },
            {
                  "left": "ทะลุ|thá-lú",
                  "right": "penetrate",
                  "id": "2-3"
            },
            {
                  "left": "รอบ|rɔ̂ɔp",
                  "right": "around",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ถึง|thʉ̌ng",
                  "right": "arrive",
                  "id": "3-1"
            },
            {
                  "left": "ส่ง|sòng",
                  "right": "send",
                  "id": "3-2"
            },
            {
                  "left": "รับ|ráp",
                  "right": "receive",
                  "id": "3-3"
            },
            {
                  "left": "แบ่ง|bɛ̀ng",
                  "right": "divide, share",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "รวม|ruam",
                  "right": "combine",
                  "id": "4-1"
            },
            {
                  "left": "แยก|yɛ̂ɛk",
                  "right": "separate",
                  "id": "4-2"
            },
            {
                  "left": "ผสม|phà-sǒm",
                  "right": "mix",
                  "id": "4-3"
            },
            {
                  "left": "เพิ่ม|phə̂əm",
                  "right": "increase",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ลด|lót",
                  "right": "decrease",
                  "id": "5-1"
            },
            {
                  "left": "ขาด|khàat",
                  "right": "lack",
                  "id": "5-2"
            },
            {
                  "left": "เกิน|gəən",
                  "right": "exceed",
                  "id": "5-3"
            },
            {
                  "left": "พอดี|phɔɔ dii",
                  "right": "just right",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "เท่า|thâo",
                  "right": "equal",
                  "id": "6-1"
            },
            {
                  "left": "เหมือน|mʉ̌an",
                  "right": "same, like",
                  "id": "6-2"
            },
            {
                  "left": "ต่าง|tàang",
                  "right": "different",
                  "id": "6-3"
            },
            {
                  "left": "คล้าย|khláai",
                  "right": "similar",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "กว่า|gwàa",
                  "right": "more than",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 32 Association",
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
        toast.success("Bundle 32 Association inséré avec succès !");
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
            Insérer Bundle 32 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 776-800 (25 mots)
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

export default InsertThaBundle32Association;
