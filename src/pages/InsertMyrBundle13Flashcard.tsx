import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle13Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle13 = async () => {
    setIsInserting(true);

    const bundle13Cards = [
      { front: "stop", back: "ရပ်|yat", category: "vocabulary", id: "1" },
      { front: "continue", back: "ဆက်|hseq", category: "vocabulary", id: "2" },
      { front: "wait", back: "စောင့်|saung", category: "vocabulary", id: "3" },
      { front: "hurry", back: "အမြန်|a-myan", category: "vocabulary", id: "4" },
      { front: "late", back: "နောက်ကျ|nauq-kya", category: "vocabulary", id: "5" },
      { front: "in time", back: "မီး|mi", category: "vocabulary", id: "6" },
      { front: "miss", back: "လွတ်|lwuq", category: "vocabulary", id: "7" },
      { front: "forget", back: "မေ့|may", category: "vocabulary", id: "8" },
      { front: "remember", back: "မှတ်|hmaq", category: "vocabulary", id: "9" },
      { front: "think", back: "တွေး|twe", category: "vocabulary", id: "10" },
      { front: "dream", back: "အိပ်မက်|eiq-meq", category: "vocabulary", id: "11" },
      { front: "excited", back: "စိတ်လှုပ်ရှား|seiq-hlouq-sha", category: "vocabulary", id: "12" },
      { front: "afraid", back: "ကြောက်|kyauq", category: "vocabulary", id: "13" },
      { front: "worry", back: "စိုးရိမ်|so-yein", category: "vocabulary", id: "14" },
      { front: "anger", back: "ဒေါသ|daw-tha", category: "vocabulary", id: "15" },
      { front: "sad", back: "ဝမ်း|wun", category: "vocabulary", id: "16" },
      { front: "happy", back: "ပျော်|pyaw", category: "vocabulary", id: "17" },
      { front: "joyful", back: "ပျော်ရွှင်|pyaw-shwin", category: "vocabulary", id: "18" },
      { front: "bored", back: "ငြီးငွေ့|nyi-ngway", category: "vocabulary", id: "19" },
      { front: "tired", back: "ပင်ပန်း|pin-pan", category: "vocabulary", id: "20" },
      { front: "sleepy", back: "အိပ်ချင်|eiq-chin", category: "vocabulary", id: "21" },
      { front: "hungry", back: "ဆာ|hsa", category: "vocabulary", id: "22" },
      { front: "full (stomach)", back: "ဝ|wa", category: "vocabulary", id: "23" },
      { front: "thirsty", back: "ရေငတ်|ye-ngeq", category: "vocabulary", id: "24" },
      { front: "sick, hurt", back: "နာ|na", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 13 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle13Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 13 Flashcards created:', data);
      toast.success("Exercise Bundle 13 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 13 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 13"
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
            onClick={insertBundle13}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 13 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle13Flashcard;
