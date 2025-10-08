import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle12Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ความสบาย|khwaam sà-baai",
                  "right": "comfort",
                  "id": "1-1"
            },
            {
                  "left": "ความสะอาด|khwaam sà-àat",
                  "right": "cleanliness",
                  "id": "1-2"
            },
            {
                  "left": "ความเป็นระเบียบ|khwaam pen rá-bìap",
                  "right": "orderliness",
                  "id": "1-3"
            },
            {
                  "left": "ความรับผิดชอบ|khwaam ráp phìt chɔ̂ɔp",
                  "right": "responsibility",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ความยุติธรรม|khwaam yút-tì-tham",
                  "right": "justice",
                  "id": "2-1"
            },
            {
                  "left": "ความเท่าเทียม|khwaam thâo thiiam",
                  "right": "equality",
                  "id": "2-2"
            },
            {
                  "left": "ความแตกต่าง|khwaam tɛ̀ɛk tàang",
                  "right": "difference",
                  "id": "2-3"
            },
            {
                  "left": "ความหลากหลาย|khwaam lǎak lǎai",
                  "right": "diversity",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ความเหมือน|khwaam mʉ̌an",
                  "right": "similarity",
                  "id": "3-1"
            },
            {
                  "left": "ความเป็นเอกลักษณ์|khwaam pen èek-gà-lák",
                  "right": "uniqueness",
                  "id": "3-2"
            },
            {
                  "left": "ความพิเศษ|khwaam phí-sèet",
                  "right": "specialty",
                  "id": "3-3"
            },
            {
                  "left": "ความสวยงาม|khwaam sǔai ngaam",
                  "right": "beauty",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ความน่าสนใจ|khwaam nâa sǒn jai",
                  "right": "attractiveness",
                  "id": "4-1"
            },
            {
                  "left": "ความบันเทิง|khwaam ban-thəəng",
                  "right": "entertainment",
                  "id": "4-2"
            },
            {
                  "left": "ความเพลิดเพลิน|khwaam phləət phləən",
                  "right": "enjoyment",
                  "id": "4-3"
            },
            {
                  "left": "ความสุขสบาย|khwaam sùk sà-baai",
                  "right": "well-being",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ความเจริญรุ่งเรือง|khwaam jà-rəən rûng rʉang",
                  "right": "prosperity",
                  "id": "5-1"
            },
            {
                  "left": "ความมั่งคั่ง|khwaam mâng khâng",
                  "right": "wealth",
                  "id": "5-2"
            },
            {
                  "left": "ความยากจน|khwaam yâak jon",
                  "right": "poverty",
                  "id": "5-3"
            },
            {
                  "left": "ความลำบาก|khwaam lam-bàak",
                  "right": "difficulty",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ความทุกข์|khwaam thúk",
                  "right": "suffering",
                  "id": "6-1"
            },
            {
                  "left": "ความเจ็บปวด|khwaam jèp pùat",
                  "right": "pain",
                  "id": "6-2"
            },
            {
                  "left": "ความอันตราย|khwaam an-tá-raai",
                  "right": "danger",
                  "id": "6-3"
            },
            {
                  "left": "ความเสี่ยง|khwaam sìang",
                  "right": "risk",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ความเป็นไปได้|khwaam pen pai dâai",
                  "right": "possibility",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 12 Association",
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
        toast.success("Bundle 12 Association inséré avec succès !");
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
            Insérer Bundle 12 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 276-300 (25 mots)
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

export default InsertThaBundle12Association;
