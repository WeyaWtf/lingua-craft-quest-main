import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle4Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "ภาษี|phaa-sǐi",
                  "right": "tax",
                  "id": "1-1"
            },
            {
                  "left": "รายได้|raai dâai",
                  "right": "income",
                  "id": "1-2"
            },
            {
                  "left": "ค่าใช้จ่าย|khâa chái jàai",
                  "right": "expense",
                  "id": "1-3"
            },
            {
                  "left": "เงินเดือน|ngəən dʉan",
                  "right": "salary",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "โบนัส|boo-nát",
                  "right": "bonus",
                  "id": "2-1"
            },
            {
                  "left": "สินค้า|sǐn-kháa",
                  "right": "goods",
                  "id": "2-2"
            },
            {
                  "left": "บริการ|bɔɔ-rí-gaan",
                  "right": "service",
                  "id": "2-3"
            },
            {
                  "left": "ลูกค้า|lûuk kháa",
                  "right": "customer",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "พนักงาน|phá-nák-ngaan",
                  "right": "employee",
                  "id": "3-1"
            },
            {
                  "left": "ผู้จัดการ|phûu jàt-gaan",
                  "right": "manager",
                  "id": "3-2"
            },
            {
                  "left": "เจ้าของ|jâo khɔ̌ɔng",
                  "right": "owner",
                  "id": "3-3"
            },
            {
                  "left": "หุ้นส่วน|hûn sùan",
                  "right": "partner",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "สัญญา|sǎn-yaa",
                  "right": "contract",
                  "id": "4-1"
            },
            {
                  "left": "ข้อตกลง|khɔ̂ɔ tòk-long",
                  "right": "agreement",
                  "id": "4-2"
            },
            {
                  "left": "กฎหมาย|gòt-mǎai",
                  "right": "law",
                  "id": "4-3"
            },
            {
                  "left": "ศาล|sǎan",
                  "right": "court",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ทนายความ|thá-naai khwaam",
                  "right": "lawyer",
                  "id": "5-1"
            },
            {
                  "left": "ผู้พิพากษา|phûu phí-phâak-sǎa",
                  "right": "judge",
                  "id": "5-2"
            },
            {
                  "left": "คดี|khá-dii",
                  "right": "case",
                  "id": "5-3"
            },
            {
                  "left": "ความผิด|khwaam phìt",
                  "right": "offense",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "บริสุทธิ์|bɔɔ-rí-sùt",
                  "right": "innocent",
                  "id": "6-1"
            },
            {
                  "left": "ผิด|phìt",
                  "right": "guilty",
                  "id": "6-2"
            },
            {
                  "left": "จับ|jàp",
                  "right": "arrest",
                  "id": "6-3"
            },
            {
                  "left": "ขัง|khǎng",
                  "right": "imprison",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ปล่อย|plɔ̀i",
                  "right": "release",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 4 Association",
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
        toast.success("Bundle 4 Association inséré avec succès !");
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
            Insérer Bundle 4 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 76-100 (25 mots)
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

export default InsertThaBundle4Association;
