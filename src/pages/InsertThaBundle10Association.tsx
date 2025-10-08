import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle10Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "การแสดงภาพยนตร์|gaan sà-dɛɛng phâap-phá-yon",
                  "right": "movie screening",
                  "id": "1-1"
            },
            {
                  "left": "ภาพยนตร์|phâap-phá-yon",
                  "right": "movie",
                  "id": "1-2"
            },
            {
                  "left": "หนัง|nǎng",
                  "right": "movie (colloquial)",
                  "id": "1-3"
            },
            {
                  "left": "ละคร|lá-khɔɔn",
                  "right": "drama",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "รายการ|raai gaan",
                  "right": "program",
                  "id": "2-1"
            },
            {
                  "left": "ช่อง|chɔ̂ɔng",
                  "right": "channel",
                  "id": "2-2"
            },
            {
                  "left": "เนื้อหา|nʉ́a hǎa",
                  "right": "content",
                  "id": "2-3"
            },
            {
                  "left": "หัวข้อ|hǔa khɔ̂ɔ",
                  "right": "topic",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "เรื่อง|rʉ̂ang",
                  "right": "story, matter",
                  "id": "3-1"
            },
            {
                  "left": "ตอน|tɔɔn",
                  "right": "episode",
                  "id": "3-2"
            },
            {
                  "left": "บท|bòt",
                  "right": "chapter, role",
                  "id": "3-3"
            },
            {
                  "left": "หน้า|nâa",
                  "right": "page",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "บรรทัด|ban-thát",
                  "right": "line",
                  "id": "4-1"
            },
            {
                  "left": "ข้อความ|khɔ̂ɔ khwaam",
                  "right": "text, message",
                  "id": "4-2"
            },
            {
                  "left": "ข่าวสาร|khàao sǎan",
                  "right": "news",
                  "id": "4-3"
            },
            {
                  "left": "ข้อมูลข่าวสาร|khɔ̂ɔ muun khàao sǎan",
                  "right": "information",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "แหล่งข้อมูล|lɛ̀ng khɔ̂ɔ muun",
                  "right": "source",
                  "id": "5-1"
            },
            {
                  "left": "อ้างอิง|âang ing",
                  "right": "reference",
                  "id": "5-2"
            },
            {
                  "left": "เชื่อถือ|chʉ̂a thʉ̌ʉ",
                  "right": "reliable",
                  "id": "5-3"
            },
            {
                  "left": "แม่นยำ|mɛ̂ɛn yam",
                  "right": "accurate",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ถูกต้อง|thùuk tɔ̂ng",
                  "right": "correct",
                  "id": "6-1"
            },
            {
                  "left": "ผิดพลาด|phìt phlâat",
                  "right": "mistake",
                  "id": "6-2"
            },
            {
                  "left": "ข้อผิดพลาด|khɔ̂ɔ phìt phlâat",
                  "right": "error",
                  "id": "6-3"
            },
            {
                  "left": "ข้อบกพร่อง|khɔ̂ɔ bòk phrɔ̂ng",
                  "right": "defect",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ปัญหา|pan-hǎa",
                  "right": "problem",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 10 Association",
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
        toast.success("Bundle 10 Association inséré avec succès !");
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
            Insérer Bundle 10 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 226-250 (25 mots)
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

export default InsertThaBundle10Association;
