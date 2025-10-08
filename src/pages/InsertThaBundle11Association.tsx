import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle11Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "อุปสรรค|ùp-pà-sàk",
                  "right": "obstacle",
                  "id": "1-1"
            },
            {
                  "left": "การแก้ปัญหา|gaan gɛ̂ɛ pan-hǎa",
                  "right": "problem-solving",
                  "id": "1-2"
            },
            {
                  "left": "วิธีแก้|wí-thii gɛ̂ɛ",
                  "right": "solution",
                  "id": "1-3"
            },
            {
                  "left": "คำตอบ|kham tɔ̀ɔp",
                  "right": "answer",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "คำถาม|kham thǎam",
                  "right": "question",
                  "id": "2-1"
            },
            {
                  "left": "ข้อสงสัย|khɔ̂ɔ sǒng sǎi",
                  "right": "doubt",
                  "id": "2-2"
            },
            {
                  "left": "ความสงสัย|khwaam sǒng sǎi",
                  "right": "suspicion",
                  "id": "2-3"
            },
            {
                  "left": "ความเชื่อ|khwaam chʉ̂a",
                  "right": "belief",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ความเชื่อมั่น|khwaam chʉ̂a mân",
                  "right": "confidence",
                  "id": "3-1"
            },
            {
                  "left": "ความไว้วางใจ|khwaam wái waang jai",
                  "right": "trust",
                  "id": "3-2"
            },
            {
                  "left": "ความซื่อสัตย์|khwaam sʉ̂ʉ sàt",
                  "right": "honesty",
                  "id": "3-3"
            },
            {
                  "left": "ความจริงใจ|khwaam jing jai",
                  "right": "sincerity",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ความเมตตา|khwaam mêet-taa",
                  "right": "compassion",
                  "id": "4-1"
            },
            {
                  "left": "ความกรุณา|khwaam gà-rú-naa",
                  "right": "kindness",
                  "id": "4-2"
            },
            {
                  "left": "ความอดทน|khwaam òt thon",
                  "right": "patience",
                  "id": "4-3"
            },
            {
                  "left": "ความพยายาม|khwaam phá-yaa-yaam",
                  "right": "effort",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ความตั้งใจ|khwaam tâng jai",
                  "right": "intention",
                  "id": "5-1"
            },
            {
                  "left": "ความมุ่งมั่น|khwaam mûng mân",
                  "right": "determination",
                  "id": "5-2"
            },
            {
                  "left": "ความกระตือรือร้น|khwaam grà-tʉʉ rʉʉ rón",
                  "right": "enthusiasm",
                  "id": "5-3"
            },
            {
                  "left": "ความสนใจ|khwaam sǒn jai",
                  "right": "interest",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ความห่วงใย|khwaam hùang yai",
                  "right": "concern",
                  "id": "6-1"
            },
            {
                  "left": "ความเอาใจใส่|khwaam ao jai sài",
                  "right": "attention",
                  "id": "6-2"
            },
            {
                  "left": "ความระมัดระวัง|khwaam rá-mát rá-wang",
                  "right": "caution",
                  "id": "6-3"
            },
            {
                  "left": "ความปลอดภัย|khwaam plɔ̀ɔt phai",
                  "right": "safety",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ความสะดวก|khwaam sà-dùak",
                  "right": "convenience",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 11 Association",
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
        toast.success("Bundle 11 Association inséré avec succès !");
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
            Insérer Bundle 11 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 251-275 (25 mots)
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

export default InsertThaBundle11Association;
