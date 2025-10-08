import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle1Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "province",
            "back": "จังหวัด|jang-wàt",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "district",
            "back": "อำเภอ|am-phəə",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "subdistrict",
            "back": "ตำบล|tam-bon",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "village",
            "back": "หมู่บ้าน|mùu bâan",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "city",
            "back": "เมือง|mʉang",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "countryside",
            "back": "ชนบท|chon-ná-bòt",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "north",
            "back": "ทิศเหนือ|thít nʉ̌a",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "south",
            "back": "ทิศใต้|thít tâi",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "east",
            "back": "ทิศตะวันออก|thít tà-wan ɔ̀ɔk",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "west",
            "back": "ทิศตะวันตก|thít tà-wan tòk",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "Thailand",
            "back": "ประเทศไทย|prà-thêet thai",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "Bangkok",
            "back": "กรุงเทพฯ|grung-thêep",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "Chiang Mai",
            "back": "เชียงใหม่|chiiang mài",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "Phuket",
            "back": "ภูเก็ต|phuu-gèt",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "Pattaya",
            "back": "พัทยา|phát-thá-yaa",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "America",
            "back": "อเมริกา|à-mee-rí-gaa",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "England",
            "back": "อังกฤษ|ang-grìt",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "China",
            "back": "จีน|jiin",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "Japan",
            "back": "ญี่ปุ่น|yîi-pùn",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "Korea",
            "back": "เกาหลี|gao-lǐi",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "France",
            "back": "ฝรั่งเศส|fà-ràng-sèet",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "Germany",
            "back": "เยอรมัน|yəə-rá-man",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "Italy",
            "back": "อิตาลี|ì-taa-lii",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "Russia",
            "back": "รัสเซีย|rát-siia",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "Australia",
            "back": "ออสเตรเลีย|ɔ́ɔt-sa-tree-liia",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 1 Flashcards",
      difficulty: 1,
      source: "official",
      language: "thai",
      tags: ["vocabulary", "thai", "beginner", "CU-TFL"],
      content: { cards, shuffleSides: true },
      author_id: "demo",
      is_published: true
    };

    try {
      const { error } = await supabase.from("exercises").insert(exerciseData);

      if (error) {
        toast.error("Erreur lors de l'insertion");
        console.error(error);
      } else {
        toast.success("Bundle 1 Flashcards inséré avec succès !");
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
            Insérer Bundle 1 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 1-25 (25 flashcards)
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

export default InsertThaBundle1Flashcard;
