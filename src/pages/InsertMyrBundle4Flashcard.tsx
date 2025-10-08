import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle4Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle4 = async () => {
    setIsInserting(true);

    const bundle4Cards = [
      { front: "fast", back: "မြန်|myan", category: "vocabulary", id: "1" },
      { front: "slow", back: "နှေး|hne", category: "vocabulary", id: "2" },
      { front: "easy", back: "လွယ်|lweh", category: "vocabulary", id: "3" },
      { front: "difficult", back: "ခက်|kheq", category: "vocabulary", id: "4" },
      { front: "near", back: "နီး|ni", category: "vocabulary", id: "5" },
      { front: "far", back: "ဝေး|we", category: "vocabulary", id: "6" },
      { front: "front", back: "ရှေ့|shay", category: "vocabulary", id: "7" },
      { front: "back, behind", back: "နောက်|nauq", category: "vocabulary", id: "8" },
      { front: "side", back: "ဘေး|be", category: "vocabulary", id: "9" },
      { front: "on, above", back: "အပေါ်|a-pau", category: "vocabulary", id: "10" },
      { front: "under, below", back: "အောက်|auq", category: "vocabulary", id: "11" },
      { front: "left", back: "ဘယ်|beh", category: "vocabulary", id: "12" },
      { front: "right", back: "ညာ|nya", category: "vocabulary", id: "13" },
      { front: "middle", back: "အလယ်|a-leh", category: "vocabulary", id: "14" },
      { front: "around", back: "ပတ်လည်|paq-leh", category: "vocabulary", id: "15" },
      { front: "day", back: "နေ့|nay", category: "vocabulary", id: "16" },
      { front: "night", back: "ည|nya", category: "vocabulary", id: "17" },
      { front: "morning", back: "မနက်|ma-neq", category: "vocabulary", id: "18" },
      { front: "noon, afternoon", back: "နေ့လည်|nay-leh", category: "vocabulary", id: "19" },
      { front: "evening", back: "ညနေ|nya-ne", category: "vocabulary", id: "20" },
      { front: "time (instance)", back: "ခါ|kha", category: "vocabulary", id: "21" },
      { front: "time", back: "အချိန်|a-chain", category: "vocabulary", id: "22" },
      { front: "today", back: "ဒီနေ့|di-nay", category: "vocabulary", id: "23" },
      { front: "tomorrow", back: "မနက်ဖြန်|ma-neq-phyan", category: "vocabulary", id: "24" },
      { front: "yesterday", back: "မနေ့က|ma-nay-ga", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 4 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle4Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 4 Flashcards created:', data);
      toast.success("Exercise Bundle 4 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 4 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 4"
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
            onClick={insertBundle4}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 4 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle4Flashcard;
