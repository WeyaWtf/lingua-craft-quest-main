import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle7Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "อดีต|à-dìit",
                  "right": "past",
                  "id": "1-1"
            },
            {
                  "left": "ปัจจุบัน|pàt-jù-ban",
                  "right": "present",
                  "id": "1-2"
            },
            {
                  "left": "ช่วง|chûang",
                  "right": "period",
                  "id": "1-3"
            },
            {
                  "left": "ระยะ|rá-yá",
                  "right": "phase",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "ขั้นตอน|khân tɔɔn",
                  "right": "step",
                  "id": "2-1"
            },
            {
                  "left": "กระบวนการ|grà-buan gaan",
                  "right": "process",
                  "id": "2-2"
            },
            {
                  "left": "วิธี|wí-thii",
                  "right": "method",
                  "id": "2-3"
            },
            {
                  "left": "เทคนิค|thék-nìk",
                  "right": "technique",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ทักษะ|thák-sà",
                  "right": "skill",
                  "id": "3-1"
            },
            {
                  "left": "ความสามารถ|khwaam sǎa-mâat",
                  "right": "ability",
                  "id": "3-2"
            },
            {
                  "left": "ประสบการณ์|prà-sòp gaan",
                  "right": "experience",
                  "id": "3-3"
            },
            {
                  "left": "ความรู้|khwaam rúu",
                  "right": "knowledge",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ปัญญา|pan-yaa",
                  "right": "wisdom",
                  "id": "4-1"
            },
            {
                  "left": "ความเข้าใจ|khwaam khâo jai",
                  "right": "understanding",
                  "id": "4-2"
            },
            {
                  "left": "ความคิด|khwaam khít",
                  "right": "thought",
                  "id": "4-3"
            },
            {
                  "left": "ความเห็น|khwaam hěn",
                  "right": "opinion",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ทัศนคติ|thát-sà-ná-khá-tì",
                  "right": "attitude",
                  "id": "5-1"
            },
            {
                  "left": "มุมมอง|mum mɔɔng",
                  "right": "perspective",
                  "id": "5-2"
            },
            {
                  "left": "จุดประสงค์|jùt prà-sǒng",
                  "right": "purpose",
                  "id": "5-3"
            },
            {
                  "left": "เป้าหมาย|pâo mǎai",
                  "right": "goal",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "แผน|phɛ̌ɛn",
                  "right": "plan",
                  "id": "6-1"
            },
            {
                  "left": "โครงการ|khroo-ng gaan",
                  "right": "project",
                  "id": "6-2"
            },
            {
                  "left": "งาน|ngaan",
                  "right": "work, task",
                  "id": "6-3"
            },
            {
                  "left": "กิจกรรม|gìt-jà-gam",
                  "right": "activity",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "การประชุม|gaan prà-chum",
                  "right": "meeting",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 7 Association",
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
        toast.success("Bundle 7 Association inséré avec succès !");
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
            Insérer Bundle 7 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 151-175 (25 mots)
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

export default InsertThaBundle7Association;
