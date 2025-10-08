import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle25Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle25 = async () => {
    setIsInserting(true);

    const bundle25Cards = [
      { front: "township", back: "မြို့နယ်|myo-neh", category: "vocabulary", id: "1" },
      { front: "ward", back: "ရပ်ကွက်|yaq-kweq", category: "vocabulary", id: "2" },
      { front: "village", back: "ရွာ|ywa", category: "vocabulary", id: "3" },
      { front: "town, city", back: "မြို့|myo", category: "vocabulary", id: "4" },
      { front: "countryside", back: "ကျေးလက်|kye-leq", category: "vocabulary", id: "5" },
      { front: "north", back: "မြောက်|myauq", category: "vocabulary", id: "6" },
      { front: "south", back: "တောင်|taung", category: "vocabulary", id: "7" },
      { front: "east", back: "အရှေ့|a-shay", category: "vocabulary", id: "8" },
      { front: "west", back: "အနောက်|a-nauq", category: "vocabulary", id: "9" },
      { front: "Myanmar", back: "မြန်မာ|myan-ma", category: "vocabulary", id: "10" },
      { front: "Yangon", back: "ရန်ကုန်|yan-goun", category: "vocabulary", id: "11" },
      { front: "Mandalay", back: "မန္တလေး|man-da-le", category: "vocabulary", id: "12" },
      { front: "Naypyidaw", back: "နေပြည်တော်|nay-pyi-daw", category: "vocabulary", id: "13" },
      { front: "Bagan", back: "ပုဂံ|pu-gan", category: "vocabulary", id: "14" },
      { front: "America", back: "အမေရိကန်|a-may-yi-kan", category: "vocabulary", id: "15" },
      { front: "England", back: "အင်္ဂလန်|ein-ga-lan", category: "vocabulary", id: "16" },
      { front: "China", back: "တရုတ်|ta-youq", category: "vocabulary", id: "17" },
      { front: "Japan", back: "ဂျပန်|ja-pan", category: "vocabulary", id: "18" },
      { front: "Korea", back: "ကိုရီးယား|ko-yi-ya", category: "vocabulary", id: "19" },
      { front: "France", back: "ပြင်သစ်|pyin-thiq", category: "vocabulary", id: "20" },
      { front: "Germany", back: "ဂျာမနီ|ja-ma-ni", category: "vocabulary", id: "21" },
      { front: "Italy", back: "အီတလီ|i-ta-li", category: "vocabulary", id: "22" },
      { front: "Russia", back: "ရုရှား|you-sha", category: "vocabulary", id: "23" },
      { front: "Australia", back: "သြစတြေးလျှ|aw-za-tay-hlya", category: "vocabulary", id: "24" },
      { front: "Canada", back: "ကနေဒါ|ka-nay-da", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 25 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle25Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 25 Flashcards created:', data);
      toast.success("Exercise Bundle 25 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 25 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 25"
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
            onClick={insertBundle25}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 25 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle25Flashcard;
