import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle14Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle14 = async () => {
    setIsInserting(true);

    const bundle14Cards = [
      { front: "well, healthy", back: "နေကောင်း|ne-kaung", category: "vocabulary", id: "1" },
      { front: "healthy", back: "ကျန်းမာ|kyan-ma", category: "vocabulary", id: "2" },
      { front: "weak", back: "အားနည်း|a-ni", category: "vocabulary", id: "3" },
      { front: "health", back: "ကျန်းမာရေး|kyan-ma-ye", category: "vocabulary", id: "4" },
      { front: "die", back: "သေ|thay", category: "vocabulary", id: "5" },
      { front: "born", back: "မွေး|mwe", category: "vocabulary", id: "6" },
      { front: "age, life", back: "အသက်|a-theq", category: "vocabulary", id: "7" },
      { front: "young person", back: "လူငယ်|lu-ngeh", category: "vocabulary", id: "8" },
      { front: "old person", back: "လူကြီး|lu-kyi", category: "vocabulary", id: "9" },
      { front: "marry", back: "အိမ်ထောင်ကျ|ein-htaung-kya", category: "vocabulary", id: "10" },
      { front: "divorce", back: "ကွာရှင်း|kwa-shin", category: "vocabulary", id: "11" },
      { front: "pregnant", back: "ကိုယ်ဝန်|ko-wun", category: "vocabulary", id: "12" },
      { front: "give birth", back: "မွေးဖွား|mwe-phwa", category: "vocabulary", id: "13" },
      { front: "feed", back: "ကျွေး|kywé", category: "vocabulary", id: "14" },
      { front: "take care of", back: "ပြုစု|pyu-zu", category: "vocabulary", id: "15" },
      { front: "help", back: "ကူညီ|ku-nyi", category: "vocabulary", id: "16" },
      { front: "ask for, request", back: "တောင်း|taung", category: "vocabulary", id: "17" },
      { front: "thank you", back: "ကျေးဇူး|kye-zu", category: "vocabulary", id: "18" },
      { front: "apologize", back: "တောင်းပန်|taung-pan", category: "vocabulary", id: "19" },
      { front: "pleased, glad", back: "ဝမ်းသာ|wun-tha", category: "vocabulary", id: "20" },
      { front: "receive, accept", back: "လက်ခံ|leq-khan", category: "vocabulary", id: "21" },
      { front: "say goodbye", back: "နှုတ်ဆက်|hnoq-hseq", category: "vocabulary", id: "22" },
      { front: "meet", back: "တွေ့|tway", category: "vocabulary", id: "23" },
      { front: "look for, search", back: "ရှာ|sha", category: "vocabulary", id: "24" },
      { front: "find", back: "တွေ့|tway", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 14 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle14Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 14 Flashcards created:', data);
      toast.success("Exercise Bundle 14 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 14 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 14"
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
            onClick={insertBundle14}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 14 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle14Flashcard;
