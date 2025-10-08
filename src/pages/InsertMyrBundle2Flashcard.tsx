import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle2Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle2 = async () => {
    setIsInserting(true);

    const bundle2Cards = [
      { front: "tell, show", back: "ပြ|pya", category: "vocabulary", id: "1" },
      { front: "ask", back: "မေး|me", category: "vocabulary", id: "2" },
      { front: "answer", back: "ဖြေ|phye", category: "vocabulary", id: "3" },
      { front: "know", back: "သိ|thi", category: "vocabulary", id: "4" },
      { front: "think", back: "စဉ်းစား|sin-za", category: "vocabulary", id: "5" },
      { front: "understand", back: "နားလည်|na-leh", category: "vocabulary", id: "6" },
      { front: "look, watch", back: "ကြည့်|kyi", category: "vocabulary", id: "7" },
      { front: "listen", back: "နားထောင်|na-htaung", category: "vocabulary", id: "8" },
      { front: "read", back: "ဖတ်|phat", category: "vocabulary", id: "9" },
      { front: "write", back: "ရေး|ye", category: "vocabulary", id: "10" },
      { front: "eat", back: "စား|sa", category: "vocabulary", id: "11" },
      { front: "drink", back: "သောက်|thauk", category: "vocabulary", id: "12" },
      { front: "sleep", back: "အိပ်|eiq", category: "vocabulary", id: "13" },
      { front: "wake up", back: "နိုး|no", category: "vocabulary", id: "14" },
      { front: "walk", back: "လမ်း|lun", category: "vocabulary", id: "15" },
      { front: "run", back: "ပြေး|pye", category: "vocabulary", id: "16" },
      { front: "sit", back: "ထိုင်|htain", category: "vocabulary", id: "17" },
      { front: "stand", back: "ရပ်|yat", category: "vocabulary", id: "18" },
      { front: "buy", back: "ဝယ်|weh", category: "vocabulary", id: "19" },
      { front: "sell", back: "ရောင်း|yaung", category: "vocabulary", id: "20" },
      { front: "pay", back: "ပေး|pe", category: "vocabulary", id: "21" },
      { front: "price, market", back: "ဈေး|ze", category: "vocabulary", id: "22" },
      { front: "money", back: "ပိုက်ဆံ|paiq-san", category: "vocabulary", id: "23" },
      { front: "kyat (currency)", back: "ကျပ်|kyat", category: "vocabulary", id: "24" },
      { front: "price", back: "စျေး|zeh", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 2 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle2Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 2 Flashcards created:', data);
      toast.success("Exercise Bundle 2 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 2 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 2"
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
            onClick={insertBundle2}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 2 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle2Flashcard;
