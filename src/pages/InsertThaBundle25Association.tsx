import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle25Association = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const pairGroups = [
      [
            {
                  "left": "สี|sǐi",
                  "right": "color",
                  "id": "1-1"
            },
            {
                  "left": "สีขาว|sǐi khǎao",
                  "right": "white",
                  "id": "1-2"
            },
            {
                  "left": "สีดำ|sǐi dam",
                  "right": "black",
                  "id": "1-3"
            },
            {
                  "left": "สีแดง|sǐi dɛɛng",
                  "right": "red",
                  "id": "1-4"
            }
      ],
      [
            {
                  "left": "สีเขียว|sǐi khǐao",
                  "right": "green",
                  "id": "2-1"
            },
            {
                  "left": "สีน้ำเงิน|sǐi náam ngəən",
                  "right": "blue",
                  "id": "2-2"
            },
            {
                  "left": "สีเหลือง|sǐi lʉ̌ang",
                  "right": "yellow",
                  "id": "2-3"
            },
            {
                  "left": "สีส้ม|sǐi sôm",
                  "right": "orange",
                  "id": "2-4"
            }
      ],
      [
            {
                  "left": "สีม่วง|sǐi mûang",
                  "right": "purple",
                  "id": "3-1"
            },
            {
                  "left": "สีชมพู|sǐi chom-phuu",
                  "right": "pink",
                  "id": "3-2"
            },
            {
                  "left": "สีน้ำตาล|sǐi náam taan",
                  "right": "brown",
                  "id": "3-3"
            },
            {
                  "left": "สีเทา|sǐi thao",
                  "right": "gray",
                  "id": "3-4"
            }
      ],
      [
            {
                  "left": "อาหาร|aa-hǎan",
                  "right": "food",
                  "id": "4-1"
            },
            {
                  "left": "ข้าว|khâao",
                  "right": "rice",
                  "id": "4-2"
            },
            {
                  "left": "ขนม|khà-nǒm",
                  "right": "snack, dessert",
                  "id": "4-3"
            },
            {
                  "left": "ผลไม้|phǒn-lá-mái",
                  "right": "fruit",
                  "id": "4-4"
            }
      ],
      [
            {
                  "left": "ผัก|phàk",
                  "right": "vegetable",
                  "id": "5-1"
            },
            {
                  "left": "เนื้อ|nʉ́a",
                  "right": "meat, beef",
                  "id": "5-2"
            },
            {
                  "left": "หมู|mǔu",
                  "right": "pork",
                  "id": "5-3"
            },
            {
                  "left": "ไก่|gài",
                  "right": "chicken",
                  "id": "5-4"
            }
      ],
      [
            {
                  "left": "ปลา|plaa",
                  "right": "fish",
                  "id": "6-1"
            },
            {
                  "left": "กุ้ง|gûng",
                  "right": "shrimp",
                  "id": "6-2"
            },
            {
                  "left": "ไข่|khài",
                  "right": "egg",
                  "id": "6-3"
            },
            {
                  "left": "นม|nom",
                  "right": "milk",
                  "id": "6-4"
            }
      ],
      [
            {
                  "left": "น้ำ|náam",
                  "right": "water",
                  "id": "7-1"
            }
      ]
];

    const exerciseData = {
      type: "association",
      title: "THA LIST 1000 - Bundle 25 Association",
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
        toast.success("Bundle 25 Association inséré avec succès !");
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
            Insérer Bundle 25 Association
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 601-625 (25 mots)
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

export default InsertThaBundle25Association;
