import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle1Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle1 = async () => {
    setIsInserting(true);

    const bundle1Cards = [
      { front: "I, me (male)", back: "ကျွန်တော်|kya-naw", category: "vocabulary", id: "1" },
      { front: "I, me (female)", back: "ကျွန်မ|kya-ma", category: "vocabulary", id: "2" },
      { front: "you (polite)", back: "ခင်ဗျား|khin-bya", category: "vocabulary", id: "3" },
      { front: "you (informal)", back: "နင်|nin", category: "vocabulary", id: "4" },
      { front: "he, she", back: "သူ|thu", category: "vocabulary", id: "5" },
      { front: "they", back: "သူတို့|thu-do", category: "vocabulary", id: "6" },
      { front: "we (male)", back: "ကျွန်တော်တို့|kya-naw-do", category: "vocabulary", id: "7" },
      { front: "we (female)", back: "ကျွန်မတို့|kya-ma-do", category: "vocabulary", id: "8" },
      { front: "this", back: "ဒီ|di", category: "vocabulary", id: "9" },
      { front: "that", back: "ဟို|ho", category: "vocabulary", id: "10" },
      { front: "at, in", back: "မှာ|hma", category: "vocabulary", id: "11" },
      { front: "with, and", back: "နဲ့|neh", category: "vocabulary", id: "12" },
      { front: "and (formal)", back: "နှင့်|hnin", category: "vocabulary", id: "13" },
      { front: "or", back: "သို့မဟုတ်|tho-ma-hote", category: "vocabulary", id: "14" },
      { front: "but", back: "ဒါပေမယ့်|da-be-meh", category: "vocabulary", id: "15" },
      { front: "go", back: "သွား|thwa", category: "vocabulary", id: "16" },
      { front: "come", back: "လာ|la", category: "vocabulary", id: "17" },
      { front: "stay, live", back: "နေ|ne", category: "vocabulary", id: "18" },
      { front: "have, exist", back: "ရှိ|shi", category: "vocabulary", id: "19" },
      { front: "be, become", back: "ဖြစ်|phyit", category: "vocabulary", id: "20" },
      { front: "do, make", back: "လုပ်|lote", category: "vocabulary", id: "21" },
      { front: "can, able to", back: "တတ်|tat", category: "vocabulary", id: "22" },
      { front: "give", back: "ပေး|pe", category: "vocabulary", id: "23" },
      { front: "take", back: "ယူ|yu", category: "vocabulary", id: "24" },
      { front: "speak, say", back: "ပြော|pyaw", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 1 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle1Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 1 Flashcards created:', data);
      toast.success("Exercise Bundle 1 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 1 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 1"
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
            onClick={insertBundle1}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 1 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle1Flashcard;
