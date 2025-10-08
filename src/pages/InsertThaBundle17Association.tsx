import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle17Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "น้ำ|náam",
                  "right": "water",
                  "id": "1-1"
            },
            {
                  "left": "ฉัน|chǎn",
                  "right": "I, me",
                  "id": "1-2"
            },
            {
                  "left": "คุณ|khun",
                  "right": "you",
                  "id": "1-3"
            },
            {
                  "left": "เขา|khǎo",
                  "right": "he, she",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "เรา|rao",
                  "right": "we",
                  "id": "2-1"
            },
            {
                  "left": "นี่|nîi",
                  "right": "this",
                  "id": "2-2"
            },
            {
                  "left": "นั่น|nân",
                  "right": "that",
                  "id": "2-3"
            },
            {
                  "left": "ที่|thîi",
                  "right": "at, place",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ใน|nai",
                  "right": "in",
                  "id": "3-1"
            },
            {
                  "left": "บน|bon",
                  "right": "on",
                  "id": "3-2"
            },
            {
                  "left": "ใต้|tâi",
                  "right": "under",
                  "id": "3-3"
            },
            {
                  "left": "กับ|gàp",
                  "right": "with",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "และ|láe",
                  "right": "and",
                  "id": "4-1"
            },
            {
                  "left": "หรือ|rǔue",
                  "right": "or",
                  "id": "4-2"
            },
            {
                  "left": "แต่|tàae",
                  "right": "but",
                  "id": "4-3"
            },
            {
                  "left": "ไป|pai",
                  "right": "go",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "มา|maa",
                  "right": "come",
                  "id": "5-1"
            },
            {
                  "left": "อยู่|yùu",
                  "right": "stay, be at",
                  "id": "5-2"
            },
            {
                  "left": "มี|mii",
                  "right": "have",
                  "id": "5-3"
            },
            {
                  "left": "เป็น|pen",
                  "right": "be",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ทำ|tham",
                  "right": "do, make",
                  "id": "6-1"
            },
            {
                  "left": "ได้|dâai",
                  "right": "can, able to",
                  "id": "6-2"
            },
            {
                  "left": "ให้|hâi",
                  "right": "give",
                  "id": "6-3"
            },
            {
                  "left": "เอา|ao",
                  "right": "take, want",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "พูด|phûut",
                  "right": "speak",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 17 Association",
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
        toast.success("Bundle 17 Association inséré avec succès !");
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
            Insérer Bundle 17 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 401-425 (25 mots)
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

export default InsertThaBundle17Association;
