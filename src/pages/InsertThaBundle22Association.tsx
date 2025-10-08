import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle22Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "เกิน|gəən",
                  "right": "too much",
                  "id": "1-1"
            },
            {
                  "left": "คน|khon",
                  "right": "person",
                  "id": "1-2"
            },
            {
                  "left": "ผู้ชาย|phûu chaai",
                  "right": "man",
                  "id": "1-3"
            },
            {
                  "left": "ผู้หญิง|phûu yǐng",
                  "right": "woman",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "เด็ก|dèk",
                  "right": "child",
                  "id": "2-1"
            },
            {
                  "left": "ผู้ใหญ่|phûu yài",
                  "right": "adult",
                  "id": "2-2"
            },
            {
                  "left": "พ่อ|phɔ̂ɔ",
                  "right": "father",
                  "id": "2-3"
            },
            {
                  "left": "แม่|mɛ̂ɛ",
                  "right": "mother",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ลูก|lûuk",
                  "right": "child (offspring)",
                  "id": "3-1"
            },
            {
                  "left": "พี่|phîi",
                  "right": "older sibling",
                  "id": "3-2"
            },
            {
                  "left": "น้อง|nɔ́ɔng",
                  "right": "younger sibling",
                  "id": "3-3"
            },
            {
                  "left": "ปู่|pùu",
                  "right": "grandfather (paternal)",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ย่า|yâa",
                  "right": "grandmother (paternal)",
                  "id": "4-1"
            },
            {
                  "left": "ตา|taa",
                  "right": "grandfather (maternal)",
                  "id": "4-2"
            },
            {
                  "left": "ยาย|yaai",
                  "right": "grandmother (maternal)",
                  "id": "4-3"
            },
            {
                  "left": "ลุง|lung",
                  "right": "uncle (older)",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ป้า|pâa",
                  "right": "aunt (older)",
                  "id": "5-1"
            },
            {
                  "left": "น้า|náa",
                  "right": "uncle/aunt (younger)",
                  "id": "5-2"
            },
            {
                  "left": "หลาน|lǎan",
                  "right": "nephew, niece",
                  "id": "5-3"
            },
            {
                  "left": "เพื่อน|phʉ̂an",
                  "right": "friend",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "แฟน|fɛɛn",
                  "right": "boyfriend, girlfriend",
                  "id": "6-1"
            },
            {
                  "left": "สามี|sǎa-mii",
                  "right": "husband",
                  "id": "6-2"
            },
            {
                  "left": "ภรรยา|phan-rá-yaa",
                  "right": "wife",
                  "id": "6-3"
            },
            {
                  "left": "ครู|khruu",
                  "right": "teacher",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "นักเรียน|nák rian",
                  "right": "student",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 22 Association",
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
        toast.success("Bundle 22 Association inséré avec succès !");
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
            Insérer Bundle 22 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 526-550 (25 mots)
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

export default InsertThaBundle22Association;
