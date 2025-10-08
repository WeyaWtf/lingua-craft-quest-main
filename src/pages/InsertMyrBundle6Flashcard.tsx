import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";

const InsertMyrBundle6Flashcard = () => {
  const navigate = useNavigate();
  const [isInserting, setIsInserting] = useState(false);

  const insertBundle6 = async () => {
    setIsInserting(true);

    const bundle6Cards = [
      { front: "person", back: "လူ|lu", category: "vocabulary", id: "1" },
      { front: "man, male", back: "ကျား|kya", category: "vocabulary", id: "2" },
      { front: "woman, female", back: "မ|ma", category: "vocabulary", id: "3" },
      { front: "child", back: "ကလေး|ka-le", category: "vocabulary", id: "4" },
      { front: "adult", back: "လူကြီး|lu-kyi", category: "vocabulary", id: "5" },
      { front: "father", back: "အဖေ|a-phay", category: "vocabulary", id: "6" },
      { front: "mother", back: "အမေ|a-may", category: "vocabulary", id: "7" },
      { front: "son", back: "သား|tha", category: "vocabulary", id: "8" },
      { front: "daughter", back: "သမီး|tha-mi", category: "vocabulary", id: "9" },
      { front: "older brother", back: "အစ်ကို|a-ko", category: "vocabulary", id: "10" },
      { front: "older sister", back: "အစ်မ|a-ma", category: "vocabulary", id: "11" },
      { front: "younger brother", back: "ညီ|nyi", category: "vocabulary", id: "12" },
      { front: "younger sister", back: "နှမ|hna-ma", category: "vocabulary", id: "13" },
      { front: "grandfather", back: "အဘိုး|a-bo", category: "vocabulary", id: "14" },
      { front: "grandmother", back: "အဘွား|a-bwa", category: "vocabulary", id: "15" },
      { front: "uncle", back: "ဦးလေး|u-le", category: "vocabulary", id: "16" },
      { front: "aunt", back: "ဒေါ်လေး|daw-le", category: "vocabulary", id: "17" },
      { front: "nephew, niece", back: "တူ|tu", category: "vocabulary", id: "18" },
      { front: "friend", back: "သူငယ်ချင်း|thu-ngeh-chin", category: "vocabulary", id: "19" },
      { front: "boyfriend, girlfriend", back: "ချစ်သူ|chiq-thu", category: "vocabulary", id: "20" },
      { front: "husband", back: "ခင်ပွန်း|khin-bwun", category: "vocabulary", id: "21" },
      { front: "wife", back: "မယား|ma-ya", category: "vocabulary", id: "22" },
      { front: "teacher (male)", back: "ဆရာ|hsa-ya", category: "vocabulary", id: "23" },
      { front: "teacher (female)", back: "ဆရာမ|hsa-ya-ma", category: "vocabulary", id: "24" },
      { front: "student", back: "ကျောင်းသား|kyaung-tha", category: "vocabulary", id: "25" }
    ];

    const exerciseData = {
      type: "flashcard",
      title: "MYR LIST 1000 - Bundle 6 Flashcards",
      description: "Burmese vocabulary - Basic words for beginners",
      difficulty: 1,
      source: "official",
      language: "burmese",
      tags: ["vocabulary", "burmese", "beginner", "myanmar"],
      content: {
        cards: bundle6Cards,
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

      console.log('✅ Exercise MYR LIST 1000 - Bundle 6 Flashcards created:', data);
      toast.success("Exercise Bundle 6 Flashcards created successfully!");
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
          <h1 className="text-3xl font-bold mb-4">Insert MYR LIST 1000 - Bundle 6 Flashcards</h1>
          <p className="text-muted-foreground mb-6">
            Click the button below to insert Burmese vocabulary exercise "Bundle 6"
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
            onClick={insertBundle6}
            disabled={isInserting}
            className="min-w-[200px]"
          >
            {isInserting ? "Inserting..." : "Create Bundle 6 Flashcards"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Once created, the exercise will be available in the catalog
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsertMyrBundle6Flashcard;
