import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle35Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "มหาวิทยาลัย|má-hǎa wít-thá-yaa-lai",
                  "right": "university",
                  "id": "1-1"
            },
            {
                  "left": "วัด|wát",
                  "right": "temple",
                  "id": "1-2"
            },
            {
                  "left": "โบสถ์|bòot",
                  "right": "church",
                  "id": "1-3"
            },
            {
                  "left": "มัสยิด|mát-sà-yít",
                  "right": "mosque",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "สนามบิน|sà-nǎam bin",
                  "right": "airport",
                  "id": "2-1"
            },
            {
                  "left": "สถานีรถไฟ|sà-thǎa-nii rót fai",
                  "right": "train station",
                  "id": "2-2"
            },
            {
                  "left": "สถานีรถบัส|sà-thǎa-nii rót bát",
                  "right": "bus station",
                  "id": "2-3"
            },
            {
                  "left": "ท่าเรือ|thâa rʉa",
                  "right": "pier",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "สถานที่|sà-thǎan thîi",
                  "right": "place",
                  "id": "3-1"
            },
            {
                  "left": "ที่นี่|thîi nîi",
                  "right": "here",
                  "id": "3-2"
            },
            {
                  "left": "ที่นั่น|thîi nân",
                  "right": "there",
                  "id": "3-3"
            },
            {
                  "left": "ที่ไหน|thîi nǎi",
                  "right": "where",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ไหน|nǎi",
                  "right": "which",
                  "id": "4-1"
            },
            {
                  "left": "อะไร|à-rai",
                  "right": "what",
                  "id": "4-2"
            },
            {
                  "left": "ใคร|khrai",
                  "right": "who",
                  "id": "4-3"
            },
            {
                  "left": "ทำไม|tham-mai",
                  "right": "why",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "อย่างไร|yàang rai",
                  "right": "how",
                  "id": "5-1"
            },
            {
                  "left": "เมื่อไร|mʉ̂a rai",
                  "right": "when",
                  "id": "5-2"
            },
            {
                  "left": "กี่|gìi",
                  "right": "how many",
                  "id": "5-3"
            },
            {
                  "left": "เท่าไร|thâo rai",
                  "right": "how much",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "แค่ไหน|khɛ̂ɛ nǎi",
                  "right": "how much, to what extent",
                  "id": "6-1"
            },
            {
                  "left": "บ้าง|bâang",
                  "right": "some, any",
                  "id": "6-2"
            },
            {
                  "left": "ด้วย|dûai",
                  "right": "also, with",
                  "id": "6-3"
            },
            {
                  "left": "กัน|gan",
                  "right": "together",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "เอง|eeng",
                  "right": "oneself",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 35 Association",
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
        toast.success("Bundle 35 Association inséré avec succès !");
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
            Insérer Bundle 35 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 851-875 (25 mots)
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

export default InsertThaBundle35Association;
