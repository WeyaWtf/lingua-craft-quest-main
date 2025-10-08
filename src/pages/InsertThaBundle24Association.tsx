import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle24Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ถนน|thà-nǒn",
                  "right": "road",
                  "id": "1-1"
            },
            {
                  "left": "ทาง|thaang",
                  "right": "way, path",
                  "id": "1-2"
            },
            {
                  "left": "สะพาน|sà-phaan",
                  "right": "bridge",
                  "id": "1-3"
            },
            {
                  "left": "แม่น้ำ|mɛ̂ɛ náam",
                  "right": "river",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ทะเล|thá-lee",
                  "right": "sea",
                  "id": "2-1"
            },
            {
                  "left": "ภูเขา|phuu khǎa",
                  "right": "mountain",
                  "id": "2-2"
            },
            {
                  "left": "ป่า|pàa",
                  "right": "forest",
                  "id": "2-3"
            },
            {
                  "left": "ต้นไม้|tôn mái",
                  "right": "tree",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ดอกไม้|dɔ̀ɔk mái",
                  "right": "flower",
                  "id": "3-1"
            },
            {
                  "left": "ใบไม้|bai mái",
                  "right": "leaf",
                  "id": "3-2"
            },
            {
                  "left": "หญ้า|yâa",
                  "right": "grass",
                  "id": "3-3"
            },
            {
                  "left": "ดิน|din",
                  "right": "soil",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "หิน|hǐn",
                  "right": "stone",
                  "id": "4-1"
            },
            {
                  "left": "ทราย|saai",
                  "right": "sand",
                  "id": "4-2"
            },
            {
                  "left": "น้ำ|náam",
                  "right": "water",
                  "id": "4-3"
            },
            {
                  "left": "ฝน|fǒn",
                  "right": "rain",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ลม|lom",
                  "right": "wind",
                  "id": "5-1"
            },
            {
                  "left": "เมฆ|mêek",
                  "right": "cloud",
                  "id": "5-2"
            },
            {
                  "left": "ดวงอาทิตย์|duang aa-thít",
                  "right": "sun",
                  "id": "5-3"
            },
            {
                  "left": "ดวงจันทร์|duang jan",
                  "right": "moon",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ดาว|daao",
                  "right": "star",
                  "id": "6-1"
            },
            {
                  "left": "ท้องฟ้า|thɔ́ɔng fáa",
                  "right": "sky",
                  "id": "6-2"
            },
            {
                  "left": "อากาศ|aa-gàat",
                  "right": "air, weather",
                  "id": "6-3"
            },
            {
                  "left": "แสง|sɛ̌ɛng",
                  "right": "light",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "เงา|ngao",
                  "right": "shadow",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 24 Association",
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
        toast.success("Bundle 24 Association inséré avec succès !");
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
            Insérer Bundle 24 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 576-600 (25 mots)
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

export default InsertThaBundle24Association;
