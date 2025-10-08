import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle2Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "แคนาดา|khɛɛ-naa-daa",
                  "right": "Canada",
                  "id": "1-1"
            },
            {
                  "left": "ศาสนา|sàat-sà-nǎa",
                  "right": "religion",
                  "id": "1-2"
            },
            {
                  "left": "พุทธ|phút",
                  "right": "Buddhist",
                  "id": "1-3"
            },
            {
                  "left": "คริสต์|khrít",
                  "right": "Christian",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "อิสลาม|ìt-sà-laam",
                  "right": "Islam",
                  "id": "2-1"
            },
            {
                  "left": "พระ|phrá",
                  "right": "monk",
                  "id": "2-2"
            },
            {
                  "left": "โบสถ์|bòot",
                  "right": "church",
                  "id": "2-3"
            },
            {
                  "left": "มัสยิด|mát-sà-yít",
                  "right": "mosque",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "บุญ|bun",
                  "right": "merit",
                  "id": "3-1"
            },
            {
                  "left": "บาป|bàap",
                  "right": "sin",
                  "id": "3-2"
            },
            {
                  "left": "สวดมนต์|sùat mon",
                  "right": "pray",
                  "id": "3-3"
            },
            {
                  "left": "ไหว้|wâi",
                  "right": "pay respect",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "กราบ|gràap",
                  "right": "prostrate",
                  "id": "4-1"
            },
            {
                  "left": "ศีล|sǐin",
                  "right": "precepts",
                  "id": "4-2"
            },
            {
                  "left": "ทาน|thaan",
                  "right": "donation",
                  "id": "4-3"
            },
            {
                  "left": "กรรม|gam",
                  "right": "karma",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ชาติ|châat",
                  "right": "nation, life",
                  "id": "5-1"
            },
            {
                  "left": "วัฒนธรรม|wát-thá-ná-tham",
                  "right": "culture",
                  "id": "5-2"
            },
            {
                  "left": "ประเพณี|prà-phee-nii",
                  "right": "tradition",
                  "id": "5-3"
            },
            {
                  "left": "เทศกาล|thêet-sà-gaan",
                  "right": "festival",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "สงกรานต์|sǒng-graan",
                  "right": "Songkran",
                  "id": "6-1"
            },
            {
                  "left": "ลอยกระทง|lɔɔi grà-thong",
                  "right": "Loy Krathong",
                  "id": "6-2"
            },
            {
                  "left": "ตรุษจีน|trùt jiin",
                  "right": "Chinese New Year",
                  "id": "6-3"
            },
            {
                  "left": "ปีใหม่|pii mài",
                  "right": "New Year",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "วันเกิด|wan gə̀ət",
                  "right": "birthday",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 2 Association",
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
        toast.success("Bundle 2 Association inséré avec succès !");
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
            Insérer Bundle 2 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 26-50 (25 mots)
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

export default InsertThaBundle2Association;
