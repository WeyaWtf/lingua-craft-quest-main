import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle23Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "หมอ|mɔ̌ɔ",
                  "right": "doctor",
                  "id": "1-1"
            },
            {
                  "left": "ตำรวจ|tam-rùat",
                  "right": "police",
                  "id": "1-2"
            },
            {
                  "left": "ทหาร|thá-hǎan",
                  "right": "soldier",
                  "id": "1-3"
            },
            {
                  "left": "พนักงาน|phá-nák-ngaan",
                  "right": "employee",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "เจ้านาย|jâo naai",
                  "right": "boss",
                  "id": "2-1"
            },
            {
                  "left": "บ้าน|bâan",
                  "right": "house, home",
                  "id": "2-2"
            },
            {
                  "left": "ห้อง|hɔ̂ng",
                  "right": "room",
                  "id": "2-3"
            },
            {
                  "left": "ประตู|pra-tuu",
                  "right": "door",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "หน้าต่าง|nâa tàang",
                  "right": "window",
                  "id": "3-1"
            },
            {
                  "left": "โต๊ะ|tó",
                  "right": "table",
                  "id": "3-2"
            },
            {
                  "left": "เก้าอี้|gâo-îi",
                  "right": "chair",
                  "id": "3-3"
            },
            {
                  "left": "เตียง|tiiang",
                  "right": "bed",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ตู้|tûu",
                  "right": "cabinet",
                  "id": "4-1"
            },
            {
                  "left": "ห้องนอน|hɔ̂ng nɔɔn",
                  "right": "bedroom",
                  "id": "4-2"
            },
            {
                  "left": "ห้องน้ำ|hɔ̂ng náam",
                  "right": "bathroom",
                  "id": "4-3"
            },
            {
                  "left": "ครัว|khrua",
                  "right": "kitchen",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "สวน|sǔan",
                  "right": "garden",
                  "id": "5-1"
            },
            {
                  "left": "รถ|rót",
                  "right": "car, vehicle",
                  "id": "5-2"
            },
            {
                  "left": "รถยนต์|rót yon",
                  "right": "car",
                  "id": "5-3"
            },
            {
                  "left": "รถจักรยาน|rót jàk-grà-yaan",
                  "right": "bicycle",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "รถมอเตอร์ไซค์|rót mɔɔ-təə-sai",
                  "right": "motorcycle",
                  "id": "6-1"
            },
            {
                  "left": "รถบัส|rót bát",
                  "right": "bus",
                  "id": "6-2"
            },
            {
                  "left": "รถไฟ|rót fai",
                  "right": "train",
                  "id": "6-3"
            },
            {
                  "left": "เครื่องบิน|khrʉ̂ang bin",
                  "right": "airplane",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "เรือ|rʉa",
                  "right": "boat",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 23 Association",
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
        toast.success("Bundle 23 Association inséré avec succès !");
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
            Insérer Bundle 23 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 551-575 (25 mots)
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

export default InsertThaBundle23Association;
