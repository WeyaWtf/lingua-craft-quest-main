import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle37Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "กลัว|gluua",
                  "right": "fear",
                  "id": "1-1"
            },
            {
                  "left": "หวัง|wǎng",
                  "right": "hope",
                  "id": "1-2"
            },
            {
                  "left": "ปรารถนา|praan-thá-nǎa",
                  "right": "wish",
                  "id": "1-3"
            },
            {
                  "left": "ต้องการ|tɔ̂ng gaan",
                  "right": "need",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "จำเป็น|jam pen",
                  "right": "necessary",
                  "id": "2-1"
            },
            {
                  "left": "สำคัญ|sǎm-khan",
                  "right": "important",
                  "id": "2-2"
            },
            {
                  "left": "พิเศษ|phí-sèet",
                  "right": "special",
                  "id": "2-3"
            },
            {
                  "left": "ธรรมดา|tham-má-daa",
                  "right": "ordinary",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "แปลก|plɛ̀ɛk",
                  "right": "strange",
                  "id": "3-1"
            },
            {
                  "left": "น่าสนใจ|nâa sǒn jai",
                  "right": "interesting",
                  "id": "3-2"
            },
            {
                  "left": "น่าเบื่อ|nâa bʉ̀a",
                  "right": "boring",
                  "id": "3-3"
            },
            {
                  "left": "น่ากลัว|nâa gluua",
                  "right": "scary",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "น่ารัก|nâa rák",
                  "right": "cute",
                  "id": "4-1"
            },
            {
                  "left": "น่าเกลียด|nâa glìat",
                  "right": "ugly",
                  "id": "4-2"
            },
            {
                  "left": "น่าสงสาร|nâa sǒng sǎan",
                  "right": "pitiful",
                  "id": "4-3"
            },
            {
                  "left": "น่าอาย|nâa aai",
                  "right": "embarrassing",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ภูมิใจ|phuum jai",
                  "right": "proud",
                  "id": "5-1"
            },
            {
                  "left": "ผิดหวัง|phìt wǎng",
                  "right": "disappointed",
                  "id": "5-2"
            },
            {
                  "left": "ประหลาดใจ|prà-làat jai",
                  "right": "surprised",
                  "id": "5-3"
            },
            {
                  "left": "เข้าใจผิด|khâo jai phìt",
                  "right": "misunderstand",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "เสียใจ|sǐa jai",
                  "right": "sorry, sad",
                  "id": "6-1"
            },
            {
                  "left": "ใจดี|jai dii",
                  "right": "kind",
                  "id": "6-2"
            },
            {
                  "left": "ใจร้าย|jai ráai",
                  "right": "mean",
                  "id": "6-3"
            },
            {
                  "left": "ขี้เกียจ|khîi gìat",
                  "right": "lazy",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ขยัน|khà-yǎn",
                  "right": "diligent",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 37 Association",
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
        toast.success("Bundle 37 Association inséré avec succès !");
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
            Insérer Bundle 37 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 901-925 (25 mots)
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

export default InsertThaBundle37Association;
