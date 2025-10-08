import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle8Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "การนัดหมาย|gaan nát mǎai",
                  "right": "appointment",
                  "id": "1-1"
            },
            {
                  "left": "การสัมภาษณ์|gaan sǎm-phâat",
                  "right": "interview",
                  "id": "1-2"
            },
            {
                  "left": "การสนทนา|gaan sǒn-thá-naa",
                  "right": "conversation",
                  "id": "1-3"
            },
            {
                  "left": "การพูดคุย|gaan phûut khui",
                  "right": "chat",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "การถกเถียง|gaan thòk thǐang",
                  "right": "debate",
                  "id": "2-1"
            },
            {
                  "left": "การโต้เถียง|gaan tôo thǐang",
                  "right": "argue",
                  "id": "2-2"
            },
            {
                  "left": "การตกลง|gaan tòk-long",
                  "right": "agreement",
                  "id": "2-3"
            },
            {
                  "left": "การยอมรับ|gaan yɔɔm ráp",
                  "right": "acceptance",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "การปฏิเสธ|gaan pà-tì-sèet",
                  "right": "refusal",
                  "id": "3-1"
            },
            {
                  "left": "การอนุมัติ|gaan à-nú-mát",
                  "right": "approval",
                  "id": "3-2"
            },
            {
                  "left": "การยกเลิก|gaan yók lə̂ək",
                  "right": "cancellation",
                  "id": "3-3"
            },
            {
                  "left": "การเลื่อน|gaan lʉ̂an",
                  "right": "postponement",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "การยืนยัน|gaan yʉʉn yan",
                  "right": "confirmation",
                  "id": "4-1"
            },
            {
                  "left": "การแก้ไข|gaan gɛ̂ɛ khǎi",
                  "right": "correction",
                  "id": "4-2"
            },
            {
                  "left": "การปรับปรุง|gaan pràp prung",
                  "right": "improvement",
                  "id": "4-3"
            },
            {
                  "left": "การซ่อมแซม|gaan sɔ̂ɔm sɛɛm",
                  "right": "repair",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "การดูแล|gaan duu lɛɛ",
                  "right": "maintenance",
                  "id": "5-1"
            },
            {
                  "left": "การทำความสะอาด|gaan tham khwaam sà-àat",
                  "right": "cleaning",
                  "id": "5-2"
            },
            {
                  "left": "การจัดระเบียบ|gaan jàt rá-bìap",
                  "right": "organization",
                  "id": "5-3"
            },
            {
                  "left": "การเตรียม|gaan triam",
                  "right": "preparation",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "การวางแผน|gaan waang phɛ̌ɛn",
                  "right": "planning",
                  "id": "6-1"
            },
            {
                  "left": "การตัดสินใจ|gaan tàt sǐn jai",
                  "right": "decision",
                  "id": "6-2"
            },
            {
                  "left": "การเลือก|gaan lʉ̂ak",
                  "right": "selection",
                  "id": "6-3"
            },
            {
                  "left": "การพิจารณา|gaan phí-jaa-rá-naa",
                  "right": "consideration",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "การคำนวณ|gaan kham-nuan",
                  "right": "calculation",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 8 Association",
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
        toast.success("Bundle 8 Association inséré avec succès !");
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
            Insérer Bundle 8 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 176-200 (25 mots)
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

export default InsertThaBundle8Association;
