import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle26Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ชา|chaa",
                  "right": "tea",
                  "id": "1-1"
            },
            {
                  "left": "กาแฟ|gaa-fɛɛ",
                  "right": "coffee",
                  "id": "1-2"
            },
            {
                  "left": "เบียร์|biia",
                  "right": "beer",
                  "id": "1-3"
            },
            {
                  "left": "เหล้า|lâo",
                  "right": "liquor",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "น้ำผลไม้|náam phǒn-lá-mái",
                  "right": "fruit juice",
                  "id": "2-1"
            },
            {
                  "left": "น้ำอัดลม|náam àt lom",
                  "right": "soft drink",
                  "id": "2-2"
            },
            {
                  "left": "เสื้อ|sʉ̂a",
                  "right": "shirt",
                  "id": "2-3"
            },
            {
                  "left": "กางเกง|gaang-geeng",
                  "right": "pants",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "กระโปรง|grà-proong",
                  "right": "skirt",
                  "id": "3-1"
            },
            {
                  "left": "ชุด|chút",
                  "right": "outfit, dress",
                  "id": "3-2"
            },
            {
                  "left": "รองเท้า|rɔɔng tháo",
                  "right": "shoes",
                  "id": "3-3"
            },
            {
                  "left": "ถุงเท้า|thǔng tháo",
                  "right": "socks",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "หมวก|mùak",
                  "right": "hat",
                  "id": "4-1"
            },
            {
                  "left": "แว่นตา|wɛ̂n taa",
                  "right": "glasses",
                  "id": "4-2"
            },
            {
                  "left": "นาฬิกา|naa-lí-gaa",
                  "right": "watch, clock",
                  "id": "4-3"
            },
            {
                  "left": "กระเป๋า|grà-pǎo",
                  "right": "bag",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ร่ม|rôm",
                  "right": "umbrella",
                  "id": "5-1"
            },
            {
                  "left": "กุญแจ|gun-jɛɛ",
                  "right": "key",
                  "id": "5-2"
            },
            {
                  "left": "โทรศัพท์|thoo-rá-sàp",
                  "right": "telephone",
                  "id": "5-3"
            },
            {
                  "left": "มือถือ|mʉʉ thʉ̌ʉ",
                  "right": "mobile phone",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "คอมพิวเตอร์|khɔm-phiu-təə",
                  "right": "computer",
                  "id": "6-1"
            },
            {
                  "left": "ทีวี|thii-wii",
                  "right": "TV",
                  "id": "6-2"
            },
            {
                  "left": "วิทยุ|wít-thá-yú",
                  "right": "radio",
                  "id": "6-3"
            },
            {
                  "left": "หนังสือ|nǎng-sʉ̌ʉ",
                  "right": "book",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "หนังสือพิมพ์|nǎng-sʉ̌ʉ phim",
                  "right": "newspaper",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 26 Association",
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
        toast.success("Bundle 26 Association inséré avec succès !");
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
            Insérer Bundle 26 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 626-650 (25 mots)
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

export default InsertThaBundle26Association;
