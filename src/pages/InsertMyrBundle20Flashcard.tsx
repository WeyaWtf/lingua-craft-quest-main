import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle20Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle20 = async () => {
    setIsInserting(true);

    const bundle20Cards = [
      { front: "with", back: "နဲ့|neh", category: "vocabulary", id: "1" },
      { front: "with (formal)", back: "နှင့်|hnin", category: "vocabulary", id: "2" },
      { front: "together", back: "တူတူ|tu-tu", category: "vocabulary", id: "3" },
      { front: "oneself", back: "ကိုယ့်ကိုယ်ကို|ko-ko-ko", category: "vocabulary", id: "4" },
      { front: "question particle", back: "လား|la", category: "vocabulary", id: "5" },
      { front: "particle (emphasis)", back: "လေ|lay", category: "vocabulary", id: "6" },
      { front: "plural marker", back: "များ|mya", category: "vocabulary", id: "7" },
      { front: "not", back: "မ|ma", category: "vocabulary", id: "8" },
      { front: "no, not", back: "မဟုတ်|ma-houq", category: "vocabulary", id: "9" },
      { front: "yes", back: "ဟုတ်ကဲ့|houq-keh", category: "vocabulary", id: "10" },
      { front: "okay", back: "ကဲ|keh", category: "vocabulary", id: "11" },
      { front: "yes, alright", back: "ဟုတ်ပြီ|houq-pyi", category: "vocabulary", id: "12" },
      { front: "true, correct", back: "မှန်|hman", category: "vocabulary", id: "13" },
      { front: "accurate", back: "မှန်ကန်|hman-kan", category: "vocabulary", id: "14" },
      { front: "really", back: "တကယ်|ta-keh", category: "vocabulary", id: "15" },
      { front: "truth", back: "အမှန်|a-hman", category: "vocabulary", id: "16" },
      { front: "possible", back: "ဖြစ်နိုင်|phyiq-nain", category: "vocabulary", id: "17" },
      { front: "probably", back: "ဖြစ်နိုင်ဖွယ်|phyiq-nain-phweh", category: "vocabulary", id: "18" },
      { front: "must", back: "ဖြစ်ရမည်|phyiq-ya-meh", category: "vocabulary", id: "19" },
      { front: "should", back: "သင့်တော်|thin-taw", category: "vocabulary", id: "20" },
      { front: "want", back: "လို|lo", category: "vocabulary", id: "21" },
      { front: "like", back: "ကြိုက်|kyaiq", category: "vocabulary", id: "22" },
      { front: "love", back: "ချစ်|chiq", category: "vocabulary", id: "23" },
      { front: "hate", back: "မုန်း|moun", category: "vocabulary", id: "24" },
      { front: "fear", back: "ကြောက်|kyauq", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 20 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle20Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 20 Flashcards created:', data);
      toast.success("Exercise Bundle 20 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 20 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 20"
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
            onClick={insertBundle20}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 20 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle20Flashcard;
