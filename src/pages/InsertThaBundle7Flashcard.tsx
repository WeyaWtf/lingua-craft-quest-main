import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle7Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "past",
            "back": "อดีต|à-dìit",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "present",
            "back": "ปัจจุบัน|pàt-jù-ban",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "period",
            "back": "ช่วง|chûang",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "phase",
            "back": "ระยะ|rá-yá",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "step",
            "back": "ขั้นตอน|khân tɔɔn",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "process",
            "back": "กระบวนการ|grà-buan gaan",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "method",
            "back": "วิธี|wí-thii",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "technique",
            "back": "เทคนิค|thék-nìk",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "skill",
            "back": "ทักษะ|thák-sà",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "ability",
            "back": "ความสามารถ|khwaam sǎa-mâat",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "experience",
            "back": "ประสบการณ์|prà-sòp gaan",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "knowledge",
            "back": "ความรู้|khwaam rúu",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "wisdom",
            "back": "ปัญญา|pan-yaa",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "understanding",
            "back": "ความเข้าใจ|khwaam khâo jai",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "thought",
            "back": "ความคิด|khwaam khít",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "opinion",
            "back": "ความเห็น|khwaam hěn",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "attitude",
            "back": "ทัศนคติ|thát-sà-ná-khá-tì",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "perspective",
            "back": "มุมมอง|mum mɔɔng",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "purpose",
            "back": "จุดประสงค์|jùt prà-sǒng",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "goal",
            "back": "เป้าหมาย|pâo mǎai",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "plan",
            "back": "แผน|phɛ̌ɛn",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "project",
            "back": "โครงการ|khroo-ng gaan",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "work, task",
            "back": "งาน|ngaan",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "activity",
            "back": "กิจกรรม|gìt-jà-gam",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "meeting",
            "back": "การประชุม|gaan prà-chum",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 7 Flashcards",
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
        toast.success("Bundle 7 Flashcards inséré avec succès !");
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
            Insérer Bundle 7 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 151-175 (25 flashcards)
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

export default InsertThaBundle7Flashcard;
