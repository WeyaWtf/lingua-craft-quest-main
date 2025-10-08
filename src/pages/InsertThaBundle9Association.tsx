import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle9Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "การวัด|gaan wát",
                  "right": "measurement",
                  "id": "1-1"
            },
            {
                  "left": "การชั่ง|gaan châng",
                  "right": "weighing",
                  "id": "1-2"
            },
            {
                  "left": "การนับ|gaan náp",
                  "right": "counting",
                  "id": "1-3"
            },
            {
                  "left": "การเปรียบเทียบ|gaan prìap thîap",
                  "right": "comparison",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "การวิเคราะห์|gaan wí-khrɔ́",
                  "right": "analysis",
                  "id": "2-1"
            },
            {
                  "left": "การสังเกต|gaan sǎng-gèet",
                  "right": "observation",
                  "id": "2-2"
            },
            {
                  "left": "การทดลอง|gaan thót lɔɔng",
                  "right": "experiment",
                  "id": "2-3"
            },
            {
                  "left": "การวิจัย|gaan wí-jai",
                  "right": "research",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "การศึกษา|gaan sʉ̀k-sǎa",
                  "right": "education, study",
                  "id": "3-1"
            },
            {
                  "left": "การเรียนรู้|gaan rian rúu",
                  "right": "learning",
                  "id": "3-2"
            },
            {
                  "left": "การฝึกฝน|gaan fʉ̀k fǒn",
                  "right": "training",
                  "id": "3-3"
            },
            {
                  "left": "การสอน|gaan sɔ̌ɔn",
                  "right": "teaching",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "การอธิบาย|gaan à-thí-baai",
                  "right": "explanation",
                  "id": "4-1"
            },
            {
                  "left": "การแนะนำ|gaan náe nam",
                  "right": "introduction",
                  "id": "4-2"
            },
            {
                  "left": "การแสดง|gaan sà-dɛɛng",
                  "right": "performance",
                  "id": "4-3"
            },
            {
                  "left": "การนำเสนอ|gaan nam sà-nə̌ə",
                  "right": "presentation",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "การสาธิต|gaan sǎa-thít",
                  "right": "demonstration",
                  "id": "5-1"
            },
            {
                  "left": "การบรรยาย|gaan ban-yaai",
                  "right": "lecture",
                  "id": "5-2"
            },
            {
                  "left": "การอภิปราย|gaan à-phí-praai",
                  "right": "discussion",
                  "id": "5-3"
            },
            {
                  "left": "การสัมมนา|gaan sǎm-má-naa",
                  "right": "seminar",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "การประชุม|gaan prà-chum",
                  "right": "conference",
                  "id": "6-1"
            },
            {
                  "left": "การแข่งขัน|gaan khɛ̀ng khǎn",
                  "right": "competition",
                  "id": "6-2"
            },
            {
                  "left": "การแข่งกีฬา|gaan khɛ̀ng gii-laa",
                  "right": "sports competition",
                  "id": "6-3"
            },
            {
                  "left": "การแสดงดนตรี|gaan sà-dɛɛng don-trii",
                  "right": "concert",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "การแสดงละคร|gaan sà-dɛɛng lá-khɔɔn",
                  "right": "play",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 9 Association",
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
        toast.success("Bundle 9 Association inséré avec succès !");
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
            Insérer Bundle 9 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 201-225 (25 mots)
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

export default InsertThaBundle9Association;
