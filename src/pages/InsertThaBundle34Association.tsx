import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle34Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ทั้งหมด|tháng mòt",
                  "right": "all, total",
                  "id": "1-1"
            },
            {
                  "left": "ว่าง|wâang",
                  "right": "empty, free",
                  "id": "1-2"
            },
            {
                  "left": "เต็ม|tem",
                  "right": "full",
                  "id": "1-3"
            },
            {
                  "left": "หมด|mòt",
                  "right": "all gone",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "เหลือ|lʉ̌a",
                  "right": "remain",
                  "id": "2-1"
            },
            {
                  "left": "ขาย|khǎai",
                  "right": "sell",
                  "id": "2-2"
            },
            {
                  "left": "ซื้อ|sʉ́ʉ",
                  "right": "buy",
                  "id": "2-3"
            },
            {
                  "left": "แลก|lɛ̂ɛk",
                  "right": "exchange",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ยืม|yʉʉm",
                  "right": "borrow",
                  "id": "3-1"
            },
            {
                  "left": "คืน|khʉʉn",
                  "right": "return",
                  "id": "3-2"
            },
            {
                  "left": "เช่า|châo",
                  "right": "rent",
                  "id": "3-3"
            },
            {
                  "left": "จอง|jɔɔng",
                  "right": "reserve",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "จ้าง|jâang",
                  "right": "hire",
                  "id": "4-1"
            },
            {
                  "left": "ทำงาน|tham ngaan",
                  "right": "work",
                  "id": "4-2"
            },
            {
                  "left": "พัก|phák",
                  "right": "rest",
                  "id": "4-3"
            },
            {
                  "left": "ลา|laa",
                  "right": "take leave",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ออฟฟิศ|ɔ́ɔf-fít",
                  "right": "office",
                  "id": "5-1"
            },
            {
                  "left": "บริษัท|bɔɔ-rí-sàt",
                  "right": "company",
                  "id": "5-2"
            },
            {
                  "left": "โรงงาน|roong ngaan",
                  "right": "factory",
                  "id": "5-3"
            },
            {
                  "left": "ร้าน|ráan",
                  "right": "shop",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ตลาด|tà-làat",
                  "right": "market",
                  "id": "6-1"
            },
            {
                  "left": "ห้าง|hâang",
                  "right": "mall",
                  "id": "6-2"
            },
            {
                  "left": "ธนาคาร|thá-naa-khaan",
                  "right": "bank",
                  "id": "6-3"
            },
            {
                  "left": "โรงพยาบาล|roong phá-yaa-baan",
                  "right": "hospital",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "โรงเรียน|roong rian",
                  "right": "school",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 34 Association",
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
        toast.success("Bundle 34 Association inséré avec succès !");
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
            Insérer Bundle 34 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 826-850 (25 mots)
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

export default InsertThaBundle34Association;
