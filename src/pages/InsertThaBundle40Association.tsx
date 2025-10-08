import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle40Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "สว่าง|sàwàang",
                  "right": "bright",
                  "id": "1-1"
            },
            {
                  "left": "มืด|mʉ̂ʉt",
                  "right": "dark",
                  "id": "1-2"
            },
            {
                  "left": "วันจันทร์|wan jan",
                  "right": "Monday",
                  "id": "1-3"
            },
            {
                  "left": "วันอังคาร|wan ang-khaan",
                  "right": "Tuesday",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "วันพุธ|wan phút",
                  "right": "Wednesday",
                  "id": "2-1"
            },
            {
                  "left": "วันพฤหัสบดี|wan phá-rʉ́-hàt-sà-bɔɔ-dii",
                  "right": "Thursday",
                  "id": "2-2"
            },
            {
                  "left": "วันศุกร์|wan sùk",
                  "right": "Friday",
                  "id": "2-3"
            },
            {
                  "left": "วันเสาร์|wan sǎo",
                  "right": "Saturday",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "วันอาทิตย์|wan aa-thít",
                  "right": "Sunday",
                  "id": "3-1"
            },
            {
                  "left": "มกราคม|mók-gà-raa-khom",
                  "right": "January",
                  "id": "3-2"
            },
            {
                  "left": "กุมภาพันธ์|gum-phaa-phan",
                  "right": "February",
                  "id": "3-3"
            },
            {
                  "left": "มีนาคม|mii-naa-khom",
                  "right": "March",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "เมษายน|mee-sǎa-yon",
                  "right": "April",
                  "id": "4-1"
            },
            {
                  "left": "พฤษภาคม|phrʉ́t-sà-phaa-khom",
                  "right": "May",
                  "id": "4-2"
            },
            {
                  "left": "มิถุนายน|mí-thù-naa-yon",
                  "right": "June",
                  "id": "4-3"
            },
            {
                  "left": "กรกฎาคม|gà-rá-gà-daa-khom",
                  "right": "July",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "สิงหาคม|sǐng-hǎa-khom",
                  "right": "August",
                  "id": "5-1"
            },
            {
                  "left": "กันยายน|gan-yaa-yon",
                  "right": "September",
                  "id": "5-2"
            },
            {
                  "left": "ตุลาคม|tù-laa-khom",
                  "right": "October",
                  "id": "5-3"
            },
            {
                  "left": "พฤศจิกายน|phrʉ́t-sà-jì-gaa-yon",
                  "right": "November",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ธันวาคม|than-waa-khom",
                  "right": "December",
                  "id": "6-1"
            },
            {
                  "left": "ฤดูร้อน|rʉ́-duu rɔ́ɔn",
                  "right": "summer",
                  "id": "6-2"
            },
            {
                  "left": "ฤดูฝน|rʉ́-duu fǒn",
                  "right": "rainy season",
                  "id": "6-3"
            },
            {
                  "left": "ฤดูหนาว|rʉ́-duu nǎao",
                  "right": "winter",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ประเทศ|prà-thêet",
                  "right": "country",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 40 Association",
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
        toast.success("Bundle 40 Association inséré avec succès !");
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
            Insérer Bundle 40 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 976-1000 (25 mots)
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

export default InsertThaBundle40Association;
