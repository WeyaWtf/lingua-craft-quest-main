import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle18Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "บอก|bɔ̀ɔk",
                  "right": "tell",
                  "id": "1-1"
            },
            {
                  "left": "ถาม|thǎam",
                  "right": "ask",
                  "id": "1-2"
            },
            {
                  "left": "ตอบ|tɔ̀ɔp",
                  "right": "answer",
                  "id": "1-3"
            },
            {
                  "left": "รู้|rúu",
                  "right": "know",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "คิด|khít",
                  "right": "think",
                  "id": "2-1"
            },
            {
                  "left": "เข้าใจ|khâo jai",
                  "right": "understand",
                  "id": "2-2"
            },
            {
                  "left": "ดู|duu",
                  "right": "look, watch",
                  "id": "2-3"
            },
            {
                  "left": "ฟัง|fang",
                  "right": "listen",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "อ่าน|àan",
                  "right": "read",
                  "id": "3-1"
            },
            {
                  "left": "เขียน|khǐan",
                  "right": "write",
                  "id": "3-2"
            },
            {
                  "left": "กิน|gin",
                  "right": "eat",
                  "id": "3-3"
            },
            {
                  "left": "ดื่ม|dʉ̀ʉm",
                  "right": "drink",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "นอน|nɔɔn",
                  "right": "sleep",
                  "id": "4-1"
            },
            {
                  "left": "ตื่น|tʉ̀ʉn",
                  "right": "wake up",
                  "id": "4-2"
            },
            {
                  "left": "เดิน|dəən",
                  "right": "walk",
                  "id": "4-3"
            },
            {
                  "left": "วิ่ง|wîng",
                  "right": "run",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "นั่ง|nâng",
                  "right": "sit",
                  "id": "5-1"
            },
            {
                  "left": "ยืน|yʉʉn",
                  "right": "stand",
                  "id": "5-2"
            },
            {
                  "left": "ซื้อ|sʉ́ʉ",
                  "right": "buy",
                  "id": "5-3"
            },
            {
                  "left": "ขาย|khǎai",
                  "right": "sell",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "จ่าย|jàai",
                  "right": "pay",
                  "id": "6-1"
            },
            {
                  "left": "ราคา|raakhaa",
                  "right": "price",
                  "id": "6-2"
            },
            {
                  "left": "เงิน|ngəən",
                  "right": "money",
                  "id": "6-3"
            },
            {
                  "left": "บาท|bàat",
                  "right": "baht",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "แพง|phɛɛng",
                  "right": "expensive",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 18 Association",
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
        toast.success("Bundle 18 Association inséré avec succès !");
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
            Insérer Bundle 18 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 426-450 (25 mots)
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

export default InsertThaBundle18Association;
