import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle22Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle22 = async () => {
    setIsInserting(true);

    const bundle22Cards = [
      { front: "foolish", back: "မိုက်|maiq", category: "vocabulary", id: "1" },
      { front: "good at, skilled", back: "တော်|taw", category: "vocabulary", id: "2" },
      { front: "quiet", back: "တိတ်ဆိတ်|teiq-heiq", category: "vocabulary", id: "3" },
      { front: "loud, noisy", back: "ဆူညံ|hsu-nyan", category: "vocabulary", id: "4" },
      { front: "dangerous", back: "အန္တရာယ်|an-ta-ya", category: "vocabulary", id: "5" },
      { front: "safe", back: "လုံခြုံ|loun-khoun", category: "vocabulary", id: "6" },
      { front: "be careful", back: "သတိထား|tha-ti-hta", category: "vocabulary", id: "7" },
      { front: "slippery", back: "ချော|chaw", category: "vocabulary", id: "8" },
      { front: "dry", back: "ခြောက်|chauq", category: "vocabulary", id: "9" },
      { front: "wet", back: "စို|so", category: "vocabulary", id: "10" },
      { front: "damp", back: "စိုစွတ်|so-zuq", category: "vocabulary", id: "11" },
      { front: "hot", back: "ပူ|pu", category: "vocabulary", id: "12" },
      { front: "cold", back: "အေး|e", category: "vocabulary", id: "13" },
      { front: "cool", back: "မှော်|shaw", category: "vocabulary", id: "14" },
      { front: "warm", back: "နွေးထွေး|nwe-htwe", category: "vocabulary", id: "15" },
      { front: "fresh", back: "လတ်ဆတ်|laq-hseq", category: "vocabulary", id: "16" },
      { front: "rotten", back: "ပုပ်|pouq", category: "vocabulary", id: "17" },
      { front: "fragrant", back: "မွှေး|hmwe", category: "vocabulary", id: "18" },
      { front: "smelly", back: "နံ|nan", category: "vocabulary", id: "19" },
      { front: "sweet", back: "ချို|cho", category: "vocabulary", id: "20" },
      { front: "salty", back: "ငန်|ngan", category: "vocabulary", id: "21" },
      { front: "spicy", back: "စပ်|zaq", category: "vocabulary", id: "22" },
      { front: "sour", back: "ချဉ်|chin", category: "vocabulary", id: "23" },
      { front: "bitter", back: "ခါး|kha", category: "vocabulary", id: "24" },
      { front: "bland", back: "ပျော့|pyaw", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 22 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle22Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 22 Flashcards created:', data);
      toast.success("Exercise Bundle 22 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 22 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 22"
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
            onClick={insertBundle22}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 22 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle22Flashcard;
