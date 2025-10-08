import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle23Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle23 = async () => {
    setIsInserting(true);

    const bundle23Cards = [
      { front: "delicious", back: "အရသာရှိ|a-ya-tha-shi", category: "vocabulary", id: "1" },
      { front: "tasteless", back: "အရသာမရှိ|a-ya-tha-ma-shi", category: "vocabulary", id: "2" },
      { front: "tight", back: "တင်း|tin", category: "vocabulary", id: "3" },
      { front: "loose", back: "လျော့|lshaw", category: "vocabulary", id: "4" },
      { front: "hard", back: "မာ|ma", category: "vocabulary", id: "5" },
      { front: "soft", back: "ပျော့|pyaw", category: "vocabulary", id: "6" },
      { front: "soft (texture)", back: "နူး|nu", category: "vocabulary", id: "7" },
      { front: "crispy", back: "ကြွပ်|kyuq", category: "vocabulary", id: "8" },
      { front: "sticky", back: "ကပ်|kaq", category: "vocabulary", id: "9" },
      { front: "detailed", back: "သေသေချာချာ|thay-thay-cha-cha", category: "vocabulary", id: "10" },
      { front: "rough", back: "ကြမ်း|kyan", category: "vocabulary", id: "11" },
      { front: "uneven", back: "မညီမမျှ|ma-nyi-ma-myah", category: "vocabulary", id: "12" },
      { front: "smooth", back: "ချော|chaw", category: "vocabulary", id: "13" },
      { front: "shiny", back: "တောက်|tauq", category: "vocabulary", id: "14" },
      { front: "dull", back: "မိုက်|maiq", category: "vocabulary", id: "15" },
      { front: "opaque", back: "အံ|an", category: "vocabulary", id: "16" },
      { front: "clear", back: "ကြည်|kyi", category: "vocabulary", id: "17" },
      { front: "cloudy, turbid", back: "တိမ်|tein", category: "vocabulary", id: "18" },
      { front: "heavy", back: "လေး|le", category: "vocabulary", id: "19" },
      { front: "light (weight)", back: "ပေါ့|paw", category: "vocabulary", id: "20" },
      { front: "deep", back: "နက်|neq", category: "vocabulary", id: "21" },
      { front: "shallow", back: "တိမ်|tein", category: "vocabulary", id: "22" },
      { front: "wide", back: "ကျယ်|kye", category: "vocabulary", id: "23" },
      { front: "narrow", back: "ကျဉ်း|kyin", category: "vocabulary", id: "24" },
      { front: "bright", back: "တောက်|tauq", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 23 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle23Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 23 Flashcards created:', data);
      toast.success("Exercise Bundle 23 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 23 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 23"
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
            onClick={insertBundle23}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 23 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle23Flashcard;
