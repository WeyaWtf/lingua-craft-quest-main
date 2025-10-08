import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle18Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle18 = async () => {
    setIsInserting(true);

    const bundle18Cards = [
      { front: "half", back: "တစ်ဝက်|tiq-weq", category: "vocabulary", id: "1" },
      { front: "total", back: "စုစုပေါင်း|zu-zu-paung", category: "vocabulary", id: "2" },
      { front: "all", back: "အားလုံး|a-loun", category: "vocabulary", id: "3" },
      { front: "empty", back: "အလွတ်|a-lwuq", category: "vocabulary", id: "4" },
      { front: "full", back: "ပြည့်|pyeh", category: "vocabulary", id: "5" },
      { front: "finished, used up", back: "ကုန်|koun", category: "vocabulary", id: "6" },
      { front: "remain", back: "ကျန်|kyan", category: "vocabulary", id: "7" },
      { front: "sell", back: "ရောင်း|yaung", category: "vocabulary", id: "8" },
      { front: "buy", back: "ဝယ်|weh", category: "vocabulary", id: "9" },
      { front: "exchange", back: "လဲလှယ်|leh-hleh", category: "vocabulary", id: "10" },
      { front: "borrow, lend", back: "ချေး|che", category: "vocabulary", id: "11" },
      { front: "return", back: "ပြန်|pyan", category: "vocabulary", id: "12" },
      { front: "rent", back: "ငှား|hnga", category: "vocabulary", id: "13" },
      { front: "reserve", back: "ကြိုတင်မှာယူ|kyo-tin-hma-yu", category: "vocabulary", id: "14" },
      { front: "hire", back: "ငှား|hnga", category: "vocabulary", id: "15" },
      { front: "work", back: "အလုပ်လုပ်|a-loq-loq", category: "vocabulary", id: "16" },
      { front: "rest", back: "အနားယူ|a-na-yu", category: "vocabulary", id: "17" },
      { front: "take leave", back: "ခွင့်ယူ|khwin-yu", category: "vocabulary", id: "18" },
      { front: "office", back: "ရုံး|youn", category: "vocabulary", id: "19" },
      { front: "company", back: "ကုမ္ပဏီ|koun-pa-ni", category: "vocabulary", id: "20" },
      { front: "factory", back: "စက်ရုံ|seq-youn", category: "vocabulary", id: "21" },
      { front: "shop", back: "ဆိုင်|hsain", category: "vocabulary", id: "22" },
      { front: "market", back: "ဈေး|ze", category: "vocabulary", id: "23" },
      { front: "shopping center", back: "ဈေးဝယ်စင်တာ|ze-weh-sin-ta", category: "vocabulary", id: "24" },
      { front: "bank", back: "ဘဏ်|ban", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 18 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle18Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 18 Flashcards created:', data);
      toast.success("Exercise Bundle 18 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 18 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 18"
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
            onClick={insertBundle18}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 18 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle18Flashcard;
