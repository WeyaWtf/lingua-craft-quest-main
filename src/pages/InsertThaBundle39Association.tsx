import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle39Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "จืด|jʉ̀ʉt",
                  "right": "bland",
                  "id": "1-1"
            },
            {
                  "left": "อร่อย|à-rɔ̀i",
                  "right": "delicious",
                  "id": "1-2"
            },
            {
                  "left": "ไม่อร่อย|mâi à-rɔ̀i",
                  "right": "not tasty",
                  "id": "1-3"
            },
            {
                  "left": "แน่น|nɛ̂ɛn",
                  "right": "tight, firm",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "หลวม|lǔam",
                  "right": "loose",
                  "id": "2-1"
            },
            {
                  "left": "แข็ง|khɛ̌ng",
                  "right": "hard",
                  "id": "2-2"
            },
            {
                  "left": "อ่อน|ɔ̀ɔn",
                  "right": "soft",
                  "id": "2-3"
            },
            {
                  "left": "นิ่ม|nîm",
                  "right": "soft (texture)",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "กรอบ|grɔ̀ɔp",
                  "right": "crispy",
                  "id": "3-1"
            },
            {
                  "left": "เหนียว|nǐao",
                  "right": "sticky",
                  "id": "3-2"
            },
            {
                  "left": "ละเอียด|lá-ìat",
                  "right": "detailed",
                  "id": "3-3"
            },
            {
                  "left": "หยาบ|yàap",
                  "right": "rough",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ขรุขระ|khrù-khrà",
                  "right": "uneven",
                  "id": "4-1"
            },
            {
                  "left": "เรียบ|rîap",
                  "right": "smooth",
                  "id": "4-2"
            },
            {
                  "left": "มัน|man",
                  "right": "shiny",
                  "id": "4-3"
            },
            {
                  "left": "ด้าน|dâan",
                  "right": "dull",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ทึบ|thʉ́p",
                  "right": "opaque",
                  "id": "5-1"
            },
            {
                  "left": "ใส|sǎi",
                  "right": "clear",
                  "id": "5-2"
            },
            {
                  "left": "ขุ่น|khùn",
                  "right": "turbid",
                  "id": "5-3"
            },
            {
                  "left": "หนัก|nàk",
                  "right": "heavy",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "เบา|bao",
                  "right": "light (weight)",
                  "id": "6-1"
            },
            {
                  "left": "ลึก|lʉ́k",
                  "right": "deep",
                  "id": "6-2"
            },
            {
                  "left": "ตื้น|tʉ̂ʉn",
                  "right": "shallow",
                  "id": "6-3"
            },
            {
                  "left": "กว้าง|gwâang",
                  "right": "wide",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "แคบ|khɛ̂ɛp",
                  "right": "narrow",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 39 Association",
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
        toast.success("Bundle 39 Association inséré avec succès !");
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
            Insérer Bundle 39 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 951-975 (25 mots)
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

export default InsertThaBundle39Association;
