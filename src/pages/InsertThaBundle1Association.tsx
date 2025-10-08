import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle1Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "จังหวัด|jang-wàt",
                  "right": "province",
                  "id": "1-1"
            },
            {
                  "left": "อำเภอ|am-phəə",
                  "right": "district",
                  "id": "1-2"
            },
            {
                  "left": "ตำบล|tam-bon",
                  "right": "subdistrict",
                  "id": "1-3"
            },
            {
                  "left": "หมู่บ้าน|mùu bâan",
                  "right": "village",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "เมือง|mʉang",
                  "right": "city",
                  "id": "2-1"
            },
            {
                  "left": "ชนบท|chon-ná-bòt",
                  "right": "countryside",
                  "id": "2-2"
            },
            {
                  "left": "ทิศเหนือ|thít nʉ̌a",
                  "right": "north",
                  "id": "2-3"
            },
            {
                  "left": "ทิศใต้|thít tâi",
                  "right": "south",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "ทิศตะวันออก|thít tà-wan ɔ̀ɔk",
                  "right": "east",
                  "id": "3-1"
            },
            {
                  "left": "ทิศตะวันตก|thít tà-wan tòk",
                  "right": "west",
                  "id": "3-2"
            },
            {
                  "left": "ประเทศไทย|prà-thêet thai",
                  "right": "Thailand",
                  "id": "3-3"
            },
            {
                  "left": "กรุงเทพฯ|grung-thêep",
                  "right": "Bangkok",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "เชียงใหม่|chiiang mài",
                  "right": "Chiang Mai",
                  "id": "4-1"
            },
            {
                  "left": "ภูเก็ต|phuu-gèt",
                  "right": "Phuket",
                  "id": "4-2"
            },
            {
                  "left": "พัทยา|phát-thá-yaa",
                  "right": "Pattaya",
                  "id": "4-3"
            },
            {
                  "left": "อเมริกา|à-mee-rí-gaa",
                  "right": "America",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "อังกฤษ|ang-grìt",
                  "right": "England",
                  "id": "5-1"
            },
            {
                  "left": "จีน|jiin",
                  "right": "China",
                  "id": "5-2"
            },
            {
                  "left": "ญี่ปุ่น|yîi-pùn",
                  "right": "Japan",
                  "id": "5-3"
            },
            {
                  "left": "เกาหลี|gao-lǐi",
                  "right": "Korea",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ฝรั่งเศส|fà-ràng-sèet",
                  "right": "France",
                  "id": "6-1"
            },
            {
                  "left": "เยอรมัน|yəə-rá-man",
                  "right": "Germany",
                  "id": "6-2"
            },
            {
                  "left": "อิตาลี|ì-taa-lii",
                  "right": "Italy",
                  "id": "6-3"
            },
            {
                  "left": "รัสเซีย|rát-siia",
                  "right": "Russia",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "ออสเตรเลีย|ɔ́ɔt-sa-tree-liia",
                  "right": "Australia",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 1 Association",
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
        toast.success("Bundle 1 Association inséré avec succès !");
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
            Insérer Bundle 1 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 1-25 (25 mots)
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

export default InsertThaBundle1Association;
