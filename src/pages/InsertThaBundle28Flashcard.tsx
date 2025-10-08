import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertThaBundle28Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertExercise = async () => {
    setIsInserting(true);

    const cards = [
      {
            "front": "jump",
            "back": "กระโดด|grà-dòot",
            "category": "vocabulary",
            "id": "1"
      },
      {
            "front": "dance",
            "back": "เต้นรำ|tên ram",
            "category": "vocabulary",
            "id": "2"
      },
      {
            "front": "sing",
            "back": "ร้องเพลง|rɔ́ɔng phleeng",
            "category": "vocabulary",
            "id": "3"
      },
      {
            "front": "play music",
            "back": "เล่นดนตรี|lên don-trii",
            "category": "vocabulary",
            "id": "4"
      },
      {
            "front": "piano",
            "back": "เปียโน|piia-noo",
            "category": "vocabulary",
            "id": "5"
      },
      {
            "front": "guitar",
            "back": "กีตาร์|gii-tâa",
            "category": "vocabulary",
            "id": "6"
      },
      {
            "front": "drum",
            "back": "กลอง|glɔɔng",
            "category": "vocabulary",
            "id": "7"
      },
      {
            "front": "song",
            "back": "เพลง|phleeng",
            "category": "vocabulary",
            "id": "8"
      },
      {
            "front": "language",
            "back": "ภาษา|phaa-sǎa",
            "category": "vocabulary",
            "id": "9"
      },
      {
            "front": "Thai language",
            "back": "ภาษาไทย|phaa-sǎa thai",
            "category": "vocabulary",
            "id": "10"
      },
      {
            "front": "English language",
            "back": "ภาษาอังกฤษ|phaa-sǎa ang-grìt",
            "category": "vocabulary",
            "id": "11"
      },
      {
            "front": "word",
            "back": "คำ|kham",
            "category": "vocabulary",
            "id": "12"
      },
      {
            "front": "sentence",
            "back": "ประโยค|prà-yòok",
            "category": "vocabulary",
            "id": "13"
      },
      {
            "front": "meaning",
            "back": "ความหมาย|khwaam mǎai",
            "category": "vocabulary",
            "id": "14"
      },
      {
            "front": "translate",
            "back": "แปล|plɛɛ",
            "category": "vocabulary",
            "id": "15"
      },
      {
            "front": "explain",
            "back": "อธิบาย|à-thí-baai",
            "category": "vocabulary",
            "id": "16"
      },
      {
            "front": "study",
            "back": "เรียน|rian",
            "category": "vocabulary",
            "id": "17"
      },
      {
            "front": "teach",
            "back": "สอน|sɔ̌ɔn",
            "category": "vocabulary",
            "id": "18"
      },
      {
            "front": "do homework",
            "back": "ทำการบ้าน|tham gaan bâan",
            "category": "vocabulary",
            "id": "19"
      },
      {
            "front": "test, exam",
            "back": "สอบ|sɔ̀ɔp",
            "category": "vocabulary",
            "id": "20"
      },
      {
            "front": "score",
            "back": "คะแนน|khá-nɛɛn",
            "category": "vocabulary",
            "id": "21"
      },
      {
            "front": "grade",
            "back": "เกรด|grèet",
            "category": "vocabulary",
            "id": "22"
      },
      {
            "front": "pass",
            "back": "ผ่าน|phàan",
            "category": "vocabulary",
            "id": "23"
      },
      {
            "front": "fail",
            "back": "ตก|tòk",
            "category": "vocabulary",
            "id": "24"
      },
      {
            "front": "finish, graduate",
            "back": "จบ|jòp",
            "category": "vocabulary",
            "id": "25"
      }
];

    const exerciseData = {
      type: "flashcard",
      title: "THA LIST 1000 - Bundle 28 Flashcards",
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
        toast.success("Bundle 28 Flashcards inséré avec succès !");
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
            Insérer Bundle 28 Flashcards
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Mots 676-700 (25 flashcards)
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

export default InsertThaBundle28Flashcard;
