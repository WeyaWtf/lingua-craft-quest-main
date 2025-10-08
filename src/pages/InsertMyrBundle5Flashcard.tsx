import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle5Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle5 = async () => {
    setIsInserting(true);

    const bundle5Cards = [
      { front: "year", back: "နှစ်|hniq", category: "vocabulary", id: "1" },
      { front: "month, moon", back: "လ|la", category: "vocabulary", id: "2" },
      { front: "week", back: "ပတ်|paq", category: "vocabulary", id: "3" },
      { front: "hour, clock", back: "နာရီ|na-yi", category: "vocabulary", id: "4" },
      { front: "minute", back: "မိနစ်|mi-niq", category: "vocabulary", id: "5" },
      { front: "second", back: "စက္ကန့်|seq-kan", category: "vocabulary", id: "6" },
      { front: "time", back: "အချိန်|a-chain", category: "vocabulary", id: "7" },
      { front: "period", back: "အချိန်အခါ|a-chain-a-kha", category: "vocabulary", id: "8" },
      { front: "before", back: "အရင်|a-yin", category: "vocabulary", id: "9" },
      { front: "after", back: "နောက်|nauq", category: "vocabulary", id: "10" },
      { front: "now", back: "အခု|a-khu", category: "vocabulary", id: "11" },
      { front: "moment", back: "ခဏ|kha-na", category: "vocabulary", id: "12" },
      { front: "already, finished", back: "ပြီး|pyi", category: "vocabulary", id: "13" },
      { front: "still, yet", back: "သေး|the", category: "vocabulary", id: "14" },
      { front: "always", back: "အမြဲ|a-myeh", category: "vocabulary", id: "15" },
      { front: "often", back: "မကြာခဏ|ma-kya-khan", category: "vocabulary", id: "16" },
      { front: "sometimes", back: "တစ်ခါတစ်ရံ|tiq-kha-tiq-yan", category: "vocabulary", id: "17" },
      { front: "never", back: "ဘယ်တော့မှ|beh-daw-ma", category: "vocabulary", id: "18" },
      { front: "all, every", back: "အားလုံး|a-loun", category: "vocabulary", id: "19" },
      { front: "some", back: "အချို့|a-cho", category: "vocabulary", id: "20" },
      { front: "many", back: "များ|mya", category: "vocabulary", id: "21" },
      { front: "few, little", back: "နည်း|ni", category: "vocabulary", id: "22" },
      { front: "very much", back: "အများကြီး|a-mya-kyi", category: "vocabulary", id: "23" },
      { front: "enough", back: "အလုံအလောက်|a-loun-a-lauq", category: "vocabulary", id: "24" },
      { front: "too much", back: "လွန်|lwun", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 5 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle5Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 5 Flashcards created:', data);
      toast.success("Exercise Bundle 5 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 5 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 5"
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
            onClick={insertBundle5}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 5 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle5Flashcard;
