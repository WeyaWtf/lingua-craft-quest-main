import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle10Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "movie screening",
            "back": "การแสดงภาพยนตร์|gaan sà-dɛɛng phâap-phá-yon",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "movie",
            "back": "ภาพยนตร์|phâap-phá-yon",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "movie (colloquial)",
            "back": "หนัง|nǎng",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "drama",
            "back": "ละคร|lá-khɔɔn",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "program",
            "back": "รายการ|raai gaan",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "channel",
            "back": "ช่อง|chɔ̂ɔng",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "content",
            "back": "เนื้อหา|nʉ́a hǎa",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "topic",
            "back": "หัวข้อ|hǔa khɔ̂ɔ",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "story, matter",
            "back": "เรื่อง|rʉ̂ang",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "episode",
            "back": "ตอน|tɔɔn",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "chapter, role",
            "back": "บท|bòt",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "page",
            "back": "หน้า|nâa",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "line",
            "back": "บรรทัด|ban-thát",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "text, message",
            "back": "ข้อความ|khɔ̂ɔ khwaam",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "news",
            "back": "ข่าวสาร|khàao sǎan",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "information",
            "back": "ข้อมูลข่าวสาร|khɔ̂ɔ muun khàao sǎan",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "source",
            "back": "แหล่งข้อมูล|lɛ̀ng khɔ̂ɔ muun",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "reference",
            "back": "อ้างอิง|âang ing",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "reliable",
            "back": "เชื่อถือ|chʉ̂a thʉ̌ʉ",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "accurate",
            "back": "แม่นยำ|mɛ̂ɛn yam",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "correct",
            "back": "ถูกต้อง|thùuk tɔ̂ng",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "mistake",
            "back": "ผิดพลาด|phìt phlâat",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "error",
            "back": "ข้อผิดพลาด|khɔ̂ɔ phìt phlâat",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "defect",
            "back": "ข้อบกพร่อง|khɔ̂ɔ bòk phrɔ̂ng",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "problem",
            "back": "ปัญหา|pan-hǎa",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 10 Flashcards",
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
        toast.success("Bundle 10 Flashcards inséré avec succès !");
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
            Insérer Bundle 10 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 226-250 (25 flashcards)
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

export default InsertThaBundle10Flashcard;
