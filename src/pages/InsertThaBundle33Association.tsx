import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle33Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ที่สุด|thîi sùt",
                  "right": "most",
                  "id": "1-1"
            },
            {
                  "left": "หนึ่ง|nʉ̀ng",
                  "right": "one",
                  "id": "1-2"
            },
            {
                  "left": "สอง|sɔ̌ɔng",
                  "right": "two",
                  "id": "1-3"
            },
            {
                  "left": "สาม|sǎam",
                  "right": "three",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "สี่|sìi",
                  "right": "four",
                  "id": "2-1"
            },
            {
                  "left": "ห้า|hâa",
                  "right": "five",
                  "id": "2-2"
            },
            {
                  "left": "หก|hòk",
                  "right": "six",
                  "id": "2-3"
            },
            {
                  "left": "เจ็ด|jèt",
                  "right": "seven",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "แปด|pɛ̀ɛt",
                  "right": "eight",
                  "id": "3-1"
            },
            {
                  "left": "เก้า|gâo",
                  "right": "nine",
                  "id": "3-2"
            },
            {
                  "left": "สิบ|sìp",
                  "right": "ten",
                  "id": "3-3"
            },
            {
                  "left": "ยี่สิบ|yîi sìp",
                  "right": "twenty",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "สามสิบ|sǎam sìp",
                  "right": "thirty",
                  "id": "4-1"
            },
            {
                  "left": "สี่สิบ|sìi sìp",
                  "right": "forty",
                  "id": "4-2"
            },
            {
                  "left": "ห้าสิบ|hâa sìp",
                  "right": "fifty",
                  "id": "4-3"
            },
            {
                  "left": "หกสิบ|hòk sìp",
                  "right": "sixty",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "เจ็ดสิบ|jèt sìp",
                  "right": "seventy",
                  "id": "5-1"
            },
            {
                  "left": "แปดสิบ|pɛ̀ɛt sìp",
                  "right": "eighty",
                  "id": "5-2"
            },
            {
                  "left": "เก้าสิบ|gâo sìp",
                  "right": "ninety",
                  "id": "5-3"
            },
            {
                  "left": "ร้อย|rɔ́ɔi",
                  "right": "hundred",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "พัน|phan",
                  "right": "thousand",
                  "id": "6-1"
            },
            {
                  "left": "หมื่น|mʉ̀ʉn",
                  "right": "ten thousand",
                  "id": "6-2"
            },
            {
                  "left": "แสน|sɛ̌ɛn",
                  "right": "hundred thousand",
                  "id": "6-3"
            },
            {
                  "left": "ล้าน|láan",
                  "right": "million",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ครึ่ง|khrʉ̂ng",
                  "right": "half",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 33 Association",
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
        toast.success("Bundle 33 Association inséré avec succès !");
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
            Insérer Bundle 33 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 801-825 (25 mots)
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

export default InsertThaBundle33Association;
