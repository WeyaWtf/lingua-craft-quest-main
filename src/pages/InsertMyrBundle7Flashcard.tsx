import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle7Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle7 = async () => {
    setIsInserting(true);

    const bundle7Cards = [
      { front: "doctor", back: "ဆရာဝန်|hsa-ya-wun", category: "vocabulary", id: "1" },
      { front: "nurse", back: "သူနာပြု|thu-na-pyu", category: "vocabulary", id: "2" },
      { front: "police", back: "ရဲ|yay", category: "vocabulary", id: "3" },
      { front: "soldier", back: "တပ်မတော်|taq-ma-taw", category: "vocabulary", id: "4" },
      { front: "worker", back: "အလုပ်သမား|a-loq-tha-ma", category: "vocabulary", id: "5" },
      { front: "boss", back: "သူဌေး|thu-hte", category: "vocabulary", id: "6" },
      { front: "house, home", back: "အိမ်|ein", category: "vocabulary", id: "7" },
      { front: "room", back: "အခန်း|a-khan", category: "vocabulary", id: "8" },
      { front: "door", back: "တံခါး|ta-ga", category: "vocabulary", id: "9" },
      { front: "window", back: "ပြတင်းပေါက်|pya-tin-bauq", category: "vocabulary", id: "10" },
      { front: "table", back: "စားပွဲ|sa-bweh", category: "vocabulary", id: "11" },
      { front: "chair", back: "ကုလားထိုင်|ku-la-htain", category: "vocabulary", id: "12" },
      { front: "bed", back: "ခုတင်|khu-tin", category: "vocabulary", id: "13" },
      { front: "cupboard", back: "သေတ္တာ|thiq-ta", category: "vocabulary", id: "14" },
      { front: "bedroom", back: "အိပ်ခန်း|eiq-khan", category: "vocabulary", id: "15" },
      { front: "bathroom", back: "ရေချိုးခန်း|ye-cho-khan", category: "vocabulary", id: "16" },
      { front: "kitchen", back: "မီးဖိုချောင်|mi-hpo-kyaung", category: "vocabulary", id: "17" },
      { front: "garden", back: "ဥယျာဉ်|u-yan", category: "vocabulary", id: "18" },
      { front: "car", back: "ကား|ka", category: "vocabulary", id: "19" },
      { front: "vehicle", back: "ယာဉ်|yin", category: "vocabulary", id: "20" },
      { front: "bicycle", back: "စက်ဘီး|seq-bi", category: "vocabulary", id: "21" },
      { front: "motorcycle", back: "မော်တော်ဆိုင်ကယ်|maw-taw-hsain-keh", category: "vocabulary", id: "22" },
      { front: "bus", back: "ဘတ်စ်ကား|bat-sa-ka", category: "vocabulary", id: "23" },
      { front: "train", back: "ရထား|ya-hta", category: "vocabulary", id: "24" },
      { front: "airplane", back: "လေယာဉ်|lay-yin", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 7 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle7Cards,
        shuffleSides: true
      },
      author_id: "demo",
      is_published: true
    };

    try {
      const { data, error } = await supabase
        .from('exercises')
        .insert([exerciseData])
        .select()
        .single();

      if (error) {
        console.error('Error inserting:', error);
        toast.error("Error creating exercise");
        setIsInserting(false);
        return;
      }

      console.log('✅ Exercise MYR LIST 1000 - Bundle 7 Flashcards created:', data);
      toast.success("Exercise Bundle 7 Flashcards created successfully!");
      setTimeout(() => navigate("/catalog"), 1500);
    } catch (err) {
      console.error('Error:', err);
      toast.error("Error creating exercise");
      setIsInserting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 7 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 7"
            with 25 basic words.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Exercise details:</h3>
            <ul className="text-sm space-y-1">
              <li>• Type: Flashcards</li>
              <li>• Number of cards: 25</li>
              <li>• Language: Burmese</li>
              <li>• Level: Beginner</li>
              <li>• Shuffle front/back: Enabled</li>
              <li>• Format: English → Burmese (script + romanization)</li>
            </ul>
          </div>

          <Button
            size="lg"
            onClick={insertBundle7}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 7 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle7Flashcard;
