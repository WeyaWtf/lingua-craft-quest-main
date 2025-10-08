import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle15Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle15 = async () => {
    setIsInserting(true);

    const bundle15Cards = [
      { front: "lost, disappear", back: "ပျောက်|pyauq", category: "vocabulary", id: "1" },
      { front: "show", back: "ပြ|pya", category: "vocabulary", id: "2" },
      { front: "hide", back: "ဝှက်|hweq", category: "vocabulary", id: "3" },
      { front: "open", back: "ဖွင့်|hpwin", category: "vocabulary", id: "4" },
      { front: "close", back: "ပိတ်|peiq", category: "vocabulary", id: "5" },
      { front: "enter", back: "ဝင်|win", category: "vocabulary", id: "6" },
      { front: "exit", back: "ထွက်|htweq", category: "vocabulary", id: "7" },
      { front: "go up", back: "တက်|teq", category: "vocabulary", id: "8" },
      { front: "go down", back: "ဆင်း|hsin", category: "vocabulary", id: "9" },
      { front: "take", back: "ယူ|yu", category: "vocabulary", id: "10" },
      { front: "put, place", back: "ထား|hta", category: "vocabulary", id: "11" },
      { front: "lift, raise", back: "မြှင့်|hmyin", category: "vocabulary", id: "12" },
      { front: "push", back: "တွန်း|tun", category: "vocabulary", id: "13" },
      { front: "pull", back: "ဆွဲ|hsweh", category: "vocabulary", id: "14" },
      { front: "throw", back: "ပစ်|piq", category: "vocabulary", id: "15" },
      { front: "catch", back: "ဖမ်း|hpan", category: "vocabulary", id: "16" },
      { front: "touch", back: "ထိ|hti", category: "vocabulary", id: "17" },
      { front: "press", back: "နှိပ်|hneiq", category: "vocabulary", id: "18" },
      { front: "squeeze", back: "ညှစ်|hnyiq", category: "vocabulary", id: "19" },
      { front: "twist", back: "လိမ်|lein", category: "vocabulary", id: "20" },
      { front: "turn, rotate", back: "လှည့်|hleh", category: "vocabulary", id: "21" },
      { front: "return", back: "ပြန်|pyan", category: "vocabulary", id: "22" },
      { front: "turn (direction)", back: "ကွေ့|kway", category: "vocabulary", id: "23" },
      { front: "straight", back: "တည့်|teh", category: "vocabulary", id: "24" },
      { front: "cross", back: "ဖြတ်|phyaq", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 15 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle15Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 15 Flashcards created:', data);
      toast.success("Exercise Bundle 15 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 15 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 15"
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
            onClick={insertBundle15}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 15 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle15Flashcard;
