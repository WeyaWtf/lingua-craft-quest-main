import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle11Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle11 = async () => {
    setIsInserting(true);

    const bundle11Cards = [
      { front: "pen", back: "ကလောင်|ka-laung", category: "vocabulary", id: "1" },
      { front: "pencil", back: "ခဲတံ|kheh-dan", category: "vocabulary", id: "2" },
      { front: "paper", back: "စာရွက်|sa-yweq", category: "vocabulary", id: "3" },
      { front: "notebook", back: "စာအုပ်|sa-ouq", category: "vocabulary", id: "4" },
      { front: "eraser", back: "ဖျက်ရာ|phyeq-ya", category: "vocabulary", id: "5" },
      { front: "ruler", back: "စည်း|si", category: "vocabulary", id: "6" },
      { front: "scissors", back: "ကတ်ကြေး|kaq-kye", category: "vocabulary", id: "7" },
      { front: "glue", back: "ကော်|kaw", category: "vocabulary", id: "8" },
      { front: "tape", back: "တိပ်|teiq", category: "vocabulary", id: "9" },
      { front: "picture", back: "ပုံ|poun", category: "vocabulary", id: "10" },
      { front: "photo", back: "ဓာတ်ပုံ|daq-poun", category: "vocabulary", id: "11" },
      { front: "map", back: "မြေပုံ|myay-poun", category: "vocabulary", id: "12" },
      { front: "calendar", back: "ပြက္ခဒိန်|pyaq-kha-dein", category: "vocabulary", id: "13" },
      { front: "gift", back: "လက်ဆောင်|leq-saung", category: "vocabulary", id: "14" },
      { front: "toy", back: "ကစားစရာ|ka-za-sa-ya", category: "vocabulary", id: "15" },
      { front: "game", back: "ဂိမ်း|gein", category: "vocabulary", id: "16" },
      { front: "sport", back: "အားကစား|a-za", category: "vocabulary", id: "17" },
      { front: "football", back: "ဘောလုံး|baw-loun", category: "vocabulary", id: "18" },
      { front: "basketball", back: "ခြင်းတောင်း|chin-daung", category: "vocabulary", id: "19" },
      { front: "volleyball", back: "ဘော်လီဘော|baw-li-baw", category: "vocabulary", id: "20" },
      { front: "badminton", back: "ကစားခြင်း|ka-za-chin", category: "vocabulary", id: "21" },
      { front: "tennis", back: "တင်းနစ်|tin-niq", category: "vocabulary", id: "22" },
      { front: "swim", back: "ရေကူး|ye-ku", category: "vocabulary", id: "23" },
      { front: "run", back: "ပြေး|pye", category: "vocabulary", id: "24" },
      { front: "jump", back: "ခုန်|khoun", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 11 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle11Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 11 Flashcards created:', data);
      toast.success("Exercise Bundle 11 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 11 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 11"
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
            onClick={insertBundle11}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 11 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle11Flashcard;
