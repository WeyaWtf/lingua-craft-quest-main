import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle27Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "นิตยสาร|nít-tá-yá-sǎan",
                  "right": "magazine",
                  "id": "1-1"
            },
            {
                  "left": "ปากกา|pàak-gaa",
                  "right": "pen",
                  "id": "1-2"
            },
            {
                  "left": "ดินสอ|din-sɔ̌ɔ",
                  "right": "pencil",
                  "id": "1-3"
            },
            {
                  "left": "กระดาษ|grà-dàat",
                  "right": "paper",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "สมุด|sà-mùt",
                  "right": "notebook",
                  "id": "2-1"
            },
            {
                  "left": "ยางลบ|yaang lóp",
                  "right": "eraser",
                  "id": "2-2"
            },
            {
                  "left": "ไม้บรรทัด|mái ban-thát",
                  "right": "ruler",
                  "id": "2-3"
            },
            {
                  "left": "กรรไกร|gan-grai",
                  "right": "scissors",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "กาว|gaao",
                  "right": "glue",
                  "id": "3-1"
            },
            {
                  "left": "เทป|thêep",
                  "right": "tape",
                  "id": "3-2"
            },
            {
                  "left": "ภาพ|phâap",
                  "right": "picture",
                  "id": "3-3"
            },
            {
                  "left": "รูป|rûup",
                  "right": "photo",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "แผนที่|phɛ̌ɛn-thîi",
                  "right": "map",
                  "id": "4-1"
            },
            {
                  "left": "ปฏิทิน|pà-ti-thin",
                  "right": "calendar",
                  "id": "4-2"
            },
            {
                  "left": "ของขวัญ|khɔ̌ɔng khwǎn",
                  "right": "gift",
                  "id": "4-3"
            },
            {
                  "left": "ของเล่น|khɔ̌ɔng lên",
                  "right": "toy",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "เกม|geem",
                  "right": "game",
                  "id": "5-1"
            },
            {
                  "left": "กีฬา|gii-laa",
                  "right": "sport",
                  "id": "5-2"
            },
            {
                  "left": "ฟุตบอล|fút-bɔɔn",
                  "right": "football",
                  "id": "5-3"
            },
            {
                  "left": "บาสเก็ตบอล|bàat-sa-gèt-bɔɔn",
                  "right": "basketball",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "วอลเลย์บอล|wɔɔn-lee-bɔɔn",
                  "right": "volleyball",
                  "id": "6-1"
            },
            {
                  "left": "แบดมินตัน|bɛ̀ɛt-min-tan",
                  "right": "badminton",
                  "id": "6-2"
            },
            {
                  "left": "เทนนิส|then-nít",
                  "right": "tennis",
                  "id": "6-3"
            },
            {
                  "left": "ว่ายน้ำ|wâai náam",
                  "right": "swim",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "วิ่ง|wîng",
                  "right": "run",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 27 Association",
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
        toast.success("Bundle 27 Association inséré avec succès !");
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
            Insérer Bundle 27 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 651-675 (25 mots)
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

export default InsertThaBundle27Association;
