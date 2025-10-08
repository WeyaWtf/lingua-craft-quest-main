import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle28Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "กระโดด|grà-dòot",
                  "right": "jump",
                  "id": "1-1"
            },
            {
                  "left": "เต้นรำ|tên ram",
                  "right": "dance",
                  "id": "1-2"
            },
            {
                  "left": "ร้องเพลง|rɔ́ɔng phleeng",
                  "right": "sing",
                  "id": "1-3"
            },
            {
                  "left": "เล่นดนตรี|lên don-trii",
                  "right": "play music",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "เปียโน|piia-noo",
                  "right": "piano",
                  "id": "2-1"
            },
            {
                  "left": "กีตาร์|gii-tâa",
                  "right": "guitar",
                  "id": "2-2"
            },
            {
                  "left": "กลอง|glɔɔng",
                  "right": "drum",
                  "id": "2-3"
            },
            {
                  "left": "เพลง|phleeng",
                  "right": "song",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ภาษา|phaa-sǎa",
                  "right": "language",
                  "id": "3-1"
            },
            {
                  "left": "ภาษาไทย|phaa-sǎa thai",
                  "right": "Thai language",
                  "id": "3-2"
            },
            {
                  "left": "ภาษาอังกฤษ|phaa-sǎa ang-grìt",
                  "right": "English language",
                  "id": "3-3"
            },
            {
                  "left": "คำ|kham",
                  "right": "word",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "ประโยค|prà-yòok",
                  "right": "sentence",
                  "id": "4-1"
            },
            {
                  "left": "ความหมาย|khwaam mǎai",
                  "right": "meaning",
                  "id": "4-2"
            },
            {
                  "left": "แปล|plɛɛ",
                  "right": "translate",
                  "id": "4-3"
            },
            {
                  "left": "อธิบาย|à-thí-baai",
                  "right": "explain",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "เรียน|rian",
                  "right": "study",
                  "id": "5-1"
            },
            {
                  "left": "สอน|sɔ̌ɔn",
                  "right": "teach",
                  "id": "5-2"
            },
            {
                  "left": "ทำการบ้าน|tham gaan bâan",
                  "right": "do homework",
                  "id": "5-3"
            },
            {
                  "left": "สอบ|sɔ̀ɔp",
                  "right": "test, exam",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "คะแนน|khá-nɛɛn",
                  "right": "score",
                  "id": "6-1"
            },
            {
                  "left": "เกรด|grèet",
                  "right": "grade",
                  "id": "6-2"
            },
            {
                  "left": "ผ่าน|phàan",
                  "right": "pass",
                  "id": "6-3"
            },
            {
                  "left": "ตก|tòk",
                  "right": "fail",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "จบ|jòp",
                  "right": "finish, graduate",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 28 Association",
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
        toast.success("Bundle 28 Association inséré avec succès !");
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
            Insérer Bundle 28 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 676-700 (25 mots)
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

export default InsertThaBundle28Association;
