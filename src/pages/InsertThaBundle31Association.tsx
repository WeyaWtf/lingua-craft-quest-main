import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle31Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "เจอ|jəə",
                  "right": "meet, find",
                  "id": "1-1"
            },
            {
                  "left": "หา|hǎa",
                  "right": "look for",
                  "id": "1-2"
            },
            {
                  "left": "เจอ|jəə",
                  "right": "find",
                  "id": "1-3"
            },
            {
                  "left": "หาย|hǎai",
                  "right": "lost, disappear",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "พบ|phóp",
                  "right": "found",
                  "id": "2-1"
            },
            {
                  "left": "แสดง|sà-dɛɛng",
                  "right": "show",
                  "id": "2-2"
            },
            {
                  "left": "ซ่อน|sɔ̂ɔn",
                  "right": "hide",
                  "id": "2-3"
            },
            {
                  "left": "เปิด|pə̀ət",
                  "right": "open",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ปิด|pìt",
                  "right": "close",
                  "id": "3-1"
            },
            {
                  "left": "เข้า|khâo",
                  "right": "enter",
                  "id": "3-2"
            },
            {
                  "left": "ออก|ɔ̀ɔk",
                  "right": "exit",
                  "id": "3-3"
            },
            {
                  "left": "ขึ้น|khʉ̂n",
                  "right": "go up",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ลง|long",
                  "right": "go down",
                  "id": "4-1"
            },
            {
                  "left": "เอา|ao",
                  "right": "take",
                  "id": "4-2"
            },
            {
                  "left": "วาง|waang",
                  "right": "put, place",
                  "id": "4-3"
            },
            {
                  "left": "ยก|yók",
                  "right": "lift",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ดัน|dan",
                  "right": "push",
                  "id": "5-1"
            },
            {
                  "left": "ดึง|dʉng",
                  "right": "pull",
                  "id": "5-2"
            },
            {
                  "left": "โยน|yoon",
                  "right": "throw",
                  "id": "5-3"
            },
            {
                  "left": "จับ|jàp",
                  "right": "catch, hold",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "แตะ|tɛ̀",
                  "right": "touch",
                  "id": "6-1"
            },
            {
                  "left": "ผลัก|phlàk",
                  "right": "push",
                  "id": "6-2"
            },
            {
                  "left": "กด|gòt",
                  "right": "press",
                  "id": "6-3"
            },
            {
                  "left": "บีบ|bìip",
                  "right": "squeeze",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "บิด|bìt",
                  "right": "twist",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 31 Association",
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
        toast.success("Bundle 31 Association inséré avec succès !");
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
            Insérer Bundle 31 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 751-775 (25 mots)
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

export default InsertThaBundle31Association;
