import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle8Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle8 = async () => {
    setIsInserting(true);

    const bundle8Cards = [
      { front: "boat", back: "လှေ|hleh", category: "vocabulary", id: "1" },
      { front: "road, way", back: "လမ်း|lun", category: "vocabulary", id: "2" },
      { front: "bridge", back: "တံတား|tan-ta", category: "vocabulary", id: "3" },
      { front: "river", back: "မြစ်|myiq", category: "vocabulary", id: "4" },
      { front: "sea", back: "ပင်လယ်|pin-leh", category: "vocabulary", id: "5" },
      { front: "mountain", back: "တောင်|taung", category: "vocabulary", id: "6" },
      { front: "hill", back: "တောင်ကုန်း|taung-koun", category: "vocabulary", id: "7" },
      { front: "forest", back: "တောရိုင်း|taw-yain", category: "vocabulary", id: "8" },
      { front: "tree", back: "သစ်ပင်|thiq-pin", category: "vocabulary", id: "9" },
      { front: "flower", back: "ပန်း|pan", category: "vocabulary", id: "10" },
      { front: "leaf", back: "အရွက်|a-yweq", category: "vocabulary", id: "11" },
      { front: "grass", back: "မြက်|myeq", category: "vocabulary", id: "12" },
      { front: "earth, soil", back: "မြေ|myay", category: "vocabulary", id: "13" },
      { front: "stone", back: "ကျောက်|kyauq", category: "vocabulary", id: "14" },
      { front: "sand", back: "သဲ|theh", category: "vocabulary", id: "15" },
      { front: "water", back: "ရေ|ye", category: "vocabulary", id: "16" },
      { front: "rain, sky", back: "မိုး|mo", category: "vocabulary", id: "17" },
      { front: "wind", back: "လေ|lay", category: "vocabulary", id: "18" },
      { front: "cloud", back: "တိမ်|tein", category: "vocabulary", id: "19" },
      { front: "sun", back: "နေ|ne", category: "vocabulary", id: "20" },
      { front: "moon", back: "လ|la", category: "vocabulary", id: "21" },
      { front: "star", back: "ကြယ်|kye", category: "vocabulary", id: "22" },
      { front: "sky", back: "မိုး|mo", category: "vocabulary", id: "23" },
      { front: "light", back: "အလင်း|a-lin", category: "vocabulary", id: "24" },
      { front: "shadow", back: "အရိပ်|a-yeiq", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 8 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle8Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 8 Flashcards created:', data);
      toast.success("Exercise Bundle 8 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 8 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 8"
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
            onClick={insertBundle8}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 8 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle8Flashcard;
