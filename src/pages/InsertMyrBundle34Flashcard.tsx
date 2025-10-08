import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle34Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle34 = async () => {
    setIsInserting(true);

    const bundle34Cards = [
      { front: "part, section", back: "အပိုင်း|a-pain", category: "vocabulary", id: "1" },
      { front: "chapter", back: "အခန်း|a-khan", category: "vocabulary", id: "2" },
      { front: "page", back: "စာမျက်နှာ|sa-myeq-hna", category: "vocabulary", id: "3" },
      { front: "line", back: "လိုင်း|lain", category: "vocabulary", id: "4" },
      { front: "text", back: "စာသား|sa-tha", category: "vocabulary", id: "5" },
      { front: "news information", back: "သတင်းအချက်အလက်|tha-din-a-cheq-a-leq", category: "vocabulary", id: "6" },
      { front: "source", back: "ရင်းမြစ်|yin-myiq", category: "vocabulary", id: "7" },
      { front: "reference", back: "ကိုးကား|ko-ka", category: "vocabulary", id: "8" },
      { front: "reliable", back: "ယုံကြည်စိတ်ချရ|youn-kyi-seiq-cha-ya", category: "vocabulary", id: "9" },
      { front: "accurate", back: "တိကျ|ti-kya", category: "vocabulary", id: "10" },
      { front: "correct", back: "မှန်ကန်|hman-kan", category: "vocabulary", id: "11" },
      { front: "mistake", back: "အမှား|a-hma", category: "vocabulary", id: "12" },
      { front: "error", back: "အမှားအယွင်း|a-hma-a-ywin", category: "vocabulary", id: "13" },
      { front: "defect", back: "အနာအဆာ|a-na-a-hsa", category: "vocabulary", id: "14" },
      { front: "problem", back: "ပြဿနာ|pyin-tha-na", category: "vocabulary", id: "15" },
      { front: "obstacle", back: "အတားအဆီး|a-ta-a-hsi", category: "vocabulary", id: "16" },
      { front: "problem-solving", back: "ပြဿနာဖြေရှင်းခြင်း|pyin-tha-na-phye-shin-chin", category: "vocabulary", id: "17" },
      { front: "solution", back: "အဖြေ|a-phyay", category: "vocabulary", id: "18" },
      { front: "answer", back: "အဖြေ|a-phyay", category: "vocabulary", id: "19" },
      { front: "question", back: "မေးခွန်း|me-khun", category: "vocabulary", id: "20" },
      { front: "doubt", back: "သံသယ|than-theh", category: "vocabulary", id: "21" },
      { front: "belief", back: "ယုံကြည်ချက်|youn-kyi-cheq", category: "vocabulary", id: "22" },
      { front: "confidence", back: "ယုံကြည်မှု|youn-kyi-hmu", category: "vocabulary", id: "23" },
      { front: "trust", back: "ယုံကြည်စိတ်ချ|youn-kyi-seiq-cha", category: "vocabulary", id: "24" },
      { front: "honest", back: "ရိုးသား|yo-tha", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 34 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle34Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 34 Flashcards created:', data);
      toast.success("Exercise Bundle 34 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 34 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 34"
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
            onClick={insertBundle34}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 34 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle34Flashcard;
